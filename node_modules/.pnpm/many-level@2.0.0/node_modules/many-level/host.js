'use strict'

const lpstream = require('@vweevers/length-prefixed-stream')
const ModuleError = require('module-error')
const { Duplex, finished } = require('readable-stream')
const { input, output } = require('./tags')

const rangeOptions = new Set(['gt', 'gte', 'lt', 'lte'])
const encodingOptions = Object.freeze({ keyEncoding: 'buffer', valueEncoding: 'buffer' })
const stateEvents = new Set(['opening', 'open', 'closing', 'closed'])
const kEnded = Symbol('ended')
const kClosed = Symbol('closed')
const kDb = Symbol('db')
const kOptions = Symbol('options')
const kMaxItemLength = Symbol('maxItemLength')
const kDataMessage = Symbol('dataMessage')
const kEndMessage = Symbol('endMessage')
const kHandleMany = Symbol('handleMany')
const kIterator = Symbol('iterator')
const kEncode = Symbol('encode')
const kMode = Symbol('mode')
const kBusy = Symbol('busy')
const kPendingSeek = Symbol('pendingSeek')
const kLimit = Symbol('limit')
const kReadAhead = Symbol('readAhead')
const noop = () => {}
const limbo = Symbol('limbo')

// TODO: make use of db.supports manifest
class ManyLevelHost {
  constructor (db, options) {
    this[kDb] = db
    this[kOptions] = { ...options }
    this[kOptions].readonly = !!this[kOptions].readonly
    this[kOptions].preput = this[kOptions].preput || function (key, val, cb) { cb(null) }
    this[kOptions].predel = this[kOptions].predel || function (key, cb) { cb(null) }
    this[kOptions].prebatch = this[kOptions].prebatch || function (ops, cb) { cb(null) }
    this[kOptions].events = (this[kOptions].events || getEvents(db)).filter(safeEvent)
  }

  createRpcStream (streamOptions) {
    return createRpcStream(this[kDb], this[kOptions], streamOptions)
  }
}

exports.ManyLevelHost = ManyLevelHost

function getEvents (db) {
  const events = db.supports.events
  return Object.keys(events).filter(k => events[k])
}

function safeEvent (event) {
  return event && typeof event === 'string' && !stateEvents.has(event)
}

// TODO: support stream options (highWaterMark)
function createRpcStream (db, options, streamOptions) {
  const readonly = options.readonly
  const decode = lpstream.decode()
  const encode = lpstream.encode()
  const stream = Duplex.from({ writable: decode, readable: encode })

  const preput = options.preput
  const predel = options.predel
  const prebatch = options.prebatch

  db.open({ passive: true }, ready)

  // TODO: send events to guest. Challenges:
  // - Need to know encodings or emit encoded data; current abstract-level events don't suffice
  // - Skip events triggered by guest itself
  // - Support data of custom events, maybe with `cbor-x` and/or extensions via manifest
  // - Include events emitted before open callback
  // for (const event of options.events) {
  //   db.on(event, ...)
  // }

  return stream

  function ready (err) {
    if (stream.destroyed) return
    if (err) return stream.destroy(err)

    const iterators = new Map()

    finished(stream, function () {
      for (const iterator of iterators.values()) {
        iterator.close()
      }

      iterators.clear()
    })

    decode.on('data', function (data) {
      if (!data.length) return

      const tag = data[0]
      const encoding = input.encoding(tag)

      if (!encoding) return

      let req
      try {
        req = encoding.decode(data, 1)
      } catch (err) {
        return
      }

      switch (tag) {
        case input.get: return onget(req)
        case input.put: return readonly ? onreadonly(req) : onput(req)
        case input.del: return readonly ? onreadonly(req) : ondel(req)
        case input.batch: return readonly ? onreadonly(req) : onbatch(req)
        case input.iterator: return oniterator(req)
        case input.iteratorClose: return oniteratorclose(req)
        case input.iteratorAck: return oniteratorack(req)
        case input.iteratorSeek: return oniteratorseek(req)
        case input.clear: return readonly ? onreadonly(req) : onclear(req)
        case input.getMany: return ongetmany(req)
      }
    })

    function callback (id, err, value) {
      const msg = { id, error: errorCode(err), value }
      encode.write(encodeMessage(msg, output.callback))
    }

    function getManyCallback (id, err, values) {
      const msg = { id, error: errorCode(err), values }
      encode.write(encodeMessage(msg, output.getManyCallback))
    }

    function onput (req) {
      preput(req.key, req.value, function (err) {
        if (err) return callback(req.id, err)
        db.put(req.key, req.value, encodingOptions, function (err) {
          callback(req.id, err, null)
        })
      })
    }

    function onget (req) {
      db.get(req.key, encodingOptions, function (err, value) {
        callback(req.id, err, value)
      })
    }

    function ongetmany (req) {
      db.getMany(req.keys, encodingOptions, function (err, values) {
        getManyCallback(req.id, err, values.map(value => ({ value })))
      })
    }

    function ondel (req) {
      predel(req.key, function (err) {
        if (err) return callback(req.id, err)
        db.del(req.key, encodingOptions, function (err) {
          callback(req.id, err)
        })
      })
    }

    function onreadonly (req) {
      callback(req.id, new ModuleError('Database is readonly', { code: 'LEVEL_READONLY' }))
    }

    function onbatch (req) {
      prebatch(req.ops, function (err) {
        if (err) return callback(req.id, err)

        db.batch(req.ops, encodingOptions, function (err) {
          callback(req.id, err)
        })
      })
    }

    function oniterator ({ id, seq, options, consumed, bookmark, seek }) {
      if (iterators.has(id)) return

      const it = new Iterator(db, id, seq, options, consumed, encode)
      iterators.set(id, it)

      if (seek) {
        it.seek(seek, seq)
      } else if (bookmark) {
        // Restart where previous iterator left off
        it.seek(nextTarget(bookmark, options.reverse), seq)
      } else {
        it.next(true)
      }
    }

    function oniteratorack ({ id, seq, consumed }) {
      const it = iterators.get(id)
      if (it === undefined || it.seq !== seq) return
      it.pendingAcks = Math.max(0, it.pendingAcks - 1)
      it.consumed = Math.max(it.consumed, consumed)
      it.next(false)
    }

    function oniteratorseek ({ id, target, seq }) {
      const it = iterators.get(id)
      if (it === undefined) return
      it.seek(target, seq)
    }

    function oniteratorclose ({ id }) {
      const it = iterators.get(id)
      iterators.delete(id)
      if (it !== undefined) it.close()
    }

    function onclear (req) {
      db.clear(cleanRangeOptions(req.options), function (err) {
        callback(req.id, err)
      })
    }
  }
}

class Iterator {
  constructor (db, id, seq, options, consumed, encode) {
    options = cleanRangeOptions(options)

    // Because we read ahead (and can seek) we must do the limiting
    const limit = options.limit
    options.limit = Infinity

    this[kMode] = options.keys && options.values ? 'iterator' : options.keys ? 'keys' : 'values'
    this[kIterator] = db[this[kMode]](options)
    this[kLimit] = limit < 0 ? Infinity : limit
    this[kEncode] = encode
    this[kBusy] = false
    this[kMaxItemLength] = 1
    this[kEnded] = false
    this[kClosed] = false
    this[kDataMessage] = { id, data: [], seq }
    this[kEndMessage] = { id, seq }
    this[kHandleMany] = this[kHandleMany].bind(this)
    this[kPendingSeek] = null

    this.seq = seq
    this.consumed = consumed
    this.pendingAcks = 0
  }

  next (first) {
    if (this[kBusy] || this[kClosed]) return
    if (this[kEnded] || this.pendingAcks > 1) return

    // If limited, don't read more than that minus what the guest has consumed
    let size = this[kLimit] - this.consumed

    if (first) {
      // Only want 1 entry initially, for early termination use cases
      size = Math.min(1, size)
      this[kReadAhead] = false
    } else {
      // Fill the stream's internal buffer
      const ws = this[kEncode]
      const room = Math.max(1, ws.writableHighWaterMark - ws.writableLength)
      size = Math.min(size, Math.max(16, Math.round(room / this[kMaxItemLength])))
      this[kReadAhead] = true
    }

    this[kBusy] = true

    if (size <= 0) {
      process.nextTick(this[kHandleMany], null, [])
    } else {
      this[kIterator].nextv(size, this[kHandleMany])
    }
  }

  seek (target, seq) {
    if (this[kClosed]) {
      // Ignore request
    } else if (this[kBusy]) {
      this[kPendingSeek] = [target, seq]
    } else {
      this[kPendingSeek] = null
      this[kEnded] = false
      this.seq = seq
      this.pendingAcks = 0

      if (target === limbo) {
        this[kBusy] = true
        process.nextTick(this[kHandleMany], null, [])
      } else {
        this[kIterator].seek(target, encodingOptions)
        this.next(true)
      }
    }
  }

  [kHandleMany] (err, items) {
    this[kBusy] = false

    if (this[kClosed]) {
      // Ignore result
    } else if (this[kPendingSeek] !== null) {
      this.seek(...this[kPendingSeek])
    } else if (err) {
      const data = {
        id: this[kDataMessage].id,
        error: errorCode(err),
        seq: this.seq
      }

      this[kEncode].write(encodeMessage(data, output.iteratorError))
    } else if (items.length === 0) {
      this[kEnded] = true
      this[kEndMessage].seq = this.seq
      this[kEncode].write(encodeMessage(this[kEndMessage], output.iteratorEnd))
    } else {
      this[kDataMessage].seq = this.seq

      if (this[kMode] === 'iterator') {
        const data = this[kDataMessage].data = new Array(items.length * 2)
        let n = 0

        for (const entry of items) {
          data[n++] = entry[0]
          data[n++] = entry[1]
        }
      } else {
        this[kDataMessage].data = items
      }

      const buf = encodeMessage(this[kDataMessage], output.iteratorData)
      const estimatedItemLength = Math.ceil(buf.length / items.length)

      this[kEncode].write(buf)
      this[kMaxItemLength] = Math.max(this[kMaxItemLength], estimatedItemLength)
      this.pendingAcks++

      if (this[kReadAhead]) {
        this.next(false)
      }
    }
  }

  close () {
    if (this[kClosed]) return
    this[kClosed] = true
    this[kIterator].close(noop)
  }
}

function encodeMessage (msg, tag) {
  const encoding = output.encoding(tag)
  const buf = Buffer.allocUnsafe(encoding.encodingLength(msg) + 1)
  buf[0] = tag
  encoding.encode(msg, buf, 1)
  return buf
}

// Adjust one byte so that we land on the key after target
function nextTarget (target, reverse) {
  if (!reverse) {
    const copy = Buffer.allocUnsafe(target.length + 1)
    target.copy(copy, 0, 0, target.length)
    copy[target.length] = 0
    return copy
  } else if (target.length === 0) {
    return limbo
  } else if (target[target.length - 1] > 0) {
    target[target.length - 1]--
    return target
  } else {
    return target.slice(0, target.length - 1)
  }
}

function errorCode (err) {
  if (err == null) {
    return undefined
  } else if (typeof err.code === 'string' && err.code.startsWith('LEVEL_')) {
    return err.code
  } else {
    return 'LEVEL_REMOTE_ERROR'
  }
}

function cleanRangeOptions (options) {
  const result = {}

  for (const k in options) {
    if (!hasOwnProperty.call(options, k)) continue

    if (!rangeOptions.has(k) || options[k] != null) {
      result[k] = options[k]
    }
  }

  result.keyEncoding = 'buffer'
  result.valueEncoding = 'buffer'

  return result
}

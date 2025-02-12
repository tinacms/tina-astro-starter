'use strict'

const { AbstractLevel, AbstractIterator } = require('abstract-level')
const lpstream = require('@vweevers/length-prefixed-stream')
const ModuleError = require('module-error')
const { input, output } = require('./tags')
const { Duplex, pipeline, finished } = require('readable-stream')

const kExplicitClose = Symbol('explicitClose')
const kAbortRequests = Symbol('abortRequests')
const kEnded = Symbol('kEnded')
const kRemote = Symbol('remote')
const kAckMessage = Symbol('ackMessage')
const kEncode = Symbol('encode')
const kRef = Symbol('ref')
const kDb = Symbol('db')
const kRequests = Symbol('requests')
const kIterators = Symbol('iterators')
const kRetry = Symbol('retry')
const kRpcStream = Symbol('rpcStream')
const kFlushed = Symbol('flushed')
const kWrite = Symbol('write')
const kRequest = Symbol('request')
const kPending = Symbol('pending')
const kCallback = Symbol('callback')
const kSeq = Symbol('seq')
const kErrored = Symbol('errored')
const noop = function () {}

class ManyLevelGuest extends AbstractLevel {
  constructor (options) {
    const { retry, _remote, ...forward } = options || {}

    super({
      encodings: { buffer: true },
      snapshots: !retry,
      permanence: true,
      seek: true,
      createIfMissing: false,
      errorIfExists: false
    }, forward)

    this[kIterators] = new IdMap()
    this[kRequests] = new IdMap()
    this[kRetry] = !!retry
    this[kEncode] = lpstream.encode()
    this[kRemote] = _remote || null
    this[kRpcStream] = null
    this[kRef] = null
    this[kDb] = null
    this[kExplicitClose] = false
  }

  get type () {
    return 'many-level'
  }

  createRpcStream (opts) {
    if (this[kRpcStream]) {
      throw new Error('Only one rpc stream can be active')
    }

    if (!opts) opts = {}
    this[kRef] = opts.ref || null

    const self = this
    const encode = this[kEncode]
    const decode = lpstream.decode()

    decode.on('data', function (data) {
      if (!data.length) return

      const tag = data[0]
      const encoding = output.encoding(tag)

      if (!encoding) return

      let res
      try {
        res = encoding.decode(data, 1)
      } catch (err) {
        return
      }

      switch (tag) {
        case output.callback:
          oncallback(res)
          break

        case output.iteratorData:
          oniteratordata(res)
          break

        case output.iteratorError:
          oniteratordata(res)
          break

        case output.iteratorEnd:
          oniteratorend(res)
          break

        case output.getManyCallback:
          ongetmanycallback(res)
          break
      }

      self[kFlushed]()
    })

    const proxy = Duplex.from({ writable: decode, readable: encode })
    finished(proxy, cleanup)
    this[kRpcStream] = proxy
    return proxy

    function cleanup () {
      self[kRpcStream] = null
      self[kEncode] = lpstream.encode()

      if (!self[kRetry]) {
        self[kAbortRequests]('Connection to leader lost', 'LEVEL_CONNECTION_LOST')
        self[kFlushed]()
        return
      }

      for (const req of self[kRequests].values()) {
        self[kWrite](req)
      }

      for (const req of self[kIterators].values()) {
        self[kWrite](req)
      }
    }

    function oniteratordata (res) {
      const req = self[kIterators].get(res.id)
      if (!req || req.iterator[kSeq] !== res.seq) return
      req.iterator[kPending].push(res)
      if (req.iterator[kCallback]) req.iterator._next(req.iterator[kCallback])
    }

    function oniteratorend (res) {
      const req = self[kIterators].get(res.id)
      if (!req || req.iterator[kSeq] !== res.seq) return
      // https://github.com/Level/abstract-level/issues/19
      req.iterator[kEnded] = true
      if (req.iterator[kCallback]) req.iterator._next(req.iterator[kCallback])
    }

    function oncallback (res) {
      const req = self[kRequests].remove(res.id)
      if (!req) return
      if (res.error) req.callback(new ModuleError('Could not get value', { code: res.error }))
      else req.callback(null, normalizeValue(res.value))
    }

    function ongetmanycallback (res) {
      const req = self[kRequests].remove(res.id)
      if (!req) return
      if (res.error) req.callback(new ModuleError('Could not get values', { code: res.error }))
      else req.callback(null, res.values.map(v => normalizeValue(v.value)))
    }
  }

  // Alias for backwards compat with multileveldown
  connect (...args) {
    return this.createRpcStream(...args)
  }

  forward (db) {
    // We forward calls to the private API of db, so it must support 'buffer'
    for (const enc of ['keyEncoding', 'valueEncoding']) {
      if (db[enc]('buffer').name !== 'buffer') {
        throw new ModuleError(`Database must support non-transcoded 'buffer' ${enc}`, {
          code: 'LEVEL_ENCODING_NOT_SUPPORTED'
        })
      }
    }

    this[kDb] = db
  }

  isFlushed () {
    return this[kRequests].size === 0 && this[kIterators].size === 0
  }

  [kFlushed] () {
    if (!this.isFlushed()) return
    this.emit('flush')
    unref(this[kRef])
  }

  [kAbortRequests] (msg, code) {
    for (const req of this[kRequests].clear()) {
      req.callback(new ModuleError(msg, { code }))
    }

    for (const req of this[kIterators].clear()) {
      // Cancel in-flight operation if any
      const callback = req.iterator[kCallback]
      req.iterator[kCallback] = null

      if (callback) {
        callback(new ModuleError(msg, { code }))
      }

      // Note: an in-flight operation would block close()
      req.iterator.close(noop)
    }
  }

  _get (key, opts, cb) {
    // TODO: this and other methods assume db state matches our state
    if (this[kDb]) return this[kDb]._get(key, opts, cb)

    const req = {
      tag: input.get,
      id: 0,
      key: key,
      callback: cb
    }

    req.id = this[kRequests].add(req)
    this[kWrite](req)
  }

  _getMany (keys, opts, cb) {
    if (this[kDb]) return this[kDb]._getMany(keys, opts, cb)

    const req = {
      tag: input.getMany,
      id: 0,
      keys: keys,
      callback: cb
    }

    req.id = this[kRequests].add(req)
    this[kWrite](req)
  }

  _put (key, value, opts, cb) {
    if (this[kDb]) return this[kDb]._put(key, value, opts, cb)

    const req = {
      tag: input.put,
      id: 0,
      key: key,
      value: value,
      callback: cb
    }

    req.id = this[kRequests].add(req)
    this[kWrite](req)
  }

  _del (key, opts, cb) {
    if (this[kDb]) return this[kDb]._del(key, opts, cb)

    const req = {
      tag: input.del,
      id: 0,
      key: key,
      callback: cb
    }

    req.id = this[kRequests].add(req)
    this[kWrite](req)
  }

  _batch (batch, opts, cb) {
    if (this[kDb]) return this[kDb]._batch(batch, opts, cb)

    const req = {
      tag: input.batch,
      id: 0,
      ops: batch,
      callback: cb
    }

    req.id = this[kRequests].add(req)
    this[kWrite](req)
  }

  _clear (opts, cb) {
    if (this[kDb]) return this[kDb]._clear(opts, cb)

    const req = {
      tag: input.clear,
      id: 0,
      options: opts,
      callback: cb
    }

    req.id = this[kRequests].add(req)
    this[kWrite](req)
  }

  [kWrite] (req) {
    if (this[kRequests].size + this[kIterators].size === 1) ref(this[kRef])
    const enc = input.encoding(req.tag)
    const buf = Buffer.allocUnsafe(enc.encodingLength(req) + 1)
    buf[0] = req.tag
    enc.encode(req, buf, 1)
    this[kEncode].write(buf)
  }

  _close (cb) {
    // Even if forward() was used, still need to abort requests made before forward().
    this[kExplicitClose] = true
    this[kAbortRequests]('Aborted on database close()', 'LEVEL_DATABASE_NOT_OPEN')

    if (this[kRpcStream]) {
      finished(this[kRpcStream], () => {
        this[kRpcStream] = null
        this._close(cb)
      })
      this[kRpcStream].destroy()
    } else if (this[kDb]) {
      // To be safe, use close() not _close().
      this[kDb].close(cb)
    } else {
      this.nextTick(cb)
    }
  }

  _open (options, cb) {
    if (this[kRemote]) {
      // For tests only so does not need error handling
      this[kExplicitClose] = false
      const remote = this[kRemote]()
      pipeline(
        remote,
        this.connect(),
        remote,
        () => {}
      )
    } else if (this[kExplicitClose]) {
      throw new ModuleError('Cannot reopen many-level database after close()', {
        code: 'LEVEL_NOT_SUPPORTED'
      })
    }

    this.nextTick(cb)
  }

  iterator (options) {
    if (this[kDb]) {
      // TODO: this is 3x faster than doing it in _iterator(). Why?
      return this[kDb].iterator(options)
    } else {
      return AbstractLevel.prototype.iterator.call(this, options)
    }
  }

  _iterator (options) {
    return new Iterator(this, options)
  }
}

exports.ManyLevelGuest = ManyLevelGuest

class Iterator extends AbstractIterator {
  constructor (db, options) {
    // Need keys to know where to restart
    if (db[kRetry]) options.keys = true

    // Avoid spread operator because of https://bugs.chromium.org/p/chromium/issues/detail?id=1204540
    super(db, Object.assign({}, options, { abortOnClose: true }))

    this[kEnded] = false
    this[kErrored] = false
    this[kPending] = []
    this[kCallback] = null
    this[kSeq] = 0

    const req = this[kRequest] = {
      tag: input.iterator,
      id: 0,
      seq: 0,
      iterator: this,
      options,
      consumed: 0,
      bookmark: null,
      seek: null
    }

    const ack = this[kAckMessage] = {
      tag: input.iteratorAck,
      id: 0,
      seq: 0,
      consumed: 0
    }

    req.id = this.db[kIterators].add(req)
    ack.id = req.id

    this.db[kWrite](req)
  }

  _seek (target, options) {
    if (this[kErrored]) return

    this[kPending] = []
    this[kEnded] = false

    // Ignore previous (in-flight) data
    this[kRequest].seq = ++this[kSeq]
    this[kAckMessage].seq = this[kRequest].seq

    // For retries
    this[kRequest].seek = target
    this[kRequest].bookmark = null

    this.db[kWrite]({
      tag: input.iteratorSeek,
      id: this[kRequest].id,
      seq: this[kRequest].seq,
      target
    })
  }

  // TODO: implement optimized `nextv()`
  _next (callback) {
    this[kCallback] = null

    if (this[kRequest].consumed >= this.limit || this[kErrored]) {
      this.nextTick(callback)
    } else if (this[kPending].length !== 0) {
      const next = this[kPending][0]
      const req = this[kRequest]

      // TODO: document that error ends the iterator
      if (next.error) {
        this[kErrored] = true
        this[kPending] = []

        return this.nextTick(callback, new ModuleError('Could not read entry', {
          code: next.error
        }))
      }

      const consumed = ++req.consumed
      const key = req.options.keys ? next.data.shift() : undefined
      const val = req.options.values ? next.data.shift() : undefined

      if (next.data.length === 0) {
        this[kPending].shift()

        // Acknowledge receipt. Not needed if we don't want more data.
        if (consumed < this.limit) {
          this[kAckMessage].consumed = consumed
          this.db[kWrite](this[kAckMessage])
        }
      }

      // Once we've consumed the result of a seek() it must not get retried
      req.seek = null

      if (this.db[kRetry]) {
        req.bookmark = key
      }

      this.nextTick(callback, undefined, key, val)
    } else if (this[kEnded]) {
      this.nextTick(callback)
    } else {
      this[kCallback] = callback
    }
  }

  _close (cb) {
    this.db[kWrite]({ tag: input.iteratorClose, id: this[kRequest].id })
    this.db[kIterators].remove(this[kRequest].id)
    this.db[kFlushed]()
    this.nextTick(cb)
  }
}

function normalizeValue (value) {
  return value === null ? undefined : value
}

function ref (r) {
  if (r && r.ref) r.ref()
}

function unref (r) {
  if (r && r.unref) r.unref()
}

class IdMap {
  constructor () {
    this._map = new Map()
    this._seq = 0
  }

  get size () {
    return this._map.size
  }

  add (item) {
    if (this._seq >= 0xffffffff) this._seq = 0
    this._map.set(++this._seq, item)
    return this._seq
  }

  get (id) {
    return this._map.get(id)
  }

  remove (id) {
    const item = this._map.get(id)
    if (item !== undefined) this._map.delete(id)
    return item
  }

  values () {
    return this._map.values()
  }

  clear () {
    const values = Array.from(this._map.values())
    this._map.clear()
    this._seq = 0
    return values
  }
}

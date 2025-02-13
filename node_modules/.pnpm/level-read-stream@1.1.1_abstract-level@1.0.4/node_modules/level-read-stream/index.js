'use strict'

const { Readable } = require('readable-stream')

const kIterator = Symbol('iterator')
const kPromises = Symbol('promises')
const kNextv = Symbol('nextv')
const kNextvLegacy = Symbol('nextvLegacy')
const kDestroy = Symbol('destroy')

class LevelReadStream extends Readable {
  constructor (db, method, options) {
    const { highWaterMark, ...rest } = options || {}

    super({
      objectMode: true,
      highWaterMark: highWaterMark || 1000
    })

    this[kIterator] = db[method](rest)
    this[kNextv] = this[kNextv].bind(this)
    this[kNextvLegacy] = this[kNextvLegacy].bind(this)
    this[kDestroy] = this.destroy.bind(this)

    // Detect abstract-level 2 by the presence of hooks. Version 2 doesn't
    // support callbacks anymore. Version 1 does also support promises but
    // that would be slower because it works by wrapping the callback API.
    this[kPromises] = db.hooks !== undefined

    // NOTE: use autoDestroy option when it lands in readable-stream
    this.once('end', this.destroy.bind(this, null, null))
  }

  get db () {
    return this[kIterator].db
  }

  _read (size) {
    if (this.destroyed) return

    if (this[kPromises]) {
      this[kIterator].nextv(size).then(
        this[kNextv],
        this[kDestroy]
      )
    } else {
      this[kIterator].nextv(size, this[kNextvLegacy])
    }
  }

  [kNextvLegacy] (err, items) {
    if (this.destroyed) return
    if (err) return this.destroy(err)

    if (items.length === 0) {
      this.push(null)
    } else {
      for (const item of items) {
        this.push(item)
      }
    }
  }

  [kNextv] (items) {
    if (this.destroyed) return

    if (items.length === 0) {
      this.push(null)
    } else {
      for (const item of items) {
        this.push(item)
      }
    }
  }

  _destroy (err, callback) {
    if (this[kPromises]) {
      this[kIterator].close().then(
        err ? () => callback(err) : callback,
        callback
      )
    } else {
      this[kIterator].close(function (err2) {
        callback(err || err2)
      })
    }
  }
}

class EntryStream extends LevelReadStream {
  constructor (db, options) {
    super(db, 'iterator', { ...options, keys: true, values: true })
  }

  [kNextvLegacy] (err, entries) {
    if (this.destroyed) return
    if (err) return this.destroy(err)

    if (entries.length === 0) {
      this.push(null)
    } else {
      for (const [key, value] of entries) {
        this.push({ key, value })
      }
    }
  }

  [kNextv] (entries) {
    if (this.destroyed) return

    if (entries.length === 0) {
      this.push(null)
    } else {
      for (const [key, value] of entries) {
        this.push({ key, value })
      }
    }
  }
}

class KeyStream extends LevelReadStream {
  constructor (db, options) {
    super(db, 'keys', options)
  }
}

class ValueStream extends LevelReadStream {
  constructor (db, options) {
    super(db, 'values', options)
  }
}

exports.EntryStream = EntryStream
exports.KeyStream = KeyStream
exports.ValueStream = ValueStream

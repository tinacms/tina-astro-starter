const varint = require('varint')
const stream = require('readable-stream')
const inherits = require('inherits')

let pool = Buffer.allocUnsafe(10 * 1024)
let used = 0

const Encoder = function () {
  if (!(this instanceof Encoder)) return new Encoder()
  stream.Transform.call(this)
}

inherits(Encoder, stream.Transform)

Encoder.prototype._transform = function (data, enc, cb) {
  varint.encode(data.length, pool, used)
  used += varint.encode.bytes

  this.push(pool.slice(used - varint.encode.bytes, used))
  this.push(data)

  if (pool.length - used < 100) {
    pool = Buffer.allocUnsafe(10 * 1024)
    used = 0
  }

  cb()
}

module.exports = Encoder

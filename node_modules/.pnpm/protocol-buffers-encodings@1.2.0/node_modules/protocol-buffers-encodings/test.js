var tape = require('tape')
var encodings = require('./')

tape('name', function (t) {
  t.same(encodings.name(encodings.varint), 'varint')
  t.same(encodings.name(encodings.float), 'float')
  t.end()
})

tape('varint', function (t) {
  test(t, encodings.varint, [42, 10, 0, 999999])
})

tape('string', function (t) {
  test(t, encodings.string, ['a', 'abefest', 'øøø'])
})

tape('bytes (node style)', function (t) {
  test(
    t,
    encodings.bytes,
    [Buffer.alloc(4096), Buffer.from('hi')],
    [allocBuffer]
  )
})

tape('bytes (browser style)', function (t) {
  test(
    t,
    encodings.bytes,
    [new Uint8Array(4096), new Uint8Array([104, 105])],
    [allocUint8Array]
  )
})

tape('bool', function (t) {
  test(t, encodings.bool, [true, false])
})

tape('int32', function (t) {
  test(t, encodings.int32, [-1, 0, 42, 4242424])
})

tape('int64', function (t) {
  test(t, encodings.int64, [-1, 0, 1, 24242424244])
})

tape('sint64', function (t) {
  test(t, encodings.sint64, [-14, 0, 144, 4203595524])
})

tape('uint64', function (t) {
  test(t, encodings.uint64, [1, 0, 144, 424444, 4203595524])
})

tape('fixed64 (node style)', function (t) {
  test(
    t,
    encodings.fixed64,
    [Buffer.from([0, 0, 0, 0, 0, 0, 0, 1])],
    [allocBuffer]
  )
})

tape('fixed64 (browser style)', function (t) {
  test(
    t,
    encodings.fixed64,
    [new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1])],
    [allocUint8Array]
  )
})

tape('double', function (t) {
  test(t, encodings.double, [0, 2, 0.5, 0.4])
})

tape('float', function (t) {
  test(t, encodings.float, [0, 2, 0.5])
})

tape('fixed32', function (t) {
  test(t, encodings.fixed32, [4, 0, 10000])
})

tape('sfixed32', function (t) {
  test(t, encodings.sfixed32, [-100, 4, 0, 142425])
})

function test (t, enc, vals, allocFunctions = [allocBuffer, allocUint8Array]) {
  if (!Array.isArray(vals)) vals = [vals]

  for (const allocFunction of allocFunctions) {
    for (const val of vals) {
      let buf = allocFunction(enc.encodingLength(val))

      enc.encode(val, buf, 0)

      t.same(enc.encode.bytes, buf.length)
      t.same(enc.encodingLength(val), buf.length)
      t.same(enc.decode(buf, 0), val)
      t.same(enc.decode.bytes, buf.length)

      const anotherBuf = allocFunction(enc.encodingLength(val) + 1000)

      buf = enc.encode(val, anotherBuf, 10)
      t.same(buf, anotherBuf)
      t.ok(enc.encode.bytes < anotherBuf.length)
      t.same(enc.decode(buf, 10, 10 + enc.encodingLength(val)), val)
      t.ok(enc.decode.bytes < anotherBuf.length)
    }
  }

  t.end()
}

tape('test browser-style buffer', function (t) {
  const enc = encodings.string
  const val = 'value'
  let buf = new Uint8Array(enc.encodingLength(val))
  enc.encode(val, buf, 0)

  // First elem is the length (5). Others are the encoded 'value'
  const expectedEncodedVal = new Uint8Array([5, 118, 97, 108, 117, 101])
  t.same(buf, expectedEncodedVal)

  t.same(enc.encode.bytes, buf.length)
  t.same(enc.encodingLength(val), buf.length)
  t.same(enc.decode(buf, 0), val)
  t.same(enc.decode.bytes, buf.length)

  const anotherBuf = new Uint8Array(enc.encodingLength(val) + 1000)

  buf = enc.encode(val, anotherBuf, 10)
  t.same(buf, anotherBuf)
  t.ok(enc.encode.bytes < anotherBuf.length)
  t.same(enc.decode(buf, 10, 10 + enc.encodingLength(val)), val)
  t.ok(enc.decode.bytes < anotherBuf.length)

  t.end()
})

function allocBuffer (length) {
  // Node style
  return Buffer.alloc(length)
}

function allocUint8Array (length) {
  // Browser style
  return new Uint8Array(length)
}

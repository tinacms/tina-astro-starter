var tape = require('tape')
var compare = require('typewiselite')

var codec = require('../')

tape('numbers', function (t) {

  var expected = [1,2,0,-1, 10, 1000, 949939434, -2, -30, 0.5, -0.72, -0.00001, 1000.00102120]

  function test (n) {
    var s = codec.number.encode(n)
    t.equal(typeof s, 'string')
    t.equal(codec.number.decode(s), n)
    return s
  }

  var actual = expected.map(test)

  expected.sort(function (a, b) { return a - b })
  console.log(expected)
  actual.sort() //default to sort as strings
  console.log(actual)
  t.deepEqual(actual.map(codec.number.decode), expected)
  t.end()

})

function cmp (a, b) {
  return a - b
}
//
//function neg (e) {
//  return -e
//}

tape('flip', function (t) {
  var ns = [1,2,3,4,13,34,35, 50,100]
  console.log(ns.map(codec.flip))
  console.log(ns.map(codec.flip).map(codec.flip).map(Number))
  t.deepEqual(ns.map(codec.flip).map(codec.flip).map(Number), ns)
//  t.deepEqual(
//    ns.map(codec.flip).sort().map(codec.flip).map(Number),
//    ns.map(neg).sort(cmp).map(neg)
//  )
  t.end()
})

var data = [
  1, 0, 8234, 90321, -12, -34,
//  0.1, -1.0032e29,
  'hello', 'bye',
  true,
  false,
  null,
  undefined
].sort(compare)

tape('order', function (t) {
  var strings = data.map(codec.encode).sort()
  t.deepEqual(
    strings.map(codec.decode),
    data
  )
  t.end()
})


tape('array', function (t) {
  var a = []
//  for(var i = 0; i<data.length;i++)
//    for(var j = 0; j < data.length; j++)
//      a.push([data[i], data[j]])

  for(var i = 0; i < 100; i++) {
    var l = Math.random()*10
    var b = []
    a.push(b)
    for(var j = 0; j < l; j++)
      b.push(data[~~(Math.random()*data.length)])
  }

  a.sort(compare)

  var strings = a.map(codec.encode).sort()

  console.log(strings)
  t.deepEqual(
    strings.map(codec.decode),
    a
  )
  t.end()
})

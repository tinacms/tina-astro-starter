var tape = require('tape')
var codec = require('../codec/object.js').factory(require('../index.js'));
var same = require('deep-equal');
var bytewise = require('bytewise').encode;
var encode = codec.encode;
var decode = codec.decode;

var words = ['foo', 'bar', 'hello!world', 'OSfail!Shard!A']

var randArray = function (size) {
    var array = [];
    for (var i = 0; i < Math.ceil(Math.random() * size); i++) {
        if (Math.random() > 0.5) { array.push(Math.random() > 0.5 ? true : false); }
        if (Math.random() > 0.5) { array.push(Math.random() > 0.5 ? undefined : null); }
        if (Math.random() > 0.5) { array.push((Math.random() - 0.5) * 4); }
        if (Math.random() > 0.5) { array.push(words[Math.floor(Math.random() * words.length)]); }
        if (Math.random() > 0.5) { array.push(randArray(size-1)); }
    }
    return array;
}

tape("Object: 1000 random array", function (t) {
    var i;
    for (i = 0; i < 1000; i++) {
        var array1 = randArray(3);
        var array2 = randArray(3);
        if (!same(decode(encode(array1)), array1)) {
            t.equals(decode(encode(array1)), array1, 'decode(encode(' + array1 + ')) !== ' + array1);
            break;
        }
        if (!same(decode(encode(array2)), array2)) {
            t.equals(decode(encode(array2)), array2, 'decode(encode(' + array2 + ')) !== ' + array2);
            break;
        }
        if (bytewise(array1) < bytewise(array2) && encode(array1) >= encode(array2)) {
            t.fail('encode(' + array1 + ') >= encode(' + array2 + ')');
        break;
        }
        if (bytewise(array1) > bytewise(array2) && encode(array1) <= encode(array2)) {
            t.fail('encode(' + array1 + ') >= encode(' + array2 + ')');
            break;
        }
        if (bytewise(array1) === bytewise(array2) && encode(array1) === encode(array2)) {
            t.fail('encode(' + array1 + ') !== encode(' + array2 + ')');
            break;
        }
    }
    if (i === 1000) {
        t.pass('All random array validated')
    }
    t.end();
});

tape('edge cases', function (t) {
  var examples = [
      [[[]]],
      ['hello\\', 'world'],
      ['hello!', 'world!'],
      ['hello?@!', 'world!'],
      ['hello@?@!', 'world!']
  ]
  examples.forEach(function (a) {
    t.deepEqual(decode(encode(a)), a)
  })
  t.deepEqual(decode(encode(examples)), examples)
  t.end()
})

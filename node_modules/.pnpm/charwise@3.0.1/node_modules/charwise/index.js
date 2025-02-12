var number = require('./codec/number.js');
var object = require('./codec/object.js');

var flip = exports.flip = function (n) {
  var s = n.toString()
  var f = ''
  for(var i in s) {
    f += s[i] == '.' ? '.' : (9 - +s[i])
  }
  return f
}

function round (n) {
  return n < 0 ? Math.ceil(n) : Math.floor(n)
}

function fraction (f) {
  return f - round(f)
}

exports.number = number;

exports.string = {
  encode: function (s) {
    //we'll need to escape the separators
    if(!/\x00|\x01/.test(s))
      return 'J'+s
    else {
      return 'J'+s.replace(/\x01/g, '\x01\x01').replace(/\x00/g, '\x01')
    }
  },
  decode: function (s) {
    if('J' === s[0])
      return s.substring(1) //TODO, unescape things...
  }
}

exports.encode = function (t) {
  return exports[typeof t].encode(t)
}

exports.decode = function (s) {
  if(s === '') return s

  if(!decoders[s[0]])
    throw new Error('no decoder for:'+JSON.stringify(s))
  return decoders[s[0]](s)
}

exports.object = object.factory(exports);

exports.boolean = {
  encode: function (b) {
    return b ? 'C' : 'B'
  },
  decode: function (b) {
    return 'C' === b
  }
}

exports.undefined = {
  encode: function (b) {
    return 'L'
  },
  decode: function () {
    return undefined
  }
}

var decoders = {
  A: exports.object.decode, //null
  B: exports.boolean.decode, // false
  C: exports.boolean.decode, // true
  D: exports.number.decode, // number
  F: exports.number.decode, // number
  // G Date
  // H Date
  // I Buffer
  J: exports.string.decode, // String
  K: exports.object.decode, // Array
  L: exports.undefined.decode, // undefined
}


//for leveldb, request strings
exports.buffer = false
exports.type = 'charwise'

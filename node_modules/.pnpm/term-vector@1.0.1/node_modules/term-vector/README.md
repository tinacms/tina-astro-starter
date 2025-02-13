[![NPM version][npm-version-image]][npm-url] [![NPM downloads][npm-downloads-image]][npm-url] [![MIT License][license-image]][license-url]

# term-vector
A node.js module that creates a term vector from tokenized text. Use `term-vector` when implementing a [vector space model](http://en.wikipedia.org/wiki/Vector_space_model)

**Works with Unicode!**

**Does ngrams!**


```javascript

const tv = require('term-vector') 
// alternatively if you are all fancy and new-fangled:
// import tv from 'term-vector'
const tokens = 'this is really really really cool'.split(' ')

// just make a simple term vector
tv(tokens)
// [
//   { term: [ 'cool' ], positions: [ 5 ] },
//   { term: [ 'is' ], positions: [ 1 ] },
//   { term: [ 'really' ], positions: [ 2, 3, 4 ] },
//   { term: [ 'this' ], positions: [ 0 ] }
// ]

// make a term vector with ngrams of length 1 and 2
tv(tokens, { ngramLengths: [ 1, 2 ] })
// [
//   { term: [ 'cool' ], positions: [ 5 ] },
//   { term: [ 'is' ], positions: [ 1 ] },
//   { term: [ 'is', 'really' ], positions: [ 1 ] },
//   { term: [ 'really' ], positions: [ 2, 3, 4 ] },
//   { term: [ 'really', 'really' ], positions: [ 2, 3 ] },
//   { term: [ 'really', 'cool' ], positions: [ 4 ] },
//   { term: [ 'this' ], positions: [ 0 ] },
//   { term: [ 'this', 'is' ], positions: [ 0 ] }
// ]

```

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE

[npm-url]: https://npmjs.org/package/term-vector
[npm-version-image]: http://img.shields.io/npm/v/term-vector.svg?style=flat
[npm-downloads-image]: http://img.shields.io/npm/dm/term-vector.svg?style=flat

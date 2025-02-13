# Upgrade Guide

This document describes breaking changes and how to upgrade. For a complete list of changes including minor and patch releases, please refer to the [changelog](CHANGELOG.md).

## 2.0.0

This release replaces the `duplexify` and `end-of-stream` dependencies with [`readable-stream`](https://github.com/nodejs/readable-stream) v4 and its new utilities. This means that streams exposed by `many-level` no longer emit duplexify's custom events (prefinish, preend, cork, uncork). This is unlikely to affect anyone.

## 1.0.0

**Introducing `many-level`: a fork of [`multileveldown`](https://github.com/Level/multileveldown) that removes the need for [`levelup`](https://github.com/Level/levelup), [`encoding-down`](https://github.com/Level/encoding-down) and more. It implements the [`abstract-level`](https://github.com/Level/abstract-level) interface - which merged `abstract-leveldown` with `levelup`. For `many-level` that means it has the same familiar API including encodings, promises and events but excluding streams. In addition, you can now choose to use Uint8Array instead of Buffer. Sublevels are builtin.**

We've put together several upgrade guides for different modules. See the [FAQ](https://github.com/Level/community#faq) to find the best upgrade guide for you. This one describes how to replace `multileveldown` with `many-level`.

Support of Node.js 10 has been dropped.

### What's new here

- Throughput of iterators has doubled
- Reverse iterators have been fixed to support retry
- Supports `iterator.seek()` (across retries too).

### What is not covered here

If you are using any of the following, please also read the upgrade guide of [`abstract-level@1`](https://github.com/Level/abstract-level/blob/main/UPGRADING.md#100) which goes into more detail about these:

- Not-found errors on `db.get()` (replaced by error codes)
- Sublevels created with [`subleveldown`](https://github.com/Level/subleveldown) (now built-in)
- The `db.iterator().end()` method (renamed to `close()`, with `end()` as an alias)
- Zero-length keys and range options (now valid)
- Chained batches (must now be closed if not committed).

### Changes to initialization

We started using classes, which means using `new` is now required. The server / client roles are now called host / guest. If you previously did:

```js
// Server
const multileveldown = require('multileveldown')
const stream = multileveldown.server(db, options)

// Client
const multileveldown = require('multileveldown')
const db = multileveldown.client(encodingOptions)
const stream = db.connect(options)
```

You should now do:

```js
// Host
const { ManyLevelHost } = require('many-level')
const host = new ManyLevelHost(db, options)
const stream = host.createRpcStream()

// Guest
const { ManyLevelGuest } = require('many-level')
const db = new ManyLevelGuest(encodingOptions)
const stream = db.createRpcStream(options)
```

Arguments and options are the same. The previous exports (`server` and `client`) are still available but log a deprecation warning.

### The protocol is incompatible

A `many-level` guest cannot talk to a `multileveldown` server due to breaking protocol changes. This means both ends must be upgraded to `many-level`.

### Streams have moved

Node.js readable streams must now be created with a new standalone module called [`level-read-stream`](https://github.com/Level/read-stream) rather than database methods like `db.createReadStream()`. To offer an alternative to `db.createKeyStream()` and `db.createValueStream()`, two new types of iterators have been added: `db.keys()` and `db.values()`.

### There is only encodings

Encodings have a new home in `abstract-level` and are now powered by [`level-transcoder`](https://github.com/Level/transcoder). The main change is that logic from the existing public API has been expanded down into the storage layer. There are however a few differences from `encoding-down`. Some breaking:

- The lesser-used `'id'`, `'ascii'`, `'ucs2'` and `'utf16le'` encodings are not supported
- The undocumented `encoding` option (as an alias for `valueEncoding`) is not supported.

And some non-breaking:

- The `'binary'` encoding has been renamed to `'buffer'`, with `'binary'` as an alias
- The `'utf8'` encoding previously did not touch Buffers. Now it will call `buffer.toString('utf8')` for consistency. Consumers can use the `'buffer'` encoding to avoid this conversion.

Uint8Array data is now supported too, although `many-level` internally uses Buffers. It's a separate encoding called `'view'` that can be used interchangeably:

```js
const db = new ManyLevelGuest({ valueEncoding: 'view' })

await db.put('elena', new Uint8Array([97, 98, 99]))
await db.get('elena') // Uint8Array
await db.get('elena', { valueEncoding: 'utf8' }) // 'abc'
await db.get('elena', { valueEncoding: 'buffer' }) // Buffer
```

### Errors have predictable codes

Like [`abstract-level@1`](https://github.com/Level/abstract-level/blob/main/UPGRADING.md#100), `many-level` started using [error codes](https://github.com/Level/abstract-level#errors). The specific error messages that `multileveldown` had did not change, but it is a breaking change in the sense that going forward, the semver contract will be on codes instead of messages (which, in other words, may change at any time). If you previously did:

```js
try {
  await db.get('abc')
} catch (err) {
  if (err.message === 'Connection to leader lost') {
    // ..
  }
}
```

You should now do:

```js
try {
  await db.get('abc')
} catch (err) {
  if (err.code === 'LEVEL_CONNECTION_LOST') {
    // ..
  }
}
```

Previously, the `Connection to leader lost` error was also used upon a `db.close()` (in addition to upon loss of connection). Closing the database while it has pending operations now results in a `LEVEL_DATABASE_NOT_OPEN` error on those operations. This is the same code that `abstract-level` (and therefore `many-level`) uses on operations made _after_ a `db.close()`.

The error codes are also used in communication between host and guest, instead of exposing arbitrary error messages. If the host encounters an unexpected error, the code received by a guest will be `LEVEL_REMOTE_ERROR`.

All together, here are the errors to be expected from `many-level`:

| Previous message            | New code                                             |
| :-------------------------- | :--------------------------------------------------- |
| `Connection to leader lost` | `LEVEL_CONNECTION_LOST` or `LEVEL_DATABASE_NOT_OPEN` |
| `Database is readonly`      | `LEVEL_READONLY`                                     |
| Any other message           | `LEVEL_REMOTE_ERROR` or an `abstract-level` code     |

### Changes to lesser-used properties and methods

The following properties are now read-only getters.

| Object        | Property | Original module      | New module       |
| :------------ | :------- | :------------------- | :--------------- |
| db            | `status` | `abstract-leveldown` | `abstract-level` |
| chained batch | `length` | `levelup`            | `abstract-level` |

Semi-private properties like `_clearRequests()` and `_ended` (that's not an exhaustive list) have been replaced with symbols and are no longer accessible.

---

_For earlier releases, before `many-level` was forked from `multileveldown` (v5.0.1), please see [the upgrade guide of `multileveldown`](https://github.com/Level/multileveldown/blob/HEAD/UPGRADING.md)._

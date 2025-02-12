# many-level

**Share an [abstract-level](https://github.com/Level/abstract-level) database over the network or other kind of stream.** The successor to [`multileveldown`](https://github.com/Level/multileveldown). If you are upgrading, please see [UPGRADING.md](UPGRADING.md).

> :pushpin: Which module should I use? What is `abstract-level`? Head over to the [FAQ](https://github.com/Level/community#faq).

[![level badge][level-badge]](https://github.com/Level/awesome)
[![npm](https://img.shields.io/npm/v/many-level.svg)](https://www.npmjs.com/package/many-level)
[![Node version](https://img.shields.io/node/v/many-level.svg)](https://www.npmjs.com/package/many-level)
[![Test](https://img.shields.io/github/workflow/status/Level/many-level/Test?label=test)](https://github.com/Level/many-level/actions/workflows/test.yml)
[![Coverage](https://img.shields.io/codecov/c/github/Level/many-level?label=\&logo=codecov\&logoColor=fff)](https://codecov.io/gh/Level/many-level)
[![Standard](https://img.shields.io/badge/standard-informational?logo=javascript\&logoColor=fff)](https://standardjs.com)
[![Common Changelog](https://common-changelog.org/badge.svg)](https://common-changelog.org)
[![Donate](https://img.shields.io/badge/donate-orange?logo=open-collective\&logoColor=fff)](https://opencollective.com/level)

## Usage

Use this module to share an `abstract-level` database across multiple processes or machines. A _host_ exposes a database of choice over binary streams, using compact [Protocol Buffers](https://developers.google.com/protocol-buffers) messages to encode database operations. One or more _guests_ connect to that host and expose it as an `abstract-level` database, as if it is a regular, local database. They can opt-in to a seamless retry in order to reconnect to a host without aborting any pending database operations.

First create a host and server. The server can be anything that supports binary streams. In this example we'll use a simple TCP server.

```js
const { ManyLevelHost } = require('many-level')
const { Level } = require('level')
const { pipeline } = require('readable-stream')
const { createServer } = require('net')

const db = new Level('./db')
const host = new ManyLevelHost(db)

const server = createServer(function (socket) {
  // Pipe socket into host stream and vice versa
  pipeline(socket, host.createRpcStream(), socket, () => {
    // Disconnected
  })
})

server.listen(9000)
```

Then create some guests:

```js
const { ManyLevelGuest } = require('many-level')
const { pipeline } = require('readable-stream')
const { connect } = require('net')

const db = new ManyLevelGuest()
const socket = connect(9000)

// Pipe socket into guest stream and vice versa
pipeline(socket, db.createRpcStream(), socket, () => {
  // Disconnected
})

await db.put('hello', 'world')
console.log(await db.get('hello'))
```

Encoding options are supported as usual.

## Reconnect

To setup reconnect set the `retry` option to `true` and reconnect to your server when the connection fails:

```js
const db = new ManyLevelGuest({
  retry: true
})

const reconnect = function () {
  const socket = connect(9000)

  pipeline(socket, db.createRpcStream(), socket, () => {
    // Reconnect after 1 second
    setTimeout(reconnect, 1000)
  })
}

reconnect()
```

The guest database will now retry your pending operations when you reconnect. If you create an iterator or [readable stream](https://github.com/Level/read-stream) and your connection fails halfway through reading that iterator then `many-level` makes sure to only retry the part of the iterator that you are missing. The downside of `retry` is that a guest database then cannot provide [snapshot guarantees](https://github.com/Level/abstract-level#iterator) because new iterators (and thus snapshots of the host database) will be created upon reconnect. This is reflected in [`db.supports.snapshots`](https://github.com/Level/abstract-level#dbsupports) which will be `false` if `retry` is true.

## API

### Host

#### `host = new ManyLevelHost(db, [options])`

Create a new host that exposes the given `db`, which must be an `abstract-level` database that supports the `'buffer'` encoding (most if not all do). It can also be a [sublevel](https://github.com/Level/abstract-level#sublevel--dbsublevelname-options) which allows for exposing only a specific section of the database.

The optional `options` object may contain:

- `readonly` (boolean, default `false`): reject write operations like `db.put()`
- `preput` (function, default none): a `function (key, val, cb) {}` to be called before `db.put()` operations
- `predel` (function, default none): a `function (key, cb) {}` to be called before `db.del()` operations
- `prebatch` (function, default none): a `function (operations, cb) {}` to be called before `db.batch()` operations.

#### `hostStream = host.createRpcStream()`

Create a duplex host stream to be piped into a guest stream. One per guest.

### Guest

#### `db = new ManyLevelGuest([options])`

Create a guest database that reads and writes to the host's database. The `ManyLevelGuest` class extends `AbstractLevel` and thus follows the public API of [`abstract-level`](https://github.com/Level/abstract-level) with a few additional methods and one additional constructor option. As such, the majority of the API is documented in `abstract-level`. It supports sublevels, `iterator.seek()` and every other `abstract-level` feature, except for the `createIfMissing` and `errorIfExists` options which have no effect here. Iterators have built-in end-to-end backpressure regardless of the transport that you use.

The optional `options` object may contain:

- `keyEncoding` (string or object, default `'utf8'`): [encoding](https://github.com/Level/abstract-level#encodings) to use for keys
- `valueEncoding` (string or object, default `'utf8'`): encoding to use for values
- `retry` (boolean, default `false`): if true, resend operations when reconnected. If false, abort operations when disconnected, which means to yield an error on e.g. `db.get()`.

The database opens itself but (unlike other `abstract-level` implementations) cannot be re-opened once `db.close()` has been called. Calling `db.open()` would then yield a [`LEVEL_NOT_SUPPORTED`](https://github.com/Level/abstract-level#errors) error.

#### `guestStream = db.createRpcStream([options])`

Create a duplex guest stream to be piped into a host stream. Until that's done, operations made on `db` are queued up in memory. Will throw if `createRpcStream()` was previously called and that stream has not (yet) closed. The optional `options` object may contain:

- `ref` (object, default `null`): an object to only keep the Node.js event loop alive while there are pending database operations. Should have a `ref()` method to be called on a new database operation like `db.get()` and an `unref()` method to be called when all operations have finished (or when the database is closed). A Node.js `net` socket satisfies that interface. The `ref` option is not relevant when `ManyLevelGuest` is used in a browser environment (which, side note, is not officially supported yet).

#### `guestStream = db.connect()`

An alias to `createRpcStream()` for [`multileveldown`](https://github.com/Level/multileveldown) API compatibility.

#### `db.forward(db2)`

Instead of talking to a host, forward all database operations to `db2` which must be an `abstract-level` database. This method is used by `rave-level` and serves a narrow use case. Which is to say, it may not work for anything other than `rave-level`. Among other things, it assumes that `db2` is open and that it uses the same encoding options as the guest database.

#### `db.isFlushed()`

Returns `true` if there are no operations pending to be sent to a host.

## Install

With [npm](https://npmjs.org) do:

```
npm i many-level
```

Usage from TypeScript also requires `npm install @types/readable-stream`.

## Contributing

[`Level/many-level`](https://github.com/Level/many-level) is an **OPEN Open Source Project**. This means that:

> Individuals making significant and valuable contributions are given commit-access to the project to contribute as they see fit. This project is more like an open wiki than a standard guarded open source project.

See the [Contribution Guide](https://github.com/Level/community/blob/master/CONTRIBUTING.md) for more details.

## Donate

Support us with a monthly donation on [Open Collective](https://opencollective.com/level) and help us continue our work.

## License

[MIT](LICENSE)

[level-badge]: https://leveljs.org/img/badge.svg

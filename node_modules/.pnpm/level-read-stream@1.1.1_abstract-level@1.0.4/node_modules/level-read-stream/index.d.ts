import { Readable } from 'readable-stream'

// Assumed to be installed side-by-side, declared as an optional peerDependency.
import {
  AbstractLevel,
  AbstractIteratorOptions,
  AbstractKeyIteratorOptions,
  AbstractValueIteratorOptions
} from 'abstract-level'

// NOTE: the types of readable-stream don't have generic type parameters
declare class LevelReadStream<T, TDatabase> extends Readable {
  /**
   * A read-only reference to the database that this stream is reading from.
   */
  get db (): TDatabase

  [Symbol.asyncIterator] (): AsyncIterableIterator<T>
}

/**
 * A Node.js readable stream that yields entries.
 */
export class EntryStream<K, V, TDatabase = AbstractLevel<any, any, any>> extends LevelReadStream<{ key: K, value: V }, TDatabase> {
  /**
   * Create a Node.js readable stream that yields entries from {@link db}.
   * @param db Database to read from.
   * @param options Options for the stream and its underlying iterator.
   */
  constructor (db: TDatabase, options?: (ReadStreamOptions & Omit<AbstractIteratorOptions<K, V>, 'keys' | 'values'>) | undefined)

  // TODO: support passing in an iterator so that its implementation-specific options are typed?
  // constructor (iterator: AbstractIterator<TDatabase, K, V>, options?: LevelReadStreamOptions | undefined)
}

/**
 * A Node.js readable stream that yields keys.
 */
export class KeyStream<K, TDatabase = AbstractLevel<any, any, any>> extends LevelReadStream<K, TDatabase> {
  /**
   * Create a Node.js readable stream that yields keys from {@link db}.
   * @param db Database to read from.
   * @param options Options for the stream and its underlying iterator.
   */
  constructor (db: TDatabase, options?: (ReadStreamOptions & AbstractKeyIteratorOptions<K>) | undefined)
}

/**
 * A Node.js readable stream that yields values.
 */
export class ValueStream<K, V, TDatabase = AbstractLevel<any, any, any>> extends LevelReadStream<V, TDatabase> {
  /**
   * Create a Node.js readable stream that yields values from {@link db}.
   * @param db Database to read from.
   * @param options Options for the stream and its underlying iterator.
   */
  constructor (db: TDatabase, options?: (ReadStreamOptions & AbstractValueIteratorOptions<K, V>) | undefined)
}

export interface ReadStreamOptions {
  /**
   * The maximum number of items to buffer internally before ceasing to read further
   * items.
   *
   * @defaultValue `1000`
   */
  highWaterMark?: number | undefined

  /**
   * Limit the amount of data that the underlying iterator will hold in memory.
   *
   * Only supported by [`classic-level`][1] and [`rocks-level`][2], and possibly by
   * similar `abstract-level` implementations that are backed by a database on disk.
   *
   * [1]: https://github.com/Level/classic-level
   * [2]: https://github.com/Level/rocks-level
   */
  highWaterMarkBytes?: number | undefined

  /**
   * Only supported by [`classic-level`][1] and [`rocks-level`][2], and possibly by
   * similar `abstract-level` implementations that are backed by a database on disk.
   *
   * [1]: https://github.com/Level/classic-level
   * [2]: https://github.com/Level/rocks-level
   */
  fillCache?: boolean | undefined
}

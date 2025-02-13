import {
  AbstractLevel,
  AbstractDatabaseOptions,
  AbstractOpenOptions,
  NodeCallback
} from 'abstract-level'

// Requires `npm install @types/readable-stream`.
import { Duplex } from 'readable-stream'

/**
 * Guest database that reads and writes to the host's database.
 *
 * @template KDefault The default type of keys if not overridden on operations.
 * @template VDefault The default type of values if not overridden on operations.
 */
export class ManyLevelGuest<KDefault = string, VDefault = string>
  extends AbstractLevel<Buffer, KDefault, VDefault> {
  /**
   * Database constructor.
   *
   * @param options Options.
   */
  constructor (options?: GuestDatabaseOptions<KDefault, VDefault> | undefined)

  open (): Promise<void>
  open (options: GuestOpenOptions): Promise<void>
  open (callback: NodeCallback<void>): void
  open (options: GuestOpenOptions, callback: NodeCallback<void>): void

  /**
   * Create a duplex guest stream to be piped into a host stream. Until that's done,
   * operations made on this database are queued up in memory. Will throw if
   * {@link createRpcStream()} was previously called and that stream has not (yet)
   * closed.
   */
  createRpcStream (options?: GuestRpcStreamOptions | undefined): Duplex

  /**
   * Alias to {@link createRpcStream()} for [`multileveldown`][1] API compatibility.
   *
   * [1]: https://github.com/Level/multileveldown
   */
  connect (options?: GuestRpcStreamOptions | undefined): Duplex

  /**
   * Instead of talking to a host, forward all database operations to {@link db2}. This
   * method is used by `rave-level` and serves a narrow use case. Which is to say, it may
   * not work for anything other than `rave-level`. Among other things, it assumes that
   * {@link db2} is open and that it uses the same encoding options as the guest database.
   *
   * @param db2 Another {@link AbstractLevel} database.
   */
  forward (db2: AbstractLevel<Buffer, KDefault, VDefault>): void

  /**
   * Returns `true` if there are no operations pending to be sent to a host.
   */
  isFlushed (): boolean
}

/**
 * A host that exposes a given database.
 */
export class ManyLevelHost {
  /**
   * Host constructor.
   *
   * @param db An `abstract-level` database that supports the `'buffer'` encoding (most
   * if not all do). It can also be a {@link AbstractLevel.sublevel()} which allows for
   * exposing only a specific section of the database.
   * @param options Host options.
   */
  constructor (db: AbstractLevel<Buffer, any, any>, options?: HostOptions | undefined)

  /**
   * Create a duplex host stream to be piped into a guest stream. One per guest.
   */
  createRpcStream (): Duplex
}

/**
 * Options for the {@link ManyLevelGuest} constructor.
 */
declare interface GuestDatabaseOptions<K, V> extends AbstractDatabaseOptions<K, V> {
  /**
   * If true, resend operations when reconnected. If false, abort operations when
   * disconnected, which means to yield an error on e.g. `db.get()`.
   *
   * @defaultValue `false`
   */
  retry?: boolean

  /**
   * An {@link AbstractLevel} option that has no effect on {@link ManyLevelGuest}.
   */
  createIfMissing?: boolean

  /**
   * An {@link AbstractLevel} option that has no effect on {@link ManyLevelGuest}.
   */
  errorIfExists?: boolean
}

/**
 * Options for the {@link ManyLevelGuest.open} method.
 */
declare interface GuestOpenOptions extends AbstractOpenOptions {
  /**
   * An {@link AbstractLevel} option that has no effect on {@link ManyLevelGuest}.
   */
  createIfMissing?: boolean

  /**
   * An {@link AbstractLevel} option that has no effect on {@link ManyLevelGuest}.
   */
  errorIfExists?: boolean
}

/**
 * Options for the {@link ManyLevelGuest.createRpcStream} method.
 */
declare interface GuestRpcStreamOptions {
  /**
   * An object to only keep the Node.js event loop alive while there are pending database
   * operations. Could be set to a Node.js `net` socket for example. Not relevant when
   * {@link ManyLevelGuest} is used in a browser environment.
   */
  ref?: GuestRef
}

/**
 * A socket-like object with `ref()` and `unref()` methods.
 */
declare interface GuestRef {
  /**
   * Called when there's a new database operation like `db.get()`.
   */
  ref: () => void

  /**
   * Called when all operations have finished (or when the database is closed).
   */
  unref: () => void
}

/**
 * Options for the {@link ManyLevelHost} constructor.
 */
declare interface HostOptions {
  /**
   * Reject write operations like `db.put()`.
   *
   * @defaultValue `false`
   */
  readonly?: boolean

  /**
   * A function to be called before `db.put()` operations.
   */
  preput?: (key: Buffer, value: Buffer, callback: NodeCallback<void>) => void

  /**
   * A function to be called before `db.del()` operations.
   */
  predel?: (key: Buffer, callback: NodeCallback<void>) => void

  /**
   * A function to be called before `db.batch()` operations.
   */
  prebatch?: (operations: HostBatchOperation[], callback: NodeCallback<void>) => void
}

declare type HostBatchOperation = HostBatchPutOperation | HostBatchDelOperation

/**
 * A _put_ operation to be committed by a {@link ManyLevelHost}.
 */
declare interface HostBatchPutOperation {
  /**
   * Type of operation.
   */
  type: 'put'

  /**
   * Key of the entry to be added to the database.
   */
  key: Buffer

  /**
   * Value of the entry to be added to the database.
   */
  value: Buffer
}

/**
 * A _del_ operation to be committed by a {@link ManyLevelHost}.
 */
declare interface HostBatchDelOperation {
  /**
   * Type of operation.
   */
  type: 'del'

  /**
   * Key of the entry to be deleted from the database.
   */
  key: Buffer
}

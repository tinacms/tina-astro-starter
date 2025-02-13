/**
 Copyright 2023 Forestry.io Holdings, Inc.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
import { AbstractDatabaseOptions, AbstractIterator, AbstractKeyIterator, AbstractLevel, AbstractOpenOptions, AbstractValueIterator } from 'abstract-level';
import { NextCallback } from 'abstract-level/types/abstract-iterator';
import Database from 'better-sqlite3';
export type SqliteLevelOptions<K, V> = {
    filename: string;
    readOnly?: boolean;
} & AbstractDatabaseOptions<K, V>;
declare type BatchOperation = BatchPutOperation | BatchDelOperation;
/**
 * A _put_ operation to be committed by a {@link SqliteLevel}.
 */
declare interface BatchPutOperation {
    /**
     * Type of operation.
     */
    type: 'put';
    /**
     * Key of the entry to be added to the database.
     */
    key: Buffer;
    /**
     * Value of the entry to be added to the database.
     */
    value: Buffer;
}
/**
 * A _del_ operation to be committed by a {@link SqliteLevel}.
 */
declare interface BatchDelOperation {
    /**
     * Type of operation.
     */
    type: 'del';
    /**
     * Key of the entry to be deleted from the database.
     */
    key: Buffer;
}
declare interface IteratorOptions<KDefault> {
    limit?: number;
    keyEncoding: string;
    valueEncoding: string;
    reverse: boolean;
    keys: boolean;
    values: boolean;
    gt?: KDefault;
    gte?: KDefault;
    lt?: KDefault;
    lte?: KDefault;
}
declare class SqliteIterator<KDefault, VDefault> extends AbstractIterator<SqliteLevel<KDefault, VDefault>, KDefault, VDefault> {
    private client;
    private iterator;
    constructor(db: SqliteLevel<KDefault, VDefault>, options: IteratorOptions<KDefault>, client: any);
    _next(callback: NextCallback<KDefault, VDefault>): Promise<void>;
}
declare class SqliteKeyIterator<KDefault, VDefault> extends AbstractKeyIterator<SqliteLevel<KDefault, VDefault>, KDefault> {
    private client;
    private iterator;
    constructor(db: SqliteLevel<KDefault, VDefault>, options: IteratorOptions<KDefault>, client: any);
    _next(callback: NextCallback<KDefault, VDefault>): Promise<void>;
}
declare class SqliteValueIterator<KDefault, VDefault> extends AbstractValueIterator<SqliteLevel<KDefault, VDefault>, KDefault, VDefault> {
    private client;
    private iterator;
    constructor(db: SqliteLevel<KDefault, VDefault>, options: IteratorOptions<KDefault>, client: any);
    _next(callback: NextCallback<KDefault, VDefault>): Promise<void>;
}
export declare class SqliteLevel<KDefault = string, VDefault = string> extends AbstractLevel<Buffer | Uint8Array | string, KDefault, VDefault> {
    db: Database.Database;
    private readOnly;
    constructor(options: SqliteLevelOptions<KDefault, VDefault>);
    get type(): string;
    _open(options: AbstractOpenOptions, callback: (error?: Error) => void): Promise<void>;
    _close(callback: (error?: Error) => void): Promise<void>;
    _get(key: Buffer, options: any, callback: (error?: Error, value?: Buffer) => void): Promise<void>;
    _put(key: Buffer, value: Buffer, options: any, callback: (error?: Error) => void): Promise<void>;
    _del(key: Buffer, options: any, callback: (error?: Error) => void): Promise<void>;
    _batch(batch: BatchOperation[], options: any, callback: (error?: Error) => void): Promise<void>;
    _clear(options: any, callback: (error?: Error) => void): Promise<void>;
    _iterator(options: IteratorOptions<KDefault>): SqliteIterator<KDefault, VDefault>;
    _keys(options: IteratorOptions<KDefault>): SqliteKeyIterator<KDefault, VDefault>;
    _values(options: IteratorOptions<KDefault>): SqliteValueIterator<KDefault, VDefault>;
}
export {};

/**

*/
import type { Schema } from '@tinacms/schema-tools';
import { Database } from '../database';
import { Level } from '../database/level';
export declare const setup: (rootPath: string, schema: Schema, level: Level) => Promise<{
    database: Database;
}>;
export declare const print: (fixture: Fixture) => string;
export type Fixture = {
    description?: string;
    name: string;
    assert: 'output';
    message?: string;
    expectError?: boolean;
} | {
    description?: string;
    name: string;
    assert: 'file';
    filename: string;
    message?: string;
    expectError?: boolean;
};
export declare const setupFixture: (rootPath: string, schema: Schema, level: Level, fixture: Fixture, suffix?: string, queryName?: string, folder?: string) => Promise<{
    responses: string[];
    expectedResponsePaths: string[];
}>;
export declare const setupFixture2: (rootPath: string, schema: Schema, level: Level, fixture: Fixture, suffix?: string, queryName?: string, folder?: string) => Promise<{
    responses: string[];
    expectedResponsePaths: string[];
}>;

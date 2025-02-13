import type { Cache } from './index';
export declare const makeCacheDir: (dir: string, fs: any, path: any, os: any) => Promise<string>;
export declare const NodeCache: (dir: string) => Promise<Cache>;

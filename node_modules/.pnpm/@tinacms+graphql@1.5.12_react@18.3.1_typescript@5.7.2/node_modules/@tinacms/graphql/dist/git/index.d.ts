import { CallbackFsClient, PromiseFsClient } from 'isomorphic-git';
export declare const getSha: ({ fs, dir, }: {
    fs: CallbackFsClient | PromiseFsClient;
    dir: string;
}) => Promise<string>;
export declare const getChangedFiles: ({ fs, dir, from, to, pathFilter, }: {
    fs: CallbackFsClient | PromiseFsClient;
    dir: string;
    from: string;
    to: string;
    pathFilter: Record<string, {
        matches?: string[];
    }>;
}) => Promise<{
    added: any[];
    modified: any[];
    deleted: any[];
}>;
export declare const shaExists: ({ fs, dir, sha, }: {
    fs: CallbackFsClient | PromiseFsClient;
    dir: string;
    sha: string;
}) => Promise<boolean>;

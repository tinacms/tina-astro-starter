import { CallbackFsClient, PromiseFsClient } from 'isomorphic-git';
import type { Bridge } from './index';
export type IsomorphicGitBridgeOptions = {
    gitRoot: string;
    fsModule?: CallbackFsClient | PromiseFsClient;
    commitMessage?: string;
    author: {
        name: string;
        email: string;
    };
    committer?: {
        name: string;
        email: string;
    };
    ref?: string;
    onPut?: (filepath: string, data: string) => Promise<void>;
    onDelete?: (filepath: string) => Promise<void>;
};
/**
 * Bridge backed by isomorphic-git
 */
export declare class IsomorphicBridge implements Bridge {
    rootPath: string;
    relativePath: string;
    gitRoot: string;
    fsModule: CallbackFsClient | PromiseFsClient;
    isomorphicConfig: {
        fs: CallbackFsClient | PromiseFsClient;
        dir: string;
    };
    commitMessage: string;
    author: {
        name: string;
        email: string;
    };
    committer: {
        name: string;
        email: string;
    };
    ref: string | undefined;
    private readonly onPut;
    private readonly onDelete;
    private cache;
    constructor(rootPath: string, { gitRoot, author, committer, fsModule, commitMessage, ref, onPut, onDelete, }: IsomorphicGitBridgeOptions);
    private getAuthor;
    private getCommitter;
    /**
     * Recursively populate paths matching `pattern` for the given `entry`
     *
     * @param pattern - pattern to filter paths by
     * @param entry - TreeEntry to start building list from
     * @param path - base path
     * @param results
     * @private
     */
    private listEntries;
    /**
     * For the specified path, returns an object with an array containing the parts of the path (pathParts)
     * and an array containing the WalkerEntry objects for the path parts (pathEntries). Any null elements in the
     * pathEntries are placeholders for non-existent entries.
     *
     * @param path - path being resolved
     * @param ref - ref to resolve path entries for
     * @private
     */
    private resolvePathEntries;
    /**
     * Updates tree entry and associated parent tree entries
     *
     * @param existingOid - the existing OID
     * @param updatedOid - the updated OID
     * @param path - the path of the entry being updated
     * @param type - the type of the entry being updated (blob or tree)
     * @param pathEntries - parent path entries
     * @param pathParts - parent path parts
     * @private
     */
    private updateTreeHierarchy;
    /**
     * Creates a commit for the specified tree and updates the specified ref to point to the commit
     *
     * @param treeSha - sha of the new tree
     * @param ref - the ref that should be updated
     * @private
     */
    private commitTree;
    private getRef;
    glob(pattern: string, extension: string): Promise<string[]>;
    delete(filepath: string): Promise<void>;
    private qualifyPath;
    private unqualifyPath;
    get(filepath: string): Promise<string>;
    put(filepath: string, data: string): Promise<void>;
}

import type { Bridge } from './index';
/**
 * This is the bridge from whatever datasource we need for I/O.
 * The basic example here is for the filesystem, one is needed
 * for GitHub has well.
 */
export declare class FilesystemBridge implements Bridge {
    rootPath: string;
    outputPath?: string;
    constructor(rootPath: string, outputPath?: string);
    glob(pattern: string, extension: string): Promise<string[]>;
    delete(filepath: string): Promise<void>;
    get(filepath: string): Promise<string>;
    put(filepath: string, data: string, basePathOverride?: string): Promise<void>;
}
/**
 * Same as the `FileSystemBridge` except it does not save files
 */
export declare class AuditFileSystemBridge extends FilesystemBridge {
    put(filepath: string, data: string): Promise<void>;
}

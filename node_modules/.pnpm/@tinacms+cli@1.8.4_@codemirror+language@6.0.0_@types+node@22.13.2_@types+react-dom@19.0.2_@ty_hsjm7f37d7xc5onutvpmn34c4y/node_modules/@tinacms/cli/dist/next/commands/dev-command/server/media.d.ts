import type { Connect } from 'vite';
import type { ServerResponse } from 'http';
export declare const createMediaRouter: (config: PathConfig) => {
    handleList: (req: any, res: any) => Promise<void>;
    handleDelete: (req: Connect.IncomingMessage, res: any) => Promise<void>;
    handlePost: (req: Connect.IncomingMessage, res: ServerResponse) => Promise<void>;
};
export declare const parseMediaFolder: (str: string) => string;
interface MediaArgs {
    searchPath: string;
    cursor?: string;
    limit?: string;
}
interface File {
    src: string;
    filename: string;
    size: number;
}
interface ListMediaRes {
    directories: string[];
    files: File[];
    cursor?: string;
    error?: string;
}
export interface PathConfig {
    rootPath: string;
    apiURL: string;
    publicFolder: string;
    mediaRoot: string;
}
type SuccessRecord = {
    ok: true;
} | {
    ok: false;
    message: string;
};
export declare class MediaModel {
    readonly rootPath: string;
    readonly publicFolder: string;
    readonly mediaRoot: string;
    constructor({ rootPath, publicFolder, mediaRoot }: PathConfig);
    listMedia(args: MediaArgs): Promise<ListMediaRes>;
    deleteMedia(args: MediaArgs): Promise<SuccessRecord>;
}
export {};

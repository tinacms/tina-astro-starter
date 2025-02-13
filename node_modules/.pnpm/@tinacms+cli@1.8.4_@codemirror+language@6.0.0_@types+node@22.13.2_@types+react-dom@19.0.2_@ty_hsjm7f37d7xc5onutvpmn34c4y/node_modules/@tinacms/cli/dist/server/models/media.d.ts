/**

*/
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

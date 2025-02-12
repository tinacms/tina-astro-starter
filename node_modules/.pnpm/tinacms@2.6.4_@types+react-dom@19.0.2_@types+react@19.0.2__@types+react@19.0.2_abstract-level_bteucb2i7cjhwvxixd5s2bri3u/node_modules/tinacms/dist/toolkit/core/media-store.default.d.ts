import { Media, MediaStore, MediaUploadOptions, MediaList, MediaListOptions } from './media';
import { CMS } from './cms';
export declare class DummyMediaStore implements MediaStore {
    accept: string;
    persist(files: MediaUploadOptions[]): Promise<Media[]>;
    list(): Promise<MediaList>;
    delete(): Promise<void>;
}
interface StaticMediaItem {
    id: string;
    filename: string;
    src: string;
    directory: string;
    thumbnails: {
        '75x75': string;
        '400x400': string;
        '1000x1000': string;
    };
    type: 'file' | 'dir';
    children?: StaticMedia;
}
export interface StaticMedia {
    [offset: string]: StaticMediaItem[];
}
export declare class TinaMediaStore implements MediaStore {
    fetchFunction: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
    private api;
    private cms;
    private isLocal;
    private url;
    private staticMedia;
    isStatic?: boolean;
    constructor(cms: CMS, staticMedia?: StaticMedia);
    setup(): void;
    isAuthenticated(): Promise<boolean>;
    accept: string;
    maxSize: number;
    private persist_cloud;
    private persist_local;
    persist(media: MediaUploadOptions[]): Promise<Media[]>;
    private genThumbnail;
    list(options?: MediaListOptions): Promise<MediaList>;
    parse: (img: any) => any;
    delete(media: Media): Promise<void>;
}
export {};

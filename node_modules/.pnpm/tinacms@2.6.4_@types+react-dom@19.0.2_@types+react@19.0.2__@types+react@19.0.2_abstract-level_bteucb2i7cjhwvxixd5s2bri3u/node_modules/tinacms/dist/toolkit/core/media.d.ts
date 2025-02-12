import { EventBus } from './event';
/**
 * Represents an individual file in the MediaStore
 */
export interface Media {
    type: 'file' | 'dir';
    /**
     * A unique identifier for this file.
     */
    id: string;
    /**
     * The name of the file.
     */
    filename: string;
    /**
     * The directory where the file is stored.
     */
    directory: string;
    /**
     * A url that provides an image of the media file
     */
    src?: string;
    /**
     * A url that provides a smaller image of the media file
     */
    thumbnails?: {
        [name: string]: string;
    };
}
export interface MediaUploadOptions {
    /**
     * The directory where the file should be stored.
     */
    directory: string;
    /**
     * The File to be uploaded.
     */
    file: File;
}
/**
 * Represents some external service for storing and
 * managing media.
 */
export interface MediaStore {
    /**
     * The [input accept string](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept)
     * that describes what kind of files the Media Store will accept.
     */
    accept: string;
    /**
     * The maximum size of a file that can be uploaded.
     */
    maxSize?: number;
    /**
     * Uploads a set of files to the Media Store and
     * returns a Promise containing the Media objects
     * for those files.
     */
    persist(files: MediaUploadOptions[]): Promise<Media[]>;
    /**
     * Delete a media object from the store.
     */
    delete(media: Media): Promise<void>;
    /**
     * Lists all media in a specific directory.
     */
    list(options?: MediaListOptions): Promise<MediaList>;
    /**
     * Indicates that uploads and deletions are not supported
     *
     * @default false
     */
    isStatic?: boolean;
}
export declare type MediaListOffset = string | number;
/**
 * The options available when listing media.
 */
export interface MediaListOptions {
    directory?: string;
    limit?: number;
    offset?: MediaListOffset;
    thumbnailSizes?: {
        w: number;
        h: number;
    }[];
    filesOnly?: boolean;
}
/**
 * The response returned from listing media.
 */
export interface MediaList {
    items: Media[];
    nextOffset?: MediaListOffset;
}
/**
 * The central object for all things media.
 *
 * Meant to be placed directly on the `cms`
 *
 * ```ts
 * cms.media = new MediaManager({
 *   accept: '*',
 *   async persist(files) {
 *     // do something
 *   }
 * })
 * ```
 */
export declare class MediaManager implements MediaStore {
    store: MediaStore;
    private events;
    private _pageSize;
    constructor(store: MediaStore, events: EventBus);
    get isConfigured(): boolean;
    get pageSize(): number;
    set pageSize(pageSize: number);
    open(options?: SelectMediaOptions): void;
    get accept(): string;
    get maxSize(): number;
    persist(files: MediaUploadOptions[]): Promise<Media[]>;
    delete(media: Media): Promise<void>;
    list(options: MediaListOptions): Promise<MediaList>;
}
export interface SelectMediaOptions {
    allowDelete?: boolean;
    directory?: string;
    onSelect?(media: Media): void;
}
interface MediaListErrorConfig {
    title: string;
    message: string;
    docsLink: string;
}
export declare class MediaListError extends Error {
    ERR_TYPE: string;
    title: string;
    docsLink: string;
    constructor(config: MediaListErrorConfig);
}
export declare const E_UNAUTHORIZED: MediaListError;
export declare const E_BAD_ROUTE: MediaListError;
export declare const E_DEFAULT: MediaListError;
export {};

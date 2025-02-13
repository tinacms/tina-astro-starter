import { MediaStore, MediaUploadOptions, Media, MediaListOptions, MediaList } from '../core';
import { GitClient } from './git-client';
export declare class GitMediaStore implements MediaStore {
    private client;
    accept: string;
    constructor(client: GitClient);
    persist(files: MediaUploadOptions[]): Promise<Media[]>;
    list(options?: MediaListOptions): Promise<MediaList>;
    delete(media: Media): Promise<void>;
}
export declare const nextOffset: (offset: number, limit: number, count: number) => number;

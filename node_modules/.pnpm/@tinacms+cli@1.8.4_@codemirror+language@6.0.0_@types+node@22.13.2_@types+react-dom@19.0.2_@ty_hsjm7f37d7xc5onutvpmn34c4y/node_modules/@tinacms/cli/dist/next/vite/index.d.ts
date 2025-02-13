import type { Database } from '@tinacms/graphql';
import { type BuildOptions, type InlineConfig, type Plugin } from 'vite';
import type { ConfigManager } from '../config-manager';
/**
 * This type is duplicated in he `TinaMediaStore`
 * It represents the files that are available at build time
 * and can be referenced in the media manager
 */
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
export declare const createConfig: ({ configManager, apiURL, plugins, noWatch, rollupOptions, }: {
    configManager: ConfigManager;
    database: Database;
    apiURL: string;
    noWatch: boolean;
    plugins?: Plugin[];
    rollupOptions?: BuildOptions["rollupOptions"];
}) => Promise<InlineConfig>;
export {};

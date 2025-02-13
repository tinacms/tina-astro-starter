import type { Plugin } from 'vite';
import { FilterPattern } from '@rollup/pluginutils';
import type { Config } from '@svgr/core';
import { transformWithEsbuild } from 'vite';
import type { Database } from '@tinacms/graphql';
import type { ConfigManager } from '../config-manager';
export declare const transformTsxPlugin: ({ configManager: _configManager, }: {
    configManager: ConfigManager;
}) => Plugin;
export declare const devServerEndPointsPlugin: ({ configManager, apiURL, database, searchIndex, }: {
    apiURL: string;
    database: Database;
    configManager: ConfigManager;
    searchIndex: any;
}) => Plugin;
export interface ViteSvgrOptions {
    /**
     * Export React component as default. Notice that it will overrides
     * the default behavior of Vite, which exports the URL as default
     *
     * @default false
     */
    exportAsDefault?: boolean;
    svgrOptions?: Config;
    esbuildOptions?: Parameters<typeof transformWithEsbuild>[2];
    exclude?: FilterPattern;
    include?: FilterPattern;
}
export declare function viteTransformExtension({ exportAsDefault, svgrOptions, esbuildOptions, include, exclude, }?: ViteSvgrOptions): Plugin;

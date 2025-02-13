import type { Database } from '@tinacms/graphql';
import { ConfigManager } from '../../../config-manager';
export declare const createDevServer: (configManager: ConfigManager, database: Database, searchIndex: any, apiURL: string, noWatch: boolean) => Promise<import("vite").ViteDevServer>;

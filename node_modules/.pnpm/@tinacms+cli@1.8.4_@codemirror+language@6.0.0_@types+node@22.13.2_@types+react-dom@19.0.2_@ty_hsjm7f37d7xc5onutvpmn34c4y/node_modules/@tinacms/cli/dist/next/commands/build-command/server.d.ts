import { Database } from '@tinacms/graphql';
import { ConfigManager } from '../../config-manager';
export declare const buildProductionSpa: (configManager: ConfigManager, database: Database, apiURL: string) => Promise<import("rollup").RollupOutput | import("rollup").RollupOutput[] | import("rollup").RollupWatcher>;

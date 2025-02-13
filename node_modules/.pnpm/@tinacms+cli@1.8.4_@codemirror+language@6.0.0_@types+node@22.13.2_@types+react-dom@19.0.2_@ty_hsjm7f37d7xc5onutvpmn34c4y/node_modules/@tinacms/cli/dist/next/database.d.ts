import { Database, Bridge } from '@tinacms/graphql';
import { ConfigManager } from './config-manager';
export declare const createDBServer: (port: number) => void;
export declare function createAndInitializeDatabase(configManager: ConfigManager, datalayerPort: number, bridgeOverride?: Bridge): Promise<Database>;

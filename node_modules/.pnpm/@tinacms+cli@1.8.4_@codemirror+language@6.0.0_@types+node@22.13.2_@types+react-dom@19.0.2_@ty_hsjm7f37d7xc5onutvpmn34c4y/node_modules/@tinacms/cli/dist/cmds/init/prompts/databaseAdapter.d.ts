import type { Config, PromptDatabaseAdapter } from './types';
import type { Framework } from '../';
export declare const chooseDatabaseAdapter: ({ framework, config, }: {
    config: Config;
    framework: Framework;
}) => Promise<PromptDatabaseAdapter>;

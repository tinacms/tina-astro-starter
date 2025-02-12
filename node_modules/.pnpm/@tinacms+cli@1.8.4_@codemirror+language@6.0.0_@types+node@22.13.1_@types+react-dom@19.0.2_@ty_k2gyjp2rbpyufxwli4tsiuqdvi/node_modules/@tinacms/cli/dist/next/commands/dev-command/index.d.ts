import { Database } from '@tinacms/graphql';
import { ConfigManager } from '../../config-manager';
import { BaseCommand } from '../baseCommands';
import { SearchIndexer } from '@tinacms/search';
export declare class DevCommand extends BaseCommand {
    static paths: string[][];
    watchFolders: string;
    noWatch: boolean;
    outputSearchIndexPath: string;
    static usage: import("clipanion").Usage;
    catch(error: any): Promise<void>;
    logDeprecationWarnings(): void;
    execute(): Promise<number | void>;
    watchContentFiles(configManager: ConfigManager, database: Database, searchIndexer?: SearchIndexer): void;
    watchQueries(configManager: ConfigManager, callback: () => Promise<string>): void;
}

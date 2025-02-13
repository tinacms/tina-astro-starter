import { Command } from 'clipanion';
import type { DocumentNode } from 'graphql';
import type { Database } from '@tinacms/graphql';
import type { TinaSchema } from '@tinacms/schema-tools';
import { ConfigManager } from '../config-manager';
/**
 * Base Command for Dev and build
 */
export declare abstract class BaseCommand extends Command {
    experimentalDataLayer: boolean;
    isomorphicGitBridge: boolean;
    port: string;
    datalayerPort: string;
    subCommand: string;
    rootPath: string;
    verbose: boolean;
    noSDK: boolean;
    noTelemetry: boolean;
    abstract execute(): Promise<number | void>;
    startSubCommand(): Promise<void>;
    logDeprecationWarnings(): void;
    indexContentWithSpinner({ database, graphQLSchema, tinaSchema, configManager, partialReindex, text, }: {
        database: Database;
        graphQLSchema: DocumentNode;
        tinaSchema: TinaSchema;
        configManager: ConfigManager;
        partialReindex?: boolean;
        text?: string;
    }): Promise<void>;
}

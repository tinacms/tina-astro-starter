import type { Loader } from 'esbuild';
import { Config } from '@tinacms/schema-tools';
export declare const TINA_FOLDER = "tina";
export declare const LEGACY_TINA_FOLDER = ".tina";
export declare const GENERATED_FOLDER = "__generated__";
export declare class ConfigManager {
    config: Config;
    rootPath: string;
    tinaFolderPath: string;
    isUsingLegacyFolder: boolean;
    tinaConfigFilePath: string;
    tinaSpaPackagePath: string;
    contentRootPath?: string;
    envFilePath: string;
    generatedCachePath: string;
    generatedFolderPath: string;
    generatedFolderPathContentRepo: string;
    generatedGraphQLGQLPath: string;
    generatedGraphQLJSONPath: string;
    generatedSchemaJSONPath: string;
    generatedLookupJSONPath: string;
    generatedTypesTSFilePath: string;
    generatedTypesJSFilePath: string;
    generatedTypesDFilePath: string;
    generatedClientTSFilePath: string;
    generatedClientJSFilePath: string;
    generatedClientDFilePath: string;
    generatedDatabaseClientJSFilePath: string;
    generatedDatabaseClientTSFilePath: string;
    generatedDatabaseClientDFilePath: string;
    generatedQueriesFilePath: string;
    generatedFragmentsFilePath: string;
    generatedQueriesAndFragmentsGlob: string;
    userQueriesAndFragmentsGlob: string;
    publicFolderPath: string;
    outputFolderPath: string;
    outputHTMLFilePath: string;
    outputGitignorePath: string;
    selfHostedDatabaseFilePath?: string;
    prebuildFilePath?: string;
    spaRootPath: string;
    spaMainPath: string;
    spaHTMLPath: string;
    tinaGraphQLVersionFromCLI?: string;
    legacyNoSDK?: boolean;
    watchList?: string[];
    constructor({ rootPath, tinaGraphQLVersion, legacyNoSDK, }: {
        rootPath: string;
        tinaGraphQLVersion?: string;
        legacyNoSDK?: boolean;
    });
    isUsingTs(): boolean;
    hasSelfHostedConfig(): boolean;
    hasSeparateContentRoot(): boolean;
    shouldSkipSDK(): boolean;
    processConfig(): Promise<void>;
    getTinaFolderPath(rootPath: any): Promise<string>;
    getTinaGraphQLVersion(): {
        fullVersion: string;
        major: string;
        minor: string;
        patch: string;
    };
    printGeneratedClientFilePath(): string;
    printGeneratedTypesFilePath(): string;
    printoutputHTMLFilePath(): string;
    printRelativePath(filename: string): string;
    printPrebuildFilePath(): string;
    printContentRelativePath(filename: string): string;
    /**
     * Given a filepath without an extension, find the first match (eg. tsx, ts, jsx, js)
     */
    getPathWithExtension(filepath: string): Promise<string>;
    loadDatabaseFile(): Promise<any>;
    loadConfigFile(generatedFolderPath: string, configFilePath: string): Promise<{
        config: any;
        prebuildPath: string;
        watchList: any[];
    }>;
}
export declare const loaders: {
    [ext: string]: Loader;
};

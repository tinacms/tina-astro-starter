import { Config } from '../prompts';
export type ConfigTemplateArgs = {
    extraText?: string;
    publicFolder: string;
    collections?: string;
    isLocalEnvVarName?: string;
    config: Config;
    isForestryMigration?: boolean;
    selfHosted?: boolean;
};
export declare const generateConfig: (args: ConfigTemplateArgs) => string;

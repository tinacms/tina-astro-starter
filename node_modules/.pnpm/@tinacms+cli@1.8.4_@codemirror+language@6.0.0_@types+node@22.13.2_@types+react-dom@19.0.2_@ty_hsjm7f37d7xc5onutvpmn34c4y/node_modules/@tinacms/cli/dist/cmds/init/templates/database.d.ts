import type { Config } from '../prompts';
export type Variables = {
    isLocalEnvVarName: string;
};
export type DatabaseAdapterTypes = 'upstash-redis';
export declare const databaseTemplate: ({ config }: {
    config: Config;
}) => string;

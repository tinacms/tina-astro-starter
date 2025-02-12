/**

*/
import type { GraphQLConfig } from './types';
import type { Database } from './database';
export declare const resolve: ({ config, query, variables, database, silenceErrors, verbose, isAudit, ctxUser, }: {
    config?: GraphQLConfig;
    query: string;
    variables: object;
    database: Database;
    silenceErrors?: boolean;
    verbose?: boolean;
    isAudit?: boolean;
    ctxUser?: {
        sub: string;
    };
}) => Promise<import("graphql").ExecutionResult<{
    [key: string]: any;
}, {
    [key: string]: any;
}>>;

/**

*/
import { Client } from '../internalClient';
import type { TinaIOConfig } from '../internalClient';
import * as yup from 'yup';
import { Schema } from '@tinacms/schema-tools';
export interface CreateClientProps {
    clientId?: string;
    isLocalClient?: boolean;
    isSelfHosted?: boolean;
    tinaioConfig?: TinaIOConfig;
    owner?: string;
    repo?: string;
    branch?: string;
    schema?: Schema;
    apiUrl?: string;
    tinaGraphQLVersion: string;
}
export declare const createClient: ({ clientId, isLocalClient, branch, tinaioConfig, schema, apiUrl, tinaGraphQLVersion, }: CreateClientProps) => Client;
export declare function assertShape<T>(value: unknown, yupSchema: (args: typeof yup) => yup.AnySchema, errorMessage?: string): asserts value is T;
export declare function safeAssertShape<T>(value: unknown, yupSchema: (args: typeof yup) => yup.AnySchema): boolean;

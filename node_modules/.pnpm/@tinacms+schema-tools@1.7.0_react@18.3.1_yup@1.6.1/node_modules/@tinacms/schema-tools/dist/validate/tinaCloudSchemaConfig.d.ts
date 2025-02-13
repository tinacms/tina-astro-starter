/**

*/
import { Config } from '../types/index';
import z from 'zod';
export declare const tinaConfigZod: z.ZodObject<{
    client: z.ZodOptional<z.ZodObject<{
        referenceDepth: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        referenceDepth?: number;
    }, {
        referenceDepth?: number;
    }>>;
    media: z.ZodOptional<z.ZodObject<{
        tina: z.ZodOptional<z.ZodObject<{
            publicFolder: z.ZodString;
            mediaRoot: z.ZodString;
            static: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        }, "strict", z.ZodTypeAny, {
            publicFolder?: string;
            mediaRoot?: string;
            static?: boolean;
        }, {
            publicFolder?: string;
            mediaRoot?: string;
            static?: boolean;
        }>>;
        loadCustomStore: z.ZodOptional<z.ZodFunction<z.ZodTuple<[], z.ZodUnknown>, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        tina?: {
            publicFolder?: string;
            mediaRoot?: string;
            static?: boolean;
        };
        loadCustomStore?: (...args: unknown[]) => unknown;
    }, {
        tina?: {
            publicFolder?: string;
            mediaRoot?: string;
            static?: boolean;
        };
        loadCustomStore?: (...args: unknown[]) => unknown;
    }>>;
    search: z.ZodOptional<z.ZodObject<{
        tina: z.ZodOptional<z.ZodObject<{
            indexerToken: z.ZodOptional<z.ZodString>;
            stopwordLanguages: z.ZodOptional<z.ZodArray<z.ZodString, "atleastone">>;
            tokenSplitRegex: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            indexerToken?: string;
            stopwordLanguages?: [string, ...string[]];
            tokenSplitRegex?: string;
        }, {
            indexerToken?: string;
            stopwordLanguages?: [string, ...string[]];
            tokenSplitRegex?: string;
        }>>;
        searchClient: z.ZodOptional<z.ZodAny>;
        indexBatchSize: z.ZodOptional<z.ZodNumber>;
        maxSearchIndexFieldLength: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        maxSearchIndexFieldLength?: number;
        tina?: {
            indexerToken?: string;
            stopwordLanguages?: [string, ...string[]];
            tokenSplitRegex?: string;
        };
        searchClient?: any;
        indexBatchSize?: number;
    }, {
        maxSearchIndexFieldLength?: number;
        tina?: {
            indexerToken?: string;
            stopwordLanguages?: [string, ...string[]];
            tokenSplitRegex?: string;
        };
        searchClient?: any;
        indexBatchSize?: number;
    }>>;
}, "strip", z.ZodTypeAny, {
    search?: {
        maxSearchIndexFieldLength?: number;
        tina?: {
            indexerToken?: string;
            stopwordLanguages?: [string, ...string[]];
            tokenSplitRegex?: string;
        };
        searchClient?: any;
        indexBatchSize?: number;
    };
    client?: {
        referenceDepth?: number;
    };
    media?: {
        tina?: {
            publicFolder?: string;
            mediaRoot?: string;
            static?: boolean;
        };
        loadCustomStore?: (...args: unknown[]) => unknown;
    };
}, {
    search?: {
        maxSearchIndexFieldLength?: number;
        tina?: {
            indexerToken?: string;
            stopwordLanguages?: [string, ...string[]];
            tokenSplitRegex?: string;
        };
        searchClient?: any;
        indexBatchSize?: number;
    };
    client?: {
        referenceDepth?: number;
    };
    media?: {
        tina?: {
            publicFolder?: string;
            mediaRoot?: string;
            static?: boolean;
        };
        loadCustomStore?: (...args: unknown[]) => unknown;
    };
}>;
export declare const validateTinaCloudSchemaConfig: (config: unknown) => Config;

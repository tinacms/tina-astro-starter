import type { SearchClient } from '../types';
import { MemoryLevel } from 'memory-level';
type TinaSearchIndexerClientOptions = {
    stopwordLanguages?: string[];
    tokenSplitRegex?: string;
};
type TinaCloudSearchIndexerClientOptions = {
    apiUrl: string;
    branch: string;
    indexerToken: string;
} & TinaSearchIndexerClientOptions;
export declare class LocalSearchIndexClient implements SearchClient {
    searchIndex: any;
    protected readonly memoryLevel: MemoryLevel;
    private readonly stopwords;
    private readonly tokenSplitRegex;
    constructor(options: TinaSearchIndexerClientOptions);
    onStartIndexing(): Promise<void>;
    put(docs: any[]): Promise<any>;
    del(ids: string[]): Promise<any>;
    query(query: string, options: {
        cursor?: string;
        limit?: number;
    } | undefined): Promise<{
        results: any[];
        total: number;
        nextCursor: string | null;
        prevCursor: string | null;
    }>;
    export(filename: string): Promise<void>;
}
export declare class TinaCMSSearchIndexClient extends LocalSearchIndexClient {
    private readonly apiUrl;
    private readonly branch;
    private readonly indexerToken;
    constructor(options: TinaCloudSearchIndexerClientOptions);
    onFinishIndexing(): Promise<void>;
}
export {};

import { TinaSchema } from '@tinacms/schema-tools';
import { Bridge } from '@tinacms/graphql';
import { SearchClient } from '../types';
type SearchIndexOptions = {
    batchSize?: number;
    bridge: Bridge;
    client: SearchClient;
    schema: TinaSchema;
    textIndexLength?: number;
};
export declare class SearchIndexer {
    private readonly batchSize;
    private readonly client;
    private readonly bridge;
    private readonly schema;
    private readonly textIndexLength;
    constructor(options: SearchIndexOptions);
    private makeIndexerCallback;
    indexContentByPaths(documentPaths: string[]): Promise<void>;
    indexAllContent(): Promise<{
        warnings: string[];
    }>;
    deleteIndexContent(documentPaths: string[]): Promise<void>;
}
export {};

export type { SearchClient } from './types';
export { processDocumentForIndexing } from './indexer/utils';
export declare const queryToSearchIndexQuery: (query: string, stopwordLanguages?: string[]) => any;
export declare const optionsToSearchIndexOptions: (options?: {
    limit?: number;
    cursor?: string;
}) => {};
export declare const parseSearchIndexResponse: (data: any, options?: {
    limit?: number;
    cursor?: string;
}) => {
    results: any;
    total: any;
    prevCursor: any;
    nextCursor: string;
};

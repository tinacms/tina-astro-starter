import { StorageAPI } from './base';
import { QueryStore, QueryStoreItem } from './query';
export declare class HistoryStore {
    private storage;
    private maxHistoryLength;
    queries: Array<QueryStoreItem>;
    history: QueryStore;
    favorite: QueryStore;
    constructor(storage: StorageAPI, maxHistoryLength: number);
    private shouldSaveQuery;
    updateHistory: (query?: string | undefined, variables?: string | undefined, headers?: string | undefined, operationName?: string | undefined) => void;
    toggleFavorite(query?: string, variables?: string, headers?: string, operationName?: string, label?: string, favorite?: boolean): void;
    editLabel(query?: string, variables?: string, headers?: string, operationName?: string, label?: string, favorite?: boolean): void;
}
//# sourceMappingURL=history.d.ts.map
import { parse } from 'graphql';
import { QueryStore } from './query';
const MAX_QUERY_SIZE = 100000;
export class HistoryStore {
    constructor(storage, maxHistoryLength) {
        this.storage = storage;
        this.maxHistoryLength = maxHistoryLength;
        this.updateHistory = (query, variables, headers, operationName) => {
            if (this.shouldSaveQuery(query, variables, headers, this.history.fetchRecent())) {
                this.history.push({
                    query,
                    variables,
                    headers,
                    operationName,
                });
                const historyQueries = this.history.items;
                const favoriteQueries = this.favorite.items;
                this.queries = historyQueries.concat(favoriteQueries);
            }
        };
        this.history = new QueryStore('queries', this.storage, this.maxHistoryLength);
        this.favorite = new QueryStore('favorites', this.storage, null);
        this.queries = [...this.history.fetchAll(), ...this.favorite.fetchAll()];
    }
    shouldSaveQuery(query, variables, headers, lastQuerySaved) {
        if (!query) {
            return false;
        }
        try {
            parse(query);
        }
        catch (_a) {
            return false;
        }
        if (query.length > MAX_QUERY_SIZE) {
            return false;
        }
        if (!lastQuerySaved) {
            return true;
        }
        if (JSON.stringify(query) === JSON.stringify(lastQuerySaved.query)) {
            if (JSON.stringify(variables) === JSON.stringify(lastQuerySaved.variables)) {
                if (JSON.stringify(headers) === JSON.stringify(lastQuerySaved.headers)) {
                    return false;
                }
                if (headers && !lastQuerySaved.headers) {
                    return false;
                }
            }
            if (variables && !lastQuerySaved.variables) {
                return false;
            }
        }
        return true;
    }
    toggleFavorite(query, variables, headers, operationName, label, favorite) {
        const item = {
            query,
            variables,
            headers,
            operationName,
            label,
        };
        if (!this.favorite.contains(item)) {
            item.favorite = true;
            this.favorite.push(item);
        }
        else if (favorite) {
            item.favorite = false;
            this.favorite.delete(item);
        }
        this.queries = [...this.history.items, ...this.favorite.items];
    }
    editLabel(query, variables, headers, operationName, label, favorite) {
        const item = {
            query,
            variables,
            headers,
            operationName,
            label,
        };
        if (favorite) {
            this.favorite.edit(Object.assign(Object.assign({}, item), { favorite }));
        }
        else {
            this.history.edit(item);
        }
        this.queries = [...this.history.items, ...this.favorite.items];
    }
}
//# sourceMappingURL=history.js.map
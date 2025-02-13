import { QueryStoreItem } from '@graphiql/toolkit';
import { ReactNode } from 'react';
export declare type HistoryContextType = {
    /**
     * Add an operation to the history.
     * @param operation The operation that was executed, consisting of the query,
     * variables, headers and the operation name.
     */
    addToHistory(operation: {
        query?: string;
        variables?: string;
        headers?: string;
        operationName?: string;
    }): void;
    /**
     * Change the custom label of an item from the history.
     * @param args An object containing the label (`undefined` if it should be
     * unset) and properties that identify the history item that the label should
     * be applied to. (This can result in the label being applied to multiple
     * history items.)
     */
    editLabel(args: {
        query?: string;
        variables?: string;
        headers?: string;
        operationName?: string;
        label?: string;
        favorite?: boolean;
    }): void;
    /**
     * The list of history items.
     */
    items: readonly QueryStoreItem[];
    /**
     * Toggle the favorite state of an item from the history.
     * @param args An object containing the favorite state (`undefined` if it
     * should be unset) and properties that identify the history item that the
     * label should be applied to. (This can result in the label being applied
     * to multiple history items.)
     */
    toggleFavorite(args: {
        query?: string;
        variables?: string;
        headers?: string;
        operationName?: string;
        label?: string;
        favorite?: boolean;
    }): void;
};
export declare const HistoryContext: import("react").Context<HistoryContextType | null>;
export declare type HistoryContextProviderProps = {
    children: ReactNode;
    /**
     * The maximum number of executed operations to store.
     * @default 20
     */
    maxHistoryLength?: number;
};
export declare function HistoryContextProvider(props: HistoryContextProviderProps): import("react/jsx-runtime").JSX.Element;
export declare const useHistoryContext: {
    (options: {
        nonNull: true;
        caller?: Function | undefined;
    }): HistoryContextType;
    (options: {
        nonNull?: boolean | undefined;
        caller?: Function | undefined;
    }): HistoryContextType | null;
    (): HistoryContextType | null;
};

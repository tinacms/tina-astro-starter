import { QueryStoreItem } from '@graphiql/toolkit';
import './style.css';
export declare function History(): import("react/jsx-runtime").JSX.Element;
declare type QueryHistoryItemProps = {
    item: QueryStoreItem;
};
export declare function HistoryItem(props: QueryHistoryItemProps): import("react/jsx-runtime").JSX.Element;
export declare function formatQuery(query?: string): string | undefined;
export {};

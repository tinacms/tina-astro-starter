export type FilterValue = string[] | string;
export type CollectionFilters = Record<string, FilterValue> | (() => Record<string, FilterValue>);
export declare const filterQueryBuilder: (fieldFilterConfig: FilterValue, collection: string) => {
    [x: string]: Record<string, Record<string, FilterValue>>;
};

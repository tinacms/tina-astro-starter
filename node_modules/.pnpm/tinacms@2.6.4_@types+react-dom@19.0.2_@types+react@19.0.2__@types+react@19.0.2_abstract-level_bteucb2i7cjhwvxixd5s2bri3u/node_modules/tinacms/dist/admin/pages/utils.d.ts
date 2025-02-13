export type CollectionFolder = {
    loading: boolean;
    name: string;
    fullyQualifiedName: string;
    parentName: string;
};
export declare const parentFolder: (folder: CollectionFolder) => {
    name: string;
    fullyQualifiedName: string;
    parentName: string;
    loading: boolean;
};
export declare const useCollectionFolder: () => CollectionFolder;

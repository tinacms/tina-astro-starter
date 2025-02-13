type Node = {
    name?: string;
    value?: string;
    namespace?: string[];
    [key: string]: any;
};
export declare function addNamespaceToSchema<T extends Node | string>(maybeNode: T, namespace?: string[]): T;
export {};

export interface PathConfig {
    apiURL: string;
    searchPath: string;
}
export declare const createSearchIndexRouter: ({ config, searchIndex, }: {
    config: PathConfig;
    searchIndex: any;
}) => {
    del: (req: any, res: any) => Promise<void>;
    get: (req: any, res: any) => Promise<void>;
    put: (req: any, res: any) => Promise<void>;
};

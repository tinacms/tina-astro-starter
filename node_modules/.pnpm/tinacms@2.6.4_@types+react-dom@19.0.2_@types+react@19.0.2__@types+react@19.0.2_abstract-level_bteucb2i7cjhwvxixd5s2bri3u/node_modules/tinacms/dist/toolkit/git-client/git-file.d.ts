import { CMS } from '../core';
export declare class GitFile {
    private cms;
    relativePath: string;
    format: (file: any) => string;
    parse: (content: string) => any;
    constructor(cms: CMS, relativePath: string, format: (file: any) => string, parse: (content: string) => any);
    /**
     * Load the contents of this file at HEAD
     */
    show: () => Promise<any>;
    commit: () => Promise<void>;
    reset: () => void;
    write: (values: any) => void;
    private get git();
}

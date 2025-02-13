import log4js from 'log4js';
export declare const logger: log4js.Logger;
export declare const note: (message?: string, title?: string) => void;
export declare const log: (message?: string) => void;
export declare const warn: (message?: string, path?: string) => void;
export declare const err: (message?: string, path?: string) => void;
export declare const tnote: (message?: string, title?: string) => void;
export declare const summary: (content: {
    heading: string;
    items: {
        heading: string;
        emoji: string;
        subItems: {
            key: string;
            value: string;
        }[];
    }[];
}) => void;

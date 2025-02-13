import type { Extension } from 'micromark-util-types';
import type { Acorn, AcornOptions } from 'micromark-factory-mdx-expression';
export type Pattern = {
    start: string;
    end: string;
    name: string;
    templateName: string;
    type: 'inline' | 'flow';
    leaf: boolean;
};
export type Options = {
    acorn?: Acorn;
    acornOptions?: AcornOptions;
    patterns?: Pattern[];
    addResult?: boolean;
    skipHTML?: boolean;
};
export declare function mdxJsx(options?: Options): Extension;

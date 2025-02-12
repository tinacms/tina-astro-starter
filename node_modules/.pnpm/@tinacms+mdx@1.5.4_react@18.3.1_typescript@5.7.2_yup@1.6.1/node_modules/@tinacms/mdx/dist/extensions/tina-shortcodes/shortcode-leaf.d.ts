import type { Pattern } from '../../stringify';
import type { Construct } from 'micromark-util-types';
export declare const findCode: (string: string | undefined | null) => number | null;
export declare const printCode: (num: number) => void;
export declare const directiveLeaf: (pattern: Pattern) => Construct;

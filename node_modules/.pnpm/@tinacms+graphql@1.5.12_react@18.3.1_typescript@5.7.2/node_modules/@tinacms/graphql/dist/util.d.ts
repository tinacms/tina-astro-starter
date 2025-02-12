/**

*/
import * as yup from 'yup';
/**
 * Iterate through an array of promises sequentially, ensuring the order
 * is preserved.
 *
 * ```js
 * await sequential(templates, async (template) => {
 *   await doSomething(template)
 * })
 * ```
 */
export declare const sequential: <A, B>(items: A[] | undefined, callback: (args: A, idx: number) => Promise<B>) => Promise<B[]>;
export declare function assertShape<T>(value: unknown, yupSchema: (args: typeof yup) => yup.AnySchema, errorMessage?: string): asserts value is T;
export declare const atob: (b64Encoded: string) => string;
export declare const btoa: (string: string) => string;
export declare const lastItem: (arr: (number | string)[]) => string | number;
export declare const get: (obj: any, path: any, defaultValue?: any) => any;
export declare const flattenDeep: (arr: any) => any;

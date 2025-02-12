/**

*/
import * as yup from 'yup';
import type { AnySchema } from 'yup';
export declare function assertShape<T>(value: unknown, yupSchema: (args: typeof yup) => AnySchema, errorMessage?: string): asserts value is T;

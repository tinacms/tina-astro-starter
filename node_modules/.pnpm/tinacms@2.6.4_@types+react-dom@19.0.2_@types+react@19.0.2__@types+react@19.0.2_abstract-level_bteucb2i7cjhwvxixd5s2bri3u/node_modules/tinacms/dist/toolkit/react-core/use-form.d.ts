import { FormOptions, Form } from '../forms';
export interface WatchableFormValue {
    values: any;
    label: FormOptions<any>['label'];
    fields: FormOptions<any>['fields'];
}
/**
 * @deprecated See https://github.com/tinacms/rfcs/blob/master/0006-form-hook-conventions.md
 */
export declare function useLocalForm<FormShape = any>(options: FormOptions<any>, watch?: Partial<WatchableFormValue>): [FormShape, Form];
/**
 * A hook that creates a form and updates it's watched properties.
 */
export declare function useForm<FormShape = any>({ loadInitialValues, ...options }: FormOptions<any>, watch?: Partial<WatchableFormValue>): [FormShape, Form, boolean];

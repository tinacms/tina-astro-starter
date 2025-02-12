import { FormOptions, Form } from '../forms';
import { WatchableFormValue } from '../react-core';
export { useLocalForm, useForm } from '../react-core';
export type { WatchableFormValue } from '../react-core';
/**
 * @deprecated See https://github.com/tinacms/rfcs/blob/master/0006-form-hook-conventions.md
 */
export declare function useGlobalForm<FormShape = any>(options: FormOptions<any>, watch?: Partial<WatchableFormValue>): [FormShape, Form | undefined];
/**
 * Creates and registers ScreenPlugin that renders the given Form.
 */
export declare function useFormScreenPlugin(form: Form, icon?: any, layout?: 'fullscreen' | 'popup'): void;

import { Form } from '@tinacms/toolkit';
import type { FormOptions, TinaCMS } from '@tinacms/toolkit';
export declare const generateFormCreators: (cms: TinaCMS, showInSidebar?: boolean, global?: boolean | {
    icon?: any;
    layout: "fullscreen" | "popup";
}) => {
    createForm: (formConfig: any) => Form<any, import("@tinacms/toolkit").AnyField>;
    createGlobalForm: GlobalFormCreator;
};
type FormCreator = (formConfig: FormOptions<any>) => Form;
type GlobalFormCreator = (formConfig: FormOptions<any>, options?: GlobalFormOptions) => Form;
interface GlobalFormOptions {
    icon?: any;
    layout: 'fullscreen' | 'popup';
}
export interface FormifyArgs {
    formConfig: FormOptions<any>;
    createForm: FormCreator;
    createGlobalForm: FormCreator;
    skip?: () => void;
}
export type formifyCallback = (args: FormifyArgs, cms: TinaCMS) => Form | void;
export type onSubmitArgs = {
    /**
     * @deprecated queryString is actually a mutation string, use `mutationString` instead
     */
    queryString: string;
    mutationString: string;
    variables: object;
};
export {};

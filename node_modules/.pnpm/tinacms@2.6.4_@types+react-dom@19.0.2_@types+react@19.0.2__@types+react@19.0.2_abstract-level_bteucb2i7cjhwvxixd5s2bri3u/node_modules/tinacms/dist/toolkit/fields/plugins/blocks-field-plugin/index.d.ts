import * as React from 'react';
import type { Field, Form } from '../../../forms';
export interface BlocksFieldDefinititon extends Field {
    component: 'blocks';
    templates: {
        [key: string]: BlockTemplate;
    };
}
export interface BlockTemplate {
    label: string;
    defaultItem?: object | (() => object);
    fields?: Field[];
    /**
     * An optional function which generates `props` for
     * this items's `li`.
     */
    itemProps?: (item: object) => {
        /**
         * The `key` property used to optimize the rendering of lists.
         *
         * If rendering is causing problems, use `defaultItem` to
         * generate a unique key for the item.
         *
         * Reference:
         * * https://reactjs.org/docs/lists-and-keys.html
         */
        key?: string;
        /**
         * The label to be display on the list item.
         */
        label?: string;
    };
}
interface BlockFieldProps {
    input: any;
    meta: any;
    field: BlocksFieldDefinititon;
    form: any;
    tinaForm: Form;
    index?: number;
}
export declare const BlocksField: ({ tinaForm, form, field, input, meta, index, }: BlockFieldProps) => React.JSX.Element;
export declare const BlocksFieldPlugin: {
    name: string;
    Component: ({ tinaForm, form, field, input, meta, index, }: BlockFieldProps) => React.JSX.Element;
};
export {};

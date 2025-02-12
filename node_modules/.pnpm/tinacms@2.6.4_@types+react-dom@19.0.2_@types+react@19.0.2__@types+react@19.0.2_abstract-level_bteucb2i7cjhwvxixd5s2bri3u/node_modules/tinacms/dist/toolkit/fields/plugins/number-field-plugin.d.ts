import * as React from 'react';
import { InputProps } from '../components';
export declare const NumberField: (props: import("./wrap-field-with-meta").InputFieldType<{
    step: string | number;
    input: InputProps;
}, {}>) => React.JSX.Element;
export declare const NumberFieldPlugin: {
    name: string;
    Component: (props: import("./wrap-field-with-meta").InputFieldType<{
        step: string | number;
        input: InputProps;
    }, {}>) => React.JSX.Element;
    parse: (value?: string) => number;
    validate(value: any, values: any, meta: any, field: any): string;
};

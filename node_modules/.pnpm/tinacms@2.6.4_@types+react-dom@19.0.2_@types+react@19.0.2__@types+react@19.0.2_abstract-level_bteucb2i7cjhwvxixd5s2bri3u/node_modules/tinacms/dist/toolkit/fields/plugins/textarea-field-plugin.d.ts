import * as React from 'react';
import { InputProps } from '../components';
export declare const TextareaFieldPlugin: {
    name: string;
    Component: (props: import("./wrap-field-with-meta").InputFieldType<{
        input: InputProps;
    }, {}>) => React.JSX.Element;
    parse: (value?: string) => string;
    validate(value: any, values: any, meta: any, field: any): string;
};

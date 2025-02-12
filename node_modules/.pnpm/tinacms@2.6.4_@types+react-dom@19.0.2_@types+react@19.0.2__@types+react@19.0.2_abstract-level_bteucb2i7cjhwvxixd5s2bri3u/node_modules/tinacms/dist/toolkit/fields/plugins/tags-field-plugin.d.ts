import * as React from 'react';
import { InputProps } from '../components';
export declare const TagsField: (props: import("./wrap-field-with-meta").InputFieldType<{
    placeholder: string;
}, InputProps>) => React.JSX.Element;
export declare const TagsFieldPlugin: {
    name: string;
    Component: (props: import("./wrap-field-with-meta").InputFieldType<{
        placeholder: string;
    }, InputProps>) => React.JSX.Element;
    parse: (value?: string) => string;
};

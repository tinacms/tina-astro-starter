import * as React from 'react';
import { InputProps } from '../components';
export interface ColorFieldProps {
    colorFormat: string;
    colors: string[];
    widget?: 'sketch' | 'block';
}
export declare const ColorField: (props: import("./wrap-field-with-meta").InputFieldType<InputProps, ColorFieldProps>) => React.JSX.Element;
export declare const ColorFieldPlugin: {
    name: string;
    Component: (props: import("./wrap-field-with-meta").InputFieldType<InputProps, ColorFieldProps>) => React.JSX.Element;
    parse: (value?: string) => string;
    validate(value: any, values: any, meta: any, field: any): string;
};

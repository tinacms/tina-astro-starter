import * as React from 'react';
import { InputProps } from '../components';
interface ImageProps {
    path: string;
    uploadDir?(formValues: any): string;
    clearable?: boolean;
}
export declare const ImageField: (props: import("./wrap-field-with-meta").InputFieldType<InputProps, ImageProps>) => React.JSX.Element;
export declare const ImageFieldPlugin: {
    name: string;
    Component: (props: import("./wrap-field-with-meta").InputFieldType<InputProps, ImageProps>) => React.JSX.Element;
    parse: (value?: string) => string;
    validate(value: any, values: any, meta: any, field: any): string;
};
export {};

import * as React from 'react';
import { type InputProps } from '../components';
interface ExtraProps {
    placeholder: string;
    disabled?: boolean;
}
export declare const TextField: (props: import("./field-props").FieldProps<InputProps & ExtraProps>) => React.JSX.Element;
export declare const TextFieldPlugin: {
    name: string;
    Component: (props: import("./field-props").FieldProps<InputProps & ExtraProps>) => React.JSX.Element;
    validate(value: any, allValues: any, meta: any, field: any): "Required" | "Item with this unique id already exists";
    parse: (value?: string) => string;
};
export {};

import React from 'react';
import { type InputProps } from '../components';
import type { DatetimepickerProps } from 'react-datetime';
import type { Field } from '../../forms';
export declare const DateField: (props: import("./wrap-field-with-meta").InputFieldType<InputProps, DatetimepickerProps>) => React.JSX.Element;
export declare const ReactDateTimeWithStyles: (props: DatetimepickerProps & Partial<Field>) => React.JSX.Element;
export declare const DateFieldPlugin: {
    __type: string;
    name: string;
    Component: (props: import("./wrap-field-with-meta").InputFieldType<InputProps, DatetimepickerProps>) => React.JSX.Element;
    format: (val: string, _name: string, field: DatetimepickerProps) => string;
    parse: (val: string) => string;
    validate(value: any, values: any, meta: any, field: any): string;
};

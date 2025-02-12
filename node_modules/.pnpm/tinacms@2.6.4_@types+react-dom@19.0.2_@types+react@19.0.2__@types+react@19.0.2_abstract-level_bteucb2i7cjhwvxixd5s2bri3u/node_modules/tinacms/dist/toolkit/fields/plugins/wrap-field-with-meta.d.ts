import * as React from 'react';
import { FieldProps } from './field-props';
import { Form } from '../../forms';
export type InputFieldType<ExtraFieldProps, InputProps> = FieldProps<InputProps> & ExtraFieldProps;
export declare function wrapFieldsWithMeta<ExtraFieldProps = {}, InputProps = {}>(Field: React.FunctionComponent<InputFieldType<ExtraFieldProps, InputProps>> | React.ComponentClass<InputFieldType<ExtraFieldProps, InputProps>>): (props: InputFieldType<ExtraFieldProps, InputProps>) => React.JSX.Element;
/**
 * Same as wrapFieldsWithMeta but excludes the label, and description useful for fields that render their label and description
 */
export declare function wrapFieldWithNoHeader<ExtraFieldProps = {}, InputProps = {}>(Field: React.FunctionComponent<InputFieldType<ExtraFieldProps, InputProps>> | React.ComponentClass<InputFieldType<ExtraFieldProps, InputProps>>): (props: InputFieldType<ExtraFieldProps, InputProps>) => React.JSX.Element;
/**
 * Same as above but excludes the label, useful for fields that have their own label
 * @deprecated This function is deprecated and will be removed in future versions.
 */
export declare function wrapFieldWithError<ExtraFieldProps = {}, InputProps = {}>(Field: React.FunctionComponent<InputFieldType<ExtraFieldProps, InputProps>> | React.ComponentClass<InputFieldType<ExtraFieldProps, InputProps>>): (props: InputFieldType<ExtraFieldProps, InputProps>) => React.JSX.Element;
interface FieldMetaProps extends React.HTMLAttributes<HTMLElement> {
    name: string;
    children: any;
    label?: string | boolean;
    description?: string;
    error?: string;
    margin?: boolean;
    index?: number;
    tinaForm: Form;
}
export declare const FieldMeta: ({ name, label, description, error, margin, children, index, tinaForm, ...props }: FieldMetaProps) => React.JSX.Element;
export declare const FieldWrapper: ({ margin, children, ...props }: {
    margin: boolean;
    children: React.ReactNode;
} & Partial<React.ComponentPropsWithoutRef<"div">>) => React.JSX.Element;
export interface FieldLabel extends React.HTMLAttributes<HTMLLabelElement> {
    children?: any | any[];
    className?: string;
    name?: string;
}
export declare const FieldLabel: ({ children, className, name, ...props }: FieldLabel) => React.JSX.Element;
export declare const FieldDescription: ({ children, className, ...props }: {
    children?: any | any[];
    className?: string;
}) => React.JSX.Element;
export declare const FieldError: ({ children, className, ...props }: {
    children?: any | any[];
    className?: string;
}) => React.JSX.Element;
export {};

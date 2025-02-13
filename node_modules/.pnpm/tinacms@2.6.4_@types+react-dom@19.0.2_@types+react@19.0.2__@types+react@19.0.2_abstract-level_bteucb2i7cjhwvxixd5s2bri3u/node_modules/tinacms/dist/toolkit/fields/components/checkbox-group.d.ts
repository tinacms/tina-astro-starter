import * as React from 'react';
type Option = {
    value: string;
    label: string;
};
export interface CheckboxGroupFieldProps {
    name: string;
    label?: string;
    component: string;
    options: (Option | string)[];
    direction?: 'horizontal' | 'vertical';
}
export interface CheckboxGroupProps {
    name: string;
    input: any;
    field: CheckboxGroupFieldProps;
    disabled?: boolean;
    options?: (Option | string)[];
    direction?: 'horizontal' | 'vertical';
}
export declare const CheckboxGroup: React.FC<CheckboxGroupProps>;
export {};

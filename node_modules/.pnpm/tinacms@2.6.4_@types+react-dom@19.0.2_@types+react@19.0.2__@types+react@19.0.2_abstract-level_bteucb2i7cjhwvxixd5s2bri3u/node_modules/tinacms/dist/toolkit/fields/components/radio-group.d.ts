import * as React from 'react';
type Option = {
    value: string;
    label: string;
};
interface RadioGroupFieldProps {
    label?: string;
    name: string;
    component: string;
    options: (Option | string)[];
    direction?: 'horizontal' | 'vertical';
}
export interface RadioGroupProps {
    name: string;
    input: any;
    field: RadioGroupFieldProps;
    disabled?: boolean;
    options?: (Option | string)[];
}
export declare const RadioGroup: React.FC<RadioGroupProps>;
export {};

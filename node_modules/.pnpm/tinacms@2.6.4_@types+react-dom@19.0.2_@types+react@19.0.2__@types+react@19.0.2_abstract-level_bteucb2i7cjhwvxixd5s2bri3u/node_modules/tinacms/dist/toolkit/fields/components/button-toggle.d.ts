import * as React from 'react';
type Option = {
    value: string;
    label?: string;
    icon?: React.ComponentType<any>;
};
interface ButtonToggleFieldProps {
    label?: string;
    name: string;
    component: string;
    options: (Option | string)[];
    direction?: 'horizontal' | 'vertical';
}
export interface ButtonToggleProps {
    name: string;
    input: any;
    field: ButtonToggleFieldProps;
    disabled?: boolean;
    options?: (Option | string)[];
    direction?: 'horizontal' | 'vertical';
}
export declare const ButtonToggle: React.FC<ButtonToggleProps>;
export {};

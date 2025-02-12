import * as React from 'react';
type a = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
export interface NumberProps extends a {
    step?: string | number;
}
export declare const NumberInput: React.FC<NumberProps>;
export {};

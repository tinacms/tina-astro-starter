import React from 'react';
export interface InputProps {
    error?: boolean;
    small?: boolean;
    placeholder?: string;
    step?: string | number;
}
export declare const Input: ({ ...props }: {
    [x: string]: any;
}) => React.JSX.Element;

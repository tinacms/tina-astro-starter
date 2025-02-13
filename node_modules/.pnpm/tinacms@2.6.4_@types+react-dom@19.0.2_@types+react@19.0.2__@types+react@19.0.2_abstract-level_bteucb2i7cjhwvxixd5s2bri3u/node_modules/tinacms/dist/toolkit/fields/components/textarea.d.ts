import * as React from 'react';
type a = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
export interface TextAreaProps extends a {
    error?: boolean;
    ref?: any;
}
export declare const TextArea: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>, "ref"> & React.RefAttributes<HTMLTextAreaElement>>;
export {};

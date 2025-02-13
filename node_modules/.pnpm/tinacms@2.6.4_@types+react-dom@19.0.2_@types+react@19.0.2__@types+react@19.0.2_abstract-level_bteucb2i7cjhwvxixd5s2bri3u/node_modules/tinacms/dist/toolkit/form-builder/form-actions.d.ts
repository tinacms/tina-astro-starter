import * as React from 'react';
import { FC } from 'react';
import { Form } from '../forms';
export interface FormActionMenuProps {
    form: Form;
    actions: any[];
}
export declare const FormActionMenu: FC<FormActionMenuProps>;
export declare const ActionButton: ({ className, ...props }: {
    [x: string]: any;
    className?: string;
}) => React.JSX.Element;

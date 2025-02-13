import { Form } from '../forms';
import { FormRenderProps } from 'react-final-form';
import { FC } from 'react';
export interface FormLegacyProps {
    form: Form;
    children(props: FormRenderProps<string>): any;
}
export declare const FormLegacy: FC<FormLegacyProps>;

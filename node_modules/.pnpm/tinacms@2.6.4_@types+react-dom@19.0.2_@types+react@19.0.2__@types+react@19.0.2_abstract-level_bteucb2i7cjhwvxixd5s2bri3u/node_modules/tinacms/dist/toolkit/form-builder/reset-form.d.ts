import * as React from 'react';
import { FC } from 'react';
interface ResetFormProps {
    children: any;
    pristine: boolean;
    reset(): void;
    style?: React.CSSProperties;
}
export declare const ResetForm: FC<ResetFormProps>;
export {};

import * as React from 'react';
import { ColorFormat } from './color-formatter';
type WrappedFieldProps = any;
interface Props {
    colorFormat: ColorFormat;
    userColors: string[];
    widget?: 'sketch' | 'block';
    input: WrappedFieldProps['input'];
}
export declare const ColorPicker: React.FC<Props>;
export {};

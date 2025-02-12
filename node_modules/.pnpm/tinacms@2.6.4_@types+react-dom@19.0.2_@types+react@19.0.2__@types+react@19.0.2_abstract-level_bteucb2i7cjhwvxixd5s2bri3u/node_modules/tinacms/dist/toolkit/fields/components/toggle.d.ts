import { FC } from 'react';
import * as React from 'react';
import { Field } from '../../forms';
export interface ToggleProps {
    name: string;
    input: any;
    field: ToggleFieldDefinition;
    disabled?: boolean;
    onBlur?: <T>(_event?: React.FocusEvent<T>) => void;
    onChange?: <T>(_event: React.ChangeEvent<T> | any) => void;
    onFocus?: <T>(_event?: React.FocusEvent<T>) => void;
}
interface ToggleFieldDefinition extends Field {
    component: 'toggle';
    toggleLabels?: boolean | FieldLabels;
}
type FieldLabels = {
    true: string;
    false: string;
};
export declare const Toggle: FC<ToggleProps>;
export {};

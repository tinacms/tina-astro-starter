import type { Field } from '../../../forms';
import type { TinaCMS } from '../../../tina-cms';
import * as React from 'react';
import type { ReferenceFieldProps } from './model/reference-field-props';
interface ReferenceSelectProps {
    cms: TinaCMS;
    input: any;
    field: ReferenceFieldProps & Field;
}
declare const Combobox: React.FC<ReferenceSelectProps>;
export default Combobox;

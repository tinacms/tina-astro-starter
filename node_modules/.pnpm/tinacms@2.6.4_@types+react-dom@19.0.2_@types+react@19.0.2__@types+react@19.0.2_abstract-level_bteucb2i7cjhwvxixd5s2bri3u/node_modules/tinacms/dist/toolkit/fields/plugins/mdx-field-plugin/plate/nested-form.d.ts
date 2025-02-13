import React from 'react';
import { type Field } from '../../../../forms';
export declare const NestedForm: (props: {
    onClose: () => void;
    id: string;
    label: string;
    fields: Field[];
    initialValues: object;
    onChange: (values: object) => void;
}) => React.JSX.Element;

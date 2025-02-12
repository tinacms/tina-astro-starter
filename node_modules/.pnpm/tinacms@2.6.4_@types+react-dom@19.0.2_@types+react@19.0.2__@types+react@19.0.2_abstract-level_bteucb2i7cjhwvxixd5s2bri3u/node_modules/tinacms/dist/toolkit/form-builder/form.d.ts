import * as React from 'react';
import PropTypes from 'prop-types';
import { Form } from '../forms';
interface RenderProps {
    isEditing: boolean;
    setIsEditing(nextVal: boolean): any;
}
export interface Props {
    form: Form;
    children({ isEditing, setIsEditing }: RenderProps): any;
}
export declare function TinaForm({ form, children }: Props): React.JSX.Element;
interface TinaFieldsProps {
    name: string;
    type?: string;
    Component: any;
    children: any;
}
export declare function TinaField({ Component, children, ...fieldProps }: TinaFieldsProps): any;
export declare namespace TinaField {
    var propTypes: {
        name: PropTypes.Requireable<string>;
        type: PropTypes.Requireable<string>;
        Component: PropTypes.Validator<any>;
        children: PropTypes.Requireable<any>;
    };
}
export {};

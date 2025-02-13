/**

*/
import React from 'react';
import { themes } from 'prism-react-renderer';
export declare const Prism: (props: {
    value: string;
    lang?: string;
    theme?: keyof typeof themes;
}) => React.JSX.Element;

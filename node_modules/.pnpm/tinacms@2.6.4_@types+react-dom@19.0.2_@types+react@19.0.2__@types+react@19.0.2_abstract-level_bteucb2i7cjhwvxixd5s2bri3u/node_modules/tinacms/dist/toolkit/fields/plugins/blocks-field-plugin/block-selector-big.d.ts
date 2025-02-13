import * as React from 'react';
import type { BlockTemplate } from '.';
export declare const BlockSelectorBig: ({ templates, addItem, label, }: {
    templates: {
        [key: string]: BlockTemplate;
    };
    addItem: any;
    label: string | boolean;
}) => React.JSX.Element;

import React from 'react';
interface AutocompleteItem {
    key: string;
    label: string;
    render: (item: Omit<AutocompleteItem, 'render'>) => string | JSX.Element;
}
interface AutocompleteProps {
    value: Omit<AutocompleteItem, 'render'>;
    defaultQuery?: string;
    onChange: (item: AutocompleteItem) => void;
    items: AutocompleteItem[];
}
export declare const Autocomplete: React.FC<AutocompleteProps>;
export {};

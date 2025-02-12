import React from 'react';
export declare function Dropdown({ label, items, }: {
    label: string | JSX.Element;
    items: {
        key: string;
        onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
        render: string | JSX.Element;
    }[];
}): React.JSX.Element;

import React from 'react';
export declare const Message: ({ children, type, size, className, link, linkLabel, }: {
    children?: React.ReactNode | React.ReactNode[];
    type?: "success" | "warning" | "error" | "info";
    size?: "small" | "medium";
    className?: string;
    link?: string;
    linkLabel?: string;
}) => React.JSX.Element;

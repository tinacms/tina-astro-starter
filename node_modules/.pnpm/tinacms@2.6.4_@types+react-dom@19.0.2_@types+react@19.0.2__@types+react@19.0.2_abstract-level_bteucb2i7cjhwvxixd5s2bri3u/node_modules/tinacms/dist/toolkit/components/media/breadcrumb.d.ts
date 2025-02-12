import React from 'react';
interface BreadcrumbProps {
    directory?: string;
    setDirectory: (_directory: string) => void;
}
export declare function Breadcrumb({ directory, setDirectory }: BreadcrumbProps): React.JSX.Element;
export {};

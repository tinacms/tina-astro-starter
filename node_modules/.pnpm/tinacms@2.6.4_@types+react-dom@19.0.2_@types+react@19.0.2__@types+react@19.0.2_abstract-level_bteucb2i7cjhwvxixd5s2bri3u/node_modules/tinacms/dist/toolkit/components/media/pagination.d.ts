import React from 'react';
export interface MediaPaginatorProps {
    navigateNext: () => void;
    navigatePrev: () => void;
    hasNext: boolean;
    hasPrev: boolean;
    variant?: 'primary' | 'secondary' | 'white' | 'ghost';
}
export declare function CursorPaginator({ navigateNext, navigatePrev, hasNext, hasPrev, variant, }: MediaPaginatorProps): React.JSX.Element;

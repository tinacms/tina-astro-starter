import * as React from 'react';
export interface DismissibleProps {
    /**
     * The function that called in response to a dismissal.
     */
    onDismiss: Function;
    /**
     * If `true`, pressing `ESC` key will trigger a dismissal. Default: `false`
     */
    escape?: boolean;
    /**
     * When `true` clicking outside of the surrounding area triggers a dismissal. Default: `false`
     */
    click?: boolean;
    /**
     * When `true` there will be no dismissals. Default: `false`
     */
    disabled?: boolean;
    /**
     * An extra Document to add the event listeners too.
     *
     * Used when the dismissible area is inside of an iframe.
     */
    document?: Document;
    /**
     * Adding this flag allows click events outside of the
     * dismissible area to propagate to their intended target.
     */
    allowClickPropagation?: boolean;
    children?: React.ReactNode;
}
export declare const Dismissible: React.FC<DismissibleProps>;
export declare function useDismissible({ onDismiss, escape, click, disabled, allowClickPropagation, document: customDocument, }: DismissibleProps): any;

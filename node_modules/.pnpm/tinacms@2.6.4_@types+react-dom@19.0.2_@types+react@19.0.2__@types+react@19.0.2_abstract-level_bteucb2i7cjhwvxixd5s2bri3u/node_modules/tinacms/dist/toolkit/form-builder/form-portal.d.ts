import * as React from 'react';
export type FormPortal = React.FC<{
    children(props: {
        zIndexShift: number;
    }): React.ReactNode | null;
}>;
export declare function useFormPortal(): FormPortal;
type FormPortalProviderProps = {
    children?: React.ReactNode;
};
export declare const FormPortalProvider: React.FC<FormPortalProviderProps>;
export {};

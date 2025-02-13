import * as React from 'react';
type ModalProviderProps = {
    children?: React.ReactNode;
};
export declare const ModalProvider: React.FC<ModalProviderProps>;
export interface ModalContext {
    portalNode: Element | null;
}
export declare function useModalContainer(): ModalContext;
export {};

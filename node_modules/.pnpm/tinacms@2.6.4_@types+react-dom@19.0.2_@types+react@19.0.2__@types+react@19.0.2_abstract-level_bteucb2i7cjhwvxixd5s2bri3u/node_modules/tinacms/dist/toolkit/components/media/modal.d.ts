import React from 'react';
interface DeleteModalProps {
    close(): void;
    deleteFunc(): Promise<void>;
    filename: string;
}
interface NewFolderModalProps {
    onSubmit(filename: string): void;
    close(): void;
}
export declare const DeleteModal: ({ close, deleteFunc, filename, }: DeleteModalProps) => React.JSX.Element;
export declare const NewFolderModal: ({ onSubmit, close }: NewFolderModalProps) => React.JSX.Element;
export {};

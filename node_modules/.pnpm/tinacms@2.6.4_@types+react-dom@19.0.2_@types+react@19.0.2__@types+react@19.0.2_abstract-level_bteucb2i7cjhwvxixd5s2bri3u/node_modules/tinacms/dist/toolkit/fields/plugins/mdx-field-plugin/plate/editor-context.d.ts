import React from 'react';
import type { MdxTemplate } from './types';
export declare const EditorContext: React.Context<{
    fieldName: string;
    templates: MdxTemplate[];
    rawMode: boolean;
    setRawMode: (mode: boolean) => void;
}>;
export declare const useEditorContext: () => {
    fieldName: string;
    templates: MdxTemplate[];
    rawMode: boolean;
    setRawMode: (mode: boolean) => void;
};
export declare const useTemplates: () => {
    fieldName: string;
    templates: MdxTemplate[];
    rawMode: boolean;
    setRawMode: (mode: boolean) => void;
};

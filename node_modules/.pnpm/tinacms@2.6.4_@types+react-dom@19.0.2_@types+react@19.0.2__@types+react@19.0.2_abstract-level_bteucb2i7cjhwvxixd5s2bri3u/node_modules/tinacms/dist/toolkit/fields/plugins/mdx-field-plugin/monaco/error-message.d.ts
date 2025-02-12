import React from 'react';
export type EmptyTextElement = {
    type: 'text';
    text: '';
};
export type PositionItem = {
    line?: number | null;
    column?: number | null;
    offset?: number | null;
    _index?: number | null;
    _bufferIndex?: number | null;
};
export type Position = {
    start: PositionItem;
    end: PositionItem;
};
export type InvalidMarkdownElement = {
    type: 'invalid_markdown';
    value: string;
    message: string;
    position?: Position;
    children: [EmptyTextElement];
};
type ErrorType = {
    message: string;
    position?: {
        startColumn: number;
        endColumn: number;
        startLineNumber: number;
        endLineNumber: number;
    };
};
export declare const buildError: (element: InvalidMarkdownElement) => ErrorType;
export declare const buildErrorMessage: (element: InvalidMarkdownElement) => string;
export declare function ErrorMessage({ error }: {
    error: InvalidMarkdownElement;
}): React.JSX.Element;
export {};

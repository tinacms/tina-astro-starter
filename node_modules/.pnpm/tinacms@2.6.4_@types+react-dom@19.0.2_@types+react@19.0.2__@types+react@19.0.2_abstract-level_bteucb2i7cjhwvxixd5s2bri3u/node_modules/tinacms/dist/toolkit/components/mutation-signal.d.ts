import * as React from 'react';
export declare const MutationSignalContext: React.Context<number>;
/**
 *
 */
export declare const MutationSignalProvider: ({ children }: {
    children: any;
}) => React.JSX.Element;
/**
 * Returns a value that changes when elements within the parent MutationSignalProvider change
 */
export declare const useMutationSignal: () => number;

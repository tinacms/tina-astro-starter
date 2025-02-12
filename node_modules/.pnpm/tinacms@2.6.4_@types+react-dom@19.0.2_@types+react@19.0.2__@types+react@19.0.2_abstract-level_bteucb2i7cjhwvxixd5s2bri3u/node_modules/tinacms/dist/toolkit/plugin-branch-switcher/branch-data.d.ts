import * as React from 'react';
export interface BranchContextData {
    currentBranch: string;
    setCurrentBranch: (string: any) => void;
}
export declare const BranchDataProvider: ({ currentBranch, setCurrentBranch, children, }: {
    currentBranch: any;
    setCurrentBranch: any;
    children: any;
}) => React.JSX.Element;
export declare const useBranchData: () => BranchContextData;

import * as React from 'react';
import { ScreenPlugin } from '../react-screens';
import { BranchSwitcherProps } from './types';
export declare class BranchSwitcherPlugin implements ScreenPlugin {
    __type: "screen";
    Icon: import("react-icons").IconType;
    name: string;
    layout: "popup";
    listBranches: BranchSwitcherProps['listBranches'];
    createBranch: BranchSwitcherProps['createBranch'];
    chooseBranch: BranchSwitcherProps['chooseBranch'];
    constructor(options: BranchSwitcherProps);
    Component: () => React.JSX.Element;
}

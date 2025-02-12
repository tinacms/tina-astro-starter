import React from 'react';
import { type ReactNode } from 'react';
import type { Form } from '../../../../../forms';
import type { MdxTemplate } from '../types';
import type { ToolbarOverrides, ToolbarOverrideType } from './toolbar-overrides';
interface ToolbarContextProps {
    tinaForm: Form;
    templates: MdxTemplate[];
    overrides: ToolbarOverrideType[] | ToolbarOverrides;
}
interface ToolbarProviderProps extends ToolbarContextProps {
    children: ReactNode;
}
export declare const ToolbarProvider: React.FC<ToolbarProviderProps>;
export declare const useToolbarContext: () => ToolbarContextProps;
export {};

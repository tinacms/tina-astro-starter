/**



*/
import * as React from 'react';
import { SidebarPosition } from '../react-sidebar';
export interface TinaUIProps {
    position?: SidebarPosition;
    styled?: boolean;
    children?: React.ReactNode;
}
export declare const TinaUI: React.FC<TinaUIProps>;

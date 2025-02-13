import { EventBus, Callback } from '../core';
import * as React from 'react';
export interface SidebarStateOptions {
    position?: SidebarPosition;
    buttons?: SidebarButtons;
    placeholder?: React.FC;
    defaultWidth?: number;
    defaultState?: DefaultSidebarState;
    renderNav?: boolean;
}
/**
 * @deprecated
 * `buttons` set on the form directly
 * via form config options
 */
export interface SidebarButtons {
    save: string;
    reset: string;
}
export declare type SidebarPosition = 'displace' | 'overlay';
export declare type DefaultSidebarState = 'open' | 'closed';
export declare class SidebarState {
    private events;
    private _isOpen;
    placeholder: React.FC;
    defaultState: DefaultSidebarState;
    position: SidebarPosition;
    renderNav: boolean;
    buttons: SidebarButtons;
    constructor(events: EventBus, options?: SidebarStateOptions);
    get isOpen(): boolean;
    set isOpen(nextValue: boolean);
    subscribe(callback: Callback): () => void;
}

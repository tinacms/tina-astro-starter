import * as React from 'react';
import { Callback, CMSEvent } from '../core';
export declare function useCMSEvent<E extends CMSEvent = CMSEvent>(event: E['type'] | E['type'][], callback: Callback<E>, deps: React.DependencyList): void;
export declare const useEventSubscription: typeof useCMSEvent;
export declare function useEvent<E extends CMSEvent = CMSEvent>(eventType: E['type']): {
    dispatch: (event: Omit<E, "type">) => void;
    subscribe: (callback: (event: E) => any) => () => void;
};

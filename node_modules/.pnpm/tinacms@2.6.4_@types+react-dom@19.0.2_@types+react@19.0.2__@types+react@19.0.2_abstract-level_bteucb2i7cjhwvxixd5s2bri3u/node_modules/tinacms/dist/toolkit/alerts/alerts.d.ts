import React from 'react';
import type { EventBus, Callback, CMSEvent } from '../core';
export interface EventsToAlerts {
    [key: string]: ToAlert | AlertArgs;
}
export type ToAlert = (event: CMSEvent) => AlertArgs;
export interface AlertArgs {
    level: AlertLevel;
    message: string;
    timeout?: number;
}
export declare class Alerts {
    private events;
    private map;
    private alerts;
    private mapEventToAlert;
    constructor(events: EventBus, map?: EventsToAlerts);
    setMap(eventsToAlerts: EventsToAlerts): void;
    add(level: AlertLevel, message: string | React.FunctionComponent, timeout?: number): () => void;
    dismiss(alert: Alert): void;
    subscribe(cb: Callback): () => void;
    get all(): Alert[];
    info(message: string | React.FunctionComponent, timeout?: number): () => void;
    success(message: string | React.FunctionComponent, timeout?: number): () => void;
    warn(message: string | React.FunctionComponent, timeout?: number): () => void;
    error(message: string | React.FunctionComponent, timeout?: number): () => void;
}
export type AlertLevel = 'info' | 'success' | 'warn' | 'error';
export interface Alert {
    id: string;
    level: AlertLevel;
    message: string | React.FunctionComponent;
    timeout: number;
}

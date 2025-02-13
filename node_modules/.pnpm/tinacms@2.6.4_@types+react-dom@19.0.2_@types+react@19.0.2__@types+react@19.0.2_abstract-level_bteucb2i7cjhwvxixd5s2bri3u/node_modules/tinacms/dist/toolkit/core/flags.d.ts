import { EventBus } from './event';
export interface SetFlagEvent {
    type: 'flag:set';
    key: string;
    value: boolean;
}
export declare class Flags {
    private events;
    private _flags;
    constructor(events: EventBus);
    get(key: any): boolean;
    set(key: any, value: any): void;
}

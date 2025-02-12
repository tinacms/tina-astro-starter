export type Callback<E extends CMSEvent = CMSEvent> = (event: E) => void;
export interface CMSEvent {
    type: string;
    [key: string]: any;
}
export declare class EventBus {
    private listeners;
    subscribe<E extends CMSEvent = CMSEvent>(event: E['type'] | E['type'][], callback: Callback<E>): () => void;
    dispatch<E extends CMSEvent = CMSEvent>(event: E): void;
}
export declare class Listener<E extends CMSEvent = CMSEvent> {
    private eventPattern;
    private callback;
    constructor(eventPattern: E['type'], callback: Callback<E>);
    handleEvent(event: E): boolean;
    watchesEvent(currentEvent: E): boolean;
}

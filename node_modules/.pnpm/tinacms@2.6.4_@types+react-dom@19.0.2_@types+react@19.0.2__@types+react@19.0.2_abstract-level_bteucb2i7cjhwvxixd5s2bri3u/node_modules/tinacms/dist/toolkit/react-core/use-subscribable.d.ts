interface Subscribable {
    subscribe(callback: any): () => void;
}
/**
 *
 * @param subscribable An object that can be subscribed to
 * @param cb (Optional) A callback to be executed when an event occurs.
 */
export declare function useSubscribable(subscribable: Subscribable, cb?: Function): void;
export {};

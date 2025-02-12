export declare function sleepAndCallFunc<T>({ fn, ms, }: {
    fn: () => Promise<T>;
    ms: number;
}): Promise<T>;

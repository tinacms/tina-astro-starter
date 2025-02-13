import { useStore } from 'jotai/react';
import type { WritableAtom } from 'jotai/vanilla';
type Options = Parameters<typeof useStore>[0] & {
    dangerouslyForceHydrate?: boolean;
};
type AnyWritableAtom = WritableAtom<unknown, never[], unknown>;
type InferAtomTuples<T> = {
    [K in keyof T]: T[K] extends readonly [
        infer A,
        unknown
    ] ? A extends WritableAtom<unknown, infer Args, infer _Result> ? readonly [
        A,
        Args[0]
    ] : T[K] : never;
};
export type INTERNAL_InferAtomTuples<T> = InferAtomTuples<T>;
export declare function useHydrateAtoms<T extends (readonly [
    AnyWritableAtom,
    unknown
])[]>(values: InferAtomTuples<T>, options?: Options): void;
export declare function useHydrateAtoms<T extends Map<AnyWritableAtom, unknown>>(values: T, options?: Options): void;
export declare function useHydrateAtoms<T extends Iterable<readonly [
    AnyWritableAtom,
    unknown
]>>(values: InferAtomTuples<T>, options?: Options): void;
export {};
declare type Awaited<T> = T extends Promise<infer V> ? V : T;
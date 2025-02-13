import type { Optic, TryA, A, S } from './optic.js';
import type { Expected } from './errors.js';
interface ToA<From, To> extends A {
    0: TryA<this, S<this> extends From ? To : Expected<From, S<this>>>;
}
export type To<From, To> = Optic<'Getter', ToA<From, To>, never>;
export declare const to: <T, U>(f: (a: T) => U) => To<T, U>;
export {};

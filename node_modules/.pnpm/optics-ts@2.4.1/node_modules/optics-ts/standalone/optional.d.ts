import type { Optic, TryA, TryT, A, B, S, T } from './optic.js';
interface OptionalA extends A {
    0: TryA<this, Exclude<S<this>, undefined>>;
}
interface OptionalT extends T {
    0: TryT<this, B<this> | undefined>;
}
export declare const optional: Optic<'Prism', OptionalA, OptionalT>;
export {};

import type { Optic, TryA, TryT, A, B, S, T } from './optic.js';
interface EqA extends A {
    0: TryA<this, S<this>>;
}
interface EqT extends T {
    0: TryT<this, B<this>>;
}
export type Eq = Optic<'Equivalence', EqA, EqT>;
export declare const eq: Eq;
export {};

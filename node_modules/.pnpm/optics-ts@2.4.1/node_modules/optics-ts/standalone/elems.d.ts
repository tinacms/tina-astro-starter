import type { Optic, S, T, A, B, TryA, TryT } from './optic.js';
import type { ArrayExpected } from './errors.js';
interface ElemsA extends A {
    0: TryA<this, S<this> extends (infer Item)[] ? Item : ArrayExpected<S<this>>>;
}
interface ElemsT extends T {
    0: TryT<this, S<this> extends any[] ? B<this>[] : ArrayExpected<S<this>>>;
}
export declare const elems: Optic<'Traversal', ElemsA, ElemsT>;
export {};

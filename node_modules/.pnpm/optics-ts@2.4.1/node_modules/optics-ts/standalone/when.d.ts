import type { Optic, A, B, S, T, TryA, TryT } from './optic.js';
import type { Expected } from './errors.js';
interface WhenA<Value> extends A {
    0: TryA<this, S<this> extends Value ? Value : Expected<Value, S<this>>>;
}
interface WhenT<Value> extends T {
    0: TryT<this, S<this> extends Value ? Value | B<this> : Expected<Value, S<this>>>;
}
export declare const when: <Value>(predicate: (value: Value) => boolean) => Optic<'Prism', WhenA<Value>, WhenT<Value>>;
export {};

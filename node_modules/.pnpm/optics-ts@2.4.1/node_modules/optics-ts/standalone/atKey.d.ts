import type { Optic, A, B, S, T, TryA, TryT } from './optic.js';
import type { RecordExpected } from './errors.js';
interface AtKeyA extends A {
    0: TryA<this, S<this> extends Record<string, infer Item> ? Item : RecordExpected<S<this>>>;
}
interface AtKeyT extends T {
    0: TryT<this, S<this> extends Record<string, infer Item> ? Record<string, Item | B<this>> : RecordExpected<S<this>>>;
}
export type AtKey = Optic<'Prism', AtKeyA, AtKeyT, true>;
export declare const atKey: (key: string) => AtKey;
export {};

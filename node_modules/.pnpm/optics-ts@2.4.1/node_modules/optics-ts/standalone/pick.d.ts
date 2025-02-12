import type { Optic, A, B, S, T, TryA, TryT } from './optic.js';
import type { InvalidPick } from './errors.js';
import type { Unnaked } from '../utils.js';
interface PickA<K extends string> extends A {
    0: TryA<this, Unnaked<K> extends keyof S<this> ? Pick<S<this>, Unnaked<K>> : InvalidPick<K, S<this>>>;
}
interface PickT<K extends string> extends T {
    0: TryT<this, Omit<S<this>, K> & {
        [KK in keyof B<this>]: B<this>[KK];
    }>;
}
export declare function pick(): Optic<'Lens', PickA<never>, PickT<never>>;
export declare function pick<K extends string>(...keys: K[]): Optic<'Lens', PickA<K>, PickT<K>>;
export {};

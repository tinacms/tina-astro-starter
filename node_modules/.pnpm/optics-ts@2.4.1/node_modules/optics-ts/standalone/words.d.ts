import type { Optic, TryA, TryT, A, B, S, T } from './optic.js';
import type { StringExpected } from './errors.js';
interface WordsA extends A {
    0: TryA<this, S<this> extends string ? string : StringExpected<S<this>>>;
}
interface WordsT extends T {
    0: TryT<this, S<this> extends string ? B<this> extends string ? string : StringExpected<B<this>> : StringExpected<S<this>>>;
}
export declare const words: Optic<'Traversal', WordsA, WordsT>;
export {};

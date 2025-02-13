import type { Optic, TryT, B, S, T } from './optic.js';
import type { ArrayExpected } from './errors.js';
interface AppendToT extends T {
    0: TryT<this, S<this> extends (infer Item)[] ? (Item | B<this>)[] : ArrayExpected<S<this>>>;
}
export type AppendTo = Optic<'Setter', never, AppendToT>;
export declare const appendTo: AppendTo;
export {};

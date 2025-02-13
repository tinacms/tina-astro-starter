import type { HKT, HKT2, Apply, Apply2 } from '../hkt.js';
import type { Optic, Class, B, S } from './optic.js';
import { Prop } from './prop.js';
interface ComposeA<A1 extends HKT, A2 extends HKT> extends HKT {
    0: Apply<A2, Apply<A1, S<this>>>;
}
interface ComposeT<T1 extends HKT2, A1 extends HKT, T2 extends HKT2> extends HKT2 {
    0: Apply2<T1, S<this>, Apply2<T2, Apply<A1, S<this>>, B<this>>>;
}
type ClassTable = {
    Equivalence: {
        Equivalence: 'Equivalence';
        Iso: 'Iso';
        Lens: 'Lens';
        Prism: 'Prism';
        Traversal: 'Traversal';
        Getter: 'Getter';
        AffineFold: 'AffineFold';
        Fold: 'Fold';
        Setter: 'Setter';
    };
    Iso: {
        Equivalence: 'Iso';
        Iso: 'Iso';
        Lens: 'Lens';
        Prism: 'Prism';
        Traversal: 'Traversal';
        Getter: 'Getter';
        AffineFold: 'AffineFold';
        Fold: 'Fold';
        Setter: 'Setter';
    };
    Lens: {
        Equivalence: 'Lens';
        Iso: 'Lens';
        Lens: 'Lens';
        Prism: 'Prism';
        Traversal: 'Traversal';
        Getter: 'Getter';
        AffineFold: 'AffineFold';
        Fold: 'Fold';
        Setter: 'Setter';
    };
    Prism: {
        Equivalence: 'Prism';
        Iso: 'Prism';
        Lens: 'Prism';
        Prism: 'Prism';
        Traversal: 'Traversal';
        Getter: 'AffineFold';
        AffineFold: 'AffineFold';
        Fold: 'Fold';
        Setter: 'Setter';
    };
    Traversal: {
        Equivalence: 'Traversal';
        Iso: 'Traversal';
        Lens: 'Traversal';
        Prism: 'Traversal';
        Traversal: 'Traversal';
        Getter: 'Fold';
        AffineFold: 'Fold';
        Fold: 'Fold';
        Setter: 'Setter';
    };
    Getter: {
        Equivalence: 'Getter';
        Iso: 'Getter';
        Lens: 'Getter';
        Prism: 'AffineFold';
        Traversal: 'Fold';
        Getter: 'Getter';
        AffineFold: 'AffineFold';
        Fold: 'Fold';
        Setter: never;
    };
    AffineFold: {
        Equivalence: 'AffineFold';
        Iso: 'AffineFold';
        Lens: 'AffineFold';
        Prism: 'AffineFold';
        Traversal: 'Fold';
        Getter: 'AffineFold';
        AffineFold: 'AffineFold';
        Fold: 'Fold';
        Setter: never;
    };
    Fold: {
        Equivalence: 'Fold';
        Iso: 'Fold';
        Lens: 'Fold';
        Prism: 'Fold';
        Traversal: 'Fold';
        Getter: 'Fold';
        AffineFold: 'Fold';
        Fold: 'Fold';
        Setter: never;
    };
    Setter: {
        Equivalence: never;
        Iso: never;
        Lens: never;
        Prism: never;
        Traversal: never;
        Getter: never;
        AffineFold: never;
        Fold: never;
        Setter: never;
    };
};
export type ComposeC<C1 extends Class, C2 extends Class> = C1 extends keyof ClassTable ? C2 extends keyof ClassTable[C1] ? ClassTable[C1][C2] : never : never;
type ToOptic<O> = O extends string ? Prop<O> : O extends Optic<any, any, any, any> ? O : never;
type Compose1<O1, O2> = ToOptic<O1> extends Optic<infer C1, infer A1, infer T1, any> ? ToOptic<O2> extends Optic<infer C2, infer A2, infer T2, infer R> ? Optic<ComposeC<C1, C2>, ComposeA<A1, A2>, ComposeT<T1, A1, T2>, R> : never : never;
export type Compose<T extends [any, ...any]> = T extends [
    infer First,
    infer Second,
    ...infer Rest
] ? Compose1<First, Compose<[Second, ...Rest]>> : T extends [infer First] ? ToOptic<First> : never;
export type ComposeArg = string | Optic<any, any, any, any>;
export declare function compose<T extends [ComposeArg, ...ComposeArg[]]>(...args: T): Compose<T>;
export {};

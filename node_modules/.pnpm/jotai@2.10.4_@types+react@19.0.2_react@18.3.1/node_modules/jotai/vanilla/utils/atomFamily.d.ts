import { type Atom } from 'jotai/vanilla';
/**
 * in milliseconds
 */
type CreatedAt = number;
type ShouldRemove<Param> = (createdAt: CreatedAt, param: Param) => boolean;
type Cleanup = () => void;
type Callback<Param, AtomType> = (event: {
    type: 'CREATE' | 'REMOVE';
    param: Param;
    atom: AtomType;
}) => void;
export interface AtomFamily<Param, AtomType> {
    (param: Param): AtomType;
    getParams(): Iterable<Param>;
    remove(param: Param): void;
    setShouldRemove(shouldRemove: ShouldRemove<Param> | null): void;
    /**
     * fires when a atom is created or removed
     * This API is for advanced use cases, and can change without notice.
     */
    unstable_listen(callback: Callback<Param, AtomType>): Cleanup;
}
export declare function atomFamily<Param, AtomType extends Atom<unknown>>(initializeAtom: (param: Param) => AtomType, areEqual?: (a: Param, b: Param) => boolean): AtomFamily<Param, AtomType>;
export {};

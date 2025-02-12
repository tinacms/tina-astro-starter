/* eslint-disable @typescript-eslint/adjacent-overload-signatures, @typescript-eslint/no-unused-vars */
// This file is generated, do not edit! See ../scripts/generate-index.ts
import * as I from './internals.js';
export function compose(optic1, optic2) {
    return optic1.compose(optic2);
}
export function optic() {
    return I.optic;
}
export function optic_() {
    return I.optic;
}
export function get(optic) {
    return (source) => I.get(optic._ref, source);
}
export function preview(optic) {
    return (source) => I.preview(optic._ref, source);
}
export function collect(optic) {
    return (source) => I.collect(optic._ref, source);
}
export function modify(optic) {
    return (f) => (source) => I.modify(optic._ref, f, source);
}
export function set(optic) {
    return (value) => (source) => I.set(optic._ref, value, source);
}
export function remove(optic) {
    return (source) => I.remove(optic._ref, source);
}
export { pipe } from './standalone/pipe.js';

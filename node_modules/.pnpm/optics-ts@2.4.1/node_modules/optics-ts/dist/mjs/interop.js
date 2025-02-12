import * as I from './internals.js';
function toOptic(optic) {
    if (Object.prototype.hasOwnProperty.call(optic, '_ref'))
        return optic._ref;
    return optic;
}
export function get(optic, source) {
    return I.get(toOptic(optic), source);
}
export function preview(optic, source) {
    return I.preview(toOptic(optic), source);
}
export function collect(optic, source) {
    return I.collect(toOptic(optic), source);
}
export function modify(optic, f, source) {
    return I.modify(toOptic(optic), f, source);
}
export function set(optic, value, source) {
    return I.set(toOptic(optic), value, source);
}
export function remove(optic, source) {
    return I.remove(toOptic(optic), source);
}

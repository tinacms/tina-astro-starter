import * as I from '../internals.js';
export function guard(arg) {
    if (arg === undefined)
        return I.guard;
    else
        return I.guard(arg);
}

import * as I from '../internals.js';
import { compose } from './compose.js';
export function partsOf(arg, ...args) {
    if (!args.length)
        return I.partsOf(arg);
    return I.partsOf(compose(arg, ...args));
}

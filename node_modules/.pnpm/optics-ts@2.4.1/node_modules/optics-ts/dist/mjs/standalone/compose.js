import { prop } from './prop.js';
import { compositionType } from '../internals.js';
function compose1(optic1, optic2) {
    const result = (P, optic) => optic1(P, optic2(P, optic));
    result._tag =
        compositionType[optic1._tag][optic2._tag];
    result._removable = optic2._removable || undefined;
    return result;
}
export function compose(...args) {
    const [first, ...rest] = args;
    const optic = typeof first === 'string' ? prop(first) : first;
    if (!rest.length)
        return optic;
    return compose1(optic, compose(...rest));
}

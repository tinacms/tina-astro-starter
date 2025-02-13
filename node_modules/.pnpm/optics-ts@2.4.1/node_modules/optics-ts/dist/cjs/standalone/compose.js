"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compose = void 0;
const prop_js_1 = require("./prop.js");
const internals_js_1 = require("../internals.js");
function compose1(optic1, optic2) {
    const result = (P, optic) => optic1(P, optic2(P, optic));
    result._tag =
        internals_js_1.compositionType[optic1._tag][optic2._tag];
    result._removable = optic2._removable || undefined;
    return result;
}
function compose(...args) {
    const [first, ...rest] = args;
    const optic = typeof first === 'string' ? (0, prop_js_1.prop)(first) : first;
    if (!rest.length)
        return optic;
    return compose1(optic, compose(...rest));
}
exports.compose = compose;

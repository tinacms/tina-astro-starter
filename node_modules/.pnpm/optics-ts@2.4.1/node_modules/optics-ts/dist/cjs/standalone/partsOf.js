"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partsOf = void 0;
const I = require("../internals.js");
const compose_js_1 = require("./compose.js");
function partsOf(arg, ...args) {
    if (!args.length)
        return I.partsOf(arg);
    return I.partsOf((0, compose_js_1.compose)(arg, ...args));
}
exports.partsOf = partsOf;

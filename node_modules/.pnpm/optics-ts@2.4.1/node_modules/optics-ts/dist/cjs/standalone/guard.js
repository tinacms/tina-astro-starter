"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.guard = void 0;
const I = require("../internals.js");
function guard(arg) {
    if (arg === undefined)
        return I.guard;
    else
        return I.guard(arg);
}
exports.guard = guard;

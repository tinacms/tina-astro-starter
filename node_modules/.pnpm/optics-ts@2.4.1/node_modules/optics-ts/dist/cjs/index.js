"use strict";
/* eslint-disable @typescript-eslint/adjacent-overload-signatures, @typescript-eslint/no-unused-vars */
// This file is generated, do not edit! See ../scripts/generate-index.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.pipe = exports.remove = exports.set = exports.modify = exports.collect = exports.preview = exports.get = exports.optic_ = exports.optic = exports.compose = void 0;
const I = require("./internals.js");
function compose(optic1, optic2) {
    return optic1.compose(optic2);
}
exports.compose = compose;
function optic() {
    return I.optic;
}
exports.optic = optic;
function optic_() {
    return I.optic;
}
exports.optic_ = optic_;
function get(optic) {
    return (source) => I.get(optic._ref, source);
}
exports.get = get;
function preview(optic) {
    return (source) => I.preview(optic._ref, source);
}
exports.preview = preview;
function collect(optic) {
    return (source) => I.collect(optic._ref, source);
}
exports.collect = collect;
function modify(optic) {
    return (f) => (source) => I.modify(optic._ref, f, source);
}
exports.modify = modify;
function set(optic) {
    return (value) => (source) => I.set(optic._ref, value, source);
}
exports.set = set;
function remove(optic) {
    return (source) => I.remove(optic._ref, source);
}
exports.remove = remove;
var pipe_js_1 = require("./standalone/pipe.js");
Object.defineProperty(exports, "pipe", { enumerable: true, get: function () { return pipe_js_1.pipe; } });

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.set = exports.modify = exports.collect = exports.preview = exports.get = void 0;
const I = require("./internals.js");
function toOptic(optic) {
    if (Object.prototype.hasOwnProperty.call(optic, '_ref'))
        return optic._ref;
    return optic;
}
function get(optic, source) {
    return I.get(toOptic(optic), source);
}
exports.get = get;
function preview(optic, source) {
    return I.preview(toOptic(optic), source);
}
exports.preview = preview;
function collect(optic, source) {
    return I.collect(toOptic(optic), source);
}
exports.collect = collect;
function modify(optic, f, source) {
    return I.modify(toOptic(optic), f, source);
}
exports.modify = modify;
function set(optic, value, source) {
    return I.set(toOptic(optic), value, source);
}
exports.set = set;
function remove(optic, source) {
    return I.remove(toOptic(optic), source);
}
exports.remove = remove;

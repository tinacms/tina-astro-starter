"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.set = exports.modify = exports.collect = exports.preview = exports.get = void 0;
const I = require("../internals.js");
function get(...args) {
    switch (args.length) {
        case 1:
            return (source) => I.get(args[0], source);
        case 2:
            return I.get(args[0], args[1]);
    }
}
exports.get = get;
function preview(...args) {
    switch (args.length) {
        case 1:
            return (source) => I.preview(args[0], source);
        case 2:
            return I.preview(args[0], args[1]);
    }
}
exports.preview = preview;
function collect(...args) {
    switch (args.length) {
        case 1:
            return (source) => I.collect(args[0], source);
        case 2:
            return I.collect(args[0], args[1]);
    }
}
exports.collect = collect;
function modify(...args) {
    switch (args.length) {
        case 1:
            return (f) => (source) => I.modify(args[0], f, source);
        case 2:
            return (source) => I.modify(args[0], args[1], source);
        case 3:
            return I.modify(args[0], args[1], args[2]);
    }
}
exports.modify = modify;
function set(...args) {
    switch (args.length) {
        case 1:
            return (value) => (source) => I.set(args[0], value, source);
        case 2:
            return (source) => I.set(args[0], args[1], source);
        case 3:
            return I.set(args[0], args[1], args[2]);
    }
}
exports.set = set;
function remove(...args) {
    switch (args.length) {
        case 1:
            return (source) => I.remove(args[0], source);
        case 2:
            return I.remove(args[0], args[1]);
    }
}
exports.remove = remove;

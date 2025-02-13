"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lens = void 0;
const I = require("../internals.js");
const lens = (view, update) => I.lens(view, ([u, v]) => update(v, u));
exports.lens = lens;

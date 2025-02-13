import * as I from '../internals.js';
export const lens = (view, update) => I.lens(view, ([u, v]) => update(v, u));

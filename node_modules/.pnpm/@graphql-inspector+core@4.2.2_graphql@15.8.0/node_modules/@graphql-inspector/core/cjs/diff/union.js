"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changesInUnion = void 0;
const compare_js_1 = require("../utils/compare.js");
const union_js_1 = require("./changes/union.js");
function changesInUnion(oldUnion, newUnion, addChange) {
    const oldTypes = oldUnion.getTypes();
    const newTypes = newUnion.getTypes();
    (0, compare_js_1.compareLists)(oldTypes, newTypes, {
        onAdded(t) {
            addChange((0, union_js_1.unionMemberAdded)(newUnion, t));
        },
        onRemoved(t) {
            addChange((0, union_js_1.unionMemberRemoved)(oldUnion, t));
        },
    });
}
exports.changesInUnion = changesInUnion;

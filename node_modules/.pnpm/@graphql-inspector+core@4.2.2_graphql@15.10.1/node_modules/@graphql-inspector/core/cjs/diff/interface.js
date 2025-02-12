"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changesInInterface = void 0;
const compare_js_1 = require("../utils/compare.js");
const field_js_1 = require("./changes/field.js");
const field_js_2 = require("./field.js");
function changesInInterface(oldInterface, newInterface, addChange) {
    (0, compare_js_1.compareLists)(Object.values(oldInterface.getFields()), Object.values(newInterface.getFields()), {
        onAdded(field) {
            addChange((0, field_js_1.fieldAdded)(newInterface, field));
        },
        onRemoved(field) {
            addChange((0, field_js_1.fieldRemoved)(oldInterface, field));
        },
        onMutual(field) {
            (0, field_js_2.changesInField)(oldInterface, field.oldVersion, field.newVersion, addChange);
        },
    });
}
exports.changesInInterface = changesInInterface;

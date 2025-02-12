"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changesInArgument = void 0;
const compare_js_1 = require("../utils/compare.js");
const argument_js_1 = require("./changes/argument.js");
function changesInArgument(type, field, oldArg, newArg, addChange) {
    if ((0, compare_js_1.isNotEqual)(oldArg.description, newArg.description)) {
        addChange((0, argument_js_1.fieldArgumentDescriptionChanged)(type, field, oldArg, newArg));
    }
    if ((0, compare_js_1.isNotEqual)(oldArg.defaultValue, newArg.defaultValue)) {
        if (Array.isArray(oldArg.defaultValue) && Array.isArray(newArg.defaultValue)) {
            const diff = (0, compare_js_1.diffArrays)(oldArg.defaultValue, newArg.defaultValue);
            if (diff.length > 0) {
                addChange((0, argument_js_1.fieldArgumentDefaultChanged)(type, field, oldArg, newArg));
            }
        }
        else if (JSON.stringify(oldArg.defaultValue) !== JSON.stringify(newArg.defaultValue)) {
            addChange((0, argument_js_1.fieldArgumentDefaultChanged)(type, field, oldArg, newArg));
        }
    }
    if ((0, compare_js_1.isNotEqual)(oldArg.type.toString(), newArg.type.toString())) {
        addChange((0, argument_js_1.fieldArgumentTypeChanged)(type, field, oldArg, newArg));
    }
}
exports.changesInArgument = changesInArgument;

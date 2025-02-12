"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changesInField = void 0;
const compare_js_1 = require("../utils/compare.js");
const is_deprecated_js_1 = require("../utils/is-deprecated.js");
const argument_js_1 = require("./argument.js");
const field_js_1 = require("./changes/field.js");
function changesInField(type, oldField, newField, addChange) {
    if ((0, compare_js_1.isNotEqual)(oldField.description, newField.description)) {
        if ((0, compare_js_1.isVoid)(oldField.description)) {
            addChange((0, field_js_1.fieldDescriptionAdded)(type, newField));
        }
        else if ((0, compare_js_1.isVoid)(newField.description)) {
            addChange((0, field_js_1.fieldDescriptionRemoved)(type, oldField));
        }
        else {
            addChange((0, field_js_1.fieldDescriptionChanged)(type, oldField, newField));
        }
    }
    if ((0, compare_js_1.isNotEqual)((0, is_deprecated_js_1.isDeprecated)(oldField), (0, is_deprecated_js_1.isDeprecated)(newField))) {
        if ((0, is_deprecated_js_1.isDeprecated)(newField)) {
            addChange((0, field_js_1.fieldDeprecationAdded)(type, newField));
        }
        else {
            addChange((0, field_js_1.fieldDeprecationRemoved)(type, oldField));
        }
    }
    if ((0, compare_js_1.isNotEqual)(oldField.deprecationReason, newField.deprecationReason)) {
        if ((0, compare_js_1.isVoid)(oldField.deprecationReason)) {
            addChange((0, field_js_1.fieldDeprecationReasonAdded)(type, newField));
        }
        else if ((0, compare_js_1.isVoid)(newField.deprecationReason)) {
            addChange((0, field_js_1.fieldDeprecationReasonRemoved)(type, oldField));
        }
        else {
            addChange((0, field_js_1.fieldDeprecationReasonChanged)(type, oldField, newField));
        }
    }
    if ((0, compare_js_1.isNotEqual)(oldField.type.toString(), newField.type.toString())) {
        addChange((0, field_js_1.fieldTypeChanged)(type, oldField, newField));
    }
    (0, compare_js_1.compareLists)(oldField.args, newField.args, {
        onAdded(arg) {
            addChange((0, field_js_1.fieldArgumentAdded)(type, newField, arg));
        },
        onRemoved(arg) {
            addChange((0, field_js_1.fieldArgumentRemoved)(type, oldField, arg));
        },
        onMutual(arg) {
            (0, argument_js_1.changesInArgument)(type, oldField, arg.oldVersion, arg.newVersion, addChange);
        },
    });
}
exports.changesInField = changesInField;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changesInInputObject = void 0;
const compare_js_1 = require("../utils/compare.js");
const input_js_1 = require("./changes/input.js");
function changesInInputObject(oldInput, newInput, addChange) {
    const oldFields = oldInput.getFields();
    const newFields = newInput.getFields();
    (0, compare_js_1.compareLists)(Object.values(oldFields), Object.values(newFields), {
        onAdded(field) {
            addChange((0, input_js_1.inputFieldAdded)(newInput, field));
        },
        onRemoved(field) {
            addChange((0, input_js_1.inputFieldRemoved)(oldInput, field));
        },
        onMutual(field) {
            changesInInputField(oldInput, field.oldVersion, field.newVersion, addChange);
        },
    });
}
exports.changesInInputObject = changesInInputObject;
function changesInInputField(input, oldField, newField, addChange) {
    if ((0, compare_js_1.isNotEqual)(oldField.description, newField.description)) {
        if ((0, compare_js_1.isVoid)(oldField.description)) {
            addChange((0, input_js_1.inputFieldDescriptionAdded)(input, newField));
        }
        else if ((0, compare_js_1.isVoid)(newField.description)) {
            addChange((0, input_js_1.inputFieldDescriptionRemoved)(input, oldField));
        }
        else {
            addChange((0, input_js_1.inputFieldDescriptionChanged)(input, oldField, newField));
        }
    }
    if ((0, compare_js_1.isNotEqual)(oldField.defaultValue, newField.defaultValue)) {
        if (Array.isArray(oldField.defaultValue) && Array.isArray(newField.defaultValue)) {
            if ((0, compare_js_1.diffArrays)(oldField.defaultValue, newField.defaultValue).length > 0) {
                addChange((0, input_js_1.inputFieldDefaultValueChanged)(input, oldField, newField));
            }
        }
        else if (JSON.stringify(oldField.defaultValue) !== JSON.stringify(newField.defaultValue)) {
            addChange((0, input_js_1.inputFieldDefaultValueChanged)(input, oldField, newField));
        }
    }
    if ((0, compare_js_1.isNotEqual)(oldField.type.toString(), newField.type.toString())) {
        addChange((0, input_js_1.inputFieldTypeChanged)(input, oldField, newField));
    }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changesInEnum = void 0;
const compare_js_1 = require("../utils/compare.js");
const enum_js_1 = require("./changes/enum.js");
function changesInEnum(oldEnum, newEnum, addChange) {
    (0, compare_js_1.compareLists)(oldEnum.getValues(), newEnum.getValues(), {
        onAdded(value) {
            addChange((0, enum_js_1.enumValueAdded)(newEnum, value));
        },
        onRemoved(value) {
            addChange((0, enum_js_1.enumValueRemoved)(oldEnum, value));
        },
        onMutual(value) {
            const oldValue = value.oldVersion;
            const newValue = value.newVersion;
            if ((0, compare_js_1.isNotEqual)(oldValue.description, newValue.description)) {
                addChange((0, enum_js_1.enumValueDescriptionChanged)(newEnum, oldValue, newValue));
            }
            if ((0, compare_js_1.isNotEqual)(oldValue.deprecationReason, newValue.deprecationReason)) {
                if ((0, compare_js_1.isVoid)(oldValue.deprecationReason)) {
                    addChange((0, enum_js_1.enumValueDeprecationReasonAdded)(newEnum, oldValue, newValue));
                }
                else if ((0, compare_js_1.isVoid)(newValue.deprecationReason)) {
                    addChange((0, enum_js_1.enumValueDeprecationReasonRemoved)(newEnum, oldValue, newValue));
                }
                else {
                    addChange((0, enum_js_1.enumValueDeprecationReasonChanged)(newEnum, oldValue, newValue));
                }
            }
        },
    });
}
exports.changesInEnum = changesInEnum;

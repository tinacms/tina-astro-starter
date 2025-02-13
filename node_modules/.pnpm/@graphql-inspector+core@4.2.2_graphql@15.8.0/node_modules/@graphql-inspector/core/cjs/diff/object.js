"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changesInObject = void 0;
const compare_js_1 = require("../utils/compare.js");
const field_js_1 = require("./changes/field.js");
const object_js_1 = require("./changes/object.js");
const field_js_2 = require("./field.js");
function changesInObject(oldType, newType, addChange) {
    const oldInterfaces = oldType.getInterfaces();
    const newInterfaces = newType.getInterfaces();
    const oldFields = oldType.getFields();
    const newFields = newType.getFields();
    (0, compare_js_1.compareLists)(oldInterfaces, newInterfaces, {
        onAdded(i) {
            addChange((0, object_js_1.objectTypeInterfaceAdded)(i, newType));
        },
        onRemoved(i) {
            addChange((0, object_js_1.objectTypeInterfaceRemoved)(i, oldType));
        },
    });
    (0, compare_js_1.compareLists)(Object.values(oldFields), Object.values(newFields), {
        onAdded(f) {
            addChange((0, field_js_1.fieldAdded)(newType, f));
        },
        onRemoved(f) {
            addChange((0, field_js_1.fieldRemoved)(oldType, f));
        },
        onMutual(f) {
            (0, field_js_2.changesInField)(oldType, f.oldVersion, f.newVersion, addChange);
        },
    });
}
exports.changesInObject = changesInObject;

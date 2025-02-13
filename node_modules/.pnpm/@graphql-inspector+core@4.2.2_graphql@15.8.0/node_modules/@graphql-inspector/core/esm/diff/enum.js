import { compareLists, isNotEqual, isVoid } from '../utils/compare.js';
import { enumValueAdded, enumValueDeprecationReasonAdded, enumValueDeprecationReasonChanged, enumValueDeprecationReasonRemoved, enumValueDescriptionChanged, enumValueRemoved, } from './changes/enum.js';
export function changesInEnum(oldEnum, newEnum, addChange) {
    compareLists(oldEnum.getValues(), newEnum.getValues(), {
        onAdded(value) {
            addChange(enumValueAdded(newEnum, value));
        },
        onRemoved(value) {
            addChange(enumValueRemoved(oldEnum, value));
        },
        onMutual(value) {
            const oldValue = value.oldVersion;
            const newValue = value.newVersion;
            if (isNotEqual(oldValue.description, newValue.description)) {
                addChange(enumValueDescriptionChanged(newEnum, oldValue, newValue));
            }
            if (isNotEqual(oldValue.deprecationReason, newValue.deprecationReason)) {
                if (isVoid(oldValue.deprecationReason)) {
                    addChange(enumValueDeprecationReasonAdded(newEnum, oldValue, newValue));
                }
                else if (isVoid(newValue.deprecationReason)) {
                    addChange(enumValueDeprecationReasonRemoved(newEnum, oldValue, newValue));
                }
                else {
                    addChange(enumValueDeprecationReasonChanged(newEnum, oldValue, newValue));
                }
            }
        },
    });
}

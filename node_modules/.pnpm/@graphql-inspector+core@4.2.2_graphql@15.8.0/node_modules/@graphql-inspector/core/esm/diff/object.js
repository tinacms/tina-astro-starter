import { compareLists } from '../utils/compare.js';
import { fieldAdded, fieldRemoved } from './changes/field.js';
import { objectTypeInterfaceAdded, objectTypeInterfaceRemoved } from './changes/object.js';
import { changesInField } from './field.js';
export function changesInObject(oldType, newType, addChange) {
    const oldInterfaces = oldType.getInterfaces();
    const newInterfaces = newType.getInterfaces();
    const oldFields = oldType.getFields();
    const newFields = newType.getFields();
    compareLists(oldInterfaces, newInterfaces, {
        onAdded(i) {
            addChange(objectTypeInterfaceAdded(i, newType));
        },
        onRemoved(i) {
            addChange(objectTypeInterfaceRemoved(i, oldType));
        },
    });
    compareLists(Object.values(oldFields), Object.values(newFields), {
        onAdded(f) {
            addChange(fieldAdded(newType, f));
        },
        onRemoved(f) {
            addChange(fieldRemoved(oldType, f));
        },
        onMutual(f) {
            changesInField(oldType, f.oldVersion, f.newVersion, addChange);
        },
    });
}

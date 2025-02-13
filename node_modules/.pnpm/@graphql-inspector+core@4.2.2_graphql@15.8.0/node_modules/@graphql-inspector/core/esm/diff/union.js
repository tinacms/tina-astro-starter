import { compareLists } from '../utils/compare.js';
import { unionMemberAdded, unionMemberRemoved } from './changes/union.js';
export function changesInUnion(oldUnion, newUnion, addChange) {
    const oldTypes = oldUnion.getTypes();
    const newTypes = newUnion.getTypes();
    compareLists(oldTypes, newTypes, {
        onAdded(t) {
            addChange(unionMemberAdded(newUnion, t));
        },
        onRemoved(t) {
            addChange(unionMemberRemoved(oldUnion, t));
        },
    });
}

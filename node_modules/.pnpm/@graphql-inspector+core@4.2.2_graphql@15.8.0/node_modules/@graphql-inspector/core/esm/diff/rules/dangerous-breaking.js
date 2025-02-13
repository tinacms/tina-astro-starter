import { CriticalityLevel } from './../changes/change.js';
export const dangerousBreaking = ({ changes }) => {
    return changes.map(change => {
        if (change.criticality.level === CriticalityLevel.Dangerous) {
            return Object.assign(Object.assign({}, change), { criticality: Object.assign(Object.assign({}, change.criticality), { level: CriticalityLevel.Breaking }) });
        }
        return change;
    });
};

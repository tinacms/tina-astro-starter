import { isDeprecated } from '../../utils/is-deprecated.js';
import { ChangeType, CriticalityLevel, } from './change.js';
function buildEnumValueRemovedMessage(args) {
    return `Enum value '${args.removedEnumValueName}' ${args.isEnumValueDeprecated ? '(deprecated) ' : ''}was removed from enum '${args.enumName}'`;
}
const enumValueRemovedCriticalityBreakingReason = `Removing an enum value will cause existing queries that use this enum value to error.`;
export function enumValueRemovedFromMeta(args) {
    return {
        type: ChangeType.EnumValueRemoved,
        criticality: {
            level: CriticalityLevel.Breaking,
            reason: enumValueRemovedCriticalityBreakingReason,
        },
        message: buildEnumValueRemovedMessage(args.meta),
        meta: args.meta,
        path: [args.meta.enumName, args.meta.removedEnumValueName].join('.'),
    };
}
export function enumValueRemoved(oldEnum, value) {
    return enumValueRemovedFromMeta({
        type: ChangeType.EnumValueRemoved,
        meta: {
            enumName: oldEnum.name,
            removedEnumValueName: value.name,
            isEnumValueDeprecated: isDeprecated(value),
        },
    });
}
function buildEnumValueAddedMessage(args) {
    return `Enum value '${args.meta.addedEnumValueName}' was added to enum '${args.meta.enumName}'`;
}
const enumValueAddedCriticalityDangerousReason = `Adding an enum value may break existing clients that were not programming defensively against an added case when querying an enum.`;
export function enumValueAddedFromMeta(args) {
    return {
        type: ChangeType.EnumValueAdded,
        criticality: {
            level: CriticalityLevel.Dangerous,
            reason: enumValueAddedCriticalityDangerousReason,
        },
        message: buildEnumValueAddedMessage(args),
        meta: args.meta,
        path: [args.meta.enumName, args.meta.addedEnumValueName].join('.'),
    };
}
export function enumValueAdded(newEnum, value) {
    return enumValueAddedFromMeta({
        type: ChangeType.EnumValueAdded,
        meta: {
            enumName: newEnum.name,
            addedEnumValueName: value.name,
        },
    });
}
function buildEnumValueDescriptionChangedMessage(args) {
    var _a, _b, _c;
    return args.oldEnumValueDescription === null
        ? `Description '${(_a = args.newEnumValueDescription) !== null && _a !== void 0 ? _a : 'undefined'}' was added to enum value '${args.enumName}.${args.enumValueName}'`
        : `Description for enum value '${args.enumName}.${args.enumValueName}' changed from '${(_b = args.oldEnumValueDescription) !== null && _b !== void 0 ? _b : 'undefined'}' to '${(_c = args.newEnumValueDescription) !== null && _c !== void 0 ? _c : 'undefined'}'`;
}
export function enumValueDescriptionChangedFromMeta(args) {
    return {
        criticality: {
            level: CriticalityLevel.NonBreaking,
        },
        type: ChangeType.EnumValueDescriptionChanged,
        message: buildEnumValueDescriptionChangedMessage(args.meta),
        path: [args.meta.enumName, args.meta.enumValueName].join('.'),
        meta: args.meta,
    };
}
export function enumValueDescriptionChanged(newEnum, oldValue, newValue) {
    var _a, _b;
    return enumValueDescriptionChangedFromMeta({
        type: ChangeType.EnumValueDescriptionChanged,
        meta: {
            enumName: newEnum.name,
            enumValueName: oldValue.name,
            oldEnumValueDescription: (_a = oldValue.description) !== null && _a !== void 0 ? _a : null,
            newEnumValueDescription: (_b = newValue.description) !== null && _b !== void 0 ? _b : null,
        },
    });
}
function buildEnumValueDeprecationChangedMessage(args) {
    return `Enum value '${args.enumName}.${args.enumValueName}' deprecation reason changed from '${args.oldEnumValueDeprecationReason}' to '${args.newEnumValueDeprecationReason}'`;
}
export function enumValueDeprecationReasonChangedFromMeta(args) {
    return {
        criticality: {
            level: CriticalityLevel.NonBreaking,
        },
        type: ChangeType.EnumValueDeprecationReasonChanged,
        message: buildEnumValueDeprecationChangedMessage(args.meta),
        path: [args.meta.enumName, args.meta.enumValueName].join('.'),
        meta: args.meta,
    };
}
export function enumValueDeprecationReasonChanged(newEnum, oldValue, newValue) {
    var _a, _b;
    return enumValueDeprecationReasonChangedFromMeta({
        type: ChangeType.EnumValueDeprecationReasonChanged,
        meta: {
            enumName: newEnum.name,
            enumValueName: oldValue.name,
            oldEnumValueDeprecationReason: (_a = oldValue.deprecationReason) !== null && _a !== void 0 ? _a : '',
            newEnumValueDeprecationReason: (_b = newValue.deprecationReason) !== null && _b !== void 0 ? _b : '',
        },
    });
}
function buildEnumValueDeprecationReasonAddedMessage(args) {
    return `Enum value '${args.enumName}.${args.enumValueName}' was deprecated with reason '${args.addedValueDeprecationReason}'`;
}
export function enumValueDeprecationReasonAddedFromMeta(args) {
    return {
        criticality: {
            level: CriticalityLevel.NonBreaking,
        },
        type: ChangeType.EnumValueDeprecationReasonAdded,
        message: buildEnumValueDeprecationReasonAddedMessage(args.meta),
        path: [args.meta.enumName, args.meta.enumValueName].join('.'),
        meta: args.meta,
    };
}
export function enumValueDeprecationReasonAdded(newEnum, oldValue, newValue) {
    var _a;
    return enumValueDeprecationReasonAddedFromMeta({
        type: ChangeType.EnumValueDeprecationReasonAdded,
        meta: {
            enumName: newEnum.name,
            enumValueName: oldValue.name,
            addedValueDeprecationReason: (_a = newValue.deprecationReason) !== null && _a !== void 0 ? _a : '',
        },
    });
}
function buildEnumValueDeprecationReasonRemovedMessage(args) {
    return `Deprecation reason was removed from enum value '${args.enumName}.${args.enumValueName}'`;
}
export function enumValueDeprecationReasonRemovedFromMeta(args) {
    return {
        criticality: {
            level: CriticalityLevel.NonBreaking,
        },
        type: ChangeType.EnumValueDeprecationReasonRemoved,
        message: buildEnumValueDeprecationReasonRemovedMessage(args.meta),
        path: [args.meta.enumName, args.meta.enumValueName].join('.'),
        meta: args.meta,
    };
}
export function enumValueDeprecationReasonRemoved(newEnum, oldValue, _newValue) {
    var _a;
    return enumValueDeprecationReasonRemovedFromMeta({
        type: ChangeType.EnumValueDeprecationReasonRemoved,
        meta: {
            enumName: newEnum.name,
            enumValueName: oldValue.name,
            removedEnumValueDeprecationReason: (_a = oldValue.deprecationReason) !== null && _a !== void 0 ? _a : '',
        },
    });
}

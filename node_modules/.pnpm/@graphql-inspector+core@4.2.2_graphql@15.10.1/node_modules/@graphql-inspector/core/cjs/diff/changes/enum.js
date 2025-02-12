"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enumValueDeprecationReasonRemoved = exports.enumValueDeprecationReasonRemovedFromMeta = exports.enumValueDeprecationReasonAdded = exports.enumValueDeprecationReasonAddedFromMeta = exports.enumValueDeprecationReasonChanged = exports.enumValueDeprecationReasonChangedFromMeta = exports.enumValueDescriptionChanged = exports.enumValueDescriptionChangedFromMeta = exports.enumValueAdded = exports.enumValueAddedFromMeta = exports.enumValueRemoved = exports.enumValueRemovedFromMeta = void 0;
const is_deprecated_js_1 = require("../../utils/is-deprecated.js");
const change_js_1 = require("./change.js");
function buildEnumValueRemovedMessage(args) {
    return `Enum value '${args.removedEnumValueName}' ${args.isEnumValueDeprecated ? '(deprecated) ' : ''}was removed from enum '${args.enumName}'`;
}
const enumValueRemovedCriticalityBreakingReason = `Removing an enum value will cause existing queries that use this enum value to error.`;
function enumValueRemovedFromMeta(args) {
    return {
        type: change_js_1.ChangeType.EnumValueRemoved,
        criticality: {
            level: change_js_1.CriticalityLevel.Breaking,
            reason: enumValueRemovedCriticalityBreakingReason,
        },
        message: buildEnumValueRemovedMessage(args.meta),
        meta: args.meta,
        path: [args.meta.enumName, args.meta.removedEnumValueName].join('.'),
    };
}
exports.enumValueRemovedFromMeta = enumValueRemovedFromMeta;
function enumValueRemoved(oldEnum, value) {
    return enumValueRemovedFromMeta({
        type: change_js_1.ChangeType.EnumValueRemoved,
        meta: {
            enumName: oldEnum.name,
            removedEnumValueName: value.name,
            isEnumValueDeprecated: (0, is_deprecated_js_1.isDeprecated)(value),
        },
    });
}
exports.enumValueRemoved = enumValueRemoved;
function buildEnumValueAddedMessage(args) {
    return `Enum value '${args.meta.addedEnumValueName}' was added to enum '${args.meta.enumName}'`;
}
const enumValueAddedCriticalityDangerousReason = `Adding an enum value may break existing clients that were not programming defensively against an added case when querying an enum.`;
function enumValueAddedFromMeta(args) {
    return {
        type: change_js_1.ChangeType.EnumValueAdded,
        criticality: {
            level: change_js_1.CriticalityLevel.Dangerous,
            reason: enumValueAddedCriticalityDangerousReason,
        },
        message: buildEnumValueAddedMessage(args),
        meta: args.meta,
        path: [args.meta.enumName, args.meta.addedEnumValueName].join('.'),
    };
}
exports.enumValueAddedFromMeta = enumValueAddedFromMeta;
function enumValueAdded(newEnum, value) {
    return enumValueAddedFromMeta({
        type: change_js_1.ChangeType.EnumValueAdded,
        meta: {
            enumName: newEnum.name,
            addedEnumValueName: value.name,
        },
    });
}
exports.enumValueAdded = enumValueAdded;
function buildEnumValueDescriptionChangedMessage(args) {
    var _a, _b, _c;
    return args.oldEnumValueDescription === null
        ? `Description '${(_a = args.newEnumValueDescription) !== null && _a !== void 0 ? _a : 'undefined'}' was added to enum value '${args.enumName}.${args.enumValueName}'`
        : `Description for enum value '${args.enumName}.${args.enumValueName}' changed from '${(_b = args.oldEnumValueDescription) !== null && _b !== void 0 ? _b : 'undefined'}' to '${(_c = args.newEnumValueDescription) !== null && _c !== void 0 ? _c : 'undefined'}'`;
}
function enumValueDescriptionChangedFromMeta(args) {
    return {
        criticality: {
            level: change_js_1.CriticalityLevel.NonBreaking,
        },
        type: change_js_1.ChangeType.EnumValueDescriptionChanged,
        message: buildEnumValueDescriptionChangedMessage(args.meta),
        path: [args.meta.enumName, args.meta.enumValueName].join('.'),
        meta: args.meta,
    };
}
exports.enumValueDescriptionChangedFromMeta = enumValueDescriptionChangedFromMeta;
function enumValueDescriptionChanged(newEnum, oldValue, newValue) {
    var _a, _b;
    return enumValueDescriptionChangedFromMeta({
        type: change_js_1.ChangeType.EnumValueDescriptionChanged,
        meta: {
            enumName: newEnum.name,
            enumValueName: oldValue.name,
            oldEnumValueDescription: (_a = oldValue.description) !== null && _a !== void 0 ? _a : null,
            newEnumValueDescription: (_b = newValue.description) !== null && _b !== void 0 ? _b : null,
        },
    });
}
exports.enumValueDescriptionChanged = enumValueDescriptionChanged;
function buildEnumValueDeprecationChangedMessage(args) {
    return `Enum value '${args.enumName}.${args.enumValueName}' deprecation reason changed from '${args.oldEnumValueDeprecationReason}' to '${args.newEnumValueDeprecationReason}'`;
}
function enumValueDeprecationReasonChangedFromMeta(args) {
    return {
        criticality: {
            level: change_js_1.CriticalityLevel.NonBreaking,
        },
        type: change_js_1.ChangeType.EnumValueDeprecationReasonChanged,
        message: buildEnumValueDeprecationChangedMessage(args.meta),
        path: [args.meta.enumName, args.meta.enumValueName].join('.'),
        meta: args.meta,
    };
}
exports.enumValueDeprecationReasonChangedFromMeta = enumValueDeprecationReasonChangedFromMeta;
function enumValueDeprecationReasonChanged(newEnum, oldValue, newValue) {
    var _a, _b;
    return enumValueDeprecationReasonChangedFromMeta({
        type: change_js_1.ChangeType.EnumValueDeprecationReasonChanged,
        meta: {
            enumName: newEnum.name,
            enumValueName: oldValue.name,
            oldEnumValueDeprecationReason: (_a = oldValue.deprecationReason) !== null && _a !== void 0 ? _a : '',
            newEnumValueDeprecationReason: (_b = newValue.deprecationReason) !== null && _b !== void 0 ? _b : '',
        },
    });
}
exports.enumValueDeprecationReasonChanged = enumValueDeprecationReasonChanged;
function buildEnumValueDeprecationReasonAddedMessage(args) {
    return `Enum value '${args.enumName}.${args.enumValueName}' was deprecated with reason '${args.addedValueDeprecationReason}'`;
}
function enumValueDeprecationReasonAddedFromMeta(args) {
    return {
        criticality: {
            level: change_js_1.CriticalityLevel.NonBreaking,
        },
        type: change_js_1.ChangeType.EnumValueDeprecationReasonAdded,
        message: buildEnumValueDeprecationReasonAddedMessage(args.meta),
        path: [args.meta.enumName, args.meta.enumValueName].join('.'),
        meta: args.meta,
    };
}
exports.enumValueDeprecationReasonAddedFromMeta = enumValueDeprecationReasonAddedFromMeta;
function enumValueDeprecationReasonAdded(newEnum, oldValue, newValue) {
    var _a;
    return enumValueDeprecationReasonAddedFromMeta({
        type: change_js_1.ChangeType.EnumValueDeprecationReasonAdded,
        meta: {
            enumName: newEnum.name,
            enumValueName: oldValue.name,
            addedValueDeprecationReason: (_a = newValue.deprecationReason) !== null && _a !== void 0 ? _a : '',
        },
    });
}
exports.enumValueDeprecationReasonAdded = enumValueDeprecationReasonAdded;
function buildEnumValueDeprecationReasonRemovedMessage(args) {
    return `Deprecation reason was removed from enum value '${args.enumName}.${args.enumValueName}'`;
}
function enumValueDeprecationReasonRemovedFromMeta(args) {
    return {
        criticality: {
            level: change_js_1.CriticalityLevel.NonBreaking,
        },
        type: change_js_1.ChangeType.EnumValueDeprecationReasonRemoved,
        message: buildEnumValueDeprecationReasonRemovedMessage(args.meta),
        path: [args.meta.enumName, args.meta.enumValueName].join('.'),
        meta: args.meta,
    };
}
exports.enumValueDeprecationReasonRemovedFromMeta = enumValueDeprecationReasonRemovedFromMeta;
function enumValueDeprecationReasonRemoved(newEnum, oldValue, _newValue) {
    var _a;
    return enumValueDeprecationReasonRemovedFromMeta({
        type: change_js_1.ChangeType.EnumValueDeprecationReasonRemoved,
        meta: {
            enumName: newEnum.name,
            enumValueName: oldValue.name,
            removedEnumValueDeprecationReason: (_a = oldValue.deprecationReason) !== null && _a !== void 0 ? _a : '',
        },
    });
}
exports.enumValueDeprecationReasonRemoved = enumValueDeprecationReasonRemoved;

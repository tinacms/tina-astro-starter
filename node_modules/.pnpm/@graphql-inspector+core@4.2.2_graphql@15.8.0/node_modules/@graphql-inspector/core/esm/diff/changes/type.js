import { getKind } from '../../utils/graphql.js';
import { ChangeType, CriticalityLevel, } from './change.js';
function buildTypeRemovedMessage(type) {
    return `Type '${type.removedTypeName}' was removed`;
}
export function typeRemovedFromMeta(args) {
    return {
        criticality: {
            level: CriticalityLevel.Breaking,
        },
        type: ChangeType.TypeRemoved,
        message: buildTypeRemovedMessage(args.meta),
        meta: args.meta,
        path: args.meta.removedTypeName,
    };
}
export function typeRemoved(type) {
    return typeRemovedFromMeta({
        type: ChangeType.TypeRemoved,
        meta: {
            removedTypeName: type.name,
        },
    });
}
function buildTypeAddedMessage(type) {
    return `Type '${type.addedTypeName}' was added`;
}
export function typeAddedFromMeta(args) {
    return {
        criticality: {
            level: CriticalityLevel.NonBreaking,
        },
        type: ChangeType.TypeAdded,
        message: buildTypeAddedMessage(args.meta),
        meta: args.meta,
        path: args.meta.addedTypeName,
    };
}
export function typeAdded(type) {
    return typeAddedFromMeta({
        type: ChangeType.TypeAdded,
        meta: {
            addedTypeName: type.name,
        },
    });
}
function buildTypeKindChangedMessage(args) {
    return `'${args.meta.typeName}' kind changed from '${args.meta.oldTypeKind}' to '${args.meta.newTypeKind}'`;
}
export function typeKindChangedFromMeta(args) {
    return {
        criticality: {
            level: CriticalityLevel.Breaking,
            reason: `Changing the kind of a type is a breaking change because it can cause existing queries to error. For example, turning an object type to a scalar type would break queries that define a selection set for this type.`,
        },
        type: ChangeType.TypeKindChanged,
        message: buildTypeKindChangedMessage(args),
        path: args.meta.typeName,
        meta: args.meta,
    };
}
export function typeKindChanged(oldType, newType) {
    return typeKindChangedFromMeta({
        type: ChangeType.TypeKindChanged,
        meta: {
            typeName: oldType.name,
            newTypeKind: String(getKind(newType)),
            oldTypeKind: String(getKind(oldType)),
        },
    });
}
function buildTypeDescriptionChangedMessage(args) {
    return `Description '${args.oldTypeDescription}' on type '${args.typeName}' has changed to '${args.newTypeDescription}'`;
}
export function typeDescriptionChangedFromMeta(args) {
    return {
        criticality: {
            level: CriticalityLevel.NonBreaking,
        },
        type: ChangeType.TypeDescriptionChanged,
        message: buildTypeDescriptionChangedMessage(args.meta),
        path: args.meta.typeName,
        meta: args.meta,
    };
}
export function typeDescriptionChanged(oldType, newType) {
    var _a, _b;
    return typeDescriptionChangedFromMeta({
        type: ChangeType.TypeDescriptionChanged,
        meta: {
            typeName: oldType.name,
            newTypeDescription: (_a = newType.description) !== null && _a !== void 0 ? _a : '',
            oldTypeDescription: (_b = oldType.description) !== null && _b !== void 0 ? _b : '',
        },
    });
}
function buildTypeDescriptionRemoved(args) {
    return `Description '${args.removedTypeDescription}' was removed from object type '${args.typeName}'`;
}
export function typeDescriptionRemovedFromMeta(args) {
    return {
        criticality: {
            level: CriticalityLevel.NonBreaking,
        },
        type: ChangeType.TypeDescriptionRemoved,
        message: buildTypeDescriptionRemoved(args.meta),
        path: args.meta.typeName,
        meta: args.meta,
    };
}
export function typeDescriptionRemoved(type) {
    var _a;
    return typeDescriptionRemovedFromMeta({
        type: ChangeType.TypeDescriptionRemoved,
        meta: {
            typeName: type.name,
            removedTypeDescription: (_a = type.description) !== null && _a !== void 0 ? _a : '',
        },
    });
}
function buildTypeDescriptionAddedMessage(args) {
    return `Object type '${args.typeName}' has description '${args.addedTypeDescription}'`;
}
export function typeDescriptionAddedFromMeta(args) {
    return {
        criticality: {
            level: CriticalityLevel.NonBreaking,
        },
        type: ChangeType.TypeDescriptionAdded,
        message: buildTypeDescriptionAddedMessage(args.meta),
        path: args.meta.typeName,
        meta: args.meta,
    };
}
export function typeDescriptionAdded(type) {
    var _a;
    return typeDescriptionAddedFromMeta({
        type: ChangeType.TypeDescriptionAdded,
        meta: {
            typeName: type.name,
            addedTypeDescription: (_a = type.description) !== null && _a !== void 0 ? _a : '',
        },
    });
}

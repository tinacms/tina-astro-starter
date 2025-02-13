"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unionMemberRemovedFromMeta = unionMemberRemovedFromMeta;
exports.unionMemberRemoved = unionMemberRemoved;
exports.buildUnionMemberAddedMessageFromMeta = buildUnionMemberAddedMessageFromMeta;
exports.unionMemberAdded = unionMemberAdded;
const change_js_1 = require("./change.js");
function buildUnionMemberRemovedMessage(args) {
    return `Member '${args.removedUnionMemberTypeName}' was removed from Union type '${args.unionName}'`;
}
function unionMemberRemovedFromMeta(args) {
    return {
        criticality: {
            level: change_js_1.CriticalityLevel.Breaking,
            reason: 'Removing a union member from a union can cause existing queries that use this union member in a fragment spread to error.',
        },
        type: change_js_1.ChangeType.UnionMemberRemoved,
        message: buildUnionMemberRemovedMessage(args.meta),
        meta: args.meta,
        path: args.meta.unionName,
    };
}
function unionMemberRemoved(union, type) {
    return unionMemberRemovedFromMeta({
        type: change_js_1.ChangeType.UnionMemberRemoved,
        meta: {
            unionName: union.name,
            removedUnionMemberTypeName: type.name,
        },
    });
}
function buildUnionMemberAddedMessage(args) {
    return `Member '${args.addedUnionMemberTypeName}' was added to Union type '${args.unionName}'`;
}
function buildUnionMemberAddedMessageFromMeta(args) {
    return {
        criticality: {
            level: change_js_1.CriticalityLevel.Dangerous,
            reason: 'Adding a possible type to Unions may break existing clients that were not programming defensively against a new possible type.',
        },
        type: change_js_1.ChangeType.UnionMemberAdded,
        message: buildUnionMemberAddedMessage(args.meta),
        meta: args.meta,
        path: args.meta.unionName,
    };
}
function unionMemberAdded(union, type) {
    return buildUnionMemberAddedMessageFromMeta({
        type: change_js_1.ChangeType.UnionMemberAdded,
        meta: {
            unionName: union.name,
            addedUnionMemberTypeName: type.name,
        },
    });
}

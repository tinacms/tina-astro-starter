"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaQueryTypeChangedFromMeta = schemaQueryTypeChangedFromMeta;
exports.schemaQueryTypeChanged = schemaQueryTypeChanged;
exports.schemaMutationTypeChangedFromMeta = schemaMutationTypeChangedFromMeta;
exports.schemaMutationTypeChanged = schemaMutationTypeChanged;
exports.schemaSubscriptionTypeChangedFromMeta = schemaSubscriptionTypeChangedFromMeta;
exports.schemaSubscriptionTypeChanged = schemaSubscriptionTypeChanged;
const change_js_1 = require("./change.js");
function buildSchemaQueryTypeChangedMessage(args) {
    return `Schema query root has changed from '${args.oldQueryTypeName}' to '${args.newQueryTypeName}'`;
}
function schemaQueryTypeChangedFromMeta(args) {
    return {
        type: change_js_1.ChangeType.SchemaQueryTypeChanged,
        criticality: {
            level: change_js_1.CriticalityLevel.Breaking,
        },
        message: buildSchemaQueryTypeChangedMessage(args.meta),
        meta: args.meta,
    };
}
function schemaQueryTypeChanged(oldSchema, newSchema) {
    const oldName = (oldSchema.getQueryType() || {}).name || 'unknown';
    const newName = (newSchema.getQueryType() || {}).name || 'unknown';
    return schemaQueryTypeChangedFromMeta({
        type: change_js_1.ChangeType.SchemaQueryTypeChanged,
        meta: {
            oldQueryTypeName: oldName,
            newQueryTypeName: newName,
        },
    });
}
function buildSchemaMutationTypeChangedMessage(args) {
    return `Schema mutation root has changed from '${args.oldMutationTypeName}' to '${args.newMutationTypeName}'`;
}
function schemaMutationTypeChangedFromMeta(args) {
    return {
        type: change_js_1.ChangeType.SchemaMutationTypeChanged,
        criticality: {
            level: change_js_1.CriticalityLevel.Breaking,
        },
        message: buildSchemaMutationTypeChangedMessage(args.meta),
        meta: args.meta,
    };
}
function schemaMutationTypeChanged(oldSchema, newSchema) {
    const oldName = (oldSchema.getMutationType() || {}).name || 'unknown';
    const newName = (newSchema.getMutationType() || {}).name || 'unknown';
    return schemaMutationTypeChangedFromMeta({
        type: change_js_1.ChangeType.SchemaMutationTypeChanged,
        meta: {
            newMutationTypeName: newName,
            oldMutationTypeName: oldName,
        },
    });
}
function buildSchemaSubscriptionTypeChangedMessage(args) {
    return `Schema subscription root has changed from '${args.oldSubscriptionTypeName}' to '${args.newSubscriptionTypeName}'`;
}
function schemaSubscriptionTypeChangedFromMeta(args) {
    return {
        type: change_js_1.ChangeType.SchemaSubscriptionTypeChanged,
        criticality: {
            level: change_js_1.CriticalityLevel.Breaking,
        },
        message: buildSchemaSubscriptionTypeChangedMessage(args.meta),
        meta: args.meta,
    };
}
function schemaSubscriptionTypeChanged(oldSchema, newSchema) {
    const oldName = (oldSchema.getSubscriptionType() || {}).name || 'unknown';
    const newName = (newSchema.getSubscriptionType() || {}).name || 'unknown';
    return schemaSubscriptionTypeChangedFromMeta({
        type: change_js_1.ChangeType.SchemaSubscriptionTypeChanged,
        meta: {
            newSubscriptionTypeName: newName,
            oldSubscriptionTypeName: oldName,
        },
    });
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diffSchema = void 0;
const graphql_1 = require("graphql");
const compare_js_1 = require("../utils/compare.js");
const graphql_js_1 = require("../utils/graphql.js");
const directive_js_1 = require("./changes/directive.js");
const schema_js_1 = require("./changes/schema.js");
const type_js_1 = require("./changes/type.js");
const directive_js_2 = require("./directive.js");
const enum_js_1 = require("./enum.js");
const input_js_1 = require("./input.js");
const interface_js_1 = require("./interface.js");
const object_js_1 = require("./object.js");
const union_js_1 = require("./union.js");
function diffSchema(oldSchema, newSchema) {
    const changes = [];
    function addChange(change) {
        changes.push(change);
    }
    changesInSchema(oldSchema, newSchema, addChange);
    (0, compare_js_1.compareLists)(Object.values(oldSchema.getTypeMap()).filter(t => !(0, graphql_js_1.isPrimitive)(t)), Object.values(newSchema.getTypeMap()).filter(t => !(0, graphql_js_1.isPrimitive)(t)), {
        onAdded(type) {
            addChange((0, type_js_1.typeAdded)(type));
        },
        onRemoved(type) {
            addChange((0, type_js_1.typeRemoved)(type));
        },
        onMutual(type) {
            changesInType(type.oldVersion, type.newVersion, addChange);
        },
    });
    (0, compare_js_1.compareLists)(oldSchema.getDirectives(), newSchema.getDirectives(), {
        onAdded(directive) {
            addChange((0, directive_js_1.directiveAdded)(directive));
        },
        onRemoved(directive) {
            addChange((0, directive_js_1.directiveRemoved)(directive));
        },
        onMutual(directive) {
            (0, directive_js_2.changesInDirective)(directive.oldVersion, directive.newVersion, addChange);
        },
    });
    return changes;
}
exports.diffSchema = diffSchema;
function changesInSchema(oldSchema, newSchema, addChange) {
    var _a, _b, _c, _d, _e, _f;
    const defaultNames = {
        query: 'Query',
        mutation: 'Mutation',
        subscription: 'Subscription',
    };
    const oldRoot = {
        query: (_a = (oldSchema.getQueryType() || {}).name) !== null && _a !== void 0 ? _a : defaultNames.query,
        mutation: (_b = (oldSchema.getMutationType() || {}).name) !== null && _b !== void 0 ? _b : defaultNames.mutation,
        subscription: (_c = (oldSchema.getSubscriptionType() || {}).name) !== null && _c !== void 0 ? _c : defaultNames.subscription,
    };
    const newRoot = {
        query: (_d = (newSchema.getQueryType() || {}).name) !== null && _d !== void 0 ? _d : defaultNames.query,
        mutation: (_e = (newSchema.getMutationType() || {}).name) !== null && _e !== void 0 ? _e : defaultNames.mutation,
        subscription: (_f = (newSchema.getSubscriptionType() || {}).name) !== null && _f !== void 0 ? _f : defaultNames.subscription,
    };
    if ((0, compare_js_1.isNotEqual)(oldRoot.query, newRoot.query)) {
        addChange((0, schema_js_1.schemaQueryTypeChanged)(oldSchema, newSchema));
    }
    if ((0, compare_js_1.isNotEqual)(oldRoot.mutation, newRoot.mutation)) {
        addChange((0, schema_js_1.schemaMutationTypeChanged)(oldSchema, newSchema));
    }
    if ((0, compare_js_1.isNotEqual)(oldRoot.subscription, newRoot.subscription)) {
        addChange((0, schema_js_1.schemaSubscriptionTypeChanged)(oldSchema, newSchema));
    }
}
function changesInType(oldType, newType, addChange) {
    if ((0, graphql_1.isEnumType)(oldType) && (0, graphql_1.isEnumType)(newType)) {
        (0, enum_js_1.changesInEnum)(oldType, newType, addChange);
    }
    else if ((0, graphql_1.isUnionType)(oldType) && (0, graphql_1.isUnionType)(newType)) {
        (0, union_js_1.changesInUnion)(oldType, newType, addChange);
    }
    else if ((0, graphql_1.isInputObjectType)(oldType) && (0, graphql_1.isInputObjectType)(newType)) {
        (0, input_js_1.changesInInputObject)(oldType, newType, addChange);
    }
    else if ((0, graphql_1.isObjectType)(oldType) && (0, graphql_1.isObjectType)(newType)) {
        (0, object_js_1.changesInObject)(oldType, newType, addChange);
    }
    else if ((0, graphql_1.isInterfaceType)(oldType) && (0, graphql_1.isInterfaceType)(newType)) {
        (0, interface_js_1.changesInInterface)(oldType, newType, addChange);
    }
    else if ((0, graphql_1.isScalarType)(oldType) && (0, graphql_1.isScalarType)(newType)) {
        // what to do with scalar types?
    }
    else {
        addChange((0, type_js_1.typeKindChanged)(oldType, newType));
    }
    if ((0, compare_js_1.isNotEqual)(oldType.description, newType.description)) {
        if ((0, compare_js_1.isVoid)(oldType.description)) {
            addChange((0, type_js_1.typeDescriptionAdded)(newType));
        }
        else if ((0, compare_js_1.isVoid)(newType.description)) {
            addChange((0, type_js_1.typeDescriptionRemoved)(oldType));
        }
        else {
            addChange((0, type_js_1.typeDescriptionChanged)(oldType, newType));
        }
    }
}

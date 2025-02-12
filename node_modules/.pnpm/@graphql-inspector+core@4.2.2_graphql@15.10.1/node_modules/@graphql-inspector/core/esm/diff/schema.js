import { isEnumType, isInputObjectType, isInterfaceType, isObjectType, isScalarType, isUnionType, } from 'graphql';
import { compareLists, isNotEqual, isVoid } from '../utils/compare.js';
import { isPrimitive } from '../utils/graphql.js';
import { directiveAdded, directiveRemoved } from './changes/directive.js';
import { schemaMutationTypeChanged, schemaQueryTypeChanged, schemaSubscriptionTypeChanged, } from './changes/schema.js';
import { typeAdded, typeDescriptionAdded, typeDescriptionChanged, typeDescriptionRemoved, typeKindChanged, typeRemoved, } from './changes/type.js';
import { changesInDirective } from './directive.js';
import { changesInEnum } from './enum.js';
import { changesInInputObject } from './input.js';
import { changesInInterface } from './interface.js';
import { changesInObject } from './object.js';
import { changesInUnion } from './union.js';
export function diffSchema(oldSchema, newSchema) {
    const changes = [];
    function addChange(change) {
        changes.push(change);
    }
    changesInSchema(oldSchema, newSchema, addChange);
    compareLists(Object.values(oldSchema.getTypeMap()).filter(t => !isPrimitive(t)), Object.values(newSchema.getTypeMap()).filter(t => !isPrimitive(t)), {
        onAdded(type) {
            addChange(typeAdded(type));
        },
        onRemoved(type) {
            addChange(typeRemoved(type));
        },
        onMutual(type) {
            changesInType(type.oldVersion, type.newVersion, addChange);
        },
    });
    compareLists(oldSchema.getDirectives(), newSchema.getDirectives(), {
        onAdded(directive) {
            addChange(directiveAdded(directive));
        },
        onRemoved(directive) {
            addChange(directiveRemoved(directive));
        },
        onMutual(directive) {
            changesInDirective(directive.oldVersion, directive.newVersion, addChange);
        },
    });
    return changes;
}
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
    if (isNotEqual(oldRoot.query, newRoot.query)) {
        addChange(schemaQueryTypeChanged(oldSchema, newSchema));
    }
    if (isNotEqual(oldRoot.mutation, newRoot.mutation)) {
        addChange(schemaMutationTypeChanged(oldSchema, newSchema));
    }
    if (isNotEqual(oldRoot.subscription, newRoot.subscription)) {
        addChange(schemaSubscriptionTypeChanged(oldSchema, newSchema));
    }
}
function changesInType(oldType, newType, addChange) {
    if (isEnumType(oldType) && isEnumType(newType)) {
        changesInEnum(oldType, newType, addChange);
    }
    else if (isUnionType(oldType) && isUnionType(newType)) {
        changesInUnion(oldType, newType, addChange);
    }
    else if (isInputObjectType(oldType) && isInputObjectType(newType)) {
        changesInInputObject(oldType, newType, addChange);
    }
    else if (isObjectType(oldType) && isObjectType(newType)) {
        changesInObject(oldType, newType, addChange);
    }
    else if (isInterfaceType(oldType) && isInterfaceType(newType)) {
        changesInInterface(oldType, newType, addChange);
    }
    else if (isScalarType(oldType) && isScalarType(newType)) {
        // what to do with scalar types?
    }
    else {
        addChange(typeKindChanged(oldType, newType));
    }
    if (isNotEqual(oldType.description, newType.description)) {
        if (isVoid(oldType.description)) {
            addChange(typeDescriptionAdded(newType));
        }
        else if (isVoid(newType.description)) {
            addChange(typeDescriptionRemoved(oldType));
        }
        else {
            addChange(typeDescriptionChanged(oldType, newType));
        }
    }
}

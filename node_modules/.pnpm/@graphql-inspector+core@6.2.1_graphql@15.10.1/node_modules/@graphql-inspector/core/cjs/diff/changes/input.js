"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputFieldRemovedFromMeta = inputFieldRemovedFromMeta;
exports.inputFieldRemoved = inputFieldRemoved;
exports.buildInputFieldAddedMessage = buildInputFieldAddedMessage;
exports.inputFieldAddedFromMeta = inputFieldAddedFromMeta;
exports.inputFieldAdded = inputFieldAdded;
exports.inputFieldDescriptionAddedFromMeta = inputFieldDescriptionAddedFromMeta;
exports.inputFieldDescriptionAdded = inputFieldDescriptionAdded;
exports.inputFieldDescriptionRemovedFromMeta = inputFieldDescriptionRemovedFromMeta;
exports.inputFieldDescriptionRemoved = inputFieldDescriptionRemoved;
exports.inputFieldDescriptionChangedFromMeta = inputFieldDescriptionChangedFromMeta;
exports.inputFieldDescriptionChanged = inputFieldDescriptionChanged;
exports.inputFieldDefaultValueChangedFromMeta = inputFieldDefaultValueChangedFromMeta;
exports.inputFieldDefaultValueChanged = inputFieldDefaultValueChanged;
exports.inputFieldTypeChangedFromMeta = inputFieldTypeChangedFromMeta;
exports.inputFieldTypeChanged = inputFieldTypeChanged;
const graphql_1 = require("graphql");
const graphql_js_1 = require("../../utils/graphql.js");
const is_deprecated_js_1 = require("../../utils/is-deprecated.js");
const string_js_1 = require("../../utils/string.js");
const change_js_1 = require("./change.js");
function buildInputFieldRemovedMessage(args) {
    return `Input field '${args.removedFieldName}' ${args.isInputFieldDeprecated ? '(deprecated) ' : ''}was removed from input object type '${args.inputName}'`;
}
function inputFieldRemovedFromMeta(args) {
    return {
        type: change_js_1.ChangeType.InputFieldRemoved,
        criticality: {
            level: change_js_1.CriticalityLevel.Breaking,
            reason: 'Removing an input field will cause existing queries that use this input field to error.',
        },
        message: buildInputFieldRemovedMessage(args.meta),
        meta: args.meta,
        path: [args.meta.inputName, args.meta.removedFieldName].join('.'),
    };
}
function inputFieldRemoved(input, field) {
    return inputFieldRemovedFromMeta({
        type: change_js_1.ChangeType.InputFieldRemoved,
        meta: {
            inputName: input.name,
            removedFieldName: field.name,
            isInputFieldDeprecated: (0, is_deprecated_js_1.isDeprecated)(field),
        },
    });
}
function buildInputFieldAddedMessage(args) {
    return `Input field '${args.addedInputFieldName}' of type '${args.addedInputFieldType}' was added to input object type '${args.inputName}'`;
}
function inputFieldAddedFromMeta(args) {
    return {
        type: change_js_1.ChangeType.InputFieldAdded,
        criticality: args.meta.isAddedInputFieldTypeNullable
            ? {
                level: change_js_1.CriticalityLevel.Dangerous,
            }
            : {
                level: change_js_1.CriticalityLevel.Breaking,
                reason: 'Adding a required input field to an existing input object type is a breaking change because it will cause existing uses of this input object type to error.',
            },
        message: buildInputFieldAddedMessage(args.meta),
        meta: args.meta,
        path: [args.meta.inputName, args.meta.addedInputFieldName].join('.'),
    };
}
function inputFieldAdded(input, field) {
    return inputFieldAddedFromMeta({
        type: change_js_1.ChangeType.InputFieldAdded,
        meta: {
            inputName: input.name,
            addedInputFieldName: field.name,
            isAddedInputFieldTypeNullable: !(0, graphql_1.isNonNullType)(field.type),
            addedInputFieldType: field.type.toString(),
        },
    });
}
function buildInputFieldDescriptionAddedMessage(args) {
    return `Input field '${args.inputName}.${args.inputFieldName}' has description '${args.addedInputFieldDescription}'`;
}
function inputFieldDescriptionAddedFromMeta(args) {
    return {
        type: change_js_1.ChangeType.InputFieldDescriptionAdded,
        criticality: {
            level: change_js_1.CriticalityLevel.NonBreaking,
        },
        message: buildInputFieldDescriptionAddedMessage(args.meta),
        meta: args.meta,
        path: [args.meta.inputName, args.meta.inputFieldName].join('.'),
    };
}
function inputFieldDescriptionAdded(type, field) {
    return inputFieldDescriptionAddedFromMeta({
        type: change_js_1.ChangeType.InputFieldDescriptionAdded,
        meta: {
            inputName: type.name,
            inputFieldName: field.name,
            addedInputFieldDescription: field.description ?? '',
        },
    });
}
function buildInputFieldDescriptionRemovedMessage(args) {
    return `Description '${args.removedDescription}' was removed from input field '${args.inputName}.${args.inputFieldName}'`;
}
function inputFieldDescriptionRemovedFromMeta(args) {
    return {
        type: change_js_1.ChangeType.InputFieldDescriptionRemoved,
        criticality: {
            level: change_js_1.CriticalityLevel.NonBreaking,
        },
        message: buildInputFieldDescriptionRemovedMessage(args.meta),
        meta: args.meta,
        path: [args.meta.inputName, args.meta.inputFieldName].join('.'),
    };
}
function inputFieldDescriptionRemoved(type, field) {
    return inputFieldDescriptionRemovedFromMeta({
        type: change_js_1.ChangeType.InputFieldDescriptionRemoved,
        meta: {
            inputName: type.name,
            inputFieldName: field.name,
            removedDescription: field.description ?? '',
        },
    });
}
function buildInputFieldDescriptionChangedMessage(args) {
    return `Input field '${args.inputName}.${args.inputFieldName}' description changed from '${args.oldInputFieldDescription}' to '${args.newInputFieldDescription}'`;
}
function inputFieldDescriptionChangedFromMeta(args) {
    return {
        type: change_js_1.ChangeType.InputFieldDescriptionChanged,
        criticality: {
            level: change_js_1.CriticalityLevel.NonBreaking,
        },
        message: buildInputFieldDescriptionChangedMessage(args.meta),
        meta: args.meta,
        path: [args.meta.inputName, args.meta.inputFieldName].join('.'),
    };
}
function inputFieldDescriptionChanged(input, oldField, newField) {
    return inputFieldDescriptionChangedFromMeta({
        type: change_js_1.ChangeType.InputFieldDescriptionChanged,
        meta: {
            inputName: input.name,
            inputFieldName: oldField.name,
            oldInputFieldDescription: oldField.description ?? '',
            newInputFieldDescription: newField.description ?? '',
        },
    });
}
function buildInputFieldDefaultValueChangedMessage(args) {
    return `Input field '${args.inputName}.${args.inputFieldName}' default value changed from '${args.oldDefaultValue}' to '${args.newDefaultValue}'`;
}
function inputFieldDefaultValueChangedFromMeta(args) {
    return {
        type: change_js_1.ChangeType.InputFieldDefaultValueChanged,
        criticality: {
            level: change_js_1.CriticalityLevel.Dangerous,
            reason: 'Changing the default value for an argument may change the runtime behavior of a field if it was never provided.',
        },
        message: buildInputFieldDefaultValueChangedMessage(args.meta),
        meta: args.meta,
        path: [args.meta.inputName, args.meta.inputFieldName].join('.'),
    };
}
function inputFieldDefaultValueChanged(input, oldField, newField) {
    const meta = {
        inputName: input.name,
        inputFieldName: oldField.name,
    };
    if (oldField.defaultValue !== undefined) {
        meta.oldDefaultValue = (0, string_js_1.safeString)(oldField.defaultValue);
    }
    if (newField.defaultValue !== undefined) {
        meta.newDefaultValue = (0, string_js_1.safeString)(newField.defaultValue);
    }
    return inputFieldDefaultValueChangedFromMeta({
        type: change_js_1.ChangeType.InputFieldDefaultValueChanged,
        meta,
    });
}
function buildInputFieldTypeChangedMessage(args) {
    return `Input field '${args.inputName}.${args.inputFieldName}' changed type from '${args.oldInputFieldType}' to '${args.newInputFieldType}'`;
}
function inputFieldTypeChangedFromMeta(args) {
    return {
        type: change_js_1.ChangeType.InputFieldTypeChanged,
        criticality: args.meta.isInputFieldTypeChangeSafe
            ? {
                level: change_js_1.CriticalityLevel.NonBreaking,
                reason: 'Changing an input field from non-null to null is considered non-breaking.',
            }
            : {
                level: change_js_1.CriticalityLevel.Breaking,
                reason: 'Changing the type of an input field can cause existing queries that use this field to error.',
            },
        message: buildInputFieldTypeChangedMessage(args.meta),
        meta: args.meta,
        path: [args.meta.inputName, args.meta.inputFieldName].join('.'),
    };
}
function inputFieldTypeChanged(input, oldField, newField) {
    return inputFieldTypeChangedFromMeta({
        type: change_js_1.ChangeType.InputFieldTypeChanged,
        meta: {
            inputName: input.name,
            inputFieldName: oldField.name,
            oldInputFieldType: oldField.type.toString(),
            newInputFieldType: newField.type.toString(),
            isInputFieldTypeChangeSafe: (0, graphql_js_1.safeChangeForInputValue)(oldField.type, newField.type),
        },
    });
}

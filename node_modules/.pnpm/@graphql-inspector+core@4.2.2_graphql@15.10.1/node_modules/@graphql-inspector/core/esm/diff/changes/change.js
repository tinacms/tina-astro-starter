export var ChangeType;
(function (ChangeType) {
    // Argument
    ChangeType["FieldArgumentDescriptionChanged"] = "FIELD_ARGUMENT_DESCRIPTION_CHANGED";
    ChangeType["FieldArgumentDefaultChanged"] = "FIELD_ARGUMENT_DEFAULT_CHANGED";
    ChangeType["FieldArgumentTypeChanged"] = "FIELD_ARGUMENT_TYPE_CHANGED";
    // Directive
    ChangeType["DirectiveRemoved"] = "DIRECTIVE_REMOVED";
    ChangeType["DirectiveAdded"] = "DIRECTIVE_ADDED";
    ChangeType["DirectiveDescriptionChanged"] = "DIRECTIVE_DESCRIPTION_CHANGED";
    ChangeType["DirectiveLocationAdded"] = "DIRECTIVE_LOCATION_ADDED";
    ChangeType["DirectiveLocationRemoved"] = "DIRECTIVE_LOCATION_REMOVED";
    ChangeType["DirectiveArgumentAdded"] = "DIRECTIVE_ARGUMENT_ADDED";
    ChangeType["DirectiveArgumentRemoved"] = "DIRECTIVE_ARGUMENT_REMOVED";
    ChangeType["DirectiveArgumentDescriptionChanged"] = "DIRECTIVE_ARGUMENT_DESCRIPTION_CHANGED";
    ChangeType["DirectiveArgumentDefaultValueChanged"] = "DIRECTIVE_ARGUMENT_DEFAULT_VALUE_CHANGED";
    ChangeType["DirectiveArgumentTypeChanged"] = "DIRECTIVE_ARGUMENT_TYPE_CHANGED";
    // Enum
    ChangeType["EnumValueRemoved"] = "ENUM_VALUE_REMOVED";
    ChangeType["EnumValueAdded"] = "ENUM_VALUE_ADDED";
    ChangeType["EnumValueDescriptionChanged"] = "ENUM_VALUE_DESCRIPTION_CHANGED";
    ChangeType["EnumValueDeprecationReasonChanged"] = "ENUM_VALUE_DEPRECATION_REASON_CHANGED";
    ChangeType["EnumValueDeprecationReasonAdded"] = "ENUM_VALUE_DEPRECATION_REASON_ADDED";
    ChangeType["EnumValueDeprecationReasonRemoved"] = "ENUM_VALUE_DEPRECATION_REASON_REMOVED";
    // Field
    ChangeType["FieldRemoved"] = "FIELD_REMOVED";
    ChangeType["FieldAdded"] = "FIELD_ADDED";
    ChangeType["FieldDescriptionChanged"] = "FIELD_DESCRIPTION_CHANGED";
    ChangeType["FieldDescriptionAdded"] = "FIELD_DESCRIPTION_ADDED";
    ChangeType["FieldDescriptionRemoved"] = "FIELD_DESCRIPTION_REMOVED";
    ChangeType["FieldDeprecationAdded"] = "FIELD_DEPRECATION_ADDED";
    ChangeType["FieldDeprecationRemoved"] = "FIELD_DEPRECATION_REMOVED";
    ChangeType["FieldDeprecationReasonChanged"] = "FIELD_DEPRECATION_REASON_CHANGED";
    ChangeType["FieldDeprecationReasonAdded"] = "FIELD_DEPRECATION_REASON_ADDED";
    ChangeType["FieldDeprecationReasonRemoved"] = "FIELD_DEPRECATION_REASON_REMOVED";
    ChangeType["FieldTypeChanged"] = "FIELD_TYPE_CHANGED";
    ChangeType["FieldArgumentAdded"] = "FIELD_ARGUMENT_ADDED";
    ChangeType["FieldArgumentRemoved"] = "FIELD_ARGUMENT_REMOVED";
    // Input
    ChangeType["InputFieldRemoved"] = "INPUT_FIELD_REMOVED";
    ChangeType["InputFieldAdded"] = "INPUT_FIELD_ADDED";
    ChangeType["InputFieldDescriptionAdded"] = "INPUT_FIELD_DESCRIPTION_ADDED";
    ChangeType["InputFieldDescriptionRemoved"] = "INPUT_FIELD_DESCRIPTION_REMOVED";
    ChangeType["InputFieldDescriptionChanged"] = "INPUT_FIELD_DESCRIPTION_CHANGED";
    ChangeType["InputFieldDefaultValueChanged"] = "INPUT_FIELD_DEFAULT_VALUE_CHANGED";
    ChangeType["InputFieldTypeChanged"] = "INPUT_FIELD_TYPE_CHANGED";
    // Type
    ChangeType["ObjectTypeInterfaceAdded"] = "OBJECT_TYPE_INTERFACE_ADDED";
    ChangeType["ObjectTypeInterfaceRemoved"] = "OBJECT_TYPE_INTERFACE_REMOVED";
    // Schema
    ChangeType["SchemaQueryTypeChanged"] = "SCHEMA_QUERY_TYPE_CHANGED";
    ChangeType["SchemaMutationTypeChanged"] = "SCHEMA_MUTATION_TYPE_CHANGED";
    ChangeType["SchemaSubscriptionTypeChanged"] = "SCHEMA_SUBSCRIPTION_TYPE_CHANGED";
    // Type
    ChangeType["TypeRemoved"] = "TYPE_REMOVED";
    ChangeType["TypeAdded"] = "TYPE_ADDED";
    ChangeType["TypeKindChanged"] = "TYPE_KIND_CHANGED";
    ChangeType["TypeDescriptionChanged"] = "TYPE_DESCRIPTION_CHANGED";
    // TODO
    ChangeType["TypeDescriptionRemoved"] = "TYPE_DESCRIPTION_REMOVED";
    // TODO
    ChangeType["TypeDescriptionAdded"] = "TYPE_DESCRIPTION_ADDED";
    // Union
    ChangeType["UnionMemberRemoved"] = "UNION_MEMBER_REMOVED";
    ChangeType["UnionMemberAdded"] = "UNION_MEMBER_ADDED";
})(ChangeType || (ChangeType = {}));
export var CriticalityLevel;
(function (CriticalityLevel) {
    CriticalityLevel["Breaking"] = "BREAKING";
    CriticalityLevel["NonBreaking"] = "NON_BREAKING";
    CriticalityLevel["Dangerous"] = "DANGEROUS";
})(CriticalityLevel || (CriticalityLevel = {}));

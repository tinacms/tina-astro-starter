import { GraphQLArgument, GraphQLField, GraphQLInterfaceType, GraphQLObjectType } from 'graphql';
import { Change, ChangeType, CriticalityLevel, FieldAddedChange, FieldArgumentAddedChange, FieldArgumentRemovedChange, FieldDeprecationAddedChange, FieldDeprecationReasonAddedChange, FieldDeprecationReasonChangedChange, FieldDeprecationReasonRemovedChange, FieldDeprecationRemovedChange, FieldDescriptionAddedChange, FieldDescriptionChangedChange, FieldDescriptionRemovedChange, FieldRemovedChange, FieldTypeChangedChange } from './change.cjs';
export declare function fieldRemovedFromMeta(args: FieldRemovedChange): {
    readonly type: ChangeType.FieldRemoved;
    readonly criticality: {
        readonly level: CriticalityLevel.Breaking;
        readonly reason: "Removing a deprecated field is a breaking change. Before removing it, you may want to look at the field's usage to see the impact of removing the field." | "Removing a field is a breaking change. It is preferable to deprecate the field before removing it.";
    };
    readonly message: string;
    readonly meta: {
        typeName: string;
        removedFieldName: string;
        isRemovedFieldDeprecated: boolean;
        typeType: string;
    };
    readonly path: string;
};
export declare function fieldRemoved(type: GraphQLObjectType | GraphQLInterfaceType, field: GraphQLField<any, any, any>): Change<ChangeType.FieldRemoved>;
export declare function fieldAddedFromMeta(args: FieldAddedChange): {
    readonly type: ChangeType.FieldAdded;
    readonly criticality: {
        readonly level: CriticalityLevel.NonBreaking;
    };
    readonly message: string;
    readonly meta: {
        typeName: string;
        addedFieldName: string;
        typeType: string;
    };
    readonly path: string;
};
export declare function fieldAdded(type: GraphQLObjectType | GraphQLInterfaceType, field: GraphQLField<any, any, any>): Change<ChangeType.FieldAdded>;
export declare function fieldDescriptionChangedFromMeta(args: FieldDescriptionChangedChange): {
    readonly type: ChangeType.FieldDescriptionChanged;
    readonly criticality: {
        readonly level: CriticalityLevel.NonBreaking;
    };
    readonly message: string;
    readonly meta: {
        typeName: string;
        fieldName: string;
        oldDescription: string;
        newDescription: string;
    };
    readonly path: string;
};
export declare function fieldDescriptionChanged(type: GraphQLObjectType | GraphQLInterfaceType, oldField: GraphQLField<any, any>, newField: GraphQLField<any, any>): Change<ChangeType.FieldDescriptionChanged>;
export declare function fieldDescriptionAddedFromMeta(args: FieldDescriptionAddedChange): {
    readonly type: ChangeType.FieldDescriptionAdded;
    readonly criticality: {
        readonly level: CriticalityLevel.NonBreaking;
    };
    readonly message: string;
    readonly meta: {
        typeName: string;
        fieldName: string;
        addedDescription: string;
    };
    readonly path: string;
};
export declare function fieldDescriptionAdded(type: GraphQLObjectType | GraphQLInterfaceType, field: GraphQLField<any, any>): Change<ChangeType.FieldDescriptionAdded>;
export declare function fieldDescriptionRemovedFromMeta(args: FieldDescriptionRemovedChange): {
    readonly type: ChangeType.FieldDescriptionRemoved;
    readonly criticality: {
        readonly level: CriticalityLevel.NonBreaking;
    };
    readonly message: string;
    readonly meta: {
        typeName: string;
        fieldName: string;
    };
    readonly path: string;
};
export declare function fieldDescriptionRemoved(type: GraphQLObjectType | GraphQLInterfaceType, field: GraphQLField<any, any>): Change<ChangeType.FieldDescriptionRemoved>;
export declare function fieldDeprecationAddedFromMeta(args: FieldDeprecationAddedChange): {
    readonly type: ChangeType.FieldDeprecationAdded;
    readonly criticality: {
        readonly level: CriticalityLevel.NonBreaking;
    };
    readonly message: string;
    readonly meta: {
        typeName: string;
        fieldName: string;
    };
    readonly path: string;
};
export declare function fieldDeprecationAdded(type: GraphQLObjectType | GraphQLInterfaceType, field: GraphQLField<any, any>): Change<ChangeType.FieldDeprecationAdded>;
export declare function fieldDeprecationRemovedFromMeta(args: FieldDeprecationRemovedChange): {
    readonly type: ChangeType.FieldDeprecationRemoved;
    readonly criticality: {
        readonly level: CriticalityLevel.Dangerous;
    };
    readonly message: `Field '${string}.${string}' is no longer deprecated`;
    readonly meta: {
        typeName: string;
        fieldName: string;
    };
    readonly path: string;
};
export declare function fieldDeprecationRemoved(type: GraphQLObjectType | GraphQLInterfaceType, field: GraphQLField<any, any>): Change<ChangeType.FieldDeprecationRemoved>;
export declare function fieldDeprecationReasonChangedFromMeta(args: FieldDeprecationReasonChangedChange): {
    readonly type: ChangeType.FieldDeprecationReasonChanged;
    readonly criticality: {
        readonly level: CriticalityLevel.NonBreaking;
    };
    readonly message: string;
    readonly meta: {
        typeName: string;
        fieldName: string;
        oldDeprecationReason: string;
        newDeprecationReason: string;
    };
    readonly path: string;
};
export declare function fieldDeprecationReasonChanged(type: GraphQLObjectType | GraphQLInterfaceType, oldField: GraphQLField<any, any>, newField: GraphQLField<any, any>): Change<ChangeType.FieldDeprecationReasonChanged>;
export declare function fieldDeprecationReasonAddedFromMeta(args: FieldDeprecationReasonAddedChange): {
    readonly type: ChangeType.FieldDeprecationReasonAdded;
    readonly criticality: {
        readonly level: CriticalityLevel.NonBreaking;
    };
    readonly message: string;
    readonly meta: {
        typeName: string;
        fieldName: string;
        addedDeprecationReason: string;
    };
    readonly path: string;
};
export declare function fieldDeprecationReasonAdded(type: GraphQLObjectType | GraphQLInterfaceType, field: GraphQLField<any, any>): Change<ChangeType.FieldDeprecationReasonAdded>;
export declare function fieldDeprecationReasonRemovedFromMeta(args: FieldDeprecationReasonRemovedChange): {
    readonly type: ChangeType.FieldDeprecationReasonRemoved;
    readonly criticality: {
        readonly level: CriticalityLevel.NonBreaking;
    };
    readonly message: `Deprecation reason was removed from field '${string}.${string}'`;
    readonly meta: {
        typeName: string;
        fieldName: string;
    };
    readonly path: string;
};
export declare function fieldDeprecationReasonRemoved(type: GraphQLObjectType | GraphQLInterfaceType, field: GraphQLField<any, any>): Change<ChangeType.FieldDeprecationReasonRemoved>;
export declare function fieldTypeChangedFromMeta(args: FieldTypeChangedChange): {
    readonly type: ChangeType.FieldTypeChanged;
    readonly criticality: {
        readonly level: CriticalityLevel.Breaking | CriticalityLevel.NonBreaking;
    };
    readonly message: string;
    readonly meta: {
        typeName: string;
        fieldName: string;
        oldFieldType: string;
        newFieldType: string;
        isSafeFieldTypeChange: boolean;
    };
    readonly path: string;
};
export declare function fieldTypeChanged(type: GraphQLObjectType | GraphQLInterfaceType, oldField: GraphQLField<any, any, any>, newField: GraphQLField<any, any, any>): Change<ChangeType.FieldTypeChanged>;
export declare function fieldArgumentAddedFromMeta(args: FieldArgumentAddedChange): {
    readonly type: ChangeType.FieldArgumentAdded;
    readonly criticality: {
        readonly level: CriticalityLevel.Breaking | CriticalityLevel.Dangerous;
    };
    readonly message: string;
    readonly meta: {
        typeName: string;
        fieldName: string;
        addedArgumentName: string;
        addedArgumentType: string;
        hasDefaultValue: boolean;
        isAddedFieldArgumentBreaking: boolean;
    };
    readonly path: string;
};
export declare function fieldArgumentAdded(type: GraphQLObjectType | GraphQLInterfaceType, field: GraphQLField<any, any, any>, arg: GraphQLArgument): Change<ChangeType.FieldArgumentAdded>;
export declare function fieldArgumentRemovedFromMeta(args: FieldArgumentRemovedChange): {
    readonly type: ChangeType.FieldArgumentRemoved;
    readonly criticality: {
        readonly level: CriticalityLevel.Breaking;
    };
    readonly message: string;
    readonly meta: {
        typeName: string;
        fieldName: string;
        removedFieldArgumentName: string;
        removedFieldType: string;
    };
    readonly path: string;
};
export declare function fieldArgumentRemoved(type: GraphQLObjectType | GraphQLInterfaceType, field: GraphQLField<any, any, any>, arg: GraphQLArgument): Change<ChangeType.FieldArgumentRemoved>;

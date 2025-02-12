import { GraphQLArgument, GraphQLField, GraphQLInterfaceType, GraphQLObjectType } from 'graphql';
import { Change, ChangeType, CriticalityLevel, FieldArgumentDefaultChangedChange, FieldArgumentDescriptionChangedChange, FieldArgumentTypeChangedChange } from './change.cjs';
export declare function fieldArgumentDescriptionChangedFromMeta(args: FieldArgumentDescriptionChangedChange): {
    readonly type: ChangeType.FieldArgumentDescriptionChanged;
    readonly criticality: {
        readonly level: CriticalityLevel.NonBreaking;
    };
    readonly message: string;
    readonly meta: {
        typeName: string;
        fieldName: string;
        argumentName: string;
        oldDescription: string | null;
        newDescription: string | null;
    };
    readonly path: string;
};
export declare function fieldArgumentDescriptionChanged(type: GraphQLObjectType | GraphQLInterfaceType, field: GraphQLField<any, any, any>, oldArg: GraphQLArgument, newArg: GraphQLArgument): Change<ChangeType.FieldArgumentDescriptionChanged>;
export declare function fieldArgumentDefaultChangedFromMeta(args: FieldArgumentDefaultChangedChange): {
    readonly type: ChangeType.FieldArgumentDefaultChanged;
    readonly criticality: {
        readonly level: CriticalityLevel.Dangerous;
        readonly reason: "Changing the default value for an argument may change the runtime behaviour of a field if it was never provided.";
    };
    readonly message: string;
    readonly meta: {
        typeName: string;
        fieldName: string;
        argumentName: string;
        oldDefaultValue?: string | undefined;
        newDefaultValue?: string | undefined;
    };
    readonly path: string;
};
export declare function fieldArgumentDefaultChanged(type: GraphQLObjectType | GraphQLInterfaceType, field: GraphQLField<any, any, any>, oldArg: GraphQLArgument, newArg: GraphQLArgument): Change<ChangeType.FieldArgumentDefaultChanged>;
export declare function fieldArgumentTypeChangedFromMeta(args: FieldArgumentTypeChangedChange): {
    readonly type: ChangeType.FieldArgumentTypeChanged;
    readonly criticality: {
        level: CriticalityLevel;
        reason: string;
    };
    readonly message: string;
    readonly meta: {
        typeName: string;
        fieldName: string;
        argumentName: string;
        oldArgumentType: string;
        newArgumentType: string;
        isSafeArgumentTypeChange: boolean;
    };
    readonly path: string;
};
export declare function fieldArgumentTypeChanged(type: GraphQLObjectType | GraphQLInterfaceType, field: GraphQLField<any, any, any>, oldArg: GraphQLArgument, newArg: GraphQLArgument): Change<ChangeType.FieldArgumentTypeChanged>;

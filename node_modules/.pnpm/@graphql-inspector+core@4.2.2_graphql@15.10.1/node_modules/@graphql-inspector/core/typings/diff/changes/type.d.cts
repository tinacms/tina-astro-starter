import { GraphQLNamedType } from 'graphql';
import { Change, ChangeType, CriticalityLevel, TypeAddedChange, TypeDescriptionAddedChange, TypeDescriptionChangedChange, TypeDescriptionRemovedChange, TypeKindChangedChange, TypeRemovedChange } from './change.cjs';
export declare function typeRemovedFromMeta(args: TypeRemovedChange): {
    readonly criticality: {
        readonly level: CriticalityLevel.Breaking;
    };
    readonly type: ChangeType.TypeRemoved;
    readonly message: string;
    readonly meta: {
        removedTypeName: string;
    };
    readonly path: string;
};
export declare function typeRemoved(type: GraphQLNamedType): Change<ChangeType.TypeRemoved>;
export declare function typeAddedFromMeta(args: TypeAddedChange): {
    readonly criticality: {
        readonly level: CriticalityLevel.NonBreaking;
    };
    readonly type: ChangeType.TypeAdded;
    readonly message: string;
    readonly meta: {
        addedTypeName: string;
    };
    readonly path: string;
};
export declare function typeAdded(type: GraphQLNamedType): Change<ChangeType.TypeAdded>;
export declare function typeKindChangedFromMeta(args: TypeKindChangedChange): {
    readonly criticality: {
        readonly level: CriticalityLevel.Breaking;
        readonly reason: "Changing the kind of a type is a breaking change because it can cause existing queries to error. For example, turning an object type to a scalar type would break queries that define a selection set for this type.";
    };
    readonly type: ChangeType.TypeKindChanged;
    readonly message: string;
    readonly path: string;
    readonly meta: {
        typeName: string;
        oldTypeKind: string;
        newTypeKind: string;
    };
};
export declare function typeKindChanged(oldType: GraphQLNamedType, newType: GraphQLNamedType): Change<ChangeType.TypeKindChanged>;
export declare function typeDescriptionChangedFromMeta(args: TypeDescriptionChangedChange): {
    readonly criticality: {
        readonly level: CriticalityLevel.NonBreaking;
    };
    readonly type: ChangeType.TypeDescriptionChanged;
    readonly message: string;
    readonly path: string;
    readonly meta: {
        typeName: string;
        oldTypeDescription: string;
        newTypeDescription: string;
    };
};
export declare function typeDescriptionChanged(oldType: GraphQLNamedType, newType: GraphQLNamedType): Change<ChangeType.TypeDescriptionChanged>;
export declare function typeDescriptionRemovedFromMeta(args: TypeDescriptionRemovedChange): {
    readonly criticality: {
        readonly level: CriticalityLevel.NonBreaking;
    };
    readonly type: ChangeType.TypeDescriptionRemoved;
    readonly message: string;
    readonly path: string;
    readonly meta: {
        typeName: string;
        removedTypeDescription: string;
    };
};
export declare function typeDescriptionRemoved(type: GraphQLNamedType): Change<ChangeType.TypeDescriptionRemoved>;
export declare function typeDescriptionAddedFromMeta(args: TypeDescriptionAddedChange): {
    readonly criticality: {
        readonly level: CriticalityLevel.NonBreaking;
    };
    readonly type: ChangeType.TypeDescriptionAdded;
    readonly message: string;
    readonly path: string;
    readonly meta: {
        typeName: string;
        addedTypeDescription: string;
    };
};
export declare function typeDescriptionAdded(type: GraphQLNamedType): Change<ChangeType.TypeDescriptionAdded>;

import { GraphQLError, GraphQLNamedType, GraphQLSchema, Source } from 'graphql';
export interface Location {
    start: number;
    end: number;
}
export interface ArgumentCoverage {
    hits: number;
    fieldsCount: number;
    fieldsCountCovered: number;
    locations: {
        [name: string]: Array<Location>;
    };
}
export interface TypeChildCoverage {
    hits: number;
    fieldsCount: number;
    fieldsCountCovered: number;
    locations: {
        [name: string]: Array<Location>;
    };
    children: {
        [name: string]: ArgumentCoverage;
    };
}
export interface TypeCoverage {
    hits: number;
    fieldsCount: number;
    fieldsCountCovered: number;
    type: GraphQLNamedType;
    children: {
        [name: string]: TypeChildCoverage;
    };
}
export interface SchemaCoverage {
    sources: Source[];
    types: {
        [typename: string]: TypeCoverage;
    };
    stats: {
        numTypes: number;
        numTypesCoveredFully: number;
        numTypesCovered: number;
        numFields: number;
        numFiledsCovered: number;
        numQueries: number;
        numMutations: number;
        numSubscriptions: number;
    };
}
export interface InvalidDocument {
    source: Source;
    errors: ReadonlyArray<GraphQLError>;
}
export declare function coverage(schema: GraphQLSchema, sources: Source[]): SchemaCoverage;

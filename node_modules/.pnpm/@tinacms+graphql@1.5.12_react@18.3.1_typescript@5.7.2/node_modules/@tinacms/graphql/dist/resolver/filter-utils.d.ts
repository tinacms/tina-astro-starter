/**

*/
import type { ReferenceType, TinaField } from '@tinacms/schema-tools';
import { FilterCondition } from '../database/datalayer';
export type ReferenceResolver = (filter: Record<string, object>, fieldDefinition: ReferenceType) => Promise<{
    edges: {
        node: any;
    }[];
    values: any[];
}>;
export declare const resolveReferences: (filter: any, fields: TinaField[], resolver: ReferenceResolver) => Promise<void>;
export declare const collectConditionsForField: (fieldName: string, field: TinaField, filterNode: Record<string, object>, pathExpression: string, collectCondition: (condition: FilterCondition) => void) => void;

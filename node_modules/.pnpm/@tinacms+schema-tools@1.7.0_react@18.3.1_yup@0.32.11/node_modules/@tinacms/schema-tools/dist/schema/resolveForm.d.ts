/**

*/
import type { Template, Collection } from '../types/index';
import type { TinaSchema } from './TinaSchema';
/**
 *  Given a collection, basename, template and schema. This will transform the given information into a valid frontend form config
 */
export declare const resolveForm: ({ collection, basename, template, schema, }: ResolveFormArgs) => {
    id: string;
    label: string;
    name: string;
    fields: {
        [key: string]: unknown;
        name: string;
        component: NonNullable<import("../types/index").TinaField<true>["ui"]>["component"];
        type: string;
    }[];
};
type ResolveFormArgs = {
    collection: Collection<true>;
    basename: string;
    template: Template<true>;
    schema: TinaSchema;
};
export {};

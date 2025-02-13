/**

*/
import type { TinaField } from '../types/index';
import type { TinaSchema } from './TinaSchema';
/**
 * Turns a field the schema (schema.{js,ts} file) into a valid front end FieldConfig
 */
export declare const resolveField: (field: TinaField<true>, schema: TinaSchema) => {
    [key: string]: unknown;
    name: string;
    component: NonNullable<TinaField<true>["ui"]>["component"];
    type: string;
};

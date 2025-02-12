/**

*/
import { TinaSchema, Schema } from '@tinacms/schema-tools';
export declare const createSchema: ({ schema, flags, }: {
    schema: Schema;
    flags?: string[];
}) => Promise<TinaSchema>;

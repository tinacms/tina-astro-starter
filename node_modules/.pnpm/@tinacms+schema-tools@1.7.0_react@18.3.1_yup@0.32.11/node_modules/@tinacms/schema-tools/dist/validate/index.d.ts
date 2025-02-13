import type { Schema } from '../types/index';
export { validateTinaCloudSchemaConfig } from './tinaCloudSchemaConfig';
export declare class TinaSchemaValidationError extends Error {
    constructor(message: string);
}
export declare const validateSchema: ({ schema }: {
    schema: Schema;
}) => void;

import { TinaField } from '@tinacms/schema-tools';
/**
 * This function is used to replace the internal code with the actual code
 *
 * EX:
 *  __TINA_INTERNAL__:::...fields::: => ...fields
 *
 * or __TINA_INTERNAL__:::fields::: => fields
 */
export declare const addVariablesToCode: (codeWithTinaPrefix: string) => {
    code: string;
};
export declare const makeFieldsWithInternalCode: ({ hasBody, field, bodyField, spread, }: {
    hasBody: true;
    field: string;
    spread?: never;
    bodyField: unknown;
} | {
    hasBody: false;
    field: string;
    spread?: boolean;
    bodyField?: never;
} | {
    hasBody: boolean;
    field: string;
    spread?: boolean;
    bodyField: unknown;
}) => string | unknown[];
export declare const makeTemplateFile: ({ templateMap, usingTypescript, }: {
    templateMap: Map<string, {
        fields: TinaField[];
        templateObj: any;
    }>;
    usingTypescript: boolean;
}) => Promise<{
    importStatements: string[];
    templateCodeText: string;
}>;

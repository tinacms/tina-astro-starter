import { Collection, ObjectField } from '@tinacms/schema-tools';
export declare const processDocumentForIndexing: (data: any, path: string, collection: Collection, textIndexLength: number, field?: ObjectField) => any;
export declare const lookupStopwords: (keys?: string[], defaultStopWords?: string[]) => string[];

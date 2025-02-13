import type { Database, Collection } from '@tinacms/graphql';
export declare const audit: ({ database, clean, useDefaultValues, noTelemetry, verbose, }: {
    database: Database;
    clean?: boolean;
    useDefaultValues?: boolean;
    noTelemetry?: boolean;
    verbose?: boolean;
}) => Promise<void>;
type AuditArgs = {
    collection: Collection<true>;
    database: Database;
    documents: {
        node: {
            path: string;
        };
    }[];
    useDefaultValues: boolean;
    verbose?: boolean;
};
export declare const auditDocuments: (args: AuditArgs) => Promise<boolean>;
export declare const mergeValuesWithDefaults: (document: object, defaults?: object) => {};
export {};

import { Collectable } from '@tinacms/schema-tools';
export type HashOptions = {
    saltLength?: number;
    keyLength?: number;
    iterations?: number;
    digest?: 'sha256' | 'sha512';
};
export declare const generatePasswordHash: ({ password, opts: { saltLength, keyLength, iterations, digest, }, }: {
    password: string;
    opts?: HashOptions;
}) => Promise<string>;
export declare const checkPasswordHash: ({ saltedHash, password, opts: { saltLength, keyLength, iterations, digest, }, }: {
    saltedHash: string;
    password: string;
    opts?: HashOptions;
}) => Promise<boolean>;
export declare const mapUserFields: (collectable: Collectable, prefix?: string[]) => {
    path: string[];
    collectable: Collectable;
    idFieldName?: string;
    passwordFieldName?: string;
}[];

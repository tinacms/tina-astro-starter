/**

*/
interface GetPathParams {
    projectDir: string;
    filename: string;
    allowedTypes: string[];
    errorMessage?: string;
}
export declare const fileExists: ({ projectDir, filename, allowedTypes, }: Omit<GetPathParams, "errorMessage">) => boolean;
export declare const getPath: ({ projectDir, filename, allowedTypes, errorMessage, }: GetPathParams) => any;
export {};

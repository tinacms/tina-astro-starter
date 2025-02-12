/**

*/
export declare const AUTH_TOKEN_KEY = "tinacms-auth";
export type TokenObject = {
    id_token: string;
    access_token?: string;
    refresh_token?: string;
};
export declare const authenticate: (clientId: string, frontendUrl: string) => Promise<TokenObject>;

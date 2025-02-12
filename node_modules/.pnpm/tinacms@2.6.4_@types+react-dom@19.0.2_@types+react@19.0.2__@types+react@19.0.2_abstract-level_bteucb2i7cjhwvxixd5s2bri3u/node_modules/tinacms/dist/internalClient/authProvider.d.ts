import { AuthProvider, LoginStrategy } from '@tinacms/schema-tools';
import { TokenObject } from '../auth/authenticate';
type Input = Parameters<AuthProvider['fetchWithToken']>[0];
type Init = Parameters<AuthProvider['fetchWithToken']>[1];
type FetchReturn = ReturnType<AuthProvider['fetchWithToken']>;
export declare abstract class AbstractAuthProvider implements AuthProvider {
    /**
     * Wraps the normal fetch function with same API but adds the authorization header token.
     *
     * @example
     * const test = await tinaCloudClient.fetchWithToken(`/mycustomAPI/thing/one`) // the token will be passed in the authorization header
     *
     * @param input fetch function input
     * @param init fetch function init
     */
    fetchWithToken(input: Input, init: Init): FetchReturn;
    authorize(context?: any): Promise<any>;
    isAuthorized(context?: any): Promise<boolean>;
    isAuthenticated(): Promise<boolean>;
    getLoginStrategy(): LoginStrategy;
    /**
     * A React component that renders the custom UI for the login screen.
     * Set the LoginStrategy to LoginScreen when providing this function.
     */
    getLoginScreen(): any;
    getSessionProvider(): import("react").FC<{}>;
    abstract getToken(): any;
    abstract getUser(): any;
    abstract logout(): any;
    abstract authenticate(props?: Record<string, string>): any;
}
export declare class TinaCloudAuthProvider extends AbstractAuthProvider {
    clientId: string;
    identityApiUrl: string;
    frontendUrl: string;
    token: string;
    setToken: (_token: TokenObject) => void;
    getToken: () => Promise<TokenObject>;
    constructor({ clientId, identityApiUrl, tokenStorage, frontendUrl, ...options }: {
        clientId: string;
        identityApiUrl: string;
        tokenStorage?: 'MEMORY' | 'LOCAL_STORAGE' | 'CUSTOM';
        getTokenFn?: () => Promise<TokenObject>;
        frontendUrl: string;
    });
    authenticate(): Promise<TokenObject>;
    getUser(): Promise<any>;
    logout(): Promise<void>;
    getRefreshedToken(tokens: string): Promise<TokenObject>;
    parseJwt(token: any): any;
}
export declare class LocalAuthProvider extends AbstractAuthProvider {
    constructor();
    authenticate(): Promise<{
        access_token: string;
        id_token: string;
        refresh_token: string;
    }>;
    getUser(): Promise<boolean>;
    getToken(): Promise<{
        id_token: string;
    }>;
    logout(): Promise<void>;
}
export {};

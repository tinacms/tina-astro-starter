import type { ResolvedSessionConfig, SessionDriverName } from '../types/public/config.js';
import type { AstroCookies } from './cookies/cookies.js';
export declare const PERSIST_SYMBOL: unique symbol;
export declare class AstroSession<TDriver extends SessionDriverName = any> {
    #private;
    constructor(cookies: AstroCookies, { cookie: cookieConfig, ...config }: Exclude<ResolvedSessionConfig<TDriver>, undefined>);
    /**
     * Gets a session value. Returns `undefined` if the session or value does not exist.
     */
    get<T = any>(key: string): Promise<T | undefined>;
    /**
     * Checks if a session value exists.
     */
    has(key: string): Promise<boolean>;
    /**
     * Gets all session values.
     */
    keys(): Promise<MapIterator<string>>;
    /**
     * Gets all session values.
     */
    values(): Promise<any[]>;
    /**
     * Gets all session entries.
     */
    entries(): Promise<any[][]>;
    /**
     * Deletes a session value.
     */
    delete(key: string): void;
    /**
     * Sets a session value. The session is created if it does not exist.
     */
    set<T = any>(key: string, value: T, { ttl }?: {
        ttl?: number;
    }): void;
    /**
     * Destroys the session, clearing the cookie and storage if it exists.
     */
    destroy(): void;
    /**
     * Regenerates the session, creating a new session ID. The existing session data is preserved.
     */
    regenerate(): Promise<void>;
    [PERSIST_SYMBOL](): Promise<void>;
    get sessionID(): string | undefined;
}
export declare function resolveSessionDriver(driver: string | undefined): Promise<string> | string | null;

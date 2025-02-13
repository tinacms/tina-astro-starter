/**

*/
import http from 'node:http';
export declare const gqlServer: (database: any, verbose: boolean) => Promise<http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>>;

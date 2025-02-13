import { AdapterInstance, AdapterOptions, Adapter, Peer } from '../index.js';
import { WebSocketHandler, Server, ServerWebSocket } from 'bun';
import '../shared/crossws.ChIJSJVK.js';

interface BunAdapter extends AdapterInstance {
    websocket: WebSocketHandler<ContextData>;
    handleUpgrade(req: Request, server: Server): Promise<Response | undefined>;
}
interface BunOptions extends AdapterOptions {
}
type ContextData = {
    peer?: BunPeer;
    request: Request;
    server?: Server;
};
declare const _default: Adapter<BunAdapter, BunOptions>;

declare class BunPeer extends Peer<{
    ws: ServerWebSocket<ContextData>;
    request: Request;
    peers: Set<BunPeer>;
}> {
    get remoteAddress(): string;
    send(data: unknown, options?: {
        compress?: boolean;
    }): number;
    publish(topic: string, data: unknown, options?: {
        compress?: boolean;
    }): number;
    subscribe(topic: string): void;
    unsubscribe(topic: string): void;
    close(code?: number, reason?: string): void;
    terminate(): void;
}

export { type BunAdapter, type BunOptions, _default as default };

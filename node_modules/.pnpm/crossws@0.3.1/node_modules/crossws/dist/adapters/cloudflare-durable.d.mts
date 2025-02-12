import { Adapter, AdapterInstance, AdapterOptions } from '../index.mjs';
import { W as WebSocket$1 } from '../shared/crossws.ChIJSJVK.mjs';
import * as CF from '@cloudflare/workers-types';
import { DurableObject } from 'cloudflare:workers';

declare const _default: Adapter<CloudflareDurableAdapter, CloudflareOptions>;

interface CloudflareDurableAdapter extends AdapterInstance {
    handleUpgrade(req: Request | CF.Request, env: unknown, context: CF.ExecutionContext): Promise<Response>;
    handleDurableInit(obj: DurableObject, state: DurableObjectState, env: unknown): void;
    handleDurableUpgrade(obj: DurableObject, req: Request | CF.Request): Promise<Response>;
    handleDurableMessage(obj: DurableObject, ws: WebSocket | CF.WebSocket | WebSocket$1, message: ArrayBuffer | string): Promise<void>;
    handleDurableClose(obj: DurableObject, ws: WebSocket | CF.WebSocket | WebSocket$1, code: number, reason: string, wasClean: boolean): Promise<void>;
}
interface CloudflareOptions extends AdapterOptions {
    bindingName?: string;
    instanceName?: string;
}

export { type CloudflareDurableAdapter, type CloudflareOptions, _default as default };

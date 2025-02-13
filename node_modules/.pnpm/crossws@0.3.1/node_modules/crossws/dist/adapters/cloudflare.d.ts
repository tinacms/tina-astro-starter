import { AdapterInstance, AdapterOptions, Adapter } from '../index.js';
import * as CF from '@cloudflare/workers-types';
import '../shared/crossws.ChIJSJVK.js';

interface CloudflareAdapter extends AdapterInstance {
    handleUpgrade(req: CF.Request, env: unknown, context: CF.ExecutionContext): Promise<CF.Response>;
}
interface CloudflareOptions extends AdapterOptions {
}
declare const _default: Adapter<CloudflareAdapter, CloudflareOptions>;

export { type CloudflareAdapter, type CloudflareOptions, _default as default };

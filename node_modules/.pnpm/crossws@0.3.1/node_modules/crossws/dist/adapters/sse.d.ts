import { AdapterInstance, AdapterOptions, Adapter } from '../index.js';
import '../shared/crossws.ChIJSJVK.js';

interface SSEAdapter extends AdapterInstance {
    fetch(req: Request): Promise<Response>;
}
interface SSEOptions extends AdapterOptions {
    bidir?: boolean;
}
declare const _default: Adapter<SSEAdapter, SSEOptions>;

export { type SSEAdapter, type SSEOptions, _default as default };

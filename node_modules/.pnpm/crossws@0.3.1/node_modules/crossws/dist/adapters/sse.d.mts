import { AdapterInstance, AdapterOptions, Adapter } from '../index.mjs';
import '../shared/crossws.ChIJSJVK.mjs';

interface SSEAdapter extends AdapterInstance {
    fetch(req: Request): Promise<Response>;
}
interface SSEOptions extends AdapterOptions {
    bidir?: boolean;
}
declare const _default: Adapter<SSEAdapter, SSEOptions>;

export { type SSEAdapter, type SSEOptions, _default as default };

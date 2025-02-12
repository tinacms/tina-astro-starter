import { M as Message, P as Peer, t as toBufferLike } from '../shared/crossws.DTY7a69w.mjs';
import { d as defineWebSocketAdapter, a as adapterUtils, A as AdapterHookable } from '../shared/crossws.B4sHId41.mjs';
import { W as WSError } from '../shared/crossws.By9qWDAI.mjs';
import 'uncrypto';

const cloudflare = defineWebSocketAdapter(
  (options = {}) => {
    const hooks = new AdapterHookable(options);
    const peers = /* @__PURE__ */ new Set();
    return {
      ...adapterUtils(peers),
      handleUpgrade: async (request, env, context) => {
        const res = await hooks.callHook(
          "upgrade",
          request
        );
        if (res instanceof Response) {
          return res;
        }
        const pair = new WebSocketPair();
        const client = pair[0];
        const server = pair[1];
        const peer = new CloudflarePeer({
          ws: client,
          peers,
          wsServer: server,
          request,
          cfEnv: env,
          cfCtx: context
        });
        peers.add(peer);
        server.accept();
        hooks.callHook("open", peer);
        server.addEventListener("message", (event) => {
          hooks.callHook(
            "message",
            peer,
            new Message(event.data, peer, event)
          );
        });
        server.addEventListener("error", (event) => {
          peers.delete(peer);
          hooks.callHook("error", peer, new WSError(event.error));
        });
        server.addEventListener("close", (event) => {
          peers.delete(peer);
          hooks.callHook("close", peer, event);
        });
        return new Response(null, {
          status: 101,
          webSocket: client,
          headers: res?.headers
        });
      }
    };
  }
);
class CloudflarePeer extends Peer {
  send(data) {
    this._internal.wsServer.send(toBufferLike(data));
    return 0;
  }
  publish(_topic, _message) {
  }
  close(code, reason) {
    this._internal.ws.close(code, reason);
  }
}

export { cloudflare as default };

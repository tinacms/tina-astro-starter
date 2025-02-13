import { M as Message, P as Peer, t as toBufferLike } from '../shared/crossws.DTY7a69w.mjs';
import { d as defineWebSocketAdapter, a as adapterUtils, A as AdapterHookable } from '../shared/crossws.B4sHId41.mjs';
import 'uncrypto';

const bun = defineWebSocketAdapter(
  (options = {}) => {
    const hooks = new AdapterHookable(options);
    const peers = /* @__PURE__ */ new Set();
    return {
      ...adapterUtils(peers),
      async handleUpgrade(request, server) {
        const res = await hooks.callHook("upgrade", request);
        if (res instanceof Response) {
          return res;
        }
        const upgradeOK = server.upgrade(request, {
          data: {
            server,
            request
          },
          headers: res?.headers
        });
        if (!upgradeOK) {
          return new Response("Upgrade failed", { status: 500 });
        }
      },
      websocket: {
        message: (ws, message) => {
          const peer = getPeer(ws, peers);
          hooks.callHook("message", peer, new Message(message, peer));
        },
        open: (ws) => {
          const peer = getPeer(ws, peers);
          peers.add(peer);
          hooks.callHook("open", peer);
        },
        close: (ws) => {
          const peer = getPeer(ws, peers);
          peers.delete(peer);
          hooks.callHook("close", peer, {});
        }
      }
    };
  }
);
function getPeer(ws, peers) {
  if (ws.data?.peer) {
    return ws.data.peer;
  }
  const peer = new BunPeer({ ws, request: ws.data.request, peers });
  ws.data = {
    ...ws.data,
    peer
  };
  return peer;
}
class BunPeer extends Peer {
  get remoteAddress() {
    return this._internal.ws.remoteAddress;
  }
  send(data, options) {
    return this._internal.ws.send(toBufferLike(data), options?.compress);
  }
  publish(topic, data, options) {
    return this._internal.ws.publish(
      topic,
      toBufferLike(data),
      options?.compress
    );
  }
  subscribe(topic) {
    this._internal.ws.subscribe(topic);
  }
  unsubscribe(topic) {
    this._internal.ws.unsubscribe(topic);
  }
  close(code, reason) {
    this._internal.ws.close(code, reason);
  }
  terminate() {
    this._internal.ws.terminate();
  }
}

export { bun as default };

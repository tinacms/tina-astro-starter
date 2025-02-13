import { M as Message, P as Peer, t as toBufferLike } from '../shared/crossws.DTY7a69w.mjs';
import { d as defineWebSocketAdapter, a as adapterUtils, A as AdapterHookable } from '../shared/crossws.B4sHId41.mjs';
import { W as WSError } from '../shared/crossws.By9qWDAI.mjs';
import 'uncrypto';

const deno = defineWebSocketAdapter(
  (options = {}) => {
    const hooks = new AdapterHookable(options);
    const peers = /* @__PURE__ */ new Set();
    return {
      ...adapterUtils(peers),
      handleUpgrade: async (request, info) => {
        const res = await hooks.callHook("upgrade", request);
        if (res instanceof Response) {
          return res;
        }
        const upgrade = Deno.upgradeWebSocket(request, {
          // @ts-expect-error https://github.com/denoland/deno/pull/22242
          headers: res?.headers
        });
        const peer = new DenoPeer({
          ws: upgrade.socket,
          request,
          peers,
          denoInfo: info
        });
        peers.add(peer);
        upgrade.socket.addEventListener("open", () => {
          hooks.callHook("open", peer);
        });
        upgrade.socket.addEventListener("message", (event) => {
          hooks.callHook("message", peer, new Message(event.data, peer, event));
        });
        upgrade.socket.addEventListener("close", () => {
          peers.delete(peer);
          hooks.callHook("close", peer, {});
        });
        upgrade.socket.addEventListener("error", (error) => {
          peers.delete(peer);
          hooks.callHook("error", peer, new WSError(error));
        });
        return upgrade.response;
      }
    };
  }
);
class DenoPeer extends Peer {
  get remoteAddress() {
    return this._internal.denoInfo.remoteAddr?.hostname;
  }
  send(data) {
    return this._internal.ws.send(toBufferLike(data));
  }
  publish(topic, data) {
    const dataBuff = toBufferLike(data);
    for (const peer of this._internal.peers) {
      if (peer !== this && peer._topics.has(topic)) {
        peer._internal.ws.send(dataBuff);
      }
    }
  }
  close(code, reason) {
    this._internal.ws.close(code, reason);
  }
  terminate() {
    this._internal.ws.terminate();
  }
}

export { deno as default };

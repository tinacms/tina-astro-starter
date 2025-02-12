class AdapterHookable {
  options;
  constructor(options) {
    this.options = options || {};
  }
  callHook(name, arg1, arg2) {
    const globalHook = this.options.hooks?.[name];
    const globalPromise = globalHook?.(arg1, arg2);
    const resolveHooksPromise = this.options.resolve?.(arg1);
    if (!resolveHooksPromise) {
      return globalPromise;
    }
    const resolvePromise = resolveHooksPromise instanceof Promise ? resolveHooksPromise.then((hooks) => hooks?.[name]) : resolveHooksPromise?.[name];
    return Promise.all([globalPromise, resolvePromise]).then(
      ([globalRes, hook]) => {
        const hookResPromise = hook?.(arg1, arg2);
        return hookResPromise instanceof Promise ? hookResPromise.then((hookRes) => hookRes || globalRes) : hookResPromise || globalRes;
      }
    );
  }
}
function defineHooks(hooks) {
  return hooks;
}

function adapterUtils(peers) {
  return {
    peers,
    publish(topic, message, options) {
      const firstPeer = peers.values().next().value;
      if (firstPeer) {
        firstPeer.send(message, options);
        firstPeer.publish(topic, message, options);
      }
    }
  };
}
function defineWebSocketAdapter(factory) {
  return factory;
}

export { AdapterHookable as A, adapterUtils as a, defineHooks as b, defineWebSocketAdapter as d };

'use client';
import ReactExports, { createContext, useContext, useRef, createElement, useReducer, useEffect, useDebugValue, useCallback } from 'react';
import { getDefaultStore, createStore } from 'jotai/vanilla';

const StoreContext = createContext(
  void 0
);
const useStore = (options) => {
  const store = useContext(StoreContext);
  return (options == null ? void 0 : options.store) || store || getDefaultStore();
};
const Provider = ({
  children,
  store
}) => {
  const storeRef = useRef(void 0);
  if (!store && !storeRef.current) {
    storeRef.current = createStore();
  }
  return createElement(
    StoreContext.Provider,
    {
      value: store || storeRef.current
    },
    children
  );
};

const isPromiseLike = (x) => typeof (x == null ? void 0 : x.then) === "function";
const attachPromiseMeta = (promise) => {
  promise.status = "pending";
  promise.then(
    (v) => {
      promise.status = "fulfilled";
      promise.value = v;
    },
    (e) => {
      promise.status = "rejected";
      promise.reason = e;
    }
  );
};
const use = ReactExports.use || ((promise) => {
  if (promise.status === "pending") {
    throw promise;
  } else if (promise.status === "fulfilled") {
    return promise.value;
  } else if (promise.status === "rejected") {
    throw promise.reason;
  } else {
    attachPromiseMeta(promise);
    throw promise;
  }
});
const continuablePromiseMap = /* @__PURE__ */ new WeakMap();
const createContinuablePromise = (promise) => {
  let continuablePromise = continuablePromiseMap.get(promise);
  if (!continuablePromise) {
    continuablePromise = new Promise((resolve, reject) => {
      let curr = promise;
      const onFulfilled = (me) => (v) => {
        if (curr === me) {
          resolve(v);
        }
      };
      const onRejected = (me) => (e) => {
        if (curr === me) {
          reject(e);
        }
      };
      const registerCancelHandler = (p) => {
        if ("onCancel" in p && typeof p.onCancel === "function") {
          p.onCancel((nextValue) => {
            if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production" && nextValue === p) {
              throw new Error("[Bug] p is not updated even after cancelation");
            }
            if (isPromiseLike(nextValue)) {
              continuablePromiseMap.set(nextValue, continuablePromise);
              curr = nextValue;
              nextValue.then(onFulfilled(nextValue), onRejected(nextValue));
              registerCancelHandler(nextValue);
            } else {
              resolve(nextValue);
            }
          });
        }
      };
      promise.then(onFulfilled(promise), onRejected(promise));
      registerCancelHandler(promise);
    });
    continuablePromiseMap.set(promise, continuablePromise);
  }
  return continuablePromise;
};
function useAtomValue(atom, options) {
  const store = useStore(options);
  const [[valueFromReducer, storeFromReducer, atomFromReducer], rerender] = useReducer(
    (prev) => {
      const nextValue = store.get(atom);
      if (Object.is(prev[0], nextValue) && prev[1] === store && prev[2] === atom) {
        return prev;
      }
      return [nextValue, store, atom];
    },
    void 0,
    () => [store.get(atom), store, atom]
  );
  let value = valueFromReducer;
  if (storeFromReducer !== store || atomFromReducer !== atom) {
    rerender();
    value = store.get(atom);
  }
  const delay = options == null ? void 0 : options.delay;
  useEffect(() => {
    const unsub = store.sub(atom, () => {
      if (typeof delay === "number") {
        const value2 = store.get(atom);
        if (isPromiseLike(value2)) {
          attachPromiseMeta(createContinuablePromise(value2));
        }
        setTimeout(rerender, delay);
        return;
      }
      rerender();
    });
    rerender();
    return unsub;
  }, [store, atom, delay]);
  useDebugValue(value);
  if (isPromiseLike(value)) {
    const promise = createContinuablePromise(value);
    return use(promise);
  }
  return value;
}

function useSetAtom(atom, options) {
  const store = useStore(options);
  const setAtom = useCallback(
    (...args) => {
      if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production" && !("write" in atom)) {
        throw new Error("not writable atom");
      }
      return store.set(atom, ...args);
    },
    [store, atom]
  );
  return setAtom;
}

function useAtom(atom, options) {
  return [
    useAtomValue(atom, options),
    // We do wrong type assertion here, which results in throwing an error.
    useSetAtom(atom, options)
  ];
}

export { Provider, useAtom, useAtomValue, useSetAtom, useStore };

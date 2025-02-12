import { createContext as createContext$1, useContext as useContext$1, useReducer, createElement, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { unstable_runWithPriority, unstable_NormalPriority } from 'scheduler';
import { unstable_batchedUpdates } from 'react-dom';

const CONTEXT_VALUE = Symbol();
const ORIGINAL_PROVIDER = Symbol();
const isSSR = typeof window === 'undefined' || /ServerSideRendering/.test(window.navigator && window.navigator.userAgent);
const useIsomorphicLayoutEffect = isSSR ? useEffect : useLayoutEffect;
// for preact that doesn't have runWithPriority
const runWithNormalPriority = unstable_runWithPriority ? thunk => {
  try {
    unstable_runWithPriority(unstable_NormalPriority, thunk);
  } catch (e) {
    if (e.message === 'Not implemented.') {
      thunk();
    } else {
      throw e;
    }
  }
} : thunk => thunk();
const createProvider = ProviderOrig => {
  const ContextProvider = ({
    value,
    children
  }) => {
    const valueRef = useRef(value);
    const versionRef = useRef(0);
    const [resolve, setResolve] = useState(null);
    if (resolve) {
      resolve(value);
      setResolve(null);
    }
    const contextValue = useRef();
    if (!contextValue.current) {
      const listeners = new Set();
      const update = (thunk, options) => {
        unstable_batchedUpdates(() => {
          versionRef.current += 1;
          const action = {
            n: versionRef.current
          };
          if (options != null && options.suspense) {
            action.n *= -1; // this is intentional to make it temporary version
            action.p = new Promise(r => {
              setResolve(() => v => {
                action.v = v;
                delete action.p;
                r(v);
              });
            });
          }
          listeners.forEach(listener => listener(action));
          thunk();
        });
      };
      contextValue.current = {
        [CONTEXT_VALUE]: {
          /* "v"alue     */v: valueRef,
          /* versio"n"   */n: versionRef,
          /* "l"isteners */l: listeners,
          /* "u"pdate    */u: update
        }
      };
    }
    useIsomorphicLayoutEffect(() => {
      valueRef.current = value;
      versionRef.current += 1;
      runWithNormalPriority(() => {
        contextValue.current[CONTEXT_VALUE].l.forEach(listener => {
          listener({
            n: versionRef.current,
            v: value
          });
        });
      });
    }, [value]);
    return createElement(ProviderOrig, {
      value: contextValue.current
    }, children);
  };
  return ContextProvider;
};
const identity = x => x;
/**
 * This creates a special context for `useContextSelector`.
 *
 * @example
 * import { createContext } from 'use-context-selector';
 *
 * const PersonContext = createContext({ firstName: '', familyName: '' });
 */
function createContext(defaultValue) {
  const context = createContext$1({
    [CONTEXT_VALUE]: {
      /* "v"alue     */v: {
        current: defaultValue
      },
      /* versio"n"   */n: {
        current: -1
      },
      /* "l"isteners */l: new Set(),
      /* "u"pdate    */u: f => f()
    }
  });
  context[ORIGINAL_PROVIDER] = context.Provider;
  context.Provider = createProvider(context.Provider);
  delete context.Consumer; // no support for Consumer
  return context;
}
/**
 * This hook returns context selected value by selector.
 *
 * It will only accept context created by `createContext`.
 * It will trigger re-render if only the selected value is referentially changed.
 *
 * The selector should return referentially equal result for same input for better performance.
 *
 * @example
 * import { useContextSelector } from 'use-context-selector';
 *
 * const firstName = useContextSelector(PersonContext, state => state.firstName);
 */
function useContextSelector(context, selector) {
  const contextValue = useContext$1(context)[CONTEXT_VALUE];
  if (typeof process === 'object' && process.env.NODE_ENV !== 'production') {
    if (!contextValue) {
      throw new Error('useContextSelector requires special context');
    }
  }
  const {
    /* "v"alue     */v: {
      current: value
    },
    /* versio"n"   */n: {
      current: version
    },
    /* "l"isteners */l: listeners
  } = contextValue;
  const selected = selector(value);
  const [state, dispatch] = useReducer((prev, action) => {
    if (!action) {
      // case for `dispatch()` below
      return [value, selected];
    }
    if ('p' in action) {
      throw action.p;
    }
    if (action.n === version) {
      if (Object.is(prev[1], selected)) {
        return prev; // bail out
      }
      return [value, selected];
    }
    try {
      if ('v' in action) {
        if (Object.is(prev[0], action.v)) {
          return prev; // do not update
        }
        const nextSelected = selector(action.v);
        if (Object.is(prev[1], nextSelected)) {
          return prev; // do not update
        }
        return [action.v, nextSelected];
      }
    } catch (e) {
      // ignored (stale props or some other reason)
    }
    return [...prev]; // schedule update
  }, [value, selected]);
  if (!Object.is(state[1], selected)) {
    // schedule re-render
    // this is safe because it's self contained
    dispatch();
  }
  useIsomorphicLayoutEffect(() => {
    listeners.add(dispatch);
    return () => {
      listeners.delete(dispatch);
    };
  }, [listeners]);
  return state[1];
}
/**
 * This hook returns the entire context value.
 * Use this instead of React.useContext for consistent behavior.
 *
 * @example
 * import { useContext } from 'use-context-selector';
 *
 * const person = useContext(PersonContext);
 */
function useContext(context) {
  return useContextSelector(context, identity);
}
/**
 * This hook returns an update function that accepts a thunk function
 *
 * Use this for a function that will change a value in
 * concurrent rendering in React 18.
 * Otherwise, there's no need to use this hook.
 *
 * @example
 * import { useContextUpdate } from 'use-context-selector';
 *
 * const update = useContextUpdate();
 *
 * // Wrap set state function
 * update(() => setState(...));
 *
 * // Experimental suspense mode
 * update(() => setState(...), { suspense: true });
 */
function useContextUpdate(context) {
  const contextValue = useContext$1(context)[CONTEXT_VALUE];
  if (typeof process === 'object' && process.env.NODE_ENV !== 'production') {
    if (!contextValue) {
      throw new Error('useContextUpdate requires special context');
    }
  }
  const {
    u: update
  } = contextValue;
  return update;
}
/**
 * This is a Provider component for bridging multiple react roots
 *
 * @example
 * const valueToBridge = useBridgeValue(PersonContext);
 * return (
 *   <Renderer>
 *     <BridgeProvider context={PersonContext} value={valueToBridge}>
 *       {children}
 *     </BridgeProvider>
 *   </Renderer>
 * );
 */
const BridgeProvider = ({
  context,
  value,
  children
}) => {
  const {
    [ORIGINAL_PROVIDER]: ProviderOrig
  } = context;
  if (typeof process === 'object' && process.env.NODE_ENV !== 'production') {
    if (!ProviderOrig) {
      throw new Error('BridgeProvider requires special context');
    }
  }
  return createElement(ProviderOrig, {
    value
  }, children);
};
/**
 * This hook return a value for BridgeProvider
 */
const useBridgeValue = context => {
  const bridgeValue = useContext$1(context);
  if (typeof process === 'object' && process.env.NODE_ENV !== 'production') {
    if (!bridgeValue[CONTEXT_VALUE]) {
      throw new Error('useBridgeValue requires special context');
    }
  }
  return bridgeValue;
};

export { BridgeProvider, createContext, useBridgeValue, useContext, useContextSelector, useContextUpdate };
//# sourceMappingURL=index.modern.mjs.map

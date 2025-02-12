(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('scheduler'), require('react-native')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'scheduler', 'react-native'], factory) :
  (global = global || self, factory(global.useContextSelector = {}, global.react, global.scheduler, global.reactNative));
})(this, (function (exports, react, scheduler, reactNative) {
  var CONTEXT_VALUE = Symbol();
  var ORIGINAL_PROVIDER = Symbol();
  var isSSR = typeof window === 'undefined' || /ServerSideRendering/.test(window.navigator && window.navigator.userAgent);
  var useIsomorphicLayoutEffect = isSSR ? react.useEffect : react.useLayoutEffect;
  // for preact that doesn't have runWithPriority
  var runWithNormalPriority = scheduler.unstable_runWithPriority ? function (thunk) {
    try {
      scheduler.unstable_runWithPriority(scheduler.unstable_NormalPriority, thunk);
    } catch (e) {
      if (e.message === 'Not implemented.') {
        thunk();
      } else {
        throw e;
      }
    }
  } : function (thunk) {
    return thunk();
  };
  var createProvider = function createProvider(ProviderOrig) {
    var ContextProvider = function ContextProvider(_ref) {
      var value = _ref.value,
        children = _ref.children;
      var valueRef = react.useRef(value);
      var versionRef = react.useRef(0);
      var _useState = react.useState(null),
        resolve = _useState[0],
        setResolve = _useState[1];
      if (resolve) {
        resolve(value);
        setResolve(null);
      }
      var contextValue = react.useRef();
      if (!contextValue.current) {
        var _contextValue$current;
        var listeners = new Set();
        var update = function update(thunk, options) {
          reactNative.unstable_batchedUpdates(function () {
            versionRef.current += 1;
            var action = {
              n: versionRef.current
            };
            if (options != null && options.suspense) {
              action.n *= -1; // this is intentional to make it temporary version
              action.p = new Promise(function (r) {
                setResolve(function () {
                  return function (v) {
                    action.v = v;
                    delete action.p;
                    r(v);
                  };
                });
              });
            }
            listeners.forEach(function (listener) {
              return listener(action);
            });
            thunk();
          });
        };
        contextValue.current = (_contextValue$current = {}, _contextValue$current[CONTEXT_VALUE] = {
          /* "v"alue     */v: valueRef,
          /* versio"n"   */n: versionRef,
          /* "l"isteners */l: listeners,
          /* "u"pdate    */u: update
        }, _contextValue$current);
      }
      useIsomorphicLayoutEffect(function () {
        valueRef.current = value;
        versionRef.current += 1;
        runWithNormalPriority(function () {
          contextValue.current[CONTEXT_VALUE].l.forEach(function (listener) {
            listener({
              n: versionRef.current,
              v: value
            });
          });
        });
      }, [value]);
      return react.createElement(ProviderOrig, {
        value: contextValue.current
      }, children);
    };
    return ContextProvider;
  };
  var identity = function identity(x) {
    return x;
  };
  /**
   * This creates a special context for `useContextSelector`.
   *
   * @example
   * import { createContext } from 'use-context-selector';
   *
   * const PersonContext = createContext({ firstName: '', familyName: '' });
   */
  function createContext(defaultValue) {
    var _createContextOrig;
    var context = react.createContext((_createContextOrig = {}, _createContextOrig[CONTEXT_VALUE] = {
      /* "v"alue     */v: {
        current: defaultValue
      },
      /* versio"n"   */n: {
        current: -1
      },
      /* "l"isteners */l: new Set(),
      /* "u"pdate    */u: function u(f) {
        return f();
      }
    }, _createContextOrig));
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
    var contextValue = react.useContext(context)[CONTEXT_VALUE];
    if (typeof process === 'object' && process.env.NODE_ENV !== 'production') {
      if (!contextValue) {
        throw new Error('useContextSelector requires special context');
      }
    }
    var value = contextValue.v.current,
      version = contextValue.n.current,
      listeners = contextValue.l;
    var selected = selector(value);
    var _useReducer = react.useReducer(function (prev, action) {
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
            var nextSelected = selector(action.v);
            if (Object.is(prev[1], nextSelected)) {
              return prev; // do not update
            }
            return [action.v, nextSelected];
          }
        } catch (e) {
          // ignored (stale props or some other reason)
        }
        return [].concat(prev); // schedule update
      }, [value, selected]),
      state = _useReducer[0],
      dispatch = _useReducer[1];
    if (!Object.is(state[1], selected)) {
      // schedule re-render
      // this is safe because it's self contained
      dispatch();
    }
    useIsomorphicLayoutEffect(function () {
      listeners.add(dispatch);
      return function () {
        listeners["delete"](dispatch);
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
    var contextValue = react.useContext(context)[CONTEXT_VALUE];
    if (typeof process === 'object' && process.env.NODE_ENV !== 'production') {
      if (!contextValue) {
        throw new Error('useContextUpdate requires special context');
      }
    }
    var update = contextValue.u;
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
  var BridgeProvider = function BridgeProvider(_ref2) {
    var context = _ref2.context,
      value = _ref2.value,
      children = _ref2.children;
    var ProviderOrig = context[ORIGINAL_PROVIDER];
    if (typeof process === 'object' && process.env.NODE_ENV !== 'production') {
      if (!ProviderOrig) {
        throw new Error('BridgeProvider requires special context');
      }
    }
    return react.createElement(ProviderOrig, {
      value: value
    }, children);
  };
  /**
   * This hook return a value for BridgeProvider
   */
  var useBridgeValue = function useBridgeValue(context) {
    var bridgeValue = react.useContext(context);
    if (typeof process === 'object' && process.env.NODE_ENV !== 'production') {
      if (!bridgeValue[CONTEXT_VALUE]) {
        throw new Error('useBridgeValue requires special context');
      }
    }
    return bridgeValue;
  };

  exports.BridgeProvider = BridgeProvider;
  exports.createContext = createContext;
  exports.useBridgeValue = useBridgeValue;
  exports.useContext = useContext;
  exports.useContextSelector = useContextSelector;
  exports.useContextUpdate = useContextUpdate;

}));
//# sourceMappingURL=index.native.umd.js.map

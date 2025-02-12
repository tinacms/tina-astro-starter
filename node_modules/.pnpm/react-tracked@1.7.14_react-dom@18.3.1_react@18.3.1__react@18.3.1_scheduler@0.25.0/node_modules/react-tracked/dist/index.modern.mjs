import { useRef, useEffect, useDebugValue, useReducer, useCallback, useMemo, createContext as createContext$1, useContext, createElement, forwardRef, memo as memo$1 } from 'react';
import { createContext, useContextUpdate, useContextSelector } from 'use-context-selector';
import { affectedToPathList, isChanged, createProxy, trackMemo } from 'proxy-compare';
export { getUntracked as getUntrackedObject } from 'proxy-compare';

const useAffectedDebugValue = (state, affected) => {
  const pathList = useRef();
  useEffect(() => {
    pathList.current = affectedToPathList(state, affected);
  });
  useDebugValue(state);
};

const createTrackedSelector = useSelector => {
  const useTrackedSelector = () => {
    const [, forceUpdate] = useReducer(c => c + 1, 0);
    const affected = new WeakMap();
    const lastAffected = useRef();
    const prevState = useRef();
    const lastState = useRef();
    useEffect(() => {
      lastAffected.current = affected;
      if (prevState.current !== lastState.current && isChanged(prevState.current, lastState.current, affected, new WeakMap())) {
        prevState.current = lastState.current;
        forceUpdate();
      }
    });
    const selector = useCallback(nextState => {
      lastState.current = nextState;
      if (prevState.current && prevState.current !== nextState && lastAffected.current && !isChanged(prevState.current, nextState, lastAffected.current, new WeakMap())) {
        // not changed
        return prevState.current;
      }
      prevState.current = nextState;
      return nextState;
    }, []);
    const state = useSelector(selector);
    if (typeof process === 'object' && process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useAffectedDebugValue(state, affected);
    }
    const proxyCache = useMemo(() => new WeakMap(), []); // per-hook proxyCache
    return createProxy(state, affected, proxyCache);
  };
  return useTrackedSelector;
};

/* eslint react/destructuring-assignment: off */
const createContainer = (useValue, options) => {
  var _options, _options2;
  if (typeof options === 'boolean') {
    // eslint-disable-next-line no-console
    console.warn('boolean option is deprecated, please specify { concurrentMode: true }');
    options = {
      concurrentMode: options
    };
  }
  const {
    stateContextName = 'StateContainer',
    updateContextName = 'UpdateContainer',
    concurrentMode
  } = options || {};
  const StateContext = createContext((_options = options) == null ? void 0 : _options.defaultState);
  const UpdateContext = createContext$1((_options2 = options) == null ? void 0 : _options2.defaultUpdate);
  StateContext.displayName = stateContextName;
  UpdateContext.displayName = updateContextName;
  const Provider = props => {
    const [state, update] = useValue(props);
    return createElement(UpdateContext.Provider, {
      value: update
    }, createElement(StateContext.Provider, {
      value: state
    }, props.children));
  };
  const useSelector = selector => {
    if (typeof process === 'object' && process.env.NODE_ENV !== 'production') {
      const selectorOrig = selector;
      selector = state => {
        if (state === undefined) {
          throw new Error('Please use <Provider>');
        }
        return selectorOrig(state);
      };
    }
    const selected = useContextSelector(StateContext, selector);
    useDebugValue(selected);
    return selected;
  };
  const useTrackedState = createTrackedSelector(useSelector);
  const useUpdate = concurrentMode ? () => {
    if (typeof process === 'object' && process.env.NODE_ENV !== 'production' && useContext(UpdateContext) === undefined) {
      throw new Error('Please use <Provider>');
    }
    const contextUpdate = useContextUpdate(StateContext);
    const update = useContext(UpdateContext);
    return useCallback((...args) => {
      let result;
      contextUpdate(() => {
        result = update(...args);
      });
      return result;
    }, [contextUpdate, update]);
  }
  // not concurrentMode
  : () => {
    if (typeof process === 'object' && process.env.NODE_ENV !== 'production' && useContext(UpdateContext) === undefined) {
      throw new Error('Please use <Provider>');
    }
    return useContext(UpdateContext);
  };
  const useTracked = () => [useTrackedState(), useUpdate()];
  return {
    Provider,
    useTrackedState,
    useTracked,
    useUpdate,
    useSelector
  };
};

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

function memo(Component, propsAreEqual) {
  const WrappedComponent = forwardRef((props, ref) => {
    Object.values(props).forEach(trackMemo);
    return createElement(Component, _extends({}, props, {
      ref
    }));
  });
  return memo$1(WrappedComponent, propsAreEqual);
}

export { createContainer, createTrackedSelector, memo };
//# sourceMappingURL=index.modern.mjs.map

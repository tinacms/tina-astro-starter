(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('use-context-selector'), require('proxy-compare')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'use-context-selector', 'proxy-compare'], factory) :
  (global = global || self, factory(global.reactTracked = {}, global.React, global.useContextSelector, global.proxyCompare));
})(this, (function (exports, react, useContextSelector, proxyCompare) {
  var useAffectedDebugValue = function useAffectedDebugValue(state, affected) {
    var pathList = react.useRef();
    react.useEffect(function () {
      pathList.current = proxyCompare.affectedToPathList(state, affected);
    });
    react.useDebugValue(state);
  };

  var createTrackedSelector = function createTrackedSelector(useSelector) {
    var useTrackedSelector = function useTrackedSelector() {
      var _useReducer = react.useReducer(function (c) {
          return c + 1;
        }, 0),
        forceUpdate = _useReducer[1];
      var affected = new WeakMap();
      var lastAffected = react.useRef();
      var prevState = react.useRef();
      var lastState = react.useRef();
      react.useEffect(function () {
        lastAffected.current = affected;
        if (prevState.current !== lastState.current && proxyCompare.isChanged(prevState.current, lastState.current, affected, new WeakMap())) {
          prevState.current = lastState.current;
          forceUpdate();
        }
      });
      var selector = react.useCallback(function (nextState) {
        lastState.current = nextState;
        if (prevState.current && prevState.current !== nextState && lastAffected.current && !proxyCompare.isChanged(prevState.current, nextState, lastAffected.current, new WeakMap())) {
          // not changed
          return prevState.current;
        }
        prevState.current = nextState;
        return nextState;
      }, []);
      var state = useSelector(selector);
      if (typeof process === 'object' && process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useAffectedDebugValue(state, affected);
      }
      var proxyCache = react.useMemo(function () {
        return new WeakMap();
      }, []); // per-hook proxyCache
      return proxyCompare.createProxy(state, affected, proxyCache);
    };
    return useTrackedSelector;
  };

  /* eslint react/destructuring-assignment: off */
  var createContainer = function createContainer(useValue, options) {
    var _options, _options2;
    if (typeof options === 'boolean') {
      // eslint-disable-next-line no-console
      console.warn('boolean option is deprecated, please specify { concurrentMode: true }');
      options = {
        concurrentMode: options
      };
    }
    var _ref = options || {},
      _ref$stateContextName = _ref.stateContextName,
      stateContextName = _ref$stateContextName === void 0 ? 'StateContainer' : _ref$stateContextName,
      _ref$updateContextNam = _ref.updateContextName,
      updateContextName = _ref$updateContextNam === void 0 ? 'UpdateContainer' : _ref$updateContextNam,
      concurrentMode = _ref.concurrentMode;
    var StateContext = useContextSelector.createContext((_options = options) == null ? void 0 : _options.defaultState);
    var UpdateContext = react.createContext((_options2 = options) == null ? void 0 : _options2.defaultUpdate);
    StateContext.displayName = stateContextName;
    UpdateContext.displayName = updateContextName;
    var Provider = function Provider(props) {
      var _useValue = useValue(props),
        state = _useValue[0],
        update = _useValue[1];
      return react.createElement(UpdateContext.Provider, {
        value: update
      }, react.createElement(StateContext.Provider, {
        value: state
      }, props.children));
    };
    var useSelector = function useSelector(selector) {
      if (typeof process === 'object' && process.env.NODE_ENV !== 'production') {
        var selectorOrig = selector;
        selector = function selector(state) {
          if (state === undefined) {
            throw new Error('Please use <Provider>');
          }
          return selectorOrig(state);
        };
      }
      var selected = useContextSelector.useContextSelector(StateContext, selector);
      react.useDebugValue(selected);
      return selected;
    };
    var useTrackedState = createTrackedSelector(useSelector);
    var useUpdate = concurrentMode ? function () {
      if (typeof process === 'object' && process.env.NODE_ENV !== 'production' && react.useContext(UpdateContext) === undefined) {
        throw new Error('Please use <Provider>');
      }
      var contextUpdate = useContextSelector.useContextUpdate(StateContext);
      var update = react.useContext(UpdateContext);
      return react.useCallback(function () {
        var _arguments = arguments;
        var result;
        contextUpdate(function () {
          result = update.apply(void 0, [].slice.call(_arguments));
        });
        return result;
      }, [contextUpdate, update]);
    }
    // not concurrentMode
    : function () {
      if (typeof process === 'object' && process.env.NODE_ENV !== 'production' && react.useContext(UpdateContext) === undefined) {
        throw new Error('Please use <Provider>');
      }
      return react.useContext(UpdateContext);
    };
    var useTracked = function useTracked() {
      return [useTrackedState(), useUpdate()];
    };
    return {
      Provider: Provider,
      useTrackedState: useTrackedState,
      useTracked: useTracked,
      useUpdate: useUpdate,
      useSelector: useSelector
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
    var WrappedComponent = react.forwardRef(function (props, ref) {
      Object.values(props).forEach(proxyCompare.trackMemo);
      return react.createElement(Component, _extends({}, props, {
        ref: ref
      }));
    });
    return react.memo(WrappedComponent, propsAreEqual);
  }

  Object.defineProperty(exports, 'getUntrackedObject', {
    enumerable: true,
    get: function () { return proxyCompare.getUntracked; }
  });
  exports.createContainer = createContainer;
  exports.createTrackedSelector = createTrackedSelector;
  exports.memo = memo;

}));
//# sourceMappingURL=index.umd.js.map

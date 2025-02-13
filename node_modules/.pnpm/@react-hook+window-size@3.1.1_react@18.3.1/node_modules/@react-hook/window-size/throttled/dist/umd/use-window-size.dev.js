(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.UseWindowSize = {}, global.React));
})(this, (function (exports, React) { 'use strict';

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var React__namespace = /*#__PURE__*/_interopNamespace(React);

  var useLatest = function useLatest(current) {
    var storedValue = React__namespace.useRef(current);
    React__namespace.useEffect(function () {
      storedValue.current = current;
    });
    return storedValue;
  };

  var perf = typeof performance !== 'undefined' ? performance : Date;

  var now = function now() {
    return perf.now();
  };

  function useThrottleCallback(callback, fps, leading) {
    if (fps === void 0) {
      fps = 30;
    }

    if (leading === void 0) {
      leading = false;
    }

    var storedCallback = useLatest(callback);
    var ms = 1000 / fps;
    var prev = React__namespace.useRef(0);
    var trailingTimeout = React__namespace.useRef();

    var clearTrailing = function clearTrailing() {
      return trailingTimeout.current && clearTimeout(trailingTimeout.current);
    };

    var deps = [fps, leading, storedCallback]; // Reset any time the deps change

    function _ref() {
      prev.current = 0;
      clearTrailing();
    }

    React__namespace.useEffect(function () {
      return _ref;
    }, deps);
    return React__namespace.useCallback(function () {
      // eslint-disable-next-line prefer-rest-params
      var args = arguments;
      var rightNow = now();

      var call = function call() {
        prev.current = rightNow;
        clearTrailing();
        storedCallback.current.apply(null, args);
      };

      var current = prev.current; // leading

      if (leading && current === 0) return call(); // body

      if (rightNow - current > ms) {
        if (current > 0) return call();
        prev.current = rightNow;
      } // trailing


      clearTrailing();
      trailingTimeout.current = setTimeout(function () {
        call();
        prev.current = 0;
      }, ms);
    }, deps);
  }
  function useThrottle(initialState, fps, leading) {
    var state = React__namespace.useState(initialState);
    return [state[0], useThrottleCallback(state[1], fps, leading)];
  }

  function useEvent(target, type, listener, cleanup) {
    var storedListener = React__namespace.useRef(listener);
    var storedCleanup = React__namespace.useRef(cleanup);
    React__namespace.useEffect(function () {
      storedListener.current = listener;
      storedCleanup.current = cleanup;
    });
    React__namespace.useEffect(function () {
      var targetEl = target && 'current' in target ? target.current : target;
      if (!targetEl) return;
      var didUnsubscribe = 0;

      function listener() {
        if (didUnsubscribe) return;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        storedListener.current.apply(this, args);
      }

      targetEl.addEventListener(type, listener);
      var cleanup = storedCleanup.current;
      return function () {
        didUnsubscribe = 1;
        targetEl.removeEventListener(type, listener);
        cleanup && cleanup();
      }; // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [target, type]);
  }

  /* eslint-disable import/no-extraneous-dependencies */
  var emptyObj = {};
  var win = typeof window === 'undefined' ? null : window;
  var wv = win && typeof win.visualViewport !== 'undefined' ? win.visualViewport : null;

  var getSize = function getSize() {
    return [document.documentElement.clientWidth, document.documentElement.clientHeight];
  };

  var useWindowSize = function useWindowSize(options) {
    if (options === void 0) {
      options = emptyObj;
    }

    var _options = options,
        fps = _options.fps,
        leading = _options.leading,
        _options$initialWidth = _options.initialWidth,
        initialWidth = _options$initialWidth === void 0 ? 0 : _options$initialWidth,
        _options$initialHeigh = _options.initialHeight,
        initialHeight = _options$initialHeigh === void 0 ? 0 : _options$initialHeigh;

    var _useThrottle = useThrottle(
    /* istanbul ignore next */
    typeof document === 'undefined' ? [initialWidth, initialHeight] : getSize, fps, leading),
        size = _useThrottle[0],
        setThrottledSize = _useThrottle[1];

    var setSize = function setSize() {
      return setThrottledSize(getSize);
    };

    useEvent(win, 'resize', setSize); // @ts-expect-error

    useEvent(wv, 'resize', setSize);
    useEvent(win, 'orientationchange', setSize);
    return size;
  };
  var useWindowHeight = function useWindowHeight(options) {
    return useWindowSize(options)[1];
  };
  var useWindowWidth = function useWindowWidth(options) {
    return useWindowSize(options)[0];
  };

  exports.useWindowHeight = useWindowHeight;
  exports.useWindowSize = useWindowSize;
  exports.useWindowWidth = useWindowWidth;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=use-window-size.dev.js.map

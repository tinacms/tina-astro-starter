'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var loader = require('@monaco-editor/loader');
var React = require('react');
var index = require('../useMount/index.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var loader__default = /*#__PURE__*/_interopDefaultLegacy(loader);

function useMonaco() {
  const [monaco, setMonaco] = React.useState(loader__default['default'].__getMonacoInstance());
  index['default'](() => {
    let cancelable;

    if (!monaco) {
      cancelable = loader__default['default'].init();
      cancelable.then(monaco => {
        setMonaco(monaco);
      });
    }

    return () => {
      var _cancelable;

      return (_cancelable = cancelable) === null || _cancelable === void 0 ? void 0 : _cancelable.cancel();
    };
  });
  return monaco;
}

exports.default = useMonaco;

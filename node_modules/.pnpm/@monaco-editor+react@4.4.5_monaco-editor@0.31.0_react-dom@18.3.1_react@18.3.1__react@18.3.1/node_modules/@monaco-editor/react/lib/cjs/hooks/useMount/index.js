'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function useMount(effect) {
  React.useEffect(effect, []);
}

exports.default = useMount;

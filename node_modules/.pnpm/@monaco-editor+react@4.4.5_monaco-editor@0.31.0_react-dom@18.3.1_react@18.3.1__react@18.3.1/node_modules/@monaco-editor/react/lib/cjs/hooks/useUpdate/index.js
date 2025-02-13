'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function useUpdate(effect, deps, applyChanges = true) {
  const isInitialMount = React.useRef(true);
  React.useEffect(isInitialMount.current || !applyChanges ? () => {
    isInitialMount.current = false;
  } : effect, deps);
}

exports.default = useUpdate;

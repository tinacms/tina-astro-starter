'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var PropTypes = require('prop-types');
var _rollupPluginBabelHelpers = require('../_virtual/_rollupPluginBabelHelpers.js');
var Loading = require('../Loading/Loading.js');
var styles = require('./styles.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);

// one of the reasons why we use a separate prop for passing ref instead of using forwardref

function MonacoContainer({
  width,
  height,
  isEditorReady,
  loading,
  _ref,
  className,
  wrapperProps
}) {
  return /*#__PURE__*/React__default['default'].createElement("section", _rollupPluginBabelHelpers['extends']({
    style: { ...styles['default'].wrapper,
      width,
      height
    }
  }, wrapperProps), !isEditorReady && /*#__PURE__*/React__default['default'].createElement(Loading['default'], {
    content: loading
  }), /*#__PURE__*/React__default['default'].createElement("div", {
    ref: _ref,
    style: { ...styles['default'].fullWidth,
      ...(!isEditorReady && styles['default'].hide)
    },
    className: className
  }));
}

MonacoContainer.propTypes = {
  width: PropTypes__default['default'].oneOfType([PropTypes__default['default'].number, PropTypes__default['default'].string]).isRequired,
  height: PropTypes__default['default'].oneOfType([PropTypes__default['default'].number, PropTypes__default['default'].string]).isRequired,
  loading: PropTypes__default['default'].oneOfType([PropTypes__default['default'].element, PropTypes__default['default'].string]).isRequired,
  isEditorReady: PropTypes__default['default'].bool.isRequired,
  className: PropTypes__default['default'].string,
  wrapperProps: PropTypes__default['default'].object
};

exports.default = MonacoContainer;

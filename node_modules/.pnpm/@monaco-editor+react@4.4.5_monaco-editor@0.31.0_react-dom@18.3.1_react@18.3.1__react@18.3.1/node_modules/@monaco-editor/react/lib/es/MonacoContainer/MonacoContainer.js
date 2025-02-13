import React from 'react';
import PropTypes from 'prop-types';
import { extends as _extends } from '../_virtual/_rollupPluginBabelHelpers.js';
import Loading from '../Loading/Loading.js';
import styles from './styles.js';

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
  return /*#__PURE__*/React.createElement("section", _extends({
    style: { ...styles.wrapper,
      width,
      height
    }
  }, wrapperProps), !isEditorReady && /*#__PURE__*/React.createElement(Loading, {
    content: loading
  }), /*#__PURE__*/React.createElement("div", {
    ref: _ref,
    style: { ...styles.fullWidth,
      ...(!isEditorReady && styles.hide)
    },
    className: className
  }));
}

MonacoContainer.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  loading: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  isEditorReady: PropTypes.bool.isRequired,
  className: PropTypes.string,
  wrapperProps: PropTypes.object
};

export default MonacoContainer;

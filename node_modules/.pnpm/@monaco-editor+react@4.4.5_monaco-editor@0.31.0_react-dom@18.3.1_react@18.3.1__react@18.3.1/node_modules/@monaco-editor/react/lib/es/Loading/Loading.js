import React from 'react';

const loadingStyles = {
  display: 'flex',
  height: '100%',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center'
};

function Loading({
  content
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: loadingStyles
  }, content);
}

export default Loading;

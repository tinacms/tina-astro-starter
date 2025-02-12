function _extends() {
  _extends = Object.assign || function (target) {
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

//      
var setFieldData = function setFieldData(args, state) {
  var name = args[0],
      data = args[1];
  var field = state.fields[name];

  if (field) {
    field.data = _extends({}, field.data, data);
  }
};

//

export default setFieldData;

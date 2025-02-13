(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global['final-form-set-field-data'] = {}));
}(this, function (exports) { 'use strict';

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

  exports.default = setFieldData;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=final-form-set-field-data.umd.js.map

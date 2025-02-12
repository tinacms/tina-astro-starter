'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var loader = require('@monaco-editor/loader');
var index = require('./DiffEditor/index.js');
var index$1 = require('./hooks/useMonaco/index.js');
var index$2 = require('./Editor/index.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var loader__default = /*#__PURE__*/_interopDefaultLegacy(loader);



Object.defineProperty(exports, 'loader', {
	enumerable: true,
	get: function () {
		return loader__default['default'];
	}
});
exports.DiffEditor = index['default'];
exports.useMonaco = index$1['default'];
exports.default = index$2['default'];

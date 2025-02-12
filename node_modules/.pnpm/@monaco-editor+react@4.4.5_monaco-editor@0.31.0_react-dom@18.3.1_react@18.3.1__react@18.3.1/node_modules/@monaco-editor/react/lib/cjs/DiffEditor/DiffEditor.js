'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var loader = require('@monaco-editor/loader');
var React = require('react');
var PropTypes = require('prop-types');
var index$3 = require('../MonacoContainer/index.js');
var index = require('../hooks/useMount/index.js');
var index$1 = require('../hooks/useUpdate/index.js');
var index$2 = require('../utils/index.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var loader__default = /*#__PURE__*/_interopDefaultLegacy(loader);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);

function DiffEditor({
  original,
  modified,
  language,
  originalLanguage,
  modifiedLanguage,

  /* === */
  originalModelPath,
  modifiedModelPath,
  keepCurrentOriginalModel,
  keepCurrentModifiedModel,
  theme,
  loading,
  options,

  /* === */
  height,
  width,
  className,
  wrapperProps,

  /* === */
  beforeMount,
  onMount
}) {
  const [isEditorReady, setIsEditorReady] = React.useState(false);
  const [isMonacoMounting, setIsMonacoMounting] = React.useState(true);
  const editorRef = React.useRef(null);
  const monacoRef = React.useRef(null);
  const containerRef = React.useRef(null);
  const onMountRef = React.useRef(onMount);
  const beforeMountRef = React.useRef(beforeMount);
  index['default'](() => {
    const cancelable = loader__default['default'].init();
    cancelable.then(monaco => (monacoRef.current = monaco) && setIsMonacoMounting(false)).catch(error => (error === null || error === void 0 ? void 0 : error.type) !== 'cancelation' && console.error('Monaco initialization: error:', error));
    return () => editorRef.current ? disposeEditor() : cancelable.cancel();
  });
  index$1['default'](() => {
    const modifiedEditor = editorRef.current.getModifiedEditor();

    if (modifiedEditor.getOption(monacoRef.current.editor.EditorOption.readOnly)) {
      modifiedEditor.setValue(modified);
    } else {
      if (modified !== modifiedEditor.getValue()) {
        modifiedEditor.executeEdits('', [{
          range: modifiedEditor.getModel().getFullModelRange(),
          text: modified,
          forceMoveMarkers: true
        }]);
        modifiedEditor.pushUndoStop();
      }
    }
  }, [modified], isEditorReady);
  index$1['default'](() => {
    editorRef.current.getModel().original.setValue(original);
  }, [original], isEditorReady);
  index$1['default'](() => {
    const {
      original,
      modified
    } = editorRef.current.getModel();
    monacoRef.current.editor.setModelLanguage(original, originalLanguage || language);
    monacoRef.current.editor.setModelLanguage(modified, modifiedLanguage || language);
  }, [language, originalLanguage, modifiedLanguage], isEditorReady);
  index$1['default'](() => {
    monacoRef.current.editor.setTheme(theme);
  }, [theme], isEditorReady);
  index$1['default'](() => {
    editorRef.current.updateOptions(options);
  }, [options], isEditorReady);
  const setModels = React.useCallback(() => {
    beforeMountRef.current(monacoRef.current);
    const originalModel = index$2.getOrCreateModel(monacoRef.current, original, originalLanguage || language, originalModelPath);
    const modifiedModel = index$2.getOrCreateModel(monacoRef.current, modified, modifiedLanguage || language, modifiedModelPath);
    editorRef.current.setModel({
      original: originalModel,
      modified: modifiedModel
    });
  }, [language, modified, modifiedLanguage, original, originalLanguage, originalModelPath, modifiedModelPath]);
  const createEditor = React.useCallback(() => {
    editorRef.current = monacoRef.current.editor.createDiffEditor(containerRef.current, {
      automaticLayout: true,
      ...options
    });
    setModels();
    monacoRef.current.editor.setTheme(theme);
    setIsEditorReady(true);
  }, [options, theme, setModels]);
  React.useEffect(() => {
    if (isEditorReady) {
      onMountRef.current(editorRef.current, monacoRef.current);
    }
  }, [isEditorReady]);
  React.useEffect(() => {
    !isMonacoMounting && !isEditorReady && createEditor();
  }, [isMonacoMounting, isEditorReady, createEditor]);

  function disposeEditor() {
    const models = editorRef.current.getModel();

    if (!keepCurrentOriginalModel) {
      var _models$original;

      (_models$original = models.original) === null || _models$original === void 0 ? void 0 : _models$original.dispose();
    }

    if (!keepCurrentModifiedModel) {
      var _models$modified;

      (_models$modified = models.modified) === null || _models$modified === void 0 ? void 0 : _models$modified.dispose();
    }

    editorRef.current.dispose();
  }

  return /*#__PURE__*/React__default['default'].createElement(index$3['default'], {
    width: width,
    height: height,
    isEditorReady: isEditorReady,
    loading: loading,
    _ref: containerRef,
    className: className,
    wrapperProps: wrapperProps
  });
}

DiffEditor.propTypes = {
  original: PropTypes__default['default'].string,
  modified: PropTypes__default['default'].string,
  language: PropTypes__default['default'].string,
  originalLanguage: PropTypes__default['default'].string,
  modifiedLanguage: PropTypes__default['default'].string,

  /* === */
  originalModelPath: PropTypes__default['default'].string,
  modifiedModelPath: PropTypes__default['default'].string,
  keepCurrentOriginalModel: PropTypes__default['default'].bool,
  keepCurrentModifiedModel: PropTypes__default['default'].bool,
  theme: PropTypes__default['default'].string,
  loading: PropTypes__default['default'].oneOfType([PropTypes__default['default'].element, PropTypes__default['default'].string]),
  options: PropTypes__default['default'].object,

  /* === */
  width: PropTypes__default['default'].oneOfType([PropTypes__default['default'].number, PropTypes__default['default'].string]),
  height: PropTypes__default['default'].oneOfType([PropTypes__default['default'].number, PropTypes__default['default'].string]),
  className: PropTypes__default['default'].string,
  wrapperProps: PropTypes__default['default'].object,

  /* === */
  beforeMount: PropTypes__default['default'].func,
  onMount: PropTypes__default['default'].func
};
DiffEditor.defaultProps = {
  theme: 'light',
  loading: 'Loading...',
  options: {},
  keepCurrentOriginalModel: false,
  keepCurrentModifiedModel: false,

  /* === */
  width: '100%',
  height: '100%',
  wrapperProps: {},

  /* === */
  beforeMount: index$2.noop,
  onMount: index$2.noop
};

exports.default = DiffEditor;

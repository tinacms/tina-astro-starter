'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var loader = require('@monaco-editor/loader');
var React = require('react');
var PropTypes = require('prop-types');
var index$4 = require('../MonacoContainer/index.js');
var index$1 = require('../hooks/useMount/index.js');
var index$2 = require('../hooks/useUpdate/index.js');
var index$3 = require('../utils/index.js');
var index = require('../hooks/usePrevious/index.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var loader__default = /*#__PURE__*/_interopDefaultLegacy(loader);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);

const viewStates = new Map();

function Editor({
  defaultValue,
  defaultLanguage,
  defaultPath,
  value,
  language,
  path,

  /* === */
  theme,
  line,
  loading,
  options,
  overrideServices,
  saveViewState,
  keepCurrentModel,

  /* === */
  width,
  height,
  className,
  wrapperProps,

  /* === */
  beforeMount,
  onMount,
  onChange,
  onValidate
}) {
  const [isEditorReady, setIsEditorReady] = React.useState(false);
  const [isMonacoMounting, setIsMonacoMounting] = React.useState(true);
  const monacoRef = React.useRef(null);
  const editorRef = React.useRef(null);
  const containerRef = React.useRef(null);
  const onMountRef = React.useRef(onMount);
  const beforeMountRef = React.useRef(beforeMount);
  const subscriptionRef = React.useRef(null);
  const valueRef = React.useRef(value);
  const previousPath = index['default'](path);
  index$1['default'](() => {
    const cancelable = loader__default['default'].init();
    cancelable.then(monaco => (monacoRef.current = monaco) && setIsMonacoMounting(false)).catch(error => (error === null || error === void 0 ? void 0 : error.type) !== 'cancelation' && console.error('Monaco initialization: error:', error));
    return () => editorRef.current ? disposeEditor() : cancelable.cancel();
  });
  index$2['default'](() => {
    const model = index$3.getOrCreateModel(monacoRef.current, defaultValue || value, defaultLanguage || language, path);

    if (model !== editorRef.current.getModel()) {
      saveViewState && viewStates.set(previousPath, editorRef.current.saveViewState());
      editorRef.current.setModel(model);
      saveViewState && editorRef.current.restoreViewState(viewStates.get(path));
    }
  }, [path], isEditorReady);
  index$2['default'](() => {
    editorRef.current.updateOptions(options);
  }, [options], isEditorReady);
  index$2['default'](() => {
    if (editorRef.current.getOption(monacoRef.current.editor.EditorOption.readOnly)) {
      editorRef.current.setValue(value);
    } else {
      if (value !== editorRef.current.getValue()) {
        editorRef.current.executeEdits('', [{
          range: editorRef.current.getModel().getFullModelRange(),
          text: value,
          forceMoveMarkers: true
        }]);
        editorRef.current.pushUndoStop();
      }
    }
  }, [value], isEditorReady);
  index$2['default'](() => {
    monacoRef.current.editor.setModelLanguage(editorRef.current.getModel(), language);
  }, [language], isEditorReady);
  index$2['default'](() => {
    // reason for undefined check: https://github.com/suren-atoyan/monaco-react/pull/188
    if (!index$3.isUndefined(line)) {
      editorRef.current.revealLine(line);
    }
  }, [line], isEditorReady);
  index$2['default'](() => {
    monacoRef.current.editor.setTheme(theme);
  }, [theme], isEditorReady);
  const createEditor = React.useCallback(() => {
    beforeMountRef.current(monacoRef.current);
    const autoCreatedModelPath = path || defaultPath;
    const defaultModel = index$3.getOrCreateModel(monacoRef.current, value || defaultValue, defaultLanguage || language, autoCreatedModelPath);
    editorRef.current = monacoRef.current.editor.create(containerRef.current, {
      model: defaultModel,
      automaticLayout: true,
      ...options
    }, overrideServices);
    saveViewState && editorRef.current.restoreViewState(viewStates.get(autoCreatedModelPath));
    monacoRef.current.editor.setTheme(theme);
    setIsEditorReady(true);
  }, [defaultValue, defaultLanguage, defaultPath, value, language, path, options, overrideServices, saveViewState, theme]);
  React.useEffect(() => {
    if (isEditorReady) {
      onMountRef.current(editorRef.current, monacoRef.current);
    }
  }, [isEditorReady]);
  React.useEffect(() => {
    !isMonacoMounting && !isEditorReady && createEditor();
  }, [isMonacoMounting, isEditorReady, createEditor]); // subscription
  // to avoid unnecessary updates (attach - dispose listener) in subscription

  valueRef.current = value;
  React.useEffect(() => {
    if (isEditorReady && onChange) {
      var _subscriptionRef$curr, _editorRef$current;

      (_subscriptionRef$curr = subscriptionRef.current) === null || _subscriptionRef$curr === void 0 ? void 0 : _subscriptionRef$curr.dispose();
      subscriptionRef.current = (_editorRef$current = editorRef.current) === null || _editorRef$current === void 0 ? void 0 : _editorRef$current.onDidChangeModelContent(event => {
        const editorValue = editorRef.current.getValue();

        if (valueRef.current !== editorValue) {
          onChange(editorValue, event);
        }
      });
    }
  }, [isEditorReady, onChange]); // onValidate

  React.useEffect(() => {
    if (isEditorReady) {
      const changeMarkersListener = monacoRef.current.editor.onDidChangeMarkers(uris => {
        var _editorRef$current$ge;

        const editorUri = (_editorRef$current$ge = editorRef.current.getModel()) === null || _editorRef$current$ge === void 0 ? void 0 : _editorRef$current$ge.uri;

        if (editorUri) {
          const currentEditorHasMarkerChanges = uris.find(uri => uri.path === editorUri.path);

          if (currentEditorHasMarkerChanges) {
            const markers = monacoRef.current.editor.getModelMarkers({
              resource: editorUri
            });
            onValidate === null || onValidate === void 0 ? void 0 : onValidate(markers);
          }
        }
      });
      return () => {
        changeMarkersListener === null || changeMarkersListener === void 0 ? void 0 : changeMarkersListener.dispose();
      };
    }
  }, [isEditorReady, onValidate]);

  function disposeEditor() {
    var _subscriptionRef$curr2;

    (_subscriptionRef$curr2 = subscriptionRef.current) === null || _subscriptionRef$curr2 === void 0 ? void 0 : _subscriptionRef$curr2.dispose();

    if (keepCurrentModel) {
      saveViewState && viewStates.set(path, editorRef.current.saveViewState());
    } else {
      var _editorRef$current$ge2;

      (_editorRef$current$ge2 = editorRef.current.getModel()) === null || _editorRef$current$ge2 === void 0 ? void 0 : _editorRef$current$ge2.dispose();
    }

    editorRef.current.dispose();
  }

  return /*#__PURE__*/React__default['default'].createElement(index$4['default'], {
    width: width,
    height: height,
    isEditorReady: isEditorReady,
    loading: loading,
    _ref: containerRef,
    className: className,
    wrapperProps: wrapperProps
  });
}

Editor.propTypes = {
  defaultValue: PropTypes__default['default'].string,
  defaultPath: PropTypes__default['default'].string,
  defaultLanguage: PropTypes__default['default'].string,
  value: PropTypes__default['default'].string,
  language: PropTypes__default['default'].string,
  path: PropTypes__default['default'].string,

  /* === */
  theme: PropTypes__default['default'].string,
  line: PropTypes__default['default'].number,
  loading: PropTypes__default['default'].oneOfType([PropTypes__default['default'].element, PropTypes__default['default'].string]),
  options: PropTypes__default['default'].object,
  overrideServices: PropTypes__default['default'].object,
  saveViewState: PropTypes__default['default'].bool,
  keepCurrentModel: PropTypes__default['default'].bool,

  /* === */
  width: PropTypes__default['default'].oneOfType([PropTypes__default['default'].number, PropTypes__default['default'].string]),
  height: PropTypes__default['default'].oneOfType([PropTypes__default['default'].number, PropTypes__default['default'].string]),
  className: PropTypes__default['default'].string,
  wrapperProps: PropTypes__default['default'].object,

  /* === */
  beforeMount: PropTypes__default['default'].func,
  onMount: PropTypes__default['default'].func,
  onChange: PropTypes__default['default'].func,
  onValidate: PropTypes__default['default'].func
};
Editor.defaultProps = {
  theme: 'light',
  loading: 'Loading...',
  options: {},
  overrideServices: {},
  saveViewState: true,
  keepCurrentModel: false,

  /* === */
  width: '100%',
  height: '100%',
  wrapperProps: {},

  /* === */
  beforeMount: index$3.noop,
  onMount: index$3.noop,
  onValidate: index$3.noop
};

exports.default = Editor;

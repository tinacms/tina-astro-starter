(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@monaco-editor/loader'), require('react'), require('prop-types')) :
  typeof define === 'function' && define.amd ? define(['exports', '@monaco-editor/loader', 'react', 'prop-types'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.monaco_react = {}, global.monaco_loader, global.React, global.PropTypes));
}(this, (function (exports, loader, React, PropTypes) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var loader__default = /*#__PURE__*/_interopDefaultLegacy(loader);
  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);

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
    return /*#__PURE__*/React__default['default'].createElement("div", {
      style: loadingStyles
    }, content);
  }

  const styles = {
    wrapper: {
      display: 'flex',
      position: 'relative',
      textAlign: 'initial'
    },
    fullWidth: {
      width: '100%'
    },
    hide: {
      display: 'none'
    }
  };

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
    return /*#__PURE__*/React__default['default'].createElement("section", _extends({
      style: { ...styles.wrapper,
        width,
        height
      }
    }, wrapperProps), !isEditorReady && /*#__PURE__*/React__default['default'].createElement(Loading, {
      content: loading
    }), /*#__PURE__*/React__default['default'].createElement("div", {
      ref: _ref,
      style: { ...styles.fullWidth,
        ...(!isEditorReady && styles.hide)
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

  var MonacoContainer$1 = /*#__PURE__*/React.memo(MonacoContainer);

  function useMount(effect) {
    React.useEffect(effect, []);
  }

  function useUpdate(effect, deps, applyChanges = true) {
    const isInitialMount = React.useRef(true);
    React.useEffect(isInitialMount.current || !applyChanges ? () => {
      isInitialMount.current = false;
    } : effect, deps);
  }

  function noop() {}

  function getOrCreateModel(monaco, value, language, path) {
    return getModel(monaco, path) || createModel(monaco, value, language, path);
  }

  function getModel(monaco, path) {
    return monaco.editor.getModel(createModelUri(monaco, path));
  }

  function createModel(monaco, value, language, path) {
    return monaco.editor.createModel(value, language, path && createModelUri(monaco, path));
  }

  function createModelUri(monaco, path) {
    return monaco.Uri.parse(path);
  }

  function isUndefined(input) {
    return input === undefined;
  }

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
    useMount(() => {
      const cancelable = loader__default['default'].init();
      cancelable.then(monaco => (monacoRef.current = monaco) && setIsMonacoMounting(false)).catch(error => (error === null || error === void 0 ? void 0 : error.type) !== 'cancelation' && console.error('Monaco initialization: error:', error));
      return () => editorRef.current ? disposeEditor() : cancelable.cancel();
    });
    useUpdate(() => {
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
    useUpdate(() => {
      editorRef.current.getModel().original.setValue(original);
    }, [original], isEditorReady);
    useUpdate(() => {
      const {
        original,
        modified
      } = editorRef.current.getModel();
      monacoRef.current.editor.setModelLanguage(original, originalLanguage || language);
      monacoRef.current.editor.setModelLanguage(modified, modifiedLanguage || language);
    }, [language, originalLanguage, modifiedLanguage], isEditorReady);
    useUpdate(() => {
      monacoRef.current.editor.setTheme(theme);
    }, [theme], isEditorReady);
    useUpdate(() => {
      editorRef.current.updateOptions(options);
    }, [options], isEditorReady);
    const setModels = React.useCallback(() => {
      beforeMountRef.current(monacoRef.current);
      const originalModel = getOrCreateModel(monacoRef.current, original, originalLanguage || language, originalModelPath);
      const modifiedModel = getOrCreateModel(monacoRef.current, modified, modifiedLanguage || language, modifiedModelPath);
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

    return /*#__PURE__*/React__default['default'].createElement(MonacoContainer$1, {
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
    beforeMount: noop,
    onMount: noop
  };

  var index = /*#__PURE__*/React.memo(DiffEditor);

  function useMonaco() {
    const [monaco, setMonaco] = React.useState(loader__default['default'].__getMonacoInstance());
    useMount(() => {
      let cancelable;

      if (!monaco) {
        cancelable = loader__default['default'].init();
        cancelable.then(monaco => {
          setMonaco(monaco);
        });
      }

      return () => {
        var _cancelable;

        return (_cancelable = cancelable) === null || _cancelable === void 0 ? void 0 : _cancelable.cancel();
      };
    });
    return monaco;
  }

  function usePrevious(value) {
    const ref = React.useRef();
    React.useEffect(() => {
      ref.current = value;
    }, [value]);
    return ref.current;
  }

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
    const previousPath = usePrevious(path);
    useMount(() => {
      const cancelable = loader__default['default'].init();
      cancelable.then(monaco => (monacoRef.current = monaco) && setIsMonacoMounting(false)).catch(error => (error === null || error === void 0 ? void 0 : error.type) !== 'cancelation' && console.error('Monaco initialization: error:', error));
      return () => editorRef.current ? disposeEditor() : cancelable.cancel();
    });
    useUpdate(() => {
      const model = getOrCreateModel(monacoRef.current, defaultValue || value, defaultLanguage || language, path);

      if (model !== editorRef.current.getModel()) {
        saveViewState && viewStates.set(previousPath, editorRef.current.saveViewState());
        editorRef.current.setModel(model);
        saveViewState && editorRef.current.restoreViewState(viewStates.get(path));
      }
    }, [path], isEditorReady);
    useUpdate(() => {
      editorRef.current.updateOptions(options);
    }, [options], isEditorReady);
    useUpdate(() => {
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
    useUpdate(() => {
      monacoRef.current.editor.setModelLanguage(editorRef.current.getModel(), language);
    }, [language], isEditorReady);
    useUpdate(() => {
      // reason for undefined check: https://github.com/suren-atoyan/monaco-react/pull/188
      if (!isUndefined(line)) {
        editorRef.current.revealLine(line);
      }
    }, [line], isEditorReady);
    useUpdate(() => {
      monacoRef.current.editor.setTheme(theme);
    }, [theme], isEditorReady);
    const createEditor = React.useCallback(() => {
      beforeMountRef.current(monacoRef.current);
      const autoCreatedModelPath = path || defaultPath;
      const defaultModel = getOrCreateModel(monacoRef.current, value || defaultValue, defaultLanguage || language, autoCreatedModelPath);
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

    return /*#__PURE__*/React__default['default'].createElement(MonacoContainer$1, {
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
    beforeMount: noop,
    onMount: noop,
    onValidate: noop
  };

  var index$1 = /*#__PURE__*/React.memo(Editor);

  Object.defineProperty(exports, 'loader', {
    enumerable: true,
    get: function () {
      return loader__default['default'];
    }
  });
  exports.DiffEditor = index;
  exports.default = index$1;
  exports.useMonaco = useMonaco;

  Object.defineProperty(exports, '__esModule', { value: true });

})));

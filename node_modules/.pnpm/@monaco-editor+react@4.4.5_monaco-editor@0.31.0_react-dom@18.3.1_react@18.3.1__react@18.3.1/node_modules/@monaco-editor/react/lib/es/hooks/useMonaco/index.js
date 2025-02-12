import loader from '@monaco-editor/loader';
import { useState } from 'react';
import useMount from '../useMount/index.js';

function useMonaco() {
  const [monaco, setMonaco] = useState(loader.__getMonacoInstance());
  useMount(() => {
    let cancelable;

    if (!monaco) {
      cancelable = loader.init();
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

export default useMonaco;

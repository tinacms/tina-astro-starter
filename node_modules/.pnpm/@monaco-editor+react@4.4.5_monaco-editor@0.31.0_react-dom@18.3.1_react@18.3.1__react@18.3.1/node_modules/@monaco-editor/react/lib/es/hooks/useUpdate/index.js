import { useRef, useEffect } from 'react';

function useUpdate(effect, deps, applyChanges = true) {
  const isInitialMount = useRef(true);
  useEffect(isInitialMount.current || !applyChanges ? () => {
    isInitialMount.current = false;
  } : effect, deps);
}

export default useUpdate;

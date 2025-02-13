import React from 'react';
import { dequal } from 'dequal';
export function useDeepCompareMemoize(dependencies) {
  const dependenciesRef = React.useRef(dependencies);
  const signalRef = React.useRef(0);

  if (!dequal(dependencies, dependenciesRef.current)) {
    dependenciesRef.current = dependencies;
    signalRef.current += 1;
  }

  return React.useMemo(() => dependenciesRef.current, [signalRef.current]);
}
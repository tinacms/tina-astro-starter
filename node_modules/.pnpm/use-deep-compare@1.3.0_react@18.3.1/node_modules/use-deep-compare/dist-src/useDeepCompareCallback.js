import React from 'react';
import { useDeepCompareMemoize } from "./useDeepCompareMemoize.js";
/**
 * `useDeepCompareCallback` will return a memoized version of the callback that
 * only changes if one of the `dependencies` has changed.
 *
 * Warning: `useDeepCompareCallback` should not be used with dependencies that
 * are all primitive values. Use `React.useCallback` instead.
 *
 * @see {@link https://react.dev/reference/react/useCallback}
 */

export function useDeepCompareCallback(callback, dependencies) {
  return React.useCallback(callback, useDeepCompareMemoize(dependencies));
}
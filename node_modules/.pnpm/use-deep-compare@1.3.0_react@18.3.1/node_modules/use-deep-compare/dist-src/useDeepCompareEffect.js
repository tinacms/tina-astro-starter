import React from 'react';
import { useDeepCompareMemoize } from "./useDeepCompareMemoize.js";
/**
 * Accepts a function that contains imperative, possibly effectful code.
 *
 * Warning: `useDeepCompareEffect` should not be used with dependencies that
 * are all primitive values. Use `React.useEffect` instead.
 *
 * @see {@link https://react.dev/reference/react/useEffect}
 */

export function useDeepCompareEffect(effect, dependencies) {
  React.useEffect(effect, useDeepCompareMemoize(dependencies));
}
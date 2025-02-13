import React from 'react';
import { dequal } from 'dequal';

function useDeepCompareMemoize(dependencies) {
  const dependenciesRef = React.useRef(dependencies);
  const signalRef = React.useRef(0);

  if (!dequal(dependencies, dependenciesRef.current)) {
    dependenciesRef.current = dependencies;
    signalRef.current += 1;
  }

  return React.useMemo(() => dependenciesRef.current, [signalRef.current]);
}

/**
 * `useDeepCompareCallback` will return a memoized version of the callback that
 * only changes if one of the `dependencies` has changed.
 *
 * Warning: `useDeepCompareCallback` should not be used with dependencies that
 * are all primitive values. Use `React.useCallback` instead.
 *
 * @see {@link https://react.dev/reference/react/useCallback}
 */

function useDeepCompareCallback(callback, dependencies) {
  return React.useCallback(callback, useDeepCompareMemoize(dependencies));
}

/**
 * Accepts a function that contains imperative, possibly effectful code.
 *
 * Warning: `useDeepCompareEffect` should not be used with dependencies that
 * are all primitive values. Use `React.useEffect` instead.
 *
 * @see {@link https://react.dev/reference/react/useEffect}
 */

function useDeepCompareEffect(effect, dependencies) {
  React.useEffect(effect, useDeepCompareMemoize(dependencies));
}

/**
 * `useDeepCompareImperativeHandle` customizes the instance value that is exposed to parent components when using `ref`.
 * As always, imperative code using refs should be avoided in most cases.
 *
 * `useDeepCompareImperativeHandle` should be used with `React.forwardRef`.
 *
 * It's similar to `useImperativeHandle`, but uses deep comparison on the dependencies.
 *
 * Warning: `useDeepCompareImperativeHandle` should not be used with dependencies that
 * are all primitive values. Use `React.useImperativeHandle` instead.
 *
 * @see {@link https://react.dev/reference/react/useImperativeHandle}
 */

function useDeepCompareImperativeHandle(ref, init, dependencies) {
  React.useImperativeHandle(ref, init, useDeepCompareMemoize(dependencies));
}

/**
 * The signature is identical to `useDeepCompareEffect`, but it fires synchronously after all DOM mutations.
 * Use this to read layout from the DOM and synchronously re-render. Updates scheduled inside
 * `useDeepCompareLayoutEffect` will be flushed synchronously, before the browser has a chance to paint.
 *
 * Prefer the standard `useDeepCompareEffect` when possible to avoid blocking visual updates.
 *
 * If you’re migrating code from a class component, `useDeepCompareLayoutEffect` fires in the same phase as
 * `componentDidMount` and `componentDidUpdate`.
 *
 * Warning: `useDeepCompareLayoutEffect` should not be used with dependencies that
 * are all primitive values. Use `React.useLayoutEffect` instead.
 *
 * @see {@link https://react.dev/reference/react/useLayoutEffect}
 */

function useDeepCompareLayoutEffect(effect, dependencies) {
  React.useLayoutEffect(effect, useDeepCompareMemoize(dependencies));
}

/**
 * `useDeepCompareMemo` will only recompute the memoized value when one of the
 * `dependencies` has changed.
 *
 * Warning: `useDeepCompareMemo` should not be used with dependencies that
 * are all primitive values. Use `React.useMemo` instead.
 *
 * @see {@link https://react.dev/reference/react/useMemo}
 */

function useDeepCompareMemo(factory, dependencies) {
  return React.useMemo(factory, useDeepCompareMemoize(dependencies));
}

export { useDeepCompareCallback, useDeepCompareEffect, useDeepCompareImperativeHandle, useDeepCompareLayoutEffect, useDeepCompareMemo };
//# sourceMappingURL=index.js.map

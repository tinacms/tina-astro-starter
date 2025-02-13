import React from 'react';
/**
 * `useDeepCompareMemo` will only recompute the memoized value when one of the
 * `dependencies` has changed.
 *
 * Warning: `useDeepCompareMemo` should not be used with dependencies that
 * are all primitive values. Use `React.useMemo` instead.
 *
 * @see {@link https://react.dev/reference/react/useMemo}
 */
export declare function useDeepCompareMemo<T>(factory: () => T, dependencies: React.DependencyList): T;

import React from 'react';
/**
 * Accepts a function that contains imperative, possibly effectful code.
 *
 * Warning: `useDeepCompareEffect` should not be used with dependencies that
 * are all primitive values. Use `React.useEffect` instead.
 *
 * @see {@link https://react.dev/reference/react/useEffect}
 */
export declare function useDeepCompareEffect(effect: React.EffectCallback, dependencies: React.DependencyList): void;

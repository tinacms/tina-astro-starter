import { Plugin } from '../core';
import * as React from 'react';
/**
 * A Higher-Order-Component for adding Plugins to the CMS.
 *
 * @param Component A React Component
 * @param plugin Plugin
 * @alias withPlugin
 */
export declare function withPlugins(Component: any, plugins: Plugin | Plugin[]): (props: any) => React.JSX.Element;
/**
 * A Higher-Order-Component for adding Plugins to the CMS.
 *
 * @param Component A React Component
 * @param plugin Plugin
 * @alias withPlugins
 */
export declare const withPlugin: typeof withPlugins;

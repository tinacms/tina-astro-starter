/**

*/
/**
 * PLEASE READ THIS:
 *
 * This plugin is directly copied from https://github.com/dotansimha/graphql-code-generator/tree/master/packages/plugins/typescript/generic-sdk
 *
 * The reason this was needed is because we had to modified the return type of the SDK client. We need to return {data, variables, query}. While the other one just returned the data.
 *
 * This is the same as the above link and may need to be updated time to time. (for example if we want to support GQL v16). There is only one line that differs from the original. (This is shown)
 */
import type { PluginFunction, PluginValidateFn } from '@graphql-codegen/plugin-helpers';
import { RawGenericSdkPluginConfig } from './config';
import { GenericSdkVisitor } from './visitor';
export declare const plugin: PluginFunction<RawGenericSdkPluginConfig>;
export declare const validate: PluginValidateFn<any>;
export { GenericSdkVisitor };

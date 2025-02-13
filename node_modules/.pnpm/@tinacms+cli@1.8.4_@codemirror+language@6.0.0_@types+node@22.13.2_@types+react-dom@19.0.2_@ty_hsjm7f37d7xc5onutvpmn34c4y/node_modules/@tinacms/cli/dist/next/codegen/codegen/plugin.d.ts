/**

*/
import type { PluginFunction } from '@graphql-codegen/plugin-helpers';
export declare const AddGeneratedClientFunc: (apiURL: string) => PluginFunction;
export declare const AddGeneratedClient: (apiURL: string) => {
    plugin: PluginFunction;
};

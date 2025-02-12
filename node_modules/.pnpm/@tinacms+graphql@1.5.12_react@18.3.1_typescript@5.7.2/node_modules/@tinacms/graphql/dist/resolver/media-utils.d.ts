/**

*/
import type { GraphQLConfig } from '../types';
import type { Schema } from '@tinacms/schema-tools';
/**
 * Strips away the Tina Cloud Asset URL from an `image` value
 *
 * @param {string | string[]} value
 * @param {GraphQLConfig} config
 * @returns {string}
 */
export declare const resolveMediaCloudToRelative: (value: string | string[], config: GraphQLConfig, schema: Schema<true>) => string | string[];
/**
 * Adds Tina Cloud Asset URL to an `image` value
 *
 * @param {string | string[]} value
 * @param {GraphQLConfig} config
 * @returns {string}
 */
export declare const resolveMediaRelativeToCloud: (value: string | string[], config: GraphQLConfig, schema: Schema<true>) => string | string[];

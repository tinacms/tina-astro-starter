/**

*/
import { GraphQLSchema } from 'graphql';
export declare const generateTypes: (schema: GraphQLSchema, queryPathGlob: string, fragDocPath: string, apiURL: string) => Promise<string>;

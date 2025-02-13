import { ASTNode, GraphQLError, GraphQLErrorExtensions, Source } from 'graphql';
export declare class NotFoundError extends GraphQLError {
    constructor(message: string, nodes?: ASTNode | readonly ASTNode[], source?: Source, positions?: readonly number[], path?: readonly (string | number)[], originalError?: Error, extensions?: GraphQLErrorExtensions);
}

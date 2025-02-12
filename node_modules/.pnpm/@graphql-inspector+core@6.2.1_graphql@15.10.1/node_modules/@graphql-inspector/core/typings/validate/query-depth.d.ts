import { DepGraph } from 'dependency-graph';
import { ASTNode, DocumentNode, FieldNode, FragmentDefinitionNode, FragmentSpreadNode, GraphQLError, InlineFragmentNode, OperationDefinitionNode, Source } from 'graphql';
export declare function validateQueryDepth({ source, doc, maxDepth, fragmentGraph, }: {
    source: Source;
    doc: DocumentNode;
    maxDepth: number;
    fragmentGraph: DepGraph<FragmentDefinitionNode>;
}): GraphQLError | void;
export declare function calculateDepth({ node, currentDepth, maxDepth, getFragment, }: {
    node: ASTNode;
    currentDepth: number;
    maxDepth?: number;
    getFragment: (fragmentName: string) => FragmentDefinitionNode;
}): number | never;
export declare function countDepth(node: FieldNode | FragmentDefinitionNode | InlineFragmentNode | OperationDefinitionNode | FragmentSpreadNode, parentDepth: number, getFragmentReference: (name: string) => FragmentDefinitionNode | undefined): number;

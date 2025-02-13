/**

*/
import { LookupMapType } from '../database';
import type { ObjectTypeDefinitionNode, InlineFragmentNode, FieldDefinitionNode } from 'graphql';
import type { Collection, Template } from '@tinacms/schema-tools';
import { TinaSchema } from '@tinacms/schema-tools';
export declare const createBuilder: ({ tinaSchema, }: {
    tinaSchema: TinaSchema;
}) => Promise<Builder>;
/**
 * The builder class is responsible for creating GraphQL AST definitions
 * for a given portion of the Tina schema. In some cases that will also mean
 * storing a reference to how we can resolve that type when we come across it.
 */
export declare class Builder {
    config: {
        tinaSchema: TinaSchema;
    };
    private maxDepth;
    tinaSchema: TinaSchema;
    lookupMap: Record<string, LookupMapType>;
    constructor(config: {
        tinaSchema: TinaSchema;
    });
    private addToLookupMap;
    /**
     * ```graphql
     * # ex.
     * {
     *   getCollection(collection: $collection) {
     *     name
     *     documents {...}
     *   }
     * }
     * ```
     *
     * @param collections
     */
    buildCollectionDefinition: (collections: Collection<true>[]) => Promise<FieldDefinitionNode>;
    /**
     * ```graphql
     * # ex.
     * {
     *   getCollections {
     *     name
     *     documents {...}
     *   }
     * }
     * ```
     *
     * @param collections
     */
    buildMultiCollectionDefinition: (collections: Collection<true>[]) => Promise<FieldDefinitionNode>;
    /**
     * ```graphql
     * # ex.
     * {
     *   node(id: $id) {
     *     id
     *     data {...}
     *   }
     * }
     * ```
     */
    multiNodeDocument: () => Promise<FieldDefinitionNode>;
    /**
     * ```graphql
     * # ex.
     * {
     *   getDocument(collection: $collection, relativePath: $relativePath) {
     *     id
     *     data {...}
     *   }
     * }
     * ```
     *
     * @param collections
     */
    multiCollectionDocument: (collections: Collection<true>[]) => Promise<FieldDefinitionNode>;
    /**
     * ```graphql
     * # ex.
     * {
     *   addPendingDocument(collection: $collection, relativePath: $relativePath, params: $params) {
     *     id
     *     data {...}
     *   }
     * }
     * ```
     *
     * @param collections
     */
    addMultiCollectionDocumentMutation: () => Promise<FieldDefinitionNode>;
    /**
     * ```graphql
     * # ex.
     * {
     *   createDocument(relativePath: $relativePath, params: $params) {
     *     id
     *     data {...}
     *   }
     * }
     * ```
     *
     * @param collections
     */
    buildCreateCollectionDocumentMutation: (collections: Collection<true>[]) => Promise<FieldDefinitionNode>;
    /**
     * ```graphql
     * # ex.
     * {
     *   updateDocument(relativePath: $relativePath, params: $params) {
     *     id
     *     data {...}
     *   }
     * }
     * ```
     *
     * @param collections
     */
    buildUpdateCollectionDocumentMutation: (collections: Collection<true>[]) => Promise<FieldDefinitionNode>;
    /**
     * ```graphql
     * # ex.
     * {
     *   deleteDocument(relativePath: $relativePath, params: $params) {
     *     id
     *     data {...}
     *   }
     * }
     * ```
     *
     * @param collections
     */
    buildDeleteCollectionDocumentMutation: (collections: Collection<true>[]) => Promise<FieldDefinitionNode>;
    /**
     * ```graphql
     * # ex.
     * {
     *   createFolder(folderName: $folderName, params: $params) {
     *     id
     *     data {...}
     *   }
     * }
     * ```
     *
     * @param collections
     */
    buildCreateCollectionFolderMutation: () => Promise<FieldDefinitionNode>;
    /**
     * ```graphql
     * # ex.
     * {
     *   getPostDocument(relativePath: $relativePath) {
     *     id
     *     data {...}
     *   }
     * }
     * ```
     *
     * @param collection
     */
    collectionDocument: (collection: Collection<true>) => Promise<FieldDefinitionNode>;
    authenticationCollectionDocument: (collection: Collection<true>) => Promise<FieldDefinitionNode>;
    updatePasswordMutation: (collection: Collection<true>) => Promise<FieldDefinitionNode>;
    authorizationCollectionDocument: (collection: Collection<true>) => Promise<FieldDefinitionNode>;
    /**
     * Turns a collection into a fragment that gets updated on build. This fragment does not resolve references
     * ```graphql
     * # ex.
     * fragment AuthorsParts on Authors {
     *   name
     *   avatar
     *   ...
     * }
     * ```
     *
     * @public
     * @param collection a Tina Cloud collection
     */
    collectionFragment: (collection: Collection<true>) => Promise<import("graphql").FragmentDefinitionNode>;
    /**
     * Given a collection this function returns its selections set. For example for Post this would return
     *
     * "
     * body
     * title
     * ... on Author {
     *   name
     *   heroImg
     * }
     *
     * But in the AST format
     *
     * */
    private _getCollectionFragmentSelections;
    private _buildFieldNodeForFragments;
    buildTemplateFragments(template: Template<true>, depth: number): Promise<InlineFragmentNode | boolean>;
    /**
     * ```graphql
     * # ex.
     * mutation {
     *   updatePostDocument(relativePath: $relativePath, params: $params) {
     *     id
     *     data {...}
     *   }
     * }
     * ```
     *
     * @param collection
     */
    updateCollectionDocumentMutation: (collection: Collection<true>) => Promise<FieldDefinitionNode>;
    /**
     * ```graphql
     * # ex.
     * mutation {
     *   createPostDocument(relativePath: $relativePath, params: $params) {
     *     id
     *     data {...}
     *   }
     * }
     * ```
     *
     * @param collection
     */
    createCollectionDocumentMutation: (collection: Collection<true>) => Promise<FieldDefinitionNode>;
    /**
     * ```graphql
     * # ex.
     * {
     *   getPostList(first: 10) {
     *     edges {
     *       node {
     *         id
     *       }
     *     }
     *   }
     * }
     * ```
     *
     * @param collection
     */
    collectionDocumentList: (collection: Collection<true>) => Promise<FieldDefinitionNode>;
    /**
     * GraphQL type definitions which remain unchanged regardless
     * of the supplied Tina schema. Ex. "node" interface
     */
    buildStaticDefinitions: () => (import("graphql").ScalarTypeDefinitionNode | ObjectTypeDefinitionNode | import("graphql").InterfaceTypeDefinitionNode[])[];
    private _buildCollectionDocumentType;
    private _buildAuthDocumentType;
    private _filterCollectionDocumentType;
    private _buildTemplateFilter;
    private _updateCollectionDocumentMutationType;
    private _buildTemplateMutation;
    private _buildMultiCollectionDocumentDefinition;
    private _buildMultiCollectionDocumentListDefinition;
    private _buildFieldFilter;
    private _buildFieldMutation;
    private _buildReferenceMutation;
    private _buildPasswordMutation;
    private _buildUpdateDocumentMutationParams;
    private _buildObjectOrUnionData;
    private _connectionFilterBuilder;
    private _connectionFieldBuilder;
    private _buildDataField;
    private _buildTemplateData;
}

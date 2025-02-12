/**

*/
import { type DocumentNode, type FieldNode, type GraphQLField, type GraphQLSchema } from 'graphql';
/**
 *
 * Given a valid GraphQL query,the `formify` will populate the query
 * with additional information needed by Tina on the frontend so we're able
 * to render a Tina form.
 *
 *  ```graphql
 *    query getPostsDocument($relativePath: String!) {
 *      getPostsDocument(relativePath: $relativePath) {
 *        data {
 *          ... on Post_Doc_Data {
 *            title
 *          }
 *        }
 *      }
 *    }
 *  ```
 *  Would become:
 *  ```graphql
 *  query getPostsDocument($relativePath: String!) {
 *    getPostsDocument(relativePath: $relativePath) {
 *      data {
 *        ... on Post_Doc_Data {
 *          title
 *        }
 *      }
 *      form {
 *        __typename
 *        ... on Post_Doc_Form {
 *          label
 *          name
 *          fields {
 *            # ...
 *          }
 *        }
 *      }
 *      values {
 *        __typename
 *        ... on Post_Doc_Values {
 *          title
 *          author
 *          image
 *          hashtags
 *          _body
 *          _template
 *        }
 *      }
 *      sys {
 *        filename
 *        basename
 *        breadcrumbs
 *        path
 *        relativePath
 *        extension
 *      }
 *    }
 *  }
 * ```
 */
export declare const formify: (query: DocumentNode, schema: GraphQLSchema) => DocumentNode;
export declare const buildSelectionsFields: (fields: GraphQLField<any, any>[], callback?: (fields: GraphQLField<any, any>[]) => {
    continue: boolean;
    filteredFields: GraphQLField<any, any>[];
}) => FieldNode[];

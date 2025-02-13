"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformDocumentWithApollo = transformDocumentWithApollo;
exports.transformSchemaWithApollo = transformSchemaWithApollo;
const graphql_1 = require("graphql");
const graphql_js_1 = require("./graphql.js");
function transformDocumentWithApollo(doc, { keepClientFields }) {
    return (0, graphql_1.visit)(doc, {
        Field(node) {
            return keepClientFields
                ? (0, graphql_js_1.removeDirectives)(node, ['client'])
                : (0, graphql_js_1.removeFieldIfDirectives)(node, ['client']);
        },
    });
}
function transformSchemaWithApollo(schema) {
    return (0, graphql_1.extendSchema)(schema, (0, graphql_1.parse)(/* GraphQL */ `
      directive @connection(key: String!, filter: [String]) on FIELD
    `));
}

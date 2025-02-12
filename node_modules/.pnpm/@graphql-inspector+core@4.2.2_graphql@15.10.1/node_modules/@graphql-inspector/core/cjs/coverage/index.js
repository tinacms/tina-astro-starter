"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coverage = void 0;
const graphql_1 = require("graphql");
const document_js_1 = require("../ast/document.js");
const graphql_js_1 = require("../utils/graphql.js");
function coverage(schema, sources) {
    const coverage = {
        sources,
        types: {},
        stats: {
            numTypes: 0,
            numTypesCoveredFully: 0,
            numTypesCovered: 0,
            numFields: 0,
            numFiledsCovered: 0,
            numQueries: 0,
            numMutations: 0,
            numSubscriptions: 0,
        },
    };
    const typeMap = schema.getTypeMap();
    const typeInfo = new graphql_1.TypeInfo(schema);
    const visitor = source => ({
        Field(node) {
            const fieldDef = typeInfo.getFieldDef();
            const parent = typeInfo.getParentType();
            if ((parent === null || parent === void 0 ? void 0 : parent.name) &&
                !(0, graphql_js_1.isForIntrospection)(parent.name) &&
                (fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.name) &&
                fieldDef.name !== '__typename' &&
                fieldDef.name !== '__schema') {
                const sourceName = source.name;
                const typeCoverage = coverage.types[parent.name];
                const fieldCoverage = typeCoverage.children[fieldDef.name];
                const locations = fieldCoverage.locations[sourceName];
                typeCoverage.hits++;
                fieldCoverage.hits++;
                if (node.loc) {
                    fieldCoverage.locations[sourceName] = [node.loc, ...(locations || [])];
                }
                if (node.arguments) {
                    for (const argNode of node.arguments) {
                        const argCoverage = fieldCoverage.children[argNode.name.value];
                        argCoverage.hits++;
                        if (argNode.loc) {
                            argCoverage.locations[sourceName] = [
                                argNode.loc,
                                ...(argCoverage.locations[sourceName] || []),
                            ];
                        }
                    }
                }
            }
        },
    });
    for (const typename in typeMap) {
        if (!(0, graphql_js_1.isForIntrospection)(typename) && !(0, graphql_js_1.isPrimitive)(typename)) {
            const type = typeMap[typename];
            if ((0, graphql_1.isObjectType)(type) || (0, graphql_1.isInterfaceType)(type)) {
                const typeCoverage = {
                    hits: 0,
                    fieldsCount: 0,
                    fieldsCountCovered: 0,
                    type,
                    children: {},
                };
                if ((0, graphql_1.isObjectType)(type) || (0, graphql_1.isInterfaceType)(type)) {
                    switch (type.name) {
                        case 'Query':
                            coverage.stats.numQueries++;
                            break;
                        case 'Mutation':
                            coverage.stats.numMutations++;
                            break;
                        case 'Subscription':
                            coverage.stats.numSubscriptions++;
                            break;
                    }
                }
                const fieldMap = type.getFields();
                for (const fieldname in fieldMap) {
                    const field = fieldMap[fieldname];
                    typeCoverage.children[field.name] = {
                        hits: 0,
                        fieldsCount: 0,
                        fieldsCountCovered: 0,
                        locations: {},
                        children: {},
                    };
                    for (const arg of field.args) {
                        typeCoverage.children[field.name].children[arg.name] = {
                            hits: 0,
                            fieldsCount: 0,
                            fieldsCountCovered: 0,
                            locations: {},
                        };
                    }
                }
                coverage.types[type.name] = typeCoverage;
            }
        }
    }
    const documents = coverage.sources.map(document_js_1.readDocument);
    for (const [i, doc] of documents.entries()) {
        const source = coverage.sources[i];
        for (const op of doc.operations) {
            (0, graphql_1.visit)(op.node, (0, graphql_1.visitWithTypeInfo)(typeInfo, visitor(source)));
        }
        for (const fr of doc.fragments) {
            (0, graphql_1.visit)(fr.node, (0, graphql_1.visitWithTypeInfo)(typeInfo, visitor(source)));
        }
    }
    for (const key in coverage.types) {
        const me = coverage.types[key];
        processStats(me);
        coverage.stats.numTypes++;
        if (me.fieldsCountCovered > 0)
            coverage.stats.numTypesCovered++;
        if (me.fieldsCount === me.fieldsCountCovered)
            coverage.stats.numTypesCoveredFully++;
        coverage.stats.numFields += me.fieldsCount;
        coverage.stats.numFiledsCovered += me.fieldsCountCovered;
    }
    return coverage;
}
exports.coverage = coverage;
function processStats(me) {
    const children = me.children;
    if (children) {
        for (const k in children) {
            const ch = children[k];
            if (ch.children !== undefined) {
                processStats(ch);
                me.fieldsCount += ch.fieldsCount;
                me.fieldsCountCovered += ch.fieldsCountCovered;
            }
            me.fieldsCount++;
            if (ch.hits > 0) {
                me.fieldsCountCovered++;
            }
        }
    }
}

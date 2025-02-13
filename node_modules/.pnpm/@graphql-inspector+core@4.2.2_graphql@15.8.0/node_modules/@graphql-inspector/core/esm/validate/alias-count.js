import { GraphQLError, Kind } from 'graphql';
export function validateAliasCount({ source, doc, maxAliasCount, fragmentGraph, }) {
    var _a;
    const getFragmentByFragmentName = (fragmentName) => fragmentGraph.getNodeData(fragmentName);
    for (const definition of doc.definitions) {
        if (definition.kind !== Kind.OPERATION_DEFINITION) {
            continue;
        }
        const aliasCount = countAliases(definition, getFragmentByFragmentName);
        if (aliasCount > maxAliasCount) {
            return new GraphQLError(`Too many aliases (${aliasCount}). Maximum allowed is ${maxAliasCount}`, [definition], source, ((_a = definition.loc) === null || _a === void 0 ? void 0 : _a.start) ? [definition.loc.start] : undefined);
        }
    }
}
export function countAliases(node, getFragmentByName) {
    let aliases = 0;
    if ('alias' in node && node.alias) {
        ++aliases;
    }
    if ('selectionSet' in node && node.selectionSet) {
        for (const child of node.selectionSet.selections) {
            aliases += countAliases(child, getFragmentByName);
        }
    }
    else if (node.kind === Kind.FRAGMENT_SPREAD) {
        const fragmentNode = getFragmentByName(node.name.value);
        if (fragmentNode) {
            aliases += countAliases(fragmentNode, getFragmentByName);
        }
    }
    return aliases;
}

import { GraphQLError, Kind } from 'graphql';
export function validateDirectiveCount({ source, doc, maxDirectiveCount, fragmentGraph, }) {
    var _a;
    const getFragmentByFragmentName = (fragmentName) => fragmentGraph.getNodeData(fragmentName);
    for (const definition of doc.definitions) {
        if (definition.kind !== Kind.OPERATION_DEFINITION) {
            continue;
        }
        const directiveCount = countDirectives(definition, getFragmentByFragmentName);
        if (directiveCount > maxDirectiveCount) {
            return new GraphQLError(`Too many directives (${directiveCount}). Maximum allowed is ${maxDirectiveCount}`, [definition], source, ((_a = definition.loc) === null || _a === void 0 ? void 0 : _a.start) ? [definition.loc.start] : undefined);
        }
    }
}
export function countDirectives(node, getFragmentByName) {
    let directives = 0;
    if (node.directives) {
        directives += node.directives.length;
    }
    if ('selectionSet' in node && node.selectionSet) {
        for (const child of node.selectionSet.selections) {
            directives += countDirectives(child, getFragmentByName);
        }
    }
    if (node.kind === Kind.FRAGMENT_SPREAD) {
        const fragment = getFragmentByName(node.name.value);
        if (fragment) {
            directives += countDirectives(fragment, getFragmentByName);
        }
    }
    return directives;
}

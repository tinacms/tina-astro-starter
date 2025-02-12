/**
 * Make an mdast tree compact by merging adjacent text nodes and block quotes.
 *
 * @template {Node} Tree
 *   Node type.
 * @param {Tree} tree
 *   Tree to change.
 * @returns {Tree}
 *   Changed tree.
 */
export function compact<Tree extends Node>(tree: Tree): Tree
export type Root = import('mdast').Root
export type Content = import('mdast').Content
export type Node = Content | Root

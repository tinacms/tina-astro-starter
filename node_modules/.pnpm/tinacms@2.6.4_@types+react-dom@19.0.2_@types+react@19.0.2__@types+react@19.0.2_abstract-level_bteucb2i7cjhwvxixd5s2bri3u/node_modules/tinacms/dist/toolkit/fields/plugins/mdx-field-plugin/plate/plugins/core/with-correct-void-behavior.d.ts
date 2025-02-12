/**
 *
 * This fixes a bug where you can't delete between two void nodes
 * without deleting the first node.
 *
 * https://github.com/ianstormtaylor/slate/issues/3991#issuecomment-832160304
 */
export declare const withCorrectVoidBehavior: (editor: any) => any;

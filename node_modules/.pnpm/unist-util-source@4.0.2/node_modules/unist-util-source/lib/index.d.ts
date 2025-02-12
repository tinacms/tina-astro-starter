/**
 * Get the source of a node or at a position.
 *
 * @param {Node | NodeLike | Position | PositionLike | null | undefined} value
 *   Value to get.
 * @param {VFile | VFileValue} file
 *   File in which `value` exists.
 * @returns {string | null}
 *   Source of `value` in `doc`, if available.
 */
export function source(
  value: Node | NodeLike | Position | PositionLike | null | undefined,
  file: VFile | VFileValue
): string | null
export type Node = import('unist').Node
export type Position = import('unist').Position
export type VFile = import('vfile').VFile
export type VFileValue = import('vfile').VFileValue
export type NodeLike = {
  type: string
  position?: PositionLike | null | undefined
}
export type PositionLike = {
  start?: PointLike | null | undefined
  end?: PointLike | null | undefined
}
export type PointLike = {
  line?: number | null | undefined
  column?: number | null | undefined
  offset?: number | null | undefined
}

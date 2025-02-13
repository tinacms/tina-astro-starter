/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('unist').Position} Position
 * @typedef {import('vfile').VFile} VFile
 * @typedef {import('vfile').VFileValue} VFileValue
 */

/**
 * @typedef NodeLike
 * @property {string} type
 * @property {PositionLike | null | undefined} [position]
 *
 * @typedef PositionLike
 * @property {PointLike | null | undefined} [start]
 * @property {PointLike | null | undefined} [end]
 *
 * @typedef PointLike
 * @property {number | null | undefined} [line]
 * @property {number | null | undefined} [column]
 * @property {number | null | undefined} [offset]
 */

import {location} from 'vfile-location'

const search = /\r?\n|\r/g

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
export function source(value, file) {
  const doc = String(file)
  const loc = location(file)
  const position =
    value && typeof value === 'object'
      ? 'type' in value
        ? value.position
        : value
      : undefined

  if (!position || !position.start || !position.end) {
    return null
  }

  // @ts-expect-error: To do: add `PointLike` to `vfile-location`
  const endOffset = loc.toOffset(position.end)
  // @ts-expect-error: To do: add `PointLike` to `vfile-location`
  let startOffset = loc.toOffset(position.start)

  if (endOffset === -1 || startOffset === -1) {
    return null
  }

  /** @type {Array.<string>} */
  const results = []

  while (startOffset < endOffset) {
    search.lastIndex = startOffset
    const match = search.exec(doc)
    const end = match && match.index < endOffset ? match.index : endOffset
    results.push(doc.slice(startOffset, end))
    startOffset = end

    if (match && match.index < endOffset) {
      startOffset += match[0].length
      results.push(match[0])
    }
  }

  return results.join('')
}

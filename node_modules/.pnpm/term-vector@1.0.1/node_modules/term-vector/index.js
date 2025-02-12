/**
 * search-index module.
 * @module term-vector
 */

module.exports = (tokens, ops) => {
  ops = Object.assign(
    {},
    {
      ngramLengths: [1]
    },
    ops
  )
  const tokenMap = tokens.reduce((acc, cur, i, src) => {
    // register ngram of each given length
    ops.ngramLengths.forEach((ngl) => {
      const ngram = src.slice(i, i + ngl)
      if (ngram.length !== ngl) return // at end of token array
      cur = JSON.stringify(ngram)
      acc[cur] = acc[cur] || []
      acc[cur].push(i)
    })
    return acc
  }, {})

  // turn token map into array
  return Object.keys(tokenMap)
    .map((t) => ({
      term: JSON.parse(t),
      positions: tokenMap[t]
    }))
    .sort((a, b) => {
      for (let i = 0; i < a.term.length && i < b.term.length; i++) {
        if (a.term[i] === b.term[i]) {
          // these elements are equal, move to next element
        } else {
          // these elements are not equal so compare them
          return a.term[i].localeCompare(b.term[i])
        }
      }
      return 0 // since nothing was returned, both arrays are deeply equal
    }) // sort array of variable length arrays alphabetically
}

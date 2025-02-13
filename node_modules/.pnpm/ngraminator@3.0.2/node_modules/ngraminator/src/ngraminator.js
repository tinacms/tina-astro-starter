// nGramLengths is of the form [ 9, 10 ]
const ngraminator = function (inputArray, nGramLengths) {
  return nGramLengths.reduce(
    (acc, cur) => [...getNGramsOfSingleLength(inputArray, cur), ...acc], []
  ).sort()
}

// nGramLength is a single integer
const getNGramsOfSingleLength = function (inputArray, nGramLength) {
  return inputArray.slice(nGramLength - 1).map((item, i) => {
    return inputArray.slice(i, i + nGramLength)
  })
}

export { ngraminator }

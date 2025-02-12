// Listen to key up on text and initiate ngraminator
document.getElementById('text').onkeyup = function () {
  calculateNgrams()
}

// Listen to key up on integerArray and initiate ngraminator
document.getElementById('integerArray').onkeyup = function () {
  calculateNgrams()
}

// calculate nGrams
const calculateNgrams = function () {
  const text = document.getElementById('text').value.split(' ')
  let integerArray = document.getElementById('integerArray').value.split(',')
  let ngrams = []
  integerArray = stringToInteger(integerArray)
  ngrams = ngrm.ngraminator(text, integerArray)
  ngrams = JSON.stringify(ngrams, 2, ' ')
  populateNgrams(ngrams)
}

// convert array of strings to integers
const stringToInteger = function (array) {
  for (let i = 0; i < array.length; i++) {
    array[i] = Number(array[i])
  }
  return array
}

// Populating div ngrams
const populateNgrams = function(result) {
  const node = document.createElement('pre')
  node.innerHTML = result
  emptyElement('nGraminated')
  document.getElementById('nGraminated').appendChild(node)
}

// Empty HTML element
const emptyElement = function (element) {
  document.getElementById(element).innerHTML = ''
}

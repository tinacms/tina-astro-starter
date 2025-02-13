(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ngrm = {}));
})(this, (function (exports) { 'use strict';

  // nGramLengths is of the form [ 9, 10 ]
  const ngraminator = function (inputArray, nGramLengths) {
    return nGramLengths.reduce(
      (acc, cur) => [...getNGramsOfSingleLength(inputArray, cur), ...acc], []
    ).sort()
  };

  // nGramLength is a single integer
  const getNGramsOfSingleLength = function (inputArray, nGramLength) {
    return inputArray.slice(nGramLength - 1).map((item, i) => {
      return inputArray.slice(i, i + nGramLength)
    })
  };

  exports.ngraminator = ngraminator;

  Object.defineProperty(exports, '__esModule', { value: true });

}));

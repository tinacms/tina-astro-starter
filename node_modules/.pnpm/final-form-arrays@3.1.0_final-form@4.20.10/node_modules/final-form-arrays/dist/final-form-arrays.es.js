function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

//      
function copyField(oldFields, oldKey, newFields, newKey) {
  newFields[newKey] = _extends({}, oldFields[oldKey], {
    name: newKey,
    // prevent functions from being overwritten
    // if the newFields[newKey] does not exist, it will be created
    // when that field gets registered, with its own change/blur/focus callbacks
    change: oldFields[newKey] && oldFields[newKey].change,
    blur: oldFields[newKey] && oldFields[newKey].blur,
    focus: oldFields[newKey] && oldFields[newKey].focus,
    lastFieldState: undefined // clearing lastFieldState forces renotification

  });

  if (!newFields[newKey].change) {
    delete newFields[newKey].change;
  }

  if (!newFields[newKey].blur) {
    delete newFields[newKey].blur;
  }

  if (!newFields[newKey].focus) {
    delete newFields[newKey].focus;
  }
}

//      
// From MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping
var escapeRegexTokens = function escapeRegexTokens(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}; // $& means the whole matched string

//      

var insert = function insert(_ref, state, _ref2) {
  var name = _ref[0],
      index = _ref[1],
      value = _ref[2];
  var changeValue = _ref2.changeValue;
  changeValue(state, name, function (array) {
    var copy = [].concat(array || []);
    copy.splice(index, 0, value);
    return copy;
  }); // now we have increment any higher indexes

  var pattern = new RegExp("^" + escapeRegexTokens(name) + "\\[(\\d+)\\](.*)");
  var newFields = {};
  Object.keys(state.fields).forEach(function (key) {
    var tokens = pattern.exec(key);

    if (tokens) {
      var fieldIndex = Number(tokens[1]);

      if (fieldIndex >= index) {
        // Shift all higher indices up
        var incrementedKey = name + "[" + (fieldIndex + 1) + "]" + tokens[2];
        copyField(state.fields, key, newFields, incrementedKey);
        return;
      }
    } // Keep this field that does not match the name,
    // or has index smaller than what is being inserted


    newFields[key] = state.fields[key];
  });
  state.fields = newFields;
};

//      
var concat = function concat(_ref, state, _ref2) {
  var name = _ref[0],
      value = _ref[1];
  var changeValue = _ref2.changeValue;
  changeValue(state, name, function (array) {
    return array ? [].concat(array, value) : value;
  });
};

//      

var move = function move(_ref, state, _ref2) {
  var name = _ref[0],
      from = _ref[1],
      to = _ref[2];
  var changeValue = _ref2.changeValue;

  if (from === to) {
    return;
  }

  changeValue(state, name, function (array) {
    var copy = [].concat(array || []);
    var value = copy[from];
    copy.splice(from, 1);
    copy.splice(to, 0, value);
    return copy;
  });
  var newFields = {};
  var pattern = new RegExp("^" + escapeRegexTokens(name) + "\\[(\\d+)\\](.*)");
  var lowest;
  var highest;
  var increment;

  if (from > to) {
    lowest = to;
    highest = from;
    increment = 1;
  } else {
    lowest = from;
    highest = to;
    increment = -1;
  }

  Object.keys(state.fields).forEach(function (key) {
    var tokens = pattern.exec(key);

    if (tokens) {
      var fieldIndex = Number(tokens[1]);

      if (fieldIndex === from) {
        var newKey = name + "[" + to + "]" + tokens[2];
        copyField(state.fields, key, newFields, newKey);
        return;
      }

      if (lowest <= fieldIndex && fieldIndex <= highest) {
        // Shift all indices
        var _newKey = name + "[" + (fieldIndex + increment) + "]" + tokens[2];

        copyField(state.fields, key, newFields, _newKey);
        return;
      }
    } // Keep this field that does not match the name,
    // or has index smaller or larger than affected range


    newFields[key] = state.fields[key];
  });
  state.fields = newFields;
};

//      

var remove = function remove(_ref, state, _ref2) {
  var name = _ref[0],
      index = _ref[1];
  var changeValue = _ref2.changeValue,
      getIn = _ref2.getIn,
      setIn = _ref2.setIn;
  var returnValue;
  changeValue(state, name, function (array) {
    if (!array) {
      return array;
    }

    var copy = [].concat(array);
    returnValue = copy[index];
    copy.splice(index, 1);
    return copy.length > 0 ? copy : undefined;
  }); // now we have to remove any subfields for our index,
  // and decrement all higher indexes.

  var pattern = new RegExp("^" + escapeRegexTokens(name) + "\\[(\\d+)\\](.*)");
  var newFields = {};
  Object.keys(state.fields).forEach(function (key) {
    var tokens = pattern.exec(key);

    if (tokens) {
      var fieldIndex = Number(tokens[1]);

      if (fieldIndex === index) {
        // delete any submitErrors for this array item
        // if the root key of the delete index
        if (key === name + "[" + index + "]") {
          var path = "formState.submitErrors." + name;
          var submitErrors = getIn(state, path); // if has submitErrors for array

          if (Array.isArray(submitErrors)) {
            submitErrors.splice(index, 1);
            state = setIn(state, path, submitErrors);
          }
        }

        return;
      }

      if (fieldIndex > index) {
        // Shift all higher indices down
        var decrementedKey = name + "[" + (fieldIndex - 1) + "]" + tokens[2];
        copyField(state.fields, key, newFields, decrementedKey);
        return;
      }
    } // Keep this field that does not match the name,
    // or has index smaller than what is being removed


    newFields[key] = state.fields[key];
  });
  state.fields = newFields;
  return returnValue;
};

//      

var pop = function pop(_ref, state, tools) {
  var name = _ref[0];
  var getIn = tools.getIn;
  var array = getIn(state.formState.values, name);
  return array && array.length > 0 ? remove([name, array.length - 1], state, tools) : undefined;
};

//      
var push = function push(_ref, state, _ref2) {
  var name = _ref[0],
      value = _ref[1];
  var changeValue = _ref2.changeValue;
  changeValue(state, name, function (array) {
    return array ? [].concat(array, [value]) : [value];
  });
};

//      

var binarySearch = function binarySearch(list, value) {
  // This algorithm assumes the items in list is unique
  var first = 0;
  var last = list.length - 1;
  var middle = 0;

  while (first <= last) {
    middle = Math.floor((first + last) / 2);

    if (list[middle] === value) {
      return middle;
    }

    if (list[middle] > value) {
      last = middle - 1;
    } else {
      first = middle + 1;
    }
  }

  return ~first;
};

var removeBatch = function removeBatch(_ref, state, _ref2) {
  var name = _ref[0],
      indexes = _ref[1];
  var changeValue = _ref2.changeValue;

  if (indexes.length === 0) {
    return [];
  }

  var sortedIndexes = [].concat(indexes);
  sortedIndexes.sort(); // Remove duplicates

  for (var i = sortedIndexes.length - 1; i > 0; i -= 1) {
    if (sortedIndexes[i] === sortedIndexes[i - 1]) {
      sortedIndexes.splice(i, 1);
    }
  }

  var returnValue = [];
  changeValue(state, name, function (array) {
    // use original order of indexes for return value
    returnValue = indexes.map(function (index) {
      return array && array[index];
    });

    if (!array) {
      return array;
    }

    var copy = [].concat(array);

    for (var _i = sortedIndexes.length - 1; _i >= 0; _i -= 1) {
      var index = sortedIndexes[_i];
      copy.splice(index, 1);
    }

    return copy.length > 0 ? copy : undefined;
  }); // now we have to remove any subfields for our indexes,
  // and decrement all higher indexes.

  var pattern = new RegExp("^" + escapeRegexTokens(name) + "\\[(\\d+)\\](.*)");
  var newFields = {};
  Object.keys(state.fields).forEach(function (key) {
    var tokens = pattern.exec(key);

    if (tokens) {
      var fieldIndex = Number(tokens[1]);
      var indexOfFieldIndex = binarySearch(sortedIndexes, fieldIndex);

      if (indexOfFieldIndex >= 0) {
        // One of the removed indices
        return;
      }

      if (fieldIndex > sortedIndexes[0]) {
        // Shift all higher indices down
        var decrementedKey = name + "[" + (fieldIndex - ~indexOfFieldIndex) + "]" + tokens[2];
        copyField(state.fields, key, newFields, decrementedKey);
        return;
      }
    } // Keep this field that does not match the name,
    // or has index smaller than what is being removed


    newFields[key] = state.fields[key];
  });
  state.fields = newFields;
  return returnValue;
};

//      

var shift = function shift(_ref, state, tools) {
  var name = _ref[0];
  return remove([name, 0], state, tools);
};

//      

var swap = function swap(_ref, state, _ref2) {
  var name = _ref[0],
      indexA = _ref[1],
      indexB = _ref[2];
  var changeValue = _ref2.changeValue;

  if (indexA === indexB) {
    return;
  }

  changeValue(state, name, function (array) {
    var copy = [].concat(array || []);
    var a = copy[indexA];
    copy[indexA] = copy[indexB];
    copy[indexB] = a;
    return copy;
  }); // swap all field state that begin with "name[indexA]" with that under "name[indexB]"

  var aPrefix = name + "[" + indexA + "]";
  var bPrefix = name + "[" + indexB + "]";
  var newFields = {};
  Object.keys(state.fields).forEach(function (key) {
    if (key.substring(0, aPrefix.length) === aPrefix) {
      var suffix = key.substring(aPrefix.length);
      var newKey = bPrefix + suffix;
      copyField(state.fields, key, newFields, newKey);
    } else if (key.substring(0, bPrefix.length) === bPrefix) {
      var _suffix = key.substring(bPrefix.length);

      var _newKey = aPrefix + _suffix;

      copyField(state.fields, key, newFields, _newKey);
    } else {
      // Keep this field that does not match the name
      newFields[key] = state.fields[key];
    }
  });
  state.fields = newFields;
};

//      

var unshift = function unshift(_ref, state, tools) {
  var name = _ref[0],
      value = _ref[1];
  return insert([name, 0, value], state, tools);
};

//      
var update = function update(_ref, state, _ref2) {
  var name = _ref[0],
      index = _ref[1],
      value = _ref[2];
  var changeValue = _ref2.changeValue;
  changeValue(state, name, function (array) {
    var copy = [].concat(array || []);
    copy.splice(index, 1, value);
    return copy;
  });
};

//      
var mutators = {
  insert: insert,
  concat: concat,
  move: move,
  pop: pop,
  push: push,
  remove: remove,
  removeBatch: removeBatch,
  shift: shift,
  swap: swap,
  unshift: unshift,
  update: update
};

export default mutators;

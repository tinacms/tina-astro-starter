"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keyMap = keyMap;
exports.isEqual = isEqual;
exports.isNotEqual = isNotEqual;
exports.isVoid = isVoid;
exports.diffArrays = diffArrays;
exports.compareLists = compareLists;
function keyMap(list, keyFn) {
    return list.reduce((map, item) => {
        map[keyFn(item)] = item;
        return map;
    }, Object.create(null));
}
function isEqual(a, b) {
    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length)
            return false;
        for (let index = 0; index < a.length; index++) {
            if (!isEqual(a[index], b[index])) {
                return false;
            }
        }
        return true;
    }
    if (a && b && typeof a === 'object' && typeof b === 'object') {
        const aRecord = a;
        const bRecord = b;
        const aKeys = Object.keys(aRecord);
        const bKeys = Object.keys(bRecord);
        if (aKeys.length !== bKeys.length)
            return false;
        for (const key of aKeys) {
            if (!isEqual(aRecord[key], bRecord[key])) {
                return false;
            }
        }
        return true;
    }
    return a === b || (!a && !b);
}
function isNotEqual(a, b) {
    return !isEqual(a, b);
}
function isVoid(a) {
    return typeof a === 'undefined' || a === null;
}
function diffArrays(a, b) {
    return a.filter(c => !b.some(d => isEqual(d, c)));
}
function extractName(name) {
    if (typeof name === 'string') {
        return name;
    }
    return name.value;
}
function compareLists(oldList, newList, callbacks) {
    const oldMap = keyMap(oldList, ({ name }) => extractName(name));
    const newMap = keyMap(newList, ({ name }) => extractName(name));
    const added = [];
    const removed = [];
    const mutual = [];
    for (const oldItem of oldList) {
        const newItem = newMap[extractName(oldItem.name)];
        if (newItem === undefined) {
            removed.push(oldItem);
        }
        else {
            mutual.push({
                newVersion: newItem,
                oldVersion: oldItem,
            });
        }
    }
    for (const newItem of newList) {
        if (oldMap[extractName(newItem.name)] === undefined) {
            added.push(newItem);
        }
    }
    if (callbacks) {
        if (callbacks.onAdded) {
            for (const item of added) {
                callbacks.onAdded(item);
            }
        }
        if (callbacks.onRemoved) {
            for (const item of removed) {
                callbacks.onRemoved(item);
            }
        }
        if (callbacks.onMutual) {
            for (const item of mutual) {
                callbacks.onMutual(item);
            }
        }
    }
    return {
        added,
        removed,
        mutual,
    };
}

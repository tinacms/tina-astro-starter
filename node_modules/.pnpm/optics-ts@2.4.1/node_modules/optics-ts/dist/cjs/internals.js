"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.optic = exports.Optic = exports.words = exports.chars = exports.appendTo = exports.prependTo = exports.rewrite = exports.reread = exports.partsOf = exports.valueOr = exports.filter = exports.find = exports.guard = exports.optional = exports.atKey = exports.at = exports.when = exports.nth = exports.pick = exports.prop = exports.indexed = exports.collect = exports.preview = exports.get = exports.remove = exports.set = exports.modify = exports.to = exports.elems = exports.lens = exports.iso = exports.eq = exports.compositionType = exports.id = void 0;
/* eslint-disable @typescript-eslint/no-non-null-assertion */
const id = (x) => x;
exports.id = id;
const Left = (value) => ({
    _tag: 'Left',
    value,
});
const Right = (value) => ({
    _tag: 'Right',
    value,
});
const either = (mapLeft, mapRight, e) => (e._tag === 'Left' ? mapLeft(e.value) : mapRight(e.value));
const profunctorFn = {
    dimap: (f, g, fn) => (x) => g(fn(f(x))),
    first: (f) => ([x, y]) => [f(x), y],
    right: (f) => (e) => e._tag === 'Left' ? e : Right(f(e.value)),
    wander: (f) => (xs) => xs.map(f),
};
const monoidFirst = {
    empty: () => undefined,
    foldMap: (f, xs) => {
        for (let i = 0; i < xs.length; i++) {
            const x = f(xs[i]);
            if (x != undefined)
                return x;
        }
        return undefined;
    },
};
const monoidArray = {
    empty: () => [],
    foldMap: (f, xs) => {
        let acc = [];
        xs.forEach((x) => {
            acc = acc.concat(f(x));
        });
        return acc;
    },
};
const profunctorConst = (monoid) => ({
    dimap: (f, _g, toF) => (x) => toF(f(x)),
    first: (toF) => ([x, _y]) => toF(x),
    right: (toF) => (e) => e._tag === 'Left' ? monoid.empty() : toF(e.value),
    wander: (toF) => (xs) => monoid.foldMap(toF, xs),
});
exports.compositionType = {
    Equivalence: {
        Equivalence: 'Equivalence',
        Iso: 'Iso',
        Lens: 'Lens',
        Prism: 'Prism',
        Traversal: 'Traversal',
        Getter: 'Getter',
        AffineFold: 'AffineFold',
        Fold: 'Fold',
        Setter: 'Setter',
    },
    Iso: {
        Equivalence: 'Iso',
        Iso: 'Iso',
        Lens: 'Lens',
        Prism: 'Prism',
        Traversal: 'Traversal',
        Getter: 'Getter',
        AffineFold: 'AffineFold',
        Fold: 'Fold',
        Setter: 'Setter',
    },
    Lens: {
        Equivalence: 'Lens',
        Iso: 'Lens',
        Lens: 'Lens',
        Prism: 'Prism',
        Traversal: 'Traversal',
        Getter: 'Getter',
        AffineFold: 'AffineFold',
        Fold: 'Fold',
        Setter: 'Setter',
    },
    Prism: {
        Equivalence: 'Prism',
        Iso: 'Prism',
        Lens: 'Prism',
        Prism: 'Prism',
        Traversal: 'Traversal',
        Getter: 'AffineFold',
        AffineFold: 'AffineFold',
        Fold: 'Fold',
        Setter: 'Setter',
    },
    Traversal: {
        Equivalence: 'Traversal',
        Iso: 'Traversal',
        Lens: 'Traversal',
        Prism: 'Traversal',
        Traversal: 'Traversal',
        Getter: 'Fold',
        AffineFold: 'Fold',
        Fold: 'Fold',
        Setter: 'Setter',
    },
    Getter: {
        Equivalence: 'Getter',
        Iso: 'Getter',
        Lens: 'Getter',
        Prism: 'AffineFold',
        Traversal: 'Fold',
        Getter: 'Getter',
        AffineFold: 'AffineFold',
        Fold: 'Fold',
        Setter: undefined,
    },
    AffineFold: {
        Equivalence: 'AffineFold',
        Iso: 'AffineFold',
        Lens: 'AffineFold',
        Prism: 'AffineFold',
        Traversal: 'Fold',
        Getter: 'AffineFold',
        AffineFold: 'AffineFold',
        Fold: 'Fold',
        Setter: undefined,
    },
    Fold: {
        Equivalence: 'Fold',
        Iso: 'Fold',
        Lens: 'Fold',
        Prism: 'Fold',
        Traversal: 'Fold',
        Getter: 'Fold',
        AffineFold: 'Fold',
        Fold: 'Fold',
        Setter: undefined,
    },
    Setter: {
        Equivalence: undefined,
        Iso: undefined,
        Lens: undefined,
        Prism: undefined,
        Traversal: undefined,
        Getter: undefined,
        AffineFold: undefined,
        Fold: undefined,
        Setter: undefined,
    },
};
const withTag = (tag, optic) => {
    const result = optic;
    result._tag = tag;
    return result;
};
const removable = (optic) => {
    optic._removable = true;
    return optic;
};
function compose(optic1, optic2, optic3) {
    switch (arguments.length) {
        case 2: {
            const next = (P, optic) => optic1(P, optic2(P, optic));
            next._tag = exports.compositionType[optic1._tag][optic2._tag];
            next._removable = optic2._removable || false;
            return next;
        }
        default: {
            const tag1 = exports.compositionType[optic1._tag][optic2._tag];
            const next = (P, optic) => optic1(P, optic2(P, optic3(P, optic)));
            next._tag = exports.compositionType[tag1][optic3._tag];
            next._removable = optic3._removable || false;
            return next;
        }
    }
}
exports.eq = withTag('Equivalence', (_P, optic) => optic);
const iso = (there, back) => withTag('Iso', (P, optic) => P.dimap(there, back, optic));
exports.iso = iso;
const lens = (view, update) => withTag('Lens', (P, optic) => P.dimap((x) => [view(x), x], update, P.first(optic)));
exports.lens = lens;
const prism = (match, build) => withTag('Prism', (P, optic) => P.dimap(match, (x) => either(exports.id, build, x), P.right(optic)));
exports.elems = withTag('Traversal', (P, optic) => P.dimap(exports.id, exports.id, P.wander(optic)));
const to = (fn) => withTag('Getter', (P, optic) => P.dimap(fn, exports.id, optic));
exports.to = to;
/////////////////////////////////////////////////////////////////////////////
const modify = (optic, fn, source) => optic(profunctorFn, fn)(source);
exports.modify = modify;
const set = (optic, value, source) => optic(profunctorFn, () => value)(source);
exports.set = set;
const remove = (optic, source) => (0, exports.set)(optic, removeMe, source);
exports.remove = remove;
const get = (optic, source) => optic(profunctorConst({}), exports.id)(source);
exports.get = get;
const preview = (optic, source) => optic(profunctorConst(monoidFirst), exports.id)(source);
exports.preview = preview;
const collect = (optic, source) => optic(profunctorConst(monoidArray), (x) => [x])(source);
exports.collect = collect;
/////////////////////////////////////////////////////////////////////////////
exports.indexed = (0, exports.iso)((value) => value.map((v, k) => [k, v]), (value) => {
    const sorted = [...value].sort((a, b) => a[0] - b[0]);
    const result = [];
    for (let i = 0; i < sorted.length; ++i) {
        if (i === sorted.length - 1 || sorted[i][0] !== sorted[i + 1][0]) {
            result.push(sorted[i][1]);
        }
    }
    return result;
});
const prop = (key) => (0, exports.lens)((source) => source[key], ([value, source]) => (Object.assign(Object.assign({}, source), { [key]: value })));
exports.prop = prop;
const pick = (keys) => (0, exports.lens)((source) => {
    const value = {};
    for (const key of keys) {
        value[key] = source[key];
    }
    return value;
}, ([value, source]) => {
    const result = Object.assign({}, source);
    for (const key of keys) {
        delete result[key];
    }
    return Object.assign(result, value);
});
exports.pick = pick;
const nth = (n) => (0, exports.lens)((value) => value[n], ([value, source]) => {
    const result = source.slice();
    result[n] = value;
    return result;
});
exports.nth = nth;
const fst = /* @__PURE__ */ (0, exports.nth)(0);
const when = (pred) => prism((x) => (pred(x) ? Right(x) : Left(x)), exports.id);
exports.when = when;
const noMatch = /* @__PURE__ */ Symbol('__no_match__');
const mustMatch = /* @__PURE__ */ (0, exports.when)((source) => source !== noMatch);
const removeMe = /* @__PURE__ */ Symbol('__remove_me__');
const at = (i) => removable(compose((0, exports.lens)((source) => (0 <= i && i < source.length ? source[i] : noMatch), ([value, source]) => {
    if (value === noMatch) {
        return source;
    }
    if (value === removeMe) {
        if (typeof source === 'string') {
            return source.substring(0, i) + source.substring(i + 1);
        }
        else {
            return [...source.slice(0, i), ...source.slice(i + 1)];
        }
    }
    if (typeof source === 'string') {
        if (i === 0) {
            return value + source.substring(1);
        }
        if (i === source.length) {
            return source.substring(0, i - 1) + value;
        }
        return source.substring(0, i) + value + source.substring(i + 1);
    }
    else {
        const result = source.slice();
        result[i] = value;
        return result;
    }
}), mustMatch));
exports.at = at;
const atKey = (key) => removable(compose((0, exports.lens)((source) => {
    const value = source[key];
    return value !== undefined ? value : noMatch;
}, ([value, source]) => {
    if (value === noMatch) {
        return source;
    }
    if (value === removeMe) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _a = source, _b = key, _ = _a[_b], rest = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
        return rest;
    }
    return Object.assign(Object.assign({}, source), { [key]: value });
}), mustMatch));
exports.atKey = atKey;
exports.optional = prism((source) => (source === undefined ? Left(undefined) : Right(source)), exports.id);
const guard = (fn) => prism((source) => (fn(source) ? Right(source) : Left(source)), exports.id);
exports.guard = guard;
const find = (predicate) => removable(compose((0, exports.lens)((source) => {
    const index = source.findIndex(predicate);
    if (index === -1) {
        return [noMatch, -1];
    }
    return [source[index], index];
}, ([[value, index], source]) => {
    if (value === noMatch) {
        return source;
    }
    if (value === removeMe) {
        return [...source.slice(0, index), ...source.slice(index + 1)];
    }
    const result = source.slice();
    result[index] = value;
    return result;
}), fst, mustMatch));
exports.find = find;
const filter = (predicate) => compose((0, exports.lens)((source) => {
    const indexes = source
        .map((item, index) => (predicate(item) ? index : null))
        .filter((index) => index != null);
    return [indexes.map((index) => source[index]), indexes];
}, ([[values, indexes], source]) => {
    const sn = source.length, vn = values.length;
    let si = 0, ii = 0, vi = 0;
    const result = [];
    while (si < sn) {
        if (indexes[ii] === si) {
            ++ii;
            if (vi < vn) {
                result.push(values[vi]);
                ++vi;
            }
        }
        else {
            result.push(source[si]);
        }
        ++si;
    }
    while (vi < vn) {
        result.push(values[vi++]);
    }
    return result;
}), fst);
exports.filter = filter;
const valueOr = (defaultValue) => (0, exports.lens)((source) => (source === undefined ? defaultValue : source), ([value, _source]) => value);
exports.valueOr = valueOr;
const partsOf = (traversal) => compose((0, exports.lens)((source) => {
    const value = (0, exports.collect)(traversal, source);
    return [value, value.length];
}, ([[value, originalLength], source]) => {
    if (value.length !== originalLength) {
        throw new Error('cannot add/remove elements through partsOf');
    }
    let i = 0;
    return (0, exports.modify)(traversal, () => value[i++], source);
}), fst);
exports.partsOf = partsOf;
const reread = (fn) => (0, exports.lens)((source) => fn(source), ([value, _]) => value);
exports.reread = reread;
const rewrite = (fn) => (0, exports.lens)((source) => source, ([value, _]) => fn(value));
exports.rewrite = rewrite;
exports.prependTo = (0, exports.lens)((_source) => undefined, ([value, source]) => {
    if (value === undefined)
        return source;
    return [value, ...source];
});
exports.appendTo = (0, exports.lens)((_source) => undefined, ([value, source]) => {
    if (value === undefined)
        return source;
    return [...source, value];
});
exports.chars = compose((0, exports.iso)((s) => s.split(''), (a) => a.join('')), exports.elems);
exports.words = compose((0, exports.iso)((s) => s.split(/\b/), (a) => a.join('')), exports.elems, (0, exports.when)((s) => !/\s+/.test(s)));
/////////////////////////////////////////////////////////////////////////////
class Optic {
    constructor(_ref) {
        this._ref = _ref;
    }
    get _tag() {
        return this._ref._tag;
    }
    get _removable() {
        return this._ref._removable;
    }
    compose(other) {
        return new Optic(compose(this._ref, other._ref));
    }
    iso(there, back) {
        return new Optic(compose(this._ref, (0, exports.iso)(there, back)));
    }
    lens(view, set) {
        return new Optic(compose(this._ref, (0, exports.lens)(view, ([value, source]) => set(source, value))));
    }
    indexed() {
        return new Optic(compose(this._ref, exports.indexed));
    }
    prop(key) {
        return new Optic(compose(this._ref, (0, exports.prop)(key)));
    }
    path(...keys) {
        if (keys.length === 1) {
            keys = keys[0].split('.');
        }
        return new Optic(keys.reduce((ref, key) => compose(ref, (0, exports.prop)(key)), this._ref));
    }
    pick(keys) {
        return new Optic(compose(this._ref, (0, exports.pick)(keys)));
    }
    nth(n) {
        return new Optic(compose(this._ref, (0, exports.nth)(n)));
    }
    filter(predicate) {
        return new Optic(compose(this._ref, (0, exports.filter)(predicate)));
    }
    valueOr(defaultValue) {
        return new Optic(compose(this._ref, (0, exports.valueOr)(defaultValue)));
    }
    partsOf(traversalOrFn) {
        const traversal = typeof traversalOrFn === 'function' ? traversalOrFn(exports.optic) : traversalOrFn;
        return new Optic(compose(this._ref, (0, exports.partsOf)(traversal._ref)));
    }
    reread(fn) {
        return new Optic(compose(this._ref, (0, exports.reread)(fn)));
    }
    rewrite(fn) {
        return new Optic(compose(this._ref, (0, exports.rewrite)(fn)));
    }
    optional() {
        return new Optic(compose(this._ref, exports.optional));
    }
    guard_() {
        return (fn) => this.guard(fn);
    }
    guard(fn) {
        return new Optic(compose(this._ref, (0, exports.guard)(fn)));
    }
    at(i) {
        return new Optic(compose(this._ref, (0, exports.at)(i)));
    }
    head() {
        return new Optic(compose(this._ref, (0, exports.at)(0)));
    }
    index(i) {
        return new Optic(compose(this._ref, (0, exports.at)(i)));
    }
    find(predicate) {
        return new Optic(compose(this._ref, (0, exports.find)(predicate)));
    }
    elems() {
        return new Optic(compose(this._ref, exports.elems));
    }
    to(fn) {
        return new Optic(compose(this._ref, (0, exports.to)(fn)));
    }
    when(predicate) {
        return new Optic(compose(this._ref, (0, exports.when)(predicate)));
    }
    chars() {
        return new Optic(compose(this._ref, exports.chars));
    }
    words() {
        return new Optic(compose(this._ref, exports.words));
    }
    prependTo() {
        return new Optic(compose(this._ref, exports.prependTo));
    }
    appendTo() {
        return new Optic(compose(this._ref, exports.appendTo));
    }
}
exports.Optic = Optic;
exports.optic = new Optic(exports.eq);

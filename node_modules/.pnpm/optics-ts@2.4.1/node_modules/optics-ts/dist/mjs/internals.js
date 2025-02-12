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
/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const id = (x) => x;
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
export const compositionType = {
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
            next._tag = compositionType[optic1._tag][optic2._tag];
            next._removable = optic2._removable || false;
            return next;
        }
        default: {
            const tag1 = compositionType[optic1._tag][optic2._tag];
            const next = (P, optic) => optic1(P, optic2(P, optic3(P, optic)));
            next._tag = compositionType[tag1][optic3._tag];
            next._removable = optic3._removable || false;
            return next;
        }
    }
}
export const eq = /* @__PURE__ */ withTag('Equivalence', (_P, optic) => optic);
export const iso = (there, back) => withTag('Iso', (P, optic) => P.dimap(there, back, optic));
export const lens = (view, update) => withTag('Lens', (P, optic) => P.dimap((x) => [view(x), x], update, P.first(optic)));
const prism = (match, build) => withTag('Prism', (P, optic) => P.dimap(match, (x) => either(id, build, x), P.right(optic)));
export const elems = /* @__PURE__ */ withTag('Traversal', (P, optic) => P.dimap(id, id, P.wander(optic)));
export const to = (fn) => withTag('Getter', (P, optic) => P.dimap(fn, id, optic));
/////////////////////////////////////////////////////////////////////////////
export const modify = (optic, fn, source) => optic(profunctorFn, fn)(source);
export const set = (optic, value, source) => optic(profunctorFn, () => value)(source);
export const remove = (optic, source) => set(optic, removeMe, source);
export const get = (optic, source) => optic(profunctorConst({}), id)(source);
export const preview = (optic, source) => optic(profunctorConst(monoidFirst), id)(source);
export const collect = (optic, source) => optic(profunctorConst(monoidArray), (x) => [x])(source);
/////////////////////////////////////////////////////////////////////////////
export const indexed = /* @__PURE__ */ iso((value) => value.map((v, k) => [k, v]), (value) => {
    const sorted = [...value].sort((a, b) => a[0] - b[0]);
    const result = [];
    for (let i = 0; i < sorted.length; ++i) {
        if (i === sorted.length - 1 || sorted[i][0] !== sorted[i + 1][0]) {
            result.push(sorted[i][1]);
        }
    }
    return result;
});
export const prop = (key) => lens((source) => source[key], ([value, source]) => (Object.assign(Object.assign({}, source), { [key]: value })));
export const pick = (keys) => lens((source) => {
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
export const nth = (n) => lens((value) => value[n], ([value, source]) => {
    const result = source.slice();
    result[n] = value;
    return result;
});
const fst = /* @__PURE__ */ nth(0);
export const when = (pred) => prism((x) => (pred(x) ? Right(x) : Left(x)), id);
const noMatch = /* @__PURE__ */ Symbol('__no_match__');
const mustMatch = /* @__PURE__ */ when((source) => source !== noMatch);
const removeMe = /* @__PURE__ */ Symbol('__remove_me__');
export const at = (i) => removable(compose(lens((source) => (0 <= i && i < source.length ? source[i] : noMatch), ([value, source]) => {
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
export const atKey = (key) => removable(compose(lens((source) => {
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
export const optional = /* @__PURE__ */ prism((source) => (source === undefined ? Left(undefined) : Right(source)), id);
export const guard = (fn) => prism((source) => (fn(source) ? Right(source) : Left(source)), id);
export const find = (predicate) => removable(compose(lens((source) => {
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
export const filter = (predicate) => compose(lens((source) => {
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
export const valueOr = (defaultValue) => lens((source) => (source === undefined ? defaultValue : source), ([value, _source]) => value);
export const partsOf = (traversal) => compose(lens((source) => {
    const value = collect(traversal, source);
    return [value, value.length];
}, ([[value, originalLength], source]) => {
    if (value.length !== originalLength) {
        throw new Error('cannot add/remove elements through partsOf');
    }
    let i = 0;
    return modify(traversal, () => value[i++], source);
}), fst);
export const reread = (fn) => lens((source) => fn(source), ([value, _]) => value);
export const rewrite = (fn) => lens((source) => source, ([value, _]) => fn(value));
export const prependTo = /* @__PURE__ */ lens((_source) => undefined, ([value, source]) => {
    if (value === undefined)
        return source;
    return [value, ...source];
});
export const appendTo = /* @__PURE__ */ lens((_source) => undefined, ([value, source]) => {
    if (value === undefined)
        return source;
    return [...source, value];
});
export const chars = /* @__PURE__ */ compose(iso((s) => s.split(''), (a) => a.join('')), elems);
export const words = /* @__PURE__ */ compose(iso((s) => s.split(/\b/), (a) => a.join('')), elems, when((s) => !/\s+/.test(s)));
/////////////////////////////////////////////////////////////////////////////
export class Optic {
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
        return new Optic(compose(this._ref, iso(there, back)));
    }
    lens(view, set) {
        return new Optic(compose(this._ref, lens(view, ([value, source]) => set(source, value))));
    }
    indexed() {
        return new Optic(compose(this._ref, indexed));
    }
    prop(key) {
        return new Optic(compose(this._ref, prop(key)));
    }
    path(...keys) {
        if (keys.length === 1) {
            keys = keys[0].split('.');
        }
        return new Optic(keys.reduce((ref, key) => compose(ref, prop(key)), this._ref));
    }
    pick(keys) {
        return new Optic(compose(this._ref, pick(keys)));
    }
    nth(n) {
        return new Optic(compose(this._ref, nth(n)));
    }
    filter(predicate) {
        return new Optic(compose(this._ref, filter(predicate)));
    }
    valueOr(defaultValue) {
        return new Optic(compose(this._ref, valueOr(defaultValue)));
    }
    partsOf(traversalOrFn) {
        const traversal = typeof traversalOrFn === 'function' ? traversalOrFn(optic) : traversalOrFn;
        return new Optic(compose(this._ref, partsOf(traversal._ref)));
    }
    reread(fn) {
        return new Optic(compose(this._ref, reread(fn)));
    }
    rewrite(fn) {
        return new Optic(compose(this._ref, rewrite(fn)));
    }
    optional() {
        return new Optic(compose(this._ref, optional));
    }
    guard_() {
        return (fn) => this.guard(fn);
    }
    guard(fn) {
        return new Optic(compose(this._ref, guard(fn)));
    }
    at(i) {
        return new Optic(compose(this._ref, at(i)));
    }
    head() {
        return new Optic(compose(this._ref, at(0)));
    }
    index(i) {
        return new Optic(compose(this._ref, at(i)));
    }
    find(predicate) {
        return new Optic(compose(this._ref, find(predicate)));
    }
    elems() {
        return new Optic(compose(this._ref, elems));
    }
    to(fn) {
        return new Optic(compose(this._ref, to(fn)));
    }
    when(predicate) {
        return new Optic(compose(this._ref, when(predicate)));
    }
    chars() {
        return new Optic(compose(this._ref, chars));
    }
    words() {
        return new Optic(compose(this._ref, words));
    }
    prependTo() {
        return new Optic(compose(this._ref, prependTo));
    }
    appendTo() {
        return new Optic(compose(this._ref, appendTo));
    }
}
export const optic = /* @__PURE__ */ new Optic(eq);

var cn = Object.defineProperty;
var s = (e, t) => cn(e, "name", { value: t, configurable: !0 });
import { jsx as o, jsxs as T, Fragment as z } from "react/jsx-runtime";
import * as a from "react";
import { createContext as un, useContext as dn, useRef as $, useState as I, useEffect as P, forwardRef as J, useCallback as M, useMemo as Q, Fragment as hn, useLayoutEffect as Ke } from "react";
import { clsx as G } from "clsx";
import { print as Ie, astFromValue as mn, isSchema as ht, buildClientSchema as pn, validateSchema as fn, getIntrospectionQuery as gn, isNamedType as Nt, isObjectType as xe, isInputObjectType as Oe, isScalarType as Cn, isEnumType as kt, isInterfaceType as Ee, isUnionType as yn, isNonNullType as Tt, isListType as Mt, isAbstractType as vn, isType as bn, parse as Vt, visit as wn } from "graphql";
import { StorageAPI as Je, HistoryStore as xn, formatResult as Ye, isObservable as En, formatError as ye, isAsyncIterable as Ln, fetcherReturnToPromise as mt, isPromise as pt, mergeAst as Sn, fillLeafs as Nn, getSelectedOperationName as kn } from "@graphiql/toolkit";
import { getFragmentDependenciesForAST as Tn, getOperationFacts as Mn } from "graphql-language-service";
import Vn from "set-value";
import Rn from "copy-to-clipboard";
import * as oe from "@radix-ui/react-dialog";
import { Root as Hn } from "@radix-ui/react-visually-hidden";
import { Trigger as An, Root as Pn, Portal as qn, Content as Dn, Item as In } from "@radix-ui/react-dropdown-menu";
import On from "markdown-it";
import { Reorder as Rt } from "framer-motion";
import * as ge from "@radix-ui/react-tooltip";
import { Combobox as he } from "@headlessui/react";
import ft from "react-dom";
function ce(e) {
  const t = un(null);
  return t.displayName = e, t;
}
s(ce, "createNullableContext");
function ue(e) {
  function t(n) {
    var l;
    const r = dn(e);
    if (r === null && (n != null && n.nonNull))
      throw new Error(
        `Tried to use \`${((l = n.caller) == null ? void 0 : l.name) || t.caller.name}\` without the necessary context. Make sure to render the \`${e.displayName}Provider\` component higher up the tree.`
      );
    return r;
  }
  return s(t, "useGivenContext"), Object.defineProperty(t, "name", {
    value: `use${e.displayName}`
  }), t;
}
s(ue, "createContextHook");
const Ht = ce("StorageContext");
function Fn(e) {
  const t = $(!0), [n, r] = I(new Je(e.storage));
  return P(() => {
    t.current ? t.current = !1 : r(new Je(e.storage));
  }, [e.storage]), /* @__PURE__ */ o(Ht.Provider, { value: n, children: e.children });
}
s(Fn, "StorageContextProvider");
const de = ue(Ht), Bn = /* @__PURE__ */ s(({
  title: e,
  titleId: t,
  ...n
}) => /* @__PURE__ */ a.createElement("svg", { height: "1em", viewBox: "0 0 14 14", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-labelledby": t, ...n }, e ? /* @__PURE__ */ a.createElement("title", { id: t }, e) : null, /* @__PURE__ */ a.createElement("path", { d: "M5.0484 1.40838C6.12624 0.33054 7.87376 0.330541 8.9516 1.40838L12.5916 5.0484C13.6695 6.12624 13.6695 7.87376 12.5916 8.9516L8.9516 12.5916C7.87376 13.6695 6.12624 13.6695 5.0484 12.5916L1.40838 8.9516C0.33054 7.87376 0.330541 6.12624 1.40838 5.0484L5.0484 1.40838Z", stroke: "currentColor", strokeWidth: 1.2 }), /* @__PURE__ */ a.createElement("rect", { x: 6, y: 6, width: 2, height: 2, rx: 1, fill: "currentColor" })), "SvgArgument"), Wn = /* @__PURE__ */ s(({
  title: e,
  titleId: t,
  ...n
}) => /* @__PURE__ */ a.createElement("svg", { height: "1em", viewBox: "0 0 14 9", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-labelledby": t, ...n }, e ? /* @__PURE__ */ a.createElement("title", { id: t }, e) : null, /* @__PURE__ */ a.createElement("path", { d: "M1 1L7 7L13 1", stroke: "currentColor", strokeWidth: 1.5 })), "SvgChevronDown"), $n = /* @__PURE__ */ s(({
  title: e,
  titleId: t,
  ...n
}) => /* @__PURE__ */ a.createElement("svg", { height: "1em", viewBox: "0 0 7 10", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-labelledby": t, ...n }, e ? /* @__PURE__ */ a.createElement("title", { id: t }, e) : null, /* @__PURE__ */ a.createElement("path", { d: "M6 1.04819L2 5.04819L6 9.04819", stroke: "currentColor", strokeWidth: 1.75 })), "SvgChevronLeft"), _n = /* @__PURE__ */ s(({
  title: e,
  titleId: t,
  ...n
}) => /* @__PURE__ */ a.createElement("svg", { height: "1em", viewBox: "0 0 14 9", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-labelledby": t, ...n }, e ? /* @__PURE__ */ a.createElement("title", { id: t }, e) : null, /* @__PURE__ */ a.createElement("path", { d: "M13 8L7 2L1 8", stroke: "currentColor", strokeWidth: 1.5 })), "SvgChevronUp"), Zn = /* @__PURE__ */ s(({
  title: e,
  titleId: t,
  ...n
}) => /* @__PURE__ */ a.createElement("svg", { height: "1em", viewBox: "0 0 14 14", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-labelledby": t, ...n }, e ? /* @__PURE__ */ a.createElement("title", { id: t }, e) : null, /* @__PURE__ */ a.createElement("path", { d: "M1 1L12.9998 12.9997", stroke: "currentColor", strokeWidth: 1.5 }), /* @__PURE__ */ a.createElement("path", { d: "M13 1L1.00079 13.0003", stroke: "currentColor", strokeWidth: 1.5 })), "SvgClose"), Gn = /* @__PURE__ */ s(({
  title: e,
  titleId: t,
  ...n
}) => /* @__PURE__ */ a.createElement("svg", { height: "1em", viewBox: "-2 -2 22 22", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-labelledby": t, ...n }, e ? /* @__PURE__ */ a.createElement("title", { id: t }, e) : null, /* @__PURE__ */ a.createElement("path", { d: "M11.25 14.2105V15.235C11.25 16.3479 10.3479 17.25 9.23501 17.25H2.76499C1.65214 17.25 0.75 16.3479 0.75 15.235L0.75 8.76499C0.75 7.65214 1.65214 6.75 2.76499 6.75L3.78947 6.75", stroke: "currentColor", strokeWidth: 1.5 }), /* @__PURE__ */ a.createElement("rect", { x: 6.75, y: 0.75, width: 10.5, height: 10.5, rx: 2.2069, stroke: "currentColor", strokeWidth: 1.5 })), "SvgCopy"), Qn = /* @__PURE__ */ s(({
  title: e,
  titleId: t,
  ...n
}) => /* @__PURE__ */ a.createElement("svg", { height: "1em", viewBox: "0 0 14 14", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-labelledby": t, ...n }, e ? /* @__PURE__ */ a.createElement("title", { id: t }, e) : null, /* @__PURE__ */ a.createElement("path", { d: "M5.0484 1.40838C6.12624 0.33054 7.87376 0.330541 8.9516 1.40838L12.5916 5.0484C13.6695 6.12624 13.6695 7.87376 12.5916 8.9516L8.9516 12.5916C7.87376 13.6695 6.12624 13.6695 5.0484 12.5916L1.40838 8.9516C0.33054 7.87376 0.330541 6.12624 1.40838 5.0484L5.0484 1.40838Z", stroke: "currentColor", strokeWidth: 1.2 }), /* @__PURE__ */ a.createElement("path", { d: "M5 9L9 5", stroke: "currentColor", strokeWidth: 1.2 }), /* @__PURE__ */ a.createElement("path", { d: "M5 5L9 9", stroke: "currentColor", strokeWidth: 1.2 })), "SvgDeprecatedArgument"), jn = /* @__PURE__ */ s(({
  title: e,
  titleId: t,
  ...n
}) => /* @__PURE__ */ a.createElement("svg", { height: "1em", viewBox: "0 0 12 12", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-labelledby": t, ...n }, e ? /* @__PURE__ */ a.createElement("title", { id: t }, e) : null, /* @__PURE__ */ a.createElement("path", { d: "M4 8L8 4", stroke: "currentColor", strokeWidth: 1.2 }), /* @__PURE__ */ a.createElement("path", { d: "M4 4L8 8", stroke: "currentColor", strokeWidth: 1.2 }), /* @__PURE__ */ a.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M8.5 1.2H9C9.99411 1.2 10.8 2.00589 10.8 3V9C10.8 9.99411 9.99411 10.8 9 10.8H8.5V12H9C10.6569 12 12 10.6569 12 9V3C12 1.34315 10.6569 0 9 0H8.5V1.2ZM3.5 1.2V0H3C1.34315 0 0 1.34315 0 3V9C0 10.6569 1.34315 12 3 12H3.5V10.8H3C2.00589 10.8 1.2 9.99411 1.2 9V3C1.2 2.00589 2.00589 1.2 3 1.2H3.5Z", fill: "currentColor" })), "SvgDeprecatedEnumValue"), zn = /* @__PURE__ */ s(({
  title: e,
  titleId: t,
  ...n
}) => /* @__PURE__ */ a.createElement("svg", { height: "1em", viewBox: "0 0 12 12", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-labelledby": t, ...n }, e ? /* @__PURE__ */ a.createElement("title", { id: t }, e) : null, /* @__PURE__ */ a.createElement("rect", { x: 0.6, y: 0.6, width: 10.8, height: 10.8, rx: 3.4, stroke: "currentColor", strokeWidth: 1.2 }), /* @__PURE__ */ a.createElement("path", { d: "M4 8L8 4", stroke: "currentColor", strokeWidth: 1.2 }), /* @__PURE__ */ a.createElement("path", { d: "M4 4L8 8", stroke: "currentColor", strokeWidth: 1.2 })), "SvgDeprecatedField"), Un = /* @__PURE__ */ s(({
  title: e,
  titleId: t,
  ...n
}) => /* @__PURE__ */ a.createElement("svg", { height: "1em", viewBox: "0 0.5 12 12", xmlns: "http://www.w3.org/2000/svg", "aria-labelledby": t, ...n }, e ? /* @__PURE__ */ a.createElement("title", { id: t }, e) : null, /* @__PURE__ */ a.createElement("rect", { x: 7, y: 5.5, width: 2, height: 2, rx: 1, transform: "rotate(90 7 5.5)", fill: "currentColor" }), /* @__PURE__ */ a.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M10.8 9L10.8 9.5C10.8 10.4941 9.99411 11.3 9 11.3L3 11.3C2.00589 11.3 1.2 10.4941 1.2 9.5L1.2 9L-3.71547e-07 9L-3.93402e-07 9.5C-4.65826e-07 11.1569 1.34314 12.5 3 12.5L9 12.5C10.6569 12.5 12 11.1569 12 9.5L12 9L10.8 9ZM10.8 4L12 4L12 3.5C12 1.84315 10.6569 0.5 9 0.5L3 0.5C1.34315 0.5 -5.87117e-08 1.84315 -1.31135e-07 3.5L-1.5299e-07 4L1.2 4L1.2 3.5C1.2 2.50589 2.00589 1.7 3 1.7L9 1.7C9.99411 1.7 10.8 2.50589 10.8 3.5L10.8 4Z", fill: "currentColor" })), "SvgDirective"), Kn = /* @__PURE__ */ s(({
  title: e,
  titleId: t,
  ...n
}) => /* @__PURE__ */ a.createElement("svg", { height: "1em", viewBox: "0 0 20 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-labelledby": t, ...n }, e ? /* @__PURE__ */ a.createElement("title", { id: t }, e) : null, /* @__PURE__ */ a.createElement("path", { d: "M0.75 3C0.75 1.75736 1.75736 0.75 3 0.75H17.25C17.8023 0.75 18.25 1.19772 18.25 1.75V5.25", stroke: "currentColor", strokeWidth: 1.5 }), /* @__PURE__ */ a.createElement("path", { d: "M0.75 3C0.75 4.24264 1.75736 5.25 3 5.25H18.25C18.8023 5.25 19.25 5.69771 19.25 6.25V22.25C19.25 22.8023 18.8023 23.25 18.25 23.25H3C1.75736 23.25 0.75 22.2426 0.75 21V3Z", stroke: "currentColor", strokeWidth: 1.5 }), /* @__PURE__ */ a.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M3 5.25C1.75736 5.25 0.75 4.24264 0.75 3V21C0.75 22.2426 1.75736 23.25 3 23.25H18.25C18.8023 23.25 19.25 22.8023 19.25 22.25V6.25C19.25 5.69771 18.8023 5.25 18.25 5.25H3ZM13 11L6 11V12.5L13 12.5V11Z", fill: "currentColor" })), "SvgDocsFilled"), Jn = /* @__PURE__ */ s(({
  title: e,
  titleId: t,
  ...n
}) => /* @__PURE__ */ a.createElement("svg", { height: "1em", viewBox: "0 0 20 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-labelledby": t, ...n }, e ? /* @__PURE__ */ a.createElement("title", { id: t }, e) : null, /* @__PURE__ */ a.createElement("path", { d: "M0.75 3C0.75 4.24264 1.75736 5.25 3 5.25H17.25M0.75 3C0.75 1.75736 1.75736 0.75 3 0.75H16.25C16.8023 0.75 17.25 1.19772 17.25 1.75V5.25M0.75 3V21C0.75 22.2426 1.75736 23.25 3 23.25H18.25C18.8023 23.25 19.25 22.8023 19.25 22.25V6.25C19.25 5.69771 18.8023 5.25 18.25 5.25H17.25", stroke: "currentColor", strokeWidth: 1.5 }), /* @__PURE__ */ a.createElement("line", { x1: 13, y1: 11.75, x2: 6, y2: 11.75, stroke: "currentColor", strokeWidth: 1.5 })), "SvgDocs"), Yn = /* @__PURE__ */ s(({
  title: e,
  titleId: t,
  ...n
}) => /* @__PURE__ */ a.createElement("svg", { height: "1em", viewBox: "0 0 12 12", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-labelledby": t, ...n }, e ? /* @__PURE__ */ a.createElement("title", { id: t }, e) : null, /* @__PURE__ */ a.createElement("rect", { x: 5, y: 5, width: 2, height: 2, rx: 1, fill: "currentColor" }), /* @__PURE__ */ a.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M8.5 1.2H9C9.99411 1.2 10.8 2.00589 10.8 3V9C10.8 9.99411 9.99411 10.8 9 10.8H8.5V12H9C10.6569 12 12 10.6569 12 9V3C12 1.34315 10.6569 0 9 0H8.5V1.2ZM3.5 1.2V0H3C1.34315 0 0 1.34315 0 3V9C0 10.6569 1.34315 12 3 12H3.5V10.8H3C2.00589 10.8 1.2 9.99411 1.2 9V3C1.2 2.00589 2.00589 1.2 3 1.2H3.5Z", fill: "currentColor" })), "SvgEnumValue"), Xn = /* @__PURE__ */ s(({
  title: e,
  titleId: t,
  ...n
}) => /* @__PURE__ */ a.createElement("svg", { height: "1em", viewBox: "0 0 12 13", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-labelledby": t, ...n }, e ? /* @__PURE__ */ a.createElement("title", { id: t }, e) : null, /* @__PURE__ */ a.createElement("rect", { x: 0.6, y: 1.1, width: 10.8, height: 10.8, rx: 2.4, stroke: "currentColor", strokeWidth: 1.2 }), /* @__PURE__ */ a.createElement("rect", { x: 5, y: 5.5, width: 2, height: 2, rx: 1, fill: "currentColor" })), "SvgField"), er = /* @__PURE__ */ s(({
  title: e,
  titleId: t,
  ...n
}) => /* @__PURE__ */ a.createElement("svg", { height: "1em", viewBox: "0 0 24 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-labelledby": t, ...n }, e ? /* @__PURE__ */ a.createElement("title", { id: t }, e) : null, /* @__PURE__ */ a.createElement("path", { d: "M1.59375 9.52344L4.87259 12.9944L8.07872 9.41249", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "square" }), /* @__PURE__ */ a.createElement("path", { d: "M13.75 5.25V10.75H18.75", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "square" }), /* @__PURE__ */ a.createElement("path", { d: "M4.95427 11.9332C4.55457 10.0629 4.74441 8.11477 5.49765 6.35686C6.25089 4.59894 7.5305 3.11772 9.16034 2.11709C10.7902 1.11647 12.6901 0.645626 14.5986 0.769388C16.5071 0.893151 18.3303 1.60543 19.8172 2.80818C21.3042 4.01093 22.3818 5.64501 22.9017 7.48548C23.4216 9.32595 23.3582 11.2823 22.7203 13.0853C22.0824 14.8883 20.9013 16.4492 19.3396 17.5532C17.778 18.6572 15.9125 19.25 14 19.25", stroke: "currentColor", strokeWidth: 1.5 })), "SvgHistory"), tr = /* @__PURE__ */ s(({
  title: e,
  titleId: t,
  ...n
}) => /* @__PURE__ */ a.createElement("svg", { height: "1em", viewBox: "0 0 12 12", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-labelledby": t, ...n }, e ? /* @__PURE__ */ a.createElement("title", { id: t }, e) : null, /* @__PURE__ */ a.createElement("circle", { cx: 6, cy: 6, r: 5.4, stroke: "currentColor", strokeWidth: 1.2, strokeDasharray: "4.241025 4.241025", transform: "rotate(22.5)", "transform-origin": "center" }), /* @__PURE__ */ a.createElement("circle", { cx: 6, cy: 6, r: 1, fill: "currentColor" })), "SvgImplements"), nr = /* @__PURE__ */ s(({
  title: e,
  titleId: t,
  ...n
}) => /* @__PURE__ */ a.createElement("svg", { height: "1em", viewBox: "0 0 19 18", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-labelledby": t, ...n }, e ? /* @__PURE__ */ a.createElement("title", { id: t }, e) : null, /* @__PURE__ */ a.createElement("path", { d: "M1.5 14.5653C1.5 15.211 1.75652 15.8303 2.21314 16.2869C2.66975 16.7435 3.28905 17 3.9348 17C4.58054 17 5.19984 16.7435 5.65646 16.2869C6.11307 15.8303 6.36959 15.211 6.36959 14.5653V12.1305H3.9348C3.28905 12.1305 2.66975 12.387 2.21314 12.8437C1.75652 13.3003 1.5 13.9195 1.5 14.5653Z", stroke: "currentColor", strokeWidth: 1.125, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ a.createElement("path", { d: "M3.9348 1.00063C3.28905 1.00063 2.66975 1.25715 2.21314 1.71375C1.75652 2.17035 1.5 2.78964 1.5 3.43537C1.5 4.0811 1.75652 4.70038 2.21314 5.15698C2.66975 5.61358 3.28905 5.8701 3.9348 5.8701H6.36959V3.43537C6.36959 2.78964 6.11307 2.17035 5.65646 1.71375C5.19984 1.25715 4.58054 1.00063 3.9348 1.00063Z", stroke: "currentColor", strokeWidth: 1.125, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ a.createElement("path", { d: "M15.0652 12.1305H12.6304V14.5653C12.6304 15.0468 12.7732 15.5175 13.0407 15.9179C13.3083 16.3183 13.6885 16.6304 14.1334 16.8147C14.5783 16.9989 15.0679 17.0472 15.5402 16.9532C16.0125 16.8593 16.4464 16.6274 16.7869 16.2869C17.1274 15.9464 17.3593 15.5126 17.4532 15.0403C17.5472 14.568 17.4989 14.0784 17.3147 13.6335C17.1304 13.1886 16.8183 12.8084 16.4179 12.5409C16.0175 12.2733 15.5468 12.1305 15.0652 12.1305Z", stroke: "currentColor", strokeWidth: 1.125, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ a.createElement("path", { d: "M12.6318 5.86775H6.36955V12.1285H12.6318V5.86775Z", stroke: "currentColor", strokeWidth: 1.125, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ a.createElement("path", { d: "M17.5 3.43473C17.5 2.789 17.2435 2.16972 16.7869 1.71312C16.3303 1.25652 15.711 1 15.0652 1C14.4195 1 13.8002 1.25652 13.3435 1.71312C12.8869 2.16972 12.6304 2.789 12.6304 3.43473V5.86946H15.0652C15.711 5.86946 16.3303 5.61295 16.7869 5.15635C17.2435 4.69975 17.5 4.08046 17.5 3.43473Z", stroke: "currentColor", strokeWidth: 1.125, strokeLinecap: "round", strokeLinejoin: "round" })), "SvgKeyboardShortcut"), rr = /* @__PURE__ */ s(({
  title: e,
  titleId: t,
  ...n
}) => /* @__PURE__ */ a.createElement("svg", { height: "1em", viewBox: "0 0 13 13", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-labelledby": t, ...n }, e ? /* @__PURE__ */ a.createElement("title", { id: t }, e) : null, /* @__PURE__ */ a.createElement("circle", { cx: 5, cy: 5, r: 4.35, stroke: "currentColor", strokeWidth: 1.3 }), /* @__PURE__ */ a.createElement("line", { x1: 8.45962, y1: 8.54038, x2: 11.7525, y2: 11.8333, stroke: "currentColor", strokeWidth: 1.3 })), "SvgMagnifyingGlass"), or = /* @__PURE__ */ s(({
  title: e,
  titleId: t,
  ...n
}) => /* @__PURE__ */ a.createElement("svg", { height: "1em", viewBox: "-2 -2 22 22", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-labelledby": t, ...n }, e ? /* @__PURE__ */ a.createElement("title", { id: t }, e) : null, /* @__PURE__ */ a.createElement("path", { d: "M17.2492 6V2.9569C17.2492 1.73806 16.2611 0.75 15.0423 0.75L2.9569 0.75C1.73806 0.75 0.75 1.73806 0.75 2.9569L0.75 6", stroke: "currentColor", strokeWidth: 1.5 }), /* @__PURE__ */ a.createElement("path", { d: "M0.749873 12V15.0431C0.749873 16.2619 1.73794 17.25 2.95677 17.25H15.0421C16.261 17.25 17.249 16.2619 17.249 15.0431V12", stroke: "currentColor", strokeWidth: 1.5 }), /* @__PURE__ */ a.createElement("path", { d: "M6 4.5L9 7.5L12 4.5", stroke: "currentColor", strokeWidth: 1.5 }), /* @__PURE__ */ a.createElement("path", { d: "M12 13.5L9 10.5L6 13.5", stroke: "currentColor", strokeWidth: 1.5 })), "SvgMerge"), lr = /* @__PURE__ */ s(({
  title: e,
  titleId: t,
  ...n
}) => /* @__PURE__ */ a.createElement("svg", { height: "1em", viewBox: "0 0 14 14", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-labelledby": t, ...n }, e ? /* @__PURE__ */ a.createElement("title", { id: t }, e) : null, /* @__PURE__ */ a.createElement("path", { d: "M0.75 13.25L0.0554307 12.967C-0.0593528 13.2488 0.00743073 13.5719 0.224488 13.7851C0.441545 13.9983 0.765869 14.0592 1.04549 13.9393L0.75 13.25ZM12.8214 1.83253L12.2911 2.36286L12.2911 2.36286L12.8214 1.83253ZM12.8214 3.90194L13.3517 4.43227L12.8214 3.90194ZM10.0981 1.17859L9.56773 0.648259L10.0981 1.17859ZM12.1675 1.17859L12.6978 0.648258L12.6978 0.648257L12.1675 1.17859ZM2.58049 8.75697L3.27506 9.03994L2.58049 8.75697ZM2.70066 8.57599L3.23099 9.10632L2.70066 8.57599ZM5.2479 11.4195L4.95355 10.7297L5.2479 11.4195ZM5.42036 11.303L4.89003 10.7727L5.42036 11.303ZM4.95355 10.7297C4.08882 11.0987 3.41842 11.362 2.73535 11.6308C2.05146 11.9 1.35588 12.1743 0.454511 12.5607L1.04549 13.9393C1.92476 13.5624 2.60256 13.2951 3.28469 13.0266C3.96762 12.7578 4.65585 12.4876 5.54225 12.1093L4.95355 10.7297ZM1.44457 13.533L3.27506 9.03994L1.88592 8.474L0.0554307 12.967L1.44457 13.533ZM3.23099 9.10632L10.6284 1.70892L9.56773 0.648259L2.17033 8.04566L3.23099 9.10632ZM11.6371 1.70892L12.2911 2.36286L13.3517 1.3022L12.6978 0.648258L11.6371 1.70892ZM12.2911 3.37161L4.89003 10.7727L5.95069 11.8333L13.3517 4.43227L12.2911 3.37161ZM12.2911 2.36286C12.5696 2.64142 12.5696 3.09305 12.2911 3.37161L13.3517 4.43227C14.2161 3.56792 14.2161 2.16654 13.3517 1.3022L12.2911 2.36286ZM10.6284 1.70892C10.9069 1.43036 11.3586 1.43036 11.6371 1.70892L12.6978 0.648257C11.8335 -0.216088 10.4321 -0.216084 9.56773 0.648259L10.6284 1.70892ZM3.27506 9.03994C3.26494 9.06479 3.24996 9.08735 3.23099 9.10632L2.17033 8.04566C2.04793 8.16806 1.95123 8.31369 1.88592 8.474L3.27506 9.03994ZM5.54225 12.1093C5.69431 12.0444 5.83339 11.9506 5.95069 11.8333L4.89003 10.7727C4.90863 10.7541 4.92988 10.7398 4.95355 10.7297L5.54225 12.1093Z", fill: "currentColor" }), /* @__PURE__ */ a.createElement("path", { d: "M11.5 4.5L9.5 2.5", stroke: "currentColor", strokeWidth: 1.4026, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ a.createElement("path", { d: "M5.5 10.5L3.5 8.5", stroke: "currentColor", strokeWidth: 1.4026, strokeLinecap: "round", strokeLinejoin: "round" })), "SvgPen"), ir = /* @__PURE__ */ s(({
  title: e,
  titleId: t,
  ...n
}) => /* @__PURE__ */ a.createElement("svg", { height: "1em", viewBox: "0 0 16 18", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-labelledby": t, ...n }, e ? /* @__PURE__ */ a.createElement("title", { id: t }, e) : null, /* @__PURE__ */ a.createElement("path", { d: "M1.32226e-07 1.6609C7.22332e-08 0.907329 0.801887 0.424528 1.46789 0.777117L15.3306 8.11621C16.0401 8.49182 16.0401 9.50818 15.3306 9.88379L1.46789 17.2229C0.801886 17.5755 1.36076e-06 17.0927 1.30077e-06 16.3391L1.32226e-07 1.6609Z", fill: "currentColor" })), "SvgPlay"), sr = /* @__PURE__ */ s(({
  title: e,
  titleId: t,
  ...n
}) => /* @__PURE__ */ a.createElement("svg", { height: "1em", viewBox: "0 0 10 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-labelledby": t, ...n }, e ? /* @__PURE__ */ a.createElement("title", { id: t }, e) : null, /* @__PURE__ */ a.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M4.25 9.25V13.5H5.75V9.25L10 9.25V7.75L5.75 7.75V3.5H4.25V7.75L0 7.75V9.25L4.25 9.25Z", fill: "currentColor" })), "SvgPlus"), ar = /* @__PURE__ */ s(({
  title: e,
  titleId: t,
  ...n
}) => /* @__PURE__ */ a.createElement("svg", { width: 25, height: 25, viewBox: "0 0 25 25", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-labelledby": t, ...n }, e ? /* @__PURE__ */ a.createElement("title", { id: t }, e) : null, /* @__PURE__ */ a.createElement("path", { d: "M10.2852 24.0745L13.7139 18.0742", stroke: "currentColor", strokeWidth: 1.5625 }), /* @__PURE__ */ a.createElement("path", { d: "M14.5742 24.0749L17.1457 19.7891", stroke: "currentColor", strokeWidth: 1.5625 }), /* @__PURE__ */ a.createElement("path", { d: "M19.4868 24.0735L20.7229 21.7523C21.3259 20.6143 21.5457 19.3122 21.3496 18.0394C21.1535 16.7666 20.5519 15.591 19.6342 14.6874L23.7984 6.87853C24.0123 6.47728 24.0581 6.00748 23.9256 5.57249C23.7932 5.1375 23.4933 4.77294 23.0921 4.55901C22.6908 4.34509 22.221 4.29932 21.7861 4.43178C21.3511 4.56424 20.9865 4.86408 20.7726 5.26533L16.6084 13.0742C15.3474 12.8142 14.0362 12.9683 12.8699 13.5135C11.7035 14.0586 10.7443 14.9658 10.135 16.1L6 24.0735", stroke: "currentColor", strokeWidth: 1.5625 }), /* @__PURE__ */ a.createElement("path", { d: "M4 15L5 13L7 12L5 11L4 9L3 11L1 12L3 13L4 15Z", stroke: "currentColor", strokeWidth: 1.5625, strokeLinejoin: "round" }), /* @__PURE__ */ a.createElement("path", { d: "M11.5 8L12.6662 5.6662L15 4.5L12.6662 3.3338L11.5 1L10.3338 3.3338L8 4.5L10.3338 5.6662L11.5 8Z", stroke: "currentColor", strokeWidth: 1.5625, strokeLinejoin: "round" })), "SvgPrettify"), cr = /* @__PURE__ */ s(({
  title: e,
  titleId: t,
  ...n
}) => /* @__PURE__ */ a.createElement("svg", { height: "1em", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-labelledby": t, ...n }, e ? /* @__PURE__ */ a.createElement("title", { id: t }, e) : null, /* @__PURE__ */ a.createElement("path", { d: "M4.75 9.25H1.25V12.75", stroke: "currentColor", strokeWidth: 1, strokeLinecap: "square" }), /* @__PURE__ */ a.createElement("path", { d: "M11.25 6.75H14.75V3.25", stroke: "currentColor", strokeWidth: 1, strokeLinecap: "square" }), /* @__PURE__ */ a.createElement("path", { d: "M14.1036 6.65539C13.8 5.27698 13.0387 4.04193 11.9437 3.15131C10.8487 2.26069 9.48447 1.76694 8.0731 1.75043C6.66173 1.73392 5.28633 2.19563 4.17079 3.0604C3.05526 3.92516 2.26529 5.14206 1.92947 6.513", stroke: "currentColor", strokeWidth: 1 }), /* @__PURE__ */ a.createElement("path", { d: "M1.89635 9.34461C2.20001 10.723 2.96131 11.9581 4.05631 12.8487C5.15131 13.7393 6.51553 14.2331 7.9269 14.2496C9.33827 14.2661 10.7137 13.8044 11.8292 12.9396C12.9447 12.0748 13.7347 10.8579 14.0705 9.487", stroke: "currentColor", strokeWidth: 1 })), "SvgReload"), ur = /* @__PURE__ */ s(({
  title: e,
  titleId: t,
  ...n
}) => /* @__PURE__ */ a.createElement("svg", { height: "1em", viewBox: "0 0 13 13", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-labelledby": t, ...n }, e ? /* @__PURE__ */ a.createElement("title", { id: t }, e) : null, /* @__PURE__ */ a.createElement("rect", { x: 0.6, y: 0.6, width: 11.8, height: 11.8, rx: 5.9, stroke: "currentColor", strokeWidth: 1.2 }), /* @__PURE__ */ a.createElement("path", { d: "M4.25 7.5C4.25 6 5.75 5 6.5 6.5C7.25 8 8.75 7 8.75 5.5", stroke: "currentColor", strokeWidth: 1.2 })), "SvgRootType"), dr = /* @__PURE__ */ s(({
  title: e,
  titleId: t,
  ...n
}) => /* @__PURE__ */ a.createElement("svg", { height: "1em", viewBox: "0 0 21 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-labelledby": t, ...n }, e ? /* @__PURE__ */ a.createElement("title", { id: t }, e) : null, /* @__PURE__ */ a.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M9.29186 1.92702C9.06924 1.82745 8.87014 1.68202 8.70757 1.50024L7.86631 0.574931C7.62496 0.309957 7.30773 0.12592 6.95791 0.0479385C6.60809 -0.0300431 6.24274 0.00182978 5.91171 0.139208C5.58068 0.276585 5.3001 0.512774 5.10828 0.815537C4.91645 1.1183 4.82272 1.47288 4.83989 1.83089L4.90388 3.08019C4.91612 3.32348 4.87721 3.56662 4.78968 3.79394C4.70215 4.02126 4.56794 4.2277 4.39571 4.39994C4.22347 4.57219 4.01704 4.7064 3.78974 4.79394C3.56243 4.88147 3.3193 4.92038 3.07603 4.90814L1.8308 4.84414C1.47162 4.82563 1.11553 4.91881 0.811445 5.11086C0.507359 5.30292 0.270203 5.58443 0.132561 5.91671C-0.00508149 6.249 -0.0364554 6.61576 0.0427496 6.9666C0.121955 7.31744 0.307852 7.63514 0.5749 7.87606L1.50016 8.71204C1.68193 8.87461 1.82735 9.07373 1.92692 9.29636C2.02648 9.51898 2.07794 9.76012 2.07794 10.004C2.07794 10.2479 2.02648 10.489 1.92692 10.7116C1.82735 10.9343 1.68193 11.1334 1.50016 11.296L0.5749 12.1319C0.309856 12.3729 0.125575 12.6898 0.0471809 13.0393C-0.0312128 13.3888 9.64098e-05 13.754 0.13684 14.0851C0.273583 14.4162 0.509106 14.6971 0.811296 14.8894C1.11349 15.0817 1.46764 15.1762 1.82546 15.1599L3.0707 15.0959C3.31397 15.0836 3.5571 15.1225 3.7844 15.2101C4.01171 15.2976 4.21814 15.4318 4.39037 15.6041C4.56261 15.7763 4.69682 15.9827 4.78435 16.2101C4.87188 16.4374 4.91078 16.6805 4.89855 16.9238L4.83455 18.1691C4.81605 18.5283 4.90921 18.8844 5.10126 19.1885C5.2933 19.4926 5.5748 19.7298 5.90707 19.8674C6.23934 20.0051 6.60608 20.0365 6.9569 19.9572C7.30772 19.878 7.6254 19.6921 7.86631 19.4251L8.7129 18.4998C8.87547 18.318 9.07458 18.1725 9.29719 18.073C9.51981 17.9734 9.76093 17.9219 10.0048 17.9219C10.2487 17.9219 10.4898 17.9734 10.7124 18.073C10.935 18.1725 11.1341 18.318 11.2967 18.4998L12.1326 19.4251C12.3735 19.6921 12.6912 19.878 13.042 19.9572C13.3929 20.0365 13.7596 20.0051 14.0919 19.8674C14.4241 19.7298 14.7056 19.4926 14.8977 19.1885C15.0897 18.8844 15.1829 18.5283 15.1644 18.1691L15.1004 16.9238C15.0882 16.6805 15.1271 16.4374 15.2146 16.2101C15.3021 15.9827 15.4363 15.7763 15.6086 15.6041C15.7808 15.4318 15.9872 15.2976 16.2145 15.2101C16.4418 15.1225 16.685 15.0836 16.9282 15.0959L18.1735 15.1599C18.5326 15.1784 18.8887 15.0852 19.1928 14.8931C19.4969 14.7011 19.7341 14.4196 19.8717 14.0873C20.0093 13.755 20.0407 13.3882 19.9615 13.0374C19.8823 12.6866 19.6964 12.3689 19.4294 12.1279L18.5041 11.292C18.3223 11.1294 18.1769 10.9303 18.0774 10.7076C17.9778 10.485 17.9263 10.2439 17.9263 10C17.9263 9.75612 17.9778 9.51499 18.0774 9.29236C18.1769 9.06973 18.3223 8.87062 18.5041 8.70804L19.4294 7.87206C19.6964 7.63114 19.8823 7.31344 19.9615 6.9626C20.0407 6.61176 20.0093 6.245 19.8717 5.91271C19.7341 5.58043 19.4969 5.29892 19.1928 5.10686C18.8887 4.91481 18.5326 4.82163 18.1735 4.84014L16.9282 4.90414C16.685 4.91638 16.4418 4.87747 16.2145 4.78994C15.9872 4.7024 15.7808 4.56818 15.6086 4.39594C15.4363 4.2237 15.3021 4.01726 15.2146 3.78994C15.1271 3.56262 15.0882 3.31948 15.1004 3.07619L15.1644 1.83089C15.1829 1.4717 15.0897 1.11559 14.8977 0.811487C14.7056 0.507385 14.4241 0.270217 14.0919 0.132568C13.7596 -0.00508182 13.3929 -0.0364573 13.042 0.0427519C12.6912 0.121961 12.3735 0.307869 12.1326 0.574931L11.2914 1.50024C11.1288 1.68202 10.9297 1.82745 10.7071 1.92702C10.4845 2.02659 10.2433 2.07805 9.99947 2.07805C9.7556 2.07805 9.51448 2.02659 9.29186 1.92702ZM14.3745 10C14.3745 12.4162 12.4159 14.375 9.99977 14.375C7.58365 14.375 5.625 12.4162 5.625 10C5.625 7.58375 7.58365 5.625 9.99977 5.625C12.4159 5.625 14.3745 7.58375 14.3745 10Z", fill: "currentColor" })), "SvgSettings"), hr = /* @__PURE__ */ s(({
  title: e,
  titleId: t,
  ...n
}) => /* @__PURE__ */ a.createElement("svg", { height: "1em", viewBox: "0 0 14 14", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-labelledby": t, ...n }, e ? /* @__PURE__ */ a.createElement("title", { id: t }, e) : null, /* @__PURE__ */ a.createElement("path", { d: "M6.5782 1.07092C6.71096 0.643026 7.28904 0.643027 7.4218 1.07092L8.59318 4.84622C8.65255 5.03758 8.82284 5.16714 9.01498 5.16714L12.8056 5.16714C13.2353 5.16714 13.4139 5.74287 13.0663 6.00732L9.99962 8.34058C9.84418 8.45885 9.77913 8.66848 9.83851 8.85984L11.0099 12.6351C11.1426 13.063 10.675 13.4189 10.3274 13.1544L7.26069 10.8211C7.10524 10.7029 6.89476 10.7029 6.73931 10.8211L3.6726 13.1544C3.32502 13.4189 2.85735 13.063 2.99012 12.6351L4.16149 8.85984C4.22087 8.66848 4.15582 8.45885 4.00038 8.34058L0.933671 6.00732C0.586087 5.74287 0.764722 5.16714 1.19436 5.16714L4.98502 5.16714C5.17716 5.16714 5.34745 5.03758 5.40682 4.84622L6.5782 1.07092Z", fill: "currentColor", stroke: "currentColor" })), "SvgStarFilled"), mr = /* @__PURE__ */ s(({
  title: e,
  titleId: t,
  ...n
}) => /* @__PURE__ */ a.createElement("svg", { height: "1em", viewBox: "0 0 14 14", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-labelledby": t, ...n }, e ? /* @__PURE__ */ a.createElement("title", { id: t }, e) : null, /* @__PURE__ */ a.createElement("path", { d: "M6.5782 1.07092C6.71096 0.643026 7.28904 0.643027 7.4218 1.07092L8.59318 4.84622C8.65255 5.03758 8.82284 5.16714 9.01498 5.16714L12.8056 5.16714C13.2353 5.16714 13.4139 5.74287 13.0663 6.00732L9.99962 8.34058C9.84418 8.45885 9.77913 8.66848 9.83851 8.85984L11.0099 12.6351C11.1426 13.063 10.675 13.4189 10.3274 13.1544L7.26069 10.8211C7.10524 10.7029 6.89476 10.7029 6.73931 10.8211L3.6726 13.1544C3.32502 13.4189 2.85735 13.063 2.99012 12.6351L4.16149 8.85984C4.22087 8.66848 4.15582 8.45885 4.00038 8.34058L0.933671 6.00732C0.586087 5.74287 0.764722 5.16714 1.19436 5.16714L4.98502 5.16714C5.17716 5.16714 5.34745 5.03758 5.40682 4.84622L6.5782 1.07092Z", stroke: "currentColor", strokeWidth: 1.5 })), "SvgStar"), pr = /* @__PURE__ */ s(({
  title: e,
  titleId: t,
  ...n
}) => /* @__PURE__ */ a.createElement("svg", { height: "1em", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-labelledby": t, ...n }, e ? /* @__PURE__ */ a.createElement("title", { id: t }, e) : null, /* @__PURE__ */ a.createElement("rect", { width: 16, height: 16, rx: 2, fill: "currentColor" })), "SvgStop"), fr = /* @__PURE__ */ s(({
  title: e,
  titleId: t,
  ...n
}) => /* @__PURE__ */ a.createElement("svg", { height: "1em", viewBox: "0 0 13 13", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-labelledby": t, ...n }, e ? /* @__PURE__ */ a.createElement("title", { id: t }, e) : null, /* @__PURE__ */ a.createElement("rect", { x: 0.6, y: 0.6, width: 11.8, height: 11.8, rx: 5.9, stroke: "currentColor", strokeWidth: 1.2 }), /* @__PURE__ */ a.createElement("rect", { x: 5.5, y: 5.5, width: 2, height: 2, rx: 1, fill: "currentColor" })), "SvgType"), gr = q(Bn), Uo = q(Wn), Cr = q($n), Ko = q(_n), st = q(Zn), Jo = q(Gn), yr = q(Qn), vr = q(jn), br = q(zn), wr = q(Un), xr = q(Kn, "filled docs icon"), Er = q(Jn), Lr = q(Yn), Sr = q(Xn), Nr = q(er), kr = q(tr), Yo = q(nr), Tr = q(rr), Xo = q(or), Mr = q(lr), Vr = q(ir), el = q(sr), tl = q(ar), nl = q(cr), Rr = q(ur), rl = q(dr), Hr = q(hr, "filled star icon"), Ar = q(mr), Pr = q(pr), ke = q(fr);
function q(e, t = e.name.replace("Svg", "").replaceAll(/([A-Z])/g, " $1").trimStart().toLowerCase() + " icon") {
  return e.defaultProps = { title: t }, e;
}
s(q, "generateIcon");
const X = J((e, t) => /* @__PURE__ */ o(
  "button",
  {
    ...e,
    ref: t,
    className: G("graphiql-un-styled", e.className)
  }
));
X.displayName = "UnStyledButton";
const Fe = J((e, t) => /* @__PURE__ */ o(
  "button",
  {
    ...e,
    ref: t,
    className: G(
      "graphiql-button",
      {
        success: "graphiql-button-success",
        error: "graphiql-button-error"
      }[e.state],
      e.className
    )
  }
));
Fe.displayName = "Button";
const qr = J((e, t) => /* @__PURE__ */ o(
  "div",
  {
    ...e,
    ref: t,
    className: G("graphiql-button-group", e.className)
  }
));
qr.displayName = "ButtonGroup";
const Le = /* @__PURE__ */ s((e, t) => Object.entries(t).reduce((n, [r, l]) => (n[r] = l, n), e), "createComponentGroup");
const At = J((e, t) => /* @__PURE__ */ o(oe.Close, { asChild: !0, children: /* @__PURE__ */ T(
  X,
  {
    ...e,
    ref: t,
    type: "button",
    className: G("graphiql-dialog-close", e.className),
    children: [
      /* @__PURE__ */ o(Hn, { children: "Close dialog" }),
      /* @__PURE__ */ o(st, {})
    ]
  }
) }));
At.displayName = "Dialog.Close";
function Dr({
  children: e,
  ...t
}) {
  return /* @__PURE__ */ o(oe.Root, { ...t, children: /* @__PURE__ */ T(oe.Portal, { children: [
    /* @__PURE__ */ o(oe.Overlay, { className: "graphiql-dialog-overlay" }),
    /* @__PURE__ */ o(oe.Content, { className: "graphiql-dialog", children: e })
  ] }) });
}
s(Dr, "DialogRoot");
const ol = Le(Dr, {
  Close: At,
  Title: oe.Title,
  Trigger: oe.Trigger,
  Description: oe.Description
});
const Pt = J(
  (e, t) => /* @__PURE__ */ o(An, { asChild: !0, children: /* @__PURE__ */ o(
    "button",
    {
      ...e,
      ref: t,
      className: G("graphiql-un-styled", e.className)
    }
  ) })
);
Pt.displayName = "DropdownMenuButton";
function Ir({
  children: e,
  align: t = "start",
  sideOffset: n = 5,
  className: r,
  ...l
}) {
  return /* @__PURE__ */ o(qn, { children: /* @__PURE__ */ o(
    Dn,
    {
      align: t,
      sideOffset: n,
      className: G("graphiql-dropdown-content", r),
      ...l,
      children: e
    }
  ) });
}
s(Ir, "Content");
const Or = /* @__PURE__ */ s(({ className: e, children: t, ...n }) => /* @__PURE__ */ o(In, { className: G("graphiql-dropdown-item", e), ...n, children: t }), "Item"), le = Le(Pn, {
  Button: Pt,
  Item: Or,
  Content: Ir
}), Ae = new On({
  breaks: !0,
  linkify: !0
});
const ne = J(({ children: e, onlyShowFirstChild: t, type: n, ...r }, l) => /* @__PURE__ */ o(
  "div",
  {
    ...r,
    ref: l,
    className: G(
      `graphiql-markdown-${n}`,
      t && "graphiql-markdown-preview",
      r.className
    ),
    dangerouslySetInnerHTML: { __html: Ae.render(e) }
  }
));
ne.displayName = "MarkdownContent";
const qt = J(
  (e, t) => /* @__PURE__ */ o(
    "div",
    {
      ...e,
      ref: t,
      className: G("graphiql-spinner", e.className)
    }
  )
);
qt.displayName = "Spinner";
function Fr({
  children: e,
  align: t = "start",
  side: n = "bottom",
  sideOffset: r = 5,
  label: l
}) {
  return /* @__PURE__ */ T(ge.Root, { children: [
    /* @__PURE__ */ o(ge.Trigger, { asChild: !0, children: e }),
    /* @__PURE__ */ o(ge.Portal, { children: /* @__PURE__ */ o(
      ge.Content,
      {
        className: "graphiql-tooltip",
        align: t,
        side: n,
        sideOffset: r,
        children: l
      }
    ) })
  ] });
}
s(Fr, "TooltipRoot");
const ae = Le(Fr, {
  Provider: ge.Provider
});
const Dt = J(
  ({ isActive: e, value: t, children: n, className: r, ...l }, c) => /* @__PURE__ */ o(
    Rt.Item,
    {
      ...l,
      ref: c,
      value: t,
      "aria-selected": e ? "true" : void 0,
      role: "tab",
      className: G(
        "graphiql-tab",
        e && "graphiql-tab-active",
        r
      ),
      children: n
    }
  )
);
Dt.displayName = "Tab";
const It = J((e, t) => /* @__PURE__ */ o(
  X,
  {
    ...e,
    ref: t,
    type: "button",
    className: G("graphiql-tab-button", e.className),
    children: e.children
  }
));
It.displayName = "Tab.Button";
const Ot = J(
  (e, t) => /* @__PURE__ */ o(ae, { label: "Close Tab", children: /* @__PURE__ */ o(
    X,
    {
      "aria-label": "Close Tab",
      ...e,
      ref: t,
      type: "button",
      className: G("graphiql-tab-close", e.className),
      children: /* @__PURE__ */ o(st, {})
    }
  ) })
);
Ot.displayName = "Tab.Close";
const ll = Le(Dt, {
  Button: It,
  Close: Ot
}), Br = J(
  ({ values: e, onReorder: t, children: n, className: r, ...l }, c) => /* @__PURE__ */ o(
    Rt.Group,
    {
      ...l,
      ref: c,
      values: e,
      onReorder: t,
      axis: "x",
      role: "tablist",
      className: G("graphiql-tabs", r),
      children: n
    }
  )
);
Br.displayName = "Tabs";
const Ft = ce("HistoryContext");
function Wr(e) {
  var p;
  const t = de(), n = $(
    new xn(
      // Fall back to a noop storage when the StorageContext is empty
      t || new Je(null),
      e.maxHistoryLength || $r
    )
  ), [r, l] = I(((p = n.current) == null ? void 0 : p.queries) || []), c = M(
    ({ query: m, variables: y, headers: u, operationName: g }) => {
      var C;
      (C = n.current) == null || C.updateHistory(
        m,
        y,
        u,
        g
      ), l(n.current.queries);
    },
    []
  ), i = M(
    ({ query: m, variables: y, headers: u, operationName: g, label: C, favorite: d }) => {
      n.current.editLabel(
        m,
        y,
        u,
        g,
        C,
        d
      ), l(n.current.queries);
    },
    []
  ), h = M(
    ({ query: m, variables: y, headers: u, operationName: g, label: C, favorite: d }) => {
      n.current.toggleFavorite(
        m,
        y,
        u,
        g,
        C,
        d
      ), l(n.current.queries);
    },
    []
  ), f = Q(
    () => ({ addToHistory: c, editLabel: i, items: r, toggleFavorite: h }),
    [c, i, r, h]
  );
  return /* @__PURE__ */ o(Ft.Provider, { value: f, children: e.children });
}
s(Wr, "HistoryContextProvider");
const Be = ue(Ft), $r = 20;
function _r() {
  const { items: e } = Be({ nonNull: !0 }), t = e.slice().reverse();
  return /* @__PURE__ */ T("section", { "aria-label": "History", className: "graphiql-history", children: [
    /* @__PURE__ */ o("div", { className: "graphiql-history-header", children: "History" }),
    /* @__PURE__ */ o("ul", { className: "graphiql-history-items", children: t.map((n, r) => /* @__PURE__ */ T(hn, { children: [
      /* @__PURE__ */ o(Xe, { item: n }),
      n.favorite && t[r + 1] && !t[r + 1].favorite ? /* @__PURE__ */ o("div", { className: "graphiql-history-item-spacer" }) : null
    ] }, `${r}:${n.label || n.query}`)) })
  ] });
}
s(_r, "History");
function Xe(e) {
  const { editLabel: t, toggleFavorite: n } = Be({
    nonNull: !0,
    caller: Xe
  }), { headerEditor: r, queryEditor: l, variableEditor: c } = j({
    nonNull: !0,
    caller: Xe
  }), i = $(null), h = $(null), [f, p] = I(!1);
  P(() => {
    var b;
    f && ((b = i.current) == null || b.focus());
  }, [f]);
  const m = e.item.label || e.item.operationName || Zr(e.item.query), y = M(() => {
    var b;
    p(!1), t({ ...e.item, label: (b = i.current) == null ? void 0 : b.value });
  }, [t, e.item]), u = M(() => {
    p(!1);
  }, []), g = M(
    (b) => {
      b.stopPropagation(), p(!0);
    },
    []
  ), C = M(() => {
    const { query: b, variables: N, headers: L } = e.item;
    l == null || l.setValue(b ?? ""), c == null || c.setValue(N ?? ""), r == null || r.setValue(L ?? "");
  }, [e.item, l, c, r]), d = M(
    (b) => {
      b.stopPropagation(), n(e.item);
    },
    [e.item, n]
  );
  return /* @__PURE__ */ o("li", { className: G("graphiql-history-item", f && "editable"), children: f ? /* @__PURE__ */ T(z, { children: [
    /* @__PURE__ */ o(
      "input",
      {
        type: "text",
        defaultValue: e.item.label,
        ref: i,
        onKeyDown: (b) => {
          b.key === "Esc" ? p(!1) : b.key === "Enter" && (p(!1), t({ ...e.item, label: b.currentTarget.value }));
        },
        placeholder: "Type a label"
      }
    ),
    /* @__PURE__ */ o(X, { type: "button", ref: h, onClick: y, children: "Save" }),
    /* @__PURE__ */ o(X, { type: "button", ref: h, onClick: u, children: /* @__PURE__ */ o(st, {}) })
  ] }) : /* @__PURE__ */ T(z, { children: [
    /* @__PURE__ */ o(
      X,
      {
        type: "button",
        className: "graphiql-history-item-label",
        onClick: C,
        children: m
      }
    ),
    /* @__PURE__ */ o(ae, { label: "Edit label", children: /* @__PURE__ */ o(
      X,
      {
        type: "button",
        className: "graphiql-history-item-action",
        onClick: g,
        "aria-label": "Edit label",
        children: /* @__PURE__ */ o(Mr, { "aria-hidden": "true" })
      }
    ) }),
    /* @__PURE__ */ o(
      ae,
      {
        label: e.item.favorite ? "Remove favorite" : "Add favorite",
        children: /* @__PURE__ */ o(
          X,
          {
            type: "button",
            className: "graphiql-history-item-action",
            onClick: d,
            "aria-label": e.item.favorite ? "Remove favorite" : "Add favorite",
            children: e.item.favorite ? /* @__PURE__ */ o(Hr, { "aria-hidden": "true" }) : /* @__PURE__ */ o(Ar, { "aria-hidden": "true" })
          }
        )
      }
    )
  ] }) });
}
s(Xe, "HistoryItem");
function Zr(e) {
  return e == null ? void 0 : e.split(`
`).map((t) => t.replace(/#(.*)/, "")).join(" ").replaceAll("{", " { ").replaceAll("}", " } ").replaceAll(/[\s]{2,}/g, " ");
}
s(Zr, "formatQuery");
const Bt = ce("ExecutionContext");
function et({
  fetcher: e,
  getDefaultFieldNames: t,
  children: n,
  operationName: r
}) {
  if (!e)
    throw new TypeError(
      "The `ExecutionContextProvider` component requires a `fetcher` function to be passed as prop."
    );
  const {
    externalFragments: l,
    headerEditor: c,
    queryEditor: i,
    responseEditor: h,
    variableEditor: f,
    updateActiveTabValues: p
  } = j({ nonNull: !0, caller: et }), m = Be(), y = ot({
    getDefaultFieldNames: t,
    caller: et
  }), [u, g] = I(!1), [C, d] = I(null), b = $(0), N = M(() => {
    C == null || C.unsubscribe(), g(!1), d(null);
  }, [C]), L = M(async () => {
    if (!i || !h)
      return;
    if (C) {
      N();
      return;
    }
    const V = /* @__PURE__ */ s((k) => {
      h.setValue(k), p({ response: k });
    }, "setResponse");
    b.current += 1;
    const B = b.current;
    let _ = y() || i.getValue();
    const D = f == null ? void 0 : f.getValue();
    let O;
    try {
      O = gt({
        json: D,
        errorMessageParse: "Variables are invalid JSON",
        errorMessageType: "Variables are not a JSON object."
      });
    } catch (k) {
      V(k instanceof Error ? k.message : `${k}`);
      return;
    }
    const W = c == null ? void 0 : c.getValue();
    let F;
    try {
      F = gt({
        json: W,
        errorMessageParse: "Headers are invalid JSON",
        errorMessageType: "Headers are not a JSON object."
      });
    } catch (k) {
      V(k instanceof Error ? k.message : `${k}`);
      return;
    }
    if (l) {
      const k = i.documentAST ? Tn(
        i.documentAST,
        l
      ) : [];
      k.length > 0 && (_ += `
` + k.map((H) => Ie(H)).join(`
`));
    }
    V(""), g(!0);
    const A = r ?? i.operationName ?? void 0;
    m == null || m.addToHistory({
      query: _,
      variables: D,
      headers: W,
      operationName: A
    });
    try {
      let k = { data: {} };
      const H = /* @__PURE__ */ s((v) => {
        if (B !== b.current)
          return;
        let S = Array.isArray(v) ? v : !1;
        if (!S && typeof v == "object" && v !== null && "hasNext" in v && (S = [v]), S) {
          const R = {
            data: k.data
          }, U = [
            ...(k == null ? void 0 : k.errors) || [],
            ...S.flatMap((Y) => Y.errors).filter(Boolean)
          ];
          U.length && (R.errors = U);
          for (const Y of S) {
            const { path: dt, data: Ne, errors: Ao, ...an } = Y;
            if (dt) {
              if (!Ne)
                throw new Error(
                  `Expected part to contain a data property, but got ${Y}`
                );
              Vn(R.data, dt, Ne, { merge: !0 });
            } else
              Ne && (R.data = Ne);
            k = {
              ...R,
              ...an
            };
          }
          g(!1), V(Ye(k));
        } else {
          const R = Ye(v);
          g(!1), V(R);
        }
      }, "handleResponse"), E = e(
        {
          query: _,
          variables: O,
          operationName: A
        },
        {
          headers: F ?? void 0,
          documentAST: i.documentAST ?? void 0
        }
      ), Z = await Promise.resolve(E);
      if (En(Z))
        d(
          Z.subscribe({
            next(v) {
              H(v);
            },
            error(v) {
              g(!1), v && V(ye(v)), d(null);
            },
            complete() {
              g(!1), d(null);
            }
          })
        );
      else if (Ln(Z)) {
        d({
          unsubscribe: () => {
            var v, S;
            return (S = (v = Z[Symbol.asyncIterator]()).return) == null ? void 0 : S.call(v);
          }
        });
        for await (const v of Z)
          H(v);
        g(!1), d(null);
      } else
        H(Z);
    } catch (k) {
      g(!1), V(ye(k)), d(null);
    }
  }, [
    y,
    l,
    e,
    c,
    m,
    r,
    i,
    h,
    N,
    C,
    p,
    f
  ]), x = !!C, w = Q(
    () => ({
      isFetching: u,
      isSubscribed: x,
      operationName: r ?? null,
      run: L,
      stop: N
    }),
    [u, x, r, L, N]
  );
  return /* @__PURE__ */ o(Bt.Provider, { value: w, children: n });
}
s(et, "ExecutionContextProvider");
const We = ue(Bt);
function gt({
  json: e,
  errorMessageParse: t,
  errorMessageType: n
}) {
  let r;
  try {
    r = e && e.trim() !== "" ? JSON.parse(e) : void 0;
  } catch (c) {
    throw new Error(
      `${t}: ${c instanceof Error ? c.message : c}.`
    );
  }
  const l = typeof r == "object" && r !== null && !Array.isArray(r);
  if (r !== void 0 && !l)
    throw new Error(n);
  return r;
}
s(gt, "tryParseJsonObject");
const $e = "graphiql", _e = "sublime";
let Wt = !1;
typeof window == "object" && (Wt = window.navigator.platform.toLowerCase().indexOf("mac") === 0);
const Ze = {
  // Persistent search box in Query Editor
  [Wt ? "Cmd-F" : "Ctrl-F"]: "findPersistent",
  "Cmd-G": "findPersistent",
  "Ctrl-G": "findPersistent",
  // Editor improvements
  "Ctrl-Left": "goSubwordLeft",
  "Ctrl-Right": "goSubwordRight",
  "Alt-Left": "goGroupLeft",
  "Alt-Right": "goGroupRight"
};
async function Se(e, t) {
  const n = await import("./codemirror.es.js").then((r) => r.c).then(
    (r) => (
      // Depending on bundler and settings the dynamic import either returns a
      // function (e.g. parcel) or an object containing a `default` property
      typeof r == "function" ? r : r.default
    )
  );
  return await Promise.all(
    (t == null ? void 0 : t.useCommonAddons) === !1 ? e : [
      import("./show-hint.es.js").then((r) => r.s),
      import("./matchbrackets.es.js").then((r) => r.m),
      import("./closebrackets.es.js").then((r) => r.c),
      import("./brace-fold.es.js").then((r) => r.b),
      import("./foldgutter.es.js").then((r) => r.f),
      import("./lint.es.js").then((r) => r.l),
      import("./searchcursor.es.js").then((r) => r.s),
      import("./jump-to-line.es.js").then((r) => r.j),
      import("./dialog.es.js").then((r) => r.d),
      // @ts-expect-error
      import("./sublime.es.js").then((r) => r.s),
      ...e
    ]
  ), n;
}
s(Se, "importCodeMirror");
const Gr = /* @__PURE__ */ s((e) => e ? Ie(e) : "", "printDefault");
function $t({ field: e }) {
  if (!("defaultValue" in e) || e.defaultValue === void 0)
    return null;
  const t = mn(e.defaultValue, e.type);
  return t ? /* @__PURE__ */ T(z, { children: [
    " = ",
    /* @__PURE__ */ o("span", { className: "graphiql-doc-explorer-default-value", children: Gr(t) })
  ] }) : null;
}
s($t, "DefaultValue");
const _t = ce("SchemaContext");
function Zt(e) {
  if (!e.fetcher)
    throw new TypeError(
      "The `SchemaContextProvider` component requires a `fetcher` function to be passed as prop."
    );
  const { initialHeaders: t, headerEditor: n } = j({
    nonNull: !0,
    caller: Zt
  }), [r, l] = I(), [c, i] = I(!1), [h, f] = I(null), p = $(0);
  P(() => {
    l(
      ht(e.schema) || e.schema === null || e.schema === void 0 ? e.schema : void 0
    ), p.current++;
  }, [e.schema]);
  const m = $(t);
  P(() => {
    n && (m.current = n.getValue());
  });
  const {
    introspectionQuery: y,
    introspectionQueryName: u,
    introspectionQuerySansSubscriptions: g
  } = Qr({
    inputValueDeprecation: e.inputValueDeprecation,
    introspectionQueryName: e.introspectionQueryName,
    schemaDescription: e.schemaDescription
  }), { fetcher: C, onSchemaChange: d, dangerouslyAssumeSchemaIsValid: b, children: N } = e, L = M(() => {
    if (ht(e.schema) || e.schema === null)
      return;
    const V = ++p.current, B = e.schema;
    async function _() {
      if (B)
        return B;
      const D = jr(m.current);
      if (!D.isValidJSON) {
        f("Introspection failed as headers are invalid.");
        return;
      }
      const O = D.headers ? { headers: D.headers } : {}, W = mt(
        C(
          {
            query: y,
            operationName: u
          },
          O
        )
      );
      if (!pt(W)) {
        f("Fetcher did not return a Promise for introspection.");
        return;
      }
      i(!0), f(null);
      let F = await W;
      if (typeof F != "object" || F === null || !("data" in F)) {
        const k = mt(
          C(
            {
              query: g,
              operationName: u
            },
            O
          )
        );
        if (!pt(k))
          throw new Error(
            "Fetcher did not return a Promise for introspection."
          );
        F = await k;
      }
      if (i(!1), F != null && F.data && "__schema" in F.data)
        return F.data;
      const A = typeof F == "string" ? F : Ye(F);
      f(A);
    }
    s(_, "fetchIntrospectionData"), _().then((D) => {
      if (!(V !== p.current || !D))
        try {
          const O = pn(D);
          l(O), d == null || d(O);
        } catch (O) {
          f(ye(O));
        }
    }).catch((D) => {
      V === p.current && (f(ye(D)), i(!1));
    });
  }, [
    C,
    u,
    y,
    g,
    d,
    e.schema
  ]);
  P(() => {
    L();
  }, [L]), P(() => {
    function V(B) {
      B.ctrlKey && B.key === "R" && L();
    }
    return s(V, "triggerIntrospection"), window.addEventListener("keydown", V), () => window.removeEventListener("keydown", V);
  });
  const x = Q(() => !r || b ? [] : fn(r), [r, b]), w = Q(
    () => ({
      fetchError: h,
      introspect: L,
      isFetching: c,
      schema: r,
      validationErrors: x
    }),
    [h, L, c, r, x]
  );
  return /* @__PURE__ */ o(_t.Provider, { value: w, children: N });
}
s(Zt, "SchemaContextProvider");
const re = ue(_t);
function Qr({
  inputValueDeprecation: e,
  introspectionQueryName: t,
  schemaDescription: n
}) {
  return Q(() => {
    const r = t || "IntrospectionQuery";
    let l = gn({
      inputValueDeprecation: e,
      schemaDescription: n
    });
    t && (l = l.replace("query IntrospectionQuery", `query ${r}`));
    const c = l.replace(
      "subscriptionType { name }",
      ""
    );
    return {
      introspectionQueryName: r,
      introspectionQuery: l,
      introspectionQuerySansSubscriptions: c
    };
  }, [e, t, n]);
}
s(Qr, "useIntrospectionQuery");
function jr(e) {
  let t = null, n = !0;
  try {
    e && (t = JSON.parse(e));
  } catch {
    n = !1;
  }
  return { headers: t, isValidJSON: n };
}
s(jr, "parseHeaderString");
const Te = { name: "Docs" }, Gt = ce("ExplorerContext");
function Qt(e) {
  const { schema: t, validationErrors: n } = re({
    nonNull: !0,
    caller: Qt
  }), [r, l] = I([
    Te
  ]), c = M((p) => {
    l((m) => m.at(-1).def === p.def ? (
      // Avoid pushing duplicate items
      m
    ) : [...m, p]);
  }, []), i = M(() => {
    l(
      (p) => p.length > 1 ? p.slice(0, -1) : p
    );
  }, []), h = M(() => {
    l(
      (p) => p.length === 1 ? p : [Te]
    );
  }, []);
  P(() => {
    t == null || n.length > 0 ? h() : l((p) => {
      if (p.length === 1)
        return p;
      const m = [Te];
      let y = null;
      for (const u of p)
        if (u !== Te)
          if (u.def)
            if (Nt(u.def)) {
              const g = t.getType(u.def.name);
              if (g)
                m.push({
                  name: u.name,
                  def: g
                }), y = g;
              else
                break;
            } else {
              if (y === null)
                break;
              if (xe(y) || Oe(y)) {
                const g = y.getFields()[u.name];
                if (g)
                  m.push({
                    name: u.name,
                    def: g
                  });
                else
                  break;
              } else {
                if (Cn(y) || kt(y) || Ee(y) || yn(y))
                  break;
                {
                  const g = y;
                  if (g.args.find((d) => d.name === u.name))
                    m.push({
                      name: u.name,
                      def: g
                    });
                  else
                    break;
                }
              }
            }
          else
            y = null, m.push(u);
      return m;
    });
  }, [h, t, n]);
  const f = Q(
    () => ({ explorerNavStack: r, push: c, pop: i, reset: h }),
    [r, c, i, h]
  );
  return /* @__PURE__ */ o(Gt.Provider, { value: f, children: e.children });
}
s(Qt, "ExplorerContextProvider");
const ie = ue(Gt);
function Pe(e, t) {
  return Tt(e) ? /* @__PURE__ */ T(z, { children: [
    Pe(e.ofType, t),
    "!"
  ] }) : Mt(e) ? /* @__PURE__ */ T(z, { children: [
    "[",
    Pe(e.ofType, t),
    "]"
  ] }) : t(e);
}
s(Pe, "renderType");
function ee(e) {
  const { push: t } = ie({ nonNull: !0, caller: ee });
  return e.type ? Pe(e.type, (n) => /* @__PURE__ */ o(
    "a",
    {
      className: "graphiql-doc-explorer-type-name",
      onClick: (r) => {
        r.preventDefault(), t({ name: n.name, def: n });
      },
      href: "#",
      children: n.name
    }
  )) : null;
}
s(ee, "TypeLink");
function qe({ arg: e, showDefaultValue: t, inline: n }) {
  const r = /* @__PURE__ */ T("span", { children: [
    /* @__PURE__ */ o("span", { className: "graphiql-doc-explorer-argument-name", children: e.name }),
    ": ",
    /* @__PURE__ */ o(ee, { type: e.type }),
    t !== !1 && /* @__PURE__ */ o($t, { field: e })
  ] });
  return n ? r : /* @__PURE__ */ T("div", { className: "graphiql-doc-explorer-argument", children: [
    r,
    e.description ? /* @__PURE__ */ o(ne, { type: "description", children: e.description }) : null,
    e.deprecationReason ? /* @__PURE__ */ T("div", { className: "graphiql-doc-explorer-argument-deprecation", children: [
      /* @__PURE__ */ o("div", { className: "graphiql-doc-explorer-argument-deprecation-label", children: "Deprecated" }),
      /* @__PURE__ */ o(ne, { type: "deprecation", children: e.deprecationReason })
    ] }) : null
  ] });
}
s(qe, "Argument");
function jt(e) {
  return e.children ? /* @__PURE__ */ T("div", { className: "graphiql-doc-explorer-deprecation", children: [
    /* @__PURE__ */ o("div", { className: "graphiql-doc-explorer-deprecation-label", children: "Deprecated" }),
    /* @__PURE__ */ o(ne, { type: "deprecation", onlyShowFirstChild: !0, children: e.children })
  ] }) : null;
}
s(jt, "DeprecationReason");
function zr({ directive: e }) {
  return /* @__PURE__ */ T("span", { className: "graphiql-doc-explorer-directive", children: [
    "@",
    e.name.value
  ] });
}
s(zr, "Directive");
function K(e) {
  const t = Ur[e.title];
  return /* @__PURE__ */ T("div", { children: [
    /* @__PURE__ */ T("div", { className: "graphiql-doc-explorer-section-title", children: [
      /* @__PURE__ */ o(t, {}),
      e.title
    ] }),
    /* @__PURE__ */ o("div", { className: "graphiql-doc-explorer-section-content", children: e.children })
  ] });
}
s(K, "ExplorerSection");
const Ur = {
  Arguments: gr,
  "Deprecated Arguments": yr,
  "Deprecated Enum Values": vr,
  "Deprecated Fields": br,
  Directives: wr,
  "Enum Values": Lr,
  Fields: Sr,
  Implements: kr,
  Implementations: ke,
  "Possible Types": ke,
  "Root Types": Rr,
  Type: ke,
  "All Schema Types": ke
};
function Kr(e) {
  return /* @__PURE__ */ T(z, { children: [
    e.field.description ? /* @__PURE__ */ o(ne, { type: "description", children: e.field.description }) : null,
    /* @__PURE__ */ o(jt, { children: e.field.deprecationReason }),
    /* @__PURE__ */ o(K, { title: "Type", children: /* @__PURE__ */ o(ee, { type: e.field.type }) }),
    /* @__PURE__ */ o(Jr, { field: e.field }),
    /* @__PURE__ */ o(Yr, { field: e.field })
  ] });
}
s(Kr, "FieldDocumentation");
function Jr({ field: e }) {
  const [t, n] = I(!1), r = M(() => {
    n(!0);
  }, []);
  if (!("args" in e))
    return null;
  const l = [], c = [];
  for (const i of e.args)
    i.deprecationReason ? c.push(i) : l.push(i);
  return /* @__PURE__ */ T(z, { children: [
    l.length > 0 ? /* @__PURE__ */ o(K, { title: "Arguments", children: l.map((i) => /* @__PURE__ */ o(qe, { arg: i }, i.name)) }) : null,
    c.length > 0 ? t || l.length === 0 ? /* @__PURE__ */ o(K, { title: "Deprecated Arguments", children: c.map((i) => /* @__PURE__ */ o(qe, { arg: i }, i.name)) }) : /* @__PURE__ */ o(Fe, { type: "button", onClick: r, children: "Show Deprecated Arguments" }) : null
  ] });
}
s(Jr, "Arguments");
function Yr({ field: e }) {
  var n;
  const t = ((n = e.astNode) == null ? void 0 : n.directives) || [];
  return !t || t.length === 0 ? null : /* @__PURE__ */ o(K, { title: "Directives", children: t.map((r) => /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o(zr, { directive: r }) }, r.name.value)) });
}
s(Yr, "Directives");
function Xr(e) {
  var i, h, f, p;
  const t = e.schema.getQueryType(), n = (h = (i = e.schema).getMutationType) == null ? void 0 : h.call(i), r = (p = (f = e.schema).getSubscriptionType) == null ? void 0 : p.call(f), l = e.schema.getTypeMap(), c = [
    t == null ? void 0 : t.name,
    n == null ? void 0 : n.name,
    r == null ? void 0 : r.name
  ];
  return /* @__PURE__ */ T(z, { children: [
    /* @__PURE__ */ o(ne, { type: "description", children: e.schema.description || "A GraphQL schema provides a root type for each kind of operation." }),
    /* @__PURE__ */ T(K, { title: "Root Types", children: [
      t ? /* @__PURE__ */ T("div", { children: [
        /* @__PURE__ */ o("span", { className: "graphiql-doc-explorer-root-type", children: "query" }),
        ": ",
        /* @__PURE__ */ o(ee, { type: t })
      ] }) : null,
      n && /* @__PURE__ */ T("div", { children: [
        /* @__PURE__ */ o("span", { className: "graphiql-doc-explorer-root-type", children: "mutation" }),
        ": ",
        /* @__PURE__ */ o(ee, { type: n })
      ] }),
      r && /* @__PURE__ */ T("div", { children: [
        /* @__PURE__ */ o("span", { className: "graphiql-doc-explorer-root-type", children: "subscription" }),
        ": ",
        /* @__PURE__ */ o(ee, { type: r })
      ] })
    ] }),
    /* @__PURE__ */ o(K, { title: "All Schema Types", children: l && /* @__PURE__ */ o("div", { children: Object.values(l).map((m) => c.includes(m.name) || m.name.startsWith("__") ? null : /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o(ee, { type: m }) }, m.name)) }) })
  ] });
}
s(Xr, "SchemaDocumentation");
function pe(e, t) {
  let n;
  return function(...r) {
    n && window.clearTimeout(n), n = window.setTimeout(() => {
      n = null, t(...r);
    }, e);
  };
}
s(pe, "debounce");
function zt() {
  const { explorerNavStack: e, push: t } = ie({
    nonNull: !0,
    caller: zt
  }), n = $(null), r = tt(), [l, c] = I(""), [i, h] = I(r(l)), f = Q(
    () => pe(200, (d) => {
      h(r(d));
    }),
    [r]
  );
  P(() => {
    f(l);
  }, [f, l]), P(() => {
    function d(b) {
      var N;
      b.metaKey && b.key === "k" && ((N = n.current) == null || N.focus());
    }
    return s(d, "handleKeyDown"), window.addEventListener("keydown", d), () => window.removeEventListener("keydown", d);
  }, []);
  const p = e.at(-1), m = M(
    (d) => {
      t(
        "field" in d ? { name: d.field.name, def: d.field } : { name: d.type.name, def: d.type }
      );
    },
    [t]
  ), [y, u] = I(!1), g = M((d) => {
    u(d.type === "focus");
  }, []);
  return e.length === 1 || xe(p.def) || Ee(p.def) || Oe(p.def) ? /* @__PURE__ */ T(
    he,
    {
      as: "div",
      className: "graphiql-doc-explorer-search",
      onChange: m,
      "data-state": y ? void 0 : "idle",
      "aria-label": `Search ${p.name}...`,
      children: [
        /* @__PURE__ */ T(
          "div",
          {
            className: "graphiql-doc-explorer-search-input",
            onClick: () => {
              var d;
              (d = n.current) == null || d.focus();
            },
            children: [
              /* @__PURE__ */ o(Tr, {}),
              /* @__PURE__ */ o(
                he.Input,
                {
                  autoComplete: "off",
                  onFocus: g,
                  onBlur: g,
                  onChange: (d) => c(d.target.value),
                  placeholder: "⌘ K",
                  ref: n,
                  value: l,
                  "data-cy": "doc-explorer-input"
                }
              )
            ]
          }
        ),
        y && /* @__PURE__ */ T(he.Options, { "data-cy": "doc-explorer-list", children: [
          i.within.length + i.types.length + i.fields.length === 0 ? /* @__PURE__ */ o("li", { className: "graphiql-doc-explorer-search-empty", children: "No results found" }) : i.within.map((d, b) => /* @__PURE__ */ o(
            he.Option,
            {
              value: d,
              "data-cy": "doc-explorer-option",
              children: /* @__PURE__ */ o(Ct, { field: d.field, argument: d.argument })
            },
            `within-${b}`
          )),
          i.within.length > 0 && i.types.length + i.fields.length > 0 ? /* @__PURE__ */ o("div", { className: "graphiql-doc-explorer-search-divider", children: "Other results" }) : null,
          i.types.map((d, b) => /* @__PURE__ */ o(
            he.Option,
            {
              value: d,
              "data-cy": "doc-explorer-option",
              children: /* @__PURE__ */ o(nt, { type: d.type })
            },
            `type-${b}`
          )),
          i.fields.map((d, b) => /* @__PURE__ */ T(
            he.Option,
            {
              value: d,
              "data-cy": "doc-explorer-option",
              children: [
                /* @__PURE__ */ o(nt, { type: d.type }),
                ".",
                /* @__PURE__ */ o(Ct, { field: d.field, argument: d.argument })
              ]
            },
            `field-${b}`
          ))
        ] })
      ]
    }
  ) : null;
}
s(zt, "Search");
function tt(e) {
  const { explorerNavStack: t } = ie({
    nonNull: !0,
    caller: e || tt
  }), { schema: n } = re({
    nonNull: !0,
    caller: e || tt
  }), r = t.at(-1);
  return M(
    (l) => {
      const c = {
        within: [],
        types: [],
        fields: []
      };
      if (!n)
        return c;
      const i = r.def, h = n.getTypeMap();
      let f = Object.keys(h);
      i && (f = f.filter((p) => p !== i.name), f.unshift(i.name));
      for (const p of f) {
        if (c.within.length + c.types.length + c.fields.length >= 100)
          break;
        const m = h[p];
        if (i !== m && je(p, l) && c.types.push({ type: m }), !xe(m) && !Ee(m) && !Oe(m))
          continue;
        const y = m.getFields();
        for (const u in y) {
          const g = y[u];
          let C;
          if (!je(u, l))
            if ("args" in g) {
              if (C = g.args.filter(
                (d) => je(d.name, l)
              ), C.length === 0)
                continue;
            } else
              continue;
          c[i === m ? "within" : "fields"].push(
            ...C ? C.map((d) => ({ type: m, field: g, argument: d })) : [{ type: m, field: g }]
          );
        }
      }
      return c;
    },
    [r.def, n]
  );
}
s(tt, "useSearchResults");
function je(e, t) {
  try {
    const n = t.replaceAll(/[^_0-9A-Za-z]/g, (r) => "\\" + r);
    return e.search(new RegExp(n, "i")) !== -1;
  } catch {
    return e.toLowerCase().includes(t.toLowerCase());
  }
}
s(je, "isMatch");
function nt(e) {
  return /* @__PURE__ */ o("span", { className: "graphiql-doc-explorer-search-type", children: e.type.name });
}
s(nt, "Type");
function Ct({ field: e, argument: t }) {
  return /* @__PURE__ */ T(z, { children: [
    /* @__PURE__ */ o("span", { className: "graphiql-doc-explorer-search-field", children: e.name }),
    t ? /* @__PURE__ */ T(z, { children: [
      "(",
      /* @__PURE__ */ o("span", { className: "graphiql-doc-explorer-search-argument", children: t.name }),
      ":",
      " ",
      Pe(t.type, (n) => /* @__PURE__ */ o(nt, { type: n })),
      ")"
    ] }) : null
  ] });
}
s(Ct, "Field$1");
function eo(e) {
  const { push: t } = ie({ nonNull: !0 });
  return /* @__PURE__ */ o(
    "a",
    {
      className: "graphiql-doc-explorer-field-name",
      onClick: (n) => {
        n.preventDefault(), t({ name: e.field.name, def: e.field });
      },
      href: "#",
      children: e.field.name
    }
  );
}
s(eo, "FieldLink");
function to(e) {
  return Nt(e.type) ? /* @__PURE__ */ T(z, { children: [
    e.type.description ? /* @__PURE__ */ o(ne, { type: "description", children: e.type.description }) : null,
    /* @__PURE__ */ o(no, { type: e.type }),
    /* @__PURE__ */ o(ro, { type: e.type }),
    /* @__PURE__ */ o(oo, { type: e.type }),
    /* @__PURE__ */ o(lo, { type: e.type })
  ] }) : null;
}
s(to, "TypeDocumentation");
function no({ type: e }) {
  return xe(e) && e.getInterfaces().length > 0 ? /* @__PURE__ */ o(K, { title: "Implements", children: e.getInterfaces().map((n) => /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o(ee, { type: n }) }, n.name)) }) : null;
}
s(no, "ImplementsInterfaces");
function ro({ type: e }) {
  const [t, n] = I(!1), r = M(() => {
    n(!0);
  }, []);
  if (!xe(e) && !Ee(e) && !Oe(e))
    return null;
  const l = e.getFields(), c = [], i = [];
  for (const h of Object.keys(l).map((f) => l[f]))
    h.deprecationReason ? i.push(h) : c.push(h);
  return /* @__PURE__ */ T(z, { children: [
    c.length > 0 ? /* @__PURE__ */ o(K, { title: "Fields", children: c.map((h) => /* @__PURE__ */ o(yt, { field: h }, h.name)) }) : null,
    i.length > 0 ? t || c.length === 0 ? /* @__PURE__ */ o(K, { title: "Deprecated Fields", children: i.map((h) => /* @__PURE__ */ o(yt, { field: h }, h.name)) }) : /* @__PURE__ */ o(Fe, { type: "button", onClick: r, children: "Show Deprecated Fields" }) : null
  ] });
}
s(ro, "Fields");
function yt({ field: e }) {
  const t = "args" in e ? e.args.filter((n) => !n.deprecationReason) : [];
  return /* @__PURE__ */ T("div", { className: "graphiql-doc-explorer-item", children: [
    /* @__PURE__ */ T("div", { children: [
      /* @__PURE__ */ o(eo, { field: e }),
      t.length > 0 ? /* @__PURE__ */ T(z, { children: [
        "(",
        /* @__PURE__ */ o("span", { children: t.map(
          (n) => t.length === 1 ? /* @__PURE__ */ o(qe, { arg: n, inline: !0 }, n.name) : /* @__PURE__ */ o(
            "div",
            {
              className: "graphiql-doc-explorer-argument-multiple",
              children: /* @__PURE__ */ o(qe, { arg: n, inline: !0 })
            },
            n.name
          )
        ) }),
        ")"
      ] }) : null,
      ": ",
      /* @__PURE__ */ o(ee, { type: e.type }),
      /* @__PURE__ */ o($t, { field: e })
    ] }),
    e.description ? /* @__PURE__ */ o(ne, { type: "description", onlyShowFirstChild: !0, children: e.description }) : null,
    /* @__PURE__ */ o(jt, { children: e.deprecationReason })
  ] });
}
s(yt, "Field");
function oo({ type: e }) {
  const [t, n] = I(!1), r = M(() => {
    n(!0);
  }, []);
  if (!kt(e))
    return null;
  const l = [], c = [];
  for (const i of e.getValues())
    i.deprecationReason ? c.push(i) : l.push(i);
  return /* @__PURE__ */ T(z, { children: [
    l.length > 0 ? /* @__PURE__ */ o(K, { title: "Enum Values", children: l.map((i) => /* @__PURE__ */ o(vt, { value: i }, i.name)) }) : null,
    c.length > 0 ? t || l.length === 0 ? /* @__PURE__ */ o(K, { title: "Deprecated Enum Values", children: c.map((i) => /* @__PURE__ */ o(vt, { value: i }, i.name)) }) : /* @__PURE__ */ o(Fe, { type: "button", onClick: r, children: "Show Deprecated Values" }) : null
  ] });
}
s(oo, "EnumValues");
function vt({ value: e }) {
  return /* @__PURE__ */ T("div", { className: "graphiql-doc-explorer-item", children: [
    /* @__PURE__ */ o("div", { className: "graphiql-doc-explorer-enum-value", children: e.name }),
    e.description ? /* @__PURE__ */ o(ne, { type: "description", children: e.description }) : null,
    e.deprecationReason ? /* @__PURE__ */ o(ne, { type: "deprecation", children: e.deprecationReason }) : null
  ] });
}
s(vt, "EnumValue");
function lo({ type: e }) {
  const { schema: t } = re({ nonNull: !0 });
  return !t || !vn(e) ? null : /* @__PURE__ */ o(
    K,
    {
      title: Ee(e) ? "Implementations" : "Possible Types",
      children: t.getPossibleTypes(e).map((n) => /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o(ee, { type: n }) }, n.name))
    }
  );
}
s(lo, "PossibleTypes");
function rt() {
  const { fetchError: e, isFetching: t, schema: n, validationErrors: r } = re(
    { nonNull: !0, caller: rt }
  ), { explorerNavStack: l, pop: c } = ie({
    nonNull: !0,
    caller: rt
  }), i = l.at(-1);
  let h = null;
  e ? h = /* @__PURE__ */ o("div", { className: "graphiql-doc-explorer-error", children: "Error fetching schema" }) : r.length > 0 ? h = /* @__PURE__ */ T("div", { className: "graphiql-doc-explorer-error", children: [
    "Schema is invalid: ",
    r[0].message
  ] }) : t ? h = /* @__PURE__ */ o(qt, {}) : n ? l.length === 1 ? h = /* @__PURE__ */ o(Xr, { schema: n }) : bn(i.def) ? h = /* @__PURE__ */ o(to, { type: i.def }) : i.def && (h = /* @__PURE__ */ o(Kr, { field: i.def })) : h = /* @__PURE__ */ o("div", { className: "graphiql-doc-explorer-error", children: "No GraphQL schema available" });
  let f;
  return l.length > 1 && (f = l.at(-2).name), /* @__PURE__ */ T(
    "section",
    {
      className: "graphiql-doc-explorer",
      "aria-label": "Documentation Explorer",
      children: [
        /* @__PURE__ */ T("div", { className: "graphiql-doc-explorer-header", children: [
          /* @__PURE__ */ T("div", { className: "graphiql-doc-explorer-header-content", children: [
            f && /* @__PURE__ */ T(
              "a",
              {
                href: "#",
                className: "graphiql-doc-explorer-back",
                onClick: (p) => {
                  p.preventDefault(), c();
                },
                "aria-label": `Go back to ${f}`,
                children: [
                  /* @__PURE__ */ o(Cr, {}),
                  f
                ]
              }
            ),
            /* @__PURE__ */ o("div", { className: "graphiql-doc-explorer-title", children: i.name })
          ] }),
          /* @__PURE__ */ o(zt, {}, i.name)
        ] }),
        /* @__PURE__ */ o("div", { className: "graphiql-doc-explorer-content", children: h })
      ]
    }
  );
}
s(rt, "DocExplorer");
const ve = {
  title: "Documentation Explorer",
  icon: /* @__PURE__ */ s(function() {
    const t = at();
    return (t == null ? void 0 : t.visiblePlugin) === ve ? /* @__PURE__ */ o(xr, {}) : /* @__PURE__ */ o(Er, {});
  }, "Icon"),
  content: rt
}, bt = {
  title: "History",
  icon: Nr,
  content: _r
}, Ut = ce("PluginContext");
function io(e) {
  const t = de(), n = ie(), r = Be(), l = !!n, c = !!r, i = Q(() => {
    const g = [], C = {};
    l && (g.push(ve), C[ve.title] = !0), c && (g.push(bt), C[bt.title] = !0);
    for (const d of e.plugins || []) {
      if (typeof d.title != "string" || !d.title)
        throw new Error("All GraphiQL plugins must have a unique title");
      if (C[d.title])
        throw new Error(
          `All GraphiQL plugins must have a unique title, found two plugins with the title '${d.title}'`
        );
      g.push(d), C[d.title] = !0;
    }
    return g;
  }, [l, c, e.plugins]), [h, f] = I(() => {
    const g = t == null ? void 0 : t.get(wt), C = i.find(
      (d) => d.title === g
    );
    return C || (g && (t == null || t.set(wt, "")), e.visiblePlugin && i.find(
      (d) => (typeof e.visiblePlugin == "string" ? d.title : d) === e.visiblePlugin
    ) || null);
  }), { onTogglePluginVisibility: p, children: m } = e, y = M(
    (g) => {
      const C = g && i.find(
        (d) => (typeof g == "string" ? d.title : d) === g
      ) || null;
      f((d) => C === d ? d : (p == null || p(C), C));
    },
    [p, i]
  );
  P(() => {
    e.visiblePlugin && y(e.visiblePlugin);
  }, [i, e.visiblePlugin, y]);
  const u = Q(
    () => ({ plugins: i, setVisiblePlugin: y, visiblePlugin: h }),
    [i, y, h]
  );
  return /* @__PURE__ */ o(Ut.Provider, { value: u, children: m });
}
s(io, "PluginContextProvider");
const at = ue(Ut), wt = "visiblePlugin";
function so(e, t, n, r, l, c) {
  Se([], { useCommonAddons: !1 }).then((h) => {
    let f, p, m, y, u, g, C, d, b;
    h.on(
      t,
      "select",
      // @ts-expect-error
      (N, L) => {
        if (!f) {
          const x = L.parentNode;
          f = document.createElement("div"), f.className = "CodeMirror-hint-information", x.append(f);
          const w = document.createElement("header");
          w.className = "CodeMirror-hint-information-header", f.append(w), p = document.createElement("span"), p.className = "CodeMirror-hint-information-field-name", w.append(p), m = document.createElement("span"), m.className = "CodeMirror-hint-information-type-name-pill", w.append(m), y = document.createElement("span"), m.append(y), u = document.createElement("a"), u.className = "CodeMirror-hint-information-type-name", u.href = "javascript:void 0", u.addEventListener("click", i), m.append(u), g = document.createElement("span"), m.append(g), C = document.createElement("div"), C.className = "CodeMirror-hint-information-description", f.append(C), d = document.createElement("div"), d.className = "CodeMirror-hint-information-deprecation", f.append(d);
          const V = document.createElement("span");
          V.className = "CodeMirror-hint-information-deprecation-label", V.textContent = "Deprecated", d.append(V), b = document.createElement("div"), b.className = "CodeMirror-hint-information-deprecation-reason", d.append(b);
          const B = parseInt(
            window.getComputedStyle(f).paddingBottom.replace(/px$/, ""),
            10
          ) || 0, _ = parseInt(
            window.getComputedStyle(f).maxHeight.replace(/px$/, ""),
            10
          ) || 0, D = /* @__PURE__ */ s(() => {
            f && (f.style.paddingTop = x.scrollTop + B + "px", f.style.maxHeight = x.scrollTop + _ + "px");
          }, "handleScroll");
          x.addEventListener("scroll", D);
          let O;
          x.addEventListener(
            "DOMNodeRemoved",
            O = /* @__PURE__ */ s((W) => {
              W.target === x && (x.removeEventListener("scroll", D), x.removeEventListener("DOMNodeRemoved", O), f && f.removeEventListener(
                "click",
                i
              ), f = null, p = null, m = null, y = null, u = null, g = null, C = null, d = null, b = null, O = null);
            }, "onRemoveFn")
          );
        }
        if (p && (p.textContent = N.text), m && y && u && g)
          if (N.type) {
            m.style.display = "inline";
            const x = /* @__PURE__ */ s((w) => {
              Tt(w) ? (g.textContent = "!" + g.textContent, x(w.ofType)) : Mt(w) ? (y.textContent += "[", g.textContent = "]" + g.textContent, x(w.ofType)) : u.textContent = w.name;
            }, "renderType");
            y.textContent = "", g.textContent = "", x(N.type);
          } else
            y.textContent = "", u.textContent = "", g.textContent = "", m.style.display = "none";
        C && (N.description ? (C.style.display = "block", C.innerHTML = Ae.render(N.description)) : (C.style.display = "none", C.innerHTML = "")), d && b && (N.deprecationReason ? (d.style.display = "block", b.innerHTML = Ae.render(
          N.deprecationReason
        )) : (d.style.display = "none", b.innerHTML = ""));
      }
    );
  });
  function i(h) {
    if (!n || !r || !l || !(h.currentTarget instanceof HTMLElement))
      return;
    const f = h.currentTarget.textContent || "", p = n.getType(f);
    p && (l.setVisiblePlugin(ve), r.push({ name: p.name, def: p }), c == null || c(p));
  }
  s(i, "onClickHintInformation");
}
s(so, "onHasCompletion");
function Me(e, t) {
  P(() => {
    e && typeof t == "string" && t !== e.getValue() && e.setValue(t);
  }, [e, t]);
}
s(Me, "useSynchronizeValue");
function Ge(e, t, n) {
  P(() => {
    e && e.setOption(t, n);
  }, [e, t, n]);
}
s(Ge, "useSynchronizeOption");
function Kt(e, t, n, r, l) {
  const { updateActiveTabValues: c } = j({ nonNull: !0, caller: l }), i = de();
  P(() => {
    if (!e)
      return;
    const h = pe(500, (m) => {
      !i || n === null || i.set(n, m);
    }), f = pe(100, (m) => {
      c({ [r]: m });
    }), p = /* @__PURE__ */ s((m, y) => {
      if (!y)
        return;
      const u = m.getValue();
      h(u), f(u), t == null || t(u);
    }, "handleChange");
    return e.on("change", p), () => e.off("change", p);
  }, [
    t,
    e,
    i,
    n,
    r,
    c
  ]);
}
s(Kt, "useChangeHandler");
function Jt(e, t, n) {
  const { schema: r } = re({ nonNull: !0, caller: n }), l = ie(), c = at();
  P(() => {
    if (!e)
      return;
    const i = /* @__PURE__ */ s((h, f) => {
      so(h, f, r, l, c, (p) => {
        t == null || t({ kind: "Type", type: p, schema: r || void 0 });
      });
    }, "handleCompletion");
    return e.on(
      // @ts-expect-error @TODO additional args for hasCompletion event
      "hasCompletion",
      i
    ), () => e.off(
      // @ts-expect-error @TODO additional args for hasCompletion event
      "hasCompletion",
      i
    );
  }, [t, e, l, c, r]);
}
s(Jt, "useCompletion");
function te(e, t, n) {
  P(() => {
    if (e) {
      for (const r of t)
        e.removeKeyMap(r);
      if (n) {
        const r = {};
        for (const l of t)
          r[l] = () => n();
        e.addKeyMap(r);
      }
    }
  }, [e, t, n]);
}
s(te, "useKeyMap");
function Yt({ caller: e, onCopyQuery: t } = {}) {
  const { queryEditor: n } = j({
    nonNull: !0,
    caller: e || Yt
  });
  return M(() => {
    if (!n)
      return;
    const r = n.getValue();
    Rn(r), t == null || t(r);
  }, [n, t]);
}
s(Yt, "useCopyQuery");
function be({ caller: e } = {}) {
  const { queryEditor: t } = j({
    nonNull: !0,
    caller: e || be
  }), { schema: n } = re({ nonNull: !0, caller: be });
  return M(() => {
    const r = t == null ? void 0 : t.documentAST, l = t == null ? void 0 : t.getValue();
    !r || !l || t.setValue(Ie(Sn(r, n)));
  }, [t, n]);
}
s(be, "useMergeQuery");
function Qe({ caller: e } = {}) {
  const { queryEditor: t, headerEditor: n, variableEditor: r } = j({
    nonNull: !0,
    caller: e || Qe
  });
  return M(() => {
    if (r) {
      const l = r.getValue();
      try {
        const c = JSON.stringify(
          JSON.parse(l),
          null,
          2
        );
        c !== l && r.setValue(c);
      } catch {
      }
    }
    if (n) {
      const l = n.getValue();
      try {
        const c = JSON.stringify(
          JSON.parse(l),
          null,
          2
        );
        c !== l && n.setValue(c);
      } catch {
      }
    }
    if (t) {
      const l = t.getValue(), c = Ie(Vt(l));
      c !== l && t.setValue(c);
    }
  }, [t, r, n]);
}
s(Qe, "usePrettifyEditors");
function ot({
  getDefaultFieldNames: e,
  caller: t
} = {}) {
  const { schema: n } = re({
    nonNull: !0,
    caller: t || ot
  }), { queryEditor: r } = j({
    nonNull: !0,
    caller: t || ot
  });
  return M(() => {
    if (!r)
      return;
    const l = r.getValue(), { insertions: c, result: i } = Nn(
      n,
      l,
      e
    );
    return c && c.length > 0 && r.operation(() => {
      const h = r.getCursor(), f = r.indexFromPos(h);
      r.setValue(i || "");
      let p = 0;
      const m = c.map(
        ({ index: u, string: g }) => r.markText(
          r.posFromIndex(u + p),
          r.posFromIndex(u + (p += g.length)),
          {
            className: "auto-inserted-leaf",
            clearOnEnter: !0,
            title: "Automatically added leaf fields"
          }
        )
      );
      setTimeout(() => {
        for (const u of m)
          u.clear();
      }, 7e3);
      let y = f;
      for (const { index: u, string: g } of c)
        u < f && (y += g.length);
      r.setCursor(r.posFromIndex(y));
    }), i;
  }, [e, r, n]);
}
s(ot, "useAutoCompleteLeafs");
function Ce({
  editorTheme: e = $e,
  keyMap: t = _e,
  onEdit: n,
  readOnly: r = !1
} = {}, l) {
  const {
    initialHeaders: c,
    headerEditor: i,
    setHeaderEditor: h,
    shouldPersistHeaders: f
  } = j({
    nonNull: !0,
    caller: l || Ce
  }), p = We(), m = be({ caller: l || Ce }), y = Qe({ caller: l || Ce }), u = $(null);
  return P(() => {
    let g = !0;
    return Se([
      // @ts-expect-error
      import("./javascript.es.js").then((C) => C.j)
    ]).then((C) => {
      if (!g)
        return;
      const d = u.current;
      if (!d)
        return;
      const b = C(d, {
        value: c,
        lineNumbers: !0,
        tabSize: 2,
        mode: { name: "javascript", json: !0 },
        theme: e,
        autoCloseBrackets: !0,
        matchBrackets: !0,
        showCursorWhenSelecting: !0,
        readOnly: r ? "nocursor" : !1,
        foldGutter: !0,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        extraKeys: Ze
      });
      b.addKeyMap({
        "Cmd-Space"() {
          b.showHint({ completeSingle: !1, container: d });
        },
        "Ctrl-Space"() {
          b.showHint({ completeSingle: !1, container: d });
        },
        "Alt-Space"() {
          b.showHint({ completeSingle: !1, container: d });
        },
        "Shift-Space"() {
          b.showHint({ completeSingle: !1, container: d });
        }
      }), b.on("keyup", (N, L) => {
        const { code: x, key: w, shiftKey: V } = L, B = x.startsWith("Key"), _ = !V && x.startsWith("Digit");
        (B || _ || w === "_" || w === '"') && N.execCommand("autocomplete");
      }), h(b);
    }), () => {
      g = !1;
    };
  }, [e, c, r, h]), Ge(i, "keyMap", t), Kt(
    i,
    n,
    f ? He : null,
    "headers",
    Ce
  ), te(i, ["Cmd-Enter", "Ctrl-Enter"], p == null ? void 0 : p.run), te(i, ["Shift-Ctrl-P"], y), te(i, ["Shift-Ctrl-M"], m), u;
}
s(Ce, "useHeaderEditor");
const He = "headers", ao = Array.from({ length: 11 }, (e, t) => String.fromCharCode(8192 + t)).concat(["\u2028", "\u2029", " ", " "]), co = new RegExp("[" + ao.join("") + "]", "g");
function uo(e) {
  return e.replace(co, " ");
}
s(uo, "normalizeWhitespace");
function se({
  editorTheme: e = $e,
  keyMap: t = _e,
  onClickReference: n,
  onCopyQuery: r,
  onEdit: l,
  readOnly: c = !1
} = {}, i) {
  const { schema: h } = re({
    nonNull: !0,
    caller: i || se
  }), {
    externalFragments: f,
    initialQuery: p,
    queryEditor: m,
    setOperationName: y,
    setQueryEditor: u,
    validationRules: g,
    variableEditor: C,
    updateActiveTabValues: d
  } = j({
    nonNull: !0,
    caller: i || se
  }), b = We(), N = de(), L = ie(), x = at(), w = Yt({ caller: i || se, onCopyQuery: r }), V = be({ caller: i || se }), B = Qe({ caller: i || se }), _ = $(null), D = $(), O = $(() => {
  });
  P(() => {
    O.current = (A) => {
      if (!(!L || !x)) {
        switch (x.setVisiblePlugin(ve), A.kind) {
          case "Type": {
            L.push({ name: A.type.name, def: A.type });
            break;
          }
          case "Field": {
            L.push({ name: A.field.name, def: A.field });
            break;
          }
          case "Argument": {
            A.field && L.push({ name: A.field.name, def: A.field });
            break;
          }
          case "EnumValue": {
            A.type && L.push({ name: A.type.name, def: A.type });
            break;
          }
        }
        n == null || n(A);
      }
    };
  }, [L, n, x]), P(() => {
    let A = !0;
    return Se([
      import("./comment.es.js").then((k) => k.c),
      import("./search.es.js").then((k) => k.s),
      import("./hint.es.js"),
      import("./lint.es2.js"),
      import("./info.es.js"),
      import("./jump.es.js"),
      import("./mode.es.js")
    ]).then((k) => {
      if (!A)
        return;
      D.current = k;
      const H = _.current;
      if (!H)
        return;
      const E = k(H, {
        value: p,
        lineNumbers: !0,
        tabSize: 2,
        foldGutter: !0,
        mode: "graphql",
        theme: e,
        autoCloseBrackets: !0,
        matchBrackets: !0,
        showCursorWhenSelecting: !0,
        readOnly: c ? "nocursor" : !1,
        lint: {
          // @ts-expect-error
          schema: void 0,
          validationRules: null,
          // linting accepts string or FragmentDefinitionNode[]
          externalFragments: void 0
        },
        hintOptions: {
          // @ts-expect-error
          schema: void 0,
          closeOnUnfocus: !1,
          completeSingle: !1,
          container: H,
          externalFragments: void 0
        },
        info: {
          schema: void 0,
          renderDescription: (v) => Ae.render(v),
          onClick: (v) => {
            O.current(v);
          }
        },
        jump: {
          schema: void 0,
          onClick: (v) => {
            O.current(v);
          }
        },
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        extraKeys: {
          ...Ze,
          "Cmd-S"() {
          },
          "Ctrl-S"() {
          }
        }
      });
      E.addKeyMap({
        "Cmd-Space"() {
          E.showHint({ completeSingle: !0, container: H });
        },
        "Ctrl-Space"() {
          E.showHint({ completeSingle: !0, container: H });
        },
        "Alt-Space"() {
          E.showHint({ completeSingle: !0, container: H });
        },
        "Shift-Space"() {
          E.showHint({ completeSingle: !0, container: H });
        },
        "Shift-Alt-Space"() {
          E.showHint({ completeSingle: !0, container: H });
        }
      }), E.on("keyup", (v, S) => {
        fo.test(S.key) && v.execCommand("autocomplete");
      });
      let Z = !1;
      E.on("startCompletion", () => {
        Z = !0;
      }), E.on("endCompletion", () => {
        Z = !1;
      }), E.on("keydown", (v, S) => {
        S.key === "Escape" && Z && S.stopPropagation();
      }), E.on("beforeChange", (v, S) => {
        var R;
        if (S.origin === "paste") {
          const U = S.text.map(uo);
          (R = S.update) == null || R.call(S, S.from, S.to, U);
        }
      }), E.documentAST = null, E.operationName = null, E.operations = null, E.variableToType = null, u(E);
    }), () => {
      A = !1;
    };
  }, [e, p, c, u]), Ge(m, "keyMap", t), P(() => {
    if (!m)
      return;
    function A(H) {
      var v;
      const E = Mn(
        h,
        H.getValue()
      ), Z = kn(
        H.operations ?? void 0,
        H.operationName ?? void 0,
        E == null ? void 0 : E.operations
      );
      return H.documentAST = (E == null ? void 0 : E.documentAST) ?? null, H.operationName = Z ?? null, H.operations = (E == null ? void 0 : E.operations) ?? null, C && (C.state.lint.linterOptions.variableToType = E == null ? void 0 : E.variableToType, C.options.lint.variableToType = E == null ? void 0 : E.variableToType, C.options.hintOptions.variableToType = E == null ? void 0 : E.variableToType, (v = D.current) == null || v.signal(C, "change", C)), E ? { ...E, operationName: Z } : null;
    }
    s(A, "getAndUpdateOperationFacts");
    const k = pe(
      100,
      (H) => {
        const E = H.getValue();
        N == null || N.set(Xt, E);
        const Z = H.operationName, v = A(H);
        (v == null ? void 0 : v.operationName) !== void 0 && (N == null || N.set(
          go,
          v.operationName
        )), l == null || l(E, v == null ? void 0 : v.documentAST), v != null && v.operationName && Z !== v.operationName && y(v.operationName), d({
          query: E,
          operationName: (v == null ? void 0 : v.operationName) ?? null
        });
      }
    );
    return A(m), m.on("change", k), () => m.off("change", k);
  }, [
    l,
    m,
    h,
    y,
    N,
    C,
    d
  ]), ho(m, h ?? null, D), mo(
    m,
    g ?? null,
    D
  ), po(
    m,
    f,
    D
  ), Jt(m, n || null, se);
  const W = b == null ? void 0 : b.run, F = M(() => {
    var H;
    if (!W || !m || !m.operations || !m.hasFocus()) {
      W == null || W();
      return;
    }
    const A = m.indexFromPos(m.getCursor());
    let k;
    for (const E of m.operations)
      E.loc && E.loc.start <= A && E.loc.end >= A && (k = (H = E.name) == null ? void 0 : H.value);
    k && k !== m.operationName && y(k), W();
  }, [m, W, y]);
  return te(m, ["Cmd-Enter", "Ctrl-Enter"], F), te(m, ["Shift-Ctrl-C"], w), te(
    m,
    [
      "Shift-Ctrl-P",
      // Shift-Ctrl-P is hard coded in Firefox for private browsing so adding an alternative to prettify
      "Shift-Ctrl-F"
    ],
    B
  ), te(m, ["Shift-Ctrl-M"], V), _;
}
s(se, "useQueryEditor");
function ho(e, t, n) {
  P(() => {
    if (!e)
      return;
    const r = e.options.lint.schema !== t;
    e.state.lint.linterOptions.schema = t, e.options.lint.schema = t, e.options.hintOptions.schema = t, e.options.info.schema = t, e.options.jump.schema = t, r && n.current && n.current.signal(e, "change", e);
  }, [e, t, n]);
}
s(ho, "useSynchronizeSchema");
function mo(e, t, n) {
  P(() => {
    if (!e)
      return;
    const r = e.options.lint.validationRules !== t;
    e.state.lint.linterOptions.validationRules = t, e.options.lint.validationRules = t, r && n.current && n.current.signal(e, "change", e);
  }, [e, t, n]);
}
s(mo, "useSynchronizeValidationRules");
function po(e, t, n) {
  const r = Q(
    () => [...t.values()],
    [t]
  );
  P(() => {
    if (!e)
      return;
    const l = e.options.lint.externalFragments !== r;
    e.state.lint.linterOptions.externalFragments = r, e.options.lint.externalFragments = r, e.options.hintOptions.externalFragments = r, l && n.current && n.current.signal(e, "change", e);
  }, [e, r, n]);
}
s(po, "useSynchronizeExternalFragments");
const fo = /^[a-zA-Z0-9_@(]$/, Xt = "query", go = "operationName";
function Co({
  defaultQuery: e,
  defaultHeaders: t,
  headers: n,
  defaultTabs: r,
  query: l,
  variables: c,
  storage: i
}) {
  const h = i == null ? void 0 : i.get(we);
  try {
    if (!h)
      throw new Error("Storage for tabs is empty");
    const f = JSON.parse(h);
    if (yo(f)) {
      const p = De({ query: l, variables: c, headers: n });
      let m = -1;
      for (let y = 0; y < f.tabs.length; y++) {
        const u = f.tabs[y];
        u.hash = De({
          query: u.query,
          variables: u.variables,
          headers: u.headers
        }), u.hash === p && (m = y);
      }
      if (m >= 0)
        f.activeTabIndex = m;
      else {
        const y = l ? ct(l) : null;
        f.tabs.push({
          id: rn(),
          hash: p,
          title: y || ut,
          query: l,
          variables: c,
          headers: n,
          operationName: y,
          response: null
        }), f.activeTabIndex = f.tabs.length - 1;
      }
      return f;
    }
    throw new Error("Storage for tabs is invalid");
  } catch {
    return {
      activeTabIndex: 0,
      tabs: (r || [
        {
          query: l ?? e,
          variables: c,
          headers: n ?? t
        }
      ]).map(tn)
    };
  }
}
s(Co, "getDefaultTabState");
function yo(e) {
  return e && typeof e == "object" && !Array.isArray(e) && bo(e, "activeTabIndex") && "tabs" in e && Array.isArray(e.tabs) && e.tabs.every(vo);
}
s(yo, "isTabsState");
function vo(e) {
  return e && typeof e == "object" && !Array.isArray(e) && xt(e, "id") && xt(e, "title") && fe(e, "query") && fe(e, "variables") && fe(e, "headers") && fe(e, "operationName") && fe(e, "response");
}
s(vo, "isTabState");
function bo(e, t) {
  return t in e && typeof e[t] == "number";
}
s(bo, "hasNumberKey");
function xt(e, t) {
  return t in e && typeof e[t] == "string";
}
s(xt, "hasStringKey");
function fe(e, t) {
  return t in e && (typeof e[t] == "string" || e[t] === null);
}
s(fe, "hasStringOrNullKey");
function wo({
  queryEditor: e,
  variableEditor: t,
  headerEditor: n,
  responseEditor: r
}) {
  return M(
    (l) => {
      const c = (e == null ? void 0 : e.getValue()) ?? null, i = (t == null ? void 0 : t.getValue()) ?? null, h = (n == null ? void 0 : n.getValue()) ?? null, f = (e == null ? void 0 : e.operationName) ?? null, p = (r == null ? void 0 : r.getValue()) ?? null;
      return nn(l, {
        query: c,
        variables: i,
        headers: h,
        response: p,
        operationName: f
      });
    },
    [e, t, n, r]
  );
}
s(wo, "useSynchronizeActiveTabValues");
function en(e, t = !1) {
  return JSON.stringify(
    e,
    (n, r) => n === "hash" || n === "response" || !t && n === "headers" ? null : r
  );
}
s(en, "serializeTabState");
function xo({
  storage: e,
  shouldPersistHeaders: t
}) {
  const n = Q(
    () => pe(500, (r) => {
      e == null || e.set(we, r);
    }),
    [e]
  );
  return M(
    (r) => {
      n(en(r, t));
    },
    [t, n]
  );
}
s(xo, "useStoreTabs");
function Eo({
  queryEditor: e,
  variableEditor: t,
  headerEditor: n,
  responseEditor: r
}) {
  return M(
    ({
      query: l,
      variables: c,
      headers: i,
      response: h
    }) => {
      e == null || e.setValue(l ?? ""), t == null || t.setValue(c ?? ""), n == null || n.setValue(i ?? ""), r == null || r.setValue(h ?? "");
    },
    [n, e, r, t]
  );
}
s(Eo, "useSetEditorValues");
function tn({
  query: e = null,
  variables: t = null,
  headers: n = null
} = {}) {
  return {
    id: rn(),
    hash: De({ query: e, variables: t, headers: n }),
    title: e && ct(e) || ut,
    query: e,
    variables: t,
    headers: n,
    operationName: null,
    response: null
  };
}
s(tn, "createTab");
function nn(e, t) {
  return {
    ...e,
    tabs: e.tabs.map((n, r) => {
      if (r !== e.activeTabIndex)
        return n;
      const l = { ...n, ...t };
      return {
        ...l,
        hash: De(l),
        title: l.operationName || (l.query ? ct(l.query) : void 0) || ut
      };
    })
  };
}
s(nn, "setPropertiesInActiveTab");
function rn() {
  const e = /* @__PURE__ */ s(() => Math.floor((1 + Math.random()) * 65536).toString(16).slice(1), "s4");
  return `${e()}${e()}-${e()}-${e()}-${e()}-${e()}${e()}${e()}`;
}
s(rn, "guid");
function De(e) {
  return [e.query ?? "", e.variables ?? "", e.headers ?? ""].join("|");
}
s(De, "hashFromTabContents");
function ct(e) {
  const n = /^(?!#).*(query|subscription|mutation)\s+([a-zA-Z0-9_]+)/m.exec(e);
  return (n == null ? void 0 : n[2]) ?? null;
}
s(ct, "fuzzyExtractOperationName");
function Lo(e) {
  const t = e == null ? void 0 : e.get(we);
  if (t) {
    const n = JSON.parse(t);
    e == null || e.set(
      we,
      JSON.stringify(
        n,
        (r, l) => r === "headers" ? null : l
      )
    );
  }
}
s(Lo, "clearHeadersFromTabs");
const ut = "<untitled>", we = "tabState";
function me({
  editorTheme: e = $e,
  keyMap: t = _e,
  onClickReference: n,
  onEdit: r,
  readOnly: l = !1
} = {}, c) {
  const { initialVariables: i, variableEditor: h, setVariableEditor: f } = j({
    nonNull: !0,
    caller: c || me
  }), p = We(), m = be({ caller: c || me }), y = Qe({ caller: c || me }), u = $(null), g = $();
  return P(() => {
    let C = !0;
    return Se([
      import("./hint.es2.js"),
      import("./lint.es3.js"),
      import("./mode.es2.js")
    ]).then((d) => {
      if (!C)
        return;
      g.current = d;
      const b = u.current;
      if (!b)
        return;
      const N = d(b, {
        value: i,
        lineNumbers: !0,
        tabSize: 2,
        mode: "graphql-variables",
        theme: e,
        autoCloseBrackets: !0,
        matchBrackets: !0,
        showCursorWhenSelecting: !0,
        readOnly: l ? "nocursor" : !1,
        foldGutter: !0,
        lint: {
          // @ts-expect-error
          variableToType: void 0
        },
        hintOptions: {
          closeOnUnfocus: !1,
          completeSingle: !1,
          container: b,
          // @ts-expect-error
          variableToType: void 0
        },
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        extraKeys: Ze
      });
      N.addKeyMap({
        "Cmd-Space"() {
          N.showHint({ completeSingle: !1, container: b });
        },
        "Ctrl-Space"() {
          N.showHint({ completeSingle: !1, container: b });
        },
        "Alt-Space"() {
          N.showHint({ completeSingle: !1, container: b });
        },
        "Shift-Space"() {
          N.showHint({ completeSingle: !1, container: b });
        }
      }), N.on("keyup", (L, x) => {
        const { code: w, key: V, shiftKey: B } = x, _ = w.startsWith("Key"), D = !B && w.startsWith("Digit");
        (_ || D || V === "_" || V === '"') && L.execCommand("autocomplete");
      }), f(N);
    }), () => {
      C = !1;
    };
  }, [e, i, l, f]), Ge(h, "keyMap", t), Kt(
    h,
    r,
    on,
    "variables",
    me
  ), Jt(h, n || null, me), te(h, ["Cmd-Enter", "Ctrl-Enter"], p == null ? void 0 : p.run), te(h, ["Shift-Ctrl-P"], y), te(h, ["Shift-Ctrl-M"], m), u;
}
s(me, "useVariableEditor");
const on = "variables", ln = ce("EditorContext");
function So(e) {
  const t = de(), [n, r] = I(
    null
  ), [l, c] = I(null), [i, h] = I(
    null
  ), [f, p] = I(
    null
  ), [m, y] = I(
    () => {
      const v = (t == null ? void 0 : t.get(ze)) !== null;
      return e.shouldPersistHeaders !== !1 && v ? (t == null ? void 0 : t.get(ze)) === "true" : !!e.shouldPersistHeaders;
    }
  );
  Me(n, e.headers), Me(l, e.query), Me(i, e.response), Me(f, e.variables);
  const u = xo({
    storage: t,
    shouldPersistHeaders: m
  }), [g] = I(() => {
    const v = e.query ?? (t == null ? void 0 : t.get(Xt)) ?? null, S = e.variables ?? (t == null ? void 0 : t.get(on)) ?? null, R = e.headers ?? (t == null ? void 0 : t.get(He)) ?? null, U = e.response ?? "", Y = Co({
      query: v,
      variables: S,
      headers: R,
      defaultTabs: e.defaultTabs,
      defaultQuery: e.defaultQuery || No,
      defaultHeaders: e.defaultHeaders,
      storage: t
    });
    return u(Y), {
      query: v ?? (Y.activeTabIndex === 0 ? Y.tabs[0].query : null) ?? "",
      variables: S ?? "",
      headers: R ?? e.defaultHeaders ?? "",
      response: U,
      tabState: Y
    };
  }), [C, d] = I(g.tabState), b = M(
    (v) => {
      if (v) {
        t == null || t.set(He, (n == null ? void 0 : n.getValue()) ?? "");
        const S = en(C, !0);
        t == null || t.set(we, S);
      } else
        t == null || t.set(He, ""), Lo(t);
      y(v), t == null || t.set(ze, v.toString());
    },
    [t, C, n]
  ), N = $();
  P(() => {
    const v = !!e.shouldPersistHeaders;
    N.current !== v && (b(v), N.current = v);
  }, [e.shouldPersistHeaders, b]);
  const L = wo({
    queryEditor: l,
    variableEditor: f,
    headerEditor: n,
    responseEditor: i
  }), x = Eo({
    queryEditor: l,
    variableEditor: f,
    headerEditor: n,
    responseEditor: i
  }), { onTabChange: w, defaultHeaders: V, children: B } = e, _ = M(() => {
    d((v) => {
      const S = L(v), R = {
        tabs: [...S.tabs, tn({ headers: V })],
        activeTabIndex: S.tabs.length
      };
      return u(R), x(R.tabs[R.activeTabIndex]), w == null || w(R), R;
    });
  }, [
    V,
    w,
    x,
    u,
    L
  ]), D = M(
    (v) => {
      d((S) => {
        const R = {
          ...S,
          activeTabIndex: v
        };
        return u(R), x(R.tabs[R.activeTabIndex]), w == null || w(R), R;
      });
    },
    [w, x, u]
  ), O = M(
    (v) => {
      d((S) => {
        const R = S.tabs[S.activeTabIndex], U = {
          tabs: v,
          activeTabIndex: v.indexOf(R)
        };
        return u(U), x(U.tabs[U.activeTabIndex]), w == null || w(U), U;
      });
    },
    [w, x, u]
  ), W = M(
    (v) => {
      d((S) => {
        const R = {
          tabs: S.tabs.filter((U, Y) => v !== Y),
          activeTabIndex: Math.max(S.activeTabIndex - 1, 0)
        };
        return u(R), x(R.tabs[R.activeTabIndex]), w == null || w(R), R;
      });
    },
    [w, x, u]
  ), F = M(
    (v) => {
      d((S) => {
        const R = nn(S, v);
        return u(R), w == null || w(R), R;
      });
    },
    [w, u]
  ), { onEditOperationName: A } = e, k = M(
    (v) => {
      l && (l.operationName = v, F({ operationName: v }), A == null || A(v));
    },
    [A, l, F]
  ), H = Q(() => {
    const v = /* @__PURE__ */ new Map();
    if (Array.isArray(e.externalFragments))
      for (const S of e.externalFragments)
        v.set(S.name.value, S);
    else if (typeof e.externalFragments == "string")
      wn(Vt(e.externalFragments, {}), {
        FragmentDefinition(S) {
          v.set(S.name.value, S);
        }
      });
    else if (e.externalFragments)
      throw new Error(
        "The `externalFragments` prop must either be a string that contains the fragment definitions in SDL or a list of FragmentDefinitionNode objects."
      );
    return v;
  }, [e.externalFragments]), E = Q(
    () => e.validationRules || [],
    [e.validationRules]
  ), Z = Q(
    () => ({
      ...C,
      addTab: _,
      changeTab: D,
      moveTab: O,
      closeTab: W,
      updateActiveTabValues: F,
      headerEditor: n,
      queryEditor: l,
      responseEditor: i,
      variableEditor: f,
      setHeaderEditor: r,
      setQueryEditor: c,
      setResponseEditor: h,
      setVariableEditor: p,
      setOperationName: k,
      initialQuery: g.query,
      initialVariables: g.variables,
      initialHeaders: g.headers,
      initialResponse: g.response,
      externalFragments: H,
      validationRules: E,
      shouldPersistHeaders: m,
      setShouldPersistHeaders: b
    }),
    [
      C,
      _,
      D,
      O,
      W,
      F,
      n,
      l,
      i,
      f,
      k,
      g,
      H,
      E,
      m,
      b
    ]
  );
  return /* @__PURE__ */ o(ln.Provider, { value: Z, children: B });
}
s(So, "EditorContextProvider");
const j = ue(ln), ze = "shouldPersistHeaders", No = `# Welcome to GraphiQL
#
# GraphiQL is an in-browser tool for writing, validating, and
# testing GraphQL queries.
#
# Type queries into this side of the screen, and you will see intelligent
# typeaheads aware of the current GraphQL type schema and live syntax and
# validation errors highlighted within the text.
#
# GraphQL queries typically start with a "{" character. Lines that start
# with a # are ignored.
#
# An example GraphQL query might look like:
#
#     {
#       field(arg: "value") {
#         subField
#       }
#     }
#
# Keyboard shortcuts:
#
#   Prettify query:  Shift-Ctrl-P (or press the prettify button)
#
#  Merge fragments:  Shift-Ctrl-M (or press the merge button)
#
#        Run Query:  Ctrl-Enter (or press the play button)
#
#    Auto Complete:  Ctrl-Space (or just start typing)
#

`;
function Et({ isHidden: e, ...t }) {
  const { headerEditor: n } = j({
    nonNull: !0,
    caller: Et
  }), r = Ce(t, Et);
  return P(() => {
    e || n == null || n.refresh();
  }, [n, e]), /* @__PURE__ */ o("div", { className: G("graphiql-editor", e && "hidden"), ref: r });
}
s(Et, "HeaderEditor");
function lt(e) {
  var f;
  const [t, n] = I({
    width: null,
    height: null
  }), [r, l] = I(null), c = $(null), i = (f = sn(e.token)) == null ? void 0 : f.href;
  P(() => {
    if (c.current) {
      if (!i) {
        n({ width: null, height: null }), l(null);
        return;
      }
      fetch(i, { method: "HEAD" }).then((p) => {
        l(p.headers.get("Content-Type"));
      }).catch(() => {
        l(null);
      });
    }
  }, [i]);
  const h = t.width !== null && t.height !== null ? /* @__PURE__ */ T("div", { children: [
    t.width,
    "x",
    t.height,
    r === null ? null : " " + r
  ] }) : null;
  return /* @__PURE__ */ T("div", { children: [
    /* @__PURE__ */ o(
      "img",
      {
        onLoad: () => {
          var p, m;
          n({
            width: ((p = c.current) == null ? void 0 : p.naturalWidth) ?? null,
            height: ((m = c.current) == null ? void 0 : m.naturalHeight) ?? null
          });
        },
        ref: c,
        src: i
      }
    ),
    h
  ] });
}
s(lt, "ImagePreview");
lt.shouldRender = /* @__PURE__ */ s(function(t) {
  const n = sn(t);
  return n ? ko(n) : !1;
}, "shouldRender");
function sn(e) {
  if (e.type !== "string")
    return;
  const t = e.string.slice(1).slice(0, -1).trim();
  try {
    const { location: n } = window;
    return new URL(t, n.protocol + "//" + n.host);
  } catch {
    return;
  }
}
s(sn, "tokenToURL");
function ko(e) {
  return /(bmp|gif|jpeg|jpg|png|svg)$/.test(e.pathname);
}
s(ko, "isImageURL");
function To(e) {
  const t = se(e, To);
  return /* @__PURE__ */ o("div", { className: "graphiql-editor", ref: t });
}
s(To, "QueryEditor");
function it({
  responseTooltip: e,
  editorTheme: t = $e,
  keyMap: n = _e
} = {}, r) {
  const { fetchError: l, validationErrors: c } = re({
    nonNull: !0,
    caller: r || it
  }), { initialResponse: i, responseEditor: h, setResponseEditor: f } = j({
    nonNull: !0,
    caller: r || it
  }), p = $(null), m = $(
    e
  );
  return P(() => {
    m.current = e;
  }, [e]), P(() => {
    let y = !0;
    return Se(
      [
        import("./foldgutter.es.js").then((u) => u.f),
        import("./brace-fold.es.js").then((u) => u.b),
        import("./dialog.es.js").then((u) => u.d),
        import("./search.es.js").then((u) => u.s),
        import("./searchcursor.es.js").then((u) => u.s),
        import("./jump-to-line.es.js").then((u) => u.j),
        // @ts-expect-error
        import("./sublime.es.js").then((u) => u.s),
        import("./mode.es3.js"),
        import("./info-addon.es.js")
      ],
      { useCommonAddons: !1 }
    ).then((u) => {
      if (!y)
        return;
      const g = document.createElement("div");
      u.registerHelper(
        "info",
        "graphql-results",
        (b, N, L, x) => {
          const w = [], V = m.current;
          return V && w.push(
            /* @__PURE__ */ o(V, { pos: x, token: b })
          ), lt.shouldRender(b) && w.push(
            /* @__PURE__ */ o(lt, { token: b }, "image-preview")
          ), w.length ? (ft.render(w, g), g) : (ft.unmountComponentAtNode(g), null);
        }
      );
      const C = p.current;
      if (!C)
        return;
      const d = u(C, {
        value: i,
        lineWrapping: !0,
        readOnly: !0,
        theme: t,
        mode: "graphql-results",
        foldGutter: !0,
        gutters: ["CodeMirror-foldgutter"],
        // @ts-expect-error
        info: !0,
        extraKeys: Ze
      });
      f(d);
    }), () => {
      y = !1;
    };
  }, [t, i, f]), Ge(h, "keyMap", n), P(() => {
    l && (h == null || h.setValue(l)), c.length > 0 && (h == null || h.setValue(ye(c)));
  }, [h, l, c]), p;
}
s(it, "useResponseEditor");
function Mo(e) {
  const t = it(e, Mo);
  return /* @__PURE__ */ o(
    "section",
    {
      className: "result-window",
      "aria-label": "Result Window",
      "aria-live": "polite",
      "aria-atomic": "true",
      ref: t
    }
  );
}
s(Mo, "ResponseEditor");
function Lt({ isHidden: e, ...t }) {
  const { variableEditor: n } = j({
    nonNull: !0,
    caller: Lt
  }), r = me(t, Lt);
  return P(() => {
    n && !e && n.refresh();
  }, [n, e]), /* @__PURE__ */ o("div", { className: G("graphiql-editor", e && "hidden"), ref: r });
}
s(Lt, "VariableEditor");
function il({
  children: e,
  dangerouslyAssumeSchemaIsValid: t,
  defaultQuery: n,
  defaultHeaders: r,
  defaultTabs: l,
  externalFragments: c,
  fetcher: i,
  getDefaultFieldNames: h,
  headers: f,
  inputValueDeprecation: p,
  introspectionQueryName: m,
  maxHistoryLength: y,
  onEditOperationName: u,
  onSchemaChange: g,
  onTabChange: C,
  onTogglePluginVisibility: d,
  operationName: b,
  plugins: N,
  query: L,
  response: x,
  schema: w,
  schemaDescription: V,
  shouldPersistHeaders: B,
  storage: _,
  validationRules: D,
  variables: O,
  visiblePlugin: W
}) {
  return /* @__PURE__ */ o(Fn, { storage: _, children: /* @__PURE__ */ o(Wr, { maxHistoryLength: y, children: /* @__PURE__ */ o(
    So,
    {
      defaultQuery: n,
      defaultHeaders: r,
      defaultTabs: l,
      externalFragments: c,
      headers: f,
      onEditOperationName: u,
      onTabChange: C,
      query: L,
      response: x,
      shouldPersistHeaders: B,
      validationRules: D,
      variables: O,
      children: /* @__PURE__ */ o(
        Zt,
        {
          dangerouslyAssumeSchemaIsValid: t,
          fetcher: i,
          inputValueDeprecation: p,
          introspectionQueryName: m,
          onSchemaChange: g,
          schema: w,
          schemaDescription: V,
          children: /* @__PURE__ */ o(
            et,
            {
              getDefaultFieldNames: h,
              fetcher: i,
              operationName: b,
              children: /* @__PURE__ */ o(Qt, { children: /* @__PURE__ */ o(
                io,
                {
                  onTogglePluginVisibility: d,
                  plugins: N,
                  visiblePlugin: W,
                  children: e
                }
              ) })
            }
          )
        }
      )
    }
  ) }) });
}
s(il, "GraphiQLProvider");
function sl() {
  const e = de(), [t, n] = I(() => {
    if (!e)
      return null;
    const l = e.get(Ue);
    switch (l) {
      case "light":
        return "light";
      case "dark":
        return "dark";
      default:
        return typeof l == "string" && e.set(Ue, ""), null;
    }
  });
  Ke(() => {
    typeof window > "u" || (document.body.classList.remove("graphiql-light", "graphiql-dark"), t && document.body.classList.add(`graphiql-${t}`));
  }, [t]);
  const r = M(
    (l) => {
      e == null || e.set(Ue, l || ""), n(l);
    },
    [e]
  );
  return Q(() => ({ theme: t, setTheme: r }), [t, r]);
}
s(sl, "useTheme");
const Ue = "theme";
function al({
  defaultSizeRelation: e = Vo,
  direction: t,
  initiallyHidden: n,
  onHiddenElementChange: r,
  sizeThresholdFirst: l = 100,
  sizeThresholdSecond: c = 100,
  storageKey: i
}) {
  const h = de(), f = Q(
    () => pe(500, (L) => {
      i && (h == null || h.set(i, L));
    }),
    [h, i]
  ), [p, m] = I(
    () => {
      const L = i && (h == null ? void 0 : h.get(i));
      return L === Ve || n === "first" ? "first" : L === Re || n === "second" ? "second" : null;
    }
  ), y = M(
    (L) => {
      L !== p && (m(L), r == null || r(L));
    },
    [p, r]
  ), u = $(null), g = $(null), C = $(null), d = $(`${e}`);
  Ke(() => {
    const L = i && (h == null ? void 0 : h.get(i)) || d.current;
    u.current && (u.current.style.display = "flex", u.current.style.flex = L === Ve || L === Re ? d.current : L), C.current && (C.current.style.display = "flex", C.current.style.flex = "1"), g.current && (g.current.style.display = "flex");
  }, [t, h, i]);
  const b = M((L) => {
    const x = L === "first" ? u.current : C.current;
    if (x && (x.style.left = "-1000px", x.style.position = "absolute", x.style.opacity = "0", x.style.height = "500px", x.style.width = "500px", u.current)) {
      const w = parseFloat(u.current.style.flex);
      (!Number.isFinite(w) || w < 1) && (u.current.style.flex = "1");
    }
  }, []), N = M(
    (L) => {
      const x = L === "first" ? u.current : C.current;
      if (x && (x.style.width = "", x.style.height = "", x.style.opacity = "", x.style.position = "", x.style.left = "", h && i)) {
        const w = h.get(i);
        u.current && w !== Ve && w !== Re && (u.current.style.flex = w || d.current);
      }
    },
    [h, i]
  );
  return Ke(() => {
    p === "first" ? b("first") : N("first"), p === "second" ? b("second") : N("second");
  }, [p, b, N]), P(() => {
    if (!g.current || !u.current || !C.current)
      return;
    const L = g.current, x = u.current, w = x.parentElement, V = t === "horizontal" ? "clientX" : "clientY", B = t === "horizontal" ? "left" : "top", _ = t === "horizontal" ? "right" : "bottom", D = t === "horizontal" ? "clientWidth" : "clientHeight";
    function O(F) {
      F.preventDefault();
      const A = F[V] - L.getBoundingClientRect()[B];
      function k(E) {
        if (E.buttons === 0)
          return H();
        const Z = E[V] - w.getBoundingClientRect()[B] - A, v = w.getBoundingClientRect()[_] - E[V] + A - L[D];
        if (Z < l)
          y("first"), f(Ve);
        else if (v < c)
          y("second"), f(Re);
        else {
          y(null);
          const S = `${Z / v}`;
          x.style.flex = S, f(S);
        }
      }
      s(k, "handleMouseMove");
      function H() {
        document.removeEventListener("mousemove", k), document.removeEventListener("mouseup", H);
      }
      s(H, "handleMouseUp"), document.addEventListener("mousemove", k), document.addEventListener("mouseup", H);
    }
    s(O, "handleMouseDown"), L.addEventListener("mousedown", O);
    function W() {
      u.current && (u.current.style.flex = d.current), f(d.current), y(null);
    }
    return s(W, "reset"), L.addEventListener("dblclick", W), () => {
      L.removeEventListener("mousedown", O), L.removeEventListener("dblclick", W);
    };
  }, [
    t,
    y,
    l,
    c,
    f
  ]), Q(
    () => ({
      dragBarRef: g,
      hiddenElement: p,
      firstRef: u,
      setHiddenElement: m,
      secondRef: C
    }),
    [p, m]
  );
}
s(al, "useDragResize");
const Vo = 1, Ve = "hide-first", Re = "hide-second";
const Ro = J(({ label: e, onClick: t, ...n }, r) => {
  const [l, c] = I(null), i = M(
    (h) => {
      try {
        t == null || t(h), c(null);
      } catch (f) {
        c(
          f instanceof Error ? f : new Error(`Toolbar button click failed: ${f}`)
        );
      }
    },
    [t]
  );
  return /* @__PURE__ */ o(ae, { label: e, children: /* @__PURE__ */ o(
    X,
    {
      ...n,
      ref: r,
      type: "button",
      className: G(
        "graphiql-toolbar-button",
        l && "error",
        n.className
      ),
      onClick: i,
      "aria-label": l ? l.message : e,
      "aria-invalid": l ? "true" : n["aria-invalid"]
    }
  ) });
});
Ro.displayName = "ToolbarButton";
function St() {
  const { queryEditor: e, setOperationName: t } = j({
    nonNull: !0,
    caller: St
  }), { isFetching: n, isSubscribed: r, operationName: l, run: c, stop: i } = We({
    nonNull: !0,
    caller: St
  }), h = (e == null ? void 0 : e.operations) || [], f = h.length > 1 && typeof l != "string", p = n || r, m = `${p ? "Stop" : "Execute"} query (Ctrl-Enter)`, y = {
    type: "button",
    className: "graphiql-execute-button",
    children: p ? /* @__PURE__ */ o(Pr, {}) : /* @__PURE__ */ o(Vr, {}),
    "aria-label": m
  };
  return f && !p ? /* @__PURE__ */ T(le, { children: [
    /* @__PURE__ */ o(ae, { label: m, children: /* @__PURE__ */ o(le.Button, { ...y }) }),
    /* @__PURE__ */ o(le.Content, { children: h.map((u, g) => {
      const C = u.name ? u.name.value : `<Unnamed ${u.operation}>`;
      return /* @__PURE__ */ o(
        le.Item,
        {
          onSelect: () => {
            var b;
            const d = (b = u.name) == null ? void 0 : b.value;
            e && d && d !== e.operationName && t(d), c();
          },
          children: C
        },
        `${C}-${g}`
      );
    }) })
  ] }) : /* @__PURE__ */ o(ae, { label: m, children: /* @__PURE__ */ o(
    "button",
    {
      ...y,
      onClick: () => {
        p ? i() : c();
      }
    }
  ) });
}
s(St, "ExecuteButton");
const Ho = /* @__PURE__ */ s(({
  button: e,
  children: t,
  label: n,
  ...r
}) => /* @__PURE__ */ T(le, { ...r, children: [
  /* @__PURE__ */ o(ae, { label: n, children: /* @__PURE__ */ o(
    le.Button,
    {
      className: G(
        "graphiql-un-styled graphiql-toolbar-menu",
        r.className
      ),
      "aria-label": n,
      children: e
    }
  ) }),
  /* @__PURE__ */ o(le.Content, { children: t })
] }), "ToolbarMenuRoot"), cl = Le(Ho, {
  Item: le.Item
});
export {
  qe as Argument,
  gr as ArgumentIcon,
  Fe as Button,
  qr as ButtonGroup,
  Uo as ChevronDownIcon,
  Cr as ChevronLeftIcon,
  Ko as ChevronUpIcon,
  st as CloseIcon,
  Jo as CopyIcon,
  ve as DOC_EXPLORER_PLUGIN,
  $t as DefaultValue,
  yr as DeprecatedArgumentIcon,
  vr as DeprecatedEnumValueIcon,
  br as DeprecatedFieldIcon,
  jt as DeprecationReason,
  ol as Dialog,
  Dr as DialogRoot,
  zr as Directive,
  wr as DirectiveIcon,
  rt as DocExplorer,
  xr as DocsFilledIcon,
  Er as DocsIcon,
  le as DropdownMenu,
  ln as EditorContext,
  So as EditorContextProvider,
  Lr as EnumValueIcon,
  St as ExecuteButton,
  Bt as ExecutionContext,
  et as ExecutionContextProvider,
  Gt as ExplorerContext,
  Qt as ExplorerContextProvider,
  K as ExplorerSection,
  Kr as FieldDocumentation,
  Sr as FieldIcon,
  eo as FieldLink,
  il as GraphiQLProvider,
  bt as HISTORY_PLUGIN,
  Et as HeaderEditor,
  _r as History,
  Ft as HistoryContext,
  Wr as HistoryContextProvider,
  Nr as HistoryIcon,
  lt as ImagePreview,
  kr as ImplementsIcon,
  Yo as KeyboardShortcutIcon,
  Tr as MagnifyingGlassIcon,
  ne as MarkdownContent,
  Xo as MergeIcon,
  Mr as PenIcon,
  Vr as PlayIcon,
  Ut as PluginContext,
  io as PluginContextProvider,
  el as PlusIcon,
  tl as PrettifyIcon,
  To as QueryEditor,
  nl as ReloadIcon,
  Mo as ResponseEditor,
  Rr as RootTypeIcon,
  _t as SchemaContext,
  Zt as SchemaContextProvider,
  Xr as SchemaDocumentation,
  zt as Search,
  rl as SettingsIcon,
  qt as Spinner,
  Hr as StarFilledIcon,
  Ar as StarIcon,
  Pr as StopIcon,
  Ht as StorageContext,
  Fn as StorageContextProvider,
  ll as Tab,
  Br as Tabs,
  Ro as ToolbarButton,
  cl as ToolbarMenu,
  ae as Tooltip,
  Fr as TooltipRoot,
  to as TypeDocumentation,
  ke as TypeIcon,
  ee as TypeLink,
  X as UnStyledButton,
  Lt as VariableEditor,
  ot as useAutoCompleteLeafs,
  Yt as useCopyQuery,
  al as useDragResize,
  j as useEditorContext,
  We as useExecutionContext,
  ie as useExplorerContext,
  Ce as useHeaderEditor,
  Be as useHistoryContext,
  be as useMergeQuery,
  at as usePluginContext,
  Qe as usePrettifyEditors,
  se as useQueryEditor,
  it as useResponseEditor,
  re as useSchemaContext,
  de as useStorageContext,
  sl as useTheme,
  me as useVariableEditor
};
//# sourceMappingURL=index.mjs.map

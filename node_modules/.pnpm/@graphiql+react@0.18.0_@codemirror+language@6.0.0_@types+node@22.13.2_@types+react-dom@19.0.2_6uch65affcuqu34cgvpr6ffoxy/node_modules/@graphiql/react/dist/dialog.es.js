var s = Object.defineProperty;
var n = (e, o) => s(e, "name", { value: o, configurable: !0 });
import { g } from "./codemirror.es2.js";
import { r as l } from "./dialog.es2.js";
function c(e, o) {
  for (var a = 0; a < o.length; a++) {
    const r = o[a];
    if (typeof r != "string" && !Array.isArray(r)) {
      for (const t in r)
        if (t !== "default" && !(t in e)) {
          const i = Object.getOwnPropertyDescriptor(r, t);
          i && Object.defineProperty(e, t, i.get ? i : {
            enumerable: !0,
            get: () => r[t]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }));
}
n(c, "_mergeNamespaces");
var f = l();
const p = /* @__PURE__ */ g(f), y = /* @__PURE__ */ c({
  __proto__: null,
  default: p
}, [f]);
export {
  y as d
};
//# sourceMappingURL=dialog.es.js.map

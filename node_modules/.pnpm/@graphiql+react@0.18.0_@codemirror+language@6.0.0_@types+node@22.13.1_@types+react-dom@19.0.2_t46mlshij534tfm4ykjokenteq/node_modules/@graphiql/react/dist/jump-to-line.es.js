var m = Object.defineProperty;
var f = (u, p) => m(u, "name", { value: p, configurable: !0 });
import { g as d, r as g } from "./codemirror.es2.js";
import { r as h } from "./dialog.es2.js";
function b(u, p) {
  for (var o = 0; o < p.length; o++) {
    const s = p[o];
    if (typeof s != "string" && !Array.isArray(s)) {
      for (const i in s)
        if (i !== "default" && !(i in u)) {
          const a = Object.getOwnPropertyDescriptor(s, i);
          a && Object.defineProperty(u, i, a.get ? a : {
            enumerable: !0,
            get: () => s[i]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(u, Symbol.toStringTag, { value: "Module" }));
}
f(b, "_mergeNamespaces");
var j = { exports: {} };
(function(u, p) {
  (function(o) {
    o(g(), h());
  })(function(o) {
    o.defineOption("search", { bottom: !1 });
    function s(e, t, n, r, l) {
      e.openDialog ? e.openDialog(t, l, { value: r, selectValueOnOpen: !0, bottom: e.options.search.bottom }) : l(prompt(n, r));
    }
    f(s, "dialog");
    function i(e) {
      return e.phrase("Jump to line:") + ' <input type="text" style="width: 10em" class="CodeMirror-search-field"/> <span style="color: #888" class="CodeMirror-search-hint">' + e.phrase("(Use line:column or scroll% syntax)") + "</span>";
    }
    f(i, "getJumpDialog");
    function a(e, t) {
      var n = Number(t);
      return /^[-+]/.test(t) ? e.getCursor().line + n : n - 1;
    }
    f(a, "interpretLine"), o.commands.jumpToLine = function(e) {
      var t = e.getCursor();
      s(e, i(e), e.phrase("Jump to line:"), t.line + 1 + ":" + t.ch, function(n) {
        if (n) {
          var r;
          if (r = /^\s*([\+\-]?\d+)\s*\:\s*(\d+)\s*$/.exec(n))
            e.setCursor(a(e, r[1]), Number(r[2]));
          else if (r = /^\s*([\+\-]?\d+(\.\d+)?)\%\s*/.exec(n)) {
            var l = Math.round(e.lineCount() * Number(r[1]) / 100);
            /^[-+]/.test(r[1]) && (l = t.line + l + 1), e.setCursor(l - 1, t.ch);
          } else
            (r = /^\s*\:?\s*([\+\-]?\d+)\s*/.exec(n)) && e.setCursor(a(e, r[1]), t.ch);
        }
      });
    }, o.keyMap.default["Alt-G"] = "jumpToLine";
  });
})();
var c = j.exports;
const y = /* @__PURE__ */ d(c), O = /* @__PURE__ */ b({
  __proto__: null,
  default: y
}, [c]);
export {
  O as j
};
//# sourceMappingURL=jump-to-line.es.js.map

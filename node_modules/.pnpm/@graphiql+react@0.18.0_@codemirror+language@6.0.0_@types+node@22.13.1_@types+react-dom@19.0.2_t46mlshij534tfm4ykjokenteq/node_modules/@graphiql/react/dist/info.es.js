var D = Object.defineProperty;
var m = (a, e) => D(a, "name", { value: e, configurable: !0 });
import { GraphQLNonNull as s, GraphQLList as u } from "graphql";
import { C as E } from "./codemirror.es.js";
import { g as N, a as T, b as g, c as h, d as C, e as f } from "./SchemaReference.es.js";
import "./info-addon.es.js";
import "./codemirror.es2.js";
import "./forEachState.es.js";
E.registerHelper("info", "graphql", (a, e) => {
  if (!e.schema || !a.state)
    return;
  const { kind: d, step: n } = a.state, r = N(e.schema, a.state);
  if (d === "Field" && n === 0 && r.fieldDef || d === "AliasedField" && n === 2 && r.fieldDef) {
    const i = document.createElement("div");
    i.className = "CodeMirror-info-header", M(i, r, e);
    const c = document.createElement("div");
    return c.append(i), o(c, e, r.fieldDef), c;
  }
  if (d === "Directive" && n === 1 && r.directiveDef) {
    const i = document.createElement("div");
    i.className = "CodeMirror-info-header", V(i, r, e);
    const c = document.createElement("div");
    return c.append(i), o(c, e, r.directiveDef), c;
  }
  if (d === "Argument" && n === 0 && r.argDef) {
    const i = document.createElement("div");
    i.className = "CodeMirror-info-header", x(i, r, e);
    const c = document.createElement("div");
    return c.append(i), o(c, e, r.argDef), c;
  }
  if (d === "EnumValue" && r.enumValue && r.enumValue.description) {
    const i = document.createElement("div");
    i.className = "CodeMirror-info-header", L(i, r, e);
    const c = document.createElement("div");
    return c.append(i), o(c, e, r.enumValue), c;
  }
  if (d === "NamedType" && r.type && r.type.description) {
    const i = document.createElement("div");
    i.className = "CodeMirror-info-header", l(i, r, e, r.type);
    const c = document.createElement("div");
    return c.append(i), o(c, e, r.type), c;
  }
});
function M(a, e, d) {
  y(a, e, d), p(a, e, d, e.type);
}
m(M, "renderField");
function y(a, e, d) {
  var n;
  const r = ((n = e.fieldDef) === null || n === void 0 ? void 0 : n.name) || "";
  t(a, r, "field-name", d, T(e));
}
m(y, "renderQualifiedField");
function V(a, e, d) {
  var n;
  const r = "@" + (((n = e.directiveDef) === null || n === void 0 ? void 0 : n.name) || "");
  t(a, r, "directive-name", d, g(e));
}
m(V, "renderDirective");
function x(a, e, d) {
  var n;
  const r = ((n = e.argDef) === null || n === void 0 ? void 0 : n.name) || "";
  t(a, r, "arg-name", d, h(e)), p(a, e, d, e.inputType);
}
m(x, "renderArg");
function L(a, e, d) {
  var n;
  const r = ((n = e.enumValue) === null || n === void 0 ? void 0 : n.name) || "";
  l(a, e, d, e.inputType), t(a, "."), t(a, r, "enum-value", d, C(e));
}
m(L, "renderEnumValue");
function p(a, e, d, n) {
  const r = document.createElement("span");
  r.className = "type-name-pill", n instanceof s ? (l(r, e, d, n.ofType), t(r, "!")) : n instanceof u ? (t(r, "["), l(r, e, d, n.ofType), t(r, "]")) : t(r, (n == null ? void 0 : n.name) || "", "type-name", d, f(e, n)), a.append(r);
}
m(p, "renderTypeAnnotation");
function l(a, e, d, n) {
  n instanceof s ? (l(a, e, d, n.ofType), t(a, "!")) : n instanceof u ? (t(a, "["), l(a, e, d, n.ofType), t(a, "]")) : t(a, (n == null ? void 0 : n.name) || "", "type-name", d, f(e, n));
}
m(l, "renderType");
function o(a, e, d) {
  const { description: n } = d;
  if (n) {
    const r = document.createElement("div");
    r.className = "info-description", e.renderDescription ? r.innerHTML = e.renderDescription(n) : r.append(document.createTextNode(n)), a.append(r);
  }
  R(a, e, d);
}
m(o, "renderDescription");
function R(a, e, d) {
  const n = d.deprecationReason;
  if (n) {
    const r = document.createElement("div");
    r.className = "info-deprecation", a.append(r);
    const i = document.createElement("span");
    i.className = "info-deprecation-label", i.append(document.createTextNode("Deprecated")), r.append(i);
    const c = document.createElement("div");
    c.className = "info-deprecation-reason", e.renderDescription ? c.innerHTML = e.renderDescription(n) : c.append(document.createTextNode(n)), r.append(c);
  }
}
m(R, "renderDeprecation");
function t(a, e, d = "", n = { onClick: null }, r = null) {
  if (d) {
    const { onClick: i } = n;
    let c;
    i ? (c = document.createElement("a"), c.href = "javascript:void 0", c.addEventListener("click", (v) => {
      i(r, v);
    })) : c = document.createElement("span"), c.className = d, c.append(document.createTextNode(e)), a.append(c);
  } else
    a.append(document.createTextNode(e));
}
m(t, "text");
//# sourceMappingURL=info.es.js.map

var E = Object.defineProperty;
var r = (m, p) => E(m, "name", { value: p, configurable: !0 });
import { r as T } from "./codemirror.es2.js";
var h = { exports: {} }, y;
function k() {
  return y || (y = 1, function(m, p) {
    (function(n) {
      n(T());
    })(function(n) {
      function d(o, f, e) {
        var u = o.getWrapperElement(), l;
        return l = u.appendChild(document.createElement("div")), e ? l.className = "CodeMirror-dialog CodeMirror-dialog-bottom" : l.className = "CodeMirror-dialog CodeMirror-dialog-top", typeof f == "string" ? l.innerHTML = f : l.appendChild(f), n.addClass(u, "dialog-opened"), l;
      }
      r(d, "dialogDiv");
      function v(o, f) {
        o.state.currentNotificationClose && o.state.currentNotificationClose(), o.state.currentNotificationClose = f;
      }
      r(v, "closeNotification"), n.defineExtension("openDialog", function(o, f, e) {
        e || (e = {}), v(this, null);
        var u = d(this, o, e.bottom), l = !1, c = this;
        function i(t) {
          if (typeof t == "string")
            a.value = t;
          else {
            if (l)
              return;
            l = !0, n.rmClass(u.parentNode, "dialog-opened"), u.parentNode.removeChild(u), c.focus(), e.onClose && e.onClose(u);
          }
        }
        r(i, "close");
        var a = u.getElementsByTagName("input")[0], s;
        return a ? (a.focus(), e.value && (a.value = e.value, e.selectValueOnOpen !== !1 && a.select()), e.onInput && n.on(a, "input", function(t) {
          e.onInput(t, a.value, i);
        }), e.onKeyUp && n.on(a, "keyup", function(t) {
          e.onKeyUp(t, a.value, i);
        }), n.on(a, "keydown", function(t) {
          e && e.onKeyDown && e.onKeyDown(t, a.value, i) || ((t.keyCode == 27 || e.closeOnEnter !== !1 && t.keyCode == 13) && (a.blur(), n.e_stop(t), i()), t.keyCode == 13 && f(a.value, t));
        }), e.closeOnBlur !== !1 && n.on(u, "focusout", function(t) {
          t.relatedTarget !== null && i();
        })) : (s = u.getElementsByTagName("button")[0]) && (n.on(s, "click", function() {
          i(), c.focus();
        }), e.closeOnBlur !== !1 && n.on(s, "blur", i), s.focus()), i;
      }), n.defineExtension("openConfirm", function(o, f, e) {
        v(this, null);
        var u = d(this, o, e && e.bottom), l = u.getElementsByTagName("button"), c = !1, i = this, a = 1;
        function s() {
          c || (c = !0, n.rmClass(u.parentNode, "dialog-opened"), u.parentNode.removeChild(u), i.focus());
        }
        r(s, "close"), l[0].focus();
        for (var t = 0; t < l.length; ++t) {
          var g = l[t];
          (function(N) {
            n.on(g, "click", function(b) {
              n.e_preventDefault(b), s(), N && N(i);
            });
          })(f[t]), n.on(g, "blur", function() {
            --a, setTimeout(function() {
              a <= 0 && s();
            }, 200);
          }), n.on(g, "focus", function() {
            ++a;
          });
        }
      }), n.defineExtension("openNotification", function(o, f) {
        v(this, i);
        var e = d(this, o, f && f.bottom), u = !1, l, c = f && typeof f.duration < "u" ? f.duration : 5e3;
        function i() {
          u || (u = !0, clearTimeout(l), n.rmClass(e.parentNode, "dialog-opened"), e.parentNode.removeChild(e));
        }
        return r(i, "close"), n.on(e, "click", function(a) {
          n.e_preventDefault(a), i();
        }), c && (l = setTimeout(i, c)), i;
      });
    });
  }()), h.exports;
}
r(k, "requireDialog");
export {
  k as r
};
//# sourceMappingURL=dialog.es2.js.map

$(function () {
  $.fn.CustomSelect = function (c) {
    var h = {
        prefix: "b-custom-select",
        modifier: "",
        visRows: 10,
        search: false,
        customScroll: true,
        speed: 100,
        internalMode: false,
      },
      b = {
        UP: 38,
        DOWN: 40,
        LEFT: 37,
        RIGHT: 39,
        ENTER: 13,
        SPACE: 32,
        ESC: 27,
      },
      d = $.extend({}, h, c || {});
    d.stateClasses = {
      disabled: d.prefix + "_disabled",
      multiple: d.prefix + "_multiple",
      focus: d.prefix + "_focus",
      expanded: d.prefix + "_expanded",
      itemDisabled: "disabled",
      itemSelected: "selected",
      itemHidden: "hidden",
    };
    this.each(function () {
      var E = $(this),
        i = E.data("title"),
        x = E.attr("disabled") == "disabled",
        o = E.attr("multiple") == "multiple",
        p = E.attr("hidden") == "hidden",
        F = o ? false : d.search,
        D = 0,
        G = 0,
        z = E.outerWidth(),
        w = f();
      var H = $("<div>", {
          class: d.prefix + "__title",
          html:
            '<i class="' + d.prefix + '__title__icon fa fa-angle-down"></i>',
        }),
        t = $("<div>", { class: d.prefix + "__title__text" }),
        l = $("<input>", { type: "text", class: d.prefix + "__title__input" }),
        q = $("<div>", {
          class:
            d.prefix +
            (typeof d.modifier == "string" && d.modifier != ""
              ? " " + d.prefix + "_" + d.modifier
              : ""),
          html: H,
        }),
        B = $("<div>", { class: d.prefix + "__list" }),
        s = $("<div>", {
          class:
            d.prefix +
            "__dropdown" +
            (typeof d.modifier == "string" && d.modifier != ""
              ? " " + d.prefix + "__dropdown_" + d.modifier
              : ""),
          html: B,
        }),
        u = $("<div>", { class: d.prefix + "__dropdown__inner" }).css({
          height: "100%",
          "min-width": "100px",
        }),
        k = $("<div>", { class: d.prefix + "__scrollbar" }),
        m = $("<div>", { class: d.prefix + "__wrap-scrollbar", html: k });
      s.css({
        display: "none",
        position: "absolute",
        width: z + m.width(),
        zIndex: 999,
      });
      l.css({
        width:
          z +
          m.width() -
          $("." + d.prefix + "__title__icon fa fa-angle-down").outerWidth(),
      });
      q.css({ width: z + m.width() });
      B.usekey = false;
      B.wrap(u);
      u = $("." + d.prefix + "__dropdown__inner", s);
      n();
      E.css({ position: "absolute", opacity: 0.1, width: 0, height: 0 }).after(
        q
      );
      s.bind("show", function () {
        if (s.is(":animated")) {
          return false;
        }
        if (!F) {
          E.focus();
        }
        $("body").append(s);
        q.addClass(d.stateClasses.expanded).addClass(d.stateClasses.focus);
        var O = 0,
          I = G + D,
          M = q.offset(),
          K = M.left,
          N = M.top + q.outerHeight(),
          J = B.outerHeight() - B.height();
        if (d.internalMode) {
          N = "100%";
          K = 0;
          q.append(s);
        } else {
          $("body").append(s);
        }
        s.css({ left: K, top: N, height: 0 }).show();
        if (G > d.visRows) {
          I = d.visRows;
        }
        for (var L = 0; L < I; L++) {
          J += B.find("div:visible").eq(L).outerHeight(true);
        }
        s.animate({ height: J }, d.speed, function () {
          if (G > d.visRows) {
            k.height((u.height() * u.height()) / B.outerHeight());
            O =
              $("." + d.stateClasses.itemSelected, B).index() > d.visRows
                ? $("." + d.stateClasses.itemSelected, B).position().top -
                  parseInt(B.css("padding-top"), 10)
                : 0;
            u.scrollTop(O);
            if (O == 0) {
              u.trigger("scroll");
            }
          }
        });
      })
        .bind("hide", function () {
          if (s.is(":animated")) {
            return false;
          }
          s.slideUp(d.speed, function () {
            q.removeClass(d.stateClasses.expanded);
            s.detach();
            if (F && l.val() == "") {
              $("." + d.prefix + "__item_notfound", B).remove();
              B.find("div").show();
            }
          });
        })
        .bind("toggle", function () {
          if (q.hasClass(d.stateClasses.expanded)) {
            s.trigger("hide");
          } else {
            s.trigger("show");
          }
        });
      E.on("focus", function (I) {
        q.addClass(d.stateClasses.focus);
      })
        .on("blur", function (I) {
          q.removeClass(d.stateClasses.focus);
        })
        .on("keydown", function (I) {
          switch (I.keyCode) {
            case b.UP:
            case b.LEFT:
              r(
                $("." + d.stateClasses.itemSelected, B).prevAll(
                  "." + d.prefix + "__item:not(.disabled):first"
                )
              );
              break;
            case b.DOWN:
            case b.RIGHT:
              r(
                $("." + d.stateClasses.itemSelected, B).nextAll(
                  "." + d.prefix + "__item:not(.disabled):first"
                )
              );
              break;
            case b.ENTER:
              $("." + d.stateClasses.itemSelected, B).click();
              I.preventDefault();
              break;
            case b.SPACE:
              if (!q.is("." + d.stateClasses.expanded)) {
                s.trigger("show");
              }
              I.preventDefault();
              break;
          }
        })
        .bind("update", function (I) {
          s.trigger("hide");
          n();
        });
      l.on("focus", function () {
        $(this).select();
      })
        .on("keyup", function (J) {
          switch (J.keyCode) {
            case b.ESC:
              s.trigger("hide");
              break;
            case (b.UP, b.DOWN):
              console.log(J);
              E.trigger(J);
              break;
            default:
              clearTimeout($.data(this, "timer"));
              var I = setTimeout(function () {
                C(l.val());
              }, 500);
              $(this).data("timer", I);
              break;
          }
        })
        .on("blur", function () {
          if ($(this).val() == "") {
            v(i);
          }
        });
      function n() {
        B.empty();
        G = $("option", E).length;
        D = $("optgroup", E).length;
        i = E.data("title");
        x = E.attr("disabled") == "disabled";
        o = E.attr("multiple") == "multiple";
        (p = E.attr("hidden") == "hidden"),
          $("option", E).each(function (K) {
            var M = $(this),
              I = M.data("modifier"),
              J = $("<div>", {
                class: d.prefix + "__item",
                title: M.text(),
                text: M.text(),
              });
            if (I) {
              J.addClass(d.prefix + "__item_" + I);
            }
            if (M.is(":selected") && M.val() != i && i != "undefined") {
              v(M.text());
              J.addClass(d.stateClasses.itemSelected)
                .siblings()
                .removeClass(d.stateClasses.itemSelected);
            }
            if (M.is(":disabled")) {
              J.addClass(d.stateClasses.itemDisabled);
            } else {
              J.on("click", function (N) {
                N.preventDefault();
                if (o) {
                  if (!$(this).hasClass(d.stateClasses.itemSelected)) {
                    $(this).addClass(d.stateClasses.itemSelected);
                    M.attr({ selected: "selected" });
                  } else {
                    $(this).removeClass(d.stateClasses.itemSelected);
                    M.removeAttr("selected");
                  }
                  v(
                    "Выбрано [" +
                      $("." + d.stateClasses.itemSelected, B).length +
                      "]"
                  );
                  E.change();
                } else {
                  if (!$(this).hasClass(d.stateClasses.itemSelected)) {
                    $(this)
                      .addClass(d.stateClasses.itemSelected)
                      .siblings()
                      .removeClass(d.stateClasses.itemSelected);
                    v(M.text());
                    if (!B.usekey) {
                      E.val(M.val()).change();
                    }
                  }
                  if (q.is("." + d.stateClasses.expanded) && !B.usekey) {
                    s.trigger("hide");
                  }
                  B.usekey = false;
                }
              });
            }
            if (M.parent().is("optgroup") && M.is(":first-child")) {
              var L = M.parent();
              B.append(
                $("<div>", {
                  class: d.prefix + "__group",
                  title: L.attr("label"),
                  text: L.attr("label"),
                })
              );
            }
            B.append(J);
          });
        if (G > d.visRows) {
          A();
        } else {
          j();
        }
        if (F) {
          H.prepend(l);
        } else {
          H.prepend(t);
        }
        if (x) {
          q.addClass(d.stateClasses.disabled);
          if (F) {
            l.attr("disabled", "disabled");
          }
          H.unbind("click");
        } else {
          if (G + D > 0) {
            q.removeClass(d.stateClasses.disabled);
            l.removeAttr("disabled", "disabled");
            H.on("click", function (I) {
              I.preventDefault();
              $("." + d.prefix + "__dropdown")
                .not(s)
                .trigger("hide");
              s.trigger("toggle");
            });
          }
        }
        if (o) {
          q.addClass(d.stateClasses.multiple);
          if (
            typeof i == "undefined" ||
            $("." + d.stateClasses.itemSelected, B).length > 0
          ) {
            i =
              "Выбрано [" +
              $("." + d.stateClasses.itemSelected, B).length +
              "]";
          }
        }
        v(i);
      }
      function r(Q) {
        var O = Q,
          J = O.index();
        B.usekey = true;
        if (J < 0) {
          return;
        }
        var N = $("." + d.stateClasses.itemSelected, B),
          K = $("." + d.prefix + "__item:first", B).outerHeight(true),
          P = s.height(),
          I = -1,
          J = O.index(),
          M = N.index(),
          L = O.position().top;
        if (J < M && L <= K) {
          I = u.scrollTop() + L - parseInt(B.css("padding-top"), 10);
        } else {
          if (J > M && K >= P - L) {
            I =
              u.scrollTop() + L + K - P + parseInt(B.css("padding-bottom"), 10);
          }
        }
        O.click();
        if (I >= 0) {
          u.scrollTop(I);
        }
      }
      function v(I) {
        if (F) {
          l.val(I);
        } else {
          t.text(I);
        }
      }
      function A() {
        u.css({ overflow: "hidden" });
        if (d.customScroll) {
          u.css({ width: z + w + "px" });
          var J = false;
          var I = 0;
          B.after(m);
          u.on("scroll", function () {
            k.css({ top: y() + "px" });
          });
          k.on("mousedown", function (K) {
            J = true;
            e(1);
            I = K.clientY - y();
          });
          $(document)
            .on("mouseup blur", function (K) {
              J = false;
              e();
            })
            .on("mousemove", function (L) {
              if (J) {
                var K =
                  ((L.clientY - I) * (B.outerHeight(true) - u.height())) /
                  (u.height() - k.outerHeight(true));
                u.scrollTop(K);
              }
            });
        }
      }
      function j() {
        u.css({ width: "auto", "overflow-y": "visible" });
        B.css({ "margin-right": 0 });
        m.remove();
      }
      function y() {
        return (
          (u.scrollTop() / (B.outerHeight(true) - u.height())) *
          (u.height() - k.outerHeight(true))
        );
      }
      function C(J) {
        var I,
          L = 0,
          K = a(J);
        K = "^.*?" + K + ".*$";
        J = new RegExp(K, "i");
        $("." + d.prefix + "__item", B).each(function () {
          I = $(this);
          if (J.test(I.text())) {
            I.show();
            L++;
          } else {
            I.hide();
          }
        });
        if (L > d.visRows) {
          A();
        } else {
          j();
        }
        if (L > 0) {
          $("." + d.prefix + "__item_notfound", B).remove();
          s.trigger("show");
        } else {
          if (!$("." + d.prefix + "__item_notfound", B).length) {
            B.append(
              $("<div>", {
                class: d.prefix + "__item " + d.prefix + "__item_notfound",
                text: "Ничего не найдено!",
              })
            );
          }
        }
        s.trigger("show");
      }
    });
    function f() {
      var k = $("<div>", { class: d.prefix + "__dropdown__inner" }).css({
          position: "absolute",
          top: "-100px",
          left: "-100px",
          width: "50px",
          height: "50px",
        }),
        j = 0,
        i = 0;
      $("body").append(k);
      i = k.outerWidth();
      j = k.css({ "overflow-y": "scroll" }).get(0).clientWidth;
      k.remove();
      return i - j;
    }
    function g() {
      return false;
    }
    function e(i) {
      if (i) {
        $(document).bind("selectstart", g);
      } else {
        $(document).unbind("selectstart", g);
      }
    }
    function a(k) {
      var i = [
        "/",
        ".",
        "*",
        "+",
        "?",
        "|",
        "(",
        ")",
        "[",
        "]",
        "{",
        "}",
        "\\",
        "^",
        "$",
      ];
      var j = new RegExp("(\\" + i.join("|\\") + ")", "g");
      return k.replace(j, "\\$1");
    }
    $(document)
      .on("keydown", function (i) {
        switch (i.keyCode) {
          case b.ESC:
            $("." + d.prefix + "__dropdown").trigger("hide");
            break;
        }
      })
      .on("click", function (i) {
        if (
          !$(i.target)
            .parents()
            .filter("." + d.prefix + "__dropdown").length &&
          !$(i.target).is("option")
        ) {
          $("." + d.prefix + "__dropdown").trigger("hide");
        }
      });
  };
});

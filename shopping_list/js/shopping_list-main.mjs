const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=[window.OC.filePath('shopping_list', '', 'js/index-Dg8AVuSG.chunk.mjs'),window.OC.filePath('shopping_list', '', 'js/index-C_pXr3hq.chunk.mjs'),window.OC.filePath('shopping_list', '', 'css/index-iLVvFKCC.chunk.css')])))=>i.map(i=>d[i]);
const appName = "shopping_list";
const appVersion = "1.1.0";
import { _ as _export_sfc, N as NcButton, r as resolveComponent, o as openBlock, c as createElementBlock, a as createVNode, w as withCtx, b as createTextVNode, t as toDisplayString, d as renderSlot, e as defineComponent, f as createElementId, g as createCommentVNode, u as unref, h as getDefaultExportFromCjs, i as getGettextBuilder, j as getLoggerBuilder, k as defineStore, l as ref, m as computed, n as api, p as translate, F as Fragment, q as renderList, s as createBlock, v as NcAppNavigationItem, x as NcActionButton, y as NcAppNavigationCaption, z as createBaseVNode, A as NcIconSvgWrapper, B as _export_sfc$1, C as NOOP, D as extend$1, E as isString, G as NO, H as isSymbol, I as isBuiltInDirective, J as capitalize, K as camelize, L as EMPTY_OBJ, M as isObject, O as toHandlerKey, P as isArray, Q as isOn, R as isReservedProp, S as isVoidTag, T as isHTMLTag, U as isSVGTag, V as isMathMLTag, W as parseStringStyle, X as makeMap, Y as generateCodeFrame, Z as getAugmentedNamespace, $ as runtimeDom_esmBundler, a0 as shared_esmBundler, a1 as watch, a2 as onMounted, a3 as onUnmounted, a4 as normalizeClass, a5 as withDirectives, a6 as vModelText, a7 as withKeys, a8 as withModifiers, a9 as Teleport, aa as normalizeStyle, ab as createStaticVNode, ac as nextTick, ad as generateOcsUrl, ae as cancelableClient, af as ShareType, ag as Permission, ah as generateUrl, ai as getCurrentUser, aj as NcAvatar, ak as NcLoadingIcon, al as NcAppNavigation, am as NcAppContent, an as NcContent, ao as createApp, ap as createPinia } from "./index-C_pXr3hq.chunk.mjs";
const scriptRel = "modulepreload";
const assetsURL = function(dep, importerUrl) {
  return new URL(dep, importerUrl).href;
};
const seen$2 = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (deps && deps.length > 0) {
    let allSettled = function(promises$2) {
      return Promise.all(promises$2.map((p) => Promise.resolve(p).then((value$1) => ({
        status: "fulfilled",
        value: value$1
      }), (reason) => ({
        status: "rejected",
        reason
      }))));
    };
    const links = document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector("meta[property=csp-nonce]");
    const cspNonce = cspNonceMeta?.nonce || cspNonceMeta?.getAttribute("nonce");
    promise = allSettled(deps.map((dep) => {
      dep = assetsURL(dep, importerUrl);
      if (dep in seen$2) return;
      seen$2[dep] = true;
      const isCss = dep.endsWith(".css");
      const cssSelector = isCss ? '[rel="stylesheet"]' : "";
      if (!!importerUrl) for (let i$1 = links.length - 1; i$1 >= 0; i$1--) {
        const link$1 = links[i$1];
        if (link$1.href === dep && (!isCss || link$1.rel === "stylesheet")) return;
      }
      else if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) return;
      const link = document.createElement("link");
      link.rel = isCss ? "stylesheet" : scriptRel;
      if (!isCss) link.as = "script";
      link.crossOrigin = "";
      link.href = dep;
      if (cspNonce) link.setAttribute("nonce", cspNonce);
      document.head.appendChild(link);
      if (isCss) return new Promise((res, rej) => {
        link.addEventListener("load", res);
        link.addEventListener("error", () => rej(/* @__PURE__ */ new Error(`Unable to preload CSS for ${dep}`)));
      });
    }));
  }
  function handlePreloadError(err$2) {
    const e$1 = new Event("vite:preloadError", { cancelable: true });
    e$1.payload = err$2;
    window.dispatchEvent(e$1);
    if (!e$1.defaultPrevented) throw err$2;
  }
  return promise.then((res) => {
    for (const item of res || []) {
      if (item.status !== "rejected") continue;
      handlePreloadError(item.reason);
    }
    return baseModule().catch(handlePreloadError);
  });
};
const _sfc_main$8 = {
  components: {
    NcButton
  },
  props: {
    /**
     * Id of the button
     */
    buttonId: {
      type: String,
      required: false,
      default: ""
    },
    /**
     * Disabled state of the button
     */
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * Main text of the button
     */
    text: {
      type: String,
      required: true
    },
    /**
     * The color variant to use.
     *
     * @default 'primary'
     */
    variant: {
      type: String,
      default: "primary",
      validator(value) {
        return ["primary", "secondary", "tertiary"].indexOf(value) !== -1;
      }
    }
  },
  emits: ["click"]
};
const _hoisted_1$7 = { class: "app-navigation-new" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_NcButton = resolveComponent("NcButton");
  return openBlock(), createElementBlock("div", _hoisted_1$7, [
    createVNode(_component_NcButton, {
      id: $props.buttonId,
      disabled: $props.disabled,
      variant: $props.variant,
      onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("click"))
    }, {
      icon: withCtx(() => [
        renderSlot(_ctx.$slots, "icon", {}, void 0, true)
      ]),
      default: withCtx(() => [
        createTextVNode(" " + toDisplayString($props.text), 1)
      ]),
      _: 3
    }, 8, ["id", "disabled", "variant"])
  ]);
}
const NcAppNavigationNew = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render], ["__scopeId", "data-v-0ba6c9df"]]);
const _hoisted_1$6 = ["aria-labelledby"];
const _hoisted_2$6 = {
  key: 0,
  class: "empty-content__icon",
  "aria-hidden": "true"
};
const _hoisted_3$6 = ["id"];
const _hoisted_4$5 = {
  key: 2,
  class: "empty-content__description"
};
const _hoisted_5$5 = {
  key: 3,
  class: "empty-content__action"
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "NcEmptyContent",
  props: {
    description: { default: "" },
    name: { default: "" }
  },
  setup(__props) {
    const nameId = createElementId();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        "aria-labelledby": unref(nameId),
        class: "empty-content",
        role: "note"
      }, [
        _ctx.$slots.icon ? (openBlock(), createElementBlock("div", _hoisted_2$6, [
          renderSlot(_ctx.$slots, "icon", {}, void 0, true)
        ])) : createCommentVNode("", true),
        _ctx.name !== "" || _ctx.$slots.name ? (openBlock(), createElementBlock("div", {
          key: 1,
          id: unref(nameId),
          class: "empty-content__name"
        }, [
          renderSlot(_ctx.$slots, "name", {}, () => [
            createTextVNode(toDisplayString(_ctx.name), 1)
          ], true)
        ], 8, _hoisted_3$6)) : createCommentVNode("", true),
        _ctx.description !== "" || _ctx.$slots.description ? (openBlock(), createElementBlock("p", _hoisted_4$5, [
          renderSlot(_ctx.$slots, "description", {}, () => [
            createTextVNode(toDisplayString(_ctx.description), 1)
          ], true)
        ])) : createCommentVNode("", true),
        _ctx.$slots.action ? (openBlock(), createElementBlock("div", _hoisted_5$5, [
          renderSlot(_ctx.$slots, "action", {}, void 0, true)
        ])) : createCommentVNode("", true)
      ], 8, _hoisted_1$6);
    };
  }
});
const NcEmptyContent = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-b101d636"]]);
var toastify$1 = { exports: {} };
/*!
 * Toastify js 1.12.0
 * https://github.com/apvarun/toastify-js
 * @license MIT licensed
 *
 * Copyright (C) 2018 Varun A P
 */
var toastify = toastify$1.exports;
var hasRequiredToastify;
function requireToastify() {
  if (hasRequiredToastify) return toastify$1.exports;
  hasRequiredToastify = 1;
  (function(module) {
    (function(root, factory) {
      if (module.exports) {
        module.exports = factory();
      } else {
        root.Toastify = factory();
      }
    })(toastify, function(global) {
      var Toastify2 = function(options) {
        return new Toastify2.lib.init(options);
      }, version2 = "1.12.0";
      Toastify2.defaults = {
        oldestFirst: true,
        text: "Toastify is awesome!",
        node: void 0,
        duration: 3e3,
        selector: void 0,
        callback: function() {
        },
        destination: void 0,
        newWindow: false,
        close: false,
        gravity: "toastify-top",
        positionLeft: false,
        position: "",
        backgroundColor: "",
        avatar: "",
        className: "",
        stopOnFocus: true,
        onClick: function() {
        },
        offset: { x: 0, y: 0 },
        escapeMarkup: true,
        ariaLive: "polite",
        style: { background: "" }
      };
      Toastify2.lib = Toastify2.prototype = {
        toastify: version2,
        constructor: Toastify2,
        // Initializing the object with required parameters
        init: function(options) {
          if (!options) {
            options = {};
          }
          this.options = {};
          this.toastElement = null;
          this.options.text = options.text || Toastify2.defaults.text;
          this.options.node = options.node || Toastify2.defaults.node;
          this.options.duration = options.duration === 0 ? 0 : options.duration || Toastify2.defaults.duration;
          this.options.selector = options.selector || Toastify2.defaults.selector;
          this.options.callback = options.callback || Toastify2.defaults.callback;
          this.options.destination = options.destination || Toastify2.defaults.destination;
          this.options.newWindow = options.newWindow || Toastify2.defaults.newWindow;
          this.options.close = options.close || Toastify2.defaults.close;
          this.options.gravity = options.gravity === "bottom" ? "toastify-bottom" : Toastify2.defaults.gravity;
          this.options.positionLeft = options.positionLeft || Toastify2.defaults.positionLeft;
          this.options.position = options.position || Toastify2.defaults.position;
          this.options.backgroundColor = options.backgroundColor || Toastify2.defaults.backgroundColor;
          this.options.avatar = options.avatar || Toastify2.defaults.avatar;
          this.options.className = options.className || Toastify2.defaults.className;
          this.options.stopOnFocus = options.stopOnFocus === void 0 ? Toastify2.defaults.stopOnFocus : options.stopOnFocus;
          this.options.onClick = options.onClick || Toastify2.defaults.onClick;
          this.options.offset = options.offset || Toastify2.defaults.offset;
          this.options.escapeMarkup = options.escapeMarkup !== void 0 ? options.escapeMarkup : Toastify2.defaults.escapeMarkup;
          this.options.ariaLive = options.ariaLive || Toastify2.defaults.ariaLive;
          this.options.style = options.style || Toastify2.defaults.style;
          if (options.backgroundColor) {
            this.options.style.background = options.backgroundColor;
          }
          return this;
        },
        // Building the DOM element
        buildToast: function() {
          if (!this.options) {
            throw "Toastify is not initialized";
          }
          var divElement = document.createElement("div");
          divElement.className = "toastify on " + this.options.className;
          if (!!this.options.position) {
            divElement.className += " toastify-" + this.options.position;
          } else {
            if (this.options.positionLeft === true) {
              divElement.className += " toastify-left";
              console.warn("Property `positionLeft` will be depreciated in further versions. Please use `position` instead.");
            } else {
              divElement.className += " toastify-right";
            }
          }
          divElement.className += " " + this.options.gravity;
          if (this.options.backgroundColor) {
            console.warn('DEPRECATION NOTICE: "backgroundColor" is being deprecated. Please use the "style.background" property.');
          }
          for (var property in this.options.style) {
            divElement.style[property] = this.options.style[property];
          }
          if (this.options.ariaLive) {
            divElement.setAttribute("aria-live", this.options.ariaLive);
          }
          if (this.options.node && this.options.node.nodeType === Node.ELEMENT_NODE) {
            divElement.appendChild(this.options.node);
          } else {
            if (this.options.escapeMarkup) {
              divElement.innerText = this.options.text;
            } else {
              divElement.innerHTML = this.options.text;
            }
            if (this.options.avatar !== "") {
              var avatarElement = document.createElement("img");
              avatarElement.src = this.options.avatar;
              avatarElement.className = "toastify-avatar";
              if (this.options.position == "left" || this.options.positionLeft === true) {
                divElement.appendChild(avatarElement);
              } else {
                divElement.insertAdjacentElement("afterbegin", avatarElement);
              }
            }
          }
          if (this.options.close === true) {
            var closeElement = document.createElement("button");
            closeElement.type = "button";
            closeElement.setAttribute("aria-label", "Close");
            closeElement.className = "toast-close";
            closeElement.innerHTML = "&#10006;";
            closeElement.addEventListener(
              "click",
              function(event) {
                event.stopPropagation();
                this.removeElement(this.toastElement);
                window.clearTimeout(this.toastElement.timeOutValue);
              }.bind(this)
            );
            var width = window.innerWidth > 0 ? window.innerWidth : screen.width;
            if ((this.options.position == "left" || this.options.positionLeft === true) && width > 360) {
              divElement.insertAdjacentElement("afterbegin", closeElement);
            } else {
              divElement.appendChild(closeElement);
            }
          }
          if (this.options.stopOnFocus && this.options.duration > 0) {
            var self2 = this;
            divElement.addEventListener(
              "mouseover",
              function(event) {
                window.clearTimeout(divElement.timeOutValue);
              }
            );
            divElement.addEventListener(
              "mouseleave",
              function() {
                divElement.timeOutValue = window.setTimeout(
                  function() {
                    self2.removeElement(divElement);
                  },
                  self2.options.duration
                );
              }
            );
          }
          if (typeof this.options.destination !== "undefined") {
            divElement.addEventListener(
              "click",
              function(event) {
                event.stopPropagation();
                if (this.options.newWindow === true) {
                  window.open(this.options.destination, "_blank");
                } else {
                  window.location = this.options.destination;
                }
              }.bind(this)
            );
          }
          if (typeof this.options.onClick === "function" && typeof this.options.destination === "undefined") {
            divElement.addEventListener(
              "click",
              function(event) {
                event.stopPropagation();
                this.options.onClick();
              }.bind(this)
            );
          }
          if (typeof this.options.offset === "object") {
            var x = getAxisOffsetAValue("x", this.options);
            var y = getAxisOffsetAValue("y", this.options);
            var xOffset = this.options.position == "left" ? x : "-" + x;
            var yOffset = this.options.gravity == "toastify-top" ? y : "-" + y;
            divElement.style.transform = "translate(" + xOffset + "," + yOffset + ")";
          }
          return divElement;
        },
        // Displaying the toast
        showToast: function() {
          this.toastElement = this.buildToast();
          var rootElement;
          if (typeof this.options.selector === "string") {
            rootElement = document.getElementById(this.options.selector);
          } else if (this.options.selector instanceof HTMLElement || typeof ShadowRoot !== "undefined" && this.options.selector instanceof ShadowRoot) {
            rootElement = this.options.selector;
          } else {
            rootElement = document.body;
          }
          if (!rootElement) {
            throw "Root element is not defined";
          }
          var elementToInsert = Toastify2.defaults.oldestFirst ? rootElement.firstChild : rootElement.lastChild;
          rootElement.insertBefore(this.toastElement, elementToInsert);
          Toastify2.reposition();
          if (this.options.duration > 0) {
            this.toastElement.timeOutValue = window.setTimeout(
              function() {
                this.removeElement(this.toastElement);
              }.bind(this),
              this.options.duration
            );
          }
          return this;
        },
        hideToast: function() {
          if (this.toastElement.timeOutValue) {
            clearTimeout(this.toastElement.timeOutValue);
          }
          this.removeElement(this.toastElement);
        },
        // Removing the element from the DOM
        removeElement: function(toastElement) {
          toastElement.className = toastElement.className.replace(" on", "");
          window.setTimeout(
            function() {
              if (this.options.node && this.options.node.parentNode) {
                this.options.node.parentNode.removeChild(this.options.node);
              }
              if (toastElement.parentNode) {
                toastElement.parentNode.removeChild(toastElement);
              }
              this.options.callback.call(toastElement);
              Toastify2.reposition();
            }.bind(this),
            400
          );
        }
      };
      Toastify2.reposition = function() {
        var topLeftOffsetSize = {
          top: 15,
          bottom: 15
        };
        var topRightOffsetSize = {
          top: 15,
          bottom: 15
        };
        var offsetSize = {
          top: 15,
          bottom: 15
        };
        var allToasts = document.getElementsByClassName("toastify");
        var classUsed;
        for (var i = 0; i < allToasts.length; i++) {
          if (containsClass(allToasts[i], "toastify-top") === true) {
            classUsed = "toastify-top";
          } else {
            classUsed = "toastify-bottom";
          }
          var height = allToasts[i].offsetHeight;
          classUsed = classUsed.substr(9, classUsed.length - 1);
          var offset = 15;
          var width = window.innerWidth > 0 ? window.innerWidth : screen.width;
          if (width <= 360) {
            allToasts[i].style[classUsed] = offsetSize[classUsed] + "px";
            offsetSize[classUsed] += height + offset;
          } else {
            if (containsClass(allToasts[i], "toastify-left") === true) {
              allToasts[i].style[classUsed] = topLeftOffsetSize[classUsed] + "px";
              topLeftOffsetSize[classUsed] += height + offset;
            } else {
              allToasts[i].style[classUsed] = topRightOffsetSize[classUsed] + "px";
              topRightOffsetSize[classUsed] += height + offset;
            }
          }
        }
        return this;
      };
      function getAxisOffsetAValue(axis, options) {
        if (options.offset[axis]) {
          if (isNaN(options.offset[axis])) {
            return options.offset[axis];
          } else {
            return options.offset[axis] + "px";
          }
        }
        return "0px";
      }
      function containsClass(elem, yourClass) {
        if (!elem || typeof yourClass !== "string") {
          return false;
        } else if (elem.className && elem.className.trim().split(/\s+/gi).indexOf(yourClass) > -1) {
          return true;
        } else {
          return false;
        }
      }
      Toastify2.lib.init.prototype = Toastify2.lib;
      return Toastify2;
    });
  })(toastify$1);
  return toastify$1.exports;
}
var toastifyExports = requireToastify();
const Toastify = /* @__PURE__ */ getDefaultExportFromCjs(toastifyExports);
const gtBuilder = getGettextBuilder().detectLanguage();
for (const data of [{ "language": "ar", "translations": [{ "msgid": '"{name}" is an invalid folder name.', "msgstr": ['"{name}" لا يصلح كاسم مجلد.'] }, { "msgid": '"{name}" is not an allowed folder name', "msgstr": ['"{name}" غير مسموح به كاسم مجلد'] }, { "msgid": '"/" is not allowed inside a folder name.', "msgstr": ['"/" غير مسموح به داخل اسم مجلد.'] }, { "msgid": "All files", "msgstr": ["كل الملفات"] }, { "msgid": "Choose", "msgstr": ["إختَر"] }, { "msgid": "Choose {file}", "msgstr": ["إختر {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["إختَر %n ملف", "إختَر %n ملف", "إختَر %n ملف", "إختَر %n ملفات", "إختَر %n ملف", "إختر %n ملف"] }, { "msgid": "Copy", "msgstr": ["نسخ"] }, { "msgid": "Copy to {target}", "msgstr": ["نسخ إلى {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["تعذّر إنشاء المجلد الجديد"] }, { "msgid": "Could not load files settings", "msgstr": ["يتعذّر تحميل إعدادات الملفات"] }, { "msgid": "Could not load files views", "msgstr": ["تعذر تحميل عرض الملفات"] }, { "msgid": "Create directory", "msgstr": ["إنشاء مجلد"] }, { "msgid": "Current view selector", "msgstr": ["محدد العرض الحالي"] }, { "msgid": "Favorites", "msgstr": ["المفضلة"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["الملفات والمجلدات التي تحددها كمفضلة ستظهر هنا."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["الملفات و المجلدات التي قمت مؤخراً بتعديلها سوف تظهر هنا."] }, { "msgid": "Filter file list", "msgstr": ["تصفية قائمة الملفات"] }, { "msgid": "Folder name cannot be empty.", "msgstr": ["اسم المجلد لا يمكن أن يكون فارغاً."] }, { "msgid": "Home", "msgstr": ["البداية"] }, { "msgid": "Modified", "msgstr": ["التعديل"] }, { "msgid": "Move", "msgstr": ["نقل"] }, { "msgid": "Move to {target}", "msgstr": ["نقل إلى {target}"] }, { "msgid": "Name", "msgstr": ["الاسم"] }, { "msgid": "New", "msgstr": ["جديد"] }, { "msgid": "New folder", "msgstr": ["مجلد جديد"] }, { "msgid": "New folder name", "msgstr": ["اسم المجلد الجديد"] }, { "msgid": "No files in here", "msgstr": ["لا توجد ملفات هنا"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["لا توجد ملفات تتطابق مع عامل التصفية الذي وضعته"] }, { "msgid": "No matching files", "msgstr": ["لا توجد ملفات مطابقة"] }, { "msgid": "Recent", "msgstr": ["الحالي"] }, { "msgid": "Select all entries", "msgstr": ["حدد جميع الإدخالات"] }, { "msgid": "Select entry", "msgstr": ["إختَر المدخل"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["إختر سطر الـ {nodename}"] }, { "msgid": "Size", "msgstr": ["الحجم"] }, { "msgid": "Undo", "msgstr": ["تراجع"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["قم برفع بعض المحتوى أو المزامنة مع أجهزتك!"] }] }, { "language": "ast", "translations": [{ "msgid": '"{name}" is an invalid folder name.', "msgstr": ["«{name}» ye un nome de carpeta inválidu."] }, { "msgid": '"{name}" is not an allowed folder name', "msgstr": ["«{name}» ye un nome de carpeta inválidu"] }, { "msgid": '"/" is not allowed inside a folder name.', "msgstr": ["Nun se permite'l caráuter «/» dientro'l nome de les carpetes."] }, { "msgid": "All files", "msgstr": ["Tolos ficheros"] }, { "msgid": "Choose", "msgstr": ["Escoyer"] }, { "msgid": "Choose {file}", "msgstr": ["Escoyer «{ficheru}»"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Escoyer %n ficheru", "Escoyer %n ficheros"] }, { "msgid": "Copy", "msgstr": ["Copiar"] }, { "msgid": "Copy to {target}", "msgstr": ["Copiar en: {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Nun se pudo crear la carpeta"] }, { "msgid": "Could not load files settings", "msgstr": ["Nun se pudo cargar la configuración de los ficheros"] }, { "msgid": "Could not load files views", "msgstr": ["Nun se pudieron cargar les vistes de los ficheros"] }, { "msgid": "Create directory", "msgstr": ["Crear un direutoriu"] }, { "msgid": "Current view selector", "msgstr": ["Selector de la vista actual"] }, { "msgid": "Favorites", "msgstr": ["Favoritos"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Equí apaecen los ficheros y les carpetes que metas en Favoritos."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Equí apaecen los fichero y les carpetes que modificares apocayá."] }, { "msgid": "Filter file list", "msgstr": ["Peñerar la llista de ficheros"] }, { "msgid": "Folder name cannot be empty.", "msgstr": ["El nome de la carpeta nun pue tar baleru."] }, { "msgid": "Home", "msgstr": ["Aniciu"] }, { "msgid": "Modified", "msgstr": ["Modificóse"] }, { "msgid": "Move", "msgstr": ["Mover"] }, { "msgid": "Move to {target}", "msgstr": ["Mover a {target}"] }, { "msgid": "Name", "msgstr": ["Nome"] }, { "msgid": "New", "msgstr": ["Nuevu"] }, { "msgid": "New folder", "msgstr": ["Carpeta nueva"] }, { "msgid": "New folder name", "msgstr": ["Nome de carpeta nuevu"] }, { "msgid": "No files in here", "msgstr": ["Equí nun hai nengún ficheru"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Nun s'atopó nengún ficheru que concasare cola peñera."] }, { "msgid": "No matching files", "msgstr": ["Nun hai nengún ficheru que concase"] }, { "msgid": "Recent", "msgstr": ["De recién"] }, { "msgid": "Select all entries", "msgstr": ["Seleicionar toles entraes"] }, { "msgid": "Select entry", "msgstr": ["Seleicionar la entrada"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Seleicionar la filera de: {nodename}"] }, { "msgid": "Size", "msgstr": ["Tamañu"] }, { "msgid": "Undo", "msgstr": ["Desfacer"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["¡Xubi dalgún elementu o sincroniza colos tos preseos!"] }] }, { "language": "ca", "translations": [{ "msgid": '"{char}" is not allowed inside a name.', "msgstr": [`No és permès d'usar el caràcter "{char}" en un nom.`] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['"{extension}" no és un nom permès.'] }, { "msgid": '"{name}" is an invalid folder name.', "msgstr": ['"{name}" no és vàlid com a nom de carpeta.'] }, { "msgid": '"{name}" is not an allowed folder name', "msgstr": ['"{name}" no és vàlid com a nom de carpeta'] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['"{segment}" és un mot reservat i no està permès com a nom.'] }, { "msgid": '"/" is not allowed inside a folder name.', "msgstr": [`"/" no està permès en el nom d'una carpeta.`] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%n conflicte de fitxers", "%n conflictes de fitxers"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["%n onflicte de fitxers a {dirname}", "%n conflictes de fitxers a {dirname}"] }, { "msgid": "All files", "msgstr": ["Tots els fitxers"] }, { "msgid": "Cancel", "msgstr": ["Cancel·lar"] }, { "msgid": "Cancel the entire operation", "msgstr": ["Cancel·lar tota l'operació"] }, { "msgid": "Choose", "msgstr": ["Tria"] }, { "msgid": "Choose {file}", "msgstr": ["Tria {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Tria %n fitxer", "Tria %n fitxers"] }, { "msgid": "Confirm", "msgstr": ["Confirma"] }, { "msgid": "Continue", "msgstr": ["Continuar"] }, { "msgid": "Copy", "msgstr": ["Copia"] }, { "msgid": "Copy to {target}", "msgstr": ["Copia a {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["No s'ha pogut crear la carpeta nova"] }, { "msgid": "Could not load files settings", "msgstr": ["No es poden carregar fitxers de configuració"] }, { "msgid": "Could not load files views", "msgstr": ["No es poden carregar fitxers de vistes"] }, { "msgid": "Create directory", "msgstr": ["Crea un directori"] }, { "msgid": "Current view selector", "msgstr": ["Selector de visualització actual"] }, { "msgid": "Enter your name", "msgstr": ["Escriviu el vostre nom"] }, { "msgid": "Existing version", "msgstr": ["Versió existent"] }, { "msgid": "Failed to set nickname.", "msgstr": ["No s'ha pogut desar el sobrenom."] }, { "msgid": "Favorites", "msgstr": ["Preferits"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Els fitxers i les carpetes que marqueu com a favorits es mostraran aquí."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Els fitxers i les carpetes recentment modificats es mostraran aquí."] }, { "msgid": "Filter file list", "msgstr": ["Filtrar llistat de fitxers"] }, { "msgid": "Folder name cannot be empty.", "msgstr": ["El nom de la carpeta no pot estar buit."] }, { "msgid": "Guest identification", "msgstr": ["Identificació com a convidat"] }, { "msgid": "Home", "msgstr": ["Inici"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["Si seleccioneu les dues versions, el fitxer entrant tindrà un número afegit al seu nom."] }, { "msgid": "Invalid name.", "msgstr": ["Nom no vàlid."] }, { "msgid": "Last modified date unknown", "msgstr": ["Data de l'última modificació desconeguda"] }, { "msgid": "Modified", "msgstr": ["Data de modificació"] }, { "msgid": "Move", "msgstr": ["Desplaça"] }, { "msgid": "Move to {target}", "msgstr": ["Desplaça a {target}"] }, { "msgid": "Name", "msgstr": ["Nom"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Els noms poden tenir com a màxim 64 caràcters."] }, { "msgid": "Names must not be empty.", "msgstr": ["Els noms no poden ser buits."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": [`Els noms no poden acabar amb l'extensió "{extension}".`] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Els noms no poden començar amb un punt."] }, { "msgid": "New", "msgstr": ["Crea"] }, { "msgid": "New folder", "msgstr": ["Carpeta nova"] }, { "msgid": "New folder name", "msgstr": ["Nom de la carpeta nova"] }, { "msgid": "New version", "msgstr": ["Nova versió"] }, { "msgid": "No files in here", "msgstr": ["No hi ha cap fitxer"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["No s'ha trobat cap fitxer que coincideixi amb el filtre."] }, { "msgid": "No matching files", "msgstr": ["No hi ha cap fitxer que coincideixi"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Si us plau, escriu un nom amb 2 caràcters com a mínim."] }, { "msgid": "Recent", "msgstr": ["Recents"] }, { "msgid": "Select all checkboxes", "msgstr": ["Selecciona totes les caselles de selecció"] }, { "msgid": "Select all entries", "msgstr": ["Selecciona totes les entrades"] }, { "msgid": "Select all existing files", "msgstr": ["Selecciona tots els fitxers existents"] }, { "msgid": "Select all new files", "msgstr": ["Selecciona tots els fitxers nous"] }, { "msgid": "Select entry", "msgstr": ["Selecciona l'entrada"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Selecciona la fila per a {nodename}"] }, { "msgid": "Size", "msgstr": ["Mida"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["Omet %n fitxer", "Omet %n fitxers"] }, { "msgid": "Skip this file", "msgstr": ["Omet aquest fitxer"] }, { "msgid": "Submit name", "msgstr": ["Entreu el nom"] }, { "msgid": "Undo", "msgstr": ["Desfés"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Pugeu contingut o sincronitzeu-lo amb els vostres dispositius!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["Quan es selecciona una carpeta entrant, també se sobreescriuran els fitxers que hi entrin en conflicte."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["Quan es selecciona una carpeta entrant, el contingut s'escriu a la carpeta existent i es realitza una resolució recursiva de conflictes."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["Quins fitxers voleu conservar?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Actualment se us mostra com a {nickname}."] }, { "msgid": "You are currently not identified.", "msgstr": ["Actualment no esteu identificat."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["No podeu deixar el nom buit."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["Heu de triar com a mínim una solució de conflicte"] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["Heu de seleccionar com a mínim una versió de cada fitxer per continuar."] }] }, { "language": "cs_CZ", "translations": [{ "msgid": '"{char}" is not allowed inside a folder name.', "msgstr": ["znak „{char}“ není možné použít uvnitř názvu složky."] }, { "msgid": '"{char}" is not allowed inside a name.', "msgstr": ["„{char}“ není možné použít uvnitř názvu."] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ["„{extension}“ není možné použít jako název."] }, { "msgid": '"{segment}" is a reserved name and not allowed for folder names.', "msgstr": ["„{segment}“ je vyhrazeným názvem a není možné ho používat pro názvy složek."] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ["„{segment}“ je vyhrazeným názvem a není možné ho použít."] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%n kolize souboru", "%n kolize souborů", "%n kolizí souborů", "%n kolize souborů"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["%n kolize souborů v {dirname}", "%n kolize souborů v {dirname}", "%n kolizí souborů v {dirname}", "%n kolize souborů v {dirname}"] }, { "msgid": "All files", "msgstr": ["Veškeré soubory"] }, { "msgid": "Cancel", "msgstr": ["Storno"] }, { "msgid": "Cancel the entire operation", "msgstr": ["Zrušit celou operaci"] }, { "msgid": "Choose", "msgstr": ["Zvolit"] }, { "msgid": "Choose {file}", "msgstr": ["Zvolit {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Zvolte %n soubor", "Zvolte %n soubory", "Zvolte %n souborů", "Zvolte %n soubory"] }, { "msgid": "Confirm", "msgstr": ["Potvrdit"] }, { "msgid": "Continue", "msgstr": ["Pokračovat"] }, { "msgid": "Copy", "msgstr": ["Zkopírovat"] }, { "msgid": "Copy to {target}", "msgstr": ["Zkopírovat do {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Novou složku se nepodařilo vytvořit"] }, { "msgid": "Could not load files settings", "msgstr": ["Nepodařilo se načíst nastavení pro soubory"] }, { "msgid": "Could not load files views", "msgstr": ["Nepodařilo se načíst pohledy souborů"] }, { "msgid": "Create directory", "msgstr": ["Vytvořit složku"] }, { "msgid": "Current view selector", "msgstr": ["Výběr stávajícího zobrazení"] }, { "msgid": "Enter your name", "msgstr": ["Zadejte své jméno"] }, { "msgid": "Existing version", "msgstr": ["Existující verze"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Nepodařilo se nastavit přezdívku."] }, { "msgid": "Favorites", "msgstr": ["Oblíbené"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Zde se zobrazí soubory a složky, které označíte jako oblíbené."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Zde se zobrazí soubory a složky, které jste nedávno pozměnili."] }, { "msgid": "Filter file list", "msgstr": ["Filtrovat seznam souborů"] }, { "msgid": 'Folder names must not end with "{extension}".', "msgstr": ["Názvy složek nemohou končit na „{extension}“."] }, { "msgid": "Guest identification", "msgstr": ["Identifikace hosta"] }, { "msgid": "Home", "msgstr": ["Domů"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["Pokud vyberete obě verze, pak k názvu příchozího souboru bude přidáno číslo."] }, { "msgid": "Invalid folder name.", "msgstr": ["Neplatný název složky."] }, { "msgid": "Invalid name.", "msgstr": ["Neplatný název."] }, { "msgid": "Last modified date unknown", "msgstr": ["Datum poslední změny neznámé"] }, { "msgid": "Modified", "msgstr": ["Změněno"] }, { "msgid": "Move", "msgstr": ["Přesounout"] }, { "msgid": "Move to {target}", "msgstr": ["Přesunout do {target}"] }, { "msgid": "Name", "msgstr": ["Název"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Je třeba, aby délka jmen nepřesahovala 64 znaků."] }, { "msgid": "Names must not be empty.", "msgstr": ["Názvy je třeba vyplnit."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ["Názvy nemohou končit na „{extension}“."] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Názvy nemohou začínat tečkou."] }, { "msgid": "New", "msgstr": ["Nové"] }, { "msgid": "New folder", "msgstr": ["Nová složka"] }, { "msgid": "New folder name", "msgstr": ["Název pro novou složku"] }, { "msgid": "New version", "msgstr": ["Nová verze"] }, { "msgid": "No files in here", "msgstr": ["Nejsou zde žádné soubory"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Nenalezeny žádné soubory odpovídající vašemu filtru"] }, { "msgid": "No matching files", "msgstr": ["Žádné odpovídající soubory"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Zadejte jméno dlouhé alespoň 2 znaky."] }, { "msgid": "Recent", "msgstr": ["Nedávné"] }, { "msgid": "Select all checkboxes", "msgstr": ["Vybrat všechny zaškrtávací kolonky"] }, { "msgid": "Select all entries", "msgstr": ["Vybrat všechny položky"] }, { "msgid": "Select all existing files", "msgstr": ["Vybrat všechny existující soubory"] }, { "msgid": "Select all new files", "msgstr": ["Vybrat všechny nové soubory"] }, { "msgid": "Select entry", "msgstr": ["Vybrat položku"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Vybrat řádek pro {nodename}"] }, { "msgid": "Size", "msgstr": ["Velikost"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["Přeskočit %n soubor", "Přeskočit %n soubory", "Přeskočit %n souborů", "Přeskočit %n soubory"] }, { "msgid": "Skip this file", "msgstr": ["Přeskočit tento soubor"] }, { "msgid": "Submit name", "msgstr": ["Odeslat jméno"] }, { "msgid": "Undo", "msgstr": ["Zpět"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Nahrajte sem nějaký obsah nebo proveďte synchronizaci se svými zařízeními!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["Pokud je vybrána příchozí složka, budou v ní také přepsány jakékoli kolidující soubory."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["Pokud je vybrána příchozí složka, je obsah zapsán do existující složky a je provedeno rekurzivní vyřešení kolizí."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["Které soubory chcete ponechat?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["V tuto chvíli jste identifikováni jako {nickname}."] }, { "msgid": "You are currently not identified.", "msgstr": ["V tuto chvíli nejste identifikovaní."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Jméno nelze ponechat nevyplněné."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["Je třeba zvolit alespoň jedno z řešení kolize"] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["Aby bylo možné pokračovat, je třeba vybrat alespoň jednu verzi od každého souboru."] }] }, { "language": "da", "translations": [{ "msgid": '"{char}" is not allowed inside a name.', "msgstr": ['"{char}" er ikke tilladt i et navn.'] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['"{extension}" er ikke tilladt i et navn.'] }, { "msgid": '"{name}" is an invalid folder name.', "msgstr": ['"{name}" er et ugyldigt mappenavn.'] }, { "msgid": '"{name}" is not an allowed folder name', "msgstr": ['"{name}" er ikke et tilladt mappenavn'] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['"{segment}" er et reserveret navn og er derfor ikke tilladt.'] }, { "msgid": '"/" is not allowed inside a folder name.', "msgstr": ['"/" er ikke tilladt i et mappenavn.'] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%n filkonflikt", "%n filer konflikter"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["%n filkonflikt i {dirname}", "%n filkonflikter i {dirname}"] }, { "msgid": "All files", "msgstr": ["Alle filer"] }, { "msgid": "Cancel", "msgstr": ["Fortryd"] }, { "msgid": "Cancel the entire operation", "msgstr": ["Annullér hele operationen"] }, { "msgid": "Choose", "msgstr": ["Vælg"] }, { "msgid": "Choose {file}", "msgstr": ["Vælg {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Vælg %n fil", "Vælg %n filer"] }, { "msgid": "Confirm", "msgstr": ["Bekræft"] }, { "msgid": "Continue", "msgstr": ["Fortsæt"] }, { "msgid": "Copy", "msgstr": ["Kopier"] }, { "msgid": "Copy to {target}", "msgstr": ["Kopier til {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Kunne ikke oprette den nye mappe"] }, { "msgid": "Could not load files settings", "msgstr": ["Filindstillingerne kunne ikke indlæses"] }, { "msgid": "Could not load files views", "msgstr": ["Kunne ikke indlæse filvisninger"] }, { "msgid": "Create directory", "msgstr": ["Opret mappe"] }, { "msgid": "Current view selector", "msgstr": ["Aktuel visningsvælger"] }, { "msgid": "Enter your name", "msgstr": ["Indtast dit navn"] }, { "msgid": "Existing version", "msgstr": ["Eksisterende version"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Forsøg på at gemme kaldenavn mislykkedes."] }, { "msgid": "Favorites", "msgstr": ["Favoritter"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Filer og mapper, du markerer som foretrukne, vises her."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Filer og mapper, du for nylig har ændret, vises her."] }, { "msgid": "Filter file list", "msgstr": ["Filtrer fil liste"] }, { "msgid": "Folder name cannot be empty.", "msgstr": ["Mappenavnet må ikke være tomt."] }, { "msgid": "Guest identification", "msgstr": ["Gæsteidentifikation"] }, { "msgid": "Home", "msgstr": ["Hjem"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["Hvis du vælger begge versioner, vil den indkommende fil have et nummer tilføjet til sit navn."] }, { "msgid": "Invalid name.", "msgstr": ["Ugyldigt navn."] }, { "msgid": "Last modified date unknown", "msgstr": ["Senest ændret dato ukendt"] }, { "msgid": "Modified", "msgstr": ["Ændret"] }, { "msgid": "Move", "msgstr": ["Flyt"] }, { "msgid": "Move to {target}", "msgstr": ["Flyt til {target}"] }, { "msgid": "Name", "msgstr": ["Navn"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Navne kan højst være 64 tegn lange."] }, { "msgid": "Names must not be empty.", "msgstr": ["Navne kan ikke være tomt."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['Navne må ikke ende på "{extension}".'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Navne skal starte med et punktum."] }, { "msgid": "New", "msgstr": ["Ny"] }, { "msgid": "New folder", "msgstr": ["Ny mappe"] }, { "msgid": "New folder name", "msgstr": ["Ny mappe navn"] }, { "msgid": "New version", "msgstr": ["Ny version"] }, { "msgid": "No files in here", "msgstr": ["Ingen filer here"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Der blev ikke fundet nogen filer, der matcher dit filter."] }, { "msgid": "No matching files", "msgstr": ["Ingen matchende filer"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Indtast et navn med mindst 2 tegn."] }, { "msgid": "Recent", "msgstr": ["Seneste"] }, { "msgid": "Select all checkboxes", "msgstr": ["Markér alle afkrydsningsfelter"] }, { "msgid": "Select all entries", "msgstr": ["Vælg alle poster"] }, { "msgid": "Select all existing files", "msgstr": ["Vælg alle eksisterende filer"] }, { "msgid": "Select all new files", "msgstr": ["Vælg alle nye filer"] }, { "msgid": "Select entry", "msgstr": ["Vælg post"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Vælg rækken for {nodenavn}"] }, { "msgid": "Size", "msgstr": ["Størelse"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["Spring %n fil over", "Spring %n filer over"] }, { "msgid": "Skip this file", "msgstr": ["Spring denne fil over"] }, { "msgid": "Submit name", "msgstr": ["Indsend navn"] }, { "msgid": "Undo", "msgstr": ["Fortryd"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Upload noget indhold eller synkroniser med dine enheder!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["Når en indkommende mappe er valgt, vil eventuelle modstridende filer i det også blive overskrevet."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["Når en indkommende mappe er valgt, er indholdet skrevet ind i den eksisterende mappe og en rekursiv konfliktløsning udføres."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["Hvilke filer vil du have?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Du er i øjeblikket identificeret som {nickname}."] }, { "msgid": "You are currently not identified.", "msgstr": ["Du er ikke identificeret."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Du kan ikke efterlade navnet tomt."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["Du skal vælge mindst én konfliktløsning"] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["Du skal vælge mindst én version af hver fil for at fortsætte."] }] }, { "language": "de", "translations": [{ "msgid": '"{char}" is not allowed inside a folder name.', "msgstr": ['"{char}" ist innerhalb eines Ordnernamens nicht zulässig.'] }, { "msgid": '"{char}" is not allowed inside a name.', "msgstr": ['"{char}" ist innerhalb eines Namens nicht zulässig.'] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['"{extension}" ist kein zulässiger Name.'] }, { "msgid": '"{segment}" is a reserved name and not allowed for folder names.', "msgstr": ['"{segment}" ist ein reservierter Name und nicht zulässig für Ordnernamen.'] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['"{segment}" ist ein reservierter Name und nicht zulässig.'] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%n Dateikonflikt", "%n Dateikonflikte"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["%n Dateikonflikt in {dirname}", "%n Dateikonflikte in {dirname}"] }, { "msgid": "All files", "msgstr": ["Alle Dateien"] }, { "msgid": "Cancel", "msgstr": ["Abbrechen"] }, { "msgid": "Cancel the entire operation", "msgstr": ["Den gesamten Vorgang abbrechen"] }, { "msgid": "Choose", "msgstr": ["Auswählen"] }, { "msgid": "Choose {file}", "msgstr": ["{file} auswählen"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["%n Datei auswählen", "%n Dateien auswählen"] }, { "msgid": "Confirm", "msgstr": ["Bestätigen"] }, { "msgid": "Continue", "msgstr": ["Fortsetzen"] }, { "msgid": "Copy", "msgstr": ["Kopieren"] }, { "msgid": "Copy to {target}", "msgstr": ["Nach {target} kopieren"] }, { "msgid": "Could not create the new folder", "msgstr": ["Der neue Ordner konnte nicht erstellt werden"] }, { "msgid": "Could not load files settings", "msgstr": ["Dateieinstellungen konnten nicht geladen werden"] }, { "msgid": "Could not load files views", "msgstr": ["Dateiansichten konnten nicht geladen werden"] }, { "msgid": "Create directory", "msgstr": ["Verzeichnis erstellen"] }, { "msgid": "Current view selector", "msgstr": ["Aktuelle Ansichtsauswahl"] }, { "msgid": "Enter your name", "msgstr": ["Gib deinen Namen ein"] }, { "msgid": "Existing version", "msgstr": ["Vorhandene Version"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Spitzname konnte nicht gespeichert werden."] }, { "msgid": "Favorites", "msgstr": ["Favoriten"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Dateien und Ordner, die du als Favorit markierst, werden hier angezeigt."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Dateien und Ordner, die du kürzlich geändert hast, werden hier angezeigt."] }, { "msgid": "Filter file list", "msgstr": ["Dateiliste filtern"] }, { "msgid": 'Folder names must not end with "{extension}".', "msgstr": ['Ordnernamen dürfen nicht mit "{extension}" enden.'] }, { "msgid": "Guest identification", "msgstr": ["Gast-Identifikation"] }, { "msgid": "Home", "msgstr": ["Home"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["Wenn beide Versionen ausgewählt werden, wird dem Namen der eingehenden Datei eine Nummer hinzugefügt."] }, { "msgid": "Invalid folder name.", "msgstr": ["Ungültiger Ordnername."] }, { "msgid": "Invalid name.", "msgstr": ["Ungültiger Name."] }, { "msgid": "Last modified date unknown", "msgstr": ["Datum der letzten Änderung unbekannt"] }, { "msgid": "Modified", "msgstr": ["Geändert"] }, { "msgid": "Move", "msgstr": ["Verschieben"] }, { "msgid": "Move to {target}", "msgstr": ["Nach {target} verschieben"] }, { "msgid": "Name", "msgstr": ["Name"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Namen dürfen maximal 64 Zeichen lang sein."] }, { "msgid": "Names must not be empty.", "msgstr": ["Namen dürfen nicht leer sein."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['Namen dürfen nicht mit "{extension}" enden.'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Namen dürfen nicht mit einem Punkt beginnen."] }, { "msgid": "New", "msgstr": ["Neu"] }, { "msgid": "New folder", "msgstr": ["Neuer Ordner"] }, { "msgid": "New folder name", "msgstr": ["Neuer Ordnername"] }, { "msgid": "New version", "msgstr": ["Neue Version"] }, { "msgid": "No files in here", "msgstr": ["Hier sind keine Dateien"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Es wurden keine Dateien gefunden, die deinem Filter entsprechen."] }, { "msgid": "No matching files", "msgstr": ["Keine passenden Dateien"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Bitte einen Namen mit mindestens zwei Zeichen eingeben."] }, { "msgid": "Recent", "msgstr": ["Neueste"] }, { "msgid": "Select all checkboxes", "msgstr": ["Alle Kontrollkästchen aktivieren"] }, { "msgid": "Select all entries", "msgstr": ["Alle Einträge auswählen"] }, { "msgid": "Select all existing files", "msgstr": ["Alle vorhandenen Dateien auswählen"] }, { "msgid": "Select all new files", "msgstr": ["Alle neuen Dateien auswählen"] }, { "msgid": "Select entry", "msgstr": ["Eintrag auswählen"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Die Zeile für {nodename} auswählen."] }, { "msgid": "Size", "msgstr": ["Größe"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["%n Datei überspringen", "%n Dateien überspringen"] }, { "msgid": "Skip this file", "msgstr": ["Diese Datei überspringen"] }, { "msgid": "Submit name", "msgstr": ["Namen senden"] }, { "msgid": "Undo", "msgstr": ["Rückgängig machen"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Lade Inhalte hoch oder synchronisiere diese mit deinen Geräten!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["Wenn ein eingehender Ordner ausgewählt wird, werden auch alle darin enthaltenen Dateien mit Konflikten überschrieben."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["Bei Auswahl eines eingehenden Ordners wird der Inhalt in den vorhandenen Ordner geschrieben und eine rekursive Konfliktlösung durchgeführt."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["Welche Dateien sollen behalten werden?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Du bist derzeit als {nickname} identifiziert."] }, { "msgid": "You are currently not identified.", "msgstr": ["Du bist momentan nicht identifiziert."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Du kannst den Namen nicht leer lassen."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["Es muss mindestens eine Konfliktlösung gewählt werden"] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["Es muss mindestens eine Version jeder Datei ausgewählt werden, um fortzufahren."] }] }, { "language": "de_DE", "translations": [{ "msgid": '"{char}" is not allowed inside a folder name.', "msgstr": ['"{char}" ist innerhalb eines Ordnernamens nicht zulässig.'] }, { "msgid": '"{char}" is not allowed inside a name.', "msgstr": ['"{char}" ist innerhalb eines Namens nicht zulässig.'] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['"{extension}" ist kein zulässiger Name.'] }, { "msgid": '"{segment}" is a reserved name and not allowed for folder names.', "msgstr": ['"{segment}" ist ein reservierter Name und nicht zulässig für Ordnernamen.'] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['"{segment}" ist ein reservierter Name und nicht zulässig.'] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%n Dateikonflikt", "%n Dateikonflikte"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["%n Dateikonflikt in {dirname}", "%n Dateikonflikte in {dirname}"] }, { "msgid": "All files", "msgstr": ["Alle Dateien"] }, { "msgid": "Cancel", "msgstr": ["Abbrechen"] }, { "msgid": "Cancel the entire operation", "msgstr": ["Den gesamten Vorgang abbrechen"] }, { "msgid": "Choose", "msgstr": ["Auswählen"] }, { "msgid": "Choose {file}", "msgstr": ["{file} auswählen"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["%n Datei auswählen", "%n Dateien auswählen"] }, { "msgid": "Confirm", "msgstr": ["Bestätigen"] }, { "msgid": "Continue", "msgstr": ["Fortsetzen"] }, { "msgid": "Copy", "msgstr": ["Kopieren"] }, { "msgid": "Copy to {target}", "msgstr": ["Nach {target} kopieren"] }, { "msgid": "Could not create the new folder", "msgstr": ["Der neue Ordner konnte nicht erstellt werden"] }, { "msgid": "Could not load files settings", "msgstr": ["Dateieinstellungen konnten nicht geladen werden"] }, { "msgid": "Could not load files views", "msgstr": ["Dateiansichten konnten nicht geladen werden"] }, { "msgid": "Create directory", "msgstr": ["Verzeichnis erstellen"] }, { "msgid": "Current view selector", "msgstr": ["Aktuelle Ansichtsauswahl"] }, { "msgid": "Enter your name", "msgstr": ["Geben Sie Ihren Namen ein"] }, { "msgid": "Existing version", "msgstr": ["Vorhandene Version"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Spitzname konnte nicht gespeichert werden."] }, { "msgid": "Favorites", "msgstr": ["Favoriten"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Dateien und Ordner, die Sie als Favorit markieren, werden hier angezeigt."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Dateien und Ordner, die Sie kürzlich geändert haben, werden hier angezeigt."] }, { "msgid": "Filter file list", "msgstr": ["Dateiliste filtern"] }, { "msgid": 'Folder names must not end with "{extension}".', "msgstr": ['Ordnernamen dürfen nicht mit "{extension}" enden.'] }, { "msgid": "Guest identification", "msgstr": ["Gast-Identifikation"] }, { "msgid": "Home", "msgstr": ["Home"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["Wenn beide Versionen ausgewählt werden, wird dem Namen der eingehenden Datei eine Nummer hinzugefügt."] }, { "msgid": "Invalid folder name.", "msgstr": ["Ungültiger Ordnername."] }, { "msgid": "Invalid name.", "msgstr": ["Ungültiger Name."] }, { "msgid": "Last modified date unknown", "msgstr": ["Datum der letzten Änderung unbekannt"] }, { "msgid": "Modified", "msgstr": ["Geändert"] }, { "msgid": "Move", "msgstr": ["Verschieben"] }, { "msgid": "Move to {target}", "msgstr": ["Nach {target} verschieben"] }, { "msgid": "Name", "msgstr": ["Name"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Namen dürfen maximal 64 Zeichen lang sein."] }, { "msgid": "Names must not be empty.", "msgstr": ["Namen dürfen nicht leer sein."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['Namen dürfen nicht mit "{extension}" enden.'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Namen dürfen nicht mit einem Punkt beginnen."] }, { "msgid": "New", "msgstr": ["Neu"] }, { "msgid": "New folder", "msgstr": ["Neuer Ordner"] }, { "msgid": "New folder name", "msgstr": ["Neuer Ordnername"] }, { "msgid": "New version", "msgstr": ["Neue Version"] }, { "msgid": "No files in here", "msgstr": ["Hier sind keine Dateien"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Es wurden keine Dateien gefunden, die Ihrem Filter entsprechen."] }, { "msgid": "No matching files", "msgstr": ["Keine passenden Dateien"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Bitte einen Namen mit mindestens zwei Zeichen eingeben."] }, { "msgid": "Recent", "msgstr": ["Neueste"] }, { "msgid": "Select all checkboxes", "msgstr": ["Alle Kontrollkästchen aktivieren"] }, { "msgid": "Select all entries", "msgstr": ["Alle Einträge auswählen"] }, { "msgid": "Select all existing files", "msgstr": ["Alle vorhandenen Dateien auswählen"] }, { "msgid": "Select all new files", "msgstr": ["Alle neuen Dateien auswählen"] }, { "msgid": "Select entry", "msgstr": ["Eintrag auswählen"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Die Zeile für {nodename} auswählen."] }, { "msgid": "Size", "msgstr": ["Größe"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["%n Datei überspringen", "%n Dateien überspringen"] }, { "msgid": "Skip this file", "msgstr": ["Diese Datei überspringen"] }, { "msgid": "Submit name", "msgstr": ["Namen senden"] }, { "msgid": "Undo", "msgstr": ["Rückgängig machen"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Laden Sie Inhalte hoch oder synchronisieren Sie diese mit Ihren Geräten!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["Wenn ein eingehender Ordner ausgewählt wird, werden auch alle darin enthaltenen Dateien mit Konflikten überschrieben."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["Bei Auswahl eines eingehenden Ordners wird der Inhalt in den vorhandenen Ordner geschrieben und eine rekursive Konfliktlösung durchgeführt."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["Welche Dateien sollen behalten werden?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Sie sind derzeit als {nickname} identifiziert."] }, { "msgid": "You are currently not identified.", "msgstr": ["Sie sind momentan nicht identifiziert."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Sie können den Namen nicht leer lassen."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["Es muss mindestens eine Konfliktlösung gewählt werden"] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["Es muss mindestens eine Version jeder Datei ausgewählt werden, um fortzufahren."] }] }, { "language": "el", "translations": [{ "msgid": '"{char}" is not allowed inside a folder name.', "msgstr": ["Το «{char}» δεν επιτρέπεται μέσα σε όνομα φακέλου."] }, { "msgid": '"{char}" is not allowed inside a name.', "msgstr": ['"{char}" δεν επιτρέπεται μέσα σε ένα όνομα.'] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['"{extension}" δεν είναι επιτρεπτό όνομα.'] }, { "msgid": '"{segment}" is a reserved name and not allowed for folder names.', "msgstr": ["Το «{segment}» είναι ένα δεσμευμένο όνομα και δεν επιτρέπεται για ονόματα φακέλων."] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['"{segment}" είναι ένα δεσμευμένο όνομα και δεν επιτρέπεται.'] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%n σύγκρουση αρχείου", "%n σύγκρουση αρχείων"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["%n σύγκρουση αρχείου στο {dirname}", "%n σύγκρουση αρχείων στο {dirname}"] }, { "msgid": "All files", "msgstr": ["Όλα τα αρχεία"] }, { "msgid": "Cancel", "msgstr": ["Ακύρωση"] }, { "msgid": "Cancel the entire operation", "msgstr": ["Ακύρωση όλης της διαδικασίας"] }, { "msgid": "Choose", "msgstr": ["Επιλογή"] }, { "msgid": "Choose {file}", "msgstr": ["Επιλέξτε {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Επιλέξτε %n αρχείο", "Επιλέξτε %n αρχεία"] }, { "msgid": "Confirm", "msgstr": ["Επιβεβαίωση"] }, { "msgid": "Continue", "msgstr": ["Συνέχεια"] }, { "msgid": "Copy", "msgstr": ["Αντιγραφή"] }, { "msgid": "Copy to {target}", "msgstr": ["Αντιγραφή στο {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Αδυναμία δημιουργίας νέου φακέλου"] }, { "msgid": "Could not load files settings", "msgstr": ["Αδυναμία φόρτωσης ρυθμίσεων αρχείων"] }, { "msgid": "Could not load files views", "msgstr": ["Αδυναμία φόρτωσης προβολών αρχείων"] }, { "msgid": "Create directory", "msgstr": ["Δημιουργία καταλόγου"] }, { "msgid": "Current view selector", "msgstr": ["Επιλογέας τρέχουσας προβολής"] }, { "msgid": "Enter your name", "msgstr": ["Εισάγετε το όνομά σας"] }, { "msgid": "Existing version", "msgstr": ["Υφιστάμενη έκδοση"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Αποτυχία στην ρύθμιση του ψευδώνυμου."] }, { "msgid": "Favorites", "msgstr": ["Αγαπημένα"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Τα αρχεία και οι φάκελοι που επισημάνετε ως αγαπημένα θα εμφανίζονται εδώ."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Τα αρχεία και οι φάκελοι που τροποποιήσατε πρόσφατα θα εμφανίζονται εδώ."] }, { "msgid": "Filter file list", "msgstr": ["Φιλτράρισμα λίστας αρχείων"] }, { "msgid": 'Folder names must not end with "{extension}".', "msgstr": ["Τα ονόματα των φακέλων δεν πρέπει να τελειώνουν με «{extension}»."] }, { "msgid": "Guest identification", "msgstr": ["Ταυτοποίηση επισκέπτη"] }, { "msgid": "Home", "msgstr": ["Αρχική"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["Εάν επιλέξετε και τις δύο εκδόσεις, στο όνομα του εισερχόμενου αρχείου θα προστεθεί ένας αριθμός."] }, { "msgid": "Invalid folder name.", "msgstr": ["Μη έγκυρο όνομα φακέλου."] }, { "msgid": "Invalid name.", "msgstr": ["Μη έγκυρο όνομα."] }, { "msgid": "Last modified date unknown", "msgstr": ["Άγνωστη ημερομηνία τελευταίας τροποποίησης"] }, { "msgid": "Modified", "msgstr": ["Τροποποιήθηκε"] }, { "msgid": "Move", "msgstr": ["Μετακίνηση"] }, { "msgid": "Move to {target}", "msgstr": ["Μετακίνηση στο {target}"] }, { "msgid": "Name", "msgstr": ["Όνομα"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Τα ονόματα μπορούν να έχουν μέγιστο μήκος 64 χαρακτήρες."] }, { "msgid": "Names must not be empty.", "msgstr": ["Τα ονόματα δεν πρέπει να είναι κενά."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['Τα ονόματα δεν πρέπει να τελειώνουν με "{extension}".'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Τα ονόματα δεν πρέπει να ξεκινούν με τελεία."] }, { "msgid": "New", "msgstr": ["Νέο"] }, { "msgid": "New folder", "msgstr": ["Νέος φάκελος"] }, { "msgid": "New folder name", "msgstr": ["Όνομα νέου φακέλου"] }, { "msgid": "New version", "msgstr": ["Νέα έκδοση"] }, { "msgid": "No files in here", "msgstr": ["Δεν υπάρχουν αρχεία εδώ"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Δεν βρέθηκαν αρχεία που να ταιριάζουν με το φίλτρο σας."] }, { "msgid": "No matching files", "msgstr": ["Κανένα αρχείο δεν ταιριάζει"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Παρακαλώ εισάγετε ένα όνομα με τουλάχιστον 2 χαρακτήρες."] }, { "msgid": "Recent", "msgstr": ["Πρόσφατα"] }, { "msgid": "Select all checkboxes", "msgstr": ["Επιλέξτε όλα τα πλαίσια ελέγχου"] }, { "msgid": "Select all entries", "msgstr": ["Επιλογή όλων των καταχωρήσεων"] }, { "msgid": "Select all existing files", "msgstr": ["Επιλογή όλων των υπάρχοντων αρχείων"] }, { "msgid": "Select all new files", "msgstr": ["Επιλογή όλων των νέων αρχείων"] }, { "msgid": "Select entry", "msgstr": ["Επιλογή εγγραφής"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Επιλέξτε τη γραμμή για το {nodename}"] }, { "msgid": "Size", "msgstr": ["Μέγεθος"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["Παράλειψη ενός αρχείου", "Παράλειψη %n αρχείων"] }, { "msgid": "Skip this file", "msgstr": ["Παράλειψη αυτού το αρχείου"] }, { "msgid": "Submit name", "msgstr": ["Υποβολή ονόματος"] }, { "msgid": "Undo", "msgstr": ["Αναίρεση"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Ανεβάστε κάποιο περιεχόμενο ή συγχρονίστε με τις συσκευές σας!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["Όταν επιλέγεται ένας φάκελος εισερχομένων, όλα τα αρχεία που βρίσκονται σε σύγκρουση μέσα σε αυτόν θα αντικατασταθούν επίσης."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["Όταν επιλέγεται ένας φάκελος εισερχομένων, το περιεχόμενο εγγράφεται στον υπάρχοντα φάκελο και εκτελείται μια αναδρομική επίλυση σύγκρουσης."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["Ποια αρχεία θέλετε να διατηρήσετε;"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Αυτή τη στιγμή έχετε αναγνωριστεί ως {nickname}."] }, { "msgid": "You are currently not identified.", "msgstr": ["Δεν έχετε ταυτοποιηθεί."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Δεν μπορείτε να αφήσετε το όνομα κενό."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["Πρέπει να επιλέξετε τουλάχιστον μία λύση σύγκρουσης"] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["Πρέπει να επιλέξετε τουλάχιστον μία έκδοση από κάθε αρχείο για να συνεχίσετε."] }] }, { "language": "en_GB", "translations": [{ "msgid": '"{char}" is not allowed inside a folder name.', "msgstr": ['"{char}" is not allowed inside a folder name.'] }, { "msgid": '"{char}" is not allowed inside a name.', "msgstr": ['"{char}" is not allowed inside a name.'] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['"{extension}" is not an allowed name.'] }, { "msgid": '"{segment}" is a reserved name and not allowed for folder names.', "msgstr": ['"{segment}" is a reserved name and cannot be used for folder names.'] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['"{segment}" is a reserved name and not allowed.'] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%n file conflict", "%n files conflict"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["%n file conflict in {dirname}", "%n file conflicts in {dirname}"] }, { "msgid": "All files", "msgstr": ["All files"] }, { "msgid": "Cancel", "msgstr": ["Cancel"] }, { "msgid": "Cancel the entire operation", "msgstr": ["Cancel the entire operation"] }, { "msgid": "Choose", "msgstr": ["Choose"] }, { "msgid": "Choose {file}", "msgstr": ["Choose {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Choose %n file", "Choose %n files"] }, { "msgid": "Confirm", "msgstr": ["Confirm"] }, { "msgid": "Continue", "msgstr": ["Continue"] }, { "msgid": "Copy", "msgstr": ["Copy"] }, { "msgid": "Copy to {target}", "msgstr": ["Copy to {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Could not create the new folder"] }, { "msgid": "Could not load files settings", "msgstr": ["Could not load files settings"] }, { "msgid": "Could not load files views", "msgstr": ["Could not load files views"] }, { "msgid": "Create directory", "msgstr": ["Create directory"] }, { "msgid": "Current view selector", "msgstr": ["Current view selector"] }, { "msgid": "Enter your name", "msgstr": ["Enter your name"] }, { "msgid": "Existing version", "msgstr": ["Existing version"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Failed to set nickname."] }, { "msgid": "Favorites", "msgstr": ["Favourites"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Files and folders you mark as favourite will show up here."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Files and folders you recently modified will show up here."] }, { "msgid": "Filter file list", "msgstr": ["Filter file list"] }, { "msgid": 'Folder names must not end with "{extension}".', "msgstr": ['Folder names must not end with "{extension}".'] }, { "msgid": "Guest identification", "msgstr": ["Guest identification"] }, { "msgid": "Home", "msgstr": ["Home"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["If you select both versions, the incoming file will have a number added to its name."] }, { "msgid": "Invalid folder name.", "msgstr": ["Invalid folder name."] }, { "msgid": "Invalid name.", "msgstr": ["Invalid name."] }, { "msgid": "Last modified date unknown", "msgstr": ["Last modified date unknown"] }, { "msgid": "Modified", "msgstr": ["Modified"] }, { "msgid": "Move", "msgstr": ["Move"] }, { "msgid": "Move to {target}", "msgstr": ["Move to {target}"] }, { "msgid": "Name", "msgstr": ["Name"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Names may be at most 64 characters long."] }, { "msgid": "Names must not be empty.", "msgstr": ["Names must not be empty."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['Names must not end with "{extension}".'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Names must not start with a dot."] }, { "msgid": "New", "msgstr": ["New"] }, { "msgid": "New folder", "msgstr": ["New folder"] }, { "msgid": "New folder name", "msgstr": ["New folder name"] }, { "msgid": "New version", "msgstr": ["New version"] }, { "msgid": "No files in here", "msgstr": ["No files in here"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["No files matching your filter were found."] }, { "msgid": "No matching files", "msgstr": ["No matching files"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Please enter a name with at least 2 characters."] }, { "msgid": "Recent", "msgstr": ["Recent"] }, { "msgid": "Select all checkboxes", "msgstr": ["Select all checkboxes"] }, { "msgid": "Select all entries", "msgstr": ["Select all entries"] }, { "msgid": "Select all existing files", "msgstr": ["Select all existing files"] }, { "msgid": "Select all new files", "msgstr": ["Select all new files"] }, { "msgid": "Select entry", "msgstr": ["Select entry"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Select the row for {nodename}"] }, { "msgid": "Size", "msgstr": ["Size"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["Skip %n file", "Skip %n files"] }, { "msgid": "Skip this file", "msgstr": ["Skip this file"] }, { "msgid": "Submit name", "msgstr": ["Submit name"] }, { "msgid": "Undo", "msgstr": ["Undo"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Upload some content or sync with your devices!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["When an incoming folder is selected, any conflicting files within it will also be overwritten."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["Which files do you want to keep?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["You are currently identified as {nickname}."] }, { "msgid": "You are currently not identified.", "msgstr": ["You are currently not identified."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["You cannot leave the name empty."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["You need to choose at least one conflict solution"] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["You need to select at least one version of each file to continue."] }] }, { "language": "es", "translations": [{ "msgid": '"{char}" is not allowed inside a name.', "msgstr": ['"{char}" no está permitido dentro de un nombre.'] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['"{extension}" no es un nombre permitido.'] }, { "msgid": '"{name}" is an invalid folder name.', "msgstr": ['"{name}" es un nombre de carpeta no válido.'] }, { "msgid": '"{name}" is not an allowed folder name', "msgstr": ['"{name}" no es un nombre de carpeta permitido'] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['"{segment}" es un nombre reservado y no está permitido.'] }, { "msgid": '"/" is not allowed inside a folder name.', "msgstr": ['"/" no está permitido dentro del nombre de una carpeta.'] }, { "msgid": "All files", "msgstr": ["Todos los archivos"] }, { "msgid": "Cancel", "msgstr": ["Cancelar"] }, { "msgid": "Choose", "msgstr": ["Seleccionar"] }, { "msgid": "Choose {file}", "msgstr": ["Seleccionar {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Elige %n archivo", "Elige %n archivos", "Seleccione %n archivos"] }, { "msgid": "Copy", "msgstr": ["Copiar"] }, { "msgid": "Copy to {target}", "msgstr": ["Copiar a {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["No se pudo crear la nueva carpeta"] }, { "msgid": "Could not load files settings", "msgstr": ["No se pudieron cargar los ajustes de archivos"] }, { "msgid": "Could not load files views", "msgstr": ["No se pudieron cargar las vistas de los archivos"] }, { "msgid": "Create directory", "msgstr": ["Crear directorio"] }, { "msgid": "Current view selector", "msgstr": ["Selector de vista actual"] }, { "msgid": "Enter your name", "msgstr": ["Ingrese su nombre"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Fallo al establecer apodo."] }, { "msgid": "Favorites", "msgstr": ["Favoritos"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Los archivos y carpetas que marque como favoritos aparecerán aquí."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Los archivos y carpetas que modificó recientemente aparecerán aquí."] }, { "msgid": "Filter file list", "msgstr": ["Filtrar lista de archivos"] }, { "msgid": "Folder name cannot be empty.", "msgstr": ["El nombre de la carpeta no puede estar vacío."] }, { "msgid": "Guest identification", "msgstr": ["Identificación de invitado"] }, { "msgid": "Home", "msgstr": ["Inicio"] }, { "msgid": "Invalid name.", "msgstr": ["Nombre inválido."] }, { "msgid": "Modified", "msgstr": ["Modificado"] }, { "msgid": "Move", "msgstr": ["Mover"] }, { "msgid": "Move to {target}", "msgstr": ["Mover a {target}"] }, { "msgid": "Name", "msgstr": ["Nombre"] }, { "msgid": "Names must not be empty.", "msgstr": ["Los nombres no deben estar vacíos."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['Los nombres no deben terminar con "{extension}".'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Los nombres no deben iniciar con un punto."] }, { "msgid": "New", "msgstr": ["Nuevo"] }, { "msgid": "New folder", "msgstr": [" Nueva carpeta"] }, { "msgid": "New folder name", "msgstr": ["Nuevo nombre de carpeta"] }, { "msgid": "No files in here", "msgstr": ["No hay archivos aquí"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["No se encontraron archivos que coincidiesen con su filtro."] }, { "msgid": "No matching files", "msgstr": ["No hay archivos coincidentes"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Por favor, ingrese un nombre con al menos 2 caracteres."] }, { "msgid": "Recent", "msgstr": ["Reciente"] }, { "msgid": "Select all entries", "msgstr": ["Seleccionar todas las entradas"] }, { "msgid": "Select entry", "msgstr": ["Seleccionar entrada"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Seleccione la fila para {nodename}"] }, { "msgid": "Size", "msgstr": ["Tamaño"] }, { "msgid": "Submit name", "msgstr": ["Enviar nombre"] }, { "msgid": "Undo", "msgstr": ["Deshacer"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["¡Cargue algún contenido o sincronice con sus dispositivos!"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Ud. se encuentra identificado actualmente como {nickname}."] }, { "msgid": "You are currently not identified.", "msgstr": ["Ud. no se encuentra identificado actualmente."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["No puede dejar el nombre vacío."] }] }, { "language": "es_AR", "translations": [{ "msgid": '"{name}" is an invalid folder name.', "msgstr": ['"{name}" es un nombre de carpeta inválido.'] }, { "msgid": '"{name}" is not an allowed folder name', "msgstr": ['"{name}" no es un nombre de carpeta permitido'] }, { "msgid": '"/" is not allowed inside a folder name.', "msgstr": ['"/" no está permitido en el nombre de una carpeta.'] }, { "msgid": "All files", "msgstr": ["Todos los archivos"] }, { "msgid": "Choose", "msgstr": ["Elegir"] }, { "msgid": "Choose {file}", "msgstr": ["Elija {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Elija %n archivo", "Elija %n archivos", "Elija %n archivos"] }, { "msgid": "Copy", "msgstr": ["Copiar"] }, { "msgid": "Copy to {target}", "msgstr": ["Copiar a {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["No se pudo crear la nueva carpeta"] }, { "msgid": "Could not load files settings", "msgstr": ["No se pudo cargar la configuración de archivos"] }, { "msgid": "Could not load files views", "msgstr": ["No se pudieron cargar las vistas de los archivos"] }, { "msgid": "Create directory", "msgstr": ["Crear directorio"] }, { "msgid": "Current view selector", "msgstr": ["Selector de vista actual"] }, { "msgid": "Favorites", "msgstr": ["Favoritos"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Los archivos y carpetas que marque como favoritos aparecerán aquí."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Los archivos y carpetas que modificó recientemente aparecerán aquí."] }, { "msgid": "Filter file list", "msgstr": ["Filtrar lista de archivos"] }, { "msgid": "Folder name cannot be empty.", "msgstr": ["El nombre de la carpeta no puede estar vacío."] }, { "msgid": "Home", "msgstr": ["Inicio"] }, { "msgid": "Modified", "msgstr": ["Modificado"] }, { "msgid": "Move", "msgstr": ["Mover"] }, { "msgid": "Move to {target}", "msgstr": ["Mover a {target}"] }, { "msgid": "Name", "msgstr": ["Nombre"] }, { "msgid": "New", "msgstr": ["Nuevo"] }, { "msgid": "New folder", "msgstr": ["Nueva carpeta"] }, { "msgid": "New folder name", "msgstr": ["Nombre de nueva carpeta"] }, { "msgid": "No files in here", "msgstr": ["No hay archivos aquí"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["No se encontraron archivos que coincidan con su filtro."] }, { "msgid": "No matching files", "msgstr": ["No hay archivos coincidentes"] }, { "msgid": "Recent", "msgstr": ["Reciente"] }, { "msgid": "Select all entries", "msgstr": ["Seleccionar todas las entradas"] }, { "msgid": "Select entry", "msgstr": ["Seleccionar entrada"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Seleccione la fila para {nodename}"] }, { "msgid": "Size", "msgstr": ["Tamaño"] }, { "msgid": "Undo", "msgstr": ["Deshacer"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["¡Cargue algún contenido o sincronice con sus dispositivos!"] }] }, { "language": "es_MX", "translations": [{ "msgid": '"{char}" is not allowed inside a folder name.', "msgstr": ['"{char}" no está permitido dentro de un nombre de carpeta'] }, { "msgid": '"{char}" is not allowed inside a name.', "msgstr": ['"{char}" no está permitido dentro de un nombre'] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['"{extension}" no es un nombre permitido'] }, { "msgid": '"{segment}" is a reserved name and not allowed for folder names.', "msgstr": ['"{segment}" es un nombre reservado y no está permitido para nombres de carpetas'] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['"{segment}" es un nombre reservado y no está permitido'] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%n conflicto de archivo", "%n conflicto de archivos", "%n conflicto de archivos"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["%n conflicto de archivo en {dirname}", "%n conflictos de archivo en {dirname}", "%n conflictos de archivo en {dirname}"] }, { "msgid": "All files", "msgstr": ["Todos los archivos"] }, { "msgid": "Cancel", "msgstr": ["Cancelar"] }, { "msgid": "Cancel the entire operation", "msgstr": ["Cancelar la operación completa"] }, { "msgid": "Choose", "msgstr": ["Seleccionar"] }, { "msgid": "Choose {file}", "msgstr": ["Seleccionar {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Seleccionar %n archivo", "Seleccionar %n archivos", "Seleccionar %n archivos"] }, { "msgid": "Confirm", "msgstr": ["Confirmar"] }, { "msgid": "Continue", "msgstr": ["Continuar"] }, { "msgid": "Copy", "msgstr": ["Copiar"] }, { "msgid": "Copy to {target}", "msgstr": ["Copiar a {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["No se pudo crear la nueva carpeta"] }, { "msgid": "Could not load files settings", "msgstr": ["No se pudo cargar la configuración de archivos"] }, { "msgid": "Could not load files views", "msgstr": ["No se pudieron cargar las vistas de los archivos"] }, { "msgid": "Create directory", "msgstr": ["Crear carpeta"] }, { "msgid": "Current view selector", "msgstr": ["Selector de vista actual"] }, { "msgid": "Enter your name", "msgstr": ["Ingresa tu nombre"] }, { "msgid": "Existing version", "msgstr": ["Versión existente"] }, { "msgid": "Failed to set nickname.", "msgstr": ["No se pudo establecer el nickname"] }, { "msgid": "Favorites", "msgstr": ["Favoritos"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Los archivos y carpetas que marque como favoritos aparecerán aquí."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Los archivos y carpetas que modificó recientemente aparecerán aquí."] }, { "msgid": "Filter file list", "msgstr": ["Filtrar lista de archivos"] }, { "msgid": 'Folder names must not end with "{extension}".', "msgstr": ['Los nombres para carpeta no deben terminar con "{extension}"'] }, { "msgid": "Guest identification", "msgstr": ["Identificación de invitado"] }, { "msgid": "Home", "msgstr": ["Inicio"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["Si seleccionas ambas versiones, se le agregará al archivo que se está descargando, un número a su nombre."] }, { "msgid": "Invalid folder name.", "msgstr": ["Nombre de carpeta no válido"] }, { "msgid": "Invalid name.", "msgstr": ["Nombre no válido"] }, { "msgid": "Last modified date unknown", "msgstr": ["Última fecha de modificación desconocida"] }, { "msgid": "Modified", "msgstr": ["Modificado"] }, { "msgid": "Move", "msgstr": ["Mover"] }, { "msgid": "Move to {target}", "msgstr": ["Mover a {target}"] }, { "msgid": "Name", "msgstr": ["Nombre"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Los nombres pueden tener como máximo 64 caracteres."] }, { "msgid": "Names must not be empty.", "msgstr": ["Los nombres no deben estar vacíos."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['Los nombres no deben terminar con "{extension}"'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Los nombres no deben comenzar con un punto."] }, { "msgid": "New", "msgstr": ["Nuevo"] }, { "msgid": "New folder", "msgstr": ["Nueva carpeta"] }, { "msgid": "New folder name", "msgstr": ["Nombre de nueva carpeta"] }, { "msgid": "New version", "msgstr": ["Versión nueva"] }, { "msgid": "No files in here", "msgstr": ["No hay archivos aquí"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["No se encontraron archivos que coincidan con su filtro."] }, { "msgid": "No matching files", "msgstr": ["No hay archivos coincidentes"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Por favor ingrese un nombre con al menos 2 caracteres."] }, { "msgid": "Recent", "msgstr": ["Reciente"] }, { "msgid": "Select all checkboxes", "msgstr": ["Seleccione todas las casillas de verificación"] }, { "msgid": "Select all entries", "msgstr": ["Seleccionar todas las entradas"] }, { "msgid": "Select all existing files", "msgstr": ["Seleccione todos los archivos que aparecen"] }, { "msgid": "Select all new files", "msgstr": ["Seleccione todos los archivos nuevos"] }, { "msgid": "Select entry", "msgstr": ["Seleccionar entrada"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Seleccione la fila para {nodename}"] }, { "msgid": "Size", "msgstr": ["Tamaño"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["Omitir %n archivo", "Omitir %n archivos", "Omitir %n archivos"] }, { "msgid": "Skip this file", "msgstr": ["Omitir este archivo"] }, { "msgid": "Submit name", "msgstr": ["Enviar nombre"] }, { "msgid": "Undo", "msgstr": ["Deshacer"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["¡Suba algún contenido o sincronice con sus dispositivos!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["Cuando se selecciona una carpeta en descarga, cualquier archivo conflictivo que contenga también se sobrescribirá."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["Cuando se selecciona una carpeta en descarga, el contenido se escribe en la carpeta existente y se realiza una resolución de conflicto recursiva."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["¿Qué archivos deseas conservar?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Actualmente estás identificado como {nickname}"] }, { "msgid": "You are currently not identified.", "msgstr": ["No estás identificado actualmente."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["No puedes dejar el nombre vacío."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["Necesitas elegir al menos una solución al conflicto."] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["Necesitas seleccionar al menos una versión de cada archivo para continuar."] }] }, { "language": "et_EE", "translations": [{ "msgid": '"{char}" is not allowed inside a folder name.', "msgstr": ["„{char}“ pole kausta nimes lubatud."] }, { "msgid": '"{char}" is not allowed inside a name.', "msgstr": ["„{char}“ pole nimes lubatud."] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ["„{extension}“ pole lubatud nimi."] }, { "msgid": '"{segment}" is a reserved name and not allowed for folder names.', "msgstr": ["„{segment}“ on reserveeritud nimi ja pole kausta nimes lubatud."] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ["„{segment}“ on reserveeritud nimi ja pole kasutamiseks lubatud."] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%n fail on vastuolus", "%n faili on omavahel vastuolus"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["%n fail on {dirname} kaustas vastuolus", "%n faili on omavahel {dirname} kaustas vastuolus"] }, { "msgid": "All files", "msgstr": ["Kõik failid"] }, { "msgid": "Cancel", "msgstr": ["Katkesta"] }, { "msgid": "Cancel the entire operation", "msgstr": ["Katkesta kogu tegevus"] }, { "msgid": "Choose", "msgstr": ["Tee valik"] }, { "msgid": "Choose {file}", "msgstr": ["Vali {file} fail"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Vali %n fail", "Vali %n faili"] }, { "msgid": "Confirm", "msgstr": ["Kinnita"] }, { "msgid": "Continue", "msgstr": ["Jätka"] }, { "msgid": "Copy", "msgstr": ["Kopeeri"] }, { "msgid": "Copy to {target}", "msgstr": ["Kopeeri sihtkohta „{target}“"] }, { "msgid": "Could not create the new folder", "msgstr": ["Uut kausta ei saanud luua"] }, { "msgid": "Could not load files settings", "msgstr": ["Failide seadistusi ei õnnestunud laadida"] }, { "msgid": "Could not load files views", "msgstr": ["Failide vaatamiskordi ei õnnestunud laadida"] }, { "msgid": "Create directory", "msgstr": ["Loo kaust"] }, { "msgid": "Current view selector", "msgstr": ["Praeguse vaate valija"] }, { "msgid": "Enter your name", "msgstr": ["Sisesta oma nimi"] }, { "msgid": "Existing version", "msgstr": ["Olemasolev versioon"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Hüüdnime ei õnnestunud lisada"] }, { "msgid": "Favorites", "msgstr": ["Lemmikud"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Failid ja kaustad, mida märgistad lemmikuks, kuvatakse siin."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Siin kuvatakse hiljuti muudetud failid ja kaustad."] }, { "msgid": "Filter file list", "msgstr": ["Filtreeri faililoendit"] }, { "msgid": 'Folder names must not end with "{extension}".', "msgstr": ["Kausta nime lõpus ei tohi olla „{extension}“."] }, { "msgid": "Guest identification", "msgstr": ["Külalise tuvastamine"] }, { "msgid": "Home", "msgstr": ["Avaleht"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["Kui valid mõlemad versioonid, siis uue faili nimele lisatakse number."] }, { "msgid": "Invalid folder name.", "msgstr": ["Vigane kausta nimi."] }, { "msgid": "Invalid name.", "msgstr": ["Vigane nimi."] }, { "msgid": "Last modified date unknown", "msgstr": ["Viimase muutmise kuupäev pole teada"] }, { "msgid": "Modified", "msgstr": ["Muudetud"] }, { "msgid": "Move", "msgstr": ["Teisalda"] }, { "msgid": "Move to {target}", "msgstr": ["Teisalda kausta „{target}“"] }, { "msgid": "Name", "msgstr": ["Nimi"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Nimed võivad olla vaid kuni 64 tähemärki pikad."] }, { "msgid": "Names must not be empty.", "msgstr": ["Nimi ei saa olla tühi."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ["Nime lõpus ei tohi olla „{extension}“."] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Nime alguses ei tohi olla punkt."] }, { "msgid": "New", "msgstr": ["Uus"] }, { "msgid": "New folder", "msgstr": ["Uus kaust"] }, { "msgid": "New folder name", "msgstr": ["Uue kausta nimi"] }, { "msgid": "New version", "msgstr": ["Uus versioon"] }, { "msgid": "No files in here", "msgstr": ["Siin puuduvad failid"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Sinu filtrile vastavaid faile ei leidunud."] }, { "msgid": "No matching files", "msgstr": ["Puuduvad sobivad failid"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Palun sisesta vähemalt 2 tähemärki pikk nimi."] }, { "msgid": "Recent", "msgstr": ["Hiljutine"] }, { "msgid": "Select all checkboxes", "msgstr": ["Vali kõik märkeruudud"] }, { "msgid": "Select all entries", "msgstr": ["Vali kõik kirjed"] }, { "msgid": "Select all existing files", "msgstr": ["Vali kõik olemasolevad failid"] }, { "msgid": "Select all new files", "msgstr": ["Vali kõik uued failid"] }, { "msgid": "Select entry", "msgstr": ["Vali kirje"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Vali rida „{nodename}“ jaoks"] }, { "msgid": "Size", "msgstr": ["Suurus"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["Jäta %n fail vahele", "Jäta %n faili vahele"] }, { "msgid": "Skip this file", "msgstr": ["Jäta see fail vahele"] }, { "msgid": "Submit name", "msgstr": ["Lisa nimi"] }, { "msgid": "Undo", "msgstr": ["Tühista"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Lisa mingit sisu või sünkrooni see oma seadmetest!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["Kui uute failide kaust on valitud, siis kõik seal leiduvad vastuolus failid saavad üle kirjutatud."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["Kui uute failide kaust on valitud, siis sisu kirjutatakse olemasolevasse kausta ja korraldatakse rekursiivne failikonfliktide lahendamine."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["Missugused failid tahaksid alles jätta?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Sa oled hetkel tuvastatav kui {nickname}.."] }, { "msgid": "You are currently not identified.", "msgstr": ["Sa oled hetkel tuvastamata."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Sa ei saa jätte nime tühjaks."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["Sa pead valima vähemalt ühe failikonflikti lahenduse."] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["Jätkamaks pead valima igast failist vähemalt ühe versiooni."] }] }, { "language": "fa", "translations": [{ "msgid": '"{name}" is an invalid folder name.', "msgstr": ["{name} نام پوشه معتبر نیست"] }, { "msgid": '"{name}" is not an allowed folder name', "msgstr": ["{name} نام پوشه مجاز نیست"] }, { "msgid": '"/" is not allowed inside a folder name.', "msgstr": ['"/" نمی‌تواند در نام پوشه استفاده شود.'] }, { "msgid": "All files", "msgstr": ["همه فایل‌ها"] }, { "msgid": "Cancel", "msgstr": ["لغو"] }, { "msgid": "Choose", "msgstr": ["انتخاب"] }, { "msgid": "Choose {file}", "msgstr": ["انتخاب {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["انتخاب %n فایل", "انتخاب %n فایل"] }, { "msgid": "Copy", "msgstr": ["رونوشت"] }, { "msgid": "Copy to {target}", "msgstr": ["رونوشت از {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["پوشه جدید ایجاد نشد"] }, { "msgid": "Could not load files settings", "msgstr": ["تنظیمات فایل باز نشد"] }, { "msgid": "Could not load files views", "msgstr": ["نمای فایل‌ها بارگیری نشد"] }, { "msgid": "Create directory", "msgstr": ["ایجاد فهرست"] }, { "msgid": "Current view selector", "msgstr": ["انتخابگر نماگر فعلی"] }, { "msgid": "Enter your name", "msgstr": ["نام خود را وارد کنید"] }, { "msgid": "Failed to set nickname.", "msgstr": ["تنظیم نام مستعار ناموفق بود."] }, { "msgid": "Favorites", "msgstr": ["علایق"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["فایل‌ها و پوشه‌هایی که به‌عنوان مورد علاقه علامت‌گذاری می‌کنید در اینجا نشان داده می‌شوند."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["فایل‌ها و پوشه‌هایی که اخیراً تغییر داده‌اید در اینجا نمایش داده می‌شوند."] }, { "msgid": "Filter file list", "msgstr": ["فیلتر لیست فایل"] }, { "msgid": "Folder name cannot be empty.", "msgstr": ["نام پوشه نمی تواند خالی باشد."] }, { "msgid": "Guest identification", "msgstr": ["شناسایی مهمان"] }, { "msgid": "Home", "msgstr": ["خانه"] }, { "msgid": "Modified", "msgstr": ["اصلاح شده"] }, { "msgid": "Move", "msgstr": ["انتقال"] }, { "msgid": "Move to {target}", "msgstr": ["انتقال به {target}"] }, { "msgid": "Name", "msgstr": ["نام"] }, { "msgid": "New", "msgstr": ["جدید"] }, { "msgid": "New folder", "msgstr": ["پوشه جدید"] }, { "msgid": "New folder name", "msgstr": ["نام پوشه جدید"] }, { "msgid": "No files in here", "msgstr": ["فایلی اینجا نیست"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["هیچ فایلی مطابق با فیلتر شما یافت نشد."] }, { "msgid": "No matching files", "msgstr": ["فایل منطبقی وجود ندارد"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["لطفاً نامی با حداقل ۲ کاراکتر وارد کنید."] }, { "msgid": "Recent", "msgstr": ["اخیر"] }, { "msgid": "Select all entries", "msgstr": ["انتخاب همه ورودی ها"] }, { "msgid": "Select entry", "msgstr": ["انتخاب ورودی"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["انتخاب ردیف برای {nodename}"] }, { "msgid": "Size", "msgstr": ["اندازه"] }, { "msgid": "Submit name", "msgstr": ["ارسال نام"] }, { "msgid": "Undo", "msgstr": ["بازگردانی"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["مقداری محتوا آپلود کنید یا با دستگاه های خود همگام سازی کنید!"] }, { "msgid": "You are currently not identified.", "msgstr": ["شما در حال حاضر شناسایی نشده‌اید."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["نمی‌توانید نام را خالی بگذارید."] }] }, { "language": "fi_FI", "translations": [{ "msgid": '"{char}" is not allowed inside a name.', "msgstr": ['"{char}" ei ole sallittu nimessä.'] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['"{extension}" ei ole sallittu nimi.'] }, { "msgid": '"{name}" is an invalid folder name.', "msgstr": ['"{name}" on virheellinen kansion nimi.'] }, { "msgid": '"{name}" is not an allowed folder name', "msgstr": ['"{name}" ei ole sallittu kansion nimi'] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['"{segment}" on varattu nimi eikä se ole sallittu.'] }, { "msgid": '"/" is not allowed inside a folder name.', "msgstr": ['"/" ei ole sallittu kansion nimessä.'] }, { "msgid": "All files", "msgstr": ["Kaikki tiedostot"] }, { "msgid": "Cancel", "msgstr": ["Peruuta"] }, { "msgid": "Choose", "msgstr": ["Valitse"] }, { "msgid": "Choose {file}", "msgstr": ["Valitse {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Valitse %n tiedosto", "Valitse %n tiedostoa"] }, { "msgid": "Copy", "msgstr": ["Kopioi"] }, { "msgid": "Copy to {target}", "msgstr": ["Kopioi sijaintiin {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Uutta kansiota ei voitu luoda"] }, { "msgid": "Could not load files settings", "msgstr": ["Tiedoston asetuksia ei saa ladattua"] }, { "msgid": "Could not load files views", "msgstr": ["Tiedoston näkymiä ei saa ladattua"] }, { "msgid": "Create directory", "msgstr": ["Luo kansio"] }, { "msgid": "Current view selector", "msgstr": ["Nykyisen näkymän valinta"] }, { "msgid": "Enter your name", "msgstr": ["Kirjoita nimesi"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Kutsumanimen asettaminen epäonnistui."] }, { "msgid": "Favorites", "msgstr": ["Suosikit"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Tiedostot ja kansiot, jotka merkitset suosikkeihisi, näkyvät täällä."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Tiedostot ja kansiot, joita muokkasit äskettäin, näkyvät täällä."] }, { "msgid": "Filter file list", "msgstr": ["Suodata tiedostolistaa"] }, { "msgid": "Folder name cannot be empty.", "msgstr": ["Kansion nimi ei voi olla tyhjä."] }, { "msgid": "Guest identification", "msgstr": ["Vieraan tunnistaminen"] }, { "msgid": "Home", "msgstr": ["Koti"] }, { "msgid": "Invalid name.", "msgstr": ["Virheellinen nimi."] }, { "msgid": "Modified", "msgstr": ["Muokattu"] }, { "msgid": "Move", "msgstr": ["Siirrä"] }, { "msgid": "Move to {target}", "msgstr": ["Siirrä sijaintiin {target}"] }, { "msgid": "Name", "msgstr": ["Nimi"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Nimissä voi olla enintään 64 merkkiä."] }, { "msgid": "Names must not be empty.", "msgstr": ["Nimet eivät saa olla tyhjiä."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['Nimet eivät saa päättyä sanaan "{extension}".'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Nimet eivät saa alkaa pisteellä."] }, { "msgid": "New", "msgstr": ["Uusi"] }, { "msgid": "New folder", "msgstr": ["Uusi kansio"] }, { "msgid": "New folder name", "msgstr": ["Uuden kansion nimi"] }, { "msgid": "No files in here", "msgstr": ["Täällä ei ole tiedostoja"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Suodatinta vastaavia tiedostoja ei löytynyt."] }, { "msgid": "No matching files", "msgstr": ["Ei vastaavia tiedostoja"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Kirjoita vähintään kaksi merkkiä sisältävä nimi."] }, { "msgid": "Recent", "msgstr": ["Viimeisimmät"] }, { "msgid": "Select all entries", "msgstr": ["Valitse kaikki tietueet"] }, { "msgid": "Select entry", "msgstr": ["Valitse tietue"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Valitse rivi {nodename}:lle"] }, { "msgid": "Size", "msgstr": ["Koko"] }, { "msgid": "Submit name", "msgstr": ["Lähetä nimi"] }, { "msgid": "Undo", "msgstr": ["Kumoa"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Lähetä jotain sisältöä tai synkronoi laitteidesi kanssa!"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Sinut tunnetaan tällä hetkellä nimellä {nickname}."] }, { "msgid": "You are currently not identified.", "msgstr": ["Sinua ei ole tunnistettu."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Nimeä ei voi jättää tyhjäksi."] }] }, { "language": "fr", "translations": [{ "msgid": '"{char}" is not allowed inside a folder name.', "msgstr": [`"{char}" n'est pas autorisé dans un nom de dossier.`] }, { "msgid": '"{char}" is not allowed inside a name.', "msgstr": [`"{char}" n'est pas autorisé dans un nom.`] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": [`"{extension}" n'est pas un nom autorisé.`] }, { "msgid": '"{segment}" is a reserved name and not allowed for folder names.', "msgstr": [`"{segment}" est un nom réservé et n'est pas autorisé pour un nom de dossier.`] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": [`"{segment}" est un nom réservé et n'est pas autorisé.`] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%n conflit de fichier", "%n conflit de fichiers", "%n conflit de fichiers"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["%nconflit de fichier dans {dirname}", "%n conflit de fichiers dans {dirname}", "%nconflit de fichiers dans {dirname}"] }, { "msgid": "All files", "msgstr": ["Tous les fichiers"] }, { "msgid": "Cancel", "msgstr": ["Annuler"] }, { "msgid": "Cancel the entire operation", "msgstr": ["Tout annuler "] }, { "msgid": "Choose", "msgstr": ["Choisir"] }, { "msgid": "Choose {file}", "msgstr": ["Choisir {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Choisir %n fichier", "Choisir %n fichiers", "Choisir %n fichiers "] }, { "msgid": "Confirm", "msgstr": ["Confirmer"] }, { "msgid": "Continue", "msgstr": ["Continuer"] }, { "msgid": "Copy", "msgstr": ["Copier"] }, { "msgid": "Copy to {target}", "msgstr": ["Copier vers {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Impossible de créer le nouveau dossier"] }, { "msgid": "Could not load files settings", "msgstr": ["Les paramètres des fichiers n'ont pas pu être chargés"] }, { "msgid": "Could not load files views", "msgstr": ["Impossible de charger les vues des fichiers"] }, { "msgid": "Create directory", "msgstr": ["Créer un répertoire"] }, { "msgid": "Current view selector", "msgstr": ["Sélecteur d'affichage actuel"] }, { "msgid": "Enter your name", "msgstr": ["Entrez votre nom"] }, { "msgid": "Existing version", "msgstr": ["Version actuelle "] }, { "msgid": "Failed to set nickname.", "msgstr": ["Échec de définition du surnom."] }, { "msgid": "Favorites", "msgstr": ["Favoris"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Les fichiers et répertoires marqués en favoris apparaîtront ici."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Les fichiers et répertoires modifiés récemment apparaîtront ici."] }, { "msgid": "Filter file list", "msgstr": ["Filtrer la liste des fichiers"] }, { "msgid": 'Folder names must not end with "{extension}".', "msgstr": ['Les noms de dossiers ne doivent pas se terminer par "{extension}".'] }, { "msgid": "Guest identification", "msgstr": ["Identification d'invité"] }, { "msgid": "Home", "msgstr": ["Accueil"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["Si vous conservez les deux versions, le fichier reçu sera renommé avec un numéro."] }, { "msgid": "Invalid folder name.", "msgstr": ["Nom de dossier invalide."] }, { "msgid": "Invalid name.", "msgstr": ["Nom invalide."] }, { "msgid": "Last modified date unknown", "msgstr": ["Date de modification inconnue"] }, { "msgid": "Modified", "msgstr": ["Modifié"] }, { "msgid": "Move", "msgstr": ["Déplacer"] }, { "msgid": "Move to {target}", "msgstr": ["Déplacer vers {target}"] }, { "msgid": "Name", "msgstr": ["Nom"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Les noms peuvent comporter au maximum 64 caractères."] }, { "msgid": "Names must not be empty.", "msgstr": ["Les noms ne peuvent pas être vides."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['Les noms ne doivent pas se terminer par "{extension}".'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Les noms ne peuvent pas commencer par un point."] }, { "msgid": "New", "msgstr": ["Nouveau"] }, { "msgid": "New folder", "msgstr": ["Nouveau dossier"] }, { "msgid": "New folder name", "msgstr": ["Nom du nouveau dossier"] }, { "msgid": "New version", "msgstr": ["Nouvelle version"] }, { "msgid": "No files in here", "msgstr": ["Aucun fichier ici"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Aucun fichier trouvé correspondant à votre filtre."] }, { "msgid": "No matching files", "msgstr": ["Aucun fichier correspondant"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Veuillez entrer un nom avec au moins 2 caractères."] }, { "msgid": "Recent", "msgstr": ["Récents"] }, { "msgid": "Select all checkboxes", "msgstr": ["Sélectionner toutes les cases à cocher"] }, { "msgid": "Select all entries", "msgstr": ["Tout sélectionner"] }, { "msgid": "Select all existing files", "msgstr": ["Sélectionner tous les fichiers existants"] }, { "msgid": "Select all new files", "msgstr": ["Sélectionner tous les nouveaux fichiers"] }, { "msgid": "Select entry", "msgstr": ["Sélectionner une entrée"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Sélectionner la ligne correspondant à {nodename}"] }, { "msgid": "Size", "msgstr": ["Taille"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["Ignorer %n fichier", "Ignorer %n fichiers ", "Ignorer %n fichiers "] }, { "msgid": "Skip this file", "msgstr": ["Ignorer ce fichier"] }, { "msgid": "Submit name", "msgstr": ["Envoyer le nom"] }, { "msgid": "Undo", "msgstr": ["Annuler"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Chargez du contenu ou synchronisez avec vos équipements !"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["En sélectionnant un dossier entrant, les fichiers en conflit qu’il contient seront automatiquement écrasés."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["Lorsque vous sélectionnez un dossier entrant, son contenu est ajouté au dossier existant et les conflits sont résolus automatiquement."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["Quels fichiers souhaitez-vous conserver ?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Vous êtes actuellement identifié comme {nickname}."] }, { "msgid": "You are currently not identified.", "msgstr": ["Vous n'êtes pas identifié actuellement."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Vous ne pouvez pas laisser le nom vide."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["Vous devez choisir au moins une option pour résoudre le conflit"] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["Sélectionnez au moins une version de chaque fichier pour continuer."] }] }, { "language": "ga", "translations": [{ "msgid": '"{char}" is not allowed inside a folder name.', "msgstr": [`Ní cheadaítear "{char}" laistigh d'ainm fillteáin.`] }, { "msgid": '"{char}" is not allowed inside a name.', "msgstr": [`Ní cheadaítear "{char}" laistigh d'ainm.`] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['Ní ainm ceadaithe é "{extension}".'] }, { "msgid": '"{segment}" is a reserved name and not allowed for folder names.', "msgstr": [`Is ainm curtha in áirithe é "{segment}" agus ní cheadaítear é d'ainmneacha fillteán.`] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['Is ainm curtha in áirithe é "{segment}" agus ní cheadaítear é.'] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%n coimhlint comhaid", "%n coimhlint comhad", "%n coimhlint comhad", "%n coimhlint comhad", "%n coimhlint comhad"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["%n coimhlint comhaid i {dirname}", "%n coimhlintí comhaid i {dirname}", "%n coimhlintí comhaid i {dirname}", "%n coimhlintí comhaid i {dirname}", "%n coimhlintí comhaid i {dirname}"] }, { "msgid": "All files", "msgstr": ["Gach comhad"] }, { "msgid": "Cancel", "msgstr": ["Cealaigh"] }, { "msgid": "Cancel the entire operation", "msgstr": ["Cealaigh an oibríocht ar fad"] }, { "msgid": "Choose", "msgstr": ["Roghnaigh"] }, { "msgid": "Choose {file}", "msgstr": ["Roghnaigh {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Roghnaigh %n comhad", "Roghnaigh %n comhaid", "Roghnaigh %n comhaid", "Roghnaigh %n comhaid", "Roghnaigh %n comhaid"] }, { "msgid": "Confirm", "msgstr": ["Deimhnigh"] }, { "msgid": "Continue", "msgstr": ["Lean ar aghaidh"] }, { "msgid": "Copy", "msgstr": ["Cóip"] }, { "msgid": "Copy to {target}", "msgstr": ["Cóipeáil chuig {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Níorbh fhéidir an fillteán nua a chruthú"] }, { "msgid": "Could not load files settings", "msgstr": ["Níorbh fhéidir socruithe comhaid a lódáil"] }, { "msgid": "Could not load files views", "msgstr": ["Níorbh fhéidir radhairc comhad a lódáil"] }, { "msgid": "Create directory", "msgstr": ["Cruthaigh eolaire"] }, { "msgid": "Current view selector", "msgstr": ["Roghnóir amhairc reatha"] }, { "msgid": "Enter your name", "msgstr": ["Cuir isteach d'ainm"] }, { "msgid": "Existing version", "msgstr": ["Leagan atá ann cheana féin"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Theip ar leasainm a shocrú."] }, { "msgid": "Favorites", "msgstr": ["Ceanáin"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Taispeánfar comhaid agus fillteáin a mharcálann tú mar is fearr leat anseo."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Taispeánfar comhaid agus fillteáin a d'athraigh tú le déanaí anseo."] }, { "msgid": "Filter file list", "msgstr": ["Scag liosta comhad"] }, { "msgid": 'Folder names must not end with "{extension}".', "msgstr": ['Ní féidir ainmneacha fillteán a chríochnú le "{extension}".'] }, { "msgid": "Guest identification", "msgstr": ["Aitheantas aoi"] }, { "msgid": "Home", "msgstr": ["Baile"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["Má roghnaíonn tú an dá leagan, cuirfear uimhir le hainm an chomhaid atá ag teacht isteach."] }, { "msgid": "Invalid folder name.", "msgstr": ["Ainm fillteáin neamhbhailí."] }, { "msgid": "Invalid name.", "msgstr": ["Ainm neamhbhailí."] }, { "msgid": "Last modified date unknown", "msgstr": ["Dáta an athraithe dheireanaigh anaithnid"] }, { "msgid": "Modified", "msgstr": ["Athraithe"] }, { "msgid": "Move", "msgstr": ["Bog"] }, { "msgid": "Move to {target}", "msgstr": ["Bog go{target}"] }, { "msgid": "Name", "msgstr": ["Ainm"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Ní fhéadfaidh ainmneacha a bheith níos mó ná 64 carachtar ar fhad."] }, { "msgid": "Names must not be empty.", "msgstr": ["Ní féidir ainmneacha a bheith folamh."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['Ní féidir ainmneacha a chríochnú le "{extension}".'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Ní mór ainmneacha a bheith ag tosú le ponc."] }, { "msgid": "New", "msgstr": ["Nua"] }, { "msgid": "New folder", "msgstr": ["Fillteán nua"] }, { "msgid": "New folder name", "msgstr": ["Ainm fillteáin nua"] }, { "msgid": "New version", "msgstr": ["Leagan nua"] }, { "msgid": "No files in here", "msgstr": ["Níl aon chomhaid istigh anseo"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Níor aimsíodh aon chomhad a tháinig le do scagaire."] }, { "msgid": "No matching files", "msgstr": ["Gan comhaid meaitseála"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Cuir isteach ainm ina bhfuil 2 charachtar ar a laghad."] }, { "msgid": "Recent", "msgstr": ["le déanaí"] }, { "msgid": "Select all checkboxes", "msgstr": ["Roghnaigh na boscaí seiceála go léir"] }, { "msgid": "Select all entries", "msgstr": ["Roghnaigh gach iontráil"] }, { "msgid": "Select all existing files", "msgstr": ["Roghnaigh na comhaid uile atá ann cheana"] }, { "msgid": "Select all new files", "msgstr": ["Roghnaigh gach comhad nua"] }, { "msgid": "Select entry", "msgstr": ["Roghnaigh iontráil"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Roghnaigh an ró do {nodename}"] }, { "msgid": "Size", "msgstr": ["Méid"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["Léim %n comhad", "Léim %n comhaid", "Léim %n comhaid", "Léim %n comhaid", "Léim %n comhaid"] }, { "msgid": "Skip this file", "msgstr": ["Scipeáil an comhad seo"] }, { "msgid": "Submit name", "msgstr": ["Cuir isteach ainm"] }, { "msgid": "Undo", "msgstr": ["Cealaigh"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Uaslódáil roinnt ábhair nó sioncronaigh le do ghléasanna!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["Nuair a roghnaítear fillteán isteach, déanfar aon chomhaid choimhlinteacha ann a athscríobh freisin."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["Nuair a roghnaítear fillteán isteach, scríobhtar an t-ábhar isteach sa fhillteán atá ann cheana féin agus déantar réiteach coinbhleachta athchúrsach."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["Cé na comhaid ar mhaith leat a choinneáil?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Is é {nickname} an ainm atá ort faoi láthair."] }, { "msgid": "You are currently not identified.", "msgstr": ["Níl aitheantas tugtha duit faoi láthair."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Ní féidir leat an t-ainm a fhágáil folamh."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["Ní mór duit réiteach coinbhleachta amháin ar a laghad a roghnú"] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["Ní mór duit leagan amháin ar a laghad de gach comhad a roghnú le leanúint ar aghaidh."] }] }, { "language": "gl", "translations": [{ "msgid": '"{char}" is not allowed inside a folder name.', "msgstr": ["«{char}» non está permitido no nome dun cartafol."] }, { "msgid": '"{char}" is not allowed inside a name.', "msgstr": ["«{char}» non está permitido dentro dun nome."] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ["«{extension}» non é un nome permitido."] }, { "msgid": '"{segment}" is a reserved name and not allowed for folder names.', "msgstr": ["«{segment}» é un nome reservado e non está permitido para nomes de cartafoles."] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ["«{segment}» é un nome reservado e non está permitido."] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%n ficheiro en conflito", "%n ficheiros en conflito"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["%n ficheiro en conflito en {dirname}", "%n ficheiros en conflito en {dirname}"] }, { "msgid": "All files", "msgstr": ["Todos os ficheiros"] }, { "msgid": "Cancel", "msgstr": ["Cancelar"] }, { "msgid": "Cancel the entire operation", "msgstr": ["Cancelar toda a operación"] }, { "msgid": "Choose", "msgstr": ["Escoller"] }, { "msgid": "Choose {file}", "msgstr": ["Escoller {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Escoller %n ficheiro", "Escoller %n ficheiros"] }, { "msgid": "Confirm", "msgstr": ["Confirmar"] }, { "msgid": "Continue", "msgstr": ["Continuar"] }, { "msgid": "Copy", "msgstr": ["Copiar"] }, { "msgid": "Copy to {target}", "msgstr": ["Copiar en  {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Non foi posíbel crear o novo cartafol"] }, { "msgid": "Could not load files settings", "msgstr": ["Non foi posíbel cargar os axustes dos ficheiros"] }, { "msgid": "Could not load files views", "msgstr": ["Non foi posíbel cargar as vistas dos ficheiros"] }, { "msgid": "Create directory", "msgstr": ["Crear un directorio"] }, { "msgid": "Current view selector", "msgstr": ["Selector de vista actual"] }, { "msgid": "Enter your name", "msgstr": ["Introduza o seu nome"] }, { "msgid": "Existing version", "msgstr": ["Versión existente"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Produciuse un fallo ao definir o alcume."] }, { "msgid": "Favorites", "msgstr": ["Favoritos"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Os ficheiros e cartafoles que marque como favoritos aparecerán aquí."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Os ficheiros e cartafoles que modificou recentemente aparecerán aquí."] }, { "msgid": "Filter file list", "msgstr": ["Filtrar a lista de ficheiros"] }, { "msgid": 'Folder names must not end with "{extension}".', "msgstr": ["Os nomes de cartafol non deben rematar en «{extension}»."] }, { "msgid": "Guest identification", "msgstr": ["Identificación do convidado"] }, { "msgid": "Home", "msgstr": ["Inicio"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["Se selecciona ambas as versións, o ficheiro entrante terá un número engadido ao seu nome."] }, { "msgid": "Invalid folder name.", "msgstr": ["O nome de cartafol non é válido."] }, { "msgid": "Invalid name.", "msgstr": ["Nome incorrecto"] }, { "msgid": "Last modified date unknown", "msgstr": ["Data da última modificación descoñecida"] }, { "msgid": "Modified", "msgstr": ["Modificado"] }, { "msgid": "Move", "msgstr": ["Mover"] }, { "msgid": "Move to {target}", "msgstr": ["Mover cara a {target}"] }, { "msgid": "Name", "msgstr": ["Nome"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Os nomes poden ter unha lonxitude máxima de 64 caracteres."] }, { "msgid": "Names must not be empty.", "msgstr": ["Os nomes non deben estar baleiros."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ["Os nomes non deben rematar en «{extension}»."] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Os nomes non deben comezar cun punto."] }, { "msgid": "New", "msgstr": ["Novo"] }, { "msgid": "New folder", "msgstr": ["Novo cartafol"] }, { "msgid": "New folder name", "msgstr": ["Novo nome do cartafol"] }, { "msgid": "New version", "msgstr": ["Nova versión"] }, { "msgid": "No files in here", "msgstr": ["Aquí non hai ficheiros"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Non se atopou ningún ficheiro que coincida co filtro."] }, { "msgid": "No matching files", "msgstr": ["Non hai ficheiros coincidentes"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Introduza un nome con polo menos 2 caracteres."] }, { "msgid": "Recent", "msgstr": ["Recente"] }, { "msgid": "Select all checkboxes", "msgstr": ["Seleccionar todas as caixas"] }, { "msgid": "Select all entries", "msgstr": ["Seleccionar todas as entradas"] }, { "msgid": "Select all existing files", "msgstr": ["Seleccionar todos os ficheiros existentes"] }, { "msgid": "Select all new files", "msgstr": ["Seleccionar todos os ficheiros novos"] }, { "msgid": "Select entry", "msgstr": ["Seleccionar a entrada"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Seleccionar a fila para {nodename}"] }, { "msgid": "Size", "msgstr": ["Tamaño"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["Omitir %n ficheiro", "Omitir %n ficheiros"] }, { "msgid": "Skip this file", "msgstr": ["Omitir este ficheiro"] }, { "msgid": "Submit name", "msgstr": ["Enviar o nome"] }, { "msgid": "Undo", "msgstr": ["Desfacer"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Enviar algún contido ou sincronizalo cos seus dispositivos!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["Cando se selecciona un cartafol entrante, todos os ficheiros conflitivos dentro dela tamén serán sobrescritos."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["Cando se selecciona un cartafol entrante, o contido escríbese no cartafol existente e realízase unha resolución recursiva de conflitos."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["Que ficheiros quere conservar?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Vde. está identificado actualmente como {nickname}."] }, { "msgid": "You are currently not identified.", "msgstr": ["Vde. non está identificado actualmente."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Vde. non pode deixar o nome baleiro."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["É necesario escoller polo menos unha solución de conflito"] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["É necesario seleccionar polo menos unha versión de cada ficheiro para continuar."] }] }, { "language": "hr", "translations": [{ "msgid": '"{char}" is not allowed inside a folder name.', "msgstr": ["Znak „{char}” nije dopušten u nazivu mape."] }, { "msgid": '"{char}" is not allowed inside a name.', "msgstr": ["Znak „{char}” nije dopušten u nazivu."] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['"{extension}" nije dopušten u nazivu.'] }, { "msgid": '"{segment}" is a reserved name and not allowed for folder names.', "msgstr": ['"{segment}" je rezervirana riječ i nije dopušten u nazivu mape.'] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['"{segment}" je rezervirana riječ i nije dopušten.'] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["Sukobljava se %n datoteka", "Sukobljava se %n datoteke", "Sukobljava se %n datoteke"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["%n sukob datoteka u {dirname}", "%n sukoba datoteka u {dirname}", "%n sukoba datoteka u {dirname}"] }, { "msgid": "All files", "msgstr": ["Sve datoteke"] }, { "msgid": "Cancel", "msgstr": ["Odustani"] }, { "msgid": "Cancel the entire operation", "msgstr": ["Odustani od cijele operacije"] }, { "msgid": "Choose", "msgstr": ["Odaberi"] }, { "msgid": "Choose {file}", "msgstr": ["Odaberi {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Odaberi %n datoteku", "Odaberi %n datoteka", "Odaberi %n datoteke"] }, { "msgid": "Confirm", "msgstr": ["Potvrdi"] }, { "msgid": "Continue", "msgstr": ["Nastavi"] }, { "msgid": "Copy", "msgstr": ["Kopiraj"] }, { "msgid": "Copy to {target}", "msgstr": ["Kopiraj u {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Nije moguće stvoriti novu mapu"] }, { "msgid": "Could not load files settings", "msgstr": ["Nije moguće učitati postavke datoteka"] }, { "msgid": "Could not load files views", "msgstr": ["Nije moguće učitati prikaze datoteka"] }, { "msgid": "Create directory", "msgstr": ["Stvori mapu"] }, { "msgid": "Current view selector", "msgstr": ["Odabir trenutačnog prikaza"] }, { "msgid": "Enter your name", "msgstr": ["Unesite vaše ime"] }, { "msgid": "Existing version", "msgstr": ["Postojeća verzija"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Neuspjelo postavljanje nadimka."] }, { "msgid": "Favorites", "msgstr": ["Favoriti"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Ovdje se prikazuju datoteke i mape koje ste označili kao favoriti."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Ovdje se prikazuju datoteke i mape koje ste nedavno ažurirali."] }, { "msgid": "Filter file list", "msgstr": ["Filtriranje liste datoteka"] }, { "msgid": 'Folder names must not end with "{extension}".', "msgstr": ['Nazivi mapa ne smiju završiti sa "{extension}".'] }, { "msgid": "Guest identification", "msgstr": ["Identifikacija gosta"] }, { "msgid": "Home", "msgstr": ["Naslovna"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["Ako odaberete obje verzije, dolaznoj datoteci bit će dodan broj u nazivu."] }, { "msgid": "Invalid folder name.", "msgstr": ["Neispavan naziv mape."] }, { "msgid": "Invalid name.", "msgstr": ["Neispravan naziv."] }, { "msgid": "Last modified date unknown", "msgstr": ["Nepoznat datum zadnjeg ažuriranja"] }, { "msgid": "Modified", "msgstr": ["Ažurirano"] }, { "msgid": "Move", "msgstr": ["Premjesti"] }, { "msgid": "Move to {target}", "msgstr": ["Premjesti u {target}"] }, { "msgid": "Name", "msgstr": ["Naziv"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Nazivi mogu imati najviše 64 znaka."] }, { "msgid": "Names must not be empty.", "msgstr": ["Nazivi ne smiju biti prazni."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['Nazivi ne smiju završiti sa "{extension}".'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Nazivi ne smiju započinjati točkom."] }, { "msgid": "New", "msgstr": ["Novo"] }, { "msgid": "New folder", "msgstr": ["Nova mapa"] }, { "msgid": "New folder name", "msgstr": ["Novi naziv mape"] }, { "msgid": "New version", "msgstr": ["Nova verzija"] }, { "msgid": "No files in here", "msgstr": ["Ovdje nema datoteka"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Nisu pronađene datoteke koje odgovaraju vašem filtru."] }, { "msgid": "No matching files", "msgstr": ["Nema odgovarajućih datoteka."] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Unesite naziv s najmanje 2 znaka."] }, { "msgid": "Recent", "msgstr": ["Nedavno"] }, { "msgid": "Select all checkboxes", "msgstr": ["Označi sve potvrdne okvire"] }, { "msgid": "Select all entries", "msgstr": ["Označi sve stavke"] }, { "msgid": "Select all existing files", "msgstr": ["Označi sve postojeće datoteke"] }, { "msgid": "Select all new files", "msgstr": ["Označi sve nove datoteke"] }, { "msgid": "Select entry", "msgstr": ["Označi stavku"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Označi red za{nodename}"] }, { "msgid": "Size", "msgstr": ["Veličina"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["Preskoči %n datoteku", "Preskoči %n datoteke", "Preskoči %n datoteke"] }, { "msgid": "Skip this file", "msgstr": ["Preskoči ovu datoteku"] }, { "msgid": "Submit name", "msgstr": ["Pošalji naziv"] }, { "msgid": "Undo", "msgstr": ["Poništi"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Prenesite neki sadržaj ili sinkronizirajte sa svojim uređajima!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["Kada je odabrana dolazna mapa, sve datoteke unutar nje koje su u sukobu također će biti prepisane."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["Kada je odabrana dolazna mapa, sadržaj se upisuje u postojeću mapu i provodi se rekurzivno rješavanje sukoba."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["Koje datoteke želite zadržati?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Trenutno ste identificirani kao {nickname}."] }, { "msgid": "You are currently not identified.", "msgstr": ["Trenutno niste identificirani."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Ne možete ostaviti naziv prazan."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["Morate odabrati barem jedno rješenje sukoba"] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["Morate odabrati barem jednu verziju svake datoteke kako biste nastavili."] }] }, { "language": "hu_HU", "translations": [{ "msgid": '"{char}" is not allowed inside a name.', "msgstr": ['"{char}" nem engedélyezett névben.'] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['"{extension}" nem engedélyezett név.'] }, { "msgid": '"{name}" is an invalid folder name.', "msgstr": ["„{name}” érvénytelen mappanév."] }, { "msgid": '"{name}" is not an allowed folder name', "msgstr": ["„{name}” nem engedélyezett mappanév"] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['"{segment}" foglalt név és nem engedélyezett.'] }, { "msgid": '"/" is not allowed inside a folder name.', "msgstr": ["„/” jel nem szerepelhet mappa nevében."] }, { "msgid": "All files", "msgstr": ["Minden fájl"] }, { "msgid": "Cancel", "msgstr": ["Mégse"] }, { "msgid": "Choose", "msgstr": ["Kiválasztás"] }, { "msgid": "Choose {file}", "msgstr": ["{file} kiválasztása"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["%n fájl kiválasztása", "%n fájl kiválasztása"] }, { "msgid": "Copy", "msgstr": ["Másolás"] }, { "msgid": "Copy to {target}", "msgstr": ["Másolás ide: {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Az új mappa létrehozása nem lehetséges"] }, { "msgid": "Could not load files settings", "msgstr": ["Fájlbeállítások betöltése nem lehetséges"] }, { "msgid": "Could not load files views", "msgstr": ["Fájlnézetek betöltése nem lehetséges"] }, { "msgid": "Create directory", "msgstr": ["Mappa létrehozása"] }, { "msgid": "Current view selector", "msgstr": ["Jelenlegi nézet választó"] }, { "msgid": "Enter your name", "msgstr": ["Add meg a neved"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Becenév beállítás sikertelen."] }, { "msgid": "Favorites", "msgstr": ["Kedvencek"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["A kedvencként megjelölt fájlok és mappák itt jelennek meg."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["A nemrég módosított fájlok és mappák itt jelennek meg."] }, { "msgid": "Filter file list", "msgstr": ["Fájl lista szűrése"] }, { "msgid": "Folder name cannot be empty.", "msgstr": ["A mappa neve nem lehet üres."] }, { "msgid": "Guest identification", "msgstr": ["Vendég azonosítás"] }, { "msgid": "Home", "msgstr": ["Kezdőlap"] }, { "msgid": "Invalid name.", "msgstr": ["Érvénytelen név."] }, { "msgid": "Modified", "msgstr": ["Módosítva"] }, { "msgid": "Move", "msgstr": ["Mozgatás"] }, { "msgid": "Move to {target}", "msgstr": ["Mozgatás ide: {target}"] }, { "msgid": "Name", "msgstr": ["Név"] }, { "msgid": "Names must not be empty.", "msgstr": ["Nevek nem lehetnek üresek."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['Nevek nem végződhetnek "{extension}"-re.'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Nevek nem kezdődhetnek ponttal."] }, { "msgid": "New", "msgstr": ["Új"] }, { "msgid": "New folder", "msgstr": ["Új mappa"] }, { "msgid": "New folder name", "msgstr": ["Új mappa név"] }, { "msgid": "No files in here", "msgstr": ["Itt nincsenek fájlok"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Nincs a szűrési feltételeknek megfelelő fájl."] }, { "msgid": "No matching files", "msgstr": ["Nincs ilyen fájl"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Kérlek adj meg egy legalább 2 karakteres nevet."] }, { "msgid": "Recent", "msgstr": ["Gyakori"] }, { "msgid": "Select all entries", "msgstr": ["Minden bejegyzés kijelölése"] }, { "msgid": "Select entry", "msgstr": ["Bejegyzés kijelölése"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Válassz sort a következőnek: {nodename}"] }, { "msgid": "Size", "msgstr": ["Méret"] }, { "msgid": "Submit name", "msgstr": ["Név beküldése"] }, { "msgid": "Undo", "msgstr": ["Visszavonás"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Tölts fel tartalmat vagy szinkronizálj az eszközeiddel!"] }, { "msgid": "You are currently not identified.", "msgstr": ["Jelenleg nem vagy azonosítva."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["A nevet nem hagyhatod üresen."] }] }, { "language": "hy", "translations": [{ "msgid": '"{name}" is an invalid folder name.', "msgstr": ["{name} սխալ թղթապանակի անվանում է"] }, { "msgid": '"{name}" is not an allowed folder name', "msgstr": ["{name} համարվում է անթույլատրելի թղթապանակի անվանում"] }, { "msgid": '"/" is not allowed inside a folder name.', "msgstr": ["/ չի թույլատրվում օգտագործել անվանման մեջ"] }, { "msgid": "All files", "msgstr": ["Բոլոր ֆայլերը"] }, { "msgid": "Choose", "msgstr": ["Ընտրել"] }, { "msgid": "Choose {file}", "msgstr": ["Ընտրել {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Ընտրել %n ֆայլ", "Ընտրել %n ֆայլեր"] }, { "msgid": "Copy", "msgstr": ["Պատճենել"] }, { "msgid": "Copy to {target}", "msgstr": ["Պատճենել {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Չստացվեց ստեղծել նոր թղթապանակը"] }, { "msgid": "Could not load files settings", "msgstr": ["Չստացվեց բեռնել ֆայլի կարգավորումները"] }, { "msgid": "Could not load files views", "msgstr": ["Չստացվեց բեռնել ֆայլերի դիտումները"] }, { "msgid": "Create directory", "msgstr": ["Ստեղծել դիրեկտորիա"] }, { "msgid": "Current view selector", "msgstr": ["Ընթացիկ դիտման ընտրիչ"] }, { "msgid": "Favorites", "msgstr": ["Նախընտրելիներ"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Այստեղ կցուցադրվեն այն ֆայլերն ու պանակները, որոնք դուք նշել եք որպես նախընտրելիներ:"] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Այստեղ կցուցադրվեն այն ֆայլերն ու պանակները, որոնք վերջերս փոխել եք:"] }, { "msgid": "Filter file list", "msgstr": ["Ֆիլտրել ֆայլերի ցուցակը"] }, { "msgid": "Folder name cannot be empty.", "msgstr": ["Թղթապանակի անունը չի կարող դատարկ լինել:"] }, { "msgid": "Home", "msgstr": ["Սկիզբ"] }, { "msgid": "Modified", "msgstr": ["Փոփոխված"] }, { "msgid": "Move", "msgstr": ["Տեղափոխել"] }, { "msgid": "Move to {target}", "msgstr": ["Տեղափոխել {target}"] }, { "msgid": "Name", "msgstr": ["Անուն"] }, { "msgid": "New", "msgstr": ["Նոր"] }, { "msgid": "New folder", "msgstr": ["Նոր թղթապանակ"] }, { "msgid": "New folder name", "msgstr": ["Նոր թղթապանակի անվանում"] }, { "msgid": "No files in here", "msgstr": ["Այստեղ չկան ֆայլեր"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Ձեր ֆիլտրին համապատասխանող ֆայլերը չեն գտնվել:"] }, { "msgid": "No matching files", "msgstr": ["Չկան համապատասխան ֆայլեր"] }, { "msgid": "Recent", "msgstr": ["Վերջին"] }, { "msgid": "Select all entries", "msgstr": ["Ընտրել բոլոր գրառումները"] }, { "msgid": "Select entry", "msgstr": ["Ընտրել բոլոր գրառումը"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Ընտրեք տողը {nodename}-ի համար "] }, { "msgid": "Size", "msgstr": ["Չափ"] }, { "msgid": "Undo", "msgstr": ["Ետարկել"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Ներբեռնեք որոշ բովանդակություն կամ համաժամացրեք այն ձեր սարքերի հետ:"] }] }, { "language": "id", "translations": [{ "msgid": '"{char}" is not allowed inside a folder name.', "msgstr": ['"{char}" tidak diizinkan di dalam nama folder.'] }, { "msgid": '"{char}" is not allowed inside a name.', "msgstr": ['"{char}" tidak diizinkan di dalam nama.'] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['"{extension}" bukan nama yang diizinkan.'] }, { "msgid": '"{segment}" is a reserved name and not allowed for folder names.', "msgstr": ['"{segment}" adalah nama yang dicadangkan dan tidak diizinkan untuk nama folder.'] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['"{segment}" adalah nama yang dicadangkan dan tidak diizinkan.'] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%n konflik file"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["%n konflik file di {dirname}"] }, { "msgid": "All files", "msgstr": ["Semua berkas"] }, { "msgid": "Cancel", "msgstr": ["Batal"] }, { "msgid": "Cancel the entire operation", "msgstr": ["Batalkan seluruh operasi"] }, { "msgid": "Choose", "msgstr": ["Pilih"] }, { "msgid": "Choose {file}", "msgstr": ["Pilih {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Pilih %n file"] }, { "msgid": "Confirm", "msgstr": ["Konfirmasi"] }, { "msgid": "Continue", "msgstr": ["Lanjutkan"] }, { "msgid": "Copy", "msgstr": ["Salin"] }, { "msgid": "Copy to {target}", "msgstr": ["Salin ke {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Tidak dapat membuat folder baru"] }, { "msgid": "Could not load files settings", "msgstr": ["Tidak dapat memuat pengaturan file"] }, { "msgid": "Could not load files views", "msgstr": ["Tidak dapat memuat tampilan file"] }, { "msgid": "Create directory", "msgstr": ["Buat direktori"] }, { "msgid": "Current view selector", "msgstr": ["Pemilih tampilan saat ini"] }, { "msgid": "Enter your name", "msgstr": ["Masukkan nama Anda"] }, { "msgid": "Existing version", "msgstr": ["Versi yang ada"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Gagal menetapkan nama panggilan."] }, { "msgid": "Favorites", "msgstr": ["Favorit"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Berkas dan folder yang Anda tandai sebagai favorit akan muncul di sini."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Berkas dan folder yang Anda ubah baru-baru ini akan muncul di sini."] }, { "msgid": "Filter file list", "msgstr": ["Saring daftar berkas"] }, { "msgid": 'Folder names must not end with "{extension}".', "msgstr": ['Nama folder tidak boleh diakhiri dengan "{extension}".'] }, { "msgid": "Guest identification", "msgstr": ["Identifikasi tamu"] }, { "msgid": "Home", "msgstr": ["Beranda"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["Jika Anda memilih kedua versi, file yang masuk akan ditambahkan angka pada namanya."] }, { "msgid": "Invalid folder name.", "msgstr": ["Nama folder tidak valid."] }, { "msgid": "Invalid name.", "msgstr": ["Nama tidak valid."] }, { "msgid": "Last modified date unknown", "msgstr": ["Tanggal modifikasi terakhir tidak diketahui"] }, { "msgid": "Modified", "msgstr": ["Diubah"] }, { "msgid": "Move", "msgstr": ["Pindahkan"] }, { "msgid": "Move to {target}", "msgstr": ["Pindahkan ke {target}"] }, { "msgid": "Name", "msgstr": ["Nama"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Panjang nama maksimal 64 karakter."] }, { "msgid": "Names must not be empty.", "msgstr": ["Nama tidak boleh kosong."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['Nama tidak boleh diakhiri dengan "{extension}".'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Nama tidak boleh diawali dengan titik."] }, { "msgid": "New", "msgstr": ["Baru"] }, { "msgid": "New folder", "msgstr": ["Folder baru"] }, { "msgid": "New folder name", "msgstr": ["Nama folder baru"] }, { "msgid": "New version", "msgstr": ["Versi baru"] }, { "msgid": "No files in here", "msgstr": ["Tidak ada berkas di sini"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Tidak ada berkas yang cocok dengan penyaringan Anda."] }, { "msgid": "No matching files", "msgstr": ["Tidak ada berkas yang cocok"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Silakan masukkan nama dengan minimal 2 karakter."] }, { "msgid": "Recent", "msgstr": ["Terkini"] }, { "msgid": "Select all checkboxes", "msgstr": ["Pilih semua kotak centang"] }, { "msgid": "Select all entries", "msgstr": ["Pilih semua entri"] }, { "msgid": "Select all existing files", "msgstr": ["Pilih semua file yang ada"] }, { "msgid": "Select all new files", "msgstr": ["Pilih semua file baru"] }, { "msgid": "Select entry", "msgstr": ["Pilih entri"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Pilih baris untuk {nodename}"] }, { "msgid": "Size", "msgstr": ["Ukuran"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["Lewati %n file"] }, { "msgid": "Skip this file", "msgstr": ["Lewati file ini"] }, { "msgid": "Submit name", "msgstr": ["Kirim nama"] }, { "msgid": "Undo", "msgstr": ["Tidak jadi"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Unggah beberapa konten atau sinkronkan dengan perangkat Anda!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["Saat folder yang masuk dipilih, semua file yang konflik di dalamnya juga akan ditimpa."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["Saat folder yang masuk dipilih, konten ditulis ke dalam folder yang ada dan penyelesaian konflik rekursif dilakukan."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["File mana yang ingin Anda pertahankan?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Saat ini Anda teridentifikasi sebagai {nickname}."] }, { "msgid": "You are currently not identified.", "msgstr": ["Saat ini Anda tidak teridentifikasi."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Anda tidak dapat membiarkan nama kosong."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["Anda perlu memilih setidaknya satu solusi konflik"] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["Anda perlu memilih setidaknya satu versi dari setiap file untuk melanjutkan."] }] }, { "language": "is", "translations": [{ "msgid": '"{name}" is an invalid folder name.', "msgstr": ['"{name}" er ógilt möppuheiti.'] }, { "msgid": '"{name}" is not an allowed folder name', "msgstr": ['"{name}" er ekki leyfilegt möppuheiti'] }, { "msgid": '"/" is not allowed inside a folder name.', "msgstr": ['"/" er er ekki leyfilegt innan í skráarheiti.'] }, { "msgid": "All files", "msgstr": ["Allar skrár"] }, { "msgid": "Choose", "msgstr": ["Veldu"] }, { "msgid": "Choose {file}", "msgstr": ["Veldu {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Veldu %n skrá", "Veldu %n skrár"] }, { "msgid": "Copy", "msgstr": ["Afrita"] }, { "msgid": "Copy to {target}", "msgstr": ["Afrita í {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Get ekki búið til nýju möppuna"] }, { "msgid": "Could not load files settings", "msgstr": ["Tókst ekki að hlaða inn stillingum skráa"] }, { "msgid": "Could not load files views", "msgstr": ["Tókst ekki að hlaða inn sýnum skráa"] }, { "msgid": "Create directory", "msgstr": ["Búa til möppu"] }, { "msgid": "Current view selector", "msgstr": ["Núverandi val sýnar"] }, { "msgid": "Favorites", "msgstr": ["Eftirlæti"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Skrár og möppur sem þú merkir sem eftirlæti birtast hér."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Skrár og möppur sem þú breyttir nýlega birtast hér."] }, { "msgid": "Filter file list", "msgstr": ["Sía skráalista"] }, { "msgid": "Folder name cannot be empty.", "msgstr": ["Möppuheiti má ekki vera tómt."] }, { "msgid": "Home", "msgstr": ["Heim"] }, { "msgid": "Modified", "msgstr": ["Breytt"] }, { "msgid": "Move", "msgstr": ["Færa"] }, { "msgid": "Move to {target}", "msgstr": ["Færa í {target}"] }, { "msgid": "Name", "msgstr": ["Heiti"] }, { "msgid": "New", "msgstr": ["Nýtt"] }, { "msgid": "New folder", "msgstr": ["Ný mappa"] }, { "msgid": "New folder name", "msgstr": ["Heiti nýrrar möppu"] }, { "msgid": "No files in here", "msgstr": ["Engar skrár hér"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Engar skrár fundust sem passa við síuna."] }, { "msgid": "No matching files", "msgstr": ["Engar samsvarandi skrár"] }, { "msgid": "Recent", "msgstr": ["Nýlegt"] }, { "msgid": "Select all entries", "msgstr": ["Velja allar færslur"] }, { "msgid": "Select entry", "msgstr": ["Velja færslu"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Veldu röðina fyrir {nodename}"] }, { "msgid": "Size", "msgstr": ["Stærð"] }, { "msgid": "Undo", "msgstr": ["Afturkalla"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Sendu inn eitthvað efni eða samstilltu við tækin þín!"] }] }, { "language": "it", "translations": [{ "msgid": '"{char}" is not allowed inside a folder name.', "msgstr": [`"{char}" non è consentito all'interno di un nome di cartella.`] }, { "msgid": '"{char}" is not allowed inside a name.', "msgstr": [`"{char}" non è consentito all'interno di un nome.`] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['"{extension}"  non è un nome consentito'] }, { "msgid": '"{segment}" is a reserved name and not allowed for folder names.', "msgstr": ['"{segment}"  è un nome riservato e non consentito per i nomi delle cartelle.'] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['"{segment}"  è un nome riservato e non consentito.'] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%n file in conflitto", "%n file in conflitto", "%n file in conflitto"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["%n file in conflitto in {dirname}", "%n file in conflitto in {dirname}", "%n file in conflitto in {dirname}"] }, { "msgid": "All files", "msgstr": ["Tutti i file"] }, { "msgid": "Cancel", "msgstr": ["Annulla"] }, { "msgid": "Cancel the entire operation", "msgstr": ["Annulla l'intera operazione"] }, { "msgid": "Choose", "msgstr": ["Scegli"] }, { "msgid": "Choose {file}", "msgstr": ["Scegli {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Scegli %n file", "Scegli %n file", "Scegli %n file"] }, { "msgid": "Confirm", "msgstr": ["Conferma"] }, { "msgid": "Continue", "msgstr": ["Continua"] }, { "msgid": "Copy", "msgstr": ["Copia"] }, { "msgid": "Copy to {target}", "msgstr": ["Copia in {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Impossibile creare la nuova cartella"] }, { "msgid": "Could not load files settings", "msgstr": ["Impossibile caricare le impostazioni dei file"] }, { "msgid": "Could not load files views", "msgstr": ["Impossibile caricare le visualizzazioni dei file"] }, { "msgid": "Create directory", "msgstr": ["Crea cartella"] }, { "msgid": "Current view selector", "msgstr": ["Selettore della vista attuale"] }, { "msgid": "Enter your name", "msgstr": ["Inserisci il tuo nome"] }, { "msgid": "Existing version", "msgstr": ["Versione esistente"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Impossibile impostare lo pseudonimo."] }, { "msgid": "Favorites", "msgstr": ["Preferiti"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["I file e le cartelle contrassegnate come preferite saranno mostrate qui."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["I file e le cartelle che hai modificato di recente saranno mostrate qui."] }, { "msgid": "Filter file list", "msgstr": ["Filtra l'elenco dei file"] }, { "msgid": 'Folder names must not end with "{extension}".', "msgstr": ['I nomi delle cartelle devono finire con "{extension}".'] }, { "msgid": "Guest identification", "msgstr": ["Identificazione ospiti"] }, { "msgid": "Home", "msgstr": ["Home"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["Se selezioni entrambe le versioni, al nome del file in arrivo verrà aggiunto un numero."] }, { "msgid": "Invalid folder name.", "msgstr": ["Nome cartella non valido."] }, { "msgid": "Invalid name.", "msgstr": ["Nome non valido."] }, { "msgid": "Last modified date unknown", "msgstr": ["Data di ultima modifica sconosciuta"] }, { "msgid": "Modified", "msgstr": ["Modificato"] }, { "msgid": "Move", "msgstr": ["Sposta"] }, { "msgid": "Move to {target}", "msgstr": ["Sposta in {target}"] }, { "msgid": "Name", "msgstr": ["Nome"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["I nomi dovrebbero avere una lunghezza massima di 64 caratteri."] }, { "msgid": "Names must not be empty.", "msgstr": ["I nomi non devono essere vuoti."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['I nomi devono finire con "{extension}".'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["I nomi non possono iniziare con un punto."] }, { "msgid": "New", "msgstr": ["Nuovo"] }, { "msgid": "New folder", "msgstr": ["Nuova cartella"] }, { "msgid": "New folder name", "msgstr": ["Nome della nuova cartella"] }, { "msgid": "New version", "msgstr": ["Nuova versione"] }, { "msgid": "No files in here", "msgstr": ["Nessun file qui"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Nessun file che corrisponde al tuo filtro è stato trovato."] }, { "msgid": "No matching files", "msgstr": ["Nessun file corrispondente"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Digita un nome con almeno 2 caratteri."] }, { "msgid": "Recent", "msgstr": ["Recente"] }, { "msgid": "Select all checkboxes", "msgstr": ["Seleziona tutte le caselle"] }, { "msgid": "Select all entries", "msgstr": ["Scegli tutte le voci"] }, { "msgid": "Select all existing files", "msgstr": ["Seleziona tutti i file esistenti"] }, { "msgid": "Select all new files", "msgstr": ["Seleziona tutti i nuovi file"] }, { "msgid": "Select entry", "msgstr": ["Seleziona la voce"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Seleziona la riga per {nodename}"] }, { "msgid": "Size", "msgstr": ["Dimensioni"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["Salta %n file", "Salta %n file", "Salta %n file"] }, { "msgid": "Skip this file", "msgstr": ["Salta questo file"] }, { "msgid": "Submit name", "msgstr": ["Invia nome"] }, { "msgid": "Undo", "msgstr": ["Annulla"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Carica qualche contenuto o sincronizza con i tuoi dispositivi!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["Quando si seleziona una cartella in arrivo, anche tutti i file in conflitto al suo interno saranno sovrascritti."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["Quando si seleziona una cartella in arrivo, il contenuto viene scritto nella cartella esistente e viene eseguita una risoluzione ricorsiva dei conflitti."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["Quali file vuoi conservare?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Sei attualmente identificato come {nickname}."] }, { "msgid": "You are currently not identified.", "msgstr": ["Attualmente non sei identificato."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Non puoi lasciare il nome vuoto."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["Devi scegliere almeno una soluzione al conflitto"] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["Per continuare, è necessario selezionare almeno una versione di ciascun file."] }] }, { "language": "ja_JP", "translations": [{ "msgid": '"{char}" is not allowed inside a folder name.', "msgstr": ['フォルダー名に "{char}" を使用することはできません。'] }, { "msgid": '"{char}" is not allowed inside a name.', "msgstr": ['名前に "{char}" を使用することはできません。'] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['"{extension}" は許可された名前ではありません。'] }, { "msgid": '"{segment}" is a reserved name and not allowed for folder names.', "msgstr": ['"{segment}" は予約名のため、使用できません。'] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['"{segment}" は予約名のため、使用できません。'] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%nファイルが競合しています"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["%nディレクトリ{dirname}内のファイル競合"] }, { "msgid": "All files", "msgstr": ["すべてのファイル"] }, { "msgid": "Cancel", "msgstr": ["キャンセル"] }, { "msgid": "Cancel the entire operation", "msgstr": ["すべての操作をキャンセル"] }, { "msgid": "Choose", "msgstr": ["選択"] }, { "msgid": "Choose {file}", "msgstr": ["{file} を選択"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["%n 個のファイルを選択"] }, { "msgid": "Confirm", "msgstr": ["確認"] }, { "msgid": "Continue", "msgstr": ["続行"] }, { "msgid": "Copy", "msgstr": ["コピー"] }, { "msgid": "Copy to {target}", "msgstr": ["{target} にコピー"] }, { "msgid": "Could not create the new folder", "msgstr": ["新しいフォルダーを作成できませんでした"] }, { "msgid": "Could not load files settings", "msgstr": ["ファイル設定を読み込めませんでした"] }, { "msgid": "Could not load files views", "msgstr": ["ファイルビューを読み込めませんでした"] }, { "msgid": "Create directory", "msgstr": ["ディレクトリを作成"] }, { "msgid": "Current view selector", "msgstr": ["現在のビュー選択"] }, { "msgid": "Enter your name", "msgstr": ["名前を入力してください"] }, { "msgid": "Existing version", "msgstr": ["現行バージョン"] }, { "msgid": "Failed to set nickname.", "msgstr": ["ニックネームの設定に失敗しました。"] }, { "msgid": "Favorites", "msgstr": ["お気に入り"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["お気に入りとしてマークしたファイルとフォルダーがここに表示されます。"] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["最近変更したファイルとフォルダーがここに表示されます。"] }, { "msgid": "Filter file list", "msgstr": ["ファイルのリストをフィルター"] }, { "msgid": 'Folder names must not end with "{extension}".', "msgstr": ['フォルダー名の末尾に "{extension}" を使用できません。'] }, { "msgid": "Guest identification", "msgstr": ["ゲスト識別"] }, { "msgid": "Home", "msgstr": ["ホーム"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["両方のバージョンを選択した場合、受信ファイル名には番号が追加されます。"] }, { "msgid": "Invalid folder name.", "msgstr": ["フォルダー名が無効です。"] }, { "msgid": "Invalid name.", "msgstr": ["無効な名前です。"] }, { "msgid": "Last modified date unknown", "msgstr": ["最終更新日不明"] }, { "msgid": "Modified", "msgstr": ["変更済み"] }, { "msgid": "Move", "msgstr": ["移動"] }, { "msgid": "Move to {target}", "msgstr": ["{target} に移動"] }, { "msgid": "Name", "msgstr": ["名前"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["名前は最大64文字です。"] }, { "msgid": "Names must not be empty.", "msgstr": ["名前は空にできません。"] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['名前の末尾に "{extension}" を使用できません。'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["ドットで始まる名前は使用できません。"] }, { "msgid": "New", "msgstr": ["新規作成"] }, { "msgid": "New folder", "msgstr": ["新しいフォルダー"] }, { "msgid": "New folder name", "msgstr": ["新しいフォルダーの名前"] }, { "msgid": "New version", "msgstr": ["新バージョン"] }, { "msgid": "No files in here", "msgstr": ["ファイルがありません"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["フィルターに一致するファイルは見つかりませんでした。"] }, { "msgid": "No matching files", "msgstr": ["一致するファイルはありません"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["名前は2文字以上を入力してください。"] }, { "msgid": "Recent", "msgstr": ["最近"] }, { "msgid": "Select all checkboxes", "msgstr": ["すべてのチェックボックスを選択"] }, { "msgid": "Select all entries", "msgstr": ["すべてのエントリを選択"] }, { "msgid": "Select all existing files", "msgstr": ["既存のファイルをすべて選択"] }, { "msgid": "Select all new files", "msgstr": ["すべての新規ファイルを選択"] }, { "msgid": "Select entry", "msgstr": ["エントリを選択"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["{nodename} の行を選択"] }, { "msgid": "Size", "msgstr": ["サイズ"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["%n 個のファイルをスキップ"] }, { "msgid": "Skip this file", "msgstr": ["このファイルをスキップ"] }, { "msgid": "Submit name", "msgstr": ["名前を送信する"] }, { "msgid": "Undo", "msgstr": ["元に戻す"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["コンテンツをアップロードするか、デバイスと同期してください！"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["受信フォルダーを選択すると、そのフォルダー内の競合ファイルも上書きされます。"] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["受信フォルダーを選択すると、内容は既存のフォルダーに書き込まれ、再帰的な競合解決が実行されます。"] }, { "msgid": "Which files do you want to keep?", "msgstr": ["どのファイルを残しますか？"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["現在、{nickname}として識別されています。"] }, { "msgid": "You are currently not identified.", "msgstr": ["現在あなたは識別されていません。"] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["名前を空にすることはできません。"] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["少なくとも1つの競合ソリューションを選択する必要があります"] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["続行するには、各ファイルのバージョンを少なくとも1つ選択する必要があります。"] }] }, { "language": "ko", "translations": [{ "msgid": '"{char}" is not allowed inside a folder name.', "msgstr": ['폴더 이름 안에는 "{char}"를 사용할 수 없습니다.'] }, { "msgid": '"{char}" is not allowed inside a name.', "msgstr": ['"{char}"는 이름 내에 사용할 수 없습니다.'] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['"{extension}"은 허용되는 이름이 아닙니다.'] }, { "msgid": '"{segment}" is a reserved name and not allowed for folder names.', "msgstr": ['"{segment}"는 예약된 이름이므로 폴더 이름으로 사용할 수 없습니다.'] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['같은 이름을 가진 "{segment}"이 이미 사용 중입니다.'] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%n 파일 충돌"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["{dirname} 안의 %n 파일 충돌"] }, { "msgid": "All files", "msgstr": ["모든 파일"] }, { "msgid": "Cancel", "msgstr": ["취소"] }, { "msgid": "Cancel the entire operation", "msgstr": ["전체 작업 취소"] }, { "msgid": "Choose", "msgstr": ["선택"] }, { "msgid": "Choose {file}", "msgstr": ["{file} 선택"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["%n개의 파일 선택"] }, { "msgid": "Confirm", "msgstr": ["확인"] }, { "msgid": "Continue", "msgstr": ["계속"] }, { "msgid": "Copy", "msgstr": ["복사"] }, { "msgid": "Copy to {target}", "msgstr": ["{target}으로 복사"] }, { "msgid": "Could not create the new folder", "msgstr": ["새 폴더를 만들 수 없음"] }, { "msgid": "Could not load files settings", "msgstr": ["파일 설정을 불러오지 못함"] }, { "msgid": "Could not load files views", "msgstr": ["파일 보기를 불러오지 못함"] }, { "msgid": "Create directory", "msgstr": ["디렉토리 만들기"] }, { "msgid": "Current view selector", "msgstr": ["현재 뷰 선택자"] }, { "msgid": "Enter your name", "msgstr": ["이름을 입력하세요 "] }, { "msgid": "Existing version", "msgstr": ["기존 버전"] }, { "msgid": "Failed to set nickname.", "msgstr": ["닉네임을 설정하지 못했습니다.\n "] }, { "msgid": "Favorites", "msgstr": ["즐겨찾기"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["즐겨찾기로 표시한 파일 및 폴더가 이곳에 표시됩니다."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["최근 수정한 파일 및 폴더가 이곳에 표시됩니다."] }, { "msgid": "Filter file list", "msgstr": ["파일 목록 필터링"] }, { "msgid": 'Folder names must not end with "{extension}".', "msgstr": ['폴더 이름은 "{extension}"로 끝나면 안됩니다.'] }, { "msgid": "Guest identification", "msgstr": ["게스트 확인"] }, { "msgid": "Home", "msgstr": ["홈"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["만약 두 버전 모두 선택한다면 들어오는 파일은 이름에 번호가 추가될 것입니다."] }, { "msgid": "Invalid folder name.", "msgstr": ["폴더 이름이 잘못되었습니다."] }, { "msgid": "Invalid name.", "msgstr": ["잘못된 이름입니다. "] }, { "msgid": "Last modified date unknown", "msgstr": ["최근 수정 날짜 알 수 없음"] }, { "msgid": "Modified", "msgstr": ["수정됨"] }, { "msgid": "Move", "msgstr": ["이동"] }, { "msgid": "Move to {target}", "msgstr": ["{target}으로 이동"] }, { "msgid": "Name", "msgstr": ["이름"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["이름은 아마도 최대 64글자 입니다."] }, { "msgid": "Names must not be empty.", "msgstr": ["이름은 비어 있으면 안 됩니다."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['이름은 "{extension}"로 끝나지 않아야 합니다.'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["이름은 점으로 시작해서는 안 됩니다."] }, { "msgid": "New", "msgstr": ["새로 만들기"] }, { "msgid": "New folder", "msgstr": ["새 폴더"] }, { "msgid": "New folder name", "msgstr": ["새 폴더명"] }, { "msgid": "New version", "msgstr": ["새로운 버전"] }, { "msgid": "No files in here", "msgstr": ["파일이 없습니다"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["선택한 필터에 해당하는 파일이 없습니다."] }, { "msgid": "No matching files", "msgstr": ["일치하는 파일 없음"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["최소 2자 이상의 이름을 입력하십시오. "] }, { "msgid": "Recent", "msgstr": ["최근"] }, { "msgid": "Select all checkboxes", "msgstr": ["모든 체크박스 선택"] }, { "msgid": "Select all entries", "msgstr": ["모두 선택"] }, { "msgid": "Select all existing files", "msgstr": ["모든 기존 파일 선택"] }, { "msgid": "Select all new files", "msgstr": ["모든 새 파일 선택"] }, { "msgid": "Select entry", "msgstr": ["항목 선택"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["{nodename}의 행 선택"] }, { "msgid": "Size", "msgstr": ["크기"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["%n 파일 건너뜀"] }, { "msgid": "Skip this file", "msgstr": ["이 파일 건너뜀"] }, { "msgid": "Submit name", "msgstr": ["이름 제출"] }, { "msgid": "Undo", "msgstr": ["되돌리기"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["기기에서 파일을 업로드 또는 동기화하세요!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["들어오는 폴더를 선택하면 해당 폴더 내의 충돌하는 파일도 덮어쓰여집니다."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["들어오는 폴더를 선택하면 해당 콘텐츠가 기존 폴더에 기록되고 재귀적 충돌 해결이 수행됩니다."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["어떤 파일을 보관하시겠습니까?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["{nickname}로서 인증 상태 입니다."] }, { "msgid": "You are currently not identified.", "msgstr": ["현재 인증되지 않았습니다."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["이름은 비워 둘 수 없습니다. "] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["최소한 하나의 갈등 해결 방안을 선택해야 합니다."] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["계속 진행하려면 각 파일의 버전을 하나 이상 선택해야 합니다."] }] }, { "language": "lb", "translations": [{ "msgid": '"{name}" is an invalid folder name.', "msgstr": ["{name} ass en ongëlteg Dossier"] }, { "msgid": '"{name}" is not an allowed folder name', "msgstr": ["{name} ass net en erlaabten Dossiernumm"] }, { "msgid": '"/" is not allowed inside a folder name.', "msgstr": ['"/" ass net an engem Dossier Numm erlaabt'] }, { "msgid": "All files", "msgstr": ["All Dateien"] }, { "msgid": "Choose", "msgstr": ["Wielt"] }, { "msgid": "Choose {file}", "msgstr": ["Wielt {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Wielt %n Fichieren", "Wielt %n Fichier"] }, { "msgid": "Copy", "msgstr": ["Kopie"] }, { "msgid": "Copy to {target}", "msgstr": ["Kopie op {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Konnt den neien Dossier net erstellen"] }, { "msgid": "Could not load files settings", "msgstr": ["Konnt d'Dateienastellungen net lueden"] }, { "msgid": "Could not load files views", "msgstr": ["Konnt d'Dateien net lueden"] }, { "msgid": "Create directory", "msgstr": ["Erstellt Verzeechnes"] }, { "msgid": "Current view selector", "msgstr": ["Aktuell Vue selector"] }, { "msgid": "Favorites", "msgstr": ["Favoritten"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Dateien an Ordner, déi Dir als Favorit markéiert, ginn hei gewisen"] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Dateien an Ordner déi Dir viru kuerzem geännert hutt ginn hei op"] }, { "msgid": "Filter file list", "msgstr": ["Filter Datei Lëscht"] }, { "msgid": "Folder name cannot be empty.", "msgstr": ["Dossier Numm kann net eidel sinn"] }, { "msgid": "Home", "msgstr": ["Wëllkomm"] }, { "msgid": "Modified", "msgstr": ["Geännert"] }, { "msgid": "Move", "msgstr": ["Plënne"] }, { "msgid": "Move to {target}", "msgstr": ["Plënneren {target}"] }, { "msgid": "Name", "msgstr": ["Numm"] }, { "msgid": "New", "msgstr": ["Nei"] }, { "msgid": "New folder", "msgstr": ["Neien dossier"] }, { "msgid": "New folder name", "msgstr": ["Neien dossier numm"] }, { "msgid": "No files in here", "msgstr": ["Kee fichier hei"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Kee fichier deen äre filter passt gouf fonnt"] }, { "msgid": "No matching files", "msgstr": ["Keng passende dateien"] }, { "msgid": "Recent", "msgstr": ["Rezent"] }, { "msgid": "Select all entries", "msgstr": ["Wielt all entréen"] }, { "msgid": "Select entry", "msgstr": ["Wielt entrée"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Wielt d'zeil fir {nodename}"] }, { "msgid": "Size", "msgstr": ["Gréisst"] }, { "msgid": "Undo", "msgstr": ["Undoen"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Luet en inhalt erop oder synchroniséiert mat ären apparater"] }] }, { "language": "lo", "translations": [{ "msgid": '"{char}" is not allowed inside a name.', "msgstr": ['ບໍ່ອະນຸຍາດໃຫ້ມີ "{char}" ພາຍໃນຊື່.'] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['"{extension}" ບໍ່ແມ່ນຊື່ທີ່ໄດ້ຮັບອະນຸຍາດ.'] }, { "msgid": '"{name}" is an invalid folder name.', "msgstr": ['"{name}" ແມ່ນຊື່ໂຟນເດີທີ່ບໍ່ຖືກຕ້ອງ.'] }, { "msgid": '"{name}" is not an allowed folder name', "msgstr": ['"{name}" ບໍ່ແມ່ນຊື່ໂຟນເດີທີ່ໄດ້ຮັບອະນຸຍາດ'] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['"{segment}" ແມ່ນຊື່ທີ່ສະຫງວນໄວ້ ແລະ ບໍ່ໄດ້ຮັບອະນຸຍາດ.'] }, { "msgid": '"/" is not allowed inside a folder name.', "msgstr": ['ບໍ່ອະນຸຍາດໃຫ້ມີ "/" ພາຍໃນຊື່ໂຟນເດີ.'] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["ໄຟລ໌ຂັດກັນ %n ລາຍການ"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["ໄຟລ໌ຂັດກັນ %n ລາຍການໃນ {dirname}"] }, { "msgid": "All files", "msgstr": ["ໄຟລ໌ທັງໝົດ"] }, { "msgid": "Cancel", "msgstr": ["ຍົກເລີກ"] }, { "msgid": "Cancel the entire operation", "msgstr": ["ຍົກເລີກການດຳເນີນການທັງໝົດ"] }, { "msgid": "Choose", "msgstr": ["ເລືອກ"] }, { "msgid": "Choose {file}", "msgstr": ["ເລືອກ {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["ເລືອກ %n ໄຟລ໌"] }, { "msgid": "Confirm", "msgstr": ["ຢືນຢັນ"] }, { "msgid": "Continue", "msgstr": ["ດຳເນີນການຕໍ່"] }, { "msgid": "Copy", "msgstr": ["ຄັດລອກ"] }, { "msgid": "Copy to {target}", "msgstr": ["ຄັດລອກໄປທີ່ {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["ບໍ່ສາມາດສ້າງໂຟນເດີໃໝ່ໄດ້"] }, { "msgid": "Could not load files settings", "msgstr": ["ບໍ່ສາມາດໂຫຼດການຕັ້ງຄ່າໄຟລ໌ໄດ້"] }, { "msgid": "Could not load files views", "msgstr": ["ບໍ່ສາມາດໂຫຼດມຸມມອງໄຟລ໌ໄດ້"] }, { "msgid": "Create directory", "msgstr": ["ສ້າງໄດເຣັກທໍຣີ"] }, { "msgid": "Current view selector", "msgstr": ["ຕົວເລືອກມຸມມອງປັດຈຸບັນ"] }, { "msgid": "Enter your name", "msgstr": ["ປ້ອນຊື່ຂອງທ່ານ"] }, { "msgid": "Existing version", "msgstr": ["ເວີຊັນທີ່ມີຢູ່"] }, { "msgid": "Failed to set nickname.", "msgstr": ["ຕັ້ງຊື່ຫຼິ້ນບໍ່ສຳເລັດ."] }, { "msgid": "Favorites", "msgstr": ["ລາຍການທີ່ມັກ"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["ໄຟລ໌ ແລະ ໂຟນເດີທີ່ທ່ານໝາຍວ່າເປັນລາຍການທີ່ມັກຈະສະແດງຢູ່ບ່ອນນີ້."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["ໄຟລ໌ ແລະ ໂຟນເດີທີ່ທ່ານແກ້ໄຂລ່າສຸດຈະສະແດງຢູ່ບ່ອນນີ້."] }, { "msgid": "Filter file list", "msgstr": ["ກັ່ນຕອງລາຍການໄຟລ໌"] }, { "msgid": "Folder name cannot be empty.", "msgstr": ["ຊື່ໂຟນເດີຕ້ອງບໍ່ຫວ່າງເປົ່າ."] }, { "msgid": "Guest identification", "msgstr": ["ການລະບຸຕົວຕົນຂອງແຂກ"] }, { "msgid": "Home", "msgstr": ["ໜ້າຫຼັກ"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["ຖ້າທ່ານເລືອກທັງສອງເວີຊັນ, ໄຟລ໌ທີ່ເຂົ້າມາຈະມີຕົວເລກເພີ່ມໃສ່ຊື່ຂອງມັນ."] }, { "msgid": "Invalid name.", "msgstr": ["ຊື່ບໍ່ຖືກຕ້ອງ."] }, { "msgid": "Last modified date unknown", "msgstr": ["ບໍ່ຮູ້ວັນທີແກ້ໄຂລ່າສຸດ"] }, { "msgid": "Modified", "msgstr": ["ແກ້ໄຂເມື່ອ"] }, { "msgid": "Move", "msgstr": ["ຍ້າຍ"] }, { "msgid": "Move to {target}", "msgstr": ["ຍ້າຍໄປທີ່ {target}"] }, { "msgid": "Name", "msgstr": ["ຊື່"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["ຊື່ອາດມີຄວາມຍາວສູງສຸດ 64 ຕົວອັກສອນ."] }, { "msgid": "Names must not be empty.", "msgstr": ["ຊື່ຕ້ອງບໍ່ຫວ່າງເປົ່າ."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['ຊື່ຕ້ອງບໍ່ລົງທ້າຍດ້ວຍ "{extension}".'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["ຊື່ຕ້ອງບໍ່ຂຶ້ນຕົ້ນດ້ວຍຈຸດ."] }, { "msgid": "New", "msgstr": ["ໃໝ່"] }, { "msgid": "New folder", "msgstr": ["ໂຟນເດີໃໝ່"] }, { "msgid": "New folder name", "msgstr": ["ຊື່ໂຟນເດີໃໝ່"] }, { "msgid": "New version", "msgstr": ["ເວີຊັນໃໝ່"] }, { "msgid": "No files in here", "msgstr": ["ບໍ່ມີໄຟລ໌ຢູ່ບ່ອນນີ້"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["ບໍ່ພົບໄຟລ໌ທີ່ກົງກັບການກັ່ນຕອງຂອງທ່ານ."] }, { "msgid": "No matching files", "msgstr": ["ບໍ່ມີໄຟລ໌ທີ່ກົງກັນ"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["ກະລຸນາປ້ອນຊື່ທີ່ມີຢ່າງໜ້ອຍ 2 ຕົວອັກສອນ."] }, { "msgid": "Recent", "msgstr": ["ລ່າສຸດ"] }, { "msgid": "Select all checkboxes", "msgstr": ["ເລືອກກ່ອງໝາຍທັງໝົດ"] }, { "msgid": "Select all entries", "msgstr": ["ເລືອກທຸກລາຍການ"] }, { "msgid": "Select all existing files", "msgstr": ["ເລືອກໄຟລ໌ທີ່ມີຢູ່ທັງໝົດ"] }, { "msgid": "Select all new files", "msgstr": ["ເລືອກໄຟລ໌ໃໝ່ທັງໝົດ"] }, { "msgid": "Select entry", "msgstr": ["ເລືອກລາຍການ"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["ເລືອກແຖວສຳລັບ {nodename}"] }, { "msgid": "Size", "msgstr": ["ຂະໜາດ"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["ຂ້າມ %n ໄຟລ໌"] }, { "msgid": "Skip this file", "msgstr": ["ຂ້າມໄຟລ໌ນີ້"] }, { "msgid": "Submit name", "msgstr": ["ສົ່ງຊື່"] }, { "msgid": "Undo", "msgstr": ["ເອົາຄືນ"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["ອັບໂຫຼດເນື້ອຫາ ຫຼື ຊິງຄ໌ກັບອຸປະກອນຂອງທ່ານ!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["ເມື່ອເລືອກໂຟນເດີທີ່ເຂົ້າມາ, ໄຟລ໌ໃດໆທີ່ຂັດກັນພາຍໃນໂຟນເດີນັ້ນກໍຈະຖືກຂຽນທັບເຊັ່ນກັນ."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["ເມື່ອເລືອກໂຟນເດີທີ່ເຂົ້າມາ, ເນື້ອຫາຈະຖືກຂຽນລົງໃນໂຟນເດີທີ່ມີຢູ່ ແລະ ຈະມີການແກ້ໄຂຂໍ້ຂັດແຍ່ງແບບຕໍ່ເນື່ອງ."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["ທ່ານຕ້ອງການເກັບໄຟລ໌ໃດໄວ້?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["ຕອນນີ້ທ່ານຖືກລະບຸວ່າເປັນ {nickname}."] }, { "msgid": "You are currently not identified.", "msgstr": ["ຕອນນີ້ທ່ານຍັງບໍ່ໄດ້ຖືກລະບຸຕົວຕົນ."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["ທ່ານບໍ່ສາມາດປະຊື່ໃຫ້ຫວ່າງເປົ່າໄດ້."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["ທ່ານຈຳເປັນຕ້ອງເລືອກວິທີແກ້ໄຂຂໍ້ຂັດແຍ່ງຢ່າງໜ້ອຍໜຶ່ງຢ່າງ"] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["ທ່ານຈຳເປັນຕ້ອງເລືອກຢ່າງໜ້ອຍໜຶ່ງເວີຊັນຂອງແຕ່ລະໄຟລ໌ເພື່ອດຳເນີນການຕໍ່."] }] }, { "language": "lt_LT", "translations": [{ "msgid": '"{name}" is an invalid folder name.', "msgstr": ["„{name}“ yra netinkamas aplanko pavadinimas."] }, { "msgid": '"{name}" is not an allowed folder name', "msgstr": ["„{name}“ yra neleidžiamas aplanko pavadinimas"] }, { "msgid": '"/" is not allowed inside a folder name.', "msgstr": ["„/“ yra neleidžiamas aplanko pavadinime."] }, { "msgid": "All files", "msgstr": ["Visi failai"] }, { "msgid": "Cancel", "msgstr": ["Atšaukti"] }, { "msgid": "Choose", "msgstr": ["Pasirinkti"] }, { "msgid": "Choose {file}", "msgstr": ["Pasirinkti {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Pasirinkti %n failą", "Pasirinkti %n failus", "Pasirinkti %n failų", "Pasirinkti %n failą"] }, { "msgid": "Copy", "msgstr": ["Kopijuoti"] }, { "msgid": "Copy to {target}", "msgstr": ["Kopijuoti į {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Nepavyko sukurti naujo aplanko"] }, { "msgid": "Could not load files settings", "msgstr": ["Nepavyko įkelti failų nustatymų"] }, { "msgid": "Could not load files views", "msgstr": ["Nepavyko įkelti failų peržiūrų"] }, { "msgid": "Create directory", "msgstr": ["Sukurti katalogą"] }, { "msgid": "Current view selector", "msgstr": ["Dabartinis peržiūros pasirinkimas"] }, { "msgid": "Enter your name", "msgstr": ["Įrašykite savo vardą"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Nepavyko nustatyti slapyvardžio"] }, { "msgid": "Favorites", "msgstr": ["Populiariausi"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Failai ir aplankai, kuriuos pažymėsite kaip mėgstamiausius, bus rodomi čia."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Čia bus rodomi failai ir aplankai, kuriuos neseniai pakeitėte."] }, { "msgid": "Filter file list", "msgstr": ["Filtruoti failų sąrašą"] }, { "msgid": "Folder name cannot be empty.", "msgstr": ["Aplanko pavadinimas negali būti tuščias."] }, { "msgid": "Guest identification", "msgstr": ["Svečio identifikacija"] }, { "msgid": "Home", "msgstr": ["Pradžia"] }, { "msgid": "Modified", "msgstr": ["Pakeista"] }, { "msgid": "Move", "msgstr": ["Perkelti"] }, { "msgid": "Move to {target}", "msgstr": ["Perkelti į {target}"] }, { "msgid": "Name", "msgstr": ["Vardas"] }, { "msgid": "New", "msgstr": ["Naujas"] }, { "msgid": "New folder", "msgstr": ["Naujas aplankas"] }, { "msgid": "New folder name", "msgstr": ["Naujas aplanko pavadinimas"] }, { "msgid": "No files in here", "msgstr": ["Čia failų nėra"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Nepavyko rasti failų pagal filtro nustatymus"] }, { "msgid": "No matching files", "msgstr": ["Nėra atitinkančių failų"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Įrašykite vardą iš mažiausiai dviejų ženklų."] }, { "msgid": "Recent", "msgstr": ["Nauji"] }, { "msgid": "Select all entries", "msgstr": ["Žymėti visus įrašus"] }, { "msgid": "Select entry", "msgstr": ["Žymėti įrašą"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Pasirinkite eilutę {nodename}"] }, { "msgid": "Size", "msgstr": ["Dydis"] }, { "msgid": "Submit name", "msgstr": ["Patvirtinti vardą"] }, { "msgid": "Undo", "msgstr": ["Atšaukti"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Įkelkite turinio arba sinchronizuokite su savo įrenginiais!"] }, { "msgid": "You are currently not identified.", "msgstr": ["Šiuo metu nesate identifikuotas."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Negalite palikti tuščio vardo lauko."] }] }, { "language": "lv", "translations": [{ "msgid": '"{name}" is an invalid folder name.', "msgstr": ['"{name}" nav derīgs mapes nosaukums.'] }, { "msgid": '"{name}" is not an allowed folder name', "msgstr": ['"{name}" nav atļauts mapes nosaukums'] }, { "msgid": '"/" is not allowed inside a folder name.', "msgstr": ['"/" nav atļauts mapes nosaukuma izmantošanā.'] }, { "msgid": "All files", "msgstr": ["Visas datnes"] }, { "msgid": "Choose", "msgstr": ["Izvēlieties"] }, { "msgid": "Choose {file}", "msgstr": ["Izvēlieties {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Izvēlēties %n datņu", "Izvēlēties %n datni", "Izvēlēties %n datnes"] }, { "msgid": "Copy", "msgstr": ["Kopēt"] }, { "msgid": "Copy to {target}", "msgstr": ["Kopēt uz {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Nevarēja izveidot jaunu mapi"] }, { "msgid": "Could not load files settings", "msgstr": ["Nevarēja ielādēt datņu iestatījumus"] }, { "msgid": "Could not load files views", "msgstr": ["Nevarēja ielādēt datņu apskatījumus"] }, { "msgid": "Create directory", "msgstr": ["Izveidot direktoriju"] }, { "msgid": "Current view selector", "msgstr": ["Pašreizēja skata atlasītājs"] }, { "msgid": "Favorites", "msgstr": ["Favorīti"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Šeit parādīsies datnes un mapes, kas tiks atzīmētas kā iecienītas."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Šeit parādīsies datnes un mapes, kuras nesen tika izmainītas."] }, { "msgid": "Filter file list", "msgstr": ["Atlasīt datņu sarakstu"] }, { "msgid": "Folder name cannot be empty.", "msgstr": ["Mapes nosaukums nevar būt tukšs."] }, { "msgid": "Home", "msgstr": ["Sākums"] }, { "msgid": "Modified", "msgstr": ["Izmaninīta"] }, { "msgid": "Move", "msgstr": ["Pārvietot"] }, { "msgid": "Move to {target}", "msgstr": ["Pārvietot uz {target}"] }, { "msgid": "Name", "msgstr": ["Nosaukums"] }, { "msgid": "New", "msgstr": ["Jauns"] }, { "msgid": "New folder", "msgstr": ["Jauna mape"] }, { "msgid": "New folder name", "msgstr": ["Jaunas mapes nosaukums"] }, { "msgid": "No files in here", "msgstr": ["Šeit nav datņu"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Netika atrasta neviena datne, kas atbilst atlasei."] }, { "msgid": "No matching files", "msgstr": ["Nav atbilstošu datņu"] }, { "msgid": "Recent", "msgstr": ["Nesenās"] }, { "msgid": "Select all entries", "msgstr": ["Atlasīt visus ierakstus"] }, { "msgid": "Select entry", "msgstr": ["Atlasīt ierakstu"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Atlasīt rindu {nodename}"] }, { "msgid": "Size", "msgstr": ["Izmērs"] }, { "msgid": "Undo", "msgstr": ["Atsaukt"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Augšupielādē kādu saturu vai sinhronizē savās iekārtās!"] }] }, { "language": "mk", "translations": [{ "msgid": '"{char}" is not allowed inside a name.', "msgstr": ['"{char}" не е дозволено во име.'] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['"{extension}" не е дозволено име.'] }, { "msgid": '"{name}" is an invalid folder name.', "msgstr": ['"{name}" не е валидно име за папка/'] }, { "msgid": '"{name}" is not an allowed folder name', "msgstr": ['"{name}" не е дозволено име за папка'] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['"{segment}" е резервирано име и не е дозволено.'] }, { "msgid": '"/" is not allowed inside a folder name.', "msgstr": ['"/" не е дозволена во име на папка.'] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%n конфликт со датотекa", "%n конфликти со датотеки"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["%n конфликт со датотека во {dirname}", "%n конфликти со датотеки vo {dirname}"] }, { "msgid": "All files", "msgstr": ["Сите датотеки"] }, { "msgid": "Cancel", "msgstr": ["Откажи"] }, { "msgid": "Cancel the entire operation", "msgstr": ["Прекини ја целата операција"] }, { "msgid": "Choose", "msgstr": ["Избери"] }, { "msgid": "Choose {file}", "msgstr": ["Избери {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Избери %n датотека", "Избери %n датотеки"] }, { "msgid": "Confirm", "msgstr": ["Потврди"] }, { "msgid": "Continue", "msgstr": ["Продолжи"] }, { "msgid": "Copy", "msgstr": ["Копирај"] }, { "msgid": "Copy to {target}", "msgstr": ["Копирај во {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Неможе да се креира нова папка"] }, { "msgid": "Could not load files settings", "msgstr": ["Неможе да се вчиаат параметрите за датотеките"] }, { "msgid": "Could not load files views", "msgstr": ["Неможе да се вчитаат погледите за датотеките"] }, { "msgid": "Create directory", "msgstr": ["Креирај папка"] }, { "msgid": "Current view selector", "msgstr": ["Избирач на тековен приказ"] }, { "msgid": "Enter your name", "msgstr": ["Внесете го вашето име"] }, { "msgid": "Existing version", "msgstr": ["Моментална верзија"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Неуспешно поставување прекар."] }, { "msgid": "Favorites", "msgstr": ["Фаворити"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Датотеките и папките кој ќе ги означите за омилени ќе се појават овде."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Датотеките и папките кој неодамна сте ги измениле ќе се појават овде."] }, { "msgid": "Filter file list", "msgstr": ["Филтрирај листа на датотеки"] }, { "msgid": "Folder name cannot be empty.", "msgstr": ["Името на папката неможе да биде празно."] }, { "msgid": "Guest identification", "msgstr": ["Гостинска идентификација"] }, { "msgid": "Home", "msgstr": ["Почетна"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["Ако ги избереш двете верзии, влезната датотека ќе добие број додаден на нејзиното име."] }, { "msgid": "Invalid name.", "msgstr": ["Невалидно име."] }, { "msgid": "Last modified date unknown", "msgstr": ["Датумот на последна измена е непознат"] }, { "msgid": "Modified", "msgstr": ["Променето"] }, { "msgid": "Move", "msgstr": ["Премести"] }, { "msgid": "Move to {target}", "msgstr": ["Премести во {target}"] }, { "msgid": "Name", "msgstr": ["Име"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Имињата можат да бидат најмногу со 64 карактери."] }, { "msgid": "Names must not be empty.", "msgstr": ["Имињата неможе да бидат празни."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['Имињата неможе да завршуваат со "{extension}".'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Имињата неможе да започнуваат со точка."] }, { "msgid": "New", "msgstr": ["Нова"] }, { "msgid": "New folder", "msgstr": ["Нова папка"] }, { "msgid": "New folder name", "msgstr": ["Ново име на папка"] }, { "msgid": "New version", "msgstr": ["Нова верзија"] }, { "msgid": "No files in here", "msgstr": ["Овде нема датотеки"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Не се пронајдени датотеки што одговараат на вашиот филтер."] }, { "msgid": "No matching files", "msgstr": ["Нема датотеки што се совпаѓаат"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Внесете име со најмалку 2 карактери."] }, { "msgid": "Recent", "msgstr": ["Неодамнешни"] }, { "msgid": "Select all checkboxes", "msgstr": ["Избери ги сите полиња за избор"] }, { "msgid": "Select all entries", "msgstr": ["Изберете ги сите записи"] }, { "msgid": "Select all existing files", "msgstr": ["Изберете ги сите постоечки датотеки"] }, { "msgid": "Select all new files", "msgstr": ["Изберете ги сите нови датотеки"] }, { "msgid": "Select entry", "msgstr": ["Избери запис"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Избери ред за {nodename}"] }, { "msgid": "Size", "msgstr": ["Големина"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["Прескокни %n датотека", "Прескокни %n датотеки"] }, { "msgid": "Skip this file", "msgstr": ["Прескокни ја оваа датотека"] }, { "msgid": "Submit name", "msgstr": ["Испрати име"] }, { "msgid": "Undo", "msgstr": ["Врати"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Прикачи содржина или синхронизирај со ваши уреди!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["Кога е избрана влезна папка, сите конфликтни датотеки во неа исто така ќе бидат препишани."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["Кога е избрана влезна папка, содржината се запишува во постоечката папка и се извршува рекурсивно решавање на конфликти."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["Кој датотеки сакаш да ги зачуваш?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Моментално сте идентификувани како {nickname}."] }, { "msgid": "You are currently not identified.", "msgstr": ["Моментално не сте идентификувани."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Не можете да го оставите името празно."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["Треба да избереш најмалку едно решение за конфликт"] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["Треба да избереш најмалку една верзија за секоја датотека за да продолжи."] }] }, { "language": "ms_MY", "translations": [{ "msgid": '"{name}" is an invalid folder name.', "msgstr": ['"{name}" adalah nama folder yang tidak sesuai '] }, { "msgid": '"{name}" is not an allowed folder name', "msgstr": ['"{name}" nama folder yang tidak dibenarkan'] }, { "msgid": '"/" is not allowed inside a folder name.', "msgstr": ['"/" tidak dibenarkan dalam nama folder'] }, { "msgid": "All files", "msgstr": ["Semua fail"] }, { "msgid": "Choose", "msgstr": ["Pilih"] }, { "msgid": "Choose {file}", "msgstr": ["Pilih {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Pilih fail %n"] }, { "msgid": "Copy", "msgstr": ["menyalin"] }, { "msgid": "Copy to {target}", "msgstr": ["menyalin ke {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Tidak dapat mewujudkan folder baharu"] }, { "msgid": "Could not load files settings", "msgstr": ["Tidak dapat memuatkan tetapan fail"] }, { "msgid": "Could not load files views", "msgstr": ["Tidak dapat memuatkan paparan fail"] }, { "msgid": "Create directory", "msgstr": ["mewujudkan direktori"] }, { "msgid": "Current view selector", "msgstr": ["pemilih pandangan semasa"] }, { "msgid": "Favorites", "msgstr": ["Pilihan"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Fail dan folder yang anda tanda sebagai pilihan akan dipaparkan di sini."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Fail dan folder yang anda telah ubah suai baru-baru ini dipaparkan di sini."] }, { "msgid": "Filter file list", "msgstr": ["Menapis senarai fail"] }, { "msgid": "Folder name cannot be empty.", "msgstr": ["Nama folder tidak boleh kosong."] }, { "msgid": "Home", "msgstr": ["Utama"] }, { "msgid": "Modified", "msgstr": ["Ubah suai"] }, { "msgid": "Move", "msgstr": ["pindah"] }, { "msgid": "Move to {target}", "msgstr": ["pindah ke {target}"] }, { "msgid": "Name", "msgstr": ["Nama"] }, { "msgid": "New", "msgstr": ["Baru"] }, { "msgid": "New folder", "msgstr": ["Folder Baharu"] }, { "msgid": "New folder name", "msgstr": ["Nama folder baharu"] }, { "msgid": "No files in here", "msgstr": ["Tiada fail di sini"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Tiada fail yang sepadan dengan tapisan anda."] }, { "msgid": "No matching files", "msgstr": ["Tiada fail yang sepadan"] }, { "msgid": "Recent", "msgstr": ["baru-baru ini"] }, { "msgid": "Select all entries", "msgstr": ["Pilih semua entri"] }, { "msgid": "Select entry", "msgstr": ["Pilih entri"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["memilih baris {nodename}"] }, { "msgid": "Size", "msgstr": ["Saiz"] }, { "msgid": "Undo", "msgstr": ["buat asal"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Muat naik beberapa kandungan atau selaras dengan peranti anda!"] }] }, { "language": "nb_NO", "translations": [{ "msgid": '"{char}" is not allowed inside a name.', "msgstr": ['"{char}" er ikke tillatt i et navn.'] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['"{extension}" er ikke et tillatt navn.'] }, { "msgid": '"{name}" is an invalid folder name.', "msgstr": ["«{name}» er ikke et gyldig mappenavn."] }, { "msgid": '"{name}" is not an allowed folder name', "msgstr": ["«{name}» er ikke et tillatt mappenavn."] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['"{segment}" er et reservert navn og er ikke tillatt.'] }, { "msgid": '"/" is not allowed inside a folder name.', "msgstr": ['"/" er ikke tillatt inne i et mappenavn.'] }, { "msgid": "All files", "msgstr": ["Alle filer"] }, { "msgid": "Cancel", "msgstr": ["Avbryt"] }, { "msgid": "Choose", "msgstr": ["Velg"] }, { "msgid": "Choose {file}", "msgstr": ["Velg {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Velg %n fil", "Velg %n filer"] }, { "msgid": "Copy", "msgstr": ["Kopier"] }, { "msgid": "Copy to {target}", "msgstr": ["Kopier til {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Kunne ikke opprette den nye mappen"] }, { "msgid": "Could not load files settings", "msgstr": ["Kunne ikke laste filinnstillinger"] }, { "msgid": "Could not load files views", "msgstr": ["Kunne ikke laste filvisninger"] }, { "msgid": "Create directory", "msgstr": ["Opprett mappe"] }, { "msgid": "Current view selector", "msgstr": ["Nåværende visningsvelger"] }, { "msgid": "Enter your name", "msgstr": ["Skriv inn navnet ditt"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Kunne ikke lagre kallenavnet."] }, { "msgid": "Favorites", "msgstr": ["Favoritter"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Filer og mapper du markerer som favoritter vil vises her."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Filer og mapper du nylig har endret, vil vises her."] }, { "msgid": "Filter file list", "msgstr": ["Filtrer filliste"] }, { "msgid": "Folder name cannot be empty.", "msgstr": ["Mappenavn kan ikke være tomt."] }, { "msgid": "Guest identification", "msgstr": ["Gjesteidentifikasjon"] }, { "msgid": "Home", "msgstr": ["Hjem"] }, { "msgid": "Invalid name.", "msgstr": ["Ugyldig navn."] }, { "msgid": "Modified", "msgstr": ["Modifisert"] }, { "msgid": "Move", "msgstr": ["Flytt"] }, { "msgid": "Move to {target}", "msgstr": ["Flytt til {target}"] }, { "msgid": "Name", "msgstr": ["Navn"] }, { "msgid": "Names must not be empty.", "msgstr": ["Navn kan ikke være tomme."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['Navn kan ikke ende med "{extension}".'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Navn kan ikke starte med et punktum."] }, { "msgid": "New", "msgstr": ["Ny"] }, { "msgid": "New folder", "msgstr": ["Ny mappe"] }, { "msgid": "New folder name", "msgstr": ["Nytt mappenavn"] }, { "msgid": "No files in here", "msgstr": ["Ingen filer her"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Ingen filer funnet med ditt filter."] }, { "msgid": "No matching files", "msgstr": ["Ingen filer samsvarer"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Vennligst angi et navn som har minst 2 tegn."] }, { "msgid": "Recent", "msgstr": ["Nylige"] }, { "msgid": "Select all entries", "msgstr": ["Velg alle oppføringer"] }, { "msgid": "Select entry", "msgstr": ["Velg oppføring"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Velg raden for {nodename}"] }, { "msgid": "Size", "msgstr": ["Størrelse"] }, { "msgid": "Submit name", "msgstr": ["Bekreft navn"] }, { "msgid": "Undo", "msgstr": ["Angre"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Last opp innhold eller synkroniser med enhetene dine!"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Du er akkurat nå identifisert som {nickname}."] }, { "msgid": "You are currently not identified.", "msgstr": ["Du er akkurat nå ikke identifisert."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Du kan ikke la navnet være blankt."] }] }, { "language": "nl", "translations": [{ "msgid": '"{char}" is not allowed inside a folder name.', "msgstr": ["{char}is niet toegestaan in een mapnaam."] }, { "msgid": '"{char}" is not allowed inside a name.', "msgstr": ['"{char}" kan niet gebruikt worden in de benaming.'] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['"{extension}" is geen toegestane naam.'] }, { "msgid": '"{segment}" is a reserved name and not allowed for folder names.', "msgstr": ['"{segment}" is een gereserveerde naam en niet toegestaan in mapnamen.'] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['"{segment}" is een gereserveerde naam en niet toegestaan.'] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%n bestanden conflicteren", "%nbestand bestanden conflicteren"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["%n bestand conflicteerd in {dirname}", "%nbestanden conflicteert in {dirname}"] }, { "msgid": "All files", "msgstr": ["Alle bestanden"] }, { "msgid": "Cancel", "msgstr": ["Annuleren"] }, { "msgid": "Cancel the entire operation", "msgstr": ["Annuleer de hele bewerking"] }, { "msgid": "Choose", "msgstr": ["Kiezen"] }, { "msgid": "Choose {file}", "msgstr": ["Kies {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Kies %n bestand", "Kies %n bestanden"] }, { "msgid": "Confirm", "msgstr": ["Bevestigen"] }, { "msgid": "Continue", "msgstr": ["Doorgaan"] }, { "msgid": "Copy", "msgstr": ["Kopiëren"] }, { "msgid": "Copy to {target}", "msgstr": ["Kopiëren naar {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Kon de nieuwe map niet maken"] }, { "msgid": "Could not load files settings", "msgstr": ["Kon de bestandsinstellingen niet laden"] }, { "msgid": "Could not load files views", "msgstr": ["Kon de bestandsweergaves niet laden"] }, { "msgid": "Create directory", "msgstr": ["Map aanmaken"] }, { "msgid": "Current view selector", "msgstr": ["Huidige weergave keuze"] }, { "msgid": "Enter your name", "msgstr": ["Voer je naam in"] }, { "msgid": "Existing version", "msgstr": ["Bestaande versie"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Kon geen bijnaam instellen."] }, { "msgid": "Favorites", "msgstr": ["Favorieten"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Bestanden en mappen die je als favoriet markeert, verschijnen hier."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Bestanden en mappen die je recentelijk hebt gewijzigd, verschijnen hier."] }, { "msgid": "Filter file list", "msgstr": ["Bestandslijst filteren"] }, { "msgid": 'Folder names must not end with "{extension}".', "msgstr": ['Mapnamen mogen niet eindigen op "{extension}".'] }, { "msgid": "Guest identification", "msgstr": ["Gastenidentificatie"] }, { "msgid": "Home", "msgstr": ["Thuis"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["Als u beide versies selecteert wordt een nummer toegevoegd aan de naam van het binnenkomende bestand."] }, { "msgid": "Invalid folder name.", "msgstr": ["Ongeldige mapnaam."] }, { "msgid": "Invalid name.", "msgstr": ["Ongeldige naam."] }, { "msgid": "Last modified date unknown", "msgstr": ["Laatste wijzigingsdatum onbekend"] }, { "msgid": "Modified", "msgstr": ["Gewijzigd"] }, { "msgid": "Move", "msgstr": ["Verplaatsen"] }, { "msgid": "Move to {target}", "msgstr": ["Verplaatsen naar {target}"] }, { "msgid": "Name", "msgstr": ["Naam"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Namen mogen maximaal 64 tekens lang zijn."] }, { "msgid": "Names must not be empty.", "msgstr": ["Namen mogen niet leeg zijn."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['Namen mogen niet eindigen met "{extension}".'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Namen mogen niet begonnen met een punt."] }, { "msgid": "New", "msgstr": ["Nieuw"] }, { "msgid": "New folder", "msgstr": ["Nieuwe map"] }, { "msgid": "New folder name", "msgstr": ["Nieuwe mapnaam"] }, { "msgid": "New version", "msgstr": ["Nieuwe versie"] }, { "msgid": "No files in here", "msgstr": ["Geen bestanden hier"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Geen bestanden gevonden die voldoen aan je filter."] }, { "msgid": "No matching files", "msgstr": ["Geen overeenkomende bestanden"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Voer een naam in met minimaal 2 tekens."] }, { "msgid": "Recent", "msgstr": ["Recent"] }, { "msgid": "Select all checkboxes", "msgstr": ["Selecteer alle aanvinkopties"] }, { "msgid": "Select all entries", "msgstr": ["Alle invoer selecteren"] }, { "msgid": "Select all existing files", "msgstr": ["Selecteer alle bestaande bestanden"] }, { "msgid": "Select all new files", "msgstr": ["Selecteer alle nieuwe bestanden"] }, { "msgid": "Select entry", "msgstr": ["Invoer selecteren"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Selecteer de rij voor {nodename}"] }, { "msgid": "Size", "msgstr": ["Grootte"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["Sla %n bestand over", "Sla %n bestanden over"] }, { "msgid": "Skip this file", "msgstr": ["Sla dit bestand over"] }, { "msgid": "Submit name", "msgstr": ["Naam indienen"] }, { "msgid": "Undo", "msgstr": ["Ongedaan maken"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Upload inhoud of synchroniseer met je apparaten!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["Als een inkomende map wordt geselecteerd, worden alle conflicterende bestanden daarin overschreven."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["Als een inkomende map wordt geselecteerd, wordt de inhoud naar de bestaande map geschreven en wordt een recursieve conflict-oplossing uitgevoerd."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["Welke bestanden wilt u bewaren?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Je wordt momenteel geïdentificeerd als {nickname}."] }, { "msgid": "You are currently not identified.", "msgstr": ["Je bent momenteel niet geïdentificeerd."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Je kunt de naam niet leeg laten."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["U moet in elk geval een conflictoplossing kiezen"] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["U moet minstens een versie van elk bestand kiezen om door te gaan. "] }] }, { "language": "pl", "translations": [{ "msgid": '"{char}" is not allowed inside a folder name.', "msgstr": ['Znak "{char}" nie jest dozwolony w nazwie folderu.'] }, { "msgid": '"{char}" is not allowed inside a name.', "msgstr": ['"{char}" nie jest dozwolone w nazwie.'] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['"{extension}" nie jest dozwoloną nazwą.'] }, { "msgid": '"{segment}" is a reserved name and not allowed for folder names.', "msgstr": ['"{segment}" jest nazwą zastrzeżoną i nie jest dozwolona jako nazwa folderu.'] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['"{segment}" jest zastrzeżoną nazwą i nie jest dozwolone.'] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["Konflikt pliku", "Konflikt %n plików", "Konflikt %n plików", "Konflikt %n plików"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["%n konfliktów pliku w {dirname}", "%n konfliktów plików w {dirname}", "%n konfliktów plików w {dirname}", "%n konfliktów plików w {dirname}"] }, { "msgid": "All files", "msgstr": ["Wszystkie pliki"] }, { "msgid": "Cancel", "msgstr": ["Anuluj"] }, { "msgid": "Cancel the entire operation", "msgstr": ["Anuluj całą operację"] }, { "msgid": "Choose", "msgstr": ["Wybierz"] }, { "msgid": "Choose {file}", "msgstr": ["Wybierz {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Wybierz %n plik", "Wybierz %n pliki", "Wybierz %n plików", "Wybierz %n plików"] }, { "msgid": "Confirm", "msgstr": ["Potwierdź"] }, { "msgid": "Continue", "msgstr": ["Kontynuuj"] }, { "msgid": "Copy", "msgstr": ["Kopiuj"] }, { "msgid": "Copy to {target}", "msgstr": ["Skopiuj do {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Nie można utworzyć nowego folderu"] }, { "msgid": "Could not load files settings", "msgstr": ["Nie można wczytać ustawień plików"] }, { "msgid": "Could not load files views", "msgstr": ["Nie można wczytać widoków plików"] }, { "msgid": "Create directory", "msgstr": ["Utwórz katalog"] }, { "msgid": "Current view selector", "msgstr": ["Bieżący selektor widoku"] }, { "msgid": "Enter your name", "msgstr": ["Wprowadź nazwę"] }, { "msgid": "Existing version", "msgstr": ["Istniejąca wersja"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Nie udało się utworzyć pseudonimu."] }, { "msgid": "Favorites", "msgstr": ["Ulubione"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Pliki i foldery które oznaczysz jako ulubione będą wyświetlały się tutaj"] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Pliki i foldery które ostatnio modyfikowałeś będą wyświetlały się tutaj"] }, { "msgid": "Filter file list", "msgstr": ["Filtruj listę plików"] }, { "msgid": 'Folder names must not end with "{extension}".', "msgstr": ['Nazwy folderów nie mogą kończyć się na "{extension}".'] }, { "msgid": "Guest identification", "msgstr": ["Identyfikacja gościa"] }, { "msgid": "Home", "msgstr": ["Strona główna"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["Jeśli wybierzesz obie wersje, do nazwy przychodzącego pliku zostanie dodany numer."] }, { "msgid": "Invalid folder name.", "msgstr": ["Nieprawidłowa nazwa folderu."] }, { "msgid": "Invalid name.", "msgstr": ["Nieprawidłowa nazwa."] }, { "msgid": "Last modified date unknown", "msgstr": ["Data ostatniej modyfikacji nieznana"] }, { "msgid": "Modified", "msgstr": ["Zmodyfikowano"] }, { "msgid": "Move", "msgstr": ["Przenieś"] }, { "msgid": "Move to {target}", "msgstr": ["Przejdź do {target}"] }, { "msgid": "Name", "msgstr": ["Nazwa"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Nazwy mogą mieć maksymalnie 64 znaki."] }, { "msgid": "Names must not be empty.", "msgstr": ["Nazwy nie mogą być puste."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['Nazwy nie mogą kończyć się na "{extension}".'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Nazwy nie mogą zaczynać się od kropki."] }, { "msgid": "New", "msgstr": ["Nowy"] }, { "msgid": "New folder", "msgstr": ["Nowy folder"] }, { "msgid": "New folder name", "msgstr": ["Nowa nazwa folderu"] }, { "msgid": "New version", "msgstr": ["Nowa wersja"] }, { "msgid": "No files in here", "msgstr": ["Brak plików"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Nie znaleziono plików spełniających warunki filtru"] }, { "msgid": "No matching files", "msgstr": ["Brak pasujących plików"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Wprowadź nazwę zawierającą minimum 2 znaki."] }, { "msgid": "Recent", "msgstr": ["Ostatni"] }, { "msgid": "Select all checkboxes", "msgstr": ["Zaznacz wszystkie pola wyboru"] }, { "msgid": "Select all entries", "msgstr": ["Wybierz wszystkie wpisy"] }, { "msgid": "Select all existing files", "msgstr": ["Zaznacz wszystkie istniejące pliki"] }, { "msgid": "Select all new files", "msgstr": ["Zaznacz wszystkie nowe pliki"] }, { "msgid": "Select entry", "msgstr": ["Wybierz wpis"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Wybierz wiersz dla {nodename}"] }, { "msgid": "Size", "msgstr": ["Rozmiar"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["Pomiń %n plik", "Pomiń %n plików", "Pomiń %n plików", "Pomiń %n plików"] }, { "msgid": "Skip this file", "msgstr": ["Pomiń ten plik"] }, { "msgid": "Submit name", "msgstr": ["Zatwierdź nazwę"] }, { "msgid": "Undo", "msgstr": ["Cofnij"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Wyślij zawartość lub zsynchronizuj ze swoimi urządzeniami!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["Po wybraniu przychodzącego folderu wszystkie konfliktujące pliki w jego obrębie również zostaną nadpisane."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["Po wybraniu przychodzącego folderu jego zawartość zostanie zapisana w istniejącym folderze i zostanie przeprowadzone rekursywne rozwiązywanie konfliktów."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["Które pliki chcesz zachować?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Obecnie jesteś zidentyfikowany jako {nickname}."] }, { "msgid": "You are currently not identified.", "msgstr": ["Użytkownik nie został uwierzytelniony."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Nazwa nie może być pusta."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["Musisz wybrać co najmniej jedno rozwiązanie konfliktu"] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["Aby kontynuować, musisz wybrać co najmniej jedną wersję każdego pliku."] }] }, { "language": "pt_BR", "translations": [{ "msgid": '"{char}" is not allowed inside a folder name.', "msgstr": ['"{char}" não é permitido dentro de um nome de pasta.'] }, { "msgid": '"{char}" is not allowed inside a name.', "msgstr": ['"{char}" não é permitido dentro de um nome.'] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['"{extension}" não é um nome permitido.'] }, { "msgid": '"{segment}" is a reserved name and not allowed for folder names.', "msgstr": ['"{segment}" é um nome reservado e não permitido para nomes de pasta.'] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['"{segment}" é um nome reservado e não permitido.'] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%n arquivo conflita", "%n de arquivos conflitam", "%n arquivos conflitam"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["%n conflito de arquivo em {dirname}", "%n de conflitos de arquivos em {dirname}", "%n conflitos de arquivos em {dirname}"] }, { "msgid": "All files", "msgstr": ["Todos os arquivos"] }, { "msgid": "Cancel", "msgstr": ["Cancelar"] }, { "msgid": "Cancel the entire operation", "msgstr": ["Cancelar toda a operação"] }, { "msgid": "Choose", "msgstr": ["Escolher"] }, { "msgid": "Choose {file}", "msgstr": ["Escolher {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Escolher %n arquivo", "Escolher %n arquivos", "Escolher %n arquivos"] }, { "msgid": "Confirm", "msgstr": ["Confirmar"] }, { "msgid": "Continue", "msgstr": ["Continuar"] }, { "msgid": "Copy", "msgstr": ["Copiar"] }, { "msgid": "Copy to {target}", "msgstr": ["Copiar para {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Não foi possível criar a nova pasta"] }, { "msgid": "Could not load files settings", "msgstr": ["Não foi possível carregar configurações de arquivos"] }, { "msgid": "Could not load files views", "msgstr": ["Não foi possível carregar visualições de arquivos"] }, { "msgid": "Create directory", "msgstr": ["Criar diretório"] }, { "msgid": "Current view selector", "msgstr": ["Seletor de visualização atual"] }, { "msgid": "Enter your name", "msgstr": ["Digite seu nome"] }, { "msgid": "Existing version", "msgstr": ["Versão existente"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Falha ao definir apelido."] }, { "msgid": "Favorites", "msgstr": ["Favoritos"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Os arquivos e pastas que você marca como favoritos aparecerão aqui."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Arquivos e pastas que você modificou recentemente aparecerão aqui."] }, { "msgid": "Filter file list", "msgstr": ["Filtrar lista de arquivos"] }, { "msgid": 'Folder names must not end with "{extension}".', "msgstr": ['Nomes de pasta não podem terminar com "{extension}".'] }, { "msgid": "Guest identification", "msgstr": ["Identificação de convidados"] }, { "msgid": "Home", "msgstr": ["Início"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["Se você selecionar ambas as versões, um número será adicionado ao nome do arquivo recebido."] }, { "msgid": "Invalid folder name.", "msgstr": ["Nome de pasta inválido."] }, { "msgid": "Invalid name.", "msgstr": ["Nome inválido."] }, { "msgid": "Last modified date unknown", "msgstr": ["Data da última modificação desconhecida"] }, { "msgid": "Modified", "msgstr": ["Modificado"] }, { "msgid": "Move", "msgstr": ["Mover"] }, { "msgid": "Move to {target}", "msgstr": ["Mover para {target}"] }, { "msgid": "Name", "msgstr": ["Nome"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Os nomes podem ter no máximo 64 caracteres."] }, { "msgid": "Names must not be empty.", "msgstr": ["Nomes não podem estar vazios."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['Nomes não podem terminar com "{extension}".'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Nomes não podem começar com um ponto."] }, { "msgid": "New", "msgstr": ["Novo"] }, { "msgid": "New folder", "msgstr": ["Nova pasta"] }, { "msgid": "New folder name", "msgstr": ["Novo nome de pasta"] }, { "msgid": "New version", "msgstr": ["Nova versão"] }, { "msgid": "No files in here", "msgstr": ["Nenhum arquivo aqui"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Nenhum arquivo correspondente ao seu filtro foi encontrado."] }, { "msgid": "No matching files", "msgstr": ["Nenhum arquivo correspondente"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Digite um nome com pelo menos 2 caracteres."] }, { "msgid": "Recent", "msgstr": ["Recente"] }, { "msgid": "Select all checkboxes", "msgstr": ["Selecione todas as caixas de seleção"] }, { "msgid": "Select all entries", "msgstr": ["Selecionar todas as entradas"] }, { "msgid": "Select all existing files", "msgstr": ["Selecione todos os arquivos existentes"] }, { "msgid": "Select all new files", "msgstr": ["Selecione todos os novos arquivos"] }, { "msgid": "Select entry", "msgstr": ["Selecionar entrada"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Selecionar a linha para {nodename}"] }, { "msgid": "Size", "msgstr": ["Tamanho"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["Ignorar %n arquivo", "Ignorar %n de arquivos", "Ignorar %n arquivos"] }, { "msgid": "Skip this file", "msgstr": ["Ignorar este arquivo"] }, { "msgid": "Submit name", "msgstr": ["Enviar nome"] }, { "msgid": "Undo", "msgstr": ["Desfazer"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Faça upload de algum conteúdo ou sincronize com seus dispositivos!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["Ao selecionar uma pasta de entrada, quaisquer arquivos conflitantes dentro dela também serão sobrescritos."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["Quando uma pasta de entrada é selecionada, o conteúdo é gravado na pasta existente e uma resolução recursiva de conflitos é realizada."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["Quais arquivos você deseja manter?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Você está atualmente identificado como {nickname}."] }, { "msgid": "You are currently not identified.", "msgstr": ["No momento, você não está identificado."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Você não pode deixar o nome vazio."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["Você precisa escolher pelo menos uma solução para o conflito"] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["Você precisa selecionar pelo menos uma versão de cada arquivo para continuar."] }] }, { "language": "pt_PT", "translations": [{ "msgid": '"{char}" is not allowed inside a name.', "msgstr": ['"{char}" não é permitido dentro de um nome.'] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['"{extension}" não é um nome permitido.'] }, { "msgid": '"{name}" is an invalid folder name.', "msgstr": ['"{name}" é um nome de pasta inválido.'] }, { "msgid": '"{name}" is not an allowed folder name', "msgstr": ['"{name}" não é um nome de pasta permitido'] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['"{segment}" é um nome reservado e não é permitido.'] }, { "msgid": '"/" is not allowed inside a folder name.', "msgstr": ['"/" não é permitido dentro do nome de pasta.'] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%n ficheiro em conflito", "%n ficheiros em conflito", "%n ficheiros em conflito"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["%n ficheiro em conflito em {dirname}", "%n ficheiros em conflito em {dirname}", "%n ficheiros em conflito em {dirname}"] }, { "msgid": "All files", "msgstr": ["Todos os ficheiros"] }, { "msgid": "Cancel", "msgstr": ["Cancelar"] }, { "msgid": "Cancel the entire operation", "msgstr": ["Cancelar toda a operação"] }, { "msgid": "Choose", "msgstr": ["Escolher"] }, { "msgid": "Choose {file}", "msgstr": ["Escolher {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Escolha %n ficheiro", "Escolha %n ficheiros", "Escolha %n ficheiros"] }, { "msgid": "Confirm", "msgstr": ["Confirmar"] }, { "msgid": "Continue", "msgstr": ["Continuar"] }, { "msgid": "Copy", "msgstr": ["Copiar"] }, { "msgid": "Copy to {target}", "msgstr": ["Copiar para {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Não foi possível criar a nova pasta "] }, { "msgid": "Could not load files settings", "msgstr": ["Não foi possível carregar as definições dos ficheiros"] }, { "msgid": "Could not load files views", "msgstr": ["Não foi possível carregar as visualizações dos ficheiros"] }, { "msgid": "Create directory", "msgstr": ["Criar pasta"] }, { "msgid": "Current view selector", "msgstr": ["Seletor de visualização atual"] }, { "msgid": "Enter your name", "msgstr": ["Introduza o seu nome"] }, { "msgid": "Existing version", "msgstr": ["Versão existente"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Falha ao definir o nome alternativo."] }, { "msgid": "Favorites", "msgstr": ["Favoritos"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Os ficheiros e as pastas que marcar como favoritos aparecerão aqui."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Os ficheiros e as pastas que modificou recentemente aparecerão aqui."] }, { "msgid": "Filter file list", "msgstr": ["Filtrar lista de ficheiros"] }, { "msgid": "Folder name cannot be empty.", "msgstr": ["O nome da pasta não pode estar vazio."] }, { "msgid": "Guest identification", "msgstr": ["Identificação de convidado"] }, { "msgid": "Home", "msgstr": ["Início"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["Se você selecionar ambas as versões, um número será adicionado ao nome do ficheiro recebido."] }, { "msgid": "Invalid name.", "msgstr": ["Nome inválido."] }, { "msgid": "Last modified date unknown", "msgstr": ["Data da última modificação desconhecida"] }, { "msgid": "Modified", "msgstr": ["Modificado"] }, { "msgid": "Move", "msgstr": ["Mover"] }, { "msgid": "Move to {target}", "msgstr": ["Mover para {target}"] }, { "msgid": "Name", "msgstr": ["Nome"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Os nomes podem ter no máximo 64 caracteres."] }, { "msgid": "Names must not be empty.", "msgstr": ["O nome não pode ficar em branco."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['Nomes não podem terminar em "{extension}".'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Os nomes não podem começar por um ponto."] }, { "msgid": "New", "msgstr": ["Novo"] }, { "msgid": "New folder", "msgstr": ["Nova pasta"] }, { "msgid": "New folder name", "msgstr": ["Novo nome da pasta"] }, { "msgid": "New version", "msgstr": ["Nova versão"] }, { "msgid": "No files in here", "msgstr": ["Sem ficheiros aqui"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Não foi encontrado nenhum ficheiro correspondente ao seu filtro."] }, { "msgid": "No matching files", "msgstr": ["Nenhum ficheiro correspondente"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Introduza um nome com, pelo menos, 2 caracteres."] }, { "msgid": "Recent", "msgstr": ["Recentes"] }, { "msgid": "Select all checkboxes", "msgstr": ["Selecione todas as caixas de seleção"] }, { "msgid": "Select all entries", "msgstr": ["Selecionar todas as entradas"] }, { "msgid": "Select all existing files", "msgstr": ["Selecione todos os ficheiros existentes"] }, { "msgid": "Select all new files", "msgstr": ["Selecione todos os novos ficheiros"] }, { "msgid": "Select entry", "msgstr": ["Selecionar entrada"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Selecione a linha para {nodename}"] }, { "msgid": "Size", "msgstr": ["Tamanho"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["Ignorar %n ficheiro", "Ignorar %n ficheiros", "Ignorar %n ficheiros"] }, { "msgid": "Skip this file", "msgstr": ["Ignorar este ficheiro"] }, { "msgid": "Submit name", "msgstr": ["Submeter nome"] }, { "msgid": "Undo", "msgstr": ["Anular"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Envie algum conteúdo ou sincronize com os seus dispositivos!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["Ao selecionar uma pasta de entrada, quaisquer ficheiros conflituantes dentro da mesma serão também sobrescritos."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["Quando uma pasta de entrada é selecionada, o conteúdo é gravado na pasta existente e é realizada uma resolução recursiva de conflitos."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["Quais os ficheiros que deseja manter?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Atualmente está identificado como {nickname}."] }, { "msgid": "You are currently not identified.", "msgstr": ["Atualmente, não está identificado."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Não pode deixar o nome em branco."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["É preciso escolher pelo menos uma solução para o conflito."] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["É necessário selecionar pelo menos uma versão de cada ficheiro para continuar."] }] }, { "language": "ro", "translations": [{ "msgid": '"{name}" is an invalid folder name.', "msgstr": ['"{name}" este un nume de director invalid.'] }, { "msgid": '"{name}" is not an allowed folder name', "msgstr": ['"{name}" nu este un nume de director permis'] }, { "msgid": '"/" is not allowed inside a folder name.', "msgstr": ['"/" nu este permis în numele unui director.'] }, { "msgid": "All files", "msgstr": ["Toate fișierele"] }, { "msgid": "Choose", "msgstr": ["Alege"] }, { "msgid": "Choose {file}", "msgstr": ["Alege {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Alege %n fișier", "Alege %n fișiere", "Alege %n fișiere"] }, { "msgid": "Copy", "msgstr": ["Copiază"] }, { "msgid": "Copy to {target}", "msgstr": ["Copiază în {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Nu s-a putut crea noul director"] }, { "msgid": "Could not load files settings", "msgstr": ["Nu s-au putut încărca setările fișierelor"] }, { "msgid": "Could not load files views", "msgstr": ["Nu s-au putut încărca vizualizările fișierelor"] }, { "msgid": "Create directory", "msgstr": ["Creează director"] }, { "msgid": "Current view selector", "msgstr": ["Selectorul curent al vizualizării"] }, { "msgid": "Favorites", "msgstr": ["Favorite"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Fișiere și directoare pe care le marcați ca favorite vor apărea aici."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Fișiere și directoare pe care le-ați modificat recent vor apărea aici."] }, { "msgid": "Filter file list", "msgstr": ["Filtrează lista de fișiere"] }, { "msgid": "Folder name cannot be empty.", "msgstr": ["Numele de director nu poate fi necompletat."] }, { "msgid": "Home", "msgstr": ["Acasă"] }, { "msgid": "Modified", "msgstr": ["Modificat"] }, { "msgid": "Move", "msgstr": ["Mută"] }, { "msgid": "Move to {target}", "msgstr": ["Mută către {target}"] }, { "msgid": "Name", "msgstr": ["Nume"] }, { "msgid": "New", "msgstr": ["Nou"] }, { "msgid": "New folder", "msgstr": ["Director nou"] }, { "msgid": "New folder name", "msgstr": ["Numele noului director"] }, { "msgid": "No files in here", "msgstr": ["Nu există fișiere"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Nu există fișiere potrivite pentru filtrul selectat"] }, { "msgid": "No matching files", "msgstr": ["Nu există fișiere potrivite"] }, { "msgid": "Recent", "msgstr": ["Recente"] }, { "msgid": "Select all entries", "msgstr": ["Selectează toate înregistrările"] }, { "msgid": "Select entry", "msgstr": ["Selectează înregistrarea"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Selectează rândul pentru {nodename}"] }, { "msgid": "Size", "msgstr": ["Mărime"] }, { "msgid": "Undo", "msgstr": ["Anulează"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Încărcați conținut sau sincronizați cu dispozitivele dumneavoastră!"] }] }, { "language": "ru", "translations": [{ "msgid": '"{char}" is not allowed inside a name.', "msgstr": ['"{char}" не допускается внутри имени.'] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['"{extension}" это не допустимое имя.'] }, { "msgid": '"{name}" is an invalid folder name.', "msgstr": ["«{name}» — недопустимое имя папки."] }, { "msgid": '"{name}" is not an allowed folder name', "msgstr": ["«{name}» не является разрешенным именем папки"] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['"{segment}" это зарезервированное имя и не допустимо.'] }, { "msgid": '"/" is not allowed inside a folder name.', "msgstr": ["Символ «/» не допускается внутри имени папки."] }, { "msgid": "All files", "msgstr": ["Все файлы"] }, { "msgid": "Cancel", "msgstr": ["Отмена"] }, { "msgid": "Choose", "msgstr": ["Выбрать"] }, { "msgid": "Choose {file}", "msgstr": ["Выбрать «{file}»"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Выбрать %n файл", "Выбрать %n файла", "Выбрать %n файлов", "Выбрать %n файлов"] }, { "msgid": "Copy", "msgstr": ["Копировать"] }, { "msgid": "Copy to {target}", "msgstr": ["Копировать в «{target}»"] }, { "msgid": "Could not create the new folder", "msgstr": ["Не удалось создать новую папку"] }, { "msgid": "Could not load files settings", "msgstr": ["Не удалось загрузить настройки файлов"] }, { "msgid": "Could not load files views", "msgstr": ["Не удалось загрузить конфигурацию просмотра файлов"] }, { "msgid": "Create directory", "msgstr": ["Создать папку"] }, { "msgid": "Current view selector", "msgstr": ["Переключатель текущего вида"] }, { "msgid": "Enter your name", "msgstr": ["Введите ваше имя"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Не удалось задать никнейм."] }, { "msgid": "Favorites", "msgstr": ["Избранное"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Здесь будут отображаться файлы и папки, которые вы пометили как избранные."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Здесь будут отображаться файлы и папки, которые вы недавно изменили."] }, { "msgid": "Filter file list", "msgstr": ["Фильтровать список файлов"] }, { "msgid": "Folder name cannot be empty.", "msgstr": ["Имя папки не может быть пустым."] }, { "msgid": "Guest identification", "msgstr": ["Гостевая идентификация"] }, { "msgid": "Home", "msgstr": ["Домой"] }, { "msgid": "Invalid name.", "msgstr": ["Неверное имя."] }, { "msgid": "Modified", "msgstr": ["Изменен"] }, { "msgid": "Move", "msgstr": ["Переместить"] }, { "msgid": "Move to {target}", "msgstr": ["Переместить в «{target}»"] }, { "msgid": "Name", "msgstr": ["Имя"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Имена не могут быть длинее 64 символов."] }, { "msgid": "Names must not be empty.", "msgstr": ["Имена не могут быть пустыми."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['Имена не могут оканчиваться на "{extension}".'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Имена должны начинаться с точки."] }, { "msgid": "New", "msgstr": ["Новый"] }, { "msgid": "New folder", "msgstr": ["Новая папка"] }, { "msgid": "New folder name", "msgstr": ["Имя новой папки"] }, { "msgid": "No files in here", "msgstr": ["Здесь нет файлов"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Файлы, соответствующие вашему фильтру, не найдены."] }, { "msgid": "No matching files", "msgstr": ["Нет подходящих файлов"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Пожалуйста введите имя длиной не менее 2 символов."] }, { "msgid": "Recent", "msgstr": ["Недавний"] }, { "msgid": "Select all entries", "msgstr": ["Выбрать все записи"] }, { "msgid": "Select entry", "msgstr": ["Выбрать запись"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Выбрать строку для «{nodename}»"] }, { "msgid": "Size", "msgstr": ["Размер"] }, { "msgid": "Submit name", "msgstr": ["Отправить имя"] }, { "msgid": "Undo", "msgstr": ["Отменить"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Загрузите контент или синхронизируйте его со своими устройствами!"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Вы идентифицированы как {nickname}."] }, { "msgid": "You are currently not identified.", "msgstr": ["В данный момент вы не идентифицированы."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Вы не можете оставить имя пустым."] }] }, { "language": "sk_SK", "translations": [{ "msgid": '"{char}" is not allowed inside a folder name.', "msgstr": ['"{char}" nie je povolené v názve priečinka.'] }, { "msgid": '"{char}" is not allowed inside a name.', "msgstr": ['"{char}" nie je povolené v rámci mena.'] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['"{extension}" nie je povolený názov.'] }, { "msgid": '"{segment}" is a reserved name and not allowed for folder names.', "msgstr": ["„{segment}“ je rezervované meno a nie je povolené na názvy priečinkov."] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['"{segment}" je rezervované meno a nie je povolené.'] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%n konflikt súborov", "%n konflikty súborov", "%n konfliktov súborov", "%n konflikty súborov"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["%n konflikt súborov v {dirname}", "%n konflikty súborov v {dirname}", "%n konfliktov súborov v {dirname}", "%n konfliktov súborov v {dirname}"] }, { "msgid": "All files", "msgstr": ["Všetky súbory"] }, { "msgid": "Cancel", "msgstr": ["Zrušiť"] }, { "msgid": "Cancel the entire operation", "msgstr": ["Zrušiť celú operáciu"] }, { "msgid": "Choose", "msgstr": ["Vybrať"] }, { "msgid": "Choose {file}", "msgstr": ["Vybrať {súbor}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Vybraný %n súbor", "Vybrané %n súbory", "Vybraných %n súborov", "Vybraných %n súborov"] }, { "msgid": "Confirm", "msgstr": ["Potvrdiť"] }, { "msgid": "Continue", "msgstr": ["Pokračovať"] }, { "msgid": "Copy", "msgstr": ["Kopírovať"] }, { "msgid": "Copy to {target}", "msgstr": ["Kopírovať do {umiestnenia}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Nepodarilo sa vytvoriť nový priečinok"] }, { "msgid": "Could not load files settings", "msgstr": ["Nepodarilo sa načítať nastavenia súborov"] }, { "msgid": "Could not load files views", "msgstr": ["Nepodarilo sa načítať pohľady súborov"] }, { "msgid": "Create directory", "msgstr": ["Vytvoriť adresár"] }, { "msgid": "Current view selector", "msgstr": ["Výber aktuálneho zobrazenia"] }, { "msgid": "Enter your name", "msgstr": ["Zadajte svoje meno"] }, { "msgid": "Existing version", "msgstr": ["Existujúca verzia"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Nepodarilo sa nastaviť prezývku."] }, { "msgid": "Favorites", "msgstr": ["Obľúbené"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Tu sa zobrazia súbory a priečinky, ktoré označíte ako obľúbené."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Tu sa zobrazia súbory a priečinky, ktoré ste nedávno upravili."] }, { "msgid": "Filter file list", "msgstr": ["Filtrovať zoznam súborov"] }, { "msgid": 'Folder names must not end with "{extension}".', "msgstr": ['Názvy priečinkov nesmú končiť na "{extension}".'] }, { "msgid": "Guest identification", "msgstr": ["Identifikácia hosťa"] }, { "msgid": "Home", "msgstr": ["Domov"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["Ak vyberiete obe verzie, prichádzajúci súbor bude mať k svojmu názvu pridané číslo."] }, { "msgid": "Invalid folder name.", "msgstr": ["Neplatný názov priečinka."] }, { "msgid": "Invalid name.", "msgstr": ["Neplatné meno."] }, { "msgid": "Last modified date unknown", "msgstr": ["Posledná zmena dátumu neznáma"] }, { "msgid": "Modified", "msgstr": ["Upravené"] }, { "msgid": "Move", "msgstr": ["Prejsť"] }, { "msgid": "Move to {target}", "msgstr": ["Prejsť na {umiestnenie}"] }, { "msgid": "Name", "msgstr": ["Názov"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Mená môžu mať maximálne 64 znakov."] }, { "msgid": "Names must not be empty.", "msgstr": ["Mená nesmú byť prázdne."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['Mená nesmú končiť "{extension}".'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Mená nesmú začínať bodkou."] }, { "msgid": "New", "msgstr": ["Pridať"] }, { "msgid": "New folder", "msgstr": ["Pridať priečinok"] }, { "msgid": "New folder name", "msgstr": ["Pridať názov priečinka"] }, { "msgid": "New version", "msgstr": ["Nová verzia"] }, { "msgid": "No files in here", "msgstr": ["Nie sú tu žiadne súbory"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Nenašli sa žiadne súbory zodpovedajúce vášmu filtru."] }, { "msgid": "No matching files", "msgstr": ["Žiadne zodpovedajúce súbory"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Zadajte meno s aspoň 2 znakmi."] }, { "msgid": "Recent", "msgstr": ["Nedávne"] }, { "msgid": "Select all checkboxes", "msgstr": ["Vyberte všetky zaškrtávacie políčka"] }, { "msgid": "Select all entries", "msgstr": ["Vybrať všetky položky"] }, { "msgid": "Select all existing files", "msgstr": ["Vybrať všetky existujúce súbory"] }, { "msgid": "Select all new files", "msgstr": ["Vybrať všetky nové súbory"] }, { "msgid": "Select entry", "msgstr": ["Vybrať položku"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Vyberte riadok pre {názov uzla}"] }, { "msgid": "Size", "msgstr": ["Veľkosť"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["Preskočiť %n súbor", "Preskočiť %n súbory", "Preskočiť %n súborov", "Preskočiť %n súbory"] }, { "msgid": "Skip this file", "msgstr": ["Preskočiť tento súbor"] }, { "msgid": "Submit name", "msgstr": ["Zadať meno"] }, { "msgid": "Undo", "msgstr": ["Späť"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Nahrajte nejaký obsah alebo synchronizujte so svojimi zariadeniami!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["Keď je vybraná prichádzajúca složka, všetky konfliktné súbory v nej budú taktiež prepísané."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["Keď je vybraná prichádzajúca zložka, obsah sa zapíše do existujúcej zložky a vykoná sa rekurzívne riešenie konfliktov."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["Ktoré súbory chcete zachovať?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Momentálne ste identifikovaný ako {nickname}."] }, { "msgid": "You are currently not identified.", "msgstr": ["Momentálne nie ste identifikovaný."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Nemôžete nechať meno prázdne."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["Musíte si vybrať aspoň jedno riešenie konfliktu."] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["Musíte vybrať aspoň jednu verziu každého súboru, aby ste mohli pokračovať."] }] }, { "language": "sl", "translations": [{ "msgid": '"{name}" is an invalid folder name.', "msgstr": ["{name} je neveljavno ime mape."] }, { "msgid": '"{name}" is not an allowed folder name', "msgstr": ["{name} ni dovoljeno ime mape"] }, { "msgid": '"/" is not allowed inside a folder name.', "msgstr": ['"/" ni dovoljen v imenu mape.'] }, { "msgid": "All files", "msgstr": ["Vse datoteke"] }, { "msgid": "Choose", "msgstr": ["Izberi"] }, { "msgid": "Choose {file}", "msgstr": ["Izberi {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Izberi %n datoteko", "Izberi %n datoteki", "Izberi %n datotek", "Izberi %n datotek"] }, { "msgid": "Copy", "msgstr": ["Kopiraj"] }, { "msgid": "Copy to {target}", "msgstr": ["Kopiraj v {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Nisem mogel ustvariti nove mape"] }, { "msgid": "Could not load files settings", "msgstr": ["NIsem mogel naložiti nastavitev datotek"] }, { "msgid": "Could not load files views", "msgstr": ["Nisem mogel naložiti pogledov datotek"] }, { "msgid": "Create directory", "msgstr": ["Ustvari mapo"] }, { "msgid": "Current view selector", "msgstr": ["Izbirnik trenutnega pogleda"] }, { "msgid": "Favorites", "msgstr": ["Priljubljene"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Datoteke in mape ki jih označite kot priljubljene se bodo prikazale tukaj."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Daoteke in mape ki ste jih pred kratkim spremenili se bodo prikazale tukaj."] }, { "msgid": "Filter file list", "msgstr": ["Filtriraj seznam datotek"] }, { "msgid": "Folder name cannot be empty.", "msgstr": ["Ime mape ne more biti prazno"] }, { "msgid": "Home", "msgstr": ["Domov"] }, { "msgid": "Modified", "msgstr": ["Spremenjeno"] }, { "msgid": "Move", "msgstr": ["Premakni"] }, { "msgid": "Move to {target}", "msgstr": ["Premakni v {target}"] }, { "msgid": "Name", "msgstr": ["Ime"] }, { "msgid": "New", "msgstr": ["Nov"] }, { "msgid": "New folder", "msgstr": ["Nova mapa"] }, { "msgid": "New folder name", "msgstr": ["Novo ime mape"] }, { "msgid": "No files in here", "msgstr": ["Tukaj ni datotek"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Ni bilo najdenih ujemajočih datotek glede na vaš filter."] }, { "msgid": "No matching files", "msgstr": ["Ni ujemajočih datotek"] }, { "msgid": "Recent", "msgstr": ["Nedavne"] }, { "msgid": "Select all entries", "msgstr": ["Izberi vse vnose"] }, { "msgid": "Select entry", "msgstr": ["Izberi vnos"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Izberi vrstico za {nodename}"] }, { "msgid": "Size", "msgstr": ["Velikost"] }, { "msgid": "Undo", "msgstr": ["Razveljavi"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Naloži nekaj vsebine ali sinhroniziraj s svojimi napravami!"] }] }, { "language": "sr", "translations": [{ "msgid": '"{char}" is not allowed inside a name.', "msgstr": ["„{char}” није дозвољено унутар имена."] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ["„{extension}” није дозвољено име."] }, { "msgid": '"{name}" is an invalid folder name.', "msgstr": ["„{name}” није исправно име фолдера."] }, { "msgid": '"{name}" is not an allowed folder name', "msgstr": ["„{name}” није дозвољено име за фолдер."] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ["„{segment}” је резервисано име и није дозвољено."] }, { "msgid": '"/" is not allowed inside a folder name.', "msgstr": ["„/” није дозвољено унутар имена фолдера."] }, { "msgid": "All files", "msgstr": ["Сви фајлови"] }, { "msgid": "Cancel", "msgstr": ["Откажи"] }, { "msgid": "Choose", "msgstr": ["Изаберите"] }, { "msgid": "Choose {file}", "msgstr": ["Изаберите {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Изаберите %n фајл", "Изаберите %n фајла", "Изаберите %n фајлова"] }, { "msgid": "Copy", "msgstr": ["Копирај"] }, { "msgid": "Copy to {target}", "msgstr": ["Копирај у {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Није могао да се креира нови фолдер"] }, { "msgid": "Could not load files settings", "msgstr": ["Не могу да се учитају подешавања фајлова"] }, { "msgid": "Could not load files views", "msgstr": ["Не могу да се учитају прикази фајлова"] }, { "msgid": "Create directory", "msgstr": ["Креирај директоријум"] }, { "msgid": "Current view selector", "msgstr": ["Бирач тренутног приказа"] }, { "msgid": "Enter your name", "msgstr": ["Унесите своје име"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Није успело постављање надимка."] }, { "msgid": "Favorites", "msgstr": ["Омиљено"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Овде ће се појавити фајлови и фолдери које сте означили као омиљене."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Овде ће се појавити фајлови и фолдери који се се недавно изменили."] }, { "msgid": "Filter file list", "msgstr": ["Фитрирање листе фајлова"] }, { "msgid": "Folder name cannot be empty.", "msgstr": ["Име фолдера не може бити празно."] }, { "msgid": "Guest identification", "msgstr": ["Идентификација госта"] }, { "msgid": "Home", "msgstr": ["Почетак"] }, { "msgid": "Invalid name.", "msgstr": ["Неисправно име."] }, { "msgid": "Modified", "msgstr": ["Измењено"] }, { "msgid": "Move", "msgstr": ["Премести"] }, { "msgid": "Move to {target}", "msgstr": ["Премести у {target}"] }, { "msgid": "Name", "msgstr": ["Име"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Највећа дужина имена може бити 64 карактера."] }, { "msgid": "Names must not be empty.", "msgstr": ["Имена не смеју да буду празна."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ["Имена не смеју да се завршавају на „{extension}”."] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Имена не смеју да почињу тачком."] }, { "msgid": "New", "msgstr": ["Ново"] }, { "msgid": "New folder", "msgstr": ["Нови фолдер"] }, { "msgid": "New folder name", "msgstr": ["Име новог фолдера"] }, { "msgid": "No files in here", "msgstr": ["Овде нема фајлова"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Није пронађен ниједан фајл који задовољава ваш филтер."] }, { "msgid": "No matching files", "msgstr": ["Нема таквих фајлова"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Молимо вас да унесете име од барем два карактера."] }, { "msgid": "Recent", "msgstr": ["Скорашње"] }, { "msgid": "Select all entries", "msgstr": ["Изаберите све ставке"] }, { "msgid": "Select entry", "msgstr": ["Изаберите ставку"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Изаберите ред за {nodename}"] }, { "msgid": "Size", "msgstr": ["Величина"] }, { "msgid": "Submit name", "msgstr": ["Предај име"] }, { "msgid": "Undo", "msgstr": ["Поништи"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Отпремите нешто или синхронизујте са својим уређајима!"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Тренутно се идентификујете као {nickname}."] }, { "msgid": "You are currently not identified.", "msgstr": ["Тренутно немате идентификацију."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Име не можете да оставите празно."] }] }, { "language": "sr@latin", "translations": [{ "msgid": '"{name}" is an invalid folder name.', "msgstr": ["„{name}” je neispravan naziv foldera."] }, { "msgid": '"{name}" is not an allowed folder name', "msgstr": ["„{name}” je nedozvoljen naziv foldera."] }, { "msgid": '"/" is not allowed inside a folder name.', "msgstr": ["„/” se ne može koristiti unutar naziva foldera."] }, { "msgid": "All files", "msgstr": ["Svi fajlovi"] }, { "msgid": "Choose", "msgstr": ["Izaberite"] }, { "msgid": "Choose {file}", "msgstr": ["Izaberite {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Izaberite %n fajl", "Izaberite %n fajla", "Izaberite %n fajlova"] }, { "msgid": "Copy", "msgstr": ["Kopiraj"] }, { "msgid": "Copy to {target}", "msgstr": ["Kopiraj u {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Neuspešno kreiranje novog foldera"] }, { "msgid": "Could not load files settings", "msgstr": ["Neuspešno učitavanje podešavanja fajlova"] }, { "msgid": "Could not load files views", "msgstr": ["Neuspešno učitavanje prikaza fajlova"] }, { "msgid": "Create directory", "msgstr": ["Kreiraj direktorijum"] }, { "msgid": "Current view selector", "msgstr": ["Birač trenutnog prikaza"] }, { "msgid": "Favorites", "msgstr": ["Omiljeno"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Lista omiljenih fajlova i foldera."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Lista fajlova i foldera sa skorašnjim izmenama."] }, { "msgid": "Filter file list", "msgstr": ["Fitriranje liste fajlova"] }, { "msgid": "Folder name cannot be empty.", "msgstr": ["Naziv foldera ne može biti prazan."] }, { "msgid": "Home", "msgstr": ["Početak"] }, { "msgid": "Modified", "msgstr": ["Izmenjeno"] }, { "msgid": "Move", "msgstr": ["Premesti"] }, { "msgid": "Move to {target}", "msgstr": ["Premesti u {target}"] }, { "msgid": "Name", "msgstr": ["Naziv"] }, { "msgid": "New", "msgstr": ["Novo"] }, { "msgid": "New folder", "msgstr": ["Novi folder"] }, { "msgid": "New folder name", "msgstr": ["Naziv novog foldera"] }, { "msgid": "No files in here", "msgstr": ["Bez fajlova"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Nema fajlova koji zadovoljavaju uslove filtera."] }, { "msgid": "No matching files", "msgstr": ["Nema takvih fajlova"] }, { "msgid": "Recent", "msgstr": ["Skorašnje"] }, { "msgid": "Select all entries", "msgstr": ["Izaberite sve stavke"] }, { "msgid": "Select entry", "msgstr": ["Izaberite stavku"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Izaberite red za {nodename}"] }, { "msgid": "Size", "msgstr": ["Veličina"] }, { "msgid": "Undo", "msgstr": ["Vrati"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Otpremite sadržaj ili sinhronizujte sa svojim uređajima!"] }] }, { "language": "sv", "translations": [{ "msgid": '"{char}" is not allowed inside a folder name.', "msgstr": ['"{char}" är inte tillåtet i ett mappnamn.'] }, { "msgid": '"{char}" is not allowed inside a name.', "msgstr": ['"{char}" är inte tillåtet i ett namn.'] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['"{extension}" är inte ett tillåtet namn.'] }, { "msgid": '"{segment}" is a reserved name and not allowed for folder names.', "msgstr": ['"{segment}" är ett reserverat namn och inte tillåtet mappnamn.'] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['"{segment}" är ett reserverat namn och inte tillåtet.'] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%n fil är i konflikt", "%n filer är i konflikt"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["%n fil är i konflikt i {dirname}", "%n filer är i konflikt i {dirname}"] }, { "msgid": "All files", "msgstr": ["Alla filer"] }, { "msgid": "Cancel", "msgstr": ["Avbryt"] }, { "msgid": "Cancel the entire operation", "msgstr": ["Avbryt hela operationen"] }, { "msgid": "Choose", "msgstr": ["Välj"] }, { "msgid": "Choose {file}", "msgstr": ["Välj {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Välj %n fil", "Välj %n filer"] }, { "msgid": "Confirm", "msgstr": ["Bekräfta"] }, { "msgid": "Continue", "msgstr": ["Fortsätt"] }, { "msgid": "Copy", "msgstr": ["Kopiera"] }, { "msgid": "Copy to {target}", "msgstr": ["Kopiera till {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Kunde inte skapa den nya mappen"] }, { "msgid": "Could not load files settings", "msgstr": ["Kunde inte ladda filinställningar"] }, { "msgid": "Could not load files views", "msgstr": ["Kunde inte ladda filvyer"] }, { "msgid": "Create directory", "msgstr": ["Skapa katalog"] }, { "msgid": "Current view selector", "msgstr": ["Aktuell vyväljare"] }, { "msgid": "Enter your name", "msgstr": ["Ange ditt namn"] }, { "msgid": "Existing version", "msgstr": ["Nuvarande version"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Kunde inte ställa in smeknamn."] }, { "msgid": "Favorites", "msgstr": ["Favoriter"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Filer och mappar som du markerar som favorit kommer att visas här."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Filer och mappar som du nyligen ändrat kommer att visas här."] }, { "msgid": "Filter file list", "msgstr": ["Filtrera fillistan"] }, { "msgid": 'Folder names must not end with "{extension}".', "msgstr": ['Mappnamn får inte sluta med "{extension}".'] }, { "msgid": "Guest identification", "msgstr": ["Gästidentifiering"] }, { "msgid": "Home", "msgstr": ["Hem"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["Om du väljer båda versionerna kommer den inkommande filen att få ett nummer tillagt i sitt namn."] }, { "msgid": "Invalid folder name.", "msgstr": ["Ogiltigt mappnamn."] }, { "msgid": "Invalid name.", "msgstr": ["Ogiltigt namn."] }, { "msgid": "Last modified date unknown", "msgstr": ["Senaste ändringsdatum okänt"] }, { "msgid": "Modified", "msgstr": ["Ändrad"] }, { "msgid": "Move", "msgstr": ["Flytta"] }, { "msgid": "Move to {target}", "msgstr": ["Flytta till {target}"] }, { "msgid": "Name", "msgstr": ["Namn"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Namnen kan vara högst 64 tecken långa."] }, { "msgid": "Names must not be empty.", "msgstr": ["Namn får inte vara tomt."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['Namn får inte sluta med "{extension}".'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Namn får inte börja med en punkt."] }, { "msgid": "New", "msgstr": ["Ny"] }, { "msgid": "New folder", "msgstr": ["Ny mapp"] }, { "msgid": "New folder name", "msgstr": ["Nytt mappnamn"] }, { "msgid": "New version", "msgstr": ["Ny version"] }, { "msgid": "No files in here", "msgstr": ["Inga filer här"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Inga filer som matchar ditt filter hittades."] }, { "msgid": "No matching files", "msgstr": ["Inga matchande filer"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Ange ett namn med minst 2 tecken."] }, { "msgid": "Recent", "msgstr": ["Nyligen"] }, { "msgid": "Select all checkboxes", "msgstr": ["Markera alla kryssrutor"] }, { "msgid": "Select all entries", "msgstr": ["Välj alla poster"] }, { "msgid": "Select all existing files", "msgstr": ["Välj alla befintliga filer"] }, { "msgid": "Select all new files", "msgstr": ["Välj alla nya filer"] }, { "msgid": "Select entry", "msgstr": ["Välj post"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Välj raden för {nodename}"] }, { "msgid": "Size", "msgstr": ["Storlek"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["Hoppa över %n fil", "Hoppa över %n filer"] }, { "msgid": "Skip this file", "msgstr": ["Hoppa över den här filen"] }, { "msgid": "Submit name", "msgstr": ["Skicka namn"] }, { "msgid": "Undo", "msgstr": ["Ångra"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Ladda upp lite innehåll eller synkronisera med dina enheter!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["När en inkommande mapp väljs kommer eventuella konflikterande filer i den också att skrivas över."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["När en inkommande mapp väljs skrivs innehållet in i den befintliga mappen och en rekursiv konfliktlösning utförs."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["Vilka filer vill du behålla?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Du är för närvarande identifierad som {nickname}."] }, { "msgid": "You are currently not identified.", "msgstr": ["Du är för närvarande inte identifierad."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Du kan inte lämna namnet tomt."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["Du måste välja minst en konfliktlösning"] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["Du måste välja minst en version av varje fil för att fortsätta."] }] }, { "language": "tr", "translations": [{ "msgid": '"{char}" is not allowed inside a folder name.', "msgstr": ['"{char}" karakteri bir klasör adında kullanılamaz.'] }, { "msgid": '"{char}" is not allowed inside a name.', "msgstr": ['Bir ad içinde "{char}" karakteri kullanılamaz.'] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['"{extension}" adına izin verilmiyor.'] }, { "msgid": '"{segment}" is a reserved name and not allowed for folder names.', "msgstr": ['"{segment}" adı sistem için ayrılmış olduğundan klasör adlarında kullanılamaz.'] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['"{segment}" adı sistem için ayrılmış olduğundan kullanılamaz.'] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%n dosya çakışıyor", "%n dosya çakışıyor"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["{dirname} içindeki %n dosya çakışıyor", "{dirname} içindeki %n dosya çakışıyor"] }, { "msgid": "All files", "msgstr": ["Tüm dosyalar"] }, { "msgid": "Cancel", "msgstr": ["İptal"] }, { "msgid": "Cancel the entire operation", "msgstr": ["Tüm işlemi iptal et"] }, { "msgid": "Choose", "msgstr": ["Seçin"] }, { "msgid": "Choose {file}", "msgstr": ["{file} seçin"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["%n dosya seçin", "%n dosya seçin"] }, { "msgid": "Confirm", "msgstr": ["Onayla"] }, { "msgid": "Continue", "msgstr": ["İlerle"] }, { "msgid": "Copy", "msgstr": ["Kopyala"] }, { "msgid": "Copy to {target}", "msgstr": ["{target} üzerine kopyala"] }, { "msgid": "Could not create the new folder", "msgstr": ["Yeni klasör oluşturulamadı"] }, { "msgid": "Could not load files settings", "msgstr": ["Dosyalar uygulamasının ayarları yüklenemedi"] }, { "msgid": "Could not load files views", "msgstr": ["Dosyalar uygulamasının görünümleri yüklenemedi"] }, { "msgid": "Create directory", "msgstr": ["Klasör oluştur"] }, { "msgid": "Current view selector", "msgstr": ["Geçerli görünüm seçici"] }, { "msgid": "Enter your name", "msgstr": ["Adınızı yazın"] }, { "msgid": "Existing version", "msgstr": ["Var olan sürüm"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Takma ad ayarlanamadı."] }, { "msgid": "Favorites", "msgstr": ["Sık kullanılanlar"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Sık kullanılan olarak seçtiğiniz dosyalar burada görüntülenir."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Son zamanlarda değiştirdiğiniz dosya ve klasörler burada görüntülenir."] }, { "msgid": "Filter file list", "msgstr": ["Dosya listesini süz"] }, { "msgid": 'Folder names must not end with "{extension}".', "msgstr": ['Klasör adları "{extension}" ile bitemez.'] }, { "msgid": "Guest identification", "msgstr": ["Konuk kimliği"] }, { "msgid": "Home", "msgstr": ["Giriş"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["İki sürümü de seçerseniz, gelen dosyanın adına bir sayı eklenir."] }, { "msgid": "Invalid folder name.", "msgstr": ["Klasör adı geçersiz."] }, { "msgid": "Invalid name.", "msgstr": ["Ad geçersiz."] }, { "msgid": "Last modified date unknown", "msgstr": ["Son değiştirilme tarihi bilinmiyor."] }, { "msgid": "Modified", "msgstr": ["Değiştirilme"] }, { "msgid": "Move", "msgstr": ["Taşı"] }, { "msgid": "Move to {target}", "msgstr": ["{target} üzerine taşı"] }, { "msgid": "Name", "msgstr": ["Ad"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Adlar en fazla 64 karakter uzunluğunda olabilir."] }, { "msgid": "Names must not be empty.", "msgstr": ["Ad boş olamaz."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['Ad "{extension}" ile bitemez.'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Ad nokta karakteri ile başlayamaz."] }, { "msgid": "New", "msgstr": ["Yeni"] }, { "msgid": "New folder", "msgstr": ["Yeni klasör"] }, { "msgid": "New folder name", "msgstr": ["Yeni klasör adı"] }, { "msgid": "New version", "msgstr": ["Yeni sürüm"] }, { "msgid": "No files in here", "msgstr": ["Burada herhangi bir dosya yok"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Süzgece uyan bir dosya bulunamadı."] }, { "msgid": "No matching files", "msgstr": ["Eşleşen bir dosya yok"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Ad en az 2 karakter uzunluğunda olmalıdır."] }, { "msgid": "Recent", "msgstr": ["Son kullanılanlar"] }, { "msgid": "Select all checkboxes", "msgstr": ["Tüm kutuları işaretle"] }, { "msgid": "Select all entries", "msgstr": ["Tüm kayıtları seç"] }, { "msgid": "Select all existing files", "msgstr": ["Tüm var olan dosyaları seç"] }, { "msgid": "Select all new files", "msgstr": ["Tüm yeni dosyaları seç"] }, { "msgid": "Select entry", "msgstr": ["Kaydı seç"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["{nodename} satırını seçin"] }, { "msgid": "Size", "msgstr": ["Boyut"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["%n dosyayı atla", "%n dosyayı atla"] }, { "msgid": "Skip this file", "msgstr": ["Bu dosyayı atla"] }, { "msgid": "Submit name", "msgstr": ["Adı gönder"] }, { "msgid": "Undo", "msgstr": ["Geri al"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Bazı içerikler yükleyin ya da aygıtlarınızla eşitleyin!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["Bir gelen klasör seçildiğinde, içindeki çakışan dosyaların da üzerine yazılır."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["Bir gelen klasör seçildiğinde, içerik var olan klasöre yazılır ve alt klasörlerle bir çakışma çözümü uygulanır."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["Hangi dosyaları tutmak istiyorsunuz?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["{nickname} olarak tanınıyorsunuz."] }, { "msgid": "You are currently not identified.", "msgstr": ["Henüz kendinizi tanıtmadınız."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Ad boş bırakılamaz."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["En az bir çakışma çözümü seçmelisiniz"] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["İlerlemek için her dosaynın en az bir sürümünü seçmelisiniz."] }] }, { "language": "uk", "translations": [{ "msgid": '"{char}" is not allowed inside a folder name.', "msgstr": ["{char} не дозволено всередині назви каталогу."] }, { "msgid": '"{char}" is not allowed inside a name.', "msgstr": ['"{char}" не дозволено всередині імени.'] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": [`"{extension}" недозволене ім'я.`] }, { "msgid": '"{segment}" is a reserved name and not allowed for folder names.', "msgstr": ["{segment} є зарезервованим ім'ям і не дозволено для назви каталогу."] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": [`"{segment}" зарезервоване ім'я і не дозволено для використання.`] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%n конфлікт файлів", "%n конфлікти файлів", "%n конфліктів файлів", "%n конфліктів файлів"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["%n конфлікт файлів у каталозі {dirname}", "%n конфлікти файлів у каталозі {dirname}", "%n конфліктів файлів у каталозі {dirname}", "%n конфліктів файлів у каталозі {dirname}"] }, { "msgid": "All files", "msgstr": ["Всі файли"] }, { "msgid": "Cancel", "msgstr": ["Скасувати"] }, { "msgid": "Cancel the entire operation", "msgstr": ["Скасувати всю операцію"] }, { "msgid": "Choose", "msgstr": ["Вибрати"] }, { "msgid": "Choose {file}", "msgstr": ["Вибрати {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Вибрати %n файл", "Вибрати %n файли", "Вибрати %n файлів", "Вибрати %n файлів"] }, { "msgid": "Confirm", "msgstr": ["Підтвердити"] }, { "msgid": "Continue", "msgstr": ["Продовжити"] }, { "msgid": "Copy", "msgstr": ["Копіювати"] }, { "msgid": "Copy to {target}", "msgstr": ["Копіювати до {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Не вдалося створити новий каталог"] }, { "msgid": "Could not load files settings", "msgstr": ["Не вдалося завантажити налаштування файлів"] }, { "msgid": "Could not load files views", "msgstr": ["Не вдалося завантажити подання файлів"] }, { "msgid": "Create directory", "msgstr": ["Створити каталог"] }, { "msgid": "Current view selector", "msgstr": ["Вибір подання"] }, { "msgid": "Enter your name", "msgstr": ["Зазначте ваше ім'я"] }, { "msgid": "Existing version", "msgstr": ["Наявна версія"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Не вдалося встановити псевдо."] }, { "msgid": "Favorites", "msgstr": ["Із зірочкою"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Тут показуватимуться файли та каталоги, які ви позначите зірочкою."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Тут показуватимуться файли та каталоги, які було нещодавно змінено."] }, { "msgid": "Filter file list", "msgstr": ["Фільтрувати список файлів"] }, { "msgid": 'Folder names must not end with "{extension}".', "msgstr": [`Ім'я каталогу не може закінчуватися на "{extension}".`] }, { "msgid": "Guest identification", "msgstr": ["Ім'я для гостя"] }, { "msgid": "Home", "msgstr": ["Домівка"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["Якщо вибрати обидві версії, до назви вхідного файлу буде додано цифру. "] }, { "msgid": "Invalid folder name.", "msgstr": ["Недійсне ім'я каталогу."] }, { "msgid": "Invalid name.", "msgstr": ["Недійсне ім'я."] }, { "msgid": "Last modified date unknown", "msgstr": ["Дата останньої зміни невідома"] }, { "msgid": "Modified", "msgstr": ["Змінено"] }, { "msgid": "Move", "msgstr": ["Перемістити"] }, { "msgid": "Move to {target}", "msgstr": ["Перемістити до {target}"] }, { "msgid": "Name", "msgstr": ["Ім'я"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Імена мають мати довжину не більше 64 символів."] }, { "msgid": "Names must not be empty.", "msgstr": ["Ім'я не може бути порожнє."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": [`Ім'я не може закінчуватися на "{extension}".`] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Ім'я не може починатися з крапки."] }, { "msgid": "New", "msgstr": ["Новий"] }, { "msgid": "New folder", "msgstr": ["Новий каталог"] }, { "msgid": "New folder name", "msgstr": ["Ім'я нового каталогу"] }, { "msgid": "New version", "msgstr": ["Нова версія"] }, { "msgid": "No files in here", "msgstr": ["Тут відсутні файли"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Відсутні збіги за фільтром."] }, { "msgid": "No matching files", "msgstr": ["Відсутні збіги файлів."] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Зазначте ім'я довжиною не менше 2 символів"] }, { "msgid": "Recent", "msgstr": ["Останні"] }, { "msgid": "Select all checkboxes", "msgstr": ["Вибрати всі прапорці"] }, { "msgid": "Select all entries", "msgstr": ["Вибрати всі записи"] }, { "msgid": "Select all existing files", "msgstr": ["Вибрати всі наявні файли"] }, { "msgid": "Select all new files", "msgstr": ["Вибрати всі нові файли"] }, { "msgid": "Select entry", "msgstr": ["Вибрати запис"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Вибрати рядок для {nodename}"] }, { "msgid": "Size", "msgstr": ["Розмір"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["Пропустити %n файл", "Пропустити %n файли", "Пропустити %n файлів", "Пропустити %n файлів"] }, { "msgid": "Skip this file", "msgstr": ["Пропустити цей файл"] }, { "msgid": "Submit name", "msgstr": ["Встановити ім'я"] }, { "msgid": "Undo", "msgstr": ["Повернути"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Завантажте вміст або синхронізуйте з вашим пристроєм!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["Коли вибрано вхідний каталог, будь-які файли з конфліктами буде також перезаписано."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["Коли вибрано вхідний каталог, вміст буде записано до існуючого каталогу, а також виконано вирішення конфліктів всередині каталогу."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["Які файли залишити?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Вас визначено як {nickname}."] }, { "msgid": "You are currently not identified.", "msgstr": ["Вас не ідентифіковано."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Потрібно зазначити ім'я."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["Треб вибрати щонайменше одне рішення конфлікту"] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["Треба вибрати щонайменше одну версію кожного файлу, щоби продовжити."] }] }, { "language": "uz", "translations": [{ "msgid": '"{char}" is not allowed inside a name.', "msgstr": ['Nom ichida "{char}" ga ruxsat berilmagan.'] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['"{extension}" ruxsat etilgan nom emas.'] }, { "msgid": '"{name}" is an invalid folder name.', "msgstr": ['"{name}" jild nomi yaroqsiz.'] }, { "msgid": '"{name}" is not an allowed folder name', "msgstr": ['"{name}" ruxsat etilgan jild nomi emas'] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['"{segment}" - zaxiralangan nom va ruxsat berilmaydi.'] }, { "msgid": '"/" is not allowed inside a folder name.', "msgstr": ['"/" papka nomi ichida ruxsat berilmaydi.'] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%n fayl ziddiyatli"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["{dirname} da %n fayl ziddiyati"] }, { "msgid": "All files", "msgstr": ["Barcha fayllar"] }, { "msgid": "Cancel", "msgstr": ["Bekor qilish"] }, { "msgid": "Cancel the entire operation", "msgstr": ["Butun operatsiyani bekor qiling"] }, { "msgid": "Choose", "msgstr": ["Tanlang"] }, { "msgid": "Choose {file}", "msgstr": ["Tanlang {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Tanlang %n faylni"] }, { "msgid": "Confirm", "msgstr": ["Tasdiqlang"] }, { "msgid": "Continue", "msgstr": ["Davom eting"] }, { "msgid": "Copy", "msgstr": ["Nusxa"] }, { "msgid": "Copy to {target}", "msgstr": [" {target} ga nusxa"] }, { "msgid": "Could not create the new folder", "msgstr": ["Yangi jild yaratib bo‘lmadi"] }, { "msgid": "Could not load files settings", "msgstr": ["Fayl sozlamalari yuklanmadi"] }, { "msgid": "Could not load files views", "msgstr": ["Fayllarni koʻrishni yuklab boʻlmadi"] }, { "msgid": "Create directory", "msgstr": ["Katalog yaratish"] }, { "msgid": "Current view selector", "msgstr": ["Joriy ko'rinish selektori"] }, { "msgid": "Enter your name", "msgstr": ["Ismingizni kiriting"] }, { "msgid": "Existing version", "msgstr": ["Mavjud versiya"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Taxallusni o‘rnatib bo‘lmadi."] }, { "msgid": "Favorites", "msgstr": ["Tanlanganlar"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Tanlangan deb belgilagan fayl va papkalar shu yerda koʻrinadi."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Siz yaqinda oʻzgartirgan fayl va papkalar shu yerda koʻrinadi."] }, { "msgid": "Filter file list", "msgstr": ["Fayl ro'yxatini filtrlash"] }, { "msgid": "Folder name cannot be empty.", "msgstr": ["Jild nomi boʻsh boʻlishi mumkin emas."] }, { "msgid": "Guest identification", "msgstr": ["Foydalanuvchini identifikatsiyalash"] }, { "msgid": "Home", "msgstr": ["Uy"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["Agar siz ikkala versiyani tanlasangiz, kiruvchi fayl nomiga qo'shilgan raqamga ega bo'ladi."] }, { "msgid": "Invalid name.", "msgstr": ["Nomi noto‘g‘ri."] }, { "msgid": "Last modified date unknown", "msgstr": ["Oxirgi tahrirlangan sana noma'lum"] }, { "msgid": "Modified", "msgstr": ["Modifikatsiyalangan"] }, { "msgid": "Move", "msgstr": ["Ko'chirish"] }, { "msgid": "Move to {target}", "msgstr": [" {target} ga ko'chirish"] }, { "msgid": "Name", "msgstr": ["Nomi"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Ismlar ko'pi bilan 64 ta belgidan iborat bo'lishi mumkin."] }, { "msgid": "Names must not be empty.", "msgstr": ["Ismlar bo'sh bo'lmasligi kerak."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['Ismlar "{extension}" bilan tugamasligi kerak.'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Ismlar nuqta bilan boshlanmasligi kerak."] }, { "msgid": "New", "msgstr": ["Yangi"] }, { "msgid": "New folder", "msgstr": ["Yangi jild"] }, { "msgid": "New folder name", "msgstr": ["Yangi jild nomi"] }, { "msgid": "New version", "msgstr": ["Yangi versiya"] }, { "msgid": "No files in here", "msgstr": ["Fayl mavjud emas"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Filtringizga mos keladigan fayl topilmadi."] }, { "msgid": "No matching files", "msgstr": ["Mos fayllar yo'q"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Kamida 2 ta belgidan iborat nom kiriting."] }, { "msgid": "Recent", "msgstr": ["Yaqinda"] }, { "msgid": "Select all checkboxes", "msgstr": ["Barcha katakchalarni belgilang"] }, { "msgid": "Select all entries", "msgstr": ["Barcha yozuvlarni tanlang"] }, { "msgid": "Select all existing files", "msgstr": ["Barcha mavjud fayllarni tanlang"] }, { "msgid": "Select all new files", "msgstr": ["Barcha yangi fayllarni tanlang"] }, { "msgid": "Select entry", "msgstr": ["Yozuvni tanlang"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["{nodename} uchun qatorni tanlang"] }, { "msgid": "Size", "msgstr": ["O`lcham"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["%n faylni oʻtkazib yuborish"] }, { "msgid": "Skip this file", "msgstr": ["Ushbu faylni o'tkazib yuboring"] }, { "msgid": "Submit name", "msgstr": ["Ismni tasdiqlang"] }, { "msgid": "Undo", "msgstr": ["Bekor qilish"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Qurilmangizga ba'zi kontentni yuklang yoki sinxronlang!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["Kiruvchi papka tanlanganda, undagi har qanday ziddiyatli fayllar ham ustiga yoziladi."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["Kiruvchi papka tanlanganda, kontent mavjud jildga yoziladi va nizolarni rekursiv hal qilish amalga oshiriladi."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["Qaysi fayllarni saqlamoqchisiz?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Siz hozirda {nickname} sifatida aniqlangansiz."] }, { "msgid": "You are currently not identified.", "msgstr": ["Siz hozirda identifikatsiyadan o'tmagansiz"] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Ism katagini bo'sh qoldirib bo'lmaydi."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["Siz kamida bitta mojaro yechimini tanlashingiz kerak"] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["Davom etish uchun har bir faylning kamida bitta versiyasini tanlashingiz kerak."] }] }, { "language": "vi", "translations": [{ "msgid": '"{name}" is an invalid folder name.', "msgstr": ['"{name}" là tên thư mục không hợp lệ.'] }, { "msgid": '"{name}" is not an allowed folder name', "msgstr": ['"1{name}"không phải là tên thư mục được cho phép'] }, { "msgid": '"/" is not allowed inside a folder name.', "msgstr": ['"/"không được phép đặt trong tên thư mục.'] }, { "msgid": "All files", "msgstr": ["Tất cả tệp"] }, { "msgid": "Choose", "msgstr": ["Chọn"] }, { "msgid": "Choose {file}", "msgstr": ["Chọn {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Chọn %n tệp"] }, { "msgid": "Copy", "msgstr": ["Sao chép"] }, { "msgid": "Copy to {target}", "msgstr": ["Sao chép đến {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Không thể tạo thư mục mới"] }, { "msgid": "Could not load files settings", "msgstr": ["Không thể tải tập tin cài đặt"] }, { "msgid": "Could not load files views", "msgstr": ["Không thể tải xuống tệp xem"] }, { "msgid": "Create directory", "msgstr": ["Tạo thư mục"] }, { "msgid": "Current view selector", "msgstr": ["Hiện tại chế độ xem của bộ chọn"] }, { "msgid": "Favorites", "msgstr": ["Yêu cầu thích"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Các tập tin và thư mục bạn đánh dấu yêu thích sẽ hiển thị ở đây."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Các tập tin và thư mục bạn sửa đổi gần đây sẽ hiển thị ở đây."] }, { "msgid": "Filter file list", "msgstr": ["Filter list file"] }, { "msgid": "Folder name cannot be empty.", "msgstr": ["Thư mục tên không được để trống."] }, { "msgid": "Home", "msgstr": ["Trang chủ"] }, { "msgid": "Modified", "msgstr": ["Đã sửa đổi"] }, { "msgid": "Move", "msgstr": ["Di chuyển"] }, { "msgid": "Move to {target}", "msgstr": ["Di chuyển đến{target}"] }, { "msgid": "Name", "msgstr": ["Tên"] }, { "msgid": "New", "msgstr": ["Mới"] }, { "msgid": "New folder", "msgstr": ["New thư mục"] }, { "msgid": "New folder name", "msgstr": ["New thư mục tên"] }, { "msgid": "No files in here", "msgstr": ["No file at here"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Không tìm thấy tệp nào phù hợp với bộ lọc của bạn."] }, { "msgid": "No matching files", "msgstr": ["No file phù hợp"] }, { "msgid": "Recent", "msgstr": ["Gần đây"] }, { "msgid": "Select all entries", "msgstr": ["Choose all items"] }, { "msgid": "Select entry", "msgstr": ["Chọn mục nhập"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Choose hang cho{nodename}"] }, { "msgid": "Size", "msgstr": ["Kích cỡ"] }, { "msgid": "Undo", "msgstr": ["Hoàn tác"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Tải lên một số nội dung hoặc đồng bộ hóa với thiết bị của bạn!"] }] }, { "language": "zh_CN", "translations": [{ "msgid": '"{name}" is an invalid folder name.', "msgstr": ["“{name}” 是无效的文件夹名称。"] }, { "msgid": '"{name}" is not an allowed folder name', "msgstr": ["“{name}” 不是允许的文件夹名称"] }, { "msgid": '"/" is not allowed inside a folder name.', "msgstr": ["文件夹名称中不允许包含 “/”。"] }, { "msgid": "All files", "msgstr": ["所有文件"] }, { "msgid": "Choose", "msgstr": ["选择"] }, { "msgid": "Choose {file}", "msgstr": ["选择 {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["选择 %n 个文件"] }, { "msgid": "Copy", "msgstr": ["复制"] }, { "msgid": "Copy to {target}", "msgstr": ["复制到 {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["无法创建新文件夹"] }, { "msgid": "Could not load files settings", "msgstr": ["无法加载文件设置"] }, { "msgid": "Could not load files views", "msgstr": ["无法加载文件视图"] }, { "msgid": "Create directory", "msgstr": ["创建目录"] }, { "msgid": "Current view selector", "msgstr": ["当前视图选择器"] }, { "msgid": "Favorites", "msgstr": ["最爱"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["您标记为最爱的文件与文件夹会显示在这里"] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["您最近修改的文件与文件夹会显示在这里"] }, { "msgid": "Filter file list", "msgstr": ["过滤文件列表"] }, { "msgid": "Folder name cannot be empty.", "msgstr": ["文件夹名称不能为空。"] }, { "msgid": "Home", "msgstr": ["主目录"] }, { "msgid": "Modified", "msgstr": ["已修改"] }, { "msgid": "Move", "msgstr": ["移动"] }, { "msgid": "Move to {target}", "msgstr": ["移动至 {target}"] }, { "msgid": "Name", "msgstr": ["名称"] }, { "msgid": "New", "msgstr": ["新建"] }, { "msgid": "New folder", "msgstr": ["新文件夹"] }, { "msgid": "New folder name", "msgstr": ["新文件夹名称"] }, { "msgid": "No files in here", "msgstr": ["此处无文件"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["找不到符合您过滤条件的文件"] }, { "msgid": "No matching files", "msgstr": ["无符合的文件"] }, { "msgid": "Recent", "msgstr": ["最近"] }, { "msgid": "Select all entries", "msgstr": ["选择所有条目"] }, { "msgid": "Select entry", "msgstr": ["选择条目"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["选择 {nodename} 的列"] }, { "msgid": "Size", "msgstr": ["大小"] }, { "msgid": "Undo", "msgstr": [" 撤消"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["上传一些项目或与您的设备同步！"] }] }, { "language": "zh_HK", "translations": [{ "msgid": '"{char}" is not allowed inside a name.', "msgstr": ['名稱中不能使用 "{char}"。'] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ["「{extension}」並非允許的名稱。"] }, { "msgid": '"{name}" is an invalid folder name.', "msgstr": ["「{name}」是無效的資料夾名稱。"] }, { "msgid": '"{name}" is not an allowed folder name', "msgstr": ["資料夾名稱「{name}」不符合允許的規範。"] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ["「{segment}」是一個保留名稱，不能使用。"] }, { "msgid": '"/" is not allowed inside a folder name.', "msgstr": ['資料夾名稱中不允許使用 "/"。'] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%n 檔案衝突"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["{dirname} 中有 %n 個檔案衝突"] }, { "msgid": "All files", "msgstr": ["所有檔案"] }, { "msgid": "Cancel", "msgstr": ["取消"] }, { "msgid": "Cancel the entire operation", "msgstr": ["取消整個操作"] }, { "msgid": "Choose", "msgstr": ["選擇"] }, { "msgid": "Choose {file}", "msgstr": ["選擇 {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["選擇 %n 個檔案"] }, { "msgid": "Confirm", "msgstr": ["確認"] }, { "msgid": "Continue", "msgstr": ["繼續"] }, { "msgid": "Copy", "msgstr": ["複製"] }, { "msgid": "Copy to {target}", "msgstr": ["複製到 {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["無法建立新資料夾"] }, { "msgid": "Could not load files settings", "msgstr": ["無法載入檔案設定"] }, { "msgid": "Could not load files views", "msgstr": ["無法載入檔案視圖"] }, { "msgid": "Create directory", "msgstr": ["建立目錄"] }, { "msgid": "Current view selector", "msgstr": ["目前視圖選擇器"] }, { "msgid": "Enter your name", "msgstr": ["輸入您的名字"] }, { "msgid": "Existing version", "msgstr": ["現有的版本"] }, { "msgid": "Failed to set nickname.", "msgstr": ["無法設置暱稱。"] }, { "msgid": "Favorites", "msgstr": ["最愛"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["您標記為最愛的檔案與資料夾將會顯示在此處。"] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["您最近修改的檔案與資料夾將會顯示在此處。"] }, { "msgid": "Filter file list", "msgstr": ["過濾檔案清單"] }, { "msgid": "Folder name cannot be empty.", "msgstr": ["資料夾名稱不能為空。"] }, { "msgid": "Guest identification", "msgstr": ["訪客身份識別"] }, { "msgid": "Home", "msgstr": ["首頁"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["如果您選擇兩個版本，傳入的檔案名稱將會附加一個數字。"] }, { "msgid": "Invalid name.", "msgstr": ["無效的名字。"] }, { "msgid": "Last modified date unknown", "msgstr": ["最後的修改日期不詳"] }, { "msgid": "Modified", "msgstr": ["已修改"] }, { "msgid": "Move", "msgstr": ["移動"] }, { "msgid": "Move to {target}", "msgstr": ["移動至 {target}"] }, { "msgid": "Name", "msgstr": ["名稱"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["名稱長度最多為 64 個字元。"] }, { "msgid": "Names must not be empty.", "msgstr": ["名稱不能為空。"] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ["名稱不得以「{extension}」結尾。"] }, { "msgid": "Names must not start with a dot.", "msgstr": ["名稱不得以點開頭。"] }, { "msgid": "New", "msgstr": ["新"] }, { "msgid": "New folder", "msgstr": ["新資料夾"] }, { "msgid": "New folder name", "msgstr": ["新資料夾名稱"] }, { "msgid": "New version", "msgstr": ["新版本"] }, { "msgid": "No files in here", "msgstr": ["此處無檔案"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["找不到符合您過濾條件的檔案。"] }, { "msgid": "No matching files", "msgstr": ["沒有匹配的檔案"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["請輸入至少 2 個字符的名稱。"] }, { "msgid": "Recent", "msgstr": ["最近"] }, { "msgid": "Select all checkboxes", "msgstr": ["選擇所有復選框"] }, { "msgid": "Select all entries", "msgstr": ["選擇所有項目"] }, { "msgid": "Select all existing files", "msgstr": ["選擇所有現有的檔案"] }, { "msgid": "Select all new files", "msgstr": ["選擇所有新檔案"] }, { "msgid": "Select entry", "msgstr": ["選擇項目"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["選擇 {nodename} 的列"] }, { "msgid": "Size", "msgstr": ["大小"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["跳過 %n 個檔案"] }, { "msgid": "Skip this file", "msgstr": ["跳過此檔案"] }, { "msgid": "Submit name", "msgstr": ["遞交名字"] }, { "msgid": "Undo", "msgstr": ["還原"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["上傳一些內容或與您的裝置同步！"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["選取傳入資料夾時，其中任何衝突的檔案也將被覆蓋。"] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["當選取傳入資料夾時，內容將寫入現有資料夾，並執行遞歸衝突解決。"] }, { "msgid": "Which files do you want to keep?", "msgstr": ["你想保留哪些檔案？"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["您目前被識別為 {nickname}。"] }, { "msgid": "You are currently not identified.", "msgstr": ["您目前尚未被識別。"] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["名稱不能留空。"] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["你需要選擇至少一種衝突解決方案。"] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["您必須選擇每個文件的至少一個版本才能繼續。"] }] }, { "language": "zh_TW", "translations": [{ "msgid": '"{name}" is an invalid file name.', "msgstr": ["「{name}」是無效的檔案名稱。"] }, { "msgid": '"{name}" is not an allowed filetype', "msgstr": ["「{name}」並非允許的檔案類型"] }, { "msgid": '"/" is not allowed inside a file name.', "msgstr": ["檔案名稱中不允許使用「/」。"] }, { "msgid": "All files", "msgstr": ["所有檔案"] }, { "msgid": "Choose", "msgstr": ["選擇"] }, { "msgid": "Choose {file}", "msgstr": ["選擇 {file}"] }, { "msgid": "Copy", "msgstr": ["複製"] }, { "msgid": "Copy to {target}", "msgstr": ["複製到 {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["無法建立新資料夾"] }, { "msgid": "Create directory", "msgstr": ["建立目錄"] }, { "msgid": "Current view selector", "msgstr": ["目前檢視選取器"] }, { "msgid": "Favorites", "msgstr": ["最愛"] }, { "msgid": "File name cannot be empty.", "msgstr": ["檔案名稱不能為空。"] }, { "msgid": "Filepicker sections", "msgstr": ["檔案挑選器選取"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["您標記為最愛的檔案與資料夾將會顯示在此處。"] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["您最近修改的檔案與資料夾將會顯示在此處。"] }, { "msgid": "Filter file list", "msgstr": ["過濾檔案清單"] }, { "msgid": "Home", "msgstr": ["家"] }, { "msgid": "Mime type {mime}", "msgstr": ["Mime type {mime}"] }, { "msgid": "Modified", "msgstr": ["已修改"] }, { "msgid": "Move", "msgstr": ["移動"] }, { "msgid": "Move to {target}", "msgstr": ["移動至 {target}"] }, { "msgid": "Name", "msgstr": ["名稱"] }, { "msgid": "New", "msgstr": ["新"] }, { "msgid": "New folder", "msgstr": ["新資料夾"] }, { "msgid": "New folder name", "msgstr": ["新資料夾名稱"] }, { "msgid": "No files in here", "msgstr": ["此處無檔案"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["找不到符合您過濾條件的檔案。"] }, { "msgid": "No matching files", "msgstr": ["無符合的檔案"] }, { "msgid": "Recent", "msgstr": ["最近"] }, { "msgid": "Select all entries", "msgstr": ["選取所有條目"] }, { "msgid": "Select entry", "msgstr": ["選取條目"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["選取 {nodename} 的列"] }, { "msgid": "Size", "msgstr": ["大小"] }, { "msgid": "Undo", "msgstr": ["復原"] }, { "msgid": "unknown", "msgstr": ["未知"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["上傳一些內容或與您的裝置同步"] }] }]) {
  const { language, translations } = data;
  const bundle = {
    headers: {},
    translations: {
      "": Object.fromEntries(translations.map((translation) => [translation.msgid, translation]))
    }
  };
  gtBuilder.addTranslation(language, bundle);
}
const gt = gtBuilder.build();
gt.ngettext.bind(gt);
gt.gettext.bind(gt);
/*!
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
getLoggerBuilder().setApp("@nextcloud/dialogs").detectLogLevel().build();
const TOAST_ARIA_LIVE_OFF = "off";
const TOAST_ARIA_LIVE_POLITE = "polite";
const TOAST_ARIA_LIVE_ASSERTIVE = "assertive";
var ToastAriaLive = /* @__PURE__ */ ((ToastAriaLive2) => {
  ToastAriaLive2[ToastAriaLive2["OFF"] = TOAST_ARIA_LIVE_OFF] = "OFF";
  ToastAriaLive2[ToastAriaLive2["POLITE"] = TOAST_ARIA_LIVE_POLITE] = "POLITE";
  ToastAriaLive2[ToastAriaLive2["ASSERTIVE"] = TOAST_ARIA_LIVE_ASSERTIVE] = "ASSERTIVE";
  return ToastAriaLive2;
})(ToastAriaLive || {});
const TOAST_DEFAULT_TIMEOUT = 7e3;
function showMessage(data, options) {
  options = {
    timeout: TOAST_DEFAULT_TIMEOUT,
    isHTML: false,
    type: void 0,
    // An undefined selector defaults to the body element
    selector: void 0,
    onRemove: () => {
    },
    onClick: void 0,
    close: true,
    ...options
  };
  if (typeof data === "string" && !options.isHTML) {
    const element = document.createElement("div");
    element.innerHTML = data;
    data = element.innerText;
  }
  let classes = options.type ?? "";
  if (typeof options.onClick === "function") {
    classes += " toast-with-click ";
  }
  const isNode = data instanceof Node;
  let ariaLive = ToastAriaLive.POLITE;
  if (options.ariaLive) {
    ariaLive = options.ariaLive;
  } else if (options.type === "toast-error" || options.type === "toast-undo") {
    ariaLive = ToastAriaLive.ASSERTIVE;
  }
  const toast = Toastify({
    [!isNode ? "text" : "node"]: data,
    duration: options.timeout,
    callback: options.onRemove,
    onClick: options.onClick,
    close: options.close,
    gravity: "top",
    selector: options.selector,
    position: "right",
    backgroundColor: "",
    className: "dialogs " + classes,
    escapeMarkup: !options.isHTML,
    ariaLive
  });
  toast.showToast();
  return toast;
}
function showError(text, options) {
  return showMessage(text, {
    ...options,
    type: "toast-error"
    /* ERROR */
  });
}
function showSuccess(text, options) {
  return showMessage(text, {
    ...options,
    type: "toast-success"
    /* SUCCESS */
  });
}
const useListsStore = defineStore("lists", () => {
  const lists = ref([]);
  const currentListId = ref(null);
  const loading = ref(false);
  const currentList = computed(
    () => lists.value.find((l) => l.id === currentListId.value) ?? null
  );
  const ownedLists = computed(
    () => lists.value.filter((l) => l.isOwner)
  );
  const sharedLists = computed(
    () => lists.value.filter((l) => !l.isOwner)
  );
  async function fetchAll() {
    loading.value = true;
    try {
      const response = await api.lists.getAll();
      lists.value = response.data.ocs.data;
    } catch (e) {
      showError("Failed to load shopping lists");
      console.error(e);
    } finally {
      loading.value = false;
    }
  }
  async function create(title) {
    try {
      const response = await api.lists.create(title);
      const newList = response.data.ocs.data;
      lists.value.unshift(newList);
      currentListId.value = newList.id;
      return newList;
    } catch (e) {
      showError("Failed to create list");
      console.error(e);
    }
  }
  async function update(id, title) {
    try {
      const response = await api.lists.update(id, title);
      const updated = response.data.ocs.data;
      const index2 = lists.value.findIndex((l) => l.id === id);
      if (index2 !== -1) {
        lists.value[index2] = updated;
      }
      return updated;
    } catch (e) {
      showError("Failed to update list");
      console.error(e);
    }
  }
  async function remove(id) {
    try {
      await api.lists.delete(id);
      lists.value = lists.value.filter((l) => l.id !== id);
      if (currentListId.value === id) {
        currentListId.value = lists.value[0]?.id ?? null;
      }
    } catch (e) {
      showError("Failed to delete list");
      console.error(e);
    }
  }
  function selectList(id) {
    currentListId.value = id;
  }
  return {
    lists,
    currentListId,
    loading,
    currentList,
    ownedLists,
    sharedLists,
    fetchAll,
    create,
    update,
    remove,
    selectList
  };
});
const useShopAreasStore = defineStore("shopAreas", () => {
  const areasByList = ref({});
  async function fetchByList(listId) {
    try {
      const response = await api.areas.getForList(listId);
      areasByList.value[listId] = response.data.ocs.data;
    } catch (e) {
      showError("Failed to load shop areas");
      console.error(e);
    }
  }
  async function create(listId, name, color, keywords) {
    try {
      const response = await api.areas.create(listId, name, color, keywords);
      const newArea = response.data.ocs.data;
      if (!areasByList.value[listId]) {
        areasByList.value[listId] = [];
      }
      areasByList.value[listId].push(newArea);
      return newArea;
    } catch (e) {
      showError("Failed to create shop area");
      console.error(e);
    }
  }
  async function update(listId, id, data) {
    try {
      const response = await api.areas.update(listId, id, data);
      const updated = response.data.ocs.data;
      const areas = areasByList.value[listId];
      if (areas) {
        const idx = areas.findIndex((a) => a.id === id);
        if (idx !== -1) {
          areas[idx] = updated;
        }
      }
    } catch (e) {
      showError("Failed to update shop area");
      console.error(e);
    }
  }
  async function remove(listId, id) {
    try {
      await api.areas.delete(listId, id);
      if (areasByList.value[listId]) {
        areasByList.value[listId] = areasByList.value[listId].filter((a) => a.id !== id);
      }
    } catch (e) {
      showError("Failed to delete shop area");
      console.error(e);
    }
  }
  return {
    areasByList,
    fetchByList,
    create,
    update,
    remove
  };
});
const UNIT_ALIASES = {
  cups: "cup",
  teaspoons: "teaspoon",
  tsp: "teaspoon",
  tablespoons: "tablespoon",
  tbsp: "tablespoon",
  ounces: "ounce",
  oz: "ounce",
  pounds: "pound",
  lbs: "pound",
  lb: "pound",
  grams: "gram",
  g: "gram",
  kilograms: "kilogram",
  kg: "kilogram",
  milliliters: "milliliter",
  ml: "milliliter",
  liters: "liter",
  l: "liter",
  cans: "can",
  bottles: "bottle",
  slices: "slice",
  pieces: "piece",
  cloves: "clove",
  stalks: "stalk",
  sprigs: "sprig",
  bags: "bag",
  packs: "pack",
  packets: "pack",
  pinches: "pinch",
  bunches: "bunch",
  heads: "head"
};
function canonicalUnit(unit) {
  const lower = unit.toLowerCase();
  return UNIT_ALIASES[lower] ?? lower;
}
const SINGULAR_EXCEPTIONS = /* @__PURE__ */ new Set([
  "asparagus",
  "hummus",
  "couscous",
  "cheese",
  "rice",
  "juice",
  "lettuce",
  "sauce",
  "produce",
  "grease",
  "mousse"
]);
function singularize(word) {
  const lower = word.toLowerCase();
  if (lower.length <= 2 || SINGULAR_EXCEPTIONS.has(lower)) return lower;
  if (lower.endsWith("ies")) return lower.slice(0, -3) + "y";
  if (lower.endsWith("ves")) {
    const stem = lower.slice(0, -3);
    if (stem.endsWith("l") || stem.endsWith("a") || stem.endsWith("oa")) return stem + "f";
    return stem + "fe";
  }
  if (lower.endsWith("shes") || lower.endsWith("ches") || lower.endsWith("sses") || lower.endsWith("xes") || lower.endsWith("zes")) {
    return lower.slice(0, -2);
  }
  if (lower.endsWith("oes") && lower !== "shoes") return lower.slice(0, -2);
  if (lower.endsWith("s") && !lower.endsWith("ss") && !lower.endsWith("us")) return lower.slice(0, -1);
  return lower;
}
function pluralizeName(name) {
  const words = name.split(" ");
  const last = words[words.length - 1];
  const lower = last.toLowerCase();
  if (lower.length <= 1 || SINGULAR_EXCEPTIONS.has(lower)) return name;
  if (singularize(lower) !== lower) return name;
  let plural;
  if (lower.endsWith("y") && !/[aeiou]/.test(lower.charAt(lower.length - 2))) {
    plural = last.slice(0, -1) + "ies";
  } else if (lower.endsWith("fe")) {
    plural = last.slice(0, -2) + "ves";
  } else if (lower.endsWith("f") && !lower.endsWith("ff")) {
    plural = last.slice(0, -1) + "ves";
  } else if (/(?:ch|sh|ss|x|z|o)$/.test(lower)) {
    plural = last + "es";
  } else {
    plural = last + "s";
  }
  words[words.length - 1] = plural;
  return words.join(" ");
}
function normalizeName(name) {
  const cleaned = name.toLowerCase().trim().replace(/\s*\(.*?\)\s*/g, " ").replace(/,\s.*$/, "").replace(/\s+/g, " ").trim();
  return cleaned.split(" ").map(singularize).join(" ");
}
function findMatchingItem(items, name) {
  const normalized = normalizeName(name);
  return items.find((item) => !item.checked && normalizeName(item.name) === normalized);
}
function evalNumber(s) {
  const mixed = s.match(/^(\d+)\s+(\d+)\/(\d+)$/);
  if (mixed) return parseInt(mixed[1]) + parseInt(mixed[2]) / parseInt(mixed[3]);
  const frac = s.match(/^(\d+)\/(\d+)$/);
  if (frac) return parseInt(frac[1]) / parseInt(frac[2]);
  const n = parseFloat(s);
  return isNaN(n) ? null : n;
}
function parseQuantity(qty) {
  if (!qty?.trim()) return { number: null, unit: "", raw: qty ?? "" };
  const trimmed = qty.trim();
  const match = trimmed.match(/^(\d+(?:\s+\d+\/\d+|\.\d+|\/\d+)?)\s*(.*)$/);
  if (!match) return { number: null, unit: "", raw: trimmed };
  const number = evalNumber(match[1].trim());
  const unit = match[2].trim().toLowerCase();
  return { number, unit, raw: trimmed };
}
function mergeQuantities(existing, incoming) {
  if (!existing?.trim() && !incoming?.trim()) return "";
  if (!existing?.trim()) return incoming;
  if (!incoming?.trim()) return existing;
  const a = parseQuantity(existing);
  const b = parseQuantity(incoming);
  if (a.number !== null && b.number !== null) {
    if (canonicalUnit(a.unit) === canonicalUnit(b.unit)) {
      const sum = a.number + b.number;
      const formatted = Number.isInteger(sum) ? sum.toString() : parseFloat(sum.toFixed(4)).toString();
      return a.unit ? `${formatted} ${a.unit}` : formatted;
    }
  }
  return `${a.raw} + ${b.raw}`;
}
const useItemsStore = defineStore("items", () => {
  const itemsByList = ref({});
  const loading = ref(false);
  const listsStore = useListsStore();
  const currentItems = computed(() => {
    if (!listsStore.currentListId) return [];
    return itemsByList.value[listsStore.currentListId] ?? [];
  });
  const uncheckedItems = computed(
    () => currentItems.value.filter((i) => !i.checked)
  );
  const checkedItems = computed(
    () => currentItems.value.filter((i) => i.checked)
  );
  const itemsByArea = computed(() => {
    const grouped = { none: [] };
    for (const item of uncheckedItems.value) {
      const key = item.shopAreaId ?? "none";
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(item);
    }
    return grouped;
  });
  async function fetchByList(listId) {
    const isInitialLoad = !(listId in itemsByList.value);
    if (isInitialLoad) {
      loading.value = true;
    }
    try {
      const response = await api.items.getAll(listId);
      itemsByList.value[listId] = response.data.ocs.data;
    } catch (e) {
      showError("Failed to load items");
      console.error(e);
    } finally {
      if (isInitialLoad) {
        loading.value = false;
      }
    }
  }
  async function create(listId, data) {
    try {
      const existingItems = itemsByList.value[listId] ?? [];
      const match = findMatchingItem(existingItems, data.name);
      if (match) {
        const merged = mergeQuantities(match.quantity, data.quantity);
        const updateData = { quantity: merged };
        const oldQty = parseFloat(match.quantity ?? "");
        const newQty = parseFloat(merged);
        if (oldQty <= 1 && newQty > 1) {
          updateData.name = pluralizeName(match.name);
        }
        await api.items.update(listId, match.id, updateData);
        await fetchByList(listId);
        showSuccess(`"${updateData.name ?? match.name}" updated — quantity merged`);
        return;
      }
      await api.items.create(listId, data);
      await fetchByList(listId);
      if (data.areaExplicit) {
        const shopAreasStore = useShopAreasStore();
        await shopAreasStore.fetchByList(listId);
      }
    } catch (e) {
      showError("Failed to add item");
      console.error(e);
    }
  }
  async function update(listId, id, data) {
    try {
      const response = await api.items.update(listId, id, data);
      const updated = response.data.ocs.data;
      const items = itemsByList.value[listId] ?? [];
      const index2 = items.findIndex((i) => i.id === id);
      if (index2 !== -1) {
        items[index2] = updated;
      }
      if (data.areaExplicit) {
        const shopAreasStore = useShopAreasStore();
        await shopAreasStore.fetchByList(listId);
      }
      return updated;
    } catch (e) {
      showError("Failed to update item");
      console.error(e);
    }
  }
  async function toggleCheck(listId, id) {
    const items = itemsByList.value[listId] ?? [];
    const item = items.find((i) => i.id === id);
    if (!item) return;
    const previousState = item.checked;
    item.checked = !item.checked;
    try {
      await api.items.check(listId, id, item.checked);
    } catch (e) {
      item.checked = previousState;
      showError("Failed to update item");
      console.error(e);
    }
  }
  async function remove(listId, id) {
    const items = itemsByList.value[listId] ?? [];
    const index2 = items.findIndex((i) => i.id === id);
    if (index2 === -1) return;
    const removed = items.splice(index2, 1)[0];
    try {
      await api.items.delete(listId, id);
    } catch (e) {
      items.splice(index2, 0, removed);
      showError("Failed to delete item");
      console.error(e);
    }
  }
  async function reorder(listId, sortedIds) {
    try {
      await api.items.reorder(listId, sortedIds);
    } catch (e) {
      showError("Failed to reorder items");
      console.error(e);
    }
  }
  async function clearChecked(listId) {
    try {
      await api.items.clearChecked(listId);
      const items = itemsByList.value[listId] ?? [];
      itemsByList.value[listId] = items.filter((i) => !i.checked);
    } catch (e) {
      showError("Failed to clear checked items");
      console.error(e);
    }
  }
  async function uncheckAll(listId) {
    try {
      await api.items.uncheckAll(listId);
      const items = itemsByList.value[listId] ?? [];
      items.forEach((i) => {
        i.checked = false;
      });
    } catch (e) {
      showError("Failed to uncheck items");
      console.error(e);
    }
  }
  return {
    itemsByList,
    loading,
    currentItems,
    uncheckedItems,
    checkedItems,
    itemsByArea,
    fetchByList,
    create,
    update,
    toggleCheck,
    remove,
    reorder,
    clearChecked,
    uncheckAll
  };
});
const _hoisted_1$5 = {
  key: 0,
  class: "count-bubble"
};
const _hoisted_2$5 = {
  key: 0,
  class: "count-bubble"
};
const _hoisted_3$5 = {
  key: 2,
  class: "sidebar-settings"
};
const listIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3,4H7V8H3V4M9,5V7H21V5H9M3,10H7V14H3V10M9,11V13H21V11H9M3,16H7V20H3V16M9,17V19H21V17H9" fill="currentColor"/></svg>';
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "ListSidebar",
  emits: ["show-settings"],
  setup(__props) {
    const listsStore = useListsStore();
    const itemsStore = useItemsStore();
    const newListText = translate("shopping_list", "New list");
    const renameText = translate("shopping_list", "Rename list");
    const deleteText = translate("shopping_list", "Delete list");
    const sharedText = translate("shopping_list", "Shared with me");
    const emptyName = translate("shopping_list", "No shopping lists");
    const emptyDesc = translate("shopping_list", "Create your first shopping list to get started");
    const settingsText = translate("shopping_list", "Manage Areas");
    function getUncheckedCount(listId) {
      const items = itemsStore.itemsByList[listId] ?? [];
      return items.filter((i) => !i.checked).length;
    }
    async function onNewList() {
      await listsStore.create(translate("shopping_list", "New shopping list"));
    }
    async function onRename(id, name) {
      if (name.trim()) {
        await listsStore.update(id, name.trim());
      }
    }
    async function onDelete(id) {
      await listsStore.remove(id);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createVNode(unref(NcAppNavigationNew), {
          text: unref(newListText),
          onClick: onNewList
        }, null, 8, ["text"]),
        unref(listsStore).ownedLists.length > 0 ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(unref(listsStore).ownedLists, (list) => {
          return openBlock(), createBlock(unref(NcAppNavigationItem), {
            key: list.id,
            name: list.title,
            active: list.id === unref(listsStore).currentListId,
            editable: true,
            "edit-label": unref(renameText),
            onClick: ($event) => unref(listsStore).selectList(list.id),
            "onUpdate:name": (name) => onRename(list.id, name)
          }, {
            counter: withCtx(() => [
              getUncheckedCount(list.id) > 0 ? (openBlock(), createElementBlock("span", _hoisted_1$5, toDisplayString(getUncheckedCount(list.id)), 1)) : createCommentVNode("", true)
            ]),
            actions: withCtx(() => [
              createVNode(unref(NcActionButton), {
                onClick: ($event) => onDelete(list.id)
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(deleteText)), 1)
                ]),
                _: 1
              }, 8, ["onClick"])
            ]),
            _: 2
          }, 1032, ["name", "active", "edit-label", "onClick", "onUpdate:name"]);
        }), 128)) : createCommentVNode("", true),
        unref(listsStore).sharedLists.length > 0 ? (openBlock(), createBlock(unref(NcAppNavigationCaption), {
          key: 1,
          name: unref(sharedText)
        }, null, 8, ["name"])) : createCommentVNode("", true),
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(listsStore).sharedLists, (list) => {
          return openBlock(), createBlock(unref(NcAppNavigationItem), {
            key: list.id,
            name: list.title,
            active: list.id === unref(listsStore).currentListId,
            onClick: ($event) => unref(listsStore).selectList(list.id)
          }, {
            counter: withCtx(() => [
              getUncheckedCount(list.id) > 0 ? (openBlock(), createElementBlock("span", _hoisted_2$5, toDisplayString(getUncheckedCount(list.id)), 1)) : createCommentVNode("", true)
            ]),
            _: 2
          }, 1032, ["name", "active", "onClick"]);
        }), 128)),
        unref(listsStore).currentListId !== null ? (openBlock(), createElementBlock("div", _hoisted_3$5, [
          createBaseVNode("button", {
            class: "sidebar-settings__btn",
            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("show-settings"))
          }, " ⚙ " + toDisplayString(unref(settingsText)), 1)
        ])) : createCommentVNode("", true),
        !unref(listsStore).loading && unref(listsStore).lists.length === 0 ? (openBlock(), createBlock(unref(NcEmptyContent), {
          key: 3,
          name: unref(emptyName),
          description: unref(emptyDesc)
        }, {
          icon: withCtx(() => [
            createVNode(unref(NcIconSvgWrapper), { svg: listIcon })
          ]),
          _: 1
        }, 8, ["name", "description"])) : createCommentVNode("", true)
      ]);
    };
  }
});
const ListSidebar = /* @__PURE__ */ _export_sfc$1(_sfc_main$6, [["__scopeId", "data-v-b6280b45"]]);
const useSharesStore = defineStore("shares", () => {
  const sharesByList = ref({});
  async function fetchByList(listId) {
    try {
      const response = await api.shares.getAll(listId);
      sharesByList.value[listId] = response.data.ocs.data;
    } catch (e) {
      showError("Failed to load shares");
      console.error(e);
    }
  }
  async function create(listId, sharedWith, type, permission) {
    try {
      const response = await api.shares.create(listId, sharedWith, type, permission);
      const newShare = response.data.ocs.data;
      if (!sharesByList.value[listId]) {
        sharesByList.value[listId] = [];
      }
      sharesByList.value[listId].push(newShare);
      return newShare;
    } catch (e) {
      showError("Failed to share list");
      console.error(e);
    }
  }
  async function updatePermission(shareId, permission, listId) {
    try {
      const response = await api.shares.update(shareId, permission);
      const updated = response.data.ocs.data;
      const shares = sharesByList.value[listId] ?? [];
      const index2 = shares.findIndex((s) => s.id === shareId);
      if (index2 !== -1) {
        shares[index2] = updated;
      }
    } catch (e) {
      showError("Failed to update share");
      console.error(e);
    }
  }
  async function remove(shareId, listId) {
    try {
      await api.shares.delete(shareId);
      const shares = sharesByList.value[listId] ?? [];
      sharesByList.value[listId] = shares.filter((s) => s.id !== shareId);
    } catch (e) {
      showError("Failed to remove share");
      console.error(e);
    }
  }
  function getLinkShare(listId) {
    return (sharesByList.value[listId] ?? []).find((s) => s.sharedWithType === 3);
  }
  async function createLinkShare(listId, permission, password, expiresAt) {
    try {
      const response = await api.shares.createLink(listId, permission, password, expiresAt);
      const newShare = response.data.ocs.data;
      if (!sharesByList.value[listId]) {
        sharesByList.value[listId] = [];
      }
      sharesByList.value[listId].push(newShare);
      return newShare;
    } catch (e) {
      showError("Failed to create public link");
      console.error(e);
    }
  }
  async function updateLinkShare(shareId, listId, data) {
    try {
      const response = await api.shares.updateLink(shareId, data);
      const updated = response.data.ocs.data;
      const shares = sharesByList.value[listId] ?? [];
      const index2 = shares.findIndex((s) => s.id === shareId);
      if (index2 !== -1) {
        shares[index2] = updated;
      }
    } catch (e) {
      showError("Failed to update public link");
      console.error(e);
    }
  }
  async function removeLinkShare(shareId, listId) {
    try {
      await api.shares.deleteLink(shareId);
      const shares = sharesByList.value[listId] ?? [];
      sharesByList.value[listId] = shares.filter((s) => s.id !== shareId);
    } catch (e) {
      showError("Failed to remove public link");
      console.error(e);
    }
  }
  return {
    sharesByList,
    fetchByList,
    create,
    updatePermission,
    remove,
    getLinkShare,
    createLinkShare,
    updateLinkShare,
    removeLinkShare
  };
});
var vuedraggable_umd$1 = { exports: {} };
var vue = { exports: {} };
var vue_cjs_prod = {};
/**
* @vue/compiler-core v3.5.32
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const FRAGMENT = /* @__PURE__ */ Symbol(``);
const TELEPORT = /* @__PURE__ */ Symbol(``);
const SUSPENSE = /* @__PURE__ */ Symbol(``);
const KEEP_ALIVE = /* @__PURE__ */ Symbol(``);
const BASE_TRANSITION = /* @__PURE__ */ Symbol(
  ``
);
const OPEN_BLOCK = /* @__PURE__ */ Symbol(``);
const CREATE_BLOCK = /* @__PURE__ */ Symbol(``);
const CREATE_ELEMENT_BLOCK = /* @__PURE__ */ Symbol(
  ``
);
const CREATE_VNODE = /* @__PURE__ */ Symbol(``);
const CREATE_ELEMENT_VNODE = /* @__PURE__ */ Symbol(
  ``
);
const CREATE_COMMENT = /* @__PURE__ */ Symbol(
  ``
);
const CREATE_TEXT = /* @__PURE__ */ Symbol(
  ``
);
const CREATE_STATIC = /* @__PURE__ */ Symbol(
  ``
);
const RESOLVE_COMPONENT = /* @__PURE__ */ Symbol(
  ``
);
const RESOLVE_DYNAMIC_COMPONENT = /* @__PURE__ */ Symbol(
  ``
);
const RESOLVE_DIRECTIVE = /* @__PURE__ */ Symbol(
  ``
);
const RESOLVE_FILTER = /* @__PURE__ */ Symbol(
  ``
);
const WITH_DIRECTIVES = /* @__PURE__ */ Symbol(
  ``
);
const RENDER_LIST = /* @__PURE__ */ Symbol(``);
const RENDER_SLOT = /* @__PURE__ */ Symbol(``);
const CREATE_SLOTS = /* @__PURE__ */ Symbol(``);
const TO_DISPLAY_STRING = /* @__PURE__ */ Symbol(
  ``
);
const MERGE_PROPS = /* @__PURE__ */ Symbol(``);
const NORMALIZE_CLASS = /* @__PURE__ */ Symbol(
  ``
);
const NORMALIZE_STYLE = /* @__PURE__ */ Symbol(
  ``
);
const NORMALIZE_PROPS = /* @__PURE__ */ Symbol(
  ``
);
const GUARD_REACTIVE_PROPS = /* @__PURE__ */ Symbol(
  ``
);
const TO_HANDLERS = /* @__PURE__ */ Symbol(``);
const CAMELIZE = /* @__PURE__ */ Symbol(``);
const CAPITALIZE = /* @__PURE__ */ Symbol(``);
const TO_HANDLER_KEY = /* @__PURE__ */ Symbol(
  ``
);
const SET_BLOCK_TRACKING = /* @__PURE__ */ Symbol(
  ``
);
const PUSH_SCOPE_ID = /* @__PURE__ */ Symbol(``);
const POP_SCOPE_ID = /* @__PURE__ */ Symbol(``);
const WITH_CTX = /* @__PURE__ */ Symbol(``);
const UNREF = /* @__PURE__ */ Symbol(``);
const IS_REF = /* @__PURE__ */ Symbol(``);
const WITH_MEMO = /* @__PURE__ */ Symbol(``);
const IS_MEMO_SAME = /* @__PURE__ */ Symbol(``);
const helperNameMap = {
  [FRAGMENT]: `Fragment`,
  [TELEPORT]: `Teleport`,
  [SUSPENSE]: `Suspense`,
  [KEEP_ALIVE]: `KeepAlive`,
  [BASE_TRANSITION]: `BaseTransition`,
  [OPEN_BLOCK]: `openBlock`,
  [CREATE_BLOCK]: `createBlock`,
  [CREATE_ELEMENT_BLOCK]: `createElementBlock`,
  [CREATE_VNODE]: `createVNode`,
  [CREATE_ELEMENT_VNODE]: `createElementVNode`,
  [CREATE_COMMENT]: `createCommentVNode`,
  [CREATE_TEXT]: `createTextVNode`,
  [CREATE_STATIC]: `createStaticVNode`,
  [RESOLVE_COMPONENT]: `resolveComponent`,
  [RESOLVE_DYNAMIC_COMPONENT]: `resolveDynamicComponent`,
  [RESOLVE_DIRECTIVE]: `resolveDirective`,
  [RESOLVE_FILTER]: `resolveFilter`,
  [WITH_DIRECTIVES]: `withDirectives`,
  [RENDER_LIST]: `renderList`,
  [RENDER_SLOT]: `renderSlot`,
  [CREATE_SLOTS]: `createSlots`,
  [TO_DISPLAY_STRING]: `toDisplayString`,
  [MERGE_PROPS]: `mergeProps`,
  [NORMALIZE_CLASS]: `normalizeClass`,
  [NORMALIZE_STYLE]: `normalizeStyle`,
  [NORMALIZE_PROPS]: `normalizeProps`,
  [GUARD_REACTIVE_PROPS]: `guardReactiveProps`,
  [TO_HANDLERS]: `toHandlers`,
  [CAMELIZE]: `camelize`,
  [CAPITALIZE]: `capitalize`,
  [TO_HANDLER_KEY]: `toHandlerKey`,
  [SET_BLOCK_TRACKING]: `setBlockTracking`,
  [PUSH_SCOPE_ID]: `pushScopeId`,
  [POP_SCOPE_ID]: `popScopeId`,
  [WITH_CTX]: `withCtx`,
  [UNREF]: `unref`,
  [IS_REF]: `isRef`,
  [WITH_MEMO]: `withMemo`,
  [IS_MEMO_SAME]: `isMemoSame`
};
function registerRuntimeHelpers(helpers) {
  Object.getOwnPropertySymbols(helpers).forEach((s) => {
    helperNameMap[s] = helpers[s];
  });
}
const Namespaces = {
  "HTML": 0,
  "0": "HTML",
  "SVG": 1,
  "1": "SVG",
  "MATH_ML": 2,
  "2": "MATH_ML"
};
const NodeTypes = {
  "ROOT": 0,
  "0": "ROOT",
  "ELEMENT": 1,
  "1": "ELEMENT",
  "TEXT": 2,
  "2": "TEXT",
  "COMMENT": 3,
  "3": "COMMENT",
  "SIMPLE_EXPRESSION": 4,
  "4": "SIMPLE_EXPRESSION",
  "INTERPOLATION": 5,
  "5": "INTERPOLATION",
  "ATTRIBUTE": 6,
  "6": "ATTRIBUTE",
  "DIRECTIVE": 7,
  "7": "DIRECTIVE",
  "COMPOUND_EXPRESSION": 8,
  "8": "COMPOUND_EXPRESSION",
  "IF": 9,
  "9": "IF",
  "IF_BRANCH": 10,
  "10": "IF_BRANCH",
  "FOR": 11,
  "11": "FOR",
  "TEXT_CALL": 12,
  "12": "TEXT_CALL",
  "VNODE_CALL": 13,
  "13": "VNODE_CALL",
  "JS_CALL_EXPRESSION": 14,
  "14": "JS_CALL_EXPRESSION",
  "JS_OBJECT_EXPRESSION": 15,
  "15": "JS_OBJECT_EXPRESSION",
  "JS_PROPERTY": 16,
  "16": "JS_PROPERTY",
  "JS_ARRAY_EXPRESSION": 17,
  "17": "JS_ARRAY_EXPRESSION",
  "JS_FUNCTION_EXPRESSION": 18,
  "18": "JS_FUNCTION_EXPRESSION",
  "JS_CONDITIONAL_EXPRESSION": 19,
  "19": "JS_CONDITIONAL_EXPRESSION",
  "JS_CACHE_EXPRESSION": 20,
  "20": "JS_CACHE_EXPRESSION",
  "JS_BLOCK_STATEMENT": 21,
  "21": "JS_BLOCK_STATEMENT",
  "JS_TEMPLATE_LITERAL": 22,
  "22": "JS_TEMPLATE_LITERAL",
  "JS_IF_STATEMENT": 23,
  "23": "JS_IF_STATEMENT",
  "JS_ASSIGNMENT_EXPRESSION": 24,
  "24": "JS_ASSIGNMENT_EXPRESSION",
  "JS_SEQUENCE_EXPRESSION": 25,
  "25": "JS_SEQUENCE_EXPRESSION",
  "JS_RETURN_STATEMENT": 26,
  "26": "JS_RETURN_STATEMENT"
};
const ElementTypes = {
  "ELEMENT": 0,
  "0": "ELEMENT",
  "COMPONENT": 1,
  "1": "COMPONENT",
  "SLOT": 2,
  "2": "SLOT",
  "TEMPLATE": 3,
  "3": "TEMPLATE"
};
const ConstantTypes = {
  "NOT_CONSTANT": 0,
  "0": "NOT_CONSTANT",
  "CAN_SKIP_PATCH": 1,
  "1": "CAN_SKIP_PATCH",
  "CAN_CACHE": 2,
  "2": "CAN_CACHE",
  "CAN_STRINGIFY": 3,
  "3": "CAN_STRINGIFY"
};
const locStub = {
  start: { line: 1, column: 1, offset: 0 },
  end: { line: 1, column: 1, offset: 0 },
  source: ""
};
function createRoot(children, source = "") {
  return {
    type: 0,
    source,
    children,
    helpers: /* @__PURE__ */ new Set(),
    components: [],
    directives: [],
    hoists: [],
    imports: [],
    cached: [],
    temps: 0,
    codegenNode: void 0,
    loc: locStub
  };
}
function createVNodeCall(context, tag, props, children, patchFlag, dynamicProps, directives, isBlock = false, disableTracking = false, isComponent2 = false, loc = locStub) {
  if (context) {
    if (isBlock) {
      context.helper(OPEN_BLOCK);
      context.helper(getVNodeBlockHelper(context.inSSR, isComponent2));
    } else {
      context.helper(getVNodeHelper(context.inSSR, isComponent2));
    }
    if (directives) {
      context.helper(WITH_DIRECTIVES);
    }
  }
  return {
    type: 13,
    tag,
    props,
    children,
    patchFlag,
    dynamicProps,
    directives,
    isBlock,
    disableTracking,
    isComponent: isComponent2,
    loc
  };
}
function createArrayExpression(elements, loc = locStub) {
  return {
    type: 17,
    loc,
    elements
  };
}
function createObjectExpression(properties, loc = locStub) {
  return {
    type: 15,
    loc,
    properties
  };
}
function createObjectProperty(key, value) {
  return {
    type: 16,
    loc: locStub,
    key: isString(key) ? createSimpleExpression(key, true) : key,
    value
  };
}
function createSimpleExpression(content, isStatic = false, loc = locStub, constType = 0) {
  return {
    type: 4,
    loc,
    content,
    isStatic,
    constType: isStatic ? 3 : constType
  };
}
function createInterpolation(content, loc) {
  return {
    type: 5,
    loc,
    content: isString(content) ? createSimpleExpression(content, false, loc) : content
  };
}
function createCompoundExpression(children, loc = locStub) {
  return {
    type: 8,
    loc,
    children
  };
}
function createCallExpression(callee, args = [], loc = locStub) {
  return {
    type: 14,
    loc,
    callee,
    arguments: args
  };
}
function createFunctionExpression(params, returns = void 0, newline = false, isSlot = false, loc = locStub) {
  return {
    type: 18,
    params,
    returns,
    newline,
    isSlot,
    loc
  };
}
function createConditionalExpression(test, consequent, alternate, newline = true) {
  return {
    type: 19,
    test,
    consequent,
    alternate,
    newline,
    loc: locStub
  };
}
function createCacheExpression(index2, value, needPauseTracking = false, inVOnce = false) {
  return {
    type: 20,
    index: index2,
    value,
    needPauseTracking,
    inVOnce,
    needArraySpread: false,
    loc: locStub
  };
}
function createBlockStatement(body) {
  return {
    type: 21,
    body,
    loc: locStub
  };
}
function createTemplateLiteral(elements) {
  return {
    type: 22,
    elements,
    loc: locStub
  };
}
function createIfStatement(test, consequent, alternate) {
  return {
    type: 23,
    test,
    consequent,
    alternate,
    loc: locStub
  };
}
function createAssignmentExpression(left, right) {
  return {
    type: 24,
    left,
    right,
    loc: locStub
  };
}
function createSequenceExpression(expressions) {
  return {
    type: 25,
    expressions,
    loc: locStub
  };
}
function createReturnStatement(returns) {
  return {
    type: 26,
    returns,
    loc: locStub
  };
}
function getVNodeHelper(ssr, isComponent2) {
  return ssr || isComponent2 ? CREATE_VNODE : CREATE_ELEMENT_VNODE;
}
function getVNodeBlockHelper(ssr, isComponent2) {
  return ssr || isComponent2 ? CREATE_BLOCK : CREATE_ELEMENT_BLOCK;
}
function convertToBlock(node, { helper, removeHelper, inSSR }) {
  if (!node.isBlock) {
    node.isBlock = true;
    removeHelper(getVNodeHelper(inSSR, node.isComponent));
    helper(OPEN_BLOCK);
    helper(getVNodeBlockHelper(inSSR, node.isComponent));
  }
}
const defaultDelimitersOpen = new Uint8Array([123, 123]);
const defaultDelimitersClose = new Uint8Array([125, 125]);
function isTagStartChar(c) {
  return c >= 97 && c <= 122 || c >= 65 && c <= 90;
}
function isWhitespace(c) {
  return c === 32 || c === 10 || c === 9 || c === 12 || c === 13;
}
function isEndOfTagSection(c) {
  return c === 47 || c === 62 || isWhitespace(c);
}
function toCharCodes(str) {
  const ret = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) {
    ret[i] = str.charCodeAt(i);
  }
  return ret;
}
const Sequences = {
  Cdata: new Uint8Array([67, 68, 65, 84, 65, 91]),
  // CDATA[
  CdataEnd: new Uint8Array([93, 93, 62]),
  // ]]>
  CommentEnd: new Uint8Array([45, 45, 62]),
  // `-->`
  ScriptEnd: new Uint8Array([60, 47, 115, 99, 114, 105, 112, 116]),
  // `<\/script`
  StyleEnd: new Uint8Array([60, 47, 115, 116, 121, 108, 101]),
  // `</style`
  TitleEnd: new Uint8Array([60, 47, 116, 105, 116, 108, 101]),
  // `</title`
  TextareaEnd: new Uint8Array([
    60,
    47,
    116,
    101,
    120,
    116,
    97,
    114,
    101,
    97
  ])
  // `</textarea
};
class Tokenizer {
  constructor(stack2, cbs) {
    this.stack = stack2;
    this.cbs = cbs;
    this.state = 1;
    this.buffer = "";
    this.sectionStart = 0;
    this.index = 0;
    this.entityStart = 0;
    this.baseState = 1;
    this.inRCDATA = false;
    this.inXML = false;
    this.inVPre = false;
    this.newlines = [];
    this.mode = 0;
    this.delimiterOpen = defaultDelimitersOpen;
    this.delimiterClose = defaultDelimitersClose;
    this.delimiterIndex = -1;
    this.currentSequence = void 0;
    this.sequenceIndex = 0;
  }
  get inSFCRoot() {
    return this.mode === 2 && this.stack.length === 0;
  }
  reset() {
    this.state = 1;
    this.mode = 0;
    this.buffer = "";
    this.sectionStart = 0;
    this.index = 0;
    this.baseState = 1;
    this.inRCDATA = false;
    this.currentSequence = void 0;
    this.newlines.length = 0;
    this.delimiterOpen = defaultDelimitersOpen;
    this.delimiterClose = defaultDelimitersClose;
  }
  /**
   * Generate Position object with line / column information using recorded
   * newline positions. We know the index is always going to be an already
   * processed index, so all the newlines up to this index should have been
   * recorded.
   */
  getPos(index2) {
    let line = 1;
    let column = index2 + 1;
    const length = this.newlines.length;
    let j = -1;
    if (length > 100) {
      let l = -1;
      let r = length;
      while (l + 1 < r) {
        const m = l + r >>> 1;
        this.newlines[m] < index2 ? l = m : r = m;
      }
      j = l;
    } else {
      for (let i = length - 1; i >= 0; i--) {
        if (index2 > this.newlines[i]) {
          j = i;
          break;
        }
      }
    }
    if (j >= 0) {
      line = j + 2;
      column = index2 - this.newlines[j];
    }
    return {
      column,
      line,
      offset: index2
    };
  }
  peek() {
    return this.buffer.charCodeAt(this.index + 1);
  }
  stateText(c) {
    if (c === 60) {
      if (this.index > this.sectionStart) {
        this.cbs.ontext(this.sectionStart, this.index);
      }
      this.state = 5;
      this.sectionStart = this.index;
    } else if (!this.inVPre && c === this.delimiterOpen[0]) {
      this.state = 2;
      this.delimiterIndex = 0;
      this.stateInterpolationOpen(c);
    }
  }
  stateInterpolationOpen(c) {
    if (c === this.delimiterOpen[this.delimiterIndex]) {
      if (this.delimiterIndex === this.delimiterOpen.length - 1) {
        const start = this.index + 1 - this.delimiterOpen.length;
        if (start > this.sectionStart) {
          this.cbs.ontext(this.sectionStart, start);
        }
        this.state = 3;
        this.sectionStart = start;
      } else {
        this.delimiterIndex++;
      }
    } else if (this.inRCDATA) {
      this.state = 32;
      this.stateInRCDATA(c);
    } else {
      this.state = 1;
      this.stateText(c);
    }
  }
  stateInterpolation(c) {
    if (c === this.delimiterClose[0]) {
      this.state = 4;
      this.delimiterIndex = 0;
      this.stateInterpolationClose(c);
    }
  }
  stateInterpolationClose(c) {
    if (c === this.delimiterClose[this.delimiterIndex]) {
      if (this.delimiterIndex === this.delimiterClose.length - 1) {
        this.cbs.oninterpolation(this.sectionStart, this.index + 1);
        if (this.inRCDATA) {
          this.state = 32;
        } else {
          this.state = 1;
        }
        this.sectionStart = this.index + 1;
      } else {
        this.delimiterIndex++;
      }
    } else {
      this.state = 3;
      this.stateInterpolation(c);
    }
  }
  stateSpecialStartSequence(c) {
    const isEnd = this.sequenceIndex === this.currentSequence.length;
    const isMatch = isEnd ? (
      // If we are at the end of the sequence, make sure the tag name has ended
      isEndOfTagSection(c)
    ) : (
      // Otherwise, do a case-insensitive comparison
      (c | 32) === this.currentSequence[this.sequenceIndex]
    );
    if (!isMatch) {
      this.inRCDATA = false;
    } else if (!isEnd) {
      this.sequenceIndex++;
      return;
    }
    this.sequenceIndex = 0;
    this.state = 6;
    this.stateInTagName(c);
  }
  /** Look for an end tag. For <title> and <textarea>, also decode entities. */
  stateInRCDATA(c) {
    if (this.sequenceIndex === this.currentSequence.length) {
      if (c === 62 || isWhitespace(c)) {
        const endOfText = this.index - this.currentSequence.length;
        if (this.sectionStart < endOfText) {
          const actualIndex = this.index;
          this.index = endOfText;
          this.cbs.ontext(this.sectionStart, endOfText);
          this.index = actualIndex;
        }
        this.sectionStart = endOfText + 2;
        this.stateInClosingTagName(c);
        this.inRCDATA = false;
        return;
      }
      this.sequenceIndex = 0;
    }
    if ((c | 32) === this.currentSequence[this.sequenceIndex]) {
      this.sequenceIndex += 1;
    } else if (this.sequenceIndex === 0) {
      if (this.currentSequence === Sequences.TitleEnd || this.currentSequence === Sequences.TextareaEnd && !this.inSFCRoot) {
        if (!this.inVPre && c === this.delimiterOpen[0]) {
          this.state = 2;
          this.delimiterIndex = 0;
          this.stateInterpolationOpen(c);
        }
      } else if (this.fastForwardTo(60)) {
        this.sequenceIndex = 1;
      }
    } else {
      this.sequenceIndex = Number(c === 60);
    }
  }
  stateCDATASequence(c) {
    if (c === Sequences.Cdata[this.sequenceIndex]) {
      if (++this.sequenceIndex === Sequences.Cdata.length) {
        this.state = 28;
        this.currentSequence = Sequences.CdataEnd;
        this.sequenceIndex = 0;
        this.sectionStart = this.index + 1;
      }
    } else {
      this.sequenceIndex = 0;
      this.state = 23;
      this.stateInDeclaration(c);
    }
  }
  /**
   * When we wait for one specific character, we can speed things up
   * by skipping through the buffer until we find it.
   *
   * @returns Whether the character was found.
   */
  fastForwardTo(c) {
    while (++this.index < this.buffer.length) {
      const cc = this.buffer.charCodeAt(this.index);
      if (cc === 10) {
        this.newlines.push(this.index);
      }
      if (cc === c) {
        return true;
      }
    }
    this.index = this.buffer.length - 1;
    return false;
  }
  /**
   * Comments and CDATA end with `-->` and `]]>`.
   *
   * Their common qualities are:
   * - Their end sequences have a distinct character they start with.
   * - That character is then repeated, so we have to check multiple repeats.
   * - All characters but the start character of the sequence can be skipped.
   */
  stateInCommentLike(c) {
    if (c === this.currentSequence[this.sequenceIndex]) {
      if (++this.sequenceIndex === this.currentSequence.length) {
        if (this.currentSequence === Sequences.CdataEnd) {
          this.cbs.oncdata(this.sectionStart, this.index - 2);
        } else {
          this.cbs.oncomment(this.sectionStart, this.index - 2);
        }
        this.sequenceIndex = 0;
        this.sectionStart = this.index + 1;
        this.state = 1;
      }
    } else if (this.sequenceIndex === 0) {
      if (this.fastForwardTo(this.currentSequence[0])) {
        this.sequenceIndex = 1;
      }
    } else if (c !== this.currentSequence[this.sequenceIndex - 1]) {
      this.sequenceIndex = 0;
    }
  }
  startSpecial(sequence, offset) {
    this.enterRCDATA(sequence, offset);
    this.state = 31;
  }
  enterRCDATA(sequence, offset) {
    this.inRCDATA = true;
    this.currentSequence = sequence;
    this.sequenceIndex = offset;
  }
  stateBeforeTagName(c) {
    if (c === 33) {
      this.state = 22;
      this.sectionStart = this.index + 1;
    } else if (c === 63) {
      this.state = 24;
      this.sectionStart = this.index + 1;
    } else if (isTagStartChar(c)) {
      this.sectionStart = this.index;
      if (this.mode === 0) {
        this.state = 6;
      } else if (this.inSFCRoot) {
        this.state = 34;
      } else if (!this.inXML) {
        if (c === 116) {
          this.state = 30;
        } else {
          this.state = c === 115 ? 29 : 6;
        }
      } else {
        this.state = 6;
      }
    } else if (c === 47) {
      this.state = 8;
    } else {
      this.state = 1;
      this.stateText(c);
    }
  }
  stateInTagName(c) {
    if (isEndOfTagSection(c)) {
      this.handleTagName(c);
    }
  }
  stateInSFCRootTagName(c) {
    if (isEndOfTagSection(c)) {
      const tag = this.buffer.slice(this.sectionStart, this.index);
      if (tag !== "template") {
        this.enterRCDATA(toCharCodes(`</` + tag), 0);
      }
      this.handleTagName(c);
    }
  }
  handleTagName(c) {
    this.cbs.onopentagname(this.sectionStart, this.index);
    this.sectionStart = -1;
    this.state = 11;
    this.stateBeforeAttrName(c);
  }
  stateBeforeClosingTagName(c) {
    if (isWhitespace(c)) ;
    else if (c === 62) {
      this.state = 1;
      this.sectionStart = this.index + 1;
    } else {
      this.state = isTagStartChar(c) ? 9 : 27;
      this.sectionStart = this.index;
    }
  }
  stateInClosingTagName(c) {
    if (c === 62 || isWhitespace(c)) {
      this.cbs.onclosetag(this.sectionStart, this.index);
      this.sectionStart = -1;
      this.state = 10;
      this.stateAfterClosingTagName(c);
    }
  }
  stateAfterClosingTagName(c) {
    if (c === 62) {
      this.state = 1;
      this.sectionStart = this.index + 1;
    }
  }
  stateBeforeAttrName(c) {
    if (c === 62) {
      this.cbs.onopentagend(this.index);
      if (this.inRCDATA) {
        this.state = 32;
      } else {
        this.state = 1;
      }
      this.sectionStart = this.index + 1;
    } else if (c === 47) {
      this.state = 7;
    } else if (c === 60 && this.peek() === 47) {
      this.cbs.onopentagend(this.index);
      this.state = 5;
      this.sectionStart = this.index;
    } else if (!isWhitespace(c)) {
      this.handleAttrStart(c);
    }
  }
  handleAttrStart(c) {
    if (c === 118 && this.peek() === 45) {
      this.state = 13;
      this.sectionStart = this.index;
    } else if (c === 46 || c === 58 || c === 64 || c === 35) {
      this.cbs.ondirname(this.index, this.index + 1);
      this.state = 14;
      this.sectionStart = this.index + 1;
    } else {
      this.state = 12;
      this.sectionStart = this.index;
    }
  }
  stateInSelfClosingTag(c) {
    if (c === 62) {
      this.cbs.onselfclosingtag(this.index);
      this.state = 1;
      this.sectionStart = this.index + 1;
      this.inRCDATA = false;
    } else if (!isWhitespace(c)) {
      this.state = 11;
      this.stateBeforeAttrName(c);
    }
  }
  stateInAttrName(c) {
    if (c === 61 || isEndOfTagSection(c)) {
      this.cbs.onattribname(this.sectionStart, this.index);
      this.handleAttrNameEnd(c);
    }
  }
  stateInDirName(c) {
    if (c === 61 || isEndOfTagSection(c)) {
      this.cbs.ondirname(this.sectionStart, this.index);
      this.handleAttrNameEnd(c);
    } else if (c === 58) {
      this.cbs.ondirname(this.sectionStart, this.index);
      this.state = 14;
      this.sectionStart = this.index + 1;
    } else if (c === 46) {
      this.cbs.ondirname(this.sectionStart, this.index);
      this.state = 16;
      this.sectionStart = this.index + 1;
    }
  }
  stateInDirArg(c) {
    if (c === 61 || isEndOfTagSection(c)) {
      this.cbs.ondirarg(this.sectionStart, this.index);
      this.handleAttrNameEnd(c);
    } else if (c === 91) {
      this.state = 15;
    } else if (c === 46) {
      this.cbs.ondirarg(this.sectionStart, this.index);
      this.state = 16;
      this.sectionStart = this.index + 1;
    }
  }
  stateInDynamicDirArg(c) {
    if (c === 93) {
      this.state = 14;
    } else if (c === 61 || isEndOfTagSection(c)) {
      this.cbs.ondirarg(this.sectionStart, this.index + 1);
      this.handleAttrNameEnd(c);
    }
  }
  stateInDirModifier(c) {
    if (c === 61 || isEndOfTagSection(c)) {
      this.cbs.ondirmodifier(this.sectionStart, this.index);
      this.handleAttrNameEnd(c);
    } else if (c === 46) {
      this.cbs.ondirmodifier(this.sectionStart, this.index);
      this.sectionStart = this.index + 1;
    }
  }
  handleAttrNameEnd(c) {
    this.sectionStart = this.index;
    this.state = 17;
    this.cbs.onattribnameend(this.index);
    this.stateAfterAttrName(c);
  }
  stateAfterAttrName(c) {
    if (c === 61) {
      this.state = 18;
    } else if (c === 47 || c === 62) {
      this.cbs.onattribend(0, this.sectionStart);
      this.sectionStart = -1;
      this.state = 11;
      this.stateBeforeAttrName(c);
    } else if (!isWhitespace(c)) {
      this.cbs.onattribend(0, this.sectionStart);
      this.handleAttrStart(c);
    }
  }
  stateBeforeAttrValue(c) {
    if (c === 34) {
      this.state = 19;
      this.sectionStart = this.index + 1;
    } else if (c === 39) {
      this.state = 20;
      this.sectionStart = this.index + 1;
    } else if (!isWhitespace(c)) {
      this.sectionStart = this.index;
      this.state = 21;
      this.stateInAttrValueNoQuotes(c);
    }
  }
  handleInAttrValue(c, quote) {
    if (c === quote || this.fastForwardTo(quote)) {
      this.cbs.onattribdata(this.sectionStart, this.index);
      this.sectionStart = -1;
      this.cbs.onattribend(
        quote === 34 ? 3 : 2,
        this.index + 1
      );
      this.state = 11;
    }
  }
  stateInAttrValueDoubleQuotes(c) {
    this.handleInAttrValue(c, 34);
  }
  stateInAttrValueSingleQuotes(c) {
    this.handleInAttrValue(c, 39);
  }
  stateInAttrValueNoQuotes(c) {
    if (isWhitespace(c) || c === 62) {
      this.cbs.onattribdata(this.sectionStart, this.index);
      this.sectionStart = -1;
      this.cbs.onattribend(1, this.index);
      this.state = 11;
      this.stateBeforeAttrName(c);
    } else if (c === 39 || c === 60 || c === 61 || c === 96) {
      this.cbs.onerr(
        18,
        this.index
      );
    } else ;
  }
  stateBeforeDeclaration(c) {
    if (c === 91) {
      this.state = 26;
      this.sequenceIndex = 0;
    } else {
      this.state = c === 45 ? 25 : 23;
    }
  }
  stateInDeclaration(c) {
    if (c === 62 || this.fastForwardTo(62)) {
      this.state = 1;
      this.sectionStart = this.index + 1;
    }
  }
  stateInProcessingInstruction(c) {
    if (c === 62 || this.fastForwardTo(62)) {
      this.cbs.onprocessinginstruction(this.sectionStart, this.index);
      this.state = 1;
      this.sectionStart = this.index + 1;
    }
  }
  stateBeforeComment(c) {
    if (c === 45) {
      this.state = 28;
      this.currentSequence = Sequences.CommentEnd;
      this.sequenceIndex = 2;
      this.sectionStart = this.index + 1;
    } else {
      this.state = 23;
    }
  }
  stateInSpecialComment(c) {
    if (c === 62 || this.fastForwardTo(62)) {
      this.cbs.oncomment(this.sectionStart, this.index);
      this.state = 1;
      this.sectionStart = this.index + 1;
    }
  }
  stateBeforeSpecialS(c) {
    if (c === Sequences.ScriptEnd[3]) {
      this.startSpecial(Sequences.ScriptEnd, 4);
    } else if (c === Sequences.StyleEnd[3]) {
      this.startSpecial(Sequences.StyleEnd, 4);
    } else {
      this.state = 6;
      this.stateInTagName(c);
    }
  }
  stateBeforeSpecialT(c) {
    if (c === Sequences.TitleEnd[3]) {
      this.startSpecial(Sequences.TitleEnd, 4);
    } else if (c === Sequences.TextareaEnd[3]) {
      this.startSpecial(Sequences.TextareaEnd, 4);
    } else {
      this.state = 6;
      this.stateInTagName(c);
    }
  }
  startEntity() {
  }
  stateInEntity() {
  }
  /**
   * Iterates through the buffer, calling the function corresponding to the current state.
   *
   * States that are more likely to be hit are higher up, as a performance improvement.
   */
  parse(input) {
    this.buffer = input;
    while (this.index < this.buffer.length) {
      const c = this.buffer.charCodeAt(this.index);
      if (c === 10 && this.state !== 33) {
        this.newlines.push(this.index);
      }
      switch (this.state) {
        case 1: {
          this.stateText(c);
          break;
        }
        case 2: {
          this.stateInterpolationOpen(c);
          break;
        }
        case 3: {
          this.stateInterpolation(c);
          break;
        }
        case 4: {
          this.stateInterpolationClose(c);
          break;
        }
        case 31: {
          this.stateSpecialStartSequence(c);
          break;
        }
        case 32: {
          this.stateInRCDATA(c);
          break;
        }
        case 26: {
          this.stateCDATASequence(c);
          break;
        }
        case 19: {
          this.stateInAttrValueDoubleQuotes(c);
          break;
        }
        case 12: {
          this.stateInAttrName(c);
          break;
        }
        case 13: {
          this.stateInDirName(c);
          break;
        }
        case 14: {
          this.stateInDirArg(c);
          break;
        }
        case 15: {
          this.stateInDynamicDirArg(c);
          break;
        }
        case 16: {
          this.stateInDirModifier(c);
          break;
        }
        case 28: {
          this.stateInCommentLike(c);
          break;
        }
        case 27: {
          this.stateInSpecialComment(c);
          break;
        }
        case 11: {
          this.stateBeforeAttrName(c);
          break;
        }
        case 6: {
          this.stateInTagName(c);
          break;
        }
        case 34: {
          this.stateInSFCRootTagName(c);
          break;
        }
        case 9: {
          this.stateInClosingTagName(c);
          break;
        }
        case 5: {
          this.stateBeforeTagName(c);
          break;
        }
        case 17: {
          this.stateAfterAttrName(c);
          break;
        }
        case 20: {
          this.stateInAttrValueSingleQuotes(c);
          break;
        }
        case 18: {
          this.stateBeforeAttrValue(c);
          break;
        }
        case 8: {
          this.stateBeforeClosingTagName(c);
          break;
        }
        case 10: {
          this.stateAfterClosingTagName(c);
          break;
        }
        case 29: {
          this.stateBeforeSpecialS(c);
          break;
        }
        case 30: {
          this.stateBeforeSpecialT(c);
          break;
        }
        case 21: {
          this.stateInAttrValueNoQuotes(c);
          break;
        }
        case 7: {
          this.stateInSelfClosingTag(c);
          break;
        }
        case 23: {
          this.stateInDeclaration(c);
          break;
        }
        case 22: {
          this.stateBeforeDeclaration(c);
          break;
        }
        case 25: {
          this.stateBeforeComment(c);
          break;
        }
        case 24: {
          this.stateInProcessingInstruction(c);
          break;
        }
        case 33: {
          this.stateInEntity();
          break;
        }
      }
      this.index++;
    }
    this.cleanup();
    this.finish();
  }
  /**
   * Remove data that has already been consumed from the buffer.
   */
  cleanup() {
    if (this.sectionStart !== this.index) {
      if (this.state === 1 || this.state === 32 && this.sequenceIndex === 0) {
        this.cbs.ontext(this.sectionStart, this.index);
        this.sectionStart = this.index;
      } else if (this.state === 19 || this.state === 20 || this.state === 21) {
        this.cbs.onattribdata(this.sectionStart, this.index);
        this.sectionStart = this.index;
      }
    }
  }
  finish() {
    this.handleTrailingData();
    this.cbs.onend();
  }
  /** Handle any trailing data. */
  handleTrailingData() {
    const endIndex = this.buffer.length;
    if (this.sectionStart >= endIndex) {
      return;
    }
    if (this.state === 28) {
      if (this.currentSequence === Sequences.CdataEnd) {
        this.cbs.oncdata(this.sectionStart, endIndex);
      } else {
        this.cbs.oncomment(this.sectionStart, endIndex);
      }
    } else if (this.state === 6 || this.state === 11 || this.state === 18 || this.state === 17 || this.state === 12 || this.state === 13 || this.state === 14 || this.state === 15 || this.state === 16 || this.state === 20 || this.state === 19 || this.state === 21 || this.state === 9) ;
    else {
      this.cbs.ontext(this.sectionStart, endIndex);
    }
  }
  emitCodePoint(cp, consumed) {
  }
}
const CompilerDeprecationTypes = {
  "COMPILER_IS_ON_ELEMENT": "COMPILER_IS_ON_ELEMENT",
  "COMPILER_V_BIND_SYNC": "COMPILER_V_BIND_SYNC",
  "COMPILER_V_BIND_OBJECT_ORDER": "COMPILER_V_BIND_OBJECT_ORDER",
  "COMPILER_V_ON_NATIVE": "COMPILER_V_ON_NATIVE",
  "COMPILER_V_IF_V_FOR_PRECEDENCE": "COMPILER_V_IF_V_FOR_PRECEDENCE",
  "COMPILER_NATIVE_TEMPLATE": "COMPILER_NATIVE_TEMPLATE",
  "COMPILER_INLINE_TEMPLATE": "COMPILER_INLINE_TEMPLATE",
  "COMPILER_FILTERS": "COMPILER_FILTERS"
};
const deprecationData = {
  ["COMPILER_IS_ON_ELEMENT"]: {
    message: `Platform-native elements with "is" prop will no longer be treated as components in Vue 3 unless the "is" value is explicitly prefixed with "vue:".`,
    link: `https://v3-migration.vuejs.org/breaking-changes/custom-elements-interop.html`
  },
  ["COMPILER_V_BIND_SYNC"]: {
    message: (key) => `.sync modifier for v-bind has been removed. Use v-model with argument instead. \`v-bind:${key}.sync\` should be changed to \`v-model:${key}\`.`,
    link: `https://v3-migration.vuejs.org/breaking-changes/v-model.html`
  },
  ["COMPILER_V_BIND_OBJECT_ORDER"]: {
    message: `v-bind="obj" usage is now order sensitive and behaves like JavaScript object spread: it will now overwrite an existing non-mergeable attribute that appears before v-bind in the case of conflict. To retain 2.x behavior, move v-bind to make it the first attribute. You can also suppress this warning if the usage is intended.`,
    link: `https://v3-migration.vuejs.org/breaking-changes/v-bind.html`
  },
  ["COMPILER_V_ON_NATIVE"]: {
    message: `.native modifier for v-on has been removed as is no longer necessary.`,
    link: `https://v3-migration.vuejs.org/breaking-changes/v-on-native-modifier-removed.html`
  },
  ["COMPILER_V_IF_V_FOR_PRECEDENCE"]: {
    message: `v-if / v-for precedence when used on the same element has changed in Vue 3: v-if now takes higher precedence and will no longer have access to v-for scope variables. It is best to avoid the ambiguity with <template> tags or use a computed property that filters v-for data source.`,
    link: `https://v3-migration.vuejs.org/breaking-changes/v-if-v-for.html`
  },
  ["COMPILER_NATIVE_TEMPLATE"]: {
    message: `<template> with no special directives will render as a native template element instead of its inner content in Vue 3.`
  },
  ["COMPILER_INLINE_TEMPLATE"]: {
    message: `"inline-template" has been removed in Vue 3.`,
    link: `https://v3-migration.vuejs.org/breaking-changes/inline-template-attribute.html`
  },
  ["COMPILER_FILTERS"]: {
    message: `filters have been removed in Vue 3. The "|" symbol will be treated as native JavaScript bitwise OR operator. Use method calls or computed properties instead.`,
    link: `https://v3-migration.vuejs.org/breaking-changes/filters.html`
  }
};
function getCompatValue(key, { compatConfig }) {
  const value = compatConfig && compatConfig[key];
  if (key === "MODE") {
    return value || 3;
  } else {
    return value;
  }
}
function isCompatEnabled(key, context) {
  const mode = getCompatValue("MODE", context);
  const value = getCompatValue(key, context);
  return mode === 3 ? value === true : value !== false;
}
function checkCompatEnabled(key, context, loc, ...args) {
  const enabled = isCompatEnabled(key, context);
  return enabled;
}
function warnDeprecation(key, context, loc, ...args) {
  const val = getCompatValue(key, context);
  if (val === "suppress-warning") {
    return;
  }
  const { message, link } = deprecationData[key];
  const msg = `(deprecation ${key}) ${typeof message === "function" ? message(...args) : message}${link ? `
  Details: ${link}` : ``}`;
  const err = new SyntaxError(msg);
  err.code = key;
  if (loc) err.loc = loc;
  context.onWarn(err);
}
function defaultOnError(error) {
  throw error;
}
function defaultOnWarn(msg) {
}
function createCompilerError(code, loc, messages, additionalMessage) {
  const msg = `https://vuejs.org/error-reference/#compiler-${code}`;
  const error = new SyntaxError(String(msg));
  error.code = code;
  error.loc = loc;
  return error;
}
const ErrorCodes = {
  "ABRUPT_CLOSING_OF_EMPTY_COMMENT": 0,
  "0": "ABRUPT_CLOSING_OF_EMPTY_COMMENT",
  "CDATA_IN_HTML_CONTENT": 1,
  "1": "CDATA_IN_HTML_CONTENT",
  "DUPLICATE_ATTRIBUTE": 2,
  "2": "DUPLICATE_ATTRIBUTE",
  "END_TAG_WITH_ATTRIBUTES": 3,
  "3": "END_TAG_WITH_ATTRIBUTES",
  "END_TAG_WITH_TRAILING_SOLIDUS": 4,
  "4": "END_TAG_WITH_TRAILING_SOLIDUS",
  "EOF_BEFORE_TAG_NAME": 5,
  "5": "EOF_BEFORE_TAG_NAME",
  "EOF_IN_CDATA": 6,
  "6": "EOF_IN_CDATA",
  "EOF_IN_COMMENT": 7,
  "7": "EOF_IN_COMMENT",
  "EOF_IN_SCRIPT_HTML_COMMENT_LIKE_TEXT": 8,
  "8": "EOF_IN_SCRIPT_HTML_COMMENT_LIKE_TEXT",
  "EOF_IN_TAG": 9,
  "9": "EOF_IN_TAG",
  "INCORRECTLY_CLOSED_COMMENT": 10,
  "10": "INCORRECTLY_CLOSED_COMMENT",
  "INCORRECTLY_OPENED_COMMENT": 11,
  "11": "INCORRECTLY_OPENED_COMMENT",
  "INVALID_FIRST_CHARACTER_OF_TAG_NAME": 12,
  "12": "INVALID_FIRST_CHARACTER_OF_TAG_NAME",
  "MISSING_ATTRIBUTE_VALUE": 13,
  "13": "MISSING_ATTRIBUTE_VALUE",
  "MISSING_END_TAG_NAME": 14,
  "14": "MISSING_END_TAG_NAME",
  "MISSING_WHITESPACE_BETWEEN_ATTRIBUTES": 15,
  "15": "MISSING_WHITESPACE_BETWEEN_ATTRIBUTES",
  "NESTED_COMMENT": 16,
  "16": "NESTED_COMMENT",
  "UNEXPECTED_CHARACTER_IN_ATTRIBUTE_NAME": 17,
  "17": "UNEXPECTED_CHARACTER_IN_ATTRIBUTE_NAME",
  "UNEXPECTED_CHARACTER_IN_UNQUOTED_ATTRIBUTE_VALUE": 18,
  "18": "UNEXPECTED_CHARACTER_IN_UNQUOTED_ATTRIBUTE_VALUE",
  "UNEXPECTED_EQUALS_SIGN_BEFORE_ATTRIBUTE_NAME": 19,
  "19": "UNEXPECTED_EQUALS_SIGN_BEFORE_ATTRIBUTE_NAME",
  "UNEXPECTED_NULL_CHARACTER": 20,
  "20": "UNEXPECTED_NULL_CHARACTER",
  "UNEXPECTED_QUESTION_MARK_INSTEAD_OF_TAG_NAME": 21,
  "21": "UNEXPECTED_QUESTION_MARK_INSTEAD_OF_TAG_NAME",
  "UNEXPECTED_SOLIDUS_IN_TAG": 22,
  "22": "UNEXPECTED_SOLIDUS_IN_TAG",
  "X_INVALID_END_TAG": 23,
  "23": "X_INVALID_END_TAG",
  "X_MISSING_END_TAG": 24,
  "24": "X_MISSING_END_TAG",
  "X_MISSING_INTERPOLATION_END": 25,
  "25": "X_MISSING_INTERPOLATION_END",
  "X_MISSING_DIRECTIVE_NAME": 26,
  "26": "X_MISSING_DIRECTIVE_NAME",
  "X_MISSING_DYNAMIC_DIRECTIVE_ARGUMENT_END": 27,
  "27": "X_MISSING_DYNAMIC_DIRECTIVE_ARGUMENT_END",
  "X_V_IF_NO_EXPRESSION": 28,
  "28": "X_V_IF_NO_EXPRESSION",
  "X_V_IF_SAME_KEY": 29,
  "29": "X_V_IF_SAME_KEY",
  "X_V_ELSE_NO_ADJACENT_IF": 30,
  "30": "X_V_ELSE_NO_ADJACENT_IF",
  "X_V_FOR_NO_EXPRESSION": 31,
  "31": "X_V_FOR_NO_EXPRESSION",
  "X_V_FOR_MALFORMED_EXPRESSION": 32,
  "32": "X_V_FOR_MALFORMED_EXPRESSION",
  "X_V_FOR_TEMPLATE_KEY_PLACEMENT": 33,
  "33": "X_V_FOR_TEMPLATE_KEY_PLACEMENT",
  "X_V_BIND_NO_EXPRESSION": 34,
  "34": "X_V_BIND_NO_EXPRESSION",
  "X_V_ON_NO_EXPRESSION": 35,
  "35": "X_V_ON_NO_EXPRESSION",
  "X_V_SLOT_UNEXPECTED_DIRECTIVE_ON_SLOT_OUTLET": 36,
  "36": "X_V_SLOT_UNEXPECTED_DIRECTIVE_ON_SLOT_OUTLET",
  "X_V_SLOT_MIXED_SLOT_USAGE": 37,
  "37": "X_V_SLOT_MIXED_SLOT_USAGE",
  "X_V_SLOT_DUPLICATE_SLOT_NAMES": 38,
  "38": "X_V_SLOT_DUPLICATE_SLOT_NAMES",
  "X_V_SLOT_EXTRANEOUS_DEFAULT_SLOT_CHILDREN": 39,
  "39": "X_V_SLOT_EXTRANEOUS_DEFAULT_SLOT_CHILDREN",
  "X_V_SLOT_MISPLACED": 40,
  "40": "X_V_SLOT_MISPLACED",
  "X_V_MODEL_NO_EXPRESSION": 41,
  "41": "X_V_MODEL_NO_EXPRESSION",
  "X_V_MODEL_MALFORMED_EXPRESSION": 42,
  "42": "X_V_MODEL_MALFORMED_EXPRESSION",
  "X_V_MODEL_ON_SCOPE_VARIABLE": 43,
  "43": "X_V_MODEL_ON_SCOPE_VARIABLE",
  "X_V_MODEL_ON_PROPS": 44,
  "44": "X_V_MODEL_ON_PROPS",
  "X_V_MODEL_ON_CONST": 45,
  "45": "X_V_MODEL_ON_CONST",
  "X_INVALID_EXPRESSION": 46,
  "46": "X_INVALID_EXPRESSION",
  "X_KEEP_ALIVE_INVALID_CHILDREN": 47,
  "47": "X_KEEP_ALIVE_INVALID_CHILDREN",
  "X_PREFIX_ID_NOT_SUPPORTED": 48,
  "48": "X_PREFIX_ID_NOT_SUPPORTED",
  "X_MODULE_MODE_NOT_SUPPORTED": 49,
  "49": "X_MODULE_MODE_NOT_SUPPORTED",
  "X_CACHE_HANDLER_NOT_SUPPORTED": 50,
  "50": "X_CACHE_HANDLER_NOT_SUPPORTED",
  "X_SCOPE_ID_NOT_SUPPORTED": 51,
  "51": "X_SCOPE_ID_NOT_SUPPORTED",
  "X_VNODE_HOOKS": 52,
  "52": "X_VNODE_HOOKS",
  "X_V_BIND_INVALID_SAME_NAME_ARGUMENT": 53,
  "53": "X_V_BIND_INVALID_SAME_NAME_ARGUMENT",
  "__EXTEND_POINT__": 54,
  "54": "__EXTEND_POINT__"
};
const errorMessages = {
  // parse errors
  [0]: "Illegal comment.",
  [1]: "CDATA section is allowed only in XML context.",
  [2]: "Duplicate attribute.",
  [3]: "End tag cannot have attributes.",
  [4]: "Illegal '/' in tags.",
  [5]: "Unexpected EOF in tag.",
  [6]: "Unexpected EOF in CDATA section.",
  [7]: "Unexpected EOF in comment.",
  [8]: "Unexpected EOF in script.",
  [9]: "Unexpected EOF in tag.",
  [10]: "Incorrectly closed comment.",
  [11]: "Incorrectly opened comment.",
  [12]: "Illegal tag name. Use '&lt;' to print '<'.",
  [13]: "Attribute value was expected.",
  [14]: "End tag name was expected.",
  [15]: "Whitespace was expected.",
  [16]: "Unexpected '<!--' in comment.",
  [17]: `Attribute name cannot contain U+0022 ("), U+0027 ('), and U+003C (<).`,
  [18]: "Unquoted attribute value cannot contain U+0022 (\"), U+0027 ('), U+003C (<), U+003D (=), and U+0060 (`).",
  [19]: "Attribute name cannot start with '='.",
  [21]: "'<?' is allowed only in XML context.",
  [20]: `Unexpected null character.`,
  [22]: "Illegal '/' in tags.",
  // Vue-specific parse errors
  [23]: "Invalid end tag.",
  [24]: "Element is missing end tag.",
  [25]: "Interpolation end sign was not found.",
  [27]: "End bracket for dynamic directive argument was not found. Note that dynamic directive argument cannot contain spaces.",
  [26]: "Legal directive name was expected.",
  // transform errors
  [28]: `v-if/v-else-if is missing expression.`,
  [29]: `v-if/else branches must use unique keys.`,
  [30]: `v-else/v-else-if has no adjacent v-if or v-else-if.`,
  [31]: `v-for is missing expression.`,
  [32]: `v-for has invalid expression.`,
  [33]: `<template v-for> key should be placed on the <template> tag.`,
  [34]: `v-bind is missing expression.`,
  [53]: `v-bind with same-name shorthand only allows static argument.`,
  [35]: `v-on is missing expression.`,
  [36]: `Unexpected custom directive on <slot> outlet.`,
  [37]: `Mixed v-slot usage on both the component and nested <template>. When there are multiple named slots, all slots should use <template> syntax to avoid scope ambiguity.`,
  [38]: `Duplicate slot names found. `,
  [39]: `Extraneous children found when component already has explicitly named default slot. These children will be ignored.`,
  [40]: `v-slot can only be used on components or <template> tags.`,
  [41]: `v-model is missing expression.`,
  [42]: `v-model value must be a valid JavaScript member expression.`,
  [43]: `v-model cannot be used on v-for or v-slot scope variables because they are not writable.`,
  [44]: `v-model cannot be used on a prop, because local prop bindings are not writable.
Use a v-bind binding combined with a v-on listener that emits update:x event instead.`,
  [45]: `v-model cannot be used on a const binding because it is not writable.`,
  [46]: `Error parsing JavaScript expression: `,
  [47]: `<KeepAlive> expects exactly one child component.`,
  [52]: `@vnode-* hooks in templates are no longer supported. Use the vue: prefix instead. For example, @vnode-mounted should be changed to @vue:mounted. @vnode-* hooks support has been removed in 3.4.`,
  // generic errors
  [48]: `"prefixIdentifiers" option is not supported in this build of compiler.`,
  [49]: `ES module mode is not supported in this build of compiler.`,
  [50]: `"cacheHandlers" option is only supported when the "prefixIdentifiers" option is enabled.`,
  [51]: `"scopeId" option is only supported in module mode.`,
  // just to fulfill types
  [54]: ``
};
function walkIdentifiers(root, onIdentifier, includeAll = false, parentStack = [], knownIds = /* @__PURE__ */ Object.create(null)) {
  {
    return;
  }
}
function isReferencedIdentifier(id, parent, parentStack) {
  {
    return false;
  }
}
function isInDestructureAssignment(parent, parentStack) {
  if (parent && (parent.type === "ObjectProperty" || parent.type === "ArrayPattern")) {
    let i = parentStack.length;
    while (i--) {
      const p = parentStack[i];
      if (p.type === "AssignmentExpression") {
        return true;
      } else if (p.type !== "ObjectProperty" && !p.type.endsWith("Pattern")) {
        break;
      }
    }
  }
  return false;
}
function isInNewExpression(parentStack) {
  let i = parentStack.length;
  while (i--) {
    const p = parentStack[i];
    if (p.type === "NewExpression") {
      return true;
    } else if (p.type !== "MemberExpression") {
      break;
    }
  }
  return false;
}
function walkFunctionParams(node, onIdent) {
  for (const p of node.params) {
    for (const id of extractIdentifiers(p)) {
      onIdent(id);
    }
  }
}
function walkBlockDeclarations(block, onIdent) {
  const body = block.type === "SwitchCase" ? block.consequent : block.body;
  for (const stmt of body) {
    if (stmt.type === "VariableDeclaration") {
      if (stmt.declare) continue;
      for (const decl of stmt.declarations) {
        for (const id of extractIdentifiers(decl.id)) {
          onIdent(id);
        }
      }
    } else if (stmt.type === "FunctionDeclaration" || stmt.type === "ClassDeclaration") {
      if (stmt.declare || !stmt.id) continue;
      onIdent(stmt.id);
    } else if (isForStatement(stmt)) {
      walkForStatement(stmt, true, onIdent);
    } else if (stmt.type === "SwitchStatement") {
      walkSwitchStatement(stmt, true, onIdent);
    }
  }
}
function isForStatement(stmt) {
  return stmt.type === "ForOfStatement" || stmt.type === "ForInStatement" || stmt.type === "ForStatement";
}
function walkForStatement(stmt, isVar, onIdent) {
  const variable = stmt.type === "ForStatement" ? stmt.init : stmt.left;
  if (variable && variable.type === "VariableDeclaration" && (variable.kind === "var" ? isVar : !isVar)) {
    for (const decl of variable.declarations) {
      for (const id of extractIdentifiers(decl.id)) {
        onIdent(id);
      }
    }
  }
}
function walkSwitchStatement(stmt, isVar, onIdent) {
  for (const cs of stmt.cases) {
    for (const stmt2 of cs.consequent) {
      if (stmt2.type === "VariableDeclaration" && (stmt2.kind === "var" ? isVar : !isVar)) {
        for (const decl of stmt2.declarations) {
          for (const id of extractIdentifiers(decl.id)) {
            onIdent(id);
          }
        }
      }
    }
    walkBlockDeclarations(cs, onIdent);
  }
}
function extractIdentifiers(param, nodes = []) {
  switch (param.type) {
    case "Identifier":
      nodes.push(param);
      break;
    case "MemberExpression":
      let object = param;
      while (object.type === "MemberExpression") {
        object = object.object;
      }
      nodes.push(object);
      break;
    case "ObjectPattern":
      for (const prop of param.properties) {
        if (prop.type === "RestElement") {
          extractIdentifiers(prop.argument, nodes);
        } else {
          extractIdentifiers(prop.value, nodes);
        }
      }
      break;
    case "ArrayPattern":
      param.elements.forEach((element) => {
        if (element) extractIdentifiers(element, nodes);
      });
      break;
    case "RestElement":
      extractIdentifiers(param.argument, nodes);
      break;
    case "AssignmentPattern":
      extractIdentifiers(param.left, nodes);
      break;
  }
  return nodes;
}
const isFunctionType = (node) => {
  return /Function(?:Expression|Declaration)$|Method$/.test(node.type);
};
const isStaticProperty = (node) => node && (node.type === "ObjectProperty" || node.type === "ObjectMethod") && !node.computed;
const isStaticPropertyKey = (node, parent) => isStaticProperty(parent) && parent.key === node;
const TS_NODE_TYPES = [
  "TSAsExpression",
  // foo as number
  "TSTypeAssertion",
  // (<number>foo)
  "TSNonNullExpression",
  // foo!
  "TSInstantiationExpression",
  // foo<string>
  "TSSatisfiesExpression"
  // foo satisfies T
];
function unwrapTSNode(node) {
  if (TS_NODE_TYPES.includes(node.type)) {
    return unwrapTSNode(node.expression);
  } else {
    return node;
  }
}
const isStaticExp = (p) => p.type === 4 && p.isStatic;
function isCoreComponent(tag) {
  switch (tag) {
    case "Teleport":
    case "teleport":
      return TELEPORT;
    case "Suspense":
    case "suspense":
      return SUSPENSE;
    case "KeepAlive":
    case "keep-alive":
      return KEEP_ALIVE;
    case "BaseTransition":
    case "base-transition":
      return BASE_TRANSITION;
  }
}
const nonIdentifierRE = /^$|^\d|[^\$\w\xA0-\uFFFF]/;
const isSimpleIdentifier = (name) => !nonIdentifierRE.test(name);
const validFirstIdentCharRE = /[A-Za-z_$\xA0-\uFFFF]/;
const validIdentCharRE = /[\.\?\w$\xA0-\uFFFF]/;
const whitespaceRE = /\s+[.[]\s*|\s*[.[]\s+/g;
const getExpSource = (exp) => exp.type === 4 ? exp.content : exp.loc.source;
const isMemberExpressionBrowser = (exp) => {
  const path = getExpSource(exp).trim().replace(whitespaceRE, (s) => s.trim());
  let state = 0;
  let stateStack = [];
  let currentOpenBracketCount = 0;
  let currentOpenParensCount = 0;
  let currentStringType = null;
  for (let i = 0; i < path.length; i++) {
    const char = path.charAt(i);
    switch (state) {
      case 0:
        if (char === "[") {
          stateStack.push(state);
          state = 1;
          currentOpenBracketCount++;
        } else if (char === "(") {
          stateStack.push(state);
          state = 2;
          currentOpenParensCount++;
        } else if (!(i === 0 ? validFirstIdentCharRE : validIdentCharRE).test(char)) {
          return false;
        }
        break;
      case 1:
        if (char === `'` || char === `"` || char === "`") {
          stateStack.push(state);
          state = 3;
          currentStringType = char;
        } else if (char === `[`) {
          currentOpenBracketCount++;
        } else if (char === `]`) {
          if (!--currentOpenBracketCount) {
            state = stateStack.pop();
          }
        }
        break;
      case 2:
        if (char === `'` || char === `"` || char === "`") {
          stateStack.push(state);
          state = 3;
          currentStringType = char;
        } else if (char === `(`) {
          currentOpenParensCount++;
        } else if (char === `)`) {
          if (i === path.length - 1) {
            return false;
          }
          if (!--currentOpenParensCount) {
            state = stateStack.pop();
          }
        }
        break;
      case 3:
        if (char === currentStringType) {
          state = stateStack.pop();
          currentStringType = null;
        }
        break;
    }
  }
  return !currentOpenBracketCount && !currentOpenParensCount;
};
const isMemberExpressionNode = NOOP;
const isMemberExpression = isMemberExpressionBrowser;
const fnExpRE = /^\s*(?:async\s*)?(?:\([^)]*?\)|[\w$_]+)\s*(?::[^=]+)?=>|^\s*(?:async\s+)?function(?:\s+[\w$]+)?\s*\(/;
const isFnExpressionBrowser = (exp) => fnExpRE.test(getExpSource(exp));
const isFnExpressionNode = NOOP;
const isFnExpression = isFnExpressionBrowser;
function advancePositionWithClone(pos, source, numberOfCharacters = source.length) {
  return advancePositionWithMutation(
    {
      offset: pos.offset,
      line: pos.line,
      column: pos.column
    },
    source,
    numberOfCharacters
  );
}
function advancePositionWithMutation(pos, source, numberOfCharacters = source.length) {
  let linesCount = 0;
  let lastNewLinePos = -1;
  for (let i = 0; i < numberOfCharacters; i++) {
    if (source.charCodeAt(i) === 10) {
      linesCount++;
      lastNewLinePos = i;
    }
  }
  pos.offset += numberOfCharacters;
  pos.line += linesCount;
  pos.column = lastNewLinePos === -1 ? pos.column + numberOfCharacters : numberOfCharacters - lastNewLinePos;
  return pos;
}
function assert(condition, msg) {
  if (!condition) {
    throw new Error(msg || `unexpected compiler condition`);
  }
}
function findDir(node, name, allowEmpty = false) {
  for (let i = 0; i < node.props.length; i++) {
    const p = node.props[i];
    if (p.type === 7 && (allowEmpty || p.exp) && (isString(name) ? p.name === name : name.test(p.name))) {
      return p;
    }
  }
}
function findProp(node, name, dynamicOnly = false, allowEmpty = false) {
  for (let i = 0; i < node.props.length; i++) {
    const p = node.props[i];
    if (p.type === 6) {
      if (dynamicOnly) continue;
      if (p.name === name && (p.value || allowEmpty)) {
        return p;
      }
    } else if (p.name === "bind" && (p.exp || allowEmpty) && isStaticArgOf(p.arg, name)) {
      return p;
    }
  }
}
function isStaticArgOf(arg, name) {
  return !!(arg && isStaticExp(arg) && arg.content === name);
}
function hasDynamicKeyVBind(node) {
  return node.props.some(
    (p) => p.type === 7 && p.name === "bind" && (!p.arg || // v-bind="obj"
    p.arg.type !== 4 || // v-bind:[_ctx.foo]
    !p.arg.isStatic)
    // v-bind:[foo]
  );
}
function isText$1(node) {
  return node.type === 5 || node.type === 2;
}
function isVPre(p) {
  return p.type === 7 && p.name === "pre";
}
function isVSlot(p) {
  return p.type === 7 && p.name === "slot";
}
function isTemplateNode(node) {
  return node.type === 1 && node.tagType === 3;
}
function isSlotOutlet(node) {
  return node.type === 1 && node.tagType === 2;
}
const propsHelperSet = /* @__PURE__ */ new Set([NORMALIZE_PROPS, GUARD_REACTIVE_PROPS]);
function getUnnormalizedProps(props, callPath = []) {
  if (props && !isString(props) && props.type === 14) {
    const callee = props.callee;
    if (!isString(callee) && propsHelperSet.has(callee)) {
      return getUnnormalizedProps(
        props.arguments[0],
        callPath.concat(props)
      );
    }
  }
  return [props, callPath];
}
function injectProp(node, prop, context) {
  let propsWithInjection;
  let props = node.type === 13 ? node.props : node.arguments[2];
  let callPath = [];
  let parentCall;
  if (props && !isString(props) && props.type === 14) {
    const ret = getUnnormalizedProps(props);
    props = ret[0];
    callPath = ret[1];
    parentCall = callPath[callPath.length - 1];
  }
  if (props == null || isString(props)) {
    propsWithInjection = createObjectExpression([prop]);
  } else if (props.type === 14) {
    const first = props.arguments[0];
    if (!isString(first) && first.type === 15) {
      if (!hasProp(prop, first)) {
        first.properties.unshift(prop);
      }
    } else {
      if (props.callee === TO_HANDLERS) {
        propsWithInjection = createCallExpression(context.helper(MERGE_PROPS), [
          createObjectExpression([prop]),
          props
        ]);
      } else {
        props.arguments.unshift(createObjectExpression([prop]));
      }
    }
    !propsWithInjection && (propsWithInjection = props);
  } else if (props.type === 15) {
    if (!hasProp(prop, props)) {
      props.properties.unshift(prop);
    }
    propsWithInjection = props;
  } else {
    propsWithInjection = createCallExpression(context.helper(MERGE_PROPS), [
      createObjectExpression([prop]),
      props
    ]);
    if (parentCall && parentCall.callee === GUARD_REACTIVE_PROPS) {
      parentCall = callPath[callPath.length - 2];
    }
  }
  if (node.type === 13) {
    if (parentCall) {
      parentCall.arguments[0] = propsWithInjection;
    } else {
      node.props = propsWithInjection;
    }
  } else {
    if (parentCall) {
      parentCall.arguments[0] = propsWithInjection;
    } else {
      node.arguments[2] = propsWithInjection;
    }
  }
}
function hasProp(prop, props) {
  let result = false;
  if (prop.key.type === 4) {
    const propKeyName = prop.key.content;
    result = props.properties.some(
      (p) => p.key.type === 4 && p.key.content === propKeyName
    );
  }
  return result;
}
function toValidAssetId(name, type) {
  return `_${type}_${name.replace(/[^\w]/g, (searchValue, replaceValue) => {
    return searchValue === "-" ? "_" : name.charCodeAt(replaceValue).toString();
  })}`;
}
function hasScopeRef(node, ids) {
  if (!node || Object.keys(ids).length === 0) {
    return false;
  }
  switch (node.type) {
    case 1:
      for (let i = 0; i < node.props.length; i++) {
        const p = node.props[i];
        if (p.type === 7 && (hasScopeRef(p.arg, ids) || hasScopeRef(p.exp, ids))) {
          return true;
        }
      }
      return node.children.some((c) => hasScopeRef(c, ids));
    case 11:
      if (hasScopeRef(node.source, ids)) {
        return true;
      }
      return node.children.some((c) => hasScopeRef(c, ids));
    case 9:
      return node.branches.some((b) => hasScopeRef(b, ids));
    case 10:
      if (hasScopeRef(node.condition, ids)) {
        return true;
      }
      return node.children.some((c) => hasScopeRef(c, ids));
    case 4:
      return !node.isStatic && isSimpleIdentifier(node.content) && !!ids[node.content];
    case 8:
      return node.children.some((c) => isObject(c) && hasScopeRef(c, ids));
    case 5:
    case 12:
      return hasScopeRef(node.content, ids);
    case 2:
    case 3:
    case 20:
      return false;
    default:
      return false;
  }
}
function getMemoedVNodeCall(node) {
  if (node.type === 14 && node.callee === WITH_MEMO) {
    return node.arguments[1].returns;
  } else {
    return node;
  }
}
const forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+(\S[\s\S]*)/;
function isAllWhitespace(str) {
  for (let i = 0; i < str.length; i++) {
    if (!isWhitespace(str.charCodeAt(i))) {
      return false;
    }
  }
  return true;
}
function isWhitespaceText(node) {
  return node.type === 2 && isAllWhitespace(node.content) || node.type === 12 && isWhitespaceText(node.content);
}
function isCommentOrWhitespace(node) {
  return node.type === 3 || isWhitespaceText(node);
}
const defaultParserOptions = {
  parseMode: "base",
  ns: 0,
  delimiters: [`{{`, `}}`],
  getNamespace: () => 0,
  isVoidTag: NO,
  isPreTag: NO,
  isIgnoreNewlineTag: NO,
  isCustomElement: NO,
  onError: defaultOnError,
  onWarn: defaultOnWarn,
  comments: false,
  prefixIdentifiers: false
};
let currentOptions = defaultParserOptions;
let currentRoot = null;
let currentInput = "";
let currentOpenTag = null;
let currentProp = null;
let currentAttrValue = "";
let currentAttrStartIndex = -1;
let currentAttrEndIndex = -1;
let inPre = 0;
let inVPre = false;
let currentVPreBoundary = null;
const stack = [];
const tokenizer = new Tokenizer(stack, {
  onerr: emitError,
  ontext(start, end) {
    onText(getSlice(start, end), start, end);
  },
  ontextentity(char, start, end) {
    onText(char, start, end);
  },
  oninterpolation(start, end) {
    if (inVPre) {
      return onText(getSlice(start, end), start, end);
    }
    let innerStart = start + tokenizer.delimiterOpen.length;
    let innerEnd = end - tokenizer.delimiterClose.length;
    while (isWhitespace(currentInput.charCodeAt(innerStart))) {
      innerStart++;
    }
    while (isWhitespace(currentInput.charCodeAt(innerEnd - 1))) {
      innerEnd--;
    }
    let exp = getSlice(innerStart, innerEnd);
    if (exp.includes("&")) {
      {
        exp = currentOptions.decodeEntities(exp, false);
      }
    }
    addNode({
      type: 5,
      content: createExp(exp, false, getLoc(innerStart, innerEnd)),
      loc: getLoc(start, end)
    });
  },
  onopentagname(start, end) {
    const name = getSlice(start, end);
    currentOpenTag = {
      type: 1,
      tag: name,
      ns: currentOptions.getNamespace(name, stack[0], currentOptions.ns),
      tagType: 0,
      // will be refined on tag close
      props: [],
      children: [],
      loc: getLoc(start - 1, end),
      codegenNode: void 0
    };
  },
  onopentagend(end) {
    endOpenTag(end);
  },
  onclosetag(start, end) {
    const name = getSlice(start, end);
    if (!currentOptions.isVoidTag(name)) {
      let found = false;
      for (let i = 0; i < stack.length; i++) {
        const e = stack[i];
        if (e.tag.toLowerCase() === name.toLowerCase()) {
          found = true;
          if (i > 0) {
            emitError(24, stack[0].loc.start.offset);
          }
          for (let j = 0; j <= i; j++) {
            const el = stack.shift();
            onCloseTag(el, end, j < i);
          }
          break;
        }
      }
      if (!found) {
        emitError(23, backTrack(start, 60));
      }
    }
  },
  onselfclosingtag(end) {
    const name = currentOpenTag.tag;
    currentOpenTag.isSelfClosing = true;
    endOpenTag(end);
    if (stack[0] && stack[0].tag === name) {
      onCloseTag(stack.shift(), end);
    }
  },
  onattribname(start, end) {
    currentProp = {
      type: 6,
      name: getSlice(start, end),
      nameLoc: getLoc(start, end),
      value: void 0,
      loc: getLoc(start)
    };
  },
  ondirname(start, end) {
    const raw = getSlice(start, end);
    const name = raw === "." || raw === ":" ? "bind" : raw === "@" ? "on" : raw === "#" ? "slot" : raw.slice(2);
    if (!inVPre && name === "") {
      emitError(26, start);
    }
    if (inVPre || name === "") {
      currentProp = {
        type: 6,
        name: raw,
        nameLoc: getLoc(start, end),
        value: void 0,
        loc: getLoc(start)
      };
    } else {
      currentProp = {
        type: 7,
        name,
        rawName: raw,
        exp: void 0,
        arg: void 0,
        modifiers: raw === "." ? [createSimpleExpression("prop")] : [],
        loc: getLoc(start)
      };
      if (name === "pre") {
        inVPre = tokenizer.inVPre = true;
        currentVPreBoundary = currentOpenTag;
        const props = currentOpenTag.props;
        for (let i = 0; i < props.length; i++) {
          if (props[i].type === 7) {
            props[i] = dirToAttr(props[i]);
          }
        }
      }
    }
  },
  ondirarg(start, end) {
    if (start === end) return;
    const arg = getSlice(start, end);
    if (inVPre && !isVPre(currentProp)) {
      currentProp.name += arg;
      setLocEnd(currentProp.nameLoc, end);
    } else {
      const isStatic = arg[0] !== `[`;
      currentProp.arg = createExp(
        isStatic ? arg : arg.slice(1, -1),
        isStatic,
        getLoc(start, end),
        isStatic ? 3 : 0
      );
    }
  },
  ondirmodifier(start, end) {
    const mod = getSlice(start, end);
    if (inVPre && !isVPre(currentProp)) {
      currentProp.name += "." + mod;
      setLocEnd(currentProp.nameLoc, end);
    } else if (currentProp.name === "slot") {
      const arg = currentProp.arg;
      if (arg) {
        arg.content += "." + mod;
        setLocEnd(arg.loc, end);
      }
    } else {
      const exp = createSimpleExpression(mod, true, getLoc(start, end));
      currentProp.modifiers.push(exp);
    }
  },
  onattribdata(start, end) {
    currentAttrValue += getSlice(start, end);
    if (currentAttrStartIndex < 0) currentAttrStartIndex = start;
    currentAttrEndIndex = end;
  },
  onattribentity(char, start, end) {
    currentAttrValue += char;
    if (currentAttrStartIndex < 0) currentAttrStartIndex = start;
    currentAttrEndIndex = end;
  },
  onattribnameend(end) {
    const start = currentProp.loc.start.offset;
    const name = getSlice(start, end);
    if (currentProp.type === 7) {
      currentProp.rawName = name;
    }
    if (currentOpenTag.props.some(
      (p) => (p.type === 7 ? p.rawName : p.name) === name
    )) {
      emitError(2, start);
    }
  },
  onattribend(quote, end) {
    if (currentOpenTag && currentProp) {
      setLocEnd(currentProp.loc, end);
      if (quote !== 0) {
        if (currentAttrValue.includes("&")) {
          currentAttrValue = currentOptions.decodeEntities(
            currentAttrValue,
            true
          );
        }
        if (currentProp.type === 6) {
          if (currentProp.name === "class") {
            currentAttrValue = condense(currentAttrValue).trim();
          }
          if (quote === 1 && !currentAttrValue) {
            emitError(13, end);
          }
          currentProp.value = {
            type: 2,
            content: currentAttrValue,
            loc: quote === 1 ? getLoc(currentAttrStartIndex, currentAttrEndIndex) : getLoc(currentAttrStartIndex - 1, currentAttrEndIndex + 1)
          };
          if (tokenizer.inSFCRoot && currentOpenTag.tag === "template" && currentProp.name === "lang" && currentAttrValue && currentAttrValue !== "html") {
            tokenizer.enterRCDATA(toCharCodes(`</template`), 0);
          }
        } else {
          let expParseMode = 0;
          currentProp.exp = createExp(
            currentAttrValue,
            false,
            getLoc(currentAttrStartIndex, currentAttrEndIndex),
            0,
            expParseMode
          );
          if (currentProp.name === "for") {
            currentProp.forParseResult = parseForExpression(currentProp.exp);
          }
          let syncIndex = -1;
          if (currentProp.name === "bind" && (syncIndex = currentProp.modifiers.findIndex(
            (mod) => mod.content === "sync"
          )) > -1 && checkCompatEnabled(
            "COMPILER_V_BIND_SYNC",
            currentOptions,
            currentProp.loc,
            currentProp.arg.loc.source
          )) {
            currentProp.name = "model";
            currentProp.modifiers.splice(syncIndex, 1);
          }
        }
      }
      if (currentProp.type !== 7 || currentProp.name !== "pre") {
        currentOpenTag.props.push(currentProp);
      }
    }
    currentAttrValue = "";
    currentAttrStartIndex = currentAttrEndIndex = -1;
  },
  oncomment(start, end) {
    if (currentOptions.comments) {
      addNode({
        type: 3,
        content: getSlice(start, end),
        loc: getLoc(start - 4, end + 3)
      });
    }
  },
  onend() {
    const end = currentInput.length;
    for (let index2 = 0; index2 < stack.length; index2++) {
      onCloseTag(stack[index2], end - 1);
      emitError(24, stack[index2].loc.start.offset);
    }
  },
  oncdata(start, end) {
    if (stack[0].ns !== 0) {
      onText(getSlice(start, end), start, end);
    } else {
      emitError(1, start - 9);
    }
  },
  onprocessinginstruction(start) {
    if ((stack[0] ? stack[0].ns : currentOptions.ns) === 0) {
      emitError(
        21,
        start - 1
      );
    }
  }
});
const forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
const stripParensRE = /^\(|\)$/g;
function parseForExpression(input) {
  const loc = input.loc;
  const exp = input.content;
  const inMatch = exp.match(forAliasRE);
  if (!inMatch) return;
  const [, LHS, RHS] = inMatch;
  const createAliasExpression = (content, offset, asParam = false) => {
    const start = loc.start.offset + offset;
    const end = start + content.length;
    return createExp(
      content,
      false,
      getLoc(start, end),
      0,
      asParam ? 1 : 0
      /* Normal */
    );
  };
  const result = {
    source: createAliasExpression(RHS.trim(), exp.indexOf(RHS, LHS.length)),
    value: void 0,
    key: void 0,
    index: void 0,
    finalized: false
  };
  let valueContent = LHS.trim().replace(stripParensRE, "").trim();
  const trimmedOffset = LHS.indexOf(valueContent);
  const iteratorMatch = valueContent.match(forIteratorRE);
  if (iteratorMatch) {
    valueContent = valueContent.replace(forIteratorRE, "").trim();
    const keyContent = iteratorMatch[1].trim();
    let keyOffset;
    if (keyContent) {
      keyOffset = exp.indexOf(keyContent, trimmedOffset + valueContent.length);
      result.key = createAliasExpression(keyContent, keyOffset, true);
    }
    if (iteratorMatch[2]) {
      const indexContent = iteratorMatch[2].trim();
      if (indexContent) {
        result.index = createAliasExpression(
          indexContent,
          exp.indexOf(
            indexContent,
            result.key ? keyOffset + keyContent.length : trimmedOffset + valueContent.length
          ),
          true
        );
      }
    }
  }
  if (valueContent) {
    result.value = createAliasExpression(valueContent, trimmedOffset, true);
  }
  return result;
}
function getSlice(start, end) {
  return currentInput.slice(start, end);
}
function endOpenTag(end) {
  if (tokenizer.inSFCRoot) {
    currentOpenTag.innerLoc = getLoc(end + 1, end + 1);
  }
  addNode(currentOpenTag);
  const { tag, ns } = currentOpenTag;
  if (ns === 0 && currentOptions.isPreTag(tag)) {
    inPre++;
  }
  if (currentOptions.isVoidTag(tag)) {
    onCloseTag(currentOpenTag, end);
  } else {
    stack.unshift(currentOpenTag);
    if (ns === 1 || ns === 2) {
      tokenizer.inXML = true;
    }
  }
  currentOpenTag = null;
}
function onText(content, start, end) {
  {
    const tag = stack[0] && stack[0].tag;
    if (tag !== "script" && tag !== "style" && content.includes("&")) {
      content = currentOptions.decodeEntities(content, false);
    }
  }
  const parent = stack[0] || currentRoot;
  const lastNode = parent.children[parent.children.length - 1];
  if (lastNode && lastNode.type === 2) {
    lastNode.content += content;
    setLocEnd(lastNode.loc, end);
  } else {
    parent.children.push({
      type: 2,
      content,
      loc: getLoc(start, end)
    });
  }
}
function onCloseTag(el, end, isImplied = false) {
  if (isImplied) {
    setLocEnd(el.loc, backTrack(end, 60));
  } else {
    setLocEnd(el.loc, lookAhead(end, 62) + 1);
  }
  if (tokenizer.inSFCRoot) {
    if (el.children.length) {
      el.innerLoc.end = extend$1({}, el.children[el.children.length - 1].loc.end);
    } else {
      el.innerLoc.end = extend$1({}, el.innerLoc.start);
    }
    el.innerLoc.source = getSlice(
      el.innerLoc.start.offset,
      el.innerLoc.end.offset
    );
  }
  const { tag, ns, children } = el;
  if (!inVPre) {
    if (tag === "slot") {
      el.tagType = 2;
    } else if (isFragmentTemplate(el)) {
      el.tagType = 3;
    } else if (isComponent(el)) {
      el.tagType = 1;
    }
  }
  if (!tokenizer.inRCDATA) {
    el.children = condenseWhitespace(children);
  }
  if (ns === 0 && currentOptions.isIgnoreNewlineTag(tag)) {
    const first = children[0];
    if (first && first.type === 2) {
      first.content = first.content.replace(/^\r?\n/, "");
    }
  }
  if (ns === 0 && currentOptions.isPreTag(tag)) {
    inPre--;
  }
  if (currentVPreBoundary === el) {
    inVPre = tokenizer.inVPre = false;
    currentVPreBoundary = null;
  }
  if (tokenizer.inXML && (stack[0] ? stack[0].ns : currentOptions.ns) === 0) {
    tokenizer.inXML = false;
  }
  {
    const props = el.props;
    if (!tokenizer.inSFCRoot && isCompatEnabled(
      "COMPILER_NATIVE_TEMPLATE",
      currentOptions
    ) && el.tag === "template" && !isFragmentTemplate(el)) {
      const parent = stack[0] || currentRoot;
      const index2 = parent.children.indexOf(el);
      parent.children.splice(index2, 1, ...el.children);
    }
    const inlineTemplateProp = props.find(
      (p) => p.type === 6 && p.name === "inline-template"
    );
    if (inlineTemplateProp && checkCompatEnabled(
      "COMPILER_INLINE_TEMPLATE",
      currentOptions,
      inlineTemplateProp.loc
    ) && el.children.length) {
      inlineTemplateProp.value = {
        type: 2,
        content: getSlice(
          el.children[0].loc.start.offset,
          el.children[el.children.length - 1].loc.end.offset
        ),
        loc: inlineTemplateProp.loc
      };
    }
  }
}
function lookAhead(index2, c) {
  let i = index2;
  while (currentInput.charCodeAt(i) !== c && i < currentInput.length - 1) i++;
  return i;
}
function backTrack(index2, c) {
  let i = index2;
  while (currentInput.charCodeAt(i) !== c && i >= 0) i--;
  return i;
}
const specialTemplateDir = /* @__PURE__ */ new Set(["if", "else", "else-if", "for", "slot"]);
function isFragmentTemplate({ tag, props }) {
  if (tag === "template") {
    for (let i = 0; i < props.length; i++) {
      if (props[i].type === 7 && specialTemplateDir.has(props[i].name)) {
        return true;
      }
    }
  }
  return false;
}
function isComponent({ tag, props }) {
  if (currentOptions.isCustomElement(tag)) {
    return false;
  }
  if (tag === "component" || isUpperCase(tag.charCodeAt(0)) || isCoreComponent(tag) || currentOptions.isBuiltInComponent && currentOptions.isBuiltInComponent(tag) || currentOptions.isNativeTag && !currentOptions.isNativeTag(tag)) {
    return true;
  }
  for (let i = 0; i < props.length; i++) {
    const p = props[i];
    if (p.type === 6) {
      if (p.name === "is" && p.value) {
        if (p.value.content.startsWith("vue:")) {
          return true;
        } else if (checkCompatEnabled(
          "COMPILER_IS_ON_ELEMENT",
          currentOptions,
          p.loc
        )) {
          return true;
        }
      }
    } else if (
      // :is on plain element - only treat as component in compat mode
      p.name === "bind" && isStaticArgOf(p.arg, "is") && checkCompatEnabled(
        "COMPILER_IS_ON_ELEMENT",
        currentOptions,
        p.loc
      )
    ) {
      return true;
    }
  }
  return false;
}
function isUpperCase(c) {
  return c > 64 && c < 91;
}
const windowsNewlineRE = /\r\n/g;
function condenseWhitespace(nodes) {
  const shouldCondense = currentOptions.whitespace !== "preserve";
  let removedWhitespace = false;
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node.type === 2) {
      if (!inPre) {
        if (isAllWhitespace(node.content)) {
          const prev = nodes[i - 1] && nodes[i - 1].type;
          const next = nodes[i + 1] && nodes[i + 1].type;
          if (!prev || !next || shouldCondense && (prev === 3 && (next === 3 || next === 1) || prev === 1 && (next === 3 || next === 1 && hasNewlineChar(node.content)))) {
            removedWhitespace = true;
            nodes[i] = null;
          } else {
            node.content = " ";
          }
        } else if (shouldCondense) {
          node.content = condense(node.content);
        }
      } else {
        node.content = node.content.replace(windowsNewlineRE, "\n");
      }
    }
  }
  return removedWhitespace ? nodes.filter(Boolean) : nodes;
}
function hasNewlineChar(str) {
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    if (c === 10 || c === 13) {
      return true;
    }
  }
  return false;
}
function condense(str) {
  let ret = "";
  let prevCharIsWhitespace = false;
  for (let i = 0; i < str.length; i++) {
    if (isWhitespace(str.charCodeAt(i))) {
      if (!prevCharIsWhitespace) {
        ret += " ";
        prevCharIsWhitespace = true;
      }
    } else {
      ret += str[i];
      prevCharIsWhitespace = false;
    }
  }
  return ret;
}
function addNode(node) {
  (stack[0] || currentRoot).children.push(node);
}
function getLoc(start, end) {
  return {
    start: tokenizer.getPos(start),
    // @ts-expect-error allow late attachment
    end: end == null ? end : tokenizer.getPos(end),
    // @ts-expect-error allow late attachment
    source: end == null ? end : getSlice(start, end)
  };
}
function cloneLoc(loc) {
  return getLoc(loc.start.offset, loc.end.offset);
}
function setLocEnd(loc, end) {
  loc.end = tokenizer.getPos(end);
  loc.source = getSlice(loc.start.offset, end);
}
function dirToAttr(dir) {
  const attr = {
    type: 6,
    name: dir.rawName,
    nameLoc: getLoc(
      dir.loc.start.offset,
      dir.loc.start.offset + dir.rawName.length
    ),
    value: void 0,
    loc: dir.loc
  };
  if (dir.exp) {
    const loc = dir.exp.loc;
    if (loc.end.offset < dir.loc.end.offset) {
      loc.start.offset--;
      loc.start.column--;
      loc.end.offset++;
      loc.end.column++;
    }
    attr.value = {
      type: 2,
      content: dir.exp.content,
      loc
    };
  }
  return attr;
}
function createExp(content, isStatic = false, loc, constType = 0, parseMode = 0) {
  const exp = createSimpleExpression(content, isStatic, loc, constType);
  return exp;
}
function emitError(code, index2, message) {
  currentOptions.onError(
    createCompilerError(code, getLoc(index2, index2))
  );
}
function reset() {
  tokenizer.reset();
  currentOpenTag = null;
  currentProp = null;
  currentAttrValue = "";
  currentAttrStartIndex = -1;
  currentAttrEndIndex = -1;
  stack.length = 0;
}
function baseParse(input, options) {
  reset();
  currentInput = input;
  currentOptions = extend$1({}, defaultParserOptions);
  if (options) {
    let key;
    for (key in options) {
      if (options[key] != null) {
        currentOptions[key] = options[key];
      }
    }
  }
  tokenizer.mode = currentOptions.parseMode === "html" ? 1 : currentOptions.parseMode === "sfc" ? 2 : 0;
  tokenizer.inXML = currentOptions.ns === 1 || currentOptions.ns === 2;
  const delimiters = options && options.delimiters;
  if (delimiters) {
    tokenizer.delimiterOpen = toCharCodes(delimiters[0]);
    tokenizer.delimiterClose = toCharCodes(delimiters[1]);
  }
  const root = currentRoot = createRoot([], input);
  tokenizer.parse(currentInput);
  root.loc = getLoc(0, input.length);
  root.children = condenseWhitespace(root.children);
  currentRoot = null;
  return root;
}
function cacheStatic(root, context) {
  walk(
    root,
    void 0,
    context,
    // Root node is unfortunately non-hoistable due to potential parent
    // fallthrough attributes.
    !!getSingleElementRoot(root)
  );
}
function getSingleElementRoot(root) {
  const children = root.children.filter((x) => x.type !== 3);
  return children.length === 1 && children[0].type === 1 && !isSlotOutlet(children[0]) ? children[0] : null;
}
function walk(node, parent, context, doNotHoistNode = false, inFor = false) {
  const { children } = node;
  const toCache = [];
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (child.type === 1 && child.tagType === 0) {
      const constantType = doNotHoistNode ? 0 : getConstantType(child, context);
      if (constantType > 0) {
        if (constantType >= 2) {
          child.codegenNode.patchFlag = -1;
          toCache.push(child);
          continue;
        }
      } else {
        const codegenNode = child.codegenNode;
        if (codegenNode.type === 13) {
          const flag = codegenNode.patchFlag;
          if ((flag === void 0 || flag === 512 || flag === 1) && getGeneratedPropsConstantType(child, context) >= 2) {
            const props = getNodeProps(child);
            if (props) {
              codegenNode.props = context.hoist(props);
            }
          }
          if (codegenNode.dynamicProps) {
            codegenNode.dynamicProps = context.hoist(codegenNode.dynamicProps);
          }
        }
      }
    } else if (child.type === 12) {
      const constantType = doNotHoistNode ? 0 : getConstantType(child, context);
      if (constantType >= 2) {
        if (child.codegenNode.type === 14 && child.codegenNode.arguments.length > 0) {
          child.codegenNode.arguments.push(
            `-1`
          );
        }
        toCache.push(child);
        continue;
      }
    }
    if (child.type === 1) {
      const isComponent2 = child.tagType === 1;
      if (isComponent2) {
        context.scopes.vSlot++;
      }
      walk(child, node, context, false, inFor);
      if (isComponent2) {
        context.scopes.vSlot--;
      }
    } else if (child.type === 11) {
      walk(child, node, context, child.children.length === 1, true);
    } else if (child.type === 9) {
      for (let i2 = 0; i2 < child.branches.length; i2++) {
        walk(
          child.branches[i2],
          node,
          context,
          child.branches[i2].children.length === 1,
          inFor
        );
      }
    }
  }
  let cachedAsArray = false;
  if (toCache.length === children.length && node.type === 1) {
    if (node.tagType === 0 && node.codegenNode && node.codegenNode.type === 13 && isArray(node.codegenNode.children)) {
      node.codegenNode.children = getCacheExpression(
        createArrayExpression(node.codegenNode.children)
      );
      cachedAsArray = true;
    } else if (node.tagType === 1 && node.codegenNode && node.codegenNode.type === 13 && node.codegenNode.children && !isArray(node.codegenNode.children) && node.codegenNode.children.type === 15) {
      const slot = getSlotNode(node.codegenNode, "default");
      if (slot) {
        slot.returns = getCacheExpression(
          createArrayExpression(slot.returns)
        );
        cachedAsArray = true;
      }
    } else if (node.tagType === 3 && parent && parent.type === 1 && parent.tagType === 1 && parent.codegenNode && parent.codegenNode.type === 13 && parent.codegenNode.children && !isArray(parent.codegenNode.children) && parent.codegenNode.children.type === 15) {
      const slotName = findDir(node, "slot", true);
      const slot = slotName && slotName.arg && getSlotNode(parent.codegenNode, slotName.arg);
      if (slot) {
        slot.returns = getCacheExpression(
          createArrayExpression(slot.returns)
        );
        cachedAsArray = true;
      }
    }
  }
  if (!cachedAsArray) {
    for (const child of toCache) {
      child.codegenNode = context.cache(child.codegenNode);
    }
  }
  function getCacheExpression(value) {
    const exp = context.cache(value);
    exp.needArraySpread = true;
    return exp;
  }
  function getSlotNode(node2, name) {
    if (node2.children && !isArray(node2.children) && node2.children.type === 15) {
      const slot = node2.children.properties.find(
        (p) => p.key === name || p.key.content === name
      );
      return slot && slot.value;
    }
  }
  if (toCache.length && context.transformHoist) {
    context.transformHoist(children, context, node);
  }
}
function getConstantType(node, context) {
  const { constantCache } = context;
  switch (node.type) {
    case 1:
      if (node.tagType !== 0) {
        return 0;
      }
      const cached = constantCache.get(node);
      if (cached !== void 0) {
        return cached;
      }
      const codegenNode = node.codegenNode;
      if (codegenNode.type !== 13) {
        return 0;
      }
      if (codegenNode.isBlock && node.tag !== "svg" && node.tag !== "foreignObject" && node.tag !== "math") {
        return 0;
      }
      if (codegenNode.patchFlag === void 0) {
        let returnType2 = 3;
        const generatedPropsType = getGeneratedPropsConstantType(node, context);
        if (generatedPropsType === 0) {
          constantCache.set(node, 0);
          return 0;
        }
        if (generatedPropsType < returnType2) {
          returnType2 = generatedPropsType;
        }
        for (let i = 0; i < node.children.length; i++) {
          const childType = getConstantType(node.children[i], context);
          if (childType === 0) {
            constantCache.set(node, 0);
            return 0;
          }
          if (childType < returnType2) {
            returnType2 = childType;
          }
        }
        if (returnType2 > 1) {
          for (let i = 0; i < node.props.length; i++) {
            const p = node.props[i];
            if (p.type === 7 && p.name === "bind" && p.exp) {
              const expType = getConstantType(p.exp, context);
              if (expType === 0) {
                constantCache.set(node, 0);
                return 0;
              }
              if (expType < returnType2) {
                returnType2 = expType;
              }
            }
          }
        }
        if (codegenNode.isBlock) {
          for (let i = 0; i < node.props.length; i++) {
            const p = node.props[i];
            if (p.type === 7) {
              constantCache.set(node, 0);
              return 0;
            }
          }
          context.removeHelper(OPEN_BLOCK);
          context.removeHelper(
            getVNodeBlockHelper(context.inSSR, codegenNode.isComponent)
          );
          codegenNode.isBlock = false;
          context.helper(getVNodeHelper(context.inSSR, codegenNode.isComponent));
        }
        constantCache.set(node, returnType2);
        return returnType2;
      } else {
        constantCache.set(node, 0);
        return 0;
      }
    case 2:
    case 3:
      return 3;
    case 9:
    case 11:
    case 10:
      return 0;
    case 5:
    case 12:
      return getConstantType(node.content, context);
    case 4:
      return node.constType;
    case 8:
      let returnType = 3;
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        if (isString(child) || isSymbol(child)) {
          continue;
        }
        const childType = getConstantType(child, context);
        if (childType === 0) {
          return 0;
        } else if (childType < returnType) {
          returnType = childType;
        }
      }
      return returnType;
    case 20:
      return 2;
    default:
      return 0;
  }
}
const allowHoistedHelperSet = /* @__PURE__ */ new Set([
  NORMALIZE_CLASS,
  NORMALIZE_STYLE,
  NORMALIZE_PROPS,
  GUARD_REACTIVE_PROPS
]);
function getConstantTypeOfHelperCall(value, context) {
  if (value.type === 14 && !isString(value.callee) && allowHoistedHelperSet.has(value.callee)) {
    const arg = value.arguments[0];
    if (arg.type === 4) {
      return getConstantType(arg, context);
    } else if (arg.type === 14) {
      return getConstantTypeOfHelperCall(arg, context);
    }
  }
  return 0;
}
function getGeneratedPropsConstantType(node, context) {
  let returnType = 3;
  const props = getNodeProps(node);
  if (props && props.type === 15) {
    const { properties } = props;
    for (let i = 0; i < properties.length; i++) {
      const { key, value } = properties[i];
      const keyType = getConstantType(key, context);
      if (keyType === 0) {
        return keyType;
      }
      if (keyType < returnType) {
        returnType = keyType;
      }
      let valueType;
      if (value.type === 4) {
        valueType = getConstantType(value, context);
      } else if (value.type === 14) {
        valueType = getConstantTypeOfHelperCall(value, context);
      } else {
        valueType = 0;
      }
      if (valueType === 0) {
        return valueType;
      }
      if (valueType < returnType) {
        returnType = valueType;
      }
    }
  }
  return returnType;
}
function getNodeProps(node) {
  const codegenNode = node.codegenNode;
  if (codegenNode.type === 13) {
    return codegenNode.props;
  }
}
function createTransformContext(root, {
  filename = "",
  prefixIdentifiers = false,
  hoistStatic = false,
  hmr = false,
  cacheHandlers = false,
  nodeTransforms = [],
  directiveTransforms = {},
  transformHoist = null,
  isBuiltInComponent = NOOP,
  isCustomElement = NOOP,
  expressionPlugins = [],
  scopeId = null,
  slotted = true,
  ssr = false,
  inSSR = false,
  ssrCssVars = ``,
  bindingMetadata = EMPTY_OBJ,
  inline = false,
  isTS = false,
  onError = defaultOnError,
  onWarn = defaultOnWarn,
  compatConfig
}) {
  const nameMatch = filename.replace(/\?.*$/, "").match(/([^/\\]+)\.\w+$/);
  const context = {
    // options
    filename,
    selfName: nameMatch && capitalize(camelize(nameMatch[1])),
    prefixIdentifiers,
    hoistStatic,
    hmr,
    cacheHandlers,
    nodeTransforms,
    directiveTransforms,
    transformHoist,
    isBuiltInComponent,
    isCustomElement,
    expressionPlugins,
    scopeId,
    slotted,
    ssr,
    inSSR,
    ssrCssVars,
    bindingMetadata,
    inline,
    isTS,
    onError,
    onWarn,
    compatConfig,
    // state
    root,
    helpers: /* @__PURE__ */ new Map(),
    components: /* @__PURE__ */ new Set(),
    directives: /* @__PURE__ */ new Set(),
    hoists: [],
    imports: [],
    cached: [],
    constantCache: /* @__PURE__ */ new WeakMap(),
    temps: 0,
    identifiers: /* @__PURE__ */ Object.create(null),
    scopes: {
      vFor: 0,
      vSlot: 0,
      vPre: 0,
      vOnce: 0
    },
    parent: null,
    grandParent: null,
    currentNode: root,
    childIndex: 0,
    inVOnce: false,
    // methods
    helper(name) {
      const count = context.helpers.get(name) || 0;
      context.helpers.set(name, count + 1);
      return name;
    },
    removeHelper(name) {
      const count = context.helpers.get(name);
      if (count) {
        const currentCount = count - 1;
        if (!currentCount) {
          context.helpers.delete(name);
        } else {
          context.helpers.set(name, currentCount);
        }
      }
    },
    helperString(name) {
      return `_${helperNameMap[context.helper(name)]}`;
    },
    replaceNode(node) {
      context.parent.children[context.childIndex] = context.currentNode = node;
    },
    removeNode(node) {
      const list = context.parent.children;
      const removalIndex = node ? list.indexOf(node) : context.currentNode ? context.childIndex : -1;
      if (!node || node === context.currentNode) {
        context.currentNode = null;
        context.onNodeRemoved();
      } else {
        if (context.childIndex > removalIndex) {
          context.childIndex--;
          context.onNodeRemoved();
        }
      }
      context.parent.children.splice(removalIndex, 1);
    },
    onNodeRemoved: NOOP,
    addIdentifiers(exp) {
    },
    removeIdentifiers(exp) {
    },
    hoist(exp) {
      if (isString(exp)) exp = createSimpleExpression(exp);
      context.hoists.push(exp);
      const identifier = createSimpleExpression(
        `_hoisted_${context.hoists.length}`,
        false,
        exp.loc,
        2
      );
      identifier.hoisted = exp;
      return identifier;
    },
    cache(exp, isVNode = false, inVOnce = false) {
      const cacheExp = createCacheExpression(
        context.cached.length,
        exp,
        isVNode,
        inVOnce
      );
      context.cached.push(cacheExp);
      return cacheExp;
    }
  };
  {
    context.filters = /* @__PURE__ */ new Set();
  }
  return context;
}
function transform(root, options) {
  const context = createTransformContext(root, options);
  traverseNode(root, context);
  if (options.hoistStatic) {
    cacheStatic(root, context);
  }
  if (!options.ssr) {
    createRootCodegen(root, context);
  }
  root.helpers = /* @__PURE__ */ new Set([...context.helpers.keys()]);
  root.components = [...context.components];
  root.directives = [...context.directives];
  root.imports = context.imports;
  root.hoists = context.hoists;
  root.temps = context.temps;
  root.cached = context.cached;
  root.transformed = true;
  {
    root.filters = [...context.filters];
  }
}
function createRootCodegen(root, context) {
  const { helper } = context;
  const { children } = root;
  if (children.length === 1) {
    const singleElementRootChild = getSingleElementRoot(root);
    if (singleElementRootChild && singleElementRootChild.codegenNode) {
      const codegenNode = singleElementRootChild.codegenNode;
      if (codegenNode.type === 13) {
        convertToBlock(codegenNode, context);
      }
      root.codegenNode = codegenNode;
    } else {
      root.codegenNode = children[0];
    }
  } else if (children.length > 1) {
    let patchFlag = 64;
    root.codegenNode = createVNodeCall(
      context,
      helper(FRAGMENT),
      void 0,
      root.children,
      patchFlag,
      void 0,
      void 0,
      true,
      void 0,
      false
    );
  } else ;
}
function traverseChildren(parent, context) {
  let i = 0;
  const nodeRemoved = () => {
    i--;
  };
  for (; i < parent.children.length; i++) {
    const child = parent.children[i];
    if (isString(child)) continue;
    context.grandParent = context.parent;
    context.parent = parent;
    context.childIndex = i;
    context.onNodeRemoved = nodeRemoved;
    traverseNode(child, context);
  }
}
function traverseNode(node, context) {
  context.currentNode = node;
  const { nodeTransforms } = context;
  const exitFns = [];
  for (let i2 = 0; i2 < nodeTransforms.length; i2++) {
    const onExit = nodeTransforms[i2](node, context);
    if (onExit) {
      if (isArray(onExit)) {
        exitFns.push(...onExit);
      } else {
        exitFns.push(onExit);
      }
    }
    if (!context.currentNode) {
      return;
    } else {
      node = context.currentNode;
    }
  }
  switch (node.type) {
    case 3:
      if (!context.ssr) {
        context.helper(CREATE_COMMENT);
      }
      break;
    case 5:
      if (!context.ssr) {
        context.helper(TO_DISPLAY_STRING);
      }
      break;
    // for container types, further traverse downwards
    case 9:
      for (let i2 = 0; i2 < node.branches.length; i2++) {
        traverseNode(node.branches[i2], context);
      }
      break;
    case 10:
    case 11:
    case 1:
    case 0:
      traverseChildren(node, context);
      break;
  }
  context.currentNode = node;
  let i = exitFns.length;
  while (i--) {
    exitFns[i]();
  }
}
function createStructuralDirectiveTransform(name, fn) {
  const matches2 = isString(name) ? (n) => n === name : (n) => name.test(n);
  return (node, context) => {
    if (node.type === 1) {
      const { props } = node;
      if (node.tagType === 3 && props.some(isVSlot)) {
        return;
      }
      const exitFns = [];
      for (let i = 0; i < props.length; i++) {
        const prop = props[i];
        if (prop.type === 7 && matches2(prop.name)) {
          props.splice(i, 1);
          i--;
          const onExit = fn(node, prop, context);
          if (onExit) exitFns.push(onExit);
        }
      }
      return exitFns;
    }
  };
}
const PURE_ANNOTATION = `/*@__PURE__*/`;
const aliasHelper = (s) => `${helperNameMap[s]}: _${helperNameMap[s]}`;
function createCodegenContext(ast, {
  mode = "function",
  prefixIdentifiers = mode === "module",
  sourceMap = false,
  filename = `template.vue.html`,
  scopeId = null,
  optimizeImports = false,
  runtimeGlobalName = `Vue`,
  runtimeModuleName = `vue`,
  ssrRuntimeModuleName = "vue/server-renderer",
  ssr = false,
  isTS = false,
  inSSR = false
}) {
  const context = {
    mode,
    prefixIdentifiers,
    sourceMap,
    filename,
    scopeId,
    optimizeImports,
    runtimeGlobalName,
    runtimeModuleName,
    ssrRuntimeModuleName,
    ssr,
    isTS,
    inSSR,
    source: ast.source,
    code: ``,
    column: 1,
    line: 1,
    offset: 0,
    indentLevel: 0,
    pure: false,
    map: void 0,
    helper(key) {
      return `_${helperNameMap[key]}`;
    },
    push(code, newlineIndex = -2, node) {
      context.code += code;
    },
    indent() {
      newline(++context.indentLevel);
    },
    deindent(withoutNewLine = false) {
      if (withoutNewLine) {
        --context.indentLevel;
      } else {
        newline(--context.indentLevel);
      }
    },
    newline() {
      newline(context.indentLevel);
    }
  };
  function newline(n) {
    context.push(
      "\n" + `  `.repeat(n),
      0
      /* Start */
    );
  }
  return context;
}
function generate(ast, options = {}) {
  const context = createCodegenContext(ast, options);
  if (options.onContextCreated) options.onContextCreated(context);
  const {
    mode,
    push,
    prefixIdentifiers,
    indent,
    deindent,
    newline,
    scopeId,
    ssr
  } = context;
  const helpers = Array.from(ast.helpers);
  const hasHelpers = helpers.length > 0;
  const useWithBlock = !prefixIdentifiers && mode !== "module";
  const preambleContext = context;
  {
    genFunctionPreamble(ast, preambleContext);
  }
  const functionName = ssr ? `ssrRender` : `render`;
  const args = ssr ? ["_ctx", "_push", "_parent", "_attrs"] : ["_ctx", "_cache"];
  const signature = args.join(", ");
  {
    push(`function ${functionName}(${signature}) {`);
  }
  indent();
  if (useWithBlock) {
    push(`with (_ctx) {`);
    indent();
    if (hasHelpers) {
      push(
        `const { ${helpers.map(aliasHelper).join(", ")} } = _Vue
`,
        -1
        /* End */
      );
      newline();
    }
  }
  if (ast.components.length) {
    genAssets(ast.components, "component", context);
    if (ast.directives.length || ast.temps > 0) {
      newline();
    }
  }
  if (ast.directives.length) {
    genAssets(ast.directives, "directive", context);
    if (ast.temps > 0) {
      newline();
    }
  }
  if (ast.filters && ast.filters.length) {
    newline();
    genAssets(ast.filters, "filter", context);
    newline();
  }
  if (ast.temps > 0) {
    push(`let `);
    for (let i = 0; i < ast.temps; i++) {
      push(`${i > 0 ? `, ` : ``}_temp${i}`);
    }
  }
  if (ast.components.length || ast.directives.length || ast.temps) {
    push(
      `
`,
      0
      /* Start */
    );
    newline();
  }
  if (!ssr) {
    push(`return `);
  }
  if (ast.codegenNode) {
    genNode(ast.codegenNode, context);
  } else {
    push(`null`);
  }
  if (useWithBlock) {
    deindent();
    push(`}`);
  }
  deindent();
  push(`}`);
  return {
    ast,
    code: context.code,
    preamble: ``,
    map: context.map ? context.map.toJSON() : void 0
  };
}
function genFunctionPreamble(ast, context) {
  const {
    ssr,
    prefixIdentifiers,
    push,
    newline,
    runtimeModuleName,
    runtimeGlobalName,
    ssrRuntimeModuleName
  } = context;
  const VueBinding = runtimeGlobalName;
  const helpers = Array.from(ast.helpers);
  if (helpers.length > 0) {
    {
      push(
        `const _Vue = ${VueBinding}
`,
        -1
        /* End */
      );
      if (ast.hoists.length) {
        const staticHelpers = [
          CREATE_VNODE,
          CREATE_ELEMENT_VNODE,
          CREATE_COMMENT,
          CREATE_TEXT,
          CREATE_STATIC
        ].filter((helper) => helpers.includes(helper)).map(aliasHelper).join(", ");
        push(
          `const { ${staticHelpers} } = _Vue
`,
          -1
          /* End */
        );
      }
    }
  }
  genHoists(ast.hoists, context);
  newline();
  push(`return `);
}
function genAssets(assets, type, { helper, push, newline, isTS }) {
  const resolver = helper(
    type === "filter" ? RESOLVE_FILTER : type === "component" ? RESOLVE_COMPONENT : RESOLVE_DIRECTIVE
  );
  for (let i = 0; i < assets.length; i++) {
    let id = assets[i];
    const maybeSelfReference = id.endsWith("__self");
    if (maybeSelfReference) {
      id = id.slice(0, -6);
    }
    push(
      `const ${toValidAssetId(id, type)} = ${resolver}(${JSON.stringify(id)}${maybeSelfReference ? `, true` : ``})${isTS ? `!` : ``}`
    );
    if (i < assets.length - 1) {
      newline();
    }
  }
}
function genHoists(hoists, context) {
  if (!hoists.length) {
    return;
  }
  context.pure = true;
  const { push, newline } = context;
  newline();
  for (let i = 0; i < hoists.length; i++) {
    const exp = hoists[i];
    if (exp) {
      push(`const _hoisted_${i + 1} = `);
      genNode(exp, context);
      newline();
    }
  }
  context.pure = false;
}
function genNodeListAsArray(nodes, context) {
  const multilines = nodes.length > 3 || false;
  context.push(`[`);
  multilines && context.indent();
  genNodeList(nodes, context, multilines);
  multilines && context.deindent();
  context.push(`]`);
}
function genNodeList(nodes, context, multilines = false, comma = true) {
  const { push, newline } = context;
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (isString(node)) {
      push(
        node,
        -3
        /* Unknown */
      );
    } else if (isArray(node)) {
      genNodeListAsArray(node, context);
    } else {
      genNode(node, context);
    }
    if (i < nodes.length - 1) {
      if (multilines) {
        comma && push(",");
        newline();
      } else {
        comma && push(", ");
      }
    }
  }
}
function genNode(node, context) {
  if (isString(node)) {
    context.push(
      node,
      -3
      /* Unknown */
    );
    return;
  }
  if (isSymbol(node)) {
    context.push(context.helper(node));
    return;
  }
  switch (node.type) {
    case 1:
    case 9:
    case 11:
      genNode(node.codegenNode, context);
      break;
    case 2:
      genText(node, context);
      break;
    case 4:
      genExpression(node, context);
      break;
    case 5:
      genInterpolation(node, context);
      break;
    case 12:
      genNode(node.codegenNode, context);
      break;
    case 8:
      genCompoundExpression(node, context);
      break;
    case 3:
      genComment(node, context);
      break;
    case 13:
      genVNodeCall(node, context);
      break;
    case 14:
      genCallExpression(node, context);
      break;
    case 15:
      genObjectExpression(node, context);
      break;
    case 17:
      genArrayExpression(node, context);
      break;
    case 18:
      genFunctionExpression(node, context);
      break;
    case 19:
      genConditionalExpression(node, context);
      break;
    case 20:
      genCacheExpression(node, context);
      break;
    case 21:
      genNodeList(node.body, context, true, false);
      break;
  }
}
function genText(node, context) {
  context.push(JSON.stringify(node.content), -3, node);
}
function genExpression(node, context) {
  const { content, isStatic } = node;
  context.push(
    isStatic ? JSON.stringify(content) : content,
    -3,
    node
  );
}
function genInterpolation(node, context) {
  const { push, helper, pure } = context;
  if (pure) push(PURE_ANNOTATION);
  push(`${helper(TO_DISPLAY_STRING)}(`);
  genNode(node.content, context);
  push(`)`);
}
function genCompoundExpression(node, context) {
  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];
    if (isString(child)) {
      context.push(
        child,
        -3
        /* Unknown */
      );
    } else {
      genNode(child, context);
    }
  }
}
function genExpressionAsPropertyKey(node, context) {
  const { push } = context;
  if (node.type === 8) {
    push(`[`);
    genCompoundExpression(node, context);
    push(`]`);
  } else if (node.isStatic) {
    const text = isSimpleIdentifier(node.content) ? node.content : JSON.stringify(node.content);
    push(text, -2, node);
  } else {
    push(`[${node.content}]`, -3, node);
  }
}
function genComment(node, context) {
  const { push, helper, pure } = context;
  if (pure) {
    push(PURE_ANNOTATION);
  }
  push(
    `${helper(CREATE_COMMENT)}(${JSON.stringify(node.content)})`,
    -3,
    node
  );
}
function genVNodeCall(node, context) {
  const { push, helper, pure } = context;
  const {
    tag,
    props,
    children,
    patchFlag,
    dynamicProps,
    directives,
    isBlock,
    disableTracking,
    isComponent: isComponent2
  } = node;
  let patchFlagString;
  if (patchFlag) {
    {
      patchFlagString = String(patchFlag);
    }
  }
  if (directives) {
    push(helper(WITH_DIRECTIVES) + `(`);
  }
  if (isBlock) {
    push(`(${helper(OPEN_BLOCK)}(${disableTracking ? `true` : ``}), `);
  }
  if (pure) {
    push(PURE_ANNOTATION);
  }
  const callHelper = isBlock ? getVNodeBlockHelper(context.inSSR, isComponent2) : getVNodeHelper(context.inSSR, isComponent2);
  push(helper(callHelper) + `(`, -2, node);
  genNodeList(
    genNullableArgs([tag, props, children, patchFlagString, dynamicProps]),
    context
  );
  push(`)`);
  if (isBlock) {
    push(`)`);
  }
  if (directives) {
    push(`, `);
    genNode(directives, context);
    push(`)`);
  }
}
function genNullableArgs(args) {
  let i = args.length;
  while (i--) {
    if (args[i] != null) break;
  }
  return args.slice(0, i + 1).map((arg) => arg || `null`);
}
function genCallExpression(node, context) {
  const { push, helper, pure } = context;
  const callee = isString(node.callee) ? node.callee : helper(node.callee);
  if (pure) {
    push(PURE_ANNOTATION);
  }
  push(callee + `(`, -2, node);
  genNodeList(node.arguments, context);
  push(`)`);
}
function genObjectExpression(node, context) {
  const { push, indent, deindent, newline } = context;
  const { properties } = node;
  if (!properties.length) {
    push(`{}`, -2, node);
    return;
  }
  const multilines = properties.length > 1 || false;
  push(multilines ? `{` : `{ `);
  multilines && indent();
  for (let i = 0; i < properties.length; i++) {
    const { key, value } = properties[i];
    genExpressionAsPropertyKey(key, context);
    push(`: `);
    genNode(value, context);
    if (i < properties.length - 1) {
      push(`,`);
      newline();
    }
  }
  multilines && deindent();
  push(multilines ? `}` : ` }`);
}
function genArrayExpression(node, context) {
  genNodeListAsArray(node.elements, context);
}
function genFunctionExpression(node, context) {
  const { push, indent, deindent } = context;
  const { params, returns, body, newline, isSlot } = node;
  if (isSlot) {
    push(`_${helperNameMap[WITH_CTX]}(`);
  }
  push(`(`, -2, node);
  if (isArray(params)) {
    genNodeList(params, context);
  } else if (params) {
    genNode(params, context);
  }
  push(`) => `);
  if (newline || body) {
    push(`{`);
    indent();
  }
  if (returns) {
    if (newline) {
      push(`return `);
    }
    if (isArray(returns)) {
      genNodeListAsArray(returns, context);
    } else {
      genNode(returns, context);
    }
  } else if (body) {
    genNode(body, context);
  }
  if (newline || body) {
    deindent();
    push(`}`);
  }
  if (isSlot) {
    if (node.isNonScopedSlot) {
      push(`, undefined, true`);
    }
    push(`)`);
  }
}
function genConditionalExpression(node, context) {
  const { test, consequent, alternate, newline: needNewline } = node;
  const { push, indent, deindent, newline } = context;
  if (test.type === 4) {
    const needsParens = !isSimpleIdentifier(test.content);
    needsParens && push(`(`);
    genExpression(test, context);
    needsParens && push(`)`);
  } else {
    push(`(`);
    genNode(test, context);
    push(`)`);
  }
  needNewline && indent();
  context.indentLevel++;
  needNewline || push(` `);
  push(`? `);
  genNode(consequent, context);
  context.indentLevel--;
  needNewline && newline();
  needNewline || push(` `);
  push(`: `);
  const isNested = alternate.type === 19;
  if (!isNested) {
    context.indentLevel++;
  }
  genNode(alternate, context);
  if (!isNested) {
    context.indentLevel--;
  }
  needNewline && deindent(
    true
    /* without newline */
  );
}
function genCacheExpression(node, context) {
  const { push, helper, indent, deindent, newline } = context;
  const { needPauseTracking, needArraySpread } = node;
  if (needArraySpread) {
    push(`[...(`);
  }
  push(`_cache[${node.index}] || (`);
  if (needPauseTracking) {
    indent();
    push(`${helper(SET_BLOCK_TRACKING)}(-1`);
    if (node.inVOnce) push(`, true`);
    push(`),`);
    newline();
    push(`(`);
  }
  push(`_cache[${node.index}] = `);
  genNode(node.value, context);
  if (needPauseTracking) {
    push(`).cacheIndex = ${node.index},`);
    newline();
    push(`${helper(SET_BLOCK_TRACKING)}(1),`);
    newline();
    push(`_cache[${node.index}]`);
    deindent();
  }
  push(`)`);
  if (needArraySpread) {
    push(`)]`);
  }
}
new RegExp(
  "\\b" + "arguments,await,break,case,catch,class,const,continue,debugger,default,delete,do,else,export,extends,finally,for,function,if,import,let,new,return,super,switch,throw,try,var,void,while,with,yield".split(",").join("\\b|\\b") + "\\b"
);
const transformExpression = (node, context) => {
  if (node.type === 5) {
    node.content = processExpression(
      node.content,
      context
    );
  } else if (node.type === 1) {
    const memo = findDir(node, "memo");
    for (let i = 0; i < node.props.length; i++) {
      const dir = node.props[i];
      if (dir.type === 7 && dir.name !== "for") {
        const exp = dir.exp;
        const arg = dir.arg;
        if (exp && exp.type === 4 && !(dir.name === "on" && arg) && // key has been processed in transformFor(vMemo + vFor)
        !(memo && arg && arg.type === 4 && arg.content === "key")) {
          dir.exp = processExpression(
            exp,
            context,
            // slot args must be processed as function params
            dir.name === "slot"
          );
        }
        if (arg && arg.type === 4 && !arg.isStatic) {
          dir.arg = processExpression(arg, context);
        }
      }
    }
  }
};
function processExpression(node, context, asParams = false, asRawStatements = false, localVars = Object.create(context.identifiers)) {
  {
    return node;
  }
}
function stringifyExpression(exp) {
  if (isString(exp)) {
    return exp;
  } else if (exp.type === 4) {
    return exp.content;
  } else {
    return exp.children.map(stringifyExpression).join("");
  }
}
const transformIf = createStructuralDirectiveTransform(
  /^(?:if|else|else-if)$/,
  (node, dir, context) => {
    return processIf(node, dir, context, (ifNode, branch, isRoot) => {
      const siblings = context.parent.children;
      let i = siblings.indexOf(ifNode);
      let key = 0;
      while (i-- >= 0) {
        const sibling = siblings[i];
        if (sibling && sibling.type === 9) {
          key += sibling.branches.length;
        }
      }
      return () => {
        if (isRoot) {
          ifNode.codegenNode = createCodegenNodeForBranch(
            branch,
            key,
            context
          );
        } else {
          const parentCondition = getParentCondition(ifNode.codegenNode);
          parentCondition.alternate = createCodegenNodeForBranch(
            branch,
            key + ifNode.branches.length - 1,
            context
          );
        }
      };
    });
  }
);
function processIf(node, dir, context, processCodegen) {
  if (dir.name !== "else" && (!dir.exp || !dir.exp.content.trim())) {
    const loc = dir.exp ? dir.exp.loc : node.loc;
    context.onError(
      createCompilerError(28, dir.loc)
    );
    dir.exp = createSimpleExpression(`true`, false, loc);
  }
  if (dir.name === "if") {
    const branch = createIfBranch(node, dir);
    const ifNode = {
      type: 9,
      loc: cloneLoc(node.loc),
      branches: [branch]
    };
    context.replaceNode(ifNode);
    if (processCodegen) {
      return processCodegen(ifNode, branch, true);
    }
  } else {
    const siblings = context.parent.children;
    let i = siblings.indexOf(node);
    while (i-- >= -1) {
      const sibling = siblings[i];
      if (sibling && isCommentOrWhitespace(sibling)) {
        context.removeNode(sibling);
        continue;
      }
      if (sibling && sibling.type === 9) {
        if ((dir.name === "else-if" || dir.name === "else") && sibling.branches[sibling.branches.length - 1].condition === void 0) {
          context.onError(
            createCompilerError(30, node.loc)
          );
        }
        context.removeNode();
        const branch = createIfBranch(node, dir);
        sibling.branches.push(branch);
        const onExit = processCodegen && processCodegen(sibling, branch, false);
        traverseNode(branch, context);
        if (onExit) onExit();
        context.currentNode = null;
      } else {
        context.onError(
          createCompilerError(30, node.loc)
        );
      }
      break;
    }
  }
}
function createIfBranch(node, dir) {
  const isTemplateIf = node.tagType === 3;
  return {
    type: 10,
    loc: node.loc,
    condition: dir.name === "else" ? void 0 : dir.exp,
    children: isTemplateIf && !findDir(node, "for") ? node.children : [node],
    userKey: findProp(node, `key`),
    isTemplateIf
  };
}
function createCodegenNodeForBranch(branch, keyIndex, context) {
  if (branch.condition) {
    return createConditionalExpression(
      branch.condition,
      createChildrenCodegenNode(branch, keyIndex, context),
      // make sure to pass in asBlock: true so that the comment node call
      // closes the current block.
      createCallExpression(context.helper(CREATE_COMMENT), [
        '""',
        "true"
      ])
    );
  } else {
    return createChildrenCodegenNode(branch, keyIndex, context);
  }
}
function createChildrenCodegenNode(branch, keyIndex, context) {
  const { helper } = context;
  const keyProperty = createObjectProperty(
    `key`,
    createSimpleExpression(
      `${keyIndex}`,
      false,
      locStub,
      2
    )
  );
  const { children } = branch;
  const firstChild = children[0];
  const needFragmentWrapper = children.length !== 1 || firstChild.type !== 1;
  if (needFragmentWrapper) {
    if (children.length === 1 && firstChild.type === 11) {
      const vnodeCall = firstChild.codegenNode;
      injectProp(vnodeCall, keyProperty, context);
      return vnodeCall;
    } else {
      let patchFlag = 64;
      return createVNodeCall(
        context,
        helper(FRAGMENT),
        createObjectExpression([keyProperty]),
        children,
        patchFlag,
        void 0,
        void 0,
        true,
        false,
        false,
        branch.loc
      );
    }
  } else {
    const ret = firstChild.codegenNode;
    const vnodeCall = getMemoedVNodeCall(ret);
    if (vnodeCall.type === 13) {
      convertToBlock(vnodeCall, context);
    }
    injectProp(vnodeCall, keyProperty, context);
    return ret;
  }
}
function getParentCondition(node) {
  while (true) {
    if (node.type === 19) {
      if (node.alternate.type === 19) {
        node = node.alternate;
      } else {
        return node;
      }
    } else if (node.type === 20) {
      node = node.value;
    }
  }
}
const transformFor = createStructuralDirectiveTransform(
  "for",
  (node, dir, context) => {
    const { helper, removeHelper } = context;
    return processFor(node, dir, context, (forNode) => {
      const renderExp = createCallExpression(helper(RENDER_LIST), [
        forNode.source
      ]);
      const isTemplate = isTemplateNode(node);
      const memo = findDir(node, "memo");
      const keyProp = findProp(node, `key`, false, true);
      keyProp && keyProp.type === 7;
      let keyExp = keyProp && (keyProp.type === 6 ? keyProp.value ? createSimpleExpression(keyProp.value.content, true) : void 0 : keyProp.exp);
      const keyProperty = keyProp && keyExp ? createObjectProperty(`key`, keyExp) : null;
      const isStableFragment = forNode.source.type === 4 && forNode.source.constType > 0;
      const fragmentFlag = isStableFragment ? 64 : keyProp ? 128 : 256;
      forNode.codegenNode = createVNodeCall(
        context,
        helper(FRAGMENT),
        void 0,
        renderExp,
        fragmentFlag,
        void 0,
        void 0,
        true,
        !isStableFragment,
        false,
        node.loc
      );
      return () => {
        let childBlock;
        const { children } = forNode;
        const needFragmentWrapper = children.length !== 1 || children[0].type !== 1;
        const slotOutlet = isSlotOutlet(node) ? node : isTemplate && node.children.length === 1 && isSlotOutlet(node.children[0]) ? node.children[0] : null;
        if (slotOutlet) {
          childBlock = slotOutlet.codegenNode;
          if (isTemplate && keyProperty) {
            injectProp(childBlock, keyProperty, context);
          }
        } else if (needFragmentWrapper) {
          childBlock = createVNodeCall(
            context,
            helper(FRAGMENT),
            keyProperty ? createObjectExpression([keyProperty]) : void 0,
            node.children,
            64,
            void 0,
            void 0,
            true,
            void 0,
            false
          );
        } else {
          childBlock = children[0].codegenNode;
          if (isTemplate && keyProperty) {
            injectProp(childBlock, keyProperty, context);
          }
          if (childBlock.isBlock !== !isStableFragment) {
            if (childBlock.isBlock) {
              removeHelper(OPEN_BLOCK);
              removeHelper(
                getVNodeBlockHelper(context.inSSR, childBlock.isComponent)
              );
            } else {
              removeHelper(
                getVNodeHelper(context.inSSR, childBlock.isComponent)
              );
            }
          }
          childBlock.isBlock = !isStableFragment;
          if (childBlock.isBlock) {
            helper(OPEN_BLOCK);
            helper(getVNodeBlockHelper(context.inSSR, childBlock.isComponent));
          } else {
            helper(getVNodeHelper(context.inSSR, childBlock.isComponent));
          }
        }
        if (memo) {
          const loop = createFunctionExpression(
            createForLoopParams(forNode.parseResult, [
              createSimpleExpression(`_cached`)
            ])
          );
          loop.body = createBlockStatement([
            createCompoundExpression([`const _memo = (`, memo.exp, `)`]),
            createCompoundExpression([
              `if (_cached && _cached.el`,
              ...keyExp ? [` && _cached.key === `, keyExp] : [],
              ` && ${context.helperString(
                IS_MEMO_SAME
              )}(_cached, _memo)) return _cached`
            ]),
            createCompoundExpression([`const _item = `, childBlock]),
            createSimpleExpression(`_item.memo = _memo`),
            createSimpleExpression(`return _item`)
          ]);
          renderExp.arguments.push(
            loop,
            createSimpleExpression(`_cache`),
            createSimpleExpression(String(context.cached.length))
          );
          context.cached.push(null);
        } else {
          renderExp.arguments.push(
            createFunctionExpression(
              createForLoopParams(forNode.parseResult),
              childBlock,
              true
            )
          );
        }
      };
    });
  }
);
function processFor(node, dir, context, processCodegen) {
  if (!dir.exp) {
    context.onError(
      createCompilerError(31, dir.loc)
    );
    return;
  }
  const parseResult = dir.forParseResult;
  if (!parseResult) {
    context.onError(
      createCompilerError(32, dir.loc)
    );
    return;
  }
  finalizeForParseResult(parseResult);
  const { addIdentifiers, removeIdentifiers, scopes } = context;
  const { source, value, key, index: index2 } = parseResult;
  const forNode = {
    type: 11,
    loc: dir.loc,
    source,
    valueAlias: value,
    keyAlias: key,
    objectIndexAlias: index2,
    parseResult,
    children: isTemplateNode(node) ? node.children : [node]
  };
  context.replaceNode(forNode);
  scopes.vFor++;
  const onExit = processCodegen && processCodegen(forNode);
  return () => {
    scopes.vFor--;
    if (onExit) onExit();
  };
}
function finalizeForParseResult(result, context) {
  if (result.finalized) return;
  result.finalized = true;
}
function createForLoopParams({ value, key, index: index2 }, memoArgs = []) {
  return createParamsList([value, key, index2, ...memoArgs]);
}
function createParamsList(args) {
  let i = args.length;
  while (i--) {
    if (args[i]) break;
  }
  return args.slice(0, i + 1).map((arg, i2) => arg || createSimpleExpression(`_`.repeat(i2 + 1), false));
}
const defaultFallback = createSimpleExpression(`undefined`, false);
const trackSlotScopes = (node, context) => {
  if (node.type === 1 && (node.tagType === 1 || node.tagType === 3)) {
    const vSlot = findDir(node, "slot");
    if (vSlot) {
      vSlot.exp;
      context.scopes.vSlot++;
      return () => {
        context.scopes.vSlot--;
      };
    }
  }
};
const trackVForSlotScopes = (node, context) => {
  let vFor;
  if (isTemplateNode(node) && node.props.some(isVSlot) && (vFor = findDir(node, "for"))) {
    const result = vFor.forParseResult;
    if (result) {
      finalizeForParseResult(result);
      const { value, key, index: index2 } = result;
      const { addIdentifiers, removeIdentifiers } = context;
      value && addIdentifiers(value);
      key && addIdentifiers(key);
      index2 && addIdentifiers(index2);
      return () => {
        value && removeIdentifiers(value);
        key && removeIdentifiers(key);
        index2 && removeIdentifiers(index2);
      };
    }
  }
};
const buildClientSlotFn = (props, _vForExp, children, loc) => createFunctionExpression(
  props,
  children,
  false,
  true,
  children.length ? children[0].loc : loc
);
function buildSlots(node, context, buildSlotFn = buildClientSlotFn) {
  context.helper(WITH_CTX);
  const { children, loc } = node;
  const slotsProperties = [];
  const dynamicSlots = [];
  let hasDynamicSlots = context.scopes.vSlot > 0 || context.scopes.vFor > 0;
  const onComponentSlot = findDir(node, "slot", true);
  if (onComponentSlot) {
    const { arg, exp } = onComponentSlot;
    if (arg && !isStaticExp(arg)) {
      hasDynamicSlots = true;
    }
    slotsProperties.push(
      createObjectProperty(
        arg || createSimpleExpression("default", true),
        buildSlotFn(exp, void 0, children, loc)
      )
    );
  }
  let hasTemplateSlots = false;
  let hasNamedDefaultSlot = false;
  const implicitDefaultChildren = [];
  const seenSlotNames = /* @__PURE__ */ new Set();
  let conditionalBranchIndex = 0;
  for (let i = 0; i < children.length; i++) {
    const slotElement = children[i];
    let slotDir;
    if (!isTemplateNode(slotElement) || !(slotDir = findDir(slotElement, "slot", true))) {
      if (slotElement.type !== 3) {
        implicitDefaultChildren.push(slotElement);
      }
      continue;
    }
    if (onComponentSlot) {
      context.onError(
        createCompilerError(37, slotDir.loc)
      );
      break;
    }
    hasTemplateSlots = true;
    const { children: slotChildren, loc: slotLoc } = slotElement;
    const {
      arg: slotName = createSimpleExpression(`default`, true),
      exp: slotProps,
      loc: dirLoc
    } = slotDir;
    let staticSlotName;
    if (isStaticExp(slotName)) {
      staticSlotName = slotName ? slotName.content : `default`;
    } else {
      hasDynamicSlots = true;
    }
    const vFor = findDir(slotElement, "for");
    const slotFunction = buildSlotFn(slotProps, vFor, slotChildren, slotLoc);
    let vIf;
    let vElse;
    if (vIf = findDir(slotElement, "if")) {
      hasDynamicSlots = true;
      dynamicSlots.push(
        createConditionalExpression(
          vIf.exp,
          buildDynamicSlot(slotName, slotFunction, conditionalBranchIndex++),
          defaultFallback
        )
      );
    } else if (vElse = findDir(
      slotElement,
      /^else(?:-if)?$/,
      true
      /* allowEmpty */
    )) {
      let j = i;
      let prev;
      while (j--) {
        prev = children[j];
        if (!isCommentOrWhitespace(prev)) {
          break;
        }
      }
      if (prev && isTemplateNode(prev) && findDir(prev, /^(?:else-)?if$/)) {
        let conditional = dynamicSlots[dynamicSlots.length - 1];
        while (conditional.alternate.type === 19) {
          conditional = conditional.alternate;
        }
        conditional.alternate = vElse.exp ? createConditionalExpression(
          vElse.exp,
          buildDynamicSlot(
            slotName,
            slotFunction,
            conditionalBranchIndex++
          ),
          defaultFallback
        ) : buildDynamicSlot(slotName, slotFunction, conditionalBranchIndex++);
      } else {
        context.onError(
          createCompilerError(30, vElse.loc)
        );
      }
    } else if (vFor) {
      hasDynamicSlots = true;
      const parseResult = vFor.forParseResult;
      if (parseResult) {
        finalizeForParseResult(parseResult);
        dynamicSlots.push(
          createCallExpression(context.helper(RENDER_LIST), [
            parseResult.source,
            createFunctionExpression(
              createForLoopParams(parseResult),
              buildDynamicSlot(slotName, slotFunction),
              true
            )
          ])
        );
      } else {
        context.onError(
          createCompilerError(
            32,
            vFor.loc
          )
        );
      }
    } else {
      if (staticSlotName) {
        if (seenSlotNames.has(staticSlotName)) {
          context.onError(
            createCompilerError(
              38,
              dirLoc
            )
          );
          continue;
        }
        seenSlotNames.add(staticSlotName);
        if (staticSlotName === "default") {
          hasNamedDefaultSlot = true;
        }
      }
      slotsProperties.push(createObjectProperty(slotName, slotFunction));
    }
  }
  if (!onComponentSlot) {
    const buildDefaultSlotProperty = (props, children2) => {
      const fn = buildSlotFn(props, void 0, children2, loc);
      if (context.compatConfig) {
        fn.isNonScopedSlot = true;
      }
      return createObjectProperty(`default`, fn);
    };
    if (!hasTemplateSlots) {
      slotsProperties.push(buildDefaultSlotProperty(void 0, children));
    } else if (implicitDefaultChildren.length && // #3766
    // with whitespace: 'preserve', whitespaces between slots will end up in
    // implicitDefaultChildren. Ignore if all implicit children are whitespaces.
    !implicitDefaultChildren.every(isWhitespaceText)) {
      if (hasNamedDefaultSlot) {
        context.onError(
          createCompilerError(
            39,
            implicitDefaultChildren[0].loc
          )
        );
      } else {
        slotsProperties.push(
          buildDefaultSlotProperty(void 0, implicitDefaultChildren)
        );
      }
    }
  }
  const slotFlag = hasDynamicSlots ? 2 : hasForwardedSlots(node.children) ? 3 : 1;
  let slots = createObjectExpression(
    slotsProperties.concat(
      createObjectProperty(
        `_`,
        // 2 = compiled but dynamic = can skip normalization, but must run diff
        // 1 = compiled and static = can skip normalization AND diff as optimized
        createSimpleExpression(
          slotFlag + ``,
          false
        )
      )
    ),
    loc
  );
  if (dynamicSlots.length) {
    slots = createCallExpression(context.helper(CREATE_SLOTS), [
      slots,
      createArrayExpression(dynamicSlots)
    ]);
  }
  return {
    slots,
    hasDynamicSlots
  };
}
function buildDynamicSlot(name, fn, index2) {
  const props = [
    createObjectProperty(`name`, name),
    createObjectProperty(`fn`, fn)
  ];
  if (index2 != null) {
    props.push(
      createObjectProperty(`key`, createSimpleExpression(String(index2), true))
    );
  }
  return createObjectExpression(props);
}
function hasForwardedSlots(children) {
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    switch (child.type) {
      case 1:
        if (child.tagType === 2 || hasForwardedSlots(child.children)) {
          return true;
        }
        break;
      case 9:
        if (hasForwardedSlots(child.branches)) return true;
        break;
      case 10:
      case 11:
        if (hasForwardedSlots(child.children)) return true;
        break;
    }
  }
  return false;
}
const directiveImportMap = /* @__PURE__ */ new WeakMap();
const transformElement = (node, context) => {
  return function postTransformElement() {
    node = context.currentNode;
    if (!(node.type === 1 && (node.tagType === 0 || node.tagType === 1))) {
      return;
    }
    const { tag, props } = node;
    const isComponent2 = node.tagType === 1;
    let vnodeTag = isComponent2 ? resolveComponentType(node, context) : `"${tag}"`;
    const isDynamicComponent = isObject(vnodeTag) && vnodeTag.callee === RESOLVE_DYNAMIC_COMPONENT;
    let vnodeProps;
    let vnodeChildren;
    let patchFlag = 0;
    let vnodeDynamicProps;
    let dynamicPropNames;
    let vnodeDirectives;
    let shouldUseBlock = (
      // dynamic component may resolve to plain elements
      isDynamicComponent || vnodeTag === TELEPORT || vnodeTag === SUSPENSE || !isComponent2 && // <svg> and <foreignObject> must be forced into blocks so that block
      // updates inside get proper isSVG flag at runtime. (#639, #643)
      // This is technically web-specific, but splitting the logic out of core
      // leads to too much unnecessary complexity.
      (tag === "svg" || tag === "foreignObject" || tag === "math")
    );
    if (props.length > 0) {
      const propsBuildResult = buildProps(
        node,
        context,
        void 0,
        isComponent2,
        isDynamicComponent
      );
      vnodeProps = propsBuildResult.props;
      patchFlag = propsBuildResult.patchFlag;
      dynamicPropNames = propsBuildResult.dynamicPropNames;
      const directives = propsBuildResult.directives;
      vnodeDirectives = directives && directives.length ? createArrayExpression(
        directives.map((dir) => buildDirectiveArgs(dir, context))
      ) : void 0;
      if (propsBuildResult.shouldUseBlock) {
        shouldUseBlock = true;
      }
    }
    if (node.children.length > 0) {
      if (vnodeTag === KEEP_ALIVE) {
        shouldUseBlock = true;
        patchFlag |= 1024;
      }
      const shouldBuildAsSlots = isComponent2 && // Teleport is not a real component and has dedicated runtime handling
      vnodeTag !== TELEPORT && // explained above.
      vnodeTag !== KEEP_ALIVE;
      if (shouldBuildAsSlots) {
        const { slots, hasDynamicSlots } = buildSlots(node, context);
        vnodeChildren = slots;
        if (hasDynamicSlots) {
          patchFlag |= 1024;
        }
      } else if (node.children.length === 1 && vnodeTag !== TELEPORT) {
        const child = node.children[0];
        const type = child.type;
        const hasDynamicTextChild = type === 5 || type === 8;
        if (hasDynamicTextChild && getConstantType(child, context) === 0) {
          patchFlag |= 1;
        }
        if (hasDynamicTextChild || type === 2) {
          vnodeChildren = child;
        } else {
          vnodeChildren = node.children;
        }
      } else {
        vnodeChildren = node.children;
      }
    }
    if (dynamicPropNames && dynamicPropNames.length) {
      vnodeDynamicProps = stringifyDynamicPropNames(dynamicPropNames);
    }
    node.codegenNode = createVNodeCall(
      context,
      vnodeTag,
      vnodeProps,
      vnodeChildren,
      patchFlag === 0 ? void 0 : patchFlag,
      vnodeDynamicProps,
      vnodeDirectives,
      !!shouldUseBlock,
      false,
      isComponent2,
      node.loc
    );
  };
};
function resolveComponentType(node, context, ssr = false) {
  let { tag } = node;
  const isExplicitDynamic = isComponentTag(tag);
  const isProp = findProp(
    node,
    "is",
    false,
    true
    /* allow empty */
  );
  if (isProp) {
    if (isExplicitDynamic || isCompatEnabled(
      "COMPILER_IS_ON_ELEMENT",
      context
    )) {
      let exp;
      if (isProp.type === 6) {
        exp = isProp.value && createSimpleExpression(isProp.value.content, true);
      } else {
        exp = isProp.exp;
        if (!exp) {
          exp = createSimpleExpression(`is`, false, isProp.arg.loc);
        }
      }
      if (exp) {
        return createCallExpression(context.helper(RESOLVE_DYNAMIC_COMPONENT), [
          exp
        ]);
      }
    } else if (isProp.type === 6 && isProp.value.content.startsWith("vue:")) {
      tag = isProp.value.content.slice(4);
    }
  }
  const builtIn = isCoreComponent(tag) || context.isBuiltInComponent(tag);
  if (builtIn) {
    if (!ssr) context.helper(builtIn);
    return builtIn;
  }
  context.helper(RESOLVE_COMPONENT);
  context.components.add(tag);
  return toValidAssetId(tag, `component`);
}
function buildProps(node, context, props = node.props, isComponent2, isDynamicComponent, ssr = false) {
  const { tag, loc: elementLoc, children } = node;
  let properties = [];
  const mergeArgs = [];
  const runtimeDirectives = [];
  const hasChildren = children.length > 0;
  let shouldUseBlock = false;
  let patchFlag = 0;
  let hasRef = false;
  let hasClassBinding = false;
  let hasStyleBinding = false;
  let hasHydrationEventBinding = false;
  let hasDynamicKeys = false;
  let hasVnodeHook = false;
  const dynamicPropNames = [];
  const pushMergeArg = (arg) => {
    if (properties.length) {
      mergeArgs.push(
        createObjectExpression(dedupeProperties(properties), elementLoc)
      );
      properties = [];
    }
    if (arg) mergeArgs.push(arg);
  };
  const pushRefVForMarker = () => {
    if (context.scopes.vFor > 0) {
      properties.push(
        createObjectProperty(
          createSimpleExpression("ref_for", true),
          createSimpleExpression("true")
        )
      );
    }
  };
  const analyzePatchFlag = ({ key, value }) => {
    if (isStaticExp(key)) {
      const name = key.content;
      const isEventHandler = isOn(name);
      if (isEventHandler && (!isComponent2 || isDynamicComponent) && // omit the flag for click handlers because hydration gives click
      // dedicated fast path.
      name.toLowerCase() !== "onclick" && // omit v-model handlers
      name !== "onUpdate:modelValue" && // omit onVnodeXXX hooks
      !isReservedProp(name)) {
        hasHydrationEventBinding = true;
      }
      if (isEventHandler && isReservedProp(name)) {
        hasVnodeHook = true;
      }
      if (isEventHandler && value.type === 14) {
        value = value.arguments[0];
      }
      if (value.type === 20 || (value.type === 4 || value.type === 8) && getConstantType(value, context) > 0) {
        return;
      }
      if (name === "ref") {
        hasRef = true;
      } else if (name === "class") {
        hasClassBinding = true;
      } else if (name === "style") {
        hasStyleBinding = true;
      } else if (name !== "key" && !dynamicPropNames.includes(name)) {
        dynamicPropNames.push(name);
      }
      if (isComponent2 && (name === "class" || name === "style") && !dynamicPropNames.includes(name)) {
        dynamicPropNames.push(name);
      }
    } else {
      hasDynamicKeys = true;
    }
  };
  for (let i = 0; i < props.length; i++) {
    const prop = props[i];
    if (prop.type === 6) {
      const { loc, name, nameLoc, value } = prop;
      let isStatic = true;
      if (name === "ref") {
        hasRef = true;
        pushRefVForMarker();
      }
      if (name === "is" && (isComponentTag(tag) || value && value.content.startsWith("vue:") || isCompatEnabled(
        "COMPILER_IS_ON_ELEMENT",
        context
      ))) {
        continue;
      }
      properties.push(
        createObjectProperty(
          createSimpleExpression(name, true, nameLoc),
          createSimpleExpression(
            value ? value.content : "",
            isStatic,
            value ? value.loc : loc
          )
        )
      );
    } else {
      const { name, arg, exp, loc, modifiers } = prop;
      const isVBind = name === "bind";
      const isVOn = name === "on";
      if (name === "slot") {
        if (!isComponent2) {
          context.onError(
            createCompilerError(40, loc)
          );
        }
        continue;
      }
      if (name === "once" || name === "memo") {
        continue;
      }
      if (name === "is" || isVBind && isStaticArgOf(arg, "is") && (isComponentTag(tag) || isCompatEnabled(
        "COMPILER_IS_ON_ELEMENT",
        context
      ))) {
        continue;
      }
      if (isVOn && ssr) {
        continue;
      }
      if (
        // #938: elements with dynamic keys should be forced into blocks
        isVBind && isStaticArgOf(arg, "key") || // inline before-update hooks need to force block so that it is invoked
        // before children
        isVOn && hasChildren && isStaticArgOf(arg, "vue:before-update")
      ) {
        shouldUseBlock = true;
      }
      if (isVBind && isStaticArgOf(arg, "ref")) {
        pushRefVForMarker();
      }
      if (!arg && (isVBind || isVOn)) {
        hasDynamicKeys = true;
        if (exp) {
          if (isVBind) {
            {
              pushMergeArg();
              if (isCompatEnabled(
                "COMPILER_V_BIND_OBJECT_ORDER",
                context
              )) {
                mergeArgs.unshift(exp);
                continue;
              }
            }
            pushRefVForMarker();
            pushMergeArg();
            mergeArgs.push(exp);
          } else {
            pushMergeArg({
              type: 14,
              loc,
              callee: context.helper(TO_HANDLERS),
              arguments: isComponent2 ? [exp] : [exp, `true`]
            });
          }
        } else {
          context.onError(
            createCompilerError(
              isVBind ? 34 : 35,
              loc
            )
          );
        }
        continue;
      }
      if (isVBind && modifiers.some((mod) => mod.content === "prop")) {
        patchFlag |= 32;
      }
      const directiveTransform = context.directiveTransforms[name];
      if (directiveTransform) {
        const { props: props2, needRuntime } = directiveTransform(prop, node, context);
        !ssr && props2.forEach(analyzePatchFlag);
        if (isVOn && arg && !isStaticExp(arg)) {
          pushMergeArg(createObjectExpression(props2, elementLoc));
        } else {
          properties.push(...props2);
        }
        if (needRuntime) {
          runtimeDirectives.push(prop);
          if (isSymbol(needRuntime)) {
            directiveImportMap.set(prop, needRuntime);
          }
        }
      } else if (!isBuiltInDirective(name)) {
        runtimeDirectives.push(prop);
        if (hasChildren) {
          shouldUseBlock = true;
        }
      }
    }
  }
  let propsExpression = void 0;
  if (mergeArgs.length) {
    pushMergeArg();
    if (mergeArgs.length > 1) {
      propsExpression = createCallExpression(
        context.helper(MERGE_PROPS),
        mergeArgs,
        elementLoc
      );
    } else {
      propsExpression = mergeArgs[0];
    }
  } else if (properties.length) {
    propsExpression = createObjectExpression(
      dedupeProperties(properties),
      elementLoc
    );
  }
  if (hasDynamicKeys) {
    patchFlag |= 16;
  } else {
    if (hasClassBinding && !isComponent2) {
      patchFlag |= 2;
    }
    if (hasStyleBinding && !isComponent2) {
      patchFlag |= 4;
    }
    if (dynamicPropNames.length) {
      patchFlag |= 8;
    }
    if (hasHydrationEventBinding) {
      patchFlag |= 32;
    }
  }
  if (!shouldUseBlock && (patchFlag === 0 || patchFlag === 32) && (hasRef || hasVnodeHook || runtimeDirectives.length > 0)) {
    patchFlag |= 512;
  }
  if (!context.inSSR && propsExpression) {
    switch (propsExpression.type) {
      case 15:
        let classKeyIndex = -1;
        let styleKeyIndex = -1;
        let hasDynamicKey = false;
        for (let i = 0; i < propsExpression.properties.length; i++) {
          const key = propsExpression.properties[i].key;
          if (isStaticExp(key)) {
            if (key.content === "class") {
              classKeyIndex = i;
            } else if (key.content === "style") {
              styleKeyIndex = i;
            }
          } else if (!key.isHandlerKey) {
            hasDynamicKey = true;
          }
        }
        const classProp = propsExpression.properties[classKeyIndex];
        const styleProp = propsExpression.properties[styleKeyIndex];
        if (!hasDynamicKey) {
          if (classProp && !isStaticExp(classProp.value)) {
            classProp.value = createCallExpression(
              context.helper(NORMALIZE_CLASS),
              [classProp.value]
            );
          }
          if (styleProp && // the static style is compiled into an object,
          // so use `hasStyleBinding` to ensure that it is a dynamic style binding
          (hasStyleBinding || styleProp.value.type === 4 && styleProp.value.content.trim()[0] === `[` || // v-bind:style and style both exist,
          // v-bind:style with static literal object
          styleProp.value.type === 17)) {
            styleProp.value = createCallExpression(
              context.helper(NORMALIZE_STYLE),
              [styleProp.value]
            );
          }
        } else {
          propsExpression = createCallExpression(
            context.helper(NORMALIZE_PROPS),
            [propsExpression]
          );
        }
        break;
      case 14:
        break;
      default:
        propsExpression = createCallExpression(
          context.helper(NORMALIZE_PROPS),
          [
            createCallExpression(context.helper(GUARD_REACTIVE_PROPS), [
              propsExpression
            ])
          ]
        );
        break;
    }
  }
  return {
    props: propsExpression,
    directives: runtimeDirectives,
    patchFlag,
    dynamicPropNames,
    shouldUseBlock
  };
}
function dedupeProperties(properties) {
  const knownProps = /* @__PURE__ */ new Map();
  const deduped = [];
  for (let i = 0; i < properties.length; i++) {
    const prop = properties[i];
    if (prop.key.type === 8 || !prop.key.isStatic) {
      deduped.push(prop);
      continue;
    }
    const name = prop.key.content;
    const existing = knownProps.get(name);
    if (existing) {
      if (name === "style" || name === "class" || isOn(name)) {
        mergeAsArray(existing, prop);
      }
    } else {
      knownProps.set(name, prop);
      deduped.push(prop);
    }
  }
  return deduped;
}
function mergeAsArray(existing, incoming) {
  if (existing.value.type === 17) {
    existing.value.elements.push(incoming.value);
  } else {
    existing.value = createArrayExpression(
      [existing.value, incoming.value],
      existing.loc
    );
  }
}
function buildDirectiveArgs(dir, context) {
  const dirArgs = [];
  const runtime = directiveImportMap.get(dir);
  if (runtime) {
    dirArgs.push(context.helperString(runtime));
  } else {
    {
      context.helper(RESOLVE_DIRECTIVE);
      context.directives.add(dir.name);
      dirArgs.push(toValidAssetId(dir.name, `directive`));
    }
  }
  const { loc } = dir;
  if (dir.exp) dirArgs.push(dir.exp);
  if (dir.arg) {
    if (!dir.exp) {
      dirArgs.push(`void 0`);
    }
    dirArgs.push(dir.arg);
  }
  if (Object.keys(dir.modifiers).length) {
    if (!dir.arg) {
      if (!dir.exp) {
        dirArgs.push(`void 0`);
      }
      dirArgs.push(`void 0`);
    }
    const trueExpression = createSimpleExpression(`true`, false, loc);
    dirArgs.push(
      createObjectExpression(
        dir.modifiers.map(
          (modifier) => createObjectProperty(modifier, trueExpression)
        ),
        loc
      )
    );
  }
  return createArrayExpression(dirArgs, dir.loc);
}
function stringifyDynamicPropNames(props) {
  let propsNamesString = `[`;
  for (let i = 0, l = props.length; i < l; i++) {
    propsNamesString += JSON.stringify(props[i]);
    if (i < l - 1) propsNamesString += ", ";
  }
  return propsNamesString + `]`;
}
function isComponentTag(tag) {
  return tag === "component" || tag === "Component";
}
const transformSlotOutlet = (node, context) => {
  if (isSlotOutlet(node)) {
    const { children, loc } = node;
    const { slotName, slotProps } = processSlotOutlet(node, context);
    const slotArgs = [
      context.prefixIdentifiers ? `_ctx.$slots` : `$slots`,
      slotName,
      "{}",
      "undefined",
      "true"
    ];
    let expectedLen = 2;
    if (slotProps) {
      slotArgs[2] = slotProps;
      expectedLen = 3;
    }
    if (children.length) {
      slotArgs[3] = createFunctionExpression([], children, false, false, loc);
      expectedLen = 4;
    }
    if (context.scopeId && !context.slotted) {
      expectedLen = 5;
    }
    slotArgs.splice(expectedLen);
    node.codegenNode = createCallExpression(
      context.helper(RENDER_SLOT),
      slotArgs,
      loc
    );
  }
};
function processSlotOutlet(node, context) {
  let slotName = `"default"`;
  let slotProps = void 0;
  const nonNameProps = [];
  for (let i = 0; i < node.props.length; i++) {
    const p = node.props[i];
    if (p.type === 6) {
      if (p.value) {
        if (p.name === "name") {
          slotName = JSON.stringify(p.value.content);
        } else {
          p.name = camelize(p.name);
          nonNameProps.push(p);
        }
      }
    } else {
      if (p.name === "bind" && isStaticArgOf(p.arg, "name")) {
        if (p.exp) {
          slotName = p.exp;
        } else if (p.arg && p.arg.type === 4) {
          const name = camelize(p.arg.content);
          slotName = p.exp = createSimpleExpression(name, false, p.arg.loc);
        }
      } else {
        if (p.name === "bind" && p.arg && isStaticExp(p.arg)) {
          p.arg.content = camelize(p.arg.content);
        }
        nonNameProps.push(p);
      }
    }
  }
  if (nonNameProps.length > 0) {
    const { props, directives } = buildProps(
      node,
      context,
      nonNameProps,
      false,
      false
    );
    slotProps = props;
    if (directives.length) {
      context.onError(
        createCompilerError(
          36,
          directives[0].loc
        )
      );
    }
  }
  return {
    slotName,
    slotProps
  };
}
const transformOn$1 = (dir, node, context, augmentor) => {
  const { loc, modifiers, arg } = dir;
  if (!dir.exp && !modifiers.length) {
    context.onError(createCompilerError(35, loc));
  }
  let eventName;
  if (arg.type === 4) {
    if (arg.isStatic) {
      let rawName = arg.content;
      if (rawName.startsWith("vue:")) {
        rawName = `vnode-${rawName.slice(4)}`;
      }
      const eventString = node.tagType !== 0 || rawName.startsWith("vnode") || !/[A-Z]/.test(rawName) ? (
        // for non-element and vnode lifecycle event listeners, auto convert
        // it to camelCase. See issue #2249
        toHandlerKey(camelize(rawName))
      ) : (
        // preserve case for plain element listeners that have uppercase
        // letters, as these may be custom elements' custom events
        `on:${rawName}`
      );
      eventName = createSimpleExpression(eventString, true, arg.loc);
    } else {
      eventName = createCompoundExpression([
        `${context.helperString(TO_HANDLER_KEY)}(`,
        arg,
        `)`
      ]);
    }
  } else {
    eventName = arg;
    eventName.children.unshift(`${context.helperString(TO_HANDLER_KEY)}(`);
    eventName.children.push(`)`);
  }
  let exp = dir.exp;
  if (exp && !exp.content.trim()) {
    exp = void 0;
  }
  let shouldCache = context.cacheHandlers && !exp && !context.inVOnce;
  if (exp) {
    const isMemberExp = isMemberExpression(exp);
    const isInlineStatement = !(isMemberExp || isFnExpression(exp));
    const hasMultipleStatements = exp.content.includes(`;`);
    if (isInlineStatement || shouldCache && isMemberExp) {
      exp = createCompoundExpression([
        `${isInlineStatement ? `$event` : `${``}(...args)`} => ${hasMultipleStatements ? `{` : `(`}`,
        exp,
        hasMultipleStatements ? `}` : `)`
      ]);
    }
  }
  let ret = {
    props: [
      createObjectProperty(
        eventName,
        exp || createSimpleExpression(`() => {}`, false, loc)
      )
    ]
  };
  if (augmentor) {
    ret = augmentor(ret);
  }
  if (shouldCache) {
    ret.props[0].value = context.cache(ret.props[0].value);
  }
  ret.props.forEach((p) => p.key.isHandlerKey = true);
  return ret;
};
const transformBind = (dir, _node, context) => {
  const { modifiers, loc } = dir;
  const arg = dir.arg;
  let { exp } = dir;
  if (exp && exp.type === 4 && !exp.content.trim()) {
    {
      exp = void 0;
    }
  }
  if (arg.type !== 4) {
    arg.children.unshift(`(`);
    arg.children.push(`) || ""`);
  } else if (!arg.isStatic) {
    arg.content = arg.content ? `${arg.content} || ""` : `""`;
  }
  if (modifiers.some((mod) => mod.content === "camel")) {
    if (arg.type === 4) {
      if (arg.isStatic) {
        arg.content = camelize(arg.content);
      } else {
        arg.content = `${context.helperString(CAMELIZE)}(${arg.content})`;
      }
    } else {
      arg.children.unshift(`${context.helperString(CAMELIZE)}(`);
      arg.children.push(`)`);
    }
  }
  if (!context.inSSR) {
    if (modifiers.some((mod) => mod.content === "prop")) {
      injectPrefix(arg, ".");
    }
    if (modifiers.some((mod) => mod.content === "attr")) {
      injectPrefix(arg, "^");
    }
  }
  return {
    props: [createObjectProperty(arg, exp)]
  };
};
const injectPrefix = (arg, prefix) => {
  if (arg.type === 4) {
    if (arg.isStatic) {
      arg.content = prefix + arg.content;
    } else {
      arg.content = `\`${prefix}\${${arg.content}}\``;
    }
  } else {
    arg.children.unshift(`'${prefix}' + (`);
    arg.children.push(`)`);
  }
};
const transformText = (node, context) => {
  if (node.type === 0 || node.type === 1 || node.type === 11 || node.type === 10) {
    return () => {
      const children = node.children;
      let currentContainer = void 0;
      let hasText = false;
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (isText$1(child)) {
          hasText = true;
          for (let j = i + 1; j < children.length; j++) {
            const next = children[j];
            if (isText$1(next)) {
              if (!currentContainer) {
                currentContainer = children[i] = createCompoundExpression(
                  [child],
                  child.loc
                );
              }
              currentContainer.children.push(` + `, next);
              children.splice(j, 1);
              j--;
            } else {
              currentContainer = void 0;
              break;
            }
          }
        }
      }
      if (!hasText || // if this is a plain element with a single text child, leave it
      // as-is since the runtime has dedicated fast path for this by directly
      // setting textContent of the element.
      // for component root it's always normalized anyway.
      children.length === 1 && (node.type === 0 || node.type === 1 && node.tagType === 0 && // #3756
      // custom directives can potentially add DOM elements arbitrarily,
      // we need to avoid setting textContent of the element at runtime
      // to avoid accidentally overwriting the DOM elements added
      // by the user through custom directives.
      !node.props.find(
        (p) => p.type === 7 && !context.directiveTransforms[p.name]
      ) && // in compat mode, <template> tags with no special directives
      // will be rendered as a fragment so its children must be
      // converted into vnodes.
      !(node.tag === "template"))) {
        return;
      }
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (isText$1(child) || child.type === 8) {
          const callArgs = [];
          if (child.type !== 2 || child.content !== " ") {
            callArgs.push(child);
          }
          if (!context.ssr && getConstantType(child, context) === 0) {
            callArgs.push(
              `1`
            );
          }
          children[i] = {
            type: 12,
            content: child,
            loc: child.loc,
            codegenNode: createCallExpression(
              context.helper(CREATE_TEXT),
              callArgs
            )
          };
        }
      }
    };
  }
};
const seen$1 = /* @__PURE__ */ new WeakSet();
const transformOnce = (node, context) => {
  if (node.type === 1 && findDir(node, "once", true)) {
    if (seen$1.has(node) || context.inVOnce || context.inSSR) {
      return;
    }
    seen$1.add(node);
    context.inVOnce = true;
    context.helper(SET_BLOCK_TRACKING);
    return () => {
      context.inVOnce = false;
      const cur = context.currentNode;
      if (cur.codegenNode) {
        cur.codegenNode = context.cache(
          cur.codegenNode,
          true,
          true
        );
      }
    };
  }
};
const transformModel$1 = (dir, node, context) => {
  const { exp, arg } = dir;
  if (!exp) {
    context.onError(
      createCompilerError(41, dir.loc)
    );
    return createTransformProps();
  }
  const rawExp = exp.loc.source.trim();
  const expString = exp.type === 4 ? exp.content : rawExp;
  const bindingType = context.bindingMetadata[rawExp];
  if (bindingType === "props" || bindingType === "props-aliased") {
    context.onError(createCompilerError(44, exp.loc));
    return createTransformProps();
  }
  if (bindingType === "literal-const" || bindingType === "setup-const") {
    context.onError(createCompilerError(45, exp.loc));
    return createTransformProps();
  }
  if (!expString.trim() || !isMemberExpression(exp) && true) {
    context.onError(
      createCompilerError(42, exp.loc)
    );
    return createTransformProps();
  }
  const propName = arg ? arg : createSimpleExpression("modelValue", true);
  const eventName = arg ? isStaticExp(arg) ? `onUpdate:${camelize(arg.content)}` : createCompoundExpression(['"onUpdate:" + ', arg]) : `onUpdate:modelValue`;
  let assignmentExp;
  const eventArg = context.isTS ? `($event: any)` : `$event`;
  {
    assignmentExp = createCompoundExpression([
      `${eventArg} => ((`,
      exp,
      `) = $event)`
    ]);
  }
  const props = [
    // modelValue: foo
    createObjectProperty(propName, dir.exp),
    // "onUpdate:modelValue": $event => (foo = $event)
    createObjectProperty(eventName, assignmentExp)
  ];
  if (dir.modifiers.length && node.tagType === 1) {
    const modifiers = dir.modifiers.map((m) => m.content).map((m) => (isSimpleIdentifier(m) ? m : JSON.stringify(m)) + `: true`).join(`, `);
    const modifiersKey = arg ? isStaticExp(arg) ? `${arg.content}Modifiers` : createCompoundExpression([arg, ' + "Modifiers"']) : `modelModifiers`;
    props.push(
      createObjectProperty(
        modifiersKey,
        createSimpleExpression(
          `{ ${modifiers} }`,
          false,
          dir.loc,
          2
        )
      )
    );
  }
  return createTransformProps(props);
};
function createTransformProps(props = []) {
  return { props };
}
const validDivisionCharRE = /[\w).+\-_$\]]/;
const transformFilter = (node, context) => {
  if (!isCompatEnabled("COMPILER_FILTERS", context)) {
    return;
  }
  if (node.type === 5) {
    rewriteFilter(node.content, context);
  } else if (node.type === 1) {
    node.props.forEach((prop) => {
      if (prop.type === 7 && prop.name !== "for" && prop.exp) {
        rewriteFilter(prop.exp, context);
      }
    });
  }
};
function rewriteFilter(node, context) {
  if (node.type === 4) {
    parseFilter(node, context);
  } else {
    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];
      if (typeof child !== "object") continue;
      if (child.type === 4) {
        parseFilter(child, context);
      } else if (child.type === 8) {
        rewriteFilter(node, context);
      } else if (child.type === 5) {
        rewriteFilter(child.content, context);
      }
    }
  }
}
function parseFilter(node, context) {
  const exp = node.content;
  let inSingle = false;
  let inDouble = false;
  let inTemplateString = false;
  let inRegex = false;
  let curly = 0;
  let square = 0;
  let paren = 0;
  let lastFilterIndex = 0;
  let c, prev, i, expression, filters = [];
  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 39 && prev !== 92) inSingle = false;
    } else if (inDouble) {
      if (c === 34 && prev !== 92) inDouble = false;
    } else if (inTemplateString) {
      if (c === 96 && prev !== 92) inTemplateString = false;
    } else if (inRegex) {
      if (c === 47 && prev !== 92) inRegex = false;
    } else if (c === 124 && // pipe
    exp.charCodeAt(i + 1) !== 124 && exp.charCodeAt(i - 1) !== 124 && !curly && !square && !paren) {
      if (expression === void 0) {
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 34:
          inDouble = true;
          break;
        // "
        case 39:
          inSingle = true;
          break;
        // '
        case 96:
          inTemplateString = true;
          break;
        // `
        case 40:
          paren++;
          break;
        // (
        case 41:
          paren--;
          break;
        // )
        case 91:
          square++;
          break;
        // [
        case 93:
          square--;
          break;
        // ]
        case 123:
          curly++;
          break;
        // {
        case 125:
          curly--;
          break;
      }
      if (c === 47) {
        let j = i - 1;
        let p;
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== " ") break;
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }
  if (expression === void 0) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }
  function pushFilter() {
    filters.push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }
  if (filters.length) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i], context);
    }
    node.content = expression;
    node.ast = void 0;
  }
}
function wrapFilter(exp, filter, context) {
  context.helper(RESOLVE_FILTER);
  const i = filter.indexOf("(");
  if (i < 0) {
    context.filters.add(filter);
    return `${toValidAssetId(filter, "filter")}(${exp})`;
  } else {
    const name = filter.slice(0, i);
    const args = filter.slice(i + 1);
    context.filters.add(name);
    return `${toValidAssetId(name, "filter")}(${exp}${args !== ")" ? "," + args : args}`;
  }
}
const seen = /* @__PURE__ */ new WeakSet();
const transformMemo = (node, context) => {
  if (node.type === 1) {
    const dir = findDir(node, "memo");
    if (!dir || seen.has(node) || context.inSSR) {
      return;
    }
    seen.add(node);
    return () => {
      const codegenNode = node.codegenNode || context.currentNode.codegenNode;
      if (codegenNode && codegenNode.type === 13) {
        if (node.tagType !== 1) {
          convertToBlock(codegenNode, context);
        }
        node.codegenNode = createCallExpression(context.helper(WITH_MEMO), [
          dir.exp,
          createFunctionExpression(void 0, codegenNode),
          `_cache`,
          String(context.cached.length)
        ]);
        context.cached.push(null);
      }
    };
  }
};
const transformVBindShorthand = (node, context) => {
  if (node.type === 1) {
    for (const prop of node.props) {
      if (prop.type === 7 && prop.name === "bind" && (!prop.exp || // #13930 :foo in in-DOM templates will be parsed into :foo="" by browser
      prop.exp.type === 4 && !prop.exp.content.trim()) && prop.arg) {
        const arg = prop.arg;
        if (arg.type !== 4 || !arg.isStatic) {
          context.onError(
            createCompilerError(
              53,
              arg.loc
            )
          );
          prop.exp = createSimpleExpression("", true, arg.loc);
        } else {
          const propName = camelize(arg.content);
          if (validFirstIdentCharRE.test(propName[0]) || // allow hyphen first char for https://github.com/vuejs/language-tools/pull/3424
          propName[0] === "-") {
            prop.exp = createSimpleExpression(propName, false, arg.loc);
          }
        }
      }
    }
  }
};
function getBaseTransformPreset(prefixIdentifiers) {
  return [
    [
      transformVBindShorthand,
      transformOnce,
      transformIf,
      transformMemo,
      transformFor,
      ...[transformFilter],
      ...[],
      transformSlotOutlet,
      transformElement,
      trackSlotScopes,
      transformText
    ],
    {
      on: transformOn$1,
      bind: transformBind,
      model: transformModel$1
    }
  ];
}
function baseCompile(source, options = {}) {
  const onError = options.onError || defaultOnError;
  const isModuleMode = options.mode === "module";
  {
    if (options.prefixIdentifiers === true) {
      onError(createCompilerError(48));
    } else if (isModuleMode) {
      onError(createCompilerError(49));
    }
  }
  const prefixIdentifiers = false;
  if (options.cacheHandlers) {
    onError(createCompilerError(50));
  }
  if (options.scopeId && !isModuleMode) {
    onError(createCompilerError(51));
  }
  const resolvedOptions = extend$1({}, options, {
    prefixIdentifiers
  });
  const ast = isString(source) ? baseParse(source, resolvedOptions) : source;
  const [nodeTransforms, directiveTransforms] = getBaseTransformPreset();
  transform(
    ast,
    extend$1({}, resolvedOptions, {
      nodeTransforms: [
        ...nodeTransforms,
        ...options.nodeTransforms || []
        // user transforms
      ],
      directiveTransforms: extend$1(
        {},
        directiveTransforms,
        options.directiveTransforms || {}
        // user transforms
      )
    })
  );
  return generate(ast, resolvedOptions);
}
const BindingTypes = {
  "DATA": "data",
  "PROPS": "props",
  "PROPS_ALIASED": "props-aliased",
  "SETUP_LET": "setup-let",
  "SETUP_CONST": "setup-const",
  "SETUP_REACTIVE_CONST": "setup-reactive-const",
  "SETUP_MAYBE_REF": "setup-maybe-ref",
  "SETUP_REF": "setup-ref",
  "OPTIONS": "options",
  "LITERAL_CONST": "literal-const"
};
const noopDirectiveTransform = () => ({ props: [] });
/**
* @vue/compiler-dom v3.5.32
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const V_MODEL_RADIO = /* @__PURE__ */ Symbol(``);
const V_MODEL_CHECKBOX = /* @__PURE__ */ Symbol(
  ``
);
const V_MODEL_TEXT = /* @__PURE__ */ Symbol(``);
const V_MODEL_SELECT = /* @__PURE__ */ Symbol(
  ``
);
const V_MODEL_DYNAMIC = /* @__PURE__ */ Symbol(
  ``
);
const V_ON_WITH_MODIFIERS = /* @__PURE__ */ Symbol(
  ``
);
const V_ON_WITH_KEYS = /* @__PURE__ */ Symbol(
  ``
);
const V_SHOW = /* @__PURE__ */ Symbol(``);
const TRANSITION = /* @__PURE__ */ Symbol(``);
const TRANSITION_GROUP = /* @__PURE__ */ Symbol(
  ``
);
registerRuntimeHelpers({
  [V_MODEL_RADIO]: `vModelRadio`,
  [V_MODEL_CHECKBOX]: `vModelCheckbox`,
  [V_MODEL_TEXT]: `vModelText`,
  [V_MODEL_SELECT]: `vModelSelect`,
  [V_MODEL_DYNAMIC]: `vModelDynamic`,
  [V_ON_WITH_MODIFIERS]: `withModifiers`,
  [V_ON_WITH_KEYS]: `withKeys`,
  [V_SHOW]: `vShow`,
  [TRANSITION]: `Transition`,
  [TRANSITION_GROUP]: `TransitionGroup`
});
let decoder;
function decodeHtmlBrowser(raw, asAttr = false) {
  if (!decoder) {
    decoder = document.createElement("div");
  }
  if (asAttr) {
    decoder.innerHTML = `<div foo="${raw.replace(/"/g, "&quot;")}">`;
    return decoder.children[0].getAttribute("foo");
  } else {
    decoder.innerHTML = raw;
    return decoder.textContent;
  }
}
const parserOptions = {
  parseMode: "html",
  isVoidTag,
  isNativeTag: (tag) => isHTMLTag(tag) || isSVGTag(tag) || isMathMLTag(tag),
  isPreTag: (tag) => tag === "pre",
  isIgnoreNewlineTag: (tag) => tag === "pre" || tag === "textarea",
  decodeEntities: decodeHtmlBrowser,
  isBuiltInComponent: (tag) => {
    if (tag === "Transition" || tag === "transition") {
      return TRANSITION;
    } else if (tag === "TransitionGroup" || tag === "transition-group") {
      return TRANSITION_GROUP;
    }
  },
  // https://html.spec.whatwg.org/multipage/parsing.html#tree-construction-dispatcher
  getNamespace(tag, parent, rootNamespace) {
    let ns = parent ? parent.ns : rootNamespace;
    if (parent && ns === 2) {
      if (parent.tag === "annotation-xml") {
        if (tag === "svg") {
          return 1;
        }
        if (parent.props.some(
          (a) => a.type === 6 && a.name === "encoding" && a.value != null && (a.value.content === "text/html" || a.value.content === "application/xhtml+xml")
        )) {
          ns = 0;
        }
      } else if (/^m(?:[ions]|text)$/.test(parent.tag) && tag !== "mglyph" && tag !== "malignmark") {
        ns = 0;
      }
    } else if (parent && ns === 1) {
      if (parent.tag === "foreignObject" || parent.tag === "desc" || parent.tag === "title") {
        ns = 0;
      }
    }
    if (ns === 0) {
      if (tag === "svg") {
        return 1;
      }
      if (tag === "math") {
        return 2;
      }
    }
    return ns;
  }
};
const transformStyle = (node) => {
  if (node.type === 1) {
    node.props.forEach((p, i) => {
      if (p.type === 6 && p.name === "style" && p.value) {
        node.props[i] = {
          type: 7,
          name: `bind`,
          arg: createSimpleExpression(`style`, true, p.loc),
          exp: parseInlineCSS(p.value.content, p.loc),
          modifiers: [],
          loc: p.loc
        };
      }
    });
  }
};
const parseInlineCSS = (cssText, loc) => {
  const normalized = parseStringStyle(cssText);
  return createSimpleExpression(
    JSON.stringify(normalized),
    false,
    loc,
    3
  );
};
function createDOMCompilerError(code, loc) {
  return createCompilerError(
    code,
    loc
  );
}
const DOMErrorCodes = {
  "X_V_HTML_NO_EXPRESSION": 54,
  "54": "X_V_HTML_NO_EXPRESSION",
  "X_V_HTML_WITH_CHILDREN": 55,
  "55": "X_V_HTML_WITH_CHILDREN",
  "X_V_TEXT_NO_EXPRESSION": 56,
  "56": "X_V_TEXT_NO_EXPRESSION",
  "X_V_TEXT_WITH_CHILDREN": 57,
  "57": "X_V_TEXT_WITH_CHILDREN",
  "X_V_MODEL_ON_INVALID_ELEMENT": 58,
  "58": "X_V_MODEL_ON_INVALID_ELEMENT",
  "X_V_MODEL_ARG_ON_ELEMENT": 59,
  "59": "X_V_MODEL_ARG_ON_ELEMENT",
  "X_V_MODEL_ON_FILE_INPUT_ELEMENT": 60,
  "60": "X_V_MODEL_ON_FILE_INPUT_ELEMENT",
  "X_V_MODEL_UNNECESSARY_VALUE": 61,
  "61": "X_V_MODEL_UNNECESSARY_VALUE",
  "X_V_SHOW_NO_EXPRESSION": 62,
  "62": "X_V_SHOW_NO_EXPRESSION",
  "X_TRANSITION_INVALID_CHILDREN": 63,
  "63": "X_TRANSITION_INVALID_CHILDREN",
  "X_IGNORED_SIDE_EFFECT_TAG": 64,
  "64": "X_IGNORED_SIDE_EFFECT_TAG",
  "__EXTEND_POINT__": 65,
  "65": "__EXTEND_POINT__"
};
const DOMErrorMessages = {
  [54]: `v-html is missing expression.`,
  [55]: `v-html will override element children.`,
  [56]: `v-text is missing expression.`,
  [57]: `v-text will override element children.`,
  [58]: `v-model can only be used on <input>, <textarea> and <select> elements.`,
  [59]: `v-model argument is not supported on plain elements.`,
  [60]: `v-model cannot be used on file inputs since they are read-only. Use a v-on:change listener instead.`,
  [61]: `Unnecessary value binding used alongside v-model. It will interfere with v-model's behavior.`,
  [62]: `v-show is missing expression.`,
  [63]: `<Transition> expects exactly one child element or component.`,
  [64]: `Tags with side effect (<script> and <style>) are ignored in client component templates.`
};
const transformVHtml = (dir, node, context) => {
  const { exp, loc } = dir;
  if (!exp) {
    context.onError(
      createDOMCompilerError(54, loc)
    );
  }
  if (node.children.length) {
    context.onError(
      createDOMCompilerError(55, loc)
    );
    node.children.length = 0;
  }
  return {
    props: [
      createObjectProperty(
        createSimpleExpression(`innerHTML`, true, loc),
        exp || createSimpleExpression("", true)
      )
    ]
  };
};
const transformVText = (dir, node, context) => {
  const { exp, loc } = dir;
  if (!exp) {
    context.onError(
      createDOMCompilerError(56, loc)
    );
  }
  if (node.children.length) {
    context.onError(
      createDOMCompilerError(57, loc)
    );
    node.children.length = 0;
  }
  return {
    props: [
      createObjectProperty(
        createSimpleExpression(`textContent`, true),
        exp ? getConstantType(exp, context) > 0 ? exp : createCallExpression(
          context.helperString(TO_DISPLAY_STRING),
          [exp],
          loc
        ) : createSimpleExpression("", true)
      )
    ]
  };
};
const transformModel = (dir, node, context) => {
  const baseResult = transformModel$1(dir, node, context);
  if (!baseResult.props.length || node.tagType === 1) {
    return baseResult;
  }
  if (dir.arg) {
    context.onError(
      createDOMCompilerError(
        59,
        dir.arg.loc
      )
    );
  }
  const { tag } = node;
  const isCustomElement = context.isCustomElement(tag);
  if (tag === "input" || tag === "textarea" || tag === "select" || isCustomElement) {
    let directiveToUse = V_MODEL_TEXT;
    let isInvalidType = false;
    if (tag === "input" || isCustomElement) {
      const type = findProp(node, `type`);
      if (type) {
        if (type.type === 7) {
          directiveToUse = V_MODEL_DYNAMIC;
        } else if (type.value) {
          switch (type.value.content) {
            case "radio":
              directiveToUse = V_MODEL_RADIO;
              break;
            case "checkbox":
              directiveToUse = V_MODEL_CHECKBOX;
              break;
            case "file":
              isInvalidType = true;
              context.onError(
                createDOMCompilerError(
                  60,
                  dir.loc
                )
              );
              break;
          }
        }
      } else if (hasDynamicKeyVBind(node)) {
        directiveToUse = V_MODEL_DYNAMIC;
      } else ;
    } else if (tag === "select") {
      directiveToUse = V_MODEL_SELECT;
    } else ;
    if (!isInvalidType) {
      baseResult.needRuntime = context.helper(directiveToUse);
    }
  } else {
    context.onError(
      createDOMCompilerError(
        58,
        dir.loc
      )
    );
  }
  baseResult.props = baseResult.props.filter(
    (p) => !(p.key.type === 4 && p.key.content === "modelValue")
  );
  return baseResult;
};
const isEventOptionModifier = /* @__PURE__ */ makeMap(`passive,once,capture`);
const isNonKeyModifier = /* @__PURE__ */ makeMap(
  // event propagation management
  `stop,prevent,self,ctrl,shift,alt,meta,exact,middle`
);
const maybeKeyModifier = /* @__PURE__ */ makeMap("left,right");
const isKeyboardEvent = /* @__PURE__ */ makeMap(`onkeyup,onkeydown,onkeypress`);
const resolveModifiers = (key, modifiers, context, loc) => {
  const keyModifiers = [];
  const nonKeyModifiers = [];
  const eventOptionModifiers = [];
  for (let i = 0; i < modifiers.length; i++) {
    const modifier = modifiers[i].content;
    if (modifier === "native" && checkCompatEnabled(
      "COMPILER_V_ON_NATIVE",
      context
    )) {
      eventOptionModifiers.push(modifier);
    } else if (isEventOptionModifier(modifier)) {
      eventOptionModifiers.push(modifier);
    } else {
      if (maybeKeyModifier(modifier)) {
        if (isStaticExp(key)) {
          if (isKeyboardEvent(key.content.toLowerCase())) {
            keyModifiers.push(modifier);
          } else {
            nonKeyModifiers.push(modifier);
          }
        } else {
          keyModifiers.push(modifier);
          nonKeyModifiers.push(modifier);
        }
      } else {
        if (isNonKeyModifier(modifier)) {
          nonKeyModifiers.push(modifier);
        } else {
          keyModifiers.push(modifier);
        }
      }
    }
  }
  return {
    keyModifiers,
    nonKeyModifiers,
    eventOptionModifiers
  };
};
const transformClick = (key, event) => {
  const isStaticClick = isStaticExp(key) && key.content.toLowerCase() === "onclick";
  return isStaticClick ? createSimpleExpression(event, true) : key.type !== 4 ? createCompoundExpression([
    `(`,
    key,
    `) === "onClick" ? "${event}" : (`,
    key,
    `)`
  ]) : key;
};
const transformOn = (dir, node, context) => {
  return transformOn$1(dir, node, context, (baseResult) => {
    const { modifiers } = dir;
    if (!modifiers.length) return baseResult;
    let { key, value: handlerExp } = baseResult.props[0];
    const { keyModifiers, nonKeyModifiers, eventOptionModifiers } = resolveModifiers(key, modifiers, context, dir.loc);
    if (nonKeyModifiers.includes("right")) {
      key = transformClick(key, `onContextmenu`);
    }
    if (nonKeyModifiers.includes("middle")) {
      key = transformClick(key, `onMouseup`);
    }
    if (nonKeyModifiers.length) {
      handlerExp = createCallExpression(context.helper(V_ON_WITH_MODIFIERS), [
        handlerExp,
        JSON.stringify(nonKeyModifiers)
      ]);
    }
    if (keyModifiers.length && // if event name is dynamic, always wrap with keys guard
    (!isStaticExp(key) || isKeyboardEvent(key.content.toLowerCase()))) {
      handlerExp = createCallExpression(context.helper(V_ON_WITH_KEYS), [
        handlerExp,
        JSON.stringify(keyModifiers)
      ]);
    }
    if (eventOptionModifiers.length) {
      const modifierPostfix = eventOptionModifiers.map(capitalize).join("");
      key = isStaticExp(key) ? createSimpleExpression(`${key.content}${modifierPostfix}`, true) : createCompoundExpression([`(`, key, `) + "${modifierPostfix}"`]);
    }
    return {
      props: [createObjectProperty(key, handlerExp)]
    };
  });
};
const transformShow = (dir, node, context) => {
  const { exp, loc } = dir;
  if (!exp) {
    context.onError(
      createDOMCompilerError(62, loc)
    );
  }
  return {
    props: [],
    needRuntime: context.helper(V_SHOW)
  };
};
const ignoreSideEffectTags = (node, context) => {
  if (node.type === 1 && node.tagType === 0 && (node.tag === "script" || node.tag === "style")) {
    context.removeNode();
  }
};
const DOMNodeTransforms = [
  transformStyle,
  ...[]
];
const DOMDirectiveTransforms = {
  cloak: noopDirectiveTransform,
  html: transformVHtml,
  text: transformVText,
  model: transformModel,
  // override compiler-core
  on: transformOn,
  // override compiler-core
  show: transformShow
};
function compile(src, options = {}) {
  return baseCompile(
    src,
    extend$1({}, parserOptions, options, {
      nodeTransforms: [
        // ignore <script> and <tag>
        // this is not put inside DOMNodeTransforms because that list is used
        // by compiler-ssr to generate vnode fallback branches
        ignoreSideEffectTags,
        ...DOMNodeTransforms,
        ...options.nodeTransforms || []
      ],
      directiveTransforms: extend$1(
        {},
        DOMDirectiveTransforms,
        options.directiveTransforms || {}
      ),
      transformHoist: null
    })
  );
}
function parse(template, options = {}) {
  return baseParse(template, extend$1({}, parserOptions, options));
}
const compilerDom_esmBundler = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BASE_TRANSITION,
  BindingTypes,
  CAMELIZE,
  CAPITALIZE,
  CREATE_BLOCK,
  CREATE_COMMENT,
  CREATE_ELEMENT_BLOCK,
  CREATE_ELEMENT_VNODE,
  CREATE_SLOTS,
  CREATE_STATIC,
  CREATE_TEXT,
  CREATE_VNODE,
  CompilerDeprecationTypes,
  ConstantTypes,
  DOMDirectiveTransforms,
  DOMErrorCodes,
  DOMErrorMessages,
  DOMNodeTransforms,
  ElementTypes,
  ErrorCodes,
  FRAGMENT,
  GUARD_REACTIVE_PROPS,
  IS_MEMO_SAME,
  IS_REF,
  KEEP_ALIVE,
  MERGE_PROPS,
  NORMALIZE_CLASS,
  NORMALIZE_PROPS,
  NORMALIZE_STYLE,
  Namespaces,
  NodeTypes,
  OPEN_BLOCK,
  POP_SCOPE_ID,
  PUSH_SCOPE_ID,
  RENDER_LIST,
  RENDER_SLOT,
  RESOLVE_COMPONENT,
  RESOLVE_DIRECTIVE,
  RESOLVE_DYNAMIC_COMPONENT,
  RESOLVE_FILTER,
  SET_BLOCK_TRACKING,
  SUSPENSE,
  TELEPORT,
  TO_DISPLAY_STRING,
  TO_HANDLERS,
  TO_HANDLER_KEY,
  TRANSITION,
  TRANSITION_GROUP,
  TS_NODE_TYPES,
  UNREF,
  V_MODEL_CHECKBOX,
  V_MODEL_DYNAMIC,
  V_MODEL_RADIO,
  V_MODEL_SELECT,
  V_MODEL_TEXT,
  V_ON_WITH_KEYS,
  V_ON_WITH_MODIFIERS,
  V_SHOW,
  WITH_CTX,
  WITH_DIRECTIVES,
  WITH_MEMO,
  advancePositionWithClone,
  advancePositionWithMutation,
  assert,
  baseCompile,
  baseParse,
  buildDirectiveArgs,
  buildProps,
  buildSlots,
  checkCompatEnabled,
  compile,
  convertToBlock,
  createArrayExpression,
  createAssignmentExpression,
  createBlockStatement,
  createCacheExpression,
  createCallExpression,
  createCompilerError,
  createCompoundExpression,
  createConditionalExpression,
  createDOMCompilerError,
  createForLoopParams,
  createFunctionExpression,
  createIfStatement,
  createInterpolation,
  createObjectExpression,
  createObjectProperty,
  createReturnStatement,
  createRoot,
  createSequenceExpression,
  createSimpleExpression,
  createStructuralDirectiveTransform,
  createTemplateLiteral,
  createTransformContext,
  createVNodeCall,
  errorMessages,
  extractIdentifiers,
  findDir,
  findProp,
  forAliasRE,
  generate,
  generateCodeFrame,
  getBaseTransformPreset,
  getConstantType,
  getMemoedVNodeCall,
  getVNodeBlockHelper,
  getVNodeHelper,
  hasDynamicKeyVBind,
  hasScopeRef,
  helperNameMap,
  injectProp,
  isAllWhitespace,
  isCommentOrWhitespace,
  isCoreComponent,
  isFnExpression,
  isFnExpressionBrowser,
  isFnExpressionNode,
  isFunctionType,
  isInDestructureAssignment,
  isInNewExpression,
  isMemberExpression,
  isMemberExpressionBrowser,
  isMemberExpressionNode,
  isReferencedIdentifier,
  isSimpleIdentifier,
  isSlotOutlet,
  isStaticArgOf,
  isStaticExp,
  isStaticProperty,
  isStaticPropertyKey,
  isTemplateNode,
  isText: isText$1,
  isVPre,
  isVSlot,
  isWhitespaceText,
  locStub,
  noopDirectiveTransform,
  parse,
  parserOptions,
  processExpression,
  processFor,
  processIf,
  processSlotOutlet,
  registerRuntimeHelpers,
  resolveComponentType,
  stringifyExpression,
  toValidAssetId,
  trackSlotScopes,
  trackVForSlotScopes,
  transform,
  transformBind,
  transformElement,
  transformExpression,
  transformModel: transformModel$1,
  transformOn: transformOn$1,
  transformStyle,
  transformVBindShorthand,
  traverseNode,
  unwrapTSNode,
  validFirstIdentCharRE,
  walkBlockDeclarations,
  walkFunctionParams,
  walkIdentifiers,
  warnDeprecation
}, Symbol.toStringTag, { value: "Module" }));
const require$$0 = /* @__PURE__ */ getAugmentedNamespace(compilerDom_esmBundler);
const require$$1$1 = /* @__PURE__ */ getAugmentedNamespace(runtimeDom_esmBundler);
const require$$2 = /* @__PURE__ */ getAugmentedNamespace(shared_esmBundler);
/**
* vue v3.5.32
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
var hasRequiredVue_cjs_prod;
function requireVue_cjs_prod() {
  if (hasRequiredVue_cjs_prod) return vue_cjs_prod;
  hasRequiredVue_cjs_prod = 1;
  (function(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    var compilerDom = require$$0;
    var runtimeDom = require$$1$1;
    var shared = require$$2;
    function _interopNamespaceDefault(e) {
      var n = /* @__PURE__ */ Object.create(null);
      if (e) {
        for (var k in e) {
          n[k] = e[k];
        }
      }
      n.default = e;
      return Object.freeze(n);
    }
    var runtimeDom__namespace = /* @__PURE__ */ _interopNamespaceDefault(runtimeDom);
    const compileCache = /* @__PURE__ */ Object.create(null);
    function compileToFunction(template, options) {
      if (!shared.isString(template)) {
        if (template.nodeType) {
          template = template.innerHTML;
        } else {
          return shared.NOOP;
        }
      }
      const key = shared.genCacheKey(template, options);
      const cached = compileCache[key];
      if (cached) {
        return cached;
      }
      if (template[0] === "#") {
        const el = document.querySelector(template);
        template = el ? el.innerHTML : ``;
      }
      const opts = shared.extend(
        {
          hoistStatic: true,
          onError: void 0,
          onWarn: shared.NOOP
        },
        options
      );
      if (!opts.isCustomElement && typeof customElements !== "undefined") {
        opts.isCustomElement = (tag) => !!customElements.get(tag);
      }
      const { code } = compilerDom.compile(template, opts);
      const render = new Function("Vue", code)(runtimeDom__namespace);
      render._rc = true;
      return compileCache[key] = render;
    }
    runtimeDom.registerRuntimeCompiler(compileToFunction);
    exports$1.compile = compileToFunction;
    Object.keys(runtimeDom).forEach(function(k) {
      if (k !== "default" && !Object.prototype.hasOwnProperty.call(exports$1, k)) exports$1[k] = runtimeDom[k];
    });
  })(vue_cjs_prod);
  return vue_cjs_prod;
}
var hasRequiredVue;
function requireVue() {
  if (hasRequiredVue) return vue.exports;
  hasRequiredVue = 1;
  {
    vue.exports = requireVue_cjs_prod();
  }
  return vue.exports;
}
/**!
 * Sortable 1.14.0
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof = function(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof(obj);
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _extends() {
  _extends = Object.assign || function(target) {
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
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
var version = "1.14.0";
function userAgent(pattern) {
  if (typeof window !== "undefined" && window.navigator) {
    return !!/* @__PURE__ */ navigator.userAgent.match(pattern);
  }
}
var IE11OrLess = userAgent(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i);
var Edge = userAgent(/Edge/i);
var FireFox = userAgent(/firefox/i);
var Safari = userAgent(/safari/i) && !userAgent(/chrome/i) && !userAgent(/android/i);
var IOS = userAgent(/iP(ad|od|hone)/i);
var ChromeForAndroid = userAgent(/chrome/i) && userAgent(/android/i);
var captureMode = {
  capture: false,
  passive: false
};
function on(el, event, fn) {
  el.addEventListener(event, fn, !IE11OrLess && captureMode);
}
function off(el, event, fn) {
  el.removeEventListener(event, fn, !IE11OrLess && captureMode);
}
function matches(el, selector) {
  if (!selector) return;
  selector[0] === ">" && (selector = selector.substring(1));
  if (el) {
    try {
      if (el.matches) {
        return el.matches(selector);
      } else if (el.msMatchesSelector) {
        return el.msMatchesSelector(selector);
      } else if (el.webkitMatchesSelector) {
        return el.webkitMatchesSelector(selector);
      }
    } catch (_) {
      return false;
    }
  }
  return false;
}
function getParentOrHost(el) {
  return el.host && el !== document && el.host.nodeType ? el.host : el.parentNode;
}
function closest(el, selector, ctx, includeCTX) {
  if (el) {
    ctx = ctx || document;
    do {
      if (selector != null && (selector[0] === ">" ? el.parentNode === ctx && matches(el, selector) : matches(el, selector)) || includeCTX && el === ctx) {
        return el;
      }
      if (el === ctx) break;
    } while (el = getParentOrHost(el));
  }
  return null;
}
var R_SPACE = /\s+/g;
function toggleClass(el, name, state) {
  if (el && name) {
    if (el.classList) {
      el.classList[state ? "add" : "remove"](name);
    } else {
      var className = (" " + el.className + " ").replace(R_SPACE, " ").replace(" " + name + " ", " ");
      el.className = (className + (state ? " " + name : "")).replace(R_SPACE, " ");
    }
  }
}
function css(el, prop, val) {
  var style = el && el.style;
  if (style) {
    if (val === void 0) {
      if (document.defaultView && document.defaultView.getComputedStyle) {
        val = document.defaultView.getComputedStyle(el, "");
      } else if (el.currentStyle) {
        val = el.currentStyle;
      }
      return prop === void 0 ? val : val[prop];
    } else {
      if (!(prop in style) && prop.indexOf("webkit") === -1) {
        prop = "-webkit-" + prop;
      }
      style[prop] = val + (typeof val === "string" ? "" : "px");
    }
  }
}
function matrix(el, selfOnly) {
  var appliedTransforms = "";
  if (typeof el === "string") {
    appliedTransforms = el;
  } else {
    do {
      var transform2 = css(el, "transform");
      if (transform2 && transform2 !== "none") {
        appliedTransforms = transform2 + " " + appliedTransforms;
      }
    } while (!selfOnly && (el = el.parentNode));
  }
  var matrixFn = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return matrixFn && new matrixFn(appliedTransforms);
}
function find(ctx, tagName, iterator) {
  if (ctx) {
    var list = ctx.getElementsByTagName(tagName), i = 0, n = list.length;
    if (iterator) {
      for (; i < n; i++) {
        iterator(list[i], i);
      }
    }
    return list;
  }
  return [];
}
function getWindowScrollingElement() {
  var scrollingElement = document.scrollingElement;
  if (scrollingElement) {
    return scrollingElement;
  } else {
    return document.documentElement;
  }
}
function getRect(el, relativeToContainingBlock, relativeToNonStaticParent, undoScale, container) {
  if (!el.getBoundingClientRect && el !== window) return;
  var elRect, top, left, bottom, right, height, width;
  if (el !== window && el.parentNode && el !== getWindowScrollingElement()) {
    elRect = el.getBoundingClientRect();
    top = elRect.top;
    left = elRect.left;
    bottom = elRect.bottom;
    right = elRect.right;
    height = elRect.height;
    width = elRect.width;
  } else {
    top = 0;
    left = 0;
    bottom = window.innerHeight;
    right = window.innerWidth;
    height = window.innerHeight;
    width = window.innerWidth;
  }
  if ((relativeToContainingBlock || relativeToNonStaticParent) && el !== window) {
    container = container || el.parentNode;
    if (!IE11OrLess) {
      do {
        if (container && container.getBoundingClientRect && (css(container, "transform") !== "none" || relativeToNonStaticParent && css(container, "position") !== "static")) {
          var containerRect = container.getBoundingClientRect();
          top -= containerRect.top + parseInt(css(container, "border-top-width"));
          left -= containerRect.left + parseInt(css(container, "border-left-width"));
          bottom = top + elRect.height;
          right = left + elRect.width;
          break;
        }
      } while (container = container.parentNode);
    }
  }
  if (undoScale && el !== window) {
    var elMatrix = matrix(container || el), scaleX = elMatrix && elMatrix.a, scaleY = elMatrix && elMatrix.d;
    if (elMatrix) {
      top /= scaleY;
      left /= scaleX;
      width /= scaleX;
      height /= scaleY;
      bottom = top + height;
      right = left + width;
    }
  }
  return {
    top,
    left,
    bottom,
    right,
    width,
    height
  };
}
function isScrolledPast(el, elSide, parentSide) {
  var parent = getParentAutoScrollElement(el, true), elSideVal = getRect(el)[elSide];
  while (parent) {
    var parentSideVal = getRect(parent)[parentSide], visible = void 0;
    {
      visible = elSideVal >= parentSideVal;
    }
    if (!visible) return parent;
    if (parent === getWindowScrollingElement()) break;
    parent = getParentAutoScrollElement(parent, false);
  }
  return false;
}
function getChild(el, childNum, options, includeDragEl) {
  var currentChild = 0, i = 0, children = el.children;
  while (i < children.length) {
    if (children[i].style.display !== "none" && children[i] !== Sortable.ghost && (includeDragEl || children[i] !== Sortable.dragged) && closest(children[i], options.draggable, el, false)) {
      if (currentChild === childNum) {
        return children[i];
      }
      currentChild++;
    }
    i++;
  }
  return null;
}
function lastChild(el, selector) {
  var last = el.lastElementChild;
  while (last && (last === Sortable.ghost || css(last, "display") === "none" || selector && !matches(last, selector))) {
    last = last.previousElementSibling;
  }
  return last || null;
}
function index(el, selector) {
  var index2 = 0;
  if (!el || !el.parentNode) {
    return -1;
  }
  while (el = el.previousElementSibling) {
    if (el.nodeName.toUpperCase() !== "TEMPLATE" && el !== Sortable.clone && (!selector || matches(el, selector))) {
      index2++;
    }
  }
  return index2;
}
function getRelativeScrollOffset(el) {
  var offsetLeft = 0, offsetTop = 0, winScroller = getWindowScrollingElement();
  if (el) {
    do {
      var elMatrix = matrix(el), scaleX = elMatrix.a, scaleY = elMatrix.d;
      offsetLeft += el.scrollLeft * scaleX;
      offsetTop += el.scrollTop * scaleY;
    } while (el !== winScroller && (el = el.parentNode));
  }
  return [offsetLeft, offsetTop];
}
function indexOfObject(arr, obj) {
  for (var i in arr) {
    if (!arr.hasOwnProperty(i)) continue;
    for (var key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] === arr[i][key]) return Number(i);
    }
  }
  return -1;
}
function getParentAutoScrollElement(el, includeSelf) {
  if (!el || !el.getBoundingClientRect) return getWindowScrollingElement();
  var elem = el;
  var gotSelf = false;
  do {
    if (elem.clientWidth < elem.scrollWidth || elem.clientHeight < elem.scrollHeight) {
      var elemCSS = css(elem);
      if (elem.clientWidth < elem.scrollWidth && (elemCSS.overflowX == "auto" || elemCSS.overflowX == "scroll") || elem.clientHeight < elem.scrollHeight && (elemCSS.overflowY == "auto" || elemCSS.overflowY == "scroll")) {
        if (!elem.getBoundingClientRect || elem === document.body) return getWindowScrollingElement();
        if (gotSelf || includeSelf) return elem;
        gotSelf = true;
      }
    }
  } while (elem = elem.parentNode);
  return getWindowScrollingElement();
}
function extend(dst, src) {
  if (dst && src) {
    for (var key in src) {
      if (src.hasOwnProperty(key)) {
        dst[key] = src[key];
      }
    }
  }
  return dst;
}
function isRectEqual(rect1, rect2) {
  return Math.round(rect1.top) === Math.round(rect2.top) && Math.round(rect1.left) === Math.round(rect2.left) && Math.round(rect1.height) === Math.round(rect2.height) && Math.round(rect1.width) === Math.round(rect2.width);
}
var _throttleTimeout;
function throttle(callback, ms) {
  return function() {
    if (!_throttleTimeout) {
      var args = arguments, _this = this;
      if (args.length === 1) {
        callback.call(_this, args[0]);
      } else {
        callback.apply(_this, args);
      }
      _throttleTimeout = setTimeout(function() {
        _throttleTimeout = void 0;
      }, ms);
    }
  };
}
function cancelThrottle() {
  clearTimeout(_throttleTimeout);
  _throttleTimeout = void 0;
}
function scrollBy(el, x, y) {
  el.scrollLeft += x;
  el.scrollTop += y;
}
function clone(el) {
  var Polymer = window.Polymer;
  var $ = window.jQuery || window.Zepto;
  if (Polymer && Polymer.dom) {
    return Polymer.dom(el).cloneNode(true);
  } else if ($) {
    return $(el).clone(true)[0];
  } else {
    return el.cloneNode(true);
  }
}
function setRect(el, rect) {
  css(el, "position", "absolute");
  css(el, "top", rect.top);
  css(el, "left", rect.left);
  css(el, "width", rect.width);
  css(el, "height", rect.height);
}
function unsetRect(el) {
  css(el, "position", "");
  css(el, "top", "");
  css(el, "left", "");
  css(el, "width", "");
  css(el, "height", "");
}
var expando = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function AnimationStateManager() {
  var animationStates = [], animationCallbackId;
  return {
    captureAnimationState: function captureAnimationState() {
      animationStates = [];
      if (!this.options.animation) return;
      var children = [].slice.call(this.el.children);
      children.forEach(function(child) {
        if (css(child, "display") === "none" || child === Sortable.ghost) return;
        animationStates.push({
          target: child,
          rect: getRect(child)
        });
        var fromRect = _objectSpread2({}, animationStates[animationStates.length - 1].rect);
        if (child.thisAnimationDuration) {
          var childMatrix = matrix(child, true);
          if (childMatrix) {
            fromRect.top -= childMatrix.f;
            fromRect.left -= childMatrix.e;
          }
        }
        child.fromRect = fromRect;
      });
    },
    addAnimationState: function addAnimationState(state) {
      animationStates.push(state);
    },
    removeAnimationState: function removeAnimationState(target) {
      animationStates.splice(indexOfObject(animationStates, {
        target
      }), 1);
    },
    animateAll: function animateAll(callback) {
      var _this = this;
      if (!this.options.animation) {
        clearTimeout(animationCallbackId);
        if (typeof callback === "function") callback();
        return;
      }
      var animating = false, animationTime = 0;
      animationStates.forEach(function(state) {
        var time = 0, target = state.target, fromRect = target.fromRect, toRect = getRect(target), prevFromRect = target.prevFromRect, prevToRect = target.prevToRect, animatingRect = state.rect, targetMatrix = matrix(target, true);
        if (targetMatrix) {
          toRect.top -= targetMatrix.f;
          toRect.left -= targetMatrix.e;
        }
        target.toRect = toRect;
        if (target.thisAnimationDuration) {
          if (isRectEqual(prevFromRect, toRect) && !isRectEqual(fromRect, toRect) && // Make sure animatingRect is on line between toRect & fromRect
          (animatingRect.top - toRect.top) / (animatingRect.left - toRect.left) === (fromRect.top - toRect.top) / (fromRect.left - toRect.left)) {
            time = calculateRealTime(animatingRect, prevFromRect, prevToRect, _this.options);
          }
        }
        if (!isRectEqual(toRect, fromRect)) {
          target.prevFromRect = fromRect;
          target.prevToRect = toRect;
          if (!time) {
            time = _this.options.animation;
          }
          _this.animate(target, animatingRect, toRect, time);
        }
        if (time) {
          animating = true;
          animationTime = Math.max(animationTime, time);
          clearTimeout(target.animationResetTimer);
          target.animationResetTimer = setTimeout(function() {
            target.animationTime = 0;
            target.prevFromRect = null;
            target.fromRect = null;
            target.prevToRect = null;
            target.thisAnimationDuration = null;
          }, time);
          target.thisAnimationDuration = time;
        }
      });
      clearTimeout(animationCallbackId);
      if (!animating) {
        if (typeof callback === "function") callback();
      } else {
        animationCallbackId = setTimeout(function() {
          if (typeof callback === "function") callback();
        }, animationTime);
      }
      animationStates = [];
    },
    animate: function animate(target, currentRect, toRect, duration) {
      if (duration) {
        css(target, "transition", "");
        css(target, "transform", "");
        var elMatrix = matrix(this.el), scaleX = elMatrix && elMatrix.a, scaleY = elMatrix && elMatrix.d, translateX = (currentRect.left - toRect.left) / (scaleX || 1), translateY = (currentRect.top - toRect.top) / (scaleY || 1);
        target.animatingX = !!translateX;
        target.animatingY = !!translateY;
        css(target, "transform", "translate3d(" + translateX + "px," + translateY + "px,0)");
        this.forRepaintDummy = repaint(target);
        css(target, "transition", "transform " + duration + "ms" + (this.options.easing ? " " + this.options.easing : ""));
        css(target, "transform", "translate3d(0,0,0)");
        typeof target.animated === "number" && clearTimeout(target.animated);
        target.animated = setTimeout(function() {
          css(target, "transition", "");
          css(target, "transform", "");
          target.animated = false;
          target.animatingX = false;
          target.animatingY = false;
        }, duration);
      }
    }
  };
}
function repaint(target) {
  return target.offsetWidth;
}
function calculateRealTime(animatingRect, fromRect, toRect, options) {
  return Math.sqrt(Math.pow(fromRect.top - animatingRect.top, 2) + Math.pow(fromRect.left - animatingRect.left, 2)) / Math.sqrt(Math.pow(fromRect.top - toRect.top, 2) + Math.pow(fromRect.left - toRect.left, 2)) * options.animation;
}
var plugins = [];
var defaults = {
  initializeByDefault: true
};
var PluginManager = {
  mount: function mount(plugin) {
    for (var option2 in defaults) {
      if (defaults.hasOwnProperty(option2) && !(option2 in plugin)) {
        plugin[option2] = defaults[option2];
      }
    }
    plugins.forEach(function(p) {
      if (p.pluginName === plugin.pluginName) {
        throw "Sortable: Cannot mount plugin ".concat(plugin.pluginName, " more than once");
      }
    });
    plugins.push(plugin);
  },
  pluginEvent: function pluginEvent(eventName, sortable, evt) {
    var _this = this;
    this.eventCanceled = false;
    evt.cancel = function() {
      _this.eventCanceled = true;
    };
    var eventNameGlobal = eventName + "Global";
    plugins.forEach(function(plugin) {
      if (!sortable[plugin.pluginName]) return;
      if (sortable[plugin.pluginName][eventNameGlobal]) {
        sortable[plugin.pluginName][eventNameGlobal](_objectSpread2({
          sortable
        }, evt));
      }
      if (sortable.options[plugin.pluginName] && sortable[plugin.pluginName][eventName]) {
        sortable[plugin.pluginName][eventName](_objectSpread2({
          sortable
        }, evt));
      }
    });
  },
  initializePlugins: function initializePlugins(sortable, el, defaults2, options) {
    plugins.forEach(function(plugin) {
      var pluginName = plugin.pluginName;
      if (!sortable.options[pluginName] && !plugin.initializeByDefault) return;
      var initialized2 = new plugin(sortable, el, sortable.options);
      initialized2.sortable = sortable;
      initialized2.options = sortable.options;
      sortable[pluginName] = initialized2;
      _extends(defaults2, initialized2.defaults);
    });
    for (var option2 in sortable.options) {
      if (!sortable.options.hasOwnProperty(option2)) continue;
      var modified = this.modifyOption(sortable, option2, sortable.options[option2]);
      if (typeof modified !== "undefined") {
        sortable.options[option2] = modified;
      }
    }
  },
  getEventProperties: function getEventProperties(name, sortable) {
    var eventProperties = {};
    plugins.forEach(function(plugin) {
      if (typeof plugin.eventProperties !== "function") return;
      _extends(eventProperties, plugin.eventProperties.call(sortable[plugin.pluginName], name));
    });
    return eventProperties;
  },
  modifyOption: function modifyOption(sortable, name, value) {
    var modifiedValue;
    plugins.forEach(function(plugin) {
      if (!sortable[plugin.pluginName]) return;
      if (plugin.optionListeners && typeof plugin.optionListeners[name] === "function") {
        modifiedValue = plugin.optionListeners[name].call(sortable[plugin.pluginName], value);
      }
    });
    return modifiedValue;
  }
};
function dispatchEvent(_ref) {
  var sortable = _ref.sortable, rootEl2 = _ref.rootEl, name = _ref.name, targetEl = _ref.targetEl, cloneEl2 = _ref.cloneEl, toEl = _ref.toEl, fromEl = _ref.fromEl, oldIndex2 = _ref.oldIndex, newIndex2 = _ref.newIndex, oldDraggableIndex2 = _ref.oldDraggableIndex, newDraggableIndex2 = _ref.newDraggableIndex, originalEvent = _ref.originalEvent, putSortable2 = _ref.putSortable, extraEventProperties = _ref.extraEventProperties;
  sortable = sortable || rootEl2 && rootEl2[expando];
  if (!sortable) return;
  var evt, options = sortable.options, onName = "on" + name.charAt(0).toUpperCase() + name.substr(1);
  if (window.CustomEvent && !IE11OrLess && !Edge) {
    evt = new CustomEvent(name, {
      bubbles: true,
      cancelable: true
    });
  } else {
    evt = document.createEvent("Event");
    evt.initEvent(name, true, true);
  }
  evt.to = toEl || rootEl2;
  evt.from = fromEl || rootEl2;
  evt.item = targetEl || rootEl2;
  evt.clone = cloneEl2;
  evt.oldIndex = oldIndex2;
  evt.newIndex = newIndex2;
  evt.oldDraggableIndex = oldDraggableIndex2;
  evt.newDraggableIndex = newDraggableIndex2;
  evt.originalEvent = originalEvent;
  evt.pullMode = putSortable2 ? putSortable2.lastPutMode : void 0;
  var allEventProperties = _objectSpread2(_objectSpread2({}, extraEventProperties), PluginManager.getEventProperties(name, sortable));
  for (var option2 in allEventProperties) {
    evt[option2] = allEventProperties[option2];
  }
  if (rootEl2) {
    rootEl2.dispatchEvent(evt);
  }
  if (options[onName]) {
    options[onName].call(sortable, evt);
  }
}
var _excluded = ["evt"];
var pluginEvent2 = function pluginEvent3(eventName, sortable) {
  var _ref = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, originalEvent = _ref.evt, data = _objectWithoutProperties(_ref, _excluded);
  PluginManager.pluginEvent.bind(Sortable)(eventName, sortable, _objectSpread2({
    dragEl,
    parentEl,
    ghostEl,
    rootEl,
    nextEl,
    lastDownEl,
    cloneEl,
    cloneHidden,
    dragStarted: moved,
    putSortable,
    activeSortable: Sortable.active,
    originalEvent,
    oldIndex,
    oldDraggableIndex,
    newIndex,
    newDraggableIndex,
    hideGhostForTarget: _hideGhostForTarget,
    unhideGhostForTarget: _unhideGhostForTarget,
    cloneNowHidden: function cloneNowHidden() {
      cloneHidden = true;
    },
    cloneNowShown: function cloneNowShown() {
      cloneHidden = false;
    },
    dispatchSortableEvent: function dispatchSortableEvent(name) {
      _dispatchEvent({
        sortable,
        name,
        originalEvent
      });
    }
  }, data));
};
function _dispatchEvent(info) {
  dispatchEvent(_objectSpread2({
    putSortable,
    cloneEl,
    targetEl: dragEl,
    rootEl,
    oldIndex,
    oldDraggableIndex,
    newIndex,
    newDraggableIndex
  }, info));
}
var dragEl, parentEl, ghostEl, rootEl, nextEl, lastDownEl, cloneEl, cloneHidden, oldIndex, newIndex, oldDraggableIndex, newDraggableIndex, activeGroup, putSortable, awaitingDragStarted = false, ignoreNextClick = false, sortables = [], tapEvt, touchEvt, lastDx, lastDy, tapDistanceLeft, tapDistanceTop, moved, lastTarget, lastDirection, pastFirstInvertThresh = false, isCircumstantialInvert = false, targetMoveDistance, ghostRelativeParent, ghostRelativeParentInitialScroll = [], _silent = false, savedInputChecked = [];
var documentExists = typeof document !== "undefined", PositionGhostAbsolutely = IOS, CSSFloatProperty = Edge || IE11OrLess ? "cssFloat" : "float", supportDraggable = documentExists && !ChromeForAndroid && !IOS && "draggable" in document.createElement("div"), supportCssPointerEvents = (function() {
  if (!documentExists) return;
  if (IE11OrLess) {
    return false;
  }
  var el = document.createElement("x");
  el.style.cssText = "pointer-events:auto";
  return el.style.pointerEvents === "auto";
})(), _detectDirection = function _detectDirection2(el, options) {
  var elCSS = css(el), elWidth = parseInt(elCSS.width) - parseInt(elCSS.paddingLeft) - parseInt(elCSS.paddingRight) - parseInt(elCSS.borderLeftWidth) - parseInt(elCSS.borderRightWidth), child1 = getChild(el, 0, options), child2 = getChild(el, 1, options), firstChildCSS = child1 && css(child1), secondChildCSS = child2 && css(child2), firstChildWidth = firstChildCSS && parseInt(firstChildCSS.marginLeft) + parseInt(firstChildCSS.marginRight) + getRect(child1).width, secondChildWidth = secondChildCSS && parseInt(secondChildCSS.marginLeft) + parseInt(secondChildCSS.marginRight) + getRect(child2).width;
  if (elCSS.display === "flex") {
    return elCSS.flexDirection === "column" || elCSS.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  }
  if (elCSS.display === "grid") {
    return elCSS.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  }
  if (child1 && firstChildCSS["float"] && firstChildCSS["float"] !== "none") {
    var touchingSideChild2 = firstChildCSS["float"] === "left" ? "left" : "right";
    return child2 && (secondChildCSS.clear === "both" || secondChildCSS.clear === touchingSideChild2) ? "vertical" : "horizontal";
  }
  return child1 && (firstChildCSS.display === "block" || firstChildCSS.display === "flex" || firstChildCSS.display === "table" || firstChildCSS.display === "grid" || firstChildWidth >= elWidth && elCSS[CSSFloatProperty] === "none" || child2 && elCSS[CSSFloatProperty] === "none" && firstChildWidth + secondChildWidth > elWidth) ? "vertical" : "horizontal";
}, _dragElInRowColumn = function _dragElInRowColumn2(dragRect, targetRect, vertical) {
  var dragElS1Opp = vertical ? dragRect.left : dragRect.top, dragElS2Opp = vertical ? dragRect.right : dragRect.bottom, dragElOppLength = vertical ? dragRect.width : dragRect.height, targetS1Opp = vertical ? targetRect.left : targetRect.top, targetS2Opp = vertical ? targetRect.right : targetRect.bottom, targetOppLength = vertical ? targetRect.width : targetRect.height;
  return dragElS1Opp === targetS1Opp || dragElS2Opp === targetS2Opp || dragElS1Opp + dragElOppLength / 2 === targetS1Opp + targetOppLength / 2;
}, _detectNearestEmptySortable = function _detectNearestEmptySortable2(x, y) {
  var ret;
  sortables.some(function(sortable) {
    var threshold = sortable[expando].options.emptyInsertThreshold;
    if (!threshold || lastChild(sortable)) return;
    var rect = getRect(sortable), insideHorizontally = x >= rect.left - threshold && x <= rect.right + threshold, insideVertically = y >= rect.top - threshold && y <= rect.bottom + threshold;
    if (insideHorizontally && insideVertically) {
      return ret = sortable;
    }
  });
  return ret;
}, _prepareGroup = function _prepareGroup2(options) {
  function toFn(value, pull) {
    return function(to, from, dragEl2, evt) {
      var sameGroup = to.options.group.name && from.options.group.name && to.options.group.name === from.options.group.name;
      if (value == null && (pull || sameGroup)) {
        return true;
      } else if (value == null || value === false) {
        return false;
      } else if (pull && value === "clone") {
        return value;
      } else if (typeof value === "function") {
        return toFn(value(to, from, dragEl2, evt), pull)(to, from, dragEl2, evt);
      } else {
        var otherGroup = (pull ? to : from).options.group.name;
        return value === true || typeof value === "string" && value === otherGroup || value.join && value.indexOf(otherGroup) > -1;
      }
    };
  }
  var group = {};
  var originalGroup = options.group;
  if (!originalGroup || _typeof(originalGroup) != "object") {
    originalGroup = {
      name: originalGroup
    };
  }
  group.name = originalGroup.name;
  group.checkPull = toFn(originalGroup.pull, true);
  group.checkPut = toFn(originalGroup.put);
  group.revertClone = originalGroup.revertClone;
  options.group = group;
}, _hideGhostForTarget = function _hideGhostForTarget2() {
  if (!supportCssPointerEvents && ghostEl) {
    css(ghostEl, "display", "none");
  }
}, _unhideGhostForTarget = function _unhideGhostForTarget2() {
  if (!supportCssPointerEvents && ghostEl) {
    css(ghostEl, "display", "");
  }
};
if (documentExists) {
  document.addEventListener("click", function(evt) {
    if (ignoreNextClick) {
      evt.preventDefault();
      evt.stopPropagation && evt.stopPropagation();
      evt.stopImmediatePropagation && evt.stopImmediatePropagation();
      ignoreNextClick = false;
      return false;
    }
  }, true);
}
var nearestEmptyInsertDetectEvent = function nearestEmptyInsertDetectEvent2(evt) {
  if (dragEl) {
    evt = evt.touches ? evt.touches[0] : evt;
    var nearest = _detectNearestEmptySortable(evt.clientX, evt.clientY);
    if (nearest) {
      var event = {};
      for (var i in evt) {
        if (evt.hasOwnProperty(i)) {
          event[i] = evt[i];
        }
      }
      event.target = event.rootEl = nearest;
      event.preventDefault = void 0;
      event.stopPropagation = void 0;
      nearest[expando]._onDragOver(event);
    }
  }
};
var _checkOutsideTargetEl = function _checkOutsideTargetEl2(evt) {
  if (dragEl) {
    dragEl.parentNode[expando]._isOutsideThisEl(evt.target);
  }
};
function Sortable(el, options) {
  if (!(el && el.nodeType && el.nodeType === 1)) {
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(el));
  }
  this.el = el;
  this.options = options = _extends({}, options);
  el[expando] = this;
  var defaults2 = {
    group: null,
    sort: true,
    disabled: false,
    store: null,
    handle: null,
    draggable: /^[uo]l$/i.test(el.nodeName) ? ">li" : ">*",
    swapThreshold: 1,
    // percentage; 0 <= x <= 1
    invertSwap: false,
    // invert always
    invertedSwapThreshold: null,
    // will be set to same as swapThreshold if default
    removeCloneOnHide: true,
    direction: function direction() {
      return _detectDirection(el, this.options);
    },
    ghostClass: "sortable-ghost",
    chosenClass: "sortable-chosen",
    dragClass: "sortable-drag",
    ignore: "a, img",
    filter: null,
    preventOnFilter: true,
    animation: 0,
    easing: null,
    setData: function setData(dataTransfer, dragEl2) {
      dataTransfer.setData("Text", dragEl2.textContent);
    },
    dropBubble: false,
    dragoverBubble: false,
    dataIdAttr: "data-id",
    delay: 0,
    delayOnTouchOnly: false,
    touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
    forceFallback: false,
    fallbackClass: "sortable-fallback",
    fallbackOnBody: false,
    fallbackTolerance: 0,
    fallbackOffset: {
      x: 0,
      y: 0
    },
    supportPointer: Sortable.supportPointer !== false && "PointerEvent" in window && !Safari,
    emptyInsertThreshold: 5
  };
  PluginManager.initializePlugins(this, el, defaults2);
  for (var name in defaults2) {
    !(name in options) && (options[name] = defaults2[name]);
  }
  _prepareGroup(options);
  for (var fn in this) {
    if (fn.charAt(0) === "_" && typeof this[fn] === "function") {
      this[fn] = this[fn].bind(this);
    }
  }
  this.nativeDraggable = options.forceFallback ? false : supportDraggable;
  if (this.nativeDraggable) {
    this.options.touchStartThreshold = 1;
  }
  if (options.supportPointer) {
    on(el, "pointerdown", this._onTapStart);
  } else {
    on(el, "mousedown", this._onTapStart);
    on(el, "touchstart", this._onTapStart);
  }
  if (this.nativeDraggable) {
    on(el, "dragover", this);
    on(el, "dragenter", this);
  }
  sortables.push(this.el);
  options.store && options.store.get && this.sort(options.store.get(this) || []);
  _extends(this, AnimationStateManager());
}
Sortable.prototype = /** @lends Sortable.prototype */
{
  constructor: Sortable,
  _isOutsideThisEl: function _isOutsideThisEl(target) {
    if (!this.el.contains(target) && target !== this.el) {
      lastTarget = null;
    }
  },
  _getDirection: function _getDirection(evt, target) {
    return typeof this.options.direction === "function" ? this.options.direction.call(this, evt, target, dragEl) : this.options.direction;
  },
  _onTapStart: function _onTapStart(evt) {
    if (!evt.cancelable) return;
    var _this = this, el = this.el, options = this.options, preventOnFilter = options.preventOnFilter, type = evt.type, touch = evt.touches && evt.touches[0] || evt.pointerType && evt.pointerType === "touch" && evt, target = (touch || evt).target, originalTarget = evt.target.shadowRoot && (evt.path && evt.path[0] || evt.composedPath && evt.composedPath()[0]) || target, filter = options.filter;
    _saveInputCheckedState(el);
    if (dragEl) {
      return;
    }
    if (/mousedown|pointerdown/.test(type) && evt.button !== 0 || options.disabled) {
      return;
    }
    if (originalTarget.isContentEditable) {
      return;
    }
    if (!this.nativeDraggable && Safari && target && target.tagName.toUpperCase() === "SELECT") {
      return;
    }
    target = closest(target, options.draggable, el, false);
    if (target && target.animated) {
      return;
    }
    if (lastDownEl === target) {
      return;
    }
    oldIndex = index(target);
    oldDraggableIndex = index(target, options.draggable);
    if (typeof filter === "function") {
      if (filter.call(this, evt, target, this)) {
        _dispatchEvent({
          sortable: _this,
          rootEl: originalTarget,
          name: "filter",
          targetEl: target,
          toEl: el,
          fromEl: el
        });
        pluginEvent2("filter", _this, {
          evt
        });
        preventOnFilter && evt.cancelable && evt.preventDefault();
        return;
      }
    } else if (filter) {
      filter = filter.split(",").some(function(criteria) {
        criteria = closest(originalTarget, criteria.trim(), el, false);
        if (criteria) {
          _dispatchEvent({
            sortable: _this,
            rootEl: criteria,
            name: "filter",
            targetEl: target,
            fromEl: el,
            toEl: el
          });
          pluginEvent2("filter", _this, {
            evt
          });
          return true;
        }
      });
      if (filter) {
        preventOnFilter && evt.cancelable && evt.preventDefault();
        return;
      }
    }
    if (options.handle && !closest(originalTarget, options.handle, el, false)) {
      return;
    }
    this._prepareDragStart(evt, touch, target);
  },
  _prepareDragStart: function _prepareDragStart(evt, touch, target) {
    var _this = this, el = _this.el, options = _this.options, ownerDocument = el.ownerDocument, dragStartFn;
    if (target && !dragEl && target.parentNode === el) {
      var dragRect = getRect(target);
      rootEl = el;
      dragEl = target;
      parentEl = dragEl.parentNode;
      nextEl = dragEl.nextSibling;
      lastDownEl = target;
      activeGroup = options.group;
      Sortable.dragged = dragEl;
      tapEvt = {
        target: dragEl,
        clientX: (touch || evt).clientX,
        clientY: (touch || evt).clientY
      };
      tapDistanceLeft = tapEvt.clientX - dragRect.left;
      tapDistanceTop = tapEvt.clientY - dragRect.top;
      this._lastX = (touch || evt).clientX;
      this._lastY = (touch || evt).clientY;
      dragEl.style["will-change"] = "all";
      dragStartFn = function dragStartFn2() {
        pluginEvent2("delayEnded", _this, {
          evt
        });
        if (Sortable.eventCanceled) {
          _this._onDrop();
          return;
        }
        _this._disableDelayedDragEvents();
        if (!FireFox && _this.nativeDraggable) {
          dragEl.draggable = true;
        }
        _this._triggerDragStart(evt, touch);
        _dispatchEvent({
          sortable: _this,
          name: "choose",
          originalEvent: evt
        });
        toggleClass(dragEl, options.chosenClass, true);
      };
      options.ignore.split(",").forEach(function(criteria) {
        find(dragEl, criteria.trim(), _disableDraggable);
      });
      on(ownerDocument, "dragover", nearestEmptyInsertDetectEvent);
      on(ownerDocument, "mousemove", nearestEmptyInsertDetectEvent);
      on(ownerDocument, "touchmove", nearestEmptyInsertDetectEvent);
      on(ownerDocument, "mouseup", _this._onDrop);
      on(ownerDocument, "touchend", _this._onDrop);
      on(ownerDocument, "touchcancel", _this._onDrop);
      if (FireFox && this.nativeDraggable) {
        this.options.touchStartThreshold = 4;
        dragEl.draggable = true;
      }
      pluginEvent2("delayStart", this, {
        evt
      });
      if (options.delay && (!options.delayOnTouchOnly || touch) && (!this.nativeDraggable || !(Edge || IE11OrLess))) {
        if (Sortable.eventCanceled) {
          this._onDrop();
          return;
        }
        on(ownerDocument, "mouseup", _this._disableDelayedDrag);
        on(ownerDocument, "touchend", _this._disableDelayedDrag);
        on(ownerDocument, "touchcancel", _this._disableDelayedDrag);
        on(ownerDocument, "mousemove", _this._delayedDragTouchMoveHandler);
        on(ownerDocument, "touchmove", _this._delayedDragTouchMoveHandler);
        options.supportPointer && on(ownerDocument, "pointermove", _this._delayedDragTouchMoveHandler);
        _this._dragStartTimer = setTimeout(dragStartFn, options.delay);
      } else {
        dragStartFn();
      }
    }
  },
  _delayedDragTouchMoveHandler: function _delayedDragTouchMoveHandler(e) {
    var touch = e.touches ? e.touches[0] : e;
    if (Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1))) {
      this._disableDelayedDrag();
    }
  },
  _disableDelayedDrag: function _disableDelayedDrag() {
    dragEl && _disableDraggable(dragEl);
    clearTimeout(this._dragStartTimer);
    this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function _disableDelayedDragEvents() {
    var ownerDocument = this.el.ownerDocument;
    off(ownerDocument, "mouseup", this._disableDelayedDrag);
    off(ownerDocument, "touchend", this._disableDelayedDrag);
    off(ownerDocument, "touchcancel", this._disableDelayedDrag);
    off(ownerDocument, "mousemove", this._delayedDragTouchMoveHandler);
    off(ownerDocument, "touchmove", this._delayedDragTouchMoveHandler);
    off(ownerDocument, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function _triggerDragStart(evt, touch) {
    touch = touch || evt.pointerType == "touch" && evt;
    if (!this.nativeDraggable || touch) {
      if (this.options.supportPointer) {
        on(document, "pointermove", this._onTouchMove);
      } else if (touch) {
        on(document, "touchmove", this._onTouchMove);
      } else {
        on(document, "mousemove", this._onTouchMove);
      }
    } else {
      on(dragEl, "dragend", this);
      on(rootEl, "dragstart", this._onDragStart);
    }
    try {
      if (document.selection) {
        _nextTick(function() {
          document.selection.empty();
        });
      } else {
        window.getSelection().removeAllRanges();
      }
    } catch (err) {
    }
  },
  _dragStarted: function _dragStarted(fallback, evt) {
    awaitingDragStarted = false;
    if (rootEl && dragEl) {
      pluginEvent2("dragStarted", this, {
        evt
      });
      if (this.nativeDraggable) {
        on(document, "dragover", _checkOutsideTargetEl);
      }
      var options = this.options;
      !fallback && toggleClass(dragEl, options.dragClass, false);
      toggleClass(dragEl, options.ghostClass, true);
      Sortable.active = this;
      fallback && this._appendGhost();
      _dispatchEvent({
        sortable: this,
        name: "start",
        originalEvent: evt
      });
    } else {
      this._nulling();
    }
  },
  _emulateDragOver: function _emulateDragOver() {
    if (touchEvt) {
      this._lastX = touchEvt.clientX;
      this._lastY = touchEvt.clientY;
      _hideGhostForTarget();
      var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
      var parent = target;
      while (target && target.shadowRoot) {
        target = target.shadowRoot.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
        if (target === parent) break;
        parent = target;
      }
      dragEl.parentNode[expando]._isOutsideThisEl(target);
      if (parent) {
        do {
          if (parent[expando]) {
            var inserted = void 0;
            inserted = parent[expando]._onDragOver({
              clientX: touchEvt.clientX,
              clientY: touchEvt.clientY,
              target,
              rootEl: parent
            });
            if (inserted && !this.options.dragoverBubble) {
              break;
            }
          }
          target = parent;
        } while (parent = parent.parentNode);
      }
      _unhideGhostForTarget();
    }
  },
  _onTouchMove: function _onTouchMove(evt) {
    if (tapEvt) {
      var options = this.options, fallbackTolerance = options.fallbackTolerance, fallbackOffset = options.fallbackOffset, touch = evt.touches ? evt.touches[0] : evt, ghostMatrix = ghostEl && matrix(ghostEl, true), scaleX = ghostEl && ghostMatrix && ghostMatrix.a, scaleY = ghostEl && ghostMatrix && ghostMatrix.d, relativeScrollOffset = PositionGhostAbsolutely && ghostRelativeParent && getRelativeScrollOffset(ghostRelativeParent), dx = (touch.clientX - tapEvt.clientX + fallbackOffset.x) / (scaleX || 1) + (relativeScrollOffset ? relativeScrollOffset[0] - ghostRelativeParentInitialScroll[0] : 0) / (scaleX || 1), dy = (touch.clientY - tapEvt.clientY + fallbackOffset.y) / (scaleY || 1) + (relativeScrollOffset ? relativeScrollOffset[1] - ghostRelativeParentInitialScroll[1] : 0) / (scaleY || 1);
      if (!Sortable.active && !awaitingDragStarted) {
        if (fallbackTolerance && Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) < fallbackTolerance) {
          return;
        }
        this._onDragStart(evt, true);
      }
      if (ghostEl) {
        if (ghostMatrix) {
          ghostMatrix.e += dx - (lastDx || 0);
          ghostMatrix.f += dy - (lastDy || 0);
        } else {
          ghostMatrix = {
            a: 1,
            b: 0,
            c: 0,
            d: 1,
            e: dx,
            f: dy
          };
        }
        var cssMatrix = "matrix(".concat(ghostMatrix.a, ",").concat(ghostMatrix.b, ",").concat(ghostMatrix.c, ",").concat(ghostMatrix.d, ",").concat(ghostMatrix.e, ",").concat(ghostMatrix.f, ")");
        css(ghostEl, "webkitTransform", cssMatrix);
        css(ghostEl, "mozTransform", cssMatrix);
        css(ghostEl, "msTransform", cssMatrix);
        css(ghostEl, "transform", cssMatrix);
        lastDx = dx;
        lastDy = dy;
        touchEvt = touch;
      }
      evt.cancelable && evt.preventDefault();
    }
  },
  _appendGhost: function _appendGhost() {
    if (!ghostEl) {
      var container = this.options.fallbackOnBody ? document.body : rootEl, rect = getRect(dragEl, true, PositionGhostAbsolutely, true, container), options = this.options;
      if (PositionGhostAbsolutely) {
        ghostRelativeParent = container;
        while (css(ghostRelativeParent, "position") === "static" && css(ghostRelativeParent, "transform") === "none" && ghostRelativeParent !== document) {
          ghostRelativeParent = ghostRelativeParent.parentNode;
        }
        if (ghostRelativeParent !== document.body && ghostRelativeParent !== document.documentElement) {
          if (ghostRelativeParent === document) ghostRelativeParent = getWindowScrollingElement();
          rect.top += ghostRelativeParent.scrollTop;
          rect.left += ghostRelativeParent.scrollLeft;
        } else {
          ghostRelativeParent = getWindowScrollingElement();
        }
        ghostRelativeParentInitialScroll = getRelativeScrollOffset(ghostRelativeParent);
      }
      ghostEl = dragEl.cloneNode(true);
      toggleClass(ghostEl, options.ghostClass, false);
      toggleClass(ghostEl, options.fallbackClass, true);
      toggleClass(ghostEl, options.dragClass, true);
      css(ghostEl, "transition", "");
      css(ghostEl, "transform", "");
      css(ghostEl, "box-sizing", "border-box");
      css(ghostEl, "margin", 0);
      css(ghostEl, "top", rect.top);
      css(ghostEl, "left", rect.left);
      css(ghostEl, "width", rect.width);
      css(ghostEl, "height", rect.height);
      css(ghostEl, "opacity", "0.8");
      css(ghostEl, "position", PositionGhostAbsolutely ? "absolute" : "fixed");
      css(ghostEl, "zIndex", "100000");
      css(ghostEl, "pointerEvents", "none");
      Sortable.ghost = ghostEl;
      container.appendChild(ghostEl);
      css(ghostEl, "transform-origin", tapDistanceLeft / parseInt(ghostEl.style.width) * 100 + "% " + tapDistanceTop / parseInt(ghostEl.style.height) * 100 + "%");
    }
  },
  _onDragStart: function _onDragStart(evt, fallback) {
    var _this = this;
    var dataTransfer = evt.dataTransfer;
    var options = _this.options;
    pluginEvent2("dragStart", this, {
      evt
    });
    if (Sortable.eventCanceled) {
      this._onDrop();
      return;
    }
    pluginEvent2("setupClone", this);
    if (!Sortable.eventCanceled) {
      cloneEl = clone(dragEl);
      cloneEl.draggable = false;
      cloneEl.style["will-change"] = "";
      this._hideClone();
      toggleClass(cloneEl, this.options.chosenClass, false);
      Sortable.clone = cloneEl;
    }
    _this.cloneId = _nextTick(function() {
      pluginEvent2("clone", _this);
      if (Sortable.eventCanceled) return;
      if (!_this.options.removeCloneOnHide) {
        rootEl.insertBefore(cloneEl, dragEl);
      }
      _this._hideClone();
      _dispatchEvent({
        sortable: _this,
        name: "clone"
      });
    });
    !fallback && toggleClass(dragEl, options.dragClass, true);
    if (fallback) {
      ignoreNextClick = true;
      _this._loopId = setInterval(_this._emulateDragOver, 50);
    } else {
      off(document, "mouseup", _this._onDrop);
      off(document, "touchend", _this._onDrop);
      off(document, "touchcancel", _this._onDrop);
      if (dataTransfer) {
        dataTransfer.effectAllowed = "move";
        options.setData && options.setData.call(_this, dataTransfer, dragEl);
      }
      on(document, "drop", _this);
      css(dragEl, "transform", "translateZ(0)");
    }
    awaitingDragStarted = true;
    _this._dragStartId = _nextTick(_this._dragStarted.bind(_this, fallback, evt));
    on(document, "selectstart", _this);
    moved = true;
    if (Safari) {
      css(document.body, "user-select", "none");
    }
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function _onDragOver(evt) {
    var el = this.el, target = evt.target, dragRect, targetRect, revert, options = this.options, group = options.group, activeSortable = Sortable.active, isOwner = activeGroup === group, canSort = options.sort, fromSortable = putSortable || activeSortable, vertical, _this = this, completedFired = false;
    if (_silent) return;
    function dragOverEvent(name, extra) {
      pluginEvent2(name, _this, _objectSpread2({
        evt,
        isOwner,
        axis: vertical ? "vertical" : "horizontal",
        revert,
        dragRect,
        targetRect,
        canSort,
        fromSortable,
        target,
        completed,
        onMove: function onMove(target2, after2) {
          return _onMove(rootEl, el, dragEl, dragRect, target2, getRect(target2), evt, after2);
        },
        changed
      }, extra));
    }
    function capture() {
      dragOverEvent("dragOverAnimationCapture");
      _this.captureAnimationState();
      if (_this !== fromSortable) {
        fromSortable.captureAnimationState();
      }
    }
    function completed(insertion) {
      dragOverEvent("dragOverCompleted", {
        insertion
      });
      if (insertion) {
        if (isOwner) {
          activeSortable._hideClone();
        } else {
          activeSortable._showClone(_this);
        }
        if (_this !== fromSortable) {
          toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : activeSortable.options.ghostClass, false);
          toggleClass(dragEl, options.ghostClass, true);
        }
        if (putSortable !== _this && _this !== Sortable.active) {
          putSortable = _this;
        } else if (_this === Sortable.active && putSortable) {
          putSortable = null;
        }
        if (fromSortable === _this) {
          _this._ignoreWhileAnimating = target;
        }
        _this.animateAll(function() {
          dragOverEvent("dragOverAnimationComplete");
          _this._ignoreWhileAnimating = null;
        });
        if (_this !== fromSortable) {
          fromSortable.animateAll();
          fromSortable._ignoreWhileAnimating = null;
        }
      }
      if (target === dragEl && !dragEl.animated || target === el && !target.animated) {
        lastTarget = null;
      }
      if (!options.dragoverBubble && !evt.rootEl && target !== document) {
        dragEl.parentNode[expando]._isOutsideThisEl(evt.target);
        !insertion && nearestEmptyInsertDetectEvent(evt);
      }
      !options.dragoverBubble && evt.stopPropagation && evt.stopPropagation();
      return completedFired = true;
    }
    function changed() {
      newIndex = index(dragEl);
      newDraggableIndex = index(dragEl, options.draggable);
      _dispatchEvent({
        sortable: _this,
        name: "change",
        toEl: el,
        newIndex,
        newDraggableIndex,
        originalEvent: evt
      });
    }
    if (evt.preventDefault !== void 0) {
      evt.cancelable && evt.preventDefault();
    }
    target = closest(target, options.draggable, el, true);
    dragOverEvent("dragOver");
    if (Sortable.eventCanceled) return completedFired;
    if (dragEl.contains(evt.target) || target.animated && target.animatingX && target.animatingY || _this._ignoreWhileAnimating === target) {
      return completed(false);
    }
    ignoreNextClick = false;
    if (activeSortable && !options.disabled && (isOwner ? canSort || (revert = parentEl !== rootEl) : putSortable === this || (this.lastPutMode = activeGroup.checkPull(this, activeSortable, dragEl, evt)) && group.checkPut(this, activeSortable, dragEl, evt))) {
      vertical = this._getDirection(evt, target) === "vertical";
      dragRect = getRect(dragEl);
      dragOverEvent("dragOverValid");
      if (Sortable.eventCanceled) return completedFired;
      if (revert) {
        parentEl = rootEl;
        capture();
        this._hideClone();
        dragOverEvent("revert");
        if (!Sortable.eventCanceled) {
          if (nextEl) {
            rootEl.insertBefore(dragEl, nextEl);
          } else {
            rootEl.appendChild(dragEl);
          }
        }
        return completed(true);
      }
      var elLastChild = lastChild(el, options.draggable);
      if (!elLastChild || _ghostIsLast(evt, vertical, this) && !elLastChild.animated) {
        if (elLastChild === dragEl) {
          return completed(false);
        }
        if (elLastChild && el === evt.target) {
          target = elLastChild;
        }
        if (target) {
          targetRect = getRect(target);
        }
        if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, !!target) !== false) {
          capture();
          el.appendChild(dragEl);
          parentEl = el;
          changed();
          return completed(true);
        }
      } else if (elLastChild && _ghostIsFirst(evt, vertical, this)) {
        var firstChild = getChild(el, 0, options, true);
        if (firstChild === dragEl) {
          return completed(false);
        }
        target = firstChild;
        targetRect = getRect(target);
        if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, false) !== false) {
          capture();
          el.insertBefore(dragEl, firstChild);
          parentEl = el;
          changed();
          return completed(true);
        }
      } else if (target.parentNode === el) {
        targetRect = getRect(target);
        var direction = 0, targetBeforeFirstSwap, differentLevel = dragEl.parentNode !== el, differentRowCol = !_dragElInRowColumn(dragEl.animated && dragEl.toRect || dragRect, target.animated && target.toRect || targetRect, vertical), side1 = vertical ? "top" : "left", scrolledPastTop = isScrolledPast(target, "top", "top") || isScrolledPast(dragEl, "top", "top"), scrollBefore = scrolledPastTop ? scrolledPastTop.scrollTop : void 0;
        if (lastTarget !== target) {
          targetBeforeFirstSwap = targetRect[side1];
          pastFirstInvertThresh = false;
          isCircumstantialInvert = !differentRowCol && options.invertSwap || differentLevel;
        }
        direction = _getSwapDirection(evt, target, targetRect, vertical, differentRowCol ? 1 : options.swapThreshold, options.invertedSwapThreshold == null ? options.swapThreshold : options.invertedSwapThreshold, isCircumstantialInvert, lastTarget === target);
        var sibling;
        if (direction !== 0) {
          var dragIndex = index(dragEl);
          do {
            dragIndex -= direction;
            sibling = parentEl.children[dragIndex];
          } while (sibling && (css(sibling, "display") === "none" || sibling === ghostEl));
        }
        if (direction === 0 || sibling === target) {
          return completed(false);
        }
        lastTarget = target;
        lastDirection = direction;
        var nextSibling = target.nextElementSibling, after = false;
        after = direction === 1;
        var moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, after);
        if (moveVector !== false) {
          if (moveVector === 1 || moveVector === -1) {
            after = moveVector === 1;
          }
          _silent = true;
          setTimeout(_unsilent, 30);
          capture();
          if (after && !nextSibling) {
            el.appendChild(dragEl);
          } else {
            target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
          }
          if (scrolledPastTop) {
            scrollBy(scrolledPastTop, 0, scrollBefore - scrolledPastTop.scrollTop);
          }
          parentEl = dragEl.parentNode;
          if (targetBeforeFirstSwap !== void 0 && !isCircumstantialInvert) {
            targetMoveDistance = Math.abs(targetBeforeFirstSwap - getRect(target)[side1]);
          }
          changed();
          return completed(true);
        }
      }
      if (el.contains(dragEl)) {
        return completed(false);
      }
    }
    return false;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function _offMoveEvents() {
    off(document, "mousemove", this._onTouchMove);
    off(document, "touchmove", this._onTouchMove);
    off(document, "pointermove", this._onTouchMove);
    off(document, "dragover", nearestEmptyInsertDetectEvent);
    off(document, "mousemove", nearestEmptyInsertDetectEvent);
    off(document, "touchmove", nearestEmptyInsertDetectEvent);
  },
  _offUpEvents: function _offUpEvents() {
    var ownerDocument = this.el.ownerDocument;
    off(ownerDocument, "mouseup", this._onDrop);
    off(ownerDocument, "touchend", this._onDrop);
    off(ownerDocument, "pointerup", this._onDrop);
    off(ownerDocument, "touchcancel", this._onDrop);
    off(document, "selectstart", this);
  },
  _onDrop: function _onDrop(evt) {
    var el = this.el, options = this.options;
    newIndex = index(dragEl);
    newDraggableIndex = index(dragEl, options.draggable);
    pluginEvent2("drop", this, {
      evt
    });
    parentEl = dragEl && dragEl.parentNode;
    newIndex = index(dragEl);
    newDraggableIndex = index(dragEl, options.draggable);
    if (Sortable.eventCanceled) {
      this._nulling();
      return;
    }
    awaitingDragStarted = false;
    isCircumstantialInvert = false;
    pastFirstInvertThresh = false;
    clearInterval(this._loopId);
    clearTimeout(this._dragStartTimer);
    _cancelNextTick(this.cloneId);
    _cancelNextTick(this._dragStartId);
    if (this.nativeDraggable) {
      off(document, "drop", this);
      off(el, "dragstart", this._onDragStart);
    }
    this._offMoveEvents();
    this._offUpEvents();
    if (Safari) {
      css(document.body, "user-select", "");
    }
    css(dragEl, "transform", "");
    if (evt) {
      if (moved) {
        evt.cancelable && evt.preventDefault();
        !options.dropBubble && evt.stopPropagation();
      }
      ghostEl && ghostEl.parentNode && ghostEl.parentNode.removeChild(ghostEl);
      if (rootEl === parentEl || putSortable && putSortable.lastPutMode !== "clone") {
        cloneEl && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl);
      }
      if (dragEl) {
        if (this.nativeDraggable) {
          off(dragEl, "dragend", this);
        }
        _disableDraggable(dragEl);
        dragEl.style["will-change"] = "";
        if (moved && !awaitingDragStarted) {
          toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : this.options.ghostClass, false);
        }
        toggleClass(dragEl, this.options.chosenClass, false);
        _dispatchEvent({
          sortable: this,
          name: "unchoose",
          toEl: parentEl,
          newIndex: null,
          newDraggableIndex: null,
          originalEvent: evt
        });
        if (rootEl !== parentEl) {
          if (newIndex >= 0) {
            _dispatchEvent({
              rootEl: parentEl,
              name: "add",
              toEl: parentEl,
              fromEl: rootEl,
              originalEvent: evt
            });
            _dispatchEvent({
              sortable: this,
              name: "remove",
              toEl: parentEl,
              originalEvent: evt
            });
            _dispatchEvent({
              rootEl: parentEl,
              name: "sort",
              toEl: parentEl,
              fromEl: rootEl,
              originalEvent: evt
            });
            _dispatchEvent({
              sortable: this,
              name: "sort",
              toEl: parentEl,
              originalEvent: evt
            });
          }
          putSortable && putSortable.save();
        } else {
          if (newIndex !== oldIndex) {
            if (newIndex >= 0) {
              _dispatchEvent({
                sortable: this,
                name: "update",
                toEl: parentEl,
                originalEvent: evt
              });
              _dispatchEvent({
                sortable: this,
                name: "sort",
                toEl: parentEl,
                originalEvent: evt
              });
            }
          }
        }
        if (Sortable.active) {
          if (newIndex == null || newIndex === -1) {
            newIndex = oldIndex;
            newDraggableIndex = oldDraggableIndex;
          }
          _dispatchEvent({
            sortable: this,
            name: "end",
            toEl: parentEl,
            originalEvent: evt
          });
          this.save();
        }
      }
    }
    this._nulling();
  },
  _nulling: function _nulling() {
    pluginEvent2("nulling", this);
    rootEl = dragEl = parentEl = ghostEl = nextEl = cloneEl = lastDownEl = cloneHidden = tapEvt = touchEvt = moved = newIndex = newDraggableIndex = oldIndex = oldDraggableIndex = lastTarget = lastDirection = putSortable = activeGroup = Sortable.dragged = Sortable.ghost = Sortable.clone = Sortable.active = null;
    savedInputChecked.forEach(function(el) {
      el.checked = true;
    });
    savedInputChecked.length = lastDx = lastDy = 0;
  },
  handleEvent: function handleEvent(evt) {
    switch (evt.type) {
      case "drop":
      case "dragend":
        this._onDrop(evt);
        break;
      case "dragenter":
      case "dragover":
        if (dragEl) {
          this._onDragOver(evt);
          _globalDragOver(evt);
        }
        break;
      case "selectstart":
        evt.preventDefault();
        break;
    }
  },
  /**
   * Serializes the item into an array of string.
   * @returns {String[]}
   */
  toArray: function toArray() {
    var order = [], el, children = this.el.children, i = 0, n = children.length, options = this.options;
    for (; i < n; i++) {
      el = children[i];
      if (closest(el, options.draggable, this.el, false)) {
        order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
      }
    }
    return order;
  },
  /**
   * Sorts the elements according to the array.
   * @param  {String[]}  order  order of the items
   */
  sort: function sort(order, useAnimation) {
    var items = {}, rootEl2 = this.el;
    this.toArray().forEach(function(id, i) {
      var el = rootEl2.children[i];
      if (closest(el, this.options.draggable, rootEl2, false)) {
        items[id] = el;
      }
    }, this);
    useAnimation && this.captureAnimationState();
    order.forEach(function(id) {
      if (items[id]) {
        rootEl2.removeChild(items[id]);
        rootEl2.appendChild(items[id]);
      }
    });
    useAnimation && this.animateAll();
  },
  /**
   * Save the current sorting
   */
  save: function save() {
    var store = this.options.store;
    store && store.set && store.set(this);
  },
  /**
   * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
   * @param   {HTMLElement}  el
   * @param   {String}       [selector]  default: `options.draggable`
   * @returns {HTMLElement|null}
   */
  closest: function closest$1(el, selector) {
    return closest(el, selector || this.options.draggable, this.el, false);
  },
  /**
   * Set/get option
   * @param   {string} name
   * @param   {*}      [value]
   * @returns {*}
   */
  option: function option(name, value) {
    var options = this.options;
    if (value === void 0) {
      return options[name];
    } else {
      var modifiedValue = PluginManager.modifyOption(this, name, value);
      if (typeof modifiedValue !== "undefined") {
        options[name] = modifiedValue;
      } else {
        options[name] = value;
      }
      if (name === "group") {
        _prepareGroup(options);
      }
    }
  },
  /**
   * Destroy
   */
  destroy: function destroy() {
    pluginEvent2("destroy", this);
    var el = this.el;
    el[expando] = null;
    off(el, "mousedown", this._onTapStart);
    off(el, "touchstart", this._onTapStart);
    off(el, "pointerdown", this._onTapStart);
    if (this.nativeDraggable) {
      off(el, "dragover", this);
      off(el, "dragenter", this);
    }
    Array.prototype.forEach.call(el.querySelectorAll("[draggable]"), function(el2) {
      el2.removeAttribute("draggable");
    });
    this._onDrop();
    this._disableDelayedDragEvents();
    sortables.splice(sortables.indexOf(this.el), 1);
    this.el = el = null;
  },
  _hideClone: function _hideClone() {
    if (!cloneHidden) {
      pluginEvent2("hideClone", this);
      if (Sortable.eventCanceled) return;
      css(cloneEl, "display", "none");
      if (this.options.removeCloneOnHide && cloneEl.parentNode) {
        cloneEl.parentNode.removeChild(cloneEl);
      }
      cloneHidden = true;
    }
  },
  _showClone: function _showClone(putSortable2) {
    if (putSortable2.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (cloneHidden) {
      pluginEvent2("showClone", this);
      if (Sortable.eventCanceled) return;
      if (dragEl.parentNode == rootEl && !this.options.group.revertClone) {
        rootEl.insertBefore(cloneEl, dragEl);
      } else if (nextEl) {
        rootEl.insertBefore(cloneEl, nextEl);
      } else {
        rootEl.appendChild(cloneEl);
      }
      if (this.options.group.revertClone) {
        this.animate(dragEl, cloneEl);
      }
      css(cloneEl, "display", "");
      cloneHidden = false;
    }
  }
};
function _globalDragOver(evt) {
  if (evt.dataTransfer) {
    evt.dataTransfer.dropEffect = "move";
  }
  evt.cancelable && evt.preventDefault();
}
function _onMove(fromEl, toEl, dragEl2, dragRect, targetEl, targetRect, originalEvent, willInsertAfter) {
  var evt, sortable = fromEl[expando], onMoveFn = sortable.options.onMove, retVal;
  if (window.CustomEvent && !IE11OrLess && !Edge) {
    evt = new CustomEvent("move", {
      bubbles: true,
      cancelable: true
    });
  } else {
    evt = document.createEvent("Event");
    evt.initEvent("move", true, true);
  }
  evt.to = toEl;
  evt.from = fromEl;
  evt.dragged = dragEl2;
  evt.draggedRect = dragRect;
  evt.related = targetEl || toEl;
  evt.relatedRect = targetRect || getRect(toEl);
  evt.willInsertAfter = willInsertAfter;
  evt.originalEvent = originalEvent;
  fromEl.dispatchEvent(evt);
  if (onMoveFn) {
    retVal = onMoveFn.call(sortable, evt, originalEvent);
  }
  return retVal;
}
function _disableDraggable(el) {
  el.draggable = false;
}
function _unsilent() {
  _silent = false;
}
function _ghostIsFirst(evt, vertical, sortable) {
  var rect = getRect(getChild(sortable.el, 0, sortable.options, true));
  var spacer = 10;
  return vertical ? evt.clientX < rect.left - spacer || evt.clientY < rect.top && evt.clientX < rect.right : evt.clientY < rect.top - spacer || evt.clientY < rect.bottom && evt.clientX < rect.left;
}
function _ghostIsLast(evt, vertical, sortable) {
  var rect = getRect(lastChild(sortable.el, sortable.options.draggable));
  var spacer = 10;
  return vertical ? evt.clientX > rect.right + spacer || evt.clientX <= rect.right && evt.clientY > rect.bottom && evt.clientX >= rect.left : evt.clientX > rect.right && evt.clientY > rect.top || evt.clientX <= rect.right && evt.clientY > rect.bottom + spacer;
}
function _getSwapDirection(evt, target, targetRect, vertical, swapThreshold, invertedSwapThreshold, invertSwap, isLastTarget) {
  var mouseOnAxis = vertical ? evt.clientY : evt.clientX, targetLength = vertical ? targetRect.height : targetRect.width, targetS1 = vertical ? targetRect.top : targetRect.left, targetS2 = vertical ? targetRect.bottom : targetRect.right, invert = false;
  if (!invertSwap) {
    if (isLastTarget && targetMoveDistance < targetLength * swapThreshold) {
      if (!pastFirstInvertThresh && (lastDirection === 1 ? mouseOnAxis > targetS1 + targetLength * invertedSwapThreshold / 2 : mouseOnAxis < targetS2 - targetLength * invertedSwapThreshold / 2)) {
        pastFirstInvertThresh = true;
      }
      if (!pastFirstInvertThresh) {
        if (lastDirection === 1 ? mouseOnAxis < targetS1 + targetMoveDistance : mouseOnAxis > targetS2 - targetMoveDistance) {
          return -lastDirection;
        }
      } else {
        invert = true;
      }
    } else {
      if (mouseOnAxis > targetS1 + targetLength * (1 - swapThreshold) / 2 && mouseOnAxis < targetS2 - targetLength * (1 - swapThreshold) / 2) {
        return _getInsertDirection(target);
      }
    }
  }
  invert = invert || invertSwap;
  if (invert) {
    if (mouseOnAxis < targetS1 + targetLength * invertedSwapThreshold / 2 || mouseOnAxis > targetS2 - targetLength * invertedSwapThreshold / 2) {
      return mouseOnAxis > targetS1 + targetLength / 2 ? 1 : -1;
    }
  }
  return 0;
}
function _getInsertDirection(target) {
  if (index(dragEl) < index(target)) {
    return 1;
  } else {
    return -1;
  }
}
function _generateId(el) {
  var str = el.tagName + el.className + el.src + el.href + el.textContent, i = str.length, sum = 0;
  while (i--) {
    sum += str.charCodeAt(i);
  }
  return sum.toString(36);
}
function _saveInputCheckedState(root) {
  savedInputChecked.length = 0;
  var inputs = root.getElementsByTagName("input");
  var idx = inputs.length;
  while (idx--) {
    var el = inputs[idx];
    el.checked && savedInputChecked.push(el);
  }
}
function _nextTick(fn) {
  return setTimeout(fn, 0);
}
function _cancelNextTick(id) {
  return clearTimeout(id);
}
if (documentExists) {
  on(document, "touchmove", function(evt) {
    if ((Sortable.active || awaitingDragStarted) && evt.cancelable) {
      evt.preventDefault();
    }
  });
}
Sortable.utils = {
  on,
  off,
  css,
  find,
  is: function is(el, selector) {
    return !!closest(el, selector, el, false);
  },
  extend,
  throttle,
  closest,
  toggleClass,
  clone,
  index,
  nextTick: _nextTick,
  cancelNextTick: _cancelNextTick,
  detectDirection: _detectDirection,
  getChild
};
Sortable.get = function(element) {
  return element[expando];
};
Sortable.mount = function() {
  for (var _len = arguments.length, plugins2 = new Array(_len), _key = 0; _key < _len; _key++) {
    plugins2[_key] = arguments[_key];
  }
  if (plugins2[0].constructor === Array) plugins2 = plugins2[0];
  plugins2.forEach(function(plugin) {
    if (!plugin.prototype || !plugin.prototype.constructor) {
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(plugin));
    }
    if (plugin.utils) Sortable.utils = _objectSpread2(_objectSpread2({}, Sortable.utils), plugin.utils);
    PluginManager.mount(plugin);
  });
};
Sortable.create = function(el, options) {
  return new Sortable(el, options);
};
Sortable.version = version;
var autoScrolls = [], scrollEl, scrollRootEl, scrolling = false, lastAutoScrollX, lastAutoScrollY, touchEvt$1, pointerElemChangedInterval;
function AutoScrollPlugin() {
  function AutoScroll() {
    this.defaults = {
      scroll: true,
      forceAutoScrollFallback: false,
      scrollSensitivity: 30,
      scrollSpeed: 10,
      bubbleScroll: true
    };
    for (var fn in this) {
      if (fn.charAt(0) === "_" && typeof this[fn] === "function") {
        this[fn] = this[fn].bind(this);
      }
    }
  }
  AutoScroll.prototype = {
    dragStarted: function dragStarted2(_ref) {
      var originalEvent = _ref.originalEvent;
      if (this.sortable.nativeDraggable) {
        on(document, "dragover", this._handleAutoScroll);
      } else {
        if (this.options.supportPointer) {
          on(document, "pointermove", this._handleFallbackAutoScroll);
        } else if (originalEvent.touches) {
          on(document, "touchmove", this._handleFallbackAutoScroll);
        } else {
          on(document, "mousemove", this._handleFallbackAutoScroll);
        }
      }
    },
    dragOverCompleted: function dragOverCompleted(_ref2) {
      var originalEvent = _ref2.originalEvent;
      if (!this.options.dragOverBubble && !originalEvent.rootEl) {
        this._handleAutoScroll(originalEvent);
      }
    },
    drop: function drop3() {
      if (this.sortable.nativeDraggable) {
        off(document, "dragover", this._handleAutoScroll);
      } else {
        off(document, "pointermove", this._handleFallbackAutoScroll);
        off(document, "touchmove", this._handleFallbackAutoScroll);
        off(document, "mousemove", this._handleFallbackAutoScroll);
      }
      clearPointerElemChangedInterval();
      clearAutoScrolls();
      cancelThrottle();
    },
    nulling: function nulling() {
      touchEvt$1 = scrollRootEl = scrollEl = scrolling = pointerElemChangedInterval = lastAutoScrollX = lastAutoScrollY = null;
      autoScrolls.length = 0;
    },
    _handleFallbackAutoScroll: function _handleFallbackAutoScroll(evt) {
      this._handleAutoScroll(evt, true);
    },
    _handleAutoScroll: function _handleAutoScroll(evt, fallback) {
      var _this = this;
      var x = (evt.touches ? evt.touches[0] : evt).clientX, y = (evt.touches ? evt.touches[0] : evt).clientY, elem = document.elementFromPoint(x, y);
      touchEvt$1 = evt;
      if (fallback || this.options.forceAutoScrollFallback || Edge || IE11OrLess || Safari) {
        autoScroll(evt, this.options, elem, fallback);
        var ogElemScroller = getParentAutoScrollElement(elem, true);
        if (scrolling && (!pointerElemChangedInterval || x !== lastAutoScrollX || y !== lastAutoScrollY)) {
          pointerElemChangedInterval && clearPointerElemChangedInterval();
          pointerElemChangedInterval = setInterval(function() {
            var newElem = getParentAutoScrollElement(document.elementFromPoint(x, y), true);
            if (newElem !== ogElemScroller) {
              ogElemScroller = newElem;
              clearAutoScrolls();
            }
            autoScroll(evt, _this.options, newElem, fallback);
          }, 10);
          lastAutoScrollX = x;
          lastAutoScrollY = y;
        }
      } else {
        if (!this.options.bubbleScroll || getParentAutoScrollElement(elem, true) === getWindowScrollingElement()) {
          clearAutoScrolls();
          return;
        }
        autoScroll(evt, this.options, getParentAutoScrollElement(elem, false), false);
      }
    }
  };
  return _extends(AutoScroll, {
    pluginName: "scroll",
    initializeByDefault: true
  });
}
function clearAutoScrolls() {
  autoScrolls.forEach(function(autoScroll2) {
    clearInterval(autoScroll2.pid);
  });
  autoScrolls = [];
}
function clearPointerElemChangedInterval() {
  clearInterval(pointerElemChangedInterval);
}
var autoScroll = throttle(function(evt, options, rootEl2, isFallback) {
  if (!options.scroll) return;
  var x = (evt.touches ? evt.touches[0] : evt).clientX, y = (evt.touches ? evt.touches[0] : evt).clientY, sens = options.scrollSensitivity, speed = options.scrollSpeed, winScroller = getWindowScrollingElement();
  var scrollThisInstance = false, scrollCustomFn;
  if (scrollRootEl !== rootEl2) {
    scrollRootEl = rootEl2;
    clearAutoScrolls();
    scrollEl = options.scroll;
    scrollCustomFn = options.scrollFn;
    if (scrollEl === true) {
      scrollEl = getParentAutoScrollElement(rootEl2, true);
    }
  }
  var layersOut = 0;
  var currentParent = scrollEl;
  do {
    var el = currentParent, rect = getRect(el), top = rect.top, bottom = rect.bottom, left = rect.left, right = rect.right, width = rect.width, height = rect.height, canScrollX = void 0, canScrollY = void 0, scrollWidth = el.scrollWidth, scrollHeight = el.scrollHeight, elCSS = css(el), scrollPosX = el.scrollLeft, scrollPosY = el.scrollTop;
    if (el === winScroller) {
      canScrollX = width < scrollWidth && (elCSS.overflowX === "auto" || elCSS.overflowX === "scroll" || elCSS.overflowX === "visible");
      canScrollY = height < scrollHeight && (elCSS.overflowY === "auto" || elCSS.overflowY === "scroll" || elCSS.overflowY === "visible");
    } else {
      canScrollX = width < scrollWidth && (elCSS.overflowX === "auto" || elCSS.overflowX === "scroll");
      canScrollY = height < scrollHeight && (elCSS.overflowY === "auto" || elCSS.overflowY === "scroll");
    }
    var vx = canScrollX && (Math.abs(right - x) <= sens && scrollPosX + width < scrollWidth) - (Math.abs(left - x) <= sens && !!scrollPosX);
    var vy = canScrollY && (Math.abs(bottom - y) <= sens && scrollPosY + height < scrollHeight) - (Math.abs(top - y) <= sens && !!scrollPosY);
    if (!autoScrolls[layersOut]) {
      for (var i = 0; i <= layersOut; i++) {
        if (!autoScrolls[i]) {
          autoScrolls[i] = {};
        }
      }
    }
    if (autoScrolls[layersOut].vx != vx || autoScrolls[layersOut].vy != vy || autoScrolls[layersOut].el !== el) {
      autoScrolls[layersOut].el = el;
      autoScrolls[layersOut].vx = vx;
      autoScrolls[layersOut].vy = vy;
      clearInterval(autoScrolls[layersOut].pid);
      if (vx != 0 || vy != 0) {
        scrollThisInstance = true;
        autoScrolls[layersOut].pid = setInterval(function() {
          if (isFallback && this.layer === 0) {
            Sortable.active._onTouchMove(touchEvt$1);
          }
          var scrollOffsetY = autoScrolls[this.layer].vy ? autoScrolls[this.layer].vy * speed : 0;
          var scrollOffsetX = autoScrolls[this.layer].vx ? autoScrolls[this.layer].vx * speed : 0;
          if (typeof scrollCustomFn === "function") {
            if (scrollCustomFn.call(Sortable.dragged.parentNode[expando], scrollOffsetX, scrollOffsetY, evt, touchEvt$1, autoScrolls[this.layer].el) !== "continue") {
              return;
            }
          }
          scrollBy(autoScrolls[this.layer].el, scrollOffsetX, scrollOffsetY);
        }.bind({
          layer: layersOut
        }), 24);
      }
    }
    layersOut++;
  } while (options.bubbleScroll && currentParent !== winScroller && (currentParent = getParentAutoScrollElement(currentParent, false)));
  scrolling = scrollThisInstance;
}, 30);
var drop = function drop2(_ref) {
  var originalEvent = _ref.originalEvent, putSortable2 = _ref.putSortable, dragEl2 = _ref.dragEl, activeSortable = _ref.activeSortable, dispatchSortableEvent = _ref.dispatchSortableEvent, hideGhostForTarget = _ref.hideGhostForTarget, unhideGhostForTarget = _ref.unhideGhostForTarget;
  if (!originalEvent) return;
  var toSortable = putSortable2 || activeSortable;
  hideGhostForTarget();
  var touch = originalEvent.changedTouches && originalEvent.changedTouches.length ? originalEvent.changedTouches[0] : originalEvent;
  var target = document.elementFromPoint(touch.clientX, touch.clientY);
  unhideGhostForTarget();
  if (toSortable && !toSortable.el.contains(target)) {
    dispatchSortableEvent("spill");
    this.onSpill({
      dragEl: dragEl2,
      putSortable: putSortable2
    });
  }
};
function Revert() {
}
Revert.prototype = {
  startIndex: null,
  dragStart: function dragStart(_ref2) {
    var oldDraggableIndex2 = _ref2.oldDraggableIndex;
    this.startIndex = oldDraggableIndex2;
  },
  onSpill: function onSpill(_ref3) {
    var dragEl2 = _ref3.dragEl, putSortable2 = _ref3.putSortable;
    this.sortable.captureAnimationState();
    if (putSortable2) {
      putSortable2.captureAnimationState();
    }
    var nextSibling = getChild(this.sortable.el, this.startIndex, this.options);
    if (nextSibling) {
      this.sortable.el.insertBefore(dragEl2, nextSibling);
    } else {
      this.sortable.el.appendChild(dragEl2);
    }
    this.sortable.animateAll();
    if (putSortable2) {
      putSortable2.animateAll();
    }
  },
  drop
};
_extends(Revert, {
  pluginName: "revertOnSpill"
});
function Remove() {
}
Remove.prototype = {
  onSpill: function onSpill2(_ref4) {
    var dragEl2 = _ref4.dragEl, putSortable2 = _ref4.putSortable;
    var parentSortable = putSortable2 || this.sortable;
    parentSortable.captureAnimationState();
    dragEl2.parentNode && dragEl2.parentNode.removeChild(dragEl2);
    parentSortable.animateAll();
  },
  drop
};
_extends(Remove, {
  pluginName: "removeOnSpill"
});
var lastSwapEl;
function SwapPlugin() {
  function Swap() {
    this.defaults = {
      swapClass: "sortable-swap-highlight"
    };
  }
  Swap.prototype = {
    dragStart: function dragStart2(_ref) {
      var dragEl2 = _ref.dragEl;
      lastSwapEl = dragEl2;
    },
    dragOverValid: function dragOverValid(_ref2) {
      var completed = _ref2.completed, target = _ref2.target, onMove = _ref2.onMove, activeSortable = _ref2.activeSortable, changed = _ref2.changed, cancel = _ref2.cancel;
      if (!activeSortable.options.swap) return;
      var el = this.sortable.el, options = this.options;
      if (target && target !== el) {
        var prevSwapEl = lastSwapEl;
        if (onMove(target) !== false) {
          toggleClass(target, options.swapClass, true);
          lastSwapEl = target;
        } else {
          lastSwapEl = null;
        }
        if (prevSwapEl && prevSwapEl !== lastSwapEl) {
          toggleClass(prevSwapEl, options.swapClass, false);
        }
      }
      changed();
      completed(true);
      cancel();
    },
    drop: function drop3(_ref3) {
      var activeSortable = _ref3.activeSortable, putSortable2 = _ref3.putSortable, dragEl2 = _ref3.dragEl;
      var toSortable = putSortable2 || this.sortable;
      var options = this.options;
      lastSwapEl && toggleClass(lastSwapEl, options.swapClass, false);
      if (lastSwapEl && (options.swap || putSortable2 && putSortable2.options.swap)) {
        if (dragEl2 !== lastSwapEl) {
          toSortable.captureAnimationState();
          if (toSortable !== activeSortable) activeSortable.captureAnimationState();
          swapNodes(dragEl2, lastSwapEl);
          toSortable.animateAll();
          if (toSortable !== activeSortable) activeSortable.animateAll();
        }
      }
    },
    nulling: function nulling() {
      lastSwapEl = null;
    }
  };
  return _extends(Swap, {
    pluginName: "swap",
    eventProperties: function eventProperties() {
      return {
        swapItem: lastSwapEl
      };
    }
  });
}
function swapNodes(n1, n2) {
  var p1 = n1.parentNode, p2 = n2.parentNode, i1, i2;
  if (!p1 || !p2 || p1.isEqualNode(n2) || p2.isEqualNode(n1)) return;
  i1 = index(n1);
  i2 = index(n2);
  if (p1.isEqualNode(p2) && i1 < i2) {
    i2++;
  }
  p1.insertBefore(n2, p1.children[i1]);
  p2.insertBefore(n1, p2.children[i2]);
}
var multiDragElements = [], multiDragClones = [], lastMultiDragSelect, multiDragSortable, initialFolding = false, folding = false, dragStarted = false, dragEl$1, clonesFromRect, clonesHidden;
function MultiDragPlugin() {
  function MultiDrag(sortable) {
    for (var fn in this) {
      if (fn.charAt(0) === "_" && typeof this[fn] === "function") {
        this[fn] = this[fn].bind(this);
      }
    }
    if (sortable.options.supportPointer) {
      on(document, "pointerup", this._deselectMultiDrag);
    } else {
      on(document, "mouseup", this._deselectMultiDrag);
      on(document, "touchend", this._deselectMultiDrag);
    }
    on(document, "keydown", this._checkKeyDown);
    on(document, "keyup", this._checkKeyUp);
    this.defaults = {
      selectedClass: "sortable-selected",
      multiDragKey: null,
      setData: function setData(dataTransfer, dragEl2) {
        var data = "";
        if (multiDragElements.length && multiDragSortable === sortable) {
          multiDragElements.forEach(function(multiDragElement, i) {
            data += (!i ? "" : ", ") + multiDragElement.textContent;
          });
        } else {
          data = dragEl2.textContent;
        }
        dataTransfer.setData("Text", data);
      }
    };
  }
  MultiDrag.prototype = {
    multiDragKeyDown: false,
    isMultiDrag: false,
    delayStartGlobal: function delayStartGlobal(_ref) {
      var dragged = _ref.dragEl;
      dragEl$1 = dragged;
    },
    delayEnded: function delayEnded() {
      this.isMultiDrag = ~multiDragElements.indexOf(dragEl$1);
    },
    setupClone: function setupClone(_ref2) {
      var sortable = _ref2.sortable, cancel = _ref2.cancel;
      if (!this.isMultiDrag) return;
      for (var i = 0; i < multiDragElements.length; i++) {
        multiDragClones.push(clone(multiDragElements[i]));
        multiDragClones[i].sortableIndex = multiDragElements[i].sortableIndex;
        multiDragClones[i].draggable = false;
        multiDragClones[i].style["will-change"] = "";
        toggleClass(multiDragClones[i], this.options.selectedClass, false);
        multiDragElements[i] === dragEl$1 && toggleClass(multiDragClones[i], this.options.chosenClass, false);
      }
      sortable._hideClone();
      cancel();
    },
    clone: function clone2(_ref3) {
      var sortable = _ref3.sortable, rootEl2 = _ref3.rootEl, dispatchSortableEvent = _ref3.dispatchSortableEvent, cancel = _ref3.cancel;
      if (!this.isMultiDrag) return;
      if (!this.options.removeCloneOnHide) {
        if (multiDragElements.length && multiDragSortable === sortable) {
          insertMultiDragClones(true, rootEl2);
          dispatchSortableEvent("clone");
          cancel();
        }
      }
    },
    showClone: function showClone(_ref4) {
      var cloneNowShown = _ref4.cloneNowShown, rootEl2 = _ref4.rootEl, cancel = _ref4.cancel;
      if (!this.isMultiDrag) return;
      insertMultiDragClones(false, rootEl2);
      multiDragClones.forEach(function(clone2) {
        css(clone2, "display", "");
      });
      cloneNowShown();
      clonesHidden = false;
      cancel();
    },
    hideClone: function hideClone(_ref5) {
      var _this = this;
      _ref5.sortable;
      var cloneNowHidden = _ref5.cloneNowHidden, cancel = _ref5.cancel;
      if (!this.isMultiDrag) return;
      multiDragClones.forEach(function(clone2) {
        css(clone2, "display", "none");
        if (_this.options.removeCloneOnHide && clone2.parentNode) {
          clone2.parentNode.removeChild(clone2);
        }
      });
      cloneNowHidden();
      clonesHidden = true;
      cancel();
    },
    dragStartGlobal: function dragStartGlobal(_ref6) {
      _ref6.sortable;
      if (!this.isMultiDrag && multiDragSortable) {
        multiDragSortable.multiDrag._deselectMultiDrag();
      }
      multiDragElements.forEach(function(multiDragElement) {
        multiDragElement.sortableIndex = index(multiDragElement);
      });
      multiDragElements = multiDragElements.sort(function(a, b) {
        return a.sortableIndex - b.sortableIndex;
      });
      dragStarted = true;
    },
    dragStarted: function dragStarted2(_ref7) {
      var _this2 = this;
      var sortable = _ref7.sortable;
      if (!this.isMultiDrag) return;
      if (this.options.sort) {
        sortable.captureAnimationState();
        if (this.options.animation) {
          multiDragElements.forEach(function(multiDragElement) {
            if (multiDragElement === dragEl$1) return;
            css(multiDragElement, "position", "absolute");
          });
          var dragRect = getRect(dragEl$1, false, true, true);
          multiDragElements.forEach(function(multiDragElement) {
            if (multiDragElement === dragEl$1) return;
            setRect(multiDragElement, dragRect);
          });
          folding = true;
          initialFolding = true;
        }
      }
      sortable.animateAll(function() {
        folding = false;
        initialFolding = false;
        if (_this2.options.animation) {
          multiDragElements.forEach(function(multiDragElement) {
            unsetRect(multiDragElement);
          });
        }
        if (_this2.options.sort) {
          removeMultiDragElements();
        }
      });
    },
    dragOver: function dragOver(_ref8) {
      var target = _ref8.target, completed = _ref8.completed, cancel = _ref8.cancel;
      if (folding && ~multiDragElements.indexOf(target)) {
        completed(false);
        cancel();
      }
    },
    revert: function revert(_ref9) {
      var fromSortable = _ref9.fromSortable, rootEl2 = _ref9.rootEl, sortable = _ref9.sortable, dragRect = _ref9.dragRect;
      if (multiDragElements.length > 1) {
        multiDragElements.forEach(function(multiDragElement) {
          sortable.addAnimationState({
            target: multiDragElement,
            rect: folding ? getRect(multiDragElement) : dragRect
          });
          unsetRect(multiDragElement);
          multiDragElement.fromRect = dragRect;
          fromSortable.removeAnimationState(multiDragElement);
        });
        folding = false;
        insertMultiDragElements(!this.options.removeCloneOnHide, rootEl2);
      }
    },
    dragOverCompleted: function dragOverCompleted(_ref10) {
      var sortable = _ref10.sortable, isOwner = _ref10.isOwner, insertion = _ref10.insertion, activeSortable = _ref10.activeSortable, parentEl2 = _ref10.parentEl, putSortable2 = _ref10.putSortable;
      var options = this.options;
      if (insertion) {
        if (isOwner) {
          activeSortable._hideClone();
        }
        initialFolding = false;
        if (options.animation && multiDragElements.length > 1 && (folding || !isOwner && !activeSortable.options.sort && !putSortable2)) {
          var dragRectAbsolute = getRect(dragEl$1, false, true, true);
          multiDragElements.forEach(function(multiDragElement) {
            if (multiDragElement === dragEl$1) return;
            setRect(multiDragElement, dragRectAbsolute);
            parentEl2.appendChild(multiDragElement);
          });
          folding = true;
        }
        if (!isOwner) {
          if (!folding) {
            removeMultiDragElements();
          }
          if (multiDragElements.length > 1) {
            var clonesHiddenBefore = clonesHidden;
            activeSortable._showClone(sortable);
            if (activeSortable.options.animation && !clonesHidden && clonesHiddenBefore) {
              multiDragClones.forEach(function(clone2) {
                activeSortable.addAnimationState({
                  target: clone2,
                  rect: clonesFromRect
                });
                clone2.fromRect = clonesFromRect;
                clone2.thisAnimationDuration = null;
              });
            }
          } else {
            activeSortable._showClone(sortable);
          }
        }
      }
    },
    dragOverAnimationCapture: function dragOverAnimationCapture(_ref11) {
      var dragRect = _ref11.dragRect, isOwner = _ref11.isOwner, activeSortable = _ref11.activeSortable;
      multiDragElements.forEach(function(multiDragElement) {
        multiDragElement.thisAnimationDuration = null;
      });
      if (activeSortable.options.animation && !isOwner && activeSortable.multiDrag.isMultiDrag) {
        clonesFromRect = _extends({}, dragRect);
        var dragMatrix = matrix(dragEl$1, true);
        clonesFromRect.top -= dragMatrix.f;
        clonesFromRect.left -= dragMatrix.e;
      }
    },
    dragOverAnimationComplete: function dragOverAnimationComplete() {
      if (folding) {
        folding = false;
        removeMultiDragElements();
      }
    },
    drop: function drop3(_ref12) {
      var evt = _ref12.originalEvent, rootEl2 = _ref12.rootEl, parentEl2 = _ref12.parentEl, sortable = _ref12.sortable, dispatchSortableEvent = _ref12.dispatchSortableEvent, oldIndex2 = _ref12.oldIndex, putSortable2 = _ref12.putSortable;
      var toSortable = putSortable2 || this.sortable;
      if (!evt) return;
      var options = this.options, children = parentEl2.children;
      if (!dragStarted) {
        if (options.multiDragKey && !this.multiDragKeyDown) {
          this._deselectMultiDrag();
        }
        toggleClass(dragEl$1, options.selectedClass, !~multiDragElements.indexOf(dragEl$1));
        if (!~multiDragElements.indexOf(dragEl$1)) {
          multiDragElements.push(dragEl$1);
          dispatchEvent({
            sortable,
            rootEl: rootEl2,
            name: "select",
            targetEl: dragEl$1
          });
          if (evt.shiftKey && lastMultiDragSelect && sortable.el.contains(lastMultiDragSelect)) {
            var lastIndex = index(lastMultiDragSelect), currentIndex = index(dragEl$1);
            if (~lastIndex && ~currentIndex && lastIndex !== currentIndex) {
              var n, i;
              if (currentIndex > lastIndex) {
                i = lastIndex;
                n = currentIndex;
              } else {
                i = currentIndex;
                n = lastIndex + 1;
              }
              for (; i < n; i++) {
                if (~multiDragElements.indexOf(children[i])) continue;
                toggleClass(children[i], options.selectedClass, true);
                multiDragElements.push(children[i]);
                dispatchEvent({
                  sortable,
                  rootEl: rootEl2,
                  name: "select",
                  targetEl: children[i]
                });
              }
            }
          } else {
            lastMultiDragSelect = dragEl$1;
          }
          multiDragSortable = toSortable;
        } else {
          multiDragElements.splice(multiDragElements.indexOf(dragEl$1), 1);
          lastMultiDragSelect = null;
          dispatchEvent({
            sortable,
            rootEl: rootEl2,
            name: "deselect",
            targetEl: dragEl$1
          });
        }
      }
      if (dragStarted && this.isMultiDrag) {
        folding = false;
        if ((parentEl2[expando].options.sort || parentEl2 !== rootEl2) && multiDragElements.length > 1) {
          var dragRect = getRect(dragEl$1), multiDragIndex = index(dragEl$1, ":not(." + this.options.selectedClass + ")");
          if (!initialFolding && options.animation) dragEl$1.thisAnimationDuration = null;
          toSortable.captureAnimationState();
          if (!initialFolding) {
            if (options.animation) {
              dragEl$1.fromRect = dragRect;
              multiDragElements.forEach(function(multiDragElement) {
                multiDragElement.thisAnimationDuration = null;
                if (multiDragElement !== dragEl$1) {
                  var rect = folding ? getRect(multiDragElement) : dragRect;
                  multiDragElement.fromRect = rect;
                  toSortable.addAnimationState({
                    target: multiDragElement,
                    rect
                  });
                }
              });
            }
            removeMultiDragElements();
            multiDragElements.forEach(function(multiDragElement) {
              if (children[multiDragIndex]) {
                parentEl2.insertBefore(multiDragElement, children[multiDragIndex]);
              } else {
                parentEl2.appendChild(multiDragElement);
              }
              multiDragIndex++;
            });
            if (oldIndex2 === index(dragEl$1)) {
              var update = false;
              multiDragElements.forEach(function(multiDragElement) {
                if (multiDragElement.sortableIndex !== index(multiDragElement)) {
                  update = true;
                  return;
                }
              });
              if (update) {
                dispatchSortableEvent("update");
              }
            }
          }
          multiDragElements.forEach(function(multiDragElement) {
            unsetRect(multiDragElement);
          });
          toSortable.animateAll();
        }
        multiDragSortable = toSortable;
      }
      if (rootEl2 === parentEl2 || putSortable2 && putSortable2.lastPutMode !== "clone") {
        multiDragClones.forEach(function(clone2) {
          clone2.parentNode && clone2.parentNode.removeChild(clone2);
        });
      }
    },
    nullingGlobal: function nullingGlobal() {
      this.isMultiDrag = dragStarted = false;
      multiDragClones.length = 0;
    },
    destroyGlobal: function destroyGlobal() {
      this._deselectMultiDrag();
      off(document, "pointerup", this._deselectMultiDrag);
      off(document, "mouseup", this._deselectMultiDrag);
      off(document, "touchend", this._deselectMultiDrag);
      off(document, "keydown", this._checkKeyDown);
      off(document, "keyup", this._checkKeyUp);
    },
    _deselectMultiDrag: function _deselectMultiDrag(evt) {
      if (typeof dragStarted !== "undefined" && dragStarted) return;
      if (multiDragSortable !== this.sortable) return;
      if (evt && closest(evt.target, this.options.draggable, this.sortable.el, false)) return;
      if (evt && evt.button !== 0) return;
      while (multiDragElements.length) {
        var el = multiDragElements[0];
        toggleClass(el, this.options.selectedClass, false);
        multiDragElements.shift();
        dispatchEvent({
          sortable: this.sortable,
          rootEl: this.sortable.el,
          name: "deselect",
          targetEl: el
        });
      }
    },
    _checkKeyDown: function _checkKeyDown(evt) {
      if (evt.key === this.options.multiDragKey) {
        this.multiDragKeyDown = true;
      }
    },
    _checkKeyUp: function _checkKeyUp(evt) {
      if (evt.key === this.options.multiDragKey) {
        this.multiDragKeyDown = false;
      }
    }
  };
  return _extends(MultiDrag, {
    // Static methods & properties
    pluginName: "multiDrag",
    utils: {
      /**
       * Selects the provided multi-drag item
       * @param  {HTMLElement} el    The element to be selected
       */
      select: function select(el) {
        var sortable = el.parentNode[expando];
        if (!sortable || !sortable.options.multiDrag || ~multiDragElements.indexOf(el)) return;
        if (multiDragSortable && multiDragSortable !== sortable) {
          multiDragSortable.multiDrag._deselectMultiDrag();
          multiDragSortable = sortable;
        }
        toggleClass(el, sortable.options.selectedClass, true);
        multiDragElements.push(el);
      },
      /**
       * Deselects the provided multi-drag item
       * @param  {HTMLElement} el    The element to be deselected
       */
      deselect: function deselect(el) {
        var sortable = el.parentNode[expando], index2 = multiDragElements.indexOf(el);
        if (!sortable || !sortable.options.multiDrag || !~index2) return;
        toggleClass(el, sortable.options.selectedClass, false);
        multiDragElements.splice(index2, 1);
      }
    },
    eventProperties: function eventProperties() {
      var _this3 = this;
      var oldIndicies = [], newIndicies = [];
      multiDragElements.forEach(function(multiDragElement) {
        oldIndicies.push({
          multiDragElement,
          index: multiDragElement.sortableIndex
        });
        var newIndex2;
        if (folding && multiDragElement !== dragEl$1) {
          newIndex2 = -1;
        } else if (folding) {
          newIndex2 = index(multiDragElement, ":not(." + _this3.options.selectedClass + ")");
        } else {
          newIndex2 = index(multiDragElement);
        }
        newIndicies.push({
          multiDragElement,
          index: newIndex2
        });
      });
      return {
        items: _toConsumableArray(multiDragElements),
        clones: [].concat(multiDragClones),
        oldIndicies,
        newIndicies
      };
    },
    optionListeners: {
      multiDragKey: function multiDragKey(key) {
        key = key.toLowerCase();
        if (key === "ctrl") {
          key = "Control";
        } else if (key.length > 1) {
          key = key.charAt(0).toUpperCase() + key.substr(1);
        }
        return key;
      }
    }
  });
}
function insertMultiDragElements(clonesInserted, rootEl2) {
  multiDragElements.forEach(function(multiDragElement, i) {
    var target = rootEl2.children[multiDragElement.sortableIndex + (clonesInserted ? Number(i) : 0)];
    if (target) {
      rootEl2.insertBefore(multiDragElement, target);
    } else {
      rootEl2.appendChild(multiDragElement);
    }
  });
}
function insertMultiDragClones(elementsInserted, rootEl2) {
  multiDragClones.forEach(function(clone2, i) {
    var target = rootEl2.children[clone2.sortableIndex + (elementsInserted ? Number(i) : 0)];
    if (target) {
      rootEl2.insertBefore(clone2, target);
    } else {
      rootEl2.appendChild(clone2);
    }
  });
}
function removeMultiDragElements() {
  multiDragElements.forEach(function(multiDragElement) {
    if (multiDragElement === dragEl$1) return;
    multiDragElement.parentNode && multiDragElement.parentNode.removeChild(multiDragElement);
  });
}
Sortable.mount(new AutoScrollPlugin());
Sortable.mount(Remove, Revert);
const sortable_esm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MultiDrag: MultiDragPlugin,
  Sortable,
  Swap: SwapPlugin,
  default: Sortable
}, Symbol.toStringTag, { value: "Module" }));
const require$$1 = /* @__PURE__ */ getAugmentedNamespace(sortable_esm);
var vuedraggable_umd = vuedraggable_umd$1.exports;
var hasRequiredVuedraggable_umd;
function requireVuedraggable_umd() {
  if (hasRequiredVuedraggable_umd) return vuedraggable_umd$1.exports;
  hasRequiredVuedraggable_umd = 1;
  (function(module, exports$1) {
    (function webpackUniversalModuleDefinition(root, factory) {
      module.exports = factory(requireVue(), require$$1);
    })(typeof self !== "undefined" ? self : vuedraggable_umd, function(__WEBPACK_EXTERNAL_MODULE__8bbf__, __WEBPACK_EXTERNAL_MODULE_a352__) {
      return (
        /******/
        (function(modules) {
          var installedModules = {};
          function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) {
              return installedModules[moduleId].exports;
            }
            var module2 = installedModules[moduleId] = {
              /******/
              i: moduleId,
              /******/
              l: false,
              /******/
              exports: {}
              /******/
            };
            modules[moduleId].call(module2.exports, module2, module2.exports, __webpack_require__);
            module2.l = true;
            return module2.exports;
          }
          __webpack_require__.m = modules;
          __webpack_require__.c = installedModules;
          __webpack_require__.d = function(exports$12, name, getter) {
            if (!__webpack_require__.o(exports$12, name)) {
              Object.defineProperty(exports$12, name, { enumerable: true, get: getter });
            }
          };
          __webpack_require__.r = function(exports$12) {
            if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
              Object.defineProperty(exports$12, Symbol.toStringTag, { value: "Module" });
            }
            Object.defineProperty(exports$12, "__esModule", { value: true });
          };
          __webpack_require__.t = function(value, mode) {
            if (mode & 1) value = __webpack_require__(value);
            if (mode & 8) return value;
            if (mode & 4 && typeof value === "object" && value && value.__esModule) return value;
            var ns = /* @__PURE__ */ Object.create(null);
            __webpack_require__.r(ns);
            Object.defineProperty(ns, "default", { enumerable: true, value });
            if (mode & 2 && typeof value != "string") for (var key in value) __webpack_require__.d(ns, key, function(key2) {
              return value[key2];
            }.bind(null, key));
            return ns;
          };
          __webpack_require__.n = function(module2) {
            var getter = module2 && module2.__esModule ? (
              /******/
              function getDefault() {
                return module2["default"];
              }
            ) : (
              /******/
              function getModuleExports() {
                return module2;
              }
            );
            __webpack_require__.d(getter, "a", getter);
            return getter;
          };
          __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
          };
          __webpack_require__.p = "";
          return __webpack_require__(__webpack_require__.s = "fb15");
        })({
          /***/
          "00ee": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var wellKnownSymbol = __webpack_require__("b622");
              var TO_STRING_TAG = wellKnownSymbol("toStringTag");
              var test = {};
              test[TO_STRING_TAG] = "z";
              module2.exports = String(test) === "[object z]";
            })
          ),
          /***/
          "0366": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var aFunction = __webpack_require__("1c0b");
              module2.exports = function(fn, that, length) {
                aFunction(fn);
                if (that === void 0) return fn;
                switch (length) {
                  case 0:
                    return function() {
                      return fn.call(that);
                    };
                  case 1:
                    return function(a) {
                      return fn.call(that, a);
                    };
                  case 2:
                    return function(a, b) {
                      return fn.call(that, a, b);
                    };
                  case 3:
                    return function(a, b, c) {
                      return fn.call(that, a, b, c);
                    };
                }
                return function() {
                  return fn.apply(that, arguments);
                };
              };
            })
          ),
          /***/
          "057f": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var toIndexedObject = __webpack_require__("fc6a");
              var nativeGetOwnPropertyNames = __webpack_require__("241c").f;
              var toString = {}.toString;
              var windowNames = typeof window == "object" && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
              var getWindowNames = function(it) {
                try {
                  return nativeGetOwnPropertyNames(it);
                } catch (error) {
                  return windowNames.slice();
                }
              };
              module2.exports.f = function getOwnPropertyNames(it) {
                return windowNames && toString.call(it) == "[object Window]" ? getWindowNames(it) : nativeGetOwnPropertyNames(toIndexedObject(it));
              };
            })
          ),
          /***/
          "06cf": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var DESCRIPTORS = __webpack_require__("83ab");
              var propertyIsEnumerableModule = __webpack_require__("d1e7");
              var createPropertyDescriptor = __webpack_require__("5c6c");
              var toIndexedObject = __webpack_require__("fc6a");
              var toPrimitive = __webpack_require__("c04e");
              var has = __webpack_require__("5135");
              var IE8_DOM_DEFINE = __webpack_require__("0cfb");
              var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
              exports$12.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
                O = toIndexedObject(O);
                P = toPrimitive(P, true);
                if (IE8_DOM_DEFINE) try {
                  return nativeGetOwnPropertyDescriptor(O, P);
                } catch (error) {
                }
                if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
              };
            })
          ),
          /***/
          "0cfb": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var DESCRIPTORS = __webpack_require__("83ab");
              var fails = __webpack_require__("d039");
              var createElement = __webpack_require__("cc12");
              module2.exports = !DESCRIPTORS && !fails(function() {
                return Object.defineProperty(createElement("div"), "a", {
                  get: function() {
                    return 7;
                  }
                }).a != 7;
              });
            })
          ),
          /***/
          "13d5": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var $reduce = __webpack_require__("d58f").left;
              var arrayMethodIsStrict = __webpack_require__("a640");
              var arrayMethodUsesToLength = __webpack_require__("ae40");
              var STRICT_METHOD = arrayMethodIsStrict("reduce");
              var USES_TO_LENGTH = arrayMethodUsesToLength("reduce", { 1: 0 });
              $({ target: "Array", proto: true, forced: !STRICT_METHOD || !USES_TO_LENGTH }, {
                reduce: function reduce(callbackfn) {
                  return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : void 0);
                }
              });
            })
          ),
          /***/
          "14c3": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var classof = __webpack_require__("c6b6");
              var regexpExec = __webpack_require__("9263");
              module2.exports = function(R, S) {
                var exec = R.exec;
                if (typeof exec === "function") {
                  var result = exec.call(R, S);
                  if (typeof result !== "object") {
                    throw TypeError("RegExp exec method returned something other than an Object or null");
                  }
                  return result;
                }
                if (classof(R) !== "RegExp") {
                  throw TypeError("RegExp#exec called on incompatible receiver");
                }
                return regexpExec.call(R, S);
              };
            })
          ),
          /***/
          "159b": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var global = __webpack_require__("da84");
              var DOMIterables = __webpack_require__("fdbc");
              var forEach = __webpack_require__("17c2");
              var createNonEnumerableProperty = __webpack_require__("9112");
              for (var COLLECTION_NAME in DOMIterables) {
                var Collection = global[COLLECTION_NAME];
                var CollectionPrototype = Collection && Collection.prototype;
                if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
                  createNonEnumerableProperty(CollectionPrototype, "forEach", forEach);
                } catch (error) {
                  CollectionPrototype.forEach = forEach;
                }
              }
            })
          ),
          /***/
          "17c2": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var $forEach = __webpack_require__("b727").forEach;
              var arrayMethodIsStrict = __webpack_require__("a640");
              var arrayMethodUsesToLength = __webpack_require__("ae40");
              var STRICT_METHOD = arrayMethodIsStrict("forEach");
              var USES_TO_LENGTH = arrayMethodUsesToLength("forEach");
              module2.exports = !STRICT_METHOD || !USES_TO_LENGTH ? function forEach(callbackfn) {
                return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
              } : [].forEach;
            })
          ),
          /***/
          "1be4": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var getBuiltIn = __webpack_require__("d066");
              module2.exports = getBuiltIn("document", "documentElement");
            })
          ),
          /***/
          "1c0b": (
            /***/
            (function(module2, exports$12) {
              module2.exports = function(it) {
                if (typeof it != "function") {
                  throw TypeError(String(it) + " is not a function");
                }
                return it;
              };
            })
          ),
          /***/
          "1c7e": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var wellKnownSymbol = __webpack_require__("b622");
              var ITERATOR = wellKnownSymbol("iterator");
              var SAFE_CLOSING = false;
              try {
                var called = 0;
                var iteratorWithReturn = {
                  next: function() {
                    return { done: !!called++ };
                  },
                  "return": function() {
                    SAFE_CLOSING = true;
                  }
                };
                iteratorWithReturn[ITERATOR] = function() {
                  return this;
                };
                Array.from(iteratorWithReturn, function() {
                  throw 2;
                });
              } catch (error) {
              }
              module2.exports = function(exec, SKIP_CLOSING) {
                if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
                var ITERATION_SUPPORT = false;
                try {
                  var object = {};
                  object[ITERATOR] = function() {
                    return {
                      next: function() {
                        return { done: ITERATION_SUPPORT = true };
                      }
                    };
                  };
                  exec(object);
                } catch (error) {
                }
                return ITERATION_SUPPORT;
              };
            })
          ),
          /***/
          "1d80": (
            /***/
            (function(module2, exports$12) {
              module2.exports = function(it) {
                if (it == void 0) throw TypeError("Can't call method on " + it);
                return it;
              };
            })
          ),
          /***/
          "1dde": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var fails = __webpack_require__("d039");
              var wellKnownSymbol = __webpack_require__("b622");
              var V8_VERSION = __webpack_require__("2d00");
              var SPECIES = wellKnownSymbol("species");
              module2.exports = function(METHOD_NAME) {
                return V8_VERSION >= 51 || !fails(function() {
                  var array = [];
                  var constructor = array.constructor = {};
                  constructor[SPECIES] = function() {
                    return { foo: 1 };
                  };
                  return array[METHOD_NAME](Boolean).foo !== 1;
                });
              };
            })
          ),
          /***/
          "23cb": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var toInteger = __webpack_require__("a691");
              var max = Math.max;
              var min = Math.min;
              module2.exports = function(index2, length) {
                var integer = toInteger(index2);
                return integer < 0 ? max(integer + length, 0) : min(integer, length);
              };
            })
          ),
          /***/
          "23e7": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var global = __webpack_require__("da84");
              var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
              var createNonEnumerableProperty = __webpack_require__("9112");
              var redefine = __webpack_require__("6eeb");
              var setGlobal = __webpack_require__("ce4e");
              var copyConstructorProperties = __webpack_require__("e893");
              var isForced = __webpack_require__("94ca");
              module2.exports = function(options, source) {
                var TARGET = options.target;
                var GLOBAL = options.global;
                var STATIC = options.stat;
                var FORCED, target, key, targetProperty, sourceProperty, descriptor;
                if (GLOBAL) {
                  target = global;
                } else if (STATIC) {
                  target = global[TARGET] || setGlobal(TARGET, {});
                } else {
                  target = (global[TARGET] || {}).prototype;
                }
                if (target) for (key in source) {
                  sourceProperty = source[key];
                  if (options.noTargetGet) {
                    descriptor = getOwnPropertyDescriptor(target, key);
                    targetProperty = descriptor && descriptor.value;
                  } else targetProperty = target[key];
                  FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? "." : "#") + key, options.forced);
                  if (!FORCED && targetProperty !== void 0) {
                    if (typeof sourceProperty === typeof targetProperty) continue;
                    copyConstructorProperties(sourceProperty, targetProperty);
                  }
                  if (options.sham || targetProperty && targetProperty.sham) {
                    createNonEnumerableProperty(sourceProperty, "sham", true);
                  }
                  redefine(target, key, sourceProperty, options);
                }
              };
            })
          ),
          /***/
          "241c": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var internalObjectKeys = __webpack_require__("ca84");
              var enumBugKeys = __webpack_require__("7839");
              var hiddenKeys = enumBugKeys.concat("length", "prototype");
              exports$12.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
                return internalObjectKeys(O, hiddenKeys);
              };
            })
          ),
          /***/
          "25f0": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var redefine = __webpack_require__("6eeb");
              var anObject = __webpack_require__("825a");
              var fails = __webpack_require__("d039");
              var flags = __webpack_require__("ad6d");
              var TO_STRING = "toString";
              var RegExpPrototype = RegExp.prototype;
              var nativeToString = RegExpPrototype[TO_STRING];
              var NOT_GENERIC = fails(function() {
                return nativeToString.call({ source: "a", flags: "b" }) != "/a/b";
              });
              var INCORRECT_NAME = nativeToString.name != TO_STRING;
              if (NOT_GENERIC || INCORRECT_NAME) {
                redefine(RegExp.prototype, TO_STRING, function toString() {
                  var R = anObject(this);
                  var p = String(R.source);
                  var rf = R.flags;
                  var f = String(rf === void 0 && R instanceof RegExp && !("flags" in RegExpPrototype) ? flags.call(R) : rf);
                  return "/" + p + "/" + f;
                }, { unsafe: true });
              }
            })
          ),
          /***/
          "2ca0": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
              var toLength = __webpack_require__("50c4");
              var notARegExp = __webpack_require__("5a34");
              var requireObjectCoercible = __webpack_require__("1d80");
              var correctIsRegExpLogic = __webpack_require__("ab13");
              var IS_PURE = __webpack_require__("c430");
              var nativeStartsWith = "".startsWith;
              var min = Math.min;
              var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic("startsWith");
              var MDN_POLYFILL_BUG = !IS_PURE && !CORRECT_IS_REGEXP_LOGIC && !!(function() {
                var descriptor = getOwnPropertyDescriptor(String.prototype, "startsWith");
                return descriptor && !descriptor.writable;
              })();
              $({ target: "String", proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
                startsWith: function startsWith(searchString) {
                  var that = String(requireObjectCoercible(this));
                  notARegExp(searchString);
                  var index2 = toLength(min(arguments.length > 1 ? arguments[1] : void 0, that.length));
                  var search = String(searchString);
                  return nativeStartsWith ? nativeStartsWith.call(that, search, index2) : that.slice(index2, index2 + search.length) === search;
                }
              });
            })
          ),
          /***/
          "2d00": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var global = __webpack_require__("da84");
              var userAgent2 = __webpack_require__("342f");
              var process = global.process;
              var versions = process && process.versions;
              var v8 = versions && versions.v8;
              var match, version2;
              if (v8) {
                match = v8.split(".");
                version2 = match[0] + match[1];
              } else if (userAgent2) {
                match = userAgent2.match(/Edge\/(\d+)/);
                if (!match || match[1] >= 74) {
                  match = userAgent2.match(/Chrome\/(\d+)/);
                  if (match) version2 = match[1];
                }
              }
              module2.exports = version2 && +version2;
            })
          ),
          /***/
          "342f": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var getBuiltIn = __webpack_require__("d066");
              module2.exports = getBuiltIn("navigator", "userAgent") || "";
            })
          ),
          /***/
          "35a1": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var classof = __webpack_require__("f5df");
              var Iterators = __webpack_require__("3f8c");
              var wellKnownSymbol = __webpack_require__("b622");
              var ITERATOR = wellKnownSymbol("iterator");
              module2.exports = function(it) {
                if (it != void 0) return it[ITERATOR] || it["@@iterator"] || Iterators[classof(it)];
              };
            })
          ),
          /***/
          "37e8": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var DESCRIPTORS = __webpack_require__("83ab");
              var definePropertyModule = __webpack_require__("9bf2");
              var anObject = __webpack_require__("825a");
              var objectKeys = __webpack_require__("df75");
              module2.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
                anObject(O);
                var keys = objectKeys(Properties);
                var length = keys.length;
                var index2 = 0;
                var key;
                while (length > index2) definePropertyModule.f(O, key = keys[index2++], Properties[key]);
                return O;
              };
            })
          ),
          /***/
          "3bbe": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var isObject2 = __webpack_require__("861d");
              module2.exports = function(it) {
                if (!isObject2(it) && it !== null) {
                  throw TypeError("Can't set " + String(it) + " as a prototype");
                }
                return it;
              };
            })
          ),
          /***/
          "3ca3": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var charAt = __webpack_require__("6547").charAt;
              var InternalStateModule = __webpack_require__("69f3");
              var defineIterator = __webpack_require__("7dd0");
              var STRING_ITERATOR = "String Iterator";
              var setInternalState = InternalStateModule.set;
              var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);
              defineIterator(String, "String", function(iterated) {
                setInternalState(this, {
                  type: STRING_ITERATOR,
                  string: String(iterated),
                  index: 0
                });
              }, function next() {
                var state = getInternalState(this);
                var string = state.string;
                var index2 = state.index;
                var point;
                if (index2 >= string.length) return { value: void 0, done: true };
                point = charAt(string, index2);
                state.index += point.length;
                return { value: point, done: false };
              });
            })
          ),
          /***/
          "3f8c": (
            /***/
            (function(module2, exports$12) {
              module2.exports = {};
            })
          ),
          /***/
          "4160": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var forEach = __webpack_require__("17c2");
              $({ target: "Array", proto: true, forced: [].forEach != forEach }, {
                forEach
              });
            })
          ),
          /***/
          "428f": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var global = __webpack_require__("da84");
              module2.exports = global;
            })
          ),
          /***/
          "44ad": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var fails = __webpack_require__("d039");
              var classof = __webpack_require__("c6b6");
              var split = "".split;
              module2.exports = fails(function() {
                return !Object("z").propertyIsEnumerable(0);
              }) ? function(it) {
                return classof(it) == "String" ? split.call(it, "") : Object(it);
              } : Object;
            })
          ),
          /***/
          "44d2": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var wellKnownSymbol = __webpack_require__("b622");
              var create = __webpack_require__("7c73");
              var definePropertyModule = __webpack_require__("9bf2");
              var UNSCOPABLES = wellKnownSymbol("unscopables");
              var ArrayPrototype = Array.prototype;
              if (ArrayPrototype[UNSCOPABLES] == void 0) {
                definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
                  configurable: true,
                  value: create(null)
                });
              }
              module2.exports = function(key) {
                ArrayPrototype[UNSCOPABLES][key] = true;
              };
            })
          ),
          /***/
          "44e7": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var isObject2 = __webpack_require__("861d");
              var classof = __webpack_require__("c6b6");
              var wellKnownSymbol = __webpack_require__("b622");
              var MATCH = wellKnownSymbol("match");
              module2.exports = function(it) {
                var isRegExp;
                return isObject2(it) && ((isRegExp = it[MATCH]) !== void 0 ? !!isRegExp : classof(it) == "RegExp");
              };
            })
          ),
          /***/
          "4930": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var fails = __webpack_require__("d039");
              module2.exports = !!Object.getOwnPropertySymbols && !fails(function() {
                return !String(/* @__PURE__ */ Symbol());
              });
            })
          ),
          /***/
          "4d64": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var toIndexedObject = __webpack_require__("fc6a");
              var toLength = __webpack_require__("50c4");
              var toAbsoluteIndex = __webpack_require__("23cb");
              var createMethod = function(IS_INCLUDES) {
                return function($this, el, fromIndex) {
                  var O = toIndexedObject($this);
                  var length = toLength(O.length);
                  var index2 = toAbsoluteIndex(fromIndex, length);
                  var value;
                  if (IS_INCLUDES && el != el) while (length > index2) {
                    value = O[index2++];
                    if (value != value) return true;
                  }
                  else for (; length > index2; index2++) {
                    if ((IS_INCLUDES || index2 in O) && O[index2] === el) return IS_INCLUDES || index2 || 0;
                  }
                  return !IS_INCLUDES && -1;
                };
              };
              module2.exports = {
                // `Array.prototype.includes` method
                // https://tc39.github.io/ecma262/#sec-array.prototype.includes
                includes: createMethod(true),
                // `Array.prototype.indexOf` method
                // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
                indexOf: createMethod(false)
              };
            })
          ),
          /***/
          "4de4": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var $filter = __webpack_require__("b727").filter;
              var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
              var arrayMethodUsesToLength = __webpack_require__("ae40");
              var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("filter");
              var USES_TO_LENGTH = arrayMethodUsesToLength("filter");
              $({ target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
                filter: function filter(callbackfn) {
                  return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
                }
              });
            })
          ),
          /***/
          "4df4": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var bind = __webpack_require__("0366");
              var toObject = __webpack_require__("7b0b");
              var callWithSafeIterationClosing = __webpack_require__("9bdd");
              var isArrayIteratorMethod = __webpack_require__("e95a");
              var toLength = __webpack_require__("50c4");
              var createProperty = __webpack_require__("8418");
              var getIteratorMethod = __webpack_require__("35a1");
              module2.exports = function from(arrayLike) {
                var O = toObject(arrayLike);
                var C = typeof this == "function" ? this : Array;
                var argumentsLength = arguments.length;
                var mapfn = argumentsLength > 1 ? arguments[1] : void 0;
                var mapping = mapfn !== void 0;
                var iteratorMethod = getIteratorMethod(O);
                var index2 = 0;
                var length, result, step, iterator, next, value;
                if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : void 0, 2);
                if (iteratorMethod != void 0 && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
                  iterator = iteratorMethod.call(O);
                  next = iterator.next;
                  result = new C();
                  for (; !(step = next.call(iterator)).done; index2++) {
                    value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index2], true) : step.value;
                    createProperty(result, index2, value);
                  }
                } else {
                  length = toLength(O.length);
                  result = new C(length);
                  for (; length > index2; index2++) {
                    value = mapping ? mapfn(O[index2], index2) : O[index2];
                    createProperty(result, index2, value);
                  }
                }
                result.length = index2;
                return result;
              };
            })
          ),
          /***/
          "4fad": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var $entries = __webpack_require__("6f53").entries;
              $({ target: "Object", stat: true }, {
                entries: function entries(O) {
                  return $entries(O);
                }
              });
            })
          ),
          /***/
          "50c4": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var toInteger = __webpack_require__("a691");
              var min = Math.min;
              module2.exports = function(argument) {
                return argument > 0 ? min(toInteger(argument), 9007199254740991) : 0;
              };
            })
          ),
          /***/
          "5135": (
            /***/
            (function(module2, exports$12) {
              var hasOwnProperty = {}.hasOwnProperty;
              module2.exports = function(it, key) {
                return hasOwnProperty.call(it, key);
              };
            })
          ),
          /***/
          "5319": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var fixRegExpWellKnownSymbolLogic = __webpack_require__("d784");
              var anObject = __webpack_require__("825a");
              var toObject = __webpack_require__("7b0b");
              var toLength = __webpack_require__("50c4");
              var toInteger = __webpack_require__("a691");
              var requireObjectCoercible = __webpack_require__("1d80");
              var advanceStringIndex = __webpack_require__("8aa5");
              var regExpExec = __webpack_require__("14c3");
              var max = Math.max;
              var min = Math.min;
              var floor = Math.floor;
              var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
              var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;
              var maybeToString = function(it) {
                return it === void 0 ? it : String(it);
              };
              fixRegExpWellKnownSymbolLogic("replace", 2, function(REPLACE, nativeReplace, maybeCallNative, reason) {
                var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
                var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
                var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? "$" : "$0";
                return [
                  // `String.prototype.replace` method
                  // https://tc39.github.io/ecma262/#sec-string.prototype.replace
                  function replace(searchValue, replaceValue) {
                    var O = requireObjectCoercible(this);
                    var replacer = searchValue == void 0 ? void 0 : searchValue[REPLACE];
                    return replacer !== void 0 ? replacer.call(searchValue, O, replaceValue) : nativeReplace.call(String(O), searchValue, replaceValue);
                  },
                  // `RegExp.prototype[@@replace]` method
                  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
                  function(regexp, replaceValue) {
                    if (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0 || typeof replaceValue === "string" && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1) {
                      var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
                      if (res.done) return res.value;
                    }
                    var rx = anObject(regexp);
                    var S = String(this);
                    var functionalReplace = typeof replaceValue === "function";
                    if (!functionalReplace) replaceValue = String(replaceValue);
                    var global = rx.global;
                    if (global) {
                      var fullUnicode = rx.unicode;
                      rx.lastIndex = 0;
                    }
                    var results = [];
                    while (true) {
                      var result = regExpExec(rx, S);
                      if (result === null) break;
                      results.push(result);
                      if (!global) break;
                      var matchStr = String(result[0]);
                      if (matchStr === "") rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
                    }
                    var accumulatedResult = "";
                    var nextSourcePosition = 0;
                    for (var i = 0; i < results.length; i++) {
                      result = results[i];
                      var matched = String(result[0]);
                      var position = max(min(toInteger(result.index), S.length), 0);
                      var captures = [];
                      for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
                      var namedCaptures = result.groups;
                      if (functionalReplace) {
                        var replacerArgs = [matched].concat(captures, position, S);
                        if (namedCaptures !== void 0) replacerArgs.push(namedCaptures);
                        var replacement = String(replaceValue.apply(void 0, replacerArgs));
                      } else {
                        replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
                      }
                      if (position >= nextSourcePosition) {
                        accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
                        nextSourcePosition = position + matched.length;
                      }
                    }
                    return accumulatedResult + S.slice(nextSourcePosition);
                  }
                ];
                function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
                  var tailPos = position + matched.length;
                  var m = captures.length;
                  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
                  if (namedCaptures !== void 0) {
                    namedCaptures = toObject(namedCaptures);
                    symbols = SUBSTITUTION_SYMBOLS;
                  }
                  return nativeReplace.call(replacement, symbols, function(match, ch) {
                    var capture;
                    switch (ch.charAt(0)) {
                      case "$":
                        return "$";
                      case "&":
                        return matched;
                      case "`":
                        return str.slice(0, position);
                      case "'":
                        return str.slice(tailPos);
                      case "<":
                        capture = namedCaptures[ch.slice(1, -1)];
                        break;
                      default:
                        var n = +ch;
                        if (n === 0) return match;
                        if (n > m) {
                          var f = floor(n / 10);
                          if (f === 0) return match;
                          if (f <= m) return captures[f - 1] === void 0 ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
                          return match;
                        }
                        capture = captures[n - 1];
                    }
                    return capture === void 0 ? "" : capture;
                  });
                }
              });
            })
          ),
          /***/
          "5692": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var IS_PURE = __webpack_require__("c430");
              var store = __webpack_require__("c6cd");
              (module2.exports = function(key, value) {
                return store[key] || (store[key] = value !== void 0 ? value : {});
              })("versions", []).push({
                version: "3.6.5",
                mode: IS_PURE ? "pure" : "global",
                copyright: "© 2020 Denis Pushkarev (zloirock.ru)"
              });
            })
          ),
          /***/
          "56ef": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var getBuiltIn = __webpack_require__("d066");
              var getOwnPropertyNamesModule = __webpack_require__("241c");
              var getOwnPropertySymbolsModule = __webpack_require__("7418");
              var anObject = __webpack_require__("825a");
              module2.exports = getBuiltIn("Reflect", "ownKeys") || function ownKeys2(it) {
                var keys = getOwnPropertyNamesModule.f(anObject(it));
                var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
                return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
              };
            })
          ),
          /***/
          "5a34": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var isRegExp = __webpack_require__("44e7");
              module2.exports = function(it) {
                if (isRegExp(it)) {
                  throw TypeError("The method doesn't accept regular expressions");
                }
                return it;
              };
            })
          ),
          /***/
          "5c6c": (
            /***/
            (function(module2, exports$12) {
              module2.exports = function(bitmap, value) {
                return {
                  enumerable: !(bitmap & 1),
                  configurable: !(bitmap & 2),
                  writable: !(bitmap & 4),
                  value
                };
              };
            })
          ),
          /***/
          "5db7": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var flattenIntoArray = __webpack_require__("a2bf");
              var toObject = __webpack_require__("7b0b");
              var toLength = __webpack_require__("50c4");
              var aFunction = __webpack_require__("1c0b");
              var arraySpeciesCreate = __webpack_require__("65f0");
              $({ target: "Array", proto: true }, {
                flatMap: function flatMap(callbackfn) {
                  var O = toObject(this);
                  var sourceLen = toLength(O.length);
                  var A;
                  aFunction(callbackfn);
                  A = arraySpeciesCreate(O, 0);
                  A.length = flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
                  return A;
                }
              });
            })
          ),
          /***/
          "6547": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var toInteger = __webpack_require__("a691");
              var requireObjectCoercible = __webpack_require__("1d80");
              var createMethod = function(CONVERT_TO_STRING) {
                return function($this, pos) {
                  var S = String(requireObjectCoercible($this));
                  var position = toInteger(pos);
                  var size = S.length;
                  var first, second;
                  if (position < 0 || position >= size) return CONVERT_TO_STRING ? "" : void 0;
                  first = S.charCodeAt(position);
                  return first < 55296 || first > 56319 || position + 1 === size || (second = S.charCodeAt(position + 1)) < 56320 || second > 57343 ? CONVERT_TO_STRING ? S.charAt(position) : first : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 55296 << 10) + (second - 56320) + 65536;
                };
              };
              module2.exports = {
                // `String.prototype.codePointAt` method
                // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
                codeAt: createMethod(false),
                // `String.prototype.at` method
                // https://github.com/mathiasbynens/String.prototype.at
                charAt: createMethod(true)
              };
            })
          ),
          /***/
          "65f0": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var isObject2 = __webpack_require__("861d");
              var isArray2 = __webpack_require__("e8b5");
              var wellKnownSymbol = __webpack_require__("b622");
              var SPECIES = wellKnownSymbol("species");
              module2.exports = function(originalArray, length) {
                var C;
                if (isArray2(originalArray)) {
                  C = originalArray.constructor;
                  if (typeof C == "function" && (C === Array || isArray2(C.prototype))) C = void 0;
                  else if (isObject2(C)) {
                    C = C[SPECIES];
                    if (C === null) C = void 0;
                  }
                }
                return new (C === void 0 ? Array : C)(length === 0 ? 0 : length);
              };
            })
          ),
          /***/
          "69f3": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var NATIVE_WEAK_MAP = __webpack_require__("7f9a");
              var global = __webpack_require__("da84");
              var isObject2 = __webpack_require__("861d");
              var createNonEnumerableProperty = __webpack_require__("9112");
              var objectHas = __webpack_require__("5135");
              var sharedKey = __webpack_require__("f772");
              var hiddenKeys = __webpack_require__("d012");
              var WeakMap2 = global.WeakMap;
              var set, get, has;
              var enforce = function(it) {
                return has(it) ? get(it) : set(it, {});
              };
              var getterFor = function(TYPE) {
                return function(it) {
                  var state;
                  if (!isObject2(it) || (state = get(it)).type !== TYPE) {
                    throw TypeError("Incompatible receiver, " + TYPE + " required");
                  }
                  return state;
                };
              };
              if (NATIVE_WEAK_MAP) {
                var store = new WeakMap2();
                var wmget = store.get;
                var wmhas = store.has;
                var wmset = store.set;
                set = function(it, metadata) {
                  wmset.call(store, it, metadata);
                  return metadata;
                };
                get = function(it) {
                  return wmget.call(store, it) || {};
                };
                has = function(it) {
                  return wmhas.call(store, it);
                };
              } else {
                var STATE = sharedKey("state");
                hiddenKeys[STATE] = true;
                set = function(it, metadata) {
                  createNonEnumerableProperty(it, STATE, metadata);
                  return metadata;
                };
                get = function(it) {
                  return objectHas(it, STATE) ? it[STATE] : {};
                };
                has = function(it) {
                  return objectHas(it, STATE);
                };
              }
              module2.exports = {
                set,
                get,
                has,
                enforce,
                getterFor
              };
            })
          ),
          /***/
          "6eeb": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var global = __webpack_require__("da84");
              var createNonEnumerableProperty = __webpack_require__("9112");
              var has = __webpack_require__("5135");
              var setGlobal = __webpack_require__("ce4e");
              var inspectSource = __webpack_require__("8925");
              var InternalStateModule = __webpack_require__("69f3");
              var getInternalState = InternalStateModule.get;
              var enforceInternalState = InternalStateModule.enforce;
              var TEMPLATE = String(String).split("String");
              (module2.exports = function(O, key, value, options) {
                var unsafe = options ? !!options.unsafe : false;
                var simple = options ? !!options.enumerable : false;
                var noTargetGet = options ? !!options.noTargetGet : false;
                if (typeof value == "function") {
                  if (typeof key == "string" && !has(value, "name")) createNonEnumerableProperty(value, "name", key);
                  enforceInternalState(value).source = TEMPLATE.join(typeof key == "string" ? key : "");
                }
                if (O === global) {
                  if (simple) O[key] = value;
                  else setGlobal(key, value);
                  return;
                } else if (!unsafe) {
                  delete O[key];
                } else if (!noTargetGet && O[key]) {
                  simple = true;
                }
                if (simple) O[key] = value;
                else createNonEnumerableProperty(O, key, value);
              })(Function.prototype, "toString", function toString() {
                return typeof this == "function" && getInternalState(this).source || inspectSource(this);
              });
            })
          ),
          /***/
          "6f53": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var DESCRIPTORS = __webpack_require__("83ab");
              var objectKeys = __webpack_require__("df75");
              var toIndexedObject = __webpack_require__("fc6a");
              var propertyIsEnumerable = __webpack_require__("d1e7").f;
              var createMethod = function(TO_ENTRIES) {
                return function(it) {
                  var O = toIndexedObject(it);
                  var keys = objectKeys(O);
                  var length = keys.length;
                  var i = 0;
                  var result = [];
                  var key;
                  while (length > i) {
                    key = keys[i++];
                    if (!DESCRIPTORS || propertyIsEnumerable.call(O, key)) {
                      result.push(TO_ENTRIES ? [key, O[key]] : O[key]);
                    }
                  }
                  return result;
                };
              };
              module2.exports = {
                // `Object.entries` method
                // https://tc39.github.io/ecma262/#sec-object.entries
                entries: createMethod(true),
                // `Object.values` method
                // https://tc39.github.io/ecma262/#sec-object.values
                values: createMethod(false)
              };
            })
          ),
          /***/
          "73d9": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var addToUnscopables = __webpack_require__("44d2");
              addToUnscopables("flatMap");
            })
          ),
          /***/
          "7418": (
            /***/
            (function(module2, exports$12) {
              exports$12.f = Object.getOwnPropertySymbols;
            })
          ),
          /***/
          "746f": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var path = __webpack_require__("428f");
              var has = __webpack_require__("5135");
              var wrappedWellKnownSymbolModule = __webpack_require__("e538");
              var defineProperty = __webpack_require__("9bf2").f;
              module2.exports = function(NAME) {
                var Symbol2 = path.Symbol || (path.Symbol = {});
                if (!has(Symbol2, NAME)) defineProperty(Symbol2, NAME, {
                  value: wrappedWellKnownSymbolModule.f(NAME)
                });
              };
            })
          ),
          /***/
          "7839": (
            /***/
            (function(module2, exports$12) {
              module2.exports = [
                "constructor",
                "hasOwnProperty",
                "isPrototypeOf",
                "propertyIsEnumerable",
                "toLocaleString",
                "toString",
                "valueOf"
              ];
            })
          ),
          /***/
          "7b0b": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var requireObjectCoercible = __webpack_require__("1d80");
              module2.exports = function(argument) {
                return Object(requireObjectCoercible(argument));
              };
            })
          ),
          /***/
          "7c73": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var anObject = __webpack_require__("825a");
              var defineProperties = __webpack_require__("37e8");
              var enumBugKeys = __webpack_require__("7839");
              var hiddenKeys = __webpack_require__("d012");
              var html = __webpack_require__("1be4");
              var documentCreateElement = __webpack_require__("cc12");
              var sharedKey = __webpack_require__("f772");
              var GT = ">";
              var LT = "<";
              var PROTOTYPE = "prototype";
              var SCRIPT = "script";
              var IE_PROTO = sharedKey("IE_PROTO");
              var EmptyConstructor = function() {
              };
              var scriptTag = function(content) {
                return LT + SCRIPT + GT + content + LT + "/" + SCRIPT + GT;
              };
              var NullProtoObjectViaActiveX = function(activeXDocument2) {
                activeXDocument2.write(scriptTag(""));
                activeXDocument2.close();
                var temp = activeXDocument2.parentWindow.Object;
                activeXDocument2 = null;
                return temp;
              };
              var NullProtoObjectViaIFrame = function() {
                var iframe = documentCreateElement("iframe");
                var JS = "java" + SCRIPT + ":";
                var iframeDocument;
                iframe.style.display = "none";
                html.appendChild(iframe);
                iframe.src = String(JS);
                iframeDocument = iframe.contentWindow.document;
                iframeDocument.open();
                iframeDocument.write(scriptTag("document.F=Object"));
                iframeDocument.close();
                return iframeDocument.F;
              };
              var activeXDocument;
              var NullProtoObject = function() {
                try {
                  activeXDocument = document.domain && new ActiveXObject("htmlfile");
                } catch (error) {
                }
                NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
                var length = enumBugKeys.length;
                while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
                return NullProtoObject();
              };
              hiddenKeys[IE_PROTO] = true;
              module2.exports = Object.create || function create(O, Properties) {
                var result;
                if (O !== null) {
                  EmptyConstructor[PROTOTYPE] = anObject(O);
                  result = new EmptyConstructor();
                  EmptyConstructor[PROTOTYPE] = null;
                  result[IE_PROTO] = O;
                } else result = NullProtoObject();
                return Properties === void 0 ? result : defineProperties(result, Properties);
              };
            })
          ),
          /***/
          "7dd0": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var createIteratorConstructor = __webpack_require__("9ed3");
              var getPrototypeOf = __webpack_require__("e163");
              var setPrototypeOf = __webpack_require__("d2bb");
              var setToStringTag = __webpack_require__("d44e");
              var createNonEnumerableProperty = __webpack_require__("9112");
              var redefine = __webpack_require__("6eeb");
              var wellKnownSymbol = __webpack_require__("b622");
              var IS_PURE = __webpack_require__("c430");
              var Iterators = __webpack_require__("3f8c");
              var IteratorsCore = __webpack_require__("ae93");
              var IteratorPrototype = IteratorsCore.IteratorPrototype;
              var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
              var ITERATOR = wellKnownSymbol("iterator");
              var KEYS = "keys";
              var VALUES = "values";
              var ENTRIES = "entries";
              var returnThis = function() {
                return this;
              };
              module2.exports = function(Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
                createIteratorConstructor(IteratorConstructor, NAME, next);
                var getIterationMethod = function(KIND) {
                  if (KIND === DEFAULT && defaultIterator) return defaultIterator;
                  if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
                  switch (KIND) {
                    case KEYS:
                      return function keys() {
                        return new IteratorConstructor(this, KIND);
                      };
                    case VALUES:
                      return function values() {
                        return new IteratorConstructor(this, KIND);
                      };
                    case ENTRIES:
                      return function entries() {
                        return new IteratorConstructor(this, KIND);
                      };
                  }
                  return function() {
                    return new IteratorConstructor(this);
                  };
                };
                var TO_STRING_TAG = NAME + " Iterator";
                var INCORRECT_VALUES_NAME = false;
                var IterablePrototype = Iterable.prototype;
                var nativeIterator = IterablePrototype[ITERATOR] || IterablePrototype["@@iterator"] || DEFAULT && IterablePrototype[DEFAULT];
                var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
                var anyNativeIterator = NAME == "Array" ? IterablePrototype.entries || nativeIterator : nativeIterator;
                var CurrentIteratorPrototype, methods, KEY;
                if (anyNativeIterator) {
                  CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
                  if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
                    if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
                      if (setPrototypeOf) {
                        setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
                      } else if (typeof CurrentIteratorPrototype[ITERATOR] != "function") {
                        createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR, returnThis);
                      }
                    }
                    setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
                    if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
                  }
                }
                if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
                  INCORRECT_VALUES_NAME = true;
                  defaultIterator = function values() {
                    return nativeIterator.call(this);
                  };
                }
                if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
                  createNonEnumerableProperty(IterablePrototype, ITERATOR, defaultIterator);
                }
                Iterators[NAME] = defaultIterator;
                if (DEFAULT) {
                  methods = {
                    values: getIterationMethod(VALUES),
                    keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
                    entries: getIterationMethod(ENTRIES)
                  };
                  if (FORCED) for (KEY in methods) {
                    if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
                      redefine(IterablePrototype, KEY, methods[KEY]);
                    }
                  }
                  else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
                }
                return methods;
              };
            })
          ),
          /***/
          "7f9a": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var global = __webpack_require__("da84");
              var inspectSource = __webpack_require__("8925");
              var WeakMap2 = global.WeakMap;
              module2.exports = typeof WeakMap2 === "function" && /native code/.test(inspectSource(WeakMap2));
            })
          ),
          /***/
          "825a": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var isObject2 = __webpack_require__("861d");
              module2.exports = function(it) {
                if (!isObject2(it)) {
                  throw TypeError(String(it) + " is not an object");
                }
                return it;
              };
            })
          ),
          /***/
          "83ab": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var fails = __webpack_require__("d039");
              module2.exports = !fails(function() {
                return Object.defineProperty({}, 1, { get: function() {
                  return 7;
                } })[1] != 7;
              });
            })
          ),
          /***/
          "8418": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var toPrimitive = __webpack_require__("c04e");
              var definePropertyModule = __webpack_require__("9bf2");
              var createPropertyDescriptor = __webpack_require__("5c6c");
              module2.exports = function(object, key, value) {
                var propertyKey = toPrimitive(key);
                if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
                else object[propertyKey] = value;
              };
            })
          ),
          /***/
          "861d": (
            /***/
            (function(module2, exports$12) {
              module2.exports = function(it) {
                return typeof it === "object" ? it !== null : typeof it === "function";
              };
            })
          ),
          /***/
          "8875": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
              (function(root, factory) {
                {
                  !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = typeof __WEBPACK_AMD_DEFINE_FACTORY__ === "function" ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports$12, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module2.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                }
              })(typeof self !== "undefined" ? self : this, function() {
                function getCurrentScript() {
                  var descriptor = Object.getOwnPropertyDescriptor(document, "currentScript");
                  if (!descriptor && "currentScript" in document && document.currentScript) {
                    return document.currentScript;
                  }
                  if (descriptor && descriptor.get !== getCurrentScript && document.currentScript) {
                    return document.currentScript;
                  }
                  try {
                    throw new Error();
                  } catch (err) {
                    var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/ig, ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/ig, stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack), scriptLocation = stackDetails && stackDetails[1] || false, line = stackDetails && stackDetails[2] || false, currentLocation = document.location.href.replace(document.location.hash, ""), pageSource, inlineScriptSourceRegExp, inlineScriptSource, scripts = document.getElementsByTagName("script");
                    if (scriptLocation === currentLocation) {
                      pageSource = document.documentElement.outerHTML;
                      inlineScriptSourceRegExp = new RegExp("(?:[^\\n]+?\\n){0," + (line - 2) + "}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*", "i");
                      inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, "$1").trim();
                    }
                    for (var i = 0; i < scripts.length; i++) {
                      if (scripts[i].readyState === "interactive") {
                        return scripts[i];
                      }
                      if (scripts[i].src === scriptLocation) {
                        return scripts[i];
                      }
                      if (scriptLocation === currentLocation && scripts[i].innerHTML && scripts[i].innerHTML.trim() === inlineScriptSource) {
                        return scripts[i];
                      }
                    }
                    return null;
                  }
                }
                return getCurrentScript;
              });
            })
          ),
          /***/
          "8925": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var store = __webpack_require__("c6cd");
              var functionToString = Function.toString;
              if (typeof store.inspectSource != "function") {
                store.inspectSource = function(it) {
                  return functionToString.call(it);
                };
              }
              module2.exports = store.inspectSource;
            })
          ),
          /***/
          "8aa5": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var charAt = __webpack_require__("6547").charAt;
              module2.exports = function(S, index2, unicode) {
                return index2 + (unicode ? charAt(S, index2).length : 1);
              };
            })
          ),
          /***/
          "8bbf": (
            /***/
            (function(module2, exports$12) {
              module2.exports = __WEBPACK_EXTERNAL_MODULE__8bbf__;
            })
          ),
          /***/
          "90e3": (
            /***/
            (function(module2, exports$12) {
              var id = 0;
              var postfix = Math.random();
              module2.exports = function(key) {
                return "Symbol(" + String(key === void 0 ? "" : key) + ")_" + (++id + postfix).toString(36);
              };
            })
          ),
          /***/
          "9112": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var DESCRIPTORS = __webpack_require__("83ab");
              var definePropertyModule = __webpack_require__("9bf2");
              var createPropertyDescriptor = __webpack_require__("5c6c");
              module2.exports = DESCRIPTORS ? function(object, key, value) {
                return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
              } : function(object, key, value) {
                object[key] = value;
                return object;
              };
            })
          ),
          /***/
          "9263": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var regexpFlags = __webpack_require__("ad6d");
              var stickyHelpers = __webpack_require__("9f7f");
              var nativeExec = RegExp.prototype.exec;
              var nativeReplace = String.prototype.replace;
              var patchedExec = nativeExec;
              var UPDATES_LAST_INDEX_WRONG = (function() {
                var re1 = /a/;
                var re2 = /b*/g;
                nativeExec.call(re1, "a");
                nativeExec.call(re2, "a");
                return re1.lastIndex !== 0 || re2.lastIndex !== 0;
              })();
              var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET;
              var NPCG_INCLUDED = /()??/.exec("")[1] !== void 0;
              var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y;
              if (PATCH) {
                patchedExec = function exec(str) {
                  var re = this;
                  var lastIndex, reCopy, match, i;
                  var sticky = UNSUPPORTED_Y && re.sticky;
                  var flags = regexpFlags.call(re);
                  var source = re.source;
                  var charsAdded = 0;
                  var strCopy = str;
                  if (sticky) {
                    flags = flags.replace("y", "");
                    if (flags.indexOf("g") === -1) {
                      flags += "g";
                    }
                    strCopy = String(str).slice(re.lastIndex);
                    if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== "\n")) {
                      source = "(?: " + source + ")";
                      strCopy = " " + strCopy;
                      charsAdded++;
                    }
                    reCopy = new RegExp("^(?:" + source + ")", flags);
                  }
                  if (NPCG_INCLUDED) {
                    reCopy = new RegExp("^" + source + "$(?!\\s)", flags);
                  }
                  if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;
                  match = nativeExec.call(sticky ? reCopy : re, strCopy);
                  if (sticky) {
                    if (match) {
                      match.input = match.input.slice(charsAdded);
                      match[0] = match[0].slice(charsAdded);
                      match.index = re.lastIndex;
                      re.lastIndex += match[0].length;
                    } else re.lastIndex = 0;
                  } else if (UPDATES_LAST_INDEX_WRONG && match) {
                    re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
                  }
                  if (NPCG_INCLUDED && match && match.length > 1) {
                    nativeReplace.call(match[0], reCopy, function() {
                      for (i = 1; i < arguments.length - 2; i++) {
                        if (arguments[i] === void 0) match[i] = void 0;
                      }
                    });
                  }
                  return match;
                };
              }
              module2.exports = patchedExec;
            })
          ),
          /***/
          "94ca": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var fails = __webpack_require__("d039");
              var replacement = /#|\.prototype\./;
              var isForced = function(feature, detection) {
                var value = data[normalize(feature)];
                return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == "function" ? fails(detection) : !!detection;
              };
              var normalize = isForced.normalize = function(string) {
                return String(string).replace(replacement, ".").toLowerCase();
              };
              var data = isForced.data = {};
              var NATIVE = isForced.NATIVE = "N";
              var POLYFILL = isForced.POLYFILL = "P";
              module2.exports = isForced;
            })
          ),
          /***/
          "99af": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var fails = __webpack_require__("d039");
              var isArray2 = __webpack_require__("e8b5");
              var isObject2 = __webpack_require__("861d");
              var toObject = __webpack_require__("7b0b");
              var toLength = __webpack_require__("50c4");
              var createProperty = __webpack_require__("8418");
              var arraySpeciesCreate = __webpack_require__("65f0");
              var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
              var wellKnownSymbol = __webpack_require__("b622");
              var V8_VERSION = __webpack_require__("2d00");
              var IS_CONCAT_SPREADABLE = wellKnownSymbol("isConcatSpreadable");
              var MAX_SAFE_INTEGER = 9007199254740991;
              var MAXIMUM_ALLOWED_INDEX_EXCEEDED = "Maximum allowed index exceeded";
              var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function() {
                var array = [];
                array[IS_CONCAT_SPREADABLE] = false;
                return array.concat()[0] !== array;
              });
              var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("concat");
              var isConcatSpreadable = function(O) {
                if (!isObject2(O)) return false;
                var spreadable = O[IS_CONCAT_SPREADABLE];
                return spreadable !== void 0 ? !!spreadable : isArray2(O);
              };
              var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;
              $({ target: "Array", proto: true, forced: FORCED }, {
                concat: function concat(arg) {
                  var O = toObject(this);
                  var A = arraySpeciesCreate(O, 0);
                  var n = 0;
                  var i, k, length, len, E;
                  for (i = -1, length = arguments.length; i < length; i++) {
                    E = i === -1 ? O : arguments[i];
                    if (isConcatSpreadable(E)) {
                      len = toLength(E.length);
                      if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
                      for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
                    } else {
                      if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
                      createProperty(A, n++, E);
                    }
                  }
                  A.length = n;
                  return A;
                }
              });
            })
          ),
          /***/
          "9bdd": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var anObject = __webpack_require__("825a");
              module2.exports = function(iterator, fn, value, ENTRIES) {
                try {
                  return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
                } catch (error) {
                  var returnMethod = iterator["return"];
                  if (returnMethod !== void 0) anObject(returnMethod.call(iterator));
                  throw error;
                }
              };
            })
          ),
          /***/
          "9bf2": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var DESCRIPTORS = __webpack_require__("83ab");
              var IE8_DOM_DEFINE = __webpack_require__("0cfb");
              var anObject = __webpack_require__("825a");
              var toPrimitive = __webpack_require__("c04e");
              var nativeDefineProperty = Object.defineProperty;
              exports$12.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
                anObject(O);
                P = toPrimitive(P, true);
                anObject(Attributes);
                if (IE8_DOM_DEFINE) try {
                  return nativeDefineProperty(O, P, Attributes);
                } catch (error) {
                }
                if ("get" in Attributes || "set" in Attributes) throw TypeError("Accessors not supported");
                if ("value" in Attributes) O[P] = Attributes.value;
                return O;
              };
            })
          ),
          /***/
          "9ed3": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var IteratorPrototype = __webpack_require__("ae93").IteratorPrototype;
              var create = __webpack_require__("7c73");
              var createPropertyDescriptor = __webpack_require__("5c6c");
              var setToStringTag = __webpack_require__("d44e");
              var Iterators = __webpack_require__("3f8c");
              var returnThis = function() {
                return this;
              };
              module2.exports = function(IteratorConstructor, NAME, next) {
                var TO_STRING_TAG = NAME + " Iterator";
                IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
                setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
                Iterators[TO_STRING_TAG] = returnThis;
                return IteratorConstructor;
              };
            })
          ),
          /***/
          "9f7f": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var fails = __webpack_require__("d039");
              function RE(s, f) {
                return RegExp(s, f);
              }
              exports$12.UNSUPPORTED_Y = fails(function() {
                var re = RE("a", "y");
                re.lastIndex = 2;
                return re.exec("abcd") != null;
              });
              exports$12.BROKEN_CARET = fails(function() {
                var re = RE("^r", "gy");
                re.lastIndex = 2;
                return re.exec("str") != null;
              });
            })
          ),
          /***/
          "a2bf": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var isArray2 = __webpack_require__("e8b5");
              var toLength = __webpack_require__("50c4");
              var bind = __webpack_require__("0366");
              var flattenIntoArray = function(target, original, source, sourceLen, start, depth, mapper, thisArg) {
                var targetIndex = start;
                var sourceIndex = 0;
                var mapFn = mapper ? bind(mapper, thisArg, 3) : false;
                var element;
                while (sourceIndex < sourceLen) {
                  if (sourceIndex in source) {
                    element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];
                    if (depth > 0 && isArray2(element)) {
                      targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
                    } else {
                      if (targetIndex >= 9007199254740991) throw TypeError("Exceed the acceptable array length");
                      target[targetIndex] = element;
                    }
                    targetIndex++;
                  }
                  sourceIndex++;
                }
                return targetIndex;
              };
              module2.exports = flattenIntoArray;
            })
          ),
          /***/
          "a352": (
            /***/
            (function(module2, exports$12) {
              module2.exports = __WEBPACK_EXTERNAL_MODULE_a352__;
            })
          ),
          /***/
          "a434": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var toAbsoluteIndex = __webpack_require__("23cb");
              var toInteger = __webpack_require__("a691");
              var toLength = __webpack_require__("50c4");
              var toObject = __webpack_require__("7b0b");
              var arraySpeciesCreate = __webpack_require__("65f0");
              var createProperty = __webpack_require__("8418");
              var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
              var arrayMethodUsesToLength = __webpack_require__("ae40");
              var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("splice");
              var USES_TO_LENGTH = arrayMethodUsesToLength("splice", { ACCESSORS: true, 0: 0, 1: 2 });
              var max = Math.max;
              var min = Math.min;
              var MAX_SAFE_INTEGER = 9007199254740991;
              var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = "Maximum allowed length exceeded";
              $({ target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
                splice: function splice(start, deleteCount) {
                  var O = toObject(this);
                  var len = toLength(O.length);
                  var actualStart = toAbsoluteIndex(start, len);
                  var argumentsLength = arguments.length;
                  var insertCount, actualDeleteCount, A, k, from, to;
                  if (argumentsLength === 0) {
                    insertCount = actualDeleteCount = 0;
                  } else if (argumentsLength === 1) {
                    insertCount = 0;
                    actualDeleteCount = len - actualStart;
                  } else {
                    insertCount = argumentsLength - 2;
                    actualDeleteCount = min(max(toInteger(deleteCount), 0), len - actualStart);
                  }
                  if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
                    throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
                  }
                  A = arraySpeciesCreate(O, actualDeleteCount);
                  for (k = 0; k < actualDeleteCount; k++) {
                    from = actualStart + k;
                    if (from in O) createProperty(A, k, O[from]);
                  }
                  A.length = actualDeleteCount;
                  if (insertCount < actualDeleteCount) {
                    for (k = actualStart; k < len - actualDeleteCount; k++) {
                      from = k + actualDeleteCount;
                      to = k + insertCount;
                      if (from in O) O[to] = O[from];
                      else delete O[to];
                    }
                    for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
                  } else if (insertCount > actualDeleteCount) {
                    for (k = len - actualDeleteCount; k > actualStart; k--) {
                      from = k + actualDeleteCount - 1;
                      to = k + insertCount - 1;
                      if (from in O) O[to] = O[from];
                      else delete O[to];
                    }
                  }
                  for (k = 0; k < insertCount; k++) {
                    O[k + actualStart] = arguments[k + 2];
                  }
                  O.length = len - actualDeleteCount + insertCount;
                  return A;
                }
              });
            })
          ),
          /***/
          "a4d3": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var global = __webpack_require__("da84");
              var getBuiltIn = __webpack_require__("d066");
              var IS_PURE = __webpack_require__("c430");
              var DESCRIPTORS = __webpack_require__("83ab");
              var NATIVE_SYMBOL = __webpack_require__("4930");
              var USE_SYMBOL_AS_UID = __webpack_require__("fdbf");
              var fails = __webpack_require__("d039");
              var has = __webpack_require__("5135");
              var isArray2 = __webpack_require__("e8b5");
              var isObject2 = __webpack_require__("861d");
              var anObject = __webpack_require__("825a");
              var toObject = __webpack_require__("7b0b");
              var toIndexedObject = __webpack_require__("fc6a");
              var toPrimitive = __webpack_require__("c04e");
              var createPropertyDescriptor = __webpack_require__("5c6c");
              var nativeObjectCreate = __webpack_require__("7c73");
              var objectKeys = __webpack_require__("df75");
              var getOwnPropertyNamesModule = __webpack_require__("241c");
              var getOwnPropertyNamesExternal = __webpack_require__("057f");
              var getOwnPropertySymbolsModule = __webpack_require__("7418");
              var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
              var definePropertyModule = __webpack_require__("9bf2");
              var propertyIsEnumerableModule = __webpack_require__("d1e7");
              var createNonEnumerableProperty = __webpack_require__("9112");
              var redefine = __webpack_require__("6eeb");
              var shared = __webpack_require__("5692");
              var sharedKey = __webpack_require__("f772");
              var hiddenKeys = __webpack_require__("d012");
              var uid = __webpack_require__("90e3");
              var wellKnownSymbol = __webpack_require__("b622");
              var wrappedWellKnownSymbolModule = __webpack_require__("e538");
              var defineWellKnownSymbol = __webpack_require__("746f");
              var setToStringTag = __webpack_require__("d44e");
              var InternalStateModule = __webpack_require__("69f3");
              var $forEach = __webpack_require__("b727").forEach;
              var HIDDEN = sharedKey("hidden");
              var SYMBOL = "Symbol";
              var PROTOTYPE = "prototype";
              var TO_PRIMITIVE = wellKnownSymbol("toPrimitive");
              var setInternalState = InternalStateModule.set;
              var getInternalState = InternalStateModule.getterFor(SYMBOL);
              var ObjectPrototype = Object[PROTOTYPE];
              var $Symbol = global.Symbol;
              var $stringify = getBuiltIn("JSON", "stringify");
              var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
              var nativeDefineProperty = definePropertyModule.f;
              var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
              var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
              var AllSymbols = shared("symbols");
              var ObjectPrototypeSymbols = shared("op-symbols");
              var StringToSymbolRegistry = shared("string-to-symbol-registry");
              var SymbolToStringRegistry = shared("symbol-to-string-registry");
              var WellKnownSymbolsStore = shared("wks");
              var QObject = global.QObject;
              var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
              var setSymbolDescriptor = DESCRIPTORS && fails(function() {
                return nativeObjectCreate(nativeDefineProperty({}, "a", {
                  get: function() {
                    return nativeDefineProperty(this, "a", { value: 7 }).a;
                  }
                })).a != 7;
              }) ? function(O, P, Attributes) {
                var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
                if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
                nativeDefineProperty(O, P, Attributes);
                if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
                  nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
                }
              } : nativeDefineProperty;
              var wrap = function(tag, description) {
                var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
                setInternalState(symbol, {
                  type: SYMBOL,
                  tag,
                  description
                });
                if (!DESCRIPTORS) symbol.description = description;
                return symbol;
              };
              var isSymbol2 = USE_SYMBOL_AS_UID ? function(it) {
                return typeof it == "symbol";
              } : function(it) {
                return Object(it) instanceof $Symbol;
              };
              var $defineProperty = function defineProperty(O, P, Attributes) {
                if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
                anObject(O);
                var key = toPrimitive(P, true);
                anObject(Attributes);
                if (has(AllSymbols, key)) {
                  if (!Attributes.enumerable) {
                    if (!has(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
                    O[HIDDEN][key] = true;
                  } else {
                    if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
                    Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
                  }
                  return setSymbolDescriptor(O, key, Attributes);
                }
                return nativeDefineProperty(O, key, Attributes);
              };
              var $defineProperties = function defineProperties(O, Properties) {
                anObject(O);
                var properties = toIndexedObject(Properties);
                var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
                $forEach(keys, function(key) {
                  if (!DESCRIPTORS || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
                });
                return O;
              };
              var $create = function create(O, Properties) {
                return Properties === void 0 ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
              };
              var $propertyIsEnumerable = function propertyIsEnumerable(V) {
                var P = toPrimitive(V, true);
                var enumerable = nativePropertyIsEnumerable.call(this, P);
                if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
                return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
              };
              var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
                var it = toIndexedObject(O);
                var key = toPrimitive(P, true);
                if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
                var descriptor = nativeGetOwnPropertyDescriptor(it, key);
                if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
                  descriptor.enumerable = true;
                }
                return descriptor;
              };
              var $getOwnPropertyNames = function getOwnPropertyNames(O) {
                var names = nativeGetOwnPropertyNames(toIndexedObject(O));
                var result = [];
                $forEach(names, function(key) {
                  if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
                });
                return result;
              };
              var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
                var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
                var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
                var result = [];
                $forEach(names, function(key) {
                  if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
                    result.push(AllSymbols[key]);
                  }
                });
                return result;
              };
              if (!NATIVE_SYMBOL) {
                $Symbol = function Symbol2() {
                  if (this instanceof $Symbol) throw TypeError("Symbol is not a constructor");
                  var description = !arguments.length || arguments[0] === void 0 ? void 0 : String(arguments[0]);
                  var tag = uid(description);
                  var setter = function(value) {
                    if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
                    if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
                    setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
                  };
                  if (DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
                  return wrap(tag, description);
                };
                redefine($Symbol[PROTOTYPE], "toString", function toString() {
                  return getInternalState(this).tag;
                });
                redefine($Symbol, "withoutSetter", function(description) {
                  return wrap(uid(description), description);
                });
                propertyIsEnumerableModule.f = $propertyIsEnumerable;
                definePropertyModule.f = $defineProperty;
                getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
                getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
                getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;
                wrappedWellKnownSymbolModule.f = function(name) {
                  return wrap(wellKnownSymbol(name), name);
                };
                if (DESCRIPTORS) {
                  nativeDefineProperty($Symbol[PROTOTYPE], "description", {
                    configurable: true,
                    get: function description() {
                      return getInternalState(this).description;
                    }
                  });
                  if (!IS_PURE) {
                    redefine(ObjectPrototype, "propertyIsEnumerable", $propertyIsEnumerable, { unsafe: true });
                  }
                }
              }
              $({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
                Symbol: $Symbol
              });
              $forEach(objectKeys(WellKnownSymbolsStore), function(name) {
                defineWellKnownSymbol(name);
              });
              $({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
                // `Symbol.for` method
                // https://tc39.github.io/ecma262/#sec-symbol.for
                "for": function(key) {
                  var string = String(key);
                  if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
                  var symbol = $Symbol(string);
                  StringToSymbolRegistry[string] = symbol;
                  SymbolToStringRegistry[symbol] = string;
                  return symbol;
                },
                // `Symbol.keyFor` method
                // https://tc39.github.io/ecma262/#sec-symbol.keyfor
                keyFor: function keyFor(sym) {
                  if (!isSymbol2(sym)) throw TypeError(sym + " is not a symbol");
                  if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
                },
                useSetter: function() {
                  USE_SETTER = true;
                },
                useSimple: function() {
                  USE_SETTER = false;
                }
              });
              $({ target: "Object", stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS }, {
                // `Object.create` method
                // https://tc39.github.io/ecma262/#sec-object.create
                create: $create,
                // `Object.defineProperty` method
                // https://tc39.github.io/ecma262/#sec-object.defineproperty
                defineProperty: $defineProperty,
                // `Object.defineProperties` method
                // https://tc39.github.io/ecma262/#sec-object.defineproperties
                defineProperties: $defineProperties,
                // `Object.getOwnPropertyDescriptor` method
                // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
                getOwnPropertyDescriptor: $getOwnPropertyDescriptor
              });
              $({ target: "Object", stat: true, forced: !NATIVE_SYMBOL }, {
                // `Object.getOwnPropertyNames` method
                // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
                getOwnPropertyNames: $getOwnPropertyNames,
                // `Object.getOwnPropertySymbols` method
                // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
                getOwnPropertySymbols: $getOwnPropertySymbols
              });
              $({ target: "Object", stat: true, forced: fails(function() {
                getOwnPropertySymbolsModule.f(1);
              }) }, {
                getOwnPropertySymbols: function getOwnPropertySymbols(it) {
                  return getOwnPropertySymbolsModule.f(toObject(it));
                }
              });
              if ($stringify) {
                var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails(function() {
                  var symbol = $Symbol();
                  return $stringify([symbol]) != "[null]" || $stringify({ a: symbol }) != "{}" || $stringify(Object(symbol)) != "{}";
                });
                $({ target: "JSON", stat: true, forced: FORCED_JSON_STRINGIFY }, {
                  // eslint-disable-next-line no-unused-vars
                  stringify: function stringify(it, replacer, space) {
                    var args = [it];
                    var index2 = 1;
                    var $replacer;
                    while (arguments.length > index2) args.push(arguments[index2++]);
                    $replacer = replacer;
                    if (!isObject2(replacer) && it === void 0 || isSymbol2(it)) return;
                    if (!isArray2(replacer)) replacer = function(key, value) {
                      if (typeof $replacer == "function") value = $replacer.call(this, key, value);
                      if (!isSymbol2(value)) return value;
                    };
                    args[1] = replacer;
                    return $stringify.apply(null, args);
                  }
                });
              }
              if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
                createNonEnumerableProperty($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
              }
              setToStringTag($Symbol, SYMBOL);
              hiddenKeys[HIDDEN] = true;
            })
          ),
          /***/
          "a630": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var from = __webpack_require__("4df4");
              var checkCorrectnessOfIteration = __webpack_require__("1c7e");
              var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function(iterable) {
                Array.from(iterable);
              });
              $({ target: "Array", stat: true, forced: INCORRECT_ITERATION }, {
                from
              });
            })
          ),
          /***/
          "a640": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var fails = __webpack_require__("d039");
              module2.exports = function(METHOD_NAME, argument) {
                var method = [][METHOD_NAME];
                return !!method && fails(function() {
                  method.call(null, argument || function() {
                    throw 1;
                  }, 1);
                });
              };
            })
          ),
          /***/
          "a691": (
            /***/
            (function(module2, exports$12) {
              var ceil = Math.ceil;
              var floor = Math.floor;
              module2.exports = function(argument) {
                return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
              };
            })
          ),
          /***/
          "ab13": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var wellKnownSymbol = __webpack_require__("b622");
              var MATCH = wellKnownSymbol("match");
              module2.exports = function(METHOD_NAME) {
                var regexp = /./;
                try {
                  "/./"[METHOD_NAME](regexp);
                } catch (e) {
                  try {
                    regexp[MATCH] = false;
                    return "/./"[METHOD_NAME](regexp);
                  } catch (f) {
                  }
                }
                return false;
              };
            })
          ),
          /***/
          "ac1f": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var exec = __webpack_require__("9263");
              $({ target: "RegExp", proto: true, forced: /./.exec !== exec }, {
                exec
              });
            })
          ),
          /***/
          "ad6d": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var anObject = __webpack_require__("825a");
              module2.exports = function() {
                var that = anObject(this);
                var result = "";
                if (that.global) result += "g";
                if (that.ignoreCase) result += "i";
                if (that.multiline) result += "m";
                if (that.dotAll) result += "s";
                if (that.unicode) result += "u";
                if (that.sticky) result += "y";
                return result;
              };
            })
          ),
          /***/
          "ae40": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var DESCRIPTORS = __webpack_require__("83ab");
              var fails = __webpack_require__("d039");
              var has = __webpack_require__("5135");
              var defineProperty = Object.defineProperty;
              var cache = {};
              var thrower = function(it) {
                throw it;
              };
              module2.exports = function(METHOD_NAME, options) {
                if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
                if (!options) options = {};
                var method = [][METHOD_NAME];
                var ACCESSORS = has(options, "ACCESSORS") ? options.ACCESSORS : false;
                var argument0 = has(options, 0) ? options[0] : thrower;
                var argument1 = has(options, 1) ? options[1] : void 0;
                return cache[METHOD_NAME] = !!method && !fails(function() {
                  if (ACCESSORS && !DESCRIPTORS) return true;
                  var O = { length: -1 };
                  if (ACCESSORS) defineProperty(O, 1, { enumerable: true, get: thrower });
                  else O[1] = 1;
                  method.call(O, argument0, argument1);
                });
              };
            })
          ),
          /***/
          "ae93": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var getPrototypeOf = __webpack_require__("e163");
              var createNonEnumerableProperty = __webpack_require__("9112");
              var has = __webpack_require__("5135");
              var wellKnownSymbol = __webpack_require__("b622");
              var IS_PURE = __webpack_require__("c430");
              var ITERATOR = wellKnownSymbol("iterator");
              var BUGGY_SAFARI_ITERATORS = false;
              var returnThis = function() {
                return this;
              };
              var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;
              if ([].keys) {
                arrayIterator = [].keys();
                if (!("next" in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
                else {
                  PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
                  if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
                }
              }
              if (IteratorPrototype == void 0) IteratorPrototype = {};
              if (!IS_PURE && !has(IteratorPrototype, ITERATOR)) {
                createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
              }
              module2.exports = {
                IteratorPrototype,
                BUGGY_SAFARI_ITERATORS
              };
            })
          ),
          /***/
          "b041": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
              var classof = __webpack_require__("f5df");
              module2.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
                return "[object " + classof(this) + "]";
              };
            })
          ),
          /***/
          "b0c0": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var DESCRIPTORS = __webpack_require__("83ab");
              var defineProperty = __webpack_require__("9bf2").f;
              var FunctionPrototype = Function.prototype;
              var FunctionPrototypeToString = FunctionPrototype.toString;
              var nameRE = /^\s*function ([^ (]*)/;
              var NAME = "name";
              if (DESCRIPTORS && !(NAME in FunctionPrototype)) {
                defineProperty(FunctionPrototype, NAME, {
                  configurable: true,
                  get: function() {
                    try {
                      return FunctionPrototypeToString.call(this).match(nameRE)[1];
                    } catch (error) {
                      return "";
                    }
                  }
                });
              }
            })
          ),
          /***/
          "b622": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var global = __webpack_require__("da84");
              var shared = __webpack_require__("5692");
              var has = __webpack_require__("5135");
              var uid = __webpack_require__("90e3");
              var NATIVE_SYMBOL = __webpack_require__("4930");
              var USE_SYMBOL_AS_UID = __webpack_require__("fdbf");
              var WellKnownSymbolsStore = shared("wks");
              var Symbol2 = global.Symbol;
              var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol2 : Symbol2 && Symbol2.withoutSetter || uid;
              module2.exports = function(name) {
                if (!has(WellKnownSymbolsStore, name)) {
                  if (NATIVE_SYMBOL && has(Symbol2, name)) WellKnownSymbolsStore[name] = Symbol2[name];
                  else WellKnownSymbolsStore[name] = createWellKnownSymbol("Symbol." + name);
                }
                return WellKnownSymbolsStore[name];
              };
            })
          ),
          /***/
          "b64b": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var toObject = __webpack_require__("7b0b");
              var nativeKeys = __webpack_require__("df75");
              var fails = __webpack_require__("d039");
              var FAILS_ON_PRIMITIVES = fails(function() {
                nativeKeys(1);
              });
              $({ target: "Object", stat: true, forced: FAILS_ON_PRIMITIVES }, {
                keys: function keys(it) {
                  return nativeKeys(toObject(it));
                }
              });
            })
          ),
          /***/
          "b727": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var bind = __webpack_require__("0366");
              var IndexedObject = __webpack_require__("44ad");
              var toObject = __webpack_require__("7b0b");
              var toLength = __webpack_require__("50c4");
              var arraySpeciesCreate = __webpack_require__("65f0");
              var push = [].push;
              var createMethod = function(TYPE) {
                var IS_MAP = TYPE == 1;
                var IS_FILTER = TYPE == 2;
                var IS_SOME = TYPE == 3;
                var IS_EVERY = TYPE == 4;
                var IS_FIND_INDEX = TYPE == 6;
                var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
                return function($this, callbackfn, that, specificCreate) {
                  var O = toObject($this);
                  var self2 = IndexedObject(O);
                  var boundFunction = bind(callbackfn, that, 3);
                  var length = toLength(self2.length);
                  var index2 = 0;
                  var create = specificCreate || arraySpeciesCreate;
                  var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : void 0;
                  var value, result;
                  for (; length > index2; index2++) if (NO_HOLES || index2 in self2) {
                    value = self2[index2];
                    result = boundFunction(value, index2, O);
                    if (TYPE) {
                      if (IS_MAP) target[index2] = result;
                      else if (result) switch (TYPE) {
                        case 3:
                          return true;
                        // some
                        case 5:
                          return value;
                        // find
                        case 6:
                          return index2;
                        // findIndex
                        case 2:
                          push.call(target, value);
                      }
                      else if (IS_EVERY) return false;
                    }
                  }
                  return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
                };
              };
              module2.exports = {
                // `Array.prototype.forEach` method
                // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
                forEach: createMethod(0),
                // `Array.prototype.map` method
                // https://tc39.github.io/ecma262/#sec-array.prototype.map
                map: createMethod(1),
                // `Array.prototype.filter` method
                // https://tc39.github.io/ecma262/#sec-array.prototype.filter
                filter: createMethod(2),
                // `Array.prototype.some` method
                // https://tc39.github.io/ecma262/#sec-array.prototype.some
                some: createMethod(3),
                // `Array.prototype.every` method
                // https://tc39.github.io/ecma262/#sec-array.prototype.every
                every: createMethod(4),
                // `Array.prototype.find` method
                // https://tc39.github.io/ecma262/#sec-array.prototype.find
                find: createMethod(5),
                // `Array.prototype.findIndex` method
                // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
                findIndex: createMethod(6)
              };
            })
          ),
          /***/
          "c04e": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var isObject2 = __webpack_require__("861d");
              module2.exports = function(input, PREFERRED_STRING) {
                if (!isObject2(input)) return input;
                var fn, val;
                if (PREFERRED_STRING && typeof (fn = input.toString) == "function" && !isObject2(val = fn.call(input))) return val;
                if (typeof (fn = input.valueOf) == "function" && !isObject2(val = fn.call(input))) return val;
                if (!PREFERRED_STRING && typeof (fn = input.toString) == "function" && !isObject2(val = fn.call(input))) return val;
                throw TypeError("Can't convert object to primitive value");
              };
            })
          ),
          /***/
          "c430": (
            /***/
            (function(module2, exports$12) {
              module2.exports = false;
            })
          ),
          /***/
          "c6b6": (
            /***/
            (function(module2, exports$12) {
              var toString = {}.toString;
              module2.exports = function(it) {
                return toString.call(it).slice(8, -1);
              };
            })
          ),
          /***/
          "c6cd": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var global = __webpack_require__("da84");
              var setGlobal = __webpack_require__("ce4e");
              var SHARED = "__core-js_shared__";
              var store = global[SHARED] || setGlobal(SHARED, {});
              module2.exports = store;
            })
          ),
          /***/
          "c740": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var $findIndex = __webpack_require__("b727").findIndex;
              var addToUnscopables = __webpack_require__("44d2");
              var arrayMethodUsesToLength = __webpack_require__("ae40");
              var FIND_INDEX = "findIndex";
              var SKIPS_HOLES = true;
              var USES_TO_LENGTH = arrayMethodUsesToLength(FIND_INDEX);
              if (FIND_INDEX in []) Array(1)[FIND_INDEX](function() {
                SKIPS_HOLES = false;
              });
              $({ target: "Array", proto: true, forced: SKIPS_HOLES || !USES_TO_LENGTH }, {
                findIndex: function findIndex(callbackfn) {
                  return $findIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
                }
              });
              addToUnscopables(FIND_INDEX);
            })
          ),
          /***/
          "c8ba": (
            /***/
            (function(module2, exports$12) {
              var g;
              g = /* @__PURE__ */ (function() {
                return this;
              })();
              try {
                g = g || new Function("return this")();
              } catch (e) {
                if (typeof window === "object") g = window;
              }
              module2.exports = g;
            })
          ),
          /***/
          "c975": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var $indexOf = __webpack_require__("4d64").indexOf;
              var arrayMethodIsStrict = __webpack_require__("a640");
              var arrayMethodUsesToLength = __webpack_require__("ae40");
              var nativeIndexOf = [].indexOf;
              var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
              var STRICT_METHOD = arrayMethodIsStrict("indexOf");
              var USES_TO_LENGTH = arrayMethodUsesToLength("indexOf", { ACCESSORS: true, 1: 0 });
              $({ target: "Array", proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD || !USES_TO_LENGTH }, {
                indexOf: function indexOf(searchElement) {
                  return NEGATIVE_ZERO ? nativeIndexOf.apply(this, arguments) || 0 : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : void 0);
                }
              });
            })
          ),
          /***/
          "ca84": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var has = __webpack_require__("5135");
              var toIndexedObject = __webpack_require__("fc6a");
              var indexOf = __webpack_require__("4d64").indexOf;
              var hiddenKeys = __webpack_require__("d012");
              module2.exports = function(object, names) {
                var O = toIndexedObject(object);
                var i = 0;
                var result = [];
                var key;
                for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
                while (names.length > i) if (has(O, key = names[i++])) {
                  ~indexOf(result, key) || result.push(key);
                }
                return result;
              };
            })
          ),
          /***/
          "caad": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var $includes = __webpack_require__("4d64").includes;
              var addToUnscopables = __webpack_require__("44d2");
              var arrayMethodUsesToLength = __webpack_require__("ae40");
              var USES_TO_LENGTH = arrayMethodUsesToLength("indexOf", { ACCESSORS: true, 1: 0 });
              $({ target: "Array", proto: true, forced: !USES_TO_LENGTH }, {
                includes: function includes(el) {
                  return $includes(this, el, arguments.length > 1 ? arguments[1] : void 0);
                }
              });
              addToUnscopables("includes");
            })
          ),
          /***/
          "cc12": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var global = __webpack_require__("da84");
              var isObject2 = __webpack_require__("861d");
              var document2 = global.document;
              var EXISTS = isObject2(document2) && isObject2(document2.createElement);
              module2.exports = function(it) {
                return EXISTS ? document2.createElement(it) : {};
              };
            })
          ),
          /***/
          "ce4e": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var global = __webpack_require__("da84");
              var createNonEnumerableProperty = __webpack_require__("9112");
              module2.exports = function(key, value) {
                try {
                  createNonEnumerableProperty(global, key, value);
                } catch (error) {
                  global[key] = value;
                }
                return value;
              };
            })
          ),
          /***/
          "d012": (
            /***/
            (function(module2, exports$12) {
              module2.exports = {};
            })
          ),
          /***/
          "d039": (
            /***/
            (function(module2, exports$12) {
              module2.exports = function(exec) {
                try {
                  return !!exec();
                } catch (error) {
                  return true;
                }
              };
            })
          ),
          /***/
          "d066": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var path = __webpack_require__("428f");
              var global = __webpack_require__("da84");
              var aFunction = function(variable) {
                return typeof variable == "function" ? variable : void 0;
              };
              module2.exports = function(namespace, method) {
                return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace]) : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
              };
            })
          ),
          /***/
          "d1e7": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
              var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
              var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);
              exports$12.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
                var descriptor = getOwnPropertyDescriptor(this, V);
                return !!descriptor && descriptor.enumerable;
              } : nativePropertyIsEnumerable;
            })
          ),
          /***/
          "d28b": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var defineWellKnownSymbol = __webpack_require__("746f");
              defineWellKnownSymbol("iterator");
            })
          ),
          /***/
          "d2bb": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var anObject = __webpack_require__("825a");
              var aPossiblePrototype = __webpack_require__("3bbe");
              module2.exports = Object.setPrototypeOf || ("__proto__" in {} ? (function() {
                var CORRECT_SETTER = false;
                var test = {};
                var setter;
                try {
                  setter = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set;
                  setter.call(test, []);
                  CORRECT_SETTER = test instanceof Array;
                } catch (error) {
                }
                return function setPrototypeOf(O, proto) {
                  anObject(O);
                  aPossiblePrototype(proto);
                  if (CORRECT_SETTER) setter.call(O, proto);
                  else O.__proto__ = proto;
                  return O;
                };
              })() : void 0);
            })
          ),
          /***/
          "d3b7": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
              var redefine = __webpack_require__("6eeb");
              var toString = __webpack_require__("b041");
              if (!TO_STRING_TAG_SUPPORT) {
                redefine(Object.prototype, "toString", toString, { unsafe: true });
              }
            })
          ),
          /***/
          "d44e": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var defineProperty = __webpack_require__("9bf2").f;
              var has = __webpack_require__("5135");
              var wellKnownSymbol = __webpack_require__("b622");
              var TO_STRING_TAG = wellKnownSymbol("toStringTag");
              module2.exports = function(it, TAG, STATIC) {
                if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
                  defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
                }
              };
            })
          ),
          /***/
          "d58f": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var aFunction = __webpack_require__("1c0b");
              var toObject = __webpack_require__("7b0b");
              var IndexedObject = __webpack_require__("44ad");
              var toLength = __webpack_require__("50c4");
              var createMethod = function(IS_RIGHT) {
                return function(that, callbackfn, argumentsLength, memo) {
                  aFunction(callbackfn);
                  var O = toObject(that);
                  var self2 = IndexedObject(O);
                  var length = toLength(O.length);
                  var index2 = IS_RIGHT ? length - 1 : 0;
                  var i = IS_RIGHT ? -1 : 1;
                  if (argumentsLength < 2) while (true) {
                    if (index2 in self2) {
                      memo = self2[index2];
                      index2 += i;
                      break;
                    }
                    index2 += i;
                    if (IS_RIGHT ? index2 < 0 : length <= index2) {
                      throw TypeError("Reduce of empty array with no initial value");
                    }
                  }
                  for (; IS_RIGHT ? index2 >= 0 : length > index2; index2 += i) if (index2 in self2) {
                    memo = callbackfn(memo, self2[index2], index2, O);
                  }
                  return memo;
                };
              };
              module2.exports = {
                // `Array.prototype.reduce` method
                // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
                left: createMethod(false),
                // `Array.prototype.reduceRight` method
                // https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
                right: createMethod(true)
              };
            })
          ),
          /***/
          "d784": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              __webpack_require__("ac1f");
              var redefine = __webpack_require__("6eeb");
              var fails = __webpack_require__("d039");
              var wellKnownSymbol = __webpack_require__("b622");
              var regexpExec = __webpack_require__("9263");
              var createNonEnumerableProperty = __webpack_require__("9112");
              var SPECIES = wellKnownSymbol("species");
              var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function() {
                var re = /./;
                re.exec = function() {
                  var result = [];
                  result.groups = { a: "7" };
                  return result;
                };
                return "".replace(re, "$<a>") !== "7";
              });
              var REPLACE_KEEPS_$0 = (function() {
                return "a".replace(/./, "$0") === "$0";
              })();
              var REPLACE = wellKnownSymbol("replace");
              var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function() {
                if (/./[REPLACE]) {
                  return /./[REPLACE]("a", "$0") === "";
                }
                return false;
              })();
              var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function() {
                var re = /(?:)/;
                var originalExec = re.exec;
                re.exec = function() {
                  return originalExec.apply(this, arguments);
                };
                var result = "ab".split(re);
                return result.length !== 2 || result[0] !== "a" || result[1] !== "b";
              });
              module2.exports = function(KEY, length, exec, sham) {
                var SYMBOL = wellKnownSymbol(KEY);
                var DELEGATES_TO_SYMBOL = !fails(function() {
                  var O = {};
                  O[SYMBOL] = function() {
                    return 7;
                  };
                  return ""[KEY](O) != 7;
                });
                var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function() {
                  var execCalled = false;
                  var re = /a/;
                  if (KEY === "split") {
                    re = {};
                    re.constructor = {};
                    re.constructor[SPECIES] = function() {
                      return re;
                    };
                    re.flags = "";
                    re[SYMBOL] = /./[SYMBOL];
                  }
                  re.exec = function() {
                    execCalled = true;
                    return null;
                  };
                  re[SYMBOL]("");
                  return !execCalled;
                });
                if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || KEY === "replace" && !(REPLACE_SUPPORTS_NAMED_GROUPS && REPLACE_KEEPS_$0 && !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE) || KEY === "split" && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC) {
                  var nativeRegExpMethod = /./[SYMBOL];
                  var methods = exec(SYMBOL, ""[KEY], function(nativeMethod, regexp, str, arg2, forceStringMethod) {
                    if (regexp.exec === regexpExec) {
                      if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
                        return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
                      }
                      return { done: true, value: nativeMethod.call(str, regexp, arg2) };
                    }
                    return { done: false };
                  }, {
                    REPLACE_KEEPS_$0,
                    REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
                  });
                  var stringMethod = methods[0];
                  var regexMethod = methods[1];
                  redefine(String.prototype, KEY, stringMethod);
                  redefine(
                    RegExp.prototype,
                    SYMBOL,
                    length == 2 ? function(string, arg) {
                      return regexMethod.call(string, this, arg);
                    } : function(string) {
                      return regexMethod.call(string, this);
                    }
                  );
                }
                if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], "sham", true);
              };
            })
          ),
          /***/
          "d81d": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var $map = __webpack_require__("b727").map;
              var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
              var arrayMethodUsesToLength = __webpack_require__("ae40");
              var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("map");
              var USES_TO_LENGTH = arrayMethodUsesToLength("map");
              $({ target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
                map: function map(callbackfn) {
                  return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
                }
              });
            })
          ),
          /***/
          "da84": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              (function(global) {
                var check = function(it) {
                  return it && it.Math == Math && it;
                };
                module2.exports = // eslint-disable-next-line no-undef
                check(typeof globalThis == "object" && globalThis) || check(typeof window == "object" && window) || check(typeof self == "object" && self) || check(typeof global == "object" && global) || // eslint-disable-next-line no-new-func
                Function("return this")();
              }).call(this, __webpack_require__("c8ba"));
            })
          ),
          /***/
          "dbb4": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var DESCRIPTORS = __webpack_require__("83ab");
              var ownKeys2 = __webpack_require__("56ef");
              var toIndexedObject = __webpack_require__("fc6a");
              var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
              var createProperty = __webpack_require__("8418");
              $({ target: "Object", stat: true, sham: !DESCRIPTORS }, {
                getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
                  var O = toIndexedObject(object);
                  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
                  var keys = ownKeys2(O);
                  var result = {};
                  var index2 = 0;
                  var key, descriptor;
                  while (keys.length > index2) {
                    descriptor = getOwnPropertyDescriptor(O, key = keys[index2++]);
                    if (descriptor !== void 0) createProperty(result, key, descriptor);
                  }
                  return result;
                }
              });
            })
          ),
          /***/
          "dbf1": (
            /***/
            (function(module2, __webpack_exports__, __webpack_require__) {
              (function(global) {
                __webpack_require__.d(__webpack_exports__, "a", function() {
                  return console2;
                });
                function getConsole() {
                  if (typeof window !== "undefined") {
                    return window.console;
                  }
                  return global.console;
                }
                var console2 = getConsole();
              }).call(this, __webpack_require__("c8ba"));
            })
          ),
          /***/
          "ddb0": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var global = __webpack_require__("da84");
              var DOMIterables = __webpack_require__("fdbc");
              var ArrayIteratorMethods = __webpack_require__("e260");
              var createNonEnumerableProperty = __webpack_require__("9112");
              var wellKnownSymbol = __webpack_require__("b622");
              var ITERATOR = wellKnownSymbol("iterator");
              var TO_STRING_TAG = wellKnownSymbol("toStringTag");
              var ArrayValues = ArrayIteratorMethods.values;
              for (var COLLECTION_NAME in DOMIterables) {
                var Collection = global[COLLECTION_NAME];
                var CollectionPrototype = Collection && Collection.prototype;
                if (CollectionPrototype) {
                  if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
                    createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
                  } catch (error) {
                    CollectionPrototype[ITERATOR] = ArrayValues;
                  }
                  if (!CollectionPrototype[TO_STRING_TAG]) {
                    createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
                  }
                  if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
                    if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
                      createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
                    } catch (error) {
                      CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
                    }
                  }
                }
              }
            })
          ),
          /***/
          "df75": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var internalObjectKeys = __webpack_require__("ca84");
              var enumBugKeys = __webpack_require__("7839");
              module2.exports = Object.keys || function keys(O) {
                return internalObjectKeys(O, enumBugKeys);
              };
            })
          ),
          /***/
          "e01a": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var DESCRIPTORS = __webpack_require__("83ab");
              var global = __webpack_require__("da84");
              var has = __webpack_require__("5135");
              var isObject2 = __webpack_require__("861d");
              var defineProperty = __webpack_require__("9bf2").f;
              var copyConstructorProperties = __webpack_require__("e893");
              var NativeSymbol = global.Symbol;
              if (DESCRIPTORS && typeof NativeSymbol == "function" && (!("description" in NativeSymbol.prototype) || // Safari 12 bug
              NativeSymbol().description !== void 0)) {
                var EmptyStringDescriptionStore = {};
                var SymbolWrapper = function Symbol2() {
                  var description = arguments.length < 1 || arguments[0] === void 0 ? void 0 : String(arguments[0]);
                  var result = this instanceof SymbolWrapper ? new NativeSymbol(description) : description === void 0 ? NativeSymbol() : NativeSymbol(description);
                  if (description === "") EmptyStringDescriptionStore[result] = true;
                  return result;
                };
                copyConstructorProperties(SymbolWrapper, NativeSymbol);
                var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
                symbolPrototype.constructor = SymbolWrapper;
                var symbolToString = symbolPrototype.toString;
                var native = String(NativeSymbol("test")) == "Symbol(test)";
                var regexp = /^Symbol\((.*)\)[^)]+$/;
                defineProperty(symbolPrototype, "description", {
                  configurable: true,
                  get: function description() {
                    var symbol = isObject2(this) ? this.valueOf() : this;
                    var string = symbolToString.call(symbol);
                    if (has(EmptyStringDescriptionStore, symbol)) return "";
                    var desc = native ? string.slice(7, -1) : string.replace(regexp, "$1");
                    return desc === "" ? void 0 : desc;
                  }
                });
                $({ global: true, forced: true }, {
                  Symbol: SymbolWrapper
                });
              }
            })
          ),
          /***/
          "e163": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var has = __webpack_require__("5135");
              var toObject = __webpack_require__("7b0b");
              var sharedKey = __webpack_require__("f772");
              var CORRECT_PROTOTYPE_GETTER = __webpack_require__("e177");
              var IE_PROTO = sharedKey("IE_PROTO");
              var ObjectPrototype = Object.prototype;
              module2.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function(O) {
                O = toObject(O);
                if (has(O, IE_PROTO)) return O[IE_PROTO];
                if (typeof O.constructor == "function" && O instanceof O.constructor) {
                  return O.constructor.prototype;
                }
                return O instanceof Object ? ObjectPrototype : null;
              };
            })
          ),
          /***/
          "e177": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var fails = __webpack_require__("d039");
              module2.exports = !fails(function() {
                function F() {
                }
                F.prototype.constructor = null;
                return Object.getPrototypeOf(new F()) !== F.prototype;
              });
            })
          ),
          /***/
          "e260": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var toIndexedObject = __webpack_require__("fc6a");
              var addToUnscopables = __webpack_require__("44d2");
              var Iterators = __webpack_require__("3f8c");
              var InternalStateModule = __webpack_require__("69f3");
              var defineIterator = __webpack_require__("7dd0");
              var ARRAY_ITERATOR = "Array Iterator";
              var setInternalState = InternalStateModule.set;
              var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);
              module2.exports = defineIterator(Array, "Array", function(iterated, kind) {
                setInternalState(this, {
                  type: ARRAY_ITERATOR,
                  target: toIndexedObject(iterated),
                  // target
                  index: 0,
                  // next index
                  kind
                  // kind
                });
              }, function() {
                var state = getInternalState(this);
                var target = state.target;
                var kind = state.kind;
                var index2 = state.index++;
                if (!target || index2 >= target.length) {
                  state.target = void 0;
                  return { value: void 0, done: true };
                }
                if (kind == "keys") return { value: index2, done: false };
                if (kind == "values") return { value: target[index2], done: false };
                return { value: [index2, target[index2]], done: false };
              }, "values");
              Iterators.Arguments = Iterators.Array;
              addToUnscopables("keys");
              addToUnscopables("values");
              addToUnscopables("entries");
            })
          ),
          /***/
          "e439": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var fails = __webpack_require__("d039");
              var toIndexedObject = __webpack_require__("fc6a");
              var nativeGetOwnPropertyDescriptor = __webpack_require__("06cf").f;
              var DESCRIPTORS = __webpack_require__("83ab");
              var FAILS_ON_PRIMITIVES = fails(function() {
                nativeGetOwnPropertyDescriptor(1);
              });
              var FORCED = !DESCRIPTORS || FAILS_ON_PRIMITIVES;
              $({ target: "Object", stat: true, forced: FORCED, sham: !DESCRIPTORS }, {
                getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
                  return nativeGetOwnPropertyDescriptor(toIndexedObject(it), key);
                }
              });
            })
          ),
          /***/
          "e538": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var wellKnownSymbol = __webpack_require__("b622");
              exports$12.f = wellKnownSymbol;
            })
          ),
          /***/
          "e893": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var has = __webpack_require__("5135");
              var ownKeys2 = __webpack_require__("56ef");
              var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
              var definePropertyModule = __webpack_require__("9bf2");
              module2.exports = function(target, source) {
                var keys = ownKeys2(source);
                var defineProperty = definePropertyModule.f;
                var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
                for (var i = 0; i < keys.length; i++) {
                  var key = keys[i];
                  if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
                }
              };
            })
          ),
          /***/
          "e8b5": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var classof = __webpack_require__("c6b6");
              module2.exports = Array.isArray || function isArray2(arg) {
                return classof(arg) == "Array";
              };
            })
          ),
          /***/
          "e95a": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var wellKnownSymbol = __webpack_require__("b622");
              var Iterators = __webpack_require__("3f8c");
              var ITERATOR = wellKnownSymbol("iterator");
              var ArrayPrototype = Array.prototype;
              module2.exports = function(it) {
                return it !== void 0 && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
              };
            })
          ),
          /***/
          "f5df": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
              var classofRaw = __webpack_require__("c6b6");
              var wellKnownSymbol = __webpack_require__("b622");
              var TO_STRING_TAG = wellKnownSymbol("toStringTag");
              var CORRECT_ARGUMENTS = classofRaw(/* @__PURE__ */ (function() {
                return arguments;
              })()) == "Arguments";
              var tryGet = function(it, key) {
                try {
                  return it[key];
                } catch (error) {
                }
              };
              module2.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function(it) {
                var O, tag, result;
                return it === void 0 ? "Undefined" : it === null ? "Null" : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == "string" ? tag : CORRECT_ARGUMENTS ? classofRaw(O) : (result = classofRaw(O)) == "Object" && typeof O.callee == "function" ? "Arguments" : result;
              };
            })
          ),
          /***/
          "f772": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var shared = __webpack_require__("5692");
              var uid = __webpack_require__("90e3");
              var keys = shared("keys");
              module2.exports = function(key) {
                return keys[key] || (keys[key] = uid(key));
              };
            })
          ),
          /***/
          "fb15": (
            /***/
            (function(module2, __webpack_exports__, __webpack_require__) {
              __webpack_require__.r(__webpack_exports__);
              if (typeof window !== "undefined") {
                var currentScript = window.document.currentScript;
                {
                  var getCurrentScript = __webpack_require__("8875");
                  currentScript = getCurrentScript();
                  if (!("currentScript" in document)) {
                    Object.defineProperty(document, "currentScript", { get: getCurrentScript });
                  }
                }
                var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/);
                if (src) {
                  __webpack_require__.p = src[1];
                }
              }
              __webpack_require__("99af");
              __webpack_require__("4de4");
              __webpack_require__("4160");
              __webpack_require__("c975");
              __webpack_require__("d81d");
              __webpack_require__("a434");
              __webpack_require__("159b");
              __webpack_require__("a4d3");
              __webpack_require__("e439");
              __webpack_require__("dbb4");
              __webpack_require__("b64b");
              function _defineProperty2(obj, key, value) {
                if (key in obj) {
                  Object.defineProperty(obj, key, {
                    value,
                    enumerable: true,
                    configurable: true,
                    writable: true
                  });
                } else {
                  obj[key] = value;
                }
                return obj;
              }
              function ownKeys2(object, enumerableOnly) {
                var keys = Object.keys(object);
                if (Object.getOwnPropertySymbols) {
                  var symbols = Object.getOwnPropertySymbols(object);
                  if (enumerableOnly) symbols = symbols.filter(function(sym) {
                    return Object.getOwnPropertyDescriptor(object, sym).enumerable;
                  });
                  keys.push.apply(keys, symbols);
                }
                return keys;
              }
              function _objectSpread22(target) {
                for (var i = 1; i < arguments.length; i++) {
                  var source = arguments[i] != null ? arguments[i] : {};
                  if (i % 2) {
                    ownKeys2(Object(source), true).forEach(function(key) {
                      _defineProperty2(target, key, source[key]);
                    });
                  } else if (Object.getOwnPropertyDescriptors) {
                    Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
                  } else {
                    ownKeys2(Object(source)).forEach(function(key) {
                      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
                    });
                  }
                }
                return target;
              }
              function _arrayWithHoles(arr) {
                if (Array.isArray(arr)) return arr;
              }
              __webpack_require__("e01a");
              __webpack_require__("d28b");
              __webpack_require__("e260");
              __webpack_require__("d3b7");
              __webpack_require__("3ca3");
              __webpack_require__("ddb0");
              function _iterableToArrayLimit(arr, i) {
                if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
                var _arr = [];
                var _n = true;
                var _d = false;
                var _e = void 0;
                try {
                  for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                    _arr.push(_s.value);
                    if (i && _arr.length === i) break;
                  }
                } catch (err) {
                  _d = true;
                  _e = err;
                } finally {
                  try {
                    if (!_n && _i["return"] != null) _i["return"]();
                  } finally {
                    if (_d) throw _e;
                  }
                }
                return _arr;
              }
              __webpack_require__("a630");
              __webpack_require__("fb6a");
              __webpack_require__("b0c0");
              __webpack_require__("25f0");
              function _arrayLikeToArray2(arr, len) {
                if (len == null || len > arr.length) len = arr.length;
                for (var i = 0, arr2 = new Array(len); i < len; i++) {
                  arr2[i] = arr[i];
                }
                return arr2;
              }
              function _unsupportedIterableToArray2(o, minLen) {
                if (!o) return;
                if (typeof o === "string") return _arrayLikeToArray2(o, minLen);
                var n = Object.prototype.toString.call(o).slice(8, -1);
                if (n === "Object" && o.constructor) n = o.constructor.name;
                if (n === "Map" || n === "Set") return Array.from(o);
                if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray2(o, minLen);
              }
              function _nonIterableRest() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
              }
              function _slicedToArray(arr, i) {
                return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray2(arr, i) || _nonIterableRest();
              }
              function _arrayWithoutHoles2(arr) {
                if (Array.isArray(arr)) return _arrayLikeToArray2(arr);
              }
              function _iterableToArray2(iter) {
                if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
              }
              function _nonIterableSpread2() {
                throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
              }
              function _toConsumableArray2(arr) {
                return _arrayWithoutHoles2(arr) || _iterableToArray2(arr) || _unsupportedIterableToArray2(arr) || _nonIterableSpread2();
              }
              var external_commonjs_sortablejs_commonjs2_sortablejs_amd_sortablejs_root_Sortable_ = __webpack_require__("a352");
              var external_commonjs_sortablejs_commonjs2_sortablejs_amd_sortablejs_root_Sortable_default = /* @__PURE__ */ __webpack_require__.n(external_commonjs_sortablejs_commonjs2_sortablejs_amd_sortablejs_root_Sortable_);
              function removeNode(node) {
                if (node.parentElement !== null) {
                  node.parentElement.removeChild(node);
                }
              }
              function insertNodeAt(fatherNode, node, position) {
                var refNode = position === 0 ? fatherNode.children[0] : fatherNode.children[position - 1].nextSibling;
                fatherNode.insertBefore(node, refNode);
              }
              var console2 = __webpack_require__("dbf1");
              __webpack_require__("13d5");
              __webpack_require__("4fad");
              __webpack_require__("ac1f");
              __webpack_require__("5319");
              function cached(fn) {
                var cache = /* @__PURE__ */ Object.create(null);
                return function cachedFn(str) {
                  var hit = cache[str];
                  return hit || (cache[str] = fn(str));
                };
              }
              var regex = /-(\w)/g;
              var camelize2 = cached(function(str) {
                return str.replace(regex, function(_, c) {
                  return c.toUpperCase();
                });
              });
              __webpack_require__("5db7");
              __webpack_require__("73d9");
              var manageAndEmit = ["Start", "Add", "Remove", "Update", "End"];
              var emit = ["Choose", "Unchoose", "Sort", "Filter", "Clone"];
              var manage = ["Move"];
              var eventHandlerNames = [manage, manageAndEmit, emit].flatMap(function(events2) {
                return events2;
              }).map(function(evt) {
                return "on".concat(evt);
              });
              var events = {
                manage,
                manageAndEmit,
                emit
              };
              function isReadOnly(eventName) {
                return eventHandlerNames.indexOf(eventName) !== -1;
              }
              __webpack_require__("caad");
              __webpack_require__("2ca0");
              var tags = ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "link", "main", "map", "mark", "math", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rb", "rp", "rt", "rtc", "ruby", "s", "samp", "script", "section", "select", "slot", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "svg", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr"];
              function isHtmlTag(name) {
                return tags.includes(name);
              }
              function isTransition(name) {
                return ["transition-group", "TransitionGroup"].includes(name);
              }
              function isHtmlAttribute(value) {
                return ["id", "class", "role", "style"].includes(value) || value.startsWith("data-") || value.startsWith("aria-") || value.startsWith("on");
              }
              function project(entries) {
                return entries.reduce(function(res, _ref) {
                  var _ref2 = _slicedToArray(_ref, 2), key = _ref2[0], value = _ref2[1];
                  res[key] = value;
                  return res;
                }, {});
              }
              function getComponentAttributes(_ref3) {
                var $attrs = _ref3.$attrs, _ref3$componentData = _ref3.componentData, componentData = _ref3$componentData === void 0 ? {} : _ref3$componentData;
                var attributes = project(Object.entries($attrs).filter(function(_ref4) {
                  var _ref5 = _slicedToArray(_ref4, 2), key = _ref5[0];
                  _ref5[1];
                  return isHtmlAttribute(key);
                }));
                return _objectSpread22(_objectSpread22({}, attributes), componentData);
              }
              function createSortableOption(_ref6) {
                var $attrs = _ref6.$attrs, callBackBuilder = _ref6.callBackBuilder;
                var options = project(getValidSortableEntries($attrs));
                Object.entries(callBackBuilder).forEach(function(_ref7) {
                  var _ref8 = _slicedToArray(_ref7, 2), eventType = _ref8[0], eventBuilder = _ref8[1];
                  events[eventType].forEach(function(event) {
                    options["on".concat(event)] = eventBuilder(event);
                  });
                });
                var draggable2 = "[data-draggable]".concat(options.draggable || "");
                return _objectSpread22(_objectSpread22({}, options), {}, {
                  draggable: draggable2
                });
              }
              function getValidSortableEntries(value) {
                return Object.entries(value).filter(function(_ref9) {
                  var _ref10 = _slicedToArray(_ref9, 2), key = _ref10[0];
                  _ref10[1];
                  return !isHtmlAttribute(key);
                }).map(function(_ref11) {
                  var _ref12 = _slicedToArray(_ref11, 2), key = _ref12[0], value2 = _ref12[1];
                  return [camelize2(key), value2];
                }).filter(function(_ref13) {
                  var _ref14 = _slicedToArray(_ref13, 2), key = _ref14[0];
                  _ref14[1];
                  return !isReadOnly(key);
                });
              }
              __webpack_require__("c740");
              function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                  throw new TypeError("Cannot call a class as a function");
                }
              }
              function _defineProperties(target, props2) {
                for (var i = 0; i < props2.length; i++) {
                  var descriptor = props2[i];
                  descriptor.enumerable = descriptor.enumerable || false;
                  descriptor.configurable = true;
                  if ("value" in descriptor) descriptor.writable = true;
                  Object.defineProperty(target, descriptor.key, descriptor);
                }
              }
              function _createClass(Constructor, protoProps, staticProps) {
                if (protoProps) _defineProperties(Constructor.prototype, protoProps);
                return Constructor;
              }
              var getHtmlElementFromNode = function getHtmlElementFromNode2(_ref) {
                var el = _ref.el;
                return el;
              };
              var addContext = function addContext2(domElement, context) {
                return domElement.__draggable_context = context;
              };
              var getContext = function getContext2(domElement) {
                return domElement.__draggable_context;
              };
              var componentStructure_ComponentStructure = /* @__PURE__ */ (function() {
                function ComponentStructure(_ref2) {
                  var _ref2$nodes = _ref2.nodes, header = _ref2$nodes.header, defaultNodes = _ref2$nodes.default, footer = _ref2$nodes.footer, root = _ref2.root, realList = _ref2.realList;
                  _classCallCheck(this, ComponentStructure);
                  this.defaultNodes = defaultNodes;
                  this.children = [].concat(_toConsumableArray2(header), _toConsumableArray2(defaultNodes), _toConsumableArray2(footer));
                  this.externalComponent = root.externalComponent;
                  this.rootTransition = root.transition;
                  this.tag = root.tag;
                  this.realList = realList;
                }
                _createClass(ComponentStructure, [{
                  key: "render",
                  value: function render(h, attributes) {
                    var tag = this.tag, children = this.children, _isRootComponent = this._isRootComponent;
                    var option2 = !_isRootComponent ? children : {
                      default: function _default() {
                        return children;
                      }
                    };
                    return h(tag, attributes, option2);
                  }
                }, {
                  key: "updated",
                  value: function updated() {
                    var defaultNodes = this.defaultNodes, realList = this.realList;
                    defaultNodes.forEach(function(node, index2) {
                      addContext(getHtmlElementFromNode(node), {
                        element: realList[index2],
                        index: index2
                      });
                    });
                  }
                }, {
                  key: "getUnderlyingVm",
                  value: function getUnderlyingVm(domElement) {
                    return getContext(domElement);
                  }
                }, {
                  key: "getVmIndexFromDomIndex",
                  value: function getVmIndexFromDomIndex(domIndex, element) {
                    var defaultNodes = this.defaultNodes;
                    var length = defaultNodes.length;
                    var domChildren = element.children;
                    var domElement = domChildren.item(domIndex);
                    if (domElement === null) {
                      return length;
                    }
                    var context = getContext(domElement);
                    if (context) {
                      return context.index;
                    }
                    if (length === 0) {
                      return 0;
                    }
                    var firstDomListElement = getHtmlElementFromNode(defaultNodes[0]);
                    var indexFirstDomListElement = _toConsumableArray2(domChildren).findIndex(function(element2) {
                      return element2 === firstDomListElement;
                    });
                    return domIndex < indexFirstDomListElement ? 0 : length;
                  }
                }, {
                  key: "_isRootComponent",
                  get: function get() {
                    return this.externalComponent || this.rootTransition;
                  }
                }]);
                return ComponentStructure;
              })();
              var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");
              function getSlot(slots, key) {
                var slotValue = slots[key];
                return slotValue ? slotValue() : [];
              }
              function computeNodes(_ref) {
                var $slots = _ref.$slots, realList = _ref.realList, getKey = _ref.getKey;
                var normalizedList = realList || [];
                var _map = ["header", "footer"].map(function(name) {
                  return getSlot($slots, name);
                }), _map2 = _slicedToArray(_map, 2), header = _map2[0], footer = _map2[1];
                var item = $slots.item;
                if (!item) {
                  throw new Error("draggable element must have an item slot");
                }
                var defaultNodes = normalizedList.flatMap(function(element, index2) {
                  return item({
                    element,
                    index: index2
                  }).map(function(node) {
                    node.key = getKey(element);
                    node.props = _objectSpread22(_objectSpread22({}, node.props || {}), {}, {
                      "data-draggable": true
                    });
                    return node;
                  });
                });
                if (defaultNodes.length !== normalizedList.length) {
                  throw new Error("Item slot must have only one child");
                }
                return {
                  header,
                  footer,
                  default: defaultNodes
                };
              }
              function getRootInformation(tag) {
                var transition = isTransition(tag);
                var externalComponent = !isHtmlTag(tag) && !transition;
                return {
                  transition,
                  externalComponent,
                  tag: externalComponent ? Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])(tag) : transition ? external_commonjs_vue_commonjs2_vue_root_Vue_["TransitionGroup"] : tag
                };
              }
              function computeComponentStructure(_ref2) {
                var $slots = _ref2.$slots, tag = _ref2.tag, realList = _ref2.realList, getKey = _ref2.getKey;
                var nodes = computeNodes({
                  $slots,
                  realList,
                  getKey
                });
                var root = getRootInformation(tag);
                return new componentStructure_ComponentStructure({
                  nodes,
                  root,
                  realList
                });
              }
              function _emit(evtName, evtData) {
                var _this = this;
                Object(external_commonjs_vue_commonjs2_vue_root_Vue_["nextTick"])(function() {
                  return _this.$emit(evtName.toLowerCase(), evtData);
                });
              }
              function _manage(evtName) {
                var _this2 = this;
                return function(evtData, originalElement) {
                  if (_this2.realList !== null) {
                    return _this2["onDrag".concat(evtName)](evtData, originalElement);
                  }
                };
              }
              function _manageAndEmit(evtName) {
                var _this3 = this;
                var delegateCallBack = _manage.call(this, evtName);
                return function(evtData, originalElement) {
                  delegateCallBack.call(_this3, evtData, originalElement);
                  _emit.call(_this3, evtName, evtData);
                };
              }
              var draggingElement = null;
              var props = {
                list: {
                  type: Array,
                  required: false,
                  default: null
                },
                modelValue: {
                  type: Array,
                  required: false,
                  default: null
                },
                itemKey: {
                  type: [String, Function],
                  required: true
                },
                clone: {
                  type: Function,
                  default: function _default(original) {
                    return original;
                  }
                },
                tag: {
                  type: String,
                  default: "div"
                },
                move: {
                  type: Function,
                  default: null
                },
                componentData: {
                  type: Object,
                  required: false,
                  default: null
                }
              };
              var emits = ["update:modelValue", "change"].concat(_toConsumableArray2([].concat(_toConsumableArray2(events.manageAndEmit), _toConsumableArray2(events.emit)).map(function(evt) {
                return evt.toLowerCase();
              })));
              var draggableComponent = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
                name: "draggable",
                inheritAttrs: false,
                props,
                emits,
                data: function data() {
                  return {
                    error: false
                  };
                },
                render: function render() {
                  try {
                    this.error = false;
                    var $slots = this.$slots, $attrs = this.$attrs, tag = this.tag, componentData = this.componentData, realList = this.realList, getKey = this.getKey;
                    var componentStructure = computeComponentStructure({
                      $slots,
                      tag,
                      realList,
                      getKey
                    });
                    this.componentStructure = componentStructure;
                    var attributes = getComponentAttributes({
                      $attrs,
                      componentData
                    });
                    return componentStructure.render(external_commonjs_vue_commonjs2_vue_root_Vue_["h"], attributes);
                  } catch (err) {
                    this.error = true;
                    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["h"])("pre", {
                      style: {
                        color: "red"
                      }
                    }, err.stack);
                  }
                },
                created: function created() {
                  if (this.list !== null && this.modelValue !== null) {
                    console2[
                      "a"
                      /* console */
                    ].error("modelValue and list props are mutually exclusive! Please set one or another.");
                  }
                },
                mounted: function mounted() {
                  var _this4 = this;
                  if (this.error) {
                    return;
                  }
                  var $attrs = this.$attrs, $el = this.$el, componentStructure = this.componentStructure;
                  componentStructure.updated();
                  var sortableOptions = createSortableOption({
                    $attrs,
                    callBackBuilder: {
                      manageAndEmit: function manageAndEmit2(event) {
                        return _manageAndEmit.call(_this4, event);
                      },
                      emit: function emit2(event) {
                        return _emit.bind(_this4, event);
                      },
                      manage: function manage2(event) {
                        return _manage.call(_this4, event);
                      }
                    }
                  });
                  var targetDomElement = $el.nodeType === 1 ? $el : $el.parentElement;
                  this._sortable = new external_commonjs_sortablejs_commonjs2_sortablejs_amd_sortablejs_root_Sortable_default.a(targetDomElement, sortableOptions);
                  this.targetDomElement = targetDomElement;
                  targetDomElement.__draggable_component__ = this;
                },
                updated: function updated() {
                  this.componentStructure.updated();
                },
                beforeUnmount: function beforeUnmount() {
                  if (this._sortable !== void 0) this._sortable.destroy();
                },
                computed: {
                  realList: function realList() {
                    var list = this.list;
                    return list ? list : this.modelValue;
                  },
                  getKey: function getKey() {
                    var itemKey = this.itemKey;
                    if (typeof itemKey === "function") {
                      return itemKey;
                    }
                    return function(element) {
                      return element[itemKey];
                    };
                  }
                },
                watch: {
                  $attrs: {
                    handler: function handler(newOptionValue) {
                      var _sortable = this._sortable;
                      if (!_sortable) return;
                      getValidSortableEntries(newOptionValue).forEach(function(_ref) {
                        var _ref2 = _slicedToArray(_ref, 2), key = _ref2[0], value = _ref2[1];
                        _sortable.option(key, value);
                      });
                    },
                    deep: true
                  }
                },
                methods: {
                  getUnderlyingVm: function getUnderlyingVm(domElement) {
                    return this.componentStructure.getUnderlyingVm(domElement) || null;
                  },
                  getUnderlyingPotencialDraggableComponent: function getUnderlyingPotencialDraggableComponent(htmElement) {
                    return htmElement.__draggable_component__;
                  },
                  emitChanges: function emitChanges(evt) {
                    var _this5 = this;
                    Object(external_commonjs_vue_commonjs2_vue_root_Vue_["nextTick"])(function() {
                      return _this5.$emit("change", evt);
                    });
                  },
                  alterList: function alterList(onList) {
                    if (this.list) {
                      onList(this.list);
                      return;
                    }
                    var newList = _toConsumableArray2(this.modelValue);
                    onList(newList);
                    this.$emit("update:modelValue", newList);
                  },
                  spliceList: function spliceList() {
                    var _arguments = arguments;
                    var spliceList2 = function spliceList3(list) {
                      return list.splice.apply(list, _toConsumableArray2(_arguments));
                    };
                    this.alterList(spliceList2);
                  },
                  updatePosition: function updatePosition(oldIndex2, newIndex2) {
                    var updatePosition2 = function updatePosition3(list) {
                      return list.splice(newIndex2, 0, list.splice(oldIndex2, 1)[0]);
                    };
                    this.alterList(updatePosition2);
                  },
                  getRelatedContextFromMoveEvent: function getRelatedContextFromMoveEvent(_ref3) {
                    var to = _ref3.to, related = _ref3.related;
                    var component = this.getUnderlyingPotencialDraggableComponent(to);
                    if (!component) {
                      return {
                        component
                      };
                    }
                    var list = component.realList;
                    var context = {
                      list,
                      component
                    };
                    if (to !== related && list) {
                      var destination = component.getUnderlyingVm(related) || {};
                      return _objectSpread22(_objectSpread22({}, destination), context);
                    }
                    return context;
                  },
                  getVmIndexFromDomIndex: function getVmIndexFromDomIndex(domIndex) {
                    return this.componentStructure.getVmIndexFromDomIndex(domIndex, this.targetDomElement);
                  },
                  onDragStart: function onDragStart(evt) {
                    this.context = this.getUnderlyingVm(evt.item);
                    evt.item._underlying_vm_ = this.clone(this.context.element);
                    draggingElement = evt.item;
                  },
                  onDragAdd: function onDragAdd(evt) {
                    var element = evt.item._underlying_vm_;
                    if (element === void 0) {
                      return;
                    }
                    removeNode(evt.item);
                    var newIndex2 = this.getVmIndexFromDomIndex(evt.newIndex);
                    this.spliceList(newIndex2, 0, element);
                    var added = {
                      element,
                      newIndex: newIndex2
                    };
                    this.emitChanges({
                      added
                    });
                  },
                  onDragRemove: function onDragRemove(evt) {
                    insertNodeAt(this.$el, evt.item, evt.oldIndex);
                    if (evt.pullMode === "clone") {
                      removeNode(evt.clone);
                      return;
                    }
                    var _this$context = this.context, oldIndex2 = _this$context.index, element = _this$context.element;
                    this.spliceList(oldIndex2, 1);
                    var removed = {
                      element,
                      oldIndex: oldIndex2
                    };
                    this.emitChanges({
                      removed
                    });
                  },
                  onDragUpdate: function onDragUpdate(evt) {
                    removeNode(evt.item);
                    insertNodeAt(evt.from, evt.item, evt.oldIndex);
                    var oldIndex2 = this.context.index;
                    var newIndex2 = this.getVmIndexFromDomIndex(evt.newIndex);
                    this.updatePosition(oldIndex2, newIndex2);
                    var moved2 = {
                      element: this.context.element,
                      oldIndex: oldIndex2,
                      newIndex: newIndex2
                    };
                    this.emitChanges({
                      moved: moved2
                    });
                  },
                  computeFutureIndex: function computeFutureIndex(relatedContext, evt) {
                    if (!relatedContext.element) {
                      return 0;
                    }
                    var domChildren = _toConsumableArray2(evt.to.children).filter(function(el) {
                      return el.style["display"] !== "none";
                    });
                    var currentDomIndex = domChildren.indexOf(evt.related);
                    var currentIndex = relatedContext.component.getVmIndexFromDomIndex(currentDomIndex);
                    var draggedInList = domChildren.indexOf(draggingElement) !== -1;
                    return draggedInList || !evt.willInsertAfter ? currentIndex : currentIndex + 1;
                  },
                  onDragMove: function onDragMove(evt, originalEvent) {
                    var move = this.move, realList = this.realList;
                    if (!move || !realList) {
                      return true;
                    }
                    var relatedContext = this.getRelatedContextFromMoveEvent(evt);
                    var futureIndex = this.computeFutureIndex(relatedContext, evt);
                    var draggedContext = _objectSpread22(_objectSpread22({}, this.context), {}, {
                      futureIndex
                    });
                    var sendEvent = _objectSpread22(_objectSpread22({}, evt), {}, {
                      relatedContext,
                      draggedContext
                    });
                    return move(sendEvent, originalEvent);
                  },
                  onDragEnd: function onDragEnd() {
                    draggingElement = null;
                  }
                }
              });
              var vuedraggable = draggableComponent;
              __webpack_exports__["default"] = vuedraggable;
            })
          ),
          /***/
          "fb6a": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var $ = __webpack_require__("23e7");
              var isObject2 = __webpack_require__("861d");
              var isArray2 = __webpack_require__("e8b5");
              var toAbsoluteIndex = __webpack_require__("23cb");
              var toLength = __webpack_require__("50c4");
              var toIndexedObject = __webpack_require__("fc6a");
              var createProperty = __webpack_require__("8418");
              var wellKnownSymbol = __webpack_require__("b622");
              var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
              var arrayMethodUsesToLength = __webpack_require__("ae40");
              var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("slice");
              var USES_TO_LENGTH = arrayMethodUsesToLength("slice", { ACCESSORS: true, 0: 0, 1: 2 });
              var SPECIES = wellKnownSymbol("species");
              var nativeSlice = [].slice;
              var max = Math.max;
              $({ target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
                slice: function slice(start, end) {
                  var O = toIndexedObject(this);
                  var length = toLength(O.length);
                  var k = toAbsoluteIndex(start, length);
                  var fin = toAbsoluteIndex(end === void 0 ? length : end, length);
                  var Constructor, result, n;
                  if (isArray2(O)) {
                    Constructor = O.constructor;
                    if (typeof Constructor == "function" && (Constructor === Array || isArray2(Constructor.prototype))) {
                      Constructor = void 0;
                    } else if (isObject2(Constructor)) {
                      Constructor = Constructor[SPECIES];
                      if (Constructor === null) Constructor = void 0;
                    }
                    if (Constructor === Array || Constructor === void 0) {
                      return nativeSlice.call(O, k, fin);
                    }
                  }
                  result = new (Constructor === void 0 ? Array : Constructor)(max(fin - k, 0));
                  for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
                  result.length = n;
                  return result;
                }
              });
            })
          ),
          /***/
          "fc6a": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var IndexedObject = __webpack_require__("44ad");
              var requireObjectCoercible = __webpack_require__("1d80");
              module2.exports = function(it) {
                return IndexedObject(requireObjectCoercible(it));
              };
            })
          ),
          /***/
          "fdbc": (
            /***/
            (function(module2, exports$12) {
              module2.exports = {
                CSSRuleList: 0,
                CSSStyleDeclaration: 0,
                CSSValueList: 0,
                ClientRectList: 0,
                DOMRectList: 0,
                DOMStringList: 0,
                DOMTokenList: 1,
                DataTransferItemList: 0,
                FileList: 0,
                HTMLAllCollection: 0,
                HTMLCollection: 0,
                HTMLFormElement: 0,
                HTMLSelectElement: 0,
                MediaList: 0,
                MimeTypeArray: 0,
                NamedNodeMap: 0,
                NodeList: 1,
                PaintRequestList: 0,
                Plugin: 0,
                PluginArray: 0,
                SVGLengthList: 0,
                SVGNumberList: 0,
                SVGPathSegList: 0,
                SVGPointList: 0,
                SVGStringList: 0,
                SVGTransformList: 0,
                SourceBufferList: 0,
                StyleSheetList: 0,
                TextTrackCueList: 0,
                TextTrackList: 0,
                TouchList: 0
              };
            })
          ),
          /***/
          "fdbf": (
            /***/
            (function(module2, exports$12, __webpack_require__) {
              var NATIVE_SYMBOL = __webpack_require__("4930");
              module2.exports = NATIVE_SYMBOL && !Symbol.sham && typeof Symbol.iterator == "symbol";
            })
          )
          /******/
        })["default"]
      );
    });
  })(vuedraggable_umd$1);
  return vuedraggable_umd$1.exports;
}
var vuedraggable_umdExports = requireVuedraggable_umd();
const draggable = /* @__PURE__ */ getDefaultExportFromCjs(vuedraggable_umdExports);
const _hoisted_1$4 = ["data-item-id"];
const _hoisted_2$4 = { class: "item-row__check" };
const _hoisted_3$4 = ["checked", "disabled"];
const _hoisted_4$4 = ["placeholder", "onKeydown"];
const _hoisted_5$4 = ["onKeydown"];
const _hoisted_6$4 = ["placeholder", "onKeydown"];
const _hoisted_7$4 = ["onMousedown"];
const _hoisted_8$3 = {
  key: 0,
  class: "item-row__dropdown-empty"
};
const _hoisted_9$3 = {
  key: 0,
  class: "item-row__quantity"
};
const _hoisted_10$3 = {
  key: 2,
  class: "item-row__area"
};
const _hoisted_11$3 = ["title"];
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "ItemRow",
  props: {
    itemId: {},
    listId: {},
    canEdit: { type: Boolean },
    editing: { type: Boolean }
  },
  emits: ["closeEdit"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const itemsStore = useItemsStore();
    const shopAreasStore = useShopAreasStore();
    useListsStore();
    const deleteTitle = translate("shopping_list", "Delete");
    const qtyLabel = translate("shopping_list", "Qty");
    const areaPlaceholder = translate("shopping_list", "Area");
    const noMatchText = translate("shopping_list", "No match");
    const item = computed(() => {
      const items = itemsStore.itemsByList[props.listId] ?? [];
      return items.find((i) => i.id === props.itemId) ?? null;
    });
    const areaOptions = computed(() => {
      const areas = shopAreasStore.areasByList[props.listId] ?? [];
      return areas.map((a) => ({ id: a.id, name: a.name, color: a.color }));
    });
    const areaName = computed(() => {
      if (!item.value?.shopAreaId) return null;
      return areaOptions.value.find((a) => a.id === item.value.shopAreaId)?.name ?? null;
    });
    const areaColor = computed(() => {
      if (!item.value?.shopAreaId) return null;
      return areaOptions.value.find((a) => a.id === item.value.shopAreaId)?.color ?? null;
    });
    const editName = ref("");
    const editQty = ref("");
    const editAreaId = ref(null);
    const areaSearch = ref("");
    const dropdownOpen = ref(false);
    const highlightIndex = ref(0);
    const nameInputRef = ref(null);
    const qtyInputRef = ref(null);
    const areaInputRef = ref(null);
    const areaWrapperRef = ref(null);
    const dropdownRef = ref(null);
    let saving = false;
    const editAreaName = computed(() => {
      if (editAreaId.value === null) return null;
      return areaOptions.value.find((a) => a.id === editAreaId.value)?.name ?? null;
    });
    const filteredAreas = computed(() => {
      const q = areaSearch.value.toLowerCase().trim();
      if (!q) return areaOptions.value;
      return areaOptions.value.filter((a) => a.name.toLowerCase().includes(q));
    });
    watch(() => props.editing, async (isEditing) => {
      if (isEditing && item.value) {
        editName.value = item.value.name;
        editQty.value = item.value.quantity ?? "";
        editAreaId.value = item.value.shopAreaId;
        areaSearch.value = "";
        dropdownOpen.value = false;
        await nextTick();
        nameInputRef.value?.focus();
        nameInputRef.value?.select();
      }
    });
    function focusQtyInput() {
      qtyInputRef.value?.focus();
      qtyInputRef.value?.select();
    }
    function focusNameInput() {
      nameInputRef.value?.focus();
      nameInputRef.value?.select();
    }
    function focusAreaInput() {
      areaInputRef.value?.focus();
    }
    const dropdownStyle = computed(() => {
      if (!areaWrapperRef.value) return {};
      const rect = areaWrapperRef.value.getBoundingClientRect();
      return {
        position: "fixed",
        top: `${rect.bottom + 2}px`,
        left: `${rect.left}px`,
        minWidth: `${Math.max(rect.width, 160)}px`
      };
    });
    function onAreaFocus() {
      dropdownOpen.value = true;
      highlightIndex.value = 0;
      areaSearch.value = "";
    }
    function closeDropdown() {
      dropdownOpen.value = false;
      areaSearch.value = "";
    }
    function moveHighlight(delta) {
      const len = filteredAreas.value.length;
      if (len === 0) return;
      highlightIndex.value = (highlightIndex.value + delta + len) % len;
    }
    function selectArea(area) {
      editAreaId.value = area.id;
      areaSearch.value = "";
      dropdownOpen.value = false;
      nameInputRef.value?.focus();
    }
    function clearArea() {
      editAreaId.value = null;
      areaSearch.value = "";
      areaInputRef.value?.focus();
    }
    function onAreaEnter() {
      if (dropdownOpen.value && filteredAreas.value.length > 0) {
        selectArea(filteredAreas.value[highlightIndex.value]);
      } else {
        saveEdit();
      }
    }
    function onAreaTab() {
      closeDropdown();
      focusQtyInput();
    }
    function onClickOutside(e) {
      const target = e.target;
      if (areaWrapperRef.value?.contains(target)) return;
      if (dropdownRef.value?.contains(target)) return;
      closeDropdown();
    }
    onMounted(() => document.addEventListener("mousedown", onClickOutside));
    onUnmounted(() => document.removeEventListener("mousedown", onClickOutside));
    async function saveEdit() {
      if (saving || !item.value) return;
      const trimmedName = editName.value.trim();
      if (!trimmedName) {
        cancelEdit();
        return;
      }
      const trimmedQty = editQty.value.trim() || null;
      const nameChanged = trimmedName !== item.value.name;
      const qtyChanged = trimmedQty !== (item.value.quantity ?? null);
      const areaChanged = editAreaId.value !== item.value.shopAreaId;
      closeDropdown();
      emit("closeEdit");
      if (nameChanged || qtyChanged || areaChanged) {
        saving = true;
        await itemsStore.update(props.listId, props.itemId, {
          name: trimmedName,
          quantity: trimmedQty,
          shopAreaId: editAreaId.value,
          ...areaChanged ? { areaExplicit: true } : {}
        });
        saving = false;
      }
    }
    function cancelEdit() {
      closeDropdown();
      emit("closeEdit");
    }
    function onFieldBlur(e) {
      const related = e.relatedTarget;
      if (related === nameInputRef.value || related === qtyInputRef.value || related === areaInputRef.value) return;
      if (related && areaWrapperRef.value?.contains(related)) return;
      setTimeout(() => {
        if (props.editing) saveEdit();
      }, 100);
    }
    async function onToggleCheck() {
      await itemsStore.toggleCheck(props.listId, props.itemId);
    }
    async function onDelete() {
      await itemsStore.remove(props.listId, props.itemId);
    }
    return (_ctx, _cache) => {
      return item.value ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(["item-row", {
          "item-row--checked": item.value.checked,
          "item-row--editing": __props.editing
        }]),
        "data-item-id": __props.canEdit && !item.value.checked ? __props.itemId : void 0
      }, [
        createBaseVNode("label", _hoisted_2$4, [
          createBaseVNode("input", {
            type: "checkbox",
            checked: item.value.checked,
            disabled: !__props.canEdit,
            onChange: onToggleCheck
          }, null, 40, _hoisted_3$4)
        ]),
        __props.editing ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          withDirectives(createBaseVNode("input", {
            ref_key: "qtyInputRef",
            ref: qtyInputRef,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => editQty.value = $event),
            type: "text",
            placeholder: unref(qtyLabel),
            class: "item-row__edit-input item-row__edit-qty",
            onKeydown: [
              withKeys(withModifiers(saveEdit, ["prevent"]), ["enter"]),
              withKeys(withModifiers(cancelEdit, ["prevent"]), ["escape"]),
              withKeys(withModifiers(focusNameInput, ["prevent"]), ["tab"])
            ],
            onBlur: onFieldBlur
          }, null, 40, _hoisted_4$4), [
            [vModelText, editQty.value]
          ]),
          withDirectives(createBaseVNode("input", {
            ref_key: "nameInputRef",
            ref: nameInputRef,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => editName.value = $event),
            type: "text",
            class: "item-row__edit-input item-row__edit-name",
            onKeydown: [
              withKeys(withModifiers(saveEdit, ["prevent"]), ["enter"]),
              withKeys(withModifiers(cancelEdit, ["prevent"]), ["escape"]),
              withKeys(withModifiers(focusAreaInput, ["prevent"]), ["tab"])
            ],
            onBlur: onFieldBlur
          }, null, 40, _hoisted_5$4), [
            [vModelText, editName.value]
          ]),
          createBaseVNode("div", {
            ref_key: "areaWrapperRef",
            ref: areaWrapperRef,
            class: "item-row__area-wrapper"
          }, [
            withDirectives(createBaseVNode("input", {
              ref_key: "areaInputRef",
              ref: areaInputRef,
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => areaSearch.value = $event),
              type: "text",
              placeholder: editAreaName.value || unref(areaPlaceholder),
              class: "item-row__edit-input item-row__edit-area",
              onFocus: onAreaFocus,
              onKeydown: [
                withKeys(withModifiers(onAreaEnter, ["prevent"]), ["enter"]),
                withKeys(closeDropdown, ["escape"]),
                withKeys(withModifiers(onAreaTab, ["prevent"]), ["tab"]),
                _cache[3] || (_cache[3] = withKeys(withModifiers(($event) => moveHighlight(1), ["prevent"]), ["down"])),
                _cache[4] || (_cache[4] = withKeys(withModifiers(($event) => moveHighlight(-1), ["prevent"]), ["up"]))
              ],
              onBlur: onFieldBlur
            }, null, 40, _hoisted_6$4), [
              [vModelText, areaSearch.value]
            ]),
            editAreaId.value !== null ? (openBlock(), createElementBlock("button", {
              key: 0,
              class: "item-row__area-clear",
              tabindex: "-1",
              onMousedown: withModifiers(clearArea, ["prevent"])
            }, " ✕ ", 32)) : createCommentVNode("", true),
            (openBlock(), createBlock(Teleport, { to: "body" }, [
              dropdownOpen.value ? (openBlock(), createElementBlock("div", {
                key: 0,
                ref_key: "dropdownRef",
                ref: dropdownRef,
                class: "item-row__dropdown",
                style: normalizeStyle(dropdownStyle.value)
              }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(filteredAreas.value, (area, i) => {
                  return openBlock(), createElementBlock("div", {
                    key: area.id,
                    class: normalizeClass(["item-row__dropdown-item", { "item-row__dropdown-item--highlighted": i === highlightIndex.value }]),
                    onMousedown: withModifiers(($event) => selectArea(area), ["prevent"])
                  }, [
                    area.color ? (openBlock(), createElementBlock("span", {
                      key: 0,
                      class: "item-row__dropdown-dot",
                      style: normalizeStyle({ backgroundColor: area.color })
                    }, null, 4)) : createCommentVNode("", true),
                    createTextVNode(" " + toDisplayString(area.name), 1)
                  ], 42, _hoisted_7$4);
                }), 128)),
                filteredAreas.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_8$3, toDisplayString(unref(noMatchText)), 1)) : createCommentVNode("", true)
              ], 4)) : createCommentVNode("", true)
            ]))
          ], 512)
        ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          item.value.quantity ? (openBlock(), createElementBlock("span", _hoisted_9$3, toDisplayString(item.value.quantity) + toDisplayString(item.value.unit ? " " + item.value.unit : ""), 1)) : createCommentVNode("", true),
          createBaseVNode("span", {
            class: normalizeClass(["item-row__name", { "item-row__name--checked": item.value.checked }])
          }, toDisplayString(item.value.name), 3)
        ], 64)),
        areaName.value && !__props.editing ? (openBlock(), createElementBlock("span", _hoisted_10$3, [
          areaColor.value ? (openBlock(), createElementBlock("span", {
            key: 0,
            class: "item-row__area-dot",
            style: normalizeStyle({ backgroundColor: areaColor.value })
          }, null, 4)) : createCommentVNode("", true),
          createTextVNode(" " + toDisplayString(areaName.value), 1)
        ])) : createCommentVNode("", true),
        __props.canEdit && !__props.editing ? (openBlock(), createElementBlock("button", {
          key: 3,
          class: "item-row__delete",
          title: unref(deleteTitle),
          onClick: onDelete
        }, [..._cache[5] || (_cache[5] = [
          createStaticVNode('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-1e2299f0><polyline points="3 6 5 6 21 6" data-v-1e2299f0></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" data-v-1e2299f0></path><line x1="10" y1="11" x2="10" y2="17" data-v-1e2299f0></line><line x1="14" y1="11" x2="14" y2="17" data-v-1e2299f0></line></svg>', 1)
        ])], 8, _hoisted_11$3)) : createCommentVNode("", true)
      ], 10, _hoisted_1$4)) : createCommentVNode("", true);
    };
  }
});
const ItemRow = /* @__PURE__ */ _export_sfc$1(_sfc_main$5, [["__scopeId", "data-v-1e2299f0"]]);
const _hoisted_1$3 = { class: "item-editor" };
const _hoisted_2$3 = { class: "item-editor__main" };
const _hoisted_3$3 = ["placeholder", "onKeydown"];
const _hoisted_4$3 = ["placeholder", "onKeydown"];
const _hoisted_5$3 = {
  key: 1,
  class: "item-editor__dropdown"
};
const _hoisted_6$3 = ["onMousedown"];
const _hoisted_7$3 = {
  key: 0,
  class: "item-editor__dropdown-empty"
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "ItemEditor",
  props: {
    listId: {}
  },
  setup(__props) {
    const props = __props;
    const itemsStore = useItemsStore();
    const shopAreasStore = useShopAreasStore();
    const listsStore = useListsStore();
    const addItemLabel = translate("shopping_list", "Add an item to list...");
    const shopAreaPlaceholder = translate("shopping_list", "Area");
    const noMatchText = translate("shopping_list", "No match");
    const nameRef = ref(null);
    const areaRef = ref(null);
    const areaWrapperRef = ref(null);
    const name = ref("");
    const selectedAreaId = ref(null);
    const areaSearch = ref("");
    const dropdownOpen = ref(false);
    const highlightIndex = ref(0);
    const areaOptions = computed(() => {
      if (!listsStore.currentListId) return [];
      const areas = shopAreasStore.areasByList[listsStore.currentListId] ?? [];
      return areas.map((a) => ({ id: a.id, name: a.name, color: a.color }));
    });
    const selectedAreaName = computed(() => {
      if (selectedAreaId.value === null) return null;
      return areaOptions.value.find((a) => a.id === selectedAreaId.value)?.name ?? null;
    });
    const filteredAreas = computed(() => {
      const q = areaSearch.value.toLowerCase().trim();
      if (!q) return areaOptions.value;
      return areaOptions.value.filter((a) => a.name.toLowerCase().includes(q));
    });
    function focusArea() {
      areaRef.value?.focus();
    }
    function onAreaFocus() {
      dropdownOpen.value = true;
      highlightIndex.value = 0;
      areaSearch.value = "";
    }
    function closeDropdown() {
      dropdownOpen.value = false;
      areaSearch.value = "";
    }
    function moveHighlight(delta) {
      const len = filteredAreas.value.length;
      if (len === 0) return;
      highlightIndex.value = (highlightIndex.value + delta + len) % len;
    }
    function selectArea(area) {
      selectedAreaId.value = area.id;
      areaSearch.value = "";
      dropdownOpen.value = false;
      nameRef.value?.focus();
    }
    function clearArea() {
      selectedAreaId.value = null;
      areaSearch.value = "";
    }
    function onAreaEnter() {
      if (dropdownOpen.value && filteredAreas.value.length > 0) {
        selectArea(filteredAreas.value[highlightIndex.value]);
      } else {
        onSubmit();
      }
    }
    function onAreaTab() {
      closeDropdown();
      nameRef.value?.focus();
    }
    function onClickOutside(e) {
      if (areaWrapperRef.value && !areaWrapperRef.value.contains(e.target)) {
        closeDropdown();
      }
    }
    onMounted(() => document.addEventListener("mousedown", onClickOutside));
    onUnmounted(() => document.removeEventListener("mousedown", onClickOutside));
    const UNITS = [
      "teaspoon",
      "teaspoons",
      "tsp",
      "tablespoon",
      "tablespoons",
      "tbsp",
      "cup",
      "cups",
      "ounce",
      "ounces",
      "oz",
      "pound",
      "pounds",
      "lb",
      "lbs",
      "gram",
      "grams",
      "g",
      "kilogram",
      "kilograms",
      "kg",
      "milliliter",
      "milliliters",
      "ml",
      "liter",
      "liters",
      "l",
      "pinch",
      "pinches",
      "bunch",
      "bunches",
      "clove",
      "cloves",
      "can",
      "cans",
      "bottle",
      "bottles",
      "piece",
      "pieces",
      "slice",
      "slices",
      "head",
      "heads",
      "stalk",
      "stalks",
      "sprig",
      "sprigs",
      "pack",
      "packs",
      "packet",
      "packets",
      "bag",
      "bags",
      "fl oz"
    ];
    const LEADING_UNITS = ["pinch", "pinches", "bunch", "bunches", "zest", "dash", "handful"];
    function matchUnit(text) {
      const lower = text.toLowerCase();
      let best = "";
      for (const unit of UNITS) {
        if (lower.startsWith(unit + " ") || lower.startsWith(unit + ",") || lower === unit) {
          if (unit.length > best.length) best = unit;
        }
      }
      return best;
    }
    function cleanName(raw) {
      let name2 = raw;
      let prev = "";
      while (prev !== name2) {
        prev = name2;
        name2 = name2.replace(/\s*\([^)]*\)/g, "");
      }
      name2 = name2.replace(/[()]/g, "").replace(/,\s*,/g, ",").replace(/,\s*$/, "").replace(/^\s*,\s*/, "").replace(/\s+/g, " ").trim();
      if (name2.length > 0) {
        name2 = name2.charAt(0).toUpperCase() + name2.slice(1);
      }
      return name2;
    }
    function parseIngredient(line) {
      const trimmed = line.trim();
      if (!trimmed) return { name: "", quantity: null };
      const trimmedLower = trimmed.toLowerCase();
      for (const unit of LEADING_UNITS) {
        if (trimmedLower.startsWith(unit + " ") || trimmedLower.startsWith(unit + ",")) {
          let rest2 = trimmed.slice(unit.length).trim();
          rest2 = rest2.replace(/^,\s*/, "").replace(/^of\s+/i, "").trim();
          return { name: cleanName(rest2 || trimmed), quantity: "1 " + unit };
        }
      }
      const qtyPattern = /^([\d]+(?:\s+[\d]+\/[\d]+|\/[\d]+|\.\d+)?(?:\s*-\s*[\d]+(?:\/[\d]+|\.\d+)?)?)\s*/;
      const match = trimmed.match(qtyPattern);
      if (!match) {
        return { name: cleanName(trimmed), quantity: null };
      }
      const qtyStr = match[1].trim();
      let rest = trimmed.slice(match[0].length).trim();
      const matchedUnit = matchUnit(rest);
      let finalQty = qtyStr;
      if (matchedUnit) {
        finalQty = qtyStr + " " + matchedUnit;
        rest = rest.slice(matchedUnit.length).trim();
        rest = rest.replace(/^,\s*/, "").replace(/^of\s+/i, "").trim();
      }
      rest = rest.replace(/^,\s*/, "").trim();
      return {
        name: cleanName(rest || trimmed),
        quantity: finalQty
      };
    }
    function detectArea(ingredientName) {
      const lower = ingredientName.toLowerCase();
      const areas = areaOptions.value;
      for (const area of areas) {
        const fullArea = (shopAreasStore.areasByList[listsStore.currentListId] ?? []).find((a) => a.id === area.id);
        if (!fullArea?.keywords) continue;
        for (const keyword of fullArea.keywords) {
          if (lower.includes(keyword)) {
            return area.id;
          }
        }
      }
      return null;
    }
    async function onPaste(e) {
      const text = e.clipboardData?.getData("text") ?? "";
      if (!text.includes("\n")) return;
      e.preventDefault();
      const lines = text.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length > 0);
      if (lines.length === 0) return;
      if (lines.length === 1) {
        name.value = lines[0];
        return;
      }
      for (const line of lines) {
        const parsed = parseIngredient(line);
        if (!parsed.name) continue;
        const explicitArea = selectedAreaId.value !== null;
        const areaId = selectedAreaId.value ?? detectArea(parsed.name);
        await itemsStore.create(props.listId, {
          name: parsed.name,
          quantity: parsed.quantity || "1",
          shopAreaId: areaId,
          areaExplicit: explicitArea
        });
      }
      name.value = "";
      await nextTick();
      nameRef.value?.focus();
    }
    async function onSubmit() {
      const trimmedName = name.value.trim();
      if (!trimmedName) return;
      closeDropdown();
      const parsed = parseIngredient(trimmedName);
      if (!parsed.name) return;
      const explicitArea = selectedAreaId.value !== null;
      const areaId = selectedAreaId.value ?? detectArea(parsed.name);
      await itemsStore.create(props.listId, {
        name: parsed.name,
        quantity: parsed.quantity || "1",
        shopAreaId: areaId,
        areaExplicit: explicitArea
      });
      name.value = "";
      await nextTick();
      nameRef.value?.focus();
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$3, [
        createBaseVNode("div", _hoisted_2$3, [
          _cache[4] || (_cache[4] = createBaseVNode("span", { class: "item-editor__plus" }, "+", -1)),
          withDirectives(createBaseVNode("input", {
            ref_key: "nameRef",
            ref: nameRef,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => name.value = $event),
            type: "text",
            enterkeyhint: "send",
            placeholder: unref(addItemLabel),
            class: "item-editor__input",
            onKeydown: [
              withKeys(withModifiers(onSubmit, ["prevent"]), ["enter"]),
              withKeys(withModifiers(focusArea, ["prevent"]), ["tab"])
            ],
            onPaste
          }, null, 40, _hoisted_3$3), [
            [vModelText, name.value]
          ]),
          createBaseVNode("div", {
            class: "item-editor__area-wrapper",
            ref_key: "areaWrapperRef",
            ref: areaWrapperRef
          }, [
            withDirectives(createBaseVNode("input", {
              ref_key: "areaRef",
              ref: areaRef,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => areaSearch.value = $event),
              type: "text",
              enterkeyhint: "send",
              placeholder: selectedAreaName.value || unref(shopAreaPlaceholder),
              class: "item-editor__area-input",
              onFocus: onAreaFocus,
              onKeydown: [
                withKeys(withModifiers(onAreaEnter, ["prevent"]), ["enter"]),
                withKeys(withModifiers(onAreaTab, ["prevent"]), ["tab"]),
                withKeys(closeDropdown, ["escape"]),
                _cache[2] || (_cache[2] = withKeys(withModifiers(($event) => moveHighlight(1), ["prevent"]), ["down"])),
                _cache[3] || (_cache[3] = withKeys(withModifiers(($event) => moveHighlight(-1), ["prevent"]), ["up"]))
              ]
            }, null, 40, _hoisted_4$3), [
              [vModelText, areaSearch.value]
            ]),
            selectedAreaId.value !== null ? (openBlock(), createElementBlock("button", {
              key: 0,
              class: "item-editor__area-clear",
              tabindex: "-1",
              onClick: clearArea
            }, " ✕ ")) : createCommentVNode("", true),
            dropdownOpen.value ? (openBlock(), createElementBlock("div", _hoisted_5$3, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(filteredAreas.value, (area, i) => {
                return openBlock(), createElementBlock("div", {
                  key: area.id,
                  class: normalizeClass(["item-editor__dropdown-item", { "item-editor__dropdown-item--highlighted": i === highlightIndex.value }]),
                  onMousedown: withModifiers(($event) => selectArea(area), ["prevent"])
                }, [
                  area.color ? (openBlock(), createElementBlock("span", {
                    key: 0,
                    class: "item-editor__dropdown-dot",
                    style: normalizeStyle({ backgroundColor: area.color })
                  }, null, 4)) : createCommentVNode("", true),
                  createTextVNode(" " + toDisplayString(area.name), 1)
                ], 42, _hoisted_6$3);
              }), 128)),
              filteredAreas.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_7$3, toDisplayString(unref(noMatchText)), 1)) : createCommentVNode("", true)
            ])) : createCommentVNode("", true)
          ], 512)
        ])
      ]);
    };
  }
});
const ItemEditor = /* @__PURE__ */ _export_sfc$1(_sfc_main$4, [["__scopeId", "data-v-eab5cb74"]]);
const _hoisted_1$2 = { class: "share-modal" };
const _hoisted_2$2 = { class: "share-modal__header" };
const _hoisted_3$2 = { class: "share-modal__search" };
const _hoisted_4$2 = ["placeholder"];
const _hoisted_5$2 = {
  key: 0,
  class: "share-modal__results"
};
const _hoisted_6$2 = ["onClick"];
const _hoisted_7$2 = { class: "share-modal__icon" };
const _hoisted_8$2 = { class: "share-modal__result-info" };
const _hoisted_9$2 = { class: "share-modal__result-name" };
const _hoisted_10$2 = {
  key: 0,
  class: "share-modal__result-type"
};
const _hoisted_11$2 = {
  key: 1,
  class: "share-modal__no-results"
};
const _hoisted_12$2 = {
  key: 2,
  class: "share-modal__shares"
};
const _hoisted_13$2 = { class: "share-modal__section-title" };
const _hoisted_14$2 = { class: "share-modal__icon" };
const _hoisted_15$2 = { class: "share-modal__share-info" };
const _hoisted_16$2 = { class: "share-modal__share-name" };
const _hoisted_17$2 = {
  key: 0,
  class: "share-modal__share-type"
};
const _hoisted_18$1 = ["value", "onChange"];
const _hoisted_19$1 = { value: 0 };
const _hoisted_20$1 = { value: 1 };
const _hoisted_21$1 = ["onClick"];
const _hoisted_22$1 = {
  key: 3,
  class: "share-modal__link-section"
};
const _hoisted_23$1 = { class: "share-modal__section-title" };
const _hoisted_24$1 = {
  key: 0,
  class: "share-modal__link-create"
};
const _hoisted_25$1 = {
  key: 1,
  class: "share-modal__link-details"
};
const _hoisted_26$1 = { class: "share-modal__link-url-row" };
const _hoisted_27 = ["value"];
const _hoisted_28 = { class: "share-modal__link-options" };
const _hoisted_29 = { class: "share-modal__link-option" };
const _hoisted_30 = ["value"];
const _hoisted_31 = { value: 0 };
const _hoisted_32 = { value: 1 };
const _hoisted_33 = { class: "share-modal__link-option" };
const _hoisted_34 = { class: "share-modal__link-password-row" };
const _hoisted_35 = ["placeholder"];
const _hoisted_36 = { class: "share-modal__link-option" };
const _hoisted_37 = ["value", "min"];
const _hoisted_38 = {
  key: 4,
  class: "share-modal__empty"
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ShareDialog",
  props: {
    listId: {},
    isOwner: { type: Boolean },
    currentUserId: {}
  },
  emits: ["close"],
  setup(__props) {
    const props = __props;
    const sharesStore = useSharesStore();
    const searchRef = ref(null);
    const linkUrlRef = ref(null);
    const shareTitle = translate("shopping_list", "Share list");
    const searchPlaceholder = translate("shopping_list", "Search users or groups...");
    const noResultsText = translate("shopping_list", "No users found");
    const groupText = translate("shopping_list", "Group");
    const sharedWithText = translate("shopping_list", "Shared with");
    const canViewText = translate("shopping_list", "Can view");
    const canEditText = translate("shopping_list", "Can edit");
    const emptyText = translate("shopping_list", "Search above to share this list with other users.");
    const groupLabel = translate("shopping_list", "group");
    const publicLinkText = translate("shopping_list", "Public link");
    const createLinkText = translate("shopping_list", "Create public link");
    const copyText = translate("shopping_list", "Copy link");
    const copiedText = translate("shopping_list", "Copied!");
    const permissionLabel = translate("shopping_list", "Permission");
    const passwordLabel = translate("shopping_list", "Password");
    const passwordSetText = translate("shopping_list", "Password set");
    const passwordPlaceholder = translate("shopping_list", "Optional");
    const saveText = translate("shopping_list", "Set");
    const removeText = translate("shopping_list", "Remove");
    const expiryLabel = translate("shopping_list", "Expires");
    const deleteLinkText = translate("shopping_list", "Delete public link");
    const searchQuery = ref("");
    const searching = ref(false);
    const shareeResults = ref([]);
    const linkPassword = ref("");
    const copiedLink = ref(false);
    const shares = computed(
      () => (sharesStore.sharesByList[props.listId] ?? []).filter((s) => s.sharedWithType !== ShareType.LINK)
    );
    const linkShare = computed(
      () => sharesStore.getLinkShare(props.listId)
    );
    const linkUrl = computed(() => {
      if (!linkShare.value?.token) return "";
      return window.location.origin + generateUrl(`/apps/shopping_list/s/${linkShare.value.token}`);
    });
    const todayStr = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    let searchTimeout = null;
    onMounted(async () => {
      await sharesStore.fetchByList(props.listId);
      await nextTick();
      searchRef.value?.focus();
    });
    function onSearchInput() {
      if (searchTimeout) clearTimeout(searchTimeout);
      const query = searchQuery.value.trim();
      if (!query) {
        shareeResults.value = [];
        return;
      }
      searching.value = true;
      searchTimeout = setTimeout(async () => {
        try {
          const url = generateOcsUrl("apps/files_sharing/api/v1/sharees");
          const response = await cancelableClient.get(url, {
            params: { search: query, itemType: "file", perPage: 10 }
          });
          const data = response.data.ocs.data;
          const options = [];
          for (const user of (data.exact?.users ?? []).concat(data.users ?? [])) {
            if (user.value.shareWith !== props.currentUserId) {
              options.push({
                label: user.label,
                value: user.value.shareWith,
                type: ShareType.USER
              });
            }
          }
          for (const group of (data.exact?.groups ?? []).concat(data.groups ?? [])) {
            options.push({
              label: `${group.label} (${groupLabel})`,
              value: group.value.shareWith,
              type: ShareType.GROUP
            });
          }
          shareeResults.value = options;
        } catch (e) {
          console.error("Failed to search sharees", e);
        } finally {
          searching.value = false;
        }
      }, 300);
    }
    async function onSelectSharee(sharee) {
      await sharesStore.create(props.listId, sharee.value, sharee.type, Permission.WRITE);
      searchQuery.value = "";
      shareeResults.value = [];
    }
    async function onPermissionChange(shareId, permission) {
      await sharesStore.updatePermission(shareId, permission, props.listId);
    }
    async function onRemoveShare(shareId) {
      await sharesStore.remove(shareId, props.listId);
    }
    async function onCreateLink() {
      await sharesStore.createLinkShare(props.listId, Permission.READ);
    }
    async function onCopyLink() {
      if (linkUrl.value) {
        await navigator.clipboard.writeText(linkUrl.value);
        copiedLink.value = true;
        setTimeout(() => {
          copiedLink.value = false;
        }, 2e3);
      }
    }
    async function onLinkPermissionChange(permission) {
      if (linkShare.value) {
        await sharesStore.updateLinkShare(linkShare.value.id, props.listId, { permission });
      }
    }
    async function onSetPassword() {
      if (linkShare.value && linkPassword.value) {
        await sharesStore.updateLinkShare(linkShare.value.id, props.listId, { password: linkPassword.value });
        linkPassword.value = "";
      }
    }
    async function onRemovePassword() {
      if (linkShare.value) {
        await sharesStore.updateLinkShare(linkShare.value.id, props.listId, { removePassword: true });
      }
    }
    async function onExpiryChange(value) {
      if (linkShare.value) {
        await sharesStore.updateLinkShare(linkShare.value.id, props.listId, {
          expiresAt: value || null
        });
      }
    }
    async function onDeleteLink() {
      if (linkShare.value) {
        await sharesStore.removeLinkShare(linkShare.value.id, props.listId);
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "share-overlay",
        onClick: _cache[6] || (_cache[6] = withModifiers(($event) => _ctx.$emit("close"), ["self"]))
      }, [
        createBaseVNode("div", _hoisted_1$2, [
          createBaseVNode("div", _hoisted_2$2, [
            createBaseVNode("h3", null, toDisplayString(unref(shareTitle)), 1),
            createBaseVNode("button", {
              class: "share-modal__close",
              onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("close"))
            }, "✕")
          ]),
          createBaseVNode("div", _hoisted_3$2, [
            withDirectives(createBaseVNode("input", {
              ref_key: "searchRef",
              ref: searchRef,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => searchQuery.value = $event),
              type: "text",
              placeholder: unref(searchPlaceholder),
              class: "share-modal__search-input",
              onInput: onSearchInput
            }, null, 40, _hoisted_4$2), [
              [vModelText, searchQuery.value]
            ])
          ]),
          shareeResults.value.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_5$2, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(shareeResults.value, (sharee) => {
              return openBlock(), createElementBlock("div", {
                key: sharee.value + sharee.type,
                class: "share-modal__result",
                onClick: ($event) => onSelectSharee(sharee)
              }, [
                createBaseVNode("span", _hoisted_7$2, toDisplayString(sharee.type === 1 ? "👥" : "👤"), 1),
                createBaseVNode("div", _hoisted_8$2, [
                  createBaseVNode("span", _hoisted_9$2, toDisplayString(sharee.label), 1),
                  sharee.type === 1 ? (openBlock(), createElementBlock("span", _hoisted_10$2, toDisplayString(unref(groupText)), 1)) : createCommentVNode("", true)
                ])
              ], 8, _hoisted_6$2);
            }), 128))
          ])) : searchQuery.value.length > 0 && !searching.value ? (openBlock(), createElementBlock("div", _hoisted_11$2, toDisplayString(unref(noResultsText)), 1)) : createCommentVNode("", true),
          shares.value.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_12$2, [
            createBaseVNode("div", _hoisted_13$2, toDisplayString(unref(sharedWithText)), 1),
            (openBlock(true), createElementBlock(Fragment, null, renderList(shares.value, (share) => {
              return openBlock(), createElementBlock("div", {
                key: share.id,
                class: "share-modal__share"
              }, [
                createBaseVNode("span", _hoisted_14$2, toDisplayString(share.sharedWithType === 1 ? "👥" : "👤"), 1),
                createBaseVNode("div", _hoisted_15$2, [
                  createBaseVNode("span", _hoisted_16$2, toDisplayString(share.sharedWithDisplayName), 1),
                  share.sharedWithType === 1 ? (openBlock(), createElementBlock("span", _hoisted_17$2, toDisplayString(unref(groupText)), 1)) : createCommentVNode("", true)
                ]),
                __props.isOwner ? (openBlock(), createElementBlock("select", {
                  key: 0,
                  class: "share-modal__permission",
                  value: share.permission,
                  onChange: ($event) => onPermissionChange(share.id, Number($event.target.value))
                }, [
                  createBaseVNode("option", _hoisted_19$1, toDisplayString(unref(canViewText)), 1),
                  createBaseVNode("option", _hoisted_20$1, toDisplayString(unref(canEditText)), 1)
                ], 40, _hoisted_18$1)) : createCommentVNode("", true),
                __props.isOwner || share.sharedWith === __props.currentUserId ? (openBlock(), createElementBlock("button", {
                  key: 1,
                  class: "share-modal__remove",
                  onClick: ($event) => onRemoveShare(share.id)
                }, " ✕ ", 8, _hoisted_21$1)) : createCommentVNode("", true)
              ]);
            }), 128))
          ])) : createCommentVNode("", true),
          __props.isOwner ? (openBlock(), createElementBlock("div", _hoisted_22$1, [
            createBaseVNode("div", _hoisted_23$1, toDisplayString(unref(publicLinkText)), 1),
            !linkShare.value ? (openBlock(), createElementBlock("div", _hoisted_24$1, [
              createBaseVNode("button", {
                class: "share-modal__link-btn",
                onClick: onCreateLink
              }, toDisplayString(unref(createLinkText)), 1)
            ])) : (openBlock(), createElementBlock("div", _hoisted_25$1, [
              createBaseVNode("div", _hoisted_26$1, [
                createBaseVNode("input", {
                  ref_key: "linkUrlRef",
                  ref: linkUrlRef,
                  value: linkUrl.value,
                  readonly: "",
                  class: "share-modal__link-url",
                  onFocus: _cache[2] || (_cache[2] = ($event) => $event.target.select())
                }, null, 40, _hoisted_27),
                createBaseVNode("button", {
                  class: "share-modal__link-copy",
                  onClick: onCopyLink
                }, toDisplayString(copiedLink.value ? unref(copiedText) : unref(copyText)), 1)
              ]),
              createBaseVNode("div", _hoisted_28, [
                createBaseVNode("label", _hoisted_29, [
                  createTextVNode(toDisplayString(unref(permissionLabel)) + " ", 1),
                  createBaseVNode("select", {
                    value: linkShare.value.permission,
                    class: "share-modal__permission",
                    onChange: _cache[3] || (_cache[3] = ($event) => onLinkPermissionChange(Number($event.target.value)))
                  }, [
                    createBaseVNode("option", _hoisted_31, toDisplayString(unref(canViewText)), 1),
                    createBaseVNode("option", _hoisted_32, toDisplayString(unref(canEditText)), 1)
                  ], 40, _hoisted_30)
                ]),
                createBaseVNode("label", _hoisted_33, [
                  createTextVNode(toDisplayString(unref(passwordLabel)) + " ", 1),
                  createBaseVNode("div", _hoisted_34, [
                    withDirectives(createBaseVNode("input", {
                      "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => linkPassword.value = $event),
                      type: "password",
                      placeholder: linkShare.value.hasPassword ? unref(passwordSetText) : unref(passwordPlaceholder),
                      class: "share-modal__link-input"
                    }, null, 8, _hoisted_35), [
                      [vModelText, linkPassword.value]
                    ]),
                    linkPassword.value ? (openBlock(), createElementBlock("button", {
                      key: 0,
                      class: "share-modal__link-btn share-modal__link-btn--small",
                      onClick: onSetPassword
                    }, toDisplayString(unref(saveText)), 1)) : createCommentVNode("", true),
                    linkShare.value.hasPassword && !linkPassword.value ? (openBlock(), createElementBlock("button", {
                      key: 1,
                      class: "share-modal__link-btn share-modal__link-btn--small share-modal__link-btn--danger",
                      onClick: onRemovePassword
                    }, toDisplayString(unref(removeText)), 1)) : createCommentVNode("", true)
                  ])
                ]),
                createBaseVNode("label", _hoisted_36, [
                  createTextVNode(toDisplayString(unref(expiryLabel)) + " ", 1),
                  createBaseVNode("input", {
                    type: "date",
                    value: linkShare.value.expiresAt?.split("T")[0] ?? "",
                    min: unref(todayStr),
                    class: "share-modal__link-input",
                    onChange: _cache[5] || (_cache[5] = ($event) => onExpiryChange($event.target.value))
                  }, null, 40, _hoisted_37)
                ])
              ]),
              createBaseVNode("button", {
                class: "share-modal__link-btn share-modal__link-btn--danger",
                onClick: onDeleteLink
              }, toDisplayString(unref(deleteLinkText)), 1)
            ]))
          ])) : createCommentVNode("", true),
          shares.value.length === 0 && searchQuery.value.length === 0 && !linkShare.value ? (openBlock(), createElementBlock("div", _hoisted_38, toDisplayString(unref(emptyText)), 1)) : createCommentVNode("", true)
        ])
      ]);
    };
  }
});
const ShareDialog = /* @__PURE__ */ _export_sfc$1(_sfc_main$3, [["__scopeId", "data-v-c9fb2be6"]]);
const _hoisted_1$1 = { class: "list-view" };
const _hoisted_2$1 = { class: "list-view__header" };
const _hoisted_3$1 = { class: "list-view__actions" };
const _hoisted_4$1 = {
  key: 0,
  class: "list-view__avatar-overflow"
};
const _hoisted_5$1 = { class: "list-view__card" };
const _hoisted_6$1 = {
  key: 1,
  class: "list-view__loading"
};
const _hoisted_7$1 = {
  key: 0,
  class: "list-view__empty"
};
const _hoisted_8$1 = { class: "list-view__area-name" };
const _hoisted_9$1 = { class: "list-view__area-count" };
const _hoisted_10$1 = {
  key: 1,
  class: "list-view__area-header"
};
const _hoisted_11$1 = { class: "list-view__area-name list-view__area-name--muted" };
const _hoisted_12$1 = { class: "list-view__area-count" };
const _hoisted_13$1 = {
  key: 0,
  class: "list-view__bought"
};
const _hoisted_14$1 = { class: "list-view__bought-header" };
const _hoisted_15$1 = { class: "list-view__toggle" };
const _hoisted_16$1 = {
  key: 0,
  class: "list-view__bought-actions"
};
const _hoisted_17$1 = {
  key: 0,
  class: "list-view__bought-card"
};
const MAX_VISIBLE_AVATARS = 3;
const cartIcon$1 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.25,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.59 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z" fill="currentColor"/></svg>';
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ListView",
  setup(__props) {
    const listsStore = useListsStore();
    const itemsStore = useItemsStore();
    const shopAreasStore = useShopAreasStore();
    const sharesStore = useSharesStore();
    const currentShares = computed(() => {
      const listId = listsStore.currentListId;
      return listId !== null ? sharesStore.sharesByList[listId] ?? [] : [];
    });
    const visibleShares = computed(() => currentShares.value.slice(0, MAX_VISIBLE_AVATARS));
    const overflowCount = computed(() => Math.max(0, currentShares.value.length - MAX_VISIBLE_AVATARS));
    const showChecked = ref(true);
    const showShareDialog = ref(false);
    const currentUserId = getCurrentUser()?.uid ?? "";
    const editingItemId = ref(null);
    function onCaptureClick(e) {
      const target = e.target;
      if (target.closest(".item-row__check") || target.closest(".item-row__delete")) return;
      if (target.type === "checkbox") return;
      if (isDragging.value) return;
      const row = target.closest(".item-row:not(.item-row--checked)");
      if (row) {
        const idStr = row.getAttribute("data-item-id");
        if (idStr) {
          editingItemId.value = parseInt(idStr, 10);
          return;
        }
      }
      if (editingItemId.value !== null && !target.closest(".item-row--editing")) {
        editingItemId.value = null;
      }
    }
    onMounted(() => document.addEventListener("click", onCaptureClick, true));
    onUnmounted(() => document.removeEventListener("click", onCaptureClick, true));
    const shareText = translate("shopping_list", "Share");
    const emptyName = translate("shopping_list", "No items yet");
    const emptyDesc = translate("shopping_list", "Add your first item above");
    const uncategorizedText = translate("shopping_list", "Uncategorized");
    const boughtText = translate("shopping_list", "Checked off");
    const uncheckAllText = translate("shopping_list", "Restore all");
    const clearCheckedText = translate("shopping_list", "Delete all");
    const canEdit = computed(
      () => listsStore.currentList !== null && listsStore.currentList.permission >= Permission.WRITE
    );
    const isDragging = ref(false);
    const areaGroups = computed(() => {
      const unchecked = itemsStore.uncheckedItems;
      if (unchecked.length === 0) return [];
      const grouped = /* @__PURE__ */ new Map();
      for (const item of unchecked) {
        const key = item.shopAreaId;
        if (!grouped.has(key)) {
          grouped.set(key, []);
        }
        grouped.get(key).push(item);
      }
      const areas = listsStore.currentListId ? shopAreasStore.areasByList[listsStore.currentListId] ?? [] : [];
      const result = [];
      for (const area of areas) {
        const items = grouped.get(area.id);
        if (items && items.length > 0) {
          result.push({ areaId: area.id, areaName: area.name, areaColor: area.color, items });
          grouped.delete(area.id);
        }
      }
      const uncategorizedItems = [];
      for (const [, items] of grouped) {
        uncategorizedItems.push(...items);
      }
      if (uncategorizedItems.length > 0) {
        result.push({ areaId: null, areaName: null, areaColor: null, items: uncategorizedItems });
      }
      return result;
    });
    const localGroups = ref([]);
    watch(areaGroups, (groups) => {
      if (!isDragging.value) {
        localGroups.value = groups.map((g) => ({ ...g, items: [...g.items] }));
      }
    }, { immediate: true });
    async function onDragEnd() {
      isDragging.value = false;
      const listId = listsStore.currentList?.id;
      if (!listId) return;
      const allSortedIds = [];
      const areaUpdates = [];
      for (const group of localGroups.value) {
        for (const item of group.items) {
          allSortedIds.push(item.id);
          if (item.shopAreaId !== group.areaId) {
            areaUpdates.push(itemsStore.update(listId, item.id, { shopAreaId: group.areaId, areaExplicit: true }));
          }
        }
      }
      await Promise.all([
        ...areaUpdates,
        itemsStore.reorder(listId, allSortedIds)
      ]);
    }
    const checkedItemIds = computed(
      () => itemsStore.checkedItems.map((i) => i.id)
    );
    watch(() => listsStore.currentListId, async (newId) => {
      if (newId !== null) {
        await Promise.all([
          itemsStore.fetchByList(newId),
          shopAreasStore.fetchByList(newId),
          sharesStore.fetchByList(newId)
        ]);
      }
    }, { immediate: true });
    async function onClearChecked() {
      if (listsStore.currentListId) {
        await itemsStore.clearChecked(listsStore.currentListId);
      }
    }
    async function onUncheckAll() {
      if (listsStore.currentListId) {
        await itemsStore.uncheckAll(listsStore.currentListId);
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createBaseVNode("div", _hoisted_2$1, [
          createBaseVNode("h2", null, toDisplayString(unref(listsStore).currentList?.title), 1),
          createBaseVNode("div", _hoisted_3$1, [
            currentShares.value.length > 0 ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "list-view__avatars",
              onClick: _cache[0] || (_cache[0] = ($event) => showShareDialog.value = true)
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(visibleShares.value, (share) => {
                return openBlock(), createBlock(unref(NcAvatar), {
                  key: share.id,
                  user: share.sharedWithType === unref(ShareType).USER ? share.sharedWith : void 0,
                  "display-name": share.sharedWithDisplayName || share.sharedWith,
                  "is-no-user": share.sharedWithType === unref(ShareType).GROUP,
                  size: 28,
                  "show-user-status": false,
                  class: "list-view__avatar"
                }, null, 8, ["user", "display-name", "is-no-user"]);
              }), 128)),
              overflowCount.value > 0 ? (openBlock(), createElementBlock("span", _hoisted_4$1, " +" + toDisplayString(overflowCount.value), 1)) : createCommentVNode("", true)
            ])) : createCommentVNode("", true),
            unref(listsStore).currentList?.isOwner ? (openBlock(), createElementBlock("button", {
              key: 1,
              class: "list-view__share-btn",
              onClick: _cache[1] || (_cache[1] = ($event) => showShareDialog.value = true)
            }, toDisplayString(unref(shareText)), 1)) : createCommentVNode("", true)
          ])
        ]),
        createBaseVNode("div", _hoisted_5$1, [
          canEdit.value ? (openBlock(), createBlock(ItemEditor, {
            key: 0,
            "list-id": unref(listsStore).currentList.id
          }, null, 8, ["list-id"])) : createCommentVNode("", true),
          unref(itemsStore).loading ? (openBlock(), createElementBlock("div", _hoisted_6$1, [
            createVNode(unref(NcLoadingIcon))
          ])) : (openBlock(), createElementBlock(Fragment, { key: 2 }, [
            unref(itemsStore).uncheckedItems.length === 0 && unref(itemsStore).checkedItems.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_7$1, [
              createVNode(unref(NcEmptyContent), {
                name: unref(emptyName),
                description: unref(emptyDesc)
              }, {
                icon: withCtx(() => [
                  createVNode(unref(NcIconSvgWrapper), { svg: cartIcon$1 })
                ]),
                _: 1
              }, 8, ["name", "description"])
            ])) : createCommentVNode("", true),
            (openBlock(true), createElementBlock(Fragment, null, renderList(localGroups.value, (group, groupIndex) => {
              return openBlock(), createElementBlock("div", {
                key: group.areaId ?? "none",
                class: "list-view__area-group"
              }, [
                group.areaName ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: "list-view__area-header",
                  style: normalizeStyle(group.areaColor ? { borderLeftColor: group.areaColor } : {})
                }, [
                  createBaseVNode("span", _hoisted_8$1, toDisplayString(group.areaName), 1),
                  createBaseVNode("span", _hoisted_9$1, toDisplayString(group.items.length), 1)
                ], 4)) : localGroups.value.length > 1 ? (openBlock(), createElementBlock("div", _hoisted_10$1, [
                  createBaseVNode("span", _hoisted_11$1, toDisplayString(unref(uncategorizedText)), 1),
                  createBaseVNode("span", _hoisted_12$1, toDisplayString(group.items.length), 1)
                ])) : createCommentVNode("", true),
                createVNode(unref(draggable), {
                  modelValue: localGroups.value[groupIndex].items,
                  "onUpdate:modelValue": ($event) => localGroups.value[groupIndex].items = $event,
                  "item-key": "id",
                  group: { name: "items" },
                  disabled: !canEdit.value,
                  animation: 150,
                  delay: 150,
                  "delay-on-touch-only": true,
                  class: "list-view__items",
                  "ghost-class": "list-view__item--ghost",
                  onStart: _cache[3] || (_cache[3] = ($event) => isDragging.value = true),
                  onEnd: onDragEnd
                }, {
                  item: withCtx(({ element }) => [
                    createVNode(ItemRow, {
                      "item-id": element.id,
                      "list-id": unref(listsStore).currentList.id,
                      "can-edit": canEdit.value,
                      editing: editingItemId.value === element.id,
                      onCloseEdit: _cache[2] || (_cache[2] = ($event) => editingItemId.value = null)
                    }, null, 8, ["item-id", "list-id", "can-edit", "editing"])
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
              ]);
            }), 128))
          ], 64))
        ]),
        !unref(itemsStore).loading && unref(itemsStore).checkedItems.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_13$1, [
          createBaseVNode("div", _hoisted_14$1, [
            createBaseVNode("h3", {
              onClick: _cache[4] || (_cache[4] = ($event) => showChecked.value = !showChecked.value)
            }, [
              createTextVNode(toDisplayString(unref(boughtText)) + " (" + toDisplayString(unref(itemsStore).checkedItems.length) + ") ", 1),
              createBaseVNode("span", _hoisted_15$1, toDisplayString(showChecked.value ? "▾" : "▸"), 1)
            ]),
            canEdit.value ? (openBlock(), createElementBlock("div", _hoisted_16$1, [
              createBaseVNode("button", {
                class: "list-view__action-btn",
                onClick: onUncheckAll
              }, toDisplayString(unref(uncheckAllText)), 1),
              createBaseVNode("button", {
                class: "list-view__action-btn list-view__action-btn--danger",
                onClick: onClearChecked
              }, toDisplayString(unref(clearCheckedText)), 1)
            ])) : createCommentVNode("", true)
          ]),
          showChecked.value ? (openBlock(), createElementBlock("div", _hoisted_17$1, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(checkedItemIds.value, (itemId) => {
              return openBlock(), createBlock(ItemRow, {
                key: itemId,
                "item-id": itemId,
                "list-id": unref(listsStore).currentList.id,
                "can-edit": canEdit.value,
                editing: false
              }, null, 8, ["item-id", "list-id", "can-edit"]);
            }), 128))
          ])) : createCommentVNode("", true)
        ])) : createCommentVNode("", true),
        showShareDialog.value && unref(listsStore).currentList ? (openBlock(), createBlock(ShareDialog, {
          key: 1,
          "list-id": unref(listsStore).currentList.id,
          "is-owner": unref(listsStore).currentList.isOwner,
          "current-user-id": unref(currentUserId),
          onClose: _cache[5] || (_cache[5] = ($event) => showShareDialog.value = false)
        }, null, 8, ["list-id", "is-owner", "current-user-id"])) : createCommentVNode("", true)
      ]);
    };
  }
});
const ListView = /* @__PURE__ */ _export_sfc$1(_sfc_main$2, [["__scopeId", "data-v-c48482a4"]]);
const _hoisted_1 = { class: "area-settings" };
const _hoisted_2 = { class: "area-settings__header" };
const _hoisted_3 = { class: "area-settings__desc" };
const _hoisted_4 = {
  key: 0,
  class: "area-settings__create"
};
const _hoisted_5 = ["placeholder", "onKeydown"];
const _hoisted_6 = ["title"];
const _hoisted_7 = ["disabled"];
const _hoisted_8 = { class: "area-settings__search" };
const _hoisted_9 = ["placeholder"];
const _hoisted_10 = ["onClick"];
const _hoisted_11 = { class: "area-settings__section-toggle" };
const _hoisted_12 = ["value", "title", "onInput"];
const _hoisted_13 = ["onKeydown", "onBlur"];
const _hoisted_14 = ["onDblclick"];
const _hoisted_15 = ["title", "onClick"];
const _hoisted_16 = { class: "area-settings__section-count" };
const _hoisted_17 = ["disabled", "title", "onClick"];
const _hoisted_18 = ["disabled", "title", "onClick"];
const _hoisted_19 = ["title", "onClick"];
const _hoisted_20 = {
  key: 0,
  class: "area-settings__section-body"
};
const _hoisted_21 = {
  key: 0,
  class: "area-settings__add"
};
const _hoisted_22 = ["onUpdate:modelValue", "placeholder", "onKeydown"];
const _hoisted_23 = ["disabled", "onClick"];
const _hoisted_24 = { class: "area-settings__keywords" };
const _hoisted_25 = ["onClick"];
const _hoisted_26 = {
  key: 0,
  class: "area-settings__empty"
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AreaKeywordsSettings",
  emits: ["back"],
  setup(__props) {
    const shopAreasStore = useShopAreasStore();
    const listsStore = useListsStore();
    const backText = translate("shopping_list", "Back to list");
    const title = translate("shopping_list", "Manage Areas");
    const description = translate("shopping_list", "Manage shop areas, keywords, and display order. Keywords auto-detect which area an item belongs to when added or pasted.");
    const searchPlaceholder = translate("shopping_list", "Search keywords...");
    const addPlaceholder = translate("shopping_list", "Add keyword...");
    const noKeywordsText = translate("shopping_list", "No keywords");
    const renameText = translate("shopping_list", "Rename");
    const deleteText = translate("shopping_list", "Delete area");
    const moveUpText = translate("shopping_list", "Move up");
    const moveDownText = translate("shopping_list", "Move down");
    const colorTitle = translate("shopping_list", "Change color");
    const newAreaPlaceholder = translate("shopping_list", "New area name...");
    const addAreaText = translate("shopping_list", "Add area");
    const search = ref("");
    const newKeyword = ref({});
    const openSections = ref({});
    const renamingAreaId = ref(null);
    const renameValue = ref("");
    const renameInputRef = ref(null);
    const newAreaName = ref("");
    const newAreaColor = ref("#9E9E9E");
    let saveTimeout = {};
    let colorTimeout = {};
    const listId = computed(() => listsStore.currentListId);
    const canEdit = computed(
      () => listsStore.currentList !== null && listsStore.currentList.permission >= Permission.WRITE
    );
    const areas = computed(
      () => listId.value !== null ? shopAreasStore.areasByList[listId.value] ?? [] : []
    );
    onMounted(() => {
      if (listId.value !== null) {
        shopAreasStore.fetchByList(listId.value);
      }
    });
    function filteredKeywords(area) {
      const words = area.keywords ?? [];
      const q = search.value.toLowerCase().trim();
      if (!q) return [...words].sort();
      return words.filter((w) => w.includes(q)).sort();
    }
    function toggleSection(areaId) {
      openSections.value[areaId] = !openSections.value[areaId];
    }
    function onAddKeyword(area) {
      const word = newKeyword.value[area.id]?.trim().toLowerCase();
      if (!word || listId.value === null) return;
      if (area.keywords.includes(word)) {
        newKeyword.value[area.id] = "";
        return;
      }
      const updated = [...area.keywords, word];
      area.keywords = updated;
      newKeyword.value[area.id] = "";
      debounceSaveKeywords(area.id, updated);
    }
    function onRemoveKeyword(area, word) {
      if (listId.value === null) return;
      const updated = area.keywords.filter((w) => w !== word);
      area.keywords = updated;
      debounceSaveKeywords(area.id, updated);
    }
    function debounceSaveKeywords(areaId, keywords) {
      if (saveTimeout[areaId]) clearTimeout(saveTimeout[areaId]);
      const lid = listId.value;
      saveTimeout[areaId] = setTimeout(() => {
        if (lid !== null) {
          shopAreasStore.update(lid, areaId, { keywords });
        }
      }, 1e3);
    }
    async function startRename(area) {
      renamingAreaId.value = area.id;
      renameValue.value = area.name;
      await nextTick();
      if (renameInputRef.value && renameInputRef.value.length > 0) {
        renameInputRef.value[0].focus();
        renameInputRef.value[0].select();
      }
    }
    async function saveRename(areaId) {
      const trimmed = renameValue.value.trim();
      if (!trimmed || renamingAreaId.value !== areaId || listId.value === null) {
        cancelRename();
        return;
      }
      const area = areas.value.find((a) => a.id === areaId);
      if (area && trimmed !== area.name) {
        await shopAreasStore.update(listId.value, areaId, { name: trimmed });
      }
      renamingAreaId.value = null;
    }
    function cancelRename() {
      renamingAreaId.value = null;
    }
    function onColorChange(areaId, color) {
      if (listId.value === null) return;
      const area = areas.value.find((a) => a.id === areaId);
      if (area) area.color = color;
      if (colorTimeout[areaId]) clearTimeout(colorTimeout[areaId]);
      const lid = listId.value;
      colorTimeout[areaId] = setTimeout(() => {
        shopAreasStore.update(lid, areaId, { color });
      }, 500);
    }
    async function moveArea(index2, direction) {
      if (listId.value === null) return;
      const targetIndex = index2 + direction;
      if (targetIndex < 0 || targetIndex >= areas.value.length) return;
      const current = areas.value[index2];
      const target = areas.value[targetIndex];
      const currentOrder = current.sortOrder;
      const targetOrder = target.sortOrder;
      const newCurrentOrder = currentOrder === targetOrder ? targetIndex : targetOrder;
      const newTargetOrder = currentOrder === targetOrder ? index2 : currentOrder;
      const lid = listId.value;
      await Promise.all([
        shopAreasStore.update(lid, current.id, { sortOrder: newCurrentOrder }),
        shopAreasStore.update(lid, target.id, { sortOrder: newTargetOrder })
      ]);
      await shopAreasStore.fetchByList(lid);
    }
    async function onCreateArea() {
      const name = newAreaName.value.trim();
      if (!name || listId.value === null) return;
      await shopAreasStore.create(listId.value, name, newAreaColor.value);
      newAreaName.value = "";
      newAreaColor.value = "#9E9E9E";
    }
    async function onDeleteArea(area) {
      if (listId.value === null) return;
      if (!confirm(translate("shopping_list", 'Delete "{name}"? Items in this area will become uncategorized.', { name: area.name }))) {
        return;
      }
      await shopAreasStore.remove(listId.value, area.id);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("button", {
            class: "area-settings__back",
            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("back"))
          }, " ← " + toDisplayString(unref(backText)), 1),
          createBaseVNode("h2", null, toDisplayString(unref(title)), 1),
          createBaseVNode("p", _hoisted_3, toDisplayString(unref(description)), 1)
        ]),
        canEdit.value ? (openBlock(), createElementBlock("div", _hoisted_4, [
          withDirectives(createBaseVNode("input", {
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => newAreaName.value = $event),
            type: "text",
            placeholder: unref(newAreaPlaceholder),
            class: "area-settings__create-input",
            onKeydown: withKeys(withModifiers(onCreateArea, ["prevent"]), ["enter"])
          }, null, 40, _hoisted_5), [
            [vModelText, newAreaName.value]
          ]),
          withDirectives(createBaseVNode("input", {
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => newAreaColor.value = $event),
            type: "color",
            class: "area-settings__create-color",
            title: unref(colorTitle)
          }, null, 8, _hoisted_6), [
            [vModelText, newAreaColor.value]
          ]),
          createBaseVNode("button", {
            class: "area-settings__create-btn",
            disabled: !newAreaName.value.trim(),
            onClick: onCreateArea
          }, toDisplayString(unref(addAreaText)), 9, _hoisted_7)
        ])) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_8, [
          withDirectives(createBaseVNode("input", {
            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => search.value = $event),
            type: "text",
            placeholder: unref(searchPlaceholder),
            class: "area-settings__search-input"
          }, null, 8, _hoisted_9), [
            [vModelText, search.value]
          ])
        ]),
        (openBlock(true), createElementBlock(Fragment, null, renderList(areas.value, (area, index2) => {
          return openBlock(), createElementBlock("div", {
            key: area.id,
            class: "area-settings__section"
          }, [
            createBaseVNode("div", {
              class: "area-settings__section-header",
              onClick: ($event) => toggleSection(area.id)
            }, [
              createBaseVNode("span", _hoisted_11, toDisplayString(openSections.value[area.id] ? "▾" : "▸"), 1),
              canEdit.value ? (openBlock(), createElementBlock("input", {
                key: 0,
                type: "color",
                value: area.color || "#9E9E9E",
                class: "area-settings__color-input",
                title: unref(colorTitle),
                onClick: _cache[4] || (_cache[4] = withModifiers(() => {
                }, ["stop"])),
                onInput: ($event) => onColorChange(area.id, $event.target.value)
              }, null, 40, _hoisted_12)) : (openBlock(), createElementBlock("span", {
                key: 1,
                class: "area-settings__color-swatch",
                style: normalizeStyle({ backgroundColor: area.color || "#9E9E9E" })
              }, null, 4)),
              canEdit.value && renamingAreaId.value === area.id ? withDirectives((openBlock(), createElementBlock("input", {
                key: 2,
                ref_for: true,
                ref_key: "renameInputRef",
                ref: renameInputRef,
                "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => renameValue.value = $event),
                type: "text",
                class: "area-settings__rename-input",
                onClick: _cache[6] || (_cache[6] = withModifiers(() => {
                }, ["stop"])),
                onKeydown: [
                  withKeys(withModifiers(($event) => saveRename(area.id), ["prevent"]), ["enter"]),
                  withKeys(withModifiers(cancelRename, ["prevent"]), ["escape"])
                ],
                onBlur: ($event) => saveRename(area.id)
              }, null, 40, _hoisted_13)), [
                [vModelText, renameValue.value]
              ]) : (openBlock(), createElementBlock(Fragment, { key: 3 }, [
                createBaseVNode("span", {
                  class: "area-settings__section-name",
                  onDblclick: withModifiers(($event) => canEdit.value && startRename(area), ["stop"])
                }, toDisplayString(area.name), 41, _hoisted_14),
                canEdit.value ? (openBlock(), createElementBlock("button", {
                  key: 0,
                  class: "area-settings__action-btn area-settings__action-btn--rename",
                  title: unref(renameText),
                  onClick: withModifiers(($event) => startRename(area), ["stop"])
                }, " ✎ ", 8, _hoisted_15)) : createCommentVNode("", true)
              ], 64)),
              createBaseVNode("span", _hoisted_16, toDisplayString(filteredKeywords(area).length), 1),
              canEdit.value ? (openBlock(), createElementBlock(Fragment, { key: 4 }, [
                createBaseVNode("button", {
                  class: "area-settings__action-btn",
                  disabled: index2 === 0,
                  title: unref(moveUpText),
                  onClick: withModifiers(($event) => moveArea(index2, -1), ["stop"])
                }, " ▲ ", 8, _hoisted_17),
                createBaseVNode("button", {
                  class: "area-settings__action-btn",
                  disabled: index2 === areas.value.length - 1,
                  title: unref(moveDownText),
                  onClick: withModifiers(($event) => moveArea(index2, 1), ["stop"])
                }, " ▼ ", 8, _hoisted_18),
                createBaseVNode("button", {
                  class: "area-settings__action-btn area-settings__action-btn--delete",
                  title: unref(deleteText),
                  onClick: withModifiers(($event) => onDeleteArea(area), ["stop"])
                }, " ✕ ", 8, _hoisted_19)
              ], 64)) : createCommentVNode("", true)
            ], 8, _hoisted_10),
            openSections.value[area.id] ? (openBlock(), createElementBlock("div", _hoisted_20, [
              canEdit.value ? (openBlock(), createElementBlock("div", _hoisted_21, [
                withDirectives(createBaseVNode("input", {
                  "onUpdate:modelValue": ($event) => newKeyword.value[area.id] = $event,
                  type: "text",
                  placeholder: unref(addPlaceholder),
                  class: "area-settings__add-input",
                  onKeydown: withKeys(withModifiers(($event) => onAddKeyword(area), ["prevent"]), ["enter"])
                }, null, 40, _hoisted_22), [
                  [vModelText, newKeyword.value[area.id]]
                ]),
                createBaseVNode("button", {
                  class: "area-settings__add-btn",
                  disabled: !newKeyword.value[area.id]?.trim(),
                  onClick: ($event) => onAddKeyword(area)
                }, " + ", 8, _hoisted_23)
              ])) : createCommentVNode("", true),
              createBaseVNode("div", _hoisted_24, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(filteredKeywords(area), (word) => {
                  return openBlock(), createElementBlock("span", {
                    key: word,
                    class: "area-settings__keyword"
                  }, [
                    createTextVNode(toDisplayString(word) + " ", 1),
                    canEdit.value ? (openBlock(), createElementBlock("button", {
                      key: 0,
                      class: "area-settings__keyword-remove",
                      onClick: ($event) => onRemoveKeyword(area, word)
                    }, "✕", 8, _hoisted_25)) : createCommentVNode("", true)
                  ]);
                }), 128)),
                filteredKeywords(area).length === 0 ? (openBlock(), createElementBlock("span", _hoisted_26, toDisplayString(unref(noKeywordsText)), 1)) : createCommentVNode("", true)
              ])
            ])) : createCommentVNode("", true)
          ]);
        }), 128))
      ]);
    };
  }
});
const AreaKeywordsSettings = /* @__PURE__ */ _export_sfc$1(_sfc_main$1, [["__scopeId", "data-v-fb8df544"]]);
let initialized = false;
function usePush() {
  if (initialized) return;
  initialized = true;
  const listsStore = useListsStore();
  const itemsStore = useItemsStore();
  const sharesStore = useSharesStore();
  const hasPushServer = !!window.OC?.config?.notify_push;
  if (hasPushServer) {
    try {
      __vitePreload(async () => {
        const { listen } = await import("./index-Dg8AVuSG.chunk.mjs").then((n) => n.i);
        return { listen };
      }, true ? __vite__mapDeps([0,1,2]) : void 0, import.meta.url).then(({ listen }) => {
        listen("shopping_list_item_update", () => {
          if (listsStore.currentListId) {
            itemsStore.fetchByList(listsStore.currentListId);
          }
        });
        listen("shopping_list_list_update", () => {
          listsStore.fetchAll();
        });
        listen("shopping_list_share_update", (_type, body) => {
          listsStore.fetchAll();
          if (body.listId) {
            sharesStore.fetchByList(body.listId);
          }
        });
        console.log("[ShoppingList] notify_push connected");
      }).catch(() => {
        startPolling();
      });
    } catch {
      startPolling();
    }
  } else {
    startPolling();
  }
  function startPolling() {
    console.log("[ShoppingList] Polling every 10s");
    setInterval(() => {
      listsStore.fetchAll();
      if (listsStore.currentListId) {
        itemsStore.fetchByList(listsStore.currentListId);
      }
    }, 1e4);
  }
}
const cartIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.25,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.59 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z" fill="currentColor"/></svg>';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "App",
  setup(__props) {
    const listsStore = useListsStore();
    const showSettings = ref(false);
    const noListName = translate("shopping_list", "No list selected");
    const noListDesc = translate("shopping_list", "Select a list from the sidebar or create a new one");
    onMounted(async () => {
      await listsStore.fetchAll();
      if (listsStore.lists.length > 0 && !listsStore.currentListId) {
        listsStore.selectList(listsStore.lists[0].id);
      }
      usePush();
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(NcContent), { "app-name": "shopping_list" }, {
        default: withCtx(() => [
          createVNode(unref(NcAppNavigation), null, {
            default: withCtx(() => [
              createVNode(ListSidebar, {
                onShowSettings: _cache[0] || (_cache[0] = ($event) => showSettings.value = true)
              })
            ]),
            _: 1
          }),
          createVNode(unref(NcAppContent), null, {
            default: withCtx(() => [
              showSettings.value && unref(listsStore).currentList ? (openBlock(), createBlock(AreaKeywordsSettings, {
                key: unref(listsStore).currentListId,
                onBack: _cache[1] || (_cache[1] = ($event) => showSettings.value = false)
              })) : unref(listsStore).currentList ? (openBlock(), createBlock(ListView, { key: 1 })) : (openBlock(), createBlock(unref(NcEmptyContent), {
                key: 2,
                name: unref(noListName),
                description: unref(noListDesc)
              }, {
                icon: withCtx(() => [
                  createVNode(unref(NcIconSvgWrapper), { svg: cartIcon })
                ]),
                _: 1
              }, 8, ["name", "description"]))
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
});
const app = createApp(_sfc_main);
app.use(createPinia());
app.mount("#shopping_list");
//# sourceMappingURL=shopping_list-main.mjs.map

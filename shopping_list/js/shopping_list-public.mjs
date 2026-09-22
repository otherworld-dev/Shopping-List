const appName = "shopping_list";
const appVersion = "1.8.0";
import { k as defineComponent, E as translate, aB as useCollapsedAreas, ag as onMounted, aQ as publicApi, o as openBlock, c as createElementBlock, b as createBaseVNode, t as toDisplayString, w as withDirectives, al as vModelText, aj as withKeys, ak as withModifiers, p as unref, l as createCommentVNode, d as createVNode, ai as NcLoadingIcon, J as Fragment, K as renderList, am as normalizeStyle, n as normalizeClass, aE as mdiChevronDown, a as NcIconSvgWrapper, aF as vShow, i as createTextVNode, L as createBlock, ap as ImageViewer, z as ref, B as computed, aR as publicItemImageUrl, aq as Permission, Q as _export_sfc, ae as loadState, aN as createPinia, aO as offlinePersistPlugin, aP as createApp } from "./useCollapsedAreas-wqIaE6uS.chunk.mjs";
const _hoisted_1$1 = { class: "public-list" };
const _hoisted_2$1 = { class: "public-list__card" };
const _hoisted_3$1 = {
  key: 0,
  class: "public-list__editor"
};
const _hoisted_4$1 = ["placeholder", "onKeydown"];
const _hoisted_5$1 = {
  key: 1,
  class: "public-list__loading"
};
const _hoisted_6$1 = {
  key: 0,
  class: "public-list__empty"
};
const _hoisted_7$1 = ["aria-expanded", "aria-controls", "onClick"];
const _hoisted_8$1 = { class: "public-list__area-count" };
const _hoisted_9 = ["id"];
const _hoisted_10 = { class: "public-list__check" };
const _hoisted_11 = ["checked", "disabled", "onChange"];
const _hoisted_12 = ["aria-label", "onClick"];
const _hoisted_13 = ["src", "onError"];
const _hoisted_14 = {
  key: 1,
  class: "public-list__quantity"
};
const _hoisted_15 = {
  key: 2,
  class: "public-list__area"
};
const _hoisted_16 = {
  key: 0,
  class: "public-list__bought"
};
const _hoisted_17 = { class: "public-list__toggle" };
const _hoisted_18 = {
  key: 0,
  class: "public-list__bought-card"
};
const _hoisted_19 = { class: "public-list__check" };
const _hoisted_20 = ["disabled", "onChange"];
const _hoisted_21 = ["aria-label", "onClick"];
const _hoisted_22 = ["src", "onError"];
const _hoisted_23 = {
  key: 1,
  class: "public-list__quantity"
};
const _hoisted_24 = { class: "public-list__name public-list__name--checked" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "PublicListView",
  props: {
    token: {},
    title: {},
    permission: {}
  },
  setup(__props) {
    const props = __props;
    const items = ref([]);
    const areas = ref([]);
    const loading = ref(true);
    const showChecked = ref(true);
    const emptyText = translate("shopping_list", "No items yet");
    const uncategorizedText = translate("shopping_list", "Uncategorized");
    const boughtText = translate("shopping_list", "Checked off");
    const addItemText = translate("shopping_list", "Add an item to list...");
    const viewImageLabel = translate("shopping_list", "View image");
    const editorRef = ref(null);
    const newItemName = ref("");
    const canEdit = computed(() => props.permission >= Permission.WRITE);
    const brokenThumbs = ref(/* @__PURE__ */ new Set());
    const viewerItem = ref(null);
    const viewerUrl = computed(() => viewerItem.value ? publicItemImageUrl(props.token, viewerItem.value, "full") : null);
    function thumbUrl(item) {
      if (brokenThumbs.value.has(item.id)) return null;
      return publicItemImageUrl(props.token, item, "thumbnail");
    }
    const uncheckedItems = computed(() => items.value.filter((i) => !i.checked));
    const checkedItems = computed(() => items.value.filter((i) => i.checked));
    const areaGroups = computed(() => {
      const unchecked = uncheckedItems.value;
      if (unchecked.length === 0) return [];
      const grouped = /* @__PURE__ */ new Map();
      for (const item of unchecked) {
        const key = item.shopAreaId;
        if (!grouped.has(key)) grouped.set(key, []);
        grouped.get(key).push(item);
      }
      const result = [];
      for (const area of areas.value) {
        const areaItems = grouped.get(area.id);
        if (areaItems && areaItems.length > 0) {
          result.push({ areaId: area.id, areaName: area.name, areaColor: area.color, items: areaItems });
          grouped.delete(area.id);
        }
      }
      const uncategorized = [];
      for (const [, groupItems] of grouped) {
        uncategorized.push(...groupItems);
      }
      if (uncategorized.length > 0) {
        result.push({ areaId: null, areaName: null, areaColor: null, items: uncategorized });
      }
      return result;
    });
    const { isCollapsed, toggle: toggleArea } = useCollapsedAreas(
      () => areas.value[0]?.listId ?? items.value[0]?.listId ?? null
    );
    function hasHeader(group) {
      return !!group.areaName || areaGroups.value.length > 1;
    }
    function isGroupCollapsed(group) {
      return hasHeader(group) && isCollapsed(group.areaId);
    }
    function groupElementId(group) {
      return `public-list-area-${group.areaId ?? "none"}`;
    }
    function getAreaName(areaId) {
      if (areaId === null) return null;
      return areas.value.find((a) => a.id === areaId)?.name ?? null;
    }
    function getAreaColor(areaId) {
      if (areaId === null) return null;
      return areas.value.find((a) => a.id === areaId)?.color ?? null;
    }
    onMounted(async () => {
      try {
        const [itemsRes, areasRes] = await Promise.all([
          publicApi.getItems(props.token),
          publicApi.getAreas(props.token)
        ]);
        items.value = itemsRes.data.ocs.data;
        areas.value = areasRes.data.ocs.data;
      } catch (e) {
        console.error("Failed to load public list", e);
      } finally {
        loading.value = false;
      }
    });
    async function onAddItem() {
      const name = newItemName.value.trim();
      if (!name) return;
      newItemName.value = "";
      try {
        const response = await publicApi.createItem(props.token, { name, quantity: "1" });
        items.value.push(response.data.ocs.data);
      } catch (e) {
        console.error("Failed to add item", e);
      }
      editorRef.value?.focus();
    }
    async function onToggleCheck(item) {
      const newChecked = !item.checked;
      item.checked = newChecked;
      try {
        await publicApi.checkItem(props.token, item.id, newChecked);
      } catch {
        item.checked = !newChecked;
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createBaseVNode("h2", null, toDisplayString(__props.title), 1),
        createBaseVNode("div", _hoisted_2$1, [
          canEdit.value ? (openBlock(), createElementBlock("div", _hoisted_3$1, [
            _cache[3] || (_cache[3] = createBaseVNode("span", { class: "public-list__editor-plus" }, "+", -1)),
            withDirectives(createBaseVNode("input", {
              ref_key: "editorRef",
              ref: editorRef,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => newItemName.value = $event),
              type: "text",
              enterkeyhint: "send",
              placeholder: unref(addItemText),
              class: "public-list__editor-input",
              onKeydown: withKeys(withModifiers(onAddItem, ["prevent"]), ["enter"])
            }, null, 40, _hoisted_4$1), [
              [vModelText, newItemName.value]
            ])
          ])) : createCommentVNode("", true),
          loading.value ? (openBlock(), createElementBlock("div", _hoisted_5$1, [
            createVNode(unref(NcLoadingIcon))
          ])) : (openBlock(), createElementBlock(Fragment, { key: 2 }, [
            uncheckedItems.value.length === 0 && checkedItems.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_6$1, toDisplayString(unref(emptyText)), 1)) : createCommentVNode("", true),
            (openBlock(true), createElementBlock(Fragment, null, renderList(areaGroups.value, (group) => {
              return openBlock(), createElementBlock("div", {
                key: group.areaId ?? "none",
                class: "public-list__area-group"
              }, [
                hasHeader(group) ? (openBlock(), createElementBlock("button", {
                  key: 0,
                  type: "button",
                  class: "public-list__area-header",
                  style: normalizeStyle(group.areaColor ? { borderLeftColor: group.areaColor } : {}),
                  "aria-expanded": !isGroupCollapsed(group),
                  "aria-controls": groupElementId(group),
                  onClick: ($event) => unref(toggleArea)(group.areaId)
                }, [
                  createVNode(unref(NcIconSvgWrapper), {
                    path: unref(mdiChevronDown),
                    size: 18,
                    class: normalizeClass(["public-list__area-chevron", { "public-list__area-chevron--collapsed": isGroupCollapsed(group) }])
                  }, null, 8, ["path", "class"]),
                  createBaseVNode("span", {
                    class: normalizeClass(["public-list__area-name", { "public-list__area-name--muted": !group.areaName }])
                  }, toDisplayString(group.areaName || unref(uncategorizedText)), 3),
                  createBaseVNode("span", _hoisted_8$1, toDisplayString(group.items.length), 1)
                ], 12, _hoisted_7$1)) : createCommentVNode("", true),
                withDirectives(createBaseVNode("div", {
                  id: groupElementId(group),
                  class: "public-list__items"
                }, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(group.items, (item) => {
                    return openBlock(), createElementBlock("div", {
                      key: item.id,
                      class: normalizeClass(["public-list__item", { "public-list__item--checked": item.checked }])
                    }, [
                      createBaseVNode("label", _hoisted_10, [
                        createBaseVNode("input", {
                          type: "checkbox",
                          checked: item.checked,
                          disabled: !canEdit.value,
                          onChange: ($event) => onToggleCheck(item)
                        }, null, 40, _hoisted_11)
                      ]),
                      thumbUrl(item) ? (openBlock(), createElementBlock("button", {
                        key: 0,
                        type: "button",
                        class: "public-list__thumb",
                        "aria-label": unref(viewImageLabel),
                        onClick: ($event) => viewerItem.value = item
                      }, [
                        createBaseVNode("img", {
                          src: thumbUrl(item),
                          alt: "",
                          draggable: "false",
                          loading: "lazy",
                          decoding: "async",
                          onError: ($event) => brokenThumbs.value.add(item.id)
                        }, null, 40, _hoisted_13)
                      ], 8, _hoisted_12)) : createCommentVNode("", true),
                      item.quantity ? (openBlock(), createElementBlock("span", _hoisted_14, toDisplayString(item.quantity) + toDisplayString(item.unit ? " " + item.unit : ""), 1)) : createCommentVNode("", true),
                      createBaseVNode("span", {
                        class: normalizeClass(["public-list__name", { "public-list__name--checked": item.checked }])
                      }, toDisplayString(item.name), 3),
                      getAreaName(item.shopAreaId) ? (openBlock(), createElementBlock("span", _hoisted_15, [
                        getAreaColor(item.shopAreaId) ? (openBlock(), createElementBlock("span", {
                          key: 0,
                          class: "public-list__area-dot",
                          style: normalizeStyle({ backgroundColor: getAreaColor(item.shopAreaId) })
                        }, null, 4)) : createCommentVNode("", true),
                        createTextVNode(" " + toDisplayString(getAreaName(item.shopAreaId)), 1)
                      ])) : createCommentVNode("", true)
                    ], 2);
                  }), 128))
                ], 8, _hoisted_9), [
                  [vShow, !isGroupCollapsed(group)]
                ])
              ]);
            }), 128))
          ], 64))
        ]),
        !loading.value && checkedItems.value.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_16, [
          createBaseVNode("h3", {
            onClick: _cache[1] || (_cache[1] = ($event) => showChecked.value = !showChecked.value)
          }, [
            createTextVNode(toDisplayString(unref(boughtText)) + " (" + toDisplayString(checkedItems.value.length) + ") ", 1),
            createBaseVNode("span", _hoisted_17, toDisplayString(showChecked.value ? "▾" : "▸"), 1)
          ]),
          showChecked.value ? (openBlock(), createElementBlock("div", _hoisted_18, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(checkedItems.value, (item) => {
              return openBlock(), createElementBlock("div", {
                key: item.id,
                class: "public-list__item public-list__item--checked"
              }, [
                createBaseVNode("label", _hoisted_19, [
                  createBaseVNode("input", {
                    type: "checkbox",
                    checked: true,
                    disabled: !canEdit.value,
                    onChange: ($event) => onToggleCheck(item)
                  }, null, 40, _hoisted_20)
                ]),
                thumbUrl(item) ? (openBlock(), createElementBlock("button", {
                  key: 0,
                  type: "button",
                  class: "public-list__thumb",
                  "aria-label": unref(viewImageLabel),
                  onClick: ($event) => viewerItem.value = item
                }, [
                  createBaseVNode("img", {
                    src: thumbUrl(item),
                    alt: "",
                    draggable: "false",
                    loading: "lazy",
                    decoding: "async",
                    onError: ($event) => brokenThumbs.value.add(item.id)
                  }, null, 40, _hoisted_22)
                ], 8, _hoisted_21)) : createCommentVNode("", true),
                item.quantity ? (openBlock(), createElementBlock("span", _hoisted_23, toDisplayString(item.quantity) + toDisplayString(item.unit ? " " + item.unit : ""), 1)) : createCommentVNode("", true),
                createBaseVNode("span", _hoisted_24, toDisplayString(item.name), 1)
              ]);
            }), 128))
          ])) : createCommentVNode("", true)
        ])) : createCommentVNode("", true),
        viewerItem.value && viewerUrl.value ? (openBlock(), createBlock(ImageViewer, {
          key: 1,
          src: viewerUrl.value,
          name: viewerItem.value.name,
          onClose: _cache[2] || (_cache[2] = ($event) => viewerItem.value = null)
        }, null, 8, ["src", "name"])) : createCommentVNode("", true)
      ]);
    };
  }
});
const PublicListView = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-4624d33e"]]);
const _hoisted_1 = { class: "public-app" };
const _hoisted_2 = {
  key: 0,
  class: "public-app__loading"
};
const _hoisted_3 = {
  key: 1,
  class: "public-app__password"
};
const _hoisted_4 = { class: "public-app__password-card" };
const _hoisted_5 = ["placeholder"];
const _hoisted_6 = ["disabled"];
const _hoisted_7 = {
  key: 0,
  class: "public-app__password-error"
};
const _hoisted_8 = {
  key: 2,
  class: "public-app__error"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PublicApp",
  setup(__props) {
    const token = loadState("shopping_list", "public_token");
    const loading = ref(true);
    const needsPassword = ref(false);
    const notFound = ref(false);
    const listTitle = ref("");
    const listPermission = ref(Permission.READ);
    const password = ref("");
    const passwordError = ref(false);
    const passwordRef = ref(null);
    const passwordTitle = translate("shopping_list", "Password required");
    const passwordDesc = translate("shopping_list", "This list is password protected.");
    const passwordPlaceholder = translate("shopping_list", "Enter password");
    const unlockText = translate("shopping_list", "Unlock");
    const passwordErrorText = translate("shopping_list", "Incorrect password");
    const notFoundTitle = translate("shopping_list", "Not found");
    const notFoundDesc = translate("shopping_list", "This shared list does not exist or has expired.");
    onMounted(async () => {
      try {
        const response = await publicApi.getList(token);
        const data = response.data.ocs.data;
        if (data.passwordRequired) {
          needsPassword.value = true;
        } else {
          listTitle.value = data.title;
          listPermission.value = data.permission;
        }
      } catch (e) {
        const err = e;
        if (err.response?.status === 403 && err.response?.data?.ocs?.data?.passwordRequired) {
          needsPassword.value = true;
        } else {
          notFound.value = true;
        }
      } finally {
        loading.value = false;
      }
    });
    async function onSubmitPassword() {
      passwordError.value = false;
      try {
        const response = await publicApi.auth(token, password.value);
        const data = response.data.ocs.data;
        listTitle.value = data.title;
        listPermission.value = data.permission;
        needsPassword.value = false;
      } catch {
        passwordError.value = true;
        password.value = "";
        passwordRef.value?.focus();
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        loading.value ? (openBlock(), createElementBlock("div", _hoisted_2, [
          createVNode(unref(NcLoadingIcon))
        ])) : needsPassword.value ? (openBlock(), createElementBlock("div", _hoisted_3, [
          createBaseVNode("div", _hoisted_4, [
            createBaseVNode("h2", null, toDisplayString(unref(passwordTitle)), 1),
            createBaseVNode("p", null, toDisplayString(unref(passwordDesc)), 1),
            createBaseVNode("form", {
              onSubmit: withModifiers(onSubmitPassword, ["prevent"])
            }, [
              withDirectives(createBaseVNode("input", {
                ref_key: "passwordRef",
                ref: passwordRef,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => password.value = $event),
                type: "password",
                placeholder: unref(passwordPlaceholder),
                class: "public-app__password-input",
                autofocus: ""
              }, null, 8, _hoisted_5), [
                [vModelText, password.value]
              ]),
              createBaseVNode("button", {
                type: "submit",
                class: "public-app__password-btn",
                disabled: !password.value
              }, toDisplayString(unref(unlockText)), 9, _hoisted_6),
              passwordError.value ? (openBlock(), createElementBlock("p", _hoisted_7, toDisplayString(unref(passwordErrorText)), 1)) : createCommentVNode("", true)
            ], 32)
          ])
        ])) : notFound.value ? (openBlock(), createElementBlock("div", _hoisted_8, [
          createBaseVNode("h2", null, toDisplayString(unref(notFoundTitle)), 1),
          createBaseVNode("p", null, toDisplayString(unref(notFoundDesc)), 1)
        ])) : (openBlock(), createBlock(PublicListView, {
          key: 3,
          token: unref(token),
          title: listTitle.value,
          permission: listPermission.value
        }, null, 8, ["token", "title", "permission"]))
      ]);
    };
  }
});
const PublicApp = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5c4ee2ce"]]);
const pinia = createPinia();
pinia.use(offlinePersistPlugin);
const app = createApp(PublicApp);
app.use(pinia);
app.mount("#shopping_list_public");
//# sourceMappingURL=shopping_list-public.mjs.map

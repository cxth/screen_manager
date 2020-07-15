(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/AdminComponent.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/AdminComponent.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    source: String
  },
  data: function data() {
    return {
      selected_outlet: null,
      selected_screen: null,
      selected_mediagroup: null,
      selected_link: null,
      selected_link_name: null,
      selected_link_url: null,
      outlets: null,
      media_assets: null,
      links: null,
      // custom URL
      newURL: null,
      newURL_name: null,
      isFormValid: true,
      // Layout
      drawer: null,
      drawerRight: null,
      screen: 1,
      screenm: null
    };
  },
  created: function created() {
    this.$vuetify.theme.dark = true;
    this.getOutlets();
    this.getMediaAssets();
    this.getLinks();
  },
  methods: {
    getOutlets: function getOutlets() {
      var _this = this;

      axios__WEBPACK_IMPORTED_MODULE_0___default.a.get("".concat(this.siteURL, "/api/screen/all")).then(function (response) {
        var combined = {};
        response.data.forEach(function (arrayItem) {
          if (!(Object.keys(arrayItem) in combined)) combined[Object.keys(arrayItem)] = Object.values(arrayItem);
          combined[Object.keys(arrayItem)].push(Object.values(arrayItem)[0]);
        });
        _this.outlets = combined;
      })["catch"](function (e) {
        _this.errors.push(e);
      });
    },
    getMediaAssets: function getMediaAssets() {
      var _this2 = this;

      axios__WEBPACK_IMPORTED_MODULE_0___default.a.get("".concat(this.siteURL, "/api/media/all")).then(function (response) {
        // DON'T TOUCH
        _this2.media_assets = response.data;
        localStorage.name = 'Cxian';
      })["catch"](function (e) {
        _this2.errors.push(e);
      });
    },
    getLinks: function getLinks() {
      var _this3 = this;

      axios__WEBPACK_IMPORTED_MODULE_0___default.a.get("".concat(this.siteURL, "/api/l")).then(function (response) {
        var newlinks = {};
        response.data.forEach(function (arrayItem) {
          newlinks[arrayItem.id] = arrayItem;
        });
        _this3.links = newlinks;
        console.log(_this3.links[14].url);
      })["catch"](function (e) {
        console.log('links not working');

        _this3.errors.push(e);
      });
    },
    outletSelect: function outletSelect(event) {
      // `event` is the native DOM event
      if (event) {
        var i = event.currentTarget.id.split('.');
        this.selected_outlet = i[0];
        this.selected_screen = i[1];
      }
    },
    linkSelect: function linkSelect(event) {
      // `event` is the native DOM event
      if (event) {
        //console.log(event.currentTarget.id);
        var i = event.currentTarget.id.split('.');
        this.selected_mediagroup = i[0];
        this.selected_link = i[1];
        this.selected_link_name = this.links[this.selected_link].name;
        this.selected_link_url = this.links[this.selected_link].url;
        console.log(this.selected_link_name);
        console.log(this.selected_link_url); // clear custom URL

        this.newURL = null;
        this.newURL_name = null;
        this.isFormValid = false;
      }
    },
    addLink: function addLink(event) {
      var _this4 = this;

      axios__WEBPACK_IMPORTED_MODULE_0___default()({
        method: 'post',
        url: "".concat(this.siteURL, "/api/l"),
        data: {
          media__asset_id: 100,
          name: this.newURL_name,
          url: this.newURL
        }
      }).then(function (response) {
        console.log(response.data);
        alert("link save");
      })["catch"](function (e) {
        _this4.errors.push(e);
      });
    },
    addSched: function addSched(event) {
      var _this5 = this;

      console.log(this.newURL);
      console.log(this.newURL_name); // @todo: clean data validation

      if (this.selected_screen == null) {
        alert('no screen selected');
        return;
      }

      if (!this.newURL || !this.newURL_name) {
        alert('Please complete URL fields');
        return;
      }

      if (this.selected_link == null) {
        // @TODO: validate URL, name
        var newURL_id = this.addLink();

        if (newURL_id == "") {
          return;
        } // @TODO check failure here


        var mydata = {
          screen_id: this.selected_screen,
          link_id: newURL_id,
          url: this.newURL,
          show_datetime: this.now()
        };
      } else {
        var mydata = {
          screen_id: this.selected_screen,
          link_id: this.selected_link,
          url: this.selected_link_url,
          show_datetime: this.now()
        };
      }

      axios__WEBPACK_IMPORTED_MODULE_0___default()({
        method: 'post',
        url: "".concat(this.siteURL, "/api/schedule/screen/").concat(this.selected_screen),
        data: mydata
      }).then(function (response) {
        console.log(response);
        alert("schedule save"); // @TODO: clear forms on save
      })["catch"](function (e) {
        _this5.errors.push(e);
      });
    },
    disableMedia: function disableMedia(event) {
      //alert('something');
      this.selected_mediagroup = null;
      this.selected_link = null;
      this.selected_link_name = null;
      this.selected_link_url = null;
    },
    // Helpers
    now: function now() {
      return moment().format('YYYY-MM-DD HH:mm:ss');
    },
    trimObj: function trimObj(objArr) {
      return Object.assign.apply(Object, [{}].concat(_toConsumableArray(objArr)));
    },
    toArray: function toArray(obj) {
      //return Object.keys(obj).map((key) => [obj[key]]);
      return Object.entries(obj);
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/AdminComponent.vue?vue&type=template&id=a603f2ce&":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/AdminComponent.vue?vue&type=template&id=a603f2ce& ***!
  \*****************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-app",
    { attrs: { id: "inspire" } },
    [
      _c(
        "v-navigation-drawer",
        {
          attrs: { app: "", clipped: "", right: "" },
          model: {
            value: _vm.drawerRight,
            callback: function($$v) {
              _vm.drawerRight = $$v
            },
            expression: "drawerRight"
          }
        },
        [
          _c(
            "v-list-item",
            { attrs: { link: "" } },
            [
              _c(
                "v-list-item-action",
                [_c("v-icon", [_vm._v("mdi-folder-multiple-image")])],
                1
              ),
              _vm._v(" "),
              _c(
                "v-list-item-content",
                [_c("v-list-item-title", [_vm._v("Media Assets")])],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-list",
            { attrs: { dense: "" } },
            [
              _c(
                "v-list-item",
                { attrs: { link: "" } },
                [
                  _c(
                    "v-expansion-panels",
                    _vm._l(_vm.media_assets, function(asset, i) {
                      return _c(
                        "v-expansion-panel",
                        { key: i },
                        [
                          _c("v-expansion-panel-header", [
                            _vm._v(_vm._s(asset.name))
                          ]),
                          _vm._v(" "),
                          _c(
                            "v-expansion-panel-content",
                            [
                              _c(
                                "v-list",
                                { attrs: { dense: "" } },
                                [
                                  _c(
                                    "v-list-item-group",
                                    {
                                      attrs: { color: "primary" },
                                      model: {
                                        value: _vm.screen,
                                        callback: function($$v) {
                                          _vm.screen = $$v
                                        },
                                        expression: "screen"
                                      }
                                    },
                                    _vm._l(asset.links, function(link, i) {
                                      return _c(
                                        "v-list-item",
                                        {
                                          key: i,
                                          attrs: {
                                            id: asset.name + "." + link.id
                                          },
                                          on: { click: _vm.linkSelect }
                                        },
                                        [
                                          _c(
                                            "v-list-item-content",
                                            [
                                              _c("v-list-item-title", {
                                                domProps: {
                                                  textContent: _vm._s(link.name)
                                                }
                                              })
                                            ],
                                            1
                                          )
                                        ],
                                        1
                                      )
                                    }),
                                    1
                                  )
                                ],
                                1
                              )
                            ],
                            1
                          )
                        ],
                        1
                      )
                    }),
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-app-bar",
        { attrs: { app: "", "clipped-right": "", dark: "" } },
        [
          _c("v-app-bar-nav-icon", {
            on: {
              click: function($event) {
                $event.stopPropagation()
                _vm.drawer = !_vm.drawer
              }
            }
          }),
          _vm._v(" "),
          _c("v-toolbar-title", [_vm._v("Screen Manager")]),
          _vm._v(" "),
          _c("v-spacer"),
          _vm._v(" "),
          _c("v-app-bar-nav-icon", {
            on: {
              click: function($event) {
                $event.stopPropagation()
                _vm.drawerRight = !_vm.drawerRight
              }
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-navigation-drawer",
        {
          attrs: { app: "" },
          model: {
            value: _vm.drawer,
            callback: function($$v) {
              _vm.drawer = $$v
            },
            expression: "drawer"
          }
        },
        [
          _c(
            "v-list-item",
            { attrs: { link: "" } },
            [
              _c("v-list-item-action", [_c("v-icon", [_vm._v("mdi-home")])], 1),
              _vm._v(" "),
              _c(
                "v-list-item-content",
                [_c("v-list-item-title", [_vm._v("Outlets")])],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-list",
            { attrs: { dense: "" } },
            [
              _c(
                "v-list-item",
                { attrs: { link: "" } },
                [
                  _c(
                    "v-expansion-panels",
                    _vm._l(_vm.outlets, function(item, name) {
                      return _c(
                        "v-expansion-panel",
                        { key: name },
                        [
                          _c("v-expansion-panel-header", [
                            _vm._v(_vm._s(name))
                          ]),
                          _vm._v(" "),
                          _c(
                            "v-expansion-panel-content",
                            [
                              _c(
                                "v-list",
                                { attrs: { dense: "" } },
                                [
                                  _c(
                                    "v-list-item-group",
                                    { attrs: { color: "primary" } },
                                    _vm._l(item, function(screen, screen_i) {
                                      return _c(
                                        "v-list-item",
                                        {
                                          key: screen_i,
                                          attrs: {
                                            id:
                                              screen.outlet_name +
                                              "." +
                                              screen.id
                                          },
                                          on: { click: _vm.outletSelect }
                                        },
                                        [
                                          _c(
                                            "v-list-item-icon",
                                            [
                                              _c("v-icon", {
                                                domProps: {
                                                  textContent: _vm._s(
                                                    screen.admin_icon
                                                  )
                                                }
                                              })
                                            ],
                                            1
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "v-list-item-content",
                                            [
                                              _c("v-list-item-title", {
                                                domProps: {
                                                  textContent: _vm._s(screen.id)
                                                }
                                              })
                                            ],
                                            1
                                          )
                                        ],
                                        1
                                      )
                                    }),
                                    1
                                  )
                                ],
                                1
                              )
                            ],
                            1
                          )
                        ],
                        1
                      )
                    }),
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-list-item",
                { attrs: { link: "" } },
                [
                  _c(
                    "v-list-item-action",
                    [_c("v-icon", [_vm._v("mdi-cog")])],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-list-item-content",
                    [_c("v-list-item-title", [_vm._v("Settings")])],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-main",
        [
          _c(
            "v-container",
            { staticClass: "fill-height", attrs: { fluid: "" } },
            [
              [
                _c(
                  "v-row",
                  { attrs: { justify: "center", align: "center" } },
                  [
                    _c(
                      "v-col",
                      { staticClass: "shrink" },
                      [
                        _c(
                          "v-card",
                          {
                            staticClass: "mx-auto",
                            attrs: { width: "600", height: "400", outlined: "" }
                          },
                          [
                            _c(
                              "v-row",
                              { attrs: { "no-gutters": "" } },
                              [
                                _c(
                                  "v-col",
                                  [
                                    _c(
                                      "v-list-item",
                                      { attrs: { "three-line": "" } },
                                      [
                                        _c(
                                          "v-list-item-content",
                                          [
                                            _c(
                                              "div",
                                              { staticClass: "overline mb-4" },
                                              [_vm._v("ASSIGN SCREEN")]
                                            ),
                                            _vm._v(" "),
                                            _c("v-list-item-subtitle", [
                                              _vm._v(
                                                _vm._s(_vm.selected_outlet)
                                              )
                                            ]),
                                            _vm._v(" "),
                                            _c(
                                              "v-list-item-title",
                                              { staticClass: "headline mb-4" },
                                              [
                                                _vm._v(
                                                  _vm._s(_vm.selected_screen)
                                                )
                                              ]
                                            )
                                          ],
                                          1
                                        )
                                      ],
                                      1
                                    )
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "v-col",
                                  [
                                    _c(
                                      "v-list-item",
                                      { attrs: { "three-line": "" } },
                                      [
                                        _c(
                                          "v-list-item-content",
                                          [
                                            _c(
                                              "div",
                                              { staticClass: "overline mb-4" },
                                              [_vm._v("ASSIGN CONTENT")]
                                            ),
                                            _vm._v(" "),
                                            _c("v-list-item-subtitle", [
                                              _vm._v(
                                                _vm._s(_vm.selected_mediagroup)
                                              )
                                            ]),
                                            _vm._v(" "),
                                            _c(
                                              "v-list-item-title",
                                              { staticClass: "headline mb-4" },
                                              [
                                                _vm._v(
                                                  _vm._s(_vm.selected_link_name)
                                                )
                                              ]
                                            )
                                          ],
                                          1
                                        )
                                      ],
                                      1
                                    )
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c("v-responsive", { attrs: { width: "100%" } })
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "v-row",
                              {
                                attrs: {
                                  "no-gutters": "",
                                  align: "center",
                                  justify: "center"
                                }
                              },
                              [
                                _c(
                                  "v-col",
                                  { attrs: { cols: "32", sm: "10" } },
                                  [
                                    _c("v-text-field", {
                                      attrs: {
                                        label: "or enter URL",
                                        outlined: "",
                                        dense: "",
                                        disabled: !_vm.isFormValid
                                      },
                                      on: { keyup: _vm.disableMedia },
                                      model: {
                                        value: _vm.newURL,
                                        callback: function($$v) {
                                          _vm.newURL = $$v
                                        },
                                        expression: "newURL"
                                      }
                                    }),
                                    _vm._v(" "),
                                    _c("v-text-field", {
                                      attrs: {
                                        label: "URL Name",
                                        outlined: "",
                                        dense: ""
                                      },
                                      model: {
                                        value: _vm.newURL_name,
                                        callback: function($$v) {
                                          _vm.newURL_name = $$v
                                        },
                                        expression: "newURL_name"
                                      }
                                    })
                                  ],
                                  1
                                )
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "v-row",
                              {
                                attrs: {
                                  "no-gutters": "",
                                  align: "center",
                                  justify: "center"
                                }
                              },
                              [
                                _c(
                                  "v-col",
                                  { attrs: { cols: "12", sm: "2" } },
                                  [
                                    _c(
                                      "v-btn",
                                      {
                                        attrs: {
                                          rounded: "",
                                          color: "primary",
                                          dark: ""
                                        },
                                        on: { click: _vm.addSched }
                                      },
                                      [_vm._v("SAVE")]
                                    )
                                  ],
                                  1
                                )
                              ],
                              1
                            )
                          ],
                          1
                        )
                      ],
                      1
                    )
                  ],
                  1
                )
              ]
            ],
            2
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-footer",
        { staticClass: "white--text", attrs: { app: "" } },
        [
          _c("span", [_vm._v("Vuetify")]),
          _vm._v(" "),
          _c("v-spacer"),
          _vm._v(" "),
          _c("span", [_vm._v("© " + _vm._s(new Date().getFullYear()))])
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./resources/js/components/AdminComponent.vue":
/*!****************************************************!*\
  !*** ./resources/js/components/AdminComponent.vue ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AdminComponent_vue_vue_type_template_id_a603f2ce___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AdminComponent.vue?vue&type=template&id=a603f2ce& */ "./resources/js/components/AdminComponent.vue?vue&type=template&id=a603f2ce&");
/* harmony import */ var _AdminComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AdminComponent.vue?vue&type=script&lang=js& */ "./resources/js/components/AdminComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _AdminComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AdminComponent_vue_vue_type_template_id_a603f2ce___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AdminComponent_vue_vue_type_template_id_a603f2ce___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/AdminComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/AdminComponent.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** ./resources/js/components/AdminComponent.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AdminComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./AdminComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/AdminComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AdminComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/AdminComponent.vue?vue&type=template&id=a603f2ce&":
/*!***********************************************************************************!*\
  !*** ./resources/js/components/AdminComponent.vue?vue&type=template&id=a603f2ce& ***!
  \***********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AdminComponent_vue_vue_type_template_id_a603f2ce___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./AdminComponent.vue?vue&type=template&id=a603f2ce& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/AdminComponent.vue?vue&type=template&id=a603f2ce&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AdminComponent_vue_vue_type_template_id_a603f2ce___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AdminComponent_vue_vue_type_template_id_a603f2ce___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ActiveScreensComponent.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/ActiveScreensComponent.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************/
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

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      no_content: 'No active screen',
      screens: [],
      outlets: [],
      timer: ''
    };
  },
  created: function created() {//this.getActiveScreens()
  },
  mounted: function mounted() {
    var _this = this;

    // check every 5 minutes - 300000
    // check every minutes - 60000
    this.getActiveScreens();
    window.setInterval(function () {
      _this.getActiveScreens();
    }, 300000);
  },
  methods: {
    getActiveScreens: function getActiveScreens(event) {
      var _this2 = this;

      axios__WEBPACK_IMPORTED_MODULE_0___default.a.get("".concat(this.siteURL, "/api/screen/active")).then(function (response) {
        if (response.data.length > 0) {
          var data = [];
          var active_outlets = [];
          var active_screens = [];
          response.data.forEach(function (val, key, map) {
            if (typeof active_screens[val.outlet_name] === 'undefined') {
              active_screens[val.outlet_name] = [val];
              active_outlets.push(val);
            } else {
              data = active_screens[val.outlet_name];
              active_screens[val.outlet_name] = [];
              active_screens[val.outlet_name] = [].concat(_toConsumableArray(data), [val]);
            }
          });
          _this2.outlets = active_outlets;
          _this2.screens = active_screens;
        } else {
          console.log('no active screen');
        }
      })["catch"](function (e) {
        // setTimeout(function() {
        //     this.getActiveScreens()
        //   }, 3000)
        _this2.errors.push(e);
      });
    },
    cancelAutoUpdate: function cancelAutoUpdate() {
      clearInterval(this.timer);
    }
  },
  beforeDestroy: function beforeDestroy() {
    clearInterval(this.timer);
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/AddOutletComponent.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/AddOutletComponent.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
  props: ['getOutlets'],
  data: function data() {
    return {
      newOutlet_name: "",
      newOutlet_id: "",
      rules: {
        required: function required(value) {
          return !!value || 'Required.';
        },
        counter: function counter(value) {
          return value.length <= 50 || 'Max 50 characters';
        },
        outlet: function outlet(value) {
          var pattern = /^[A-Z]{2}-[0-9]{3}$/;
          return pattern.test(value) || 'Invalid Outlet ID.';
        }
      },
      errors: []
    };
  },
  methods: {
    addOutlet: function addOutlet(e) {
      var _this = this;

      this.errors = [];

      if (this.newOutlet_id == "" || this.newOutlet_name == "") {
        alert('Please fill outlet name and ID fields.');
        return;
      }

      if (!this.validOutletID(this.newOutlet_id)) {
        this.errors.push('Valid Outlet ID required.');
        return;
      }

      axios({
        method: 'post',
        url: "".concat(this.siteURL, "/api/outlet"),
        data: {
          outlet_name: this.newOutlet_name,
          outlet_id: this.newOutlet_id
        }
      }).then(function (response) {
        if (response.data == 'outlet-exist') {
          alert('Outlet ID: ' + _this.newOutlet_id + ' already exist');
        } else {
          alert('Outlet successfully added');
        }

        _this.getOutlets();

        _this.clearNewOutlet();
      })["catch"](function (e) {
        _this.errors.push(e);
      });

      if (!this.errors.length) {
        return true;
      }

      e.preventDefault();
    },
    clearNewOutlet: function clearNewOutlet() {
      this.newOutlet_name = "";
      this.newOutlet_id = "";
    },
    validOutletID: function validOutletID(outletid) {
      var re = /^[A-Z]{2}-[0-9]{3}$/;
      return re.test(outletid);
    }
  }
});

/***/ }),

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
/* harmony import */ var _CalendarComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CalendarComponent */ "./resources/js/components/CalendarComponent.vue");
/* harmony import */ var _MediaAssetsComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MediaAssetsComponent */ "./resources/js/components/MediaAssetsComponent.vue");
/* harmony import */ var _ActiveScreensComponent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ActiveScreensComponent */ "./resources/js/components/ActiveScreensComponent.vue");
/* harmony import */ var _OutletsComponent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./OutletsComponent */ "./resources/js/components/OutletsComponent.vue");
/* harmony import */ var _ScreenSchedComponent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ScreenSchedComponent */ "./resources/js/components/ScreenSchedComponent.vue");
/* harmony import */ var _InfoComponent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./InfoComponent */ "./resources/js/components/InfoComponent.vue");
/* harmony import */ var _AddOutletComponent__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./AddOutletComponent */ "./resources/js/components/AddOutletComponent.vue");
/* harmony import */ var _UploadFileComponent__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./UploadFileComponent */ "./resources/js/components/UploadFileComponent.vue");
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
//
//









/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    source: String
  },
  components: {
    calendar: _CalendarComponent__WEBPACK_IMPORTED_MODULE_1__["default"],
    media_asset_component: _MediaAssetsComponent__WEBPACK_IMPORTED_MODULE_2__["default"],
    active_screens_component: _ActiveScreensComponent__WEBPACK_IMPORTED_MODULE_3__["default"],
    outlets_component: _OutletsComponent__WEBPACK_IMPORTED_MODULE_4__["default"],
    screensched_component: _ScreenSchedComponent__WEBPACK_IMPORTED_MODULE_5__["default"],
    info_component: _InfoComponent__WEBPACK_IMPORTED_MODULE_6__["default"],
    add_outlet_component: _AddOutletComponent__WEBPACK_IMPORTED_MODULE_7__["default"],
    upload_file_component: _UploadFileComponent__WEBPACK_IMPORTED_MODULE_8__["default"]
  },
  data: function data() {
    return {
      screen_autologin: null,
      screen_now_showing: null,
      screen_resolution: null,
      screen_activation_date: null,
      screen_equipment_model_installed: null,
      screen_teamviewer_details: null,
      screen_key: null,
      selected: {
        // media assets
        mediagroup: null,
        link: null,
        link_name: null,
        link_url: null,
        // outlet list
        outlet: null,
        outlet_id: null,
        outlet_screen: null,
        screen: null,
        screen_name: null,
        screen_resolution: null,
        //screen_activation_dates: null,
        screen_equipment_model_installed: null,
        screen_teamviewer_details: null,
        // schedule
        screen_schedule: null
      },
      outlets: null,
      media_assets: null,
      links: null,
      clear_URL: false,
      newURL_id: null,
      newScreen: null,
      form: {
        is_form_valid: false
      },
      // Layout
      drawer: null,
      drawerRight: null,
      left: false,
      // Schedule
      calendar: {
        today: '2020-01-01',
        events: []
      },
      // Upload File
      file_upload_dialog: false
    };
  },
  mounted: function mounted() {//this.$refs.calendar.scrollToTime('08:00')
  },
  created: function created() {
    this.$vuetify.theme.dark = true;
    this.getOutlets();
    this.getMediaAssets();
    this.getLinks();
    this.calendar.today = this.momentNow('date');
  },
  methods: {
    /**
     * @attached to LinkSelect()
     * @used to enable `custom URL` fields
     * @return null
     */
    clearnewURL: function clearnewURL(event) {
      this.form.is_form_valid = false;

      if (!this.clear_URL) {
        this.clear_URL = true;
        return;
      }

      if (this.clear_URL) {
        this.clear_URL = false;
        return;
      }
    },

    /**
     * @attached to created()
     * @used to get outlet list
     * @return this.outlets Array
     */
    getOutlets: function getOutlets() {
      var _this = this;

      axios__WEBPACK_IMPORTED_MODULE_0___default.a.get("".concat(this.siteURL, "/api/screen/all")).then(function (response) {
        var combined = {};
        response.data.forEach(function (arrayItem) {
          if (!(Object.keys(arrayItem) in combined)) {
            combined[Object.keys(arrayItem)] = Object.values(arrayItem);
          } else {
            combined[Object.keys(arrayItem)].push(Object.values(arrayItem)[0]);
          }
        });
        _this.outlets = combined; //console.log(this.outlets['eB Vasra (NDM Center)'][0].description)
      })["catch"](function (e) {
        _this.errors.push(e);

        console.log('error getting outlet list. reloading..');
        setTimeout(function () {
          location.reload();
        }, 5000);
      });
    },

    /**
     * @attached to created()
     * @used to get media assets group
     * @return this.media_assets Array
     */
    getMediaAssets: function getMediaAssets() {
      var _this2 = this;

      axios__WEBPACK_IMPORTED_MODULE_0___default.a.get("".concat(this.siteURL, "/api/media/all")).then(function (response) {
        _this2.media_assets = response.data;
      })["catch"](function (e) {
        _this2.errors.push(e);

        console.log('error getting media assets. reloading..');
        setTimeout(function () {
          location.reload();
        }, 5000);
      });
    },

    /**
     * @attached to created()
     * @used to get links
     * @return this.links Array
     */
    getLinks: function getLinks() {
      var _this3 = this;

      axios__WEBPACK_IMPORTED_MODULE_0___default.a.get("".concat(this.siteURL, "/api/l")).then(function (response) {
        var newlinks = {};
        response.data.forEach(function (arrayItem) {
          newlinks[arrayItem.id] = arrayItem;
        });
        _this3.links = newlinks;
      })["catch"](function (e) {
        _this3.errors.push(e);

        console.log('error getting links. reloading..');
        setTimeout(function () {
          location.reload();
        }, 5000);
      });
    },

    /**
     * @attached to screenSelect()
     * @on outlet_component
     * @use to get select screen current content
     * @return selected.mediagroup, selected.link_name
     * @param Array screen[0] => screen_id, screen[1] => screen_key
     */
    getSelectedScreenInfo: function getSelectedScreenInfo(screen) {
      var _this4 = this;

      this.screen_key = screen[1];
      this.countOutletScreens(); // get content of screen

      axios__WEBPACK_IMPORTED_MODULE_0___default()({
        method: 'get',
        url: "".concat(this.siteURL, "/api/schedule/ss/").concat(screen[0])
      }).then(function (response) {
        _this4.selected.link_name = '';
        _this4.selected.mediagroup = '';
        _this4.screen_now_showing = "No current content";
        _this4.form.is_form_valid = true;

        if (response.data.length > 0) {
          _this4.selected.link_name = response.data[0][_this4.selected.outlet].link_name;
          _this4.screen_now_showing = response.data[0][_this4.selected.outlet].link_name;
          _this4.selected.mediagroup = response.data[0][_this4.selected.outlet].media_asset_name;
          _this4.form.is_form_valid = false;
        }
      })["catch"](function (e) {
        _this4.errors.push(e);

        console.log('error getting schedule');
      });
    },

    /**
     * @attached to getSelectedScreenInfo()
     * @on same class
     * @use count screen in selected outlet
     * @return int
     */
    countOutletScreens: function countOutletScreens() {
      var _this5 = this;

      axios__WEBPACK_IMPORTED_MODULE_0___default()({
        method: 'get',
        url: "".concat(this.siteURL, "/api/countscreens/").concat(this.selected.outlet_id)
      }).then(function (response) {
        _this5.selected.outlet_screen = response.data;
      })["catch"](function (e) {
        _this5.errors.push(e);

        console.log('error countOutletScreens');
      });
    },

    /**
     * @attached to saveScreenNotes()
     * @on info_component
     * @use to get new screen name
     * @return selected.screen_name
     */
    refreshScreen: function refreshScreen(new_screen_name) {
      this.selected.screen_name = new_screen_name;
      this.outlets[this.selected.outlet][this.screen_key].description = new_screen_name;
    },

    /**
     * @attached to refreshActivationDate()
     * @on info_component
     * @use to refresh activation date on update
     * @return this.screen_activation_date
     */
    refreshScreenActivation: function refreshScreenActivation(new_activation_date) {
      this.screen_activation_date = new_activation_date;
    },

    /**
     * @attached to props
     * @on media_asset component
     * @use to refresh data after link rename
     * @return 
     */
    refreshLinks: function refreshLinks(newLinkName) {
      this.getMediaAssets();
      this.getLinks();
      this.getScreenSched(); // refresh calendar

      this.getSelectedScreenInfo([this.selected.screen, this.screen_key]); // refresh screen info
    },

    /**
     * @attached to props
     * @on outlet_component
     * @use to get select screen current schedule for calendar component
     * @return selected.screen_schedule, calendar.events, screen_now_showing
     */
    getScreenSched: function getScreenSched() {
      var _this6 = this;

      axios__WEBPACK_IMPORTED_MODULE_0___default()({
        method: 'get',
        url: "".concat(this.siteURL, "/api/schedule/ss/").concat(this.selected.screen)
      }).then(function (response) {
        if (response.data) {
          _this6.selected.screen_schedule = response.data;
          _this6.calendar.events = _this6.eventsFormat();
        }
      })["catch"](function (e) {
        _this6.errors.push(e);

        console.log('error getting schedule for calendar');
      });
    },

    /**
     * @attached to props
     * @on outlet_component
     * @use to get selected screen auto-login for info component
     * @return screen_autologin
     */
    getScreenAutologin: function getScreenAutologin() {
      var _this7 = this;

      axios__WEBPACK_IMPORTED_MODULE_0___default()({
        method: 'post',
        url: "".concat(this.siteURL, "/api/screen/login"),
        data: {
          screen_id: this.selected.screen
        }
      }).then(function (response) {
        _this7.screen_autologin = "".concat(_this7.siteURL, "/client?r=").concat(response.data);
      })["catch"](function (e) {
        _this7.errors.push(e);

        console.log('error getting auto login');
      });
    },

    /**
     * @attached to props
     * @on outlet_component
     * @use to get selected screen auto-login for info component
     * @return screen_resolution, screen_activation_dates, screen_equipment_model_installed, screen_teamviewer_details
     */
    getScreenNotes: function getScreenNotes() {
      var _this8 = this;

      //console.log('getting notes..')
      this.screen_resolution = '';
      this.screen_equipment_model_installed = '';
      this.screen_teamviewer_details = '';
      this.screen_activation_date = '';
      axios__WEBPACK_IMPORTED_MODULE_0___default()({
        method: 'get',
        url: "".concat(this.siteURL, "/api/getscreen/").concat(this.selected.screen)
      }).then(function (response) {
        if (response.data) {
          _this8.screen_resolution = response.data.resolution;
          _this8.screen_activation_date = response.data.activation_date;
          _this8.screen_equipment_model_installed = response.data.equipment_model_installed;
          _this8.screen_teamviewer_details = response.data.teamviewer_details;
        }
      })["catch"](function (e) {
        _this8.errors.push(e);

        console.log('error getting schedule');
      });
    },

    /**
     * @attached deleteLink()
     * @on media asset component
     * @use delete link on media asset list
     * @return 
     */
    deleteLink: function deleteLink(event) {
      var _this9 = this;

      if (confirm("DANGER! Are you sure you like to DELETE this link?")) {
        axios__WEBPACK_IMPORTED_MODULE_0___default.a["delete"]("".concat(this.siteURL, "/api/l/").concat(event)).then(function (response) {
          alert("link deleted");

          _this9.getSelectedScreenInfo([_this9.selected.screen, _this9.screen_key]);

          _this9.getMediaAssets();

          _this9.resetData(); // reset all selected media and links


          _this9.getScreenSched(); // refresh calendar

        })["catch"](function (e) {
          _this9.errors.push(e);
        });
      }

      return;
    },

    /**
     * @attached on props
     * @on screen_sched component
     * @use to reset select links and media asset
     * @return selected null
     * 
     */
    resetData: function resetData() {
      this.selected.link = null;
      this.selected.link_url = null;
      this.selected.link_name = null;
      this.selected.mediagroup = null;
    },

    /**
     * @attached local method
     * @on admin component
     * @use logout
     * @return null
     * 
     */
    logout: function logout() {
      var _this10 = this;

      if (confirm("Are you sure you like to logout?")) {
        axios__WEBPACK_IMPORTED_MODULE_0___default.a.get("".concat(this.siteURL, "/logout")).then(function (response) {
          location.reload();
        })["catch"](function (e) {
          _this10.errors.push(e);
        });
      }
    },
    closeDialog: function closeDialog() {
      this.file_upload_dialog = false;
    },
    // Helpers =================
    momentNow: function momentNow(p) {
      if (p) {
        return dayjs().format('YYYY-MM-DD');
      }

      return dayjs().format('YYYY-MM-DD HH:mm:ss');
    },
    trimObj: function trimObj(objArr) {
      return Object.assign.apply(Object, [{}].concat(_toConsumableArray(objArr)));
    },
    toArray: function toArray(obj) {
      return Object.entries(obj);
    },
    eventsFormat: function eventsFormat() {
      var esched = [];
      this.selected.screen_schedule.forEach(function (val, key, map) {
        var event_name = val[Object.keys(val)].link_name;
        var event_start = val[Object.keys(val)].show_datetime;
        var event_end = val[Object.keys(val)].expire_datetime;
        var entry = {
          name: event_name,
          start: event_start,
          end: event_end
        };

        if (event_end == null) {
          delete entry.end;
        }

        esched.push(entry);
      });
      return esched;
    }
  } // methods
  // computed: {
  //   outlet: {
  //     get: function(event) {
  //       return this.getOutlets()
  //     },
  //     set: function(newValue) {
  //       return this.getOutlets()
  //     }
  //   }
  // },

});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/CalendarComponent.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/CalendarComponent.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
    calendar: Object,
    selected: Object
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/InfoComponent.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/InfoComponent.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ScreenActivatedComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ScreenActivatedComponent */ "./resources/js/components/ScreenActivatedComponent.vue");
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
  components: {
    active_screen_component: _ScreenActivatedComponent__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  props: ['screen_autologin', 'screen_now_showing', 'screen_resolution', 'screen_activation_date', 'screen_equipment_model_installed', 'screen_teamviewer_details', 'selected'],
  data: function data() {
    return {
      int_resolution: '',
      int_equipment_model: '',
      int_teamviewer: '',
      int_screen_name: ''
    };
  },
  methods: {
    saveScreenNotes: function saveScreenNotes(event) {
      var _this = this;

      var mydata = {
        id: this.selected.screen,
        description: this.int_screen_name ? this.int_screen_name : this.selected.screen_name,
        resolution: this.int_resolution ? this.int_resolution : this.screen_resolution,
        equipment_model_installed: this.int_equipment_model ? this.int_equipment_model : this.screen_equipment_model_installed,
        teamviewer_details: this.int_teamviewer ? this.int_teamviewer : this.screen_teamviewer_details
      };
      axios({
        method: 'post',
        url: "".concat(this.siteURL, "/api/getscreen"),
        data: mydata
      }).then(function (response) {
        if (response.data != "no-request") {}

        _this.int_resolution = '';
        _this.int_equipment_model = '';
        _this.int_teamviewer = '';
        _this.int_screen_name = '';
      })["catch"](function (e) {
        _this.errors.push(e);
      });
      this.$emit('saveScreenNotes', mydata.description);
    },
    renameScreen: function renameScreen() {
      if (this.int_screen_name == '') {
        alert('Enter a valid name');
        return;
      }

      if (!this.selected.screen) {
        return;
      }

      if (confirm("Are you sure you like to rename the screen?")) {
        this.saveScreenNotes('name');
      }
    },
    refreshActivationDate: function refreshActivationDate(newActivationDate) {
      this.$emit('refreshActivationDate', newActivationDate);
    },
    toDeleteScreen: function toDeleteScreen() {
      if (!confirm('DANGER: This will remove all schedules and login for this screen. \r\nAre you sure you want to DELETE this screen?')) {
        return;
      }

      var screen = this.selected.screen;
      this.deleteScreen(screen);
      alert('Screen deleted. click OK to reload the page.');
      setTimeout(function () {
        location.reload();
      }, 1500);
    },
    toDeactivateOutlet: function toDeactivateOutlet() {
      var _this2 = this;

      if (!confirm('DANGER: This will remove all screens and schedules for this outlet . \r\nAre you sure you want to DEACTIVATE this outlet?')) {
        return;
      } // get screen IDs


      axios.get("".concat(this.siteURL, "/api/getscreens/").concat(this.selected.outlet_id)).then(function (response) {
        var screens = response.data;
        screens.forEach(function (val, key, map) {
          _this2.deleteScreen(val.id);
        });

        _this2.deactivateOutlet(_this2.selected.outlet_id);

        alert('Outlet has been deactivated. Click OK to reload the page.');
        setTimeout(function () {
          location.reload();
        }, 1500);
      })["catch"](function (e) {
        _this2.errors.push(e);
      });
    },
    deleteScreen: function deleteScreen(screen) {
      var _this3 = this;

      axios["delete"]("".concat(this.siteURL, "/api/screen/").concat(screen)).then(function (response) {})["catch"](function (e) {
        _this3.errors.push(e);
      });
    },
    deactivateOutlet: function deactivateOutlet(outlet) {
      var _this4 = this;

      axios["delete"]("".concat(this.siteURL, "/api/outlet/").concat(outlet)).then(function (response) {})["catch"](function (e) {
        _this4.errors.push(e);
      });
    }
  },
  created: function created() {
    this.int_resolution = this.screen_resolution;
    this.int_equipment_model = this.screen_equipment_model_installed;
    this.int_teamviewer = this.screen_teamviewer_details;
  },
  computed: {
    resolution: {
      get: function get(event) {
        return this.screen_resolution;
      },
      set: function set(newValue) {
        this.int_resolution = newValue;
      }
    },
    equipment_model_installed: {
      get: function get(event) {
        return this.screen_equipment_model_installed;
      },
      set: function set(newValue) {
        this.int_equipment_model = newValue;
      }
    },
    teamviewer: {
      get: function get(event) {
        return this.screen_teamviewer_details;
      },
      set: function set(newValue) {
        this.int_teamviewer = newValue;
      }
    },
    screen_name: {
      get: function get(event) {
        return this.selected.screen_name;
      },
      set: function set(newValue) {
        this.int_screen_name = newValue;
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/MediaAssetsComponent.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/MediaAssetsComponent.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
  props: ['media_assets', 'selected', 'links', 'form', 'deleteLink', 'getLinks'],
  data: function data() {
    return {
      rename_field: false,
      a: '',
      b: '',
      int_link_id: '',
      int_link_name: '',
      int_newlink_name: ''
    };
  },
  methods: {
    linkSelect: function linkSelect(event) {
      if (event) {
        var i = event.currentTarget.id.split('**');
        this.selected.mediagroup = i[0];
        this.selected.link = i[1];
        this.selected.link_name = this.links[this.selected.link].name;
        this.selected.link_url = this.links[this.selected.link].url;
        this.form.is_form_valid = false;
        this.$emit('linkSelect', 'deliver some values');
      }
    },
    linkRename: function linkRename(event) {
      this.int_link_id = event[0];
      this.int_link_name = event[1];
      this.a = event[2];
      this.b = event[3];
      this.rename_field = true; //this.$refs.linkname.focus()
    },
    setLinkName: function setLinkName() {
      var _this = this;

      if (this.int_link_name != this.int_newlink_name) {
        if (!confirm('Are you sure you like rename this link?')) {
          this.rename_field = false;
          return;
        }

        axios({
          method: 'patch',
          url: "".concat(this.siteURL, "/api/l/").concat(this.int_link_id),
          data: {
            name: this.int_newlink_name
          }
        }).then(function (response) {
          if (response.data == "updated") {
            _this.selected.link_name = _this.int_newlink_name;

            _this.$emit('setLinkName', _this.int_newlink_name);
          }
        })["catch"](function (e) {
          _this.errors.push(e);
        });
      }

      this.rename_field = false;
    }
  },
  computed: {
    link_name: {
      get: function get(event) {
        return this.int_link_name;
      },
      set: function set(newValue) {
        this.int_newlink_name = newValue;
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/OutletsComponent.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/OutletsComponent.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
  props: ['outlets', 'selected', 'getScreenSched', 'getScreenAutologin', 'getScreenNotes', 'getOutlets'],
  data: function data() {
    return {
      deleted: 'BB-401SS6',
      add_screen_panel: false,
      newScreen: "",
      rules: {
        counter: function counter(value) {
          return value.length <= 25 || 'Max 25 characters';
        }
      }
    };
  },
  methods: {
    outletSelect: function outletSelect(event) {
      this.newScreen = "";
    },
    addNewScreen: function addNewScreen(event) {
      var _this = this;

      if (this.newScreen == "") {
        alert('Please enter screen name');
        return;
      }

      if (!confirm("Are you sure you like add this screen?")) {
        return;
      }

      var i = event.currentTarget.id.split('**');
      axios({
        method: 'post',
        url: "".concat(this.siteURL, "/api/").concat(i[0], "/screen"),
        data: {
          outlet_id: i[0],
          outlet_intid: i[1],
          screen_description: this.newScreen
        }
      }).then(function (response) {
        if (response.data == "Saved") {
          _this.getOutlets();
        }
      })["catch"](function (e) {
        _this.errors.push(e);
      });
    },
    screenSelect: function screenSelect(event) {
      if (event) {
        var i = event.currentTarget.id.split('**');
        this.selected.outlet = i[0];
        this.selected.screen = i[1];
        this.selected.screen_name = i[2];
        this.selected.outlet_id = i[4];
        this.getScreenSched();
        this.getScreenAutologin();
        this.getScreenNotes(); // i[1] - screen ID, i[3] - screen key, 1[4] - outlet-ID

        this.$emit('screenSelect', [i[1], i[3]]);
        this.add_screen_panel = false;
      }
    },
    openLink: function openLink(link) {
      window.open("".concat(this.siteURL, "/admin/").concat(link));
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ScreenActivatedComponent.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/ScreenActivatedComponent.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
  props: ['screen_activation_date', 'selected'],
  data: function data() {
    return {
      menu: false
    };
  },
  watch: {
    menu: function menu(val) {
      var _this = this;

      val && setTimeout(function () {
        return _this.$refs.picker.activePicker = 'YEAR';
      });
    }
  },
  methods: {
    save: function save(date) {
      var _this2 = this;

      axios({
        method: 'post',
        url: "".concat(this.siteURL, "/api/getscreen"),
        data: {
          id: this.selected.screen,
          activation_date: date
        }
      }).then(function (response) {})["catch"](function (e) {
        _this2.errors.push(e);

        console.log('error getting auto login');
      });
      this.$refs.menu.save(date);
      this.$emit('save', date);
    }
  },
  created: function created() {
    this.date = this.screen_activation_date;
  },
  computed: {
    date: {
      get: function get(event) {
        return this.screen_activation_date;
      },
      set: function set(newEvent) {}
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ScreenSchedComponent.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/ScreenSchedComponent.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
  props: ['selected', 'media_assets', 'form', 'is_form_valid', 'clear_URL', 'momentNow', 'resetData', 'getSelectedScreenInfo', 'screen_key', 'getScreenSched', 'getMediaAssets', 'getLinks'],
  data: function data() {
    return {
      media_asset_id: 100,
      //default for 'custom links'
      newURL: "",
      newURL_name: "",
      rules: {
        counter: function counter(value) {
          return value.length <= 50 || 'Max 50 characters';
        },
        url: function url(value) {
          var pattern = /^https:\/\//;
          return pattern.test(value) || 'URL should start in https://';
        }
      }
    };
  },
  watch: {
    clear_URL: function clear_URL(event) {
      this.newURL = '';
      this.newURL_name = '';
    }
  },
  computed: {
    media_items: {
      get: function get(event) {
        var datax = [];
        this.media_assets.map(function (media_assets, index) {
          datax.push({
            id: media_assets.id,
            name: media_assets.name
          });
        });
        return datax;
      },
      set: function set(newValue) {}
    }
  },
  methods: {
    addSched: function addSched(event) {
      var _this = this;

      if (this.selected.screen == null) {
        alert('No screen selected');
        return;
      }

      if (this.selected.link == null) {
        if (this.newURL == "" || this.newURL_name == "") {
          alert('Please complete URL fields');
          return;
        }

        if (/^https:\/\//.test(this.newURL) == false) {
          alert('URL should be in https://');
          return;
        }

        var mydata = {
          screen_id: this.selected.screen,
          link_name: this.newURL_name,
          url: this.newURL,
          media__asset_id: this.media_asset_id,
          show_datetime: this.momentNow()
        };
      } else {
        var mydata = {
          screen_id: this.selected.screen,
          link_id: this.selected.link,
          url: this.selected.link_url,
          show_datetime: this.momentNow()
        };
      }

      console.log('saving schedule: ');
      console.log(mydata);
      axios({
        method: 'post',
        url: "".concat(this.siteURL, "/api/schedule/screen/").concat(this.selected.screen),
        data: mydata
      }).then(function (response) {
        console.log(response);
        alert("Schedule saved");

        _this.getSelectedScreenInfo([_this.selected.screen, _this.screen_key]);

        _this.getScreenSched(); // refresh for custom URL


        _this.getMediaAssets();

        _this.getLinks();

        _this.intclearURL();
      })["catch"](function (e) {
        _this.errors.push(e);
      });
    },
    intclearURL: function intclearURL() {
      this.newURL = '';
      this.newURL_name = '';
    },
    // new URL keyup
    disableMedia: function disableMedia(event) {
      this.form.is_form_valid = true;
      this.selected.mediagroup = null;
      this.selected.link = null;
      this.selected.link_name = null;
      this.selected.link_url = null;
      this.$emit('disableMedia', 'message from disable media');
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/UploadFileComponent.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/UploadFileComponent.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UploadFiles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UploadFiles */ "./resources/js/components/UploadFiles.vue");
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
  components: {
    upload_files: _UploadFiles__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  props: ['file_upload_dialog'],
  data: function data() {
    return {
      //dialog: true,
      notifications: false,
      sound: true,
      widgets: false
    };
  },
  methods: {
    setUploadDialog: function setUploadDialog() {
      this.$emit('setUploadDialog', false);
    }
  },
  computed: {// dialog: {
    //   get: function (event) {
    //     return this.file_upload_dialog
    //   },
    //   set: function (newVal) {
    //     return false
    //   }
    // }
  },
  watch: {// dialog: function(newVal, oldVal) {
    //   console.log('dialog newval: ' + newVal)
    //   console.log('dialog oldval: ' + oldVal)
    // }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/UploadFiles.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/UploadFiles.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_UploadFilesService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/UploadFilesService */ "./resources/js/services/UploadFilesService.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

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

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "upload-files",
  data: function data() {
    return {
      selectedFiles: '',
      currentFile: undefined,
      progress: 0,
      message: "",
      fileInfos: [],
      vfile: [],
      vname: '',
      items: [],
      loading: false,
      search: '',
      selected: [],
      rules: {
        required: function required(value) {
          return !!value || 'Required.';
        }
      }
    };
  },
  methods: {
    selectFile: function selectFile() {
      this.selectedFiles = this.vfile;
    },
    upload: function upload() {
      var _this = this;

      if (!this.selectFile) {
        return;
      }

      if (!this.vname) {
        return;
      }

      this.progress = 0;
      this.currentFile = this.selectedFiles;
      _services_UploadFilesService__WEBPACK_IMPORTED_MODULE_0__["default"].upload(this.currentFile, this.vname, function (event) {
        _this.progress = Math.round(100 * event.loaded / event.total);
      }).then(function (response) {
        console.log('im uploading');
        console.log(response.data);
        _this.message = response.data.message;
        return _services_UploadFilesService__WEBPACK_IMPORTED_MODULE_0__["default"].getFiles();
      }).then(function (files) {
        //this.fileInfos = files.data;
        _this.items = files.data;
        alert('File uploaded');
        _this.selectedFiles = undefined;
        _this.vfile = [];
        _this.vname = '';
      })["catch"](function () {
        _this.progress = 0;
        _this.message = "Could not upload the file!";
        _this.currentFile = undefined;
      });
    },
    openClip: function openClip(link) {
      window.open("".concat(this.siteURL, "/watch?v=").concat(link));
    },
    deleteClip: function deleteClip(id) {
      var _this2 = this;

      if (!confirm('Are you sure you like to delete this clip?')) {
        return;
      }

      console.log(id);
      axios["delete"]("".concat(this.siteURL, "/api/clip/delete/").concat(id)).then(function (response) {
        console.log(response.data);
        alert('Clip deleted');
        _services_UploadFilesService__WEBPACK_IMPORTED_MODULE_0__["default"].getFiles().then(function (response) {
          _this2.items = response.data;
        });
      })["catch"](function (e) {
        _this2.errors.push(e);
      });
    },
    dateDay: function dateDay(value) {
      if (value) {
        return dayjs(String(value)).format('MMM D');
      }
    },
    next: function next() {
      var _this3 = this;

      this.loading = true;
      setTimeout(function () {
        _this3.search = '';
        _this3.selected = [];
        _this3.loading = false;
      }, 2000);
    }
  },
  mounted: function mounted() {
    var _this4 = this;

    _services_UploadFilesService__WEBPACK_IMPORTED_MODULE_0__["default"].getFiles().then(function (response) {
      _this4.items = response.data;
    });
  },
  computed: {
    allSelected: function allSelected() {
      return this.selected.length === this.items.length;
    },
    categories: function categories() {
      var search = this.search.toLowerCase();
      if (!search) return this.items;
      return this.items.filter(function (item) {
        var text = item.name.toLowerCase();
        return text.indexOf(search) > -1;
      });
    },
    selections: function selections() {
      var selections = [];

      var _iterator = _createForOfIteratorHelper(this.selected),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var selection = _step.value;
          selections.push(selection);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return selections;
    }
  },
  watch: {
    selected: function selected() {
      this.search = '';
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/CalendarComponent.vue?vue&type=style&index=0&id=56bbe5f8&scoped=true&lang=css&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/CalendarComponent.vue?vue&type=style&index=0&id=56bbe5f8&scoped=true&lang=css& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.my-event[data-v-56bbe5f8] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  border-radius: 2px;\n  background-color: #1867c0;\n  color: #ffffff;\n  border: 1px solid #1867c0;\n  font-size: 12px;\n  padding: 3px;\n  cursor: pointer;\n  margin-bottom: 1px;\n  left: 4px;\n  margin-right: 8px;\n  position: relative;\n}\n.my-event.with-time[data-v-56bbe5f8] {\n  position: absolute;\n  right: 4px;\n  margin-right: 0px;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/UploadFiles.vue?vue&type=style&index=0&lang=css&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/UploadFiles.vue?vue&type=style&index=0&lang=css& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.result{\r\n  height:300px;/* or any height you want */\r\n  overflow-y:auto\n}\r\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/CalendarComponent.vue?vue&type=style&index=0&id=56bbe5f8&scoped=true&lang=css&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/CalendarComponent.vue?vue&type=style&index=0&id=56bbe5f8&scoped=true&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--6-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--6-2!../../../node_modules/vue-loader/lib??vue-loader-options!./CalendarComponent.vue?vue&type=style&index=0&id=56bbe5f8&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/CalendarComponent.vue?vue&type=style&index=0&id=56bbe5f8&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/UploadFiles.vue?vue&type=style&index=0&lang=css&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/UploadFiles.vue?vue&type=style&index=0&lang=css& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--6-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--6-2!../../../node_modules/vue-loader/lib??vue-loader-options!./UploadFiles.vue?vue&type=style&index=0&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/UploadFiles.vue?vue&type=style&index=0&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ActiveScreensComponent.vue?vue&type=template&id=48e6c887&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/ActiveScreensComponent.vue?vue&type=template&id=48e6c887& ***!
  \*************************************************************************************************************************************************************************************************************************/
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
    "v-card",
    { staticClass: "mx-auto", attrs: { "max-width": "300", tile: "" } },
    [
      _c(
        "v-toolbar",
        { attrs: { color: "teal", dark: "" } },
        [
          _c(
            "v-list-item-icon",
            [_c("v-icon", [_vm._v("mdi-cast-connected")])],
            1
          ),
          _vm._v(" "),
          _c("v-toolbar-title", [_vm._v("Active Screens")]),
          _vm._v(" "),
          _c("v-spacer")
        ],
        1
      ),
      _vm._v(" "),
      _vm.outlets.length
        ? [
            _c(
              "v-list",
              { attrs: { dense: "" } },
              [
                _c(
                  "v-list-item-group",
                  { attrs: { color: "primary" } },
                  _vm._l(_vm.outlets, function(outlet, i) {
                    return _c(
                      "v-list-item",
                      { key: i },
                      [
                        _c(
                          "v-list-item-content",
                          [
                            _c("v-list-item-title", {
                              domProps: {
                                textContent: _vm._s(outlet.outlet_name)
                              }
                            }),
                            _vm._v(" "),
                            _vm._l(_vm.screens[outlet.outlet_name], function(
                              screen,
                              i
                            ) {
                              return _c(
                                "v-list-item",
                                { key: i },
                                [
                                  _c(
                                    "v-list-item-icon",
                                    [
                                      _c(
                                        "v-icon",
                                        { attrs: { color: "green accent-3" } },
                                        [_vm._v("mdi-checkbox-blank-circle")]
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c("v-list-item-subtitle", {
                                    domProps: {
                                      textContent: _vm._s(screen.description)
                                    }
                                  })
                                ],
                                1
                              )
                            })
                          ],
                          2
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
          ]
        : [
            _c("v-card", [
              _c("p", {
                staticClass: "text-center pa-5",
                domProps: { textContent: _vm._s(_vm.no_content) }
              })
            ])
          ]
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/AddOutletComponent.vue?vue&type=template&id=54e7c6ba&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/AddOutletComponent.vue?vue&type=template&id=54e7c6ba& ***!
  \*********************************************************************************************************************************************************************************************************************/
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
    "v-form",
    [
      _c(
        "v-container",
        { staticClass: "grey darken-4" },
        [
          _c(
            "v-row",
            { attrs: { align: "center", justify: "center" } },
            [
              _c(
                "v-col",
                { staticClass: "mt-10 mb-10", attrs: { cols: "12", sm: "4" } },
                [
                  _c("v-text-field", {
                    attrs: {
                      label: "Outlet Name",
                      outlined: "",
                      dense: "",
                      rules: [_vm.rules.counter],
                      counter: "",
                      maxlength: "50"
                    },
                    model: {
                      value: _vm.newOutlet_name,
                      callback: function($$v) {
                        _vm.newOutlet_name = $$v
                      },
                      expression: "newOutlet_name"
                    }
                  }),
                  _vm._v(" "),
                  _c("v-text-field", {
                    attrs: {
                      label: "Outlet ID",
                      outlined: "",
                      dense: "",
                      hint: "strictly in (XX-XXX) format",
                      rules: [_vm.rules.required, _vm.rules.outlet]
                    },
                    model: {
                      value: _vm.newOutlet_id,
                      callback: function($$v) {
                        _vm.newOutlet_id = $$v
                      },
                      expression: "newOutlet_id"
                    }
                  }),
                  _vm._v(" "),
                  _c(
                    "v-row",
                    { attrs: { align: "center", justify: "center" } },
                    [
                      _c(
                        "v-btn",
                        {
                          staticClass: "mr-2",
                          attrs: { rounded: "", color: "primary", dark: "" },
                          on: { click: _vm.addOutlet }
                        },
                        [_vm._v("SAVE")]
                      ),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        {
                          staticClass: "ml-1",
                          attrs: { rounded: "", color: "primary", dark: "" },
                          on: { click: _vm.clearNewOutlet }
                        },
                        [_vm._v("CLEAR")]
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
}
var staticRenderFns = []
render._withStripped = true



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
      _vm.selected.screen
        ? _c(
            "v-navigation-drawer",
            {
              attrs: { app: "", clipped: "", right: "", width: 300 },
              scopedSlots: _vm._u(
                [
                  {
                    key: "append",
                    fn: function() {
                      return [
                        _c(
                          "div",
                          { staticClass: "pa-2" },
                          [
                            _c(
                              "v-btn",
                              {
                                staticClass: "grey darken-3",
                                attrs: { block: "" },
                                on: {
                                  click: function($event) {
                                    _vm.file_upload_dialog = true
                                  }
                                }
                              },
                              [
                                _c("v-icon", { attrs: { left: "" } }, [
                                  _vm._v("mdi-upload")
                                ]),
                                _vm._v(" \n          Upload Clip\n        ")
                              ],
                              1
                            )
                          ],
                          1
                        )
                      ]
                    },
                    proxy: true
                  }
                ],
                null,
                false,
                337015559
              ),
              model: {
                value: _vm.drawerRight,
                callback: function($$v) {
                  _vm.drawerRight = $$v
                },
                expression: "drawerRight"
              }
            },
            [
              _c("media_asset_component", {
                attrs: {
                  media_assets: _vm.media_assets,
                  selected: _vm.selected,
                  links: _vm.links,
                  form: _vm.form,
                  deleteLink: _vm.deleteLink,
                  getLinks: _vm.getLinks
                },
                on: {
                  linkSelect: function($event) {
                    ;(_vm.screen = $event), _vm.clearnewURL($event)
                  },
                  setLinkName: function($event) {
                    return _vm.refreshLinks($event)
                  }
                }
              }),
              _vm._v(" "),
              _c("upload_file_component", {
                attrs: { file_upload_dialog: _vm.file_upload_dialog },
                on: {
                  setUploadDialog: function($event) {
                    return _vm.closeDialog()
                  }
                }
              })
            ],
            1
          )
        : _vm._e(),
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
          _c("v-toolbar-title", { staticStyle: { color: "#FFF" } }, [
            _vm._v("Screen Manager")
          ]),
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
          attrs: { app: "", width: 300 },
          scopedSlots: _vm._u([
            {
              key: "append",
              fn: function() {
                return [
                  _c(
                    "div",
                    { staticClass: "pa-2" },
                    [
                      _c(
                        "v-btn",
                        {
                          staticClass: "grey darken-4",
                          attrs: { block: "" },
                          on: { click: _vm.logout }
                        },
                        [
                          _c("v-icon", { attrs: { left: "" } }, [
                            _vm._v("mdi-logout")
                          ]),
                          _vm._v(" \n          Logout\n        ")
                        ],
                        1
                      )
                    ],
                    1
                  )
                ]
              },
              proxy: true
            }
          ]),
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
            "v-list",
            [
              _c(
                "v-list-item",
                {
                  on: {
                    click: function($event) {
                      $event.stopPropagation()
                      _vm.left = !_vm.left
                    }
                  }
                },
                [
                  _c(
                    "v-list-item-action",
                    [
                      _c("v-icon", { attrs: { color: "green accent-3" } }, [
                        _vm._v("mdi-exit-to-app")
                      ])
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-list-item-content",
                    [
                      _c(
                        "v-list-item-title",
                        { staticStyle: { color: "#00E676" } },
                        [_vm._v("Active Screens")]
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
          _c("v-divider"),
          _vm._v(" "),
          _c("outlets_component", {
            attrs: {
              outlets: _vm.outlets,
              selected: _vm.selected,
              getScreenSched: _vm.getScreenSched,
              getScreenAutologin: _vm.getScreenAutologin,
              getScreenNotes: _vm.getScreenNotes,
              getOutlets: _vm.getOutlets
            },
            on: {
              screenSelect: function($event) {
                return _vm.getSelectedScreenInfo($event)
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
          attrs: { fixed: "", temporary: "", width: 300 },
          model: {
            value: _vm.left,
            callback: function($$v) {
              _vm.left = $$v
            },
            expression: "left"
          }
        },
        [_c("active_screens_component")],
        1
      ),
      _vm._v(" "),
      _c(
        "v-main",
        [
          _c(
            "v-container",
            {
              staticClass:
                "align-start \n             fill-height\n             justify-space-between",
              attrs: { fluid: "" }
            },
            [
              [
                _c(
                  "v-row",
                  {
                    staticClass: "mx-auto",
                    attrs: { align: "center", justify: "center" }
                  },
                  [
                    _c(
                      "v-col",
                      [
                        _c(
                          "v-card",
                          [
                            _c(
                              "v-tabs",
                              { attrs: { left: "", dense: "" } },
                              [
                                _vm.selected.screen
                                  ? _c(
                                      "v-tab",
                                      [
                                        _c("v-icon", { attrs: { left: "" } }, [
                                          _vm._v("mdi-play-box-outline")
                                        ]),
                                        _vm._v(
                                          "\n                  SCREEN\n                "
                                        )
                                      ],
                                      1
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                _vm.selected.screen
                                  ? _c(
                                      "v-tab",
                                      [
                                        _c("v-icon", { attrs: { left: "" } }, [
                                          _vm._v("mdi-calendar-clock")
                                        ]),
                                        _vm._v(
                                          "\n                  SCHEDULE\n                "
                                        )
                                      ],
                                      1
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                _vm.selected.screen
                                  ? _c(
                                      "v-tab",
                                      [
                                        _c("v-icon", { attrs: { left: "" } }, [
                                          _vm._v("mdi-more")
                                        ]),
                                        _vm._v(
                                          "\n                  INFO\n                "
                                        )
                                      ],
                                      1
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                _c(
                                  "v-tab",
                                  [
                                    _c("v-icon", { attrs: { left: "" } }, [
                                      _vm._v("mdi-plus")
                                    ]),
                                    _vm._v(
                                      "\n                  ADD OUTLET\n                "
                                    )
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _vm.selected.screen
                                  ? _c(
                                      "v-tab-item",
                                      [
                                        _c("screensched_component", {
                                          attrs: {
                                            selected: _vm.selected,
                                            media_assets: _vm.media_assets,
                                            form: _vm.form,
                                            clear_URL: _vm.clear_URL,
                                            momentNow: _vm.momentNow,
                                            resetData: _vm.resetData,
                                            getSelectedScreenInfo:
                                              _vm.getSelectedScreenInfo,
                                            screen_key: _vm.screen_key,
                                            getScreenSched: _vm.getScreenSched,
                                            getMediaAssets: _vm.getMediaAssets,
                                            getLinks: _vm.getLinks
                                          }
                                        })
                                      ],
                                      1
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                _vm.selected.screen
                                  ? _c(
                                      "v-tab-item",
                                      [
                                        _c(
                                          "v-card",
                                          { attrs: { flat: "" } },
                                          [
                                            _c("calendar", {
                                              attrs: {
                                                calendar: _vm.calendar,
                                                selected: _vm.selected
                                              }
                                            })
                                          ],
                                          1
                                        )
                                      ],
                                      1
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                _vm.selected.screen
                                  ? _c(
                                      "v-tab-item",
                                      [
                                        _c("info_component", {
                                          attrs: {
                                            screen_autologin:
                                              _vm.screen_autologin,
                                            screen_now_showing:
                                              _vm.screen_now_showing,
                                            screen_resolution:
                                              _vm.screen_resolution,
                                            screen_activation_date:
                                              _vm.screen_activation_date,
                                            screen_equipment_model_installed:
                                              _vm.screen_equipment_model_installed,
                                            screen_teamviewer_details:
                                              _vm.screen_teamviewer_details,
                                            selected: _vm.selected
                                          },
                                          on: {
                                            saveScreenNotes: function($event) {
                                              return _vm.refreshScreen($event)
                                            },
                                            refreshActivationDate: function(
                                              $event
                                            ) {
                                              return _vm.refreshScreenActivation(
                                                $event
                                              )
                                            }
                                          }
                                        })
                                      ],
                                      1
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                _c(
                                  "v-tab-item",
                                  [
                                    _c("add_outlet_component", {
                                      attrs: { getOutlets: _vm.getOutlets }
                                    })
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
          _c("span"),
          _vm._v(" "),
          _c("v-spacer"),
          _vm._v(" "),
          _c("span", [_vm._v("MSW © " + _vm._s(new Date().getFullYear()))])
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/CalendarComponent.vue?vue&type=template&id=56bbe5f8&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/CalendarComponent.vue?vue&type=template&id=56bbe5f8&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************/
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
    "v-row",
    [
      _c(
        "v-col",
        { attrs: { align: "center", justify: "center" } },
        [
          _c(
            "v-sheet",
            {
              staticStyle: { maxWidth: "500px" },
              attrs: {
                fullscreen: _vm.$vuetify.breakpoint.mobile,
                outlined: ""
              }
            },
            [
              _c(
                "v-toolbar",
                {
                  staticClass: "grey darken-4",
                  attrs: { flat: "", dense: "", dark: "" }
                },
                [
                  _c("v-toolbar-title", [
                    _vm._v(
                      "\n          " +
                        _vm._s(_vm.selected.screen_name) +
                        "\n        "
                    )
                  ]),
                  _vm._v(" "),
                  _c("v-spacer")
                ],
                1
              ),
              _vm._v(" "),
              _c("v-calendar", {
                ref: "calendar",
                attrs: {
                  now: _vm.calendar.today,
                  value: _vm.calendar.today,
                  events: _vm.calendar.events,
                  color: "primary",
                  type: "day"
                },
                model: {
                  value: _vm.calendar.today,
                  callback: function($$v) {
                    _vm.$set(_vm.calendar, "today", $$v)
                  },
                  expression: "calendar.today"
                }
              })
            ],
            1
          )
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/InfoComponent.vue?vue&type=template&id=44efc814&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/InfoComponent.vue?vue&type=template&id=44efc814& ***!
  \****************************************************************************************************************************************************************************************************************/
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
    "v-container",
    { staticClass: "grey darken-4 pt-8 pb-8" },
    [
      _c(
        "v-row",
        { attrs: { align: "center", justify: "center" } },
        [
          _c(
            "v-col",
            { attrs: { sm: "9" } },
            [
              _c(
                "v-card",
                { attrs: { outlined: "", tile: "" } },
                [
                  _c(
                    "v-toolbar",
                    {
                      staticClass: "grey darken-4",
                      attrs: { flat: "", dark: "" }
                    },
                    [
                      _c(
                        "v-toolbar-title",
                        [
                          _c("v-text-field", {
                            staticClass: "pt-4 ma-2",
                            attrs: {
                              "single-line": "",
                              "append-outer-icon": "mdi-pencil"
                            },
                            on: {
                              "click:append-outer": function($event) {
                                return _vm.renameScreen("name")
                              }
                            },
                            model: {
                              value: _vm.screen_name,
                              callback: function($$v) {
                                _vm.screen_name = $$v
                              },
                              expression: "screen_name"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c("v-spacer"),
                      _vm._v(" "),
                      this.selected.outlet_screen > 1
                        ? [
                            _c(
                              "v-tooltip",
                              {
                                attrs: { right: "" },
                                scopedSlots: _vm._u(
                                  [
                                    {
                                      key: "activator",
                                      fn: function(ref) {
                                        var on = ref.on
                                        var attrs = ref.attrs
                                        return [
                                          _c(
                                            "v-btn",
                                            _vm._g(
                                              _vm._b(
                                                {
                                                  staticClass:
                                                    "ma-2 white--text",
                                                  attrs: {
                                                    tile: "",
                                                    outlined: "",
                                                    color: "danger"
                                                  },
                                                  on: {
                                                    click: function($event) {
                                                      return _vm.toDeleteScreen()
                                                    }
                                                  }
                                                },
                                                "v-btn",
                                                attrs,
                                                false
                                              ),
                                              on
                                            ),
                                            [
                                              _vm._v(
                                                "\n                  Delete Screen\n                "
                                              )
                                            ]
                                          )
                                        ]
                                      }
                                    }
                                  ],
                                  null,
                                  false,
                                  3633734366
                                )
                              },
                              [
                                _vm._v(" "),
                                _c("span", [_vm._v("delete this screen")])
                              ]
                            )
                          ]
                        : _vm._e(),
                      _vm._v(" "),
                      [
                        _c(
                          "v-tooltip",
                          {
                            attrs: { right: "" },
                            scopedSlots: _vm._u([
                              {
                                key: "activator",
                                fn: function(ref) {
                                  var on = ref.on
                                  var attrs = ref.attrs
                                  return [
                                    _c(
                                      "v-btn",
                                      _vm._g(
                                        _vm._b(
                                          {
                                            staticClass: "ma-2 white--text",
                                            attrs: {
                                              tile: "",
                                              outlined: "",
                                              color: "error"
                                            },
                                            on: {
                                              click: function($event) {
                                                return _vm.toDeactivateOutlet()
                                              }
                                            }
                                          },
                                          "v-btn",
                                          attrs,
                                          false
                                        ),
                                        on
                                      ),
                                      [
                                        _vm._v(
                                          "\n                  Deactivate Outlet\n                "
                                        )
                                      ]
                                    )
                                  ]
                                }
                              }
                            ])
                          },
                          [
                            _vm._v(" "),
                            _c("span", [_vm._v("delete this screen")])
                          ]
                        )
                      ]
                    ],
                    2
                  ),
                  _vm._v(" "),
                  _c(
                    "v-container",
                    {
                      staticClass: "pa-6",
                      attrs: { align: "center", justify: "center" }
                    },
                    [
                      _c(
                        "v-row",
                        { attrs: { "no-gutters": "" } },
                        [
                          [
                            _c(
                              "v-col",
                              { attrs: { lg: "3" } },
                              [
                                _c(
                                  "v-card",
                                  {
                                    staticClass: "pa-2 pr-6",
                                    attrs: {
                                      flat: "",
                                      tile: "",
                                      color: "teal",
                                      align: "right"
                                    }
                                  },
                                  [
                                    _vm._v(
                                      "\n                  Auto-Login URL\n                "
                                    )
                                  ]
                                )
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "v-col",
                              { attrs: { lg: "8" } },
                              [
                                _c(
                                  "v-card",
                                  {
                                    staticClass: "pa-2",
                                    attrs: { flat: "", tile: "" }
                                  },
                                  [
                                    _c("v-text-field", {
                                      attrs: {
                                        "single-line": "",
                                        dense: "",
                                        readonly: ""
                                      },
                                      model: {
                                        value: _vm.screen_autologin,
                                        callback: function($$v) {
                                          _vm.screen_autologin = $$v
                                        },
                                        expression: "screen_autologin"
                                      }
                                    })
                                  ],
                                  1
                                )
                              ],
                              1
                            )
                          ]
                        ],
                        2
                      ),
                      _vm._v(" "),
                      _c(
                        "v-row",
                        { attrs: { "no-gutters": "" } },
                        [
                          [
                            _c(
                              "v-col",
                              { attrs: { lg: "3" } },
                              [
                                _c(
                                  "v-card",
                                  {
                                    staticClass: "pa-2 pr-6",
                                    attrs: {
                                      flat: "",
                                      tile: "",
                                      color: "teal",
                                      align: "right"
                                    }
                                  },
                                  [
                                    _vm._v(
                                      "\n                  Now Showing\n                "
                                    )
                                  ]
                                )
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "v-col",
                              { attrs: { lg: "8" } },
                              [
                                _c(
                                  "v-card",
                                  {
                                    staticClass: "pa-2",
                                    attrs: { flat: "", tile: "" }
                                  },
                                  [
                                    _c("v-text-field", {
                                      attrs: {
                                        "single-line": "",
                                        dense: "",
                                        readonly: ""
                                      },
                                      model: {
                                        value: _vm.screen_now_showing,
                                        callback: function($$v) {
                                          _vm.screen_now_showing = $$v
                                        },
                                        expression: "screen_now_showing"
                                      }
                                    })
                                  ],
                                  1
                                )
                              ],
                              1
                            )
                          ]
                        ],
                        2
                      ),
                      _vm._v(" "),
                      _c(
                        "v-row",
                        { attrs: { "no-gutters": "" } },
                        [
                          [
                            _c(
                              "v-col",
                              { attrs: { lg: "3" } },
                              [
                                _c(
                                  "v-card",
                                  {
                                    staticClass: "pa-2 pr-6",
                                    attrs: {
                                      flat: "",
                                      tile: "",
                                      color: "teal",
                                      align: "right"
                                    }
                                  },
                                  [
                                    _vm._v(
                                      "\n                  Screen Resolution\n                "
                                    )
                                  ]
                                )
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "v-col",
                              { attrs: { lg: "8" } },
                              [
                                _c(
                                  "v-card",
                                  {
                                    staticClass: "pa-2",
                                    attrs: { flat: "", tile: "" }
                                  },
                                  [
                                    _c("v-text-field", {
                                      attrs: {
                                        "single-line": "",
                                        dense: "",
                                        "append-outer-icon": "mdi-pencil"
                                      },
                                      on: {
                                        "click:append-outer": function($event) {
                                          return _vm.saveScreenNotes(
                                            "resolution"
                                          )
                                        }
                                      },
                                      model: {
                                        value: _vm.resolution,
                                        callback: function($$v) {
                                          _vm.resolution = $$v
                                        },
                                        expression: "resolution"
                                      }
                                    })
                                  ],
                                  1
                                )
                              ],
                              1
                            )
                          ]
                        ],
                        2
                      ),
                      _vm._v(" "),
                      _c(
                        "v-row",
                        { attrs: { "no-gutters": "" } },
                        [
                          [
                            _c(
                              "v-col",
                              { attrs: { lg: "3" } },
                              [
                                _c(
                                  "v-card",
                                  {
                                    staticClass: "pa-2 pr-6",
                                    attrs: {
                                      flat: "",
                                      tile: "",
                                      color: "teal",
                                      align: "right"
                                    }
                                  },
                                  [
                                    _vm._v(
                                      "\n                  Equipment Model\n                "
                                    )
                                  ]
                                )
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "v-col",
                              { attrs: { lg: "8" } },
                              [
                                _c(
                                  "v-card",
                                  {
                                    staticClass: "pa-2",
                                    attrs: { flat: "", tile: "" }
                                  },
                                  [
                                    _c("v-text-field", {
                                      attrs: {
                                        "single-line": "",
                                        dense: "",
                                        "append-outer-icon": "mdi-pencil"
                                      },
                                      on: {
                                        "click:append-outer": function($event) {
                                          return _vm.saveScreenNotes(
                                            "equipment"
                                          )
                                        }
                                      },
                                      model: {
                                        value: _vm.equipment_model_installed,
                                        callback: function($$v) {
                                          _vm.equipment_model_installed = $$v
                                        },
                                        expression: "equipment_model_installed"
                                      }
                                    })
                                  ],
                                  1
                                )
                              ],
                              1
                            )
                          ]
                        ],
                        2
                      ),
                      _vm._v(" "),
                      _c(
                        "v-row",
                        { attrs: { "no-gutters": "" } },
                        [
                          [
                            _c(
                              "v-col",
                              { attrs: { lg: "3" } },
                              [
                                _c(
                                  "v-card",
                                  {
                                    staticClass: "pa-2 pr-6",
                                    attrs: {
                                      flat: "",
                                      tile: "",
                                      color: "teal",
                                      align: "right"
                                    }
                                  },
                                  [
                                    _vm._v(
                                      "\n                  Team Viewer Details\n                "
                                    )
                                  ]
                                )
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "v-col",
                              { attrs: { lg: "8" } },
                              [
                                _c(
                                  "v-card",
                                  {
                                    staticClass: "pa-2",
                                    attrs: { flat: "", tile: "" }
                                  },
                                  [
                                    _c("v-text-field", {
                                      attrs: {
                                        "single-line": "",
                                        dense: "",
                                        "append-outer-icon": "mdi-pencil"
                                      },
                                      on: {
                                        "click:append-outer": function($event) {
                                          return _vm.saveScreenNotes(
                                            "teamviewer"
                                          )
                                        }
                                      },
                                      model: {
                                        value: _vm.teamviewer,
                                        callback: function($$v) {
                                          _vm.teamviewer = $$v
                                        },
                                        expression: "teamviewer"
                                      }
                                    })
                                  ],
                                  1
                                )
                              ],
                              1
                            )
                          ]
                        ],
                        2
                      ),
                      _vm._v(" "),
                      _c(
                        "v-row",
                        { attrs: { "no-gutters": "" } },
                        [
                          [
                            _c(
                              "v-col",
                              { attrs: { lg: "3" } },
                              [
                                _c(
                                  "v-card",
                                  {
                                    staticClass: "pa-2 pr-6",
                                    attrs: {
                                      flat: "",
                                      tile: "",
                                      color: "teal",
                                      align: "right"
                                    }
                                  },
                                  [
                                    _vm._v(
                                      "\n                  Activation Date\n                "
                                    )
                                  ]
                                )
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "v-col",
                              { attrs: { lg: "8" } },
                              [
                                _c(
                                  "v-card",
                                  {
                                    staticClass: "pa-2",
                                    attrs: { flat: "", tile: "" }
                                  },
                                  [
                                    _c("active_screen_component", {
                                      attrs: {
                                        screen_activation_date:
                                          _vm.screen_activation_date,
                                        selected: _vm.selected
                                      },
                                      on: {
                                        save: function($event) {
                                          return _vm.refreshActivationDate(
                                            $event
                                          )
                                        }
                                      }
                                    })
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
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/MediaAssetsComponent.vue?vue&type=template&id=0a3b7621&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/MediaAssetsComponent.vue?vue&type=template&id=0a3b7621& ***!
  \***********************************************************************************************************************************************************************************************************************/
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
    "v-container",
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
                                { attrs: { color: "primary" } },
                                _vm._l(asset.links, function(link, j) {
                                  return _c(
                                    "v-list-item",
                                    {
                                      key: j,
                                      attrs: {
                                        id: asset.name + "**" + link.id
                                      },
                                      on: {
                                        click: _vm.linkSelect,
                                        dblclick: function($event) {
                                          return _vm.linkRename([
                                            link.id,
                                            link.name,
                                            i,
                                            j
                                          ])
                                        }
                                      }
                                    },
                                    [
                                      _vm.rename_field &&
                                      _vm.a == i &&
                                      _vm.b == j
                                        ? _c(
                                            "v-list-item-content",
                                            [
                                              _c("v-text-field", {
                                                attrs: {
                                                  outlined: "",
                                                  dense: "",
                                                  autofocus: ""
                                                },
                                                on: {
                                                  blur: function($event) {
                                                    return _vm.setLinkName()
                                                  }
                                                },
                                                model: {
                                                  value: _vm.link_name,
                                                  callback: function($$v) {
                                                    _vm.link_name = $$v
                                                  },
                                                  expression: "link_name"
                                                }
                                              })
                                            ],
                                            1
                                          )
                                        : _c(
                                            "v-list-item-content",
                                            [
                                              _c("v-list-item-title", {
                                                domProps: {
                                                  textContent: _vm._s(link.name)
                                                }
                                              })
                                            ],
                                            1
                                          ),
                                      _vm._v(" "),
                                      !_vm.rename_field
                                        ? _c(
                                            "v-tooltip",
                                            {
                                              attrs: { left: "" },
                                              scopedSlots: _vm._u(
                                                [
                                                  {
                                                    key: "activator",
                                                    fn: function(ref) {
                                                      var on = ref.on
                                                      var attrs = ref.attrs
                                                      return [
                                                        _c(
                                                          "v-list-item-icon",
                                                          _vm._g(
                                                            _vm._b(
                                                              {
                                                                staticClass:
                                                                  "ml-5",
                                                                on: {
                                                                  click: function(
                                                                    $event
                                                                  ) {
                                                                    return _vm.deleteLink(
                                                                      link.id
                                                                    )
                                                                  }
                                                                }
                                                              },
                                                              "v-list-item-icon",
                                                              attrs,
                                                              false
                                                            ),
                                                            on
                                                          ),
                                                          [
                                                            _c(
                                                              "v-icon",
                                                              {
                                                                attrs: {
                                                                  color: "red"
                                                                }
                                                              },
                                                              [
                                                                _vm._v(
                                                                  "mdi-delete-circle"
                                                                )
                                                              ]
                                                            )
                                                          ],
                                                          1
                                                        )
                                                      ]
                                                    }
                                                  }
                                                ],
                                                null,
                                                true
                                              )
                                            },
                                            [
                                              _vm._v(" "),
                                              _c("span", [
                                                _vm._v("delete link")
                                              ])
                                            ]
                                          )
                                        : _vm._e()
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
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/OutletsComponent.vue?vue&type=template&id=ea59cefc&":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/OutletsComponent.vue?vue&type=template&id=ea59cefc& ***!
  \*******************************************************************************************************************************************************************************************************************/
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
    "v-container",
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
            { attrs: { link: "" }, on: { click: _vm.outletSelect } },
            [
              _c(
                "v-expansion-panels",
                _vm._l(_vm.outlets, function(item, name) {
                  return _c(
                    "v-expansion-panel",
                    { key: name },
                    [
                      _c("v-expansion-panel-header", [_vm._v(_vm._s(name))]),
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
                                [
                                  !_vm.add_screen_panel
                                    ? _c(
                                        "v-list-item",
                                        [
                                          _c(
                                            "v-list-item-content",
                                            [
                                              _c(
                                                "v-btn",
                                                {
                                                  staticClass: "blue darken-1",
                                                  attrs: {
                                                    "x-small": "",
                                                    dark: ""
                                                  },
                                                  on: {
                                                    click: function($event) {
                                                      _vm.add_screen_panel = true
                                                    }
                                                  }
                                                },
                                                [
                                                  _vm._v(
                                                    "\n                        Add Screen\n                      "
                                                  )
                                                ]
                                              )
                                            ],
                                            1
                                          )
                                        ],
                                        1
                                      )
                                    : _c(
                                        "v-list-item",
                                        [
                                          _c(
                                            "v-list-item-content",
                                            [
                                              _c("v-text-field", {
                                                staticClass: "ma-0 pa-0",
                                                attrs: {
                                                  placeholder: "Screen Name",
                                                  outlined: "",
                                                  dense: "",
                                                  rules: [_vm.rules.counter],
                                                  counter: "",
                                                  maxlength: "25"
                                                },
                                                model: {
                                                  value: _vm.newScreen,
                                                  callback: function($$v) {
                                                    _vm.newScreen = $$v
                                                  },
                                                  expression: "newScreen"
                                                }
                                              }),
                                              _vm._v(" "),
                                              _c(
                                                "v-btn",
                                                {
                                                  staticClass: "teal",
                                                  attrs: {
                                                    "x-small": "",
                                                    dark: "",
                                                    id:
                                                      item[0].outlet_id +
                                                      "**" +
                                                      item[0].outlet_intid +
                                                      "**new"
                                                  },
                                                  on: {
                                                    click: _vm.addNewScreen
                                                  }
                                                },
                                                [
                                                  _vm._v(
                                                    "\n                        Save\n                      "
                                                  )
                                                ]
                                              )
                                            ],
                                            1
                                          )
                                        ],
                                        1
                                      ),
                                  _vm._v(" "),
                                  _vm._l(item, function(screen, screen_i) {
                                    return _c(
                                      "v-list-item",
                                      {
                                        key: screen_i,
                                        attrs: {
                                          id:
                                            screen.outlet_name +
                                            "**" +
                                            screen.id +
                                            "**" +
                                            screen.description +
                                            "**" +
                                            screen_i +
                                            "**" +
                                            item[0].outlet_id
                                        },
                                        on: { click: _vm.screenSelect }
                                      },
                                      [
                                        _c(
                                          "v-list-item-content",
                                          [
                                            _c("v-list-item-title", {
                                              domProps: {
                                                textContent: _vm._s(
                                                  screen.description
                                                )
                                              }
                                            })
                                          ],
                                          1
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "v-tooltip",
                                          {
                                            attrs: { right: "" },
                                            scopedSlots: _vm._u(
                                              [
                                                {
                                                  key: "activator",
                                                  fn: function(ref) {
                                                    var on = ref.on
                                                    var attrs = ref.attrs
                                                    return [
                                                      _c(
                                                        "v-list-item-icon",
                                                        _vm._g(
                                                          _vm._b(
                                                            {
                                                              staticClass:
                                                                "ml-5",
                                                              on: {
                                                                click: function(
                                                                  $event
                                                                ) {
                                                                  return _vm.openLink(
                                                                    screen.id
                                                                  )
                                                                }
                                                              }
                                                            },
                                                            "v-list-item-icon",
                                                            attrs,
                                                            false
                                                          ),
                                                          on
                                                        ),
                                                        [
                                                          _c("v-icon", [
                                                            _vm._v("mdi-eye")
                                                          ])
                                                        ],
                                                        1
                                                      )
                                                    ]
                                                  }
                                                }
                                              ],
                                              null,
                                              true
                                            )
                                          },
                                          [
                                            _vm._v(" "),
                                            _c("span", [
                                              _vm._v("click to visit screen")
                                            ])
                                          ]
                                        )
                                      ],
                                      1
                                    )
                                  })
                                ],
                                2
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
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ScreenActivatedComponent.vue?vue&type=template&id=8c81c9ba&":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/ScreenActivatedComponent.vue?vue&type=template&id=8c81c9ba& ***!
  \***************************************************************************************************************************************************************************************************************************/
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
    "v-menu",
    {
      ref: "menu",
      attrs: {
        "close-on-content-click": false,
        transition: "scale-transition",
        "offset-y": "",
        "min-width": "290px"
      },
      scopedSlots: _vm._u([
        {
          key: "activator",
          fn: function(ref) {
            var on = ref.on
            var attrs = ref.attrs
            return [
              _c(
                "v-text-field",
                _vm._g(
                  _vm._b(
                    {
                      attrs: {
                        label: "Activation Date",
                        "prepend-icon": "event",
                        readonly: "",
                        "single-line": "",
                        dense: "",
                        suffix: "(auto-save)"
                      },
                      model: {
                        value: _vm.date,
                        callback: function($$v) {
                          _vm.date = $$v
                        },
                        expression: "date"
                      }
                    },
                    "v-text-field",
                    attrs,
                    false
                  ),
                  on
                )
              )
            ]
          }
        }
      ]),
      model: {
        value: _vm.menu,
        callback: function($$v) {
          _vm.menu = $$v
        },
        expression: "menu"
      }
    },
    [
      _vm._v(" "),
      _c("v-date-picker", {
        ref: "picker",
        attrs: {
          max: new Date().toISOString().substr(0, 10),
          min: "2010-01-01"
        },
        on: { change: _vm.save },
        model: {
          value: _vm.date,
          callback: function($$v) {
            _vm.date = $$v
          },
          expression: "date"
        }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ScreenSchedComponent.vue?vue&type=template&id=576c2106&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/ScreenSchedComponent.vue?vue&type=template&id=576c2106& ***!
  \***********************************************************************************************************************************************************************************************************************/
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
    "v-container",
    [
      _c(
        "v-row",
        { attrs: { justify: "center", align: "center", pb: "3" } },
        [
          _c(
            "v-col",
            { staticClass: "shrink" },
            [
              _c(
                "v-card",
                {
                  staticClass: "mx-auto mt-5 pb-10 mb-7",
                  attrs: {
                    transition: "scroll-y-transition",
                    height: "100%",
                    width: "500",
                    outlined: ""
                  }
                },
                [
                  _c(
                    "v-row",
                    { staticClass: "mb-5", attrs: { "no-gutters": "" } },
                    [
                      _c(
                        "v-col",
                        { staticClass: "ml-5" },
                        [
                          _c(
                            "v-list-item",
                            { attrs: { "three-line": "" } },
                            [
                              _c(
                                "v-list-item-content",
                                [
                                  _c("div", { staticClass: "overline mb-4" }, [
                                    _vm._v("SCREEN")
                                  ]),
                                  _vm._v(" "),
                                  _c("v-list-item-subtitle", [
                                    _vm._v(_vm._s(_vm.selected.outlet))
                                  ]),
                                  _vm._v(" "),
                                  _c(
                                    "v-list-item-title",
                                    { staticClass: "headline mb-4" },
                                    [_vm._v(_vm._s(_vm.selected.screen_name))]
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
                        { staticClass: "mr-4" },
                        [
                          _c(
                            "v-list-item",
                            { attrs: { "three-line": "" } },
                            [
                              _c(
                                "v-list-item-content",
                                [
                                  _c("div", { staticClass: "overline mb-4" }, [
                                    _vm._v("CONTENT")
                                  ]),
                                  _vm._v(" "),
                                  _c("v-list-item-subtitle", [
                                    _vm._v(_vm._s(_vm.selected.mediagroup))
                                  ]),
                                  _vm._v(" "),
                                  _c(
                                    "v-list-item-title",
                                    { staticClass: "headline mb-4" },
                                    [_vm._v(_vm._s(_vm.selected.link_name))]
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
                  !_vm.selected.link
                    ? _c(
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
                            {
                              staticStyle: { maxWidth: "280px" },
                              attrs: {
                                fullscreen: _vm.$vuetify.breakpoint.mobile
                              }
                            },
                            [
                              _c("v-text-field", {
                                attrs: {
                                  label: "enter URL https://...",
                                  type: "url",
                                  outlined: "",
                                  dense: "",
                                  rules: [_vm.rules.url],
                                  disabled: !_vm.form.is_form_valid
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
                              _vm.newURL
                                ? _c("v-text-field", {
                                    attrs: {
                                      label: "URL Name",
                                      hint: "give this link a name",
                                      outlined: "",
                                      dense: "",
                                      disabled: !_vm.form.is_form_valid,
                                      rules: [_vm.rules.counter],
                                      counter: "",
                                      maxlength: "50"
                                    },
                                    model: {
                                      value: _vm.newURL_name,
                                      callback: function($$v) {
                                        _vm.newURL_name = $$v
                                      },
                                      expression: "newURL_name"
                                    }
                                  })
                                : _vm._e(),
                              _vm._v(" "),
                              _vm.newURL_name
                                ? _c("v-select", {
                                    attrs: {
                                      items: _vm.media_items,
                                      "item-text": "name",
                                      "item-value": "id",
                                      label: "Select Group",
                                      outlined: "",
                                      dense: "",
                                      "single-line": ""
                                    },
                                    model: {
                                      value: _vm.media_asset_id,
                                      callback: function($$v) {
                                        _vm.media_asset_id = $$v
                                      },
                                      expression: "media_asset_id"
                                    }
                                  })
                                : _vm._e()
                            ],
                            1
                          )
                        ],
                        1
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _c(
                    "v-row",
                    { attrs: { "no-gutters": "" } },
                    [
                      _c(
                        "v-col",
                        { attrs: { align: "center", justify: "center" } },
                        [
                          _c(
                            "v-btn",
                            {
                              staticClass: "mr-2",
                              attrs: {
                                rounded: "",
                                color: "primary",
                                dark: ""
                              },
                              on: { click: _vm.addSched }
                            },
                            [_vm._v("SAVE")]
                          ),
                          _vm._v(" "),
                          _c(
                            "v-btn",
                            {
                              staticClass: "ml-2",
                              attrs: {
                                rounded: "",
                                color: "primary",
                                dark: ""
                              },
                              on: { click: _vm.disableMedia }
                            },
                            [_vm._v("CLEAR")]
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
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/UploadFileComponent.vue?vue&type=template&id=84fce776&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/UploadFileComponent.vue?vue&type=template&id=84fce776& ***!
  \**********************************************************************************************************************************************************************************************************************/
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
    "v-row",
    { attrs: { justify: "center" } },
    [
      _c(
        "v-dialog",
        {
          attrs: {
            fullscreen: "",
            "hide-overlay": "",
            transition: "dialog-bottom-transition"
          },
          model: {
            value: _vm.file_upload_dialog,
            callback: function($$v) {
              _vm.file_upload_dialog = $$v
            },
            expression: "file_upload_dialog"
          }
        },
        [
          _c(
            "v-card",
            [
              _c(
                "v-toolbar",
                { attrs: { dark: "", color: "primary" } },
                [
                  _c(
                    "v-btn",
                    {
                      attrs: { icon: "", dark: "" },
                      on: {
                        click: function($event) {
                          return _vm.setUploadDialog()
                        }
                      }
                    },
                    [_c("v-icon", [_vm._v("mdi-close")])],
                    1
                  ),
                  _vm._v(" "),
                  _c("v-toolbar-title", [_vm._v("Upload Short Clip Videos")]),
                  _vm._v(" "),
                  _c("v-spacer"),
                  _vm._v(" "),
                  _c("v-toolbar-items")
                ],
                1
              ),
              _vm._v(" "),
              _c("v-container", [_c("upload_files")], 1)
            ],
            1
          )
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/UploadFiles.vue?vue&type=template&id=78ce364a&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/UploadFiles.vue?vue&type=template&id=78ce364a& ***!
  \**************************************************************************************************************************************************************************************************************/
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
    "div",
    [
      _vm.currentFile
        ? _c("div", { staticClass: "progress" }, [
            _c(
              "div",
              {
                staticClass:
                  "progress-bar progress-bar-info progress-bar-striped",
                style: { width: _vm.progress + "%" },
                attrs: {
                  role: "progressbar",
                  "aria-valuenow": _vm.progress,
                  "aria-valuemin": "0",
                  "aria-valuemax": "100"
                }
              },
              [_vm._v("\n      " + _vm._s(_vm.progress) + "%\n    ")]
            )
          ])
        : _vm._e(),
      _vm._v(" "),
      _c(
        "v-container",
        { staticClass: "ma-5" },
        [
          _c("v-file-input", {
            ref: "file",
            attrs: {
              "show-size": "",
              accept: "video/*",
              label: "File input",
              "prepend-icon": "mdi-file-video",
              rules: [_vm.rules.required]
            },
            on: { change: _vm.selectFile },
            model: {
              value: _vm.vfile,
              callback: function($$v) {
                _vm.vfile = $$v
              },
              expression: "vfile"
            }
          }),
          _vm._v(" "),
          _c("v-text-field", {
            attrs: {
              label: "Video Name",
              "prepend-icon": "mdi-rename-box",
              rules: [_vm.rules.required],
              suffix: "required"
            },
            model: {
              value: _vm.vname,
              callback: function($$v) {
                _vm.vname = $$v
              },
              expression: "vname"
            }
          }),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "text-center" },
            [
              _c(
                "v-btn",
                {
                  attrs: { rounded: "", color: "primary", dark: "" },
                  on: { click: _vm.upload }
                },
                [_vm._v("Upload")]
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "alert alert-light", attrs: { role: "alert" } },
        [_vm._v(_vm._s(_vm.message))]
      ),
      _vm._v(" "),
      _c("v-divider"),
      _vm._v(" "),
      [
        _c(
          "v-card",
          { staticClass: "mx-auto", attrs: { "max-width": "100%" } },
          [
            _c(
              "v-container",
              { staticClass: "py-0" },
              [
                _c(
                  "v-row",
                  { attrs: { align: "center", justify: "start" } },
                  [
                    !_vm.allSelected
                      ? _c(
                          "v-col",
                          { attrs: { cols: "12" } },
                          [
                            _c("v-text-field", {
                              ref: "search",
                              attrs: {
                                "full-width": "",
                                "hide-details": "",
                                label: "Search Clips",
                                "single-line": "",
                                "append-icon": "mdi-magnify"
                              },
                              on: {
                                "click:append": function($event) {
                                  return _vm.$refs.search.focus()
                                }
                              },
                              model: {
                                value: _vm.search,
                                callback: function($$v) {
                                  _vm.search = $$v
                                },
                                expression: "search"
                              }
                            })
                          ],
                          1
                        )
                      : _vm._e()
                  ],
                  1
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "v-list",
              { staticClass: "result" },
              [
                _vm._l(_vm.categories, function(item) {
                  return [
                    !_vm.selected.includes(item)
                      ? _c(
                          "v-list-item",
                          { key: item.text, attrs: { disabled: _vm.loading } },
                          [
                            _c(
                              "v-list-item-avatar",
                              [_c("v-icon", [_vm._v("mdi-file-video")])],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "v-btn",
                              {
                                staticClass: "ma-2",
                                attrs: {
                                  rounded: "",
                                  dense: "",
                                  color: "indigo",
                                  dark: ""
                                },
                                on: {
                                  click: function($event) {
                                    return _vm.openClip(item.path)
                                  }
                                }
                              },
                              [
                                _vm._v(
                                  "\n              Open Link\n            "
                                )
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "div",
                              [
                                _c("v-list-item", [
                                  _vm._v(
                                    " \n                " +
                                      _vm._s(item.name) +
                                      " ‐ " +
                                      _vm._s(_vm.dateDay(item.created_at)) +
                                      "\n              "
                                  )
                                ])
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c("v-spacer"),
                            _vm._v(" "),
                            _c(
                              "v-btn",
                              {
                                staticClass: "ma-2",
                                attrs: {
                                  outlined: "",
                                  dense: "",
                                  color: "red",
                                  dark: ""
                                },
                                on: {
                                  click: function($event) {
                                    return _vm.deleteClip(item.id)
                                  }
                                }
                              },
                              [_vm._v("\n              Delete\n            ")]
                            )
                          ],
                          1
                        )
                      : _vm._e()
                  ]
                })
              ],
              2
            ),
            _vm._v(" "),
            _c("v-divider"),
            _vm._v(" "),
            _c(
              "v-card-actions",
              [
                _c("v-spacer"),
                _vm._v(" "),
                _c(
                  "v-btn",
                  {
                    attrs: {
                      disabled: !_vm.selected.length,
                      loading: _vm.loading,
                      color: "purple",
                      text: ""
                    },
                    on: { click: _vm.next }
                  },
                  [_vm._v("Next")]
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

/***/ "./resources/js/components/ActiveScreensComponent.vue":
/*!************************************************************!*\
  !*** ./resources/js/components/ActiveScreensComponent.vue ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ActiveScreensComponent_vue_vue_type_template_id_48e6c887___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ActiveScreensComponent.vue?vue&type=template&id=48e6c887& */ "./resources/js/components/ActiveScreensComponent.vue?vue&type=template&id=48e6c887&");
/* harmony import */ var _ActiveScreensComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ActiveScreensComponent.vue?vue&type=script&lang=js& */ "./resources/js/components/ActiveScreensComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ActiveScreensComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ActiveScreensComponent_vue_vue_type_template_id_48e6c887___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ActiveScreensComponent_vue_vue_type_template_id_48e6c887___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/ActiveScreensComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/ActiveScreensComponent.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./resources/js/components/ActiveScreensComponent.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ActiveScreensComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./ActiveScreensComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ActiveScreensComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ActiveScreensComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/ActiveScreensComponent.vue?vue&type=template&id=48e6c887&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/ActiveScreensComponent.vue?vue&type=template&id=48e6c887& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ActiveScreensComponent_vue_vue_type_template_id_48e6c887___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./ActiveScreensComponent.vue?vue&type=template&id=48e6c887& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ActiveScreensComponent.vue?vue&type=template&id=48e6c887&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ActiveScreensComponent_vue_vue_type_template_id_48e6c887___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ActiveScreensComponent_vue_vue_type_template_id_48e6c887___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/AddOutletComponent.vue":
/*!********************************************************!*\
  !*** ./resources/js/components/AddOutletComponent.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AddOutletComponent_vue_vue_type_template_id_54e7c6ba___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AddOutletComponent.vue?vue&type=template&id=54e7c6ba& */ "./resources/js/components/AddOutletComponent.vue?vue&type=template&id=54e7c6ba&");
/* harmony import */ var _AddOutletComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AddOutletComponent.vue?vue&type=script&lang=js& */ "./resources/js/components/AddOutletComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _AddOutletComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AddOutletComponent_vue_vue_type_template_id_54e7c6ba___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AddOutletComponent_vue_vue_type_template_id_54e7c6ba___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/AddOutletComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/AddOutletComponent.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/AddOutletComponent.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AddOutletComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./AddOutletComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/AddOutletComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AddOutletComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/AddOutletComponent.vue?vue&type=template&id=54e7c6ba&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/AddOutletComponent.vue?vue&type=template&id=54e7c6ba& ***!
  \***************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddOutletComponent_vue_vue_type_template_id_54e7c6ba___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./AddOutletComponent.vue?vue&type=template&id=54e7c6ba& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/AddOutletComponent.vue?vue&type=template&id=54e7c6ba&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddOutletComponent_vue_vue_type_template_id_54e7c6ba___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddOutletComponent_vue_vue_type_template_id_54e7c6ba___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



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



/***/ }),

/***/ "./resources/js/components/CalendarComponent.vue":
/*!*******************************************************!*\
  !*** ./resources/js/components/CalendarComponent.vue ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CalendarComponent_vue_vue_type_template_id_56bbe5f8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CalendarComponent.vue?vue&type=template&id=56bbe5f8&scoped=true& */ "./resources/js/components/CalendarComponent.vue?vue&type=template&id=56bbe5f8&scoped=true&");
/* harmony import */ var _CalendarComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CalendarComponent.vue?vue&type=script&lang=js& */ "./resources/js/components/CalendarComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _CalendarComponent_vue_vue_type_style_index_0_id_56bbe5f8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CalendarComponent.vue?vue&type=style&index=0&id=56bbe5f8&scoped=true&lang=css& */ "./resources/js/components/CalendarComponent.vue?vue&type=style&index=0&id=56bbe5f8&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _CalendarComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CalendarComponent_vue_vue_type_template_id_56bbe5f8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _CalendarComponent_vue_vue_type_template_id_56bbe5f8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "56bbe5f8",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/CalendarComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/CalendarComponent.vue?vue&type=script&lang=js&":
/*!********************************************************************************!*\
  !*** ./resources/js/components/CalendarComponent.vue?vue&type=script&lang=js& ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CalendarComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./CalendarComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/CalendarComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CalendarComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/CalendarComponent.vue?vue&type=style&index=0&id=56bbe5f8&scoped=true&lang=css&":
/*!****************************************************************************************************************!*\
  !*** ./resources/js/components/CalendarComponent.vue?vue&type=style&index=0&id=56bbe5f8&scoped=true&lang=css& ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CalendarComponent_vue_vue_type_style_index_0_id_56bbe5f8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader!../../../node_modules/css-loader??ref--6-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--6-2!../../../node_modules/vue-loader/lib??vue-loader-options!./CalendarComponent.vue?vue&type=style&index=0&id=56bbe5f8&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/CalendarComponent.vue?vue&type=style&index=0&id=56bbe5f8&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CalendarComponent_vue_vue_type_style_index_0_id_56bbe5f8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CalendarComponent_vue_vue_type_style_index_0_id_56bbe5f8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CalendarComponent_vue_vue_type_style_index_0_id_56bbe5f8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CalendarComponent_vue_vue_type_style_index_0_id_56bbe5f8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CalendarComponent_vue_vue_type_style_index_0_id_56bbe5f8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/components/CalendarComponent.vue?vue&type=template&id=56bbe5f8&scoped=true&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/components/CalendarComponent.vue?vue&type=template&id=56bbe5f8&scoped=true& ***!
  \**************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CalendarComponent_vue_vue_type_template_id_56bbe5f8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./CalendarComponent.vue?vue&type=template&id=56bbe5f8&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/CalendarComponent.vue?vue&type=template&id=56bbe5f8&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CalendarComponent_vue_vue_type_template_id_56bbe5f8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CalendarComponent_vue_vue_type_template_id_56bbe5f8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/InfoComponent.vue":
/*!***************************************************!*\
  !*** ./resources/js/components/InfoComponent.vue ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _InfoComponent_vue_vue_type_template_id_44efc814___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./InfoComponent.vue?vue&type=template&id=44efc814& */ "./resources/js/components/InfoComponent.vue?vue&type=template&id=44efc814&");
/* harmony import */ var _InfoComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./InfoComponent.vue?vue&type=script&lang=js& */ "./resources/js/components/InfoComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _InfoComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _InfoComponent_vue_vue_type_template_id_44efc814___WEBPACK_IMPORTED_MODULE_0__["render"],
  _InfoComponent_vue_vue_type_template_id_44efc814___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/InfoComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/InfoComponent.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/js/components/InfoComponent.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InfoComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./InfoComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/InfoComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InfoComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/InfoComponent.vue?vue&type=template&id=44efc814&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/InfoComponent.vue?vue&type=template&id=44efc814& ***!
  \**********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_InfoComponent_vue_vue_type_template_id_44efc814___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./InfoComponent.vue?vue&type=template&id=44efc814& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/InfoComponent.vue?vue&type=template&id=44efc814&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_InfoComponent_vue_vue_type_template_id_44efc814___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_InfoComponent_vue_vue_type_template_id_44efc814___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/MediaAssetsComponent.vue":
/*!**********************************************************!*\
  !*** ./resources/js/components/MediaAssetsComponent.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MediaAssetsComponent_vue_vue_type_template_id_0a3b7621___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MediaAssetsComponent.vue?vue&type=template&id=0a3b7621& */ "./resources/js/components/MediaAssetsComponent.vue?vue&type=template&id=0a3b7621&");
/* harmony import */ var _MediaAssetsComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MediaAssetsComponent.vue?vue&type=script&lang=js& */ "./resources/js/components/MediaAssetsComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _MediaAssetsComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _MediaAssetsComponent_vue_vue_type_template_id_0a3b7621___WEBPACK_IMPORTED_MODULE_0__["render"],
  _MediaAssetsComponent_vue_vue_type_template_id_0a3b7621___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/MediaAssetsComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/MediaAssetsComponent.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./resources/js/components/MediaAssetsComponent.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MediaAssetsComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./MediaAssetsComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/MediaAssetsComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MediaAssetsComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/MediaAssetsComponent.vue?vue&type=template&id=0a3b7621&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/MediaAssetsComponent.vue?vue&type=template&id=0a3b7621& ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MediaAssetsComponent_vue_vue_type_template_id_0a3b7621___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./MediaAssetsComponent.vue?vue&type=template&id=0a3b7621& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/MediaAssetsComponent.vue?vue&type=template&id=0a3b7621&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MediaAssetsComponent_vue_vue_type_template_id_0a3b7621___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MediaAssetsComponent_vue_vue_type_template_id_0a3b7621___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/OutletsComponent.vue":
/*!******************************************************!*\
  !*** ./resources/js/components/OutletsComponent.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _OutletsComponent_vue_vue_type_template_id_ea59cefc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OutletsComponent.vue?vue&type=template&id=ea59cefc& */ "./resources/js/components/OutletsComponent.vue?vue&type=template&id=ea59cefc&");
/* harmony import */ var _OutletsComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OutletsComponent.vue?vue&type=script&lang=js& */ "./resources/js/components/OutletsComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _OutletsComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _OutletsComponent_vue_vue_type_template_id_ea59cefc___WEBPACK_IMPORTED_MODULE_0__["render"],
  _OutletsComponent_vue_vue_type_template_id_ea59cefc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/OutletsComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/OutletsComponent.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./resources/js/components/OutletsComponent.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OutletsComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./OutletsComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/OutletsComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OutletsComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/OutletsComponent.vue?vue&type=template&id=ea59cefc&":
/*!*************************************************************************************!*\
  !*** ./resources/js/components/OutletsComponent.vue?vue&type=template&id=ea59cefc& ***!
  \*************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OutletsComponent_vue_vue_type_template_id_ea59cefc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./OutletsComponent.vue?vue&type=template&id=ea59cefc& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/OutletsComponent.vue?vue&type=template&id=ea59cefc&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OutletsComponent_vue_vue_type_template_id_ea59cefc___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OutletsComponent_vue_vue_type_template_id_ea59cefc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/ScreenActivatedComponent.vue":
/*!**************************************************************!*\
  !*** ./resources/js/components/ScreenActivatedComponent.vue ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ScreenActivatedComponent_vue_vue_type_template_id_8c81c9ba___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ScreenActivatedComponent.vue?vue&type=template&id=8c81c9ba& */ "./resources/js/components/ScreenActivatedComponent.vue?vue&type=template&id=8c81c9ba&");
/* harmony import */ var _ScreenActivatedComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ScreenActivatedComponent.vue?vue&type=script&lang=js& */ "./resources/js/components/ScreenActivatedComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ScreenActivatedComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ScreenActivatedComponent_vue_vue_type_template_id_8c81c9ba___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ScreenActivatedComponent_vue_vue_type_template_id_8c81c9ba___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/ScreenActivatedComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/ScreenActivatedComponent.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/ScreenActivatedComponent.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ScreenActivatedComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./ScreenActivatedComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ScreenActivatedComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ScreenActivatedComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/ScreenActivatedComponent.vue?vue&type=template&id=8c81c9ba&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/components/ScreenActivatedComponent.vue?vue&type=template&id=8c81c9ba& ***!
  \*********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ScreenActivatedComponent_vue_vue_type_template_id_8c81c9ba___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./ScreenActivatedComponent.vue?vue&type=template&id=8c81c9ba& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ScreenActivatedComponent.vue?vue&type=template&id=8c81c9ba&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ScreenActivatedComponent_vue_vue_type_template_id_8c81c9ba___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ScreenActivatedComponent_vue_vue_type_template_id_8c81c9ba___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/ScreenSchedComponent.vue":
/*!**********************************************************!*\
  !*** ./resources/js/components/ScreenSchedComponent.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ScreenSchedComponent_vue_vue_type_template_id_576c2106___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ScreenSchedComponent.vue?vue&type=template&id=576c2106& */ "./resources/js/components/ScreenSchedComponent.vue?vue&type=template&id=576c2106&");
/* harmony import */ var _ScreenSchedComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ScreenSchedComponent.vue?vue&type=script&lang=js& */ "./resources/js/components/ScreenSchedComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ScreenSchedComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ScreenSchedComponent_vue_vue_type_template_id_576c2106___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ScreenSchedComponent_vue_vue_type_template_id_576c2106___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/ScreenSchedComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/ScreenSchedComponent.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./resources/js/components/ScreenSchedComponent.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ScreenSchedComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./ScreenSchedComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ScreenSchedComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ScreenSchedComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/ScreenSchedComponent.vue?vue&type=template&id=576c2106&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/ScreenSchedComponent.vue?vue&type=template&id=576c2106& ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ScreenSchedComponent_vue_vue_type_template_id_576c2106___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./ScreenSchedComponent.vue?vue&type=template&id=576c2106& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ScreenSchedComponent.vue?vue&type=template&id=576c2106&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ScreenSchedComponent_vue_vue_type_template_id_576c2106___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ScreenSchedComponent_vue_vue_type_template_id_576c2106___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/UploadFileComponent.vue":
/*!*********************************************************!*\
  !*** ./resources/js/components/UploadFileComponent.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UploadFileComponent_vue_vue_type_template_id_84fce776___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UploadFileComponent.vue?vue&type=template&id=84fce776& */ "./resources/js/components/UploadFileComponent.vue?vue&type=template&id=84fce776&");
/* harmony import */ var _UploadFileComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UploadFileComponent.vue?vue&type=script&lang=js& */ "./resources/js/components/UploadFileComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _UploadFileComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UploadFileComponent_vue_vue_type_template_id_84fce776___WEBPACK_IMPORTED_MODULE_0__["render"],
  _UploadFileComponent_vue_vue_type_template_id_84fce776___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/UploadFileComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/UploadFileComponent.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/UploadFileComponent.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UploadFileComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./UploadFileComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/UploadFileComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UploadFileComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/UploadFileComponent.vue?vue&type=template&id=84fce776&":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/UploadFileComponent.vue?vue&type=template&id=84fce776& ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UploadFileComponent_vue_vue_type_template_id_84fce776___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./UploadFileComponent.vue?vue&type=template&id=84fce776& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/UploadFileComponent.vue?vue&type=template&id=84fce776&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UploadFileComponent_vue_vue_type_template_id_84fce776___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UploadFileComponent_vue_vue_type_template_id_84fce776___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/UploadFiles.vue":
/*!*************************************************!*\
  !*** ./resources/js/components/UploadFiles.vue ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UploadFiles_vue_vue_type_template_id_78ce364a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UploadFiles.vue?vue&type=template&id=78ce364a& */ "./resources/js/components/UploadFiles.vue?vue&type=template&id=78ce364a&");
/* harmony import */ var _UploadFiles_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UploadFiles.vue?vue&type=script&lang=js& */ "./resources/js/components/UploadFiles.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _UploadFiles_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UploadFiles.vue?vue&type=style&index=0&lang=css& */ "./resources/js/components/UploadFiles.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _UploadFiles_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UploadFiles_vue_vue_type_template_id_78ce364a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _UploadFiles_vue_vue_type_template_id_78ce364a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/UploadFiles.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/UploadFiles.vue?vue&type=script&lang=js&":
/*!**************************************************************************!*\
  !*** ./resources/js/components/UploadFiles.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UploadFiles_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./UploadFiles.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/UploadFiles.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UploadFiles_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/UploadFiles.vue?vue&type=style&index=0&lang=css&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/UploadFiles.vue?vue&type=style&index=0&lang=css& ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_UploadFiles_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader!../../../node_modules/css-loader??ref--6-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--6-2!../../../node_modules/vue-loader/lib??vue-loader-options!./UploadFiles.vue?vue&type=style&index=0&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/UploadFiles.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_UploadFiles_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_UploadFiles_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_UploadFiles_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_UploadFiles_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_UploadFiles_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/components/UploadFiles.vue?vue&type=template&id=78ce364a&":
/*!********************************************************************************!*\
  !*** ./resources/js/components/UploadFiles.vue?vue&type=template&id=78ce364a& ***!
  \********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UploadFiles_vue_vue_type_template_id_78ce364a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./UploadFiles.vue?vue&type=template&id=78ce364a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/UploadFiles.vue?vue&type=template&id=78ce364a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UploadFiles_vue_vue_type_template_id_78ce364a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UploadFiles_vue_vue_type_template_id_78ce364a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/services/UploadFilesService.js":
/*!*****************************************************!*\
  !*** ./resources/js/services/UploadFilesService.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var http = axios.create({
  baseURL: "https://".concat(window.location.hostname),
  headers: {
    "Content-type": "application/json"
  }
});

var UploadFilesService = /*#__PURE__*/function () {
  function UploadFilesService() {
    _classCallCheck(this, UploadFilesService);
  }

  _createClass(UploadFilesService, [{
    key: "upload",
    value: function upload(file, name, onUploadProgress) {
      var formData = new FormData();
      formData.append("file", file);
      formData.append("name", name);
      return http.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        onUploadProgress: onUploadProgress
      });
    }
  }, {
    key: "getFiles",
    value: function getFiles() {
      return http.get("/api/get"); //return null
    }
  }]);

  return UploadFilesService;
}();

/* harmony default export */ __webpack_exports__["default"] = (new UploadFilesService());

/***/ })

}]);
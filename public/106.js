(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[106],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/nod/question-nod-report/index.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/src/components/backend/nod/question-nod-report/index.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'index-history-chat',
  metaInfo: {
    title: 'Index Histroy Chat'
  },
  components: {},
  data: function data() {
    var _ref;
    return _ref = {
      field: {},
      vars: {
        perPage: 2
      }
    }, _defineProperty(_ref, "field", {
      searchQuery: {}
    }), _defineProperty(_ref, "historyData", []), _defineProperty(_ref, "variant", ''), _defineProperty(_ref, "totalHistoryData", 0), _defineProperty(_ref, "currentPage", 1), _ref;
  },
  methods: {
    getHistoryData: function getHistoryData(pageNumber) {
      axios.post('/AdminVue/auth-get-history-chat-data', {
        perPage: this.vars.perPage,
        page: pageNumber,
        search: this.field.searchQuery
      }).then(function (res) {
        var resp = res.data.data;
        this.historyData = resp.data;
        this.totalHistoryData = resp.total;
      }.bind(this))["catch"](function (e) {
        console.log(e);
      }.bind(this));
    },
    getVariant: function getVariant(chatStatus) {
      switch (chatStatus) {
        case 'Open':
          return 'success';
        case 'Done':
          return 'light';
        case 'InProgress':
          return 'info';
        case 'Expired':
          return 'warning';
        case 'Cancel':
          return 'danger';
        default:
          return '';
      }
    },
    onGetOption: function onGetOption(event) {
      if (event != null || event != 0) {
        this.vars.perPage = event;
        this.currentPage = 1;
        this.showLoading();
        this.getHistoryData(this.currentPage);
        this.hideLoading();
      }
    },
    onPageChange: function onPageChange(pageNumber) {
      this.getHistoryData(pageNumber);
    },
    submitSearch: function submitSearch() {
      this.currentPage = 1;
      this.getHistoryData(this.currentPage);
    },
    onAction: function onAction(action, indexChatRoom, nodNumber) {
      if (action == 'chatRoom') {
        this.$router.push({
          name: 'nod/form-chat-room',
          params: {
            Id: indexChatRoom,
            NodNumber: nodNumber
            // isCaretaker: this.isCaretaker
          }
        });
      }
    }
  },
  mounted: function mounted() {
    this.getHistoryData(this.currentPage);
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/nod/question-nod-report/index.vue?vue&type=template&id=3fcc6b17&":
/*!******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/src/components/backend/nod/question-nod-report/index.vue?vue&type=template&id=3fcc6b17& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", [_c("b-card", {
    staticClass: "mb-4",
    attrs: {
      header: "History Chat NOD",
      "header-tag": "h4"
    }
  }, [_c("b-form", {
    staticClass: "mb-4 row",
    attrs: {
      inline: ""
    }
  }, [_c("div", {
    staticClass: "col-md-6"
  }, [_c("b-form", {
    attrs: {
      inline: ""
    }
  }, [_c("label", {
    staticClass: "form-label mr-sm-2"
  }, [_vm._v("Tampilkan Data")]), _vm._v(" "), _c("b-select", {
    attrs: {
      value: "vars.perPage",
      options: [2, 3, 5, 100, 1000]
    },
    on: {
      change: function change($event) {
        return _vm.onGetOption($event);
      }
    },
    model: {
      value: _vm.vars.perPage,
      callback: function callback($$v) {
        _vm.$set(_vm.vars, "perPage", $$v);
      },
      expression: "vars.perPage"
    }
  })], 1)], 1), _vm._v(" "), _c("div", {
    staticClass: "col-md-6"
  }, [_c("b-form", {
    on: {
      submit: function submit($event) {
        $event.preventDefault();
        return _vm.submitSearch.apply(null, arguments);
      }
    }
  }, [_c("b-input-group", [_c("b-form-input", {
    attrs: {
      placeholder: "Search History Data"
    },
    model: {
      value: _vm.field.searchQuery.rc__question,
      callback: function callback($$v) {
        _vm.$set(_vm.field.searchQuery, "rc__question", $$v);
      },
      expression: "field.searchQuery.rc__question"
    }
  }), _vm._v(" "), _c("b-input-group-append", [_c("b-button", {
    attrs: {
      type: "submit",
      variant: "primary"
    }
  }, [_vm._v("Search")])], 1)], 1)], 1)], 1)]), _vm._v(" "), _c("b-form", {
    staticClass: "mb-4 row",
    attrs: {
      inline: ""
    }
  }, _vm._l(_vm.historyData, function (item, index) {
    return _c("div", {
      staticClass: "col-md-4"
    }, [_c("b-button", {
      staticClass: "mb-2 mt-2",
      attrs: {
        variant: "light"
      },
      on: {
        click: function click($event) {
          return _vm.onAction("chatRoom", item.ChatroomId, item.NodNumber);
        }
      }
    }, [_vm._v(_vm._s(item.ChatStatus))]), _vm._v(" "), item.ChatStatus ? _c("b-card", {
      attrs: {
        "bg-variant": _vm.getVariant(item.ChatStatus),
        "text-variant": item.ChatStatus == "Done" ? "black" : "white",
        header: item.NodNumber
      }
    }, [_c("b-card-text", [_vm._v("Topik Diskusi : ")]), _vm._v(" "), _c("b-card-text", [_vm._v(_vm._s(item.Question))]), _vm._v(" "), _c("b-card-text", [_vm._v("Invite Chat Forum : ")]), _vm._v(" "), _c("b-card-text", [_vm._v(_vm._s(item.RequestName) + " - (" + _vm._s(item.DepartName) + ")")])], 1) : _vm._e()], 1);
  }), 0), _vm._v(" "), _c("b-pagination", {
    attrs: {
      "total-rows": _vm.totalHistoryData,
      "per-page": _vm.vars.perPage,
      "aria-controls": "history-data-pagination"
    },
    on: {
      input: _vm.onPageChange
    },
    model: {
      value: _vm.currentPage,
      callback: function callback($$v) {
        _vm.currentPage = $$v;
      },
      expression: "currentPage"
    }
  })], 1)], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./resources/assets/src/components/backend/nod/question-nod-report/index.vue":
/*!***********************************************************************************!*\
  !*** ./resources/assets/src/components/backend/nod/question-nod-report/index.vue ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_3fcc6b17___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=3fcc6b17& */ "./resources/assets/src/components/backend/nod/question-nod-report/index.vue?vue&type=template&id=3fcc6b17&");
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ "./resources/assets/src/components/backend/nod/question-nod-report/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_3fcc6b17___WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_vue_vue_type_template_id_3fcc6b17___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/src/components/backend/nod/question-nod-report/index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/src/components/backend/nod/question-nod-report/index.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/nod/question-nod-report/index.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/nod/question-nod-report/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/src/components/backend/nod/question-nod-report/index.vue?vue&type=template&id=3fcc6b17&":
/*!******************************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/nod/question-nod-report/index.vue?vue&type=template&id=3fcc6b17& ***!
  \******************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_3fcc6b17___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=template&id=3fcc6b17& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/nod/question-nod-report/index.vue?vue&type=template&id=3fcc6b17&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_3fcc6b17___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_3fcc6b17___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
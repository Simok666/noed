(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/main/master-trouble-shoot/form.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/src/components/backend/main/master-trouble-shoot/form.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue_text_mask__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-text-mask */ "./node_modules/vue-text-mask/dist/vueTextMask.js");
/* harmony import */ var vue_text_mask__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue_text_mask__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _teckel_vue_pdf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @teckel/vue-pdf */ "./node_modules/@teckel/vue-pdf/src/vuePdfNoSss.vue");
/* harmony import */ var element_tiptap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! element-tiptap */ "./node_modules/element-tiptap/lib/element-tiptap.esm.js");


// import pdf from 'vue-pdf'


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'form-noe-report',
  metaInfo: {
    title: 'Form NOE Report'
  },
  components: {
    MaskedInput: vue_text_mask__WEBPACK_IMPORTED_MODULE_1___default.a,
    pdf: _teckel_vue_pdf__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  data: function data() {
    return {
      extensions: [new element_tiptap__WEBPACK_IMPORTED_MODULE_3__["Doc"](), new element_tiptap__WEBPACK_IMPORTED_MODULE_3__["Text"](), new element_tiptap__WEBPACK_IMPORTED_MODULE_3__["Paragraph"](), new element_tiptap__WEBPACK_IMPORTED_MODULE_3__["Heading"]({
        level: 5
      }), new element_tiptap__WEBPACK_IMPORTED_MODULE_3__["Bold"]({
        bubble: true
      }),
      // render command-button in bubble menu.
      new element_tiptap__WEBPACK_IMPORTED_MODULE_3__["Underline"]({
        bubble: true,
        menubar: false
      }),
      // render command-button in bubble menu but not in menubar.
      new element_tiptap__WEBPACK_IMPORTED_MODULE_3__["Italic"](), new element_tiptap__WEBPACK_IMPORTED_MODULE_3__["Strike"](), new element_tiptap__WEBPACK_IMPORTED_MODULE_3__["Image"](), new element_tiptap__WEBPACK_IMPORTED_MODULE_3__["TextAlign"](), new element_tiptap__WEBPACK_IMPORTED_MODULE_3__["ListItem"](), new element_tiptap__WEBPACK_IMPORTED_MODULE_3__["Link"](), new element_tiptap__WEBPACK_IMPORTED_MODULE_3__["CodeBlock"](), new element_tiptap__WEBPACK_IMPORTED_MODULE_3__["BulletList"](), new element_tiptap__WEBPACK_IMPORTED_MODULE_3__["OrderedList"](), new element_tiptap__WEBPACK_IMPORTED_MODULE_3__["FontType"]()],
      urlSubmit: '/AdminVue/master-trouble-shoot-insert',
      headerCard: 'Form TroubleShoot',
      textBtnSubmit: 'Simpan',
      field: {
        EventFile: [],
        CorrectiveActionFile: [],
        Date: moment__WEBPACK_IMPORTED_MODULE_0___default()(new Date()).format('YYYY-MM-DD'),
        FileEventDownload: [],
        FileCorrectiveActionDownload: [],
        Time: '09:00',
        Content: ''
      },
      allErrors: [],
      isNotif: false,
      isEdit: false,
      alertNotif: '',
      alertVariant: 'alert-dark-danger',
      opsProduct: [],
      opsLocation: [],
      opsTypeUser: [],
      OldEventFile: [],
      OldCorrectiveActionFile: [],
      valStatus: 0,
      isShow: false,
      BaseUrl: "/",
      isButton: false,
      show: true,
      pdfList: [],
      src: '',
      loadedRatio: 0,
      page: 1,
      numPages: 0,
      rotate: 0
    };
  },
  methods: {
    submitForm: function submitForm() {
      this.showLoading();
      var formData = new FormData();
      formData.append("Id", this.field.Id);
      if (this.field.IdMenu) formData.append("IdMenu", JSON.stringify(this.field.IdMenu.text));
      formData.append("Incident", this.field.Incident);
      if (this.field.IdUserAccess) formData.append("IdUserAccess", JSON.stringify(this.field.IdUserAccess));
      formData.append("CorrectiveAction", this.field.CorrectiveAction);
      formData.append("Content", this.field.Content);

      // for( var n = 0; n < this.field.CorrectiveActionFile.length; n++ ){
      //   let file = this.field.CorrectiveActionFile[n];
      //   formData.append('CorrectiveActionFile[' + n + ']', file);
      // }
      // formData.append("OldCorrectiveActionFile", JSON.stringify(this.OldCorrectiveActionFile))

      var config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
      axios.post(this.urlSubmit, formData, config).then(function (res) {
        this.hideLoading();
        var resp = res.data;
        if (resp.status) {
          this.$router.push({
            name: 'main/master-trouble-shoot',
            params: {
              isNotif: true,
              gNotif: 'notifications-success',
              tNotif: this.textBtnSubmit + ' Data Sukses',
              txNotif: 'Simpan Data Sukses!'
            }
          });
        } else {
          this.isNotif = true;
          this.alertNotif = resp.message;
          this.alertVariant = 'alert-dark-danger';
          this.allErrors = resp.validation;
          this.scrollTop(0, 1000);
        }
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.isNotif = true;
        this.alertNotif = 'Invalid Server Side!';
        this.alertVariant = 'alert-dark-danger';
        this.scrollTop(0, 1000);
        this.hideLoading();
      }.bind(this));
    },
    getData: function getData(Id) {
      axios.post('/AdminVue/master-trouble-shoot-edit', {
        Id: Id
      }).then(function (res) {
        var resp = res.data;
        this.field = resp.data;
        this.field.Content = resp.data.CorrectiveActionFile;

        // this.field.CorrectiveActionFile = []

        // if(this.field.FileCorrectiveAction != ''){
        //   let countFileCorrectiveAction = this.field.FileCorrectiveAction.length
        //   for (let i = 0; i < countFileCorrectiveAction; i++) {
        //     this.OldCorrectiveActionFile.push(this.field.FileCorrectiveAction[i])
        //     this.field.CorrectiveActionFile.push(process.env.BASE_URL + this.field.FileCorrectiveAction[i])
        //   }
        // }
        // if(this.field.CorrectiveActionFile == ''){
        //   this.OldCorrectiveActionFile = '';
        // }

        // if(this.field.FileCorrectiveActionDownload != '')
        // {
        //   let countFileCorrectiveActionDownload = this.field.FileCorrectiveActionDownload.length
        //   for (let i = 0; i < countFileCorrectiveActionDownload; i++)
        //   {
        //     let path = this.field.FileCorrectiveActionDownload[i]
        //     this.pdfList.push(path[1])
        //   }
        // }

        this.isButton = resp.isButton;
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.isNotif = true;
        this.alertNotif = 'Invalid Server Side!';
        this.alertVariant = 'alert-dark-danger';
      }.bind(this));
    },
    getMenuText: function getMenuText() {
      axios.post('/AdminVue/user-access-getJsonTree').then(function (res) {
        var getObjMenu = JSON.parse(res.data.action);
        this.opsLocation = getObjMenu;
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.opsLocation = [];
      }.bind(this));
    },
    getUser: function getUser() {
      axios.post('/AdminVue/master-trouble-shoot-get-user').then(function (res) {
        this.opsTypeUser = res.data.data;
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.opsTypeUser = [];
      }.bind(this));
    },
    // handleFileCorrective: function(files) {
    //   // console.log('FilePond Updated')
    //   // example of instance method call on pond reference
    //   this.field.CorrectiveActionFile = files.map(files => files.file)
    //   // console.log( this.field.myFile )
    // },
    // handleRemoveCorrective: function(error,files){
    //   let result = typeof(files.source)
    //   if(this.isEdit == true && result === 'string'){
    //     let index = this.OldCorrectiveActionFile.indexOf(files.source.replace('/clouds','clouds'))
    //     this.OldCorrectiveActionFile.splice(index,1)
    //   }
    // },
    backIndex: function backIndex() {
      this.$router.push('/RoleAdmin/main/master-trouble-shoot');
    },
    password: function password(updatePassword, reason) {
      updatePassword(prompt('password is "test"'));
    },
    error: function error(err) {

      // console.log(err);
    }
  },
  watch: {
    page: function page(newPage) {
      if (this.numPages > newPage) {
        this.numPages = newPage;
      }
    }
  },
  mounted: function mounted() {
    this.getMenuText();
    this.getUser();
    if (this.$route.params.isFormEdit) {
      var Id = this.$route.params.Id;
      this.isEdit = true;
      if (Id) {
        this.getData(Id);
        this.field.Id = Id;
        this.urlSubmit = '/AdminVue/master-trouble-shoot-update';
        this.textBtnSubmit = 'Simpan';
      }
    }
    if (this.$route.params.isShow) {
      this.isShow = this.$route.params.isShow;
      var Id = this.$route.params.Id;
      if (Id) {
        this.getData(Id);
        this.field.Id = Id;
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/main/master-trouble-shoot/form.vue?vue&type=template&id=577a1518&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/src/components/backend/main/master-trouble-shoot/form.vue?vue&type=template&id=577a1518& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************/
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
      header: _vm.headerCard,
      "header-tag": "h4"
    }
  }, [_vm.isNotif ? _c("div", {
    staticClass: "alert alert-dismissible fade show",
    "class": [_vm.alertVariant]
  }, [_c("button", {
    staticClass: "close",
    attrs: {
      type: "button",
      "data-dismiss": "alert"
    },
    on: {
      click: function click($event) {
        _vm.isNotif = !_vm.isNotif;
      }
    }
  }, [_vm._v("×")]), _vm._v("\n      " + _vm._s(_vm.alertNotif) + "\n    ")]) : _vm._e(), _vm._v(" "), _c("form", {
    attrs: {
      method: "POST"
    },
    on: {
      submit: function submit($event) {
        $event.preventDefault();
        return _vm.submitForm();
      }
    }
  }, [_c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Nama Menu")]), _vm._v(" "), _vm.isShow == false ? _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Dipilih")]) : _vm._e(), _vm._v(" "), _c("multiselect", {
    attrs: {
      options: _vm.opsLocation,
      "allow-empty": false,
      placeholder: "Pilih Menu",
      label: "text",
      "track-by": "text",
      required: "",
      disabled: _vm.isShow
    },
    model: {
      value: _vm.field.IdMenu,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "IdMenu", $$v);
      },
      expression: "field.IdMenu"
    }
  }), _vm._v(" "), _vm.allErrors.IdMenu ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.IdMenu[0]))]) : _vm._e()], 1), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Kejadian")]), _vm._v(" "), _vm.isShow == false ? _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]) : _vm._e(), _vm._v(" "), _c("b-textarea", {
    staticClass: "mb-1",
    attrs: {
      name: "Incident",
      state: _vm.allErrors.Incident ? false : null,
      required: "",
      readonly: _vm.isShow
    },
    model: {
      value: _vm.field.Incident,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "Incident", $$v);
      },
      expression: "field.Incident"
    }
  }), _vm._v(" "), _vm.allErrors.Incident ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.Incident[0]))]) : _vm._e()], 1)], 1), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-12"
  }, [_c("label", [_vm._v("Langkah Yang Bisa di lakukan")]), _vm._v(" "), _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("(Max. 100 MB)")]), _vm._v(" "), _c("el-tiptap", {
    attrs: {
      extensions: _vm.extensions,
      readonly: _vm.isShow
    },
    model: {
      value: _vm.field.Content,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "Content", $$v);
      },
      expression: "field.Content"
    }
  })], 1)], 1), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-6"
  }), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-6",
    attrs: {
      label: ""
    }
  }, [_vm.isShow == false ? _c("b-btn", {
    staticClass: "float-right ml-2",
    attrs: {
      type: "submit",
      variant: "primary"
    }
  }, [_vm._v("Simpan")]) : _vm._e(), _vm._v(" "), _c("b-btn", {
    staticClass: "float-right",
    attrs: {
      type: "button",
      variant: "secondary"
    },
    on: {
      click: function click($event) {
        return _vm.backIndex();
      }
    }
  }, [_vm._v("Kembali")])], 1)], 1)], 1)])], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./resources/assets/src/components/backend/main/master-trouble-shoot/form.vue":
/*!************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/main/master-trouble-shoot/form.vue ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _form_vue_vue_type_template_id_577a1518___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form.vue?vue&type=template&id=577a1518& */ "./resources/assets/src/components/backend/main/master-trouble-shoot/form.vue?vue&type=template&id=577a1518&");
/* harmony import */ var _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form.vue?vue&type=script&lang=js& */ "./resources/assets/src/components/backend/main/master-trouble-shoot/form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _form_vue_vue_type_template_id_577a1518___WEBPACK_IMPORTED_MODULE_0__["render"],
  _form_vue_vue_type_template_id_577a1518___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/src/components/backend/main/master-trouble-shoot/form.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/src/components/backend/main/master-trouble-shoot/form.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/main/master-trouble-shoot/form.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./form.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/main/master-trouble-shoot/form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/src/components/backend/main/master-trouble-shoot/form.vue?vue&type=template&id=577a1518&":
/*!*******************************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/main/master-trouble-shoot/form.vue?vue&type=template&id=577a1518& ***!
  \*******************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_577a1518___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./form.vue?vue&type=template&id=577a1518& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/main/master-trouble-shoot/form.vue?vue&type=template&id=577a1518&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_577a1518___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_577a1518___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 4:
/*!************************!*\
  !*** canvas (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 5:
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 6:
/*!**********************!*\
  !*** zlib (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 7:
/*!**********************!*\
  !*** http (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 8:
/*!***********************!*\
  !*** https (ignored) ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 9:
/*!*********************!*\
  !*** url (ignored) ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

}]);
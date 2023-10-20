(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[107],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/noe/correction-noe-verification/form.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/src/components/backend/noe/correction-noe-verification/form.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'form-correction-noe-verification',
  metaInfo: {
    title: 'Form Correction NOE'
  },
  components: {},
  data: function data() {
    return {
      urlSubmit: '/AdminVue/correction-noe-verification-insert',
      headerCard: 'Perbaikan Laporan NOE',
      textBtnSubmit: 'Simpan',
      field: {
        Number: '',
        IdPublish: '',
        SectionPublish: '',
        Description: '',
        EventFile: [],
        DescriptionCaretaker: ''
      },
      allErrors: [],
      isNotif: false,
      isEdit: false,
      alertNotif: '',
      alertVariant: 'alert-dark-danger',
      isCaretaker: false
    };
  },
  methods: {
    submitForm: function submitForm() {
      this.showLoading();
      var formData = new FormData();
      formData.append("Id", this.field.Id);
      formData.append("Number", this.field.Number);
      formData.append("IdPublish", this.field.IdPublish);
      formData.append("SectionPublish", this.field.SectionPublish);
      formData.append("Description", this.field.Description);
      if (this.field.Attachment) {
        for (var i = 0; i < this.field.Attachment.length; i++) {
          var file = this.field.Attachment[i];
          formData.append('Attachment[' + i + ']', file);
        }
      }
      if (this.isCaretaker) formData.append("DescriptionCaretaker", this.field.DescriptionCaretaker);
      var config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
      axios.post(this.urlSubmit, formData, config).then(function (res) {
        var resp = res.data;
        if (resp.status) {
          this.$router.push({
            name: 'noe/data-noe-verification',
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
        this.hideLoading();
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
      axios.post('/AdminVue/correction-noe-verification-create', {
        Id: Id
      }).then(function (res) {
        var resp = res.data;
        this.field.Number = resp.data.NoeNumber;
        this.field.IdPublish = resp.data.IdPublish;
        this.field.SectionPublish = resp.data.SectionPublish;
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.isNotif = true;
        this.alertNotif = 'Invalid Server Side!';
        this.alertVariant = 'alert-dark-danger';
      }.bind(this));
    },
    handleFile: function handleFile(files) {
      // console.log('FilePond Updated')
      // example of instance method call on pond reference
      this.field.Attachment = files.map(function (files) {
        return files.file;
      });
      // console.log( this.field.myFile )
    },
    backIndex: function backIndex() {
      this.$router.push('/RoleAdmin/noe/data-noe-verification');
    }
  },
  mounted: function mounted() {
    if (this.$route.params.Id) {
      var Id = this.$route.params.Id;
      this.isCaretaker = this.$route.params.isCaretaker;
      this.getData(Id);
      this.field.Id = Id;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/noe/correction-noe-verification/form.vue?vue&type=template&id=7f455120&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/src/components/backend/noe/correction-noe-verification/form.vue?vue&type=template&id=7f455120& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************/
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
    staticClass: "col-md-4"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("No. NOE")]), _vm._v(" "), _c("b-input", {
    staticClass: "mb-1",
    attrs: {
      name: "Number",
      state: _vm.allErrors.Number ? false : null,
      readonly: "",
      required: ""
    },
    model: {
      value: _vm.field.Number,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "Number", $$v);
      },
      expression: "field.Number"
    }
  }), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.field.IdPublish,
      expression: "field.IdPublish"
    }],
    staticClass: "mb-1",
    attrs: {
      type: "hidden",
      name: "IdPublish",
      state: _vm.allErrors.IdPublish ? false : null,
      readonly: "",
      required: ""
    },
    domProps: {
      value: _vm.field.IdPublish
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.field, "IdPublish", $event.target.value);
      }
    }
  }), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.field.SectionPublish,
      expression: "field.SectionPublish"
    }],
    staticClass: "mb-1",
    attrs: {
      type: "hidden",
      name: "SectionPublish",
      state: _vm.allErrors.SectionPublish ? false : null,
      readonly: "",
      required: ""
    },
    domProps: {
      value: _vm.field.SectionPublish
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.field, "SectionPublish", $event.target.value);
      }
    }
  }), _vm._v(" "), _vm.allErrors.Number ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.Number[0]))]) : _vm._e()], 1), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-4"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Koreksi")]), _vm._v(" "), _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]), _vm._v(" "), _c("b-textarea", {
    staticClass: "mb-1",
    attrs: {
      name: "Description",
      state: _vm.allErrors.Description ? false : null,
      required: ""
    },
    model: {
      value: _vm.field.Description,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "Description", $$v);
      },
      expression: "field.Description"
    }
  }), _vm._v(" "), _vm.allErrors.Description ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.Description[0]))]) : _vm._e()], 1), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-4"
  }, [_c("label", [_vm._v("Lampiran")]), _vm._v(" "), _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("(Max. 50 MB)")]), _vm._v(" "), _c("file-pond", {
    ref: "pondMyFile",
    attrs: {
      name: "Attachment",
      "label-idle": "Lampiran : 1.Data Batch Record; 2.Buku Kronik; 3.Dokumentasi before/after perbaikan; 4.Lain-lain;",
      "allow-multiple": true,
      files: _vm.field.Attachment,
      maxTotalFileSize: "50MB",
      "accepted-file-types": "application/*, image/*, video/*"
    },
    on: {
      updatefiles: _vm.handleFile
    }
  })], 1)], 1), _vm._v(" "), _vm.isCaretaker == true ? _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-4"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Deskripsi Mandatory")]), _vm._v(" "), _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]), _vm._v(" "), _c("b-textarea", {
    staticClass: "mb-1",
    attrs: {
      name: "DescriptionCaretaker",
      state: _vm.allErrors.DescriptionCaretaker ? false : null,
      required: _vm.isCaretaker
    },
    model: {
      value: _vm.field.DescriptionCaretaker,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "DescriptionCaretaker", $$v);
      },
      expression: "field.DescriptionCaretaker"
    }
  }), _vm._v(" "), _vm.allErrors.DescriptionCaretaker ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.DescriptionCaretaker[0]))]) : _vm._e()], 1)], 1) : _vm._e(), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-6"
  }), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("b-btn", {
    staticClass: "float-right ml-2",
    attrs: {
      type: "submit",
      variant: "primary"
    }
  }, [_vm._v("Simpan")]), _vm._v(" "), _c("b-btn", {
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

/***/ "./resources/assets/src/components/backend/noe/correction-noe-verification/form.vue":
/*!******************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/noe/correction-noe-verification/form.vue ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _form_vue_vue_type_template_id_7f455120___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form.vue?vue&type=template&id=7f455120& */ "./resources/assets/src/components/backend/noe/correction-noe-verification/form.vue?vue&type=template&id=7f455120&");
/* harmony import */ var _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form.vue?vue&type=script&lang=js& */ "./resources/assets/src/components/backend/noe/correction-noe-verification/form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _form_vue_vue_type_template_id_7f455120___WEBPACK_IMPORTED_MODULE_0__["render"],
  _form_vue_vue_type_template_id_7f455120___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/src/components/backend/noe/correction-noe-verification/form.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/src/components/backend/noe/correction-noe-verification/form.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/noe/correction-noe-verification/form.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./form.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/noe/correction-noe-verification/form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/src/components/backend/noe/correction-noe-verification/form.vue?vue&type=template&id=7f455120&":
/*!*************************************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/noe/correction-noe-verification/form.vue?vue&type=template&id=7f455120& ***!
  \*************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_7f455120___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./form.vue?vue&type=template&id=7f455120& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/noe/correction-noe-verification/form.vue?vue&type=template&id=7f455120&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_7f455120___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_7f455120___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[83],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/main/profile/form.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/src/components/backend/main/profile/form.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'form-profile',
  metaInfo: {
    title: 'Form Edit Profile'
  },
  components: {},
  data: function data() {
    return {
      urlSubmit: '/AdminVue/profile-update',
      headerCard: 'Ubah Data Profile',
      textBtnSubmit: 'Simpan',
      field: {
        myFile: ''
      },
      allErrors: [],
      isNotif: false,
      alertNotif: '',
      alertVariant: 'alert-dark-danger'
    };
  },
  methods: {
    submitForm: function submitForm() {
      if (this.field.myFile.length == 0) this.field.myOldFile = '';
      var formData = new FormData();
      formData.append("Id", this.$route.params.Id);
      formData.append("EmpName", this.field.EmpName);
      formData.append("NIP", this.field.NIP);
      formData.append("CellPhone", this.field.CellPhone);
      formData.append("OldPassword", this.field.OldPassword);
      formData.append("NewPassword", this.field.NewPassword);
      formData.append("ConfirmPassword", this.field.ConfirmPassword);
      formData.append("File", this.field.myFile[0]);
      formData.append("OldFile", this.field.myOldFile);
      var config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
      axios.post(this.urlSubmit, formData, config).then(function (res) {
        var resp = res.data;
        if (resp.status) {
          this.$store.replaceState({
            savedUserProfile: {}
          });
          this.$router.push({
            name: 'main/profile',
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
      }.bind(this));
    },
    getData: function getData(Id) {
      axios.post('/AdminVue/profile-edit', {
        Id: Id
      }).then(function (res) {
        var resp = res.data;
        this.field = resp.data;
        this.field.myFile = "/" + this.field.Photo;
        this.field.myOldFile = this.field.Photo;
      }.bind(this))["catch"](function (e) {
        console.log(e);
      }.bind(this));
    },
    backIndex: function backIndex() {
      this.$router.push('/RoleAdmin/main/profile');
    },
    handleFile: function handleFile(files) {
      this.field.myFile = files.map(function (files) {
        return files.file;
      });
    }
  },
  mounted: function mounted() {
    var Id = this.$route.params.Id;
    if (Id) {
      this.getData(Id);
      // this.field.Id = Id
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/main/profile/form.vue?vue&type=template&id=3e30e44a&":
/*!******************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/src/components/backend/main/profile/form.vue?vue&type=template&id=3e30e44a& ***!
  \******************************************************************************************************************************************************************************************************************************************************************/
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
  }, [_vm._v("Upload Foto")]), _vm._v(" "), _c("file-pond", {
    ref: "pondMyFile",
    attrs: {
      name: "myFile",
      "label-idle": "Klik untuk mencari atau Taruh file disini...",
      "allow-multiple": false,
      files: _vm.field.myFile,
      "accepted-file-types": "image/jpeg, image/png"
    },
    on: {
      updatefiles: _vm.handleFile
    }
  })], 1), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Nama Lengkap")]), _vm._v(" "), _c("b-input", {
    staticClass: "mb-1",
    attrs: {
      name: "EmpName",
      state: _vm.allErrors.EmpName ? false : null,
      required: ""
    },
    model: {
      value: _vm.field.EmpName,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "EmpName", $$v);
      },
      expression: "field.EmpName"
    }
  }), _vm._v(" "), _vm.allErrors.EmpName ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.EmpName[0]))]) : _vm._e()], 1)], 1), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("NIP")]), _vm._v(" "), _c("b-input", {
    staticClass: "mb-1",
    attrs: {
      name: "NIP",
      state: _vm.allErrors.NIP ? false : null,
      type: "number"
    },
    model: {
      value: _vm.field.NIP,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "NIP", $$v);
      },
      expression: "field.NIP"
    }
  }), _vm._v(" "), _vm.allErrors.NIP ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.NIP[0]))]) : _vm._e()], 1), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Nomor HP")]), _vm._v(" "), _c("b-input", {
    staticClass: "mb-1",
    attrs: {
      name: "CellPhone",
      state: _vm.allErrors.CellPhone ? false : null,
      type: "number",
      required: ""
    },
    model: {
      value: _vm.field.CellPhone,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "CellPhone", $$v);
      },
      expression: "field.CellPhone"
    }
  }), _vm._v(" "), _vm.allErrors.CellPhone ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.CellPhone[0]))]) : _vm._e()], 1)], 1), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Password Lama")]), _vm._v(" "), _c("label", {
    staticClass: "form-label float-right text-primary"
  }, [_vm._v("*Isi jika ingin merubah Password")]), _vm._v(" "), _c("b-input", {
    staticClass: "mb-1",
    attrs: {
      name: "OldPassword",
      state: _vm.allErrors.OldPassword ? false : null,
      type: "password"
    },
    model: {
      value: _vm.field.OldPassword,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "OldPassword", $$v);
      },
      expression: "field.OldPassword"
    }
  }), _vm._v(" "), _vm.allErrors.OldPassword ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.OldPassword[0]))]) : _vm._e()], 1), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Password Baru")]), _vm._v(" "), _c("label", {
    staticClass: "form-label float-right text-primary"
  }, [_vm._v("*Isi jika ingin merubah Password")]), _vm._v(" "), _c("b-input", {
    staticClass: "mb-1",
    attrs: {
      name: "NewPassword",
      state: _vm.allErrors.NewPassword ? false : null,
      type: "password"
    },
    model: {
      value: _vm.field.NewPassword,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "NewPassword", $$v);
      },
      expression: "field.NewPassword"
    }
  }), _vm._v(" "), _vm.allErrors.NewPassword ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.NewPassword[0]))]) : _vm._e()], 1)], 1), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Konfirmasi Password Baru")]), _vm._v(" "), _c("label", {
    staticClass: "form-label float-right text-primary"
  }, [_vm._v("*Isi jika ingin merubah Password")]), _vm._v(" "), _c("b-input", {
    staticClass: "mb-1",
    attrs: {
      name: "ConfirmPassword",
      state: _vm.allErrors.ConfirmPassword ? false : null,
      type: "password"
    },
    model: {
      value: _vm.field.ConfirmPassword,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "ConfirmPassword", $$v);
      },
      expression: "field.ConfirmPassword"
    }
  }), _vm._v(" "), _vm.allErrors.ConfirmPassword ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.ConfirmPassword[0]))]) : _vm._e()], 1)], 1), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-6"
  }), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-6",
    attrs: {
      label: ""
    }
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

/***/ "./resources/assets/src/components/backend/main/profile/form.vue":
/*!***********************************************************************!*\
  !*** ./resources/assets/src/components/backend/main/profile/form.vue ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _form_vue_vue_type_template_id_3e30e44a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form.vue?vue&type=template&id=3e30e44a& */ "./resources/assets/src/components/backend/main/profile/form.vue?vue&type=template&id=3e30e44a&");
/* harmony import */ var _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form.vue?vue&type=script&lang=js& */ "./resources/assets/src/components/backend/main/profile/form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _form_vue_vue_type_template_id_3e30e44a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _form_vue_vue_type_template_id_3e30e44a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/src/components/backend/main/profile/form.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/src/components/backend/main/profile/form.vue?vue&type=script&lang=js&":
/*!************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/main/profile/form.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./form.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/main/profile/form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/src/components/backend/main/profile/form.vue?vue&type=template&id=3e30e44a&":
/*!******************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/main/profile/form.vue?vue&type=template&id=3e30e44a& ***!
  \******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_3e30e44a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./form.vue?vue&type=template&id=3e30e44a& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/main/profile/form.vue?vue&type=template&id=3e30e44a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_3e30e44a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_3e30e44a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
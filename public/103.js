(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[103],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/master/user-employee/form.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/src/components/backend/master/user-employee/form.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'form-user-employee',
  metaInfo: {
    title: 'Form User Karyawan'
  },
  components: {},
  data: function data() {
    return {
      urlSubmit: '/AdminVue/user-employee-insert',
      headerCard: 'User Karyawan',
      textBtnSubmit: 'Simpan',
      field: {
        CellPhone: 0
      },
      allErrors: [],
      isNotif: false,
      isFormCreate: true,
      alertNotif: '',
      alertVariant: 'alert-dark-danger',
      opsDepartment: [],
      opsPosition: [],
      opsTypeUser: []
    };
  },
  methods: {
    submitForm: function submitForm() {
      var isEmpty = false;
      if (this.field.IdDepartment === null || this.field.IdPosition === null || this.field.TypeUser === null) {
        isEmpty = true;
      }
      if (isEmpty) {
        this.$swal({
          icon: 'error',
          text: 'Silahkan lengkapi kolom *Wajib Diisi!'
        });
      } else {
        var formData = new FormData();
        formData.append("Id", this.field.Id);
        if (this.field.IdDepartment) formData.append("IdDepartment", this.field.IdDepartment.Id);
        if (this.field.IdPosition) formData.append("IdPosition", this.field.IdPosition.Id);
        formData.append("Name", this.field.Name);
        formData.append("NIP", this.field.NIP);
        formData.append("CellPhone", this.field.CellPhone);
        if (this.field.TypeUser) formData.append("TypeUser", this.field.TypeUser.Id);
        formData.append("UserName", this.field.UserName);
        if (this.field.Password) formData.append("Password", this.field.Password);
        formData.append("Email", this.field.Email);
        var config = {
          headers: {
            'content-type': 'multipart/form-data'
          }
        };
        axios.post(this.urlSubmit, formData, config).then(function (res) {
          var resp = res.data;
          if (resp.status) {
            this.$router.push({
              name: 'master/data-user-employee',
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
      }
    },
    getData: function getData(Id) {
      axios.post('/AdminVue/user-employee-edit', {
        Id: Id
      }).then(function (res) {
        var resp = res.data;
        this.field = resp.data;
        if (this.field.IdDepartment) this.getPosition(this.field.IdDepartment.Id);
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.isNotif = true;
        this.alertNotif = 'Invalid Server Side!';
        this.alertVariant = 'alert-dark-danger';
      }.bind(this));
    },
    getDepartment: function getDepartment() {
      axios.post('/AdminVue/user-get-department').then(function (res) {
        this.opsDepartment = res.data.data;
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.opsDepartment = [];
      }.bind(this));
    },
    getPosition: function getPosition(IdDepartment) {
      axios.post('/AdminVue/user-get-position', {
        IdDepartment: IdDepartment
      }).then(function (res) {
        this.opsPosition = res.data.data;
        if (this.opsPosition.length == 0) this.field.IdPosition = null;
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.opsPosition = [];
      }.bind(this));
    },
    getTypeUser: function getTypeUser() {
      axios.post('/AdminVue/user-get-type-user').then(function (res) {
        this.opsTypeUser = res.data.data;
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.opsTypeUser = [];
      }.bind(this));
    },
    backIndex: function backIndex() {
      this.$router.push('/RoleAdmin/master/data-user-employee');
    },
    onSelect: function onSelect(option) {
      this.getPosition(option.Id);
    }
  },
  mounted: function mounted() {
    this.getDepartment();
    this.getTypeUser();
    if (this.$route.params.isFormEdit) {
      this.isFormCreate = false;
      var Id = this.$route.params.Id;
      if (Id) {
        this.getData(Id);
        this.field.Id = Id;
        this.urlSubmit = '/AdminVue/user-employee-update';
        this.textBtnSubmit = 'Simpan';
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/master/user-employee/form.vue?vue&type=template&id=510526ab&":
/*!**************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/src/components/backend/master/user-employee/form.vue?vue&type=template&id=510526ab& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************/
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
  }, [_vm._v("Departemen")]), _vm._v(" "), _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]), _vm._v(" "), _c("multiselect", {
    attrs: {
      options: _vm.opsDepartment,
      "allow-empty": false,
      placeholder: "Pilih Departemen",
      label: "Department",
      "track-by": "Department"
    },
    on: {
      select: _vm.onSelect
    },
    model: {
      value: _vm.field.IdDepartment,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "IdDepartment", $$v);
      },
      expression: "field.IdDepartment"
    }
  }), _vm._v(" "), _vm.allErrors.IdDepartment ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.IdDepartment[0]))]) : _vm._e()], 1), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Posisi")]), _vm._v(" "), _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]), _vm._v(" "), _c("multiselect", {
    attrs: {
      options: _vm.opsPosition,
      "allow-empty": true,
      placeholder: "Pilih Posisi",
      label: "Position",
      "track-by": "Position"
    },
    model: {
      value: _vm.field.IdPosition,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "IdPosition", $$v);
      },
      expression: "field.IdPosition"
    }
  }), _vm._v(" "), _vm.allErrors.IdPosition ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.IdPosition[0]))]) : _vm._e()], 1)], 1), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Nama Karyawan")]), _vm._v(" "), _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]), _vm._v(" "), _c("b-input", {
    staticClass: "mb-1",
    attrs: {
      name: "Name",
      state: _vm.allErrors.Name ? false : null,
      required: ""
    },
    model: {
      value: _vm.field.Name,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "Name", $$v);
      },
      expression: "field.Name"
    }
  }), _vm._v(" "), _vm.allErrors.Name ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.Name[0]))]) : _vm._e()], 1), _vm._v(" "), _c("b-form-group", {
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
  }, [_vm._v(_vm._s(_vm.allErrors.NIP[0]))]) : _vm._e()], 1)], 1), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("No. HP")]), _vm._v(" "), _c("b-input", {
    staticClass: "mb-1",
    attrs: {
      name: "CellPhone",
      state: _vm.allErrors.CellPhone ? false : null,
      type: "number"
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
  }, [_vm._v(_vm._s(_vm.allErrors.CellPhone[0]))]) : _vm._e()], 1), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Hak Akses User")]), _vm._v(" "), _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]), _vm._v(" "), _c("multiselect", {
    attrs: {
      options: _vm.opsTypeUser,
      "allow-empty": false,
      placeholder: "Pilih Hak Akses User",
      label: "TypeUser",
      "track-by": "TypeUser"
    },
    model: {
      value: _vm.field.TypeUser,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "TypeUser", $$v);
      },
      expression: "field.TypeUser"
    }
  }), _vm._v(" "), _vm.allErrors.TypeUser ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.TypeUser[0]))]) : _vm._e()], 1)], 1), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Nama User")]), _vm._v(" "), _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]), _vm._v(" "), _c("b-input", {
    staticClass: "mb-1",
    attrs: {
      name: "UserName",
      state: _vm.allErrors.UserName ? false : null,
      required: ""
    },
    model: {
      value: _vm.field.UserName,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "UserName", $$v);
      },
      expression: "field.UserName"
    }
  }), _vm._v(" "), _vm.allErrors.UserName ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.UserName[0]))]) : _vm._e()], 1), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Password")]), _vm._v(" "), _vm.isFormCreate ? _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]) : _vm._e(), _vm._v(" "), !_vm.isFormCreate ? _c("label", {
    staticClass: "form-label float-right text-primary"
  }, [_vm._v("*Kosongkan jika tidak ingin merubah Password")]) : _vm._e(), _vm._v(" "), _c("b-input", {
    staticClass: "mb-1",
    attrs: {
      name: "Password",
      state: _vm.allErrors.Password ? false : null,
      type: "password",
      required: _vm.isFormCreate
    },
    model: {
      value: _vm.field.Password,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "Password", $$v);
      },
      expression: "field.Password"
    }
  }), _vm._v(" "), _vm.allErrors.Password ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.Password[0]))]) : _vm._e()], 1)], 1), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Email")]), _vm._v(" "), _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]), _vm._v(" "), _c("b-input", {
    staticClass: "mb-1",
    attrs: {
      type: "email",
      name: "Email",
      state: _vm.allErrors.Email ? false : null,
      required: ""
    },
    model: {
      value: _vm.field.Email,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "Email", $$v);
      },
      expression: "field.Email"
    }
  }), _vm._v(" "), _vm.allErrors.Email ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.Email[0]))]) : _vm._e()], 1)], 1), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
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

/***/ "./resources/assets/src/components/backend/master/user-employee/form.vue":
/*!*******************************************************************************!*\
  !*** ./resources/assets/src/components/backend/master/user-employee/form.vue ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _form_vue_vue_type_template_id_510526ab___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form.vue?vue&type=template&id=510526ab& */ "./resources/assets/src/components/backend/master/user-employee/form.vue?vue&type=template&id=510526ab&");
/* harmony import */ var _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form.vue?vue&type=script&lang=js& */ "./resources/assets/src/components/backend/master/user-employee/form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _form_vue_vue_type_template_id_510526ab___WEBPACK_IMPORTED_MODULE_0__["render"],
  _form_vue_vue_type_template_id_510526ab___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/src/components/backend/master/user-employee/form.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/src/components/backend/master/user-employee/form.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/master/user-employee/form.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./form.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/master/user-employee/form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/src/components/backend/master/user-employee/form.vue?vue&type=template&id=510526ab&":
/*!**************************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/master/user-employee/form.vue?vue&type=template&id=510526ab& ***!
  \**************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_510526ab___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./form.vue?vue&type=template&id=510526ab& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/master/user-employee/form.vue?vue&type=template&id=510526ab&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_510526ab___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_510526ab___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[94],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/master/position/form.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/src/components/backend/master/position/form.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'form-position',
  metaInfo: {
    title: 'Form Position'
  },
  components: {},
  data: function data() {
    return {
      urlSubmit: '/AdminVue/position-insert',
      headerCard: 'Posisi',
      textBtnSubmit: 'Simpan',
      field: {},
      allErrors: [],
      opsParent: [],
      opsDepartment: [],
      opsDivision: [],
      opsStatus: [{
        'value': 1,
        text: 'Active'
      }, {
        'value': 0,
        text: 'Not Active'
      }],
      isNotif: false,
      alertNotif: '',
      alertVariant: 'alert-dark-danger',
      isShow: false
    };
  },
  methods: {
    submitForm: function submitForm() {
      var isEmpty = false;
      if (!this.field.Department || !this.field.Division) {
        isEmpty = true;
      }
      if (isEmpty) {
        this.$swal({
          icon: 'error',
          text: 'Silahkan lengkapi kolom *Wajib Diisi!'
        });
      } else {
        var formData = new FormData();
        if (this.field.Parent) this.field.Parent = this.field.Parent;else this.field.Parent = 0;
        formData.append("Id", this.field.Id);
        if (this.field.Department) formData.append("IdDepartment", this.field.Department.Id);else formData.append("IdDepartment", 0);
        if (this.field.Division) formData.append("IdDivision", this.field.Division.Id);else formData.append("IdDivision", 0);
        formData.append("Parent", JSON.stringify(this.field.Parent));
        formData.append("Code", this.field.Code);
        formData.append("Name", this.field.Name);
        formData.append("Status", this.field.Status.value);
        var config = {
          headers: {
            'content-type': 'multipart/form-data'
          }
        };
        axios.post(this.urlSubmit, formData, config).then(function (res) {
          var resp = res.data;
          if (resp.status) {
            this.$router.push({
              name: 'master/data-position',
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
      axios.post('/AdminVue/position-edit', {
        Id: Id
      }).then(function (res) {
        var resp = res.data;
        this.field = resp.data;
        if (this.field.Division && this.isShow == false) this.getDepartment(this.field.Division.Id);
        if (this.field.Department != 0 && this.isShow == false) {
          this.getParent(null, 1);
        }
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.isNotif = true;
        this.alertNotif = 'Invalid Server Side!';
        this.alertVariant = 'alert-dark-danger';
      }.bind(this));
    },
    getDivision: function getDivision() {
      axios.post('/AdminVue/position-get-division', {}).then(function (res) {
        this.opsDivision = res.data.data;
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.opsDivision = [];
      }.bind(this));
    },
    getDepartment: function getDepartment(Id) {
      axios.post('/AdminVue/position-get-department', {
        IdDivision: Id
      }).then(function (res) {
        this.opsDepartment = res.data.data;
        if (this.opsDepartment.length < 1) this.field.Department = null;
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.opsDepartment = [];
      }.bind(this));
    },
    getParent: function getParent(value) {
      var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      if (mode == 0) var id = value.Id;else var id = this.field.Department.Id;
      var idPosition = 0;
      if (this.field.Id) idPosition = this.field.Id;
      axios.post('/AdminVue/position-getParent', {
        IdPosition: idPosition,
        IdDepartment: id
      }).then(function (res) {
        this.opsParent = res.data.parent;
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.opsParent = [];
      }.bind(this));
    },
    backIndex: function backIndex() {
      this.$router.push('/RoleAdmin/master/data-position');
    },
    onSelect: function onSelect(option) {
      if (option) this.getDepartment(option.Id);
    }
  },
  mounted: function mounted() {
    if (this.$route.params.isFormEdit) {
      var Id = this.$route.params.Id;
      if (Id) {
        this.getData(Id);
        this.field.Id = Id;
        this.urlSubmit = '/AdminVue/position-update';
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
    if (this.isShow == false) this.getDivision();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/master/position/form.vue?vue&type=template&id=5c71661c&":
/*!*********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/src/components/backend/master/position/form.vue?vue&type=template&id=5c71661c& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************/
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
  }, [_vm._v("Kode")]), _vm._v(" "), _vm.isShow == false ? _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]) : _vm._e(), _vm._v(" "), _c("b-input", {
    staticClass: "mb-1",
    attrs: {
      name: "Code",
      state: _vm.allErrors.Code ? false : null,
      required: "",
      readonly: _vm.isShow
    },
    model: {
      value: _vm.field.Code,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "Code", $$v);
      },
      expression: "field.Code"
    }
  }), _vm._v(" "), _vm.allErrors.Code ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.Code[0]))]) : _vm._e()], 1), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-4"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Divisi")]), _vm._v(" "), _vm.isShow == false ? _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]) : _vm._e(), _vm._v(" "), _c("multiselect", {
    attrs: {
      options: _vm.opsDivision,
      "allow-empty": false,
      "show-labels": false,
      placeholder: "Pilih Divisi",
      label: "Department",
      "track-by": "Department",
      disabled: _vm.isShow
    },
    on: {
      select: _vm.onSelect
    },
    model: {
      value: _vm.field.Division,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "Division", $$v);
      },
      expression: "field.Division"
    }
  }), _vm._v(" "), _vm.allErrors.Division ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.Division[0]))]) : _vm._e()], 1), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-4"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Departemen")]), _vm._v(" "), _vm.isShow == false ? _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]) : _vm._e(), _vm._v(" "), _c("multiselect", {
    attrs: {
      options: _vm.opsDepartment,
      "allow-empty": false,
      placeholder: "Pilih Departemen",
      label: "Department",
      "track-by": "Department",
      disabled: _vm.isShow
    },
    on: {
      input: _vm.getParent
    },
    model: {
      value: _vm.field.Department,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "Department", $$v);
      },
      expression: "field.Department"
    }
  }), _vm._v(" "), _vm.isShow == false ? _c("small", {
    staticClass: "float-right text-primary"
  }, [_vm._v("Pilih Divisi Terlebih Dahulu")]) : _vm._e(), _vm._v(" "), _vm.allErrors.Department ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.Department[0]))]) : _vm._e()], 1)], 1), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-4"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Atasan Posisi")]), _vm._v(" "), _c("multiselect", {
    attrs: {
      multiple: true,
      options: _vm.opsParent,
      "allow-empty": true,
      placeholder: "Pilih Departemen Dahulu",
      label: "Name",
      "track-by": "Name",
      disabled: _vm.isShow
    },
    model: {
      value: _vm.field.Parent,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "Parent", $$v);
      },
      expression: "field.Parent"
    }
  }), _vm._v(" "), _vm.allErrors.Parent ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.Parent[0]))]) : _vm._e()], 1), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-4"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Posisi")]), _vm._v(" "), _vm.isShow == false ? _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]) : _vm._e(), _vm._v(" "), _c("b-input", {
    staticClass: "mb-1",
    attrs: {
      name: "Name",
      state: _vm.allErrors.Name ? false : null,
      required: "",
      readonly: _vm.isShow
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
    staticClass: "col-md-4"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Status")]), _vm._v(" "), _vm.isShow == false ? _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]) : _vm._e(), _vm._v(" "), _c("multiselect", {
    attrs: {
      preselectFirst: true,
      options: _vm.opsStatus,
      "allow-empty": false,
      "show-labels": false,
      selectLabel: "",
      deselectLabel: "",
      placeholder: "Pilih Status",
      label: "text",
      "track-by": "text",
      disabled: _vm.isShow
    },
    model: {
      value: _vm.field.Status,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "Status", $$v);
      },
      expression: "field.Status"
    }
  }), _vm._v(" "), _vm.isShow == false ? _c("small", {
    staticClass: "float-right text-primary"
  }, [_vm._v("*Status Active untuk Setujui Laporan NOE & NOD")]) : _vm._e(), _vm._v(" "), _vm.allErrors.Division ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.Division[0]))]) : _vm._e()], 1)], 1), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
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

/***/ "./resources/assets/src/components/backend/master/position/form.vue":
/*!**************************************************************************!*\
  !*** ./resources/assets/src/components/backend/master/position/form.vue ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _form_vue_vue_type_template_id_5c71661c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form.vue?vue&type=template&id=5c71661c& */ "./resources/assets/src/components/backend/master/position/form.vue?vue&type=template&id=5c71661c&");
/* harmony import */ var _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form.vue?vue&type=script&lang=js& */ "./resources/assets/src/components/backend/master/position/form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _form_vue_vue_type_template_id_5c71661c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _form_vue_vue_type_template_id_5c71661c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/src/components/backend/master/position/form.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/src/components/backend/master/position/form.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/master/position/form.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./form.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/master/position/form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/src/components/backend/master/position/form.vue?vue&type=template&id=5c71661c&":
/*!*********************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/master/position/form.vue?vue&type=template&id=5c71661c& ***!
  \*********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_5c71661c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./form.vue?vue&type=template&id=5c71661c& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/master/position/form.vue?vue&type=template&id=5c71661c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_5c71661c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_5c71661c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
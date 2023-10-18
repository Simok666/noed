(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/nod/nod-review/form.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/src/components/backend/nod/nod-review/form.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'form-nod-review',
  metaInfo: {
    title: 'Form NOD Review'
  },
  components: {},
  data: function data() {
    return {
      urlSubmit: '/AdminVue/nod-review-insert',
      headerCard: 'Review NOD',
      textBtnSubmit: 'Simpan',
      field: {
        NOENumber: '',
        BatchNo: '',
        IdProduct: '',
        Event: '',
        ProperCondition: '',
        Man: '',
        Machine: '',
        Method: '',
        Material: '',
        Milieu: '',
        // IdCAPIC: '',
        // CADate: '',
        // CADescription: '',
        // CAFile: [],
        // CAFileName: [],
        // IdPAPIC: '',
        // PADate: '',
        // PADescription: '',
        // PAFile: [],
        // PAFileName: [],
        NODCA: [{
          CAPIC: '',
          CADate: '',
          CADescription: '',
          CAFile: []
        }],
        NODPA: [{
          PAPIC: '',
          PADate: '',
          PADescription: '',
          PAFile: []
        }],
        OtherSA: [{
          Assesment: '',
          Description: '',
          AssesmentFile: ''
        }],
        VerifCAPA: '',
        DescriptionCAPA: ''
      },
      allErrors: [],
      isNotif: false,
      isEdit: false,
      alertNotif: '',
      alertVariant: 'alert-dark-danger',
      opsNODNumber: [],
      opsOSA: [{
        'value': 'Ada',
        'text': 'Ada'
      }, {
        'value': 'Tidak Ada',
        'text': 'Tidak Ada'
      }],
      IsOSA: false,
      opsAssesment: [],
      oldAssesmentFile: [],
      valStatus: 0,
      Position: 0,
      //1 = unit head; 2 = sect head; 3 = dept head;
      isShow: false,
      isApprove: false,
      isShowAll: false,
      opsVerifCAPA: [{
        'value': 'CAPA telah dilaksanakan dengan baik',
        'text': 'CAPA telah dilaksanakan dengan baik'
      }, {
        'value': 'Perlu CAPA lain',
        'text': 'Perlu CAPA lain'
      }],
      descCAPA: false,
      BaseUrl: "/",
      isCaretaker: false
    };
  },
  methods: {
    submitForm: function submitForm() {
      this.showLoading();
      var isEmpty = false;
      if (this.field.OtherSA && this.field.IsOSA && this.field.IsOSA.value == "Ada") {
        this.field.OtherSA.forEach(function (data, index) {
          if (data.Assesment == '') {
            isEmpty = true;
            return false;
          }
        });
      }
      if (isEmpty) {
        this.$swal({
          icon: 'error',
          text: 'Silahkan lengkapi kolom *Wajib Diisi!'
        });
      } else {
        var formData = new FormData();
        formData.append("Id", this.field.Id);
        if (this.field.NODNumber) formData.append("NODNumber", this.field.NODNumber.Id);
        if (this.field.IsOSA) {
          formData.append("IsOSA", this.field.IsOSA.value);
          if (this.field.IsOSA.value == "Ada") {
            for (var i = 0; i < this.field.OtherSA.length; i++) {
              if (this.field.OtherSA[i].file) var file = this.field.OtherSA[i].file;
              formData.append('Assesment[' + i + ']', JSON.stringify(this.field.OtherSA[i].Assesment));
              formData.append('Description[' + i + ']', this.field.OtherSA[i].Description);
              if (this.field.OtherSA[i].file) formData.append('AssesmentFile[' + i + ']', file[0]);
            }
            formData.append("OldAssesmentFile", JSON.stringify(this.oldAssesmentFile));
          }
        }
        var config = {
          headers: {
            'content-type': 'multipart/form-data'
          }
        };
        axios.post(this.urlSubmit, formData, config).then(function (res) {
          var resp = res.data;
          if (resp.status) {
            this.$router.push({
              name: 'nod/data-nod-review',
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
      }
    },
    onChange: function onChange(option) {
      if (option) this.getDataNOD(option.Id);
    },
    onChangeOSA: function onChangeOSA(option) {
      if (option.value == "Ada" || option == "Ada") {
        this.IsOSA = true;
      } else {
        this.IsOSA = false;
        this.field.OtherSA = [{
          Assesment: '',
          Description: '',
          AssesmentFile: ''
        }];
      }
    },
    onChangeVerifCAPA: function onChangeVerifCAPA(option) {
      if (option.value == "CAPA telah dilaksanakan dengan baik") this.descCAPA = false;else this.descCAPA = true;
    },
    onSelectDevRisk: function onSelectDevRisk(value, index) {
      var isExist = false;
      if (this.field.OtherSA.length && this.field.OtherSA.length > 1) {
        this.field.OtherSA.forEach(function (data, index) {
          if (data.Assesment.RiskAssesment == value.RiskAssesment) isExist = true;
        });
      }
      if (isExist) {
        this.$swal({
          icon: 'error',
          text: 'Assesment tidak boleh sama!'
        }).then(function () {
          setTimeout(function () {
            document.getElementById("btambah-risk").focus();
          }, 500);
        });
        this.removeDetail(index);
      }
    },
    getData: function getData(Id) {
      axios.post('/AdminVue/nod-review-edit', {
        Id: Id
      }).then(function (res) {
        var _this = this;
        var resp = res.data;
        this.Position = res.data.position;
        this.field = resp.data;
        this.onChangeOSA(this.field.IsOSA);
        if (this.field.OtherSA == null) this.field.OtherSA = [{
          Assesment: '',
          Description: '',
          AssesmentFile: ''
        }];
        if (res.data.data.IsOSA.value == 'Ada') {
          this.field.OtherSA.forEach(function (value, index) {
            if (value) {
              value.Assesment = JSON.parse(value.Assesment);
              if (value.file != '') {
                _this.oldAssesmentFile.push(value.file);
                value.file = window.location.origin + '/' + value.file;
                var result = value.fileName.split('/');
                value.fileName = result[4];
              } else {
                _this.oldAssesmentFile.push('');
              }
            }
          });
        }
        if (this.field.Status) {
          if (this.field.Status == 'UnPublish') this.valStatus = 1;
          if (this.field.Status == 'Dilaporkan ke QA APJ') this.valStatus = 2;
          if (this.field.Status == 'Disetujui oleh QA Sect.Head') this.valStatus = 3;
          if (this.field.Status == 'Disetujui oleh QA Dept.Head') this.valStatus = 4;
          if (this.field.Status == 'Ditolak') this.valStatus = 5;
        }
        if (this.isShow == true && this.isApprove == false) this.isShowAll == true;
        this.isCaretaker = res.data.isCaretaker;
        this.field.NODCA = res.data.NODCA;
        this.field.NODPA = res.data.NODPA;
        this.field.NODCA.forEach(function (value, index) {
          if (value) {
            if (value.CAFile != '') {
              value.CAFile = JSON.parse(value.CAFile);
              value.CAFileName = [];
              value.CAFile.forEach(function (val, i) {
                value.CAFile[i] = window.location.origin + '/' + val;
                var result = val.split('/');
                value.CAFileName[i] = result[4];
              });
            }
          }
        });
        this.field.NODPA.forEach(function (value, index) {
          if (value) {
            if (value.PAFile != '') {
              value.PAFile = JSON.parse(value.PAFile);
              value.PAFileName = [];
              value.PAFile.forEach(function (val, i) {
                value.PAFile[i] = window.location.origin + '/' + val;
                var result = val.split('/');
                value.PAFileName[i] = result[4];
              });
            }
          }
        });
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.isNotif = true;
        this.alertNotif = 'Invalid Server Side!';
        this.alertVariant = 'alert-dark-danger';
      }.bind(this));
    },
    getNODNumber: function getNODNumber() {
      axios.post('/AdminVue/nod-review-get-nod-number').then(function (res) {
        this.opsNODNumber = res.data.data;
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.opsNODNumber = [];
      }.bind(this));
    },
    getDataNOD: function getDataNOD(Id) {
      axios.post('/AdminVue/nod-review-get-data-nod', {
        Id: Id
      }).then(function (res) {
        this.field.NOENumber = res.data.data.NOENumber;
        this.field.BatchNo = res.data.data.BatchNo;
        this.field.IdProduct = res.data.data.IdProduct;
        this.field.Event = res.data.data.Event;
        this.field.ProperCondition = res.data.data.ProperCondition;
        this.field.Man = res.data.data.Man;
        this.field.Machine = res.data.data.Machine;
        this.field.Method = res.data.data.Method;
        this.field.Material = res.data.data.Material;
        this.field.Milieu = res.data.data.Milieu;

        /*this.field.IdCAPIC = res.data.data.IdCAPIC
        this.field.CADate = res.data.data.CADate
        this.field.CADescription = res.data.data.CADescription
        this.field.FileCA = res.data.data.FileCA
        if(res.data.data.FileCA != '') {
          let countFileCA = this.field.FileCA.length
          for(let i = 0; i < countFileCA; i++) {
            this.field.CAFile.push(process.env.BASE_URL + this.field.FileCA[i])
          }
        }
        this.field.CAFileName = res.data.data.CAFileName
        this.field.IdPAPIC = res.data.data.IdPAPIC
        this.field.PADate = res.data.data.PADate
        this.field.PADescription = res.data.data.PADescription
        this.field.FilePA = res.data.data.FilePA
        if(res.data.data.FilePA != '') {
          let countFilePA = this.field.FilePA.length
          for(let i = 0; i < countFilePA; i++) {
            this.field.PAFile.push(process.env.BASE_URL + this.field.FilePA[i])
          }
        }
        this.field.PAFileName = res.data.data.PAFileName*/

        this.field.NODCA = res.data.NODCA;
        this.field.NODPA = res.data.NODPA;
        this.field.NODCA.forEach(function (value, index) {
          if (value) {
            if (value.CAFile != '') {
              value.CAFile = JSON.parse(value.CAFile);
              value.CAFileName = [];
              value.CAFile.forEach(function (val, i) {
                value.CAFile[i] = window.location.origin + '/' + val;
                var result = val.split('/');
                value.CAFileName[i] = result[4];
              });
            }
          }
        });
        this.field.NODPA.forEach(function (value, index) {
          if (value) {
            if (value.PAFile != '') {
              value.PAFile = JSON.parse(value.PAFile);
              value.PAFileName = [];
              value.PAFile.forEach(function (val, i) {
                value.PAFile[i] = window.location.origin + '/' + val;
                var result = val.split('/');
                value.PAFileName[i] = result[4];
              });
            }
          }
        });
      }.bind(this))["catch"](function (e) {
        console.log(e);
      }.bind(this));
    },
    getDevRiskAssesment: function getDevRiskAssesment() {
      axios.post('/AdminVue/nod-review-get-risk-assesment').then(function (res) {
        this.opsAssesment = res.data.data;
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.opsAssesment = [];
      }.bind(this));
    },
    handleFileAssesment: function handleFileAssesment(files, index) {
      this.field.OtherSA[index].file = files.map(function (files) {
        return files.file;
      });
    },
    handleRemoveFileAssesment: function handleRemoveFileAssesment(error, files) {
      var result = _typeof(files.source);
      if (this.isEdit == true && result === 'string') {
        console.log(window.location.origin);
        var index = this.oldAssesmentFile.indexOf(files.source.replace(window.location.origin + '/clouds', 'clouds'));
        this.oldAssesmentFile.splice(index, 1);
        // this.oldAssesmentFile.splice(0,1)
      }
    },
    addDetail: function addDetail() {
      this.field.OtherSA.push({
        'Assesment': '',
        'Description': '',
        'AssesmentFile': ''
      });
    },
    removeDetail: function removeDetail(index) {
      if (this.isEdit == true) {
        this.oldAssesmentFile.splice(index, 1);
      }
      this.field.OtherSA.splice(index, 1);
    },
    backIndex: function backIndex() {
      this.$router.push('/RoleAdmin/nod/data-nod-review');
    },
    onAction: function onAction(action) {
      if (action == 'publish') {
        this.publish('/AdminVue/nod-review-publish', this.field.Id, this.$parent, true);
      }
      if (action == 'approve') {
        if (this.field.VerifCAPA && this.field.VerifCAPA.value) {
          this.approveCAPA('/AdminVue/nod-review-approve', this.field.Id, this.$parent, this.field.VerifCAPA, this.field.DescriptionCAPA, this.isCaretaker);
        } else {
          this.$swal({
            icon: 'error',
            text: 'Silahkan lengkapi kolom *Wajib Diisi!'
          });
        }
      }
      if (action == 'reject') {
        this.rejectOld('/AdminVue/nod-review-reject', this.field.Id, this.$parent, null, this.isCaretaker);
      }
      if (action == 'correction') {
        this.$router.push({
          name: 'nod/form-correction-nod-review',
          params: {
            Id: this.field.Id,
            isCaretaker: this.isCaretaker
          }
        });
      }
    }
  },
  mounted: function mounted() {
    this.getNODNumber();
    this.getDevRiskAssesment();
    if (this.$route.params.isFormEdit) {
      var Id = this.$route.params.Id;
      this.isEdit = true;
      if (Id) {
        this.getData(Id);
        this.field.Id = Id;
        this.urlSubmit = '/AdminVue/nod-review-update';
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
    if (this.$route.params.isApprove) {
      this.isApprove = this.$route.params.isApprove;
      var Id = this.$route.params.Id;
      if (Id) {
        this.getData(Id);
        this.field.Id = Id;
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/nod/nod-review/form.vue?vue&type=template&id=c0745340&":
/*!********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/src/components/backend/nod/nod-review/form.vue?vue&type=template&id=c0745340& ***!
  \********************************************************************************************************************************************************************************************************************************************************************/
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
  }, [_vm._v("No. NOD")]), _vm._v(" "), _vm.isShow == false ? _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Dipilih")]) : _vm._e(), _vm._v(" "), _c("multiselect", {
    attrs: {
      options: _vm.opsNODNumber,
      "allow-empty": false,
      placeholder: "Pilih No. NOD",
      label: "NODNumber",
      "track-by": "NODNumber",
      required: "",
      disabled: _vm.isShow
    },
    on: {
      input: _vm.onChange
    },
    model: {
      value: _vm.field.NODNumber,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "NODNumber", $$v);
      },
      expression: "field.NODNumber"
    }
  }), _vm._v(" "), _vm.allErrors.NODNumber ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.NODNumber[0]))]) : _vm._e()], 1), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("No. NOE")]), _vm._v(" "), _c("b-input", {
    staticClass: "mb-1",
    attrs: {
      name: "NOENumber",
      state: _vm.allErrors.NOENumber ? false : null,
      readonly: ""
    },
    model: {
      value: _vm.field.NOENumber,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "NOENumber", $$v);
      },
      expression: "field.NOENumber"
    }
  }), _vm._v(" "), _vm.allErrors.NOENumber ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.NOENumber[0]))]) : _vm._e()], 1)], 1), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("No. Kontrol / No. Bets")]), _vm._v(" "), _c("b-input", {
    staticClass: "mb-1",
    attrs: {
      name: "BatchNo",
      state: _vm.allErrors.BatchNo ? false : null,
      readonly: ""
    },
    model: {
      value: _vm.field.BatchNo,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "BatchNo", $$v);
      },
      expression: "field.BatchNo"
    }
  }), _vm._v(" "), _vm.allErrors.BatchNo ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.BatchNo[0]))]) : _vm._e()], 1), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Bahan / Produk Terkait")]), _vm._v(" "), _c("b-input", {
    staticClass: "mb-1",
    attrs: {
      name: "IdProduct",
      state: _vm.allErrors.IdProduct ? false : null,
      readonly: ""
    },
    model: {
      value: _vm.field.IdProduct,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "IdProduct", $$v);
      },
      expression: "field.IdProduct"
    }
  }), _vm._v(" "), _vm.allErrors.IdProduct ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.IdProduct[0]))]) : _vm._e()], 1)], 1), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Uraian / Kondisi Ketidaksesuaian")]), _vm._v(" "), _c("b-textarea", {
    staticClass: "mb-1",
    attrs: {
      name: "Event",
      state: _vm.allErrors.Event ? false : null,
      readonly: ""
    },
    model: {
      value: _vm.field.Event,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "Event", $$v);
      },
      expression: "field.Event"
    }
  }), _vm._v(" "), _vm.allErrors.Event ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.Event[0]))]) : _vm._e()], 1), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Kondisi Seharusnya")]), _vm._v(" "), _c("b-textarea", {
    staticClass: "mb-1",
    attrs: {
      name: "ProperCondition",
      state: _vm.allErrors.ProperCondition ? false : null,
      readonly: ""
    },
    model: {
      value: _vm.field.ProperCondition,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "ProperCondition", $$v);
      },
      expression: "field.ProperCondition"
    }
  }), _vm._v(" "), _vm.allErrors.ProperCondition ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.ProperCondition[0]))]) : _vm._e()], 1)], 1), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Man (Personel)")]), _vm._v(" "), _c("b-textarea", {
    staticClass: "mb-1",
    attrs: {
      name: "Man",
      state: _vm.allErrors.Man ? false : null,
      readonly: ""
    },
    model: {
      value: _vm.field.Man,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "Man", $$v);
      },
      expression: "field.Man"
    }
  }), _vm._v(" "), _vm.allErrors.Man ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.Man[0]))]) : _vm._e()], 1), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Machine (Mesin / Peralatan)")]), _vm._v(" "), _c("b-textarea", {
    staticClass: "mb-1",
    attrs: {
      name: "Machine",
      state: _vm.allErrors.Machine ? false : null,
      readonly: ""
    },
    model: {
      value: _vm.field.Machine,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "Machine", $$v);
      },
      expression: "field.Machine"
    }
  }), _vm._v(" "), _vm.allErrors.Machine ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.Machine[0]))]) : _vm._e()], 1)], 1), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Method (Metode / Prosedur)")]), _vm._v(" "), _c("b-textarea", {
    staticClass: "mb-1",
    attrs: {
      name: "Method",
      state: _vm.allErrors.Method ? false : null,
      readonly: ""
    },
    model: {
      value: _vm.field.Method,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "Method", $$v);
      },
      expression: "field.Method"
    }
  }), _vm._v(" "), _vm.allErrors.Method ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.Method[0]))]) : _vm._e()], 1), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Material (Produk / Bahan)")]), _vm._v(" "), _c("b-textarea", {
    staticClass: "mb-1",
    attrs: {
      name: "Material",
      state: _vm.allErrors.Material ? false : null,
      readonly: ""
    },
    model: {
      value: _vm.field.Material,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "Material", $$v);
      },
      expression: "field.Material"
    }
  }), _vm._v(" "), _vm.allErrors.Material ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.Material[0]))]) : _vm._e()], 1)], 1), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Milieu (Lingkungan)")]), _vm._v(" "), _c("b-textarea", {
    staticClass: "mb-1",
    attrs: {
      name: "Milieu",
      state: _vm.allErrors.Milieu ? false : null,
      readonly: ""
    },
    model: {
      value: _vm.field.Milieu,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "Milieu", $$v);
      },
      expression: "field.Milieu"
    }
  }), _vm._v(" "), _vm.allErrors.Milieu ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.Milieu[0]))]) : _vm._e()], 1)], 1), _vm._v(" "), _c("b-card", {
    staticClass: "mb-4",
    attrs: {
      header: "Tindakan Perbaikan (Corrective Action)",
      "header-tag": "h5"
    }
  }, [_vm._l(_vm.field.NODCA, function (item, index) {
    return [_c("b-form-row", [_c("b-form-group", {
      staticClass: "col-md-6"
    }, [_c("label", {
      staticClass: "form-label"
    }, [_vm._v("PIC")]), _vm._v(" "), _c("b-input", {
      staticClass: "mb-1",
      attrs: {
        name: "CAPIC",
        readonly: ""
      },
      model: {
        value: item.CAPIC,
        callback: function callback($$v) {
          _vm.$set(item, "CAPIC", $$v);
        },
        expression: "item.CAPIC"
      }
    })], 1), _vm._v(" "), _c("b-form-group", {
      staticClass: "col-md-5 col-10"
    }, [_c("label", {
      staticClass: "form-label"
    }, [_vm._v("Due Date")]), _vm._v(" "), _c("b-form-datepicker", {
      staticClass: "mb-1",
      attrs: {
        locale: "en",
        "date-format-options": _vm.datePickerFormat,
        required: "",
        disabled: true
      },
      model: {
        value: item.CADate,
        callback: function callback($$v) {
          _vm.$set(item, "CADate", $$v);
        },
        expression: "item.CADate"
      }
    })], 1)], 1), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
      staticClass: "col-md-6"
    }, [_c("label", {
      staticClass: "form-label"
    }, [_vm._v("Deskripsi")]), _vm._v(" "), _c("b-textarea", {
      staticClass: "mb-1",
      attrs: {
        name: "CADescription",
        required: "",
        readonly: true
      },
      model: {
        value: item.CADescription,
        callback: function callback($$v) {
          _vm.$set(item, "CADescription", $$v);
        },
        expression: "item.CADescription"
      }
    })], 1), _vm._v(" "), _c("b-form-group", {
      staticClass: "col-md-4"
    }, [_c("label", {
      staticClass: "form-label"
    }, [_vm._v("Lampiran Tindakan Koreksi")]), _vm._v(" "), _vm._l(item.CAFileName, function (file, i) {
      return [_c("b-input-group", [_c("b-form-input", {
        attrs: {
          name: "CAFileName",
          value: file,
          readonly: ""
        }
      }), _vm._v(" "), _c("b-input-group-append", [_c("a", {
        staticClass: "input-group-text btn-outline-success",
        attrs: {
          href: item.CAFile[i],
          target: "_blank"
        }
      }, [_c("i", {
        staticClass: "fa fa-download"
      })])])], 1)];
    })], 2)], 1), _vm._v(" "), _c("hr")];
  })], 2), _vm._v(" "), _c("b-card", {
    staticClass: "mb-4",
    attrs: {
      header: "Tindakan Pencegahan (Preventive Action)",
      "header-tag": "h5"
    }
  }, [_vm._l(_vm.field.NODPA, function (item, index) {
    return [_c("b-form-row", [_c("b-form-group", {
      staticClass: "col-md-6"
    }, [_c("label", {
      staticClass: "form-label"
    }, [_vm._v("PIC")]), _vm._v(" "), _c("b-input", {
      staticClass: "mb-1",
      attrs: {
        name: "PAPIC",
        readonly: ""
      },
      model: {
        value: item.PAPIC,
        callback: function callback($$v) {
          _vm.$set(item, "PAPIC", $$v);
        },
        expression: "item.PAPIC"
      }
    })], 1), _vm._v(" "), _c("b-form-group", {
      staticClass: "col-md-5 col-10"
    }, [_c("label", {
      staticClass: "form-label"
    }, [_vm._v("Due Date")]), _vm._v(" "), _c("b-form-datepicker", {
      staticClass: "mb-1",
      attrs: {
        locale: "en",
        "date-format-options": _vm.datePickerFormat,
        required: "",
        disabled: true
      },
      model: {
        value: item.PADate,
        callback: function callback($$v) {
          _vm.$set(item, "PADate", $$v);
        },
        expression: "item.PADate"
      }
    })], 1)], 1), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
      staticClass: "col-md-6"
    }, [_c("label", {
      staticClass: "form-label"
    }, [_vm._v("Deskripsi")]), _vm._v(" "), _c("b-textarea", {
      staticClass: "mb-1",
      attrs: {
        name: "PADescription",
        required: "",
        readonly: true
      },
      model: {
        value: item.PADescription,
        callback: function callback($$v) {
          _vm.$set(item, "PADescription", $$v);
        },
        expression: "item.PADescription"
      }
    })], 1), _vm._v(" "), _c("b-form-group", {
      staticClass: "col-md-4"
    }, [_c("label", {
      staticClass: "form-label"
    }, [_vm._v("Lampiran Tindakan Pencegahan")]), _vm._v(" "), _vm._l(item.PAFileName, function (file, i) {
      return [_c("b-input-group", [_c("b-form-input", {
        attrs: {
          name: "PAFileName",
          value: file,
          readonly: ""
        }
      }), _vm._v(" "), _c("b-input-group-append", [_c("a", {
        staticClass: "input-group-text btn-outline-success",
        attrs: {
          href: item.PAFile[i],
          target: "_blank"
        }
      }, [_c("i", {
        staticClass: "fa fa-download"
      })])])], 1)];
    })], 2)], 1), _vm._v(" "), _c("hr")];
  })], 2), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Sistem Lain yang Terdampak")]), _vm._v(" "), _vm.isShow == false ? _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Dipilih")]) : _vm._e(), _vm._v(" "), _c("multiselect", {
    attrs: {
      options: _vm.opsOSA,
      "allow-empty": false,
      placeholder: "Pilih Sistem Lain yang Terdampak",
      label: "text",
      "track-by": "text",
      required: "",
      disabled: _vm.isShow
    },
    on: {
      input: _vm.onChangeOSA
    },
    model: {
      value: _vm.field.IsOSA,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "IsOSA", $$v);
      },
      expression: "field.IsOSA"
    }
  }), _vm._v(" "), _vm.allErrors.IsOSA ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.IsOSA[0]))]) : _vm._e()], 1)], 1), _vm._v(" "), _vm.IsOSA == true ? _c("b-card", {
    staticClass: "md-4"
  }, [_vm._l(_vm.field.OtherSA, function (item, index) {
    return _c("b-form-row", {
      key: index
    }, [_c("b-form-group", {
      staticClass: "col-md-4"
    }, [index == 0 ? [_c("label", [_vm._v("Terdampak Pada Sistem")]), _vm._v(" "), _c("label", {
      staticClass: "form-label float-right text-danger"
    }, [_vm._v("*Wajib Dipilih")])] : _vm._e(), _vm._v(" "), _c("multiselect", {
      attrs: {
        "allow-empty": false,
        options: _vm.opsAssesment,
        placeholder: "Pilih Terdampak Pada Sistem",
        selectLabel: "",
        deselectLabel: "",
        label: "RiskAssesment",
        "track-by": "RiskAssesment",
        required: "",
        disabled: _vm.isShow
      },
      on: {
        select: function select($event) {
          return _vm.onSelectDevRisk($event, index);
        }
      },
      model: {
        value: item.Assesment,
        callback: function callback($$v) {
          _vm.$set(item, "Assesment", $$v);
        },
        expression: "item.Assesment"
      }
    })], 2), _vm._v(" "), _c("b-form-group", {
      staticClass: "col-md-4"
    }, [index == 0 ? [_c("label", [_vm._v("Deskripsi")]), _vm._v(" "), _c("label", {
      staticClass: "form-label float-right text-danger"
    }, [_vm._v("*Wajib Diisi")])] : _vm._e(), _vm._v(" "), _c("b-textarea", {
      staticClass: "mb-1",
      attrs: {
        name: "Description",
        required: "",
        readonly: _vm.isShow
      },
      model: {
        value: item.Description,
        callback: function callback($$v) {
          _vm.$set(item, "Description", $$v);
        },
        expression: "item.Description"
      }
    })], 2), _vm._v(" "), _vm.isShow == false ? _c("b-form-group", {
      staticClass: "col-md-3"
    }, [index == 0 ? [_c("label", [_vm._v("Lampiran Sistem Lain yang Terdampak")]), _vm._v(" "), _c("label", {
      staticClass: "form-label float-right text-danger"
    }, [_vm._v("(Max. 100 MB)")])] : _vm._e(), _vm._v(" "), _c("file-pond", {
      ref: "pondMyFile",
      refInFor: true,
      attrs: {
        name: "AssesmentFile",
        "label-idle": "Tambahkan Lampiran",
        "allow-multiple": false,
        files: item.file,
        "accepted-file-types": "application/*, image/*, video/*",
        maxTotalFileSize: "100MB",
        disabled: _vm.isShow
      },
      on: {
        updatefiles: function updatefiles($event) {
          return _vm.handleFileAssesment($event, index);
        }
      }
    })], 2) : _vm._e(), _vm._v(" "), _vm.isShow == true ? _c("b-form-group", {
      staticClass: "col-md-4"
    }, [index == 0 ? _c("label", [_vm._v("Lampiran Sistem Lain yang Terdampak")]) : _vm._e(), _vm._v(" "), _c("b-input-group", [_c("b-form-input", {
      attrs: {
        name: "AssesmentFile",
        readonly: ""
      },
      model: {
        value: item.fileName,
        callback: function callback($$v) {
          _vm.$set(item, "fileName", $$v);
        },
        expression: "item.fileName"
      }
    }), _vm._v(" "), _c("b-input-group-append", [_c("a", {
      staticClass: "input-group-text btn-outline-success",
      attrs: {
        href: item.file,
        target: "_blank"
      }
    }, [_c("i", {
      staticClass: "fa fa-download"
    })])])], 1)], 1) : _vm._e(), _vm._v(" "), _vm.isShow == false ? _c("b-form-group", {
      staticClass: "col-md-1 col-2 text-center"
    }, [index == 0 ? _c("label", [_vm._v("Tindakan")]) : _vm._e(), _vm._v(" "), index > 0 ? _c("b-button", {
      staticClass: "btn btn-sm btn-danger text-white",
      attrs: {
        pill: true
      },
      on: {
        click: function click($event) {
          return _vm.removeDetail(index);
        }
      }
    }, [_c("i", {
      staticClass: "ion ion-md-trash"
    })]) : _vm._e()], 1) : _vm._e()], 1);
  }), _vm._v(" "), _vm.isShow == false ? _c("b-btn", {
    staticClass: "float-left btn-info",
    attrs: {
      type: "button",
      id: "btambah-risk"
    },
    on: {
      click: function click($event) {
        return _vm.addDetail();
      }
    }
  }, [_c("i", {
    staticClass: "fas fa-plus"
  }), _vm._v(" Tambah")]) : _vm._e()], 2) : _vm._e(), _c("br"), _vm._v(" "), _vm.isApprove == true && _vm.isShow == true ? _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Verifikasi Efektifitas CAPA")]), _vm._v(" "), _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Dipilih")]), _vm._v(" "), _c("multiselect", {
    attrs: {
      options: _vm.opsVerifCAPA,
      "allow-empty": false,
      placeholder: "Pilih Verifikasi Efektifitas CAPA",
      label: "text",
      "track-by": "text",
      required: "",
      disabled: _vm.isShowAll
    },
    on: {
      input: _vm.onChangeVerifCAPA
    },
    model: {
      value: _vm.field.VerifCAPA,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "VerifCAPA", $$v);
      },
      expression: "field.VerifCAPA"
    }
  }), _vm._v(" "), _vm.allErrors.VerifCAPA ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.VerifCAPA[0]))]) : _vm._e()], 1), _vm._v(" "), _vm.descCAPA == true ? _c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Deskripsi")]), _vm._v(" "), _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]), _vm._v(" "), _c("b-textarea", {
    staticClass: "mb-1",
    attrs: {
      name: "DescriptionCAPA",
      state: _vm.allErrors.DescriptionCAPA ? false : null,
      required: "",
      readonly: _vm.isShowAll
    },
    model: {
      value: _vm.field.DescriptionCAPA,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "DescriptionCAPA", $$v);
      },
      expression: "field.DescriptionCAPA"
    }
  }), _vm._v(" "), _vm.allErrors.DescriptionCAPA ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.DescriptionCAPA[0]))]) : _vm._e()], 1) : _vm._e()], 1) : _vm._e(), _vm._v(" "), _vm.isApprove == false && _vm.isShow == true && _vm.valStatus == 4 ? _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Verifikasi Efektifitas CAPA")]), _vm._v(" "), _c("b-input", {
    staticClass: "mb-1",
    attrs: {
      name: "VerifCAPA",
      readonly: ""
    },
    model: {
      value: _vm.field.VerifCAPA,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "VerifCAPA", $$v);
      },
      expression: "field.VerifCAPA"
    }
  })], 1), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Deskripsi")]), _vm._v(" "), _c("b-textarea", {
    staticClass: "mb-1",
    attrs: {
      name: "DescriptionCAPA",
      readonly: ""
    },
    model: {
      value: _vm.field.DescriptionCAPA,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "DescriptionCAPA", $$v);
      },
      expression: "field.DescriptionCAPA"
    }
  })], 1)], 1) : _vm._e(), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-6"
  }), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-6",
    attrs: {
      label: ""
    }
  }, [_vm.isShow == true && _vm.Position == 2 && _vm.valStatus <= 1 ? _c("b-btn", {
    staticClass: "float-right ml-2",
    attrs: {
      type: "button",
      variant: "primary"
    },
    on: {
      click: function click($event) {
        return _vm.onAction("publish");
      }
    }
  }, [_vm._v("Publish")]) : _vm._e(), _vm._v(" "), _vm.isShow == true && _vm.Position == 2 && _vm.isCaretaker == false && _vm.valStatus == 2 ? _c("b-btn", {
    staticClass: "float-right ml-2",
    attrs: {
      variant: "success"
    }
  }, [_vm._v("Diajukan")]) : _vm._e(), _vm._v(" "), _vm.isShow == true && _vm.isApprove == true && (_vm.Position == 3 && _vm.valStatus == 2 || (_vm.Position == 4 || _vm.isCaretaker == true) && _vm.valStatus == 3) ? _c("b-btn", {
    staticClass: "float-right ml-2",
    attrs: {
      type: "button",
      variant: "primary"
    },
    on: {
      click: function click($event) {
        return _vm.onAction("approve");
      }
    }
  }, [_vm._v("Setujui")]) : _vm._e(), _vm._v(" "), _vm.isShow == true && _vm.isApprove == true && (_vm.Position == 4 || _vm.isCaretaker == true) && _vm.valStatus == 3 ? _c("b-btn", {
    staticClass: "float-right ml-2",
    attrs: {
      type: "button",
      variant: "danger"
    },
    on: {
      click: function click($event) {
        return _vm.onAction("reject");
      }
    }
  }, [_vm._v("Tolak")]) : _vm._e(), _vm._v(" "), _vm.isShow == true && (_vm.Position == 4 || _vm.isCaretaker == true) && _vm.valStatus == 4 ? _c("b-btn", {
    staticClass: "float-right ml-2",
    attrs: {
      variant: "success"
    }
  }, [_vm._v("Disetujui")]) : _vm._e(), _vm._v(" "), _vm.isShow == true && (_vm.Position == 4 || _vm.isCaretaker == true) && _vm.valStatus == 5 ? _c("b-btn", {
    staticClass: "float-right ml-2",
    attrs: {
      variant: "warning"
    }
  }, [_vm._v("Ditolak")]) : _vm._e(), _vm._v(" "), _vm.isShow == true && _vm.isApprove == false && (_vm.Position == 3 && _vm.valStatus == 2 || (_vm.Position == 4 || _vm.isCaretaker == true) && _vm.valStatus == 3) ? _c("b-btn", {
    staticClass: "float-right ml-2",
    attrs: {
      type: "button",
      variant: "warning"
    },
    on: {
      click: function click($event) {
        return _vm.onAction("correction");
      }
    }
  }, [_vm._v("Koreksi")]) : _vm._e(), _vm._v(" "), _vm.isShow == false ? _c("b-btn", {
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

/***/ "./resources/assets/src/components/backend/nod/nod-review/form.vue":
/*!*************************************************************************!*\
  !*** ./resources/assets/src/components/backend/nod/nod-review/form.vue ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _form_vue_vue_type_template_id_c0745340___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form.vue?vue&type=template&id=c0745340& */ "./resources/assets/src/components/backend/nod/nod-review/form.vue?vue&type=template&id=c0745340&");
/* harmony import */ var _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form.vue?vue&type=script&lang=js& */ "./resources/assets/src/components/backend/nod/nod-review/form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _form_vue_vue_type_template_id_c0745340___WEBPACK_IMPORTED_MODULE_0__["render"],
  _form_vue_vue_type_template_id_c0745340___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/src/components/backend/nod/nod-review/form.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/src/components/backend/nod/nod-review/form.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/nod/nod-review/form.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./form.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/nod/nod-review/form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/src/components/backend/nod/nod-review/form.vue?vue&type=template&id=c0745340&":
/*!********************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/nod/nod-review/form.vue?vue&type=template&id=c0745340& ***!
  \********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_c0745340___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./form.vue?vue&type=template&id=c0745340& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/nod/nod-review/form.vue?vue&type=template&id=c0745340&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_c0745340___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_c0745340___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
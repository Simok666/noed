(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[114],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/nod/verifikasi-capa-nod/form.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/src/components/backend/nod/verifikasi-capa-nod/form.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_1__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'form-nod-report',
  metaInfo: {
    title: 'Form NOD Report'
  },
  components: {},
  data: function data() {
    return {
      urlSubmit: '/AdminVue/nod-verifikasi-capa-insert-data',
      headerCard: 'Verifikasi CAPA NOD',
      textBtnSubmit: 'Simpan',
      field: {
        Date: '',
        //moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
        BatchNo: '',
        IdProduct: '',
        Event: '',
        CAFile: [],
        PAFile: [],
        CAFileName: [],
        PAFileName: [],
        IdDepartment: 0,
        NODCA: [{
          IdCAPIC: '',
          CADate: '',
          CADescription: '',
          CAFile: []
        }],
        NODPA: [{
          IdPAPIC: '',
          PADate: '',
          PADescription: '',
          PAFile: []
        }],
        PublishTo: 0,
        SectionPublish: 0,
        userEntry: 0,
        CAPAFile: [],
        FileCAPADownload: [],
        Status: '',
        selectedEfektifitasValue: ''
      },
      allErrors: [],
      isNotif: false,
      isEdit: false,
      alertNotif: '',
      alertVariant: 'alert-dark-danger',
      opsNODAccNumber: [],
      opsCAPIC: [],
      opsPAPIC: [],
      Position: 0,
      //1 = unit head; 2 = sect head; 3 = APJ; 4 = dept head;
      valStatus: 0,
      isShow: false,
      userDepartment: 0,
      deptTerkait: false,
      statusDeptTerkait: false,
      OldCAFile: [],
      OldPAFile: [],
      BaseUrl: "/",
      isCaretaker: false,
      opsRelevantDept: [],
      isDept: false,
      isRelevantDept: false,
      relevantDeptExist: 0,
      min: moment__WEBPACK_IMPORTED_MODULE_0___default()(new Date()).format('YYYY-MM-DD'),
      selected: '',
      selectedEfektifitasCapa: '',
      getAnotherEffect: [],
      checkedEffect: [],
      text: [],
      dataAnotherEffect: [],
      OldCAPAFile: []
    };
  },
  created: function created() {
    var _this = this;
    // Initialize the 'text' object with default values for each 'title_effect'
    this.getAnotherEffect.forEach(function (item) {
      _this.text[item.id_effect] = '';
    });
  },
  watch: {
    checkedEffect: {
      handler: function handler() {
        // Ketika checkbox diubah, perbarui nilai textarea sesuai dengan checkbox yang dicentang
        for (var key in this.checkedEffect) {
          if (this.checkedEffect[key]) {
            if (!this.text[key]) {
              this.text[key] = ''; // Inisialisasi nilai textarea jika belum ada
            }
          } else {
            delete this.text[key]; // Hapus nilai textarea jika checkbox tidak dicentang
          }
        }
      },

      deep: true
    }
  },
  methods: {
    submitForm: function submitForm() {
      this.showLoading();
      var isEmpty = false;
      if (isEmpty) {
        this.$swal({
          icon: 'error',
          text: 'Silahkan lengkapi kolom *Wajib Diisi!'
        });
      } else {
        var formData = new FormData();
        formData.append("Id", this.field.Id);
        formData.append("userEntry", this.field.userEntry);
        if (this.field.NODAccNumber) formData.append("NODAccNumber", this.field.NODAccNumber.Id);
        for (var i = 0; i < this.field.CAPAFile.length; i++) {
          var file = this.field.CAPAFile[i];
          formData.append('CAPAFile[' + i + ']', file);
        }
        formData.append("OldCAPAFile", JSON.stringify(this.OldCAPAFile));
        var collectedEfektivitas = [];
        if (this.selectedEfektifitasCapa === true) {
          collectedEfektivitas = {
            selected: this.selectedEfektifitasCapa,
            efektifitasDesc: this.field.selectedEfektifitasValue
          };
        } else {
          collectedEfektivitas = {
            selected: this.selectedEfektifitasCapa
          };
        }
        formData.append("verifikasiEfektivitasCapa", JSON.stringify(collectedEfektivitas));
        var config = {
          headers: {
            'content-type': 'multipart/form-data'
          }
        };
        axios.post(this.urlSubmit, formData, config).then(function (res) {
          var resp = res.data;
          if (resp.status) {
            this.$router.push({
              name: 'nod/master-verifikasi-capa',
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
      if (option) {
        this.getDataNODAcc(option.IdNOEReport, option.Id);
        this.getDataPIC(option.Id);
      }
    },
    getData: function getData(Id) {
      axios.post('/AdminVue/nod-verifikasi-capa-edit-data', {
        Id: Id
      }).then(function (res) {
        var resp = res.data;
        this.Position = res.data.position;
        this.userDepartment = res.data.department;
        this.deptTerkait = res.data.deptTerkait;
        this.statusDeptTerkait = res.data.statusDeptTerkait;
        this.field.NODAccNumber = resp.data;
        this.field.Status = resp.data.statusCapa;
        this.selectedEfektifitasCapa = resp.data.efektivitasCapa.selected;
        this.field.selectedEfektifitasValue = resp.data.efektivitasCapa.efektifitasDesc;
        vue__WEBPACK_IMPORTED_MODULE_1___default.a.set(this.field, 'FileCAPADownload', resp.data.FileCAPADownload);
        if (this.field.Status == 'Disetujui oleh QA Section Head') this.valStatus = 2;
        this.field.CAPAFile = resp.data.fileCAPA;
        if (this.field.CAPAFile != '') {
          var countFileCAPA = this.field.CAPAFile.length;
          for (var i = 0; i < countFileCAPA; i++) {
            this.OldCAPAFile.push(this.field.CAPAFile[i]);
            this.field.CAPAFile.push("/" + this.field.CAPAFile[i]);
          }
        }
        if (this.field.CAPAFile == '') {
          this.OldCAPAFile = '';
        }
        this.getDataNODAcc(resp.data.IdNOEReport, resp.data.Id);
        this.getDataPIC(resp.data.IdNOEReport);
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.isNotif = true;
        this.alertNotif = 'Invalid Server Side!';
        this.alertVariant = 'alert-dark-danger';
      }.bind(this));
    },
    getNODAccNumber: function getNODAccNumber() {
      axios.post('/AdminVue/nod-report-get-acc-number').then(function (res) {
        this.opsNODAccNumber = res.data.data;
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.opsNODAccNumber = [];
      }.bind(this));
    },
    getDataNODAcc: function getDataNODAcc(Id, IdNOD) {
      axios.post('/AdminVue/nod-verifikasi-capa-get-data', {
        Id: Id,
        IdNOD: IdNOD
      }).then(function (res) {
        var _this2 = this;
        this.Position = res.data.position;
        this.field.BatchNo = res.data.data.BatchNo;
        this.field.IdProduct = res.data.data.Product;
        this.field.Event = res.data.data.Event;
        this.field.PublishTo = res.data.data.IdPublish;
        this.field.SectionPublish = res.data.data.publishSection;
        this.field.userEntry = res.data.getUserEntry;
        this.field.Date = moment__WEBPACK_IMPORTED_MODULE_0___default()(res.data.data.Date).format('DD/MM/YYYY HH:mm:ss');
        this.field.NODCA = res.data.NODCA;
        this.field.NODPA = res.data.NODPA;
        this.field.ProperCondition = res.data.data.ProperCondition;
        this.field.Man = res.data.data.Man;
        this.field.Machine = res.data.data.Machine;
        this.field.Method = res.data.data.Method;
        this.field.Material = res.data.data.Material;
        this.field.Milieu = res.data.data.Milieu;
        this.opsRelevantDept = res.data.data.RelevantDept;
        if (res.data.data.IdRelevantDept != 0) {
          JSON.parse(res.data.data.IdRelevantDept).filter(function (value) {
            return value == res.data.data.IdDepartmentSession ? _this2.isRelevantDept = true : _this2.isRelevantDept;
          }, {});
        }
        res.data.data.TypeUser == 15 ? this.isDept = true : this.isDept;
        this.relevantDeptExist = res.data.data.IdRelevantDept;
        this.field.NODCA.forEach(function (value, index) {
          if (value) {
            if (value.CAFile != '') {
              value.IdCAPIC = {
                'Id': value.IdCAPIC,
                'PIC': value.CAPIC
              };
              value.CAFile = JSON.parse(value.CAFile);
              _this2.OldCAFile.push(value.CAFile);
              value.CAFileName = [];
              value.CAFile.forEach(function (val, i) {
                value.CAFile[i] = window.location.origin + '/' + val;
                var result = val.split('/');
                value.CAFileName[i] = result[4];
              });
            } else {
              _this2.OldCAFile.push('');
            }
          }
        });
        this.field.NODPA.forEach(function (value, index) {
          if (value) {
            if (value.PAFile != '') {
              value.IdPAPIC = {
                'Id': value.IdPAPIC,
                'PIC': value.PAPIC
              };
              value.PAFile = JSON.parse(value.PAFile);
              _this2.OldPAFile.push(value.PAFile);
              value.PAFileName = [];
              value.PAFile.forEach(function (val, i) {
                value.PAFile[i] = window.location.origin + '/' + val;
                var result = val.split('/');
                value.PAFileName[i] = result[4];
              });
            } else {
              _this2.OldPAFile.push('');
            }
          }
        });
        this.getAnotherEffect = res.data.getAnotherEffect;
        var selectedAnotherEffect = Object.values(res.data.selectedAnotherEffect);
        if (selectedAnotherEffect) {
          selectedAnotherEffect.forEach(function (item, index) {
            if (item !== false) {
              _this2.selected = item.selected;
              _this2.checkedEffect[item.id_effect] = item.id_effect;
              _this2.text[item.id_effect] = item.text;
            } else {
              _this2.selected = item;
            }
          });
        }
        this.min = moment__WEBPACK_IMPORTED_MODULE_0___default()(res.data.data.Date).format('YYYY-MM-DD');
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.field.BatchNo = '';
        this.field.IdProduct = '';
        this.field.Event = '';
      }.bind(this));
    },
    getDataPIC: function getDataPIC(idNOEReport) {
      axios.post('/AdminVue/nod-report-get-data-pic', {
        IdNOEReport: idNOEReport
      }).then(function (res) {
        this.opsCAPIC = res.data.data;
        this.opsPAPIC = res.data.data;
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.opsCAPIC = [];
        this.opsPAPIC = [];
      }.bind(this));
    },
    handleFileCA: function handleFileCA(files, index) {
      this.field.NODCA[index].CAFile = files.map(function (files) {
        return files.file;
      });
    },
    handleRemoveCA: function handleRemoveCA(error, files) {
      var _this3 = this;
      this.OldCAFile.forEach(function (val, k) {
        val.forEach(function (v, i) {
          if (v == files.source) {
            _this3.OldCAFile[k].splice(i, 1);
          }
        });
      });
    },
    handleFilePA: function handleFilePA(files, index) {
      this.field.NODPA[index].PAFile = files.map(function (files) {
        return files.file;
      });
    },
    handleRemovePA: function handleRemovePA(error, files) {
      var _this4 = this;
      this.OldPAFile.forEach(function (val, k) {
        val.forEach(function (v, i) {
          if (v == files.source) {
            _this4.OldPAFile[k].splice(i, 1);
          }
        });
      });
    },
    handleFileCAPA: function handleFileCAPA(files) {
      this.field.CAPAFile = files.map(function (files) {
        return files.file;
      });
    },
    handleRemoveCAPA: function handleRemoveCAPA(error, files) {
      var result = _typeof(files.source);
      if (this.isEdit == true && result === 'string') {
        var index = this.OldCAPAFile.indexOf(files.source.replace('/clouds', 'clouds'));
        this.OldCAPAFile.splice(index, 1);
      }
    },
    addDetail: function addDetail(type) {
      if (type == 'CA') {
        var newCA = {
          'IdCAPIC': '',
          'CADate': '',
          'CADescription': '',
          'CAFile': []
        };
        vue__WEBPACK_IMPORTED_MODULE_1___default.a.set(this.field.NODCA, this.field.NODCA.length, newCA);
        this.$forceUpdate();
      } else {
        var newPA = {
          'IdPAPIC': '',
          'PADate': '',
          'PADescription': '',
          'PAFile': []
        };
        vue__WEBPACK_IMPORTED_MODULE_1___default.a.set(this.field.NODPA, this.field.NODPA.length, newPA);
        this.$forceUpdate();
      }
    },
    checkPIC: function checkPIC(value) {
      this.$forceUpdate();
    },
    removeDetail: function removeDetail(index, type) {
      if (type == 'CA') {
        this.field.NODCA.splice(index, 1);
        this.$forceUpdate();
      } else {
        this.field.NODPA.splice(index, 1);
        this.$forceUpdate();
      }
    },
    backIndex: function backIndex() {
      this.$router.push('/RoleAdmin/nod/master-verifikasi-capa');
    },
    onAction: function onAction(action) {
      if (action == 'publish') {
        this.publish('/AdminVue/nod-report-publish', this.field.Id, this.$parent, true);
      }
      if (action == 'approve') {
        this.approveVerifikasiCapa('/AdminVue/nod-verifikasi-capa-approve-data', this.field.Id, this.$parent, null, true, this.selectedEfektifitasCapa);
      }
      if (action == 'reject') {
        this.rejectOld('/AdminVue/nod-report-reject', this.field.Id, this.$parent, null, true, this.isCaretaker);
      }
      if (action == 'correction') {
        this.$router.push({
          name: 'nod/form-correction-nod-report',
          params: {
            Id: this.field.Id,
            isCaretaker: this.isCaretaker
          }
        });
      }
    }
  },
  mounted: function mounted() {
    this.getNODAccNumber();
    if (this.$route.params.isFormEdit) {
      var Id = this.$route.params.Id;
      this.isEdit = true;
      if (Id) {
        this.getData(Id);
        this.field.Id = Id;
        this.urlSubmit = '/AdminVue/nod-verifikasi-capa-update-data';
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

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/nod/verifikasi-capa-nod/form.vue?vue&type=template&id=3feb3352&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/src/components/backend/nod/verifikasi-capa-nod/form.vue?vue&type=template&id=3feb3352& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************/
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
  }, [_vm._v("No. NOD Disetujui")]), _vm._v(" "), _vm.isShow == false ? _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Dipilih")]) : _vm._e(), _vm._v(" "), _c("multiselect", {
    attrs: {
      options: _vm.opsNODAccNumber,
      "allow-empty": false,
      placeholder: "Pilih No. NOD disetujui",
      label: "NODNumber",
      "track-by": "NODNumber",
      required: "",
      disabled: _vm.isEdit || _vm.isShow
    },
    on: {
      input: _vm.onChange
    },
    model: {
      value: _vm.field.NODAccNumber,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "NODAccNumber", $$v);
      },
      expression: "field.NODAccNumber"
    }
  }), _vm._v(" "), _vm.allErrors.NODAccNumber ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.NODAccNumber[0]))]) : _vm._e()], 1)], 1), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Tanggal Kejadian NOE")]), _vm._v(" "), _c("b-input", {
    staticClass: "mb-1",
    attrs: {
      name: "Date",
      readonly: ""
    },
    model: {
      value: _vm.field.Date,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "Date", $$v);
      },
      expression: "field.Date"
    }
  })], 1), _vm._v(" "), _c("b-form-group", {
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
  }, [_vm._v(_vm._s(_vm.allErrors.BatchNo[0]))]) : _vm._e()], 1)], 1), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
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
  }, [_vm._v(_vm._s(_vm.allErrors.IdProduct[0]))]) : _vm._e()], 1), _vm._v(" "), _c("b-form-group", {
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
  }, [_vm._v(_vm._s(_vm.allErrors.Event[0]))]) : _vm._e()], 1)], 1), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Kondisi Seharusnya")]), _vm._v(" "), _vm.isShow == false ? _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]) : _vm._e(), _vm._v(" "), _c("b-textarea", {
    staticClass: "mb-1",
    attrs: {
      name: "ProperCondition",
      state: _vm.allErrors.ProperCondition ? false : null,
      required: "",
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
  }, [_vm._v(_vm._s(_vm.allErrors.ProperCondition[0]))]) : _vm._e()], 1), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Man (Personel)")]), _vm._v(" "), _vm.isShow == false ? _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]) : _vm._e(), _vm._v(" "), _c("b-textarea", {
    staticClass: "mb-1",
    attrs: {
      name: "Man",
      state: _vm.allErrors.Man ? false : null,
      required: "",
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
  }, [_vm._v(_vm._s(_vm.allErrors.Man[0]))]) : _vm._e()], 1)], 1), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Machine (Mesin / Peralatan)")]), _vm._v(" "), _vm.isShow == false ? _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]) : _vm._e(), _vm._v(" "), _c("b-textarea", {
    staticClass: "mb-1",
    attrs: {
      name: "Machine",
      state: _vm.allErrors.Machine ? false : null,
      required: "",
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
  }, [_vm._v(_vm._s(_vm.allErrors.Machine[0]))]) : _vm._e()], 1), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Method (Metode / Prosedur)")]), _vm._v(" "), _vm.isShow == false ? _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]) : _vm._e(), _vm._v(" "), _c("b-textarea", {
    staticClass: "mb-1",
    attrs: {
      name: "Method",
      state: _vm.allErrors.Method ? false : null,
      required: "",
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
  }, [_vm._v(_vm._s(_vm.allErrors.Method[0]))]) : _vm._e()], 1)], 1), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Material (Produk / Bahan)")]), _vm._v(" "), _vm.isShow == false ? _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]) : _vm._e(), _vm._v(" "), _c("b-textarea", {
    staticClass: "mb-1",
    attrs: {
      name: "Material",
      state: _vm.allErrors.Material ? false : null,
      required: "",
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
  }, [_vm._v(_vm._s(_vm.allErrors.Material[0]))]) : _vm._e()], 1), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Milieu (Lingkungan)")]), _vm._v(" "), _vm.isShow == false ? _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]) : _vm._e(), _vm._v(" "), _c("b-textarea", {
    staticClass: "mb-1",
    attrs: {
      name: "Milieu",
      state: _vm.allErrors.Milieu ? false : null,
      required: "",
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
    }, [_vm._v("PIC")]), _vm._v(" "), _vm.isShow == false ? _c("label", {
      staticClass: "form-label float-right text-danger"
    }, [_vm._v("*Wajib Dipilih")]) : _vm._e(), _vm._v(" "), _c("multiselect", {
      attrs: {
        options: _vm.opsCAPIC,
        "allow-empty": false,
        placeholder: "Pilih PIC",
        label: "PIC",
        "track-by": "PIC",
        required: "",
        disabled: ""
      },
      on: {
        input: function input($event) {
          return _vm.checkPIC(item.IdCAPIC);
        }
      },
      model: {
        value: item.IdCAPIC,
        callback: function callback($$v) {
          _vm.$set(item, "IdCAPIC", $$v);
        },
        expression: "item.IdCAPIC"
      }
    })], 1), _vm._v(" "), _c("b-form-group", {
      staticClass: "col-md-5 col-10"
    }, [_c("label", {
      staticClass: "form-label"
    }, [_vm._v("Due Date")]), _vm._v(" "), _vm.isShow == false ? _c("label", {
      staticClass: "form-label float-right text-danger"
    }, [_vm._v("*Wajib Diisi")]) : _vm._e(), _vm._v(" "), _c("b-form-datepicker", {
      staticClass: "mb-1",
      attrs: {
        locale: "en",
        min: _vm.min,
        "date-format-options": _vm.datePickerFormat,
        required: "",
        disabled: ""
      },
      model: {
        value: item.CADate,
        callback: function callback($$v) {
          _vm.$set(item, "CADate", $$v);
        },
        expression: "item.CADate"
      }
    })], 1), _vm._v(" "), _vm.isShow == false && index > 0 ? _c("b-form-group", {
      staticClass: "col-md-1 col-2 text-center"
    }, [_c("label", [_vm._v("Tindakan")]), _c("br"), _vm._v(" "), _c("b-button", {
      staticClass: "btn btn-sm btn-danger text-white",
      attrs: {
        pill: true,
        disabled: ""
      },
      on: {
        click: function click($event) {
          return _vm.removeDetail(index, "CA");
        }
      }
    }, [_c("i", {
      staticClass: "ion ion-md-trash"
    })])], 1) : _vm._e()], 1), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
      staticClass: "col-md-6"
    }, [_c("label", {
      staticClass: "form-label"
    }, [_vm._v("Deskripsi")]), _vm._v(" "), _vm.isShow == false ? _c("label", {
      staticClass: "form-label float-right text-danger"
    }, [_vm._v("*Wajib Diisi")]) : _vm._e(), _vm._v(" "), _c("b-textarea", {
      staticClass: "mb-1",
      attrs: {
        name: "CADescription",
        required: "",
        readonly: ""
      },
      model: {
        value: item.CADescription,
        callback: function callback($$v) {
          _vm.$set(item, "CADescription", $$v);
        },
        expression: "item.CADescription"
      }
    })], 1), _vm._v(" "), _vm.isShow == false ? _c("b-form-group", {
      staticClass: "col-md-6"
    }, [_c("label", {
      staticClass: "form-label"
    }, [_vm._v("Lampiran Tindakan Perbaikan")]), _vm._v(" "), _c("label", {
      staticClass: "form-label float-right text-danger"
    }, [_vm._v("(Max. 50 MB)")]), _vm._v(" "), _c("file-pond", {
      ref: "pondMyFile",
      refInFor: true,
      attrs: {
        name: "CAFile",
        "label-idle": "Lampiran : 1.Data Batch Record; 2.Buku Kronik; 3.Dokumentasi before/after perbaikan; 4.Lain-lain;",
        "allow-multiple": true,
        files: item.CAFile,
        "accepted-file-types": "application/*, image/*, video/*",
        maxTotalFileSize: "50MB",
        disabled: "true"
      },
      on: {
        updatefiles: function updatefiles($event) {
          return _vm.handleFileCA($event, index);
        },
        removefile: _vm.handleRemoveCA
      }
    })], 1) : _vm._e(), _vm._v(" "), _c("b-form-group", {
      staticClass: "col-md-4"
    }, [_c("label", {
      staticClass: "form-label"
    }, [_vm._v("Lampiran Tindakan Perbaikan")]), _vm._v(" "), _vm._l(item.CAFileName, function (file, i) {
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
  }), _vm._v(" "), _vm.isShow == false ? _c("b-btn", {
    staticClass: "float-left btn-info",
    attrs: {
      type: "button",
      disabled: "",
      id: "btambah-CA"
    },
    on: {
      click: function click($event) {
        return _vm.addDetail("CA");
      }
    }
  }, [_c("i", {
    staticClass: "fas fa-plus"
  }), _vm._v(" Tambah")]) : _vm._e()], 2), _vm._v(" "), _c("b-card", {
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
    }, [_vm._v("PIC")]), _vm._v(" "), _vm.isShow == false ? _c("label", {
      staticClass: "form-label float-right text-danger"
    }, [_vm._v("*Wajib Dipilih")]) : _vm._e(), _vm._v(" "), _c("multiselect", {
      attrs: {
        options: _vm.opsPAPIC,
        "allow-empty": false,
        placeholder: "Pilih PIC",
        label: "PIC",
        "track-by": "PIC",
        required: "",
        disabled: ""
      },
      model: {
        value: item.IdPAPIC,
        callback: function callback($$v) {
          _vm.$set(item, "IdPAPIC", $$v);
        },
        expression: "item.IdPAPIC"
      }
    })], 1), _vm._v(" "), _c("b-form-group", {
      staticClass: "col-md-5 col-10"
    }, [_c("label", {
      staticClass: "form-label"
    }, [_vm._v("Due Date")]), _vm._v(" "), _vm.isShow == false ? _c("label", {
      staticClass: "form-label float-right text-danger"
    }, [_vm._v("*Wajib Diisi")]) : _vm._e(), _vm._v(" "), _c("b-form-datepicker", {
      staticClass: "mb-1",
      attrs: {
        locale: "en",
        min: _vm.min,
        "date-format-options": _vm.datePickerFormat,
        required: "",
        disabled: ""
      },
      model: {
        value: item.PADate,
        callback: function callback($$v) {
          _vm.$set(item, "PADate", $$v);
        },
        expression: "item.PADate"
      }
    })], 1), _vm._v(" "), _vm.isShow == false && index > 0 ? _c("b-form-group", {
      staticClass: "col-md-1 col-2 text-center"
    }, [_c("label", [_vm._v("Tindakan")]), _c("br"), _vm._v(" "), _c("b-button", {
      staticClass: "btn btn-sm btn-danger text-white",
      attrs: {
        disabled: "",
        pill: true
      },
      on: {
        click: function click($event) {
          return _vm.removeDetail(index, "PA");
        }
      }
    }, [_c("i", {
      staticClass: "ion ion-md-trash"
    })])], 1) : _vm._e()], 1), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
      staticClass: "col-md-6"
    }, [_c("label", {
      staticClass: "form-label"
    }, [_vm._v("Deskripsi")]), _vm._v(" "), _vm.isShow == false ? _c("label", {
      staticClass: "form-label float-right text-danger"
    }, [_vm._v("*Wajib Diisi")]) : _vm._e(), _vm._v(" "), _c("b-textarea", {
      staticClass: "mb-1",
      attrs: {
        name: "PADescription",
        required: "",
        readonly: ""
      },
      model: {
        value: item.PADescription,
        callback: function callback($$v) {
          _vm.$set(item, "PADescription", $$v);
        },
        expression: "item.PADescription"
      }
    })], 1), _vm._v(" "), _vm.isShow == false ? _c("b-form-group", {
      staticClass: "col-md-6"
    }, [_c("label", {
      staticClass: "form-label"
    }, [_vm._v("Lampiran Tindakan Pencegahan")]), _vm._v(" "), _c("label", {
      staticClass: "form-label float-right text-danger"
    }, [_vm._v("(Max. 50 MB)")]), _vm._v(" "), _c("file-pond", {
      ref: "pondMyFile",
      refInFor: true,
      attrs: {
        name: "PAFile",
        "label-idle": "Lampiran : 1.Data Batch Record; 2.Buku Kronik; 3.Dokumentasi before/after perbaikan; 4.Lain-lain;",
        "allow-multiple": true,
        files: item.PAFile,
        "accepted-file-types": "application/*, image/*, video/*",
        maxTotalFileSize: "50MB",
        disabled: "true"
      },
      on: {
        updatefiles: function updatefiles($event) {
          return _vm.handleFilePA($event, index);
        },
        removefile: _vm.handleRemovePA
      }
    })], 1) : _vm._e(), _vm._v(" "), _c("b-form-group", {
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
  }), _vm._v(" "), _vm.isShow == false ? _c("b-btn", {
    staticClass: "float-left btn-info",
    attrs: {
      disabled: true,
      type: "button",
      id: "btambah-PA"
    },
    on: {
      click: function click($event) {
        return _vm.addDetail("PA");
      }
    }
  }, [_c("i", {
    staticClass: "fas fa-plus"
  }), _vm._v(" Tambah")]) : _vm._e()], 2), _vm._v(" "), _vm.Position == 2 || _vm.Position == 4 ? _c("b-card", {
    staticClass: "mb-4",
    attrs: {
      header: "Sistem Lain Yang Terdampak (Bila Ada)",
      "header-tag": "h5"
    }
  }, [_vm.isShow == false ? _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]) : _vm._e(), _vm._v(" "), _c("b-form-group", {
    attrs: {
      label: "Bagian ini diisi oleh QA",
      disabled: ""
    }
  }, [_c("b-form-radio", {
    attrs: {
      state: _vm.allErrors.selected ? false : null,
      value: false,
      disabled: _vm.isShow
    },
    model: {
      value: _vm.selected,
      callback: function callback($$v) {
        _vm.selected = $$v;
      },
      expression: "selected"
    }
  }, [_vm._v("Tidak Ada")]), _vm._v(" "), _c("b-form-radio", {
    attrs: {
      state: _vm.allErrors.selected ? false : null,
      value: true,
      disabled: _vm.isShow
    },
    model: {
      value: _vm.selected,
      callback: function callback($$v) {
        _vm.selected = $$v;
      },
      expression: "selected"
    }
  }, [_vm._v("Ada, yaitu ...")]), _vm._v(" "), _vm.allErrors.selected ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.selected[0]))]) : _vm._e()], 1), _vm._v(" "), _vm.selected === true ? _c("b-form-group", {
    attrs: {
      disabled: ""
    }
  }, _vm._l(_vm.getAnotherEffect, function (item, index) {
    return _c("li", {
      key: index
    }, [_c("b-form-checkbox", {
      attrs: {
        value: item.id_effect,
        disabled: _vm.isShow
      },
      model: {
        value: _vm.checkedEffect[item.id_effect],
        callback: function callback($$v) {
          _vm.$set(_vm.checkedEffect, item.id_effect, $$v);
        },
        expression: "checkedEffect[item.id_effect]"
      }
    }, [_vm._v("\n                  " + _vm._s(item.title_effect) + "\n                ")]), _vm._v(" "), _vm.checkedEffect[item.id_effect] ? _c("div", [_c("b-form-textarea", {
      staticClass: "mb-4",
      attrs: {
        id: "textarea-state",
        placeholder: "Enter at least 10 characters",
        rows: "3",
        disabled: ""
      },
      model: {
        value: _vm.text[item.id_effect],
        callback: function callback($$v) {
          _vm.$set(_vm.text, item.id_effect, $$v);
        },
        expression: "text[item.id_effect]"
      }
    })], 1) : _vm._e()], 1);
  }), 0) : _vm._e()], 1) : _vm._e(), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-12"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Lampiran CAPA")]), _vm._v(" "), _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("(Max. 50 MB)")]), _vm._v(" "), _c("file-pond", {
    ref: "pondMyFile",
    attrs: {
      name: "CAPAFile",
      "label-idle": "Lampiran : 1.Data Batch Record; 2.Buku Kronik; 3.Dokumentasi before/after perbaikan; 4.Lain-lain;",
      "allow-multiple": true,
      files: _vm.field.CAPAFile,
      "accepted-file-types": "application/*, image/*, video/*",
      maxTotalFileSize: "50MB",
      required: "",
      disabled: _vm.isShow || _vm.Position === 4
    },
    on: {
      updatefiles: _vm.handleFileCAPA,
      removefile: _vm.handleRemoveCAPA
    }
  })], 1), _vm._v(" "), _vm.isShow == true ? _c("b-card", {
    staticClass: "mb-3",
    attrs: {
      header: "Lampiran CAPA",
      "header-tag": "h5"
    }
  }, [_c("b-form-row", _vm._l(_vm.field.FileCAPADownload, function (item, index) {
    return _c("b-form-group", {
      key: index,
      staticClass: "col-md-12"
    }, [_c("b-input-group", [_c("b-form-input", {
      attrs: {
        name: "FileCAPADownload",
        readonly: ""
      },
      model: {
        value: item[0],
        callback: function callback($$v) {
          _vm.$set(item, 0, $$v);
        },
        expression: "item[0]"
      }
    }), _vm._v(" "), _c("b-input-group-append", [_c("a", {
      staticClass: "input-group-text btn-outline-success",
      attrs: {
        href: _vm.BaseUrl + item[1],
        target: "_blank"
      }
    }, [_c("i", {
      staticClass: "fa fa-download"
    })])])], 1)], 1);
  }), 1)], 1) : _vm._e()], 1), _vm._v(" "), _vm.Position == 2 || _vm.Position == 4 ? _c("b-card", {
    staticClass: "mb-4",
    attrs: {
      header: "Verifikasi Efektifitas CAPA",
      "header-tag": "h5"
    }
  }, [(_vm.isShow == true || _vm.isEdit == true) && _vm.Position === 4 && _vm.valStatus === 2 && _vm.userDepartment === 67 ? _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-12"
  }, [_vm.isShow == false ? _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]) : _vm._e(), _vm._v(" "), _c("b-form-group", [_c("b-form-radio", {
    attrs: {
      state: _vm.allErrors.selectedEfektifitasCapa ? false : null,
      value: false,
      disabled: _vm.isShow
    },
    model: {
      value: _vm.selectedEfektifitasCapa,
      callback: function callback($$v) {
        _vm.selectedEfektifitasCapa = $$v;
      },
      expression: "selectedEfektifitasCapa"
    }
  }, [_vm._v("CAPA telah dilaksanakan dengan baik")]), _vm._v(" "), _c("b-form-radio", {
    attrs: {
      state: _vm.allErrors.selectedEfektifitasCapa ? false : null,
      value: true,
      disabled: _vm.isShow
    },
    model: {
      value: _vm.selectedEfektifitasCapa,
      callback: function callback($$v) {
        _vm.selectedEfektifitasCapa = $$v;
      },
      expression: "selectedEfektifitasCapa"
    }
  }, [_vm._v("Perlu CAPA lain, yaitu :")]), _vm._v(" "), _vm.allErrors.selectedEfektifitasCapa ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.selectedEfektifitasCapa[0]))]) : _vm._e()], 1), _vm._v(" "), _vm.selectedEfektifitasCapa === true ? _c("b-form-group", [_c("b-form-textarea", {
    staticClass: "mb-4",
    attrs: {
      id: "textarea-state",
      placeholder: "Enter at least 10 characters",
      rows: "3",
      disabled: _vm.isShow,
      required: _vm.selectedEfektifitasCapa
    },
    model: {
      value: _vm.field.selectedEfektifitasValue,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "selectedEfektifitasValue", $$v);
      },
      expression: "field.selectedEfektifitasValue"
    }
  })], 1) : _vm._e()], 1)], 1) : _vm._e()], 1) : _vm._e(), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-6"
  }), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-6",
    attrs: {
      label: ""
    }
  }, [_vm.isShow == true && _vm.Position === 4 && _vm.valStatus === 2 && _vm.userDepartment === 67 ? _c("b-btn", {
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
  }, [_vm._v("\n          Setujui")]) : _vm._e(), _vm._v(" "), _vm.isShow == true && _vm.Position === 4 && _vm.valStatus === 2 && _vm.userDepartment === 67 ? _c("b-btn", {
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
  }, [_vm._v("\n          Tolak")]) : _vm._e(), _vm._v(" "), _vm.isShow == true && _vm.Position === 4 && _vm.valStatus === 2 && _vm.userDepartment === 67 ? _c("b-btn", {
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
  }, [_vm._v("\n          Koreksi")]) : _vm._e(), _vm._v(" "), _vm.isShow == false ? _c("b-btn", {
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

/***/ "./node_modules/moment/locale sync recursive ^\\.\\/.*$":
/*!**************************************************!*\
  !*** ./node_modules/moment/locale sync ^\.\/.*$ ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "./node_modules/moment/locale/af.js",
	"./af.js": "./node_modules/moment/locale/af.js",
	"./ar": "./node_modules/moment/locale/ar.js",
	"./ar-dz": "./node_modules/moment/locale/ar-dz.js",
	"./ar-dz.js": "./node_modules/moment/locale/ar-dz.js",
	"./ar-kw": "./node_modules/moment/locale/ar-kw.js",
	"./ar-kw.js": "./node_modules/moment/locale/ar-kw.js",
	"./ar-ly": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ly.js": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ma": "./node_modules/moment/locale/ar-ma.js",
	"./ar-ma.js": "./node_modules/moment/locale/ar-ma.js",
	"./ar-sa": "./node_modules/moment/locale/ar-sa.js",
	"./ar-sa.js": "./node_modules/moment/locale/ar-sa.js",
	"./ar-tn": "./node_modules/moment/locale/ar-tn.js",
	"./ar-tn.js": "./node_modules/moment/locale/ar-tn.js",
	"./ar.js": "./node_modules/moment/locale/ar.js",
	"./az": "./node_modules/moment/locale/az.js",
	"./az.js": "./node_modules/moment/locale/az.js",
	"./be": "./node_modules/moment/locale/be.js",
	"./be.js": "./node_modules/moment/locale/be.js",
	"./bg": "./node_modules/moment/locale/bg.js",
	"./bg.js": "./node_modules/moment/locale/bg.js",
	"./bm": "./node_modules/moment/locale/bm.js",
	"./bm.js": "./node_modules/moment/locale/bm.js",
	"./bn": "./node_modules/moment/locale/bn.js",
	"./bn.js": "./node_modules/moment/locale/bn.js",
	"./bo": "./node_modules/moment/locale/bo.js",
	"./bo.js": "./node_modules/moment/locale/bo.js",
	"./br": "./node_modules/moment/locale/br.js",
	"./br.js": "./node_modules/moment/locale/br.js",
	"./bs": "./node_modules/moment/locale/bs.js",
	"./bs.js": "./node_modules/moment/locale/bs.js",
	"./ca": "./node_modules/moment/locale/ca.js",
	"./ca.js": "./node_modules/moment/locale/ca.js",
	"./cs": "./node_modules/moment/locale/cs.js",
	"./cs.js": "./node_modules/moment/locale/cs.js",
	"./cv": "./node_modules/moment/locale/cv.js",
	"./cv.js": "./node_modules/moment/locale/cv.js",
	"./cy": "./node_modules/moment/locale/cy.js",
	"./cy.js": "./node_modules/moment/locale/cy.js",
	"./da": "./node_modules/moment/locale/da.js",
	"./da.js": "./node_modules/moment/locale/da.js",
	"./de": "./node_modules/moment/locale/de.js",
	"./de-at": "./node_modules/moment/locale/de-at.js",
	"./de-at.js": "./node_modules/moment/locale/de-at.js",
	"./de-ch": "./node_modules/moment/locale/de-ch.js",
	"./de-ch.js": "./node_modules/moment/locale/de-ch.js",
	"./de.js": "./node_modules/moment/locale/de.js",
	"./dv": "./node_modules/moment/locale/dv.js",
	"./dv.js": "./node_modules/moment/locale/dv.js",
	"./el": "./node_modules/moment/locale/el.js",
	"./el.js": "./node_modules/moment/locale/el.js",
	"./en-SG": "./node_modules/moment/locale/en-SG.js",
	"./en-SG.js": "./node_modules/moment/locale/en-SG.js",
	"./en-au": "./node_modules/moment/locale/en-au.js",
	"./en-au.js": "./node_modules/moment/locale/en-au.js",
	"./en-ca": "./node_modules/moment/locale/en-ca.js",
	"./en-ca.js": "./node_modules/moment/locale/en-ca.js",
	"./en-gb": "./node_modules/moment/locale/en-gb.js",
	"./en-gb.js": "./node_modules/moment/locale/en-gb.js",
	"./en-ie": "./node_modules/moment/locale/en-ie.js",
	"./en-ie.js": "./node_modules/moment/locale/en-ie.js",
	"./en-il": "./node_modules/moment/locale/en-il.js",
	"./en-il.js": "./node_modules/moment/locale/en-il.js",
	"./en-nz": "./node_modules/moment/locale/en-nz.js",
	"./en-nz.js": "./node_modules/moment/locale/en-nz.js",
	"./eo": "./node_modules/moment/locale/eo.js",
	"./eo.js": "./node_modules/moment/locale/eo.js",
	"./es": "./node_modules/moment/locale/es.js",
	"./es-do": "./node_modules/moment/locale/es-do.js",
	"./es-do.js": "./node_modules/moment/locale/es-do.js",
	"./es-us": "./node_modules/moment/locale/es-us.js",
	"./es-us.js": "./node_modules/moment/locale/es-us.js",
	"./es.js": "./node_modules/moment/locale/es.js",
	"./et": "./node_modules/moment/locale/et.js",
	"./et.js": "./node_modules/moment/locale/et.js",
	"./eu": "./node_modules/moment/locale/eu.js",
	"./eu.js": "./node_modules/moment/locale/eu.js",
	"./fa": "./node_modules/moment/locale/fa.js",
	"./fa.js": "./node_modules/moment/locale/fa.js",
	"./fi": "./node_modules/moment/locale/fi.js",
	"./fi.js": "./node_modules/moment/locale/fi.js",
	"./fo": "./node_modules/moment/locale/fo.js",
	"./fo.js": "./node_modules/moment/locale/fo.js",
	"./fr": "./node_modules/moment/locale/fr.js",
	"./fr-ca": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ca.js": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ch": "./node_modules/moment/locale/fr-ch.js",
	"./fr-ch.js": "./node_modules/moment/locale/fr-ch.js",
	"./fr.js": "./node_modules/moment/locale/fr.js",
	"./fy": "./node_modules/moment/locale/fy.js",
	"./fy.js": "./node_modules/moment/locale/fy.js",
	"./ga": "./node_modules/moment/locale/ga.js",
	"./ga.js": "./node_modules/moment/locale/ga.js",
	"./gd": "./node_modules/moment/locale/gd.js",
	"./gd.js": "./node_modules/moment/locale/gd.js",
	"./gl": "./node_modules/moment/locale/gl.js",
	"./gl.js": "./node_modules/moment/locale/gl.js",
	"./gom-latn": "./node_modules/moment/locale/gom-latn.js",
	"./gom-latn.js": "./node_modules/moment/locale/gom-latn.js",
	"./gu": "./node_modules/moment/locale/gu.js",
	"./gu.js": "./node_modules/moment/locale/gu.js",
	"./he": "./node_modules/moment/locale/he.js",
	"./he.js": "./node_modules/moment/locale/he.js",
	"./hi": "./node_modules/moment/locale/hi.js",
	"./hi.js": "./node_modules/moment/locale/hi.js",
	"./hr": "./node_modules/moment/locale/hr.js",
	"./hr.js": "./node_modules/moment/locale/hr.js",
	"./hu": "./node_modules/moment/locale/hu.js",
	"./hu.js": "./node_modules/moment/locale/hu.js",
	"./hy-am": "./node_modules/moment/locale/hy-am.js",
	"./hy-am.js": "./node_modules/moment/locale/hy-am.js",
	"./id": "./node_modules/moment/locale/id.js",
	"./id.js": "./node_modules/moment/locale/id.js",
	"./is": "./node_modules/moment/locale/is.js",
	"./is.js": "./node_modules/moment/locale/is.js",
	"./it": "./node_modules/moment/locale/it.js",
	"./it-ch": "./node_modules/moment/locale/it-ch.js",
	"./it-ch.js": "./node_modules/moment/locale/it-ch.js",
	"./it.js": "./node_modules/moment/locale/it.js",
	"./ja": "./node_modules/moment/locale/ja.js",
	"./ja.js": "./node_modules/moment/locale/ja.js",
	"./jv": "./node_modules/moment/locale/jv.js",
	"./jv.js": "./node_modules/moment/locale/jv.js",
	"./ka": "./node_modules/moment/locale/ka.js",
	"./ka.js": "./node_modules/moment/locale/ka.js",
	"./kk": "./node_modules/moment/locale/kk.js",
	"./kk.js": "./node_modules/moment/locale/kk.js",
	"./km": "./node_modules/moment/locale/km.js",
	"./km.js": "./node_modules/moment/locale/km.js",
	"./kn": "./node_modules/moment/locale/kn.js",
	"./kn.js": "./node_modules/moment/locale/kn.js",
	"./ko": "./node_modules/moment/locale/ko.js",
	"./ko.js": "./node_modules/moment/locale/ko.js",
	"./ku": "./node_modules/moment/locale/ku.js",
	"./ku.js": "./node_modules/moment/locale/ku.js",
	"./ky": "./node_modules/moment/locale/ky.js",
	"./ky.js": "./node_modules/moment/locale/ky.js",
	"./lb": "./node_modules/moment/locale/lb.js",
	"./lb.js": "./node_modules/moment/locale/lb.js",
	"./lo": "./node_modules/moment/locale/lo.js",
	"./lo.js": "./node_modules/moment/locale/lo.js",
	"./lt": "./node_modules/moment/locale/lt.js",
	"./lt.js": "./node_modules/moment/locale/lt.js",
	"./lv": "./node_modules/moment/locale/lv.js",
	"./lv.js": "./node_modules/moment/locale/lv.js",
	"./me": "./node_modules/moment/locale/me.js",
	"./me.js": "./node_modules/moment/locale/me.js",
	"./mi": "./node_modules/moment/locale/mi.js",
	"./mi.js": "./node_modules/moment/locale/mi.js",
	"./mk": "./node_modules/moment/locale/mk.js",
	"./mk.js": "./node_modules/moment/locale/mk.js",
	"./ml": "./node_modules/moment/locale/ml.js",
	"./ml.js": "./node_modules/moment/locale/ml.js",
	"./mn": "./node_modules/moment/locale/mn.js",
	"./mn.js": "./node_modules/moment/locale/mn.js",
	"./mr": "./node_modules/moment/locale/mr.js",
	"./mr.js": "./node_modules/moment/locale/mr.js",
	"./ms": "./node_modules/moment/locale/ms.js",
	"./ms-my": "./node_modules/moment/locale/ms-my.js",
	"./ms-my.js": "./node_modules/moment/locale/ms-my.js",
	"./ms.js": "./node_modules/moment/locale/ms.js",
	"./mt": "./node_modules/moment/locale/mt.js",
	"./mt.js": "./node_modules/moment/locale/mt.js",
	"./my": "./node_modules/moment/locale/my.js",
	"./my.js": "./node_modules/moment/locale/my.js",
	"./nb": "./node_modules/moment/locale/nb.js",
	"./nb.js": "./node_modules/moment/locale/nb.js",
	"./ne": "./node_modules/moment/locale/ne.js",
	"./ne.js": "./node_modules/moment/locale/ne.js",
	"./nl": "./node_modules/moment/locale/nl.js",
	"./nl-be": "./node_modules/moment/locale/nl-be.js",
	"./nl-be.js": "./node_modules/moment/locale/nl-be.js",
	"./nl.js": "./node_modules/moment/locale/nl.js",
	"./nn": "./node_modules/moment/locale/nn.js",
	"./nn.js": "./node_modules/moment/locale/nn.js",
	"./pa-in": "./node_modules/moment/locale/pa-in.js",
	"./pa-in.js": "./node_modules/moment/locale/pa-in.js",
	"./pl": "./node_modules/moment/locale/pl.js",
	"./pl.js": "./node_modules/moment/locale/pl.js",
	"./pt": "./node_modules/moment/locale/pt.js",
	"./pt-br": "./node_modules/moment/locale/pt-br.js",
	"./pt-br.js": "./node_modules/moment/locale/pt-br.js",
	"./pt.js": "./node_modules/moment/locale/pt.js",
	"./ro": "./node_modules/moment/locale/ro.js",
	"./ro.js": "./node_modules/moment/locale/ro.js",
	"./ru": "./node_modules/moment/locale/ru.js",
	"./ru.js": "./node_modules/moment/locale/ru.js",
	"./sd": "./node_modules/moment/locale/sd.js",
	"./sd.js": "./node_modules/moment/locale/sd.js",
	"./se": "./node_modules/moment/locale/se.js",
	"./se.js": "./node_modules/moment/locale/se.js",
	"./si": "./node_modules/moment/locale/si.js",
	"./si.js": "./node_modules/moment/locale/si.js",
	"./sk": "./node_modules/moment/locale/sk.js",
	"./sk.js": "./node_modules/moment/locale/sk.js",
	"./sl": "./node_modules/moment/locale/sl.js",
	"./sl.js": "./node_modules/moment/locale/sl.js",
	"./sq": "./node_modules/moment/locale/sq.js",
	"./sq.js": "./node_modules/moment/locale/sq.js",
	"./sr": "./node_modules/moment/locale/sr.js",
	"./sr-cyrl": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr.js": "./node_modules/moment/locale/sr.js",
	"./ss": "./node_modules/moment/locale/ss.js",
	"./ss.js": "./node_modules/moment/locale/ss.js",
	"./sv": "./node_modules/moment/locale/sv.js",
	"./sv.js": "./node_modules/moment/locale/sv.js",
	"./sw": "./node_modules/moment/locale/sw.js",
	"./sw.js": "./node_modules/moment/locale/sw.js",
	"./ta": "./node_modules/moment/locale/ta.js",
	"./ta.js": "./node_modules/moment/locale/ta.js",
	"./te": "./node_modules/moment/locale/te.js",
	"./te.js": "./node_modules/moment/locale/te.js",
	"./tet": "./node_modules/moment/locale/tet.js",
	"./tet.js": "./node_modules/moment/locale/tet.js",
	"./tg": "./node_modules/moment/locale/tg.js",
	"./tg.js": "./node_modules/moment/locale/tg.js",
	"./th": "./node_modules/moment/locale/th.js",
	"./th.js": "./node_modules/moment/locale/th.js",
	"./tl-ph": "./node_modules/moment/locale/tl-ph.js",
	"./tl-ph.js": "./node_modules/moment/locale/tl-ph.js",
	"./tlh": "./node_modules/moment/locale/tlh.js",
	"./tlh.js": "./node_modules/moment/locale/tlh.js",
	"./tr": "./node_modules/moment/locale/tr.js",
	"./tr.js": "./node_modules/moment/locale/tr.js",
	"./tzl": "./node_modules/moment/locale/tzl.js",
	"./tzl.js": "./node_modules/moment/locale/tzl.js",
	"./tzm": "./node_modules/moment/locale/tzm.js",
	"./tzm-latn": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm-latn.js": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm.js": "./node_modules/moment/locale/tzm.js",
	"./ug-cn": "./node_modules/moment/locale/ug-cn.js",
	"./ug-cn.js": "./node_modules/moment/locale/ug-cn.js",
	"./uk": "./node_modules/moment/locale/uk.js",
	"./uk.js": "./node_modules/moment/locale/uk.js",
	"./ur": "./node_modules/moment/locale/ur.js",
	"./ur.js": "./node_modules/moment/locale/ur.js",
	"./uz": "./node_modules/moment/locale/uz.js",
	"./uz-latn": "./node_modules/moment/locale/uz-latn.js",
	"./uz-latn.js": "./node_modules/moment/locale/uz-latn.js",
	"./uz.js": "./node_modules/moment/locale/uz.js",
	"./vi": "./node_modules/moment/locale/vi.js",
	"./vi.js": "./node_modules/moment/locale/vi.js",
	"./x-pseudo": "./node_modules/moment/locale/x-pseudo.js",
	"./x-pseudo.js": "./node_modules/moment/locale/x-pseudo.js",
	"./yo": "./node_modules/moment/locale/yo.js",
	"./yo.js": "./node_modules/moment/locale/yo.js",
	"./zh-cn": "./node_modules/moment/locale/zh-cn.js",
	"./zh-cn.js": "./node_modules/moment/locale/zh-cn.js",
	"./zh-hk": "./node_modules/moment/locale/zh-hk.js",
	"./zh-hk.js": "./node_modules/moment/locale/zh-hk.js",
	"./zh-tw": "./node_modules/moment/locale/zh-tw.js",
	"./zh-tw.js": "./node_modules/moment/locale/zh-tw.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/moment/locale sync recursive ^\\.\\/.*$";

/***/ }),

/***/ "./resources/assets/src/components/backend/nod/verifikasi-capa-nod/form.vue":
/*!**********************************************************************************!*\
  !*** ./resources/assets/src/components/backend/nod/verifikasi-capa-nod/form.vue ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _form_vue_vue_type_template_id_3feb3352___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form.vue?vue&type=template&id=3feb3352& */ "./resources/assets/src/components/backend/nod/verifikasi-capa-nod/form.vue?vue&type=template&id=3feb3352&");
/* harmony import */ var _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form.vue?vue&type=script&lang=js& */ "./resources/assets/src/components/backend/nod/verifikasi-capa-nod/form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _form_vue_vue_type_template_id_3feb3352___WEBPACK_IMPORTED_MODULE_0__["render"],
  _form_vue_vue_type_template_id_3feb3352___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/src/components/backend/nod/verifikasi-capa-nod/form.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/src/components/backend/nod/verifikasi-capa-nod/form.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/nod/verifikasi-capa-nod/form.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./form.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/nod/verifikasi-capa-nod/form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/src/components/backend/nod/verifikasi-capa-nod/form.vue?vue&type=template&id=3feb3352&":
/*!*****************************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/nod/verifikasi-capa-nod/form.vue?vue&type=template&id=3feb3352& ***!
  \*****************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_3feb3352___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./form.vue?vue&type=template&id=3feb3352& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/nod/verifikasi-capa-nod/form.vue?vue&type=template&id=3feb3352&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_3feb3352___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_3feb3352___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
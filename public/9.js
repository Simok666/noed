(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/nod/nod-report/form.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/src/components/backend/nod/nod-report/form.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'form-nod-report',
  metaInfo: {
    title: 'Form NOD Report'
  },
  components: {},
  data: function data() {
    return {
      urlSubmit: '/AdminVue/nod-report-insert',
      headerCard: 'Laporan NOD',
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
        SectionPublish: 0
      },
      allErrors: [],
      isNotif: false,
      isEdit: false,
      alertNotif: '',
      alertVariant: 'alert-dark-danger',
      opsNOENumber: [],
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
      getAnotherEffect: [],
      checkedEffect: [],
      text: [],
      anotherEffectFile: [],
      fileAnotherEffect: [],
      fileAnotherEffectDownload: [],
      oldFileAnotherEffect: [],
      dataAnotherEffect: [],
      fileResponseAnotherEffect: []
    };
  },
  created: function created() {
    var _this = this;
    // Initialize the 'text' object with default values for each 'title_effect'
    this.getAnotherEffect.forEach(function (item) {
      _this.text[item.id_effect] = '';
      _this.anotherEffectFile[item.id_effect] = [];
    });
  },
  watch: {
    checkedEffect: {
      handler: function handler() {
        // Ketika checkbox diubah, perbarui nilai textarea sesuai dengan checkbox yang dicentang
        for (var key in this.checkedEffect) {
          if (this.checkedEffect[key]) {
            if (!this.text[key] || !this.anotherEffectFile[key]) {
              this.text[key] = ''; // Inisialisasi nilai textarea jika belum ada
              // this.anotherEffectFile[key] = []; 
            }
          } else {
            delete this.text[key]; // Hapus nilai textarea jika checkbox tidak dicentang
            delete this.anotherEffectFile[key];
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
      if (this.field.NODCA) {
        this.field.NODCA.forEach(function (data, index) {
          if (data.IdCAPIC == '' || data.CADate == '') {
            isEmpty = true;
            return false;
          }
        });
      }
      if (this.field.NODPA) {
        this.field.NODPA.forEach(function (data, index) {
          if (data.IdPAPIC == '' || data.PADate == '') {
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
        formData.append("NODNumber", this.field.NODNumber);
        if (this.field.NOENumber) formData.append("NOENumber", this.field.NOENumber.Id);
        formData.append("Date", this.field.Date);
        formData.append("ProperCondition", this.field.ProperCondition);
        formData.append("Man", this.field.Man);
        formData.append("Machine", this.field.Machine);
        formData.append("Method", this.field.Method);
        formData.append("Material", this.field.Material);
        formData.append("Milieu", this.field.Milieu);
        var collected = [];
        if (this.selected == true) {
          for (var idEffect in this.checkedEffect) {
            if (this.checkedEffect[idEffect]) {
              if (this.anotherEffectFile[idEffect] !== undefined) {
                for (var i = 0; i < this.anotherEffectFile[idEffect].length; i++) {
                  var _file = this.anotherEffectFile[idEffect][i];
                  formData.append('anotherEffectFile[' + idEffect + '][' + i + ']', _file);
                }
              }
              if (this.oldFileAnotherEffect[idEffect] !== undefined) {
                for (var i = 0; i < this.oldFileAnotherEffect[idEffect].length; i++) {
                  var oldfile = this.oldFileAnotherEffect[idEffect][i];
                  formData.append('oldEffectFile[' + idEffect + '][' + i + ']', oldfile);
                }
              }
              collected[idEffect] = {
                id_effect: idEffect,
                selected: this.selected,
                text: this.text[idEffect] || ''
              };
            }
          }
        } else {
          collected.push(this.selected);
        }
        if (this.Position == 2 || this.Position == 4) {
          formData.append("DescAnotherEffect", JSON.stringify(collected));
        }

        // sebelumnya hanya 1 data group, sekarang lebih dari 1 data group
        for (var i = 0; i < this.field.NODCA.length; i++) {
          formData.append('IdCAPIC[' + i + ']', this.field.NODCA[i].IdCAPIC.Id);
          formData.append('CADate[' + i + ']', this.field.NODCA[i].CADate);
          formData.append('CADescription[' + i + ']', this.field.NODCA[i].CADescription);
          var file = this.field.NODCA[i].CAFile;
          for (var j = 0; j < file.length; j++) {
            formData.append('CAFile[' + i + '][' + j + ']', file[j]);
          }
        }
        formData.append("OldCAFile", JSON.stringify(this.OldCAFile));

        // sebelumnya hanya 1 data group, sekarang lebih dari 1 data group
        for (var i = 0; i < this.field.NODPA.length; i++) {
          formData.append('IdPAPIC[' + i + ']', this.field.NODPA[i].IdPAPIC.Id);
          formData.append('PADate[' + i + ']', this.field.NODPA[i].PADate);
          formData.append('PADescription[' + i + ']', this.field.NODPA[i].PADescription);
          var file = this.field.NODPA[i].PAFile;
          for (var j = 0; j < file.length; j++) {
            formData.append('PAFile[' + i + '][' + j + ']', file[j]);
          }
        }
        formData.append("OldPAFile", JSON.stringify(this.OldPAFile));
        formData.append("IdPublish", this.field.PublishTo);
        formData.append("publishSection", this.field.SectionPublish);
        var config = {
          headers: {
            'content-type': 'multipart/form-data'
          }
        };
        axios.post(this.urlSubmit, formData, config).then(function (res) {
          var resp = res.data;
          if (resp.status) {
            this.$router.push({
              name: 'nod/data-nod-report',
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
        this.getDataNOE(option.Id);
        this.generateNumber(option.NOENumber, option.NOENumberAcc, option.Date);
        this.getDataPIC(option.Id);
      }
    },
    handleAnotherEffectFile: function handleAnotherEffectFile(files, checkedKey) {
      this.anotherEffectFile[checkedKey] = files.map(function (files) {
        return files.file;
      });
    },
    handleRemoveEffectFile: function handleRemoveEffectFile(error, files) {
      var _this2 = this;
      var replace = files.source.replace('/clouds', 'clouds');
      this.oldFileAnotherEffect.forEach(function (val, k) {
        val.forEach(function (v, i) {
          if (v == replace) {
            _this2.oldFileAnotherEffect[k].splice(i, 1);
          }
        });
      });
    },
    getData: function getData(Id) {
      axios.post('/AdminVue/nod-report-edit', {
        Id: Id
      }).then(function (res) {
        var _this3 = this;
        var resp = res.data;
        // console.log(resp.data)
        this.Position = res.data.position;
        this.userDepartment = res.data.department;
        this.deptTerkait = res.data.deptTerkait;
        this.statusDeptTerkait = res.data.statusDeptTerkait;
        this.field = resp.data;
        this.getDataNOE(this.field.IdNOEReport);
        this.getDataPIC(this.field.IdNOEReport);
        this.field.NODCA = resp.NODCA;
        this.field.NODPA = resp.NODPA;
        this.opsNOENumber.unshift(this.field.NOENumber);
        this.opsRelevantDept = resp.data.RelevantDept;
        if (resp.data.IdRelevantDept != 0) {
          JSON.parse(resp.data.IdRelevantDept).filter(function (value) {
            return value == resp.data.IdDepartmentSession ? _this3.isRelevantDept = true : _this3.isRelevantDept;
          }, {});
        }
        resp.data.TypeUser == 15 || resp.data.TypeUser == 16 ? this.isDept = true : this.isDept;
        this.relevantDeptExist = resp.data.IdRelevantDept;
        this.field.NODCA.forEach(function (value, index) {
          if (value) {
            if (value.CAFile != '') {
              value.IdCAPIC = {
                'Id': value.IdCAPIC,
                'PIC': value.CAPIC
              };
              value.CAFile = JSON.parse(value.CAFile);
              _this3.OldCAFile.push(value.CAFile);
              value.CAFileName = [];
              value.CAFile.forEach(function (val, i) {
                value.CAFile[i] = window.location.origin + '/' + val;
                var result = val.split('/');
                value.CAFileName[i] = result[4];
              });
            } else {
              _this3.OldCAFile.push('');
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
              _this3.OldPAFile.push(value.PAFile);
              value.PAFileName = [];
              value.PAFile.forEach(function (val, i) {
                value.PAFile[i] = window.location.origin + '/' + val;
                var result = val.split('/');
                value.PAFileName[i] = result[4];
              });
            } else {
              _this3.OldPAFile.push('');
            }
          }
        });
        if (this.field.Status) {
          if (this.field.Status == 'UnPublish') this.valStatus = 1;
          if (this.field.Status == 'Dilaporkan ke Unit Head') this.valStatus = 2;
          if (this.field.Status == 'Disetujui oleh Unit Head') this.valStatus = 3;
          if (this.field.Status == 'Disetujui oleh Section Head') this.valStatus = 4;
          if (this.field.Status == 'Disetujui oleh Dept Head') this.valStatus = 5;
          if (this.field.Status == 'Disetujui oleh Dept Head Terkait') this.valStatus = 6;
          if (this.field.Status == 'Disetujui oleh QA APJ') this.valStatus = 7;
          if (this.field.Status == 'Disetujui oleh QA Dept.Head') this.valStatus = 8;
          if (this.field.Status == 'Ditolak') this.valStatus = 9;
          if (this.field.Status == 'Disetujui Oleh QA Section Head') this.valStatus = 10;
        }
        this.isCaretaker = res.data.isCaretaker;
        this.getAnotherEffect = resp.getAnotherEffect;
        var selectedAnotherEffect = Object.values(resp.selectedAnotherEffect);
        if (selectedAnotherEffect) {
          selectedAnotherEffect.forEach(function (item, index) {
            _this3.anotherEffectFile[item.id_effect] = [];
            _this3.oldFileAnotherEffect[item.id_effect] = [];
            if (item !== 'false') {
              _this3.selected = item.selected;
              _this3.checkedEffect[item.id_effect] = item.id_effect;
              _this3.text[item.id_effect] = item.text;
              _this3.fileResponseAnotherEffect[item.id_effect] = item.namefile;
              _this3.fileAnotherEffectDownload[item.id_effect] = item.filedownload;
              if (_this3.fileResponseAnotherEffect[item.id_effect] != '') {
                var countFileAnotherEffect = _this3.fileResponseAnotherEffect[item.id_effect].length;
                for (var i = 0; i < countFileAnotherEffect; i++) {
                  _this3.oldFileAnotherEffect[item.id_effect].push(_this3.fileResponseAnotherEffect[item.id_effect][i]);
                  _this3.anotherEffectFile[item.id_effect].push("/" + _this3.fileResponseAnotherEffect[item.id_effect][i]);
                }
              }
              if (_this3.anotherEffectFile[item.id_effect] == '') {
                _this3.oldFileAnotherEffect[item.id_effect] = '';
              }
            } else {
              _this3.selected = item;
            }
          });
        }
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.isNotif = true;
        this.alertNotif = 'Invalid Server Side!';
        this.alertVariant = 'alert-dark-danger';
      }.bind(this));
    },
    generateNumber: function generateNumber(noeNumber) {
      var noeNumberAcc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var date = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      axios.post('/AdminVue/nod-report-get-number', {
        NOENumber: noeNumber,
        NOENumberAcc: noeNumberAcc,
        Date: date
      }).then(function (res) {
        // this.field.NODNumber = res.data.data
        this.$set(this.field, 'NODNumber', res.data.data);
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.field.NODNumber = '';
      }.bind(this));
    },
    getNOENumber: function getNOENumber() {
      axios.post('/AdminVue/nod-report-get-noe-number').then(function (res) {
        this.opsNOENumber = res.data.data;
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.opsNOENumber = [];
      }.bind(this));
    },
    getDataNOE: function getDataNOE(Id) {
      axios.post('/AdminVue/nod-report-get-data-noe', {
        Id: Id
      }).then(function (res) {
        this.field.BatchNo = res.data.data.BatchNo;
        this.field.IdProduct = res.data.data.Product;
        this.field.Event = res.data.data.Event;
        this.field.PublishTo = res.data.data.IdPublish;
        this.field.SectionPublish = res.data.data.publishSection;
        this.field.Date = moment__WEBPACK_IMPORTED_MODULE_0___default()(res.data.data.Date).format('DD/MM/YYYY HH:mm:ss');
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
      var _this4 = this;
      this.OldCAFile.forEach(function (val, k) {
        val.forEach(function (v, i) {
          if (v == files.source) {
            _this4.OldCAFile[k].splice(i, 1);
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
      var _this5 = this;
      this.OldPAFile.forEach(function (val, k) {
        val.forEach(function (v, i) {
          if (v == files.source) {
            _this5.OldPAFile[k].splice(i, 1);
          }
        });
      });
    },
    addDetail: function addDetail(type) {
      if (type == 'CA') {
        var newCA = {
          'IdCAPIC': '',
          'CADate': '',
          'CADescription': '',
          'CAFile': []
        };
        // this.field.NODCA.push({'IdCAPIC':'','CADate':'','CADescription':'','CAFile':[]})
        vue__WEBPACK_IMPORTED_MODULE_1___default.a.set(this.field.NODCA, this.field.NODCA.length, newCA);
        this.$forceUpdate();
      } else {
        var newPA = {
          'IdPAPIC': '',
          'PADate': '',
          'PADescription': '',
          'PAFile': []
        };
        // this.field.NODPA.push({'IdPAPIC':'','PADate':'','PADescription':'','PAFile':[]})
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
      this.$router.push('/RoleAdmin/nod/data-nod-report');
    },
    onAction: function onAction(action) {
      if (action == 'publish') {
        this.publish('/AdminVue/nod-report-publish', this.field.Id, this.$parent, true);
      }
      if (action == 'approve') {
        this.approve('/AdminVue/nod-report-approve', this.field.Id, this.$parent, null, true, this.isCaretaker, this.opsRelevantDept, this.isDept, this.isRelevantDept, this.relevantDeptExist);
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
    this.getNOENumber();
    // this.getDataPIC()

    if (this.$route.params.isFormEdit) {
      var Id = this.$route.params.Id;
      this.isEdit = true;
      if (Id) {
        this.getData(Id);
        this.field.Id = Id;
        this.urlSubmit = '/AdminVue/nod-report-update';
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
    // if(this.isEdit == false && this.isShow == false) this.generateNumber()
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/nod/nod-report/form.vue?vue&type=template&id=2cc35ff8&":
/*!********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/src/components/backend/nod/nod-report/form.vue?vue&type=template&id=2cc35ff8& ***!
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
  }, [_vm._v("No. NOD")]), _vm._v(" "), _c("b-input", {
    staticClass: "mb-1",
    attrs: {
      name: "NODNumber",
      state: _vm.allErrors.NODNumber ? false : null,
      readonly: "",
      required: ""
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
  }, [_vm._v("No. NOE")]), _vm._v(" "), _vm.isShow == false ? _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Dipilih")]) : _vm._e(), _vm._v(" "), _c("multiselect", {
    attrs: {
      options: _vm.opsNOENumber,
      "allow-empty": false,
      placeholder: "Pilih No. NOE",
      label: "NOENumber",
      "track-by": "NOENumber",
      required: "",
      disabled: _vm.isShow
    },
    on: {
      input: _vm.onChange
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
      readonly: _vm.isShow
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
      readonly: _vm.isShow
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
      readonly: _vm.isShow
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
      readonly: _vm.isShow
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
      readonly: _vm.isShow
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
      readonly: _vm.isShow
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
        disabled: _vm.isShow
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
        disabled: _vm.isShow
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
        pill: true
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
        readonly: _vm.isShow
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
        disabled: _vm.isShow
      },
      on: {
        updatefiles: function updatefiles($event) {
          return _vm.handleFileCA($event, index);
        },
        removefile: _vm.handleRemoveCA
      }
    })], 1) : _vm._e(), _vm._v(" "), _vm.isShow ? _c("b-form-group", {
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
    })], 2) : _vm._e()], 1), _vm._v(" "), _c("b-form-row", [_c("b-button", {
      attrs: {
        variant: "outline-primary"
      }
    }, [_vm._v("Resend Email CA")])], 1), _vm._v(" "), _c("hr")];
  }), _vm._v(" "), _vm.isShow == false ? _c("b-btn", {
    staticClass: "float-left btn-info",
    attrs: {
      type: "button",
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
        disabled: _vm.isShow
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
        disabled: _vm.isShow
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
        readonly: _vm.isShow
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
        disabled: _vm.isShow
      },
      on: {
        updatefiles: function updatefiles($event) {
          return _vm.handleFilePA($event, index);
        },
        removefile: _vm.handleRemovePA
      }
    })], 1) : _vm._e(), _vm._v(" "), _vm.isShow ? _c("b-form-group", {
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
    })], 2) : _vm._e()], 1), _vm._v(" "), _c("b-form-row", [_c("b-button", {
      attrs: {
        variant: "outline-primary"
      }
    }, [_vm._v("Resend Email PA")])], 1), _vm._v(" "), _c("hr")];
  }), _vm._v(" "), _vm.isShow == false ? _c("b-btn", {
    staticClass: "float-left btn-info",
    attrs: {
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
      label: "Bagian ini diisi oleh QA"
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
  }, [_vm._v(_vm._s(_vm.allErrors.selected[0]))]) : _vm._e()], 1), _vm._v(" "), _vm.selected === true ? _c("b-form-group", _vm._l(_vm.getAnotherEffect, function (item, index) {
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
        readonly: _vm.isShow
      },
      model: {
        value: _vm.text[item.id_effect],
        callback: function callback($$v) {
          _vm.$set(_vm.text, item.id_effect, $$v);
        },
        expression: "text[item.id_effect]"
      }
    }), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
      staticClass: "col-md-12"
    }, [_c("label", {
      staticClass: "form-label"
    }, [_vm._v("Lampiran sistem lain yang terdampak")]), _vm._v(" "), _c("label", {
      staticClass: "form-label float-right text-danger"
    }, [_vm._v("(Max. 50 MB)")]), _vm._v(" "), _c("file-pond", {
      ref: "pondMyFile",
      refInFor: true,
      attrs: {
        name: "anotherEffectFile",
        "label-idle": "Lampiran : 1.Data Batch Record; 2.Buku Kronik; 3.Dokumentasi before/after perbaikan; 4.Lain-lain;",
        "allow-multiple": true,
        files: _vm.anotherEffectFile[item.id_effect],
        "accepted-file-types": "application/*, image/*, video/*",
        maxTotalFileSize: "50MB",
        disabled: _vm.isShow
      },
      on: {
        updatefiles: function updatefiles($event) {
          return _vm.handleAnotherEffectFile($event, item.id_effect);
        },
        removefile: _vm.handleRemoveEffectFile
      }
    })], 1), _vm._v(" "), _c("b-card", {
      staticClass: "mb-3",
      attrs: {
        header: "Lampiran Another Effect",
        "header-tag": "h5"
      }
    }, [_c("b-form-row", _vm._l(_vm.fileAnotherEffectDownload[item.id_effect], function (itemFile, indexFile) {
      return _c("b-form-group", {
        key: indexFile,
        staticClass: "col-md-12"
      }, [_c("b-input-group", [_c("b-form-input", {
        attrs: {
          name: "FileVerifPADownload",
          readonly: ""
        },
        model: {
          value: itemFile[0],
          callback: function callback($$v) {
            _vm.$set(itemFile, 0, $$v);
          },
          expression: "itemFile[0]"
        }
      }), _vm._v(" "), _c("b-input-group-append", [_c("a", {
        staticClass: "input-group-text btn-outline-success",
        attrs: {
          href: _vm.BaseUrl + itemFile[1],
          target: "_blank"
        }
      }, [_c("i", {
        staticClass: "fa fa-download"
      })])])], 1)], 1);
    }), 1)], 1)], 1)], 1) : _vm._e()], 1);
  }), 0) : _vm._e()], 1) : _vm._e(), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-6"
  }), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-6",
    attrs: {
      label: ""
    }
  }, [_vm.isShow == true && _vm.Position < 3 && _vm.valStatus == 1 ? _c("b-btn", {
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
  }, [_vm._v("Publish")]) : _vm._e(), _vm._v(" "), _vm.isShow == true && (_vm.valStatus == 2 && _vm.field.IdDepartment == _vm.userDepartment && _vm.Position == 1 || _vm.valStatus == 3 && _vm.field.IdDepartment == _vm.userDepartment && _vm.Position == 2 || _vm.valStatus == 4 && _vm.field.IdDepartment == _vm.userDepartment && (_vm.Position == 4 || _vm.isCaretaker == true) || _vm.valStatus == 5 && _vm.deptTerkait == true && _vm.statusDeptTerkait == false || _vm.userDepartment == 67 && (_vm.Position == 3 && _vm.valStatus == 6 || _vm.Position == 4 && _vm.valStatus == 10 || _vm.Position == 4 && _vm.valStatus == 10 || _vm.Position == 2 && _vm.valStatus == 6)) ? _c("b-btn", {
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
  }, [_vm._v("\n          Setujui")]) : _vm._e(), _vm._v(" "), _vm.isShow == true && (_vm.valStatus == 4 && _vm.field.IdDepartment == _vm.userDepartment && (_vm.Position == 4 || _vm.isCaretaker == true) || _vm.userDepartment == 67 && (_vm.Position == 3 && _vm.valStatus == 6 || _vm.Position == 4 && _vm.valStatus == 10 || _vm.Position == 4 && _vm.valStatus == 10)) ? _c("b-btn", {
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
  }, [_vm._v("\n          Tolak")]) : _vm._e(), _vm._v(" "), _vm.isShow == true && (_vm.valStatus == 2 && _vm.field.IdDepartment == _vm.userDepartment && _vm.Position == 1 || _vm.valStatus == 3 && _vm.field.IdDepartment == _vm.userDepartment && _vm.Position == 2 || _vm.valStatus == 4 && _vm.field.IdDepartment == _vm.userDepartment && (_vm.Position == 4 || _vm.isCaretaker == true) || _vm.valStatus == 5 && _vm.deptTerkait == true && _vm.statusDeptTerkait == false || _vm.userDepartment == 67 && (_vm.Position == 3 && _vm.valStatus == 6 || _vm.Position == 4 && _vm.valStatus == 10 || _vm.Position == 4 && _vm.valStatus == 10)) ? _c("b-btn", {
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

/***/ "./resources/assets/src/components/backend/nod/nod-report/form.vue":
/*!*************************************************************************!*\
  !*** ./resources/assets/src/components/backend/nod/nod-report/form.vue ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _form_vue_vue_type_template_id_2cc35ff8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form.vue?vue&type=template&id=2cc35ff8& */ "./resources/assets/src/components/backend/nod/nod-report/form.vue?vue&type=template&id=2cc35ff8&");
/* harmony import */ var _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form.vue?vue&type=script&lang=js& */ "./resources/assets/src/components/backend/nod/nod-report/form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _form_vue_vue_type_template_id_2cc35ff8___WEBPACK_IMPORTED_MODULE_0__["render"],
  _form_vue_vue_type_template_id_2cc35ff8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/src/components/backend/nod/nod-report/form.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/src/components/backend/nod/nod-report/form.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/nod/nod-report/form.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./form.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/nod/nod-report/form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/src/components/backend/nod/nod-report/form.vue?vue&type=template&id=2cc35ff8&":
/*!********************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/nod/nod-report/form.vue?vue&type=template&id=2cc35ff8& ***!
  \********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_2cc35ff8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./form.vue?vue&type=template&id=2cc35ff8& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/nod/nod-report/form.vue?vue&type=template&id=2cc35ff8&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_2cc35ff8___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_2cc35ff8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
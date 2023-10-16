(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[12],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/noe/noe-evaluation/form.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/src/components/backend/noe/noe-evaluation/form.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'form-noe-evaluation',
  metaInfo: {
    title: 'Form NOE Evaluation'
  },
  components: {},
  data: function data() {
    return {
      urlSubmit: '/AdminVue/noe-evaluation-insert',
      headerCard: 'Evaluasi NOE',
      textBtnSubmit: 'Simpan',
      field: {
        EventFile: [],
        CorrectiveActionFile: [],
        IdDevRiskAssesment: [{
          RiskAssesment: '',
          Question: '',
          Value: '',
          AssesmentGroup: ''
        }],
        DeviationLevel: '',
        FileEventDownload: [],
        FileCorrectiveActionDownload: [],
        Dept: '',
        Lampiran: ''
      },
      allErrors: [],
      isNotif: false,
      alertNotif: '',
      alertVariant: 'alert-dark-danger',
      OldEventFile: [],
      OldCorrectiveActionFile: [],
      valDept: 0,
      DescOPA: false,
      resultValue: 0,
      opsDeviation: [],
      opsNOE: [{
        'value': 'Bets',
        'text': 'Bets'
      }, {
        'value': 'Non Bets',
        'text': 'Non Bets'
      }],
      opsDevLevelQA: [{
        'value': 'Minor',
        'text': 'Minor'
      }, {
        'value': 'Major',
        'text': 'Major'
      }, {
        'value': 'Critical',
        'text': 'Critical'
      }],
      Position: 0,
      //1 = unit head; 2 = sect head; 3 = APJ; 4 = dept head;
      valStatus: 0,
      isShow: false,
      isEdit: false,
      BaseUrl: "/",
      isCaretaker: false,
      isComment: false,
      checkAnswer: false,
      HistoryCorrectionData: [],
      getCorrectorData: [],
      showMore: false,
      maxVisibleItems: 2,
      isTypeUser: false,
      isChildToAnswer: false,
      isAnswered: false,
      isCorrection: false
    };
  },
  computed: {
    HistoryCorrection: function HistoryCorrection() {
      if (this.showMore) {
        return this.HistoryCorrectionData;
      } else {
        return this.HistoryCorrectionData.slice(0, this.maxVisibleItems);
      }
    },
    getCorrector: function getCorrector() {
      return this.getCorrectorData;
    },
    deptValue: function deptValue() {
      return this.field.Dept;
    },
    lampiranValue: function lampiranValue() {
      return this.field.Lampiran;
    },
    showMoreButton: function showMoreButton() {
      return this.HistoryCorrectionData.length > this.maxVisibleItems;
    }
  },
  methods: {
    submitForm: function submitForm() {
      this.showLoading();
      var formData = new FormData();
      formData.append("Id", this.field.Id);
      if (this.field.IdDeviation && this.field.IdDeviation.Deviation != null) formData.append("IdDeviation", this.field.IdDeviation.Deviation);
      formData.append("DescriptionEvaluation", this.field.DescriptionEvaluation);
      if (this.field.NOEClassification && this.field.NOEClassification.value != null) formData.append("NOEClassification", this.field.NOEClassification.value);
      if (this.field.DeviationLevelQA && this.field.DeviationLevelQA.value != null) formData.append("DeviationLevelQA", this.field.DeviationLevelQA.value);
      formData.append("Remarks", this.field.Remarks);
      var config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
      axios.post(this.urlSubmit, formData, config).then(function (res) {
        var resp = res.data;
        if (resp.status) {
          this.$router.push({
            name: 'noe/data-noe-evaluation',
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
      axios.post('/AdminVue/noe-evaluation-edit', {
        Id: Id
      }).then(function (res) {
        var resp = res.data;
        this.Position = res.data.position;
        this.field = resp.data;
        if (this.field.Verified == "Perlu tindakan koreksi lain") this.valDept = 1;
        if (this.field.Verified == "Tindakan koreksi telah dilaksanakan dengan baik") this.valDept = 0;
        if (this.field.OtherProductAffect == "Ada") this.DescOPA = true;
        if (this.field.OtherProductAffect == "Tidak Ada") {
          this.DescOPA = false;
          this.field.DescriptionOPA = '';
        }
        this.field.EventFile = [];
        this.field.CorrectiveActionFile = [];
        if (this.field.FileEvent != '') {
          var countFileEvent = this.field.FileEvent.length;
          for (var i = 0; i < countFileEvent; i++) {
            this.OldEventFile.push(this.field.FileEvent[i]);
            this.field.EventFile.push("/" + this.field.FileEvent[i]);
          }
        }
        if (this.field.EventFile == '') {
          this.OldEventFile = '';
        }
        if (this.field.FileCorrectiveAction != '') {
          var countFileCorrectiveAction = this.field.FileCorrectiveAction.length;
          for (var _i = 0; _i < countFileCorrectiveAction; _i++) {
            this.OldCorrectiveActionFile.push(this.field.FileCorrectiveAction[_i]);
            this.field.CorrectiveActionFile.push("/" + this.field.FileCorrectiveAction[_i]);
          }
        }
        if (this.field.CorrectiveActionFile == '') {
          this.OldCorrectiveActionFile = '';
        }
        if (this.field.Status) {
          if (this.field.Status == 'Dilaporkan ke Unit Head') this.valStatus = 2;
          if (this.field.Status == 'Dilaporkan ke Sect Head') this.valStatus = 3;
          if (this.field.Status == 'Disetujui oleh Unit Head') this.valStatus = 4;
          if (this.field.Status == 'Disetujui oleh Sect Head') this.valStatus = 5;
          if (this.field.Status == 'Disetujui oleh Dept Head') this.valStatus = 6;
          if (this.field.Status == 'Disetujui oleh QA Sect.Head') this.valStatus = 7;
          if (this.field.Status == 'Disetujui oleh QA APJ') this.valStatus = 8;
          if (this.field.Status == 'Disetujui oleh QA Dept.Head') this.valStatus = 9;
          if (this.field.Status == 'Ditolak') this.valStatus = 10;
        }
        this.isCaretaker = res.data.isCaretaker;
        this.isCorrection = resp.isCorrection;
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.isNotif = true;
        this.alertNotif = 'Invalid Server Side!';
        this.alertVariant = 'alert-dark-danger';
      }.bind(this));
    },
    getCorrectionData: function getCorrectionData(Id) {
      axios.post('/AdminVue/noe-report-get-correction', {
        Id: Id
      }).then(function (res) {
        var resp = res.data.data;
        var count = res.data.count;
        var history = res.data.history;
        var getCorrectorData = res.data.correction;
        this.HistoryCorrectionData = history;
        this.getCorrectorData = getCorrectorData;
        this.$set(this.field, 'Dept', resp.Name);
        this.$set(this.field, 'Lampiran', resp.Description);
        if (resp) {
          if (resp.TypeUser == resp.SessionTypeUser) {
            this.isTypeUser = true;
          }
          if (resp.ChildToAnswer == resp.SessionIdPosition) {
            this.isChildToAnswer = true;
          }
          if (resp.Answer == null) {
            this.isAnswered;
          } else {
            this.field.Answer = resp.Answer;
            this.isAnswered = true;
          }
          var countAnswer = [];
          history.forEach(function (keys) {
            countAnswer.push(keys.Answer);
          });
          if (countAnswer.length > 0) this.checkAnswer = true;
        }
        count > 0 ? this.isComment = true : this.isComment;
        this.$forceUpdate();
      }.bind(this))["catch"](function (e) {
        console.log(e);
      }.bind(this));
    },
    toggleShowMore: function toggleShowMore() {
      this.showMore = !this.showMore;
      console.log(this.showMore);
    },
    getDeviation: function getDeviation() {
      axios.post('/AdminVue/noe-evaluation-get-deviation').then(function (res) {
        this.opsDeviation = res.data.data;
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.opsDeviation = [];
      }.bind(this));
    },
    backIndex: function backIndex() {
      this.$router.push('/RoleAdmin/noe/data-noe-evaluation');
    },
    onAction: function onAction(action) {
      if (action == 'sendAnswer') {
        return this.sendAnswer('/AdminVue/noe-report-answer', this.field.NOENumber, this.field.Answer, this.$parent, true, this.valStatus);
      }
      if (this.isCorrection == false) {
        if (action == 'publish-evaluation') {
          this.publishEvaluation('/AdminVue/noe-evaluation-publish-evaluation', this.field.Id, this.$parent, true);
        }
        if (action == 'approve') {
          this.approve('/AdminVue/noe-evaluation-approve', this.field.Id, this.$parent, null, true, this.isCaretaker);
        }
        if (action == 'reject') {
          this.reject('/AdminVue/noe-evaluation-reject', this.field.Id, this.$parent, true, this.isCaretaker);
        }
        if (action == 'correction') {
          this.$router.push({
            name: 'noe/form-correction-noe-evaluation',
            params: {
              Id: this.field.Id,
              isCaretaker: this.isCaretaker
            }
          });
        }
      } else {
        return this.showNotifCustom('notifications-danger', 'Forbidden Action', 'Harus isi jawaban dari pengkoreksi');
      }
    }
  },
  mounted: function mounted() {
    this.getDeviation();
    if (this.$route.params.isFormEdit) {
      this.isEdit = this.$route.params.isFormEdit;
      var Id = this.$route.params.Id;
      if (Id) {
        this.getData(Id);
        this.getCorrectionData(Id);
        this.field.Id = Id;
        this.urlSubmit = '/AdminVue/noe-evaluation-update';
        this.textBtnSubmit = 'Simpan';
      }
    }
    if (this.$route.params.isShow) {
      this.isShow = this.$route.params.isShow;
      var Id = this.$route.params.Id;
      if (Id) {
        this.getData(Id);
        this.getCorrectionData(Id);
        this.field.Id = Id;
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/noe/noe-evaluation/form.vue?vue&type=template&id=537fcafe&":
/*!************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/src/components/backend/noe/noe-evaluation/form.vue?vue&type=template&id=537fcafe& ***!
  \************************************************************************************************************************************************************************************************************************************************************************/
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
  }, [_c("form", {
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
  }, [_vm._v(_vm._s(_vm.allErrors.NOENumber[0]))]) : _vm._e()], 1), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Tanggal / Waktu")]), _vm._v(" "), _c("b-input", {
    staticClass: "mb-1",
    attrs: {
      name: "Date",
      state: _vm.allErrors.Date ? false : null,
      readonly: ""
    },
    model: {
      value: _vm.field.Date,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "Date", $$v);
      },
      expression: "field.Date"
    }
  }), _vm._v(" "), _vm.allErrors.Date ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.Date[0]))]) : _vm._e()], 1)], 1), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
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
  }, [_vm._v("Lokasi Kejadian")]), _vm._v(" "), _c("b-input", {
    staticClass: "mb-1",
    attrs: {
      name: "IdLocation",
      state: _vm.allErrors.IdLocation ? false : null,
      readonly: ""
    },
    model: {
      value: _vm.field.IdLocation,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "IdLocation", $$v);
      },
      expression: "field.IdLocation"
    }
  }), _vm._v(" "), _vm.allErrors.IdLocation ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.IdLocation[0]))]) : _vm._e()], 1), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Jenis Kejadian")]), _vm._v(" "), _c("b-input", {
    staticClass: "mb-1",
    attrs: {
      name: "IdTypeIncident",
      state: _vm.allErrors.IdTypeIncident ? false : null,
      readonly: ""
    },
    model: {
      value: _vm.field.IdTypeIncident,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "IdTypeIncident", $$v);
      },
      expression: "field.IdTypeIncident"
    }
  }), _vm._v(" "), _vm.allErrors.IdTypeIncident ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.IdTypeIncident[0]))]) : _vm._e()], 1)], 1), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Uraian Kejadian")]), _vm._v(" "), _c("b-textarea", {
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
  }, [_vm._v(_vm._s(_vm.allErrors.Event[0]))]) : _vm._e()], 1)], 1), _vm._v(" "), _c("b-card", {
    staticClass: "mb-3",
    attrs: {
      header: "Lampiran Uraian Kejadian",
      "header-tag": "h5"
    }
  }, [_c("b-form-row", _vm._l(_vm.field.FileEventDownload, function (item, index) {
    return _c("b-form-group", {
      key: index,
      staticClass: "col-md-4"
    }, [_c("b-input-group", [_c("b-form-input", {
      attrs: {
        name: "FileEventDownload",
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
  }), 1)], 1), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Tindakan Koreksi yang Dilakukan")]), _vm._v(" "), _c("b-textarea", {
    staticClass: "mb-1",
    attrs: {
      name: "CorrectiveAction",
      state: _vm.allErrors.CorrectiveAction ? false : null,
      readonly: ""
    },
    model: {
      value: _vm.field.CorrectiveAction,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "CorrectiveAction", $$v);
      },
      expression: "field.CorrectiveAction"
    }
  }), _vm._v(" "), _vm.allErrors.CorrectiveAction ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.CorrectiveAction[0]))]) : _vm._e()], 1)], 1), _vm._v(" "), _c("b-card", {
    staticClass: "mb-3",
    attrs: {
      header: "Lampiran Tindakan Koreksi yang Dilakukan",
      "header-tag": "h5"
    }
  }, [_c("b-form-row", _vm._l(_vm.field.FileCorrectiveActionDownload, function (item, index) {
    return _c("b-form-group", {
      key: index,
      staticClass: "col-md-4"
    }, [_c("b-input-group", [_c("b-form-input", {
      attrs: {
        name: "FileCorrectiveActionDownload",
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
  }), 1)], 1), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Verifikasi Tindakan")]), _vm._v(" "), _c("b-input", {
    staticClass: "mb-1",
    attrs: {
      name: "Verified",
      state: _vm.allErrors.Verified ? false : null,
      readonly: ""
    },
    model: {
      value: _vm.field.Verified,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "Verified", $$v);
      },
      expression: "field.Verified"
    }
  }), _vm._v(" "), _vm.allErrors.Verified ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.Verified[0]))]) : _vm._e()], 1)], 1), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Tindakan Koreksi Lain")]), _vm._v(" "), _c("b-textarea", {
    staticClass: "mb-1",
    attrs: {
      name: "OtherCorrectAction",
      state: _vm.allErrors.OtherCorrectAction ? false : null,
      readonly: ""
    },
    model: {
      value: _vm.field.OtherCorrectAction,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "OtherCorrectAction", $$v);
      },
      expression: "field.OtherCorrectAction"
    }
  }), _vm._v(" "), _vm.allErrors.OtherCorrectAction ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.OtherCorrectAction[0]))]) : _vm._e()], 1), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Departemen Terkait")]), _vm._v(" "), _c("b-input", {
    staticClass: "mb-1",
    attrs: {
      name: "RelevantDept",
      state: _vm.allErrors.RelevantDept ? false : null,
      readonly: ""
    },
    model: {
      value: _vm.field.RelevantDept,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "RelevantDept", $$v);
      },
      expression: "field.RelevantDept"
    }
  }), _vm._v(" "), _vm.allErrors.RelevantDept ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.RelevantDept[0]))]) : _vm._e()], 1)], 1), _vm._v(" "), _c("b-card", {
    staticClass: "md-4"
  }, [_vm._l(_vm.field.IdDevRiskAssesment, function (item, index) {
    return _c("b-form-row", {
      key: "IdDevRiskAssesment" + index
    }, [_c("b-form-group", {
      staticClass: "col-md-5"
    }, [index == 0 ? _c("label", [_vm._v("Pertanyaan (SEVERITY)")]) : _vm._e(), _vm._v(" "), _c("b-input", {
      staticClass: "mb-1",
      attrs: {
        name: "Question",
        readonly: ""
      },
      model: {
        value: item.Question,
        callback: function callback($$v) {
          _vm.$set(item, "Question", $$v);
        },
        expression: "item.Question"
      }
    })], 1), _vm._v(" "), _c("b-form-group", {
      staticClass: "col-md-6"
    }, [index == 0 ? _c("label", [_vm._v("Penilaian Risiko Deviasi (SEVERITY)")]) : _vm._e(), _vm._v(" "), _c("b-input", {
      staticClass: "mb-1",
      attrs: {
        name: "RiskAssesment",
        readonly: ""
      },
      model: {
        value: item.RiskAssesment.RiskAssesment,
        callback: function callback($$v) {
          _vm.$set(item.RiskAssesment, "RiskAssesment", $$v);
        },
        expression: "item.RiskAssesment.RiskAssesment"
      }
    })], 1), _vm._v(" "), _c("b-form-group", {
      staticClass: "col-md-1"
    }, [index == 0 ? _c("label", [_vm._v("Nilai")]) : _vm._e(), _vm._v(" "), _c("b-input", {
      staticClass: "mb-1",
      attrs: {
        name: "Value",
        type: "number",
        min: "1",
        max: "100",
        readonly: ""
      },
      model: {
        value: item.Value,
        callback: function callback($$v) {
          _vm.$set(item, "Value", $$v);
        },
        expression: "item.Value"
      }
    })], 1)], 1);
  }), _vm._v(" "), _vm._l(_vm.field.IdDevRiskAssesment2, function (item, index) {
    return _c("b-form-row", {
      key: "IdDevRiskAssesment2" + index
    }, [_c("b-form-group", {
      staticClass: "col-md-5"
    }, [index == 0 ? _c("label", [_vm._v("Pertanyaan (PROBABILITY)")]) : _vm._e(), _vm._v(" "), _c("b-input", {
      staticClass: "mb-1",
      attrs: {
        name: "Question",
        readonly: ""
      },
      model: {
        value: item.Question,
        callback: function callback($$v) {
          _vm.$set(item, "Question", $$v);
        },
        expression: "item.Question"
      }
    })], 1), _vm._v(" "), _c("b-form-group", {
      staticClass: "col-md-6"
    }, [index == 0 ? _c("label", [_vm._v("Penilaian Risiko Deviasi (PROBABILITY)")]) : _vm._e(), _vm._v(" "), _c("b-input", {
      staticClass: "mb-1",
      attrs: {
        name: "RiskAssesment",
        readonly: ""
      },
      model: {
        value: item.RiskAssesment.RiskAssesment,
        callback: function callback($$v) {
          _vm.$set(item.RiskAssesment, "RiskAssesment", $$v);
        },
        expression: "item.RiskAssesment.RiskAssesment"
      }
    })], 1), _vm._v(" "), _c("b-form-group", {
      staticClass: "col-md-1"
    }, [index == 0 ? _c("label", [_vm._v("Nilai")]) : _vm._e(), _vm._v(" "), _c("b-input", {
      staticClass: "mb-1",
      attrs: {
        name: "Value",
        type: "number",
        min: "1",
        max: "100",
        readonly: ""
      },
      model: {
        value: item.Value,
        callback: function callback($$v) {
          _vm.$set(item, "Value", $$v);
        },
        expression: "item.Value"
      }
    })], 1)], 1);
  }), _vm._v(" "), _vm._l(_vm.field.IdDevRiskAssesment3, function (item, index) {
    return _c("b-form-row", {
      key: "IdDevRiskAssesment3" + index
    }, [_c("b-form-group", {
      staticClass: "col-md-5"
    }, [index == 0 ? _c("label", [_vm._v("Pertanyaan (DETECTABILITY)")]) : _vm._e(), _vm._v(" "), _c("b-input", {
      staticClass: "mb-1",
      attrs: {
        name: "Question",
        readonly: ""
      },
      model: {
        value: item.Question,
        callback: function callback($$v) {
          _vm.$set(item, "Question", $$v);
        },
        expression: "item.Question"
      }
    })], 1), _vm._v(" "), _c("b-form-group", {
      staticClass: "col-md-6"
    }, [index == 0 ? _c("label", [_vm._v("Penilaian Risiko Deviasi (DETECTABILITY)")]) : _vm._e(), _vm._v(" "), _c("b-input", {
      staticClass: "mb-1",
      attrs: {
        name: "RiskAssesment",
        readonly: ""
      },
      model: {
        value: item.RiskAssesment.RiskAssesment,
        callback: function callback($$v) {
          _vm.$set(item.RiskAssesment, "RiskAssesment", $$v);
        },
        expression: "item.RiskAssesment.RiskAssesment"
      }
    })], 1), _vm._v(" "), _c("b-form-group", {
      staticClass: "col-md-1"
    }, [index == 0 ? _c("label", [_vm._v("Nilai")]) : _vm._e(), _vm._v(" "), _c("b-input", {
      staticClass: "mb-1",
      attrs: {
        name: "Value",
        type: "number",
        min: "1",
        max: "100",
        readonly: ""
      },
      model: {
        value: item.Value,
        callback: function callback($$v) {
          _vm.$set(item, "Value", $$v);
        },
        expression: "item.Value"
      }
    })], 1)], 1);
  })], 2), _c("br"), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Level Deviasi")]), _vm._v(" "), _c("b-textarea", {
    staticClass: "mb-1",
    attrs: {
      name: "DeviationLevel",
      state: _vm.allErrors.DeviationLevel ? false : null,
      readonly: ""
    },
    model: {
      value: _vm.field.DeviationLevel,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "DeviationLevel", $$v);
      },
      expression: "field.DeviationLevel"
    }
  }), _vm._v(" "), _vm.allErrors.DeviationLevel ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.DeviationLevel[0]))]) : _vm._e()], 1), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Produk / Bets Lain yang Terdampak")]), _vm._v(" "), _c("b-input", {
    staticClass: "mb-1",
    attrs: {
      name: "OtherProductAffect",
      state: _vm.allErrors.OtherProductAffect ? false : null,
      readonly: ""
    },
    model: {
      value: _vm.field.OtherProductAffect,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "OtherProductAffect", $$v);
      },
      expression: "field.OtherProductAffect"
    }
  }), _vm._v(" "), _vm.allErrors.OtherProductAffect ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.OtherProductAffect[0]))]) : _vm._e()], 1)], 1), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-6"
  }), _vm._v(" "), _vm.DescOPA == true ? _c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Deskripsi")]), _vm._v(" "), _c("b-textarea", {
    staticClass: "mb-1",
    attrs: {
      name: "DescriptionOPA",
      state: _vm.allErrors.DescriptionOPA ? false : null,
      readonly: ""
    },
    model: {
      value: _vm.field.DescriptionOPA,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "DescriptionOPA", $$v);
      },
      expression: "field.DescriptionOPA"
    }
  }), _vm._v(" "), _vm.allErrors.DescriptionOPA ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.DescriptionOPA[0]))]) : _vm._e()], 1) : _vm._e()], 1), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-12"
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
  }, [_vm._v("×")]), _vm._v("\n          " + _vm._s(_vm.alertNotif) + "\n        ")]) : _vm._e()])], 1), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Kategori NOE")]), _vm._v(" "), _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Dipilih")]), _vm._v(" "), _c("multiselect", {
    attrs: {
      options: _vm.opsDeviation,
      "show-labels": false,
      multiple: false,
      placeholder: "Pilih Kategori NOE",
      label: "Deviation",
      "track-by": "Deviation",
      required: "",
      disabled: _vm.isShow
    },
    model: {
      value: _vm.field.IdDeviation,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "IdDeviation", $$v);
      },
      expression: "field.IdDeviation"
    }
  }), _vm._v(" "), _vm.allErrors.IdDeviation ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.IdDeviation[0]))]) : _vm._e()], 1), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-4 hide"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Kategori NOE")]), _vm._v(" "), _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Dipilih")]), _vm._v(" "), _c("multiselect", {
    attrs: {
      options: _vm.opsNOE,
      "allow-empty": false,
      placeholder: "Pilih Kategori NOE",
      label: "text",
      "track-by": "text",
      required: "",
      disabled: _vm.isShow
    },
    model: {
      value: _vm.field.NOEClassification,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "NOEClassification", $$v);
      },
      expression: "field.NOEClassification"
    }
  }), _vm._v(" "), _vm.allErrors.NOEClassification ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.NOEClassification[0]))]) : _vm._e()], 1), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Level Deviasi dari QA")]), _vm._v(" "), _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Dipilih")]), _vm._v(" "), _c("multiselect", {
    attrs: {
      options: _vm.opsDevLevelQA,
      "allow-empty": false,
      placeholder: "Pilih Level Deviasi",
      label: "text",
      "track-by": "text",
      required: "",
      disabled: _vm.isShow
    },
    model: {
      value: _vm.field.DeviationLevelQA,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "DeviationLevelQA", $$v);
      },
      expression: "field.DeviationLevelQA"
    }
  }), _vm._v(" "), _vm.allErrors.DeviationLevelQA ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.DeviationLevelQA[0]))]) : _vm._e()], 1)], 1), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-12"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Evaluasi Terhadap Kesesuaian Pelaporan")]), _vm._v(" "), _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]), _vm._v(" "), _c("b-textarea", {
    staticClass: "mb-1",
    attrs: {
      name: "DescriptionEvaluation",
      state: _vm.allErrors.DescriptionEvaluation ? false : null,
      rows: "3",
      required: "",
      readonly: _vm.isShow
    },
    model: {
      value: _vm.field.DescriptionEvaluation,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "DescriptionEvaluation", $$v);
      },
      expression: "field.DescriptionEvaluation"
    }
  }), _vm._v(" "), _vm.allErrors.DescriptionEvaluation ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.DescriptionEvaluation[0]))]) : _vm._e()], 1)], 1), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-12"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Remarks")]), _vm._v(" "), _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]), _vm._v(" "), _c("b-textarea", {
    staticClass: "mb-1",
    attrs: {
      name: "Remarks",
      state: _vm.allErrors.Remarks ? false : null,
      rows: "3",
      required: "",
      readonly: _vm.isShow
    },
    model: {
      value: _vm.field.Remarks,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "Remarks", $$v);
      },
      expression: "field.Remarks"
    }
  }), _vm._v(" "), _vm.allErrors.Remarks ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.Remarks[0]))]) : _vm._e()], 1)], 1), _vm._v(" "), _vm.isShow == true && _vm.isComment == true ? _c("b-card", {
    staticClass: "mb-3",
    attrs: {
      header: "Koreksi dari Approver",
      "header-tag": "h5"
    }
  }, [_c("b-form-row", _vm._l(_vm.getCorrector, function (item, index) {
    return _c("b-form-group", {
      key: index,
      staticClass: "col-md-12"
    }, [_c("b-input-group", [_c("b-form", {
      attrs: {
        inline: ""
      }
    }, [_c("label", {
      staticClass: "form-label mr-sm-1"
    }, [_vm._v("Comment Dari :")]), _vm._v(" "), _vm.isShow == false ? _c("label", {
      staticClass: "form-label float-right text-danger"
    }, [_vm._v("*Wajib Diisi")]) : _vm._e(), _vm._v(" "), _c("b-input", {
      staticClass: "mb-1",
      attrs: {
        name: "Dept",
        state: _vm.allErrors.Dept ? false : null,
        required: "",
        readonly: _vm.isShow
      },
      model: {
        value: item.CorrectorName,
        callback: function callback($$v) {
          _vm.$set(item, "CorrectorName", $$v);
        },
        expression: "item.CorrectorName"
      }
    }), _vm._v(" "), _vm.allErrors.Dept ? _c("span", {
      staticClass: "text-danger"
    }, [_vm._v(_vm._s(_vm.allErrors.Dept[0]))]) : _vm._e()], 1)], 1), _vm._v(" "), _c("b-input-group", [_c("b-textarea", {
      staticClass: "mb-1",
      staticStyle: {
        "margin-left": "95px"
      },
      attrs: {
        name: "Lampiran",
        state: _vm.allErrors.Lampiran ? false : null,
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
    }), _vm._v(" "), _vm.allErrors.Lampiran ? _c("span", {
      staticClass: "text-danger"
    }, [_vm._v(_vm._s(_vm.allErrors.Lampiran[0]))]) : _vm._e()], 1), _vm._v(" "), _c("b-input-group", [_c("b-form", {
      attrs: {
        inline: ""
      }
    }, [_c("label", {
      staticClass: "form-label mr-sm-1"
    }, [_vm._v("Jawaban :")]), _vm._v(" "), _vm.isShow == false ? _c("label", {
      staticClass: "form-label float-right text-danger"
    }, [_vm._v("*Wajib Diisi")]) : _vm._e(), _vm._v(" "), _vm.isAnswered == false && _vm.isTypeUser == false && _vm.isChildToAnswer == true ? _c("b-textarea", {
      staticClass: "mb-1",
      staticStyle: {
        "margin-left": "30px"
      },
      attrs: {
        name: "Answer",
        state: _vm.allErrors.Answer ? false : null,
        required: ""
      },
      model: {
        value: _vm.field.Answer,
        callback: function callback($$v) {
          _vm.$set(_vm.field, "Answer", $$v);
        },
        expression: "field.Answer"
      }
    }) : _vm.isTypeUser == true && _vm.isChildToAnswer == false ? _c("b-textarea", {
      staticClass: "mb-1",
      staticStyle: {
        "margin-left": "30px"
      },
      attrs: {
        name: "Answer",
        state: _vm.allErrors.Answer ? false : null,
        required: "",
        readonly: _vm.isShow
      },
      model: {
        value: _vm.field.Answer,
        callback: function callback($$v) {
          _vm.$set(_vm.field, "Answer", $$v);
        },
        expression: "field.Answer"
      }
    }) : _c("b-textarea", {
      staticClass: "mb-1",
      staticStyle: {
        "margin-left": "30px"
      },
      attrs: {
        name: "Answer",
        state: _vm.allErrors.Answer ? false : null,
        required: "",
        readonly: _vm.isShow
      },
      model: {
        value: _vm.field.Answer,
        callback: function callback($$v) {
          _vm.$set(_vm.field, "Answer", $$v);
        },
        expression: "field.Answer"
      }
    }), _vm._v(" "), _vm.allErrors.Answer ? _c("span", {
      staticClass: "text-danger"
    }, [_vm._v(_vm._s(_vm.allErrors.Answer[0]))]) : _vm._e()], 1)], 1)], 1);
  }), 1), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-6"
  }), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-6",
    attrs: {
      label: ""
    }
  }, [_vm.isAnswered == false && _vm.isTypeUser == false && _vm.isChildToAnswer == true ? _c("b-btn", {
    staticClass: "float-right ml-2",
    attrs: {
      variant: "success"
    },
    on: {
      click: function click($event) {
        return _vm.onAction("sendAnswer");
      }
    }
  }, [_vm._v("Kirim")]) : _vm._e()], 1)], 1)], 1) : _vm._e(), _vm._v(" "), _vm.isShow == true && _vm.checkAnswer == true ? _c("b-card", {
    staticClass: "mb-3",
    attrs: {
      header: "Histori Koreksi dari Approver",
      "header-tag": "h5"
    }
  }, [_vm._l(_vm.HistoryCorrection, function (item, index) {
    return _c("b-form-group", {
      key: index,
      staticClass: "col-md-12"
    }, [_c("b-input-group", [_c("b-form", {
      attrs: {
        inline: ""
      }
    }, [_c("label", {
      staticClass: "form-label mr-sm-1"
    }, [_vm._v("Comment Dari :")]), _vm._v(" "), _vm.isShow == false ? _c("label", {
      staticClass: "form-label float-right text-danger"
    }, [_vm._v("*Wajib Diisi")]) : _vm._e(), _vm._v(" "), _c("b-input", {
      staticClass: "mb-1",
      attrs: {
        name: "Dept",
        required: "",
        readonly: _vm.isShow
      },
      model: {
        value: item.Name,
        callback: function callback($$v) {
          _vm.$set(item, "Name", $$v);
        },
        expression: "item.Name"
      }
    })], 1)], 1), _vm._v(" "), _c("b-input-group", [_c("b-textarea", {
      staticClass: "mb-1",
      staticStyle: {
        "margin-left": "95px"
      },
      attrs: {
        name: "Lampiran",
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
    })], 1), _vm._v(" "), _c("b-input-group", [_c("b-form", {
      attrs: {
        inline: ""
      }
    }, [_c("label", {
      staticClass: "form-label mr-sm-1"
    }, [_vm._v("Jawaban :")]), _vm._v(" "), _vm.isShow == false ? _c("label", {
      staticClass: "form-label float-right text-danger"
    }, [_vm._v("*Wajib Diisi")]) : _vm._e(), _vm._v(" "), _c("b-textarea", {
      staticClass: "mb-1",
      staticStyle: {
        "margin-left": "30px"
      },
      attrs: {
        name: "Answer",
        required: "",
        readonly: _vm.isShow
      },
      model: {
        value: item.Answer,
        callback: function callback($$v) {
          _vm.$set(item, "Answer", $$v);
        },
        expression: "item.Answer"
      }
    })], 1)], 1)], 1);
  }), _vm._v(" "), _vm.showMoreButton ? _c("b-button", {
    attrs: {
      variant: "outline-primary"
    },
    on: {
      click: _vm.toggleShowMore
    }
  }, [_vm._v(" " + _vm._s(_vm.showMore ? "Show Less" : "Show More"))]) : _vm._e()], 2) : _vm._e(), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-6"
  }), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-6",
    attrs: {
      label: ""
    }
  }, [_vm.isShow == true && _vm.Position == 2 && _vm.field.IsPublish == 2 && _vm.valStatus == 6 ? _c("b-btn", {
    staticClass: "float-right ml-2",
    attrs: {
      type: "button",
      variant: "primary"
    },
    on: {
      click: function click($event) {
        return _vm.onAction("publish-evaluation");
      }
    }
  }, [_vm._v("Publish Evaluasi")]) : _vm._e(), _vm._v(" "), _vm.isShow == true && _vm.Position == 2 && _vm.field.IsPublish == 2 && _vm.isCaretaker == false && _vm.valStatus >= 7 ? _c("b-btn", {
    staticClass: "float-right ml-2",
    attrs: {
      variant: "success"
    }
  }, [_vm._v("Diajukan")]) : _vm._e(), _vm._v(" "), _vm.isShow == true && (_vm.Position == 3 && _vm.valStatus == 7 || (_vm.Position == 4 || _vm.isCaretaker == true) && _vm.valStatus == 7) ? _c("b-btn", {
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
  }, [_vm._v("Setujui")]) : _vm._e(), _vm._v(" "), _vm.isShow == true && (_vm.Position == 4 || _vm.isCaretaker == true) && _vm.valStatus == 7 ? _c("b-btn", {
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
  }, [_vm._v("Tolak")]) : _vm._e(), _vm._v(" "), _vm.isShow == true && (_vm.Position == 3 && _vm.valStatus == 8 || (_vm.Position == 4 || _vm.isCaretaker == true) && _vm.valStatus == 9) ? _c("b-btn", {
    staticClass: "float-right ml-2",
    attrs: {
      variant: "success"
    }
  }, [_vm._v("Disetujui")]) : _vm._e(), _vm._v(" "), _vm.isShow == true && (_vm.Position == 4 || _vm.isCaretaker == true) && _vm.valStatus == 10 ? _c("b-btn", {
    staticClass: "float-right ml-2",
    attrs: {
      variant: "warning"
    }
  }, [_vm._v("Ditolak")]) : _vm._e(), _vm._v(" "), _vm.isShow == true && (_vm.Position == 2 && _vm.valStatus == 6 || _vm.Position == 3 && _vm.valStatus == 7 || (_vm.Position == 4 || _vm.isCaretaker == true) && _vm.valStatus == 7) ? _c("b-btn", {
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

/***/ "./resources/assets/src/components/backend/noe/noe-evaluation/form.vue":
/*!*****************************************************************************!*\
  !*** ./resources/assets/src/components/backend/noe/noe-evaluation/form.vue ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _form_vue_vue_type_template_id_537fcafe___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form.vue?vue&type=template&id=537fcafe& */ "./resources/assets/src/components/backend/noe/noe-evaluation/form.vue?vue&type=template&id=537fcafe&");
/* harmony import */ var _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form.vue?vue&type=script&lang=js& */ "./resources/assets/src/components/backend/noe/noe-evaluation/form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _form_vue_vue_type_template_id_537fcafe___WEBPACK_IMPORTED_MODULE_0__["render"],
  _form_vue_vue_type_template_id_537fcafe___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/src/components/backend/noe/noe-evaluation/form.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/src/components/backend/noe/noe-evaluation/form.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/noe/noe-evaluation/form.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./form.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/noe/noe-evaluation/form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/src/components/backend/noe/noe-evaluation/form.vue?vue&type=template&id=537fcafe&":
/*!************************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/noe/noe-evaluation/form.vue?vue&type=template&id=537fcafe& ***!
  \************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_537fcafe___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./form.vue?vue&type=template&id=537fcafe& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/noe/noe-evaluation/form.vue?vue&type=template&id=537fcafe&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_537fcafe___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_537fcafe___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
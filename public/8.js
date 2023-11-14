(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/noe/noe-verification/form.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/src/components/backend/noe/noe-verification/form.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue_text_mask__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-text-mask */ "./node_modules/vue-text-mask/dist/vueTextMask.js");
/* harmony import */ var vue_text_mask__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue_text_mask__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mathieustan_vue_datepicker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mathieustan/vue-datepicker */ "./node_modules/@mathieustan/vue-datepicker/dist/vue-datepicker.esm.js");
/* harmony import */ var _mathieustan_vue_datepicker_dist_vue_datepicker_min_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mathieustan/vue-datepicker/dist/vue-datepicker.min.css */ "./node_modules/@mathieustan/vue-datepicker/dist/vue-datepicker.min.css");
/* harmony import */ var _mathieustan_vue_datepicker_dist_vue_datepicker_min_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mathieustan_vue_datepicker_dist_vue_datepicker_min_css__WEBPACK_IMPORTED_MODULE_3__);




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'form-noe-verification',
  metaInfo: {
    title: 'Form NOE Verification And Assesment'
  },
  components: {
    MaskedInput: vue_text_mask__WEBPACK_IMPORTED_MODULE_1___default.a,
    VueDatePicker: _mathieustan_vue_datepicker__WEBPACK_IMPORTED_MODULE_2__["VueDatePicker"]
  },
  data: function data() {
    return {
      urlSubmit: '/AdminVue/noe-verification-insert',
      headerCard: 'Verifikasi & Penilaian NOE',
      textBtnSubmit: 'Simpan',
      field: {
        EventFile: [],
        CorrectiveActionFile: [],
        IdDevRiskAssesment: [{
          RiskAssesment: '',
          Question: '',
          Value: ''
        }],
        IdDevRiskAssesment2: [{
          RiskAssesment: '',
          Question: '',
          Value: ''
        }],
        IdDevRiskAssesment3: [{
          RiskAssesment: '',
          Question: '',
          Value: ''
        }],
        DeviationLevel: '',
        OtherCorrectAction: '',
        DescriptionOPA: '',
        FileEventDownload: [],
        FileCorrectiveActionDownload: [],
        Date: moment__WEBPACK_IMPORTED_MODULE_0___default()(new Date()).format('YYYY-MM-DD'),
        Dept: '',
        Lampiran: ''
      },
      allErrors: [],
      isNotif: false,
      alertNotif: '',
      alertVariant: 'alert-dark-danger',
      OldEventFile: [],
      OldCorrectiveActionFile: [],
      opsVerified: [{
        'value': 'Tindakan koreksi telah dilaksanakan dengan baik',
        'text': 'Tindakan koreksi telah dilaksanakan dengan baik'
      }, {
        'value': 'Perlu tindakan koreksi lain',
        'text': 'Perlu tindakan koreksi lain'
      }],
      opsRelevantDept: [],
      valDept: false,
      opsRiskAssesment: [],
      opsRiskAssesment2: [],
      opsRiskAssesment3: [],
      opsOPA: [{
        'value': 'Ada',
        'text': 'Ada'
      }, {
        'value': 'Tidak Ada',
        'text': 'Tidak Ada'
      }],
      DescOPA: false,
      resultValue: 0,
      IdDeviationLevel: 0,
      Position: 0,
      //1 = unit head; 2 = sect head; 3 = dept head;
      valStatus: 0,
      isShow: false,
      isComment: false,
      BaseUrl: "/",
      isCaretaker: false,
      deptStatus: false,
      opsPublish: [],
      isNOEAcc: false,
      dateFormat: 'DD.MM.YYYY',
      locale: {
        lang: 'en'
      },
      isInputCorrection: false,
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
      var isEmpty = false;
      if (this.field.IdDevRiskAssesment) {
        this.field.IdDevRiskAssesment.forEach(function (data, index) {
          if (data.RiskAssesment == '') {
            isEmpty = true;
            return false;
          }
        });
      }
      if (this.field.IdDevRiskAssesment2) {
        this.field.IdDevRiskAssesment2.forEach(function (data, index) {
          if (data.RiskAssesment == '') {
            isEmpty = true;
            return false;
          }
        });
      }
      if (this.field.IdDevRiskAssesment3) {
        this.field.IdDevRiskAssesment3.forEach(function (data, index) {
          if (data.RiskAssesment == '') {
            isEmpty = true;
            return false;
          }
        });
      }
      if (isEmpty) this.$swal({
        icon: 'error',
        text: 'Silahkan lengkapi kolom *Wajib Dipilih!'
      });else if (!this.field.Verified || this.field.Verified.value == null || !this.field.OtherProductAffect || this.field.OtherProductAffect && this.field.OtherProductAffect.value == null) this.$swal({
        icon: 'error',
        text: 'Silahkan lengkapi kolom *Wajib Dipilih!'
      });else if (this.field.Verified.value == 'Perlu tindakan koreksi lain' && (!this.field.RelevantDept || !this.field.RelevantDept.length)) this.$swal({
        icon: 'error',
        text: 'Silahkan lengkapi kolom *Wajib Dipilih!'
      });else {
        var formData = new FormData();
        formData.append("Id", this.field.Id);
        if (this.field.Verified) formData.append("Verified", this.field.Verified.value);
        if (this.field.OtherCorrectAction) formData.append("OtherCorrectAction", this.field.OtherCorrectAction);
        if (this.field.RelevantDept) formData.append("RelevantDept", JSON.stringify(this.field.RelevantDept));
        formData.append("IdDevRiskAssesment", JSON.stringify(this.field.IdDevRiskAssesment));
        formData.append("IdDevRiskAssesment2", JSON.stringify(this.field.IdDevRiskAssesment2));
        formData.append("IdDevRiskAssesment3", JSON.stringify(this.field.IdDevRiskAssesment3));
        formData.append("DeviationLevel", this.field.DeviationLevel);
        if (this.IdDeviationLevel) formData.append("IdDeviationLevel", this.IdDeviationLevel);
        if (this.field.OtherProductAffect) formData.append("OtherProductAffect", this.field.OtherProductAffect.value);
        formData.append("DescriptionOPA", this.field.DescriptionOPA);
        if (this.field.IdPublish) formData.append("IdPublish", this.field.IdPublish.Id);
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
      }
    },
    onChangeVerified: function onChangeVerified(option) {
      if (option.value == "Perlu tindakan koreksi lain" || option == "Perlu tindakan koreksi lain") {
        this.valDept = true;
        this.isInputCorrection = false;
      } else if (option.value == "Tindakan koreksi telah dilaksanakan dengan baik") {
        this.isInputCorrection = true;
      } else {
        // sebelumnya keluar jika 'Verified' == 'Perlu tindakan koreksi lain'
        this.valDept = false;
        // this.field.OtherCorrectAction = ''
      }

      console.log(this.isInputCorrection);
    },
    onChangeOPA: function onChangeOPA(option) {
      if (option.value == "Ada" || option == "Ada") {
        this.DescOPA = true;
      } else {
        this.DescOPA = false;
        this.field.DescriptionOPA = '';
      }
    },
    onSelectDevRisk: function onSelectDevRisk(value, index) {
      var isExist = false;
      if (this.field.IdDevRiskAssesment.length && this.field.IdDevRiskAssesment.length > 1) {
        this.field.IdDevRiskAssesment.forEach(function (data, index) {
          if (data.RiskAssesment.RiskAssesment == value.RiskAssesment) {
            isExist = true;
          }
        });
      }
      if (isExist) {
        this.$swal({
          icon: 'error',
          text: 'Penilaian Risiko Deviasi tidak boleh sama!'
        }).then(function () {
          setTimeout(function () {
            document.getElementById("btambah-risk").focus();
          }, 500);
        });
        this.removeDetail(index);
        this.addDetail();
      } else {
        this.field.IdDevRiskAssesment[index].Question = value.Question;
        this.field.IdDevRiskAssesment[index].Value = value.Value;
        this.field.IdDevRiskAssesment[index].AssesmentGroup = value.AssesmentGroup;
        this.countValue();
      }
    },
    onSelectDevRisk2: function onSelectDevRisk2(value, index) {
      this.field.IdDevRiskAssesment2[index].Question = value.Question;
      this.field.IdDevRiskAssesment2[index].Value = value.Value;
      this.countValue();
    },
    onSelectDevRisk3: function onSelectDevRisk3(value, index) {
      this.field.IdDevRiskAssesment3[index].Question = value.Question;
      this.field.IdDevRiskAssesment3[index].Value = value.Value;
      this.countValue();
    },
    countValue: function countValue() {
      var _this = this;
      this.resultValue = 0;
      this.field.IdDevRiskAssesment.forEach(function (data, index) {
        if (data.RiskAssesment != '') {
          if (_this.resultValue == 0) _this.resultValue += parseInt(data.Value);else _this.resultValue *= parseInt(data.Value);
        }
      });
      this.field.IdDevRiskAssesment2.forEach(function (data, index) {
        if (data.RiskAssesment != '') {
          if (_this.resultValue == 0) _this.resultValue += parseInt(data.Value);else _this.resultValue *= parseInt(data.Value);
        }
      });
      this.field.IdDevRiskAssesment3.forEach(function (data, index) {
        if (data.RiskAssesment != '') {
          if (_this.resultValue == 0) _this.resultValue += parseInt(data.Value);else _this.resultValue *= parseInt(data.Value);
        }
      });
      this.getDeviationLevel(this.resultValue);
    },
    getData: function getData(Id) {
      axios.post('/AdminVue/noe-verification-edit', {
        Id: Id
      }).then(function (res) {
        var resp = res.data;
        this.Position = res.data.position;
        this.field = resp.data;
        if (resp.data.NOENumberAcc == null) {
          this.field.NOENumber = resp.data.NOENumber;
        } else {
          this.field.NOENumber = resp.data.NOENumberAcc;
          this.isNOEAcc = true;
        }
        this.IdDeviationLevel = resp.data.IdDeviationLevel;
        this.onChangeVerified(this.field.Verified);
        this.onChangeOPA(this.field.OtherProductAffect);
        if (resp.data.IdDevRiskAssesment == null || resp.data.IdDevRiskAssesment == '') this.field.IdDevRiskAssesment = [{
          RiskAssesment: '',
          Question: '',
          Value: ''
        }];
        if (resp.data.IdDevRiskAssesment2 == null || resp.data.IdDevRiskAssesment2 == '') this.field.IdDevRiskAssesment2 = [{
          RiskAssesment: '',
          Question: '',
          Value: ''
        }];
        if (resp.data.IdDevRiskAssesment3 == null || resp.data.IdDevRiskAssesment3 == '') this.field.IdDevRiskAssesment3 = [{
          RiskAssesment: '',
          Question: '',
          Value: ''
        }];
        if (resp.data.IdDeviationLevel) this.countValue();
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
        if (this.opsRiskAssesment.length > 0) {
          this.field.IdDevRiskAssesment[0].Question = this.opsRiskAssesment[0].Question;
        } else {
          this.field.IdDevRiskAssesment[0].Question = ''; // Set a default value or handle the situation differently
        }

        if (this.opsRiskAssesment2.length > 0) {
          this.field.IdDevRiskAssesment2[0].Question = this.opsRiskAssesment2[0].Question;
        } else {
          this.field.IdDevRiskAssesment2[0].Question = ''; // Set a default value or handle the situation differently
        }

        if (this.opsRiskAssesment3.length > 0) {
          this.field.IdDevRiskAssesment3[0].Question = this.opsRiskAssesment3[0].Question;
        } else {
          this.field.IdDevRiskAssesment3[0].Question = ''; // Set a default value or handle the situation differently
        }

        this.isCorrection = resp.isCorrection;

        // this.field.IdDevRiskAssesment[0].Question = this.opsRiskAssesment[0].Question
        // this.field.IdDevRiskAssesment2[0].Question = this.opsRiskAssesment2[0].Question
        // this.field.IdDevRiskAssesment3[0].Question = this.opsRiskAssesment3[0].Question
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
    getRelevantDept: function getRelevantDept() {
      axios.post('/AdminVue/noe-verification-get-relevant-dept').then(function (res) {
        this.opsRelevantDept = res.data.data;
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.opsRelevantDept = [];
      }.bind(this));
    },
    getDeviationRisk: function getDeviationRisk() {
      axios.post('/AdminVue/noe-verification-get-deviation-risk').then(function (res) {
        this.opsRiskAssesment = res.data.data;
        this.field.IdDevRiskAssesment[0].Question = res.data.data[0].Question;
        this.opsRiskAssesment2 = res.data.data2;
        this.field.IdDevRiskAssesment2[0].Question = res.data.data2[0].Question;
        this.opsRiskAssesment3 = res.data.data3;
        this.field.IdDevRiskAssesment3[0].Question = res.data.data3[0].Question;
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.opsRiskAssesment = [];
        this.opsRiskAssesment2 = [];
        this.opsRiskAssesment3 = [];
      }.bind(this));
    },
    getDeviationLevel: function getDeviationLevel(value) {
      axios.post('/AdminVue/noe-verification-get-deviation-level', {
        value: value
      }).then(function (res) {
        this.field.DeviationLevel = res.data.data;
        this.IdDeviationLevel = res.data.iddeviation;
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.field.DeviationLevel = '';
        this.IdDeviationLevel = '';
      }.bind(this));
    },
    getPublish: function getPublish() {
      axios.post('/AdminVue/noe-report-get-publish').then(function (res) {
        var resp = res.data;
        this.opsPublish = resp.data;
        if (resp.status == true) {
          this.deptStatus = true;
        } else {
          this.deptStatus;
        }
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.opsPublish = [];
      }.bind(this));
    },
    addDetail: function addDetail() {
      this.field.IdDevRiskAssesment.push({
        'RiskAssesment': '',
        'Question': '',
        'Value': '',
        'AssesmentGroup': ''
      });
    },
    removeDetail: function removeDetail(index) {
      this.field.IdDevRiskAssesment.splice(index, 1);
      this.countValue();
    },
    backIndex: function backIndex() {
      this.$router.push('/RoleAdmin/noe/data-noe-verification');
    },
    onAction: function onAction(action) {
      if (action == 'sendAnswer') {
        return this.sendAnswer('/AdminVue/noe-report-answer', this.field.NOENumber, this.field.Answer, this.$parent, true, this.valStatus);
      }
      if (this.isCorrection == false) {
        if (action == 'publish-verify') {
          this.publishVerify('/AdminVue/noe-verification-publish-verify', this.field.Id, this.$parent, true);
        }
        if (action == 'approve') {
          this.approve('/AdminVue/noe-verification-approve', this.field.Id, this.$parent, null, true, this.isCaretaker);
        }
        if (action == 'reject') {
          this.reject('/AdminVue/noe-verification-reject', this.field.Id, this.$parent, true, this.isCaretaker);
        }
        if (action == 'correction') {
          this.$router.push({
            name: 'noe/form-correction-noe-verification',
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
    this.getRelevantDept();
    this.getDeviationRisk();
    this.getPublish();
    if (this.$route.params.isFormEdit) {
      var Id = this.$route.params.Id;
      if (Id) {
        this.getData(Id);
        this.field.Id = Id;
        this.urlSubmit = '/AdminVue/noe-verification-update';
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

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/noe/noe-verification/form.vue?vue&type=template&id=4e181182&":
/*!**************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/src/components/backend/noe/noe-verification/form.vue?vue&type=template&id=4e181182& ***!
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
  }, [_vm.isNOEAcc == true ? _c("label", {
    staticClass: "form-label"
  }, [_vm._v("No. NOE")]) : _vm._e(), _vm._v(" "), _vm.isNOEAcc == false ? _c("label", {
    staticClass: "form-label"
  }, [_vm._v("No. DRAFT NOE")]) : _vm._e(), _vm._v(" "), _c("b-input", {
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
  }, [_vm._v("Tanggal / Waktu")]), _vm._v(" "), _c("b-input-group", [_c("VueDatePicker", {
    staticClass: "mb-1",
    attrs: {
      required: "",
      disabled: _vm.isShow,
      format: _vm.dateFormat,
      locale: _vm.locale
    },
    model: {
      value: _vm.field.Date,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "Date", $$v);
      },
      expression: "field.Date"
    }
  }), _vm._v(" "), _c("b-input-group-append", [_c("masked-input", {
    staticClass: "form-control",
    attrs: {
      type: "text",
      placeholder: "Contoh 4 digit : 09:00",
      guide: false,
      mask: [/\d/, /\d/, ".", /\d/, /\d/],
      disabled: _vm.isShow
    },
    model: {
      value: _vm.field.Time,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "Time", $$v);
      },
      expression: "field.Time"
    }
  })], 1)], 1), _vm._v(" "), _vm.allErrors.Time ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.Time[0]))]) : _vm._e()], 1)], 1), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
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
  }, [_vm._v("Verifikasi Tindakan")]), _vm._v(" "), _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Dipilih")]), _vm._v(" "), _c("multiselect", {
    attrs: {
      options: _vm.opsVerified,
      "allow-empty": false,
      placeholder: "Pilih Verifikasi Tindakan",
      label: "text",
      "track-by": "text",
      required: "",
      disabled: _vm.isShow
    },
    on: {
      input: _vm.onChangeVerified
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
  }, [_vm._v("Tindakan Koreksi Lain")]), _vm._v(" "), _vm.valDept ? _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]) : _vm._e(), _vm._v(" "), _vm.isInputCorrection == false ? _c("b-textarea", {
    staticClass: "mb-1",
    attrs: {
      name: "OtherCorrectAction",
      state: _vm.allErrors.OtherCorrectAction ? false : null,
      required: _vm.valDept,
      readonly: _vm.isShow
    },
    model: {
      value: _vm.field.OtherCorrectAction,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "OtherCorrectAction", $$v);
      },
      expression: "field.OtherCorrectAction"
    }
  }) : _vm._e(), _vm._v(" "), _vm.isInputCorrection == true ? _c("b-textarea", {
    staticClass: "mb-1",
    attrs: {
      name: "OtherCorrectAction",
      state: _vm.allErrors.OtherCorrectAction ? false : null,
      required: _vm.valDept,
      readonly: _vm.isShow,
      disabled: ""
    },
    model: {
      value: _vm.field.OtherCorrectAction,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "OtherCorrectAction", $$v);
      },
      expression: "field.OtherCorrectAction"
    }
  }) : _vm._e(), _vm._v(" "), _vm.allErrors.OtherCorrectAction ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.OtherCorrectAction[0]))]) : _vm._e()], 1), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Departemen Terkait")]), _vm._v(" "), _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Dipilih")]), _vm._v(" "), _c("multiselect", {
    attrs: {
      options: _vm.opsRelevantDept,
      "show-labels": false,
      multiple: true,
      placeholder: "Pilih Departemen Terkait",
      label: "RelevantDept",
      "track-by": "RelevantDept",
      disabled: _vm.isShow,
      required: ""
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
      staticClass: "col-lg-5"
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
      staticClass: "col-lg-6"
    }, [index == 0 ? [_c("label", [_vm._v("Penilaian Risiko Deviasi (SEVERITY)")]), _vm._v(" "), _c("label", {
      staticClass: "form-label float-right text-danger"
    }, [_vm._v("*Wajib Dipilih")])] : _vm._e(), _vm._v(" "), _c("multiselect", {
      attrs: {
        options: _vm.opsRiskAssesment,
        "allow-empty": false,
        placeholder: "Pilih Penilaian Risiko Deviasi",
        selectLabel: "",
        deselectLabel: "",
        label: "RiskAssesment",
        "track-by": "RiskAssesment",
        disabled: _vm.isShow
      },
      on: {
        input: function input($event) {
          return _vm.onSelectDevRisk($event, index);
        }
      },
      model: {
        value: item.RiskAssesment,
        callback: function callback($$v) {
          _vm.$set(item, "RiskAssesment", $$v);
        },
        expression: "item.RiskAssesment"
      }
    })], 2), _vm._v(" "), _c("b-form-group", {
      staticClass: "col-lg-1"
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
      staticClass: "col-lg-5"
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
      staticClass: "col-lg-6"
    }, [index == 0 ? [_c("label", [_vm._v("Penilaian Risiko Deviasi (PROBABILITY)")]), _vm._v(" "), _c("label", {
      staticClass: "form-label float-right text-danger"
    }, [_vm._v("*Wajib Dipilih")])] : _vm._e(), _vm._v(" "), _c("multiselect", {
      attrs: {
        options: _vm.opsRiskAssesment2,
        "allow-empty": false,
        placeholder: "Pilih Penilaian Risiko Deviasi",
        selectLabel: "",
        deselectLabel: "",
        label: "RiskAssesment",
        "track-by": "RiskAssesment",
        disabled: _vm.isShow
      },
      on: {
        input: function input($event) {
          return _vm.onSelectDevRisk2($event, index);
        }
      },
      model: {
        value: item.RiskAssesment,
        callback: function callback($$v) {
          _vm.$set(item, "RiskAssesment", $$v);
        },
        expression: "item.RiskAssesment"
      }
    })], 2), _vm._v(" "), _c("b-form-group", {
      staticClass: "col-lg-1"
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
      staticClass: "col-lg-5"
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
      staticClass: "col-lg-6"
    }, [index == 0 ? [_c("label", [_vm._v("Penilaian Risiko Deviasi (DETECTABILITY)")]), _vm._v(" "), _c("label", {
      staticClass: "form-label float-right text-danger"
    }, [_vm._v("*Wajib Dipilih")])] : _vm._e(), _vm._v(" "), _c("multiselect", {
      attrs: {
        options: _vm.opsRiskAssesment3,
        "allow-empty": false,
        placeholder: "Pilih Penilaian Risiko Deviasi",
        selectLabel: "",
        deselectLabel: "",
        label: "RiskAssesment",
        "track-by": "RiskAssesment",
        disabled: _vm.isShow
      },
      on: {
        input: function input($event) {
          return _vm.onSelectDevRisk3($event, index);
        }
      },
      model: {
        value: item.RiskAssesment,
        callback: function callback($$v) {
          _vm.$set(item, "RiskAssesment", $$v);
        },
        expression: "item.RiskAssesment"
      }
    })], 2), _vm._v(" "), _c("b-form-group", {
      staticClass: "col-lg-1"
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
      readonly: "",
      required: ""
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
  }, [_vm._v("Produk / Bets Lain yang Terdampak")]), _vm._v(" "), _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Dipilih")]), _vm._v(" "), _c("multiselect", {
    attrs: {
      options: _vm.opsOPA,
      "allow-empty": false,
      placeholder: "Pilih Produk / Bets Lain yang Terdampak",
      label: "text",
      "track-by": "text",
      required: "",
      disabled: _vm.isShow
    },
    on: {
      input: _vm.onChangeOPA
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
  }, [_vm._v(_vm._s(_vm.allErrors.OtherProductAffect[0]))]) : _vm._e()], 1)], 1), _vm._v(" "), _c("b-form-row", [_vm.DescOPA ? _c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Bets Terdampak")]), _vm._v(" "), _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]), _vm._v(" "), _c("b-textarea", {
    staticClass: "mb-1",
    attrs: {
      name: "DescriptionOPA",
      state: _vm.allErrors.DescriptionOPA ? false : null,
      required: _vm.DescOPA,
      readonly: _vm.isShow
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
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Publish Ke :")]), _vm._v(" "), _vm.isShow == false ? _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Dipilih")]) : _vm._e(), _vm._v(" "), _vm.deptStatus == true ? _c("multiselect", {
    attrs: {
      options: _vm.opsPublish,
      "allow-empty": false,
      "show-labels": false,
      placeholder: "Pilih Publish Ke Siapa",
      label: "Name",
      "track-by": "Name",
      required: "",
      disabled: _vm.isShow
    },
    model: {
      value: _vm.field.IdPublish,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "IdPublish", $$v);
      },
      expression: "field.IdPublish"
    }
  }) : _vm._e(), _vm._v(" "), _vm.deptStatus == false ? _c("multiselect", {
    attrs: {
      options: _vm.opsPublish,
      "allow-empty": false,
      "show-labels": false,
      placeholder: "Atasan Masih belum diisi silahkan tanya ke QA",
      required: "",
      disabled: ""
    },
    model: {
      value: _vm.field.IdPublish,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "IdPublish", $$v);
      },
      expression: "field.IdPublish"
    }
  }) : _vm._e(), _vm._v(" "), _vm.allErrors.IdPublish ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.IdPublish[0]))]) : _vm._e()], 1)], 1), _vm._v(" "), _vm.isShow == true && _vm.isComment == true ? _c("b-card", {
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
  }, [_vm._v("Kirim")]) : _vm._e()], 1)], 1)], 1) : _vm._e(), _vm._v(" "), _vm.checkAnswer == true ? _c("b-card", {
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
  }, [_vm.isShow == true && _vm.field.IsPublish == 1 && (_vm.Position == 1 && _vm.valStatus == 2 || _vm.Position == 2 && _vm.valStatus == 3) ? _c("b-btn", {
    staticClass: "float-right ml-2",
    attrs: {
      type: "button",
      variant: "primary"
    },
    on: {
      click: function click($event) {
        return _vm.onAction("publish-verify");
      }
    }
  }, [_vm._v("Publish Verifikasi")]) : _vm._e(), _vm._v(" "), _vm.isShow == true && _vm.field.IsPublish == 1 && _vm.isCaretaker == false && (_vm.Position == 1 && _vm.valStatus >= 4 || _vm.Position == 2 && _vm.valStatus >= 5) ? _c("b-btn", {
    staticClass: "float-right ml-2",
    attrs: {
      variant: "success"
    }
  }, [_vm._v("Diajukan")]) : _vm._e(), _vm._v(" "), _vm.isShow == true && _vm.field.IsPublish == 1 && ((_vm.Position == 3 || _vm.isCaretaker == true) && _vm.valStatus == 5 || _vm.Position == 2 && _vm.valStatus == 4) ? _c("b-btn", {
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
  }, [_vm._v("Setujui")]) : _vm._e(), _vm._v(" "), _vm.isShow == true && (_vm.Position == 3 || _vm.isCaretaker == true) && _vm.valStatus == 5 ? _c("b-btn", {
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
  }, [_vm._v("Tolak")]) : _vm._e(), _vm._v(" "), _vm.isShow == true && _vm.valStatus < 10 && ((_vm.Position == 3 || _vm.isCaretaker == true) && _vm.valStatus >= 6 || _vm.Position == 2 && _vm.valStatus >= 5) ? _c("b-btn", {
    staticClass: "float-right ml-2",
    attrs: {
      variant: "success"
    }
  }, [_vm._v("Disetujui")]) : _vm._e(), _vm._v(" "), _vm.isShow == true && _vm.valStatus == 10 ? _c("b-btn", {
    staticClass: "float-right ml-2",
    attrs: {
      variant: "warning"
    }
  }, [_vm._v("Ditolak")]) : _vm._e(), _vm._v(" "), _vm.isShow == true && _vm.field.IsPublish == 1 && (_vm.Position == 1 && _vm.valStatus == 2 || _vm.Position == 2 && _vm.valStatus == 3 || _vm.valStatus == 4 || (_vm.Position == 3 || _vm.isCaretaker == true) && _vm.valStatus == 5) ? _c("b-btn", {
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

/***/ "./node_modules/vue-text-mask/dist/vueTextMask.js":
/*!********************************************************!*\
  !*** ./node_modules/vue-text-mask/dist/vueTextMask.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():undefined}(this,function(){return function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.conformToMask=void 0;var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},i=r(2);Object.defineProperty(t,"conformToMask",{enumerable:!0,get:function(){return n(i).default}});var a=r(5),u=n(a);t.default={render:function(e){var t=this;return e("input",{ref:"input",domProps:{value:this.value},attrs:this.$attrs,on:Object.assign(o({},this.$listeners),{input:function(e){return t.updateValue(e.target.value)}})})},name:"masked-input",inheritAttrs:!1,props:{value:{type:String,required:!1,default:""},mask:{type:[Array,Function,Boolean,Object],required:!0},guide:{type:Boolean,required:!1},placeholderChar:{type:String,required:!1},keepCharPositions:{type:Boolean,required:!1},pipe:{type:Function,required:!1},showMask:{type:Boolean,required:!1}},mounted:function(){this.initMask()},methods:{createTextMaskInputElement:u.default,setTextMaskInputElement:function(){this.textMaskInputElement=this.createTextMaskInputElement(o({inputElement:this.$refs.input},this.$options.propsData))},initMask:function(){this.setTextMaskInputElement(),this.textMaskInputElement.update(this.value)},bind:function(){this.setTextMaskInputElement(),this.updateValue(this.value)},updateValue:function(e){this.textMaskInputElement.update(e),this.$emit("input",this.$refs.input.value)}},watch:{mask:function(e,t){this.mask!==t&&this.bind()},guide:function(){this.bind()},placeholderChar:function(){this.bind()},keepCharPositions:function(){this.bind()},pipe:function(){this.bind()},showMask:function(){this.bind()}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.placeholderChar="_",t.strFunction="function"},function(e,t,r){"use strict";function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:s,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:u,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!(0,i.isArray)(t)){if(("undefined"==typeof t?"undefined":o(t))!==a.strFunction)throw new Error("Text-mask:conformToMask; The mask property must be an array.");t=t(e,r),t=(0,i.processCaretTraps)(t).maskWithoutCaretTraps}var n=r.guide,l=void 0===n||n,f=r.previousConformedValue,d=void 0===f?s:f,c=r.placeholderChar,p=void 0===c?a.placeholderChar:c,h=r.placeholder,v=void 0===h?(0,i.convertMaskToPlaceholder)(t,p):h,m=r.currentCaretPosition,y=r.keepCharPositions,g=l===!1&&void 0!==d,b=e.length,k=d.length,C=v.length,x=t.length,P=b-k,M=P>0,T=m+(M?-P:0),O=T+Math.abs(P);if(y===!0&&!M){for(var w=s,S=T;S<O;S++)v[S]===p&&(w+=p);e=e.slice(0,T)+w+e.slice(T,b)}for(var j=e.split(s).map(function(e,t){return{char:e,isNew:t>=T&&t<O}}),V=b-1;V>=0;V--){var E=j[V].char;if(E!==p){var _=V>=T&&k===x;E===v[_?V-P:V]&&j.splice(V,1)}}var A=s,N=!1;e:for(var I=0;I<C;I++){var q=v[I];if(q===p){if(j.length>0)for(;j.length>0;){var F=j.shift(),$=F.char,B=F.isNew;if($===p&&g!==!0){A+=p;continue e}if(t[I].test($)){if(y===!0&&B!==!1&&d!==s&&l!==!1&&M){for(var R=j.length,J=null,W=0;W<R;W++){var L=j[W];if(L.char!==p&&L.isNew===!1)break;if(L.char===p){J=W;break}}null!==J?(A+=$,j.splice(J,1)):I--}else A+=$;continue e}N=!0}g===!1&&(A+=v.substr(I,C));break}A+=q}if(g&&M===!1){for(var D=null,z=0;z<A.length;z++)v[z]===p&&(D=z);A=null!==D?A.substr(0,D+1):s}return{conformedValue:A,meta:{someCharsRejected:N}}}Object.defineProperty(t,"__esModule",{value:!0});var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.default=n;var i=r(3),a=r(1),u=[],s=""},function(e,t,r){"use strict";function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:f,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:l.placeholderChar;if(!o(e))throw new Error("Text-mask:convertMaskToPlaceholder; The mask property must be an array.");if(e.indexOf(t)!==-1)throw new Error("Placeholder character must not be used as part of the mask. Please specify a character that is not present in your mask as your placeholder character.\n\n"+("The placeholder character that was received is: "+JSON.stringify(t)+"\n\n")+("The mask that was received is: "+JSON.stringify(e)));return e.map(function(e){return e instanceof RegExp?t:e}).join("")}function o(e){return Array.isArray&&Array.isArray(e)||e instanceof Array}function i(e){return"string"==typeof e||e instanceof String}function a(e){return"number"==typeof e&&void 0===e.length&&!isNaN(e)}function u(e){return"undefined"==typeof e||null===e}function s(e){for(var t=[],r=void 0;r=e.indexOf(d),r!==-1;)t.push(r),e.splice(r,1);return{maskWithoutCaretTraps:e,indexes:t}}Object.defineProperty(t,"__esModule",{value:!0}),t.convertMaskToPlaceholder=n,t.isArray=o,t.isString=i,t.isNumber=a,t.isNil=u,t.processCaretTraps=s;var l=r(1),f=[],d="[]"},function(e,t){"use strict";function r(e){var t=e.previousConformedValue,r=void 0===t?o:t,i=e.previousPlaceholder,a=void 0===i?o:i,u=e.currentCaretPosition,s=void 0===u?0:u,l=e.conformedValue,f=e.rawValue,d=e.placeholderChar,c=e.placeholder,p=e.indexesOfPipedChars,h=void 0===p?n:p,v=e.caretTrapIndexes,m=void 0===v?n:v;if(0===s||!f.length)return 0;var y=f.length,g=r.length,b=c.length,k=l.length,C=y-g,x=C>0,P=0===g,M=C>1&&!x&&!P;if(M)return s;var T=x&&(r===l||l===c),O=0,w=void 0,S=void 0;if(T)O=s-C;else{var j=l.toLowerCase(),V=f.toLowerCase(),E=V.substr(0,s).split(o),_=E.filter(function(e){return j.indexOf(e)!==-1});S=_[_.length-1];var A=a.substr(0,_.length).split(o).filter(function(e){return e!==d}).length,N=c.substr(0,_.length).split(o).filter(function(e){return e!==d}).length,I=N!==A,q=void 0!==a[_.length-1]&&void 0!==c[_.length-2]&&a[_.length-1]!==d&&a[_.length-1]!==c[_.length-1]&&a[_.length-1]===c[_.length-2];!x&&(I||q)&&A>0&&c.indexOf(S)>-1&&void 0!==f[s]&&(w=!0,S=f[s]);for(var F=h.map(function(e){return j[e]}),$=F.filter(function(e){return e===S}).length,B=_.filter(function(e){return e===S}).length,R=c.substr(0,c.indexOf(d)).split(o).filter(function(e,t){return e===S&&f[t]!==e}).length,J=R+B+$+(w?1:0),W=0,L=0;L<k;L++){var D=j[L];if(O=L+1,D===S&&W++,W>=J)break}}if(x){for(var z=O,G=O;G<=b;G++)if(c[G]===d&&(z=G),c[G]===d||m.indexOf(G)!==-1||G===b)return z}else if(w){for(var H=O-1;H>=0;H--)if(l[H]===S||m.indexOf(H)!==-1||0===H)return H}else for(var K=O;K>=0;K--)if(c[K-1]===d||m.indexOf(K)!==-1||0===K)return K}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r;var n=[],o=""},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e){var t={previousConformedValue:void 0,previousPlaceholder:void 0};return{state:t,update:function(r){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e,o=n.inputElement,l=n.mask,d=n.guide,m=n.pipe,g=n.placeholderChar,b=void 0===g?h.placeholderChar:g,k=n.keepCharPositions,C=void 0!==k&&k,x=n.showMask,P=void 0!==x&&x;if("undefined"==typeof r&&(r=o.value),r!==t.previousConformedValue){("undefined"==typeof l?"undefined":s(l))===y&&void 0!==l.pipe&&void 0!==l.mask&&(m=l.pipe,l=l.mask);var M=void 0,T=void 0;if(l instanceof Array&&(M=(0,p.convertMaskToPlaceholder)(l,b)),l!==!1){var O=a(r),w=o.selectionEnd,S=t.previousConformedValue,j=t.previousPlaceholder,V=void 0;if(("undefined"==typeof l?"undefined":s(l))===h.strFunction){if(T=l(O,{currentCaretPosition:w,previousConformedValue:S,placeholderChar:b}),T===!1)return;var E=(0,p.processCaretTraps)(T),_=E.maskWithoutCaretTraps,A=E.indexes;T=_,V=A,M=(0,p.convertMaskToPlaceholder)(T,b)}else T=l;var N={previousConformedValue:S,guide:d,placeholderChar:b,pipe:m,placeholder:M,currentCaretPosition:w,keepCharPositions:C},I=(0,c.default)(O,T,N),q=I.conformedValue,F=("undefined"==typeof m?"undefined":s(m))===h.strFunction,$={};F&&($=m(q,u({rawValue:O},N)),$===!1?$={value:S,rejected:!0}:(0,p.isString)($)&&($={value:$}));var B=F?$.value:q,R=(0,f.default)({previousConformedValue:S,previousPlaceholder:j,conformedValue:B,placeholder:M,rawValue:O,currentCaretPosition:w,placeholderChar:b,indexesOfPipedChars:$.indexesOfPipedChars,caretTrapIndexes:V}),J=B===M&&0===R,W=P?M:v,L=J?W:B;t.previousConformedValue=L,t.previousPlaceholder=M,o.value!==L&&(o.value=L,i(o,R))}}}}}function i(e,t){document.activeElement===e&&(g?b(function(){return e.setSelectionRange(t,t,m)},0):e.setSelectionRange(t,t,m))}function a(e){if((0,p.isString)(e))return e;if((0,p.isNumber)(e))return String(e);if(void 0===e||null===e)return v;throw new Error("The 'value' provided to Text Mask needs to be a string or a number. The value received was:\n\n "+JSON.stringify(e))}Object.defineProperty(t,"__esModule",{value:!0});var u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.default=o;var l=r(4),f=n(l),d=r(2),c=n(d),p=r(3),h=r(1),v="",m="none",y="object",g="undefined"!=typeof navigator&&/Android/i.test(navigator.userAgent),b="undefined"!=typeof requestAnimationFrame?requestAnimationFrame:setTimeout}])});

/***/ }),

/***/ "./resources/assets/src/components/backend/noe/noe-verification/form.vue":
/*!*******************************************************************************!*\
  !*** ./resources/assets/src/components/backend/noe/noe-verification/form.vue ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _form_vue_vue_type_template_id_4e181182___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form.vue?vue&type=template&id=4e181182& */ "./resources/assets/src/components/backend/noe/noe-verification/form.vue?vue&type=template&id=4e181182&");
/* harmony import */ var _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form.vue?vue&type=script&lang=js& */ "./resources/assets/src/components/backend/noe/noe-verification/form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _form_vue_vue_type_template_id_4e181182___WEBPACK_IMPORTED_MODULE_0__["render"],
  _form_vue_vue_type_template_id_4e181182___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/src/components/backend/noe/noe-verification/form.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/src/components/backend/noe/noe-verification/form.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/noe/noe-verification/form.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./form.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/noe/noe-verification/form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/src/components/backend/noe/noe-verification/form.vue?vue&type=template&id=4e181182&":
/*!**************************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/noe/noe-verification/form.vue?vue&type=template&id=4e181182& ***!
  \**************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_4e181182___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./form.vue?vue&type=template&id=4e181182& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/noe/noe-verification/form.vue?vue&type=template&id=4e181182&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_4e181182___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_4e181182___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
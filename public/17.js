(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[17],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/nod/nod-report/detail-row.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/src/components/backend/nod/nod-report/detail-row.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vuetable_2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuetable-2 */ "./node_modules/vuetable-2/dist/vuetable-2.js");
/* harmony import */ var vuetable_2__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vuetable_2__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vuetable_2_src_components_VuetablePagination__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vuetable-2/src/components/VuetablePagination */ "./node_modules/vuetable-2/src/components/VuetablePagination.vue");
/* harmony import */ var vuetable_2_src_components_VuetablePaginationInfo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vuetable-2/src/components/VuetablePaginationInfo */ "./node_modules/vuetable-2/src/components/VuetablePaginationInfo.vue");
/* harmony import */ var vuetable_2_src_components_VuetableRowHeader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuetable-2/src/components/VuetableRowHeader */ "./node_modules/vuetable-2/src/components/VuetableRowHeader.vue");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_5__);






/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    rowData: {
      type: Object,
      required: true
    },
    rowIndex: {
      type: Number
    }
  },
  components: {
    Vuetable: vuetable_2__WEBPACK_IMPORTED_MODULE_1___default.a,
    VuetablePagination: vuetable_2_src_components_VuetablePagination__WEBPACK_IMPORTED_MODULE_2__["default"],
    VuetablePaginationInfo: vuetable_2_src_components_VuetablePaginationInfo__WEBPACK_IMPORTED_MODULE_3__["default"],
    VuetableRowHeader: vuetable_2_src_components_VuetableRowHeader__WEBPACK_IMPORTED_MODULE_4__["default"]
  },
  data: function data() {
    return {
      Id: 0,
      Status: null,
      UserEntry: null,
      CreateAt: null,
      UserUnit: null,
      DateUnit: null,
      TextUnit: '',
      UserSection: null,
      DateSection: null,
      UserDept: null,
      DateDept: null,
      UserTerkait: null,
      UserQAAPJ: null,
      DateQAAPJ: null,
      UserQA: null,
      DateQA: null,
      isData: false,
      isCaretaker: false,
      isPublishBy: false,
      isSectionPublish: false,
      isRelevantDept: false,
      isDept: false,
      opsRelevantDept: [],
      historyRevision: [],
      revisionStatus: 0,
      dataCount: 0,
      relevantDeptExist: 0
    };
  },
  methods: {
    formatDate: function formatDate(value) {
      return value == null ? '' : moment__WEBPACK_IMPORTED_MODULE_5___default()(value).format('DD.MM.YY');
    },
    getDataDetail: function getDataDetail(id) {
      axios.post('/AdminVue/nod-report/' + this.rowData.id + '/detail').then(function (res) {
        var _this = this;
        var resp = res.data;
        this.Id = resp.data.Id;
        this.Status = resp.data.Status;
        this.UserEntry = resp.data.UserEntry;
        this.CreateAt = resp.data.CreateAt;
        this.UserUnit = resp.data.UserUnit;
        this.DateUnit = resp.data.DateUnit;
        this.TextUnit = resp.data.UserUnit != null ? resp.data.UserUnit + ' - ' + this.formatDate(resp.data.DateUnit) + '<br>' : '';
        this.UserSection = resp.data.UserSection;
        this.DateSection = resp.data.DateSection;
        this.TextSection = resp.data.UserSection != null ? resp.data.UserSection + ' - ' + this.formatDate(resp.data.DateSection) + '<br>' : '';
        this.UserDept = resp.data.UserDept;
        this.DateDept = resp.data.DateDept;
        this.UserTerkait = resp.data.UserTerkait;
        this.UserQAAPJ = resp.data.UserQAAPJ;
        this.DateQAAPJ = resp.data.DateQAAPJ;
        this.UserQA = resp.data.UserQA;
        this.DateQA = resp.data.DateQA;
        this.isData = resp.isData;
        this.isCaretaker = resp.isCaretaker;
        this.opsRelevantDept = resp.data.RelevantDept;
        resp.data.IdPublish == resp.data.IdPosition ? this.isPublishBy = true : this.isPublishBy;
        resp.data.IdSectionPublish == resp.data.IdPosition ? this.isSectionPublish = true : this.isSectionPublish;
        if (resp.data.IdRelevantDept != 0) {
          JSON.parse(resp.data.IdRelevantDept).filter(function (value) {
            return value == resp.data.IdDepartmentSession ? _this.isRelevantDept = true : _this.isRelevantDept;
          }, {});
        }
        resp.data.TypeUser == 15 && this.isRelevantDept == false || resp.data.TypeUser == 16 ? this.isDept = true : this.isDept;
        this.relevantDeptExist = resp.data.IdRelevantDept;
        this.historyRevision = resp.historyRevision;
        this.revisionStatus = resp.data.IsRevision;
        this.countData = resp.countData;
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.isNotif = true;
        this.alertNotif = 'Invalid Server Side!';
        this.alertVariant = 'alert-dark-danger';
      }.bind(this));
    },
    onAction: function onAction(action, data, index) {
      if (action == 'approve') {
        this.approve('/AdminVue/nod-report-approve', data, this.$parent, index, false, this.isCaretaker, this.opsRelevantDept, this.isDept, this.isRelevantDept, this.relevantDeptExist);
      }
      if (action == 'reject') {
        this.rejectOld('/AdminVue/nod-report-reject', data, this.$parent, index, false, this.isCaretaker);
      }
      if (action == 'correction') {
        this.$router.push({
          name: 'nod/form-correction-nod-report',
          params: {
            Id: data,
            isCaretaker: this.isCaretaker
          }
        });
      }
      if (action == 'revision') {
        this.revision('/AdminVue/nod-report-revision', data, this.$parent, index);
      }
      if (action == 'question') {
        this.$router.push({
          name: 'nod/form-question-nod-report',
          params: {
            Id: data,
            isCaretaker: this.isCaretaker
          }
        });
      }
    }
  },
  mounted: function mounted() {
    this.getDataDetail(this.rowData.id);
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/nod/nod-report/index.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/src/components/backend/nod/nod-report/index.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vuetable_2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuetable-2 */ "./node_modules/vuetable-2/dist/vuetable-2.js");
/* harmony import */ var vuetable_2__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vuetable_2__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vuetable_2_src_components_VuetablePagination__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vuetable-2/src/components/VuetablePagination */ "./node_modules/vuetable-2/src/components/VuetablePagination.vue");
/* harmony import */ var vuetable_2_src_components_VuetablePaginationInfo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vuetable-2/src/components/VuetablePaginationInfo */ "./node_modules/vuetable-2/src/components/VuetablePaginationInfo.vue");
/* harmony import */ var vuetable_2_src_components_VuetableRowHeader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuetable-2/src/components/VuetableRowHeader */ "./node_modules/vuetable-2/src/components/VuetableRowHeader.vue");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var vue_text_mask__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vue-text-mask */ "./node_modules/vue-text-mask/dist/vueTextMask.js");
/* harmony import */ var vue_text_mask__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(vue_text_mask__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _components_backend_template_ButtonAction__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/components/backend/template/ButtonAction */ "./resources/assets/src/components/backend/template/ButtonAction.vue");
/* harmony import */ var _detail_row__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./detail-row */ "./resources/assets/src/components/backend/nod/nod-report/detail-row.vue");









/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'index-nod-report',
  metaInfo: {
    title: 'Index NOD Report'
  },
  components: {
    Vuetable: vuetable_2__WEBPACK_IMPORTED_MODULE_1___default.a,
    VuetablePagination: vuetable_2_src_components_VuetablePagination__WEBPACK_IMPORTED_MODULE_2__["default"],
    VuetablePaginationInfo: vuetable_2_src_components_VuetablePaginationInfo__WEBPACK_IMPORTED_MODULE_3__["default"],
    VuetableRowHeader: vuetable_2_src_components_VuetableRowHeader__WEBPACK_IMPORTED_MODULE_4__["default"],
    MaskedInput: vue_text_mask__WEBPACK_IMPORTED_MODULE_6___default.a
  },
  links: {
    pagination: {
      // pagination information
    }
  },
  data: function data() {
    return {
      fields: [{
        name: 'index',
        title: '#',
        titleClass: 'text-center',
        dataClass: 'text-center wd-50'
      }, {
        name: 'NODNumber',
        sortField: 'nod.NODNumber',
        title: 'No. NOD',
        titleClass: 'text-center',
        dataClass: 'text-center'
      }, {
        name: 'NOENumberAcc',
        sortField: 'noe.NOENumberAcc',
        title: 'No. NOE',
        titleClass: 'text-center',
        dataClass: 'text-center'
      }, {
        name: 'Date',
        sortField: 'nod.Date',
        title: 'Tanggal / Waktu',
        titleClass: 'text-center',
        dataClass: 'text-center',
        formatter: this.formatDate
      },
      // {
      //   name: 'Event',
      //   sortField: 'noe.Event',
      //   title: 'Uraian / Kondisi Ketidaksesuaian',
      //   titleClass: 'text-center',
      //   dataClass: 'text-center'
      // },
      // {
      //   name: 'ProperCondition',
      //   sortField: 'nod.ProperCondition',
      //   title: 'Kondisi Seharusnya',
      //   titleClass: 'text-center',
      //   dataClass: 'text-center',
      // },
      {
        name: 'BatchNo',
        sortField: 'noe.BatchNo',
        title: 'No. Kontrol / No. Bets',
        titleClass: 'text-center',
        dataClass: 'text-center'
      }, {
        name: 'Product',
        sortField: 'pdc.Name',
        title: 'Bahan / Produk Terkait',
        titleClass: 'text-center',
        dataClass: 'text-center'
      }, {
        name: 'Status',
        sortField: 'nod.Status',
        title: 'Status',
        titleClass: 'text-center',
        dataClass: 'text-center'
      }, {
        name: 'Employee',
        sortField: 'emp.Name',
        title: 'Dilaporkan Oleh',
        titleClass: 'text-center',
        dataClass: 'text-center'
      }, {
        name: 'action',
        title: 'Tindakan',
        titleClass: 'text-center',
        dataClass: 'text-center'
      }
      /*{
        name: 'more',
        title: 'More',
        titleClass: 'text-center',
        dataClass: 'text-center',
      }*/],

      sortOrder: [{
        field: 'NODNumber',
        sortField: 'nod.NODNumber',
        direction: 'asc'
      }],
      vars: {
        perPage: 10
      },
      paramData: {
        search: {}
      },
      myDetailRow: _detail_row__WEBPACK_IMPORTED_MODULE_8__["default"],
      optionStatus: [{
        value: null,
        text: 'All'
      }, {
        value: "UnPublish",
        text: "UnPublish"
      }, {
        value: "Dilaporkan ke Unit Head",
        text: "Dilaporkan ke Unit Head"
      }, {
        value: "Disetujui oleh Unit Head",
        text: "Disetujui oleh Unit Head"
      }, {
        value: "Disetujui oleh Section Head",
        text: "Disetujui oleh Section Head"
      }, {
        value: "Disetujui oleh Dept Head",
        text: "Disetujui oleh Dept Head"
      }, {
        value: "Disetujui oleh Dept Head Terkait",
        text: "Disetujui oleh Dept Head Terkait"
      },
      // {value: "Disetujui oleh QA APJ", text:"Disetujui oleh QA APJ"},
      {
        value: "Disetujui oleh QA Dept.Head",
        text: "Disetujui oleh QA Dept.Head"
      }, {
        value: "Ditolak",
        text: "Ditolak"
      }, {
        value: "Direvisi Dept Head Terkait",
        text: "Direvisi Dept Head Terkait"
      }, {
        value: "Disetujui Oleh QA Section Head",
        text: "Disetujui Oleh QA Section Head"
      }],
      position: 0,
      //position 1 = unit; 2 = section head; 3 = APJ; 4 = dept head;
      idDetail: [],
      isCaretaker: false,
      deptTerkait: false,
      userDepartment: 0,
      typeUser: 0
    };
  },
  methods: {
    formatDate: function formatDate(value) {
      return value == null ? '' : moment__WEBPACK_IMPORTED_MODULE_5___default()(value).format('DD.MM.YY');
    },
    onPaginationData: function onPaginationData(paginationData) {
      this.$refs.pagination.setPaginationData(paginationData);
      this.$refs.paginationInfo.setPaginationData(paginationData);
      for (var i = 0; i < this.idDetail.length; i++) {
        this.$refs.vuetable.hideDetailRow(this.idDetail[i]);
      }
    },
    onChangePage: function onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    },
    getFilters: function getFilters() {
      this.$refs.vuetable.refresh();
      for (var i = 0; i < this.idDetail.length; i++) {
        this.$refs.vuetable.hideDetailRow(this.idDetail[i]);
      }
    },
    createData: function createData() {
      this.$router.push('/RoleAdmin/nod/form-nod-report');
    },
    onCellClicked: function onCellClicked(data, index) {
      for (var i = 0; i < this.idDetail.length; i++) {
        this.$refs.vuetable.hideDetailRow(this.idDetail[i]);
      }
      this.$refs.vuetable.toggleDetailRow(data.id);
      this.idDetail.push(data.id);
    },
    getSession: function getSession() {
      axios.post('/AdminVue/nod-report-get-session').then(function (res) {
        this.position = res.data.position;
        this.isCaretaker = res.data.isCaretaker;
        this.userDepartment = res.data.userDepartment;
        this.typeUser = res.data.typeUser;
      }.bind(this))["catch"](function (e) {
        console.log(e);
      }.bind(this));
    },
    getDeptTerkait: function getDeptTerkait(id) {
      axios.post('/AdminVue/nod-report-edit', {
        Id: id
      }).then(function (res) {
        this.deptTerkait = res.data.deptTerkait;
      }.bind(this))["catch"](function (e) {
        console.log(e);
      }.bind(this));
    },
    onAction: function onAction(action, data, index) {
      if (action == 'view-item') {
        this.$router.push({
          name: 'nod/show-nod-report',
          params: {
            Id: data.id,
            isShow: true
          }
        });
      }
      if (action == 'edit-item') {
        this.$router.push({
          name: 'nod/form-nod-report',
          params: {
            isFormEdit: true,
            Id: data.id
          }
        });
      }
      if (action == 'delete-item') {
        this.deleteData('/AdminVue/nod-report-delete', data.id, this.$refs.vuetable);
      }
      if (action == 'publish') {
        this.publish('/AdminVue/nod-report-publish', data.id, this.$refs.vuetable);
      }
      if (action == 'approve') {
        this.approve('/AdminVue/nod-report-approve', data.id, this.$refs.vuetable, null, true, this.isCaretaker);
      }
    }
  },
  mounted: function mounted() {
    this.isNotifExist();
    this.getSession();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/template/ButtonAction.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/src/components/backend/template/ButtonAction.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuetable_2_src_components_VuetableFieldMixin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuetable-2/src/components/VuetableFieldMixin */ "./node_modules/vuetable-2/src/components/VuetableFieldMixin.vue");

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'button-actions',
  mixins: [vuetable_2_src_components_VuetableFieldMixin__WEBPACK_IMPORTED_MODULE_0__["default"]],
  methods: {
    onAction: function onAction(action, data, field) {
      // console.log('slot) action: ' + action, data, field)
      if (action == 'view-item') {
        this.$router.push({
          name: field.showUrl,
          params: {
            Id: data.id
          }
        });
      }
      if (action == 'edit-item') {
        this.$router.push({
          name: field.editUrl,
          params: {
            isFormEdit: true,
            Id: data.id
          }
        });
      }
      if (action == 'delete-item') {
        this.deleteData(field.deleteUrl, data.id, this.vuetable);
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/nod/nod-report/detail-row.vue?vue&type=template&id=3fb6fe9e&":
/*!**************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/src/components/backend/nod/nod-report/detail-row.vue?vue&type=template&id=3fb6fe9e& ***!
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
  return _c("b-card", {
    staticClass: "mb-4 text-center",
    attrs: {
      header: "Data Detail Laporan NOD",
      "header-tag": "h4"
    }
  }, [_c("div", {
    staticClass: "table-responsive"
  }, [_c("table", {
    staticClass: "table table-bordered b-t"
  }, [_c("thead", [_c("tr", {
    staticStyle: {
      "background-color": "white"
    }
  }, [_c("th", [_vm._v("#")]), _vm._v(" "), _c("th", [_vm._v("Dilaporkan Oleh")]), _vm._v(" "), _c("th", {
    attrs: {
      colspan: "2"
    }
  }, [_vm._v("Diperiksa Oleh")]), _vm._v(" "), _c("th", {
    attrs: {
      colspan: "2"
    }
  }, [_vm._v("Disetujui Oleh")]), _vm._v(" "), _c("th", [_vm._v("Tindakan")])])]), _vm._v(" "), _c("tbody", [_vm.Status == "UnPublish" && _vm.Status == null && _vm.countData == 1 ? _c("tr", [_c("td", {
    attrs: {
      colspan: "7"
    }
  }, [_c("b", [_vm._v("Tidak Ada Data")])])]) : _vm._l(_vm.historyRevision, function (item, index) {
    return _c("tr", {
      staticStyle: {
        "background-color": "white"
      }
    }, [_c("td", [_vm._v(_vm._s(index + 1))]), _vm._v(" "), _c("td", [_vm._v(_vm._s(item.UserEntry) + " - " + _vm._s(_vm.formatDate(item.CreateAt)) + " "), item.IsRevision == 1 ? _c("b", [_vm._v("Revisi")]) : _vm._e()]), _vm._v(" "), _c("td", [_c("span", {}, [_vm._v(_vm._s(item.UserUnit) + " - " + _vm._s(_vm.formatDate(item.DateUnit)))]), _c("br"), _vm._v(" "), _c("span", {}, [_vm._v(_vm._s(item.UserSection) + " - " + _vm._s(_vm.formatDate(item.DateSection)))]), _c("br"), _vm._v("\n                        " + _vm._s(item.UserDept) + " - " + _vm._s(_vm.formatDate(item.DateDept)) + "\n                    ")]), _vm._v(" "), _c("td", {}, [_vm._v(_vm._s(item.UserTerkait))]), _vm._v(" "), _c("td", {
      attrs: {
        colspan: "2"
      }
    }, [_vm._v(_vm._s(item.UserQA) + " - " + _vm._s(_vm.formatDate(item.DateQA)))]), _vm._v(" "), _c("td", [_vm.isData == true && item.IsRevision == 0 && (_vm.isPublishBy == true || _vm.isSectionPublish == true || _vm.isDept == true || _vm.isRelevantDept == true || _vm.Status == "Disetujui oleh Dept Head Terkait" || _vm.Status == "Disetujui Oleh QA Section Head") ? _c("div", [_vm.isDept ? _c("b-btn", {
      staticClass: "btn btn-outline-danger btn-sm mr-1 mt-1",
      on: {
        click: function click($event) {
          return _vm.onAction("reject", _vm.Id, _vm.rowData.id);
        }
      }
    }, [_c("i", {
      staticClass: "ion ion-md-close"
    }), _vm._v(" Tolak\n                            ")]) : _vm._e(), _vm._v(" "), _c("b-btn", {
      staticClass: "btn btn-warning btn-sm mr-1 mt-1",
      on: {
        click: function click($event) {
          return _vm.onAction("correction", _vm.Id, _vm.rowData.id);
        }
      }
    }, [_c("i", {
      staticClass: "fas fa-comment"
    }), _vm._v(" Koreksi\n                            ")])], 1) : _vm._e()])]);
  })], 2)])])]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/nod/nod-report/index.vue?vue&type=template&id=9e68367c&":
/*!*********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/src/components/backend/nod/nod-report/index.vue?vue&type=template&id=9e68367c& ***!
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
      header: "Laporan NOD",
      "header-tag": "h4"
    }
  }, [_c("b-form", {
    staticClass: "mb-2 row",
    attrs: {
      inline: ""
    }
  }, [_c("div", {
    staticClass: "col-md-4"
  }, [_c("b-form", {
    attrs: {
      inline: ""
    }
  }, [_c("label", {
    staticClass: "form-label mr-sm-2"
  }, [_vm._v("Tampilkan Data")]), _vm._v(" "), _c("b-select", {
    attrs: {
      value: "vars.perPage",
      options: [10, 25, 50, 100, 1000]
    },
    model: {
      value: _vm.vars.perPage,
      callback: function callback($$v) {
        _vm.$set(_vm.vars, "perPage", $$v);
      },
      expression: "vars.perPage"
    }
  })], 1)], 1), _vm._v(" "), _c("div", {
    staticClass: "col-md-4"
  }, [_c("b-form", {
    attrs: {
      inline: ""
    }
  }, [_c("label", {
    staticClass: "form-label mr-sm-1"
  }, [_vm._v("Periode")]), _vm._v(" "), _c("b-form", {
    attrs: {
      inline: ""
    }
  }, [_c("masked-input", {
    staticClass: "form-control",
    staticStyle: {
      width: "120px"
    },
    attrs: {
      mask: _vm.datemmMask,
      placeholder: "month"
    },
    on: {
      keyup: function keyup($event) {
        if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) return null;
        return _vm.getFilters();
      }
    },
    model: {
      value: _vm.paramData.search.nod__Month,
      callback: function callback($$v) {
        _vm.$set(_vm.paramData.search, "nod__Month", $$v);
      },
      expression: "paramData.search.nod__Month"
    }
  }), _vm._v(" "), _c("masked-input", {
    staticClass: "form-control",
    staticStyle: {
      width: "120px",
      "margin-left": "2px"
    },
    attrs: {
      mask: _vm.dateYYMask,
      placeholder: "year"
    },
    on: {
      keyup: function keyup($event) {
        if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) return null;
        return _vm.getFilters();
      }
    },
    model: {
      value: _vm.paramData.search.nod__Year,
      callback: function callback($$v) {
        _vm.$set(_vm.paramData.search, "nod__Year", $$v);
      },
      expression: "paramData.search.nod__Year"
    }
  })], 1)], 1)], 1), _vm._v(" "), _c("div", {
    staticClass: "col-md-4"
  }, [_vm.typeUser == 9 ? _c("b-btn", {
    staticClass: "btn btn-success btn-md float-right mr-2",
    on: {
      click: function click($event) {
        return _vm.createData();
      }
    }
  }, [_c("i", {
    staticClass: "ion ion-md-add-circle"
  }), _vm._v(" Buat Data\n          ")]) : _vm._e()], 1)]), _vm._v(" "), _c("div", {
    staticClass: "table-responsive"
  }, [_c("vuetable", {
    ref: "vuetable",
    attrs: {
      "api-url": "/AdminVue/data-nod-report",
      "http-method": "post",
      "http-options": _vm.authHeader,
      "no-data-template": "Data tidak ada",
      fields: _vm.fields,
      css: _vm.cssTable,
      "sort-order": _vm.sortOrder,
      "multi-sort": false,
      "multi-sort-key": "ctrl",
      "detail-row-component": _vm.myDetailRow,
      "per-page": _vm.vars.perPage,
      "pagination-path": "",
      "append-params": _vm.paramData
    },
    on: {
      "vuetable:pagination-data": _vm.onPaginationData,
      "vuetable:loading": function vuetableLoading($event) {
        return _vm.showLoading();
      },
      "vuetable:loaded": function vuetableLoaded($event) {
        return _vm.hideLoading();
      }
    },
    scopedSlots: _vm._u([{
      key: "tableHeader",
      fn: function fn(props) {
        return [_c("tr", {
          staticClass: "text-center"
        }, [_c("th", {
          staticClass: "wd-50"
        }), _vm._v(" "), _c("th", [_c("b-input", {
          attrs: {
            placeholder: "No. NOD"
          },
          on: {
            keyup: function keyup($event) {
              if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) return null;
              return _vm.getFilters();
            }
          },
          model: {
            value: _vm.paramData.search.nod__NODNumber,
            callback: function callback($$v) {
              _vm.$set(_vm.paramData.search, "nod__NODNumber", $$v);
            },
            expression: "paramData.search.nod__NODNumber"
          }
        })], 1), _vm._v(" "), _c("th", [_c("b-input", {
          attrs: {
            placeholder: "No. NOE"
          },
          on: {
            keyup: function keyup($event) {
              if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) return null;
              return _vm.getFilters();
            }
          },
          model: {
            value: _vm.paramData.search.noe__NOENumber,
            callback: function callback($$v) {
              _vm.$set(_vm.paramData.search, "noe__NOENumber", $$v);
            },
            expression: "paramData.search.noe__NOENumber"
          }
        })], 1), _vm._v(" "), _c("th", [_c("masked-input", {
          staticClass: "form-control",
          attrs: {
            type: "text",
            placeholder: "dd.mm.yy",
            guide: false,
            mask: _vm.datedmYMask
          },
          on: {
            keyup: function keyup($event) {
              if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) return null;
              return _vm.getFilters();
            }
          },
          model: {
            value: _vm.paramData.search.nod__Date,
            callback: function callback($$v) {
              _vm.$set(_vm.paramData.search, "nod__Date", $$v);
            },
            expression: "paramData.search.nod__Date"
          }
        })], 1), _vm._v(" "), _c("th", [_c("b-input", {
          attrs: {
            placeholder: "No. Kontrol / No. Bets"
          },
          on: {
            keyup: function keyup($event) {
              if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) return null;
              return _vm.getFilters();
            }
          },
          model: {
            value: _vm.paramData.search.noe__BatchNo,
            callback: function callback($$v) {
              _vm.$set(_vm.paramData.search, "noe__BatchNo", $$v);
            },
            expression: "paramData.search.noe__BatchNo"
          }
        })], 1), _vm._v(" "), _c("th", [_c("b-input", {
          attrs: {
            placeholder: "Bahan / Produk Terkait"
          },
          on: {
            keyup: function keyup($event) {
              if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) return null;
              return _vm.getFilters();
            }
          },
          model: {
            value: _vm.paramData.search.pdc__Name,
            callback: function callback($$v) {
              _vm.$set(_vm.paramData.search, "pdc__Name", $$v);
            },
            expression: "paramData.search.pdc__Name"
          }
        })], 1), _vm._v(" "), _c("th", [_c("b-form-select", {
          attrs: {
            options: _vm.optionStatus,
            value: "paramData.search.nod__Status"
          },
          on: {
            change: function change($event) {
              return _vm.getFilters();
            }
          },
          model: {
            value: _vm.paramData.search.nod__Status,
            callback: function callback($$v) {
              _vm.$set(_vm.paramData.search, "nod__Status", $$v);
            },
            expression: "paramData.search.nod__Status"
          }
        })], 1), _vm._v(" "), _c("th", [_c("b-input", {
          attrs: {
            placeholder: "Dilaporkan Oleh"
          },
          on: {
            keyup: function keyup($event) {
              if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) return null;
              return _vm.getFilters();
            }
          },
          model: {
            value: _vm.paramData.search.emp__Name,
            callback: function callback($$v) {
              _vm.$set(_vm.paramData.search, "emp__Name", $$v);
            },
            expression: "paramData.search.emp__Name"
          }
        })], 1), _vm._v(" "), _c("th")]), _vm._v(" "), _c("vuetable-row-header")];
      }
    }, {
      key: "index",
      fn: function fn(props) {
        return [_c("b-btn", {
          staticClass: "btn btn-outline-info btn-sm mr-sm-1",
          on: {
            click: function click($event) {
              return _vm.onCellClicked(props.rowData, props.rowIndex);
            }
          }
        }, [_c("i", {
          staticClass: "fas fa-bars"
        })])];
      }
    }, {
      key: "action",
      fn: function fn(props) {
        return [_c("div", {
          staticClass: "custom-actions"
        }, [_c("b-btn", {
          staticClass: "btn btn-outline-info btn-sm mr-1 mt-1",
          on: {
            click: function click($event) {
              return _vm.onAction("view-item", props.rowData, props.rowIndex);
            }
          }
        }, [_c("i", {
          staticClass: "ion ion-ios-eye"
        }), _vm._v(" Tampilkan\n          ")]), _vm._v(" "), props.rowData.Status == "UnPublish" && _vm.position == 5 || props.rowData.Status == "Disetujui oleh Dept Head Terkait" && _vm.position == 2 || props.rowData.ReportDept == _vm.typeUser && props.rowData.IsUpadatedRevision != 1 ? _c("b-btn", {
          staticClass: "btn btn-outline-secondary btn-sm mr-1 mt-1",
          on: {
            click: function click($event) {
              return _vm.onAction("edit-item", props.rowData, props.rowIndex);
            }
          }
        }, [_c("i", {
          staticClass: "ion ion-md-create"
        }), _vm._v(" Ubah\n          ")]) : _vm._e(), _vm._v(" "), props.rowData.Status == "UnPublish" && _vm.position == 5 || props.rowData.ReportDept == _vm.typeUser && props.rowData.IsUpadatedRevision != 1 ? _c("b-btn", {
          staticClass: "btn btn-outline-danger btn-sm mr-1 mt-1",
          on: {
            click: function click($event) {
              return _vm.onAction("delete-item", props.rowData, props.rowIndex);
            }
          }
        }, [_c("i", {
          staticClass: "ion ion-md-trash"
        }), _vm._v(" Hapus\n          ")]) : _vm._e(), _vm._v(" "), props.rowData.Status == "UnPublish" && _vm.position == 5 || props.rowData.ReportDept == _vm.typeUser && props.rowData.IsUpadatedRevision != 1 ? _c("b-btn", {
          staticClass: "btn btn-outline-success btn-sm mr-1 mt-1",
          on: {
            click: function click($event) {
              return _vm.onAction("publish", props.rowData, props.rowIndex);
            }
          }
        }, [_c("i", {
          staticClass: "ion-md-cloud-upload"
        }), _vm._v(" Publish\n          ")]) : _vm._e(), _vm._v(" "), props.rowData.Status != "UnPublish" ? _c("b-btn", {
          staticClass: "btn btn-warning btn-sm mr-1 mt-1",
          attrs: {
            href: "/AdminVue/nod-report/" + props.rowData.id + "/export",
            target: "_blank"
          }
        }, [_c("i", {
          staticClass: "ion ion-md-print"
        }), _vm._v(" Export\n          ")]) : _vm._e(), _vm._v(" "), _c("div", [_vm.position != 4 && props.rowData.Status == "UnPublish" || _vm.position == 1 && props.rowData.Status == "Dilaporkan ke Unit Head" || _vm.position == 2 && props.rowData.Status == "Disetujui oleh Unit Head" || (_vm.position == 4 || _vm.isCaretaker == true) && (props.rowData.Status == "Disetujui oleh Section Head" && props.rowData.IdDepartment == _vm.userDepartment || props.rowData.IdDepartment != _vm.userDepartment && props.rowData.Status == "Disetujui oleh Dept Head" || _vm.userDepartment == 67 && props.rowData.Status == "Disetujui oleh Dept Head Terkait") ? _c("span", {
          staticClass: "btn btn-md btn-warning"
        }) : _c("span", {
          staticClass: "btn btn-md btn-success"
        })])], 1)];
      }
    }, {
      key: "more",
      fn: function fn(props) {
        return [_c("div", {
          staticClass: "custom-actions"
        })];
      }
    }])
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "vuetable-footer"
  }, [_c("vuetable-pagination-info", {
    ref: "paginationInfo",
    attrs: {
      "no-data-template": "Data tidak ada",
      "info-template": "Menampilkan {from} - {to} dari {total} data"
    }
  }), _vm._v(" "), _c("vuetable-pagination", {
    ref: "pagination",
    attrs: {
      css: _vm.cssPagination
    },
    on: {
      "vuetable-pagination:change-page": _vm.onChangePage
    }
  })], 1)], 1)], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/template/ButtonAction.vue?vue&type=template&id=5d5c4910&":
/*!**********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/src/components/backend/template/ButtonAction.vue?vue&type=template&id=5d5c4910& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _vm.isHeader ? _c("th", [_vm._v(_vm._s(_vm.title))]) : _c("td", {
    staticClass: "custom-actions"
  }, [_vm.rowField.isShow ? _c("b-btn", {
    staticClass: "btn btn-outline-info btn-sm mr-1 mt-1",
    on: {
      click: function click($event) {
        return _vm.onAction("view-item", _vm.rowData, _vm.rowField);
      }
    }
  }, [_c("i", {
    staticClass: "ion ion-ios-eye"
  }), _vm._v(" Tampilkan\n  ")]) : _vm._e(), _vm._v(" "), _vm.rowField.isEdit ? _c("b-btn", {
    staticClass: "btn btn-outline-secondary btn-sm mr-1 mt-1",
    on: {
      click: function click($event) {
        return _vm.onAction("edit-item", _vm.rowData, _vm.rowField);
      }
    }
  }, [_c("i", {
    staticClass: "ion ion-md-create"
  }), _vm._v(" Ubah\n  ")]) : _vm._e(), _vm._v(" "), _vm.rowField.isDelete ? _c("b-btn", {
    staticClass: "btn btn-outline-danger btn-sm mr-1 mt-1",
    on: {
      click: function click($event) {
        return _vm.onAction("delete-item", _vm.rowData, _vm.rowField);
      }
    }
  }, [_c("i", {
    staticClass: "ion ion-md-trash"
  }), _vm._v(" Hapus\n  ")]) : _vm._e()], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./resources/assets/src/components/backend/nod/nod-report/detail-row.vue":
/*!*******************************************************************************!*\
  !*** ./resources/assets/src/components/backend/nod/nod-report/detail-row.vue ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _detail_row_vue_vue_type_template_id_3fb6fe9e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./detail-row.vue?vue&type=template&id=3fb6fe9e& */ "./resources/assets/src/components/backend/nod/nod-report/detail-row.vue?vue&type=template&id=3fb6fe9e&");
/* harmony import */ var _detail_row_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./detail-row.vue?vue&type=script&lang=js& */ "./resources/assets/src/components/backend/nod/nod-report/detail-row.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _detail_row_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _detail_row_vue_vue_type_template_id_3fb6fe9e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _detail_row_vue_vue_type_template_id_3fb6fe9e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/src/components/backend/nod/nod-report/detail-row.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/src/components/backend/nod/nod-report/detail-row.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/nod/nod-report/detail-row.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_detail_row_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./detail-row.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/nod/nod-report/detail-row.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_detail_row_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/src/components/backend/nod/nod-report/detail-row.vue?vue&type=template&id=3fb6fe9e&":
/*!**************************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/nod/nod-report/detail-row.vue?vue&type=template&id=3fb6fe9e& ***!
  \**************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_detail_row_vue_vue_type_template_id_3fb6fe9e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./detail-row.vue?vue&type=template&id=3fb6fe9e& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/nod/nod-report/detail-row.vue?vue&type=template&id=3fb6fe9e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_detail_row_vue_vue_type_template_id_3fb6fe9e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_detail_row_vue_vue_type_template_id_3fb6fe9e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/src/components/backend/nod/nod-report/index.vue":
/*!**************************************************************************!*\
  !*** ./resources/assets/src/components/backend/nod/nod-report/index.vue ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_9e68367c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=9e68367c& */ "./resources/assets/src/components/backend/nod/nod-report/index.vue?vue&type=template&id=9e68367c&");
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ "./resources/assets/src/components/backend/nod/nod-report/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_9e68367c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_vue_vue_type_template_id_9e68367c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/src/components/backend/nod/nod-report/index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/src/components/backend/nod/nod-report/index.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/nod/nod-report/index.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/nod/nod-report/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/src/components/backend/nod/nod-report/index.vue?vue&type=template&id=9e68367c&":
/*!*********************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/nod/nod-report/index.vue?vue&type=template&id=9e68367c& ***!
  \*********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_9e68367c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=template&id=9e68367c& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/nod/nod-report/index.vue?vue&type=template&id=9e68367c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_9e68367c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_9e68367c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/src/components/backend/template/ButtonAction.vue":
/*!***************************************************************************!*\
  !*** ./resources/assets/src/components/backend/template/ButtonAction.vue ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ButtonAction_vue_vue_type_template_id_5d5c4910___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ButtonAction.vue?vue&type=template&id=5d5c4910& */ "./resources/assets/src/components/backend/template/ButtonAction.vue?vue&type=template&id=5d5c4910&");
/* harmony import */ var _ButtonAction_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ButtonAction.vue?vue&type=script&lang=js& */ "./resources/assets/src/components/backend/template/ButtonAction.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ButtonAction_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ButtonAction_vue_vue_type_template_id_5d5c4910___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ButtonAction_vue_vue_type_template_id_5d5c4910___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/src/components/backend/template/ButtonAction.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/src/components/backend/template/ButtonAction.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/template/ButtonAction.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ButtonAction_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./ButtonAction.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/template/ButtonAction.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ButtonAction_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/src/components/backend/template/ButtonAction.vue?vue&type=template&id=5d5c4910&":
/*!**********************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/template/ButtonAction.vue?vue&type=template&id=5d5c4910& ***!
  \**********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_ButtonAction_vue_vue_type_template_id_5d5c4910___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./ButtonAction.vue?vue&type=template&id=5d5c4910& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/template/ButtonAction.vue?vue&type=template&id=5d5c4910&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_ButtonAction_vue_vue_type_template_id_5d5c4910___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_ButtonAction_vue_vue_type_template_id_5d5c4910___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
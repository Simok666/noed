(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[70],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/noe/noe-report/index.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/src/components/backend/noe/noe-report/index.vue?vue&type=script&lang=js& ***!
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








/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'index-noe-report',
  metaInfo: {
    title: 'Index NOE Report'
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
        name: 'NOENumber',
        sortField: 'noe.NOENumber',
        title: 'No. Draft NOE',
        titleClass: 'text-center',
        dataClass: 'text-center'
      }, {
        name: 'NOENumberAcc',
        sortField: 'noe.NOENumberAcc',
        title: 'No. NOE',
        titleClass: 'text-center',
        dataClass: 'text-center'
      }, {
        name: 'IdTypeIncident',
        sortField: 'noe.IdTypeIncident',
        title: 'Jenis Kejadian',
        titleClass: 'text-center',
        dataClass: 'text-center',
        formatter: this.formatIncident
      }, {
        name: 'Location',
        sortField: 'loc.Name',
        title: 'Lokasi Kejadian',
        titleClass: 'text-center',
        dataClass: 'text-center'
      }, {
        name: 'Date',
        sortField: 'noe.Date',
        title: 'Tanggal / Waktu',
        titleClass: 'text-center',
        dataClass: 'text-center',
        formatter: this.formatDate
      }, {
        name: 'Product',
        sortField: 'pdc.Name',
        title: 'Bahan / Produk Terkait',
        titleClass: 'text-center',
        dataClass: 'text-center'
      }, {
        name: 'BatchNo',
        sortField: 'noe.BatchNo',
        title: 'No. Kontrol / No. Bets',
        titleClass: 'text-center',
        dataClass: 'text-center'
      }, {
        name: 'statusCustom',
        sortField: 'noe.Status',
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
        title: '',
        titleClass: 'text-center',
        dataClass: 'text-center',
      }*/],

      sortOrder: [
      // {
      //   field: 'NOENumberAcc',
      //   sortField: 'noe.NOENumberAcc',
      //   direction: 'desc'
      // },
      {
        field: 'NOENumber',
        sortField: 'noe.NOENumber',
        direction: 'desc'
      }],
      vars: {
        perPage: 10
      },
      paramData: {
        search: {}
      },
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
        value: "Dilaporkan ke Sect Head",
        text: "Dilaporkan ke Sect Head"
      }, {
        value: "Disetujui oleh Unit Head",
        text: "Disetujui oleh Unit Head"
      }, {
        value: "Disetujui oleh Sect Head",
        text: "Disetujui oleh Sect Head"
      }, {
        value: "Disetujui oleh Dept Head",
        text: "Disetujui oleh Dept Head"
      }, {
        value: "Disetujui oleh QA Sect.Head",
        text: "Disetujui oleh QA Sect.Head"
      }, {
        value: "Disetujui oleh QA Dept.Head",
        text: "Disetujui oleh QA Dept.Head"
      }, {
        value: "Ditolak",
        text: "Ditolak"
      }, {
        value: "Disetujui oleh Unit Head (caretaker)",
        text: "Disetujui oleh Unit Head (caretaker)"
      }, {
        value: "Disetujui oleh Sect Head (caretaker)",
        text: "Disetujui oleh Sect Head (caretaker)"
      }],
      session: []
    };
  },
  methods: {
    formatDate: function formatDate(value) {
      return value == null ? '' : moment__WEBPACK_IMPORTED_MODULE_5___default()(value).format('DD.MM.YY');
    },
    showReject: function showReject(id) {
      axios.post('/AdminVue/noe-report-descriptionReject', {
        Id: id
      }).then(function (res) {
        var resp = res.data.data;
        this.$swal({
          icon: 'info',
          title: 'Deskripsi Laporan Ditolak',
          text: resp,
          confirmButtonText: 'Tutup'
        });
      }.bind(this))["catch"](function (e) {
        console.log(e);
      }.bind(this));
    },
    formatIncident: function formatIncident(value) {
      var dataIncident = JSON.parse(value);
      var result = '';
      dataIncident.forEach(function (value, index) {
        if (value.TypeIncident) {
          result += value.TypeIncident + "; ";
        }
      });
      return value == null ? '' : result;
    },
    onPaginationData: function onPaginationData(paginationData) {
      this.$refs.pagination.setPaginationData(paginationData);
      this.$refs.paginationInfo.setPaginationData(paginationData);
    },
    onChangePage: function onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    },
    getFilters: function getFilters() {
      this.$refs.vuetable.refresh();
    },
    createData: function createData() {
      this.$router.push('/RoleAdmin/noe/form-noe-report');
    },
    onAction: function onAction(action, data, index) {
      if (action == 'view-item') {
        this.$router.push({
          name: 'noe/show-noe-report',
          params: {
            Id: data.id,
            isShow: true
          }
        });
        return;
      }
      if (data.IsCorrection == false || data.IsCorrection == null) {
        if (action == 'edit-item') {
          this.$router.push({
            name: 'noe/form-noe-report',
            params: {
              isFormEdit: true,
              Id: data.id
            }
          });
        }
        if (action == 'delete-item') {
          this.deleteData('/AdminVue/noe-report-delete', data.id, this.$refs.vuetable);
        }
        if (action == 'publish') {
          this.publish('/AdminVue/noe-report-publish', data, this.$refs.vuetable);
        }
      } else {
        return this.showNotifCustom('notifications-danger', 'Forbidden Action', 'Harus isi jawaban dari pengkoreksi');
      }
    },
    getSession: function getSession() {
      axios.post('/AdminVue/auth-get-session').then(function (res) {
        var resp = res.data.data;
        this.session = resp;
      }.bind(this))["catch"](function (e) {
        console.log(e);
      }.bind(this));
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

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/noe/noe-report/index.vue?vue&type=template&id=0838fd00&":
/*!*********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/src/components/backend/noe/noe-report/index.vue?vue&type=template&id=0838fd00& ***!
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
      header: "Laporan NOE",
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
      value: _vm.paramData.search.noe__Month,
      callback: function callback($$v) {
        _vm.$set(_vm.paramData.search, "noe__Month", $$v);
      },
      expression: "paramData.search.noe__Month"
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
      value: _vm.paramData.search.noe__Year,
      callback: function callback($$v) {
        _vm.$set(_vm.paramData.search, "noe__Year", $$v);
      },
      expression: "paramData.search.noe__Year"
    }
  })], 1)], 1)], 1), _vm._v(" "), _c("div", {
    staticClass: "col-md-4"
  }, [_vm.session.TypeUser == 9 ? _c("b-btn", {
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
      "api-url": "/AdminVue/data-noe-report",
      "http-options": _vm.authHeader,
      "no-data-template": "Data tidak ada",
      fields: _vm.fields,
      css: _vm.cssTable,
      "sort-order": _vm.sortOrder,
      "multi-sort": false,
      "multi-sort-key": "ctrl",
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
            placeholder: "No. Draft NOE"
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
            value: _vm.paramData.search.noe__NOENumberAcc,
            callback: function callback($$v) {
              _vm.$set(_vm.paramData.search, "noe__NOENumberAcc", $$v);
            },
            expression: "paramData.search.noe__NOENumberAcc"
          }
        })], 1), _vm._v(" "), _c("th", [_c("b-input", {
          attrs: {
            placeholder: "Jenis Kejadian"
          },
          on: {
            keyup: function keyup($event) {
              if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) return null;
              return _vm.getFilters();
            }
          },
          model: {
            value: _vm.paramData.search.noe__IdTypeIncident,
            callback: function callback($$v) {
              _vm.$set(_vm.paramData.search, "noe__IdTypeIncident", $$v);
            },
            expression: "paramData.search.noe__IdTypeIncident"
          }
        })], 1), _vm._v(" "), _c("th", [_c("b-input", {
          attrs: {
            placeholder: "Lokasi Kejadian"
          },
          on: {
            keyup: function keyup($event) {
              if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) return null;
              return _vm.getFilters();
            }
          },
          model: {
            value: _vm.paramData.search.loc__Name,
            callback: function callback($$v) {
              _vm.$set(_vm.paramData.search, "loc__Name", $$v);
            },
            expression: "paramData.search.loc__Name"
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
            value: _vm.paramData.search.noe__Date,
            callback: function callback($$v) {
              _vm.$set(_vm.paramData.search, "noe__Date", $$v);
            },
            expression: "paramData.search.noe__Date"
          }
        })], 1), _vm._v(" "), _c("th", [_c("b-input", {
          attrs: {
            placeholder: "Bahan/Produk Terkait"
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
        })], 1), _vm._v(" "), _c("th", [_c("b-form-select", {
          attrs: {
            options: _vm.optionStatus,
            value: "paramData.search.noe__Status"
          },
          on: {
            change: function change($event) {
              return _vm.getFilters();
            }
          },
          model: {
            value: _vm.paramData.search.noe__Status,
            callback: function callback($$v) {
              _vm.$set(_vm.paramData.search, "noe__Status", $$v);
            },
            expression: "paramData.search.noe__Status"
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
        return [_vm._v("\n          " + _vm._s(props.rowIndex + 1) + "\n      ")];
      }
    }, {
      key: "statusCustom",
      fn: function fn(props) {
        return [_c("div", {
          staticClass: "custom-actions"
        }, [props.rowData.Status == "Ditolak" ? [_vm._v("\n            " + _vm._s(props.rowData.Status) + "\n            "), _c("b-btn", {
          staticClass: "btn btn-outline-info btn-xs ml-1",
          on: {
            click: function click($event) {
              return _vm.showReject(props.rowData.id);
            }
          }
        }, [_c("i", {
          staticClass: "ion ion-ios-eye"
        })])] : [_vm._v("\n            " + _vm._s(props.rowData.Status) + "\n          ")]], 2)];
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
        }), _vm._v(" Tampilkan\n          ")]), _vm._v(" "), props.rowData.Status == "UnPublish" && props.rowData.IdUser == _vm.session.Id ? _c("b-btn", {
          staticClass: "btn btn-outline-secondary btn-sm mr-1 mt-1",
          on: {
            click: function click($event) {
              return _vm.onAction("edit-item", props.rowData, props.rowIndex);
            }
          }
        }, [_c("i", {
          staticClass: "ion ion-md-create"
        }), _vm._v(" Ubah\n          ")]) : _vm._e(), _vm._v(" "), props.rowData.Status == "UnPublish" && props.rowData.IdUser == _vm.session.Id ? _c("b-btn", {
          staticClass: "btn btn-outline-danger btn-sm mr-1 mt-1",
          on: {
            click: function click($event) {
              return _vm.onAction("delete-item", props.rowData, props.rowIndex);
            }
          }
        }, [_c("i", {
          staticClass: "ion ion-md-trash"
        }), _vm._v(" Hapus\n          ")]) : _vm._e(), _vm._v(" "), props.rowData.Status == "UnPublish" && props.rowData.IdUser == _vm.session.Id ? _c("b-btn", {
          staticClass: "btn btn-outline-primary btn-sm mr-1 mt-1",
          on: {
            click: function click($event) {
              return _vm.onAction("publish", props.rowData, props.rowIndex);
            }
          }
        }, [_c("i", {
          staticClass: "ion ion-md-checkmark"
        }), _vm._v(" Publish\n          ")]) : _vm._e(), _vm._v(" "), props.rowData.IsPublish == 2 ? _c("b-btn", {
          staticClass: "btn btn-warning btn-sm mr-1 mt-1",
          attrs: {
            href: "/AdminVue/noe-report/" + props.rowData.id + "/export",
            target: "_blank"
          }
        }, [_c("i", {
          staticClass: "ion ion-md-print"
        }), _vm._v(" Export\n          ")]) : _vm._e(), _vm._v(" "), props.rowData.Status == "UnPublish" && props.rowData.IdUser == _vm.session.Id ? _c("span", {
          staticClass: "btn btn-md btn-warning"
        }) : _c("span", {
          staticClass: "btn btn-md btn-success"
        })], 1)];
      }
    }, {
      key: "more",
      fn: function fn(props) {
        return [_c("div", {
          staticClass: "custom-actions"
        }, [props.rowData.Status == "UnPublish" && props.rowData.IdUser == _vm.session.Id ? _c("b-btn", {
          staticClass: "btn btn-outline-primary btn-sm mr-1 mt-1",
          on: {
            click: function click($event) {
              return _vm.onAction("publish", props.rowData, props.rowIndex);
            }
          }
        }, [_c("i", {
          staticClass: "ion ion-md-checkmark"
        }), _vm._v(" Publish\n          ")]) : _vm._e(), _vm._v(" "), props.rowData.IsPublish == 2 ? _c("b-btn", {
          staticClass: "btn btn-warning btn-sm mr-1 mt-1",
          attrs: {
            href: "/AdminVue/noe-report/" + props.rowData.id + "/export",
            target: "_blank"
          }
        }, [_c("i", {
          staticClass: "ion ion-md-print"
        }), _vm._v(" Export\n          ")]) : _vm._e(), _vm._v(" "), props.rowData.Status == "UnPublish" && props.rowData.IdUser == _vm.session.Id ? _c("span", {
          staticClass: "btn btn-md btn-warning"
        }) : _c("span", {
          staticClass: "btn btn-md btn-success"
        })], 1)];
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

/***/ "./resources/assets/src/components/backend/noe/noe-report/index.vue":
/*!**************************************************************************!*\
  !*** ./resources/assets/src/components/backend/noe/noe-report/index.vue ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_0838fd00___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=0838fd00& */ "./resources/assets/src/components/backend/noe/noe-report/index.vue?vue&type=template&id=0838fd00&");
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ "./resources/assets/src/components/backend/noe/noe-report/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_0838fd00___WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_vue_vue_type_template_id_0838fd00___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/src/components/backend/noe/noe-report/index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/src/components/backend/noe/noe-report/index.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/noe/noe-report/index.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/noe/noe-report/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/src/components/backend/noe/noe-report/index.vue?vue&type=template&id=0838fd00&":
/*!*********************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/noe/noe-report/index.vue?vue&type=template&id=0838fd00& ***!
  \*********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_0838fd00___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=template&id=0838fd00& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/noe/noe-report/index.vue?vue&type=template&id=0838fd00&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_0838fd00___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_0838fd00___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



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
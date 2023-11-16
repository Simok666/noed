(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[44],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/main/Dashboard.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/src/components/backend/main/Dashboard.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue_chartjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-chartjs */ "./node_modules/vue-chartjs/es/index.js");
/* harmony import */ var _vendor_libs_perfect_scrollbar_PerfectScrollbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/vendor/libs/perfect-scrollbar/PerfectScrollbar */ "./resources/assets/src/vendor/libs/perfect-scrollbar/PerfectScrollbar.vue");
/* harmony import */ var vue_fusioncharts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue-fusioncharts */ "./node_modules/vue-fusioncharts/dist/vue-fusioncharts.js");
/* harmony import */ var vue_fusioncharts__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(vue_fusioncharts__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var fusioncharts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! fusioncharts */ "./node_modules/fusioncharts/fusioncharts.js");
/* harmony import */ var fusioncharts__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(fusioncharts__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var fusioncharts_fusioncharts_charts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! fusioncharts/fusioncharts.charts */ "./node_modules/fusioncharts/fusioncharts.charts.js");
/* harmony import */ var fusioncharts_fusioncharts_charts__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(fusioncharts_fusioncharts_charts__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var fusioncharts_themes_fusioncharts_theme_fusion__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! fusioncharts/themes/fusioncharts.theme.fusion */ "./node_modules/fusioncharts/themes/fusioncharts.theme.fusion.js");
/* harmony import */ var fusioncharts_themes_fusioncharts_theme_fusion__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(fusioncharts_themes_fusioncharts_theme_fusion__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var fusioncharts_fusioncharts_widgets__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! fusioncharts/fusioncharts.widgets */ "./node_modules/fusioncharts/fusioncharts.widgets.js");
/* harmony import */ var fusioncharts_fusioncharts_widgets__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(fusioncharts_fusioncharts_widgets__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var fusioncharts_fusioncharts_timeseries__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! fusioncharts/fusioncharts.timeseries */ "./node_modules/fusioncharts/fusioncharts.timeseries.js");
/* harmony import */ var fusioncharts_fusioncharts_timeseries__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(fusioncharts_fusioncharts_timeseries__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var chartjs_plugin_datalabels__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! chartjs-plugin-datalabels */ "./node_modules/chartjs-plugin-datalabels/dist/chartjs-plugin-datalabels.js");
/* harmony import */ var chartjs_plugin_datalabels__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(chartjs_plugin_datalabels__WEBPACK_IMPORTED_MODULE_10__);











// import DoughnutChart from '@/components/Doughnut'

vue__WEBPACK_IMPORTED_MODULE_0___default.a.use(vue_fusioncharts__WEBPACK_IMPORTED_MODULE_3___default.a, fusioncharts__WEBPACK_IMPORTED_MODULE_4___default.a, fusioncharts_fusioncharts_charts__WEBPACK_IMPORTED_MODULE_5___default.a, fusioncharts_themes_fusioncharts_theme_fusion__WEBPACK_IMPORTED_MODULE_6___default.a, fusioncharts_fusioncharts_widgets__WEBPACK_IMPORTED_MODULE_7___default.a, fusioncharts_fusioncharts_timeseries__WEBPACK_IMPORTED_MODULE_8___default.a);
vue__WEBPACK_IMPORTED_MODULE_0___default.a.component('pie-chart', {
  "extends": vue_chartjs__WEBPACK_IMPORTED_MODULE_1__["default"].Pie,
  mixins: [vue_chartjs__WEBPACK_IMPORTED_MODULE_1__["default"].mixins.reactiveProp],
  props: ['chartData'],
  data: function data() {
    return {
      options: {
        plugins: {
          datalabels: {
            color: "white",
            textAlign: "center",
            font: {
              weight: "bold",
              size: 16
            }
          }
        },
        legend: {
          display: true,
          position: 'right',
          labels: {
            boxWidth: 12
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  mounted: function mounted() {
    this.renderChart(this.chartData, this.options);
  }
});
vue__WEBPACK_IMPORTED_MODULE_0___default.a.component('doughnut-chart', {
  "extends": vue_chartjs__WEBPACK_IMPORTED_MODULE_1__["default"].Doughnut,
  mixins: [vue_chartjs__WEBPACK_IMPORTED_MODULE_1__["default"].mixins.reactiveProp],
  props: ['chartData'],
  data: function data() {
    return {
      options: {
        plugins: {
          datalabels: {
            color: "white",
            textAlign: "center",
            font: {
              weight: "bold",
              size: 16
            }
          }
        },
        legend: {
          display: true,
          position: 'right',
          labels: {
            boxWidth: 12
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  mounted: function mounted() {
    this.renderChart(this.chartData, this.options);
  }
});
vue__WEBPACK_IMPORTED_MODULE_0___default.a.component('bar-chart', {
  "extends": vue_chartjs__WEBPACK_IMPORTED_MODULE_1__["default"].Bar,
  mixins: [vue_chartjs__WEBPACK_IMPORTED_MODULE_1__["default"].mixins.reactiveProp],
  props: ['chartData'],
  data: function data() {
    return {
      options: {
        plugins: {
          datalabels: {
            color: "white",
            textAlign: "center",
            font: {
              weight: "bold",
              size: 16
            }
          }
        },
        legend: {
          display: true,
          position: 'right',
          labels: {
            boxWidth: 12
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  mounted: function mounted() {
    this.renderChart(this.chartData, this.options);
  }
});
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'dashboard',
  metaInfo: {
    title: 'Dashboards'
  },
  components: {
    PerfectScrollbar: _vendor_libs_perfect_scrollbar_PerfectScrollbar__WEBPACK_IMPORTED_MODULE_2__["default"]
    // DoughnutChart
  },
  data: function data() {
    return {
      date: moment__WEBPACK_IMPORTED_MODULE_9___default()(new Date()).format('dddd, DD MMMM YYYY'),
      opsYear: [],
      opsStatus: [{
        value: 'noe',
        text: 'NOE'
      }, {
        value: 'nod',
        text: 'NOD'
      }],
      opsStatusReport: [{
        value: 'noe',
        text: 'NOE'
      }, {
        value: 'nod',
        text: 'NOD'
      }],
      accessTable: [],
      allYear: null,
      unitYear: null,
      NOEYear: null,
      NODYear: null,
      noeNodStatus: null,
      noeNodStatusReport: 'NOE',
      TimeNOEYear: null,
      TimeNODYear: null,
      DeviationYear: null,
      UnitChartYear: null,
      UnitSortYear: null,
      ParetoChartYear: null,
      countHeaderUnit: 0,
      headerUnit: [],
      unitLocation: [],
      statusNOE: [],
      statusNOD: [],
      statusTimeNOE: [],
      dataTimeNOE: [],
      statusTimeNOD: [],
      dataTimeNOD: [],
      countHeaderDeviation: 0,
      headerDeviation: [],
      deviationLevel: [],
      idDepartment: 0,
      Department: {
        Id: 0,
        Department: 'ALL'
      },
      opsDepartment: [{
        Id: 0,
        Department: 'ALL'
      }],
      datacollection_pie: {},
      datacollection_level_noe: {},
      datacollection_bets_category: {},
      datacollection_noenod_status: {},
      datacollection_perhitungan_hari: {},
      datacollection_data_timeDept: {},
      datacollection_data_timeQa: {},
      valHeaderUnit: [],
      valUnitColor: [],
      valUnitLocation: [],
      valUnitLocationSort: [],
      "type": "pareto2d",
      "renderAt": "chart-container",
      "width": "100%",
      "height": "350",
      "dataFormat": "json",
      dataSource: {
        chart: {
          theme: "fusion",
          decimals: "1",
          drawcrossline: "1"
        },
        data: [{
          label: "Example 1",
          value: "40"
        }, {
          label: "Example 2",
          value: "22"
        }]
      },
      dataNoe: {
        total_laporan: 0,
        is_open_laporan: 0,
        is_ongoing_laporan: 0,
        is_closed_laporan: 0
      },
      dataNod: {
        total_laporan_nod: 0,
        is_open_laporan_nod: 0,
        is_ongoing_laporan_nod: 0,
        is_closed_laporan_nod: 0
      },
      dataLevel: [],
      levelColor: [],
      setDataValue: [],
      databets: [],
      betscolor: [],
      setDataBets: [],
      dataOpen: [],
      dataClosed: [],
      dataOngoing: [],
      rawDataLevel: [],
      rawDataBets: [],
      rawDataTimeDept: [],
      rawDataTimeQa: [],
      getDeptFilter: null,
      getYearFilter: null
    };
  },
  methods: {
    unitData: function unitData() {
      this.datacollection_pie = {
        labels: this.valHeaderUnit,
        datasets: [{
          borderWidth: 1,
          borderColor: this.valUnitColor,
          backgroundColor: this.valUnitColor,
          data: this.valUnitLocation
        }]
      };
    },
    levelNoe: function levelNoe(datalevel, levelColor, setDataValue) {
      this.datacollection_level_noe = {
        labels: datalevel,
        datasets: [{
          borderWidth: 1,
          borderColor: levelColor,
          backgroundColor: levelColor,
          data: setDataValue
        }]
      };
    },
    statusNoeNod: function statusNoeNod(dataOpen, dataOngoing, dataClosed) {
      this.datacollection_noenod_status = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
          type: 'bar',
          borderWidth: 1,
          label: 'Drafting',
          borderColor: '#6ded8f',
          backgroundColor: '#6ded8f',
          data: [dataOngoing.January, dataOngoing.February, dataOngoing.March, dataOngoing.April, dataOngoing.May, dataOngoing.June, dataOngoing.July, dataOngoing.August, dataOngoing.September, dataOngoing.October, dataOngoing.November, dataOngoing.December],
          stack: 'bar'
        }, {
          type: 'bar',
          borderWidth: 1,
          label: 'Closed',
          borderColor: '#ffb554',
          backgroundColor: '#ffb554',
          data: [dataClosed.January, dataClosed.February, dataClosed.March, dataClosed.April, dataClosed.May, dataClosed.June, dataClosed.July, dataClosed.August, dataClosed.September, dataClosed.October, dataClosed.November, dataClosed.December],
          stack: 'bar'
        }, {
          type: 'bar',
          borderWidth: 1,
          label: 'Open',
          borderColor: '#3e95cd',
          backgroundColor: '#3e95cd',
          data: [dataOpen.January, dataOpen.February, dataOpen.March, dataOpen.April, dataOpen.May, dataOpen.June, dataOpen.July, dataOpen.August, dataOpen.September, dataOpen.October, dataOpen.November, dataOpen.December],
          stack: 'bar'
        }]
      };
    },
    countingDaysApproval: function countingDaysApproval(dataA, dataB, dataC, dataD) {
      this.datacollection_perhitungan_hari = {
        labels: ['Tgl kejadian --> QA terima', 'QA terima --> QA approve (NOE)', 'QA Approve (NOE) --> QA terima (NOD)', 'QA terima --> QA approve (NOD)'],
        datasets: [{
          type: 'bar',
          borderWidth: 1,
          borderColor: '#3e95cd',
          label: 'avarage',
          backgroundColor: '#3e95cd',
          data: [dataA, dataB, dataC, dataD],
          stack: 'bar'
        }]
      };
    },
    betCategory: function betCategory(databets, betscolor, setDataValue) {
      this.datacollection_bets_category = {
        labels: databets,
        datasets: [{
          borderWidth: 1,
          borderColor: betscolor,
          backgroundColor: betscolor,
          data: setDataValue
        }]
      };
    },
    statusTimeDeptData: function statusTimeDeptData(dataValue) {
      this.datacollection_data_timeDept = {
        labels: ['On Time', 'Delay'],
        datasets: [{
          borderWidth: 1,
          borderColor: ['#ffb554', '#3e95cd'],
          backgroundColor: ['#ffb554', '#3e95cd'],
          data: dataValue
        }]
      };
    },
    statusTimeQAData: function statusTimeQAData(dataValue) {
      this.datacollection_data_timeQa = {
        labels: ['On Time', 'Delay'],
        datasets: [{
          borderWidth: 1,
          borderColor: ['#ffb554', '#3e95cd'],
          backgroundColor: ['#ffb554', '#3e95cd'],
          data: dataValue
        }]
      };
    },
    getLocation: function getLocation() {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      if (type == 'tabel') {
        if (filter == '') filter = this.unitYear.value;
      }
      if (type == 'chart') {
        if (filter == '') filter = this.UnitChartYear.value;
      }
      if (type == 'sort') {
        if (filter == '') filter = this.UnitSortYear.value;
      }
      if (type == 'pareto') {
        if (filter == '') filter = this.ParetoChartYear.value;
      }
      this.showLoading();
      axios.post('/AdminVue/dashboard-get-unit-location', {
        Department: this.Department.Id,
        type: type,
        filter: filter
      }).then(function (res) {
        if (type == 'tabel') {
          this.countHeaderUnit = res.data.countHeaderUnit;
          this.headerUnit = res.data.headerUnit;
          this.unitLocation = res.data.unitLocation;
        } else if (type == 'chart') {
          this.valHeaderUnit = res.data.valHeaderUnit;
          this.valUnitColor = res.data.valUnitColor;
          this.valUnitLocation = res.data.valUnitLocation;
          this.unitData();
        } else if (type == 'sort') {
          this.valUnitLocationSort = res.data.valUnitLocationSort;
        } else if (type == 'pareto') {
          this.dataSource.data = JSON.parse(res.data.valPareto);
        } else {
          this.countHeaderUnit = res.data.countHeaderUnit;
          this.headerUnit = res.data.headerUnit;
          this.unitLocation = res.data.unitLocation;
          this.valHeaderUnit = res.data.valHeaderUnit;
          this.valUnitColor = res.data.valUnitColor;
          this.valUnitLocation = res.data.valUnitLocation;
          this.valUnitLocationSort = res.data.valUnitLocationSort;
          this.dataSource.data = JSON.parse(res.data.valPareto);
          this.unitData();
        }
        this.hideLoading();
      }.bind(this))["catch"](function (e) {
        this.hideLoading();
        console.log(e);
      }.bind(this));
    },
    getStatusNOE: function getStatusNOE() {
      var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      this.showLoading();
      axios.post('/AdminVue/dashboard-get-status-noe', {
        value: 'noe',
        filter: filter,
        Department: this.Department.Id
      }).then(function (res) {
        this.statusNOE = res.data.data;
        this.hideLoading();
      }.bind(this))["catch"](function (e) {
        this.hideLoading();
        console.log(e);
        this.statusNOE = [];
      }.bind(this));
    },
    getStatusNOD: function getStatusNOD() {
      var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      this.showLoading();
      axios.post('/AdminVue/dashboard-get-status-noe', {
        value: 'nod',
        filter: filter,
        Department: this.Department.Id
      }).then(function (res) {
        this.statusNOD = res.data.data;
        this.hideLoading();
      }.bind(this))["catch"](function (e) {
        this.hideLoading();
        console.log(e);
        this.statusNOD = [];
      }.bind(this));
    },
    getStatusTimeNOE: function getStatusTimeNOE() {
      var filter = '';
      if (this.TimeNOEYear) filter = this.TimeNOEYear.value;
      this.showLoading();
      axios.post('/AdminVue/dashboard-get-status-time', {
        value: 'noe',
        filter: filter,
        Department: this.Department.Id
      }).then(function (res) {
        this.statusTimeNOE = res.data.data;
        this.dataTimeNOE = res.data;
        this.hideLoading();
      }.bind(this))["catch"](function (e) {
        this.hideLoading();
        console.log(e);
        this.statusTimeNOE = [];
        this.dataTimeNOE = [];
      }.bind(this));
    },
    getStatusTimeNOD: function getStatusTimeNOD() {
      var _this = this;
      var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      return function (filter) {
        var filter = '';
        if (_this.TimeNODYear) filter = _this.TimeNODYear.value;
        _this.showLoading();
        axios.post('/AdminVue/dashboard-get-status-time', {
          value: 'nod',
          filter: filter,
          Department: _this.Department.Id
        }).then(function (res) {
          this.statusTimeNOD = res.data.data;
          this.dataTimeNOD = res.data;
          this.hideLoading();
        }.bind(_this))["catch"](function (e) {
          this.hideLoading();
          console.log(e);
          this.statusTimeNOD = [];
          this.dataTimeNOD = [];
        }.bind(_this));
      }(filter);
    },
    getDeviationLevel: function getDeviationLevel() {
      var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      if (filter == '') filter = this.DeviationYear.value;
      this.showLoading();
      axios.post('/AdminVue/dashboard-get-deviation-level', {
        filter: filter,
        Department: this.Department.Id
      }).then(function (res) {
        this.countHeaderDeviation = res.data.countHeaderDeviation;
        this.headerDeviation = res.data.headerDeviation;
        this.deviationLevel = res.data.deviationLevel;
        this.hideLoading();
      }.bind(this))["catch"](function (e) {
        this.hideLoading();
        console.log(e);
        this.headerDeviation = [];
        this.deviationLevel = [];
      }.bind(this));
    },
    onChangeUnit: function onChangeUnit(option) {
      if (option) this.getLocation('tabel', option.value);
    },
    onChangeNOE: function onChangeNOE(option) {
      if (option) this.getStatusNOE(option.value);
    },
    onChangeNOD: function onChangeNOD(option) {
      if (option) this.getStatusNOD(option.value);
    },
    onChangeTimeNOE: function onChangeTimeNOE(option) {
      if (option) this.getStatusTimeNOE();
    },
    onChangeTimeNOD: function onChangeTimeNOD(option) {
      if (option) this.getStatusTimeNOD();
    },
    onChangeDeviation: function onChangeDeviation(option) {
      if (option) this.getDeviationLevel(option.value);
    },
    onChangeUnitChart: function onChangeUnitChart(option) {
      if (option) this.getLocation('chart', option.value);
    },
    onChangeUnitSort: function onChangeUnitSort(option) {
      if (option) this.getLocation('sort', option.value);
    },
    onChangeUnitPareto: function onChangeUnitPareto(option) {
      if (option) this.getLocation('pareto', option.value);
    },
    onChangeStatus: function onChangeStatus(option) {
      if (option) this.getStatusNoeNod(option.value);
    },
    onChangeStatusReport: function onChangeStatusReport(option) {
      if (option) {
        // this.noeNodStatusReport = option.text
        this.getDelayOntimeData(option.value);
      }
    },
    generateYearDashboard: function generateYearDashboard() {
      axios.post('/AdminVue/dashboard-generate-year').then(function (res) {
        this.opsYear = JSON.parse(res.data.data);
        this.accessTable = res.data.access;
        this.opsDepartment = res.data.dtDept;
        this.idDepartment = res.data.idDepartment;
        var yearNow = moment__WEBPACK_IMPORTED_MODULE_9___default()(new Date()).format('YYYY');
        this.allYear = this.opsYear.find(function (val) {
          return val.value == yearNow;
        });
        this.unitYear = this.opsYear.find(function (val) {
          return val.value == yearNow;
        });
        this.NOEYear = this.opsYear.find(function (val) {
          return val.value == yearNow;
        });
        this.NODYear = this.opsYear.find(function (val) {
          return val.value == yearNow;
        });
        this.TimeNOEYear = this.opsYear.find(function (val) {
          return val.value == yearNow;
        });
        this.TimeNODYear = this.opsYear.find(function (val) {
          return val.value == yearNow;
        });
        this.DeviationYear = this.opsYear.find(function (val) {
          return val.value == yearNow;
        });
        this.UnitChartYear = this.opsYear.find(function (val) {
          return val.value == yearNow;
        });
        this.UnitSortYear = this.opsYear.find(function (val) {
          return val.value == yearNow;
        });
        this.ParetoChartYear = this.opsYear.find(function (val) {
          return val.value == yearNow;
        });
      }.bind(this))["catch"](function (e) {
        console.log(e);
      }.bind(this));
    },
    onChangeDept: function onChangeDept(option) {
      var yearNow = moment__WEBPACK_IMPORTED_MODULE_9___default()(new Date()).format('YYYY');
      this.allYear = this.opsYear.find(function (val) {
        return val.value == yearNow;
      });
      this.unitYear = this.opsYear.find(function (val) {
        return val.value == yearNow;
      });
      this.NOEYear = this.opsYear.find(function (val) {
        return val.value == yearNow;
      });
      this.NODYear = this.opsYear.find(function (val) {
        return val.value == yearNow;
      });
      this.TimeNOEYear = this.opsYear.find(function (val) {
        return val.value == yearNow;
      });
      this.TimeNODYear = this.opsYear.find(function (val) {
        return val.value == yearNow;
      });
      this.DeviationYear = this.opsYear.find(function (val) {
        return val.value == yearNow;
      });
      this.UnitChartYear = this.opsYear.find(function (val) {
        return val.value == yearNow;
      });
      this.UnitSortYear = this.opsYear.find(function (val) {
        return val.value == yearNow;
      });
      this.ParetoChartYear = this.opsYear.find(function (val) {
        return val.value == yearNow;
      });
      this.getDeptFilter = option.Id;
      this.getLocation(null, this.allYear.value);
      this.getStatusNOE(this.allYear.value);
      this.getStatusNOD(this.allYear.value);
      this.getStatusTimeNOE();
      this.getLevelNoe();
      this.getCategoryBets();
      this.getStatusNoeNod();
      this.getAvarageData();
      this.getDelayOntimeData();
      this.getStatusTimeNOD(this.allYear.value);
      this.getDeviationLevel(this.allYear.value);
    },
    onChangeAllYear: function onChangeAllYear(option) {
      var yearNow = option.value;
      this.unitYear = this.opsYear.find(function (val) {
        return val.value == yearNow;
      });
      this.NOEYear = this.opsYear.find(function (val) {
        return val.value == yearNow;
      });
      this.NODYear = this.opsYear.find(function (val) {
        return val.value == yearNow;
      });
      this.TimeNOEYear = this.opsYear.find(function (val) {
        return val.value == yearNow;
      });
      this.TimeNODYear = this.opsYear.find(function (val) {
        return val.value == yearNow;
      });
      this.DeviationYear = this.opsYear.find(function (val) {
        return val.value == yearNow;
      });
      this.UnitChartYear = this.opsYear.find(function (val) {
        return val.value == yearNow;
      });
      this.UnitSortYear = this.opsYear.find(function (val) {
        return val.value == yearNow;
      });
      this.ParetoChartYear = this.opsYear.find(function (val) {
        return val.value == yearNow;
      });
      this.getYearFilter = option.value;
      this.getLocation(null, this.allYear.value);
      this.getStatusNOE(this.allYear.value);
      this.getStatusNOD(this.allYear.value);
      this.getStatusTimeNOE();
      this.getLevelNoe();
      this.getCategoryBets();
      this.getStatusNoeNod();
      this.getAvarageData();
      this.getDelayOntimeData();
      this.getStatusTimeNOD(this.allYear.value);
      this.getDeviationLevel(this.allYear.value);
    },
    getReportData: function getReportData() {
      axios.post('/AdminVue/dashboard-get-data-report').then(function (res) {
        var response = res.data;
        vue__WEBPACK_IMPORTED_MODULE_0___default.a.set(this.dataNoe, 'total_laporan', response.dataNoe.total_laporan);
        vue__WEBPACK_IMPORTED_MODULE_0___default.a.set(this.dataNoe, 'is_open_laporan', response.dataNoe.is_open_laporan);
        vue__WEBPACK_IMPORTED_MODULE_0___default.a.set(this.dataNoe, 'is_ongoing_laporan', response.dataNoe.is_ongoing_laporan);
        vue__WEBPACK_IMPORTED_MODULE_0___default.a.set(this.dataNoe, 'is_closed_laporan', response.dataNoe.is_closed_laporan);
        vue__WEBPACK_IMPORTED_MODULE_0___default.a.set(this.dataNod, 'total_laporan_nod', response.dataNod.total_laporan_nod);
        vue__WEBPACK_IMPORTED_MODULE_0___default.a.set(this.dataNod, 'is_open_laporan_nod', response.dataNod.is_open_laporan_nod);
        vue__WEBPACK_IMPORTED_MODULE_0___default.a.set(this.dataNod, 'is_ongoing_laporan_nod', response.dataNod.is_ongoing_laporan_nod);
        vue__WEBPACK_IMPORTED_MODULE_0___default.a.set(this.dataNod, 'is_closed_laporan_nod', response.dataNod.is_closed_laporan_nod);
      }.bind(this))["catch"](function (e) {
        console.log(e);
      }.bind(this));
    },
    getLevelNoe: function getLevelNoe() {
      axios.post('/AdminVue/dashboard-get-data-noe-level', {
        year: this.allYear,
        department: this.Department.Id
      }).then(function (res) {
        var response = res.data;
        this.dataLavel = response.dataLavel;
        this.levelColor = response.levelColor;
        this.setDataValue = response.setDataValue;
        this.rawDataLevel = response.rawData;
        this.levelNoe(this.dataLavel, this.levelColor, this.setDataValue);
      }.bind(this))["catch"](function (e) {
        console.log(e);
      }.bind(this));
    },
    getCategoryBets: function getCategoryBets() {
      axios.post('/AdminVue/dashboard-get-data-bets-category', {
        year: this.allYear,
        department: this.Department.Id
      }).then(function (res) {
        var response = res.data;
        this.databets = response.databets;
        this.betscolor = response.betscolor;
        this.setDataBets = response.setDataValue;
        this.rawDataBets = response.rawData;
        this.betCategory(this.databets, this.betscolor, this.setDataBets);
      }.bind(this))["catch"](function (e) {
        console.log(e);
      }.bind(this));
    },
    getStatusNoeNod: function getStatusNoeNod() {
      var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'noe';
      axios.post('/AdminVue/dashboard-get-status-noe-nod', {
        status: status,
        year: this.allYear,
        department: this.Department.Id
      }).then(function (res) {
        var response = res.data;
        this.dataOpen = response.dataOpen;
        this.dataOngoing = response.dataOngoing;
        this.dataClosed = response.dataClosed;
        this.statusNoeNod(this.dataOpen, this.dataOngoing, this.dataClosed);
      }.bind(this))["catch"](function (e) {
        console.log(e);
      }.bind(this));
    },
    getAvarageData: function getAvarageData() {
      axios.post('/AdminVue/dashboard-get-avarage-data', {
        year: this.allYear,
        department: this.Department.Id
      }).then(function (res) {
        var response = res.data;
        this.countingDaysApproval(response.noePublishToQash, response.noeQashToQadh, response.QadhNoeToQashNod, response.QashNodToQadhNod);
      }.bind(this))["catch"](function (e) {
        console.log(e);
      }.bind(this));
    },
    getDelayOntimeData: function getDelayOntimeData() {
      var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'noe';
      axios.post('/AdminVue/dashboard-get-delay-ontime-data', {
        status: status,
        year: this.allYear,
        department: this.Department.Id
      }).then(function (res) {
        var response = res.data;
        this.rawDataTimeDept = response.setRawDataTimeDept;
        this.rawDataTimeQa = response.setRawDataTimeQa;
        this.statusTimeQAData(response.setDataTimeQA);
        this.statusTimeDeptData(response.setDataTimeDept);
      }.bind(this));
    }
  },
  mounted: function mounted() {
    this.generateYearDashboard();
    this.getLocation(null, this.allYear);
    this.getStatusNOE(this.allYear);
    this.getStatusNOD(this.allYear);
    this.getStatusTimeNOE();
    this.getStatusTimeNOD(this.allYear);
    this.getDeviationLevel(this.allYear);
    this.getLevelNoe();
    this.getCategoryBets();
    this.getStatusNoeNod();
    this.getAvarageData();
    this.getReportData();
    this.hideLoading();
    this.getDelayOntimeData();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/vendor/libs/perfect-scrollbar/PerfectScrollbar.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/src/vendor/libs/perfect-scrollbar/PerfectScrollbar.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var perfect_scrollbar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! perfect-scrollbar */ "./node_modules/perfect-scrollbar/dist/perfect-scrollbar.esm.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'perfect-scrollbar',
  props: {
    options: {
      "default": function _default() {}
    }
  },
  mounted: function mounted() {
    this.$ps = new perfect_scrollbar__WEBPACK_IMPORTED_MODULE_0__["default"](this.$el, this.options);
  },
  beforeDestroy: function beforeDestroy() {
    if (!this.$ps) return;
    this.$ps.destroy();
    this.$ps = null;
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/main/Dashboard.vue?vue&type=template&id=2b6a625a&":
/*!***************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/src/components/backend/main/Dashboard.vue?vue&type=template&id=2b6a625a& ***!
  \***************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", [_c("div", {
    staticClass: "row"
  }, [_c("h4", {
    staticClass: "font-weight-bold py-3 mb-4"
  }, [_vm._v("\n      Dashboard\n      "), _c("div", {
    staticClass: "text-muted text-tiny mt-1"
  }, [_c("small", {
    staticClass: "font-weight-normal"
  }, [_vm._v(_vm._s(_vm.date))])])])]), _vm._v(" "), _vm.idDepartment == 67 && _vm.accessTable[0] ? _c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "col-4"
  }, [_c("b-card", {
    staticClass: "mb-4",
    attrs: {
      "no-body": ""
    }
  }, [_c("b-card-header", {
    staticClass: "with-elements",
    attrs: {
      "header-tag": "h6"
    }
  }, [_c("div", {
    staticClass: "col-md-4"
  }, [_c("div", {
    staticClass: "card-header-title-report"
  }, [_vm._v("Total NOE")]), _vm._v(" "), _c("div", {
    staticClass: "card-child-title"
  }, [_vm._v("\n              " + _vm._s(_vm.dataNoe.total_laporan) + "\n            ")])]), _vm._v(" "), _c("div", {
    staticClass: "col-md-4"
  }, [_c("div", {
    staticClass: "card-header-title-report text-danger"
  }, [_vm._v("NOE Open")]), _vm._v(" "), _c("div", {
    staticClass: "card-child-title text-danger"
  }, [_vm._v("\n              " + _vm._s(_vm.dataNoe.is_open_laporan) + "\n            ")])]), _vm._v(" "), _c("div", {
    staticClass: "col-md-4"
  }, [_c("div", {
    staticClass: "card-header-title-report text-success"
  }, [_vm._v("NOE Closed")]), _vm._v(" "), _c("div", {
    staticClass: "card-child-title text-success"
  }, [_vm._v("\n              " + _vm._s(_vm.dataNoe.is_closed_laporan) + "\n            ")])])])], 1)], 1), _vm._v(" "), _c("div", {
    staticClass: "col-4"
  }, [_c("b-card", {
    staticClass: "mb-4",
    attrs: {
      "no-body": ""
    }
  }, [_c("b-card-header", {
    staticClass: "with-elements",
    attrs: {
      "header-tag": "h6"
    }
  }, [_c("div", {
    staticClass: "col-md-4"
  }, [_c("div", {
    staticClass: "card-header-title-report"
  }, [_vm._v("Total NOD")]), _vm._v(" "), _c("div", {
    staticClass: "card-child-title"
  }, [_vm._v("\n              " + _vm._s(_vm.dataNod.total_laporan_nod) + "\n            ")])]), _vm._v(" "), _c("div", {
    staticClass: "col-md-4"
  }, [_c("div", {
    staticClass: "card-header-title-report text-danger"
  }, [_vm._v("NOD Open")]), _vm._v(" "), _c("div", {
    staticClass: "card-child-title text-danger"
  }, [_vm._v("\n              " + _vm._s(_vm.dataNod.is_open_laporan_nod) + "\n            ")])]), _vm._v(" "), _c("div", {
    staticClass: "col-md-4"
  }, [_c("div", {
    staticClass: "card-header-title-report text-success"
  }, [_vm._v("NOD Closed")]), _vm._v(" "), _c("div", {
    staticClass: "card-child-title text-success"
  }, [_vm._v("\n              " + _vm._s(_vm.dataNod.is_closed_laporan_nod) + "\n            ")])])])], 1)], 1), _vm._v(" "), _c("div", {
    staticClass: "col-4"
  }, [_c("b-card", {
    staticClass: "mb-4",
    attrs: {
      "no-body": ""
    }
  }, [_c("b-card-header", {
    staticClass: "with-elements",
    attrs: {
      "header-tag": "h6"
    }
  }, [_c("div", {
    staticClass: "col-md-6"
  }, [_c("div", {
    staticClass: "card-header-title-report"
  }, [_vm._v("NOE Drafting")]), _vm._v(" "), _c("div", {
    staticClass: "card-child-title"
  }, [_vm._v("\n              " + _vm._s(_vm.dataNoe.is_ongoing_laporan) + "\n            ")])]), _vm._v(" "), _c("div", {
    staticClass: "col-md-6"
  }, [_c("div", {
    staticClass: "card-header-title-report"
  }, [_vm._v("NOD Drafting")]), _vm._v(" "), _c("div", {
    staticClass: "card-child-title"
  }, [_vm._v("\n              " + _vm._s(_vm.dataNod.is_ongoing_laporan_nod) + "\n            ")])])])], 1)], 1)]) : _vm._e(), _vm._v(" "), _vm.accessTable[6] ? _c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "col-md-12"
  }, [_c("b-card", {
    staticClass: "mb-4",
    attrs: {
      "no-body": ""
    }
  }, [_c("b-card-header", {
    staticClass: "with-elements",
    attrs: {
      "header-tag": "h6"
    }
  }, [_c("div", {
    staticClass: "card-header-title"
  }, [_vm._v("Pareto Chart by Unit")]), _vm._v(" "), _c("b-row", {
    staticClass: "card-header-elements ml-auto"
  }, [_c("b-col", {
    attrs: {
      cols: "auto"
    }
  }, [_c("multiselect", {
    attrs: {
      options: _vm.opsYear,
      "allow-empty": true,
      placeholder: "Pilih Tahun",
      label: "text",
      "track-by": "text"
    },
    on: {
      input: _vm.onChangeUnitPareto
    },
    model: {
      value: _vm.ParetoChartYear,
      callback: function callback($$v) {
        _vm.ParetoChartYear = $$v;
      },
      expression: "ParetoChartYear"
    }
  })], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      cols: "auto"
    }
  }, [_c("b-btn", {
    staticClass: "btn-md icon-btn md-btn-flat",
    attrs: {
      variant: "outline-primary"
    },
    on: {
      click: function click($event) {
        return _vm.getLocation("pareto");
      }
    }
  }, [_c("i", {
    staticClass: "ion ion-md-sync"
  })])], 1)], 1)], 1), _vm._v(" "), _c("div", {
    staticClass: "py-4 px-3 mt-3",
    attrs: {
      id: "chart-container"
    }
  }, [_c("fusioncharts", {
    attrs: {
      type: _vm.type,
      width: _vm.width,
      height: _vm.height,
      dataformat: _vm.dataFormat,
      dataSource: _vm.dataSource
    }
  })], 1)], 1)], 1)]) : _vm._e(), _vm._v(" "), _vm.idDepartment == 67 && _vm.accessTable[0] ? _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-4 float-right"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Departemen")]), _vm._v(" "), _c("multiselect", {
    attrs: {
      options: _vm.opsDepartment,
      "allow-empty": false,
      placeholder: "Pilih Department",
      label: "Department",
      "track-by": "Department"
    },
    on: {
      input: _vm.onChangeDept
    },
    model: {
      value: _vm.Department,
      callback: function callback($$v) {
        _vm.Department = $$v;
      },
      expression: "Department"
    }
  })], 1), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-2 float-right"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Tahun")]), _vm._v(" "), _c("multiselect", {
    attrs: {
      options: _vm.opsYear,
      "allow-empty": false,
      placeholder: "Pilih Tahun",
      selectLabel: "",
      deselectLabel: "",
      label: "text",
      "track-by": "text"
    },
    on: {
      input: _vm.onChangeAllYear
    },
    model: {
      value: _vm.allYear,
      callback: function callback($$v) {
        _vm.allYear = $$v;
      },
      expression: "allYear"
    }
  })], 1)], 1) : _vm._e(), _vm._v(" "), _vm.idDepartment == 67 && _vm.accessTable[0] ? _c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "col-4"
  }, [_c("b-card", {
    staticClass: "mb-4",
    attrs: {
      "no-body": ""
    }
  }, [_c("b-card-header", {
    staticClass: "with-elements",
    attrs: {
      "header-tag": "h6"
    }
  }, [_c("div", {
    staticClass: "card-header-title"
  }, [_vm._v("Level NOE")])]), _vm._v(" "), _c("div", {
    staticClass: "mx-4 my-4"
  }, [_c("doughnut-chart", {
    attrs: {
      "chart-data": _vm.datacollection_level_noe
    }
  }), _vm._v(" "), _c("b-form-row", [_c("div", {
    staticClass: "col-xs-4"
  }, [_c("label", {
    staticStyle: {
      color: "#6adffc"
    }
  }, [_vm._v("Minor : " + _vm._s(_vm.rawDataLevel.minor))])]), _vm._v(" "), _c("div", {
    staticClass: "col-xs-4"
  }, [_c("label", {
    staticStyle: {
      color: "#ffb554"
    }
  }, [_vm._v("Major : " + _vm._s(_vm.rawDataLevel.major))])]), _vm._v(" "), _c("div", {
    staticClass: "col-xs-4"
  }, [_c("label", {
    staticStyle: {
      color: "#bdbbb9"
    }
  }, [_vm._v("Critical : " + _vm._s(_vm.rawDataLevel.critical))])])])], 1)], 1)], 1), _vm._v(" "), _c("div", {
    staticClass: "col-4"
  }, [_c("b-card", {
    staticClass: "mb-4",
    attrs: {
      "no-body": ""
    }
  }, [_c("b-card-header", {
    staticClass: "with-elements",
    attrs: {
      "header-tag": "h6"
    }
  }, [_c("div", {
    staticClass: "card-header-title"
  }, [_vm._v("Kategori NOE")])]), _vm._v(" "), _c("div", {
    staticClass: "mx-4 my-4"
  }, [_c("doughnut-chart", {
    attrs: {
      "chart-data": _vm.datacollection_bets_category
    }
  }), _vm._v(" "), _c("b-form-row", [_c("div", {
    staticClass: "col-xs-6"
  }, [_c("label", {
    staticStyle: {
      color: "#6adffc"
    }
  }, [_vm._v("Bets : " + _vm._s(_vm.rawDataBets.bets))])]), _vm._v(" "), _c("div", {
    staticClass: "col-xs-6"
  }, [_c("label", {
    staticStyle: {
      color: "#ffb554"
    }
  }, [_vm._v("NonBets : " + _vm._s(_vm.rawDataBets.nonBets))])])])], 1)], 1)], 1), _vm._v(" "), _c("div", {
    staticClass: "col-4"
  }, [_c("b-card", {
    staticClass: "mb-4",
    attrs: {
      "no-body": ""
    }
  }, [_c("b-card-header", {
    staticClass: "with-elements",
    attrs: {
      "header-tag": "h6"
    }
  }, [_c("div", {
    staticClass: "card-header-title"
  }, [_vm._v("Perhitungan Hari Approval (AVG)")])]), _vm._v(" "), _c("div", {
    staticClass: "mx-4 my-4"
  }, [_c("bar-chart", {
    attrs: {
      "chart-data": _vm.datacollection_perhitungan_hari
    }
  })], 1)], 1)], 1)]) : _vm._e(), _vm._v(" "), _vm.idDepartment == 67 && _vm.accessTable[0] ? _c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "col-6"
  }, [_c("b-card", {
    staticClass: "mb-4",
    attrs: {
      "no-body": ""
    }
  }, [_c("b-card-header", {
    staticClass: "with-elements",
    attrs: {
      "header-tag": "h6"
    }
  }, [_c("div", {
    staticClass: "card-header-title"
  }, [_vm._v(_vm._s(_vm.noeNodStatusReport.text) + " Report Completeness")]), _vm._v(" "), _c("b-row", {
    staticClass: "card-header-elements ml-auto"
  }, [_c("b-col", {
    attrs: {
      cols: "auto"
    }
  }, [_c("multiselect", {
    attrs: {
      options: _vm.opsStatusReport,
      "allow-empty": true,
      placeholder: "Pilih NOE/NOD",
      label: "text",
      "track-by": "text"
    },
    on: {
      input: _vm.onChangeStatusReport
    },
    model: {
      value: _vm.noeNodStatusReport,
      callback: function callback($$v) {
        _vm.noeNodStatusReport = $$v;
      },
      expression: "noeNodStatusReport"
    }
  })], 1)], 1)], 1), _vm._v(" "), _c("div", {
    staticClass: "mx-4 my-4"
  }, [_c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "col-md-6"
  }, [_c("p", {
    staticClass: "text-center"
  }, [_c("b", [_vm._v("Status Time Dept")])]), _vm._v(" "), _c("doughnut-chart", {
    attrs: {
      "chart-data": _vm.datacollection_data_timeDept
    }
  }), _vm._v(" "), _c("div", {
    staticClass: "row",
    staticStyle: {
      "justify-content": "center"
    }
  }, [_c("div", {
    staticClass: "col-xs-12"
  }, [_c("label", [_vm._v("Status Time Dept :")]), _vm._v(" "), _c("br"), _vm._v(" "), _c("label", {
    staticStyle: {
      color: "#ffb554"
    }
  }, [_vm._v("Ontime : " + _vm._s(_vm.rawDataTimeDept.onTime))]), _c("br"), _vm._v(" "), _c("label", {
    staticStyle: {
      color: "#3e95cd"
    }
  }, [_vm._v("Delay  : " + _vm._s(_vm.rawDataTimeDept.delay))])])])], 1), _vm._v(" "), _c("div", {
    staticClass: "col-md-6"
  }, [_c("p", {
    staticClass: "text-center"
  }, [_c("b", [_vm._v("Status Time QA")])]), _vm._v(" "), _c("doughnut-chart", {
    attrs: {
      "chart-data": _vm.datacollection_data_timeQa
    }
  }), _vm._v(" "), _c("div", {
    staticClass: "row",
    staticStyle: {
      "justify-content": "center"
    }
  }, [_c("div", {
    staticClass: "col-xs-12"
  }, [_c("label", [_vm._v("Status Time QA :")]), _vm._v(" "), _c("br"), _vm._v(" "), _c("label", {
    staticStyle: {
      color: "#ffb554"
    }
  }, [_vm._v("Ontime : " + _vm._s(_vm.rawDataTimeQa.onTime))]), _vm._v(" "), _c("br"), _vm._v(" "), _c("label", {
    staticStyle: {
      color: "#3e95cd"
    }
  }, [_vm._v("Delay  : " + _vm._s(_vm.rawDataTimeQa.delay))])])])], 1)])])], 1)], 1), _vm._v(" "), _c("div", {
    staticClass: "col-6"
  }, [_c("b-card", {
    staticClass: "mb-4",
    attrs: {
      "no-body": ""
    }
  }, [_c("b-card-header", {
    staticClass: "with-elements",
    attrs: {
      "header-tag": "h6"
    }
  }, [_c("div", {
    staticClass: "card-header-title"
  }, [_vm._v("NOE NOD status")]), _vm._v(" "), _c("b-row", {
    staticClass: "card-header-elements ml-auto"
  }, [_c("b-col", {
    attrs: {
      cols: "auto"
    }
  }, [_c("multiselect", {
    attrs: {
      options: _vm.opsStatus,
      "allow-empty": true,
      placeholder: "Pilih NOE/NOD",
      label: "text",
      "track-by": "text"
    },
    on: {
      input: _vm.onChangeStatus
    },
    model: {
      value: _vm.noeNodStatus,
      callback: function callback($$v) {
        _vm.noeNodStatus = $$v;
      },
      expression: "noeNodStatus"
    }
  })], 1)], 1)], 1), _vm._v(" "), _c("div", {
    staticClass: "mx-4 my-4"
  }, [_c("bar-chart", {
    attrs: {
      "chart-data": _vm.datacollection_noenod_status
    }
  })], 1)], 1)], 1)]) : _vm._e(), _vm._v(" "), _vm.accessTable[0] ? _c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "col-12"
  }, [_c("b-card", {
    staticClass: "mb-4",
    attrs: {
      "no-body": ""
    }
  }, [_c("b-card-header", {
    staticClass: "with-elements",
    attrs: {
      "header-tag": "h6"
    }
  }, [_c("div", {
    staticClass: "card-header-title"
  }, [_vm._v("Tabel Lokasi Kejadian")]), _vm._v(" "), _c("b-row", {
    staticClass: "card-header-elements ml-auto"
  }, [_c("b-col", {
    attrs: {
      cols: "auto"
    }
  }, [_c("multiselect", {
    attrs: {
      options: _vm.opsYear,
      "allow-empty": true,
      placeholder: "Pilih Tahun",
      label: "text",
      "track-by": "text"
    },
    on: {
      input: _vm.onChangeUnit
    },
    model: {
      value: _vm.unitYear,
      callback: function callback($$v) {
        _vm.unitYear = $$v;
      },
      expression: "unitYear"
    }
  })], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      cols: "auto"
    }
  }, [_c("b-btn", {
    staticClass: "btn-md icon-btn md-btn-flat",
    attrs: {
      variant: "outline-primary"
    },
    on: {
      click: function click($event) {
        return _vm.getLocation("tabel");
      }
    }
  }, [_c("i", {
    staticClass: "ion ion-md-sync"
  })])], 1)], 1)], 1), _vm._v(" "), _c("div", {
    staticClass: "table-responsive"
  }, [_c("table", {
    staticClass: "table table-striped table-bordered text-center th-text-middle b-t"
  }, [_c("thead", [_c("tr", [_c("th", {
    attrs: {
      rowspan: "2"
    }
  }, [_vm._v("Bulan")]), _vm._v(" "), _c("th", {
    attrs: {
      colspan: _vm.countHeaderUnit
    }
  }, [_vm._v("Unit")]), _vm._v(" "), _c("th", {
    attrs: {
      rowspan: "2"
    }
  }, [_vm._v("Total")]), _vm._v(" "), _c("th", {
    attrs: {
      rowspan: "2"
    }
  }, [_vm._v("%")])]), _vm._v(" "), _c("tr", _vm._l(_vm.headerUnit, function (item) {
    return _c("th", {
      key: item.Name
    }, [_vm._v(_vm._s(item.Name))]);
  }), 0)]), _vm._v(" "), _c("tbody", _vm._l(_vm.unitLocation, function (item, index) {
    return _c("tr", {
      key: index
    }, _vm._l(_vm.countHeaderUnit + 3, function (value) {
      return _c("td", [_vm._v(_vm._s(item[value - 1]))]);
    }), 0);
  }), 0)])])], 1)], 1)]) : _vm._e(), _vm._v(" "), _c("div", {
    staticClass: "row"
  }, [_vm.accessTable[1] ? _c("div", {
    staticClass: "col-md-6"
  }, [_c("b-card", {
    staticClass: "mb-4",
    attrs: {
      "no-body": ""
    }
  }, [_c("b-card-header", {
    staticClass: "with-elements",
    attrs: {
      "header-tag": "h6"
    }
  }, [_c("div", {
    staticClass: "card-header-title"
  }, [_vm._v("Tabel Status NOE")]), _vm._v(" "), _c("b-row", {
    staticClass: "card-header-elements ml-auto"
  }, [_c("b-col", {
    attrs: {
      cols: "auto"
    }
  }, [_c("multiselect", {
    attrs: {
      options: _vm.opsYear,
      "allow-empty": true,
      placeholder: "Pilih Tahun",
      label: "text",
      "track-by": "text"
    },
    on: {
      input: _vm.onChangeNOE
    },
    model: {
      value: _vm.NOEYear,
      callback: function callback($$v) {
        _vm.NOEYear = $$v;
      },
      expression: "NOEYear"
    }
  })], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      cols: "auto"
    }
  }, [_c("b-btn", {
    staticClass: "btn-md icon-btn md-btn-flat",
    attrs: {
      variant: "outline-primary"
    },
    on: {
      click: function click($event) {
        return _vm.getStatusNOE();
      }
    }
  }, [_c("i", {
    staticClass: "ion ion-md-sync"
  })])], 1)], 1)], 1), _vm._v(" "), _c("div", {
    staticClass: "table-responsive"
  }, [_c("table", {
    staticClass: "table table-striped table-bordered text-center th-text-middle b-t"
  }, [_c("thead", [_c("tr", [_c("th", {
    attrs: {
      rowspan: "2"
    }
  }, [_vm._v("Bulan")]), _vm._v(" "), _c("th", {
    attrs: {
      colspan: "2"
    }
  }, [_vm._v("Status NOE")]), _vm._v(" "), _c("th", {
    attrs: {
      rowspan: "2"
    }
  }, [_vm._v("Total")])]), _vm._v(" "), _c("tr", [_c("th", [_vm._v("Closed")]), _vm._v(" "), _c("th", [_vm._v("Open")])])]), _vm._v(" "), _c("tbody", _vm._l(_vm.statusNOE, function (item, index) {
    return _c("tr", {
      key: index
    }, [_c("td", [_vm._v(_vm._s(item[0]))]), _vm._v(" "), _c("td", [_vm._v(_vm._s(item[1]))]), _vm._v(" "), _c("td", [_vm._v(_vm._s(item[2]))]), _vm._v(" "), _c("td", [_vm._v(_vm._s(item[3]))])]);
  }), 0)])])], 1)], 1) : _vm._e(), _vm._v(" "), _vm.accessTable[2] ? _c("div", {
    staticClass: "col-md-6"
  }, [_c("b-card", {
    staticClass: "mb-4",
    attrs: {
      "no-body": ""
    }
  }, [_c("b-card-header", {
    staticClass: "with-elements",
    attrs: {
      "header-tag": "h6"
    }
  }, [_c("div", {
    staticClass: "card-header-title"
  }, [_vm._v("Tabel Status NOD")]), _vm._v(" "), _c("b-row", {
    staticClass: "card-header-elements ml-auto"
  }, [_c("b-col", {
    attrs: {
      cols: "auto"
    }
  }, [_c("multiselect", {
    attrs: {
      options: _vm.opsYear,
      "allow-empty": true,
      placeholder: "Pilih Tahun",
      label: "text",
      "track-by": "text"
    },
    on: {
      input: _vm.onChangeNOD
    },
    model: {
      value: _vm.NODYear,
      callback: function callback($$v) {
        _vm.NODYear = $$v;
      },
      expression: "NODYear"
    }
  })], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      cols: "auto"
    }
  }, [_c("b-btn", {
    staticClass: "btn-md icon-btn md-btn-flat",
    attrs: {
      variant: "outline-primary"
    },
    on: {
      click: function click($event) {
        return _vm.getStatusNOD();
      }
    }
  }, [_c("i", {
    staticClass: "ion ion-md-sync"
  })])], 1)], 1)], 1), _vm._v(" "), _c("div", {
    staticClass: "table-responsive"
  }, [_c("table", {
    staticClass: "table table-striped table-bordered text-center th-text-middle b-t"
  }, [_c("thead", [_c("tr", [_c("th", {
    attrs: {
      rowspan: "2"
    }
  }, [_vm._v("Bulan")]), _vm._v(" "), _c("th", {
    attrs: {
      colspan: "2"
    }
  }, [_vm._v("Status NOD")]), _vm._v(" "), _c("th", {
    attrs: {
      rowspan: "2"
    }
  }, [_vm._v("Total")])]), _vm._v(" "), _c("tr", [_c("th", [_vm._v("Closed")]), _vm._v(" "), _c("th", [_vm._v("Open")])])]), _vm._v(" "), _c("tbody", _vm._l(_vm.statusNOD, function (item, index) {
    return _c("tr", {
      key: index
    }, [_c("td", [_vm._v(_vm._s(item[0]))]), _vm._v(" "), _c("td", [_vm._v(_vm._s(item[1]))]), _vm._v(" "), _c("td", [_vm._v(_vm._s(item[2]))]), _vm._v(" "), _c("td", [_vm._v(_vm._s(item[3]))])]);
  }), 0)])])], 1)], 1) : _vm._e()]), _vm._v(" "), _c("div", {
    staticClass: "row"
  }, [_vm.accessTable[7] ? _c("div", {
    staticClass: "col-md-6"
  }, [_c("b-card", {
    staticClass: "mb-4",
    attrs: {
      "no-body": ""
    }
  }, [_c("b-card-header", {
    staticClass: "with-elements",
    attrs: {
      "header-tag": "h6"
    }
  }, [_c("div", {
    staticClass: "card-header-title"
  }, [_vm._v("Tabel Status Waktu NOE")]), _vm._v(" "), _c("b-row", {
    staticClass: "card-header-elements ml-auto"
  }, [_c("b-col", {
    attrs: {
      cols: "auto"
    }
  }, [_c("multiselect", {
    attrs: {
      options: _vm.opsYear,
      "allow-empty": true,
      placeholder: "Pilih Tahun",
      label: "text",
      "track-by": "text"
    },
    on: {
      input: _vm.onChangeTimeNOE
    },
    model: {
      value: _vm.TimeNOEYear,
      callback: function callback($$v) {
        _vm.TimeNOEYear = $$v;
      },
      expression: "TimeNOEYear"
    }
  })], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      cols: "auto"
    }
  }, [_c("b-btn", {
    staticClass: "btn-md icon-btn md-btn-flat",
    attrs: {
      variant: "outline-primary"
    },
    on: {
      click: function click($event) {
        return _vm.getStatusTimeNOE();
      }
    }
  }, [_c("i", {
    staticClass: "ion ion-md-sync"
  })])], 1)], 1)], 1), _vm._v(" "), _c("div", {
    staticClass: "table-responsive"
  }, [_c("table", {
    staticClass: "table table-striped table-bordered text-center th-text-middle b-t"
  }, [_c("thead", [_c("tr", [_c("th", {
    attrs: {
      rowspan: "2"
    }
  }, [_vm._v("Bulan")]), _vm._v(" "), _c("th", {
    attrs: {
      colspan: "3"
    }
  }, [_vm._v("Dept. Pelapor")]), _vm._v(" "), _c("th", {
    attrs: {
      colspan: "2"
    }
  }, [_vm._v("Dept. QA")])]), _vm._v(" "), _c("tr", [_c("th", [_vm._v("On Going")]), _vm._v(" "), _c("th", [_vm._v("On Time")]), _vm._v(" "), _c("th", [_vm._v("Delay")]), _vm._v(" "), _c("th", [_vm._v("On Time")]), _vm._v(" "), _c("th", [_vm._v("Delay")])])]), _vm._v(" "), _c("tbody", _vm._l(_vm.statusTimeNOE, function (item, index) {
    return _c("tr", {
      key: index
    }, [_c("td", [_vm._v(_vm._s(item["month"]))]), _vm._v(" "), _c("td", [_vm._v(_vm._s(item["DeptGoing"]))]), _vm._v(" "), _c("td", [_vm._v(_vm._s(item["DeptOnTime"]))]), _vm._v(" "), _c("td", [_vm._v(_vm._s(item["DeptDelay"]))]), _vm._v(" "), _c("td", [_vm._v(_vm._s(item["QAOnTime"]))]), _vm._v(" "), _c("td", [_vm._v(_vm._s(item["QADelay"]))])]);
  }), 0), _vm._v(" "), _c("tfoot", [_c("tr", [_c("th", [_vm._v("TOTAL")]), _vm._v(" "), _c("td", [_vm._v(_vm._s(_vm.dataTimeNOE.countDG))]), _vm._v(" "), _c("td", [_vm._v(_vm._s(_vm.dataTimeNOE.countDOT))]), _vm._v(" "), _c("td", [_vm._v(_vm._s(_vm.dataTimeNOE.countDD))]), _vm._v(" "), _c("td", [_vm._v(_vm._s(_vm.dataTimeNOE.countQOT))]), _vm._v(" "), _c("td", [_vm._v(_vm._s(_vm.dataTimeNOE.countQD))])]), _vm._v(" "), _c("tr", [_c("th", [_vm._v("PERSEN (%)")]), _vm._v(" "), _c("td", [_vm._v(_vm._s(_vm.dataTimeNOE.percentDG) + " %")]), _vm._v(" "), _c("td", [_vm._v(_vm._s(_vm.dataTimeNOE.percentDOT) + " %")]), _vm._v(" "), _c("td", [_vm._v(_vm._s(_vm.dataTimeNOE.percentDD) + " %")]), _vm._v(" "), _c("td", [_vm._v(_vm._s(_vm.dataTimeNOE.percentQOT) + " %")]), _vm._v(" "), _c("td", [_vm._v(_vm._s(_vm.dataTimeNOE.percentQD) + " %")])])])])])], 1)], 1) : _vm._e(), _vm._v(" "), _vm.accessTable[8] ? _c("div", {
    staticClass: "col-md-6"
  }, [_c("b-card", {
    staticClass: "mb-4",
    attrs: {
      "no-body": ""
    }
  }, [_c("b-card-header", {
    staticClass: "with-elements",
    attrs: {
      "header-tag": "h6"
    }
  }, [_c("div", {
    staticClass: "card-header-title"
  }, [_vm._v("Tabel Status Waktu NOD")]), _vm._v(" "), _c("b-row", {
    staticClass: "card-header-elements ml-auto"
  }, [_c("b-col", {
    attrs: {
      cols: "auto"
    }
  }, [_c("multiselect", {
    attrs: {
      options: _vm.opsYear,
      "allow-empty": true,
      placeholder: "Pilih Tahun",
      label: "text",
      "track-by": "text"
    },
    on: {
      input: _vm.onChangeTimeNOD
    },
    model: {
      value: _vm.TimeNODYear,
      callback: function callback($$v) {
        _vm.TimeNODYear = $$v;
      },
      expression: "TimeNODYear"
    }
  })], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      cols: "auto"
    }
  }, [_c("b-btn", {
    staticClass: "btn-md icon-btn md-btn-flat",
    attrs: {
      variant: "outline-primary"
    },
    on: {
      click: function click($event) {
        return _vm.getStatusTimeNOD();
      }
    }
  }, [_c("i", {
    staticClass: "ion ion-md-sync"
  })])], 1)], 1)], 1), _vm._v(" "), _c("div", {
    staticClass: "table-responsive"
  }, [_c("table", {
    staticClass: "table table-striped table-bordered text-center th-text-middle b-t"
  }, [_c("thead", [_c("tr", [_c("th", {
    attrs: {
      rowspan: "2"
    }
  }, [_vm._v("Bulan")]), _vm._v(" "), _c("th", {
    attrs: {
      colspan: "3"
    }
  }, [_vm._v("Dept. Pelapor")]), _vm._v(" "), _c("th", {
    attrs: {
      colspan: "2"
    }
  }, [_vm._v("Dept. QA")])]), _vm._v(" "), _c("tr", [_c("th", [_vm._v("On Going")]), _vm._v(" "), _c("th", [_vm._v("On Time")]), _vm._v(" "), _c("th", [_vm._v("Delay")]), _vm._v(" "), _c("th", [_vm._v("On Time")]), _vm._v(" "), _c("th", [_vm._v("Delay")])])]), _vm._v(" "), _c("tbody", _vm._l(_vm.statusTimeNOD, function (item, index) {
    return _c("tr", {
      key: index
    }, [_c("td", [_vm._v(_vm._s(item["month"]))]), _vm._v(" "), _c("td", [_vm._v(_vm._s(item["DeptGoing"]))]), _vm._v(" "), _c("td", [_vm._v(_vm._s(item["DeptOnTime"]))]), _vm._v(" "), _c("td", [_vm._v(_vm._s(item["DeptDelay"]))]), _vm._v(" "), _c("td", [_vm._v(_vm._s(item["QAOnTime"]))]), _vm._v(" "), _c("td", [_vm._v(_vm._s(item["QADelay"]))])]);
  }), 0), _vm._v(" "), _c("tfoot", [_c("tr", [_c("th", [_vm._v("TOTAL")]), _vm._v(" "), _c("td", [_vm._v(_vm._s(_vm.dataTimeNOD.countDG))]), _vm._v(" "), _c("td", [_vm._v(_vm._s(_vm.dataTimeNOD.countDOT))]), _vm._v(" "), _c("td", [_vm._v(_vm._s(_vm.dataTimeNOD.countDD))]), _vm._v(" "), _c("td", [_vm._v(_vm._s(_vm.dataTimeNOD.countQOT))]), _vm._v(" "), _c("td", [_vm._v(_vm._s(_vm.dataTimeNOD.countQD))])]), _vm._v(" "), _c("tr", [_c("th", [_vm._v("PERSEN (%)")]), _vm._v(" "), _c("td", [_vm._v(_vm._s(_vm.dataTimeNOD.percentDG) + " %")]), _vm._v(" "), _c("td", [_vm._v(_vm._s(_vm.dataTimeNOD.percentDOT) + " %")]), _vm._v(" "), _c("td", [_vm._v(_vm._s(_vm.dataTimeNOD.percentDD) + " %")]), _vm._v(" "), _c("td", [_vm._v(_vm._s(_vm.dataTimeNOD.percentQOT) + " %")]), _vm._v(" "), _c("td", [_vm._v(_vm._s(_vm.dataTimeNOD.percentQD) + " %")])])])])])], 1)], 1) : _vm._e()]), _vm._v(" "), _c("div", {
    staticClass: "row"
  }, [_vm.accessTable[3] ? _c("div", {
    staticClass: "col-md-12"
  }, [_c("b-card", {
    staticClass: "mb-4",
    attrs: {
      "no-body": ""
    }
  }, [_c("b-card-header", {
    staticClass: "with-elements",
    attrs: {
      "header-tag": "h6"
    }
  }, [_c("div", {
    staticClass: "card-header-title"
  }, [_vm._v("Tabel Level Deviasi")]), _vm._v(" "), _c("b-row", {
    staticClass: "card-header-elements ml-auto"
  }, [_c("b-col", {
    attrs: {
      cols: "auto"
    }
  }, [_c("multiselect", {
    attrs: {
      options: _vm.opsYear,
      "allow-empty": true,
      placeholder: "Pilih Tahun",
      label: "text",
      "track-by": "text"
    },
    on: {
      input: _vm.onChangeDeviation
    },
    model: {
      value: _vm.DeviationYear,
      callback: function callback($$v) {
        _vm.DeviationYear = $$v;
      },
      expression: "DeviationYear"
    }
  })], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      cols: "auto"
    }
  }, [_c("b-btn", {
    staticClass: "btn-md icon-btn md-btn-flat",
    attrs: {
      variant: "outline-primary"
    },
    on: {
      click: function click($event) {
        return _vm.getDeviationLevel();
      }
    }
  }, [_c("i", {
    staticClass: "ion ion-md-sync"
  })])], 1)], 1)], 1), _vm._v(" "), _c("div", {
    staticClass: "table-responsive"
  }, [_c("table", {
    staticClass: "table table-striped table-bordered text-center th-text-middle b-t"
  }, [_c("thead", [_c("tr", [_c("th", {
    attrs: {
      rowspan: "2"
    }
  }, [_vm._v("Bulan")]), _vm._v(" "), _c("th", {
    attrs: {
      colspan: _vm.countHeaderDeviation
    }
  }, [_vm._v("Level")]), _vm._v(" "), _c("th", {
    attrs: {
      rowspan: "2"
    }
  }, [_vm._v("Total")])]), _vm._v(" "), _c("tr", _vm._l(_vm.headerDeviation, function (item) {
    return _c("th", {
      key: item.Level
    }, [_vm._v(_vm._s(item.Level))]);
  }), 0)]), _vm._v(" "), _c("tbody", _vm._l(_vm.deviationLevel, function (item, index) {
    return _c("tr", {
      key: index
    }, _vm._l(_vm.countHeaderDeviation + 2, function (value) {
      return _c("td", [_vm._v(_vm._s(item[value - 1]))]);
    }), 0);
  }), 0)])])], 1)], 1) : _vm._e()]), _vm._v(" "), _c("div", {
    staticClass: "row"
  }, [_vm.accessTable[4] ? _c("div", {
    staticClass: "col-md-12"
  }, [_c("b-card", {
    staticClass: "mb-4",
    attrs: {
      "no-body": ""
    }
  }, [_c("b-card-header", {
    staticClass: "with-elements",
    attrs: {
      "header-tag": "h6"
    }
  }, [_c("div", {
    staticClass: "card-header-title"
  }, [_vm._v("Unit by Unit")]), _vm._v(" "), _c("b-row", {
    staticClass: "card-header-elements ml-auto"
  }, [_c("b-col", {
    attrs: {
      cols: "auto"
    }
  }, [_c("multiselect", {
    attrs: {
      options: _vm.opsYear,
      "allow-empty": true,
      placeholder: "Pilih Tahun",
      label: "text",
      "track-by": "text"
    },
    on: {
      input: _vm.onChangeUnitChart
    },
    model: {
      value: _vm.UnitChartYear,
      callback: function callback($$v) {
        _vm.UnitChartYear = $$v;
      },
      expression: "UnitChartYear"
    }
  })], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      cols: "auto"
    }
  }, [_c("b-btn", {
    staticClass: "btn-md icon-btn md-btn-flat",
    attrs: {
      variant: "outline-primary"
    },
    on: {
      click: function click($event) {
        return _vm.getLocation("chart");
      }
    }
  }, [_c("i", {
    staticClass: "ion ion-md-sync"
  })])], 1)], 1)], 1), _vm._v(" "), _c("div", {
    staticClass: "py-4 px-3"
  }, [_c("pie-chart", {
    attrs: {
      "chart-data": _vm.datacollection_pie,
      height: 500
    }
  })], 1)], 1)], 1) : _vm._e()]), _vm._v(" "), _vm.accessTable[5] ? _c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "col-12"
  }, [_c("b-card", {
    staticClass: "mb-4",
    attrs: {
      "no-body": ""
    }
  }, [_c("b-card-header", {
    staticClass: "with-elements",
    attrs: {
      "header-tag": "h6"
    }
  }, [_c("div", {
    staticClass: "card-header-title"
  }, [_vm._v("Tabel Unit Sort")]), _vm._v(" "), _c("b-row", {
    staticClass: "card-header-elements ml-auto"
  }, [_c("b-col", {
    attrs: {
      cols: "auto"
    }
  }, [_c("multiselect", {
    attrs: {
      options: _vm.opsYear,
      "allow-empty": true,
      placeholder: "Pilih Tahun",
      label: "text",
      "track-by": "text"
    },
    on: {
      input: _vm.onChangeUnitSort
    },
    model: {
      value: _vm.UnitSortYear,
      callback: function callback($$v) {
        _vm.UnitSortYear = $$v;
      },
      expression: "UnitSortYear"
    }
  })], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      cols: "auto"
    }
  }, [_c("b-btn", {
    staticClass: "btn-md icon-btn md-btn-flat",
    attrs: {
      variant: "outline-primary"
    },
    on: {
      click: function click($event) {
        return _vm.getLocation("sort");
      }
    }
  }, [_c("i", {
    staticClass: "ion ion-md-sync"
  })])], 1)], 1)], 1), _vm._v(" "), _c("div", {
    staticClass: "table-responsive"
  }, [_c("table", {
    staticClass: "table table-striped table-bordered text-center th-text-middle b-t"
  }, [_c("thead", [_c("tr", [_c("th", [_vm._v("Unit")]), _vm._v(" "), _c("th", [_vm._v("Total")]), _vm._v(" "), _c("th", [_vm._v("Sort Unit")]), _vm._v(" "), _c("th", [_vm._v("Sort Total")]), _vm._v(" "), _c("th", [_vm._v("Persentase (%)")]), _vm._v(" "), _c("th", [_vm._v("Kumulatif (%)")])])]), _vm._v(" "), _c("tbody", _vm._l(_vm.valUnitLocationSort, function (item, index) {
    return _c("tr", {
      key: index
    }, _vm._l(item, function (value) {
      return _c("td", [_vm._v(_vm._s(value))]);
    }), 0);
  }), 0)])])], 1)], 1)]) : _vm._e()], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/vendor/libs/perfect-scrollbar/PerfectScrollbar.vue?vue&type=template&id=1da31c2b&":
/*!****************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/src/vendor/libs/perfect-scrollbar/PerfectScrollbar.vue?vue&type=template&id=1da31c2b& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", [_vm._t("default")], 2);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./resources/assets/src/components/backend/main/Dashboard.vue":
/*!********************************************************************!*\
  !*** ./resources/assets/src/components/backend/main/Dashboard.vue ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Dashboard_vue_vue_type_template_id_2b6a625a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dashboard.vue?vue&type=template&id=2b6a625a& */ "./resources/assets/src/components/backend/main/Dashboard.vue?vue&type=template&id=2b6a625a&");
/* harmony import */ var _Dashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Dashboard.vue?vue&type=script&lang=js& */ "./resources/assets/src/components/backend/main/Dashboard.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Dashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Dashboard_vue_vue_type_template_id_2b6a625a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Dashboard_vue_vue_type_template_id_2b6a625a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/src/components/backend/main/Dashboard.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/src/components/backend/main/Dashboard.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/main/Dashboard.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Dashboard.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/main/Dashboard.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/src/components/backend/main/Dashboard.vue?vue&type=template&id=2b6a625a&":
/*!***************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/main/Dashboard.vue?vue&type=template&id=2b6a625a& ***!
  \***************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_template_id_2b6a625a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Dashboard.vue?vue&type=template&id=2b6a625a& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/main/Dashboard.vue?vue&type=template&id=2b6a625a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_template_id_2b6a625a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_template_id_2b6a625a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/src/vendor/libs/perfect-scrollbar/PerfectScrollbar.vue":
/*!*********************************************************************************!*\
  !*** ./resources/assets/src/vendor/libs/perfect-scrollbar/PerfectScrollbar.vue ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PerfectScrollbar_vue_vue_type_template_id_1da31c2b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PerfectScrollbar.vue?vue&type=template&id=1da31c2b& */ "./resources/assets/src/vendor/libs/perfect-scrollbar/PerfectScrollbar.vue?vue&type=template&id=1da31c2b&");
/* harmony import */ var _PerfectScrollbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PerfectScrollbar.vue?vue&type=script&lang=js& */ "./resources/assets/src/vendor/libs/perfect-scrollbar/PerfectScrollbar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _perfect_scrollbar_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./perfect-scrollbar.scss?vue&type=style&index=0&lang=scss& */ "./resources/assets/src/vendor/libs/perfect-scrollbar/perfect-scrollbar.scss?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _PerfectScrollbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PerfectScrollbar_vue_vue_type_template_id_1da31c2b___WEBPACK_IMPORTED_MODULE_0__["render"],
  _PerfectScrollbar_vue_vue_type_template_id_1da31c2b___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/src/vendor/libs/perfect-scrollbar/PerfectScrollbar.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/src/vendor/libs/perfect-scrollbar/PerfectScrollbar.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************!*\
  !*** ./resources/assets/src/vendor/libs/perfect-scrollbar/PerfectScrollbar.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PerfectScrollbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./PerfectScrollbar.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/vendor/libs/perfect-scrollbar/PerfectScrollbar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PerfectScrollbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/src/vendor/libs/perfect-scrollbar/PerfectScrollbar.vue?vue&type=template&id=1da31c2b&":
/*!****************************************************************************************************************!*\
  !*** ./resources/assets/src/vendor/libs/perfect-scrollbar/PerfectScrollbar.vue?vue&type=template&id=1da31c2b& ***!
  \****************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_PerfectScrollbar_vue_vue_type_template_id_1da31c2b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./PerfectScrollbar.vue?vue&type=template&id=1da31c2b& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/vendor/libs/perfect-scrollbar/PerfectScrollbar.vue?vue&type=template&id=1da31c2b&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_PerfectScrollbar_vue_vue_type_template_id_1da31c2b___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_PerfectScrollbar_vue_vue_type_template_id_1da31c2b___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
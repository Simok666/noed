(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[109],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/noe/noe-report/form.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/src/components/backend/noe/noe-report/form.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************/
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
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


// import VueDatepicker from 'vue-datepicker';



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'form-noe-report',
  metaInfo: {
    title: 'Form NOE Report'
  },
  components: {
    MaskedInput: vue_text_mask__WEBPACK_IMPORTED_MODULE_1___default.a,
    VueDatePicker: _mathieustan_vue_datepicker__WEBPACK_IMPORTED_MODULE_2__["VueDatePicker"]
  },
  data: function data() {
    return {
      urlSubmit: '/AdminVue/noe-report-insert',
      headerCard: 'Laporan Kejadian NOE',
      textBtnSubmit: 'Simpan',
      field: {
        EventFile: [],
        CorrectiveActionFile: [],
        Date: moment__WEBPACK_IMPORTED_MODULE_0___default()(new Date()).format('YYYY-MM-DD'),
        // Date: null,
        FileEventDownload: [],
        FileCorrectiveActionDownload: [],
        Time: '09:00',
        dueDate: moment__WEBPACK_IMPORTED_MODULE_0___default()(new Date()).format('YYYY-MM-DD'),
        dueTime: '09:00',
        Dept: '',
        Lampiran: ''
      },
      HistoryCorrectionData: [],
      getCorrectorData: [],
      allErrors: [],
      isNotif: false,
      isEdit: false,
      alertNotif: '',
      alertVariant: 'alert-dark-danger',
      opsProduct: [],
      opsLocation: [],
      opsTypeIncident: [],
      opsPublish: [],
      OldEventFile: [],
      OldCorrectiveActionFile: [],
      isAnswered: false,
      valStatus: 0,
      isShow: false,
      isComment: false,
      isTypeUser: false,
      isChildToAnswer: false,
      isNOEAcc: false,
      BaseUrl: "/",
      isButton: false,
      dateFormat: 'DD.MM.YYYY',
      locale: {
        lang: 'en'
      },
      noBets: '',
      noControl: '',
      deptStatus: false,
      checkAnswer: false,
      showMore: false,
      isCorrection: false,
      maxVisibleItems: 2
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
      var _this = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var formData, incidentArr, i, file, n, _file, config;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _this.showLoading();
              formData = new FormData();
              formData.append("Id", _this.field.Id);
              formData.append("NOENumber", _this.field.NOENumber);
              formData.append("Date", _this.field.Date);
              if (_this.field.Time) formData.append("Time", _this.field.Time);
              formData.append("BatchNo", _this.field.BatchNo);
              if (_this.field.IdProduct) formData.append("IdProduct", _this.field.IdProduct.Id);
              if (_this.field.IdLocation) formData.append("IdLocation", _this.field.IdLocation.Id);
              incidentArr = [];
              if (_this.field.IdTypeIncident.Id !== undefined) {
                incidentArr.push(_this.field.IdTypeIncident);
                if (_this.field.IdTypeIncident) formData.append("IdTypeIncident", JSON.stringify(incidentArr));
              } else {
                if (_this.field.IdTypeIncident) formData.append("IdTypeIncident", JSON.stringify(_this.field.IdTypeIncident));
              }
              formData.append("Event", _this.field.Event);
              formData.append("CorrectiveAction", _this.field.CorrectiveAction);
              formData.append("DueDate", _this.field.dueDate);
              if (_this.field.dueTime) formData.append("DueTime", _this.field.dueTime);
              for (i = 0; i < _this.field.EventFile.length; i++) {
                file = _this.field.EventFile[i];
                formData.append('EventFile[' + i + ']', file);
              }
              formData.append("OldEventFile", JSON.stringify(_this.OldEventFile));
              for (n = 0; n < _this.field.CorrectiveActionFile.length; n++) {
                _file = _this.field.CorrectiveActionFile[n];
                formData.append('CorrectiveActionFile[' + n + ']', _file);
              }
              formData.append("OldCorrectiveActionFile", JSON.stringify(_this.OldCorrectiveActionFile));
              if (_this.field.IdPublish) formData.append("IdPublish", _this.field.IdPublish.Id);
              config = {
                headers: {
                  'content-type': 'multipart/form-data'
                }
              };
              axios.post(_this.urlSubmit, formData, config).then(function (res) {
                this.hideLoading();
                var resp = res.data;
                if (resp.status) {
                  this.$router.push({
                    name: 'noe/data-noe-report',
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
              }.bind(_this))["catch"](function (e) {
                console.log(e);
                if (e.response) {
                  // Handle HTTP response errors
                  console.error('HTTP Error Response:', e.response);
                  // You can access error.response.data, error.response.status, etc. here
                } else if (e.request) {
                  // Handle request error (e.g., no response received)
                  console.error('Request Error:', e.request);
                } else {
                  // Handle other errors
                  console.error('Error:', e.message);
                }
                this.isNotif = true;
                this.alertNotif = 'Invalid Server Side!';
                this.alertVariant = 'alert-dark-danger';
                this.scrollTop(0, 1000);
                this.hideLoading();
              }.bind(_this));
            case 22:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    },
    getData: function getData(Id) {
      axios.post('/AdminVue/noe-report-edit', {
        Id: Id
      }).then(function (res) {
        var resp = res.data;
        this.field = resp.data;
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
          if (this.field.Status == 'UnPublish') this.valStatus = 1;
          if (this.field.Status == 'Dilaporkan ke Unit Head') this.valStatus = 2;
          if (this.field.Status == 'Dilaporkan ke Sect Head') this.valStatus = 3;
          if (this.field.Status == 'Disetujui oleh Unit Head') this.valStatus = 4;
          if (this.field.Status == 'Disetujui oleh Sect Head') this.valStatus = 5;
          if (this.field.Status == 'Disetujui oleh Dept Head') this.valStatus = 6;
          if (this.field.Status == 'Disetujui oleh QA Sect.Head') this.valStatus = 7;
          if (this.field.Status == 'Disetujui oleh QA Dept.Head') this.valStatus = 8;
          if (this.field.Status == 'Ditolak') this.valStatus = 9;
        }
        if (resp.data.NOENumberAcc == null) {
          this.field.NOENumber = resp.data.NOENumber;
        } else {
          this.field.NOENumber = resp.data.NOENumberAcc;
          this.isNOEAcc = true;
        }
        this.isButton = resp.isButton;
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
    generateNumber: function generateNumber() {
      var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      axios.post('/AdminVue/noe-report-get-number', {
        Date: date
      }).then(function (res) {
        // this.field.NOENumber = res.data.data
        this.$set(this.field, 'NOENumber', res.data.data); // this.$set -> untuk merubah variabel dan value di field inputnya
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.field.NOENumber = '';
      }.bind(this));
    },
    getProduct: function getProduct() {
      axios.post('/AdminVue/noe-report-get-product').then(function (res) {
        this.opsProduct = res.data.data;
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.opsProduct = [];
      }.bind(this));
    },
    getIncident: function getIncident() {
      axios.post('/AdminVue/noe-report-get-incident').then(function (res) {
        this.opsTypeIncident = res.data.data;
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.opsTypeIncident = [];
      }.bind(this));
    },
    handleFileEvent: function handleFileEvent(files) {
      // console.log('FilePond Updated')
      // example of instance method call on pond reference
      this.field.EventFile = files.map(function (files) {
        return files.file;
      });
      // console.log( this.field.myFile )
    },

    handleRemoveEvent: function handleRemoveEvent(error, files) {
      var result = _typeof(files.source);
      if (this.isEdit == true && result === 'string') {
        var index = this.OldEventFile.indexOf(files.source.replace('/clouds', 'clouds'));
        this.OldEventFile.splice(index, 1);
      }
    },
    handleFileCorrective: function handleFileCorrective(files) {
      // console.log('FilePond Updated')
      // example of instance method call on pond reference
      this.field.CorrectiveActionFile = files.map(function (files) {
        return files.file;
      });
      // console.log( this.field.myFile )
    },

    handleRemoveCorrective: function handleRemoveCorrective(error, files) {
      var result = _typeof(files.source);
      if (this.isEdit == true && result === 'string') {
        var index = this.OldCorrectiveActionFile.indexOf(files.source.replace('/clouds', 'clouds'));
        this.OldCorrectiveActionFile.splice(index, 1);
      }
    },
    allowedDates: function allowedDates(date) {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      today = yyyy + '-' + mm + '-' + dd;
      return date <= today;
    },
    onControlBets: function onControlBets(value) {
      axios.post('/AdminVue/noe-report-get-location-bets', {
        Value: value
      }).then(function (res) {
        this.opsLocation = res.data.data;
      }.bind(this))["catch"](function (e) {
        console.log(e);
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
    backIndex: function backIndex() {
      this.$router.push('/RoleAdmin/noe/data-noe-report');
    },
    onAction: function onAction(action) {
      if (action == 'sendAnswer') {
        return this.sendAnswer('/AdminVue/noe-report-answer', this.field.NOENumber, this.field.Answer, this.$parent, true);
      }
      if (this.isCorrection == false) {
        if (action == 'publish') {
          this.publish('/AdminVue/noe-report-publish', this.field.Id, this.$parent, true);
        }
      } else {
        return this.showNotifCustom('notifications-danger', 'Forbidden Action', 'Harus isi jawaban dari pengkoreksi');
      }
    }
  },
  mounted: function mounted() {
    this.getProduct();
    // this.getLocation()
    this.getIncident();
    this.getPublish();
    if (this.$route.params.isFormEdit) {
      var Id = this.$route.params.Id;
      this.isEdit = true;
      if (Id) {
        this.getData(Id);
        this.field.Id = Id;
        this.urlSubmit = '/AdminVue/noe-report-update';
        this.textBtnSubmit = 'Simpan';
      }
    }
    if (this.$route.params.isShow) {
      this.isShow = this.$route.params.isShow;
      var Id = this.$route.params.Id;
      var number = this.field.NOENumber;
      if (Id) {
        this.getCorrectionData(Id);
        this.getData(Id);
        this.field.Id = Id;
      }
    }
    if (this.isEdit == false && this.isShow == false) this.generateNumber();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/noe/noe-report/form.vue?vue&type=template&id=46e12386&":
/*!********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/src/components/backend/noe/noe-report/form.vue?vue&type=template&id=46e12386& ***!
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
  }, [_vm.isNOEAcc == true ? _c("label", {
    staticClass: "form-label"
  }, [_vm._v("No. NOE")]) : _vm._e(), _vm._v(" "), _vm.isNOEAcc == false ? _c("label", {
    staticClass: "form-label"
  }, [_vm._v("No. DRAFT NOE")]) : _vm._e(), _vm._v(" "), _c("b-input", {
    ref: "iNOENumber",
    staticClass: "mb-1",
    attrs: {
      name: "NOENumber",
      state: _vm.allErrors.NOENumber ? false : null,
      readonly: "",
      required: ""
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
  }, [_vm._v("Tanggal / Waktu")]), _vm._v(" "), _vm.isShow == false ? _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]) : _vm._e(), _vm._v(" "), _c("b-input-group", [_c("VueDatePicker", {
    staticClass: "mb-1",
    attrs: {
      required: "",
      "allowed-dates": _vm.allowedDates,
      disabled: _vm.isShow,
      format: _vm.dateFormat,
      locale: _vm.locale
    },
    on: {
      input: function input($event) {
        return _vm.generateNumber(_vm.field.Date);
      }
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
  })], 1)], 1), _vm._v(" "), _vm.allErrors.Date ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.Date[0]))]) : _vm._e()], 1)], 1), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("No. Kontrol / No. Bets")]), _vm._v(" "), _vm.isShow == false ? _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]) : _vm._e(), _vm._v(" "), _c("b-input", {
    staticClass: "mb-1",
    attrs: {
      name: "BatchNo",
      state: _vm.allErrors.BatchNo ? false : null,
      required: "",
      readonly: _vm.isShow
    },
    on: {
      input: function input($event) {
        return _vm.onControlBets(_vm.field.BatchNo);
      }
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
  }, [_vm._v("Bahan / Produk Terkait")]), _vm._v(" "), _vm.isShow == false ? _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Dipilih")]) : _vm._e(), _vm._v(" "), _c("multiselect", {
    attrs: {
      options: _vm.opsProduct,
      "allow-empty": false,
      placeholder: "Pilih Bahan / Produk Terkait",
      label: "Product",
      "track-by": "Product",
      required: "",
      disabled: _vm.isShow
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
  }, [_vm._v("Lokasi Kejadian")]), _vm._v(" "), _vm.isShow == false ? _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Dipilih")]) : _vm._e(), _vm._v(" "), _c("multiselect", {
    attrs: {
      options: _vm.opsLocation,
      "allow-empty": false,
      placeholder: "Pilih Lokasi Kejadian",
      label: "Location",
      "track-by": "Location",
      required: "",
      disabled: _vm.isShow
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
  }, [_vm._v("Jenis Kejadian")]), _vm._v(" "), _vm.isShow == false ? _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Dipilih")]) : _vm._e(), _vm._v(" "), _c("multiselect", {
    attrs: {
      options: _vm.opsTypeIncident,
      "show-labels": false,
      placeholder: "Pilih Jenis Kejadian",
      label: "TypeIncident",
      "track-by": "TypeIncident",
      required: "",
      disabled: _vm.isShow
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
  }, [_vm._v("Uraian Kejadian")]), _vm._v(" "), _vm.isShow == false ? _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]) : _vm._e(), _vm._v(" "), _c("b-textarea", {
    staticClass: "mb-1",
    attrs: {
      name: "Event",
      state: _vm.allErrors.Event ? false : null,
      required: "",
      readonly: _vm.isShow
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
  }, [_vm._v(_vm._s(_vm.allErrors.Event[0]))]) : _vm._e()], 1), _vm._v(" "), _vm.isShow == false ? _c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", [_vm._v("Lampiran Uraian Kejadian")]), _vm._v(" "), _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi (Max. 100 MB)")]), _vm._v(" "), _c("file-pond", {
    ref: "pondMyFile",
    attrs: {
      name: "EventFile",
      "label-idle": "Lampiran : 1.Data Batch Record; 2.Buku Kronik; 3.Dokumentasi before/after perbaikan; 4.Lain-lain;",
      "allow-multiple": true,
      files: _vm.field.EventFile,
      "accepted-file-types": "application/*, image/*, video/*",
      maxTotalFileSize: "100MB",
      required: "",
      disabled: _vm.isShow
    },
    on: {
      updatefiles: _vm.handleFileEvent,
      removefile: _vm.handleRemoveEvent
    }
  })], 1) : _vm._e()], 1), _vm._v(" "), _vm.isShow == true ? _c("b-card", {
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
  }), 1)], 1) : _vm._e(), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Tindakan Koreksi yang Dilakukan")]), _vm._v(" "), _vm.isShow == false ? _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]) : _vm._e(), _vm._v(" "), _c("b-textarea", {
    staticClass: "mb-1",
    attrs: {
      name: "CorrectiveAction",
      state: _vm.allErrors.CorrectiveAction ? false : null,
      required: "",
      readonly: _vm.isShow
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
  }, [_vm._v(_vm._s(_vm.allErrors.CorrectiveAction[0]))]) : _vm._e()], 1), _vm._v(" "), _vm.isShow == false ? _c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", [_vm._v("Lampiran Tindakan Koreksi yang Dilakukan")]), _vm._v(" "), _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("(Max. 100 MB)")]), _vm._v(" "), _c("file-pond", {
    ref: "pondMyFile",
    attrs: {
      name: "CorrectiveActionFile",
      "label-idle": "Lampiran : 1.Data Batch Record; 2.Buku Kronik; 3.Dokumentasi before/after perbaikan; 4.Lain-lain;",
      "allow-multiple": true,
      files: _vm.field.CorrectiveActionFile,
      "accepted-file-types": "application/*, image/*, video/*",
      maxTotalFileSize: "100MB",
      disabled: _vm.isShow
    },
    on: {
      updatefiles: _vm.handleFileCorrective,
      removefile: _vm.handleRemoveCorrective
    }
  })], 1) : _vm._e()], 1), _vm._v(" "), _vm.isShow == true ? _c("b-card", {
    staticClass: "mb-3",
    attrs: {
      header: "Lampiran Tindakan Koreksi yang Dilakukan",
      "header-tag": "h5"
    }
  }, [_c("b-form-row", _vm._l(_vm.field.FileCorrectiveActionDownload, function (item, index) {
    return _vm.field.FileCorrectiveActionDownload && _vm.field.FileCorrectiveActionDownload.length ? _c("b-form-group", {
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
    })])])], 1)], 1) : _vm._e();
  }), 1)], 1) : _vm._e(), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Due Date Review")]), _vm._v(" "), _vm.isShow == false ? _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]) : _vm._e(), _vm._v(" "), _c("b-input-group", [_c("VueDatePicker", {
    staticClass: "mb-1",
    attrs: {
      required: "",
      disabled: _vm.isShow,
      format: _vm.dateFormat,
      locale: _vm.locale
    },
    on: {
      input: function input($event) {
        return _vm.generateNumber(_vm.field.dueDate);
      }
    },
    model: {
      value: _vm.field.dueDate,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "dueDate", $$v);
      },
      expression: "field.dueDate"
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
      value: _vm.field.dueTime,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "dueTime", $$v);
      },
      expression: "field.dueTime"
    }
  })], 1)], 1), _vm._v(" "), _vm.allErrors.dueDate ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.dueDate[0]))]) : _vm._e()], 1), _vm._v(" "), _c("b-form-group", {
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
  }, [_vm.isShow == true && _vm.valStatus == 1 && _vm.isButton ? _c("b-btn", {
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
  }, [_vm._v("Publish")]) : _vm._e(), _vm._v(" "), _vm.isShow == true && _vm.valStatus >= 2 && _vm.isButton ? _c("b-btn", {
    staticClass: "float-right ml-2",
    attrs: {
      variant: "success"
    }
  }, [_vm._v("Diajukan")]) : _vm._e(), _vm._v(" "), _vm.isShow == false ? _c("b-btn", {
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

/***/ "./node_modules/vue-text-mask/dist/vueTextMask.js":
/*!********************************************************!*\
  !*** ./node_modules/vue-text-mask/dist/vueTextMask.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():undefined}(this,function(){return function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.conformToMask=void 0;var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},i=r(2);Object.defineProperty(t,"conformToMask",{enumerable:!0,get:function(){return n(i).default}});var a=r(5),u=n(a);t.default={render:function(e){var t=this;return e("input",{ref:"input",domProps:{value:this.value},attrs:this.$attrs,on:Object.assign(o({},this.$listeners),{input:function(e){return t.updateValue(e.target.value)}})})},name:"masked-input",inheritAttrs:!1,props:{value:{type:String,required:!1,default:""},mask:{type:[Array,Function,Boolean,Object],required:!0},guide:{type:Boolean,required:!1},placeholderChar:{type:String,required:!1},keepCharPositions:{type:Boolean,required:!1},pipe:{type:Function,required:!1},showMask:{type:Boolean,required:!1}},mounted:function(){this.initMask()},methods:{createTextMaskInputElement:u.default,setTextMaskInputElement:function(){this.textMaskInputElement=this.createTextMaskInputElement(o({inputElement:this.$refs.input},this.$options.propsData))},initMask:function(){this.setTextMaskInputElement(),this.textMaskInputElement.update(this.value)},bind:function(){this.setTextMaskInputElement(),this.updateValue(this.value)},updateValue:function(e){this.textMaskInputElement.update(e),this.$emit("input",this.$refs.input.value)}},watch:{mask:function(e,t){this.mask!==t&&this.bind()},guide:function(){this.bind()},placeholderChar:function(){this.bind()},keepCharPositions:function(){this.bind()},pipe:function(){this.bind()},showMask:function(){this.bind()}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.placeholderChar="_",t.strFunction="function"},function(e,t,r){"use strict";function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:s,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:u,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!(0,i.isArray)(t)){if(("undefined"==typeof t?"undefined":o(t))!==a.strFunction)throw new Error("Text-mask:conformToMask; The mask property must be an array.");t=t(e,r),t=(0,i.processCaretTraps)(t).maskWithoutCaretTraps}var n=r.guide,l=void 0===n||n,f=r.previousConformedValue,d=void 0===f?s:f,c=r.placeholderChar,p=void 0===c?a.placeholderChar:c,h=r.placeholder,v=void 0===h?(0,i.convertMaskToPlaceholder)(t,p):h,m=r.currentCaretPosition,y=r.keepCharPositions,g=l===!1&&void 0!==d,b=e.length,k=d.length,C=v.length,x=t.length,P=b-k,M=P>0,T=m+(M?-P:0),O=T+Math.abs(P);if(y===!0&&!M){for(var w=s,S=T;S<O;S++)v[S]===p&&(w+=p);e=e.slice(0,T)+w+e.slice(T,b)}for(var j=e.split(s).map(function(e,t){return{char:e,isNew:t>=T&&t<O}}),V=b-1;V>=0;V--){var E=j[V].char;if(E!==p){var _=V>=T&&k===x;E===v[_?V-P:V]&&j.splice(V,1)}}var A=s,N=!1;e:for(var I=0;I<C;I++){var q=v[I];if(q===p){if(j.length>0)for(;j.length>0;){var F=j.shift(),$=F.char,B=F.isNew;if($===p&&g!==!0){A+=p;continue e}if(t[I].test($)){if(y===!0&&B!==!1&&d!==s&&l!==!1&&M){for(var R=j.length,J=null,W=0;W<R;W++){var L=j[W];if(L.char!==p&&L.isNew===!1)break;if(L.char===p){J=W;break}}null!==J?(A+=$,j.splice(J,1)):I--}else A+=$;continue e}N=!0}g===!1&&(A+=v.substr(I,C));break}A+=q}if(g&&M===!1){for(var D=null,z=0;z<A.length;z++)v[z]===p&&(D=z);A=null!==D?A.substr(0,D+1):s}return{conformedValue:A,meta:{someCharsRejected:N}}}Object.defineProperty(t,"__esModule",{value:!0});var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.default=n;var i=r(3),a=r(1),u=[],s=""},function(e,t,r){"use strict";function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:f,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:l.placeholderChar;if(!o(e))throw new Error("Text-mask:convertMaskToPlaceholder; The mask property must be an array.");if(e.indexOf(t)!==-1)throw new Error("Placeholder character must not be used as part of the mask. Please specify a character that is not present in your mask as your placeholder character.\n\n"+("The placeholder character that was received is: "+JSON.stringify(t)+"\n\n")+("The mask that was received is: "+JSON.stringify(e)));return e.map(function(e){return e instanceof RegExp?t:e}).join("")}function o(e){return Array.isArray&&Array.isArray(e)||e instanceof Array}function i(e){return"string"==typeof e||e instanceof String}function a(e){return"number"==typeof e&&void 0===e.length&&!isNaN(e)}function u(e){return"undefined"==typeof e||null===e}function s(e){for(var t=[],r=void 0;r=e.indexOf(d),r!==-1;)t.push(r),e.splice(r,1);return{maskWithoutCaretTraps:e,indexes:t}}Object.defineProperty(t,"__esModule",{value:!0}),t.convertMaskToPlaceholder=n,t.isArray=o,t.isString=i,t.isNumber=a,t.isNil=u,t.processCaretTraps=s;var l=r(1),f=[],d="[]"},function(e,t){"use strict";function r(e){var t=e.previousConformedValue,r=void 0===t?o:t,i=e.previousPlaceholder,a=void 0===i?o:i,u=e.currentCaretPosition,s=void 0===u?0:u,l=e.conformedValue,f=e.rawValue,d=e.placeholderChar,c=e.placeholder,p=e.indexesOfPipedChars,h=void 0===p?n:p,v=e.caretTrapIndexes,m=void 0===v?n:v;if(0===s||!f.length)return 0;var y=f.length,g=r.length,b=c.length,k=l.length,C=y-g,x=C>0,P=0===g,M=C>1&&!x&&!P;if(M)return s;var T=x&&(r===l||l===c),O=0,w=void 0,S=void 0;if(T)O=s-C;else{var j=l.toLowerCase(),V=f.toLowerCase(),E=V.substr(0,s).split(o),_=E.filter(function(e){return j.indexOf(e)!==-1});S=_[_.length-1];var A=a.substr(0,_.length).split(o).filter(function(e){return e!==d}).length,N=c.substr(0,_.length).split(o).filter(function(e){return e!==d}).length,I=N!==A,q=void 0!==a[_.length-1]&&void 0!==c[_.length-2]&&a[_.length-1]!==d&&a[_.length-1]!==c[_.length-1]&&a[_.length-1]===c[_.length-2];!x&&(I||q)&&A>0&&c.indexOf(S)>-1&&void 0!==f[s]&&(w=!0,S=f[s]);for(var F=h.map(function(e){return j[e]}),$=F.filter(function(e){return e===S}).length,B=_.filter(function(e){return e===S}).length,R=c.substr(0,c.indexOf(d)).split(o).filter(function(e,t){return e===S&&f[t]!==e}).length,J=R+B+$+(w?1:0),W=0,L=0;L<k;L++){var D=j[L];if(O=L+1,D===S&&W++,W>=J)break}}if(x){for(var z=O,G=O;G<=b;G++)if(c[G]===d&&(z=G),c[G]===d||m.indexOf(G)!==-1||G===b)return z}else if(w){for(var H=O-1;H>=0;H--)if(l[H]===S||m.indexOf(H)!==-1||0===H)return H}else for(var K=O;K>=0;K--)if(c[K-1]===d||m.indexOf(K)!==-1||0===K)return K}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r;var n=[],o=""},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e){var t={previousConformedValue:void 0,previousPlaceholder:void 0};return{state:t,update:function(r){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e,o=n.inputElement,l=n.mask,d=n.guide,m=n.pipe,g=n.placeholderChar,b=void 0===g?h.placeholderChar:g,k=n.keepCharPositions,C=void 0!==k&&k,x=n.showMask,P=void 0!==x&&x;if("undefined"==typeof r&&(r=o.value),r!==t.previousConformedValue){("undefined"==typeof l?"undefined":s(l))===y&&void 0!==l.pipe&&void 0!==l.mask&&(m=l.pipe,l=l.mask);var M=void 0,T=void 0;if(l instanceof Array&&(M=(0,p.convertMaskToPlaceholder)(l,b)),l!==!1){var O=a(r),w=o.selectionEnd,S=t.previousConformedValue,j=t.previousPlaceholder,V=void 0;if(("undefined"==typeof l?"undefined":s(l))===h.strFunction){if(T=l(O,{currentCaretPosition:w,previousConformedValue:S,placeholderChar:b}),T===!1)return;var E=(0,p.processCaretTraps)(T),_=E.maskWithoutCaretTraps,A=E.indexes;T=_,V=A,M=(0,p.convertMaskToPlaceholder)(T,b)}else T=l;var N={previousConformedValue:S,guide:d,placeholderChar:b,pipe:m,placeholder:M,currentCaretPosition:w,keepCharPositions:C},I=(0,c.default)(O,T,N),q=I.conformedValue,F=("undefined"==typeof m?"undefined":s(m))===h.strFunction,$={};F&&($=m(q,u({rawValue:O},N)),$===!1?$={value:S,rejected:!0}:(0,p.isString)($)&&($={value:$}));var B=F?$.value:q,R=(0,f.default)({previousConformedValue:S,previousPlaceholder:j,conformedValue:B,placeholder:M,rawValue:O,currentCaretPosition:w,placeholderChar:b,indexesOfPipedChars:$.indexesOfPipedChars,caretTrapIndexes:V}),J=B===M&&0===R,W=P?M:v,L=J?W:B;t.previousConformedValue=L,t.previousPlaceholder=M,o.value!==L&&(o.value=L,i(o,R))}}}}}function i(e,t){document.activeElement===e&&(g?b(function(){return e.setSelectionRange(t,t,m)},0):e.setSelectionRange(t,t,m))}function a(e){if((0,p.isString)(e))return e;if((0,p.isNumber)(e))return String(e);if(void 0===e||null===e)return v;throw new Error("The 'value' provided to Text Mask needs to be a string or a number. The value received was:\n\n "+JSON.stringify(e))}Object.defineProperty(t,"__esModule",{value:!0});var u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.default=o;var l=r(4),f=n(l),d=r(2),c=n(d),p=r(3),h=r(1),v="",m="none",y="object",g="undefined"!=typeof navigator&&/Android/i.test(navigator.userAgent),b="undefined"!=typeof requestAnimationFrame?requestAnimationFrame:setTimeout}])});

/***/ }),

/***/ "./resources/assets/src/components/backend/noe/noe-report/form.vue":
/*!*************************************************************************!*\
  !*** ./resources/assets/src/components/backend/noe/noe-report/form.vue ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _form_vue_vue_type_template_id_46e12386___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form.vue?vue&type=template&id=46e12386& */ "./resources/assets/src/components/backend/noe/noe-report/form.vue?vue&type=template&id=46e12386&");
/* harmony import */ var _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form.vue?vue&type=script&lang=js& */ "./resources/assets/src/components/backend/noe/noe-report/form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _form_vue_vue_type_template_id_46e12386___WEBPACK_IMPORTED_MODULE_0__["render"],
  _form_vue_vue_type_template_id_46e12386___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/src/components/backend/noe/noe-report/form.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/src/components/backend/noe/noe-report/form.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/noe/noe-report/form.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./form.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/noe/noe-report/form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/src/components/backend/noe/noe-report/form.vue?vue&type=template&id=46e12386&":
/*!********************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/noe/noe-report/form.vue?vue&type=template&id=46e12386& ***!
  \********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_46e12386___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./form.vue?vue&type=template&id=46e12386& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/src/components/backend/noe/noe-report/form.vue?vue&type=template&id=46e12386&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_46e12386___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_46e12386___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
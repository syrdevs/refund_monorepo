"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getReference = getReference;
exports.getColumns = getColumns;
exports.getData = getData;
exports.queryProjectNotice = queryProjectNotice;
exports.queryActivities = queryActivities;
exports.queryRule = queryRule;
exports.removeRule = removeRule;
exports.getList = getList;
exports.paymentsData = paymentsData;
exports.addRule = addRule;
exports.updateRule = updateRule;
exports.fakeSubmitForm = fakeSubmitForm;
exports.fakeChartData = fakeChartData;
exports.queryTags = queryTags;
exports.queryBasicProfile = queryBasicProfile;
exports.queryAdvancedProfile = queryAdvancedProfile;
exports.queryFakeList = queryFakeList;
exports.removeFakeList = removeFakeList;
exports.addFakeList = addFakeList;
exports.updateFakeList = updateFakeList;
exports.fakeAccountLogin = fakeAccountLogin;
exports.fakeRegister = fakeRegister;
exports.queryNotices = queryNotices;
exports.getFakeCaptcha = getFakeCaptcha;
exports.LoginUser = LoginUser;
exports.LogoutUser = LogoutUser;
exports.CheckToken = CheckToken;
exports.setRefundStatus = setRefundStatus;
exports.getmainViewTable = getmainViewTable;
exports.getmainViewColumn = getmainViewColumn;
exports.getRPMUTable = getRPMUTable;
exports.dAppRefundStatusAuto = dAppRefundStatusAuto;
exports.getMainModal = getMainModal;
exports.getMainSelect1 = getMainSelect1;
exports.getOptionsdata = getOptionsdata;
exports.saveOptionsdata = saveOptionsdata;
exports.getFilesRequest = getFilesRequest;
exports.deleteFileRequest = deleteFileRequest;
exports.setDateRefund = setDateRefund;
exports.setDateRequest = setDateRequest;
exports.setfile = setfile;
exports.getmt102file = getmt102file;
exports.mt102preview = mt102preview;
exports.getCalendarEvents = getCalendarEvents;
exports.saveCalendarEvents = saveCalendarEvents;
exports.removeCalendarEvents = removeCalendarEvents;
exports.getJournalData = getJournalData;
exports.getStaticticsData = getStaticticsData;
exports.getReceiversRefund = getReceiversRefund;
exports.getReportsList = getReportsList;
exports.getReportParameters = getReportParameters;
exports.getFormedReports = getFormedReports;
exports.getSearcherCalendar = getSearcherCalendar;
exports.getSearcherJurCalendar = getSearcherJurCalendar;
exports.getSearcherData = getSearcherData;
exports.getSearcherRPNData = getSearcherRPNData;
exports.getSearcherMEDData = getSearcherMEDData;
exports.getSearcherJur = getSearcherJur;
exports.getActDics = getActDics;
exports.saveObject = saveObject;
exports.getObject = getObject;
exports.createContractFromAgent = createContractFromAgent;
exports.createSubContract = createSubContract;
exports.createActForContract = createActForContract;
exports.uploadFile = uploadFile;
exports.deleteObject = deleteObject;
exports.getCommands = getCommands;
exports.getPublish = getPublish;

var _qs = require("qs");

var _request = _interopRequireDefault(require("../utils/request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function sleepF(ms) {
  var start = new Date().getTime();
  var end = start;

  while (end < start + ms) {
    end = new Date().getTime();
  }
}

function getReference(_x) {
  return _getReference.apply(this, arguments);
}

function _getReference() {
  _getReference = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(params) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", (0, _request.default)('/api/dictionaryListByName?name=' + params.code));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _getReference.apply(this, arguments);
}

function getColumns(_x2) {
  return _getColumns.apply(this, arguments);
}

function _getColumns() {
  _getColumns = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(params) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", (0, _request.default)("/apis/refund/".concat(params.payload.table, "column")));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _getColumns.apply(this, arguments);
}

function getData(_x3) {
  return _getData.apply(this, arguments);
}

function _getData() {
  _getData = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(params) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!(['payment', 'paymentcolumn', 'templates', 'journaldata', 'journal'].indexOf(params.payload.table) !== -1)) {
              _context3.next = 2;
              break;
            }

            return _context3.abrupt("return", (0, _request.default)("/apis/refund/".concat(params.payload.table, "data")));

          case 2:
            return _context3.abrupt("return", (0, _request.default)("/api/refund/".concat(params.payload.table), {
              method: 'POST',
              body: params.payload
            }));

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));
  return _getData.apply(this, arguments);
}

function queryProjectNotice() {
  return _queryProjectNotice.apply(this, arguments);
}

function _queryProjectNotice() {
  _queryProjectNotice = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4() {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", (0, _request.default)('/api/project/notice'));

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));
  return _queryProjectNotice.apply(this, arguments);
}

function queryActivities() {
  return _queryActivities.apply(this, arguments);
}

function _queryActivities() {
  _queryActivities = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5() {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            return _context5.abrupt("return", (0, _request.default)('/api/activities'));

          case 1:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));
  return _queryActivities.apply(this, arguments);
}

function queryRule(_x4) {
  return _queryRule.apply(this, arguments);
}

function _queryRule() {
  _queryRule = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(params) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            return _context6.abrupt("return", (0, _request.default)("/api/rule?".concat((0, _qs.stringify)(params))));

          case 1:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));
  return _queryRule.apply(this, arguments);
}

function removeRule(_x5) {
  return _removeRule.apply(this, arguments);
}

function _removeRule() {
  _removeRule = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(params) {
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            return _context7.abrupt("return", (0, _request.default)('/api/rule', {
              method: 'POST',
              body: _objectSpread({}, params, {
                method: 'delete'
              })
            }));

          case 1:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));
  return _removeRule.apply(this, arguments);
}

function getList(_x6) {
  return _getList.apply(this, arguments);
}

function _getList() {
  _getList = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8(params) {
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            return _context8.abrupt("return", (0, _request.default)('/api/uicommand/getList', {
              method: 'POST',
              body: params.payload
            }));

          case 1:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));
  return _getList.apply(this, arguments);
}

function paymentsData(_x7) {
  return _paymentsData.apply(this, arguments);
}

function _paymentsData() {
  _paymentsData = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee9(params) {
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            return _context9.abrupt("return", (0, _request.default)('/api/uicommand/getList', {
              method: 'POST',
              body: _objectSpread({}, params)
            }));

          case 1:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, this);
  }));
  return _paymentsData.apply(this, arguments);
}

function addRule(_x8) {
  return _addRule.apply(this, arguments);
}

function _addRule() {
  _addRule = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee10(params) {
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            return _context10.abrupt("return", (0, _request.default)('/api/rule', {
              method: 'POST',
              body: _objectSpread({}, params, {
                method: 'post'
              })
            }));

          case 1:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, this);
  }));
  return _addRule.apply(this, arguments);
}

function updateRule(_x9) {
  return _updateRule.apply(this, arguments);
}

function _updateRule() {
  _updateRule = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee11(params) {
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            return _context11.abrupt("return", (0, _request.default)('/api/rule', {
              method: 'POST',
              body: _objectSpread({}, params, {
                method: 'update'
              })
            }));

          case 1:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, this);
  }));
  return _updateRule.apply(this, arguments);
}

function fakeSubmitForm(_x10) {
  return _fakeSubmitForm.apply(this, arguments);
}

function _fakeSubmitForm() {
  _fakeSubmitForm = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee12(params) {
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            return _context12.abrupt("return", (0, _request.default)('/api/forms', {
              method: 'POST',
              body: params
            }));

          case 1:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, this);
  }));
  return _fakeSubmitForm.apply(this, arguments);
}

function fakeChartData() {
  return _fakeChartData.apply(this, arguments);
}

function _fakeChartData() {
  _fakeChartData = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee13() {
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            return _context13.abrupt("return", (0, _request.default)('/api/fake_chart_data'));

          case 1:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, this);
  }));
  return _fakeChartData.apply(this, arguments);
}

function queryTags() {
  return _queryTags.apply(this, arguments);
}

function _queryTags() {
  _queryTags = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee14() {
    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            return _context14.abrupt("return", (0, _request.default)('/api/tags'));

          case 1:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, this);
  }));
  return _queryTags.apply(this, arguments);
}

function queryBasicProfile() {
  return _queryBasicProfile.apply(this, arguments);
}

function _queryBasicProfile() {
  _queryBasicProfile = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee15() {
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            return _context15.abrupt("return", (0, _request.default)('/api/profile/basic'));

          case 1:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15, this);
  }));
  return _queryBasicProfile.apply(this, arguments);
}

function queryAdvancedProfile() {
  return _queryAdvancedProfile.apply(this, arguments);
}

function _queryAdvancedProfile() {
  _queryAdvancedProfile = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee16() {
    return regeneratorRuntime.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            return _context16.abrupt("return", (0, _request.default)('/api/profile/advanced'));

          case 1:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16, this);
  }));
  return _queryAdvancedProfile.apply(this, arguments);
}

function queryFakeList(_x11) {
  return _queryFakeList.apply(this, arguments);
}

function _queryFakeList() {
  _queryFakeList = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee17(params) {
    return regeneratorRuntime.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            return _context17.abrupt("return", (0, _request.default)("/api/fake_list?".concat((0, _qs.stringify)(params))));

          case 1:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17, this);
  }));
  return _queryFakeList.apply(this, arguments);
}

function removeFakeList(_x12) {
  return _removeFakeList.apply(this, arguments);
}

function _removeFakeList() {
  _removeFakeList = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee18(params) {
    var _params$count, count, restParams;

    return regeneratorRuntime.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _params$count = params.count, count = _params$count === void 0 ? 5 : _params$count, restParams = _objectWithoutProperties(params, ["count"]);
            return _context18.abrupt("return", (0, _request.default)("/api/fake_list?count=".concat(count), {
              method: 'POST',
              body: _objectSpread({}, restParams, {
                method: 'delete'
              })
            }));

          case 2:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18, this);
  }));
  return _removeFakeList.apply(this, arguments);
}

function addFakeList(_x13) {
  return _addFakeList.apply(this, arguments);
}

function _addFakeList() {
  _addFakeList = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee19(params) {
    var _params$count2, count, restParams;

    return regeneratorRuntime.wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            _params$count2 = params.count, count = _params$count2 === void 0 ? 5 : _params$count2, restParams = _objectWithoutProperties(params, ["count"]);
            return _context19.abrupt("return", (0, _request.default)("/api/fake_list?count=".concat(count), {
              method: 'POST',
              body: _objectSpread({}, restParams, {
                method: 'post'
              })
            }));

          case 2:
          case "end":
            return _context19.stop();
        }
      }
    }, _callee19, this);
  }));
  return _addFakeList.apply(this, arguments);
}

function updateFakeList(_x14) {
  return _updateFakeList.apply(this, arguments);
}

function _updateFakeList() {
  _updateFakeList = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee20(params) {
    var _params$count3, count, restParams;

    return regeneratorRuntime.wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            _params$count3 = params.count, count = _params$count3 === void 0 ? 5 : _params$count3, restParams = _objectWithoutProperties(params, ["count"]);
            return _context20.abrupt("return", (0, _request.default)("/api/fake_list?count=".concat(count), {
              method: 'POST',
              body: _objectSpread({}, restParams, {
                method: 'update'
              })
            }));

          case 2:
          case "end":
            return _context20.stop();
        }
      }
    }, _callee20, this);
  }));
  return _updateFakeList.apply(this, arguments);
}

function fakeAccountLogin(_x15) {
  return _fakeAccountLogin.apply(this, arguments);
}

function _fakeAccountLogin() {
  _fakeAccountLogin = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee21(params) {
    return regeneratorRuntime.wrap(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            return _context21.abrupt("return", (0, _request.default)('/api/login/account', {
              method: 'POST',
              body: params
            }));

          case 1:
          case "end":
            return _context21.stop();
        }
      }
    }, _callee21, this);
  }));
  return _fakeAccountLogin.apply(this, arguments);
}

function fakeRegister(_x16) {
  return _fakeRegister.apply(this, arguments);
}

function _fakeRegister() {
  _fakeRegister = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee22(params) {
    return regeneratorRuntime.wrap(function _callee22$(_context22) {
      while (1) {
        switch (_context22.prev = _context22.next) {
          case 0:
            return _context22.abrupt("return", (0, _request.default)('/api/register', {
              method: 'POST',
              body: params
            }));

          case 1:
          case "end":
            return _context22.stop();
        }
      }
    }, _callee22, this);
  }));
  return _fakeRegister.apply(this, arguments);
}

function queryNotices() {
  return _queryNotices.apply(this, arguments);
}

function _queryNotices() {
  _queryNotices = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee23() {
    return regeneratorRuntime.wrap(function _callee23$(_context23) {
      while (1) {
        switch (_context23.prev = _context23.next) {
          case 0:
            return _context23.abrupt("return", (0, _request.default)('/api/notices'));

          case 1:
          case "end":
            return _context23.stop();
        }
      }
    }, _callee23, this);
  }));
  return _queryNotices.apply(this, arguments);
}

function getFakeCaptcha(_x17) {
  return _getFakeCaptcha.apply(this, arguments);
}

function _getFakeCaptcha() {
  _getFakeCaptcha = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee24(mobile) {
    return regeneratorRuntime.wrap(function _callee24$(_context24) {
      while (1) {
        switch (_context24.prev = _context24.next) {
          case 0:
            return _context24.abrupt("return", (0, _request.default)("/api/captcha?mobile=".concat(mobile)));

          case 1:
          case "end":
            return _context24.stop();
        }
      }
    }, _callee24, this);
  }));
  return _getFakeCaptcha.apply(this, arguments);
}

function LoginUser(_x18) {
  return _LoginUser.apply(this, arguments);
}

function _LoginUser() {
  _LoginUser = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee25(params) {
    return regeneratorRuntime.wrap(function _callee25$(_context25) {
      while (1) {
        switch (_context25.prev = _context25.next) {
          case 0:
            return _context25.abrupt("return", (0, _request.default)('/api/login', {
              method: 'POST',
              body: params
            }));

          case 1:
          case "end":
            return _context25.stop();
        }
      }
    }, _callee25, this);
  }));
  return _LoginUser.apply(this, arguments);
}

function LogoutUser() {
  return _LogoutUser.apply(this, arguments);
}

function _LogoutUser() {
  _LogoutUser = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee26() {
    return regeneratorRuntime.wrap(function _callee26$(_context26) {
      while (1) {
        switch (_context26.prev = _context26.next) {
          case 0:
            return _context26.abrupt("return", (0, _request.default)('/api/logout', {
              method: 'POST'
            }));

          case 1:
          case "end":
            return _context26.stop();
        }
      }
    }, _callee26, this);
  }));
  return _LogoutUser.apply(this, arguments);
}

function CheckToken(_x19) {
  return _CheckToken.apply(this, arguments);
}

function _CheckToken() {
  _CheckToken = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee27(params) {
    return regeneratorRuntime.wrap(function _callee27$(_context27) {
      while (1) {
        switch (_context27.prev = _context27.next) {
          case 0:
            return _context27.abrupt("return", (0, _request.default)('/api/CheckToken'));

          case 1:
          case "end":
            return _context27.stop();
        }
      }
    }, _callee27, this);
  }));
  return _CheckToken.apply(this, arguments);
}

function setRefundStatus(_x20) {
  return _setRefundStatus.apply(this, arguments);
}

function _setRefundStatus() {
  _setRefundStatus = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee28(params) {
    return regeneratorRuntime.wrap(function _callee28$(_context28) {
      while (1) {
        switch (_context28.prev = _context28.next) {
          case 0:
            return _context28.abrupt("return", (0, _request.default)('/api/refund/refundStatus', {
              method: 'POST',
              body: params.payload
            }));

          case 1:
          case "end":
            return _context28.stop();
        }
      }
    }, _callee28, this);
  }));
  return _setRefundStatus.apply(this, arguments);
}

function getmainViewTable(_x21) {
  return _getmainViewTable.apply(this, arguments);
}

function _getmainViewTable() {
  _getmainViewTable = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee29(params) {
    return regeneratorRuntime.wrap(function _callee29$(_context29) {
      while (1) {
        switch (_context29.prev = _context29.next) {
          case 0:
            return _context29.abrupt("return", (0, _request.default)('/api/refund/getRefundPage', {
              method: 'POST',
              body: params.payload
            }));

          case 1:
          case "end":
            return _context29.stop();
        }
      }
    }, _callee29, this);
  }));
  return _getmainViewTable.apply(this, arguments);
}

function getmainViewColumn(_x22) {
  return _getmainViewColumn.apply(this, arguments);
}

function _getmainViewColumn() {
  _getmainViewColumn = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee30(params) {
    return regeneratorRuntime.wrap(function _callee30$(_context30) {
      while (1) {
        switch (_context30.prev = _context30.next) {
          case 0:
            return _context30.abrupt("return", (0, _request.default)('/api/refund/maindata'));

          case 1:
          case "end":
            return _context30.stop();
        }
      }
    }, _callee30, this);
  }));
  return _getmainViewColumn.apply(this, arguments);
}

function getRPMUTable(_x23) {
  return _getRPMUTable.apply(this, arguments);
}

function _getRPMUTable() {
  _getRPMUTable = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee31(params) {
    return regeneratorRuntime.wrap(function _callee31$(_context31) {
      while (1) {
        switch (_context31.prev = _context31.next) {
          case 0:
            return _context31.abrupt("return", (0, _request.default)('/api/refund/paymentByRefundId', {
              method: 'POST',
              body: params.payload
            }));

          case 1:
          case "end":
            return _context31.stop();
        }
      }
    }, _callee31, this);
  }));
  return _getRPMUTable.apply(this, arguments);
}

function dAppRefundStatusAuto(_x24) {
  return _dAppRefundStatusAuto.apply(this, arguments);
}

function _dAppRefundStatusAuto() {
  _dAppRefundStatusAuto = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee32(params) {
    return regeneratorRuntime.wrap(function _callee32$(_context32) {
      while (1) {
        switch (_context32.prev = _context32.next) {
          case 0:
            return _context32.abrupt("return", (0, _request.default)('/api/refund/dAppRefundStatusAuto', {
              method: 'POST',
              body: params.payload
            }));

          case 1:
          case "end":
            return _context32.stop();
        }
      }
    }, _callee32, this);
  }));
  return _dAppRefundStatusAuto.apply(this, arguments);
}

function getMainModal(_x25) {
  return _getMainModal.apply(this, arguments);
}

function _getMainModal() {
  _getMainModal = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee33(params) {
    return regeneratorRuntime.wrap(function _callee33$(_context33) {
      while (1) {
        switch (_context33.prev = _context33.next) {
          case 0:
            return _context33.abrupt("return", (0, _request.default)('/api/refund/mainmodal'));

          case 1:
          case "end":
            return _context33.stop();
        }
      }
    }, _callee33, this);
  }));
  return _getMainModal.apply(this, arguments);
}

function getMainSelect1(_x26) {
  return _getMainSelect.apply(this, arguments);
}

function _getMainSelect() {
  _getMainSelect = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee34(params) {
    return regeneratorRuntime.wrap(function _callee34$(_context34) {
      while (1) {
        switch (_context34.prev = _context34.next) {
          case 0:
            return _context34.abrupt("return", (0, _request.default)('/api/refund/mainselect1'));

          case 1:
          case "end":
            return _context34.stop();
        }
      }
    }, _callee34, this);
  }));
  return _getMainSelect.apply(this, arguments);
}

function getOptionsdata(_x27) {
  return _getOptionsdata.apply(this, arguments);
}

function _getOptionsdata() {
  _getOptionsdata = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee35(params) {
    return regeneratorRuntime.wrap(function _callee35$(_context35) {
      while (1) {
        switch (_context35.prev = _context35.next) {
          case 0:
            return _context35.abrupt("return", (0, _request.default)('/api/refund/getUserOptionList'));

          case 1:
          case "end":
            return _context35.stop();
        }
      }
    }, _callee35, this);
  }));
  return _getOptionsdata.apply(this, arguments);
}

function saveOptionsdata(_x28) {
  return _saveOptionsdata.apply(this, arguments);
}

function _saveOptionsdata() {
  _saveOptionsdata = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee36(params) {
    return regeneratorRuntime.wrap(function _callee36$(_context36) {
      while (1) {
        switch (_context36.prev = _context36.next) {
          case 0:
            return _context36.abrupt("return", (0, _request.default)('/api/refund/saveUserOptionList', {
              method: 'POST',
              body: params.payload
            }));

          case 1:
          case "end":
            return _context36.stop();
        }
      }
    }, _callee36, this);
  }));
  return _saveOptionsdata.apply(this, arguments);
}

function getFilesRequest(_x29) {
  return _getFilesRequest.apply(this, arguments);
}

function _getFilesRequest() {
  _getFilesRequest = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee37(params) {
    return regeneratorRuntime.wrap(function _callee37$(_context37) {
      while (1) {
        switch (_context37.prev = _context37.next) {
          case 0:
            return _context37.abrupt("return", (0, _request.default)('/api/refund/upload/application/get/' + params.payload.id));

          case 1:
          case "end":
            return _context37.stop();
        }
      }
    }, _callee37, this);
  }));
  return _getFilesRequest.apply(this, arguments);
}

function deleteFileRequest(_x30) {
  return _deleteFileRequest.apply(this, arguments);
}

function _deleteFileRequest() {
  _deleteFileRequest = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee38(params) {
    return regeneratorRuntime.wrap(function _callee38$(_context38) {
      while (1) {
        switch (_context38.prev = _context38.next) {
          case 0:
            return _context38.abrupt("return", (0, _request.default)('/api/refund/upload/application/remove/' + params.payload.id, {
              method: 'POST'
            }));

          case 1:
          case "end":
            return _context38.stop();
        }
      }
    }, _callee38, this);
  }));
  return _deleteFileRequest.apply(this, arguments);
}

function setDateRefund(_x31) {
  return _setDateRefund.apply(this, arguments);
}

function _setDateRefund() {
  _setDateRefund = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee39(params) {
    return regeneratorRuntime.wrap(function _callee39$(_context39) {
      while (1) {
        switch (_context39.prev = _context39.next) {
          case 0:
            return _context39.abrupt("return", (0, _request.default)('/api/refund/refundSetDate', {
              method: 'POST',
              body: params.payload
            }));

          case 1:
          case "end":
            return _context39.stop();
        }
      }
    }, _callee39, this);
  }));
  return _setDateRefund.apply(this, arguments);
}

function setDateRequest(_x32) {
  return _setDateRequest.apply(this, arguments);
}

function _setDateRequest() {
  _setDateRequest = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee40(params) {
    return regeneratorRuntime.wrap(function _callee40$(_context40) {
      while (1) {
        switch (_context40.prev = _context40.next) {
          case 0:
            return _context40.abrupt("return", (0, _request.default)('/api/refund/applicationSetDate', {
              method: 'POST',
              body: params.payload
            }));

          case 1:
          case "end":
            return _context40.stop();
        }
      }
    }, _callee40, this);
  }));
  return _setDateRequest.apply(this, arguments);
}

function setfile(_x33) {
  return _setfile.apply(this, arguments);
}

function _setfile() {
  _setfile = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee41(params) {
    var formData;
    return regeneratorRuntime.wrap(function _callee41$(_context41) {
      while (1) {
        switch (_context41.prev = _context41.next) {
          case 0:
            formData = new FormData();
            formData.append('file', params.payload.file);
            return _context41.abrupt("return", (0, _request.default)('/api/refund/upload/application/add/' + params.payload.id, {
              method: 'POST',
              body: formData
            }));

          case 3:
          case "end":
            return _context41.stop();
        }
      }
    }, _callee41, this);
  }));
  return _setfile.apply(this, arguments);
}

function getmt102file(_x34) {
  return _getmt102file.apply(this, arguments);
}

function _getmt102file() {
  _getmt102file = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee42(params) {
    return regeneratorRuntime.wrap(function _callee42$(_context42) {
      while (1) {
        switch (_context42.prev = _context42.next) {
          case 0:
            return _context42.abrupt("return", (0, _request.default)('/api/refund/getfile'));

          case 1:
          case "end":
            return _context42.stop();
        }
      }
    }, _callee42, this);
  }));
  return _getmt102file.apply(this, arguments);
}

function mt102preview(_x35) {
  return _mt102preview.apply(this, arguments);
}

function _mt102preview() {
  _mt102preview = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee43(params) {
    return regeneratorRuntime.wrap(function _callee43$(_context43) {
      while (1) {
        switch (_context43.prev = _context43.next) {
          case 0:
            return _context43.abrupt("return", (0, _request.default)('/api/refund/mt102GroupByKnpPreview', {
              method: 'POST',
              body: params.payload.src
            }));

          case 1:
          case "end":
            return _context43.stop();
        }
      }
    }, _callee43, this);
  }));
  return _mt102preview.apply(this, arguments);
}

function getCalendarEvents(_x36) {
  return _getCalendarEvents.apply(this, arguments);
}

function _getCalendarEvents() {
  _getCalendarEvents = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee44(params) {
    return regeneratorRuntime.wrap(function _callee44$(_context44) {
      while (1) {
        switch (_context44.prev = _context44.next) {
          case 0:
            return _context44.abrupt("return", (0, _request.default)("/api/refund/getCalendarEvents?".concat((0, _qs.stringify)(params.payload))));

          case 1:
          case "end":
            return _context44.stop();
        }
      }
    }, _callee44, this);
  }));
  return _getCalendarEvents.apply(this, arguments);
}

function saveCalendarEvents(_x37) {
  return _saveCalendarEvents.apply(this, arguments);
}

function _saveCalendarEvents() {
  _saveCalendarEvents = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee45(params) {
    return regeneratorRuntime.wrap(function _callee45$(_context45) {
      while (1) {
        switch (_context45.prev = _context45.next) {
          case 0:
            return _context45.abrupt("return", (0, _request.default)('/api/refund/saveCalendarEvent', {
              method: 'POST',
              body: params.payload
            }));

          case 1:
          case "end":
            return _context45.stop();
        }
      }
    }, _callee45, this);
  }));
  return _saveCalendarEvents.apply(this, arguments);
}

function removeCalendarEvents(_x38) {
  return _removeCalendarEvents.apply(this, arguments);
}

function _removeCalendarEvents() {
  _removeCalendarEvents = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee46(params) {
    return regeneratorRuntime.wrap(function _callee46$(_context46) {
      while (1) {
        switch (_context46.prev = _context46.next) {
          case 0:
            return _context46.abrupt("return", (0, _request.default)("/api/refund/removeCalendarEvent?".concat((0, _qs.stringify)(params.payload)), {
              method: 'POST'
            }));

          case 1:
          case "end":
            return _context46.stop();
        }
      }
    }, _callee46, this);
  }));
  return _removeCalendarEvents.apply(this, arguments);
}

function getJournalData(_x39) {
  return _getJournalData.apply(this, arguments);
}

function _getJournalData() {
  _getJournalData = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee47(params) {
    return regeneratorRuntime.wrap(function _callee47$(_context47) {
      while (1) {
        switch (_context47.prev = _context47.next) {
          case 0:
            return _context47.abrupt("return", (0, _request.default)('/api/refund/getRefundHisPage', {
              method: 'POST',
              body: params.payload
            }));

          case 1:
          case "end":
            return _context47.stop();
        }
      }
    }, _callee47, this);
  }));
  return _getJournalData.apply(this, arguments);
}

function getStaticticsData(_x40) {
  return _getStaticticsData.apply(this, arguments);
}

function _getStaticticsData() {
  _getStaticticsData = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee48(params) {
    return regeneratorRuntime.wrap(function _callee48$(_context48) {
      while (1) {
        switch (_context48.prev = _context48.next) {
          case 0:
            return _context48.abrupt("return", (0, _request.default)("/api/refund/get/stat?".concat((0, _qs.stringify)(params.payload))));

          case 1:
          case "end":
            return _context48.stop();
        }
      }
    }, _callee48, this);
  }));
  return _getStaticticsData.apply(this, arguments);
}

function getReceiversRefund(_x41) {
  return _getReceiversRefund.apply(this, arguments);
}

function _getReceiversRefund() {
  _getReceiversRefund = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee49(params) {
    return regeneratorRuntime.wrap(function _callee49$(_context49) {
      while (1) {
        switch (_context49.prev = _context49.next) {
          case 0:
            return _context49.abrupt("return", (0, _request.default)('/api/uicommand/runCommand', {
              method: 'POST',
              body: params.payload
            }));

          case 1:
          case "end":
            return _context49.stop();
        }
      }
    }, _callee49, this);
  }));
  return _getReceiversRefund.apply(this, arguments);
}

function getReportsList(_x42) {
  return _getReportsList.apply(this, arguments);
}

function _getReportsList() {
  _getReportsList = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee50(params) {
    return regeneratorRuntime.wrap(function _callee50$(_context50) {
      while (1) {
        switch (_context50.prev = _context50.next) {
          case 0:
            return _context50.abrupt("return", (0, _request.default)('/api/report/getReportList'));

          case 1:
          case "end":
            return _context50.stop();
        }
      }
    }, _callee50, this);
  }));
  return _getReportsList.apply(this, arguments);
}

function getReportParameters(_x43) {
  return _getReportParameters.apply(this, arguments);
}

function _getReportParameters() {
  _getReportParameters = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee51(params) {
    return regeneratorRuntime.wrap(function _callee51$(_context51) {
      while (1) {
        switch (_context51.prev = _context51.next) {
          case 0:
            return _context51.abrupt("return", (0, _request.default)("/api/report/getReportParameters?".concat((0, _qs.stringify)(params.payload))));

          case 1:
          case "end":
            return _context51.stop();
        }
      }
    }, _callee51, this);
  }));
  return _getReportParameters.apply(this, arguments);
}

function getFormedReports(_x44) {
  return _getFormedReports.apply(this, arguments);
}

function _getFormedReports() {
  _getFormedReports = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee52(params) {
    return regeneratorRuntime.wrap(function _callee52$(_context52) {
      while (1) {
        switch (_context52.prev = _context52.next) {
          case 0:
            return _context52.abrupt("return", (0, _request.default)('/api/uicommand/getList', {
              method: 'POST',
              body: params.payload
            }));

          case 1:
          case "end":
            return _context52.stop();
        }
      }
    }, _callee52, this);
  }));
  return _getFormedReports.apply(this, arguments);
}

function getSearcherCalendar(_x45) {
  return _getSearcherCalendar.apply(this, arguments);
}

function _getSearcherCalendar() {
  _getSearcherCalendar = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee53(params) {
    return regeneratorRuntime.wrap(function _callee53$(_context53) {
      while (1) {
        switch (_context53.prev = _context53.next) {
          case 0:
            return _context53.abrupt("return", (0, _request.default)('/api/rpmu/personPeriodList', {
              method: 'POST',
              body: params.payload
            }));

          case 1:
          case "end":
            return _context53.stop();
        }
      }
    }, _callee53, this);
  }));
  return _getSearcherCalendar.apply(this, arguments);
}

function getSearcherJurCalendar(_x46) {
  return _getSearcherJurCalendar.apply(this, arguments);
}

function _getSearcherJurCalendar() {
  _getSearcherJurCalendar = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee54(params) {
    return regeneratorRuntime.wrap(function _callee54$(_context54) {
      while (1) {
        switch (_context54.prev = _context54.next) {
          case 0:
            return _context54.abrupt("return", (0, _request.default)('/api/rpmu/senderPeriodList', {
              method: 'POST',
              body: params.payload
            }));

          case 1:
          case "end":
            return _context54.stop();
        }
      }
    }, _callee54, this);
  }));
  return _getSearcherJurCalendar.apply(this, arguments);
}

function getSearcherData(_x47) {
  return _getSearcherData.apply(this, arguments);
}

function _getSearcherData() {
  _getSearcherData = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee55(params) {
    return regeneratorRuntime.wrap(function _callee55$(_context55) {
      while (1) {
        switch (_context55.prev = _context55.next) {
          case 0:
            return _context55.abrupt("return", (0, _request.default)('/api/external/gbdflGetPerson', {
              method: 'POST',
              body: params.payload
            }));

          case 1:
          case "end":
            return _context55.stop();
        }
      }
    }, _callee55, this);
  }));
  return _getSearcherData.apply(this, arguments);
}

function getSearcherRPNData(_x48) {
  return _getSearcherRPNData.apply(this, arguments);
}

function _getSearcherRPNData() {
  _getSearcherRPNData = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee56(params) {
    return regeneratorRuntime.wrap(function _callee56$(_context56) {
      while (1) {
        switch (_context56.prev = _context56.next) {
          case 0:
            return _context56.abrupt("return", (0, _request.default)('/api/external/rpnGetPerson', {
              method: 'POST',
              body: params.payload
            }));

          case 1:
          case "end":
            return _context56.stop();
        }
      }
    }, _callee56, this);
  }));
  return _getSearcherRPNData.apply(this, arguments);
}

function getSearcherMEDData(_x49) {
  return _getSearcherMEDData.apply(this, arguments);
}

function _getSearcherMEDData() {
  _getSearcherMEDData = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee57(params) {
    return regeneratorRuntime.wrap(function _callee57$(_context57) {
      while (1) {
        switch (_context57.prev = _context57.next) {
          case 0:
            return _context57.abrupt("return", (0, _request.default)('/api/external/medInfGetPerson', {
              method: 'POST',
              body: params.payload
            }));

          case 1:
          case "end":
            return _context57.stop();
        }
      }
    }, _callee57, this);
  }));
  return _getSearcherMEDData.apply(this, arguments);
}

function getSearcherJur(_x50) {
  return _getSearcherJur.apply(this, arguments);
}

function _getSearcherJur() {
  _getSearcherJur = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee58(params) {
    return regeneratorRuntime.wrap(function _callee58$(_context58) {
      while (1) {
        switch (_context58.prev = _context58.next) {
          case 0:
            return _context58.abrupt("return", (0, _request.default)('/api/external/rpmuGetSender', {
              method: 'POST',
              body: params.payload
            }));

          case 1:
          case "end":
            return _context58.stop();
        }
      }
    }, _callee58, this);
  }));
  return _getSearcherJur.apply(this, arguments);
}

function getActDics(_x51) {
  return _getActDics.apply(this, arguments);
}

function _getActDics() {
  _getActDics = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee59(params) {
    return regeneratorRuntime.wrap(function _callee59$(_context59) {
      while (1) {
        switch (_context59.prev = _context59.next) {
          case 0:
            return _context59.abrupt("return", (0, _request.default)('/api/uicommand/getList', {
              method: 'POST',
              body: params.payload
            }));

          case 1:
          case "end":
            return _context59.stop();
        }
      }
    }, _callee59, this);
  }));
  return _getActDics.apply(this, arguments);
}

function saveObject(_x52) {
  return _saveObject.apply(this, arguments);
}

function _saveObject() {
  _saveObject = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee60(params) {
    return regeneratorRuntime.wrap(function _callee60$(_context60) {
      while (1) {
        switch (_context60.prev = _context60.next) {
          case 0:
            return _context60.abrupt("return", (0, _request.default)('/api/uicommand/saveObject', {
              method: 'POST',
              body: params.payload
            }));

          case 1:
          case "end":
            return _context60.stop();
        }
      }
    }, _callee60, this);
  }));
  return _saveObject.apply(this, arguments);
}

function getObject(_x53) {
  return _getObject.apply(this, arguments);
}

function _getObject() {
  _getObject = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee61(params) {
    return regeneratorRuntime.wrap(function _callee61$(_context61) {
      while (1) {
        switch (_context61.prev = _context61.next) {
          case 0:
            return _context61.abrupt("return", (0, _request.default)('/api/uicommand/getObject', {
              method: 'POST',
              body: params.payload
            }));

          case 1:
          case "end":
            return _context61.stop();
        }
      }
    }, _callee61, this);
  }));
  return _getObject.apply(this, arguments);
}

function createContractFromAgent(_x54) {
  return _createContractFromAgent.apply(this, arguments);
}

function _createContractFromAgent() {
  _createContractFromAgent = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee62(params) {
    return regeneratorRuntime.wrap(function _callee62$(_context62) {
      while (1) {
        switch (_context62.prev = _context62.next) {
          case 0:
            return _context62.abrupt("return", (0, _request.default)('/api/contract/createContractFromAgent', {
              method: 'POST',
              body: params.payload
            }));

          case 1:
          case "end":
            return _context62.stop();
        }
      }
    }, _callee62, this);
  }));
  return _createContractFromAgent.apply(this, arguments);
}

function createSubContract(_x55) {
  return _createSubContract.apply(this, arguments);
}

function _createSubContract() {
  _createSubContract = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee63(params) {
    return regeneratorRuntime.wrap(function _callee63$(_context63) {
      while (1) {
        switch (_context63.prev = _context63.next) {
          case 0:
            return _context63.abrupt("return", (0, _request.default)('/api/contract/createSubContract', {
              method: 'POST',
              body: params.payload
            }));

          case 1:
          case "end":
            return _context63.stop();
        }
      }
    }, _callee63, this);
  }));
  return _createSubContract.apply(this, arguments);
}

function createActForContract(_x56) {
  return _createActForContract.apply(this, arguments);
}

function _createActForContract() {
  _createActForContract = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee64(params) {
    return regeneratorRuntime.wrap(function _callee64$(_context64) {
      while (1) {
        switch (_context64.prev = _context64.next) {
          case 0:
            return _context64.abrupt("return", (0, _request.default)('/api/contract/createActForContract', {
              method: 'POST',
              body: params.payload
            }));

          case 1:
          case "end":
            return _context64.stop();
        }
      }
    }, _callee64, this);
  }));
  return _createActForContract.apply(this, arguments);
}

function uploadFile(_x57) {
  return _uploadFile.apply(this, arguments);
}

function _uploadFile() {
  _uploadFile = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee65(params) {
    return regeneratorRuntime.wrap(function _callee65$(_context65) {
      while (1) {
        switch (_context65.prev = _context65.next) {
          case 0:
            return _context65.abrupt("return", (0, _request.default)('/api/uicommand/uploadFile', {
              method: 'POST',
              body: params.payload
            }));

          case 1:
          case "end":
            return _context65.stop();
        }
      }
    }, _callee65, this);
  }));
  return _uploadFile.apply(this, arguments);
}

function deleteObject(_x58) {
  return _deleteObject.apply(this, arguments);
}

function _deleteObject() {
  _deleteObject = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee66(params) {
    return regeneratorRuntime.wrap(function _callee66$(_context66) {
      while (1) {
        switch (_context66.prev = _context66.next) {
          case 0:
            return _context66.abrupt("return", (0, _request.default)('/api/uicommand/deleteObject', {
              method: 'POST',
              body: params.payload
            }));

          case 1:
          case "end":
            return _context66.stop();
        }
      }
    }, _callee66, this);
  }));
  return _deleteObject.apply(this, arguments);
}

function getCommands(_x59) {
  return _getCommands.apply(this, arguments);
}

function _getCommands() {
  _getCommands = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee67(params) {
    return regeneratorRuntime.wrap(function _callee67$(_context67) {
      while (1) {
        switch (_context67.prev = _context67.next) {
          case 0:
            return _context67.abrupt("return", (0, _request.default)("/api/uicommand/getCommands?".concat((0, _qs.stringify)(params.payload))));

          case 1:
          case "end":
            return _context67.stop();
        }
      }
    }, _callee67, this);
  }));
  return _getCommands.apply(this, arguments);
}

function getPublish(_x60) {
  return _getPublish.apply(this, arguments);
}

function _getPublish() {
  _getPublish = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee68(params) {
    return regeneratorRuntime.wrap(function _callee68$(_context68) {
      while (1) {
        switch (_context68.prev = _context68.next) {
          case 0:
            return _context68.abrupt("return", (0, _request.default)("/api/contract/publishDocument?entity=contract&id=" + params.payload.id));

          case 1:
          case "end":
            return _context68.stop();
        }
      }
    }, _callee68, this);
  }));
  return _getPublish.apply(this, arguments);
}
//# sourceMappingURL=api.js.map
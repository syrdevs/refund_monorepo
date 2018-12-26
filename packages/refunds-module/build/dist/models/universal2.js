"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _api = require("../services/api");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  namespace: 'universal2',
  state: {
    reportParametersData: [],
    reportFormedData: [],
    dataStore: [],
    columns: [],
    contractData: {},
    references: {},
    publish: {}
  },
  effects: {
    getContractById:
    /*#__PURE__*/
    regeneratorRuntime.mark(function getContractById(payload, _ref) {
      var call, put, response;
      return regeneratorRuntime.wrap(function getContractById$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              call = _ref.call, put = _ref.put;
              _context.next = 3;
              return call(_api.getObject, payload);

            case 3:
              response = _context.sent;
              _context.next = 6;
              return put({
                type: 'getListDataByContract',
                payload: response || {}
              });

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, getContractById, this);
    }),
    getPublish:
    /*#__PURE__*/
    regeneratorRuntime.mark(function getPublish(payload, _ref2) {
      var call, put, response;
      return regeneratorRuntime.wrap(function getPublish$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              call = _ref2.call, put = _ref2.put;
              _context2.next = 3;
              return call(_api.getPublish, payload);

            case 3:
              response = _context2.sent;
              _context2.next = 6;
              return put({
                type: 'getPublishReducer',
                payload: response || {}
              });

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, getPublish, this);
    }),
    getList:
    /*#__PURE__*/
    regeneratorRuntime.mark(function getList(payload, _ref3) {
      var call, put, response;
      return regeneratorRuntime.wrap(function getList$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              call = _ref3.call, put = _ref3.put;
              _context3.next = 3;
              return call(_api.getList, payload);

            case 3:
              response = _context3.sent;
              _context3.next = 6;
              return put({
                type: 'getListData',
                payload: {
                  type: payload.payload.entity,
                  response: response || {}
                }
              });

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, getList, this);
    }),
    formedReports:
    /*#__PURE__*/
    regeneratorRuntime.mark(function formedReports(payload, _ref4) {
      var call, put, response;
      return regeneratorRuntime.wrap(function formedReports$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              call = _ref4.call, put = _ref4.put;
              _context4.next = 3;
              return call(_api.getFormedReports, payload);

            case 3:
              response = _context4.sent;
              _context4.next = 6;
              return put({
                type: 'formedReportsData',
                payload: response || {}
              });

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, formedReports, this);
    }),
    reportParameters:
    /*#__PURE__*/
    regeneratorRuntime.mark(function reportParameters(payload, _ref5) {
      var call, put, response;
      return regeneratorRuntime.wrap(function reportParameters$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              call = _ref5.call, put = _ref5.put;
              _context5.next = 3;
              return call(_api.getReportParameters, payload);

            case 3:
              response = _context5.sent;
              _context5.next = 6;
              return put({
                type: 'reportParametersData',
                payload: response || {}
              });

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      }, reportParameters, this);
    }),
    reportsData:
    /*#__PURE__*/
    regeneratorRuntime.mark(function reportsData(payload, _ref6) {
      var call, put, response;
      return regeneratorRuntime.wrap(function reportsData$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              call = _ref6.call, put = _ref6.put;
              _context6.next = 3;
              return call(_api.getReportsList, payload);

            case 3:
              response = _context6.sent;
              _context6.next = 6;
              return put({
                type: 'getData',
                payload: response || {}
              });

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      }, reportsData, this);
    }),
    statisticsData:
    /*#__PURE__*/
    regeneratorRuntime.mark(function statisticsData(payload, _ref7) {
      var call, put, response;
      return regeneratorRuntime.wrap(function statisticsData$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              call = _ref7.call, put = _ref7.put;
              _context7.next = 3;
              return call(_api.getStaticticsData, payload);

            case 3:
              response = _context7.sent;
              _context7.next = 6;
              return put({
                type: 'getData',
                payload: response || {}
              });

            case 6:
            case "end":
              return _context7.stop();
          }
        }
      }, statisticsData, this);
    }),
    journalData:
    /*#__PURE__*/
    regeneratorRuntime.mark(function journalData(payload, _ref8) {
      var call, put, response;
      return regeneratorRuntime.wrap(function journalData$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              call = _ref8.call, put = _ref8.put;
              _context8.next = 3;
              return call(_api.getJournalData, payload);

            case 3:
              response = _context8.sent;
              _context8.next = 6;
              return put({
                type: 'getData',
                payload: response || {}
              });

            case 6:
            case "end":
              return _context8.stop();
          }
        }
      }, journalData, this);
    }),
    clear:
    /*#__PURE__*/
    regeneratorRuntime.mark(function clear(payload, _ref9) {
      var call, put;
      return regeneratorRuntime.wrap(function clear$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              call = _ref9.call, put = _ref9.put;
              _context9.next = 3;
              return put({
                type: 'clearData'
              });

            case 3:
            case "end":
              return _context9.stop();
          }
        }
      }, clear, this);
    }),
    data:
    /*#__PURE__*/
    regeneratorRuntime.mark(function data(payload, _ref10) {
      var call, put, response;
      return regeneratorRuntime.wrap(function data$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              call = _ref10.call, put = _ref10.put;
              _context10.next = 3;
              return call(_api.getData, payload);

            case 3:
              response = _context10.sent;
              _context10.next = 6;
              return put({
                type: 'getData',
                payload: response || {}
              });

            case 6:
            case "end":
              return _context10.stop();
          }
        }
      }, data, this);
    }),
    columns:
    /*#__PURE__*/
    regeneratorRuntime.mark(function columns(payload, _ref11) {
      var call, put, response;
      return regeneratorRuntime.wrap(function columns$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              call = _ref11.call, put = _ref11.put;
              _context11.next = 3;
              return call(_api.getColumns, payload);

            case 3:
              response = _context11.sent;
              _context11.next = 6;
              return put({
                type: 'getColumns',
                payload: response
              });

            case 6:
            case "end":
              return _context11.stop();
          }
        }
      }, columns, this);
    }),
    clearContract:
    /*#__PURE__*/
    regeneratorRuntime.mark(function clearContract(payload, _ref12) {
      var call, put;
      return regeneratorRuntime.wrap(function clearContract$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              call = _ref12.call, put = _ref12.put;
              _context12.next = 3;
              return put({
                type: 'clearContractData',
                payload: {}
              });

            case 3:
            case "end":
              return _context12.stop();
          }
        }
      }, clearContract, this);
    })
  },
  reducers: {
    getPublishReducer: function getPublishReducer(state, _ref13) {
      var payload = _ref13.payload;
      return _objectSpread({}, state, {
        publish: payload
      });
    },
    getListDataByContract: function getListDataByContract(state, _ref14) {
      var payload = _ref14.payload;
      return _objectSpread({}, state, {
        contractData: payload
      });
    },
    loading: function loading(state, _ref15) {
      var payload = _ref15.payload;
      return _objectSpread({}, state, {
        loading: payload
      });
    },
    getListData: function getListData(state, _ref16) {
      var payload = _ref16.payload;
      return _objectSpread({}, state, {
        references: _objectSpread({}, state.references, _defineProperty({}, payload.type, payload.response))
      });
    },
    clearData: function clearData(state, _ref17) {
      var payload = _ref17.payload;
      return _objectSpread({}, state, {
        columns: [],
        dataStore: []
      });
    },
    getData: function getData(state, _ref18) {
      var payload = _ref18.payload;
      return _objectSpread({}, state, {
        dataStore: payload
      });
    },
    getColumns: function getColumns(state, _ref19) {
      var payload = _ref19.payload;
      return _objectSpread({}, state, {
        columns: payload
      });
    },
    formedReportsData: function formedReportsData(state, _ref20) {
      var payload = _ref20.payload;
      return _objectSpread({}, state, {
        reportFormedData: payload
      });
    },
    reportParametersData: function reportParametersData(state, _ref21) {
      var payload = _ref21.payload;
      return _objectSpread({}, state, {
        reportParametersData: payload
      });
    },
    clearContractData: function clearContractData(state, _ref22) {
      var payload = _ref22.payload;
      return _objectSpread({}, state, {
        contractData: {}
      });
    }
  }
};
exports.default = _default;
//# sourceMappingURL=universal2.js.map
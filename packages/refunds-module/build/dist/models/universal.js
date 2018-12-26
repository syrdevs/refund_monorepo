"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _api = require("../services/api");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  namespace: 'universal',
  state: {
    table: {
      number: null,
      size: null,
      totalElements: null,
      totalPages: null,
      content: []
    },
    files: [],
    columns: [],
    rpmu: {
      columns: [],
      data: []
    },
    mainmodal: [],
    select1: [],
    options: [],
    refundKnpList: [],
    modalgridviewdata: [],
    paymentsData: {
      mt100: {},
      mt102: {}
    },
    searcherdata: {},
    searcherRPNdata: {},
    searcherMEDdata: {},
    searcherjur: {},
    searchercalendar: [],
    searcherjurcalendar: [],
    periodYear: {},
    periodSection: {},
    organization: {},
    medicalType: {},
    attachmentType: {},
    paymentRequestType: {},
    divisions: {},
    activity: {},
    measureUnit: {},
    identifierType: {},
    currencyType: {},
    legalForm: {},
    saveanswer: {},
    getObjectData: {},
    counterAgentData: {},
    uploadanswer: {},
    commandResult: []
  },
  effects: {
    getCommandResult:
    /*#__PURE__*/
    regeneratorRuntime.mark(function getCommandResult(payload, _ref) {
      var call, put, response;
      return regeneratorRuntime.wrap(function getCommandResult$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              call = _ref.call, put = _ref.put;
              _context.next = 3;
              return call(_api.getCommands, payload);

            case 3:
              response = _context.sent;
              _context.next = 6;
              return put({
                type: 'getCommandResultReducer',
                payload: response
              });

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, getCommandResult, this);
    }),
    receiversRefund:
    /*#__PURE__*/
    regeneratorRuntime.mark(function receiversRefund(payload, _ref2) {
      var call, put;
      return regeneratorRuntime.wrap(function receiversRefund$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              call = _ref2.call, put = _ref2.put;
              _context2.next = 3;
              return call(_api.getReceiversRefund, payload);

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, receiversRefund, this);
    }),
    AppRefundStatusAuto:
    /*#__PURE__*/
    regeneratorRuntime.mark(function AppRefundStatusAuto(payload, _ref3) {
      var call, put;
      return regeneratorRuntime.wrap(function AppRefundStatusAuto$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              call = _ref3.call, put = _ref3.put;
              _context3.next = 3;
              return call(_api.dAppRefundStatusAuto, payload);

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, AppRefundStatusAuto, this);
    }),
    removeFileRequest:
    /*#__PURE__*/
    regeneratorRuntime.mark(function removeFileRequest(payload, _ref4) {
      var call;
      return regeneratorRuntime.wrap(function removeFileRequest$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              call = _ref4.call;
              _context4.next = 3;
              return call(_api.deleteFileRequest, payload);

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      }, removeFileRequest, this);
    }),
    getFilesRequestDate:
    /*#__PURE__*/
    regeneratorRuntime.mark(function getFilesRequestDate(payload, _ref5) {
      var call, put, response;
      return regeneratorRuntime.wrap(function getFilesRequestDate$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              call = _ref5.call, put = _ref5.put;
              _context5.next = 3;
              return call(_api.getFilesRequest, payload);

            case 3:
              response = _context5.sent;
              _context5.next = 6;
              return put({
                type: 'files',
                payload: response
              });

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      }, getFilesRequestDate, this);
    }),
    changeRefundStatus:
    /*#__PURE__*/
    regeneratorRuntime.mark(function changeRefundStatus(payload, _ref6) {
      var call;
      return regeneratorRuntime.wrap(function changeRefundStatus$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              call = _ref6.call;
              _context6.next = 3;
              return call(_api.setRefundStatus, payload);

            case 3:
            case "end":
              return _context6.stop();
          }
        }
      }, changeRefundStatus, this);
    }),
    changeDateRefund:
    /*#__PURE__*/
    regeneratorRuntime.mark(function changeDateRefund(payload, _ref7) {
      var call;
      return regeneratorRuntime.wrap(function changeDateRefund$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              call = _ref7.call;
              _context7.next = 3;
              return call(_api.setDateRefund, payload);

            case 3:
            case "end":
              return _context7.stop();
          }
        }
      }, changeDateRefund, this);
    }),
    changeDateRequest:
    /*#__PURE__*/
    regeneratorRuntime.mark(function changeDateRequest(payload, _ref8) {
      var call;
      return regeneratorRuntime.wrap(function changeDateRequest$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              call = _ref8.call;
              _context8.next = 3;
              return call(_api.setDateRequest, payload);

            case 3:
            case "end":
              return _context8.stop();
          }
        }
      }, changeDateRequest, this);
    }),
    setfile:
    /*#__PURE__*/
    regeneratorRuntime.mark(function setfile(payload, _ref9) {
      var call, put, response;
      return regeneratorRuntime.wrap(function setfile$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              call = _ref9.call, put = _ref9.put;
              _context9.next = 3;
              return call(_api.setfile, payload);

            case 3:
              response = _context9.sent;
              _context9.next = 6;
              return put({
                type: 'setfileReduce',
                payload: response
              });

            case 6:
            case "end":
              return _context9.stop();
          }
        }
      }, setfile, this);
    }),
    paymentsData:
    /*#__PURE__*/
    regeneratorRuntime.mark(function paymentsData(payload, _ref10) {
      var call, put, response;
      return regeneratorRuntime.wrap(function paymentsData$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              call = _ref10.call, put = _ref10.put;
              _context10.next = 3;
              return call(_api.paymentsData, payload.payload);

            case 3:
              response = _context10.sent;
              _context10.next = 6;
              return put({
                type: 'paymentsDataReducer',
                payload: {
                  type: payload.payload.entity,
                  response: response || {}
                }
              });

            case 6:
            case "end":
              return _context10.stop();
          }
        }
      }, paymentsData, this);
    }),
    getmt102:
    /*#__PURE__*/
    regeneratorRuntime.mark(function getmt102(payload, _ref11) {
      var call, put, response;
      return regeneratorRuntime.wrap(function getmt102$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              call = _ref11.call, put = _ref11.put;
              _context11.next = 3;
              return call(_api.getmt102file, payload);

            case 3:
              response = _context11.sent;
              _context11.next = 6;
              return put({
                type: 'mt102',
                payload: response
              });

            case 6:
            case "end":
              return _context11.stop();
          }
        }
      }, getmt102, this);
    }),
    mt102preview:
    /*#__PURE__*/
    regeneratorRuntime.mark(function mt102preview(payload, _ref12) {
      var call, put, response, data;
      return regeneratorRuntime.wrap(function mt102preview$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              call = _ref12.call, put = _ref12.put;
              _context12.next = 3;
              return call(_api.mt102preview, payload);

            case 3:
              response = _context12.sent;
              _context12.next = 6;
              return put({
                type: 'mt102prevReducer',
                payload: response
              });

            case 6:
              if (!(response.refundKnpList.length > 0)) {
                _context12.next = 14;
                break;
              }

              payload.payload.src.searched = true;
              payload.payload.src.data['knpList'] = {
                id: response.refundKnpList[0].id
              };
              _context12.next = 11;
              return call(_api.getmainViewTable, payload);

            case 11:
              data = _context12.sent;
              _context12.next = 14;
              return put({
                type: 'mt102dataReducer',
                payload: data
              });

            case 14:
            case "end":
              return _context12.stop();
          }
        }
      }, mt102preview, this);
    }),
    mt102view:
    /*#__PURE__*/
    regeneratorRuntime.mark(function mt102view(payload, _ref13) {
      var call, put, data;
      return regeneratorRuntime.wrap(function mt102view$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              call = _ref13.call, put = _ref13.put;
              _context13.next = 3;
              return call(_api.getmainViewTable, payload);

            case 3:
              data = _context13.sent;
              _context13.next = 6;
              return put({
                type: 'mt102dataReducer',
                payload: data
              });

            case 6:
            case "end":
              return _context13.stop();
          }
        }
      }, mt102view, this);
    }),
    mainviewtable:
    /*#__PURE__*/
    regeneratorRuntime.mark(function mainviewtable(payload, _ref14) {
      var call, put, response;
      return regeneratorRuntime.wrap(function mainviewtable$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              call = _ref14.call, put = _ref14.put;
              _context14.next = 3;
              return call(_api.getmainViewTable, payload);

            case 3:
              response = _context14.sent;
              _context14.next = 6;
              return put({
                type: 'maintable',
                payload: response
              });

            case 6:
            case "end":
              return _context14.stop();
          }
        }
      }, mainviewtable, this);
    }),
    mainviewcolumn:
    /*#__PURE__*/
    regeneratorRuntime.mark(function mainviewcolumn(payload, _ref15) {
      var call, put, response;
      return regeneratorRuntime.wrap(function mainviewcolumn$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              call = _ref15.call, put = _ref15.put;
              _context15.next = 3;
              return call(_api.getmainViewColumn, payload);

            case 3:
              response = _context15.sent;
              _context15.next = 6;
              return put({
                type: 'maincolumn',
                payload: response
              });

            case 6:
            case "end":
              return _context15.stop();
          }
        }
      }, mainviewcolumn, this);
    }),
    rpmuTable:
    /*#__PURE__*/
    regeneratorRuntime.mark(function rpmuTable(payload, _ref16) {
      var call, put, response;
      return regeneratorRuntime.wrap(function rpmuTable$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              call = _ref16.call, put = _ref16.put;
              _context16.next = 3;
              return call(_api.getRPMUTable, payload);

            case 3:
              response = _context16.sent;
              _context16.next = 6;
              return put({
                type: 'rpmuReduce',
                payload: response
              });

            case 6:
            case "end":
              return _context16.stop();
          }
        }
      }, rpmuTable, this);
    }),
    mainModal:
    /*#__PURE__*/
    regeneratorRuntime.mark(function mainModal(payload, _ref17) {
      var call, put, response;
      return regeneratorRuntime.wrap(function mainModal$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              call = _ref17.call, put = _ref17.put;
              _context17.next = 3;
              return call(_api.getMainModal, payload);

            case 3:
              response = _context17.sent;
              _context17.next = 6;
              return put({
                type: 'mainModalReducer',
                payload: response
              });

            case 6:
            case "end":
              return _context17.stop();
          }
        }
      }, mainModal, this);
    }),
    mainSelect1:
    /*#__PURE__*/
    regeneratorRuntime.mark(function mainSelect1(payload, _ref18) {
      var call, put, response;
      return regeneratorRuntime.wrap(function mainSelect1$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              call = _ref18.call, put = _ref18.put;
              _context18.next = 3;
              return call(_api.getMainSelect1, payload);

            case 3:
              response = _context18.sent;
              _context18.next = 6;
              return put({
                type: 'mainSelect1Reduce',
                payload: response
              });

            case 6:
            case "end":
              return _context18.stop();
          }
        }
      }, mainSelect1, this);
    }),
    optionsData:
    /*#__PURE__*/
    regeneratorRuntime.mark(function optionsData(payload, _ref19) {
      var call, put, response;
      return regeneratorRuntime.wrap(function optionsData$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              call = _ref19.call, put = _ref19.put;
              _context19.next = 3;
              return call(_api.getOptionsdata, payload);

            case 3:
              response = _context19.sent;
              _context19.next = 6;
              return put({
                type: 'OptionReducer',
                payload: response || []
              });

            case 6:
            case "end":
              return _context19.stop();
          }
        }
      }, optionsData, this);
    }),
    optionsDatachange:
    /*#__PURE__*/
    regeneratorRuntime.mark(function optionsDatachange(payload, _ref20) {
      var call, put, response;
      return regeneratorRuntime.wrap(function optionsDatachange$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              call = _ref20.call, put = _ref20.put;
              _context20.next = 3;
              return call(_api.saveOptionsdata, payload);

            case 3:
              response = _context20.sent;
              _context20.next = 6;
              return put({
                type: 'OptionChangeReducer',
                payload: payload
              });

            case 6:
            case "end":
              return _context20.stop();
          }
        }
      }, optionsDatachange, this);
    }),
    SearcherCalendar:
    /*#__PURE__*/
    regeneratorRuntime.mark(function SearcherCalendar(payload, _ref21) {
      var call, put, response;
      return regeneratorRuntime.wrap(function SearcherCalendar$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              call = _ref21.call, put = _ref21.put;
              _context21.next = 3;
              return call(_api.getSearcherCalendar, payload);

            case 3:
              response = _context21.sent;
              _context21.next = 6;
              return put({
                type: 'SearcherCalendarReducer',
                payload: response
              });

            case 6:
            case "end":
              return _context21.stop();
          }
        }
      }, SearcherCalendar, this);
    }),
    SearcherJurCalendar:
    /*#__PURE__*/
    regeneratorRuntime.mark(function SearcherJurCalendar(payload, _ref22) {
      var call, put, response;
      return regeneratorRuntime.wrap(function SearcherJurCalendar$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              call = _ref22.call, put = _ref22.put;
              _context22.next = 3;
              return call(_api.getSearcherJurCalendar, payload);

            case 3:
              response = _context22.sent;
              _context22.next = 6;
              return put({
                type: 'SearcherJurCalendarReducer',
                payload: response
              });

            case 6:
            case "end":
              return _context22.stop();
          }
        }
      }, SearcherJurCalendar, this);
    }),
    SearcherData:
    /*#__PURE__*/
    regeneratorRuntime.mark(function SearcherData(payload, _ref23) {
      var call, put, response;
      return regeneratorRuntime.wrap(function SearcherData$(_context23) {
        while (1) {
          switch (_context23.prev = _context23.next) {
            case 0:
              call = _ref23.call, put = _ref23.put;
              _context23.next = 3;
              return call(_api.getSearcherData, payload);

            case 3:
              response = _context23.sent;
              _context23.next = 6;
              return put({
                type: 'SearcherDataReducer',
                payload: response
              });

            case 6:
            case "end":
              return _context23.stop();
          }
        }
      }, SearcherData, this);
    }),
    SearcherRPNData:
    /*#__PURE__*/
    regeneratorRuntime.mark(function SearcherRPNData(payload, _ref24) {
      var call, put, response;
      return regeneratorRuntime.wrap(function SearcherRPNData$(_context24) {
        while (1) {
          switch (_context24.prev = _context24.next) {
            case 0:
              call = _ref24.call, put = _ref24.put;
              _context24.next = 3;
              return call(_api.getSearcherRPNData, payload);

            case 3:
              response = _context24.sent;
              _context24.next = 6;
              return put({
                type: 'SearcherRNPDataReducer',
                payload: response
              });

            case 6:
            case "end":
              return _context24.stop();
          }
        }
      }, SearcherRPNData, this);
    }),
    SearcherMEDData:
    /*#__PURE__*/
    regeneratorRuntime.mark(function SearcherMEDData(payload, _ref25) {
      var call, put, response;
      return regeneratorRuntime.wrap(function SearcherMEDData$(_context25) {
        while (1) {
          switch (_context25.prev = _context25.next) {
            case 0:
              call = _ref25.call, put = _ref25.put;
              _context25.next = 3;
              return call(_api.getSearcherMEDData, payload);

            case 3:
              response = _context25.sent;
              _context25.next = 6;
              return put({
                type: 'SearcherMEDDataReducer',
                payload: response
              });

            case 6:
            case "end":
              return _context25.stop();
          }
        }
      }, SearcherMEDData, this);
    }),
    SearcherJur:
    /*#__PURE__*/
    regeneratorRuntime.mark(function SearcherJur(payload, _ref26) {
      var call, put, response;
      return regeneratorRuntime.wrap(function SearcherJur$(_context26) {
        while (1) {
          switch (_context26.prev = _context26.next) {
            case 0:
              call = _ref26.call, put = _ref26.put;
              _context26.next = 3;
              return call(_api.getSearcherJur, payload);

            case 3:
              response = _context26.sent;
              _context26.next = 6;
              return put({
                type: 'SearcherJurReducer',
                payload: response
              });

            case 6:
            case "end":
              return _context26.stop();
          }
        }
      }, SearcherJur, this);
    }),
    getperiodYear:
    /*#__PURE__*/
    regeneratorRuntime.mark(function getperiodYear(payload, _ref27) {
      var call, put, response;
      return regeneratorRuntime.wrap(function getperiodYear$(_context27) {
        while (1) {
          switch (_context27.prev = _context27.next) {
            case 0:
              call = _ref27.call, put = _ref27.put;
              _context27.next = 3;
              return call(_api.getActDics, payload);

            case 3:
              response = _context27.sent;
              _context27.next = 6;
              return put({
                type: 'dicperiodyearReducer',
                payload: response
              });

            case 6:
            case "end":
              return _context27.stop();
          }
        }
      }, getperiodYear, this);
    }),
    getperiodSection:
    /*#__PURE__*/
    regeneratorRuntime.mark(function getperiodSection(payload, _ref28) {
      var call, put, response;
      return regeneratorRuntime.wrap(function getperiodSection$(_context28) {
        while (1) {
          switch (_context28.prev = _context28.next) {
            case 0:
              call = _ref28.call, put = _ref28.put;
              _context28.next = 3;
              return call(_api.getActDics, payload);

            case 3:
              response = _context28.sent;
              _context28.next = 6;
              return put({
                type: 'dicperiodSectionReducer',
                payload: response
              });

            case 6:
            case "end":
              return _context28.stop();
          }
        }
      }, getperiodSection, this);
    }),
    getorganization:
    /*#__PURE__*/
    regeneratorRuntime.mark(function getorganization(payload, _ref29) {
      var call, put, response;
      return regeneratorRuntime.wrap(function getorganization$(_context29) {
        while (1) {
          switch (_context29.prev = _context29.next) {
            case 0:
              call = _ref29.call, put = _ref29.put;
              _context29.next = 3;
              return call(_api.getActDics, payload);

            case 3:
              response = _context29.sent;
              _context29.next = 6;
              return put({
                type: 'dicorganizationReducer',
                payload: response
              });

            case 6:
            case "end":
              return _context29.stop();
          }
        }
      }, getorganization, this);
    }),
    getmedicalType:
    /*#__PURE__*/
    regeneratorRuntime.mark(function getmedicalType(payload, _ref30) {
      var call, put, response;
      return regeneratorRuntime.wrap(function getmedicalType$(_context30) {
        while (1) {
          switch (_context30.prev = _context30.next) {
            case 0:
              call = _ref30.call, put = _ref30.put;
              _context30.next = 3;
              return call(_api.getActDics, payload);

            case 3:
              response = _context30.sent;
              _context30.next = 6;
              return put({
                type: 'dicmedicalTypeReducer',
                payload: response
              });

            case 6:
            case "end":
              return _context30.stop();
          }
        }
      }, getmedicalType, this);
    }),
    getattachmentType:
    /*#__PURE__*/
    regeneratorRuntime.mark(function getattachmentType(payload, _ref31) {
      var call, put, response;
      return regeneratorRuntime.wrap(function getattachmentType$(_context31) {
        while (1) {
          switch (_context31.prev = _context31.next) {
            case 0:
              call = _ref31.call, put = _ref31.put;
              _context31.next = 3;
              return call(_api.getActDics, payload);

            case 3:
              response = _context31.sent;
              _context31.next = 6;
              return put({
                type: 'dicattachmentTypeReducer',
                payload: response
              });

            case 6:
            case "end":
              return _context31.stop();
          }
        }
      }, getattachmentType, this);
    }),
    getpaymentRequestType:
    /*#__PURE__*/
    regeneratorRuntime.mark(function getpaymentRequestType(payload, _ref32) {
      var call, put, response;
      return regeneratorRuntime.wrap(function getpaymentRequestType$(_context32) {
        while (1) {
          switch (_context32.prev = _context32.next) {
            case 0:
              call = _ref32.call, put = _ref32.put;
              _context32.next = 3;
              return call(_api.getActDics, payload);

            case 3:
              response = _context32.sent;
              _context32.next = 6;
              return put({
                type: 'dicpaymentRequestTypeReducer',
                payload: response
              });

            case 6:
            case "end":
              return _context32.stop();
          }
        }
      }, getpaymentRequestType, this);
    }),
    getdivisions:
    /*#__PURE__*/
    regeneratorRuntime.mark(function getdivisions(payload, _ref33) {
      var call, put, response;
      return regeneratorRuntime.wrap(function getdivisions$(_context33) {
        while (1) {
          switch (_context33.prev = _context33.next) {
            case 0:
              call = _ref33.call, put = _ref33.put;
              _context33.next = 3;
              return call(_api.getActDics, payload);

            case 3:
              response = _context33.sent;
              _context33.next = 6;
              return put({
                type: 'dicdivisionsReducer',
                payload: response
              });

            case 6:
            case "end":
              return _context33.stop();
          }
        }
      }, getdivisions, this);
    }),
    getactivity:
    /*#__PURE__*/
    regeneratorRuntime.mark(function getactivity(payload, _ref34) {
      var call, put, response;
      return regeneratorRuntime.wrap(function getactivity$(_context34) {
        while (1) {
          switch (_context34.prev = _context34.next) {
            case 0:
              call = _ref34.call, put = _ref34.put;
              _context34.next = 3;
              return call(_api.getActDics, payload);

            case 3:
              response = _context34.sent;
              _context34.next = 6;
              return put({
                type: 'dicactivityReducer',
                payload: response
              });

            case 6:
            case "end":
              return _context34.stop();
          }
        }
      }, getactivity, this);
    }),
    getmeasureUnit:
    /*#__PURE__*/
    regeneratorRuntime.mark(function getmeasureUnit(payload, _ref35) {
      var call, put, response;
      return regeneratorRuntime.wrap(function getmeasureUnit$(_context35) {
        while (1) {
          switch (_context35.prev = _context35.next) {
            case 0:
              call = _ref35.call, put = _ref35.put;
              _context35.next = 3;
              return call(_api.getActDics, payload);

            case 3:
              response = _context35.sent;
              _context35.next = 6;
              return put({
                type: 'dicmeasureUnitReducer',
                payload: response
              });

            case 6:
            case "end":
              return _context35.stop();
          }
        }
      }, getmeasureUnit, this);
    }),
    getidentifierType:
    /*#__PURE__*/
    regeneratorRuntime.mark(function getidentifierType(payload, _ref36) {
      var call, put, response;
      return regeneratorRuntime.wrap(function getidentifierType$(_context36) {
        while (1) {
          switch (_context36.prev = _context36.next) {
            case 0:
              call = _ref36.call, put = _ref36.put;
              _context36.next = 3;
              return call(_api.getActDics, payload);

            case 3:
              response = _context36.sent;
              _context36.next = 6;
              return put({
                type: 'dicidentifierTypeReducer',
                payload: response
              });

            case 6:
            case "end":
              return _context36.stop();
          }
        }
      }, getidentifierType, this);
    }),
    getcurrencyType:
    /*#__PURE__*/
    regeneratorRuntime.mark(function getcurrencyType(payload, _ref37) {
      var call, put, response;
      return regeneratorRuntime.wrap(function getcurrencyType$(_context37) {
        while (1) {
          switch (_context37.prev = _context37.next) {
            case 0:
              call = _ref37.call, put = _ref37.put;
              _context37.next = 3;
              return call(_api.getActDics, payload);

            case 3:
              response = _context37.sent;
              _context37.next = 6;
              return put({
                type: 'diccurrencyTypeReducer',
                payload: response
              });

            case 6:
            case "end":
              return _context37.stop();
          }
        }
      }, getcurrencyType, this);
    }),
    getlegalForm:
    /*#__PURE__*/
    regeneratorRuntime.mark(function getlegalForm(payload, _ref38) {
      var call, put, response;
      return regeneratorRuntime.wrap(function getlegalForm$(_context38) {
        while (1) {
          switch (_context38.prev = _context38.next) {
            case 0:
              call = _ref38.call, put = _ref38.put;
              _context38.next = 3;
              return call(_api.getActDics, payload);

            case 3:
              response = _context38.sent;
              _context38.next = 6;
              return put({
                type: 'diclegalFormReducer',
                payload: response
              });

            case 6:
            case "end":
              return _context38.stop();
          }
        }
      }, getlegalForm, this);
    }),
    saveobject:
    /*#__PURE__*/
    regeneratorRuntime.mark(function saveobject(payload, _ref39) {
      var call, put, response;
      return regeneratorRuntime.wrap(function saveobject$(_context39) {
        while (1) {
          switch (_context39.prev = _context39.next) {
            case 0:
              call = _ref39.call, put = _ref39.put;
              _context39.next = 3;
              return call(_api.saveObject, payload);

            case 3:
              response = _context39.sent;
              _context39.next = 6;
              return put({
                type: 'saveObjectReducer',
                payload: response
              });

            case 6:
            case "end":
              return _context39.stop();
          }
        }
      }, saveobject, this);
    }),
    getobject:
    /*#__PURE__*/
    regeneratorRuntime.mark(function getobject(payload, _ref40) {
      var call, put, response;
      return regeneratorRuntime.wrap(function getobject$(_context40) {
        while (1) {
          switch (_context40.prev = _context40.next) {
            case 0:
              call = _ref40.call, put = _ref40.put;
              _context40.next = 3;
              return call(_api.getObject, payload);

            case 3:
              response = _context40.sent;
              _context40.next = 6;
              return put({
                type: 'getObjectReducer',
                payload: response
              });

            case 6:
            case "end":
              return _context40.stop();
          }
        }
      }, getobject, this);
    }),
    getSubContract:
    /*#__PURE__*/
    regeneratorRuntime.mark(function getSubContract(payload, _ref41) {
      var call, put, response;
      return regeneratorRuntime.wrap(function getSubContract$(_context41) {
        while (1) {
          switch (_context41.prev = _context41.next) {
            case 0:
              call = _ref41.call, put = _ref41.put;
              _context41.next = 3;
              return call(_api.createSubContract, payload);

            case 3:
              response = _context41.sent;
              _context41.next = 6;
              return put({
                type: 'createContractFromAgentReducer',
                payload: response
              });

            case 6:
            case "end":
              return _context41.stop();
          }
        }
      }, getSubContract, this);
    }),
    getCounterAgentData:
    /*#__PURE__*/
    regeneratorRuntime.mark(function getCounterAgentData(payload, _ref42) {
      var call, put, response;
      return regeneratorRuntime.wrap(function getCounterAgentData$(_context42) {
        while (1) {
          switch (_context42.prev = _context42.next) {
            case 0:
              call = _ref42.call, put = _ref42.put;
              _context42.next = 3;
              return call(_api.createContractFromAgent, payload);

            case 3:
              response = _context42.sent;
              _context42.next = 6;
              return put({
                type: 'createContractFromAgentReducer',
                payload: response
              });

            case 6:
            case "end":
              return _context42.stop();
          }
        }
      }, getCounterAgentData, this);
    }),
    clearData:
    /*#__PURE__*/
    regeneratorRuntime.mark(function clearData(payload, _ref43) {
      var call, put;
      return regeneratorRuntime.wrap(function clearData$(_context43) {
        while (1) {
          switch (_context43.prev = _context43.next) {
            case 0:
              call = _ref43.call, put = _ref43.put;
              _context43.next = 3;
              return put({
                type: 'clearDataReducer',
                payload: {
                  typeName: payload.payload.typeName,
                  value: payload.payload.value ? payload.payload.value : []
                }
              });

            case 3:
            case "end":
              return _context43.stop();
          }
        }
      }, clearData, this);
    }),
    createActForContract:
    /*#__PURE__*/
    regeneratorRuntime.mark(function createActForContract(payload, _ref44) {
      var call, put, response;
      return regeneratorRuntime.wrap(function createActForContract$(_context44) {
        while (1) {
          switch (_context44.prev = _context44.next) {
            case 0:
              call = _ref44.call, put = _ref44.put;
              _context44.next = 3;
              return call(_api.createActForContract, payload);

            case 3:
              response = _context44.sent;
              _context44.next = 6;
              return put({
                type: 'createActForContractReducer',
                payload: response
              });

            case 6:
            case "end":
              return _context44.stop();
          }
        }
      }, createActForContract, this);
    }),
    deleteObject:
    /*#__PURE__*/
    regeneratorRuntime.mark(function deleteObject(payload, _ref45) {
      var call, put, response;
      return regeneratorRuntime.wrap(function deleteObject$(_context45) {
        while (1) {
          switch (_context45.prev = _context45.next) {
            case 0:
              call = _ref45.call, put = _ref45.put;
              _context45.next = 3;
              return call(_api.deleteObject, payload);

            case 3:
              response = _context45.sent;
              _context45.next = 6;
              return put({
                type: 'deleteObjectReducer',
                payload: response
              });

            case 6:
            case "end":
              return _context45.stop();
          }
        }
      }, deleteObject, this);
    })
  },
  reducers: {
    getCommandResultReducer: function getCommandResultReducer(state, _ref46) {
      var payload = _ref46.payload;
      return _objectSpread({}, state, {
        commandResult: payload
      });
    },
    deleteObjectReducer: function deleteObjectReducer(state, _ref47) {
      var payload = _ref47.payload;
      return _objectSpread({}, state, {
        deletedObject: payload
      });
    },
    createActForContractReducer: function createActForContractReducer(state, _ref48) {
      var payload = _ref48.payload;
      return _objectSpread({}, state, {
        getObjectData: payload
      });
    },
    clearDataReducer: function clearDataReducer(state, _ref49) {
      var payload = _ref49.payload;
      return _objectSpread({}, state, _defineProperty({}, payload.typeName, payload.value));
    },
    createContractFromAgentReducer: function createContractFromAgentReducer(state, _ref50) {
      var payload = _ref50.payload;
      return _objectSpread({}, state, {
        getObjectData: payload
      });
    },
    getObjectReducer: function getObjectReducer(state, _ref51) {
      var payload = _ref51.payload;
      return _objectSpread({}, state, {
        getObjectData: payload
      });
    },
    files: function files(state, _ref52) {
      var payload = _ref52.payload;
      return _objectSpread({}, state, {
        files: payload
      });
    },
    mt102: function mt102(state, _ref53) {
      var payload = _ref53.payload;
      return _objectSpread({}, state, {
        mt102file: payload
      });
    },
    mt102dataReducer: function mt102dataReducer(state, _ref54) {
      var payload = _ref54.payload;
      return _objectSpread({}, state, {
        modalgridviewdata: payload
      });
    },
    mt102prevReducer: function mt102prevReducer(state, _ref55) {
      var payload = _ref55.payload;
      return _objectSpread({}, state, {
        refundKnpList: payload.refundKnpList
      });
    },
    setfileReduce: function setfileReduce(state, _ref56) {
      var payload = _ref56.payload;
      return _objectSpread({}, state, {
        setfile: payload
      });
    },
    paymentsDataReducer: function paymentsDataReducer(state, _ref57) {
      var payload = _ref57.payload;
      return _objectSpread({}, state, {
        paymentsData: _objectSpread({}, state.paymentsData, _defineProperty({}, payload.type, payload.response))
      });
    },
    maintable: function maintable(state, _ref58) {
      var payload = _ref58.payload;

      if (payload === undefined) {
        return _objectSpread({}, state, {
          table: {
            'size': 15,
            'totalElements': 0,
            'totalPages': 0,
            'content': []
          }
        });
      }

      return _objectSpread({}, state, {
        table: payload
      });
    },
    maincolumn: function maincolumn(state, _ref59) {
      var payload = _ref59.payload;
      return _objectSpread({}, state, {
        columns: payload
      });
    },
    rpmuReduce: function rpmuReduce(state, _ref60) {
      var payload = _ref60.payload;
      return _objectSpread({}, state, {
        rpmu: payload
      });
    },
    mainModalReducer: function mainModalReducer(state, _ref61) {
      var payload = _ref61.payload;
      return _objectSpread({}, state, {
        mainmodal: payload
      });
    },
    mainSelect1Reduce: function mainSelect1Reduce(state, _ref62) {
      var payload = _ref62.payload;
      return _objectSpread({}, state, {
        select1: payload
      });
    },
    OptionReducer: function OptionReducer(state, _ref63) {
      var payload = _ref63.payload;
      return _objectSpread({}, state, {
        options: payload
      });
    },
    OptionChangeReducer: function OptionChangeReducer(state, _ref64) {
      var payload = _ref64.payload;
      return state;
    },
    SearcherCalendarReducer: function SearcherCalendarReducer(state, _ref65) {
      var payload = _ref65.payload;
      return _objectSpread({}, state, {
        searchercalendar: payload
      });
    },
    SearcherJurCalendarReducer: function SearcherJurCalendarReducer(state, _ref66) {
      var payload = _ref66.payload;
      return _objectSpread({}, state, {
        searcherjurcalendar: payload
      });
    },
    SearcherDataReducer: function SearcherDataReducer(state, _ref67) {
      var payload = _ref67.payload;
      return _objectSpread({}, state, {
        searcherdata: payload
      });
    },
    SearcherRNPDataReducer: function SearcherRNPDataReducer(state, _ref68) {
      var payload = _ref68.payload;
      return _objectSpread({}, state, {
        searcherRPNdata: payload
      });
    },
    SearcherMEDDataReducer: function SearcherMEDDataReducer(state, _ref69) {
      var payload = _ref69.payload;
      return _objectSpread({}, state, {
        searcherMEDdata: payload
      });
    },
    SearcherJurReducer: function SearcherJurReducer(state, _ref70) {
      var payload = _ref70.payload;
      return _objectSpread({}, state, {
        searcherjur: payload
      });
    },
    dicperiodyearReducer: function dicperiodyearReducer(state, _ref71) {
      var payload = _ref71.payload;
      return _objectSpread({}, state, {
        periodYear: payload
      });
    },
    dicperiodSectionReducer: function dicperiodSectionReducer(state, _ref72) {
      var payload = _ref72.payload;
      return _objectSpread({}, state, {
        periodSection: payload
      });
    },
    dicorganizationReducer: function dicorganizationReducer(state, _ref73) {
      var payload = _ref73.payload;
      return _objectSpread({}, state, {
        organization: payload
      });
    },
    dicmedicalTypeReducer: function dicmedicalTypeReducer(state, _ref74) {
      var payload = _ref74.payload;
      return _objectSpread({}, state, {
        medicalType: payload
      });
    },
    dicattachmentTypeReducer: function dicattachmentTypeReducer(state, _ref75) {
      var payload = _ref75.payload;
      return _objectSpread({}, state, {
        attachmentType: payload
      });
    },
    dicpaymentRequestTypeReducer: function dicpaymentRequestTypeReducer(state, _ref76) {
      var payload = _ref76.payload;
      return _objectSpread({}, state, {
        paymentRequestType: payload
      });
    },
    dicdivisionsReducer: function dicdivisionsReducer(state, _ref77) {
      var payload = _ref77.payload;
      return _objectSpread({}, state, {
        divisions: payload
      });
    },
    dicactivityReducer: function dicactivityReducer(state, _ref78) {
      var payload = _ref78.payload;
      return _objectSpread({}, state, {
        activity: payload
      });
    },
    dicmeasureUnitReducer: function dicmeasureUnitReducer(state, _ref79) {
      var payload = _ref79.payload;
      return _objectSpread({}, state, {
        measureUnit: payload
      });
    },
    dicidentifierTypeReducer: function dicidentifierTypeReducer(state, _ref80) {
      var payload = _ref80.payload;
      return _objectSpread({}, state, {
        identifierType: payload
      });
    },
    diccurrencyTypeReducer: function diccurrencyTypeReducer(state, _ref81) {
      var payload = _ref81.payload;
      return _objectSpread({}, state, {
        currencyType: payload
      });
    },
    diclegalFormReducer: function diclegalFormReducer(state, _ref82) {
      var payload = _ref82.payload;
      return _objectSpread({}, state, {
        legalForm: payload
      });
    },

    /*identifierType: {},
    currencyType: {},
    legalForm: {},*/
    saveObjectReducer: function saveObjectReducer(state, _ref83) {
      var payload = _ref83.payload;
      return _objectSpread({}, state, {
        saveanswer: payload
      });
    },
    uploadFileReducer: function uploadFileReducer(state, _ref84) {
      var payload = _ref84.payload;
      console.log(payload);
      return _objectSpread({}, state, {
        uploadanswer: payload
      });
    }
  }
};
exports.default = _default;
//# sourceMappingURL=universal.js.map
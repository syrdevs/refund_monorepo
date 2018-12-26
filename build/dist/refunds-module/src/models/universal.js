var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { getmainViewTable, getmainViewColumn, getRPMUTable, getMainModal, getMainSelect1, getOptionsdata, setfile, getmt102file, mt102preview, setRefundStatus, getFilesRequest, deleteFileRequest, setDateRequest, dAppRefundStatusAuto, setDateRefund, saveOptionsdata, getReceiversRefund, paymentsData, getSearcherCalendar, getSearcherData, getSearcherJur, getSearcherJurCalendar, getSearcherRPNData, getSearcherMEDData, getActDics, saveObject, getObject, createContractFromAgent, createActForContract, deleteObject, getCommands, createSubContract } from '../services/api';
export default {
    namespace: 'universal',
    state: {
        table: {
            number: null,
            size: null,
            totalElements: null,
            totalPages: null,
            content: [],
        },
        files: [],
        columns: [],
        rpmu: {
            columns: [],
            data: [],
        },
        mainmodal: [],
        select1: [],
        options: [],
        refundKnpList: [],
        modalgridviewdata: [],
        paymentsData: {
            mt100: {},
            mt102: {},
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
        commandResult: [],
    },
    effects: {
        getCommandResult: function (payload, _a) {
            var response;
            var call = _a.call, put = _a.put;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, call(getCommands, payload)];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, put({
                                type: 'getCommandResultReducer',
                                payload: response,
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        },
        receiversRefund: function (payload, _a) {
            var call = _a.call, put = _a.put;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, call(getReceiversRefund, payload)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        },
        AppRefundStatusAuto: function (payload, _a) {
            var call = _a.call, put = _a.put;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, call(dAppRefundStatusAuto, payload)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        },
        removeFileRequest: function (payload, _a) {
            var call = _a.call;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, call(deleteFileRequest, payload)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        },
        getFilesRequestDate: function (payload, _a) {
            var response;
            var call = _a.call, put = _a.put;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, call(getFilesRequest, payload)];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, put({
                                type: 'files',
                                payload: response,
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        },
        changeRefundStatus: function (payload, _a) {
            var call = _a.call;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, call(setRefundStatus, payload)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        },
        changeDateRefund: function (payload, _a) {
            var call = _a.call;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, call(setDateRefund, payload)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        },
        changeDateRequest: function (payload, _a) {
            var call = _a.call;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, call(setDateRequest, payload)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        },
        setfile: function (payload, _a) {
            var response;
            var call = _a.call, put = _a.put;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, call(setfile, payload)];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, put({
                                type: 'setfileReduce',
                                payload: response,
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        },
        paymentsData: function (payload, _a) {
            var response;
            var call = _a.call, put = _a.put;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, call(paymentsData, payload.payload)];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, put({
                                type: 'paymentsDataReducer',
                                payload: {
                                    type: payload.payload.entity,
                                    response: response || {},
                                },
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        },
        getmt102: function (payload, _a) {
            var response;
            var call = _a.call, put = _a.put;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, call(getmt102file, payload)];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, put({
                                type: 'mt102',
                                payload: response,
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        },
        mt102preview: function (payload, _a) {
            var response, data;
            var call = _a.call, put = _a.put;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, call(mt102preview, payload)];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, put({
                                type: 'mt102prevReducer',
                                payload: response,
                            })];
                    case 2:
                        _b.sent();
                        if (!(response.refundKnpList.length > 0)) return [3 /*break*/, 5];
                        payload.payload.src.searched = true;
                        payload.payload.src.data['knpList'] = {
                            id: response.refundKnpList[0].id,
                        };
                        return [4 /*yield*/, call(getmainViewTable, payload)];
                    case 3:
                        data = _b.sent();
                        return [4 /*yield*/, put({
                                type: 'mt102dataReducer',
                                payload: data,
                            })];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        },
        mt102view: function (payload, _a) {
            var data;
            var call = _a.call, put = _a.put;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, call(getmainViewTable, payload)];
                    case 1:
                        data = _b.sent();
                        return [4 /*yield*/, put({
                                type: 'mt102dataReducer',
                                payload: data,
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        },
        mainviewtable: function (payload, _a) {
            var response;
            var call = _a.call, put = _a.put;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, call(getmainViewTable, payload)];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, put({
                                type: 'maintable',
                                payload: response,
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        },
        mainviewcolumn: function (payload, _a) {
            var response;
            var call = _a.call, put = _a.put;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, call(getmainViewColumn, payload)];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, put({
                                type: 'maincolumn',
                                payload: response,
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        },
        rpmuTable: function (payload, _a) {
            var response;
            var call = _a.call, put = _a.put;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, call(getRPMUTable, payload)];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, put({
                                type: 'rpmuReduce',
                                payload: response,
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        },
        mainModal: function (payload, _a) {
            var response;
            var call = _a.call, put = _a.put;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, call(getMainModal, payload)];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, put({
                                type: 'mainModalReducer',
                                payload: response,
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        },
        mainSelect1: function (payload, _a) {
            var response;
            var call = _a.call, put = _a.put;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, call(getMainSelect1, payload)];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, put({
                                type: 'mainSelect1Reduce',
                                payload: response,
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        },
        optionsData: function (payload, _a) {
            var response;
            var call = _a.call, put = _a.put;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, call(getOptionsdata, payload)];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, put({
                                type: 'OptionReducer',
                                payload: response || [],
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        },
        optionsDatachange: function (payload, _a) {
            var response;
            var call = _a.call, put = _a.put;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, call(saveOptionsdata, payload)];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, put({
                                type: 'OptionChangeReducer',
                                payload: payload,
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        },
        SearcherCalendar: function (payload, _a) {
            var response;
            var call = _a.call, put = _a.put;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, call(getSearcherCalendar, payload)];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, put({
                                type: 'SearcherCalendarReducer',
                                payload: response,
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        },
        SearcherJurCalendar: function (payload, _a) {
            var response;
            var call = _a.call, put = _a.put;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, call(getSearcherJurCalendar, payload)];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, put({
                                type: 'SearcherJurCalendarReducer',
                                payload: response,
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        },
        SearcherData: function (payload, _a) {
            var response;
            var call = _a.call, put = _a.put;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, call(getSearcherData, payload)];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, put({
                                type: 'SearcherDataReducer',
                                payload: response,
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        },
        SearcherRPNData: function (payload, _a) {
            var response;
            var call = _a.call, put = _a.put;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, call(getSearcherRPNData, payload)];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, put({
                                type: 'SearcherRNPDataReducer',
                                payload: response,
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        },
        SearcherMEDData: function (payload, _a) {
            var response;
            var call = _a.call, put = _a.put;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, call(getSearcherMEDData, payload)];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, put({
                                type: 'SearcherMEDDataReducer',
                                payload: response,
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        },
        SearcherJur: function (payload, _a) {
            var response;
            var call = _a.call, put = _a.put;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, call(getSearcherJur, payload)];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, put({
                                type: 'SearcherJurReducer',
                                payload: response,
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        },
        getperiodYear: function (payload, _a) {
            var response;
            var call = _a.call, put = _a.put;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, call(getActDics, payload)];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, put({
                                type: 'dicperiodyearReducer',
                                payload: response,
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        },
        getperiodSection: function (payload, _a) {
            var response;
            var call = _a.call, put = _a.put;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, call(getActDics, payload)];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, put({
                                type: 'dicperiodSectionReducer',
                                payload: response,
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        },
        getorganization: function (payload, _a) {
            var response;
            var call = _a.call, put = _a.put;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, call(getActDics, payload)];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, put({
                                type: 'dicorganizationReducer',
                                payload: response,
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        },
        getmedicalType: function (payload, _a) {
            var response;
            var call = _a.call, put = _a.put;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, call(getActDics, payload)];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, put({
                                type: 'dicmedicalTypeReducer',
                                payload: response,
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        },
        getattachmentType: function (payload, _a) {
            var response;
            var call = _a.call, put = _a.put;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, call(getActDics, payload)];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, put({
                                type: 'dicattachmentTypeReducer',
                                payload: response,
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        },
        getpaymentRequestType: function (payload, _a) {
            var response;
            var call = _a.call, put = _a.put;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, call(getActDics, payload)];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, put({
                                type: 'dicpaymentRequestTypeReducer',
                                payload: response,
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        },
        getdivisions: function (payload, _a) {
            var response;
            var call = _a.call, put = _a.put;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, call(getActDics, payload)];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, put({
                                type: 'dicdivisionsReducer',
                                payload: response,
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        },
        getactivity: function (payload, _a) {
            var response;
            var call = _a.call, put = _a.put;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, call(getActDics, payload)];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, put({
                                type: 'dicactivityReducer',
                                payload: response,
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        },
        getmeasureUnit: function (payload, _a) {
            var response;
            var call = _a.call, put = _a.put;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, call(getActDics, payload)];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, put({
                                type: 'dicmeasureUnitReducer',
                                payload: response,
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        },
        getidentifierType: function (payload, _a) {
            var response;
            var call = _a.call, put = _a.put;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, call(getActDics, payload)];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, put({
                                type: 'dicidentifierTypeReducer',
                                payload: response,
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        },
        getcurrencyType: function (payload, _a) {
            var response;
            var call = _a.call, put = _a.put;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, call(getActDics, payload)];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, put({
                                type: 'diccurrencyTypeReducer',
                                payload: response,
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        },
        getlegalForm: function (payload, _a) {
            var response;
            var call = _a.call, put = _a.put;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, call(getActDics, payload)];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, put({
                                type: 'diclegalFormReducer',
                                payload: response,
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        },
        saveobject: function (payload, _a) {
            var response;
            var call = _a.call, put = _a.put;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, call(saveObject, payload)];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, put({
                                type: 'saveObjectReducer',
                                payload: response,
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        },
        getobject: function (payload, _a) {
            var response;
            var call = _a.call, put = _a.put;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, call(getObject, payload)];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, put({
                                type: 'getObjectReducer',
                                payload: response,
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        },
        getSubContract: function (payload, _a) {
            var response;
            var call = _a.call, put = _a.put;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, call(createSubContract, payload)];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, put({
                                type: 'createContractFromAgentReducer',
                                payload: response,
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        },
        getCounterAgentData: function (payload, _a) {
            var response;
            var call = _a.call, put = _a.put;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, call(createContractFromAgent, payload)];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, put({
                                type: 'createContractFromAgentReducer',
                                payload: response,
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        },
        clearData: function (payload, _a) {
            var call = _a.call, put = _a.put;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, put({
                            type: 'clearDataReducer',
                            payload: {
                                typeName: payload.payload.typeName,
                                value: payload.payload.value ? payload.payload.value : [],
                            },
                        })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        },
        createActForContract: function (payload, _a) {
            var response;
            var call = _a.call, put = _a.put;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, call(createActForContract, payload)];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, put({
                                type: 'createActForContractReducer',
                                payload: response,
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        },
        deleteObject: function (payload, _a) {
            var response;
            var call = _a.call, put = _a.put;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, call(deleteObject, payload)];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, put({
                                type: 'deleteObjectReducer',
                                payload: response,
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        },
    },
    reducers: {
        getCommandResultReducer: function (state, _a) {
            var payload = _a.payload;
            return __assign({}, state, { commandResult: payload });
        },
        deleteObjectReducer: function (state, _a) {
            var payload = _a.payload;
            return __assign({}, state, { deletedObject: payload });
        },
        createActForContractReducer: function (state, _a) {
            var payload = _a.payload;
            return __assign({}, state, { getObjectData: payload });
        },
        clearDataReducer: function (state, _a) {
            var payload = _a.payload;
            var _b;
            return __assign({}, state, (_b = {}, _b[payload.typeName] = payload.value, _b));
        },
        createContractFromAgentReducer: function (state, _a) {
            var payload = _a.payload;
            return __assign({}, state, { getObjectData: payload });
        },
        getObjectReducer: function (state, _a) {
            var payload = _a.payload;
            return __assign({}, state, { getObjectData: payload });
        },
        files: function (state, _a) {
            var payload = _a.payload;
            return __assign({}, state, { files: payload });
        },
        mt102: function (state, _a) {
            var payload = _a.payload;
            return __assign({}, state, { mt102file: payload });
        },
        mt102dataReducer: function (state, _a) {
            var payload = _a.payload;
            return __assign({}, state, { modalgridviewdata: payload });
        },
        mt102prevReducer: function (state, _a) {
            var payload = _a.payload;
            return __assign({}, state, { refundKnpList: payload.refundKnpList });
        },
        setfileReduce: function (state, _a) {
            var payload = _a.payload;
            return __assign({}, state, { setfile: payload });
        },
        paymentsDataReducer: function (state, _a) {
            var payload = _a.payload;
            var _b;
            return __assign({}, state, { paymentsData: __assign({}, state.paymentsData, (_b = {}, _b[payload.type] = payload.response, _b)) });
        },
        maintable: function (state, _a) {
            var payload = _a.payload;
            if (payload === undefined) {
                return __assign({}, state, { table: {
                        'size': 15,
                        'totalElements': 0,
                        'totalPages': 0,
                        'content': [],
                    } });
            }
            return __assign({}, state, { table: payload });
        },
        maincolumn: function (state, _a) {
            var payload = _a.payload;
            return __assign({}, state, { columns: payload });
        },
        rpmuReduce: function (state, _a) {
            var payload = _a.payload;
            return __assign({}, state, { rpmu: payload });
        },
        mainModalReducer: function (state, _a) {
            var payload = _a.payload;
            return __assign({}, state, { mainmodal: payload });
        },
        mainSelect1Reduce: function (state, _a) {
            var payload = _a.payload;
            return __assign({}, state, { select1: payload });
        },
        OptionReducer: function (state, _a) {
            var payload = _a.payload;
            return __assign({}, state, { options: payload });
        },
        OptionChangeReducer: function (state, _a) {
            var payload = _a.payload;
            return state;
        },
        SearcherCalendarReducer: function (state, _a) {
            var payload = _a.payload;
            return __assign({}, state, { searchercalendar: payload });
        },
        SearcherJurCalendarReducer: function (state, _a) {
            var payload = _a.payload;
            return __assign({}, state, { searcherjurcalendar: payload });
        },
        SearcherDataReducer: function (state, _a) {
            var payload = _a.payload;
            return __assign({}, state, { searcherdata: payload });
        },
        SearcherRNPDataReducer: function (state, _a) {
            var payload = _a.payload;
            return __assign({}, state, { searcherRPNdata: payload });
        },
        SearcherMEDDataReducer: function (state, _a) {
            var payload = _a.payload;
            return __assign({}, state, { searcherMEDdata: payload });
        },
        SearcherJurReducer: function (state, _a) {
            var payload = _a.payload;
            return __assign({}, state, { searcherjur: payload });
        },
        dicperiodyearReducer: function (state, _a) {
            var payload = _a.payload;
            return __assign({}, state, { periodYear: payload });
        },
        dicperiodSectionReducer: function (state, _a) {
            var payload = _a.payload;
            return __assign({}, state, { periodSection: payload });
        },
        dicorganizationReducer: function (state, _a) {
            var payload = _a.payload;
            return __assign({}, state, { organization: payload });
        },
        dicmedicalTypeReducer: function (state, _a) {
            var payload = _a.payload;
            return __assign({}, state, { medicalType: payload });
        },
        dicattachmentTypeReducer: function (state, _a) {
            var payload = _a.payload;
            return __assign({}, state, { attachmentType: payload });
        },
        dicpaymentRequestTypeReducer: function (state, _a) {
            var payload = _a.payload;
            return __assign({}, state, { paymentRequestType: payload });
        },
        dicdivisionsReducer: function (state, _a) {
            var payload = _a.payload;
            return __assign({}, state, { divisions: payload });
        },
        dicactivityReducer: function (state, _a) {
            var payload = _a.payload;
            return __assign({}, state, { activity: payload });
        },
        dicmeasureUnitReducer: function (state, _a) {
            var payload = _a.payload;
            return __assign({}, state, { measureUnit: payload });
        },
        dicidentifierTypeReducer: function (state, _a) {
            var payload = _a.payload;
            return __assign({}, state, { identifierType: payload });
        },
        diccurrencyTypeReducer: function (state, _a) {
            var payload = _a.payload;
            return __assign({}, state, { currencyType: payload });
        },
        diclegalFormReducer: function (state, _a) {
            var payload = _a.payload;
            return __assign({}, state, { legalForm: payload });
        },
        /*identifierType: {},
       currencyType: {},
       legalForm: {},*/
        saveObjectReducer: function (state, _a) {
            var payload = _a.payload;
            return __assign({}, state, { saveanswer: payload });
        },
        uploadFileReducer: function (state, _a) {
            var payload = _a.payload;
            console.log(payload);
            return __assign({}, state, { uploadanswer: payload });
        },
    },
};
//# sourceMappingURL=universal.js.map
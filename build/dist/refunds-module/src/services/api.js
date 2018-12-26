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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import { stringify } from 'qs';
import request from '../utils/request';
function sleepF(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}
export function getReference(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/api/dictionaryListByName?name=' + params.code)];
        });
    });
}
export function getColumns(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request("/apis/refund/" + params.payload.table + "column")];
        });
    });
}
export function getData(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (['payment', 'paymentcolumn', 'templates', 'journaldata', 'journal'].indexOf(params.payload.table) !== -1) {
                return [2 /*return*/, request("/apis/refund/" + params.payload.table + "data")];
            }
            return [2 /*return*/, request("/api/refund/" + params.payload.table, {
                    method: 'POST',
                    body: params.payload,
                })];
        });
    });
}
export function queryProjectNotice() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/api/project/notice')];
        });
    });
}
export function queryActivities() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/api/activities')];
        });
    });
}
export function queryRule(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request("/api/rule?" + stringify(params))];
        });
    });
}
export function removeRule(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/api/rule', {
                    method: 'POST',
                    body: __assign({}, params, { method: 'delete' }),
                })];
        });
    });
}
export function getList(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/api/uicommand/getList', {
                    method: 'POST',
                    body: params.payload,
                })];
        });
    });
}
export function paymentsData(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/api/uicommand/getList', {
                    method: 'POST',
                    body: __assign({}, params),
                })];
        });
    });
}
export function addRule(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/api/rule', {
                    method: 'POST',
                    body: __assign({}, params, { method: 'post' }),
                })];
        });
    });
}
export function updateRule(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/api/rule', {
                    method: 'POST',
                    body: __assign({}, params, { method: 'update' }),
                })];
        });
    });
}
export function fakeSubmitForm(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/api/forms', {
                    method: 'POST',
                    body: params,
                })];
        });
    });
}
export function fakeChartData() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/api/fake_chart_data')];
        });
    });
}
export function queryTags() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/api/tags')];
        });
    });
}
export function queryBasicProfile() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/api/profile/basic')];
        });
    });
}
export function queryAdvancedProfile() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/api/profile/advanced')];
        });
    });
}
export function queryFakeList(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request("/api/fake_list?" + stringify(params))];
        });
    });
}
export function removeFakeList(params) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, count, restParams;
        return __generator(this, function (_b) {
            _a = params.count, count = _a === void 0 ? 5 : _a, restParams = __rest(params, ["count"]);
            return [2 /*return*/, request("/api/fake_list?count=" + count, {
                    method: 'POST',
                    body: __assign({}, restParams, { method: 'delete' }),
                })];
        });
    });
}
export function addFakeList(params) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, count, restParams;
        return __generator(this, function (_b) {
            _a = params.count, count = _a === void 0 ? 5 : _a, restParams = __rest(params, ["count"]);
            return [2 /*return*/, request("/api/fake_list?count=" + count, {
                    method: 'POST',
                    body: __assign({}, restParams, { method: 'post' }),
                })];
        });
    });
}
export function updateFakeList(params) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, count, restParams;
        return __generator(this, function (_b) {
            _a = params.count, count = _a === void 0 ? 5 : _a, restParams = __rest(params, ["count"]);
            return [2 /*return*/, request("/api/fake_list?count=" + count, {
                    method: 'POST',
                    body: __assign({}, restParams, { method: 'update' }),
                })];
        });
    });
}
export function fakeAccountLogin(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/api/login/account', {
                    method: 'POST',
                    body: params,
                })];
        });
    });
}
export function fakeRegister(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/api/register', {
                    method: 'POST',
                    body: params,
                })];
        });
    });
}
export function queryNotices() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/api/notices')];
        });
    });
}
export function getFakeCaptcha(mobile) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request("/api/captcha?mobile=" + mobile)];
        });
    });
}
export function LoginUser(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/api/login', {
                    method: 'POST',
                    body: params,
                })];
        });
    });
}
export function LogoutUser() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/api/logout', {
                    method: 'POST',
                })];
        });
    });
}
export function CheckToken(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/api/CheckToken')];
        });
    });
}
export function setRefundStatus(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/api/refund/refundStatus', {
                    method: 'POST',
                    body: params.payload,
                })];
        });
    });
}
export function getmainViewTable(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/api/refund/getRefundPage', {
                    method: 'POST',
                    body: params.payload,
                })];
        });
    });
}
export function getmainViewColumn(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/api/refund/maindata')];
        });
    });
}
export function getRPMUTable(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/api/refund/paymentByRefundId', {
                    method: 'POST',
                    body: params.payload,
                })];
        });
    });
}
export function dAppRefundStatusAuto(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/api/refund/dAppRefundStatusAuto', {
                    method: 'POST',
                    body: params.payload,
                })];
        });
    });
}
export function getMainModal(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/api/refund/mainmodal')];
        });
    });
}
export function getMainSelect1(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/api/refund/mainselect1')];
        });
    });
}
export function getOptionsdata(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/api/refund/getUserOptionList')];
        });
    });
}
export function saveOptionsdata(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/api/refund/saveUserOptionList', {
                    method: 'POST',
                    body: params.payload,
                })];
        });
    });
}
export function getFilesRequest(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/api/refund/upload/application/get/' + params.payload.id)];
        });
    });
}
export function deleteFileRequest(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/api/refund/upload/application/remove/' + params.payload.id, {
                    method: 'POST',
                })];
        });
    });
}
export function setDateRefund(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/api/refund/refundSetDate', {
                    method: 'POST',
                    body: params.payload,
                })];
        });
    });
}
export function setDateRequest(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/api/refund/applicationSetDate', {
                    method: 'POST',
                    body: params.payload,
                })];
        });
    });
}
export function setfile(params) {
    return __awaiter(this, void 0, void 0, function () {
        var formData;
        return __generator(this, function (_a) {
            formData = new FormData();
            formData.append('file', params.payload.file);
            return [2 /*return*/, request('/api/refund/upload/application/add/' + params.payload.id, {
                    method: 'POST',
                    body: formData,
                })];
        });
    });
}
export function getmt102file(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/api/refund/getfile')];
        });
    });
}
export function mt102preview(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/api/refund/mt102GroupByKnpPreview', {
                    method: 'POST',
                    body: params.payload.src,
                })];
        });
    });
}
export function getCalendarEvents(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request("/api/refund/getCalendarEvents?" + stringify(params.payload))];
        });
    });
}
export function saveCalendarEvents(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/api/refund/saveCalendarEvent', {
                    method: 'POST',
                    body: params.payload,
                })];
        });
    });
}
export function removeCalendarEvents(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request("/api/refund/removeCalendarEvent?" + stringify(params.payload), {
                    method: 'POST',
                })];
        });
    });
}
export function getJournalData(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/api/refund/getRefundHisPage', {
                    method: 'POST',
                    body: params.payload,
                })];
        });
    });
}
export function getStaticticsData(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            //console.log(`/api/refund/get/stat?${stringify(params.payload)}`)
            return [2 /*return*/, request("/api/refund/get/stat?" + stringify(params.payload))];
        });
    });
}
export function getReceiversRefund(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/api/uicommand/runCommand', {
                    method: 'POST',
                    body: params.payload,
                })];
        });
    });
}
export function getReportsList(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/api/report/getReportList')];
        });
    });
}
export function getReportParameters(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request("/api/report/getReportParameters?" + stringify(params.payload))];
        });
    });
}
export function getFormedReports(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/api/uicommand/getList', {
                    method: 'POST',
                    body: params.payload,
                })];
        });
    });
}
export function getSearcherCalendar(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/api/rpmu/personPeriodList', {
                    method: 'POST',
                    body: params.payload,
                })];
        });
    });
}
export function getSearcherJurCalendar(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/api/rpmu/senderPeriodList', {
                    method: 'POST',
                    body: params.payload,
                })];
        });
    });
}
export function getSearcherData(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/api/external/gbdflGetPerson', {
                    method: 'POST',
                    body: params.payload,
                })];
        });
    });
}
export function getSearcherRPNData(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/api/external/rpnGetPerson', {
                    method: 'POST',
                    body: params.payload,
                })];
        });
    });
}
export function getSearcherMEDData(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/api/external/medInfGetPerson', {
                    method: 'POST',
                    body: params.payload,
                })];
        });
    });
}
export function getSearcherJur(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/api/external/rpmuGetSender', {
                    method: 'POST',
                    body: params.payload,
                })];
        });
    });
}
export function getActDics(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/api/uicommand/getList', {
                    method: 'POST',
                    body: params.payload,
                })];
        });
    });
}
export function saveObject(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/api/uicommand/saveObject', {
                    method: 'POST',
                    body: params.payload,
                })];
        });
    });
}
export function getObject(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/api/uicommand/getObject', {
                    method: 'POST',
                    body: params.payload,
                })];
        });
    });
}
export function createContractFromAgent(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/api/contract/createContractFromAgent', {
                    method: 'POST',
                    body: params.payload,
                })];
        });
    });
}
export function createSubContract(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/api/contract/createSubContract', {
                    method: 'POST',
                    body: params.payload,
                })];
        });
    });
}
export function createActForContract(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/api/contract/createActForContract', {
                    method: 'POST',
                    body: params.payload,
                })];
        });
    });
}
export function uploadFile(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/api/uicommand/uploadFile', {
                    method: 'POST',
                    body: params.payload,
                })];
        });
    });
}
export function deleteObject(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request('/api/uicommand/deleteObject', {
                    method: 'POST',
                    body: params.payload,
                })];
        });
    });
}
export function getCommands(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request("/api/uicommand/getCommands?" + stringify(params.payload))];
        });
    });
}
export function getPublish(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request("/api/contract/publishDocument?entity=contract&id=" + params.payload.id)];
        });
    });
}
//# sourceMappingURL=api.js.map
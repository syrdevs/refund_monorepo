"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var effects_1 = require("redux-saga/effects");
var businessDataStateConstants_1 = require("../../Constants/businessDataStateConstants");
var workerSagas_1 = require("./workerSagas");
function fetchNoticesSaga() {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.takeEvery(businessDataStateConstants_1.FETCH_NOTICES, workerSagas_1.fetchNoticesWorkerSaga)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
exports.fetchNoticesSaga = fetchNoticesSaga;
function fetchSingleNoticeSaga() {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.takeEvery(businessDataStateConstants_1.FETCH_SINGLE_NOTICE, workerSagas_1.fetchSingleNoticeWorkerSaga)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
exports.fetchSingleNoticeSaga = fetchSingleNoticeSaga;
function setNewNoticeSaga() {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.takeEvery(businessDataStateConstants_1.SET_NEW_NOTICE_REQUESTED, workerSagas_1.setNewNoticeWorkerSaga)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
exports.setNewNoticeSaga = setNewNoticeSaga;
function fetchCommissionsSaga() {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.takeEvery(businessDataStateConstants_1.FETCH_COMMISSIONS, workerSagas_1.fetchCommissionsWorkerSaga)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
exports.fetchCommissionsSaga = fetchCommissionsSaga;
function fetchSingleCommissionSaga() {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.takeEvery(businessDataStateConstants_1.FETCH_SINGLE_COMMISSION, workerSagas_1.fetchSingleCommissionWorkerSaga)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
exports.fetchSingleCommissionSaga = fetchSingleCommissionSaga;
function findPersonByIINSaga() {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.takeEvery(businessDataStateConstants_1.FIND_PERSON_BY_IIN, workerSagas_1.findPersonByIINWorkerSaga)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
exports.findPersonByIINSaga = findPersonByIINSaga;
function setNewCommissionSaga() {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.takeEvery(businessDataStateConstants_1.SET_NEW_COMMISSION_REQUESTED, workerSagas_1.setNewCommissionWorkerSaga)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
exports.setNewCommissionSaga = setNewCommissionSaga;
function fetchCustomDictSaga() {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.takeEvery(businessDataStateConstants_1.FETCH_CUSTOM_DICT, workerSagas_1.fetchCustomDictWorkerSaga)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
exports.fetchCustomDictSaga = fetchCustomDictSaga;
function deleteCommissionMemberSaga() {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.takeEvery(businessDataStateConstants_1.DELETE_COMMISSION_MEMBER, workerSagas_1.deleteCommissionMemberWorkerSaga)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
exports.deleteCommissionMemberSaga = deleteCommissionMemberSaga;
// export function* fetchAdApplicantsSaga() {
//   yield takeEvery(FETCH_ADVERTISEMENT_APPLICANTS, fetchAdApplicantsWorkerSaga)
// }
//
// export function* fetchSuppliersSaga() {
//   yield takeEvery(FETCH_SUPPLIERS, fetchSuppliersWorkerSaga)
// }
//
// export function* fetchBadSuppliersSaga() {
//   yield takeEvery(FETCH_BAD_SUPPLIERS, fetchBadSuppliersWorkerSaga)
// }
//# sourceMappingURL=initializationSagas.js.map
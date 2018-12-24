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
import { takeEvery } from 'redux-saga/effects';
import { DELETE_COMMISSION_MEMBER, FETCH_COMMISSIONS, FETCH_CUSTOM_DICT, FETCH_NOTICES, FETCH_SINGLE_COMMISSION, FETCH_SINGLE_NOTICE, FIND_PERSON_BY_IIN, SET_NEW_COMMISSION_REQUESTED, SET_NEW_NOTICE_REQUESTED, } from '../../Constants/businessDataStateConstants';
import { deleteCommissionMemberWorkerSaga, fetchCommissionsWorkerSaga, fetchCustomDictWorkerSaga, fetchNoticesWorkerSaga, fetchSingleCommissionWorkerSaga, fetchSingleNoticeWorkerSaga, findPersonByIINWorkerSaga, setNewCommissionWorkerSaga, setNewNoticeWorkerSaga, } from './workerSagas';
export function fetchNoticesSaga() {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, takeEvery(FETCH_NOTICES, fetchNoticesWorkerSaga)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
export function fetchSingleNoticeSaga() {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, takeEvery(FETCH_SINGLE_NOTICE, fetchSingleNoticeWorkerSaga)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
export function setNewNoticeSaga() {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, takeEvery(SET_NEW_NOTICE_REQUESTED, setNewNoticeWorkerSaga)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
export function fetchCommissionsSaga() {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, takeEvery(FETCH_COMMISSIONS, fetchCommissionsWorkerSaga)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
export function fetchSingleCommissionSaga() {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, takeEvery(FETCH_SINGLE_COMMISSION, fetchSingleCommissionWorkerSaga)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
export function findPersonByIINSaga() {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, takeEvery(FIND_PERSON_BY_IIN, findPersonByIINWorkerSaga)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
export function setNewCommissionSaga() {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, takeEvery(SET_NEW_COMMISSION_REQUESTED, setNewCommissionWorkerSaga)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
export function fetchCustomDictSaga() {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, takeEvery(FETCH_CUSTOM_DICT, fetchCustomDictWorkerSaga)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
export function deleteCommissionMemberSaga() {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, takeEvery(DELETE_COMMISSION_MEMBER, deleteCommissionMemberWorkerSaga)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
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
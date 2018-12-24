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
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
import { message } from 'antd';
import { all, call, put } from 'redux-saga/effects';
import { dictionariesList } from '../../../Infrastructure/dictionariesList';
import { createApiClient } from '../../../utils';
import { fetchCommissionsSuccess, fetchNoticesSuccess, fetchSingleCommissionSuccess, fetchSingleNoticeSuccess, findPersonByIINSuccess, setNewCommission, setNewNotice, } from '../../Actions/businessDataStateActions';
import { dictFetching, dictFetchingFinished, dictFetchSuccess } from '../../Actions/dictionariesDataStateActions';
import { DELETE_COMMISSION_MEMBER_FAILED, DELETE_COMMISSION_MEMBER_SUCCESS, FETCH_COMMISSIONS_FAILED, FETCH_COMMISSIONS_REQUESTED, FETCH_NOTICES_FAILED, FETCH_NOTICES_REQUESTED, FETCH_SINGLE_COMMISSION_FAILED, FETCH_SINGLE_COMMISSION_REQUESTED, FETCH_SINGLE_NOTICE_FAILED, FETCH_SINGLE_NOTICE_REQUESTED, FIND_PERSON_BY_IIN_FAILED, FIND_PERSON_BY_IIN_REQUESTED, } from '../../Constants/businessDataStateConstants';
import { getHistory } from '../../history';
import { getStore } from '../../store';
function fetchDictionaries(names, forceRefetch) {
    var dictItems, apiClient_1, dicts_1, dictNameWithData, e_1;
    if (forceRefetch === void 0) { forceRefetch = false; }
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, 5, 7]);
                dictItems = dictionariesList
                    .filter(function (item) { return names.indexOf(item.name) > -1; })
                    .filter(function (item) { return forceRefetch || !getStore().getState().dictionariesDataState[item.name].length; });
                apiClient_1 = createApiClient();
                return [4 /*yield*/, put(dictFetching(dictItems.map(function (i) { return i.name; })))];
            case 1:
                _a.sent();
                return [4 /*yield*/, all(dictItems.map(function (dictItem) { return call(apiClient_1.fetchDict, dictItem.entity || dictItem.name, dictItem.alias); }))];
            case 2:
                dicts_1 = _a.sent();
                dictNameWithData = dictItems.map(function (dictItem, idx) { return ({
                    dictName: dictItem.name,
                    data: dicts_1[idx].data.content,
                }); });
                return [4 /*yield*/, all(dictNameWithData.map(function (dictData) {
                        return put(dictFetchSuccess(dictData.dictName, dictData.data));
                    }))];
            case 3:
                _a.sent();
                return [3 /*break*/, 7];
            case 4:
                e_1 = _a.sent();
                message.error('Ошибка при загрузке справочников!');
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, put(dictFetchingFinished())];
            case 6:
                _a.sent();
                return [7 /*endfinally*/];
            case 7: return [2 /*return*/];
        }
    });
}
export function fetchNoticesWorkerSaga(action) {
    var notices, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 9]);
                return [4 /*yield*/, put({ type: FETCH_NOTICES_REQUESTED })];
            case 1:
                _a.sent();
                return [4 /*yield*/, call(createApiClient().fetchNotices, action.payload.page, action.payload.pageSize)];
            case 2:
                notices = _a.sent();
                if (!notices.data) return [3 /*break*/, 4];
                return [4 /*yield*/, put(fetchNoticesSuccess(notices.data.content, notices.data.totalElements))];
            case 3:
                _a.sent();
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, put({ type: FETCH_NOTICES_FAILED })];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: return [3 /*break*/, 9];
            case 7:
                e_2 = _a.sent();
                return [4 /*yield*/, put({ type: FETCH_NOTICES_FAILED, message: e_2.Message })];
            case 8:
                _a.sent();
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}
export function fetchSingleNoticeWorkerSaga(action) {
    var ad, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 10]);
                return [4 /*yield*/, put({ type: FETCH_SINGLE_NOTICE_REQUESTED })];
            case 1:
                _a.sent();
                return [4 /*yield*/, call(createApiClient().fetchNotice, action.payload)];
            case 2:
                ad = _a.sent();
                if (!ad.data) return [3 /*break*/, 5];
                return [4 /*yield*/, put(fetchSingleNoticeSuccess(ad.data))];
            case 3:
                _a.sent();
                return [5 /*yield**/, __values(fetchDictionaries(['medicalForm', 'medicalType', 'region', 'noticeType']))];
            case 4:
                _a.sent();
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, put({ type: FETCH_SINGLE_NOTICE_FAILED })];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7: return [3 /*break*/, 10];
            case 8:
                e_3 = _a.sent();
                return [4 /*yield*/, put({ type: FETCH_SINGLE_NOTICE_FAILED, message: e_3.Message })];
            case 9:
                _a.sent();
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}
export function setNewNoticeWorkerSaga() {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [5 /*yield**/, __values(fetchDictionaries(['medicalForm', 'medicalType', 'region', 'noticeType']))];
            case 1:
                _a.sent();
                return [4 /*yield*/, put(setNewNotice())];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
export function fetchCommissionsWorkerSaga() {
    var results, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 9]);
                return [4 /*yield*/, put({ type: FETCH_COMMISSIONS_REQUESTED })];
            case 1:
                _a.sent();
                return [4 /*yield*/, call(createApiClient().fetchCommissions)];
            case 2:
                results = _a.sent();
                if (!results.data) return [3 /*break*/, 4];
                return [4 /*yield*/, put(fetchCommissionsSuccess(results.data.content))];
            case 3:
                _a.sent();
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, put({ type: FETCH_COMMISSIONS_FAILED })];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: return [3 /*break*/, 9];
            case 7:
                e_4 = _a.sent();
                return [4 /*yield*/, put({ type: FETCH_COMMISSIONS_FAILED, message: e_4.Message })];
            case 8:
                _a.sent();
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}
export function fetchSingleCommissionWorkerSaga(action) {
    var results, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 10]);
                return [4 /*yield*/, put({ type: FETCH_SINGLE_COMMISSION_REQUESTED })];
            case 1:
                _a.sent();
                return [4 /*yield*/, call(createApiClient().fetchSingleCommission, action.payload)];
            case 2:
                results = _a.sent();
                if (!results.data) return [3 /*break*/, 5];
                return [4 /*yield*/, put(fetchSingleCommissionSuccess(results.data))];
            case 3:
                _a.sent();
                return [5 /*yield**/, __values(fetchDictionaries(['region', 'sex', 'meetingMemberRole']))];
            case 4:
                _a.sent();
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, put({ type: FETCH_SINGLE_COMMISSION_FAILED })];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7: return [3 /*break*/, 10];
            case 8:
                e_5 = _a.sent();
                return [4 /*yield*/, put({ type: FETCH_SINGLE_COMMISSION_FAILED, message: e_5.Message })];
            case 9:
                _a.sent();
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}
export function findPersonByIINWorkerSaga(action) {
    var results, e_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 9]);
                return [4 /*yield*/, put({ type: FIND_PERSON_BY_IIN_REQUESTED })];
            case 1:
                _a.sent();
                return [4 /*yield*/, call(createApiClient().findPersonByIIN, action.payload)];
            case 2:
                results = _a.sent();
                if (!results.data) return [3 /*break*/, 4];
                return [4 /*yield*/, put(findPersonByIINSuccess(results.data))];
            case 3:
                _a.sent();
                message.success('Физ. лицо найдено успешно!');
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, put({ type: FIND_PERSON_BY_IIN_FAILED })];
            case 5:
                _a.sent();
                message.error('Физ. лицо не найдено');
                _a.label = 6;
            case 6: return [3 /*break*/, 9];
            case 7:
                e_6 = _a.sent();
                return [4 /*yield*/, put({ type: FIND_PERSON_BY_IIN_FAILED, message: e_6.Message })];
            case 8:
                _a.sent();
                message.error('Физ. лицо не найдено');
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}
export function setNewCommissionWorkerSaga() {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [5 /*yield**/, __values(fetchDictionaries(['region']))];
            case 1:
                _a.sent();
                return [4 /*yield*/, put(setNewCommission())];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
export function fetchCustomDictWorkerSaga(action) {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [5 /*yield**/, __values(fetchDictionaries(action.payload))];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
export function deleteCommissionMemberWorkerSaga(action) {
    var res, e_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 8]);
                return [4 /*yield*/, call(createApiClient().deleteCommissionMember, action.payload)];
            case 1:
                res = _a.sent();
                if (!(res.status === 200)) return [3 /*break*/, 3];
                return [4 /*yield*/, put({ type: DELETE_COMMISSION_MEMBER_SUCCESS })];
            case 2:
                _a.sent();
                getHistory().push('/commission/active');
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, put({ type: DELETE_COMMISSION_MEMBER_FAILED })];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5: return [3 /*break*/, 8];
            case 6:
                e_7 = _a.sent();
                return [4 /*yield*/, put({ type: DELETE_COMMISSION_MEMBER_FAILED, message: e_7.message })];
            case 7:
                _a.sent();
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}
// export function* fetchAdApplicantsWorkerSaga(action: ReduxActionType<{ id: number }>) {
//   try {
//     yield put({ type: FETCH_ADVERTISEMENT_APPLICANTS_REQUESTED })
//     const results: AxiosData<AdApplicant[] | null> =
//     yield call(createApiClient().fetchAdApplicants, action.payload.id)
//
//     if (results.data) {
//       yield put({ type: FETCH_ADVERTISEMENT_APPLICANTS_SUCCESS, payload: results.data })
//     } else {
//       yield put({ type: FETCH_ADVERTISEMENT_APPLICANTS_FAILED })
//     }
//   } catch (e) {
//     yield put({ type: FETCH_ADVERTISEMENT_APPLICANTS_FAILED, message: e.message })
//   }
// }
//
// export function* fetchSuppliersWorkerSaga() {
//   try {
//     yield put({ type: FETCH_SUPPLIERS_REQUESTED })
//     const results: AxiosData<Supplier[] | null> = yield call(createApiClient().fetchSuppliers)
//
//     if (results.data) {
//       yield put(fetchAllSuppliersSuccess(results.data))
//     } else {
//       yield put({ type: FETCH_SUPPLIERS_FAILED })
//     }
//   } catch (e) {
//     yield put({ type: FETCH_SUPPLIERS_FAILED, message: e.message })
//   }
// }
//
// export function* fetchBadSuppliersWorkerSaga() {
//   try {
//     yield put({ type: FETCH_BAD_SUPPLIERS_REQUESTED })
//     const results: AxiosData<BadSupplier[] | null> = yield call(createApiClient().fetchBadSuppliers)
//
//     if (results.data) {
//       yield put(fetchBadSuppliersSuccess(results.data))
//     } else {
//       yield put({ type: FETCH_BAD_SUPPLIERS_FAILED })
//     }
//   } catch (e) {
//     yield put({ type: FETCH_BAD_SUPPLIERS_FAILED, message: e.message })
//   }
// }
//# sourceMappingURL=workerSagas.js.map
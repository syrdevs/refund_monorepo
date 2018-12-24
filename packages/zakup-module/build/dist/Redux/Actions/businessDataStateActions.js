"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var businessDataStateConstants_1 = require("../Constants/businessDataStateConstants");
var store_1 = require("../store");
function fetchNotices(page, pageSize, onlyMy) {
    if (onlyMy === void 0) { onlyMy = false; }
    return {
        type: businessDataStateConstants_1.FETCH_NOTICES,
        payload: {
            page: page,
            pageSize: pageSize,
            onlyMy: onlyMy,
        },
    };
}
exports.fetchNotices = fetchNotices;
function fetchNoticesSuccess(notices, total) {
    return {
        type: businessDataStateConstants_1.FETCH_NOTICES_SUCCESS,
        payload: {
            notices: notices,
            total: total,
        },
    };
}
exports.fetchNoticesSuccess = fetchNoticesSuccess;
function fetchSingleNotice(id) {
    return {
        type: businessDataStateConstants_1.FETCH_SINGLE_NOTICE,
        payload: id,
    };
}
exports.fetchSingleNotice = fetchSingleNotice;
function setNewNotice() {
    return {
        type: businessDataStateConstants_1.SET_NEW_NOTICE,
        payload: undefined,
    };
}
exports.setNewNotice = setNewNotice;
function fetchSingleNoticeSuccess(ad) {
    return {
        type: businessDataStateConstants_1.FETCH_SINGLE_NOTICE_SUCCESS,
        payload: ad,
    };
}
exports.fetchSingleNoticeSuccess = fetchSingleNoticeSuccess;
function setNewCommission() {
    return {
        type: businessDataStateConstants_1.SET_NEW_COMMISSION,
        payload: undefined,
    };
}
exports.setNewCommission = setNewCommission;
function clearFetchEntityStatus() {
    return {
        type: businessDataStateConstants_1.CLEAR_FETCH_ENTITY_STATUS,
    };
}
exports.clearFetchEntityStatus = clearFetchEntityStatus;
function dispatchClearFetchEntityStatus() {
    store_1.getStore().dispatch(clearFetchEntityStatus());
}
exports.dispatchClearFetchEntityStatus = dispatchClearFetchEntityStatus;
function fetchCommissions() {
    return {
        type: businessDataStateConstants_1.FETCH_COMMISSIONS,
        payload: {},
    };
}
exports.fetchCommissions = fetchCommissions;
function fetchCommissionsSuccess(results) {
    return {
        type: businessDataStateConstants_1.FETCH_COMMISSIONS_SUCCESS,
        payload: results,
    };
}
exports.fetchCommissionsSuccess = fetchCommissionsSuccess;
function fetchSingleCommission(id) {
    return {
        type: businessDataStateConstants_1.FETCH_SINGLE_COMMISSION,
        payload: id,
    };
}
exports.fetchSingleCommission = fetchSingleCommission;
function fetchSingleCommissionSuccess(results) {
    return {
        type: businessDataStateConstants_1.FETCH_SINGLE_COMMISSION_SUCCESS,
        payload: results,
    };
}
exports.fetchSingleCommissionSuccess = fetchSingleCommissionSuccess;
function findPersonByIIN(iin) {
    return {
        type: businessDataStateConstants_1.FIND_PERSON_BY_IIN,
        payload: iin,
    };
}
exports.findPersonByIIN = findPersonByIIN;
function findPersonByIINSuccess(result) {
    return {
        type: businessDataStateConstants_1.FIND_PERSON_BY_IIN_SUCCESS,
        payload: result,
    };
}
exports.findPersonByIINSuccess = findPersonByIINSuccess;
function fetchSingleCommissionMember(id) {
    return {
        type: businessDataStateConstants_1.FETCH_SINGLE_COMMISSION_MEMBER,
        payload: id,
    };
}
exports.fetchSingleCommissionMember = fetchSingleCommissionMember;
function fetchSingleCommissionMemberSuccess(result) {
    return {
        type: businessDataStateConstants_1.FETCH_SINGLE_COMMISSION_MEMBER_SUCCESS,
        payload: result,
    };
}
exports.fetchSingleCommissionMemberSuccess = fetchSingleCommissionMemberSuccess;
function deleteCommissionMember(id) {
    return {
        type: businessDataStateConstants_1.DELETE_COMMISSION_MEMBER,
        payload: id,
    };
}
exports.deleteCommissionMember = deleteCommissionMember;
function fetchAdApplicants(id) {
    return {
        type: businessDataStateConstants_1.FETCH_ADVERTISEMENT_APPLICANTS,
        payload: {
            id: id,
        },
    };
}
exports.fetchAdApplicants = fetchAdApplicants;
function fetchAllSuppliers() {
    return {
        type: businessDataStateConstants_1.FETCH_SUPPLIERS,
        payload: {},
    };
}
exports.fetchAllSuppliers = fetchAllSuppliers;
function fetchAllSuppliersSuccess(results) {
    return {
        type: businessDataStateConstants_1.FETCH_SUPPLIERS_SUCCESS,
        payload: results,
    };
}
exports.fetchAllSuppliersSuccess = fetchAllSuppliersSuccess;
function fetchBadSuppliers() {
    return {
        type: businessDataStateConstants_1.FETCH_BAD_SUPPLIERS,
        payload: {},
    };
}
exports.fetchBadSuppliers = fetchBadSuppliers;
function fetchBadSuppliersSuccess(results) {
    return {
        type: businessDataStateConstants_1.FETCH_BAD_SUPPLIERS_SUCCESS,
        payload: results,
    };
}
exports.fetchBadSuppliersSuccess = fetchBadSuppliersSuccess;
function fetchCustomDict(dicts) {
    return {
        type: businessDataStateConstants_1.FETCH_CUSTOM_DICT,
        payload: dicts,
    };
}
exports.fetchCustomDict = fetchCustomDict;
//# sourceMappingURL=businessDataStateActions.js.map
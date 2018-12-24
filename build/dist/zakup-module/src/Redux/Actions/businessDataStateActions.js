import { CLEAR_FETCH_ENTITY_STATUS, DELETE_COMMISSION_MEMBER, FETCH_ADVERTISEMENT_APPLICANTS, FETCH_BAD_SUPPLIERS, FETCH_BAD_SUPPLIERS_SUCCESS, FETCH_COMMISSIONS, FETCH_COMMISSIONS_SUCCESS, FETCH_CUSTOM_DICT, FETCH_NOTICES, FETCH_NOTICES_SUCCESS, FETCH_SINGLE_COMMISSION, FETCH_SINGLE_COMMISSION_MEMBER, FETCH_SINGLE_COMMISSION_MEMBER_SUCCESS, FETCH_SINGLE_COMMISSION_SUCCESS, FETCH_SINGLE_NOTICE, FETCH_SINGLE_NOTICE_SUCCESS, FETCH_SUPPLIERS, FETCH_SUPPLIERS_SUCCESS, FIND_PERSON_BY_IIN, FIND_PERSON_BY_IIN_SUCCESS, SET_NEW_COMMISSION, SET_NEW_NOTICE, } from '../Constants/businessDataStateConstants';
import { getStore } from '../store';
export function fetchNotices(page, pageSize, onlyMy) {
    if (onlyMy === void 0) { onlyMy = false; }
    return {
        type: FETCH_NOTICES,
        payload: {
            page: page,
            pageSize: pageSize,
            onlyMy: onlyMy,
        },
    };
}
export function fetchNoticesSuccess(notices, total) {
    return {
        type: FETCH_NOTICES_SUCCESS,
        payload: {
            notices: notices,
            total: total,
        },
    };
}
export function fetchSingleNotice(id) {
    return {
        type: FETCH_SINGLE_NOTICE,
        payload: id,
    };
}
export function setNewNotice() {
    return {
        type: SET_NEW_NOTICE,
        payload: undefined,
    };
}
export function fetchSingleNoticeSuccess(ad) {
    return {
        type: FETCH_SINGLE_NOTICE_SUCCESS,
        payload: ad,
    };
}
export function setNewCommission() {
    return {
        type: SET_NEW_COMMISSION,
        payload: undefined,
    };
}
export function clearFetchEntityStatus() {
    return {
        type: CLEAR_FETCH_ENTITY_STATUS,
    };
}
export function dispatchClearFetchEntityStatus() {
    getStore().dispatch(clearFetchEntityStatus());
}
export function fetchCommissions() {
    return {
        type: FETCH_COMMISSIONS,
        payload: {},
    };
}
export function fetchCommissionsSuccess(results) {
    return {
        type: FETCH_COMMISSIONS_SUCCESS,
        payload: results,
    };
}
export function fetchSingleCommission(id) {
    return {
        type: FETCH_SINGLE_COMMISSION,
        payload: id,
    };
}
export function fetchSingleCommissionSuccess(results) {
    return {
        type: FETCH_SINGLE_COMMISSION_SUCCESS,
        payload: results,
    };
}
export function findPersonByIIN(iin) {
    return {
        type: FIND_PERSON_BY_IIN,
        payload: iin,
    };
}
export function findPersonByIINSuccess(result) {
    return {
        type: FIND_PERSON_BY_IIN_SUCCESS,
        payload: result,
    };
}
export function fetchSingleCommissionMember(id) {
    return {
        type: FETCH_SINGLE_COMMISSION_MEMBER,
        payload: id,
    };
}
export function fetchSingleCommissionMemberSuccess(result) {
    return {
        type: FETCH_SINGLE_COMMISSION_MEMBER_SUCCESS,
        payload: result,
    };
}
export function deleteCommissionMember(id) {
    return {
        type: DELETE_COMMISSION_MEMBER,
        payload: id,
    };
}
export function fetchAdApplicants(id) {
    return {
        type: FETCH_ADVERTISEMENT_APPLICANTS,
        payload: {
            id: id,
        },
    };
}
export function fetchAllSuppliers() {
    return {
        type: FETCH_SUPPLIERS,
        payload: {},
    };
}
export function fetchAllSuppliersSuccess(results) {
    return {
        type: FETCH_SUPPLIERS_SUCCESS,
        payload: results,
    };
}
export function fetchBadSuppliers() {
    return {
        type: FETCH_BAD_SUPPLIERS,
        payload: {},
    };
}
export function fetchBadSuppliersSuccess(results) {
    return {
        type: FETCH_BAD_SUPPLIERS_SUCCESS,
        payload: results,
    };
}
export function fetchCustomDict(dicts) {
    return {
        type: FETCH_CUSTOM_DICT,
        payload: dicts,
    };
}
//# sourceMappingURL=businessDataStateActions.js.map
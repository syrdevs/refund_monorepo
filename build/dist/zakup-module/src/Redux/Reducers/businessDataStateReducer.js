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
import moment from 'moment';
import { CLEAR_FETCH_ENTITY_STATUS, FETCH_ADVERTISEMENT_APPLICANTS_FAILED, FETCH_ADVERTISEMENT_APPLICANTS_REQUESTED, FETCH_ADVERTISEMENT_APPLICANTS_SUCCESS, FETCH_BAD_SUPPLIERS_FAILED, FETCH_BAD_SUPPLIERS_REQUESTED, FETCH_BAD_SUPPLIERS_SUCCESS, FETCH_COMMISSION_MEMBERS_FAILED, FETCH_COMMISSION_MEMBERS_REQUESTED, FETCH_COMMISSION_MEMBERS_SUCCESS, FETCH_COMMISSIONS_FAILED, FETCH_COMMISSIONS_REQUESTED, FETCH_COMMISSIONS_SUCCESS, FETCH_ENTITY_STATUS, FETCH_NOTICES_FAILED, FETCH_NOTICES_REQUESTED, FETCH_NOTICES_SUCCESS, FETCH_SINGLE_COMMISSION_FAILED, FETCH_SINGLE_COMMISSION_MEMBER_FAILED, FETCH_SINGLE_COMMISSION_MEMBER_REQUESTED, FETCH_SINGLE_COMMISSION_MEMBER_SUCCESS, FETCH_SINGLE_COMMISSION_REQUESTED, FETCH_SINGLE_COMMISSION_SUCCESS, FETCH_SINGLE_NOTICE_FAILED, FETCH_SINGLE_NOTICE_REQUESTED, FETCH_SINGLE_NOTICE_SUCCESS, FETCH_SUPPLIERS_FAILED, FETCH_SUPPLIERS_REQUESTED, FETCH_SUPPLIERS_SUCCESS, FIND_PERSON_BY_IIN_SUCCESS, SET_NEW_COMMISSION, SET_NEW_NOTICE, } from '../Constants/businessDataStateConstants';
var defaultState = {
    noticeData: {
        notices: null,
        total: 0,
        currentNotice: null,
        fetchSingleNoticeStatus: FETCH_ENTITY_STATUS.IDLE,
    },
    commissionsData: {
        commissions: null,
        currentCommission: null,
        fetchSingleCommissionStatus: FETCH_ENTITY_STATUS.IDLE,
        personFound: null,
    },
    commissionMembers: null,
    currentCommissionMember: null,
    adApplicants: null,
    suppliers: null,
    badSuppliers: null,
};
var newNotice = {
    dateBegin: moment(),
    dateEnd: moment(),
    status: '',
    noticeMedicalTypes: [],
    noticeMedicalForms: [],
};
var newCommission = {
    dateBegin: moment().format('DD.MM.YYYY'),
    meetingMembers: [],
};
export default function businessDataStateReducer(state, action) {
    if (state === void 0) { state = defaultState; }
    switch (action.type) {
        case FETCH_NOTICES_REQUESTED: {
            return __assign({}, state, { noticeData: __assign({}, state.noticeData, { notices: null, total: 0 }) });
        }
        case FETCH_NOTICES_SUCCESS: {
            return __assign({}, state, { noticeData: __assign({}, state.noticeData, { notices: action.payload['notices'], total: action.payload['total'] }) });
        }
        case FETCH_NOTICES_FAILED: {
            return __assign({}, state, { noticeData: __assign({}, state.noticeData, { notices: null, total: 0 }) });
        }
        case FETCH_SINGLE_NOTICE_REQUESTED: {
            return __assign({}, state, { noticeData: __assign({}, state.noticeData, { fetchSingleNoticeStatus: FETCH_ENTITY_STATUS.FETCHING }) });
        }
        case FETCH_SINGLE_NOTICE_SUCCESS: {
            return __assign({}, state, { noticeData: __assign({}, state.noticeData, { currentNotice: __assign({}, action.payload), fetchSingleNoticeStatus: FETCH_ENTITY_STATUS.SUCCESS }) });
        }
        case SET_NEW_NOTICE: {
            return __assign({}, state, { noticeData: __assign({}, state.noticeData, { currentNotice: __assign({}, newNotice), fetchSingleNoticeStatus: FETCH_ENTITY_STATUS.SUCCESS }) });
        }
        case FETCH_SINGLE_NOTICE_FAILED: {
            return __assign({}, state, { noticeData: __assign({}, state.noticeData, { currentNotice: null, fetchSingleNoticeStatus: FETCH_ENTITY_STATUS.FAILED }) });
        }
        case FETCH_COMMISSIONS_REQUESTED: {
            return __assign({}, state, { commissionsData: __assign({}, state.commissionsData, { commissions: null }) });
        }
        case FETCH_COMMISSIONS_SUCCESS: {
            return __assign({}, state, { commissionsData: __assign({}, state.commissionsData, { commissions: action.payload }) });
        }
        case FETCH_COMMISSIONS_FAILED: {
            return __assign({}, state, { commissionsData: __assign({}, state.commissionsData, { commissions: null }) });
        }
        case FETCH_SINGLE_COMMISSION_REQUESTED: {
            return __assign({}, state, { commissionsData: __assign({}, state.commissionsData, { personFound: null, fetchSingleCommissionStatus: FETCH_ENTITY_STATUS.FETCHING }) });
        }
        case FETCH_SINGLE_COMMISSION_SUCCESS: {
            return __assign({}, state, { commissionsData: __assign({}, state.commissionsData, { currentCommission: __assign({}, action.payload), fetchSingleCommissionStatus: FETCH_ENTITY_STATUS.SUCCESS }) });
        }
        case FETCH_SINGLE_COMMISSION_FAILED: {
            return __assign({}, state, { commissionsData: __assign({}, state.commissionsData, { currentCommission: null, fetchSingleCommissionStatus: FETCH_ENTITY_STATUS.FAILED }) });
        }
        case SET_NEW_COMMISSION: {
            return __assign({}, state, { commissionsData: __assign({}, state.commissionsData, { currentCommission: __assign({}, newCommission), fetchSingleCommissionStatus: FETCH_ENTITY_STATUS.SUCCESS }) });
        }
        case FIND_PERSON_BY_IIN_SUCCESS: {
            return __assign({}, state, { commissionsData: __assign({}, state.commissionsData, { personFound: action.payload }) });
        }
        case CLEAR_FETCH_ENTITY_STATUS: {
            return __assign({}, state, { noticeData: __assign({}, state.noticeData, { fetchSingleNoticeStatus: FETCH_ENTITY_STATUS.IDLE }), commissionsData: __assign({}, state.commissionsData, { fetchSingleCommissionStatus: FETCH_ENTITY_STATUS.IDLE }) });
        }
        case FETCH_COMMISSION_MEMBERS_REQUESTED: {
            return __assign({}, state, { commissionMembers: null });
        }
        case FETCH_COMMISSION_MEMBERS_SUCCESS: {
            return __assign({}, state, { commissionMembers: action.payload });
        }
        case FETCH_COMMISSION_MEMBERS_FAILED: {
            return __assign({}, state, { commissionMembers: null });
        }
        case FETCH_SINGLE_COMMISSION_MEMBER_FAILED:
        case FETCH_SINGLE_COMMISSION_MEMBER_REQUESTED: {
            return __assign({}, state, { currentCommissionMember: null });
        }
        case FETCH_SINGLE_COMMISSION_MEMBER_SUCCESS: {
            return __assign({}, state, { currentCommissionMember: action.payload });
        }
        case FETCH_ADVERTISEMENT_APPLICANTS_REQUESTED:
        case FETCH_ADVERTISEMENT_APPLICANTS_FAILED: {
            return __assign({}, state, { adApplicants: null });
        }
        case FETCH_ADVERTISEMENT_APPLICANTS_SUCCESS: {
            return __assign({}, state, { adApplicants: action.payload });
        }
        case FETCH_SUPPLIERS_REQUESTED:
        case FETCH_SUPPLIERS_FAILED: {
            return __assign({}, state, { suppliers: null });
        }
        case FETCH_SUPPLIERS_SUCCESS: {
            return __assign({}, state, { suppliers: action.payload });
        }
        case FETCH_BAD_SUPPLIERS_REQUESTED:
        case FETCH_BAD_SUPPLIERS_FAILED: {
            return __assign({}, state, { badSuppliers: null });
        }
        case FETCH_BAD_SUPPLIERS_SUCCESS: {
            return __assign({}, state, { badSuppliers: action.payload });
        }
        default: {
            return state;
        }
    }
}
//# sourceMappingURL=businessDataStateReducer.js.map
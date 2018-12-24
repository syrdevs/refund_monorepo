"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var moment_1 = __importDefault(require("moment"));
var businessDataStateConstants_1 = require("../Constants/businessDataStateConstants");
var defaultState = {
    noticeData: {
        notices: null,
        total: 0,
        currentNotice: null,
        fetchSingleNoticeStatus: businessDataStateConstants_1.FETCH_ENTITY_STATUS.IDLE,
    },
    commissionsData: {
        commissions: null,
        currentCommission: null,
        fetchSingleCommissionStatus: businessDataStateConstants_1.FETCH_ENTITY_STATUS.IDLE,
        personFound: null,
    },
    commissionMembers: null,
    currentCommissionMember: null,
    adApplicants: null,
    suppliers: null,
    badSuppliers: null,
};
var newNotice = {
    dateBegin: moment_1.default(),
    dateEnd: moment_1.default(),
    status: '',
    noticeMedicalTypes: [],
    noticeMedicalForms: [],
};
var newCommission = {
    dateBegin: moment_1.default().format('DD.MM.YYYY'),
    meetingMembers: [],
};
function businessDataStateReducer(state, action) {
    if (state === void 0) { state = defaultState; }
    switch (action.type) {
        case businessDataStateConstants_1.FETCH_NOTICES_REQUESTED: {
            return __assign({}, state, { noticeData: __assign({}, state.noticeData, { notices: null, total: 0 }) });
        }
        case businessDataStateConstants_1.FETCH_NOTICES_SUCCESS: {
            return __assign({}, state, { noticeData: __assign({}, state.noticeData, { notices: action.payload['notices'], total: action.payload['total'] }) });
        }
        case businessDataStateConstants_1.FETCH_NOTICES_FAILED: {
            return __assign({}, state, { noticeData: __assign({}, state.noticeData, { notices: null, total: 0 }) });
        }
        case businessDataStateConstants_1.FETCH_SINGLE_NOTICE_REQUESTED: {
            return __assign({}, state, { noticeData: __assign({}, state.noticeData, { fetchSingleNoticeStatus: businessDataStateConstants_1.FETCH_ENTITY_STATUS.FETCHING }) });
        }
        case businessDataStateConstants_1.FETCH_SINGLE_NOTICE_SUCCESS: {
            return __assign({}, state, { noticeData: __assign({}, state.noticeData, { currentNotice: __assign({}, action.payload), fetchSingleNoticeStatus: businessDataStateConstants_1.FETCH_ENTITY_STATUS.SUCCESS }) });
        }
        case businessDataStateConstants_1.SET_NEW_NOTICE: {
            return __assign({}, state, { noticeData: __assign({}, state.noticeData, { currentNotice: __assign({}, newNotice), fetchSingleNoticeStatus: businessDataStateConstants_1.FETCH_ENTITY_STATUS.SUCCESS }) });
        }
        case businessDataStateConstants_1.FETCH_SINGLE_NOTICE_FAILED: {
            return __assign({}, state, { noticeData: __assign({}, state.noticeData, { currentNotice: null, fetchSingleNoticeStatus: businessDataStateConstants_1.FETCH_ENTITY_STATUS.FAILED }) });
        }
        case businessDataStateConstants_1.FETCH_COMMISSIONS_REQUESTED: {
            return __assign({}, state, { commissionsData: __assign({}, state.commissionsData, { commissions: null }) });
        }
        case businessDataStateConstants_1.FETCH_COMMISSIONS_SUCCESS: {
            return __assign({}, state, { commissionsData: __assign({}, state.commissionsData, { commissions: action.payload }) });
        }
        case businessDataStateConstants_1.FETCH_COMMISSIONS_FAILED: {
            return __assign({}, state, { commissionsData: __assign({}, state.commissionsData, { commissions: null }) });
        }
        case businessDataStateConstants_1.FETCH_SINGLE_COMMISSION_REQUESTED: {
            return __assign({}, state, { commissionsData: __assign({}, state.commissionsData, { personFound: null, fetchSingleCommissionStatus: businessDataStateConstants_1.FETCH_ENTITY_STATUS.FETCHING }) });
        }
        case businessDataStateConstants_1.FETCH_SINGLE_COMMISSION_SUCCESS: {
            return __assign({}, state, { commissionsData: __assign({}, state.commissionsData, { currentCommission: __assign({}, action.payload), fetchSingleCommissionStatus: businessDataStateConstants_1.FETCH_ENTITY_STATUS.SUCCESS }) });
        }
        case businessDataStateConstants_1.FETCH_SINGLE_COMMISSION_FAILED: {
            return __assign({}, state, { commissionsData: __assign({}, state.commissionsData, { currentCommission: null, fetchSingleCommissionStatus: businessDataStateConstants_1.FETCH_ENTITY_STATUS.FAILED }) });
        }
        case businessDataStateConstants_1.SET_NEW_COMMISSION: {
            return __assign({}, state, { commissionsData: __assign({}, state.commissionsData, { currentCommission: __assign({}, newCommission), fetchSingleCommissionStatus: businessDataStateConstants_1.FETCH_ENTITY_STATUS.SUCCESS }) });
        }
        case businessDataStateConstants_1.FIND_PERSON_BY_IIN_SUCCESS: {
            return __assign({}, state, { commissionsData: __assign({}, state.commissionsData, { personFound: action.payload }) });
        }
        case businessDataStateConstants_1.CLEAR_FETCH_ENTITY_STATUS: {
            return __assign({}, state, { noticeData: __assign({}, state.noticeData, { fetchSingleNoticeStatus: businessDataStateConstants_1.FETCH_ENTITY_STATUS.IDLE }), commissionsData: __assign({}, state.commissionsData, { fetchSingleCommissionStatus: businessDataStateConstants_1.FETCH_ENTITY_STATUS.IDLE }) });
        }
        case businessDataStateConstants_1.FETCH_COMMISSION_MEMBERS_REQUESTED: {
            return __assign({}, state, { commissionMembers: null });
        }
        case businessDataStateConstants_1.FETCH_COMMISSION_MEMBERS_SUCCESS: {
            return __assign({}, state, { commissionMembers: action.payload });
        }
        case businessDataStateConstants_1.FETCH_COMMISSION_MEMBERS_FAILED: {
            return __assign({}, state, { commissionMembers: null });
        }
        case businessDataStateConstants_1.FETCH_SINGLE_COMMISSION_MEMBER_FAILED:
        case businessDataStateConstants_1.FETCH_SINGLE_COMMISSION_MEMBER_REQUESTED: {
            return __assign({}, state, { currentCommissionMember: null });
        }
        case businessDataStateConstants_1.FETCH_SINGLE_COMMISSION_MEMBER_SUCCESS: {
            return __assign({}, state, { currentCommissionMember: action.payload });
        }
        case businessDataStateConstants_1.FETCH_ADVERTISEMENT_APPLICANTS_REQUESTED:
        case businessDataStateConstants_1.FETCH_ADVERTISEMENT_APPLICANTS_FAILED: {
            return __assign({}, state, { adApplicants: null });
        }
        case businessDataStateConstants_1.FETCH_ADVERTISEMENT_APPLICANTS_SUCCESS: {
            return __assign({}, state, { adApplicants: action.payload });
        }
        case businessDataStateConstants_1.FETCH_SUPPLIERS_REQUESTED:
        case businessDataStateConstants_1.FETCH_SUPPLIERS_FAILED: {
            return __assign({}, state, { suppliers: null });
        }
        case businessDataStateConstants_1.FETCH_SUPPLIERS_SUCCESS: {
            return __assign({}, state, { suppliers: action.payload });
        }
        case businessDataStateConstants_1.FETCH_BAD_SUPPLIERS_REQUESTED:
        case businessDataStateConstants_1.FETCH_BAD_SUPPLIERS_FAILED: {
            return __assign({}, state, { badSuppliers: null });
        }
        case businessDataStateConstants_1.FETCH_BAD_SUPPLIERS_SUCCESS: {
            return __assign({}, state, { badSuppliers: action.payload });
        }
        default: {
            return state;
        }
    }
}
exports.default = businessDataStateReducer;
//# sourceMappingURL=businessDataStateReducer.js.map
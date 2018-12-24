import { ReduxActionType } from '@vitacore/shared-ui'
import moment from 'moment'
import { Commission } from '../../Entities/Commission'
import { CommissionMember, Person } from '../../Entities/CommissionMember'
import { Notice } from '../../Entities/Notice'
import { NoticeApplicant } from '../../Entities/NoticeApplicant'
import Supplier, { BadSupplier } from '../../Entities/Supplier'
import {
  CLEAR_FETCH_ENTITY_STATUS,
  FETCH_ADVERTISEMENT_APPLICANTS_FAILED,
  FETCH_ADVERTISEMENT_APPLICANTS_REQUESTED,
  FETCH_ADVERTISEMENT_APPLICANTS_SUCCESS,
  FETCH_BAD_SUPPLIERS_FAILED,
  FETCH_BAD_SUPPLIERS_REQUESTED,
  FETCH_BAD_SUPPLIERS_SUCCESS,
  FETCH_COMMISSION_MEMBERS_FAILED,
  FETCH_COMMISSION_MEMBERS_REQUESTED,
  FETCH_COMMISSION_MEMBERS_SUCCESS,
  FETCH_COMMISSIONS_FAILED,
  FETCH_COMMISSIONS_REQUESTED,
  FETCH_COMMISSIONS_SUCCESS,
  FETCH_ENTITY_STATUS,
  FETCH_NOTICES_FAILED,
  FETCH_NOTICES_REQUESTED,
  FETCH_NOTICES_SUCCESS,
  FETCH_SINGLE_COMMISSION_FAILED,
  FETCH_SINGLE_COMMISSION_MEMBER_FAILED,
  FETCH_SINGLE_COMMISSION_MEMBER_REQUESTED,
  FETCH_SINGLE_COMMISSION_MEMBER_SUCCESS,
  FETCH_SINGLE_COMMISSION_REQUESTED,
  FETCH_SINGLE_COMMISSION_SUCCESS,
  FETCH_SINGLE_NOTICE_FAILED,
  FETCH_SINGLE_NOTICE_REQUESTED,
  FETCH_SINGLE_NOTICE_SUCCESS,
  FETCH_SUPPLIERS_FAILED,
  FETCH_SUPPLIERS_REQUESTED,
  FETCH_SUPPLIERS_SUCCESS,
  FIND_PERSON_BY_IIN_SUCCESS,
  SET_NEW_COMMISSION,
  SET_NEW_NOTICE,
} from '../Constants/businessDataStateConstants'
import BusinessDataState from '../StateModels/BusinessDataState'

const defaultState: BusinessDataState = {
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
}

const newNotice = {
  dateBegin: moment(),
  dateEnd: moment(),
  status: '',
  noticeMedicalTypes: [],
  noticeMedicalForms: [],
} as Notice

const newCommission = {
  dateBegin: moment().format('DD.MM.YYYY'),
  meetingMembers: [],
} as Commission

export default function businessDataStateReducer(
  state: BusinessDataState = defaultState,
  action: ReduxActionType
): BusinessDataState {
  switch (action.type) {
    case FETCH_NOTICES_REQUESTED: {
      return {
        ...state,
        noticeData: {
          ...state.noticeData,
          notices: null,
          total: 0,
        },
      }
    }
    case FETCH_NOTICES_SUCCESS: {
      return {
        ...state,
        noticeData: {
          ...state.noticeData,
          notices: action.payload!['notices'] as Notice[],
          total: action.payload!['total'] as number,
        },
      }
    }
    case FETCH_NOTICES_FAILED: {
      return {
        ...state,
        noticeData: {
          ...state.noticeData,
          notices: null,
          total: 0,
        },
      }
    }
    case FETCH_SINGLE_NOTICE_REQUESTED: {
      return {
        ...state,
        noticeData: {
          ...state.noticeData,
          fetchSingleNoticeStatus: FETCH_ENTITY_STATUS.FETCHING,
        },
      }
    }
    case FETCH_SINGLE_NOTICE_SUCCESS: {
      return {
        ...state,
        noticeData: {
          ...state.noticeData,
          currentNotice: { ...(action.payload as Notice) },
          fetchSingleNoticeStatus: FETCH_ENTITY_STATUS.SUCCESS,
        },
      }
    }
    case SET_NEW_NOTICE: {
      return {
        ...state,
        noticeData: {
          ...state.noticeData,
          currentNotice: {
            ...newNotice,
          },
          fetchSingleNoticeStatus: FETCH_ENTITY_STATUS.SUCCESS,
        },
      }
    }
    case FETCH_SINGLE_NOTICE_FAILED: {
      return {
        ...state,
        noticeData: {
          ...state.noticeData,
          currentNotice: null,
          fetchSingleNoticeStatus: FETCH_ENTITY_STATUS.FAILED,
        },
      }
    }
    case FETCH_COMMISSIONS_REQUESTED: {
      return {
        ...state,
        commissionsData: {
          ...state.commissionsData,
          commissions: null,
        },
      }
    }
    case FETCH_COMMISSIONS_SUCCESS: {
      return {
        ...state,
        commissionsData: {
          ...state.commissionsData,
          commissions: action.payload as Commission[],
        },
      }
    }
    case FETCH_COMMISSIONS_FAILED: {
      return {
        ...state,
        commissionsData: {
          ...state.commissionsData,
          commissions: null,
        },
      }
    }
    case FETCH_SINGLE_COMMISSION_REQUESTED: {
      return {
        ...state,
        commissionsData: {
          ...state.commissionsData,
          personFound: null,
          fetchSingleCommissionStatus: FETCH_ENTITY_STATUS.FETCHING,
        },
      }
    }
    case FETCH_SINGLE_COMMISSION_SUCCESS: {
      return {
        ...state,
        commissionsData: {
          ...state.commissionsData,
          currentCommission: { ...(action.payload as Commission) },
          fetchSingleCommissionStatus: FETCH_ENTITY_STATUS.SUCCESS,
        },
      }
    }
    case FETCH_SINGLE_COMMISSION_FAILED: {
      return {
        ...state,
        commissionsData: {
          ...state.commissionsData,
          currentCommission: null,
          fetchSingleCommissionStatus: FETCH_ENTITY_STATUS.FAILED,
        },
      }
    }
    case SET_NEW_COMMISSION: {
      return {
        ...state,
        commissionsData: {
          ...state.commissionsData,
          currentCommission: {
            ...newCommission,
          },
          fetchSingleCommissionStatus: FETCH_ENTITY_STATUS.SUCCESS,
        },
      }
    }
    case FIND_PERSON_BY_IIN_SUCCESS: {
      return {
        ...state,
        commissionsData: {
          ...state.commissionsData,
          personFound: action.payload as Person,
        },
      }
    }
    case CLEAR_FETCH_ENTITY_STATUS: {
      return {
        ...state,
        noticeData: {
          ...state.noticeData,
          fetchSingleNoticeStatus: FETCH_ENTITY_STATUS.IDLE,
        },
        commissionsData: {
          ...state.commissionsData,
          fetchSingleCommissionStatus: FETCH_ENTITY_STATUS.IDLE,
        },
      }
    }
    case FETCH_COMMISSION_MEMBERS_REQUESTED: {
      return {
        ...state,
        commissionMembers: null,
      }
    }
    case FETCH_COMMISSION_MEMBERS_SUCCESS: {
      return {
        ...state,
        commissionMembers: action.payload as CommissionMember[],
      }
    }
    case FETCH_COMMISSION_MEMBERS_FAILED: {
      return {
        ...state,
        commissionMembers: null,
      }
    }
    case FETCH_SINGLE_COMMISSION_MEMBER_FAILED:
    case FETCH_SINGLE_COMMISSION_MEMBER_REQUESTED: {
      return {
        ...state,
        currentCommissionMember: null,
      }
    }
    case FETCH_SINGLE_COMMISSION_MEMBER_SUCCESS: {
      return {
        ...state,
        currentCommissionMember: action.payload as CommissionMember,
      }
    }
    case FETCH_ADVERTISEMENT_APPLICANTS_REQUESTED:
    case FETCH_ADVERTISEMENT_APPLICANTS_FAILED: {
      return {
        ...state,
        adApplicants: null,
      }
    }
    case FETCH_ADVERTISEMENT_APPLICANTS_SUCCESS: {
      return {
        ...state,
        adApplicants: action.payload as NoticeApplicant[],
      }
    }
    case FETCH_SUPPLIERS_REQUESTED:
    case FETCH_SUPPLIERS_FAILED: {
      return {
        ...state,
        suppliers: null,
      }
    }
    case FETCH_SUPPLIERS_SUCCESS: {
      return {
        ...state,
        suppliers: action.payload as Supplier[],
      }
    }
    case FETCH_BAD_SUPPLIERS_REQUESTED:
    case FETCH_BAD_SUPPLIERS_FAILED: {
      return {
        ...state,
        badSuppliers: null,
      }
    }
    case FETCH_BAD_SUPPLIERS_SUCCESS: {
      return {
        ...state,
        badSuppliers: action.payload as BadSupplier[],
      }
    }
    default: {
      return state
    }
  }
}

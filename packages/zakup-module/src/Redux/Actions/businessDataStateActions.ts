import { ReduxActionType } from '@vitacore/shared-ui'
import { Commission } from '../../Entities/Commission'
import { CommissionMember, Person } from '../../Entities/CommissionMember'
import { Notice } from '../../Entities/Notice'
import Supplier, { BadSupplier } from '../../Entities/Supplier'
import { dictionariesNames } from '../../Infrastructure/dictionariesList'
import {
  CLEAR_FETCH_ENTITY_STATUS,
  DELETE_COMMISSION_MEMBER,
  FETCH_ADVERTISEMENT_APPLICANTS,
  FETCH_BAD_SUPPLIERS,
  FETCH_BAD_SUPPLIERS_SUCCESS,
  FETCH_COMMISSIONS,
  FETCH_COMMISSIONS_SUCCESS,
  FETCH_CUSTOM_DICT,
  FETCH_NOTICES,
  FETCH_NOTICES_SUCCESS,
  FETCH_SINGLE_COMMISSION,
  FETCH_SINGLE_COMMISSION_MEMBER,
  FETCH_SINGLE_COMMISSION_MEMBER_SUCCESS,
  FETCH_SINGLE_COMMISSION_SUCCESS,
  FETCH_SINGLE_NOTICE,
  FETCH_SINGLE_NOTICE_SUCCESS,
  FETCH_SUPPLIERS,
  FETCH_SUPPLIERS_SUCCESS,
  FIND_PERSON_BY_IIN,
  FIND_PERSON_BY_IIN_SUCCESS,
  SET_NEW_COMMISSION,
  SET_NEW_NOTICE,
} from '../Constants/businessDataStateConstants'
import { getStore } from '../store'

export function fetchNotices(page: number, pageSize: number, onlyMy: boolean = false): ReduxActionType {
  return {
    type: FETCH_NOTICES,
    payload: {
      page,
      pageSize,
      onlyMy,
    },
  }
}

export function fetchNoticesSuccess(
  notices: Notice[],
  total: number
): ReduxActionType<{ notices: Notice[]; total: number }> {
  return {
    type: FETCH_NOTICES_SUCCESS,
    payload: {
      notices,
      total,
    },
  }
}

export function fetchSingleNotice(id: string): ReduxActionType<string> {
  return {
    type: FETCH_SINGLE_NOTICE,
    payload: id,
  }
}

export function setNewNotice(): ReduxActionType {
  return {
    type: SET_NEW_NOTICE,
    payload: undefined,
  }
}

export function fetchSingleNoticeSuccess(ad: Notice): ReduxActionType<Notice> {
  return {
    type: FETCH_SINGLE_NOTICE_SUCCESS,
    payload: ad,
  }
}

export function setNewCommission(): ReduxActionType {
  return {
    type: SET_NEW_COMMISSION,
    payload: undefined,
  }
}

export function clearFetchEntityStatus() {
  return {
    type: CLEAR_FETCH_ENTITY_STATUS,
  }
}

export function dispatchClearFetchEntityStatus() {
  getStore().dispatch(clearFetchEntityStatus())
}

export function fetchCommissions() {
  return {
    type: FETCH_COMMISSIONS,
    payload: {},
  }
}

export function fetchCommissionsSuccess(results: Commission[]): ReduxActionType<Commission[]> {
  return {
    type: FETCH_COMMISSIONS_SUCCESS,
    payload: results,
  }
}

export function fetchSingleCommission(id: string) {
  return {
    type: FETCH_SINGLE_COMMISSION,
    payload: id,
  }
}

export function fetchSingleCommissionSuccess(results: Commission): ReduxActionType<Commission> {
  return {
    type: FETCH_SINGLE_COMMISSION_SUCCESS,
    payload: results,
  }
}

export function findPersonByIIN(iin: string) {
  return {
    type: FIND_PERSON_BY_IIN,
    payload: iin,
  }
}

export function findPersonByIINSuccess(result: Person): ReduxActionType<Person> {
  return {
    type: FIND_PERSON_BY_IIN_SUCCESS,
    payload: result,
  }
}

export function fetchSingleCommissionMember(id: number) {
  return {
    type: FETCH_SINGLE_COMMISSION_MEMBER,
    payload: id,
  }
}

export function fetchSingleCommissionMemberSuccess(result: CommissionMember): ReduxActionType<CommissionMember> {
  return {
    type: FETCH_SINGLE_COMMISSION_MEMBER_SUCCESS,
    payload: result,
  }
}

export function deleteCommissionMember(id: string) {
  return {
    type: DELETE_COMMISSION_MEMBER,
    payload: id,
  }
}

export function fetchAdApplicants(id: number) {
  return {
    type: FETCH_ADVERTISEMENT_APPLICANTS,
    payload: {
      id,
    },
  }
}

export function fetchAllSuppliers() {
  return {
    type: FETCH_SUPPLIERS,
    payload: {},
  }
}

export function fetchAllSuppliersSuccess(results: Supplier[]): ReduxActionType<Supplier[]> {
  return {
    type: FETCH_SUPPLIERS_SUCCESS,
    payload: results,
  }
}

export function fetchBadSuppliers() {
  return {
    type: FETCH_BAD_SUPPLIERS,
    payload: {},
  }
}

export function fetchBadSuppliersSuccess(results: BadSupplier[]): ReduxActionType<BadSupplier[]> {
  return {
    type: FETCH_BAD_SUPPLIERS_SUCCESS,
    payload: results,
  }
}

export function fetchCustomDict(dicts: dictionariesNames[]): ReduxActionType<dictionariesNames[]> {
  return {
    type: FETCH_CUSTOM_DICT,
    payload: dicts,
  }
}

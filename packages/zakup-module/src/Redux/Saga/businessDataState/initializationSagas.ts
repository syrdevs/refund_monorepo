import { takeEvery } from 'redux-saga/effects'
import {
  DELETE_COMMISSION_MEMBER,
  FETCH_COMMISSIONS,
  FETCH_CUSTOM_DICT,
  FETCH_NOTICES,
  FETCH_SINGLE_COMMISSION,
  FETCH_SINGLE_NOTICE,
  FIND_PERSON_BY_IIN,
  SET_NEW_COMMISSION_REQUESTED,
  SET_NEW_NOTICE_REQUESTED,
} from '../../Constants/businessDataStateConstants'
import {
  deleteCommissionMemberWorkerSaga,
  fetchCommissionsWorkerSaga,
  fetchCustomDictWorkerSaga,
  fetchNoticesWorkerSaga,
  fetchSingleCommissionWorkerSaga,
  fetchSingleNoticeWorkerSaga,
  findPersonByIINWorkerSaga,
  setNewCommissionWorkerSaga,
  setNewNoticeWorkerSaga,
} from './workerSagas'

export function* fetchNoticesSaga() {
  yield takeEvery(FETCH_NOTICES, fetchNoticesWorkerSaga)
}

export function* fetchSingleNoticeSaga() {
  yield takeEvery(FETCH_SINGLE_NOTICE, fetchSingleNoticeWorkerSaga)
}

export function* setNewNoticeSaga() {
  yield takeEvery(SET_NEW_NOTICE_REQUESTED, setNewNoticeWorkerSaga)
}

export function* fetchCommissionsSaga() {
  yield takeEvery(FETCH_COMMISSIONS, fetchCommissionsWorkerSaga)
}

export function* fetchSingleCommissionSaga() {
  yield takeEvery(FETCH_SINGLE_COMMISSION, fetchSingleCommissionWorkerSaga)
}

export function* findPersonByIINSaga() {
  yield takeEvery(FIND_PERSON_BY_IIN, findPersonByIINWorkerSaga)
}

export function* setNewCommissionSaga() {
  yield takeEvery(SET_NEW_COMMISSION_REQUESTED, setNewCommissionWorkerSaga)
}

export function* fetchCustomDictSaga() {
  yield takeEvery(FETCH_CUSTOM_DICT, fetchCustomDictWorkerSaga)
}

export function* deleteCommissionMemberSaga() {
  yield takeEvery(DELETE_COMMISSION_MEMBER, deleteCommissionMemberWorkerSaga)
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

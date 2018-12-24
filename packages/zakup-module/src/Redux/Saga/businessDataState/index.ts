import { all } from 'redux-saga/effects'
import {
  deleteCommissionMemberSaga,
  fetchCommissionsSaga,
  fetchCustomDictSaga,
  fetchNoticesSaga,
  fetchSingleCommissionSaga,
  fetchSingleNoticeSaga,
  findPersonByIINSaga,
  setNewCommissionSaga,
  setNewNoticeSaga,
} from './initializationSagas'

export default function* businessDataStateSagas() {
  yield all([
    fetchNoticesSaga(),
    fetchSingleNoticeSaga(),
    setNewNoticeSaga(),
    fetchCommissionsSaga(),
    fetchSingleCommissionSaga(),
    setNewCommissionSaga(),
    findPersonByIINSaga(),
    deleteCommissionMemberSaga(),
    fetchCustomDictSaga(),
  ])
}

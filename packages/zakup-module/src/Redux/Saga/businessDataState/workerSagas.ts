import { AxiosData, DictionaryBaseML, ListData, ReduxActionType } from '@vitacore/shared-ui'
import { message } from 'antd'
import { all, call, put } from 'redux-saga/effects'
import { Commission } from '../../../Entities/Commission'
import { Person } from '../../../Entities/CommissionMember'
import { Notice } from '../../../Entities/Notice'
import { dictionariesList, dictionariesNames } from '../../../Infrastructure/dictionariesList'
import { createApiClient } from '../../../utils'
import {
  fetchCommissionsSuccess,
  fetchNoticesSuccess,
  fetchSingleCommissionSuccess,
  fetchSingleNoticeSuccess,
  findPersonByIINSuccess,
  setNewCommission,
  setNewNotice,
} from '../../Actions/businessDataStateActions'
import { dictFetching, dictFetchingFinished, dictFetchSuccess } from '../../Actions/dictionariesDataStateActions'
import {
  DELETE_COMMISSION_MEMBER_FAILED,
  DELETE_COMMISSION_MEMBER_SUCCESS,
  FETCH_COMMISSIONS_FAILED,
  FETCH_COMMISSIONS_REQUESTED,
  FETCH_NOTICES_FAILED,
  FETCH_NOTICES_REQUESTED,
  FETCH_SINGLE_COMMISSION_FAILED,
  FETCH_SINGLE_COMMISSION_REQUESTED,
  FETCH_SINGLE_NOTICE_FAILED,
  FETCH_SINGLE_NOTICE_REQUESTED,
  FIND_PERSON_BY_IIN_FAILED,
  FIND_PERSON_BY_IIN_REQUESTED,
} from '../../Constants/businessDataStateConstants'
import { getHistory } from '../../history'
import { getStore } from '../../store'

function* fetchDictionaries(names: dictionariesNames[], forceRefetch = false) {
  try {
    const dictItems = dictionariesList
      .filter(item => names.indexOf(item.name as dictionariesNames) > -1)
      .filter(item => forceRefetch || !getStore().getState().dictionariesDataState[item.name].length)

    const apiClient = createApiClient()

    yield put(dictFetching(dictItems.map(i => i.name)))
    const dicts: Array<AxiosData<ListData<DictionaryBaseML>>> = yield all(
      dictItems.map(dictItem => call(apiClient.fetchDict, dictItem.entity || dictItem.name, dictItem.alias))
    )

    const dictNameWithData = dictItems.map((dictItem, idx) => ({
      dictName: dictItem.name,
      data: dicts[idx].data.content,
    }))

    yield all(
      dictNameWithData.map((dictData: { dictName: string; data: DictionaryBaseML[] }) =>
        put(dictFetchSuccess(dictData.dictName, dictData.data))
      )
    )
  } catch (e) {
    message.error('Ошибка при загрузке справочников!')
  } finally {
    yield put(dictFetchingFinished())
  }
}

export function* fetchNoticesWorkerSaga(action: ReduxActionType<{ page: number; pageSize: number; onlyMy: boolean }>) {
  try {
    yield put({ type: FETCH_NOTICES_REQUESTED })
    const notices: AxiosData<ListData<Notice> | null> = yield call(
      createApiClient().fetchNotices,
      action.payload.page,
      action.payload.pageSize
    )

    if (notices.data) {
      yield put(fetchNoticesSuccess(notices.data.content, notices.data.totalElements))
    } else {
      yield put({ type: FETCH_NOTICES_FAILED })
    }
  } catch (e) {
    yield put({ type: FETCH_NOTICES_FAILED, message: e.Message })
  }
}

export function* fetchSingleNoticeWorkerSaga(action: ReduxActionType<string>) {
  try {
    yield put({ type: FETCH_SINGLE_NOTICE_REQUESTED })
    const ad: AxiosData<Notice | null> = yield call(createApiClient().fetchNotice, action.payload)

    if (ad.data) {
      yield put(fetchSingleNoticeSuccess(ad.data))
      yield* fetchDictionaries(['medicalForm', 'medicalType', 'region', 'noticeType'])
    } else {
      yield put({ type: FETCH_SINGLE_NOTICE_FAILED })
    }
  } catch (e) {
    yield put({ type: FETCH_SINGLE_NOTICE_FAILED, message: e.Message })
  }
}

export function* setNewNoticeWorkerSaga() {
  yield* fetchDictionaries(['medicalForm', 'medicalType', 'region', 'noticeType'])
  yield put(setNewNotice())
}

export function* fetchCommissionsWorkerSaga() {
  try {
    yield put({ type: FETCH_COMMISSIONS_REQUESTED })
    const results: AxiosData<ListData<Commission> | null> = yield call(createApiClient().fetchCommissions)

    if (results.data) {
      yield put(fetchCommissionsSuccess(results.data.content))
    } else {
      yield put({ type: FETCH_COMMISSIONS_FAILED })
    }
  } catch (e) {
    yield put({ type: FETCH_COMMISSIONS_FAILED, message: e.Message })
  }
}

export function* fetchSingleCommissionWorkerSaga(action: ReduxActionType<string>) {
  try {
    yield put({ type: FETCH_SINGLE_COMMISSION_REQUESTED })
    const results: AxiosData<Commission | null> = yield call(createApiClient().fetchSingleCommission, action.payload)

    if (results.data) {
      yield put(fetchSingleCommissionSuccess(results.data))
      yield* fetchDictionaries(['region', 'sex', 'meetingMemberRole'])
    } else {
      yield put({ type: FETCH_SINGLE_COMMISSION_FAILED })
    }
  } catch (e) {
    yield put({ type: FETCH_SINGLE_COMMISSION_FAILED, message: e.Message })
  }
}

export function* findPersonByIINWorkerSaga(action: ReduxActionType<string>) {
  try {
    yield put({ type: FIND_PERSON_BY_IIN_REQUESTED })
    const results: AxiosData<Person | null> = yield call(createApiClient().findPersonByIIN, action.payload)

    if (results.data) {
      yield put(findPersonByIINSuccess(results.data))
      message.success('Физ. лицо найдено успешно!')
    } else {
      yield put({ type: FIND_PERSON_BY_IIN_FAILED })
      message.error('Физ. лицо не найдено')
    }
  } catch (e) {
    yield put({ type: FIND_PERSON_BY_IIN_FAILED, message: e.Message })
    message.error('Физ. лицо не найдено')
  }
}

export function* setNewCommissionWorkerSaga() {
  yield* fetchDictionaries(['region'])
  yield put(setNewCommission())
}

export function* fetchCustomDictWorkerSaga(action: ReduxActionType<dictionariesNames[]>) {
  yield* fetchDictionaries(action.payload)
}

export function* deleteCommissionMemberWorkerSaga(action: ReduxActionType<string>) {
  try {
    const res = yield call(createApiClient().deleteCommissionMember, action.payload)

    if (res.status === 200) {
      yield put({ type: DELETE_COMMISSION_MEMBER_SUCCESS })
      getHistory().push('/commission/active')
    } else {
      yield put({ type: DELETE_COMMISSION_MEMBER_FAILED })
    }
  } catch (e) {
    yield put({ type: DELETE_COMMISSION_MEMBER_FAILED, message: e.message })
  }
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

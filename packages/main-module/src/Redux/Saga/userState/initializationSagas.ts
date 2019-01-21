import { takeLatest } from 'redux-saga/effects'
import { CHECK_AUTH_TOKEN, LOGIN_REQUESTED, LOGOUT } from '../../Constants/userStateConstants'
import { checkAuthToken, logout, tryLogin } from './workerSagas'

export function* loginSaga() {
  yield takeLatest(LOGIN_REQUESTED, tryLogin)
}

export function* checkAuthTokenSaga() {
  yield takeLatest(CHECK_AUTH_TOKEN, checkAuthToken)
}

export function* logoutSaga() {
  yield takeLatest(LOGOUT, logout)
}

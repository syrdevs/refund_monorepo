import { AUTH_TOKEN, AxiosData, ReduxActionType } from '@vitacore/shared-ui'
import { message } from 'antd'
import { call, put } from 'redux-saga/effects'
import { default as User } from '../../../Models/User'
import { getAuthToken } from '../../../Services/AuthenticationService'
import { createApiClient } from '../../../utils'
import { checkAuthInProgress, checkAuthTokenSuccess, loginSuccess } from '../../Actions/userStateActions'
import { CHECK_AUTH_TOKEN_FAILED, LOGIN_FAILED, LOGOUT_SUCCESS } from '../../Constants/userStateConstants'
import history from '../../history'

export function* tryLogin(
  action: ReduxActionType<{ userName: string; password: string; redirectTo: string | undefined }>
) {
  try {
    const user: AxiosData<User | null> = yield call(
      createApiClient().requestLogin,
      action.payload.userName,
      action.payload.password
    )

    if (user.data) {
      yield put(loginSuccess(user.data))
      localStorage.setItem(AUTH_TOKEN, user.data.token)
      history.push(action.payload.redirectTo || '/')
    } else {
      localStorage.removeItem(AUTH_TOKEN)
      yield put({ type: LOGIN_FAILED, payload: 'Не удалось авторизоваться на сайте' })
      message.error('Не удалось авторизоваться на сайте')
    }
  } catch (e) {
    console.log(e)
    yield put({ type: LOGIN_FAILED, payload: 'Не удалось авторизоваться на сайте' })
    message.error('Не удалось авторизоваться на сайте')
  }
}

export function* checkAuthToken(
  action: ReduxActionType<{ promiseResolve: (value?: boolean | PromiseLike<boolean>) => void }>
) {
  try {
    yield put(checkAuthInProgress())
    const user: AxiosData<{ userName: string }> = yield call(createApiClient().checkAuthToken)

    if (user.data) {
      const userData = {
        userName: user.data.userName,
        token: getAuthToken(),
      } as User

      yield put(checkAuthTokenSuccess(userData))
      action.payload.promiseResolve(true)
    } else {
      localStorage.removeItem(AUTH_TOKEN)
      yield put({ type: CHECK_AUTH_TOKEN_FAILED, payload: 'Не удалось авторизоваться на сайте' })
      action.payload.promiseResolve(false)
    }
  } catch (e) {
    localStorage.removeItem(AUTH_TOKEN)
    yield put({ type: CHECK_AUTH_TOKEN_FAILED, payload: 'Не удалось авторизоваться на сайте' })
    action.payload.promiseResolve(false)
  }
}

export function* logout() {
  try {
    yield call(createApiClient().logout)
  } finally {
    localStorage.removeItem(AUTH_TOKEN)
    yield put({ type: LOGOUT_SUCCESS })
    history.push('/login')
  }
}

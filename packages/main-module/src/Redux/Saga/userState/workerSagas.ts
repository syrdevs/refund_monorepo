import { AUTH_TOKEN, AxiosData, ReduxActionType } from '@vitacore/shared-ui'
import { message } from 'antd'
import { call, fork, put } from 'redux-saga/effects'
import { default as User, UserInfo } from '../../../Models/User'
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
      localStorage.setItem(AUTH_TOKEN, user.data.token)
      yield fork(getUserInfo, user.data, false, undefined, action.payload.redirectTo)
    } else {
      localStorage.removeItem(AUTH_TOKEN)
      yield put({ type: LOGIN_FAILED, payload: 'Не удалось авторизоваться на сайте' })
      message.error('Не удалось авторизоваться на сайте')
    }
  } catch (e) {
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

      yield fork(getUserInfo, userData, true, action.payload.promiseResolve, undefined)
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

function* getUserInfo(
  userData: User,
  fromCheckToken: boolean,
  promiseResolve?: (value?: boolean | PromiseLike<boolean>) => void,
  redirectTo?: string | undefined
) {
  try {
    const userInfo: AxiosData<UserInfo & { roles: string }> = yield call(createApiClient().getUserInfo)
    if (userInfo) {
      const rolesStr = userInfo.data.roles as string
      const finalUserData = {
        ...userData,
        userInfo: {
          ...userInfo.data,
          roles: rolesStr && rolesStr.split(',').map(i => i.trim()),
        },
      } as User

      if (fromCheckToken) {
        yield put(checkAuthTokenSuccess(finalUserData))
        promiseResolve!(true)
      } else {
        yield put(loginSuccess(finalUserData))
        history.push(redirectTo || '/')
      }
    }
  } catch (e) {
    message.error(e)
  }
}

import { ReduxActionType } from '@vitacore/shared-ui'
import { default as User } from '../../Models/User'
import {
  CHECK_AUTH_TOKEN_IN_PROGRESS,
  CHECK_AUTH_TOKEN_SUCCESS,
  LOGIN_REQUESTED,
  LOGIN_SUCCESS,
} from '../Constants/userStateConstants'

export function login(userName: string, password: string, redirectTo: string | undefined): ReduxActionType {
  return {
    type: LOGIN_REQUESTED,
    payload: {
      userName,
      password,
      redirectTo,
    },
  }
}

export function loginSuccess(user: User): ReduxActionType<User> {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  }
}

export function checkAuthTokenSuccess(user: User): ReduxActionType<User> {
  return {
    type: CHECK_AUTH_TOKEN_SUCCESS,
    payload: user,
  }
}

export function checkAuthInProgress(): ReduxActionType {
  return {
    type: CHECK_AUTH_TOKEN_IN_PROGRESS,
    payload: {},
  }
}

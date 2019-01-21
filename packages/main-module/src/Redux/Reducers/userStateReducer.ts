import { ReduxActionType } from '@vitacore/shared-ui'
import { combineReducers } from 'redux'
import { default as User } from '../../Models/User'
import {
  CHECK_AUTH_TOKEN_FAILED,
  CHECK_AUTH_TOKEN_IN_PROGRESS,
  CHECK_AUTH_TOKEN_SUCCESS,
  LOGIN_FAILED,
  LOGIN_REQUESTED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from '../Constants/userStateConstants'
import { default as UserState } from '../StateModels/UserState'

const defaultState: UserState = {
  isAuthenticated: false,
  loginInProgress: false,
  user: {
    userName: '',
    token: '',
  },
  loginErrorMessage: '',
  tokenCheckFailed: false,
}

const userStateReducer = combineReducers({
  isAuthenticated: (state: boolean = defaultState.isAuthenticated, action: ReduxActionType<UserState>) => {
    switch (action.type) {
      case CHECK_AUTH_TOKEN_IN_PROGRESS:
      case LOGIN_REQUESTED:
      case LOGOUT_SUCCESS:
      case LOGIN_FAILED:
      case CHECK_AUTH_TOKEN_FAILED: {
        return false
      }
      case LOGIN_SUCCESS:
      case CHECK_AUTH_TOKEN_SUCCESS: {
        return true
      }
      default: {
        return state
      }
    }
  },
  loginInProgress: (state: boolean = defaultState.loginInProgress, action: ReduxActionType<UserState>) => {
    switch (action.type) {
      case CHECK_AUTH_TOKEN_IN_PROGRESS:
      case LOGIN_REQUESTED: {
        return true
      }
      case LOGIN_SUCCESS:
      case LOGOUT_SUCCESS:
      case LOGIN_FAILED:
      case CHECK_AUTH_TOKEN_FAILED:
      case CHECK_AUTH_TOKEN_SUCCESS: {
        return false
      }
      default: {
        return state
      }
    }
  },
  loginErrorMessage: (state: string = defaultState.loginErrorMessage, action: ReduxActionType<string>) => {
    switch (action.type) {
      case CHECK_AUTH_TOKEN_IN_PROGRESS:
      case LOGIN_REQUESTED:
      case LOGOUT_SUCCESS:
      case LOGIN_SUCCESS:
      case CHECK_AUTH_TOKEN_SUCCESS: {
        return ''
      }
      case LOGIN_FAILED:
      case CHECK_AUTH_TOKEN_FAILED: {
        return action.payload
      }
      default: {
        return state
      }
    }
  },
  user: (state: User = defaultState.user, action: ReduxActionType<User>) => {
    switch (action.type) {
      case CHECK_AUTH_TOKEN_IN_PROGRESS:
      case LOGIN_REQUESTED:
      case LOGOUT_SUCCESS:
      case LOGIN_FAILED:
      case CHECK_AUTH_TOKEN_FAILED: {
        return defaultState.user
      }
      case LOGIN_SUCCESS:
      case CHECK_AUTH_TOKEN_SUCCESS: {
        return action.payload
      }
      default: {
        return state
      }
    }
  },
  tokenCheckFailed: (state: boolean = defaultState.tokenCheckFailed, action: ReduxActionType<boolean>) => {
    switch (action.type) {
      case CHECK_AUTH_TOKEN_FAILED: {
        return true
      }
      case LOGIN_SUCCESS:
      case CHECK_AUTH_TOKEN_IN_PROGRESS:
      case LOGIN_REQUESTED:
      case LOGOUT_SUCCESS:
      case LOGIN_FAILED:
      case CHECK_AUTH_TOKEN_SUCCESS: {
        return false
      }
      default: {
        return state
      }
    }
  },
})

export default userStateReducer

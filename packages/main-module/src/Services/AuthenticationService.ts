import { AUTH_TOKEN } from '@vitacore/shared-ui'
import { CHECK_AUTH_TOKEN, LOGOUT } from '../Redux/Constants/userStateConstants'
import store from '../Redux/store'

export function isUserAuthenticated(checkTokenOnServer: boolean = true): Promise<boolean> {
  const isAuthenticated = store.getState().userState.isAuthenticated
  if (isAuthenticated) {
    return Promise.resolve(true)
  }

  const authToken = getAuthToken()
  if (!authToken) {
    return Promise.resolve(false)
  }

  if (!checkTokenOnServer) {
    return Promise.resolve(false)
  }

  return new Promise(resolve => {
    store.dispatch({ type: CHECK_AUTH_TOKEN, payload: { authToken, promiseResolve: resolve } })
  })
}

export function isUserAuthenticatedSimple(): boolean {
  return store.getState().userState.isAuthenticated
}

export function getAuthToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN)
}

export function logout() {
  store.dispatch({ type: LOGOUT })
}

import { LANGUAGE, REQUEST_FINISHED, REQUEST_STARTED } from '@vitacore/shared-ui'
import * as i18next from 'i18next'
import APIClient from './API/APIClient'
// import FakeAPIClient from './API/FakeAPIClient'
import IAPIClient from './API/IAPIClient'
import store from './Redux/store'

export const createApiClient: () => IAPIClient = () => {
  // const useProd = process.env.NODE_ENV === 'production' || process.env.REACT_APP_ENV === 'production'
  // if (useProd) {
  //   console.warn('Using production mode')
  return new APIClient()
  // }
  //
  // return new FakeAPIClient()
}

export const requestStarted = () => {
  store.dispatch({ type: REQUEST_STARTED })
}

export const requestFinished = (message?: string) => {
  store.dispatch({ type: REQUEST_FINISHED, payload: message })
}

export const emulateRequest = (fn: any, timeout: number, message?: string) => {
  let delay = timeout
  if (timeout < 0) {
    delay = Math.abs(timeout)
  }

  requestStarted()
  setTimeout(() => {
    fn()
    requestFinished(message)
  }, delay)
}

export const getUserLanguage = () => {
  let currentLng = localStorage.getItem(LANGUAGE)
  if (!currentLng) {
    currentLng = 'ru'
    localStorage.setItem(LANGUAGE, currentLng)
  }
  return currentLng
}

const userLanguageChangeCBs = [] as Array<(lng: string) => any>
export const addUserLanguageChangeCb = (cb: (lng: string) => any) => {
  userLanguageChangeCBs.push(cb)
}

export const setUserLanguage = (lng: string) => {
  i18next.changeLanguage(lng)
  localStorage.setItem(LANGUAGE, lng)

  for (const cb of userLanguageChangeCBs) {
    cb(lng)
  }
}

export const isFalse = (value: any) => {
  if (typeof value === 'undefined') {
    return false
  }

  return !value
}

export const isTrue = (value: any) => {
  if (typeof value === 'undefined') {
    return false
  }

  return !!value
}

import { APP_ROUTE_KEY } from '@vitacore/shared-ui'

export const emulateRequest = (fn, timeout, message) => {
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

export const requestStarted = () => {
  callAppFunction('requestStarted')
}

export const requestFinished = (message) => {
  callAppFunction('requestFinished', message)
}

export const getUserLanguage = () => callAppFunction('getUserLanguage')

export const setUserLanguage = (lng) => {
  // i18next.changeLanguage(lng)
}

const appFunctions = {}
export const addToAppFunctions = (name, cb) => {
  appFunctions[name] = cb
}

export const getAppFunction = (name) => {
  return appFunctions[name]
}

export const callAppFunction = (name, ...args) => {
  const fn = appFunctions[name]
  if (fn) {
    return fn(...args)
  }

  return null
}

const appData = {}
export const addToAppData = (name, value) => {
  appData[name] = value
}

export const getAppData = (name) => {
  return appData[name]
}

export const getAppRoute = () => {
  const value = appData[APP_ROUTE_KEY]
  if (!value) {
    throw new Error('You must set APP_ROUTE first')
  }

  return value
}

export const isFalse = value => {
  if (typeof value === 'undefined') {
    return false
  }

  return !value
}

export const isTrue = value => {
  if (typeof value === 'undefined') {
    return false
  }

  return !!value
}

export const isModuleDev = () => {
  return process.env.REACT_APP_ENV === 'development'
}

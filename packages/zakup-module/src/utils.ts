import { APP_ROUTE_KEY } from '@vitacore/shared-ui'
import moment, { Moment } from 'moment'
import APIClient from './API/APIClient'
// import FakeAPIClient from './API/FakeAPIClient'
// import IAPIClient from './API/IAPIClient'
import { DictionaryItemBase } from './Models/DictionaryItemBase'
import SelectOption from './Models/SelectOption'

export const createApiClient: () => APIClient = () => {
  // const useProd = process.env.NODE_ENV === 'production' || process.env.REACT_APP_ENV === 'production'
  // if (useProd) {
  // console.warn('Using production mode')
  //   return new APIClient()
  // }
  return new APIClient()

  // return new FakeAPIClient()
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

export const requestStarted = () => {
  callAppFunction('requestStarted')
}

export const requestFinished = (message?: string) => {
  callAppFunction('requestFinished', message)
}

export const getDateWithAppliedTimezone = (date: Date) => {
  if (!date) {
    return date
  }

  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
}

export const formatDate = (date: Date) => {
  if (!date) {
    return ''
  }

  return date.toISOString().split('T')[0]
}

export const convertStringIntoDate = (dateStr: string) => {
  return new Date(dateStr)
}

export const selectInputParseAndFormat = (data: SelectOption[], valueGetterFn: (option: any) => any) => {
  return {
    parse: (value: any[] | any) => {
      if (!Array.isArray(value)) {
        return value.value
      }
      return value.map(valueGetterFn)
    },
    format: (value: string[]) => {
      if (!value) {
        return []
      }
      return value.map(item => data.find(i => valueGetterFn(i) === item)).filter(item => item)
    },
  }
}

export const transformDictionaryItemsToSelectInputOptions = (dictItems: DictionaryItemBase[]) => {
  return dictItems.map(item => ({
    value: item.id,
    label: item.name,
  })) as SelectOption[]
}

export const getUserLanguage = () => callAppFunction('getUserLanguage') as string

export const setUserLanguage = (lng: string) => {
  // i18next.changeLanguage(lng)
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

const appFunctions = {}
export const addToAppFunctions = (name: string, cb?: any) => {
  appFunctions[name] = cb
}

export const getAppFunction = (name: string) => {
  return appFunctions[name]
}

export const callAppFunction = (name: string, ...args: any[]) => {
  const fn = appFunctions[name]
  if (fn) {
    return fn(...args)
  }

  return null
}

const appData = {}
export const addToAppData = (name: string, value: any) => {
  appData[name] = value
}

export const getAppData = (name: string) => {
  return appData[name]
}

export const getAppRoute = () => {
  const value = appData[APP_ROUTE_KEY]
  if (!value) {
    throw new Error('You must set APP_ROUTE first')
  }

  return value
}

export const isModuleDev = () => {
  return process.env.REACT_APP_ENV === 'development'
}

export const isDisabledPreviousDate = (current: Moment) => moment().diff(current, 'days') >= 1
export const isDisabledNextDate = (current: Moment) => moment().diff(current, 'days') < 1

export const isDisabledPreviousTime = (current: Moment) => {
  const now = moment()
  return {
    disabledHours: () => {
      const hoursDiff = now.diff(current, 'hours') % 24
      return Array.apply(null, { length: hoursDiff }).map(Number.call, Number)
    },
    disabledMinutes: () => {
      const minutesDiff = now.diff(current, 'minutes') % 60
      return Array.apply(null, { length: minutesDiff }).map(Number.call, Number)
    },
    disabledSeconds: () => [] as number[],
  }
}
export const isDisabledNextTime = (current: Moment) => moment().diff(current, 'minutes') < 1

import * as ReactHistory from 'history'
import { getAppData } from '../utils'

export const NativeHistory = window.history

export const getHistory = () => {
  return getAppData('history') as ReactHistory.History
}

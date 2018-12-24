import { DictionaryBaseML, ReduxActionType } from '@vitacore/shared-ui'
import {
  DICTIONARIES_FETCH_FINISHED,
  DICTIONARIES_FETCH_REQUESTED,
  DICTIONARIES_FETCH_SUCCESS_BASE,
} from '../Constants/dictionariesDataStateConstants'

export function dictFetching(dictNames: string[]) {
  return {
    type: DICTIONARIES_FETCH_REQUESTED,
    payload: dictNames,
  }
}

export function dictFetchingFinished() {
  return {
    type: DICTIONARIES_FETCH_FINISHED,
    payload: undefined,
  }
}

export function dictFetchSuccess(dictName: string, dictItems: DictionaryBaseML[]): ReduxActionType<DictionaryBaseML[]> {
  return {
    type: `${DICTIONARIES_FETCH_SUCCESS_BASE}.${dictName}`,
    payload: dictItems,
  }
}

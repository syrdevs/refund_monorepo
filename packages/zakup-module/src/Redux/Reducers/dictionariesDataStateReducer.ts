import { DictionaryBaseML, ReduxActionType } from '@vitacore/shared-ui'
import { combineReducers, ReducersMapObject } from 'redux'
import { dictionariesList } from '../../Infrastructure/dictionariesList'
import DictionaryType from '../../Models/DictionaryType'
import {
  DICTIONARIES_FETCH_FINISHED,
  DICTIONARIES_FETCH_REQUESTED,
  DICTIONARIES_FETCH_SUCCESS_BASE,
} from '../Constants/dictionariesDataStateConstants'
import DictionariesDataState from '../StateModels/DictionariesDataState'

const defaultState = dictionariesList.reduce(
  (prevValue: DictionariesDataState, currentValue: DictionaryType) => {
    prevValue[currentValue.name] = [] as DictionaryBaseML[]
    return prevValue
  },
  { dictNamesFetching: [] as string[] }
) as DictionariesDataState

const setOfReducers = dictionariesList.reduce(
  (prevValue: ReducersMapObject<any, any>, currentValue: DictionaryType) => {
    prevValue[currentValue.name] = (
      state: DictionaryBaseML[] = defaultState[currentValue.name],
      action: ReduxActionType<DictionaryBaseML[]>
    ) => {
      const successCaseName = `${DICTIONARIES_FETCH_SUCCESS_BASE}.${currentValue.name}`

      switch (action.type) {
        case successCaseName: {
          return action.payload
        }
      }
      return state
    }
    return prevValue
  },
  {}
) as ReducersMapObject<any, any>

setOfReducers['dictNamesFetching'] = (
  state: string[] = defaultState.dictNamesFetching,
  action: ReduxActionType<string[]>
) => {
  switch (action.type) {
    case DICTIONARIES_FETCH_REQUESTED: {
      return action.payload
    }
    case DICTIONARIES_FETCH_FINISHED: {
      return [] as string[]
    }
  }

  return state
}

const dictionariesDataStateReducer = combineReducers(setOfReducers)
export default dictionariesDataStateReducer

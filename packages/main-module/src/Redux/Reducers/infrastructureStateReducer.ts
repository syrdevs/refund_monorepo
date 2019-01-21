import { ReduxActionType, REQUEST_FINISHED, REQUEST_STARTED } from '@vitacore/shared-ui'
import { combineReducers } from 'redux'
import { CLEAR_LOADER_MESSAGE } from '../Constants/infrastructureStateConstants'
import { default as InfrastructureState } from '../StateModels/InfrastructureState'

const defaultState: InfrastructureState = {
  numberOfRequestsInProgress: 0,
  loaderResponseMessage: null,
}

const infrastructureStateReducer = combineReducers({
  numberOfRequestsInProgress: (state: number = defaultState.numberOfRequestsInProgress, action: ReduxActionType) => {
    switch (action.type) {
      case REQUEST_STARTED: {
        return state + 1
      }
      case REQUEST_FINISHED: {
        return Math.max(state - 1, 0)
      }
    }
    return state
  },
  loaderResponseMessage: (
    state: string | null = defaultState.loaderResponseMessage,
    action: ReduxActionType<string>
  ) => {
    switch (action.type) {
      case REQUEST_FINISHED: {
        return action.payload || state
      }
      case CLEAR_LOADER_MESSAGE: {
        return null
      }
    }
    return state
  },
})

export default infrastructureStateReducer

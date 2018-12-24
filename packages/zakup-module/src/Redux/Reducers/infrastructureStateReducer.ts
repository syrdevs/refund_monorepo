import { ReduxActionType } from '@vitacore/shared-ui'
import { combineReducers } from 'redux'
import { ModalInfo } from '../../Models/ModalInfo'
import { ADD_NEW_MODAL, CLOSE_RECENT_MODAL } from '../Constants/infrastructureStateConstants'
import { InfrastructureState } from '../StateModels'

const defaultState: InfrastructureState = {
  modals: [],
}

const infrastructureStateReducer = combineReducers({
  modals: (state: ModalInfo[] = defaultState.modals, action: ReduxActionType<ModalInfo | number>) => {
    switch (action.type) {
      case ADD_NEW_MODAL: {
        return [...state, action.payload as ModalInfo]
      }
      case CLOSE_RECENT_MODAL: {
        return state.length > 0 ? state.slice(0, Math.max(state.length - (action.payload as number), 0)) : state
      }
    }
    return state
  },
})

export default infrastructureStateReducer

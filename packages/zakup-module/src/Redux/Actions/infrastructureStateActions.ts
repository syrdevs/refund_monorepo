import { ReduxActionType } from '@vitacore/shared-ui'
import { ModalInfo } from '../../Models/ModalInfo'
import { ADD_NEW_MODAL, CLOSE_RECENT_MODAL } from '../Constants/infrastructureStateConstants'
import { getStore } from '../store'

export function addNewModal(modalInfo: ModalInfo): ReduxActionType<ModalInfo> {
  return {
    type: ADD_NEW_MODAL,
    payload: modalInfo,
  }
}

export function dispatchAddNewModal(modalInfo: ModalInfo) {
  getStore().dispatch(addNewModal(modalInfo))
}

export function closeRecentModal(numberToClose?: number): ReduxActionType {
  return {
    type: CLOSE_RECENT_MODAL,
    payload: numberToClose || 1,
  }
}

export function dispatchCloseRecentModal() {
  getStore().dispatch(closeRecentModal())
}

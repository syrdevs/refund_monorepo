import { ReduxActionType } from '@vitacore/shared-ui'
import { CLEAR_LOADER_MESSAGE } from '../Constants/infrastructureStateConstants'

export function clearLoaderMessage(): ReduxActionType {
  return {
    type: CLEAR_LOADER_MESSAGE,
    payload: undefined,
  }
}

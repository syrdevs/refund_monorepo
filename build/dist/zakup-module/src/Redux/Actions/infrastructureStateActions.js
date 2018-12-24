import { ADD_NEW_MODAL, CLOSE_RECENT_MODAL } from '../Constants/infrastructureStateConstants';
import { getStore } from '../store';
export function addNewModal(modalInfo) {
    return {
        type: ADD_NEW_MODAL,
        payload: modalInfo,
    };
}
export function dispatchAddNewModal(modalInfo) {
    getStore().dispatch(addNewModal(modalInfo));
}
export function closeRecentModal(numberToClose) {
    return {
        type: CLOSE_RECENT_MODAL,
        payload: numberToClose || 1,
    };
}
export function dispatchCloseRecentModal() {
    getStore().dispatch(closeRecentModal());
}
//# sourceMappingURL=infrastructureStateActions.js.map
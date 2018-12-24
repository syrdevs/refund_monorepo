"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var infrastructureStateConstants_1 = require("../Constants/infrastructureStateConstants");
var store_1 = require("../store");
function addNewModal(modalInfo) {
    return {
        type: infrastructureStateConstants_1.ADD_NEW_MODAL,
        payload: modalInfo,
    };
}
exports.addNewModal = addNewModal;
function dispatchAddNewModal(modalInfo) {
    store_1.getStore().dispatch(addNewModal(modalInfo));
}
exports.dispatchAddNewModal = dispatchAddNewModal;
function closeRecentModal(numberToClose) {
    return {
        type: infrastructureStateConstants_1.CLOSE_RECENT_MODAL,
        payload: numberToClose || 1,
    };
}
exports.closeRecentModal = closeRecentModal;
function dispatchCloseRecentModal() {
    store_1.getStore().dispatch(closeRecentModal());
}
exports.dispatchCloseRecentModal = dispatchCloseRecentModal;
//# sourceMappingURL=infrastructureStateActions.js.map
import { ReduxActionType } from '@vitacore/shared-ui';
import { ModalInfo } from '../../Models/ModalInfo';
export declare function addNewModal(modalInfo: ModalInfo): ReduxActionType<ModalInfo>;
export declare function dispatchAddNewModal(modalInfo: ModalInfo): void;
export declare function closeRecentModal(numberToClose?: number): ReduxActionType;
export declare function dispatchCloseRecentModal(): void;

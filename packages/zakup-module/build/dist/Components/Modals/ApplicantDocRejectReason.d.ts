import React from 'react';
import { ModalInfo } from '../../Models/ModalInfo';
declare const createRejectReasonModalInfo: (header: string, okRejectClick: (text: string) => (evt?: React.MouseEvent<HTMLButtonElement> | undefined) => any, okCancelClick?: ((evt?: React.MouseEvent<HTMLButtonElement> | undefined) => any) | undefined, okBtnText?: string | undefined, cancelBtnText?: string | undefined, closable?: boolean | undefined, onClose?: (() => any) | undefined) => ModalInfo;
export default createRejectReasonModalInfo;

import * as React from 'react';
import { ModalInfo } from '../../Models/ModalInfo';
declare const CreateOkModalInfo: (header: string, body: any, okOnClick: (evt?: React.MouseEvent<HTMLButtonElement> | undefined) => any, okBtnText?: string | undefined, closable?: boolean | undefined, onClose?: (() => any) | undefined) => ModalInfo;
export default CreateOkModalInfo;

import * as React from 'react';
import { ModalInfo } from '../../Models/ModalInfo';
declare const CreateYesNoModalInfo: (header: string, body: any, yesOnClick: (evt?: React.MouseEvent<HTMLButtonElement> | undefined) => any, yesBtnText?: string | undefined, noOnClick?: ((evt?: React.MouseEvent<HTMLButtonElement> | undefined) => any) | undefined, noBtnText?: string | undefined, closable?: boolean | undefined, onClose?: (() => any) | undefined) => ModalInfo;
export default CreateYesNoModalInfo;

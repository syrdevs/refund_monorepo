import * as React from 'react'
import styled from 'styled-components'
import { ModalInfo } from '../../Models/ModalInfo'
import Button from '../../Vitacore/Controls/Button'

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-top: 12px;

  & > button:not(:last-child) {
    margin-right: 4px;
  }
`

const CreateYesNoModalInfo = (
  header: string,
  body: any,
  yesOnClick: (evt?: React.MouseEvent<HTMLButtonElement>) => any,
  yesBtnText?: string,
  noOnClick?: (evt?: React.MouseEvent<HTMLButtonElement>) => any,
  noBtnText?: string,
  closable?: boolean,
  onClose?: () => any
) =>
  ({
    header,
    content: (
      <React.Fragment>
        <div>{body}</div>
        <ButtonsContainer>
          <Button text={yesBtnText || 'Да'} onClick={yesOnClick} colorSchema="blue" />
          {noOnClick && <Button onClick={noOnClick} text={noBtnText || 'Нет'} colorSchema="blue" />}
        </ButtonsContainer>
      </React.Fragment>
    ),
    onClose,
    closable,
  } as ModalInfo)

export default CreateYesNoModalInfo

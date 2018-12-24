import * as React from 'react'
import styled from 'styled-components'
import { ModalInfo } from '../../Models/ModalInfo'
import Button from '../../Vitacore/Controls/Button'

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 12px;

  & > button:not(:last-child) {
    margin-right: 4px;
  }
`

const CreateOkModalInfo = (
  header: string,
  body: any,
  okOnClick: (evt?: React.MouseEvent<HTMLButtonElement>) => any,
  okBtnText?: string,
  closable?: boolean,
  onClose?: () => any
) =>
  ({
    header,
    content: (
      <React.Fragment>
        <div>{body}</div>
        <ButtonsContainer>
          <Button text={okBtnText || 'OK'} onClick={okOnClick} colorSchema="blue" />
        </ButtonsContainer>
      </React.Fragment>
    ),
    onClose,
    closable,
  } as ModalInfo)

export default CreateOkModalInfo

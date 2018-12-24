import { Input } from 'antd'
import React, { ChangeEvent } from 'react'
import styled from 'styled-components'
import { ModalInfo } from '../../Models/ModalInfo'
import { closeRecentModal } from '../../Redux/Actions/infrastructureStateActions'
import { getStore } from '../../Redux/store'
import Button from '../../Vitacore/Controls/Button'
const TextArea = Input.TextArea

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-top: 12px;

  & > button:not(:last-child) {
    margin-right: 4px;
  }
`

type Props = {
  onRejectClick: (text: string) => (evt?: React.MouseEvent<HTMLButtonElement>) => any
  rejectBtnText?: string
  onCancelClick?: (evt?: React.MouseEvent<HTMLButtonElement>) => any
  cancelBtnText?: string
}

type State = {
  reasonText: string
}

class ApplicantDocRejectReason extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      reasonText: '',
    }
  }

  public render() {
    const { onRejectClick, rejectBtnText, onCancelClick, cancelBtnText } = this.props

    return (
      <React.Fragment>
        <TextArea value={this.state.reasonText} onChange={this.onRejectTextChange} />
        <ButtonsContainer>
          <Button
            text={rejectBtnText || 'Отказать'}
            onClick={onRejectClick(this.state.reasonText)}
            colorSchema="blue"
          />
          <Button
            text={cancelBtnText || 'Отмена'}
            onClick={onCancelClick || (() => getStore().dispatch(closeRecentModal()))}
            colorSchema="blue"
          />
        </ButtonsContainer>
      </React.Fragment>
    )
  }

  private onRejectTextChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({
      reasonText: evt.target.value,
    })
  }
}

const createRejectReasonModalInfo = (
  header: string,
  okRejectClick: (text: string) => (evt?: React.MouseEvent<HTMLButtonElement>) => any,
  okCancelClick?: (evt?: React.MouseEvent<HTMLButtonElement>) => any,
  okBtnText?: string,
  cancelBtnText?: string,
  closable?: boolean,
  onClose?: () => any
) =>
  ({
    header,
    content: (
      <ApplicantDocRejectReason
        onRejectClick={okRejectClick}
        rejectBtnText={okBtnText}
        onCancelClick={okCancelClick}
        cancelBtnText={cancelBtnText}
      />
    ),
    onClose,
    closable,
  } as ModalInfo)

export default createRejectReasonModalInfo

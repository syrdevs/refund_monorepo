import { COLORS } from '@vitacore/shared-ui'
import * as React from 'react'
import styled from 'styled-components'
import { isTrue } from '../../utils'
import FailIcon from './FailIcon'
import SimpleSpinner from './SimpleSpinner'
import SuccessIcon from './SuccessIcon'

const ButtonStyled = styled.button`
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px 10px;
  background-color: ${(props: { colorSchema?: 'green' | 'blue' }) =>
    isTrue(props.colorSchema)
      ? props.colorSchema === 'green'
        ? COLORS.MAIN_GREEN
        : COLORS.MAIN_BLUE
      : COLORS.MAIN_GREEN};
  margin: 0;
  border: none;
  border-radius: 0;
  color: white;
  position: relative;
  outline: none;

  &:not(:disabled) {
    cursor: pointer;
  }

  &:hover {
    background-color: ${(props: { colorSchema?: 'green' | 'blue' }) =>
      isTrue(props.colorSchema)
        ? props.colorSchema === 'green'
          ? COLORS.MAIN_GREEN_HOVER
          : COLORS.MAIN_BLUE_HOVER
        : COLORS.MAIN_GREEN_HOVER};
  }

  &:disabled {
    background-color: ${COLORS.LIGHT_GRAY};
  }
`

const ButtonText = styled.p`
  margin: 0;
  padding: 0;
  visibility: ${(props: { isHidden?: boolean }) => (props.isHidden ? 'hidden' : 'auto')};
`

export interface ButtonData {
  text: string
  onClick: (event?: React.MouseEvent<HTMLElement>) => void
  colorSchema?: 'green' | 'blue'
  ref?: React.RefObject<Button>
  interactive?: boolean
  disableClicksDuringLoading?: boolean
  disabled?: boolean
  type?: string
}

type State = {
  btnState: ButtonState
  resultMessage?: string
}

enum ButtonState {
  NORMAL,
  LOADING,
  FAILED,
  SUCCESS,
}

const CHANGE_STATE_DELAY_MS = 3500
class Button extends React.Component<ButtonData, State> {
  constructor(props: ButtonData) {
    super(props)

    this.state = {
      btnState: ButtonState.NORMAL,
    }
  }

  public setLoading = (value: boolean) => {
    this.setState({
      btnState: ButtonState.LOADING,
    })
  }

  public showFailed = (errorMessage?: string) => {
    this.changeStateWithDelayToNormal(ButtonState.FAILED, errorMessage)
  }

  public showSuccessed = (successMessage?: string) => {
    this.changeStateWithDelayToNormal(ButtonState.SUCCESS, successMessage)
  }

  public render() {
    const { interactive, disableClicksDuringLoading } = this.props
    const isDuringInteraction = isTrue(interactive && this.state.btnState !== ButtonState.NORMAL)
    const hasSpinner = isTrue(interactive && this.state.btnState === ButtonState.LOADING)
    const isSuccess = isTrue(interactive && this.state.btnState === ButtonState.SUCCESS)
    const isFail = isTrue(interactive && this.state.btnState === ButtonState.FAILED)
    const hasResultMessage = (isFail || isSuccess) && isTrue(this.state.resultMessage)

    const clickHandlerNeeded = !isDuringInteraction || !isTrue(disableClicksDuringLoading)

    return (
      <ButtonStyled
        onClick={clickHandlerNeeded ? this.props.onClick : undefined}
        disabled={this.props.disabled}
        type={this.props.type}
        colorSchema={this.props.colorSchema}
      >
        {isSuccess && <SuccessIcon alongWithText={hasResultMessage} />}
        {isFail && <FailIcon alongWithText={hasResultMessage} />}
        <ButtonText isHidden={isDuringInteraction && !hasResultMessage}>
          {hasResultMessage ? this.state.resultMessage : this.props.text}
        </ButtonText>
        {hasSpinner && <SimpleSpinner width={14} height={14} />}
      </ButtonStyled>
    )
  }

  private changeStateWithDelayToNormal = (state: ButtonState, resultMessage?: string) => {
    this.setState(
      {
        btnState: state,
        resultMessage,
      },
      () => {
        setTimeout(() => {
          this.setState({
            btnState: ButtonState.NORMAL,
          })
        }, CHANGE_STATE_DELAY_MS)
      }
    )
  }
}

export default Button

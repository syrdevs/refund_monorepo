import { COLORS, ReduxActionType, SIZES } from '@vitacore/shared-ui'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import styled from 'styled-components'
import { clearLoaderMessage } from '../../Redux/Actions/infrastructureStateActions'
import { State } from '../../Redux/StateModels'
import { isFalse, isTrue } from '../../utils'
import './LoaderKeyframes.css'

const LoaderModalWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #0000007a;
  z-index: 10000;
  visibility: ${(props: { isHidden: boolean }) => (props.isHidden ? 'hidden' : 'auto')};
`

const LoaderSpinner = styled.div`
  border-radius: 50%;
  width: 140px;
  height: 140px;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  text-indent: -9999em;
  border: 10px solid #ffffff8c;
  border-left-color: ${COLORS.MAIN_BLUE};
  animation: load 1.2s infinite linear;
  will-change: transform;
  z-index: 10001;
  opacity: ${(props: { isHidden: boolean }) => (props.isHidden ? '0' : '1')};
`

const LoaderMessage = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  z-index: 10001;
  font-size: ${SIZES.s50}px;
  color: ${COLORS.LOADER_MESSAGE};
  opacity: 1;
  transition: opacity 1.4s ease-in-out;

  &.message-shown {
    opacity: 0;
  }
`

export interface Props {
  shouldDisplay: boolean
  loaderResponseMessage?: string
  clearLoaderMessage: any
  forceDisplaying?: boolean
}

type CompState = {
  messageShown: boolean
  messageShownClassApplied: boolean
  shouldDisplay: boolean
}

const DELAY_BEFORE_HIDING_LOADER_MESSAGE_MS = 1400
class Loader extends React.PureComponent<Props, CompState> {
  private hidingLoaderMessageTimer: NodeJS.Timer
  private hidingSpinnerTimer: NodeJS.Timer

  constructor(props: Props) {
    super(props)

    this.state = {
      messageShown: false,
      messageShownClassApplied: false,
      shouldDisplay: props.shouldDisplay,
    }

    if (props.shouldDisplay) {
      this.refreshHidingSpinnerTimer(false)
    }
  }

  public render() {
    const { forceDisplaying, loaderResponseMessage } = this.props
    const { shouldDisplay } = this.state

    if (isFalse(forceDisplaying) && !shouldDisplay && !this.state.messageShown) {
      return null
    }

    return (
      <LoaderModalWrapper isHidden={!this.props.shouldDisplay && !this.state.messageShown}>
        {this.state.messageShown && (
          <LoaderMessage className={this.state.messageShownClassApplied ? 'message-shown' : ''}>
            {loaderResponseMessage}
          </LoaderMessage>
        )}
        {(isTrue(forceDisplaying) || shouldDisplay) && (
          <LoaderSpinner isHidden={this.state.messageShown || !this.props.shouldDisplay} />
        )}
      </LoaderModalWrapper>
    )
  }

  public componentWillReceiveProps(newProps: Props) {
    if (newProps.loaderResponseMessage && this.props.loaderResponseMessage !== newProps.loaderResponseMessage) {
      this.setState({
        messageShown: true,
      })

      setTimeout(
        () =>
          this.setState({
            messageShownClassApplied: true,
          }),
        0
      )

      if (this.hidingLoaderMessageTimer) {
        clearTimeout(this.hidingLoaderMessageTimer)
      }

      this.hidingLoaderMessageTimer = setTimeout(() => {
        this.setState(
          {
            messageShown: false,
            messageShownClassApplied: false,
          },
          () => this.props.clearLoaderMessage()
        )
      }, DELAY_BEFORE_HIDING_LOADER_MESSAGE_MS)
    }

    if (newProps.shouldDisplay) {
      this.refreshHidingSpinnerTimer(true)
    }
  }

  public componentWillUnmount() {
    if (this.hidingSpinnerTimer) {
      clearTimeout(this.hidingSpinnerTimer)
    }

    if (this.hidingLoaderMessageTimer) {
      clearTimeout(this.hidingLoaderMessageTimer)
    }

    this.props.clearLoaderMessage()
  }

  private refreshHidingSpinnerTimer = (shouldUpdateState: boolean) => {
    if (this.hidingSpinnerTimer) {
      clearTimeout(this.hidingSpinnerTimer)
    }

    if (shouldUpdateState) {
      this.setState({
        shouldDisplay: true,
      })
    }
    this.hidingSpinnerTimer = setTimeout(() => {
      if (this.props.shouldDisplay) {
        this.refreshHidingSpinnerTimer(true)
      } else {
        this.setState({
          shouldDisplay: false,
        })
      }
    }, 10000)
  }
}

const mapStateToProps = (state: State) => {
  return {
    shouldDisplay: state.infrastructureState.numberOfRequestsInProgress > 0,
    loaderResponseMessage: state.infrastructureState.loaderResponseMessage,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<ReduxActionType>) => {
  return {
    clearLoaderMessage: () => dispatch(clearLoaderMessage()),
  }
}

const ConnectedLoader = connect(
  mapStateToProps,
  mapDispatchToProps
)(Loader)
export default ConnectedLoader

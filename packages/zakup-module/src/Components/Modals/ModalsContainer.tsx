import { COLORS, ReduxActionType, SIZES } from '@vitacore/shared-ui'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import styled from 'styled-components'
import { ModalInfo } from '../../Models/ModalInfo'
import { closeRecentModal } from '../../Redux/Actions/infrastructureStateActions'
import { State } from '../../Redux/StateModels'
import { isFalse } from '../../utils'

const BASE_Z_INDEX = 5000

const ModalsContainerStyled = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #0000007a;
  z-index: ${BASE_Z_INDEX};
`

const ModalRootContainer = styled.div`
  position: fixed;
  width: 100%;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
`

const ModalOuterContainer = styled.div`
  display: inline-block;
`

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 320px;
  max-width: 60em;
  left: 0;
  font-size: ${SIZES.s14}px;
`

const ModalHeader = styled.div`
  display: flex;
  flex-shrink: 0;
  padding: 6px 30px 6px 10px;
  position: relative;
  background-color: ${COLORS.MAIN_BLUE};
  color: white;
  font-size: ${SIZES.s16}px;
`

const ModalCloseIcon = styled.p`
  margin: 0;
  padding: 0;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  font-size: 16px;
  color: white;
  cursor: pointer;
`

const ModalContentStyled = styled.div`
  flex-grow: 1;
  padding: 10px;
  background-color: white;
  text-align: left;
`

type Props = {
  modals: ModalInfo[]
  closeRecentModal: () => any
}

class ModalsContainer extends React.Component<Props> {
  public render() {
    const { modals } = this.props

    if (modals.length === 0) {
      return null
    }

    return (
      <React.Fragment>
        <ModalsContainerStyled />
        {modals.map((modalInfo, idx) => {
          const isCurrentModal = idx === modals.length - 1
          return (
            <ModalRootContainer
              key={modalInfo.header}
              style={{ zIndex: isCurrentModal ? BASE_Z_INDEX + 1 : BASE_Z_INDEX - modals.length + idx + 1 }}
            >
              <ModalOuterContainer>
                <ModalContainer>
                  <ModalHeader>
                    {modalInfo.header}
                    {!isFalse(modalInfo.closable) && (
                      <ModalCloseIcon onClick={modalInfo.onClose || this.props.closeRecentModal}>X</ModalCloseIcon>
                    )}
                  </ModalHeader>
                  <ModalContentStyled>{modalInfo.content}</ModalContentStyled>
                </ModalContainer>
              </ModalOuterContainer>
            </ModalRootContainer>
          )
        })}
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: State) => {
  return {
    modals: state.infrastructureState.modals,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<ReduxActionType>) => {
  return {
    closeRecentModal: () => dispatch(closeRecentModal()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalsContainer)

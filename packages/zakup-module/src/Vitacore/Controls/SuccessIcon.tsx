import * as React from 'react'
import styled from 'styled-components'
import SuccessIcon from '../../assets/success-icon.svg'

const ButtonSuccessStyled = styled.img`
  width: 14px;
  height: 14px;
  ${(props: Props) => `${
    props.alongWithText
      ? 'margin-right: 5px;'
      : `position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);`
  }
  `};
`

type Props = {
  alongWithText?: boolean
}

const SuccessIconComp: React.FC<Props> = (props: Props) => {
  return <ButtonSuccessStyled src={SuccessIcon} {...props} />
}

export default SuccessIconComp

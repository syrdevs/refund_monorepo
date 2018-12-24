import * as React from 'react'
import styled from 'styled-components'
import FailIcon from '../../assets/fail-icon.svg'

const ButtonFailStyled = styled.img`
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

const FailIconComp: React.FC<Props> = (props: Props) => {
  return <ButtonFailStyled src={FailIcon} {...props} />
}

export default FailIconComp

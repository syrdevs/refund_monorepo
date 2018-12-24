import { COLORS } from '@vitacore/shared-ui'
import * as React from 'react'
import styled from 'styled-components'
import '../../assets/simple-spinner-keyframes.css'

const Spinner = styled.div`
  border-radius: 50%;
  width: ${(props: { width?: number; height?: number }) => (props.width ? `${props.width}px` : 'auto')};
  height: ${(props: { width?: number; height?: number }) => (props.height ? `${props.height}px` : 'auto')};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  text-indent: -9999em;
  border: 2px solid white;
  border-left-color: ${COLORS.MAIN_BLUE};
  animation: load 1s infinite linear;
  z-index: 1001;
`

type Props = {
  width?: number
  height?: number
}

const SimpleSpinner: React.FC<Props> = (props: Props) => <Spinner width={props.width} height={props.height} />

export default SimpleSpinner

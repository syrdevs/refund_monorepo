import React from 'react'
import styled from 'styled-components'
import { isTrue } from '../../utils'

const Container = styled.div`
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  flex-shrink: 0;
`

type Props = {
  toRight?: boolean
}

const ButtonsContainer: React.FC<Props> = props => (
  <Container style={isTrue(props.toRight) ? { justifyContent: 'flex-end' } : undefined}>{props.children}</Container>
)

export default ButtonsContainer

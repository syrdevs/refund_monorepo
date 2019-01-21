import * as React from 'react'
import styled from 'styled-components'

const RootContainer = styled.div`
  display: flex;
  flex-grow: 1;
  background-color: #edf1f5;
`

class Layout extends React.Component {
  public render() {
    return <RootContainer>{this.props.children}</RootContainer>
  }
}

export default Layout

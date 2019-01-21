import { SIZES, WEIGHTS } from '@vitacore/shared-ui'
import * as React from 'react'
import styled from 'styled-components'

const FooterContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  background-color: #1aa4da;
  justify-content: space-between;
  padding: 5px 20px;
`

const FooterInnerPart = styled.div`
  display: flex;
  flex-direction: column;

  p > a,
  p {
    font-size: ${SIZES.s12}px;
    font-weight: ${WEIGHTS.LIGHT};
    color: white;
    margin: 0;
  }
`

class Footer extends React.Component {
  public render() {
    return (
      <FooterContainer>
        <FooterInnerPart>
          <p>2017 - {new Date().getFullYear()} © Некоммерческое акционерное общество</p>
          <p>«Фонд социального медицинского страхования»</p>
        </FooterInnerPart>
        <FooterInnerPart>
          <p>Служба технической поддержки</p>
          <p>8 (7172) 123-456</p>
          <p>
            <a href="mailto:support@med.kz">support@med.kz</a>
          </p>
        </FooterInnerPart>
      </FooterContainer>
    )
  }
}

export default Footer

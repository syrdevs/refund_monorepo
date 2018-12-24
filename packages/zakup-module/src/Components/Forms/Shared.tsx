import { WEIGHTS } from '@vitacore/shared-ui'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  font-weight: ${WEIGHTS.LIGHT};
`

const ErrorLine = styled.p`
  color: #721c24;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 2px;
  padding: 2px 5px;
  margin: 3px 0;
`

const WarningLine = styled.p`
  color: #856404;
  background-color: #fff3cd;
  border: 1px solid #ffeeba;
  border-radius: 2px;
  padding: 2px 5px;
  margin: 3px 0;
`

export default { Container, ErrorLine, WarningLine }

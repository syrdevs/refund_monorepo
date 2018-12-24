import { COLORS, WEIGHTS } from '@vitacore/shared-ui'
import styled from 'styled-components'

const FormGroup = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin: 2px 0;

  & > label {
    display: block;
    width: 25%;
    min-width: 100px;
    flex-shrink: 0;
    text-align: right;
    margin-right: 10px;
    color: ${COLORS.GRAY};
    font-weight: ${WEIGHTS.LIGHT};
  }
`

export default FormGroup

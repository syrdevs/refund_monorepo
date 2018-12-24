import { COLORS } from '@vitacore/shared-ui'
import styled from 'styled-components'

type Props = {
  margin?: string
}

const FormActionButton = styled.button`
  padding: 4px 10px;
  background-color: ${COLORS.MAIN_GREEN};
  color: white;
  cursor: pointer;
  margin: ${(props: Props) => props.margin || '0'};

  &:not(:disabled) {
    cursor: pointer;
  }

  &:active,
  &:focus {
    outline: none;
  }

  &:disabled {
    background-color: ${COLORS.LIGHT_GRAY};
  }
`

export default FormActionButton

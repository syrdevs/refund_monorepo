import styled from 'styled-components'
import { isTrue } from '../../utils'

type Props = {
  position?: string
  inner?: boolean
}

const FormFooterButtons = styled.div`
  display: flex;
  padding: ${(props: Props) => (isTrue(props.inner) ? '0' : '15px 25px')};
  justify-content: ${(props: Props) => props.position || 'flex-end'};
  flex-shrink: 0;
`

export default FormFooterButtons

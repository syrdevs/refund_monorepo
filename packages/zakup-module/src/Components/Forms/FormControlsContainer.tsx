import styled from 'styled-components'

const FormControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  padding: 25px;

  & > * {
    flex-shrink: 0;
  }
`

export default FormControlsContainer

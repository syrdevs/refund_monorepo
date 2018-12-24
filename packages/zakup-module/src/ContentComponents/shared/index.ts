import { Col, Row } from 'antd'
import styled from 'styled-components'

export { default as ContentLayout } from './ContentLayout'
export { CommonFormItemLayout } from './CommonFormItemLayout'
export const RowStyled = styled(Row)`
  padding: 4px 0;
`
export const LabelColStyled = styled(Col)`
  text-align: right;
  line-height: 32px;
  color: #000000d9;

  &::after {
    content: ':';
    margin: 0 8px 0 2px;
    position: relative;
    top: -0.5px;
  }
`

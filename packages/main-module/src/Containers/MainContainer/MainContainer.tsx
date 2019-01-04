import { COLORS, SIZES } from '@vitacore/shared-ui'
import { Col, Row } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import fakeLogo from '../../Images/logo.png'

const AppTilesContainers = styled.div`
  flex-grow: 1;
  flex-direction: column;
  padding: 10px 25px;
  border-top: 4px solid ${COLORS.MAIN_GREEN};
`

const AppTilesHeader = styled.div`
  border-bottom: 1px solid ${COLORS.LIGHTER_GRAY};
  padding: 5px 0 10px;
  font-size: 24px;
  margin-bottom: 1em;
`

const AppTile = styled(Link)`
  padding: 10px 10px 6px;
  border: 1px solid ${COLORS.LIGHTER_GRAY};
  border-radius: 5px;
  display: flex;
  flex-direction: column;

  & > img {
    width: 100%;
    max-width: 200px;
    height: auto;
    max-height: 200px;
  }

  & > p {
    flex-shrink: 0;
    font-size: ${SIZES.s18}px;
    font-weight: 600;
    margin-top: 10px;
    border-top: 1px solid ${COLORS.LIGHTER_GRAY};
    padding-top: 4px;
    text-align: center;
  }
`

class MainContainer extends React.Component {
  public render() {
    return (
      <AppTilesContainers>
        <AppTilesHeader>Модули</AppTilesHeader>
        <Row gutter={24}>
          <Col span={4}>
            <AppTile to="/zakup">
              <img src={fakeLogo} alt="Zakup application logo" />
              <p>Закупы</p>
            </AppTile>
          </Col>
          <Col span={4}>
            <AppTile to="/contracts">
              <img src={fakeLogo} alt="Zakup application logo" />
              <p>Договора</p>
            </AppTile>
          </Col>
          <Col span={4}>
            <AppTile to="/test2">
              <img src={fakeLogo} alt="Zakup application logo" />
              <p>Отчеты</p>
            </AppTile>
          </Col>
          <Col span={4}>
            <AppTile to="/refunds">
              <img src={fakeLogo} alt="Возвраты" />
              <p>Возвраты</p>
            </AppTile>
          </Col>
          <Col span={4}>
            <AppTile to="/contracts2">
              <img src={fakeLogo} alt="Договора2" />
              <p>Договора2</p>
            </AppTile>
          </Col>
        </Row>
      </AppTilesContainers>
    )
  }
}

export default MainContainer

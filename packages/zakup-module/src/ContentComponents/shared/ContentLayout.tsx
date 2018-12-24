import { COLORS, SIZES, WEIGHTS } from '@vitacore/shared-ui'
import { Button } from 'antd'
import * as React from 'react'
import styled from 'styled-components'
import { isTrue } from '../../utils'
import { ButtonData } from '../../Vitacore/Controls/Button'
import Breadcrumbs, { BreadcrumbRoute } from './Breadcrumbs'
import ButtonsContainer from './ButtonsContainer'
import CommandsBar from './Commands/CommandsBar'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: white;
`

const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
  font-size: ${SIZES.s18}px;
  color: ${COLORS.MAIN_BLUE};
  font-weight: ${WEIGHTS.MEDIUM};
  text-transform: uppercase;
`

const BreadcrumbsContainer = styled.div`
  padding: 4px 15px;
  border-bottom: 1px solid #ddd;
  flex-shrink: 0;
`

const MainContent = styled.div`
  display: flex;
  flex-grow: 1;
  min-height: 0;
  padding: 10px;

  & > * {
    flex-grow: 1;
  }
`

type Props = {
  contentName: string
  buttons?: ButtonData[]
  breadcrumbRoutes?: BreadcrumbRoute[]
  entity?: string
  showCommands?: boolean
  disableCommands?: boolean
  onCommandClick?: (commandId: string, isReport: boolean) => any
}

class ContentLayout extends React.Component<Props> {
  public render() {
    const { contentName, buttons, breadcrumbRoutes, showCommands, disableCommands } = this.props

    return (
      <Container>
        <ContentHeader>{contentName}</ContentHeader>
        {breadcrumbRoutes && (
          <BreadcrumbsContainer>
            <Breadcrumbs routes={breadcrumbRoutes} />
          </BreadcrumbsContainer>
        )}
        <ButtonsContainer>
          {buttons &&
            buttons.map(btn => {
              const props = { onClick: btn.onClick }
              return (
                <Button key={btn.text} type="primary" {...props}>
                  {btn.text}
                </Button>
              )
            })}
          {showCommands && this.props.entity && this.props.onCommandClick && (
            <CommandsBar
              disabledActions={isTrue(disableCommands)}
              disabledReports={isTrue(disableCommands)}
              onCommandClick={this.props.onCommandClick}
              entity={this.props.entity}
            />
          )}
        </ButtonsContainer>
        <MainContent>{this.props.children}</MainContent>
      </Container>
    )
  }
}

export default ContentLayout

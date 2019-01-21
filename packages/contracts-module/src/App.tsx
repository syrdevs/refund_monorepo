import { COLORS, LeftMenu, LeftMenuRootNode } from '@vitacore/shared-ui'
import React from 'react'
const TestModule = Promise.resolve().then(() => require('@vitacore/test-module')) as Promise<ModuleType>
const ContractModule = Promise.resolve().then(() => require('@vitacore/contract-module')) as Promise<ModuleType>
import * as ZakupModule from '@vitacore/zakup-module'
import styled from 'styled-components'

type ModuleType = {
  default: any
  LeftMenuItems: LeftMenuRootNode[]
}

const RootContainer = styled.div`
  display: flex;
  flex-grow: 1;
  background-color: #edf1f5;
  min-width: 0;
`

const Content = styled.div`
  display: flex;
  flex-grow: 1;
  border-left: 1px solid #d6d6d6;
  padding: 0 15px;
  background-color: white;
  border-top: 4px solid ${COLORS.MAIN_GREEN};
  min-width: 0;
  overflow: auto;
`

const updateLeftMenuHrefs = (leftMenuItems: LeftMenuRootNode[], prefix: string) => {
  if (prefix) {
    for (const item of leftMenuItems) {
      if (item.hrefPrefix && !item.hrefPrefix.startsWith(prefix)) {
        item.hrefPrefix = `${prefix}${item.hrefPrefix}`
      }
    }
  }

  return leftMenuItems
}

const modules = [
  { module: ZakupModule, route: '/zakup', dynamic: false, resolved: true },
  { module: TestModule, route: '/two', dynamic: true, resolved: false },
  { module: ContractModule, route: '/v2', dynamic: true, resolved: false }
]

type State = {
  initDone: boolean
}

class ContractsModule extends React.Component<any, State> {
  constructor(props: any) {
    super(props)

    this.state = {
      initDone: false,
    }
  }

  public render() {
    const allResolved = modules.every(M => M.resolved)
    if (!allResolved) {
      if (!this.state.initDone) {
        this.initialize()
      } else {
        setTimeout(() => this.forceUpdate(), 100)
      }
      return null
    }

    const location = this.props.location.pathname
    if (location === this.props.moduleName) {
      setTimeout(() => this.props.history.push(this.props.defaultRoute), 0)
    }

    const menuItems = [].concat.apply(
      [],
      modules.map(M => {
        const mRoute = `${this.props.moduleName}${M.route}`
        return [...updateLeftMenuHrefs((M.module as ModuleType).LeftMenuItems, mRoute)]
      })
    )

    return (
      <RootContainer>
        <LeftMenu leftMenuItems={menuItems} location={location} goToLink={this.props.history.push} />
        <Content>
          {modules.map(M => {
            const mRoute = `${this.props.moduleName}${M.route}`
            const routeGoesInside = location.startsWith(mRoute)
            const RComponent = (M.module as ModuleType).default

            return (
              <RComponent
                key={mRoute}
                moduleRoute={this.props.moduleName}
                appRoute={mRoute}
                handleNoMatch={routeGoesInside}
                history={this.props.history}
                simpleAuthCheck={this.props.simpleAuthCheck}
                promiseAuthCheck={this.props.promiseAuthCheck}
                getAuthToken={this.props.getAuthToken}
                requestStarted={this.props.requestStarted}
                requestFinished={this.props.requestFinished}
                getUserLanguage={this.props.getUserLanguage}
                subscribeToUserLanguageChange={this.props.subscribeToUserLanguageChange}
              />
            )
          })}
        </Content>
      </RootContainer>
    )
  }

  private initialize = () => {
    modules
      .filter(M => M.dynamic)
      .forEach(M =>
        (M.module as Promise<any>).then(MM => {
          M.module = MM
          M.resolved = true
        })
      )

    setTimeout(() => {
      this.setState({
        initDone: true,
      })
    }, 0)
  }

  // }
}
export default ContractsModule

import { NoMatchRoute, PrivateRoute } from '@vitacore/shared-ui'
import React, { lazy, Suspense } from 'react'
import { RouteComponentProps, Switch, withRouter } from 'react-router'
import styled from 'styled-components'
import MainContainer from './Containers/MainContainer/MainContainer'
import { Header } from './Layout'
import { Loader } from './Layout/Loader'
import LoginRoute from './Routing/LoginRoute'
import LogoutRoute from './Routing/LogoutRoute'
import { getAuthToken, isUserAuthenticated, isUserAuthenticatedSimple } from './Services/AuthenticationService'
import { addUserLanguageChangeCb, getUserLanguage, requestFinished, requestStarted } from './utils'
const ContractModule = lazy(() => import('@vitacore/conttract-module'))
const ContractsModule = lazy(() => import('@vitacore/contracts-module'))
const RefundsModule = lazy(() => import('@vitacore/refunds-module'))

const RouteContentContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  min-width: 0;
`

const MainContentContainer = styled.div`
  display: flex;
  flex-grow: 1;
  min-height: 0;
  min-width: 0;
`

const Content = styled.div`
  display: flex;
  flex-grow: 1;
  background-color: white;
  min-height: 0;
`

interface Props extends RouteComponentProps<any> {}

class MainApp extends React.Component<Props> {
  public render() {
    return (
      <RouteContentContainer>
        <Header />
        <MainContentContainer>
          <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minWidth: 0 }}>
            <Content>
              <Suspense fallback={<Loader forceDisplaying={true} />}>
                <Switch>
                  <LoginRoute path="/login" />
                  <LogoutRoute path="/logout" />
                  <PrivateRoute
                    exact
                    path="/"
                    simpleAuthCheck={isUserAuthenticatedSimple}
                    promiseAuthCheck={isUserAuthenticated}
                    component={MainContainer}
                  />
                  <PrivateRoute
                    simpleAuthCheck={isUserAuthenticatedSimple}
                    promiseAuthCheck={isUserAuthenticated}
                    path="/refunds"
                    render={props => (
                      <RefundsModule
                        moduleName="/refunds"
                        defaultRoute="/refunds/home"
                        simpleAuthCheck={isUserAuthenticatedSimple}
                        promiseAuthCheck={isUserAuthenticated}
                        getAuthToken={getAuthToken}
                        requestStarted={requestStarted}
                        requestFinished={requestFinished}
                        getUserLanguage={getUserLanguage}
                        subscribeToUserLanguageChange={addUserLanguageChangeCb}
                        {...props}
                      />
                    )}
                  />
                  <PrivateRoute
                    simpleAuthCheck={isUserAuthenticatedSimple}
                    promiseAuthCheck={isUserAuthenticated}
                    path="/contracts2"
                    render={props => (
                      <ContractModule
                        moduleName="/contracts2"
                        defaultRoute="/contracts2/home"
                        simpleAuthCheck={isUserAuthenticatedSimple}
                        promiseAuthCheck={isUserAuthenticated}
                        getAuthToken={getAuthToken}
                        requestStarted={requestStarted}
                        requestFinished={requestFinished}
                        getUserLanguage={getUserLanguage}
                        subscribeToUserLanguageChange={addUserLanguageChangeCb}
                        {...props}
                      />
                    )}
                  />
                  <PrivateRoute
                    simpleAuthCheck={isUserAuthenticatedSimple}
                    promiseAuthCheck={isUserAuthenticated}
                    path="/contracts"
                    render={props => (
                      <ContractsModule
                        moduleName="/contracts"
                        defaultRoute="/contracts/zakup/notices/all/1"
                        simpleAuthCheck={isUserAuthenticatedSimple}
                        promiseAuthCheck={isUserAuthenticated}
                        getAuthToken={getAuthToken}
                        requestStarted={requestStarted}
                        requestFinished={requestFinished}
                        getUserLanguage={getUserLanguage}
                        subscribeToUserLanguageChange={addUserLanguageChangeCb}
                        {...props}
                      />
                    )}
                  />
                  <NoMatchRoute handle={true} />
                </Switch>
              </Suspense>
            </Content>
            {/*<Footer />*/}
          </div>
          <Loader />
        </MainContentContainer>
      </RouteContentContainer>
    )
  }
}

export default withRouter(MainApp)

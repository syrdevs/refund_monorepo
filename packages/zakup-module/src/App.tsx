import { APP_ROUTE_KEY, AppGlobalProps, buildAppRoute, NoMatchRoute, PrivateRoute } from '@vitacore/shared-ui'
import { History } from 'history'
import React from 'react'
import { Provider } from 'react-redux'
import { Redirect, Switch } from 'react-router'
import './assets/ant-table.css'
import ModalsContainer from './Components/Modals/ModalsContainer'
import * as Components from './ContentComponents'
import { getStore, initStore } from './Redux/store'
import { addToAppData, addToAppFunctions, getAppFunction, getAppRoute, isTrue, setUserLanguage } from './utils'

class App extends React.Component<AppGlobalProps> {
  constructor(props: AppGlobalProps) {
    super(props)

    addToAppFunctions('simpleAuthCheck', props.simpleAuthCheck)
    addToAppFunctions('promiseAuthCheck', props.promiseAuthCheck)
    addToAppFunctions('getAuthToken', props.getAuthToken)
    addToAppFunctions('requestStarted', props.requestStarted)
    addToAppFunctions('requestFinished', props.requestFinished)
    addToAppFunctions('getUserLanguage', props.getUserLanguage)
    if (props.subscribeToUserLanguageChange) {
      props.subscribeToUserLanguageChange(setUserLanguage)
    }
    addToAppData(APP_ROUTE_KEY, props.appRoute)
    addToAppData('history', props.history)

    initStore(props.history as History)
  }

  public render() {
    return (
      <Provider store={getStore()}>
        <React.Fragment>
          <div style={{ display: 'flex', flexDirection: 'column', flexGrow: isTrue(this.props.handleNoMatch) ? 1 : 0 }}>
            <Switch>
              <PrivateRoute
                exact
                path={buildAppRoute(getAppRoute(), '/')}
                simpleAuthCheck={getAppFunction('simpleAuthCheck')}
                promiseAuthCheck={getAppFunction('promiseAuthCheck')}
                render={() => <Redirect to={buildAppRoute(getAppRoute(), '/notices/all/1')} />}
              />
              <PrivateRoute
                exact
                path={buildAppRoute(getAppRoute(), '/notices')}
                simpleAuthCheck={getAppFunction('simpleAuthCheck')}
                promiseAuthCheck={getAppFunction('promiseAuthCheck')}
                render={() => <Redirect to={buildAppRoute(getAppRoute(), '/notices/all/1')} />}
              />
              <PrivateRoute
                exact
                path={buildAppRoute(getAppRoute(), '/notices/all')}
                simpleAuthCheck={getAppFunction('simpleAuthCheck')}
                promiseAuthCheck={getAppFunction('promiseAuthCheck')}
                render={() => <Redirect to={buildAppRoute(getAppRoute(), '/notices/all/1')} />}
              />
              <PrivateRoute
                exact
                path={buildAppRoute(getAppRoute(), '/notices/all/:page')}
                simpleAuthCheck={getAppFunction('simpleAuthCheck')}
                promiseAuthCheck={getAppFunction('promiseAuthCheck')}
                render={() => <Components.NoticesList header={'Объявления'} />}
              />
              <PrivateRoute
                exact
                path={buildAppRoute(getAppRoute(), '/notices/:id')}
                simpleAuthCheck={getAppFunction('simpleAuthCheck')}
                promiseAuthCheck={getAppFunction('promiseAuthCheck')}
                render={(routeProps: any) => <Components.NoticeForm match={routeProps.match} />}
              />
              <PrivateRoute
                exact
                path={buildAppRoute(getAppRoute(), '/notices/:id([0-9a-zA-Z-]+)/applicants')}
                simpleAuthCheck={getAppFunction('simpleAuthCheck')}
                promiseAuthCheck={getAppFunction('promiseAuthCheck')}
                render={(routeParams: any) => (
                  <Redirect to={buildAppRoute(getAppRoute(), `/notices/${routeParams.match.params.id}/applicants/1`)} />
                )}
              />
              <PrivateRoute
                exact
                path={buildAppRoute(getAppRoute(), '/notices/:id([0-9a-zA-Z-]+)/applicants/:page')}
                simpleAuthCheck={getAppFunction('simpleAuthCheck')}
                promiseAuthCheck={getAppFunction('promiseAuthCheck')}
                render={(routeProps: any) => (
                  <Components.ProposalsList
                    header={'Заявки на объемы'}
                    noticeId={routeProps.match.params.id}
                    page={routeProps.match.params.page}
                  />
                )}
              />
              <PrivateRoute
                exact
                path={buildAppRoute(getAppRoute(), '/commissions')}
                simpleAuthCheck={getAppFunction('simpleAuthCheck')}
                promiseAuthCheck={getAppFunction('promiseAuthCheck')}
                render={() => <Redirect to={buildAppRoute(getAppRoute(), '/commissions/all')} />}
              />
              <PrivateRoute
                exact
                path={buildAppRoute(getAppRoute(), '/commissions/all')}
                simpleAuthCheck={getAppFunction('simpleAuthCheck')}
                promiseAuthCheck={getAppFunction('promiseAuthCheck')}
                render={() => <Components.CommissionsList header={'Список комиссий'} />}
              />
              <PrivateRoute
                exact
                path={buildAppRoute(getAppRoute(), '/commissions/:id')}
                simpleAuthCheck={getAppFunction('simpleAuthCheck')}
                promiseAuthCheck={getAppFunction('promiseAuthCheck')}
                render={(routeProps: any) => <Components.CommissionForm match={routeProps.match} />}
              />
              <PrivateRoute
                exact
                path={buildAppRoute(getAppRoute(), '/commissions/:id/members')}
                simpleAuthCheck={getAppFunction('simpleAuthCheck')}
                promiseAuthCheck={getAppFunction('promiseAuthCheck')}
                render={(routeProps: any) => (
                  <Components.CommissionMembersList match={routeProps.match} header={'Список членов комиссии'} />
                )}
              />
              <PrivateRoute
                exact
                path={buildAppRoute(getAppRoute(), '/commissions/:commissionId/members/:id')}
                simpleAuthCheck={getAppFunction('simpleAuthCheck')}
                promiseAuthCheck={getAppFunction('promiseAuthCheck')}
                render={(routeProps: any) => <Components.CommissionMemberForm match={routeProps.match} />}
              />
              <PrivateRoute
                exact
                path={buildAppRoute(getAppRoute(), '/reestr')}
                simpleAuthCheck={getAppFunction('simpleAuthCheck')}
                promiseAuthCheck={getAppFunction('promiseAuthCheck')}
                render={() => <Redirect to={buildAppRoute(getAppRoute(), '/reestr/all')} />}
              />
              <PrivateRoute
                exact
                path={buildAppRoute(getAppRoute(), '/reestr/all')}
                simpleAuthCheck={getAppFunction('simpleAuthCheck')}
                promiseAuthCheck={getAppFunction('promiseAuthCheck')}
                render={() => <Components.SuppliersReestrAll header={'Регистр участников'} />}
              />
              <PrivateRoute
                exact
                path={buildAppRoute(getAppRoute(), '/reestr/bad')}
                simpleAuthCheck={getAppFunction('simpleAuthCheck')}
                promiseAuthCheck={getAppFunction('promiseAuthCheck')}
                render={() => <Components.SuppliersReestrBad header={'Регистр недобросовестных участников'} />}
              />
              <PrivateRoute
                exact
                path={buildAppRoute(getAppRoute(), '/requests/applications')}
                simpleAuthCheck={getAppFunction('simpleAuthCheck')}
                promiseAuthCheck={getAppFunction('promiseAuthCheck')}
                render={() => <Redirect to={buildAppRoute(getAppRoute(), '/requests/applications/all/1')} />}
              />
              <PrivateRoute
                exact
                path={buildAppRoute(getAppRoute(), '/requests/applications/all')}
                simpleAuthCheck={getAppFunction('simpleAuthCheck')}
                promiseAuthCheck={getAppFunction('promiseAuthCheck')}
                render={() => <Redirect to={buildAppRoute(getAppRoute(), '/requests/applications/all/1')} />}
              />
              <PrivateRoute
                exact
                path={buildAppRoute(getAppRoute(), '/requests/applications/all/:page')}
                simpleAuthCheck={getAppFunction('simpleAuthCheck')}
                promiseAuthCheck={getAppFunction('promiseAuthCheck')}
                render={(routeProps: any) => (
                  <Components.ApplicationsList
                    header={'Заявки на включение в базу данных субъектов здравоохранения'}
                    match={routeProps.match}
                  />
                )}
              />
              <PrivateRoute
                exact
                path={buildAppRoute(getAppRoute(), '/requests/applications/:id')}
                simpleAuthCheck={getAppFunction('simpleAuthCheck')}
                promiseAuthCheck={getAppFunction('promiseAuthCheck')}
                render={(routeProps: any) => <Components.ApplicationRequest match={routeProps.match} />}
              />
              <PrivateRoute
                exact
                path={buildAppRoute(getAppRoute(), '/requests/proposals')}
                simpleAuthCheck={getAppFunction('simpleAuthCheck')}
                promiseAuthCheck={getAppFunction('promiseAuthCheck')}
                render={() => <Redirect to={buildAppRoute(getAppRoute(), '/requests/proposals/all/1')} />}
              />
              <PrivateRoute
                exact
                path={buildAppRoute(getAppRoute(), '/requests/proposals/all')}
                simpleAuthCheck={getAppFunction('simpleAuthCheck')}
                promiseAuthCheck={getAppFunction('promiseAuthCheck')}
                render={() => <Redirect to={buildAppRoute(getAppRoute(), '/requests/proposals/all/1')} />}
              />
              <PrivateRoute
                exact
                path={buildAppRoute(getAppRoute(), '/requests/proposals/all/:page')}
                simpleAuthCheck={getAppFunction('simpleAuthCheck')}
                promiseAuthCheck={getAppFunction('promiseAuthCheck')}
                render={(routeProps: any) => (
                  <Components.ProposalsList header={'Заявки на объемы'} page={routeProps.match.params.page} />
                )}
              />
              <PrivateRoute
                exact
                path={buildAppRoute(getAppRoute(), '/requests/proposals/:id')}
                simpleAuthCheck={getAppFunction('simpleAuthCheck')}
                promiseAuthCheck={getAppFunction('promiseAuthCheck')}
                render={(routeProps: any) => <Components.ProposalRequest id={routeProps.match.params.id} />}
              />
              <PrivateRoute
                exact
                path={buildAppRoute(getAppRoute(), '/protocols')}
                simpleAuthCheck={getAppFunction('simpleAuthCheck')}
                promiseAuthCheck={getAppFunction('promiseAuthCheck')}
                render={() => <Redirect to={buildAppRoute(getAppRoute(), '/protocols/all/1')} />}
              />
              <PrivateRoute
                exact
                path={buildAppRoute(getAppRoute(), '/protocols/all')}
                simpleAuthCheck={getAppFunction('simpleAuthCheck')}
                promiseAuthCheck={getAppFunction('promiseAuthCheck')}
                render={() => <Redirect to={buildAppRoute(getAppRoute(), '/protocols/all/1')} />}
              />
              <PrivateRoute
                exact
                path={buildAppRoute(getAppRoute(), '/protocols/all/:page')}
                simpleAuthCheck={getAppFunction('simpleAuthCheck')}
                promiseAuthCheck={getAppFunction('promiseAuthCheck')}
                render={(routeProps: any) => <Components.ProtocolsList header={'Протоколы'} match={routeProps.match} />}
              />
              <PrivateRoute
                exact
                path={buildAppRoute(getAppRoute(), '/protocols/:id')}
                simpleAuthCheck={getAppFunction('simpleAuthCheck')}
                promiseAuthCheck={getAppFunction('promiseAuthCheck')}
                render={(routeProps: any) => <Components.Protocol match={routeProps.match} />}
              />
              <NoMatchRoute handle={isTrue(this.props.handleNoMatch)} />
            </Switch>
          </div>
          <ModalsContainer />
        </React.Fragment>
      </Provider>
    )
  }
}

export default App

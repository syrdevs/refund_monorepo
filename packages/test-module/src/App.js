import { APP_ROUTE_KEY, buildAppRoute, NoMatchRoute, PrivateRoute } from '@vitacore/shared-ui'
import React from 'react'
import { Switch } from 'react-router'
import { addToAppData, addToAppFunctions, getAppFunction, getAppRoute, setUserLanguage } from './utils'
import { isTrue } from './utils'

class App extends React.Component {
  constructor(props) {
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
  }

  render() {
    return (
      <React.Fragment>
        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: isTrue(this.props.handleNoMatch) ? 1 : 0 }}>
          <Switch>
            <PrivateRoute
              exact
              path={buildAppRoute(getAppRoute(), '/cabinet/profile')}
              simpleAuthCheck={getAppFunction('simpleAuthCheck')}
              promiseAuthCheck={getAppFunction('promiseAuthCheck')}
              render={() => <div>WELL DONE!!!</div>}
            />
            <NoMatchRoute handle={isTrue(this.props.handleNoMatch)}  />
          </Switch>
        </div>
      </React.Fragment>
    )
  }
}

export default App

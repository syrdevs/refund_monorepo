import * as React from 'react'
import Async from 'react-promise'
import { Redirect, Route } from 'react-router-dom'
import Login from '../Containers/Login/Login'
import store from '../Redux/store'
import { isUserAuthenticated } from '../Services/AuthenticationService'

type Props = {
  [key: string]: any
}

const LoginRoute: React.FC<Props> = routeProps => {
  return (
    <Route
      {...routeProps}
      render={(props: any) => {
        const redirectToPathname =
          routeProps &&
          routeProps.location &&
          routeProps.location.state &&
          routeProps.location.state.from &&
          routeProps.location.state.from.pathname

        return (
          <Async
            promise={isUserAuthenticated(!store.getState().userState.tokenCheckFailed)}
            then={isAuthenticated => {
              return true || !isAuthenticated ? (
                <Login {...props} redirectTo={redirectToPathname} />
              ) : (
                <Redirect
                  to={{
                    pathname: '/',
                  }}
                />
              )
            }}
          />
        )
      }}
    />
  )
}

export default LoginRoute

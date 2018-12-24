import * as React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { isUserAuthenticatedSimple, logout } from '../Services/AuthenticationService'

type Props = {
  [key: string]: any
}

const LogoutRoute: React.FC<Props> = routeProps => (
  <Route
    {...routeProps}
    render={(props: any) => {
      if (isUserAuthenticatedSimple()) {
        logout()
        return null
      }

      return (
        <Redirect
          to={{
            pathname: '/login',
          }}
        />
      )
    }}
  />
)

export default LogoutRoute

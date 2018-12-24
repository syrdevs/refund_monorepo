import * as React from 'react'
import Async from 'react-promise'
import { Redirect, Route } from 'react-router-dom'

export type PrivateRouteProps = {
  component?: React.ComponentClass
  render?: (props: any) => React.ReactNode
  simpleAuthCheck?: () => boolean
  promiseAuthCheck?: () => Promise<boolean>
  loginPath?: string
  [key: string]: any
}

export const PrivateRoute: React.FunctionComponent<PrivateRouteProps> = ({
  component: Component,
  render,
  simpleAuthCheck,
  promiseAuthCheck,
  getAuthToken,
  loginPath,
  ...rest
}) => {
  const getRenderer = (isAuthenticated: boolean, props: any) => {
    if (!isAuthenticated) {
      return (
        <Redirect
          to={{
            pathname: loginPath || '/login',
            state: { from: props.location },
          }}
        />
      )
    }

    if (Component) {
      return <Component {...props} />
    }

    return render!(props)
  }

  return (
    <Route
      {...rest}
      render={(props: any) => {
        const isAuthed = simpleAuthCheck && simpleAuthCheck()
        if (isAuthed) {
          return getRenderer(true, props)
        }

        if (!promiseAuthCheck) {
          getRenderer(false, props)
        }

        return <Async promise={promiseAuthCheck!()} then={isAuthenticated => getRenderer(isAuthenticated, props)} />
      }}
    />
  )
}

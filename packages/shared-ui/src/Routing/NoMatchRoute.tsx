import * as React from 'react'
import { Link } from 'react-router-dom'

const NoMatchRoute = (routeProps: any) => {
  if (!routeProps.handle) {
    return null
  }

  return (
    <div
      style={{ display: 'flex', flexGrow: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}
    >
      <div>Страницы не существует :(</div>
      <div>
        <Link to={{ pathname: '/' }}>На главную</Link>
      </div>
    </div>
  )
}

export default NoMatchRoute

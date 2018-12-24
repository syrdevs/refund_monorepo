import { buildAppRoute } from '@vitacore/shared-ui'
import { Breadcrumb } from 'antd'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { getAppRoute } from '../../utils'

export interface BreadcrumbRoute {
  path: string
  breadcrumbName: string
}

function itemRender(route: BreadcrumbRoute, params: any, routes: BreadcrumbRoute[], paths: string[]) {
  const last = routes.indexOf(route) === routes.length - 1
  let location = paths.join('/')
  if (paths.length > 0) {
    location = `/${location}`
  }
  return last ? (
    <span>{route.breadcrumbName}</span>
  ) : (
    <Link to={buildAppRoute(getAppRoute(), location)}>{route.breadcrumbName}</Link>
  )
}

type Props = {
  routes: BreadcrumbRoute[]
}

const Breadcrumbs: React.FunctionComponent<Props> = (props: Props) => (
  <Breadcrumb itemRender={itemRender} routes={props.routes} />
)

export default Breadcrumbs

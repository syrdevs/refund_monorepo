import { buildAppRoute } from "@vitacore/shared-ui";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import * as React from "react";
import styled from "styled-components";


//todo getBuildApproute path

function itemRender(route, params, routes, paths) {
  const last = routes.indexOf(route) === routes.length - 1;
  return last ? <span>{route.breadcrumbName}</span> : <Link to={"/" + paths.join("/")}>{route.breadcrumbName}</Link>;
}

class BreadCumber extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Breadcrumb itemRender={itemRender} routes={this.props.routes}/>;
  }
}

export default BreadCumber;
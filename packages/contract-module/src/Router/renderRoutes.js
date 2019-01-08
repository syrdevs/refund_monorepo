import React from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import Loadable from "react-loadable";

const loader = () => {
  return <div></div>;
};

const NotFound = (props) => {
  return (<div>Not Found</div>);
};


const CustomComponent = (props) => {
  return props.children ? props.children : null;
};


function RouteNest(props) {

  let routeProps = {};

  if (props.children)
    routeProps.children = props.children;

  return (
    <Route exact={props.exact}  path={props.path}
           render={p => <props.component {...p} {...routeProps}/>}/>
  );
}

function renderRoutes(routesData) {

  let routeResult = [];

  routesData.forEach((routeItem) => {

    let routeProps = {};

    if (routeItem.component) {
      routeProps.component = withRouter(Loadable({
        loader: () => import("../pages/" + routeItem.component.replace("./", "")),
        loading: loader
      }));
    } else {
      routeProps.component = (props) => (<CustomComponent  {...props}/>);
    }

    if (routeItem.redirect) {
      routeResult.push(<Route exact key={routeItem.redirect + "_redirect"} path={routeItem.path}
                              render={({ location = {} } = {}) => (
                                <Redirect to={{ ...location, pathname: routeItem.redirect }}/>
                              )}/>);
    }


    if (routeItem.routes && routeItem.routes.length > 0)
      routeResult.push(<RouteNest key={routeItem.path} path={routeItem.path}
                                  {...routeProps}>{renderRoutes(routeItem.routes)}</RouteNest>);
    else
      routeResult.push(<RouteNest key={routeItem.path} path={routeItem.path}
                                  {...routeProps}/>);
  });

  return routeResult;
}

export default renderRoutes;
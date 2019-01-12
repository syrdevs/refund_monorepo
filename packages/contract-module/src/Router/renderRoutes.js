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

  const { location } = props;
  let routeProps = {};

  return props.children ? props.children : null;
};

function getJsonFromUrl(url) {
  if (!url) url = location.search;
  var query = url.substr(1);
  var result = {};
  query.split("&").forEach(function(part) {
    var item = part.split("=");
    result[item[0]] = decodeURIComponent(item[1]);
  });
  return result;
}

function RouteNest(props) {

  let routeProps = {};

  if (props.children)
    routeProps.children = props.children;


  return (
    <Route exact={props.exact} path={props.path}
           render={p => {

             routeProps.location = {
               ...p.location,
               query: {}
             };
             if (p.location.search.length > 0) {
               routeProps.location.query = getJsonFromUrl(p.location.search);
             }

             routeProps.history = {
               ...p.history,
               location: {
                 ...p.history.location,
                 query: routeProps.location.query
               },
               push: (path, state) => {

                 let pathname = (typeof path === "string" || path instanceof String) ? path : path.pathname;
                 let querySymIndex = pathname.indexOf("?");

                 if (querySymIndex !== -1) {
                   let searchUrl = pathname.substring(querySymIndex, pathname.length);

                   if (typeof path === "string" || path instanceof String) {
                     p.history.push({
                       pathname:  pathname.substring(0, querySymIndex),
                       search: searchUrl
                     });
                   } else {
                     p.history.push({
                       ...path,
                       pathname: pathname.substring(0, querySymIndex),
                       search: searchUrl
                     });
                   }
                 } else {
                   p.history.push(path, state);
                 }
               }
             };


             return <props.component {...p} {...routeProps}/>;
           }}/>
  );
}

function renderRoutes(routesData) {

  let routeResult = [];

  routesData.forEach((routeItem) => {

    let routeProps = {};

    if (routeItem.component) {
      routeProps.component = Loadable({
        loader: () => import("../pages/" + routeItem.component.replace("./", "")),
        loading: loader
      });
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
      routeResult.push(<RouteNest exact={routeItem.exact} key={routeItem.path} path={routeItem.path}
                                  {...routeProps}>{renderRoutes(routeItem.routes)}</RouteNest>);
    else
      routeResult.push(<RouteNest exact={routeItem.exact} key={routeItem.path} path={routeItem.path}
                                  {...routeProps}/>);
  });

  return routeResult;
}

export default renderRoutes;
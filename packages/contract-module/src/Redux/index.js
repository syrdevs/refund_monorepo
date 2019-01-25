import { connect } from "react-redux";
import React, { lazy, Suspense, Component } from "react";
import store from "./store";
import models from "./model.config";
import { Provider } from "react-redux";
import { Redirect, Switch, withRouter, Route } from "react-router-dom";


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


export default (args) => {


  let modelsData = {};
  let effects = {};
  models.forEach((model) => {
    modelsData[model.namespace] = model.state;
    Object.keys(model.effects).forEach((effectItemKey) => {
      effects[model.namespace + "/" + model.effects[effectItemKey].name] = false;
    });


  });


  return (Component) => {

    let params = {
      loading: {
        effects: effects
      },
      ...modelsData
    };

    function mapDispatchToProps(dispatch) {
      return {
        dispatch(action) {
          return store._dispatch(action);
        }
      };
    }

    function mapStateToProps(state) {
      return { ...args(params), ...state };
    }


    let ConnectedCmp = connect(mapStateToProps, mapDispatchToProps)(Component);

    const ConnectedWithProvider = (props) => {

      let routeProps = {};

      routeProps.location = {
        ...props.location,
        query: {}
      };
      if (props.location.search.length > 0) {
        routeProps.location.query = getJsonFromUrl(props.location.search);
      }

      routeProps.history = {
        ...props.history,
        location: {
          ...props.history.location,
          query: routeProps.location.query
        },
        push: (path, state) => {

          let pathname = (typeof path === "string" || path instanceof String) ? path : path.pathname;
          let querySymIndex = pathname.indexOf("?");

          if (querySymIndex !== -1) {
            let searchUrl = pathname.substring(querySymIndex, pathname.length);

            if (typeof path === "string" || path instanceof String) {
              props.history.push({
                pathname: pathname.substring(0, querySymIndex),
                search: searchUrl
              });
            } else {
              props.history.push({
                ...path,
                pathname: pathname.substring(0, querySymIndex),
                search: searchUrl
              });
            }
          } else {
            props.history.push(path, state);
          }
        }
      };


      return (<Provider store={store}>
        <ConnectedCmp {...props} {...routeProps}/>
      </Provider>);
    };


    return withRouter(ConnectedWithProvider);
  };
};
import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import styled from "styled-components";
import { COLORS, LeftMenu, NoMatchRoute } from "@vitacore/shared-ui";
import ContentLayout from "./layouts/ContentLayout";
import { Provider } from "react-redux";
import store from "./Redux/store";
import routerConfig from "./config/router.config";
import Loadable from "react-loadable"
import formatMessage from "./utils/formatMessage";

import "./App.css";

const RootContainer = styled.div`
  display: flex;
  flex-grow: 1;
  background-color: #edf1f5;
  min-width: 0;
`;

const Content = styled.div`
  border-left: 1px solid #d6d6d6;
  padding: 0 15px;
  background-color: white;
  border-top: 4px solid ${COLORS.MAIN_GREEN};
  min-width: 0;
  overflow-x: hidden;
  width:100%;
`;


const loader = () => {
  return <div></div>;
};

let RoutingCollection = [];
let leftMenuCollection = [];


function routerItemRender() {
  routerConfig.forEach((parentMenu) => {
    if (parentMenu.routes) {
      parentMenu.routes.forEach((childMenu) => {

        let menuItem = {};

        menuItem = {
          name: childMenu.name,
          hrefPrefix: childMenu.path,
          iconName: childMenu.icon,
          translationKey: "leftMenu." + childMenu.name + "._",
          subItems: []
        };

        //redirect

        if (childMenu.component) {
          const RouteComponent = Loadable({
            loader: () => import("./pages/" + childMenu.component.replace("./", "")),
            loading: loader
          });

          RoutingCollection.push(<Route key={childMenu.path} exact path={childMenu.path}
                                        component={withRouter(RouteComponent)}/>);
        }

        if (childMenu.routes) {

          childMenu.routes.forEach((subChildMenu) => {

            if (subChildMenu.redirect) {
              RoutingCollection.push(<Route exact key={subChildMenu.path + "_redirect"} strict path={subChildMenu.path}
                                            render={({ location }) => {
                                              if (location.pathname === window.location.pathname) {
                                                return <Redirect key={subChildMenu.path + "_from"}
                                                                 to={subChildMenu.redirect}/>;
                                              }
                                              return null;
                                            }}/>);
            }

            if (subChildMenu.component) {

              // const RouteComponent = lazy(() => import("./pages/" + subChildMenu.component.replace("./", "")));

              const RouteComponent = Loadable({
                loader: () => import("./pages/" + subChildMenu.component.replace("./", "")),
                loading: loader
              });

              RoutingCollection.push(<Route key={subChildMenu.path} exact path={subChildMenu.path}
                                            component={withRouter(RouteComponent)}/>);
            }

            if (!subChildMenu.hideChildrenInMenu && !subChildMenu.redirect)
              menuItem.subItems.push({
                name: subChildMenu.name,
                href: subChildMenu.path.replace(childMenu.path, ""),
                iconName: subChildMenu.icon,
                translationKey: "leftMenu." + childMenu.name + "." + subChildMenu.name,
                subItems: []
              });
          });
        }

        if (!childMenu.hideChildrenInMenu) {
          leftMenuCollection.push(menuItem);
        }
      });
    }
  });
}
function menuItemRender() {

}

routerItemRender();
menuItemRender();


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.subscribeToUserLanguageChange) {
      this.props.subscribeToUserLanguageChange(() => {
        window.location.reload();
      });
    }
  }

  render() {

    const location = this.props.location.pathname;

    const bcRoutes = [];

    let breadCumberNameKey = {
      "menu": null
    };

    location.split("/").forEach((routeItem) => {
      if (routeItem.length > 0) {

        breadCumberNameKey[routeItem] = null;

        let langItem = Object.keys(breadCumberNameKey).join(".");

        bcRoutes.push({
          path: "../" + routeItem,
          breadcrumbName: formatMessage({ id: langItem })
        });
      }
    });


    return (<Provider store={store}>
      <RootContainer>
        <LeftMenu leftMenuItems={leftMenuCollection} location={location}
                  goToLink={this.props.history.push}/>
        <Content>
          <ContentLayout
            contentName={bcRoutes.length > 0 ? bcRoutes[bcRoutes.length - 1].breadcrumbName : null}
            breadcrumbRoutes={bcRoutes}>
            <Suspense fallback={<div>...</div>}>
              <Switch>
                {RoutingCollection}
                <NoMatchRoute key={"404"} handle={true}/>
              </Switch>
            </Suspense>
          </ContentLayout>
        </Content>
      </RootContainer>
    </Provider>);
  }
}

export default App;

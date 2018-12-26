import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import styled from "styled-components";
import { COLORS, LeftMenu } from "@vitacore/shared-ui";
import ContentLayout from "./layouts/ContentLayout";
import { Provider } from "react-redux";
import store from "./Redux/store";
import routerConfig from "./config/router.config";
import Loadable from "react-loadable";
import { Row, Col, Layout, Menu, Breadcrumb, Icon } from "antd";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

import "./App.css";

const RootContainer = styled.div`
  display: flex;
  flex-grow: 1;
  background-color: #edf1f5;
  min-width: 0;
`;

const ContentX = styled.div`
  overflow-x: hidden;
  background-color: white;
`;


const refundMenuItems = [
    {
    name: "Возвраты",
    hrefPrefix: "/refunds/reestr",
    iconName: "database",
    translationKey: "leftMenu.refunds._",
    subItems: []
    },
    {
    name: "Платежи",
    hrefPrefix: "/refunds/requests",
    iconName: "database",
    translationKey: "leftMenu.refunds.payments",
    subItems: []
    },
    {
    name: "Настройки",
    hrefPrefix: "/refunds/options",
    iconName: "database",
    translationKey: "leftMenu.refunds.options",
    subItems: []
    },
    {
      name: "Журнал",
      hrefPrefix: "/refunds/journal",
      iconName: "database",
      translationKey: "leftMenu.refunds.journal",
      subItems: []
    }
  ];

const loader = () => {
  return <div> </div>;
};

let RoutingCollection = [];

function routerItemRender() {
  routerConfig.forEach((parentMenu) => {

    //redirect
    //<Redirect to="/somewhere/else" />


    // if (parentMenu.component) {
    //   RoutingCollection.push(<Route key={parentMenu.path} exact path={parentMenu.path} render={() => {
    //     const Component = withRouter(lazy(() => import("./pages/" + parentMenu.component.replace("./", ""))));
    //     return <Component/>;
    //   }}/>);
    // }

    if (parentMenu.routes) {
      parentMenu.routes.forEach((childMenu) => {

        //redirect

        // if (childMenu.component) {
        //   RoutingCollection.push(<Route key={childMenu.path} exact path={childMenu.path} render={() => {
        //     const Component = withRouter(lazy(() => import("./pages/" + childMenu.component.replace("./", ""))));
        //     return <Component/>;
        //   }}/>);
        // }

        if (childMenu.routes) {
          childMenu.routes.forEach((subChildMenu) => {

            if (subChildMenu.component) {

              // const RouteComponent = lazy(() => import("./pages/" + subChildMenu.component.replace("./", "")));

              const RouteComponent = Loadable({
                loader: () => import("./pages/" + subChildMenu.component.replace("./", "")),
                loading: loader
              });

              RoutingCollection.push(<Route key={subChildMenu.path} exact path={subChildMenu.path}
                                            component={withRouter(RouteComponent)}/>);
            }

          });
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


  render() {
    const location = this.props.location.pathname;

    const bcRoutes = [
      {
        path: "/",
        breadcrumbName: "Главная"
      },
      {
        path: "/refunds",
        breadcrumbName: "Возвраты"
      }];

    if (location === "/refunds/reestr") {
      bcRoutes.push({
        path: "/refunds/reestr",
        breadcrumbName: "Реестр"
      });
    }
    if (location === "/refunds/requests") {
      bcRoutes.push({
        path: "/refunds/requests",
        breadcrumbName: "Заявки"
      }); ``
    }

    return (<Provider store={store}>
      <div>
        <LeftMenu leftMenuItems={[...refundMenuItems]} location={location}
                  goToLink={this.props.history.push}/>
      </div>
      <div style={{ overflowX: "hidden", width: "100%", height: "100vh" }}>
        <Suspense fallback={<div>...</div>}>
          <Switch>
            {RoutingCollection}
          </Switch>
        </Suspense>
      </div>
    </Provider> );

    // (
    //
    //   <Provider store={store}>
    //     <RootContainer>
    //       <LeftMenu leftMenuItems={[...refundMenuItems]} location={location}
    //                 goToLink={this.props.history.push}/>
    //       <Content>
    //         <ContentLayout
    //           contentName={"Возвраты"}
    //           breadcrumbRoutes={bcRoutes}>
    //           <Suspense fallback={<div>...</div>}>
    //             <Switch>
    //               {RoutingCollection}
    //             </Switch>
    //           </Suspense>
    //         </ContentLayout>
    //       </Content>
    //     </RootContainer>
    //   </Provider>
    // );
  }
}

export default App;

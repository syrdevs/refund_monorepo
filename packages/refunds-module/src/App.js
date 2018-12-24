import React from "react";
import { Switch } from "react-router";
import styled from "styled-components";
import { COLORS, LeftMenu } from "@vitacore/shared-ui";
import ContentLayout from "./layouts/ContentLayout";

const RootContainer = styled.div`
  display: flex;
  flex-grow: 1;
  background-color: #edf1f5;
  min-width: 0;
`;

const Content = styled.div`
  display: flex;
  flex-grow: 1;
  border-left: 1px solid #d6d6d6;
  padding: 0 15px;
  background-color: white;
  border-top: 4px solid ${COLORS.MAIN_GREEN};
  min-width: 0;
  overflow: auto;
`;


const refundMenuItems = [{
  name: "Возвраты",
  hrefPrefix: "/refunds",
  iconName: "database",
  translationKey: "leftMenu.refunds._",
  subItems: []
}, {
  name: "Платежи",
  hrefPrefix: "/payments",
  iconName: "database",
  translationKey: "leftMenu.refunds.payments",
  subItems: []
}];

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
      }
    ];

    console.log(location);

    return (
      <RootContainer>
        <LeftMenu leftMenuItems={[...refundMenuItems]} location={location}
                  goToLink={this.props.history.push}/>
        <Content>
          <ContentLayout
            contentName={"Возвраты"}
            breadcrumbRoutes={bcRoutes}>
            Main Layout
          </ContentLayout>
        </Content>
      </RootContainer>
    );
  }
}

export default App;

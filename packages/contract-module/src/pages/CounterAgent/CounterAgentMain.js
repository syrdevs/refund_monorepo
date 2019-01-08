import React, { Component, Provider } from "react";
import {
  Card,
  Button,
  Label
} from "antd";
import formatMessage from "../../utils/formatMessage";
import { renderRoutes } from "react-router-config";


const dateFormat = "DD.MM.YYYY";

export default class CounterAgentMain extends Component {
  state = {

    titles: {
      "/contract/counteragent/create": "menu.contract.counteragent.contract.headTitle",
      "/contract/counteragent/viewcontract": "menu.contract.counteragent.viewcounteragent.title",
      "/contract/counteragent/editcontract": "menu.contract.counteragent.editcounteragent.title"
    }

  };

  setTitleHeader = (title) => {
    console.log(title);
  };

  getCardTitle = () => {

    if (this.props.location.state && this.props.location.state.data.title) {
      return this.props.location.state.data.title;
    }

    let title = this.state.titles[this.props.location.pathname] ? this.state.titles[this.props.location.pathname] : "menu.counteragent";

    return formatMessage({ id: title });
  };

  render = () => {
    const { location, children, route } = this.props;


    return (<Card bodyStyle={{ padding: 5 }}>
      <div style={{ width: "100%" }}>
        main
      </div>
      {children}
    </Card>);
  };
}

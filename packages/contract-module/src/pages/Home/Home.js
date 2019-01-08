import React, { Component } from "react";
import { Card, Label } from "antd";


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    return (
      <Card bodyStyle={{ padding: 5 }} style={{ width: "100%" }}>
        <div>Home Page</div>
      </Card>
    );
  }
}

export default Home;

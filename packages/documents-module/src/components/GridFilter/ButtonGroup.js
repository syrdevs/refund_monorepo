import React, { Component } from "react";
import {
  Button, Radio, Icon
} from "antd";


class ButtonGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectValue: null
    };
  }

  componentDidMount() {

  }

  render() {

    const { buttons, onChange, value } = this.props;

    if (value === null)
      this.setState({
        selectValue: null
      });

    return (<Radio.Group
      style={{
        display: "block"
      }}
      value={this.state.selectValue}
      onChange={(e) => {
        this.setState({
          selectValue: e.target.value
        }, () => {
          if (onChange) {
            onChange(e.target.value);
          }
        });

      }}>
      {buttons ? buttons.map((btn) => (<Radio.Button key={btn.value} value={btn.value}>{btn.label}</Radio.Button>)) : []}
    </Radio.Group>);
  }
}

export default ButtonGroup;
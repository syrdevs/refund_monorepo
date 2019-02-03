import React, { Component } from "react";
import {
  Button, Radio, Icon
} from "antd";

const RadioGroup = Radio.Group;

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

    const { buttons, onChange, value, buttonType } = this.props;
    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px"
    };
    let buttonStyle = {};

    if (value === null)
      this.setState({
        selectValue: null
      });

    if (buttonType && buttonType === "radio") {
      buttonStyle.style = radioStyle;
    }

    return (<RadioGroup
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
      {buttons ? buttons.map((btn) => (buttonType && buttonType === "radio" ?
        <Radio key={btn.value}
               value={btn.value} {...buttonStyle}>{btn.label}</Radio> :
        <Radio.Button key={btn.value} value={btn.value}>{btn.label}</Radio.Button>)) : []}
    </RadioGroup>);
  }
}

export default ButtonGroup;
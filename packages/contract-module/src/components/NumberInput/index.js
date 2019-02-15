import React, { Component } from "react";

function formatNumber(value) {
  value += "";
  const list = value.split(".");
  const prefix = list[0].charAt(0) === "-" ? "-" : "";
  let num = prefix ? list[0].slice(1) : list[0];
  let result = "";
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return `${prefix}${result}${list[1] ? `.${list[1]}` : ""}`;
}

class NumberInput extends Component {

  state = {
    defaultValue: 0,
    value: 0
  };

  componentWillUnmount() {

  }

  componentDidMount() {
  }

  render() {

    let inputProps = {};
    inputProps.step = "any";
    inputProps.type = "number";
    inputProps.style = {
      minWidth: 100
    };
    inputProps.onWheel = (e) => {
      e.preventDefault();
    };
    inputProps.className = "ant-input";

    inputProps.onChange = (e) => {
      this.setState({
        value: e.target.value
      }, () => {
        if (this.props.onChange)
          this.props.onChange(this.state.value);
      });
    };


    if (this.props.step)
      inputProps.step = this.props.step;

    if (this.state.value !== 0) {
      inputProps.value = this.state.value;
    } else if (this.props.hasOwnProperty("defaultValue")) {
      inputProps.value = this.props.defaultValue;
    }

    inputProps.style = {
      width: "160px"
    };

    return (
      <input {...inputProps}/>);
  }
}

export default NumberInput;
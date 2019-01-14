import React, { Component } from 'react';

 class SmartGridColumn extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.value);
    return this.props.value;
  }
}
export default SmartGridColumn;
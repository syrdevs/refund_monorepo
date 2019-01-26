import React, { Component } from "react";
import {
  Button, Radio, Icon, Row, Col, DatePicker, Checkbox, Input
} from "antd";
import componentLocal from "../../locales/components/componentLocal";
import formatMessage from "../../utils/formatMessage";
import moment from "moment/moment";

const { RangePicker, MonthPicker } = DatePicker;
const dateFormat = "MM.YYYY";

import "./index.css";

class CustomMonthPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pickerOpen: false
    };
  }

  render() {
    return (<div>
      <MonthPicker inputPrefixCls={"customed-month-picker"} open={this.state.pickerOpen}/>
      <Button onClick={() => {
        this.setState({
          pickerOpen: !this.state.pickerOpen
        });
      }}>Open</Button>
    </div>);
  }
}

export default CustomMonthPicker;
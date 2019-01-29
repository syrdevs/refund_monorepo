import React from "react";
import Picker from "rc-calendar/lib/Picker";
import RangeCalendar from "./RangePicker";
import "rc-calendar/assets/index.css";
import { Icon } from "antd";
import moment from "moment";

const formatStr = "MM.YYYY";

function format(v) {
  return v ? v.format(formatStr) : "";
}

function isValidRange(v) {
  return v && v[0] && v[1];
}

function onStandaloneChange(value) {
  console.log(value[0] && format(value[0]), value[1] && format(value[1]));
}

function onStandaloneSelect(value) {
  console.log("onSelect");
  console.log(format(value[0]), format(value[1]));
}

class BetweenMonthPicker extends React.Component {
  state = {
    value: [],
    hoverValue: []
  };

  onChange = (value) => {
    this.setState({ value });
  };

  onHoverChange = (hoverValue) => {
    this.setState({ hoverValue });
  };

  render() {
    const state = this.state;

    let calendarProps = {
      formatStr: "MM.YYYY"
    };

    if (state.value.length > 0) {
      calendarProps.value = state.value;
    }

    const calendar = (<RangeCalendar
      hoverValue={state.hoverValue}
      dateInputPlaceholder={this.props.placeholder}
      prefixCls={"ant-calendar"}
      format={calendarProps.formatStr}
      mode={["month", "month"]}
      onChange={onStandaloneChange}
      onHoverChange={this.onHoverChange}
      showToday={false}
      onSelect={onStandaloneSelect}
      onPanelChange={(value) => {
        this.setState({
          value: value
        }, () => {
          this.props.onPanelChange(value);
        });
      }}
      {...calendarProps}
    />);

    const inputIcon = <Icon type="calendar" className={`ant-calendar-picker-icon`}/>;

    return (<Picker
      value={state.value}
      onChange={this.onChange}
      animation="slide-up"
      calendar={calendar}
      {...this.props}>
      {
        ({ value }) => {
          return (<span className={"ant-calendar-picker-input ant-input"}>
          <input
            disabled={this.props.disabled}
            readOnly
            value={isValidRange(value) && `${format(value[0])}` || ""}
            placeholder={this.props.placeholder[0]}
            className={`ant-calendar-range-picker-input`}
            tabIndex={-1}
          />
          <span className={`ant-calendar-range-picker-separator`}> ~ </span>
          <input
            disabled={this.props.disabled}
            readOnly
            value={isValidRange(value) && `${format(value[1])}` || ""}
            placeholder={this.props.placeholder[1]}
            className={`ant-calendar-range-picker-input`}
            tabIndex={-1}
          />
            {inputIcon}
        </span>);
        }
      }

    </Picker>);
  }
}


export default BetweenMonthPicker;

import React, { Component } from "react";
import {
  Button, Radio, Icon, Row, Col, DatePicker, Checkbox
} from "antd";
import componentLocal from "../../locales/components/componentLocal";
import formatMessage from "../../utils/formatMessage";
import moment from "moment/moment";


const { RangePicker, MonthPicker } = DatePicker;

class ListBetweenDate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkboxCheck: false,
      disableCalendar: false,
      calendarValue: null
    };
  }

  componentDidMount() {

  }

  disabledDate(current) {
    return current && current >= moment().endOf("day");
  }

  render() {

    const { value } = this.props;

    if (value === null)
      this.setState({
        calendarValue: null
      });

    return (<Row>
      <Col md={22}>
        <RangePicker  {...this.props.RangeDateProps}
                      format={"DD.MM.YYYY"}
                      placeholder={[
                        formatMessage({ id: "datepicker.start.label" }),
                        formatMessage({ id: "datepicker.end.label" })
                      ]}
                      disabledDate={this.disabledDate}
                      onChange={(moment, dateString) => {
                        this.setState({
                          calendarValue: dateString.toString().length <= 1 ? null : dateString
                        });
                        this.props.onChange(dateString.toString().length <= 1 ? null : dateString);
                      }}
                      disabled={this.state.disableCalendar}/>
      </Col>
      {this.props.filterItem.nullBtn &&
      <Col md={2}>
        <div style={{ margin: "5px" }}>
          <Checkbox checked={this.state.checkboxCheck} onChange={(e) => {

            this.setState({
              checkboxCheck: e.target.checked,
              disableCalendar: e.target.checked
            });
            if (e.target.checked)
              this.props.onChange({ isNullable: true });
            else
              this.props.onChange(this.state.calendarValue);
          }}/>
        </div>
      </Col>
      }

    </Row>);
  }
}


export default ListBetweenDate;
import React, { Component } from "react";
import {
  Button, Radio, Icon, Row, Col, DatePicker, Checkbox
} from "antd";
import componentLocal from "../../locales/components/componentLocal";
import formatMessage from "../../utils/formatMessage";
import moment from "moment/moment";
import RangePicker from "./MonthPickerCustom";

const dateFormat = "MM.YYYY";


class BetweenMonthPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      isCalendarOpen: null,

      checkboxCheck: false,
      disableCalendar: false,
      calendarValue: null,
      calendarMomentValue: []
    };
  }

  componentDidMount() {

  }

  disabledDate(current) {
    return current && current >= moment().endOf("day");
  }

  render() {

    const { value } = this.props.RangeDateProps;

    if (value === null)
      this.setState({
        calendarMomentValue: [],
        calendarValue: null
      });


    let CalendarProps = {};

    if (this.state.isCalendarOpen === false) {
      CalendarProps.open = false;
    }

    let selectedPanelCount = 0;

    return (<Row>
      <Col md={22}>
        <RangePicker  {...this.props.RangeDateProps}
                      format={dateFormat}
                      placeholder={[
                        formatMessage({ id: "datepicker.start.label" }),
                        formatMessage({ id: "datepicker.end.label" })
                      ]}
                      allowClear={false}
                      value={this.state.calendarMomentValue}
                      mode={["month", "month"]}
                      onPanelChange={(momentValue, dateString) => {

                        let startDate = moment(momentValue[0]).format(dateFormat);
                        let endDate = moment(momentValue[1]).format(dateFormat);

                        selectedPanelCount++;

                        if (selectedPanelCount === 2) {
                          this.setState({
                            calendarValue: [startDate, endDate],
                            calendarMomentValue: momentValue,
                            isCalendarOpen: false
                          }, () => {
                            this.setState({
                              isCalendarOpen: null
                            });
                            this.props.onChange(this.state.calendarValue);
                          });
                        }

                      }}
                      disabled={this.state.disableCalendar}
                      {...CalendarProps}/>
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


export default BetweenMonthPicker;
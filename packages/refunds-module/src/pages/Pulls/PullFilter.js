import React, { Component } from 'react';
import {
  Form, Select, InputNumber, Switch, Radio,
  Slider, Button, Upload, Icon, Rate, Checkbox,
  Row, Col, Input, DatePicker, Sea
} from "antd";

const Search = Input.Search;

export default class PullFilter extends Component {
  state = {
    ImportModalGrid: {
      visible: true,
    },
  };

  componentWillUnmount = () => {

  };

  componentDidMount = () => {

  };

  handleSubmit = (e) => {

  }

  normFile = (e) => {

  }


  render = () => {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <Row>

        <Col span={24}>
        </Col>



        {/*<Form.Item
          {...formItemLayout}
          label="Без исполнителя"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          {...formItemLayout}
          label="КНП"
          hasFeedback
        >
          <Select placeholder="КНП">
            <Option value="china">Отчисления на обязательное социальное медицинское страхование</Option>
            <Option value="usa">Взносы на обязательное социальное медицинское страхование</Option>
          </Select>
        </Form.Item>

        <Form.Item
          {...formItemLayout}
          label="Дата исполнения заявки:"
        >
          <RangePicker/>
        </Form.Item>

        <Form.Item
          {...formItemLayout}
          label="Статус"
        >
            <Checkbox.Group style={{ width: "100%" }}>
              <Row>
                <Col span={8}><Checkbox value="A">Исполнено</Checkbox></Col>
                <Col span={8}><Checkbox value="B">Согласовано</Checkbox></Col>
                <Col span={8}><Checkbox value="C">Отклонено</Checkbox></Col>
                <Col span={8}><Checkbox value="D">Отправлено</Checkbox></Col>
              </Row>
            </Checkbox.Group>
        </Form.Item>*/}
      </Row>
    );
  };
}

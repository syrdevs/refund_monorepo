import React, { Component, PureComponent } from 'react';
import formatMessage from '../../utils/formatMessage';
import { Form, Input, Button, Select, Divider, DatePicker, Icon, Table, Row, Col, Tabs, Card, Modal } from 'antd';



 class LinkModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      value: props.value ? props.value : null,
    };
  }


  static getDerivedStateFromProps(nextProps, nextState) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      return {
        ...(nextProps.value || {}),
      };
    }
    return null;
  }

  triggerChange = (changedValue) => {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  };

  handleChange = (record) => {
    this.triggerChange({ value: record });
  };

  hideModal = () => {
    this.setState({ visible: false });
  };

  render = () => {

    let fileName = '';

    if (this.props.data && this.state.value === null) {
      if (Object.keys(this.props.data).length > 0) {
        this.handleChange(this.props.data);

        if (this.props.labelFormatter) {
          fileName = this.props.labelFormatter(this.props.data);
        }
      }
    }

    if (this.state.value !== null) {
      if (this.props.data) {
        if (this.state.value.id !== this.props.data.id) {
          this.handleChange(this.props.data);
        }
      }

      if (this.props.labelFormatter) {
        fileName = this.props.labelFormatter(this.state.value);
      }
    }


    return (<div>
      <Modal
        width={1000}
        onOk={() => this.hideModal()}
        onCancel={() => this.hideModal()}
        visible={this.state.visible}>
        {this.props.children}
      </Modal>

      {!this.props.data && this.state.value === null ? <Button onClick={() => {
        this.props.onClick();
      }}>Выбрать</Button> : <div>

      <span
        style={{
          color: '#1890ff',
          textDecoration: 'underline',
          cursor: 'pointer',
        }}
        onClick={() => {
          this.props.onTarget(this.props.data ? this.props.data : this.state.value);
        }}>
        {fileName}
        </span>

        <span
          onClick={() => {
            this.props.onClick();
          }}
          style={{
            marginLeft: '20px',
            cursor: 'pointer',
            textDecoration: 'underline',
            fontSize: '14px',
          }}>Изменить</span>
        <span
          onClick={() => {
            this.handleChange(null);
            this.props.onDelete();
          }}
          style={{
            marginLeft: '10px',
            cursor: 'pointer',
            color: 'red',
            textDecoration: 'underline',
            fontSize: '14px',
          }}>Удалить</span>

      </div>}
    </div>);
  };
}

export default LinkModal;
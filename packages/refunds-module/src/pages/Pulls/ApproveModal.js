import { Modal, Button } from 'antd';
import { Component } from "react";
import React from "react";

export default class ApproveModal extends Component {
  state = { visible: false }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  hideModal = () => {
    this.setState({
      visible: false,
    });
  }

  render() {
    return (
      <div style={{display:'inline-block'}}>
        <Button key={"approve"}  disabled={this.props.disabled} onClick={this.showModal}>Отправить на согласование</Button>
        <Modal
          title="Отправить на согласование"
          visible={this.state.visible}
          onOk={this.hideModal}
          onCancel={this.hideModal}
          okText="Выбрать"
          cancelText="Отменить"
        >
          <p>Текст</p>
        </Modal>
      </div>
    );
  }
}
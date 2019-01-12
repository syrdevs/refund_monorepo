import { Modal, Button } from 'antd';
import { Component } from "react";
import React from "react";

export default class SignModal extends Component {
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
        <Button
          key={"signandsend"}
          style={{marginLeft:'5px'}}
          disabled={this.props.disabled}
          onClick={this.showModal}>Подписать и отправить</Button>
        <Modal
          title="Подписать и отправить"
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
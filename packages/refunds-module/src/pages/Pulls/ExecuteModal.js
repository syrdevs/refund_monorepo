import { Modal, Button } from 'antd';
import { Component } from "react";
import React from "react";

export default class ExecuteModal extends Component {
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
        <Button key={"executor"} disabled={this.props.disabled} style={{marginLeft:'5px'}} onClick={this.showModal}>Определить исполнителя</Button>
        <Modal
          title="Определить исполнителя"
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
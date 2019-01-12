import { Modal, Button } from 'antd';
import { Component } from "react";
import React from "react";
import EmployeesModal from "../Options/EmployeesModal";

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
        <Button key={"executor"} disabled={this.props.disabled} style={{marginLeft:'5px'}} onClick={this.showModal}>Определить исполнителя  {this.props.count > 0 && ` (${this.props.count})`}</Button>
        {this.state.visible && <EmployeesModal onCancel={this.hideModal}/>}
      </div>
    );
  }
}
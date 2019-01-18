import { Modal, Button } from 'antd';
import { Component } from "react";
import React from "react";
import EmployeesModal from "../Options/EmployeesModal";

class ExecuteModal extends Component {
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
        <Button key={"executor"} disabled={this.props.disabled} style={{marginLeft:'5px'}} onClick={this.showModal}>Назначить исполнителя  {this.props.count > 0 && ` (${this.props.count})`}</Button>
        {this.state.visible && <EmployeesModal
          onChecked={(id)=>this.props.onChecked(id)}
          onCancel={this.hideModal} keys={this.props.selectedRows}/>}
      </div>
    );
  }
}

export default ExecuteModal;
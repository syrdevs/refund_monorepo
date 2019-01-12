import React, { Component } from "react";
import formatMessage from "../../utils/formatMessage";
import {
  Form,
  Input,
  Button,
  Select,
  Divider,
  DatePicker,
  Table,
  Row,
  Col,
  Tabs,
  Menu,
  Icon,
  Card,
  Modal,
  Spin,
  Dropdown
} from "antd";
import connect from "../../Redux";
import moment from "moment/moment";
import saveAs from "file-saver";

class DropDownAction extends Component {
  state = {
    loading: false
  };

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: "universal/getCommandResult",
      payload: {
        "entity": this.props.entity,
        "type": this.props.type
      }
    });
  }

  downloadFile = (contractId, menuId) => {

    let authToken = localStorage.getItem("AUTH_TOKEN");

    this.setState({ loading: true });

    fetch("/api/uicommand/runCommand",
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer " + authToken
        },
        method: "post",
        body: JSON.stringify({
          "id": menuId,
          "parameters": [],
          "obj_ids": Array.isArray(contractId) ? contractId : [
            contractId
          ]
        })
      })
      .then(response => {
        if (response.ok) {
          return response.blob().then(blob => {
            this.setState({ loading: false });
            let disposition = response.headers.get("content-disposition");
            return {
              fileName: this.getFileNameByContentDisposition(disposition),
              raw: blob
            };
          });
        }
      })
      .then(data => {
        if (data) {

          saveAs(data.raw, data.fileName);
        }
      });
  };
  getFileNameByContentDisposition = (contentDisposition) => {
    let regex = /filename[^;=\n]*=(UTF-8(['"]*))?(.*)/;
    let matches = regex.exec(contentDisposition);
    let filename;
    let filenames;
    if (matches != null && matches[3]) {
      filename = matches[3].replace(/['"]/g, "");
      let match = regex.exec(filename);
      if (match != null && match[3]) {
        filenames = match[3].replace(/['"]/g, "").replace("utf-8", "");
      }
    }
    return decodeURI(filenames);
  };

  render = () => {

    let menuData = this.props.universal.commandResult.length > 0 ? this.props.universal.commandResult : [];

    const menu = (
      <Menu>
        {menuData.map((item) =>
          <Menu.Item
            onClick={() => {
              this.downloadFile(this.props.contractId, item.id);
            }}
            key={item.id}>{item.name}
          </Menu.Item>)}
      </Menu>
    );

    return (<Dropdown
      trigger={["click"]}
      disabled={this.props.disabled}
      overlay={menu}>
      <Button
        loading={this.state.loading} style={{ marginLeft: 5 }}>
        Отчеты <Icon type="down"/>
      </Button>
    </Dropdown>);
  };
}

export default connect(({ universal, loading }) => ({
  universal,
  loadingData: loading.effects["universal/getCommandResult"]
}))(DropDownAction);

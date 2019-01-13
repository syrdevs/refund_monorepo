import React, { Component } from "react";
import formatMessage from "../../../utils/formatMessage";
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
  Card,
  Upload,
  Icon,
  Spin
} from "antd";
import connect from "../../../Redux";
import saveAs from "file-saver";
import '../../CounterAgent/CounterAgent.css';

const TabPane = Tabs.TabPane;
const { TextArea } = Input;

@Form.create()
class AttachmentPage extends Component {
  state = {
    columns: [
      {
        title: "Документ",
        dataIndex: "attachmentType.nameRu",
        width: "30%"
      }, {
        title: "Коментарий",
        dataIndex: "fileDescription",
        width: "50%"
      }, {
        title: "Файл",
        width: "10%",
        render: ((item) => {
          return <a onClick={() => {
            this.downloadFile(item);
          }}>{item.name}</a>;
        })
      }
    ],
    dataSource: [],
    loading: false
  };


  componentDidMount() {

    const { dispatch } = this.props;

    this.setState({
      dataSource: this.props.formData.documentAttachments !== undefined ? this.props.formData.documentAttachments : [],
      loading: false
    });
  }

  downloadFile = (file) => {

    let authToken = localStorage.getItem("AUTH_TOKEN");
    this.setState({ loading: true });
    fetch("/api/uicommand/downloadFile",
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer " + authToken
        },
        method: "post",
        body: JSON.stringify(
          {
            "entity": "documentAttachment",
            "id": file.id
          }
        )
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
    let filename = "";
    if (contentDisposition && contentDisposition.indexOf("attachment") !== -1) {
      let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      let matches = filenameRegex.exec(contentDisposition);
      if (matches != null && matches[1]) {
        filename = matches[1].replace(/['"]/g, "");
      }
    }

    return filename;
  };

  render() {

    const { form: { getFieldDecorator, validateFields }, formItemLayout } = this.props;


    return (<Card style={{ marginLeft: "-10px" }}>
      <Spin spinning={this.state.loading}>
        <Table
          className={"attachment_file_list"}
          bordered={true}
          columns={this.state.columns}
          dataSource={this.state.dataSource}
          pagination={{ position: "none" }}
        />
      </Spin>
    </Card>);
  }
}

export default connect(({ universal, loading }) => ({
  universal
  // loadingData: loading.effects['universal/saveobject'],
}))(AttachmentPage);

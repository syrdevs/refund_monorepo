import React, { Component } from "react";
import { Modal, DatePicker, Upload, Button, Icon, Row, Input, Spin } from "antd";
import moment from "moment";
import formatMessage from "../../utils/formatMessage";
import connect from "../../Redux";
import saveAs from "file-saver";
import request from "../../utils/request";
import Guid from "../../utils/Guid";

class ModalChangeDate extends Component {


  state = {
    test: "",
    changeDateValue: null
  };

  handleOk = () => {

    const { dispatch, dataSource } = this.props;

    if (this.state.changeDateValue !== null) {
      dispatch({
        type: "universal/changeDateRequest",
        payload: {
          [dataSource.key]: this.state.changeDateValue !== "" ? this.state.changeDateValue : null,
          id: dataSource.id
        }
      }).then(() => {
        this.props.hideModal(true);
      });
    }
    this.props.hideModal();
  };

  handleCancel = () => {
    if (this.props.universal.files.length !== 0 && this.state.changeDateValue === null) {
      this.removeFiles(this.props.universal.files, () => {
        this.props.hideModal();
      });
    } else {
      this.props.hideModal();
    }


    //
  };

  uploadFile = (data) => {

    const { dispatch, dataSource } = this.props;

    //if (data.file.status === "done") {
    //data.file.status = 'uploading';
    dispatch({
      type: "universal/setfile",
      payload: {
        file: data.file.originFileObj,
        id: dataSource.id
      }
    }).then(() => this.getFileList());
    //}

    return false;
  };
  removeFile = (file) => {
    const { dispatch } = this.props;

    dispatch({
      type: "universal/removeFileRequest",
      payload: {
        id: file.uid
      }
    }).then(() => this.getFileList());
  };

  removeFiles = (files, cb) => {
    let completed = 0;
    files.forEach((file) => {
      this.props.dispatch({
        type: "universal/removeFileRequest",
        payload: {
          id: file.id
        }
      }).then(() => {
        completed++;
        if (files.length === completed && cb) {
          cb();
        }
      });
    });


  };

  getFileList = () => {

    const { dataSource, dispatch } = this.props;


    dispatch({
      type: "universal/getFilesRequestDate",
      payload: {
        id: dataSource.id
      }
    }).then(() => {
      this.setState({ test: "test" });
    });

  };


  componentDidMount() {
    this.getFileList();
  }

  /*disabledDate =(current) => {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }*/

  disabledDate = (current) => {
    // Can not select days before today and today
    if (this.props.coltype !== "appEndDate") {
      return current && current.valueOf() > (Date.now());
    }
  };

  getFileNameByContentDisposition = (contentDisposition) => {
    var filename = "";
    if (contentDisposition && contentDisposition.indexOf("attachment") !== -1) {
      var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      var matches = filenameRegex.exec(contentDisposition);
      if (matches != null && matches[1]) {
        filename = matches[1].replace(/['"]/g, "");
      }
    }

    return filename;
  };

  render() {

    let uploadProps = {
      fileList: this.props.universal.files.map((file) => ({
        uid: file.id,
        name: file.filename
      })),
      beforeUpload: () => (false),
      onRemove: (file) => {
        if (this.props.universal.files.length === 1 && this.props.dataSource.value !== null) {
          Modal.error({
            title: "Внимание",
            content: "Файл не может быть удален. Пожалуйста, удалите сначала дату"
          });
          return false;
        } else {
          this.removeFile(file);
        }
      },
      onPreview: (file) => {

        request("/api/refund/upload/application/download/" + file.uid, {
          responseType: "blob",
          method: "POST",
          getResponse: (response) => {
            if (response.data && response.data.type)
              saveAs(new Blob([response.data], { type: response.data.type }), Guid.newGuid());
          }
        });

        // let authToken = localStorage.getItem("AUTH_TOKEN");
        //
        // fetch("/api/refund/upload/application/download/" + file.uid,
        //   {
        //     headers: {
        //       "Content-Type": "application/json; charset=utf-8",
        //       Authorization: "Bearer " + authToken
        //     },
        //     method: "post"
        //   })
        //   .then(response => {
        //     if (response.ok) {
        //       return response.blob().then(blob => {
        //         let disposition = response.headers.get("content-disposition");
        //         return {
        //           fileName: this.getFileNameByContentDisposition(disposition),
        //           raw: blob
        //         };
        //       });
        //     }
        //   })
        //   .then(data => {
        //     if (data) {
        //       saveAs(data.raw, data.fileName);
        //     }
        //   });
      },
      onChange: (file, fileList) => {
        if (file.status !== "removing") {
          this.uploadFile(file);
        }
      }
    };

    return (
      <Modal
        title={formatMessage({ id: "modalchangedate.title" })}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        width={500}
        centered
        visible
        footer={[
          <Button key="back" onClick={this.handleCancel}>
            {formatMessage({ id: "system.close" })}
          </Button>,
          <Button
            disabled={this.props.coltype !== "appEndDate" && this.props.universal.files.length === 0}
            key="submit" type="primary" onClick={this.handleOk}>
            {formatMessage({ id: "form.save" })}
          </Button>
        ]}
      >

        <Spin spinning={this.props.loadingFiles}>
          <Row>
            {this.props.dataSource.value && <DatePicker
              allowClear={false}
              defaultValue={moment(this.props.dataSource.value, this.props.dateFormat)}
              size="large"
              style={{ marginBottom: "5px" }}
              format={this.props.dateFormat}
              disabledDate={this.disabledDate}
              onChange={(date, dateString) => this.setState({ changeDateValue: dateString })}
            />}

            {!this.props.dataSource.value && <DatePicker
              allowClear={false}
              size="large"
              style={{ marginBottom: "5px" }}
              format={this.props.dateFormat}
              disabledDate={this.disabledDate}
              onChange={(date, dateString) => this.setState({ changeDateValue: dateString })}
            />}
          </Row>
          {this.props.coltype !== "appEndDate" &&
          <Row style={{ marginTop: "15px" }}>
            {this.props.loadingFiles === false ?
              <Spin tip={"Загрузка файла..."} spinning={this.props.uploadFile === true}> <Upload
                {...uploadProps}>
                <Button size="large">
                  <Icon type="upload"/>{formatMessage({ id: "system.load" })}
                </Button>
              </Upload></Spin> : <Button size="large">
                <Icon type="upload"/>{formatMessage({ id: "system.load" })}
              </Button>
            }
          </Row>}</Spin>
      </Modal>
    );
  }
}

export default connect(({ universal, loading }) => ({
  universal,
  uploadFile: loading.effects["universal/setfile"],
  loadingFiles: loading.effects["universal/getFilesRequestDate"],
  deleteFile: loading.effects["universal/removeFileRequest"],
  changeDate: loading.effects["universal/changeDateRequest"]
}))(ModalChangeDate);


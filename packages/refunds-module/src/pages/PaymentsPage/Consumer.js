import React, { Component } from "react";
import {
  Card,
  Tabs,
  Table,
  Icon,
  Menu,
  Dropdown,
  Button,
  Label,
  Pagination,
  Row,
  Col,
  Form,
  Input,
  DatePicker,
  Select,
  Checkbox,
  Spin,
  Divider, Modal, message, Upload, Collapse
} from "antd";

const Panel = Collapse.Panel;

import formatMessage from "../../utils/formatMessage";
import GridFilter from "../../components/GridFilter";
import { faTimes } from "@fortawesome/free-solid-svg-icons/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SmartGridView from "../../components/SmartGridView";
import connect from "../../Redux";
import { Animated } from "react-animated-css";
import moment from "moment/moment";
import "./Payments.css";
import request from "../../utils/request";
import Guid from "../../utils/Guid";
import saveAs from "file-saver";

const Search = Input.Search;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const TabPane = Tabs.TabPane;
const dateFormat = "DD.MM.YYYY";
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 }
};

class Consumer extends Component {

  state = {
    selectedRecord: null,
    parameters: {
      start: 0,
      length: 10,
      entity: "specialList",
      filter: {},
      sort: []
    },
    filterForm: [

      {
        label: "ИИН",
        name: "iin",
        type: "text"
      }, {
        label: "Дата создания",
        name: "createDateTime",
        type: "dateTime"
      }, {
        label: "Пользователь",
        name: "firstname",
        type: "text"
      }

    ],
    sortedInfo: {},
    selectedRowKeys: [],
    visibleAddConsumer: false,
    visibleModal: false,
    filterContainer: 0,
    columns: [
      {
        "title": "ИИН",
        "dataIndex": "iin",
        "isVisible": "true"
      }
    ]
  };

  clearFilter = (pageNumber) => {
    console.log(this.state.parameters);
    this.setState({
      sortedInfo: {},
      parameters: {
        start: this.state.parameters.start,
        length: this.state.parameters.length,
        entity: this.state.parameters.entity,
        filter: {},
        sort: []
      }
    }, () => {
      this.loadGridData();
    });
  };

  showModal = () => {
    this.setState({
      visibleModal: true
    });
  };

  removeFile = (file) => {
    const { dispatch } = this.props;
    dispatch({
      type: "universal/deleteObject",
      payload: {
        "entity": "specialList",
        "id": file.id
      }
    }).then(() => {

      this.loadGridData();
    });
  };

  handleOk = (e) => {

    this.removeFile(this.state.selectedRecord);
    this.setState({
      visibleModal: false
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visibleModal: false
    });
  };
//test
  applyFilter = (filter) => {
    if (filter.knpList != null && filter.knpList.length === 0) {
      delete filter["knpList"];
    }
    this.setState({
      sortedInfo: {},
      parameters: {
        ...this.state.parameters,
        filter: { ...filter },
        sort: []
      }
    }, () => {

      const { dispatch } = this.props;
      dispatch({
        type: "universal2/getList",
        payload: {
          ...this.state.parameters,
          start: 0
        }
      });


    });
  };

  onShowSizeChange = (current, pageSize) => {
    const { dispatch } = this.props;
    this.setState(prevState => ({
      parameters: {
        ...prevState.parameters,
        start: current,
        length: pageSize
      }
    }), () => dispatch({
      type: "universal2/getList",
      payload: {
        ...this.state.parameters,
        start: current,
        length: pageSize
      }
    }));
  };

  filterPanelState = () => {
    this.setState(({ filterContainer }) => ({
      filterContainer: filterContainer === 6 ? 0 : 6
    }));
  };

  loadGridData = () => {
    const { dispatch } = this.props;
    let sortField = this.state.sortedInfo;
    dispatch({
      type: "universal2/getList",
      payload: this.state.parameters
    });
  };

  componentDidMount() {
    this.loadGridData();
  }

  addSpecial = (iin) => {
    const { dispatch } = this.props;
    dispatch({
      type: "universal2/addSpecial",
      payload: iin
    }).then(() => {
      this.loadGridData();
    })

      .catch((r) => {
        // console.log(r)
        let msg = r.getResponseValue();
        message.warning(msg.data.Message);
      });
  };

  exportToExcel = () => {
    console.log(556);

    request("/api/refund/exportToExcel", {
      body: {
        "entityClass": this.state.parameters.entity,
        "fileName": this.state.parameters.entity === "mt100" ? formatMessage({ id: "menu.payments.payment100" }) : formatMessage({ id: "menu.payments.payment102" }),
        "src": {
          "searched": true,
          "data": this.state.parameters.filter
        },
        "columns": this.state.parameters.entity == "mt100" ? JSON.parse(localStorage.getItem("paymentspagemt100columns")).filter(item => item.isVisible === "true" || item.isVisible === true) : JSON.parse(localStorage.getItem("paymentspagemt102columns")).filter(item => item.isVisible === "true" || item.isVisible === true)
      },
      method: "post",
      responseType: "blob",
      getResponse: (response) => {
        if (response.status === 200) {
          if (response.data && response.data.type)
            saveAs(new Blob([response.data], { type: response.data.type }), Guid.newGuid());
        }
      }
    });

    // let authToken = localStorage.getItem("AUTH_TOKEN");
    //
    // fetch("/api/refund/exportToExcel",
    //   {
    //     headers: {
    //       "Content-Type": "application/json; charset=utf-8",
    //       Authorization: "Bearer " + authToken
    //     },
    //     method: "post",
    //     body: JSON.stringify({
    //       "entityClass": this.state.parameters.entity,
    //       "fileName": this.state.parameters.entity === "mt100" ? formatMessage({ id: "menu.payments.payment100" }) : formatMessage({ id: "menu.payments.payment102" }),
    //       "src": {
    //         "searched": true,
    //         "data": this.state.parameters.filter
    //       },
    //       "columns": this.state.parameters.entity == "mt100" ? JSON.parse(localStorage.getItem("paymentspagemt100columns")).filter(item => item.isVisible === "true" || item.isVisible === true) : JSON.parse(localStorage.getItem("paymentspagemt102columns")).filter(item => item.isVisible === "true" || item.isVisible === true)
    //     })
    //   })
    // // .then(response => response.blob())
    // // .then(responseBlob => {
    // //
    // //   var reader = new FileReader();
    // //   reader.addEventListener('loadend', function() {
    // //     var blob = new Blob([reader.result], { type: 'application/vnd.ms-excel' }); // pass a useful mime type here
    // //     var url = URL.createObjectURL(blob);
    // //     window.open(url, '_self');
    // //   });
    // //   reader.readAsArrayBuffer(responseBlob);
    // //
    // //   /* let blob = new Blob([responseBlob], { type: responseBlob.type }),
    // //      url = window.URL.createObjectURL(blob);
    // //    window.open(url, '_self');*/
    // // });
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
    //       saveAs(data.raw, moment().format("DDMMYYYY") + data.fileName);
    //     }
    //   });

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

  uploadFile = (data) => {

    let formData = new FormData();
    formData.append('file', data.file);
    request("/api/refund/addSpecialList", {
      method: "POST",
      body: formData,
      getResponse: (response) => {
        if (response.status === 400) {
          console.log(response)
          // let msg = response.getResponseValue();
          message.warning(response.data.Message);
          // if (response.data && response.data.type)
          //   saveAs(new Blob([response.data], { type: response.data.type }), Guid.newGuid());
        }
      }
    }).then(() => {
      this.loadGridData();
    })

  };

  render = () => {

    let uploadProps = {
      fileList: this.props.universal.files.map((file) => ({
        uid: file.id,
        name: file.filename
      })),
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
      beforeUpload: () => (false),
      onPreview: (file) => {

        //let authToken = localStorage.getItem("AUTH_TOKEN");
        console.log(111);

        request("/api/refund/addSpecialList/", {
          method: "POST",
          getResponse: (response) => {
            if (response.data && response.data.type)
              saveAs(new Blob([response.data], { type: response.data.type }), Guid.newGuid());
          }
        });

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

    const paymentsData = this.props.universal2.references[this.state.parameters.entity] ? this.props.universal2.references[this.state.parameters.entity] : {};
    const CardHeight = { height: "auto", marginBottom: "10px" };
    let addonButtons = [
      <Button
        onClick={() => {

          this.setState({
            visibleAddConsumer: true
          });
        }}>
        Добавить</Button>];
    let delButtons = [
      <Button
        disabled={this.state.selectedRecord === null}
        onClick={this.showModal}
      >
        Удалить</Button>


    ];
    let importButtons = [
      <Upload
        {...uploadProps}
        showUploadList={false}
        name="logo"
      >
        <Button>
          <Icon type="upload"/> Загрузить
        </Button>
      </Upload>
    ];
    let extraButtons = [<span key={"total-count"} style={{
      color: "#002140",
      fontSize: "12px",
      paddingLeft: "10px"
    }}>{formatMessage({ id: "system.totalAmount" })}: {paymentsData.totalSum ? paymentsData.totalSum.totalAmount ? paymentsData.totalSum.totalAmount : paymentsData.totalSum.paymentsum : 0} /</span>];

    return (<Row>
      {this.state.visibleAddConsumer &&
      <Row>
        <div style={CardHeight}>
          <Card
            style={{ height: "140px", marginBottom: "10px" }}
            type="inner"
            bodyStyle={{ padding: 25 }}
            title={"Добавить сотрудника"}
            extra={<p onClick={() => {
              this.setState({
                visibleAddConsumer: false
              });
            }}><Icon type="close" /></p>}
          >

            <Col span={18}>
              <Search
                placeholder="Введите ИИН"
                enterButton={"Сохранить"}
                size="large"
                maxLength={12}
                style={{ width: 600}}
                onSearch={value => this.addSpecial(value)}

              />
            </Col>

          </Card>
        </div>
      </Row>
      }


      <Modal
        title="Внимание!"
        visible={this.state.visibleModal}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <h4> Вы действительно хотите удалить сотрудника с
          ИИН {this.state.selectedRecord ? this.state.selectedRecord.iin : ""}</h4>
      </Modal>

      <Col sm={24} md={this.state.filterContainer}>
        <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
          <Card
            headStyle={{
              padding: "0 14px"
            }}
            style={{ margin: "0px 5px 10px 0px", borderRadius: "5px" }}
            type="inner"
            title={formatMessage({ id: "system.filter" })}
            extra={<Icon style={{ "cursor": "pointer" }} onClick={this.filterPanelState}><FontAwesomeIcon
              icon={faTimes}/></Icon>}>
            <GridFilter
              // clearFilter={this.clearFilter(pageNumber)}
              clearFilter={(pageNumber) => this.clearFilter(pageNumber)}
              applyFilter={(filter) => this.applyFilter(filter)} key={"1"}
              filterForm={this.state.filterForm}
              dateFormat={dateFormat}/>
          </Card>
        </Animated>

      </Col>
      <Col sm={24} md={this.state.filterContainer !== 6 ? 24 : 18}>

        <SmartGridView
          // name={'paymentspagemt100columns'}
          // scroll={{ x: "auto" }}
          fixedBody={true}
          actionColumns={[]}
          showTotal={true}
          // selectedRowCheckBox={true}
          searchButton={false}
          selectedRowKeys={this.state.selectedRowKeys}
          rowKey={"id"}
          loading={this.props.loadingData}
          fixedHeader={true}
          // rowSelection={true}
          columns={this.state.columns}
          // onColumnsChange={(isChanged, dataIndex) => {
          //   if (isChanged === true && dataIndex === 'createdOn') {
          //     this.setState(prevState => ({
          //       parameters: {
          //         ...prevState.parameters,
          //         sort: [{field: "createdOn", 'desc': true}],
          //       },
          //     }), () => {
          //       this.loadGridData();
          //     });
          //   }
          // }}
          sorted={true}
          sortedInfo={this.state.sortedInfo}
          showExportBtn={true}
          dataSource={{
            total: paymentsData.totalElements,
            pageSize: paymentsData.size,
            page: this.state.parameters.start + 1,
            data: paymentsData.content
          }}
          onSort={(column) => {

            if (Object.keys(column).length === 0) {
              this.setState(prevState => ({
                parameters: {
                  ...prevState.parameters,
                  sort: []
                },
                sortedInfo: {}
              }), () => {
                this.loadGridData();
              });
              return;
            }

            this.setState(prevState => ({
              sortedInfo: column,
              parameters: {
                ...prevState.parameters,
                sort: [{
                  field: column.field === "mt102LoadStatus.text" ? "mt102LoadStatus" : column.field,
                  "desc": column.order === "descend"
                }]
              }
            }), () => {
              this.loadGridData();
            });
          }}
          actionExport={() => this.exportToExcel()}
          // extraButtons={extraButtons}
          addonButtons={[addonButtons, delButtons, importButtons]}
          onSelectRow={(record, index) => {
            console.log(record);
            this.setState({
              selectedRecord: record
            });
            //this.selectedRecord = record;
          }}
          onShowSizeChange={(pageNumber, pageSize) => this.onShowSizeChange(pageNumber, pageSize)}
          onRefresh={() => {
            this.loadGridData();
          }}
          onSearch={() => {
            this.filterPanelState();
          }}
          onSelectCheckboxChange={(selectedRowKeys) => {
            this.setState({
              selectedRowKeys: selectedRowKeys
            });
          }}
        />

      </Col>
    </Row>);
  };
}

export default connect(({ universal2, loading }) => ({
  universal2,
  loadingData: loading.effects["universal2/getList"]
}))(Consumer);
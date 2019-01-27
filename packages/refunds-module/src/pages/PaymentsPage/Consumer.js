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
      length: 15,
      entity: "specialList",
      filter: {},
      sort: []
    },
    filterForm: [

      {
        label: "ИИН",
        name: "iin",
        type: "text",
        withMax: 12
      }, {
        label: "Период",
        name: "_createDateTime",
        type: "listbetweenDate"
      }, {
        label: "Пользователь",
        name: "users.userName",
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
      }, {
        "title": "Пользователь",
        "dataIndex": "users.userName",
        "isVisible": "true"
      }, {
        "title": "Дата и время создания",
        "dataIndex": "createDateTime",
        "isVisible": "true"
      },
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
        // message.warning(msg.data.Message);
        Modal.error({
          title: "Внимание",
          content: msg.data.Message
        });
      });
  };

  exportToExcel = () => {

    let authToken = localStorage.getItem("AUTH_TOKEN");
    let columns = JSON.parse(localStorage.getItem("consumerPageColumns"));

    request("/api/refund/exportToExcel", {
      method: "POST",
      responseType: "blob",
      body: {
        "entityClass": "specialList",
        "fileName": "Сотрудники",
        "filter": this.state.parameters.filter,
        "columns": [
        ].concat(columns.filter(column => column.isVisible))
      },
      getResponse: (response) => {
        if (response.status === 200) {
          if (response.data && response.data.type)
            saveAs(new Blob([response.data], { type: response.data.type }), Guid.newGuid());
        }
      }
    });


    // fetch("/api/refund/exportToExcel",
    //   {
    //     headers: {
    //       "Content-Type": "application/json; charset=utf-8",
    //       Authorization: "Bearer " + authToken
    //     },
    //     method: "post",
    //     body: JSON.stringify({
    //       "entityClass": "Refund",
    //       "fileName": formatMessage({ id: "menu.refunds" }),
    //       "filter": this.state.pagingConfig.filter,
    //       "columns": [{
    //         "title": "Статус заявки на возврат",
    //         "dataIndex": "dappRefundStatusId.nameRu"
    //       }, {
    //         "dataIndex": "personSurname",
    //         "title": "Фамилия"
    //       }, {
    //         "dataIndex": "personFirstname",
    //         "title": "Имя"
    //       }, {
    //         "dataIndex": "personPatronname",
    //         "title": "Отчество"
    //       }].concat(columns.filter(column => column.isVisible))
    //     })
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
    formData.append("file", data.file);
    request("/api/refund/addSpecialList", {
      method: "POST",
      body: formData,
      getResponse: (response) => {
        if (response.status === 400) {
          // message.warning(response.data.Message);

          Modal.error({
            title: "Внимание",
            content: response.data.Message
          });
        }
        if (response.status === 200) {
          console.log(response)
          // message.info("Загружено: " + response.data.loadNewCount + " из: " + response.data.allItemCount);
          Modal.info({
            title: "Внимание",
            content: "Загружено: " + response.data.loadNewCount + " из: " + response.data.allItemCount
          });
        }
      }
    }).then(() => {
      this.loadGridData();
    });
  };

  uploadDelFile = (data) => {

    let formData = new FormData();
    formData.append("file", data.file);
    request("/api/refund/deleteSpecialList", {
      method: "POST",
      body: formData,
      getResponse: (response) => {
        if (response.status === 400) {
          // message.warning(response.data.Message);

          Modal.error({
            title: "Внимание",
            content: response.data.Message
          });
        }
        if (response.status === 200) {
          console.log(response)
          // message.info("Загружено: " + response.data.loadNewCount + " из: " + response.data.allItemCount);
          Modal.info({
            title: "Внимание",
            content: "Удалено: " + response.data.deleteCount + " из: " + response.data.allItemCount
          });
        }
      }
    }).then(() => {
      this.loadGridData();
    });
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


        request("/api/refund/addSpecialList/", {
          method: "POST",
          getResponse: (response) => {
            if (response.data && response.data.type)
              saveAs(new Blob([response.data], { type: response.data.type }), Guid.newGuid());
          }
        });

      },
      onChange: (file, fileList) => {
        if (file.status !== "removing") {
          this.uploadFile(file);
        }
      }
    };

    let uploadDelProps = {
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


        request("/api/refund/deleteSpecialList/", {
          method: "POST",
          getResponse: (response) => {
            if (response.data && response.data.type)
              saveAs(new Blob([response.data], { type: response.data.type }), Guid.newGuid());
          }
        });

      },
      onChange: (file, fileList) => {
        if (file.status !== "removing") {
          this.uploadDelFile(file);
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
    let deletButtons = [
      <Upload
        {...uploadDelProps}
        showUploadList={false}
        name="logo"
      >
        <Button>
          <Icon type="upload"/> Загрузить на удаление
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
            }}><Icon type="close"/></p>}
          >

            <Col span={18}>
              <Search
                placeholder="Введите ИИН"
                enterButton={"Сохранить"}
                size="large"
                maxLength={12}
                style={{ width: 600 }}
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
          name={'consumerPageColumns'}
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
            pageSize: this.state.parameters.length,
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
          addonButtons={[addonButtons, delButtons, importButtons,deletButtons]}
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
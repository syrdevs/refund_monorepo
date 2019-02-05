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
  Divider, Modal, LocaleProvider
} from "antd";

const { MonthPicker, WeekPicker } = DatePicker;
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
import ListBetWeenMonth from "../../components/GridFilter/betweenMonthPicker";


const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const dateFormat = "YYYY/MM/DD";
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 }
};

class Employees extends Component {

  state = {
    selectedRecord: null,
    parameters: {
      start: 0,
      length: 15,
      entity: "mt102",
      filter: { "iin": this.props.onSearch},
      "sort": [
        {
          "field": "paymentperiod",
          "desc": true
        }
      ],
      "group": [
        {
          "field": "senderBin"
        },
        {
          "field": "senderName"
        },
        {
          "field": "paymentperiod"
        },
        {
          "field": "knp"
        },
        {
          "field": "paymentsum",
          "needSum": true
        }
      ]
    },
    sortedInfo: {},
    selectedRowKeys: [],
    visibleAddConsumer: false,
    filterContainer: 0,
    columns: [
      {
        "title": "Период",
        "dataIndex": "paymentperiod",
        "isVisible": "true"
      }, {
        "title": "Плательщик (БИН/ИИН)",
        "dataIndex": "senderBin",
        "isVisible": "true"
      }, {
        "title": "Плательщик (Наименование/ФИО)",
        "dataIndex": "senderName",
        "isVisible": "true"
      }, {
        "title": "КНП",
        "dataIndex": "knp",
        "isVisible": "true"
      }, {
        "title": "Сумма",
        "dataIndex": "paymentsum",
        "isVisible": "true"
      }
    ]
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
      type: "universal2/getPayerList",
      payload: {
        ...this.state.parameters,
        start: current,
        length: pageSize,
        filter: {
          ...this.state.parameters.filter,
          iin: this.props.onSearch
        }
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
      type: "universal2/getPayerList",
      payload:    {
        ...this.state.parameters,
        filter: {
          ...this.state.parameters.filter,
          iin: this.props.onSearch
        }
      }
    });
  };

  componentDidMount() {
    this.loadGridData();
  }

  componentDidUpdate() {
    // this.loadGridData();
  }

  exportToExcel = () => {

    let authToken = localStorage.getItem("AUTH_TOKEN");
    let columns = JSON.parse(localStorage.getItem("EmployessPageColumns"));

    request("/api/refund/exportToExcel", {
      method: "POST",
      responseType: "blob",
      body: {
        "entityClass": "specialList",
        "fileName": "Сотрудники",
        "filter": this.state.parameters.filter,
        "columns": [].concat(columns.filter(column => column.isVisible))
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

  // handlePanelChange = (value, mode) => {
  //   this.setState({
  //     value,
  //     mode: [
  //       mode[0] === "date" ? "month" : mode[0],
  //       mode[1] === "date" ? "month" : mode[1]
  //     ]
  //   });
  // };

  render = () => {
    // if(this.props.onSearch){
    //   this.setState((prevState) => ({
    //     filters: {
    //       ...prevState.filters,
    //      iin : this.props.onSearch,
    //     },
    //   }), () => {
    //     this.loadGridData();
    //   });
    // }
    const dt = moment(new Date()).format("DD.MM.YYYY");
    const paymentsData = Array.isArray(this.props.universal2.getPayerList[this.state.parameters.entity]) ? this.props.universal2.getPayerList[this.state.parameters.entity] : [];

    console.log(paymentsData);
    const { value, mode } = this.state;

    let addonButtons = [<Button
      onClick={() => {
        this.setState({
          visibleAddConsumer: true
        });
      }}>
      Добавить</Button>];
    // let extraButtons = [<span key={"total-count"} style={{
    //   color: "#002140",
    //   fontSize: "12px",
    //   paddingLeft: "10px"
    // }}>{formatMessage({ id: "system.totalAmount" })}: {paymentsData.totalSum ? paymentsData.totalSum.totalAmount ? paymentsData.totalSum.totalAmount : paymentsData.totalSum.paymentsum : 0} /</span>];

    return (<Row>

      <Card bodyStyle={{ padding: 5 }} style={{ marginTop: "40px" }}>
        <Row type="flex" justify="center">
          <Col>
            <Card bodyStyle={{ padding: 5 }}>
              {/*<RangePicker*/}
              {/*defaultValue={[moment(dt, 'DD.MM.YYYY'), moment(dt, 'DD.MM.YYYY')]}*/}
              {/*placeholder={[formatMessage({id: 'datepicker.start.label'}), formatMessage({id: 'datepicker.end.label'})]}*/}
              {/*format="YYYY-MM"*/}
              {/*value={value}*/}
              {/*mode={mode}*/}
              {/*onPanelChange={this.handlePanelChange}*/}
              {/*onChange={(date, dateString) => {*/}
              {/*this.setState((prevState) => ({*/}
              {/*filters: {*/}
              {/*...prevState.filters,*/}
              {/*dateValues: dateString,*/}
              {/*},*/}
              {/*}));*/}
              {/*}}/>*/}
              {/*<MonthPicker/>*/}
              {/*// format={"MM.YYYY"}*/}
              {/*// onChange={(moment, dateString) => {*/}
              {/*// this.setState({*/}
              {/*// parameters: {*/}
              {/*// ...this.state.parameters,*/}
              {/*// filter: { ...this.state.parameters.filter ,paymentperiod: dateString.toString().length <= 1 ? null : dateString.replace(".", "")},*/}
              {/*// }*/}
              {/*// });*/}
              {/*// this.setState((parameters) => ({*/}
              {/*//   filter: {*/}
              {/*//     ...parameters.filter,*/}
              {/*//     paymentperiod: dateString.toString().length <= 1 ? null : dateString.replace(".", "")*/}
              {/*//   }*/}
              {/*// }));*/}
              {/*}}*/}
              {/*/>*/}
              <div style={{ float: "left", padding: "5px" }}>
                <ListBetWeenMonth
                  RangeDateProps={{
                    format: "MM.YYYY"
                  }}
                  filterItem={{}}
                  field={{}}
                  onChange={(value) => {
                    this.setState({
                      parameters: {
                        ...this.state.parameters,
                        filter: {
                          ...this.state.parameters.filter,
                          paymentperiod: {
                            from: "01." + value[0],
                            to: "01." + value[1]
                          }
                        }
                      }
                    });
                  }}/>
              </div>
              <Button style={{ margin: "5px", marginLeft: "-20px" }} onClick={() => {
                this.loadGridData();
              }
              }>{formatMessage({ id: "button.apply" })}</Button>

            </Card>
          </Col>
        </Row>
      </Card>
      <Col sm={24} md={this.state.filterContainer !== 6 ? 24 : 18}>

        <SmartGridView
          name={"EmployessPageColumns"}
          // scroll={{ x: "auto" }}
          fixedBody={true}
          hideFilterBtn={true}
          actionColumns={[]}
          showTotal={true}
          // selectedRowCheckBox={true}
          // searchButton={false}
          // selectedRowKeys={this.state.selectedRowKeys}
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
          // showExportBtn={true}
          dataSource={{
            total: paymentsData.length,
            pageSize: 100,
            page: this.state.parameters.start + 1,
            data: paymentsData
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
          // addonButtons={addonButtons}
          // onSelectRow={(record, index) => {
          //   console.log(record);
          //   this.setState({
          //     selectedRecord: record
          //   });
          //   //this.selectedRecord = record;
          // }}
          onShowSizeChange={(pageNumber, pageSize) => this.onShowSizeChange(pageNumber, pageSize)}
          onRefresh={() => {
            this.loadGridData();
          }}
          // onSearch={() => {
          //   this.filterPanelState();
          // }}
          // onSelectCheckboxChange={(selectedRowKeys) => {
          //   this.setState({
          //     selectedRowKeys: selectedRowKeys
          //   });
          // }}
        />

      </Col>
    </Row>);
  };
}

export default connect(({ universal, loading }) => ({
  universal,
  loadingData: loading.effects["universal/paymentsData"]
}))(Employees);
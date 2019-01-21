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
  Divider, Modal
} from "antd";

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

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const TabPane = Tabs.TabPane;
const dateFormat = "YYYY/MM/DD";
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 }
};

class Employees extends Component {

  state = {
    mode: ['month', 'month'],
    value: [],
    selectedRecord: null,
    parameters: {
      start: 0,
      length: 10,
      entity: "mt100",
      filter: {},
      sort: []
    },
    sortedInfo: {},
    selectedRowKeys: [],
    visibleAddConsumer: false,
    filterContainer: 0,
    columns: [
      {
        "title": "Период (с)",
        "dataIndex": "iin",
        "isVisible": "true"
      }, {
        "title": "Период (по)",
        "dataIndex": "lastname",
        "isVisible": "true"
      }, {
        "title": "Плательщик (БИН/ИИН)",
        "dataIndex": "recipientBin",
        "isVisible": "true"
      }, {
        "title": "Плательщик (Наименование/ФИО)",
        "dataIndex": "recipientName",
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
      type: "universal/paymentsData",
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
      type: "universal/paymentsData",
      payload: this.state.parameters
    });
  };

  componentDidMount() {
    this.loadGridData();
  }

  exportToExcel = () => {
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

  handlePanelChange = (value, mode) => {
    this.setState({
      value,
      mode: [
        mode[0] === 'date' ? 'month' : mode[0],
        mode[1] === 'date' ? 'month' : mode[1],
      ],
    });
  }

  render = () => {
    const dt = moment(new Date()).format('DD.MM.YYYY');
    const paymentsData = this.props.universal.paymentsData[this.state.parameters.entity];
    const { value, mode } = this.state;

    let addonButtons = [<Button
      onClick={() => {
        this.setState({
          visibleAddConsumer: true
        });
      }}>
      Добавить</Button>];
    let extraButtons = [<span key={"total-count"} style={{
      color: "#002140",
      fontSize: "12px",
      paddingLeft: "10px"
    }}>{formatMessage({ id: "system.totalAmount" })}: {paymentsData.totalSum ? paymentsData.totalSum.totalAmount ? paymentsData.totalSum.totalAmount : paymentsData.totalSum.paymentsum : 0} /</span>];

    return (<Row>

      <Card bodyStyle={{padding: 5}} style={{marginTop: '40px',}}>
        <Row type="flex" justify="center">
          <Col>
            <Card bodyStyle={{padding: 5}}>
              <RangePicker
                defaultValue={[moment(dt, 'DD.MM.YYYY'), moment(dt, 'DD.MM.YYYY')]}
                placeholder={[formatMessage({id: 'datepicker.start.label'}), formatMessage({id: 'datepicker.end.label'})]}
                format="YYYY-MM"
                value={value}
                mode={mode}
                onPanelChange={this.handlePanelChange}
                onChange={(date, dateString) => {
                  this.setState((prevState) => ({
                    filters: {
                      ...prevState.filters,
                      dateValues: dateString,
                    },
                  }));
                }}/>
              <Button style={{margin: '10px'}} onClick={() => {
                this.loadGridData();
              }
              }>{formatMessage({id: 'button.apply'})}</Button>
            </Card>
          </Col>
        </Row>
      </Card>
      <Col sm={24} md={this.state.filterContainer !== 6 ? 24 : 18}>

        <SmartGridView
          // name={'paymentspagemt100columns'}
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
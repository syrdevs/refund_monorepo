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
  Divider
} from "antd";
import { Animated } from "react-animated-css";
import formatMessage from "../../utils/formatMessage";
import connect from "../../Redux/";
import SmartGridView from "../../components/SmartGridView";
import GridFilter from "../../components/GridFilter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons/index";
import DropDownAction from "../../components/DropDownAction";
import request from "../../utils/request";
import saveAs from "file-saver";
import Guid from "../../utils/Guid";

const dateFormat = "DD.MM.YYYY";

class Debutors extends Component {
  constructor(props) {
    super(props);

    this.state = {

      selectedRowKeys: [],
      sortedInfo: {},

      pagingConfig: {
        "start": 0,
        "length": 15,
        "entity": "debtorsIinList",
        "alias": "list",
        "filter": {},
        "sort": []
      },
      filterContainer: 0,

      mainGridFilterForm: this.getFilterForm(),
      mainGridColumns: this.getColumns()
    };
  }

  componentDidMount() {
    this.loadGridData();
  }

  componentWillUnmount() {

  }

  getFilterForm = () => {
    return [{
      name: "_deptPeriods",
      label: "Период",
      type: "betweenMonthPicker",
      clearBtn: true
    }, {
      name: "iin",
      label: "ИИН",
      type: "text"
    }, {
      label: "Фамилия",
      name: "lastName",
      type: "text",
      params: {
        upperCase: true
      }
    }, {
      label: "Имя",
      name: "firstName",
      type: "text",
      params: {
        upperCase: true
      }
    }, {
      label: "Отчество",
      name: "patronymic",
      type: "text",
      params: {
        upperCase: true
      }
    }, {
      label: "Дата рождения",
      filterName: "birthdate",
      type: "date"
    }];
  };

  getColumns = () => {
    return [
      {
        "title": "ИИН",
        "dataIndex": "iin",
        "isVisible": "true"
      }, {
        "title": "Фамилия",
        "dataIndex": "lastName",
        "isVisible": "true"
      }, {
        "title": "Имя",
        "dataIndex": "firstName",
        "isVisible": "true"
      }, {
        "title": "Отчество",
        "dataIndex": "patronymic",
        "isVisible": "true"
      }, {
        "title": "Дата рождения",
        "dataIndex": "birthdate",
        "isVisible": "true"
      }, {
        "title": "Период(ы)",
        "dataIndex": "deptPeriods",
        "isVisible": "true"
      }
    ];
  };

  filterPanelState = () => {
    this.setState(({ filterContainer }) => ({
      filterContainer: filterContainer === 6 ? 0 : 6
    }));
  };

  onShowSizeChange = (current, pageSize) => {
    const { dispatch } = this.props;
    this.setState(prevState => ({
      pagingConfig: {
        ...prevState.pagingConfig,
        start: current,
        length: pageSize
      }
    }), () => dispatch({
      type: "universal2/getList",
      payload: {
        ...this.state.pagingConfig,
        start: current,
        length: pageSize
      }
    }));
  };

  loadGridData = () => {
    this.props.dispatch({
      type: "universal2/getList",
      payload: this.state.pagingConfig
    });
  };

  applyFilter = (filter) => {
    const { dispatch } = this.props;

    if (filter["_deptPeriods"]) {
      filter["_deptPeriods"].from = "01." + filter["_deptPeriods"].from;
      filter["_deptPeriods"].to = "01." + filter["_deptPeriods"].to;
    }

    this.setState({
      sortedInfo: {},
      pagingConfig: {
        ...this.state.pagingConfig,
        start: 0,
        length: 15,
        filter: { ...filter },
        sort: []
      }
    }, () => {
      dispatch({
        type: "universal2/getList",
        payload: {
          ...this.state.pagingConfig,
          start: 0,
          length: 15
        }
      });
    });
  };

  clearFilter = () => {
    this.setState({
      sortedInfo: {},
      pagingConfig: {
        ...this.state.pagingConfig,
        start: 0,
        length: 15,
        filter: {},
        sort: []
      }
    }, () => {
      this.loadGridData();
    });
  };

  exportToExcel = () => {
console.log("test")
    let authToken = localStorage.getItem("AUTH_TOKEN");
    let columns = JSON.parse(localStorage.getItem("Refunds.Payments.Debutors"));

    request("/api/refund/exportToExcel", {
      method: "POST",
      responseType: "blob",
      body: {
        "entityClass": "debtorsIinList",
        "fileName": "Реестр должников",
        "filter": this.state.pagingConfig.filter,
        "columns": [].concat(columns.filter(column => column.isVisible))
      },
      getResponse: (response) => {
        if (response.status === 200) {
          if (response.data && response.data.type)
            saveAs(new Blob([response.data], { type: response.data.type }), Guid.newGuid());
        }
      }
    });
  }

  render = () => {

    const storeData = this.props.universal2.references["debtorsIinList"] ? this.props.universal2.references["debtorsIinList"] : {};

    let addonButtons = [];

    addonButtons.push(<DropDownAction
      key={"dropdown_btn"}
      disabled={this.state.selectedRowKeys.length === 0}
      contractId={this.state.selectedRowKeys}
      entity={"debtorsList"}
      type={2}
    />);

    return (<Row>
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
              clearFilter={(pageNumber) => this.clearFilter(pageNumber)}
              applyFilter={(filter) => this.applyFilter(filter)} key={"1"}
              filterForm={this.state.mainGridFilterForm}
              dateFormat={dateFormat}/>
          </Card>
        </Animated>

      </Col>
      <Col sm={24} md={this.state.filterContainer !== 6 ? 24 : 18}>

        <SmartGridView
          name={"Refunds.Payments.Debutors"}
          scroll={{ x: "auto" }}
          fixedBody={true}
          actionColumns={[]}
          showTotal={true}
          showExportBtn={true}
          selectedRowCheckBox={true}
          searchButton={false}
          selectedRowKeys={this.state.selectedRowKeys}
          rowKey={"id"}
          fixedHeader={true}
          addonButtons={addonButtons}
          // rowSelection={true}
          columns={this.state.mainGridColumns}
          sorted={true}
          sortedInfo={this.state.sortedInfo}
          actionExport={() =>{this.exportToExcel()}}
          dataSource={{
            total: storeData.totalElements,
            pageSize: this.state.pagingConfig.length,
            page: this.state.pagingConfig.start + 1,
            data: storeData.content
          }}
          onSort={(column) => {

            if (Object.keys(column).length === 0) {
              this.setState(prevState => ({
                pagingConfig: {
                  ...prevState.pagingConfig,
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
              pagingConfig: {
                ...prevState.pagingConfig,
                sort: [{
                  field: column.field,
                  "desc": column.order === "descend"
                }]
              }
            }), () => {
              this.loadGridData();
            });
          }}
          onSelectRow={(record, index) => {

          }}
          onShowSizeChange={(pageNumber, pageSize) => this.onShowSizeChange(pageNumber, pageSize)}
          onRefresh={() => {
            this.loadGridData();
          }}
          onSearch={this.filterPanelState}
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


export default connect(({ universal2 }) => ({
  universal2
}))(Debutors);
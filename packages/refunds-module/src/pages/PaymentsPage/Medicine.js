import React, { Component } from "react";
import {
  Card,
  Tabs,
  Icon,
  Label,
  Row,
  Col,
  Spin
} from "antd";

import saveAs from "file-saver";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import SmartGridView from "../../components/SmartGridView";
import connect from "../../Redux";
import formatMessage from "../../utils/formatMessage";
import GridFilter from "../../components/GridFilter";
import { Animated } from "react-animated-css";
import request from "../../utils/request";
import Guid from "../../utils/Guid";

const TabPane = Tabs.TabPane;
const dateFormat = "YYYY/MM/DD";


class Medicine extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortedInfo: {},
      fcolumn: [
      ],
      columns: [
        {
          "title": "Наименование СЗ",
          "dataIndex": "name",
          "width": 200,
          "isVisible": true
        },
        {
          "title": "БИН/ИИН СЗ",
          "dataIndex": "iin",
          "width": 200,
          "isVisible": true
        },
        {
          "title": "Регион СЗ",
          "dataIndex": "region",
          "width": 200,
          "isVisible": true
        },
        {
          "title": "Наименование медицинской услуги",
          "dataIndex": "medname",
          "width": 200,
          "isVisible": true
        },
        {
          "title": "Форма и вид медицинской помощи",
          "width": 200,
          "dataIndex": "formtype",
          "isVisible": true
        },
        {
          "title": "Стоимость медицинской услуги",
          "width": 200,
          "dataIndex": "summ",
          "isVisible": true
        },
        {
          "title": "Факт оплаты",
          "width": 200,
          "dataIndex": "payFact",
        },
        {
          "title": "Дата начала лечения/оказания услуги",
          "width": 200,
          "dataIndex": "typeStartDate",
        },
        {
          "title": "Дата окончания лечения/оказания услуги",
          "width": 200,
          "dataIndex": "typeEndDate",
        },
        {
          "title": "Диагноз",
          "width": 200,
          "dataIndex": "diagnoz",
        },
        {
          "title": "Результат обращения",
          "width": 200,
          "dataIndex": "askResult",
        },
        {
          "title": "Исход заболевания",
          "width": 200,
          "dataIndex": "result",
        },
        {
          "title": "Врач",
          "width": 200,
          "dataIndex": "medPerson",
        },
      ],
      filterContainer: 0,
      searchButton: false,
      filterForm: [
        {
          name:"refundId.mt102Id",
          label: "Наименование СЗ",
          type: "text"
        },
        {
          name:"refundId.mt102Id",
          label: "БИН/ИИН СЗ",
          type: "text"
        },
        {
          label:"Регион СЗ",
          name: "dappRefundStatus",
          type: "text"
        },
        {
          name:"refundId.mt102Id",
          label: "Наименование медицинской услуги;",
          type: "text"
        },
        {
          name:"refundId.mt102Id",
          label: "Форма и вид медицинской помощи",
          type: "text"
        },
        {
          name:"refundId.mt102Id",
          label: "Стоимость медицинской услуги",
          type: "text"
        },
        {
          label:"Факт оплаты",
          name: "dappRefundStatus",
          type: "text"
        },
        {
          name: "refundId.gcvpOrderDate",
          label: "Дата начала услуги",
          type: "listbetweenDate"
        },
        {
          name: "refundId.gcvpOrderDate",
          label: "Дата окончание услуги",
          type: "listbetweenDate"
        },
        {
          label:"Диагноз",
          name: "dappRefundStatus",
          type: "text"
        },
        {
          name:"refundId.mt102Id",
          label: "Результат обращения",
          type: "text"
        },
        {
          name:"refundId.mt102Id",
          label: "Исход заболевания",
          type: "text"
        },
        {
          name:"refundId.mt102Id",
          label: "Врач",
          type: "text"
        },
      ],
      pagingConfig: {
        "start": 0,
        "length": 15,
        "entity": "refund_history",
        "filter": {},
        "sort": []
      }
    };
  }

  componentWillUnmount() {
  }

  clearFilter = () => {
    this.setState({
      pagingConfig: {
        "start": 0,
        "length": 15,
        "entity": "refund_history",
        "filter": {},
        "sort": []
      }
    }, () => {
      this.loadMainGridData();
    });
  };

  setFilter = (filters) => {

    this.setState({
      pagingConfig: {
        "start": 0,
        "length": this.state.pagingConfig.length,
        "entity": "refund_history",
        "filter": filters,
        "sort": []
      }
    }, () => {
      this.loadMainGridData();
    });


  };

  loadMainGridData = () => {

  };

  exportToExcel = () => {


  };


  componentDidMount() {
    this.loadMainGridData();
  }

  onShowSizeChange = (current, pageSize) => {

  };

  refreshTable = () => {
    this.loadMainGridData();
  };

  filterPanelState = () => {
    this.setState(({ filterContainer }) => ({
      searchButton: filterContainer == 6 ? 0 : 6,
      filterContainer: filterContainer == 6 ? 0 : 6
    }));
  };

  render() {
    const { universal2 } = this.props;
    const refundHistory = universal2.references[this.state.pagingConfig.entity];

    const { dataStore, columns } = this.props.universal2;

    const DataDiv = () => (
      <SmartGridView
        name={"MedicinePageColumns"}
        searchButton={this.state.searchButton}
        fixedBody={true}
        rowKey={"id"}
        loading={false}
        fixedHeader={true}
        rowSelection={true}
        columns={this.state.columns}
        actionColumns={this.state.fcolumn}
        sorted={true}
        sortedInfo={this.state.sortedInfo}
        showTotal={true}
        showExportBtn
        actionExport={() => this.exportToExcel()}
        dataSource={{
          total:  0,
          pageSize: this.state.pagingConfig.length,
          page: 1,
          data: []
        }}
        onShowSizeChange={(pageNumber, pageSize) => this.onShowSizeChange(pageNumber, pageSize)}
        onRefresh={() => {
          this.refreshTable();
        }}
        onSort={(column) => {
        }}
        onSearch={() => {
          this.filterPanelState();
        }}
      />
    );

    return (
      <div>
        <Card bodyStyle={{ padding: 5 }}>
              <Row>
                <Col xs={this.state.filterContainer !== 6 ? 0 : 24} sm={this.state.filterContainer !== 6 ? 0 : 24}
                     md={this.state.filterContainer}>
                  <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
                    <Card
                      headStyle={{
                        padding: "0 14px"
                      }}
                      style={{ margin: "0px 5px 10px 0px", borderRadius: "5px" }}
                      type="inner"
                      title={formatMessage({ id: "system.filter" })}
                      extra={<Icon style={{ "cursor": "pointer" }} onClick={this.filterPanelState}><FontAwesomeIcon
                        icon={faTimes}/></Icon>}
                    >
                      <GridFilter clearFilter={this.clearFilter} applyFilter={this.setFilter} key={"1"}
                                  filterForm={this.state.filterForm}
                                  dateFormat={dateFormat}/>
                    </Card>
                  </Animated>

                </Col>
                <Col xs={24} sm={this.state.filterContainer !== 6 ? 0 : 24}
                     md={this.state.filterContainer !== 6 ? 24 : 18}>
                  <DataDiv/>
                </Col>
              </Row>
        </Card>
        <br/>
      </div>);
  }

}

export default connect(({ universal2, loading }) => ({
  universal2,
  loadingData: loading.effects["universal2/getList"]
}))(Medicine);

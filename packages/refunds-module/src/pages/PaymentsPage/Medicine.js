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
          "title": "Дата и время",
          "dataIndex": "entryDate",
          "width": 200,
          "isVisible": true
        }, {
          "title": "Номер заявки",
          "dataIndex": "refundId.applicationId.appNumber",
          "width": 200,
          "isVisible": true
        }, {
          "title": "Референс ГК",
          "dataIndex": "refundId.gcvpReference",
          "width": 200,
          "isVisible": true
        }, {
          "title": "Номер ПП ГК",
          "dataIndex": "refundId.gcvpOrderNum",
          "width": 200,
          "isVisible": true
        }, {
          "title": "Дата ПП ГК",
          "width": 200,
          "dataIndex": "refundId.gcvpOrderDate",
          "isVisible": true
        },
        {
          "title": "Действие",
          "width": 200,
          "dataIndex": "dactionId.nameRu"
        },
        {
          "title": "Действие(до)",
          "width": 200,
          "dataIndex": "prev_dactionId.nameRu"
        },
        {
          "title": "Пользователь",
          "width": 200,
          "dataIndex": "userId.userName"
        },
        {
          "title": "ID платежа",
          "width": 200,
          "dataIndex": "refundId.mt102Id",
          "isVisible": true
        }
      ],
      filterContainer: 0,
      searchButton: false,
      filterForm: [
        {
          name: "entryDate",
          label: "Дата и время",
          type: "listbetweenDate"
        }, {
          name: "appNumber",
          label: "Номер заявки",
          type: "text"
        }, {
          name: "gcvpReference",
          label: "Референс ГК",
          type: "text"
        }, {
          name: "gcvpOrderNum",
          label: "Номер ПП ГК",
          type: "text"
        }, {
          name: "refundId.gcvpOrderDate",
          label: "Дата ПП ГК",
          type: "listbetweenDate"
        }, {
          name: "dappRefundStatus",
          label: "Действие",
          type: "multibox"
        },
        {
          name:"refundId.mt102Id",
          label: "ID платежа",
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
        name={"journalPageColumns"}
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

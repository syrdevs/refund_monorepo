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
import numberWithSpaces from "../../utils/numberFormat";

const TabPane = Tabs.TabPane;
const dateFormat = "YYYY/MM/DD";


class Medicine extends Component {
  constructor(props) {
    super(props);

    this.state = {
      personiin:{},
      sortedInfo: {},      
      fcolumn: [{
        "title": "Стоимость медицинской услуги",
        "dataIndex": "recordSum",
        "isVisible": "true",
        render: (value) => {
          if (value) {
            return numberWithSpaces(value);
          }

          return "";
        }
      }],
      columns: [
        {
          "title": "Наименование СЗ",
          "dataIndex": "clinic.name",
          "width": 200,
          "isVisible": true
        },
        {
          "title": "БИН/ИИН СЗ",
          "dataIndex": "clinic.bin",
          "width": 200,
          "isVisible": true
        },
        {
          "title": "Регион СЗ",
          "dataIndex": "clinic.region.nameRu",
          "width": 200,
          "isVisible": true
        },
        {
          "title": "Наименование медицинской услуги",
          "dataIndex": "activityMeasureUnit.displayName",
          "width": 200,
          "isVisible": true
        },
        {
          "title": "Количество",
          "width": 200,
          "dataIndex": "value",
          "isVisible": true
        },
        // {
        //   "title": "Стоимость медицинской услуги",
        //   "width": 200,
        //   "dataIndex": "recordSum",
        //   "isVisible": true
        // },
        {
          "title": "Факт оплаты",
          "width": 200,
          "dataIndex": "payFact",
        },
        {
          "title": "Дата начала лечения/оказания услуги",
          "width": 200,
          "dataIndex": "dateBegin",
        },
        {
          "title": "Дата окончания лечения/оказания услуги",
          "width": 200,
          "dataIndex": "dateEnd",
        },
        {
          "title": "Диагноз",
          "width": 200,
          "dataIndex": "diagnosis",
        }
        /*
        ,
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
        */
      ],
      filterContainer: 0,
      searchButton: false,
      filterForm: [
        {
          name:"clinic.name",
          label: "Наименование СЗ",
          type: "textlike"
        },
        {
          name:"clinic.bin",
          label: "БИН/ИИН СЗ",
          type: "numberInput",
          withMax: 12
        },
        {
          label:"Регион СЗ",
          name: "clinic.region.nameRu",
          type: "textlike"
        },
        {
          name:"activityMeasureUnit.activity.name",
          label: "Наименование медицинской услуги;",
          type: "textlike"
        },
        {
          label:"Факт оплаты",
          name: "payFact",
          type: "checkbox"
        },
        {
          name: "dateBegin",
          label: "Дата начала услуги",
          type: "listbetweenDate"
        },
        {
          name: "dateEnd",
          label: "Дата окончание услуги",
          type: "listbetweenDate"
        },
        {
          label:"Диагноз",
          name: "diagnosis",
          type: "textlike"
        }
      ],
      pagingConfig: {
        start: 0,
        length: 15,
        entity: "medicalRecordMain",
        alias: "forView",
        filter: {},
        sort: [
          {
            "field": "createDate",
            "desc": true
          }
        ]  
      }
    };
  }

  componentWillUnmount() {
  }

  clearFilter = () => {
    this.setState({
      pagingConfig: {
        start: 0,
        length: 15,
        entity: "medicalRecordMain",
        alias: "forView",
        filter: { "person.iin": this.props.personiin},
        sort: [
          {
            "field": "createDate",
            "desc": true
          }
        ] , 
      }
    }, () => {
      this.loadMainGridData();
    });
  };

  setFilter = (filters) => {

    this.setState({
      pagingConfig: {
        start: 0,
        entity: "medicalRecordMain",
        alias: "forView",
        "length": this.state.pagingConfig.length,       
        filter: {
          ...filters,
          "person.iin": this.props.personiin
        },
        sort: [
          {
            "field": "createDate",
            "desc": true
          }
        ]  
      }
    }, () => {
      this.loadMainGridData();
    });


  };

  loadMainGridData = () => {
    const { dispatch } = this.props;


    //let sortField = this.state.sortedInfo;
    dispatch({
      type: "universal2/getList",
      payload:    {
        ...this.state.pagingConfig,
        filter: {
          ...this.state.pagingConfig.filter,
          "person.iin": this.props.personiin
        },
        sort:[...this.state.pagingConfig.sort],
      }
    });
  };

  exportToExcel = () => {
    request("/api/refund/exportToExcel", {
      responseType: "blob",
      method: "post",
      body: {
        "entityClass": this.state.pagingConfig.entity,
        "fileName": this.props.personiin,
        "src": {
          "searched": true,
          "data": this.state.pagingConfig.filter
        },
        "columns":  JSON.parse(localStorage.getItem("MedicinePageColumns")).filter(item => item.isVisible === "true" || item.isVisible === true) 
      },
      getResponse: (response) => {
        if (response.status === 200) {
          if (response.data && response.data.type)
            saveAs(new Blob([response.data], { type: response.data.type }), Guid.newGuid());
        }
      }
    });

  };


  componentDidMount() {
    this.loadMainGridData();
    this.props.eventManager.subscribe("employeesRefreshGuid", (params) => {
      this.loadMainGridData();
    });
  }

  onShowSizeChange = (current, pageSize) => {
    const { dispatch } = this.props;
    this.setState(prevState => ({
      pagingConfig: {
        ...prevState.pagingConfig,
        filter: {
          ...prevState.pagingConfig.filter,
          personiin: this.props.personiin
        },
        sort:[...prevState.pagingConfig.sort],
        start: current,
        length: pageSize
      }
    }), () => dispatch({
      
        type: "universal2/getList",
        payload:    {
          ...this.state.pagingConfig,
          filter: {
            ...this.state.pagingConfig.filter,
            personiin: this.props.personiin
          },
          sort:[...this.state.pagingConfig.sort]
        }
      
    }));
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
    const dataStore = universal2.references[this.state.pagingConfig.entity];

    const {columns } = this.props.universal2;

    const DataDiv = () => (
      <SmartGridView
        scroll={{ x: "auto" }}
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
          total:  dataStore && dataStore.totalPages ? dataStore.totalPages:0,
          pageSize: this.state.pagingConfig.length,
          page: this.state.pagingConfig.start + 1,
          data: dataStore ? dataStore.content:[]
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

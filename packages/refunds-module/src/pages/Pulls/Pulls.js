import React, { Component } from "react";
import { Card, Label, Row, Col, Input, Button, Table, Tabs, Spin, Avatar, Menu, Dropdown, Icon, Badge, Collapse, Radio, Modal } from "antd";
import connect from "../../Redux";
import hasRole from "../../utils/hasRole";
import formatMessage from "../../utils/formatMessage";
import SmartGridView from "../../components/SmartGridView";
import PullFilter from "./PullFilter";
import ExecuteModal from "./ExecuteModal";
import ApproveModal from "./ApproveModal";
import SignModal from "./SignModal";


const { Meta } = Card;
const Panel = Collapse.Panel;
const Search = Input.Search;

class Pulls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      fcolumn: [
        {
          title: formatMessage({ id: "menu.mainview.fio" }),
          order: 3,
          key: "fio",
          isVisible: true,
          width: 150,
          render: (item) => {
            return item.personSurname + " " + item.personFirstname + " " + item.personPatronname;
          }
        }, {
          "title": "Статус заявки на возврат",
          isVisible: true,
          "dataIndex": "dappRefundStatusId.nameRu ",
          order: 7,
          render: (record, value) => <a
        style={{ color: this.setColor(value.isRefundConfirm) }}//value.isRefundConfirm ? 'green' : 'red' }}
    href="#"> <span><Badge
    status={this.setBadgeStatus(value.isRefundConfirm)}/></span> {value.dappRefundStatusId ? value.dappRefundStatusId.nameRu : null}
    </a>
  }],
    columns: [
      {
        "title": "Номер заявки",
        "isVisible": true,
        "dataIndex": "applicationId.appNumber"
      }, {
        "title": "Дата заявления плательщика",
        "isVisible": true,
        "dataIndex": "appPayerDate"
      }, {
        "title": "Дата заявки",
        "isVisible": true,
        "dataIndex": "applicationId.appDate"
      }, {
        "title": "Дата поступления заявления в Фонд",
        "isVisible": true,
        "dataIndex": "receiptAppdateToFsms"
      }, {
        "title": "Дата поступление заявки на возврат",
        "isVisible": true,
        "dataIndex": "entryDate"
      }, {
        "title": "Дата исполнения заявки",
        "isVisible": true,
        "dataIndex": "appEndDate"
      },
      {
        "title": "Сумма возврата",
        "isVisible": true,
        "dataIndex": "refundPayAmount"

      },
      {
        "title": "Референс ГК",
        "isVisible": true,
        "dataIndex": "gcvpReference"
      }, {
        "title": "Номер плат-го поручения ГК",
        "isVisible": true,
        "dataIndex": "gcvpOrderNum"
      }, { "title": "Дата плат-го поручения ГК", "dataIndex": "gcvpOrderDate" }, {
        "title": "Причина возврата",
        "dataIndex": "drefundReasonId.nameRu"
      }, { "title": "ИИН Потребителя", "dataIndex": "personIin" }, {
        "title": "КНП",
        "dataIndex": "applicationId.dknpId.code"
      }, {
        "title": "Номер платежного поручения",
        "dataIndex": "applicationId.payOrderNum"
      }, {
        "title": "Дата платежного поручения",
        "dataIndex": "applicationId.payOrderDate"
      }, { "title": "Сумма отчислений", "dataIndex": "payAmount" }, {
        "title": "Дата последнего взноса",
        "dataIndex": "lastPayDate"
      }, {
        "title": "Дата осуществления возврата",
        "dataIndex": "refundDate"
      }, {
        "title": "Кол-во отчислений и (или) взносов за последние 12 календарных месяцев",
        "dataIndex": "lastMedcarePayCount"
      }, { "title": "Статус страхования", "dataIndex": "medinsStatus" }, {
        "title": "Референс",
        "dataIndex": "applicationId.reference"
      }, { "title": "Причина отказа", "dataIndex": "ddenyReasonId.nameRu" }, {
        "title": "Отчет об отказе",
        "dataIndex": "refundStatus"
      }, { "title": "Осталось дней", "dataIndex": "daysLeft" }, {
        "title": "Дата изменения статуса заявки",
        "dataIndex": "changeDate"
      }, { "title": "Период", "dataIndex": "payPeriod" }, {
        "title": "Веб-сервис (сообщение) ",
        "dataIndex": "wsStatusMessage"
      }],
      data: [],
      xsize: "auto",
      pagingConfig: {
      "entity": "Refund",
        "start": 0,
        "length": 15,
        "sort": [],
        "filter": {}
    }
  };
  }

  componentDidMount() {
    this.loadMainGridData();
  }

  loadMainGridData = () => {
    const { dispatch } = this.props;
    dispatch({
      type: "universal2/getList",
      payload: this.state.pagingConfig
    });
  };
  onShowSizeChange = (current, pageSize) => {
    const max = current * pageSize;
    const min = max - pageSize;
    const { dispatch } = this.props;
    dispatch({
      type: "universal2/getList",
      payload: {
        ...this.state.pagingConfig,
        start: current,
        length: pageSize
      }
    });
  };
  setColor = (value) => {
    return "#000000a6";
  };
  setBadgeStatus = (value) => {
    if (value) {
      return "success";
    } else if (value === undefined) {
      return "default";
    } else {
      return "error";
    }
  };



  confirming = () => {
    Modal.confirm({
      title: 'Подтвердить',
      content: 'Подтверждаете что надо подтвердить подтверждение?',
      okText: 'Подтвердить',
      cancelText: 'Отмена',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  rejecting= () => {
    Modal.confirm({
      title: 'Отклонить',
      content: 'Подтверждаете что надо отклонить отклонение?',
      okText: 'Подтвердить',
      cancelText: 'Отмена',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  render() {
    const universal = {
      table: this.props.universal2.references[this.state.pagingConfig.entity] ? this.props.universal2.references[this.state.pagingConfig.entity] : {}
    };
    return (
      <Card bodyStyle={{ padding: 5 }} style={{ width: "100%" }}>
  <p style={{ margin: "10px" }}>Пулы возвратов: 3</p>
    <Row>
    <Col span={7} style={{marginLeft:'10px'}}>

    </Col>
    <Col span={16} style={{marginLeft:'10px'}}>
  <PullFilter/>
    <SmartGridView
    name={"PullPageColumns"}
    scroll={{ x: this.state.xsize }}
    selectedRowCheckBox={true}
    selectedRowKeys={this.state.selectedRowKeys}
    rowKey={"id"}
    loading={this.props.loadingData}
    rowSelection={true}
    actionColumns={this.state.fcolumn}
    columns={this.state.columns}
    sorted={true}
    hideFilterBtn={true}
    hideRefreshBtn={true}
    sortedInfo={this.state.sortedInfo}
    dataSource={{
      total: universal.table.totalElements,
        pageSize: this.state.pagingConfig.length,
        page: this.state.pagingConfig.start + 1,
        data: universal.table.content
    }}
    onShowSizeChange={(pageNumber, pageSize) => {
      this.onShowSizeChange(pageNumber, pageSize);
    }}
    addonButtons={[
      <ExecuteModal disabled={false}/>,
      <Button onClick={() => {
        this.confirming()
      }}
              key={"confirm"}
              className={"btn-success"}>
        Подтвердить
      </Button>,
      <Button onClick={() => {
        this.rejecting()
      }}
              key={"reject"} className={"btn-danger"}
      >
        Отклонить
      </Button>,
      <ApproveModal disabled={false}/>,
      <SignModal disabled={false}/>
  ]}
    onSort={(column) => {
      if (Object.keys(column).length === 0) {
        this.setState(prevState => ({
          sortedInfo: {},
          pagingConfig: {
            ...prevState.pagingConfig,
            sort: []
          }
        }), () => {
          this.loadMainGridData();
        });
        return;
      }
      this.setState(prevState => ({
        sortedInfo: column,
        pagingConfig: {
          ...prevState.pagingConfig,
          sort: [{ field: column.field, "desc": column.order === "descend" }]
        }
      }), () => {
        this.loadMainGridData();
      });
    }}
    onSelectCell={(cellIndex, cell) => {
    }}
    onSelectRow={(record) => {
    }}
    onFilter={(filters) => {
    }}
    onRefresh={() => {
      this.loadMainGridData();
    }}
    onSelectCheckboxChange={(selectedRowKeys) => {
      //this.checkStatus(selectedRowKeys);
    }}
    />
    </Col>

    </Row>

    </Card>
  );
  }
}

export default connect(({ universal, universal2, loading }) => ({
  universal,
  universal2,
  loadingData: loading.effects["universal/optionsData"]
}))(Pulls);

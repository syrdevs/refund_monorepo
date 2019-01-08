import React, { Component } from "react";
import { Card, Label, Row, Col, Input, Button, Table, Tabs, Spin, Avatar, Menu, Dropdown, Icon, Badge, Collapse, Radio } from "antd";
import connect from "../../Redux";
import hasRole from "../../utils/hasRole";
import formatMessage from "../../utils/formatMessage";
import SmartGridView from "../../components/SmartGridView";
import PullFilter from "./PullFilter";


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

  render() {
    const universal = {
      table: this.props.universal2.references[this.state.pagingConfig.entity] ? this.props.universal2.references[this.state.pagingConfig.entity] : {}
    };
    return (
      <Card bodyStyle={{ padding: 5 }} style={{ width: "100%" }}>
        <p style={{ margin: "10px" }}>Пулы возвратов: 3</p>
        <Row>
         {/* <div style={{ display: "table" }}>
            <div style={{ display: "table-cell", width: "30%", position: 'relative' }}>
              <div className={'ant-card-bordered'} style={{ overflowY: "scroll", position: "absolute", bottom: 20, top: 0, right:10, left:0 }}>
                <Card style={{ width: "95%",     margin: '16px auto 0 auto' }}>
                  <Meta
                    title="№8003 от 06.01.2019, Одобренные."
                    description="Количество возвратов: 302"
                  />
                </Card>
              </div>
            </div>
            <div className={'ant-card-bordered'} style={{ display: "table-cell", width: "70%" }}>
              <Collapse>
                <Panel header="Фильтр" key="1">

                      <PullFilter/>
                </Panel>
              </Collapse>
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
                actionExport={() => {
                  console.log("export");
                }}
                onShowSizeChange={(pageNumber, pageSize) => {
                  this.onShowSizeChange(pageNumber, pageSize);
                }}
                addonButtons={[
                  <Button onClick={() => {
                  }}
                          key={"odobrit"}
                  >
                    Определить исполнителя
                  </Button>,

                  <Button onClick={() => {
                  }}
                          className={"btn-success"}>
                    Подтвердить
                  </Button>,
                  <Button onClick={() => {
                  }}
                          key={"odobrit"} className={"btn-danger"}
                  >
                    Отклонить
                  </Button>,

                  <Button onClick={() => {
                  }}>
                    Отправить на согласование
                  </Button>,
                  <Button onClick={() => {
                  }}
                          key={"odobrit"} className={"btn-success"}
                  >
                    Подписать и отправить
                  </Button>
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
            </div>
          </div>*/}
            <Col span={7} style={{marginLeft:'10px'}}>
              <Radio.Group defaultValue="a" buttonStyle="solid" style={{float:'left', margin:'0 0 10px 10px'}}>
                <Radio.Button value="a">Исполнено</Radio.Button>
                <Radio.Button value="b">Согласовано</Radio.Button>
                <Radio.Button value="c">Отклонено</Radio.Button>
                <Radio.Button value="d">Отправлено</Radio.Button>
              </Radio.Group>
              <Search
                enterButton
                size="large"
                onSearch={value => console.log(value)}
                style={{marginBottom:'5px'}}
              />
              <Card  bodyStyle={{ overflowY: "auto" , height:'700px', padding: '5px'}}>
                <Card style={{ width: "95%", margin: '16px auto 0 auto' }}>
                  <Meta
                    title="№8003, Одобренные."
                    description="Количество возвратов: 302"
                  />
                  <div style={{float:'right', color:'rgba(0, 0, 0, 0.45)'}}>06.01.2019</div>
                </Card>
                <Card style={{ width: "95%", margin: '16px auto 0 auto' }}>
                  <Meta
                    title="№8003, Одобренные."
                    description="Количество возвратов: 302"
                  />
                  <div style={{float:'right', color:'rgba(0, 0, 0, 0.45)'}}>06.01.2019</div>
                </Card>
                <Card style={{ width: "95%", margin: '16px auto 0 auto', backgroundColor:'rgb(89, 181, 103,0.6)' }}>
                  <Meta
                    title="№8003, Одобренные."
                    description="Количество возвратов: 302"
                  />
                  <div style={{float:'right', color:'rgba(0, 0, 0, 0.45)'}}>06.01.2019</div>
                </Card>
              </Card>
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
                actionExport={() => {
                  console.log("export");
                }}
                onShowSizeChange={(pageNumber, pageSize) => {
                  this.onShowSizeChange(pageNumber, pageSize);
                }}
                addonButtons={[
                  <Button onClick={() => {
                  }}
                          key={"odobrit"}
                  >
                    Определить исполнителя
                  </Button>,

                  <Button onClick={() => {
                  }}
                          className={"btn-success"}>
                    Подтвердить
                  </Button>,
                  <Button onClick={() => {
                  }}
                          key={"odobrit"} className={"btn-danger"}
                  >
                    Отклонить
                  </Button>,

                  <Button onClick={() => {
                  }}>
                    Отправить на согласование
                  </Button>,
                  <Button onClick={() => {
                  }}
                          key={"odobrit"} className={"btn-success"}
                  >
                    Подписать и отправить
                  </Button>
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

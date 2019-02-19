import React, { Component } from "react";
import {
  Card,
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
  Modal,
  Upload,
  Input,
  DatePicker,
  LocaleProvider,
  Select,
  Checkbox,
  Divider,
  Spin, Tabs, Badge
} from "antd";
import formatMessage from "../../utils/formatMessage";
import ImportModalGrid from "./ImportModalGrid";
import connect from "../../Redux";
import SmartGridView from "../../components/SmartGridView";
import "./Main.css";

const { TabPane } = Tabs;

class ImportXMLModal extends Component {
  state = {
    ImportModalGrid: {
      visible: true
    },
    selectedRowKeys: [],
    confirmRefundList: [],
    cancelRefundList: [],
    pagingConfig: {
      "start": 0,
      "length": 10
    },
    fcolumn: [
      {
        title: "Дата возврата",
        order: 1,
        key: "xmldate",
        isVisible: true,
        width: 150,
        render: (item) => {
          return item.xmlrefundDate;
        }
      },
      {
        title: "Номер платежного поручения",
        order: 0,
        key: "xmlpaynumber",
        isVisible: true,
        width: 150,
        render: (item) => {
          return item.xmlpayOrderNum;
        }
      },
      {
        title: formatMessage({ id: "menu.mainview.fio" }),
        order: 3,
        key: "fio",
        isVisible: true,
        width: 150,
        render: (item) => {
          return item.personSurname + " " + item.personFirstname + " " + item.personPatronname;
        }
      },
      {
        "title": "Статус заявки на возврат",
        isVisible: true,
        "dataIndex": "dappRefundStatusId.nameRu ",
        order: 7,
        render: (record, value) => <a
          style={{ color: this.setColor(value.isRefundConfirm) }}//value.isRefundConfirm ? 'green' : 'red' }}
          href="#"> <span><Badge
          status={this.setBadgeStatus(value.isRefundConfirm)}/></span> {value.dappRefundStatusId ? value.dappRefundStatusId.nameRu : null}
        </a>
      }
    ],
    datacolumns: [
      {
        title: "Номер платежного поручения",
        dataIndex: "payOrderNum",
        key: "payOrderNum"
      }, {
        title: "Дата возврата",
        dataIndex: "refundDate",
        key: "refundDate"
      },
      {
        title: "Сумма",
        dataIndex: "amount",
        key: "amount"
      }, {
        title: "Количество возвратов",
        dataIndex: "refundsCount",
        key: "refundsCount"
      },
      {
        title: "Сумма возврата",
        dataIndex: "refundsAmount",
        key: "refundsAmount"
      }
    ],
    statementData: [],
    errorData: []
  };
  componentWillUnmount = () => {

  };

  componentDidMount = () => {
    this.setState({
      columns: [
        ...this.props.columns
      ]
    });
    let confirmRefundList = [];
    let cancelRefundList = [];
    let errors = [];

    this.props.xmldata.forEach((data) => {
      // console.log(data)
      if (data.confirmRefundList != null) {
        data.confirmRefundList.forEach((item) => {
          item.xmlpayOrderNum = data.payOrderNum;
          item.xmlrefundDate = data.refundDate;
        });
        confirmRefundList = confirmRefundList.concat(data.confirmRefundList);
      }
      if (data.cancelRefundList != null) {
        data.cancelRefundList.forEach((item) => {
          item.xmlpayOrderNum = data.payOrderNum;
          item.xmlrefundDate = data.refundDate;
        });
        cancelRefundList = cancelRefundList.concat(data.cancelRefundList);
      }
      if (data.confirmRefundList === null && data.cancelRefundList === null) {
        errors = errors.concat(data);
      }
    });
    this.setState({
      confirmRefundList: confirmRefundList,
      cancelRefundList: cancelRefundList,
      statementData: this.props.xmldata,
      errorData: errors
    }, () => {
      console.log(this.state.confirmRefundList);
      let stateUpdates = [];
      this.state.confirmRefundList.forEach((item) => {
        console.log(item.id);
        // this.setState({
        //   selectedRowKeys: [
        //     ...this.state.selectedRowKeys, item.id
        // ]
        // });
        stateUpdates = stateUpdates.concat(item.id);
      });
      this.setState({
        selectedRowKeys: stateUpdates
      });
      console.log(stateUpdates);
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
  checkSuccess = (selectedRowKeys) => {
    console.log(selectedRowKeys);
    this.setState({
      selectedRowKeys: selectedRowKeys
    });
  };
  setDate = () => {
    if (this.state.selectedRowKeys.length) {
      this.state.selectedRowKeys.forEach((item) => {

        const { dispatch } = this.props;
        dispatch({
          type: "universal/changeDateRefund",
          payload: {
            refundDate: this.state.confirmRefundList.find(i => i.id === item).xmlrefundDate,
            refundList: this.state.selectedRowKeys.map((item) => ({ id: item }))
          }
        });
      });
    }
    this.props.closeAction();
  };

  /*savewitDate=(date, id)=>{
    const { dispatch } = this.props;
    dispatch({
      type: 'universal/changeDateRefund',
      payload: {
        refundDate: date,
        refundList: id,
      },
    });
  }*/

  render = () => {
    const { closeAction } = this.props;

    const { xmldata } = this.props;


    let concatxmldata = [];

    return (<div>
      <Modal
        title="Импортировать выписку XML"
        visible={true}
        width={1200}
        onCancel={() => closeAction()}
        okText="Сохранить"
        onOk={() => {
          this.setDate();
        }}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Успешные" key="1">
            <Card bodyStyle={{ padding: 5, height: "500px", overflowY: "auto" }}>
              <SmartGridView
                name={"importxmlTable"}
                scroll={{ x: "auto" }}
                selectedRowCheckBox={true}
                selectedRowKeys={this.state.selectedRowKeys}
                // selectedRowKeys={true}
                rowKey={"id"}
                loading={this.props.loadingData}
                actionColumns={this.state.fcolumn}
                columns={this.state.columns}
                showTotal={true}
                hideFilterBtn
                hideRefreshBtn
                hidePagination
                dataSource={{
                  total: 1,
                  pageSize: this.state.confirmRefundList.length,
                  page: 1,
                  data: this.state.confirmRefundList
                }}
                onShowSizeChange={(pageNumber, pageSize) => {
                  //this.onShowSizeChange(pageNumber, pageSize);
                }}
                onSelectCell={(cellIndex, cell) => {

                }}
                onSelectRow={(record) => {
                  //console.log(record);
                  true;
                }}
                onFilter={(filters) => {

                }}
                onRefresh={() => {
                  // this.loadMainGridData();
                }}
                onSearch={() => {
                  //this.toggleSearcher();
                }}
                onSelectCheckboxChange={(selectedRowKeys) => {
                  this.checkSuccess(selectedRowKeys);
                }}
                // onSelectAll={true}

                // rowClassName={(record) => {
                //   console.log(record);
                //   if (record.refundDate) {
                //     if (record.refundDate != record.xmlrefundDate) {
                //       return "redRow";
                //     }
                //   }
                //
                // }
                // }

                rowClassName={(record, index) => {
                         console.log(index)
                    if (record.refundDate) {
                      if (record.refundDate != record.xmlrefundDate) {
                        return "redRow";

                      }
                    }
                  // if (record) {
                  //   return this.state.selectedIndex === index ? "" : "";
                  // }
                }
                }
              />
            </Card>
          </TabPane>
          <TabPane tab="Не найденные" key="2">
            <Card bodyStyle={{ padding: 5, height: "500px", overflowY: "auto" }}>
              <SmartGridView
                name={"importxmlcancelTable"}
                scroll={{ x: "auto" }}
                rowKey={"id"}
                loading={this.props.loadingData}
                actionColumns={this.state.fcolumn}
                columns={this.state.columns}
                showTotal={true}
                hideFilterBtn
                hideRefreshBtn
                hidePagination
                dataSource={{
                  total: 1,
                  pageSize: this.state.cancelRefundList.length,
                  page: 1,
                  data: this.state.cancelRefundList
                }}
                onShowSizeChange={(pageNumber, pageSize) => {
                  //this.onShowSizeChange(pageNumber, pageSize);
                }}
                onSelectCell={(cellIndex, cell) => {

                }}
                onSelectRow={(record) => {
                  //console.log(record);
                }}
                onFilter={(filters) => {

                }}
                onRefresh={() => {
                  // this.loadMainGridData();
                }}
                onSearch={() => {
                  //this.toggleSearcher();
                }}
              />
            </Card>
          </TabPane>
          <TabPane tab="Ошибочные" key="3">
            <Card bodyStyle={{ padding: 5, height: "500px", overflowY: "auto" }}>
              <Table columns={this.state.datacolumns} dataSource={this.state.errorData} pagination={false}/>
            </Card>
          </TabPane>
          <TabPane tab="Выписка" key="4">
            <Card bodyStyle={{ padding: 5, height: "500px", overflowY: "auto" }}>
              <Table columns={this.state.datacolumns} dataSource={this.state.statementData} pagination={false}/>
            </Card>
          </TabPane>
        </Tabs>
      </Modal>
    </div>);
  };
}

export default connect(({ universal }) => ({
  universal
}))(ImportXMLModal);
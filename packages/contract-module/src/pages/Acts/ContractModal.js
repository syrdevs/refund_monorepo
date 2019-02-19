import React, { Component } from "react";
import formatMessage from "../../utils/formatMessage";
import { Form, Input, Button, Select, Divider, DatePicker, Table, Modal, Row, Col, Tabs, Card, Spin } from "antd";
import SmartGridView from "../../components/SmartGridView";
import connect from "../../Redux";
import style from "../Acts/ActModal.css";

class ContractModal extends Component {
  state = {
    selectedRecord: {},
    columns: [
      {
        title: "Подразделение",
        dataIndex: "division",
        isVisible: true
      },
      {
        title: "Учетный период: год",
        dataIndex: "periodYear",
        isVisible: true
      },
      {
        title: "Контрагент",
        dataIndex: "contragent.organization",
        isVisible: true,
        width: 460
      },
      {
        title: "Вид договора",
        dataIndex: "contractType",
        isVisible: true
      },
      {
        title: "Номер",
        dataIndex: "number",
        isVisible: true
      },
      {
        title: "Дата",
        dataIndex: "documentDate",
        isVisible: true
      },
      {
        title: "Дата начала",
        dataIndex: "dateBegin",
        isVisible: true
      },
      {
        title: "Дата окончания",
        dataIndex: "dateEnd",
        isVisible: true
      },
      {
        title: "Сумма",
        dataIndex: "documentSum",
        isVisible: true
      },
      {
        title: "Статус",
        dataIndex: "documentStatus.statusName",
        isVisible: true
      },
      {
        title: "Файлы",
        dataIndex: "documentAttachmentsCount",
        isVisible: true
      }
    ],
    fcolumn: [
      {
        order: 12,
        title: "Протокол распределения объемов",
        dataIndex: "planProtocol",
        isVisible: true,
        render: (text, record) => {
          if (record && record.planProtocol) {
            return <span style={{
              color: "#1890ff",
              textDecoration: "underline",
              cursor: "pointer"
            }}>№{record.planProtocol.number} от {record.planProtocol.documentDate}</span>;
          }
        }
      },
      {
        title: "Родительский договор",
        order: 11,
        dataIndex: "parentContract.number",
        isVisible: true,
        render: (text, record) => {
          if (record && record.parentContract) {
            return <span style={{
              color: "#1890ff",
              textDecoration: "underline",
              cursor: "pointer"
            }}>{record.parentContract.contractType.shortName} №{record.parentContract.number} от {record.parentContract.documentDate}</span>;
          }
          //***
          ////<parentContract.contractType> №<parentContract.number> от <parentContract.documentDate>
        }
      },
      {
        title: "Заявка на объемы",
        dataIndex: "proposal",
        isVisible: true,
        order: 13,
        render: (text, record) => {
          if (record && record.proposal) {
            return <span style={{
              color: "#1890ff",
              textDecoration: "underline",
              cursor: "pointer"
            }}>№{record.proposal.number} от {record.proposal.documentDate}</span>;
          }
        }
      }
    ],
    gridParameters: {
      start: 0,
      length: 15,
      entity: "contract",
      alias: "contractList",
      filter: {},
      sort: []
    },
    selectedRowKeys: []
  };

  onShowSizeChange = (current, pageSize) => {
    const { dispatch } = this.props;
    this.setState(prevState => ({
      gridParameters: {
        ...prevState.gridParameters,
        start: current,
        length: pageSize
      }
    }), () => dispatch({
      type: "universal2/getList",
      payload: {
        ...this.state.gridParameters,
        start: current,
        length: pageSize
      }
    }));
  };
  loadMainGridData = () => {
    const { dispatch } = this.props;
    dispatch({
      type: "universal2/getList",
      payload: this.state.gridParameters
    });
  };

  componentDidMount() {
    this.loadMainGridData();
  }

  render = () => {

    const { universal2 } = this.props;
    const act = universal2.references[this.state.gridParameters.entity];

    return (<Modal
      style={{ top: 0, paddingBottom: 0 }}
      width={1200}
      title={"Список Договоров"}
      okText={"Выбрать"}
      onCancel={() => this.props.hide()}
      onOk={() => {
        if (this.state.selectedRowKeys.length !== 0) {
          this.props.onSelect(act.content.filter(x => this.state.selectedRowKeys.findIndex(a => x.id === a) !== -1));
        }

      }}
      visible={true}>
      {/*<Spin spinning={this.props.loading}>*/}
        <div className={style.DogovorModal}>
          <SmartGridView
            scroll={{ x: "auto" }}
            name={"ActModal"}
            actionColumns={this.state.fcolumn}
            columns={this.state.columns}
            showTotal={true}
            selectedRowCheckBox={true}
            selectedRowKeys={this.state.selectedRowKeys}
            actionExport={() => {
            }}
            dataSource={{
              total: act ? act.totalElements : 0,
              pageSize: this.state.gridParameters.length,
              page: this.state.gridParameters.start + 1,
              data: act ? act.content : []
            }}
            onSelectRow={(record, index) => {
              this.setState({
                selectedRecord: record
              });
            }}
            onShowSizeChange={(pageNumber, pageSize) => {
              console.log("on paging");
            }}
            onRefresh={() => {
              console.log("onRefresh");
            }}
            onSearch={() => {

            }}
            onSelectCheckboxChange={(selectedRowKeys) => {
              this.setState({
                selectedRowKeys: selectedRowKeys
              });
            }}
          />
        </div>
      {/*</Spin>*/}
    </Modal>);
  };
}

export default connect(({ universal2, loading }) => ({
  universal2,
  loading: loading.effects["universal2/getList"]
}))(ContractModal);

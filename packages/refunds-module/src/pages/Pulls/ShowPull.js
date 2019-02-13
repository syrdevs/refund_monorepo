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
  Upload,
  Form,
  Modal,
  Input,
  DatePicker,
  LocaleProvider,
  Select,
  Checkbox,
  Divider,
  Spin,
  Badge
} from "antd";
import SmartGridView from "../../components/SmartGridView";
import connect from "../../Redux";
import { Animated } from "react-animated-css";
import { setAcceptToRefund } from "../../services/api";
import numberWithSpaces from "../../utils/numberFormat";


class ShowPull extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ImportXMLModal: {
        visible: false,
        data: []
      },
      showpull: false,
      sortedInfo: {},
      ModalChangeDateRefund: false,
      ShowModal: false,
      btnhide: false,
      ShowGraph: false,
      modalVisible: false,
      updateModalVisible: false,
      expandForm: false,
      selectedRows: [],
      searchButton: false,
      formValues: {},
      stepFormValues: {},
      fcolumn: [
        {
          title: "Исполнитель",
          order: 0,
          key: "accept",
          isVisible: true,
          width: 250,
          render: (item) => {
            return item.needAcceptedUser ? (item.needAcceptedUser.userName ? item.needAcceptedUser.userName : "") : "";
          }
        },
         {
           title: "Статус рассмотрения",
           order: 1,
           key: "accept",
           isVisible: true,
           width: 150,
           render: (item) => {
             if (item.isAccepted === true) {
               return "Подтвержден";
             }
             else if (item.isAccepted === false) {
               return "Отклонен";
             }
             else {
               return " ";
             }

           }
         },
         {
           title: "ФИО",
           order: 3,
           key: "fio",
           isVisible: true,
           width: 150,
           render: (item) => {
             //return item.refund.personSurname + " " + item.refund.personFirstname + " " + item.refund.personPatronname;
             return (item.refund.personSurname ? item.refund.personSurname : '') + " "
               + (item.refund.personFirstname ? item.refund.personFirstname : '') + " "
               + (item.refund.personPatronname ? item.refund.personPatronname : ' ' );
           }
         },
         {
           "title": "Статус заявки на возврат",
           isVisible: true,
           "dataIndex": "dappRefundStatusId.nameRu ",
           order: 7,
           render: (record, value) => <a
             style={{ color: this.setColor(value.refund.isRefundConfirm) }}//value.isRefundConfirm ? 'green' : 'red' }}
             href="#"> <span><Badge
             status={this.setBadgeStatus(value.refund.isRefundConfirm)}/></span> {value.refund.dappRefundStatusId ? value.refund.dappRefundStatusId.nameRu : null}
           </a>
         },
          {
            "title": "Сумма возврата",
            "isVisible": true,
            "dataIndex": "refund.refundPayAmount",
            order: 8,
            render: (value) => {
              return numberWithSpaces(value);
            }
          },
          {
            "title": "Сумма отчислений",
            "isVisible": true,
            "dataIndex": "refund.payAmount",
            order: 9,
            render: (value) => {
              return numberWithSpaces(value);
            }
          },
        /* {
           title: "Файлы",
           order: 51,
           key: "files",
           width: 250,
           className: "action_column",
           isVisible: true,
           onCell: record => {
             return {
               onClick: () => {

               }
             };
           },
           render: (record) => (
             <div>
               {record.refund.refundFiles && record.refund.refundFiles.map((item) => {
                 return <p >{item.filename} <a onClick={() => {
                   this.downloadFile(record, item);
                 }}>cкачать</a></p>;
               })}
             </div>
           )
         },*/
      ],
      columns: [
        {
          "title": "Номер заявки",
          "isVisible": true,
          "dataIndex": "refund.applicationId.appNumber"
        },
        {
          "title": "Причина отклонения",
          "isVisible": true,
          "dataIndex": "refund.rejectText"
        },
        {
          "title": "Дата заявления плательщика",
          "isVisible": true,
          "dataIndex": "refund.appPayerDate"
        },
        {
          "title": "Дата заявки",
          "isVisible": true,
          "dataIndex": "refund.applicationId.appDate"
        },
        {
          "title": "Дата поступления заявления в Фонд",
          "isVisible": true,
          "dataIndex": "refund.receiptAppdateToFsms"
        }, {
          "title": "Дата поступление заявки на возврат",
          "isVisible": true,
          "dataIndex": "refund.entryDate"
        }, {
          "title": "Дата исполнения заявки",
          "isVisible": true,
          "dataIndex": "refund.appEndDate"
        },
        {
          "title": "Референс ГК",
          "isVisible": true,
          "dataIndex": "refund.gcvpReference"
        },
        {
          "title": "Номер плат-го поручения ГК",
          "isVisible": true,
          "dataIndex": "refund.gcvpOrderNum"
        },
        { "title": "Дата плат-го поручения ГК", "dataIndex": "refund.gcvpOrderDate" },
        {
          "title": "Причина возврата",
          "dataIndex": "refund.drefundReasonId.nameRu"
        },
        { "title": "ИИН Потребителя", "dataIndex": "refund.personIin" },
        {
          "title": "КНП",
          "dataIndex": "refund.applicationId.dknpId.code"
        },
        {
          "title": "Номер платежного поручения",
          "dataIndex": "refund.applicationId.payOrderNum"
        },
        {
          "title": "Дата платежного поручения",
          "dataIndex": "refund.applicationId.payOrderDate"
        },

        {
          "title": "Дата последнего взноса",
          "dataIndex": "refund.lastPayDate"
        },
        {
          "title": "Дата осуществления возврата",
          "dataIndex": "refund.refundDate"
        }, {
          "title": "Кол-во отчислений и (или) взносов за последние 12 календарных месяцев",
          "dataIndex": "refund.lastMedcarePayCount"
        }, { "title": "Статус страхования", "dataIndex": "refund.medinsStatus" }, {
          "title": "Референс",
          "dataIndex": "refund.applicationId.reference"
        }, { "title": "Причина отказа", "dataIndex": "refund.ddenyReasonId.nameRu" },
        // {
        //   "title": "Отчет об отказе",
        //   "dataIndex": "refund.refundStatus"
        // },

        { "title": "Осталось дней", "dataIndex": "refund.daysLeft" }, {
          "title": "Дата изменения статуса заявки",
          "dataIndex": "refund.changeDate"
        },
        {
          "title": "Период",
          "dataIndex": "refund.payPeriod"
        },
        {
          "title": "Номер пула",
          "dataIndex": "refundPack.number"
        }
      ],
      isHidden: true,
      searchercont: 0,
      selectedRowKeys: [],
      tablecont: 24,
      xsize: "auto",
      pagingConfig: {
        "start": 0,
        "length": 15,
        "entity": "refundItem",
        "alias": null,
        "filter": {
          "refundPack.id": null
        }
      },
      ispublish: true
    };
  }

  componentWillUnmount() {
  }

  componentDidMount() {
    //this.loadPull('c0779e71-873a-4261-830c-b1bbb27a5247');
    this.loadPull(this.props.id);
  }
  downloadFile=(record, item)=>{
    console.log(record)
    console.log(item)
  }
  componentDidUpdate() {
  }
  onShowSizeChange = (current, pageSize) => {
    this.setState({
      pagingConfig: {
        ...this.state.pagingConfig,
        start: current,
        length: pageSize
      }
    }, () => {
      this.loadPull(this.state.pagingConfig.filter["refundPack.id"]);
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
  loadPull = (id) => {
    this.setState({
      pagingConfig: {
        ...this.state.pagingConfig,
        "filter": {
          "refundPack.id": id
        }
      }
    }, () => {

      const { dispatch } = this.props;
      dispatch({
        type: "universal2/getList",
        payload: {
          ...this.state.pagingConfig
        }
      }).then((response)=>{
        this.setState({
          selectedRowKeys:[]
        })
      })


    });
  };

  render() {
    const universal = {
      table: this.props.universal2.references[this.state.pagingConfig.entity] ? this.props.universal2.references[this.state.pagingConfig.entity] : {}
    };

    return (
      <div>
        <Card bodyStyle={{ padding: 5 }}>
          <Row>
            <Col sm={24} md={this.state.tablecont}>
              <SmartGridView
                name={"PullPage"}
                scroll={{ x: this.state.xsize }}
                //selectedRowCheckBox={true}
                searchButton={this.state.searchButton}
                //selectedRowKeys={this.state.selectedRowKeys}
                rowKey={"id"}
                loading={this.props.loadingData}
                //rowSelection={true}
                actionColumns={this.state.fcolumn}
                columns={this.state.columns}
                hideFilterBtn
                hideRefreshBtn
                sortedInfo={this.state.sortedInfo}
                showTotal={true}
                showExportBtn={false}
                dataSource={{
                  total: universal.table.totalElements,
                  pageSize: this.state.pagingConfig.length,
                  page: this.state.pagingConfig.start + 1,
                  data: universal.table.content
                }}
                addonButtons={[]}
                onShowSizeChange={(pageNumber, pageSize) => {
                  this.onShowSizeChange(pageNumber, pageSize);
                }}

                onSelectCell={(cellIndex, cell) => {

                }}
                onSelectRow={(record) => {
                }}
                onFilter={(filters) => {

                }}
                onRefresh={() => {

                }}
                onSearch={() => {
                }}
                onSelectCheckboxChange={(selectedRowKeys) => {

                }}
              />
              <br/>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

export default connect(({ universal, universal2, references, loading }) => ({
  universal,
  universal2,
  references,
  loadingData: loading.effects["universal2/getList"],
  rpmuLoading: loading.effects["universal/rpmuTable"]
}))(ShowPull);

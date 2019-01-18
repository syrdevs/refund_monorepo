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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import SmartGridView from "../../components/SmartGridView";
import connect from "../../Redux";
import formatMessage from "../../utils/formatMessage";
import componentLocal from "../../locales/components/componentLocal";
import GridFilter from "../../components/GridFilter";
import hasRole from "../../utils/hasRole";
import ModalGridView from "../../components/ModalGridView";
import ModalChangeDateRefund from "../../components/ModalChangeDateRefund";
import ModalGraphView from "../../components/ModalGraphView";
import { Animated } from "react-animated-css";
import PullFilter from "../Pulls/PullFilter";
import ExecuteModal from "../Pulls/ExecuteModal";
import ApproveModal from "../Pulls/ApproveModal";
import SignModal from "../Pulls/SignModal";
import saveAs from "file-saver";
import request from "../../utils/request";
import { setAcceptToRefund } from "../../services/api";

const FormItem = Form.Item;
const confirm = Modal.confirm;
const { RangePicker } = DatePicker;


class Pulls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ImportXMLModal: {
        visible: false,
        data:[]
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
          title: "Статус рассмотрения",
          order: 0,
          key: "accept",
          isVisible: true,
          width: 150,
          render: (item) => {
            return item.isAccepted ? "Подтвержден" : "Отклонен";
          }
        },
        {
          title: formatMessage({ id: "menu.mainview.fio" }),
          order: 3,
          key: "fio",
          isVisible: true,
          width: 150,
          render: (item) => {
            return item.refund.personSurname + " " + item.refund.personFirstname + " " + item.refund.personPatronname;
          }
        }, {
          "title": "Статус заявки на возврат",
          isVisible: true,
          "dataIndex": "dappRefundStatusId.nameRu ",
          order: 7,
          render: (record, value) => <a
            style={{ color: this.setColor(value.refund.isRefundConfirm) }}//value.isRefundConfirm ? 'green' : 'red' }}
            href="#"> <span><Badge
            status={this.setBadgeStatus(value.refund.isRefundConfirm)}/></span> {value.refund.dappRefundStatusId ? value.refund.dappRefundStatusId.nameRu : null}
          </a>
        }],
      columns: [
        {
          "title": "Номер заявки",
          "isVisible": true,
          "dataIndex": "refund.applicationId.appNumber"
        }, {
          "title": "Дата заявления плательщика",
          "isVisible": true,
          "dataIndex": "refund.appPayerDate"
        }, {
          "title": "Дата заявки",
          "isVisible": true,
          "dataIndex": "refund.applicationId.appDate"
        }, {
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
          "title": "Сумма возврата",
          "isVisible": true,
          "dataIndex": "refund.refundPayAmount"

        },
        {
          "title": "Референс ГК",
          "isVisible": true,
          "dataIndex": "refund.gcvpReference"
        }, {
          "title": "Номер плат-го поручения ГК",
          "isVisible": true,
          "dataIndex": "refund.gcvpOrderNum"
        }, { "title": "Дата плат-го поручения ГК", "dataIndex": "refund.gcvpOrderDate" }, {
          "title": "Причина возврата",
          "dataIndex": "refund.drefundReasonId.nameRu"
        }, { "title": "ИИН Потребителя", "dataIndex": "refund.personIin" }, {
          "title": "КНП",
          "dataIndex": "refund.applicationId.dknpId.code"
        }, {
          "title": "Номер платежного поручения",
          "dataIndex": "refund.applicationId.payOrderNum"
        }, {
          "title": "Дата платежного поручения",
          "dataIndex": "refund.applicationId.payOrderDate"
        }, { "title": "Сумма отчислений", "dataIndex": "refund.payAmount" }, {
          "title": "Дата последнего взноса",
          "dataIndex": "refund.lastPayDate"
        }, {
          "title": "Дата осуществления возврата",
          "dataIndex": "refund.refundDate"
        }, {
          "title": "Кол-во отчислений и (или) взносов за последние 12 календарных месяцев",
          "dataIndex": "refund.lastMedcarePayCount"
        }, { "title": "Статус страхования", "dataIndex": "refund.medinsStatus" }, {
          "title": "Референс",
          "dataIndex": "refund.applicationId.reference"
        }, { "title": "Причина отказа", "dataIndex": "refund.ddenyReasonId.nameRu" }, {
          "title": "Отчет об отказе",
          "dataIndex": "refund.refundStatus"
        }, { "title": "Осталось дней", "dataIndex": "refund.daysLeft" }, {
          "title": "Дата изменения статуса заявки",
          "dataIndex": "refund.changeDate"
        },
        {
          "title": "Период",
          "dataIndex": "refund.payPeriod"
        },
        {
          "title": "Веб-сервис (сообщение) ",
          "dataIndex": "refund.wsStatusMessage"
        },
        {
          "title": "needAcceptedUser",
          "dataIndex": "needAcceptedUser.userName"
        },
        {
          "title": "refundPack",
          "dataIndex": "refundPack.id"
        },
        {
          "title": "refundStatus",
          "dataIndex": "refundStatus.nameRu"
        }
        ],
      isHidden: true,
      searchercont: 0,
      selectedRowKeys: [],
      tablecont: 24,
      xsize: "auto",
      pagingConfig: {
        "start": 0,
        "length": 10,
        "entity": "refundItem",
        "alias": null,
        "filter":{
          "refundPack.id": null
        }
      }
    };
  }

  componentWillUnmount() {
    /*const { dispatch } = this.props;
    dispatch({
      type: "universal2/clear",
      payload: {
        table: "requests"
      }
    });*/
  }
  loadMainGridData = () => {

    /*const { dispatch } = this.props;
    dispatch({
      type: "universal2/getList",
      payload: this.state.pagingConfig
    });*/

  };
  componentDidMount() {
    this.loadMainGridData();
    const { dispatch } = this.props;
    dispatch({
      type: "universal2/getList",
      payload: {
        "start": 0,
        "length": 10,
        "entity": "refundPack",
        "alias": null,
        sort: [{field: "number", desc: true}]
      }
    }).then(()=>{
      if(this.props.universal2.references['refundPack'].content){
        if (this.props.universal2.references['refundPack'].content.length>0) {
          this.loadPull(this.props.universal2.references['refundPack'].content[0].id);
        }
      }
    })
  }
  componentDidUpdate() {
  }

  onShowSizeChange = (current, pageSize) => {
    this.setState({
      pagingConfig:{
        ...this.state.pagingConfig,
        start: current,
        length: pageSize
      }
    },()=>{
      this.loadPull(this.state.pagingConfig.filter["refundPack.id"])
    })

  };
  showModal = () => {
    this.setState({
      ShowModal: true
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
  togglePulls() {
    //showpull
    this.setState({
      isHidden: false,
      searchButton: false,
      searchercont: 7,
      tablecont: 17,
      showpull: true
    });
  }
  setAcceptToRefund=(accept)=>{
    const { dispatch } = this.props;
    dispatch({
      type: "universal/setAcceptToRefunds",
      payload: {
        "entity":"refundItem",
        "id":this.state.selectedRowKeys,
        "IsAccept":accept
      }
    }).then((e)=>{
      this.loadPull(this.state.pagingConfig.filter["refundPack.id"])
    })
      .catch((e)=>{
        Modal.error({
          content: e.getResponseValue().data.Message ? (e.getResponseValue().data.Message): 'Ошибка на стороне сервера!',
        });
        this.loadPull(this.state.pagingConfig.filter["refundPack.id"])
      })

  }
  confirming = () => {
    Modal.confirm({
      title: "Подтвердить",
      okText: "Подтвердить",
      cancelText: "Отмена",
      onOk: ()=> {
        this.setAcceptToRefund(true);
      },
      onCancel: ()=> {
      }
    });
  };
  rejecting = () => {
    Modal.confirm({
      title: "Отклонить",
      okText: "Подтвердить",
      cancelText: "Отмена",
      onOk: ()=> {
        this.setAcceptToRefund(false);
      },
      onCancel: ()=> {
      }
    });
  };
  hideleft() {
    if (!this.state.isHidden) {
      this.setState({
        isHidden: true,
        searchButton: false,
        searchercont: 0,
        tablecont: 24,
        showpull: false
      });
    }
  };
  checkStatus = (selectedRowKeys) => {
    this.setState({
      selectedRowKeys: selectedRowKeys
    });
  };
  onSetUser =(id)=>{
    const { dispatch } = this.props;
    dispatch({
      type: "universal/setRefundNeedAcceptUser",
      payload: {
        "entity":"refundItem",
        "id":this.state.selectedRowKeys,
        "userID": id
      }
    }).then((e)=>{
      this.loadPull(this.state.pagingConfig.filter["refundPack.id"])
    })
      .catch((e)=>{
        Modal.error({
          content: e.getResponseValue().data.Message ? (e.getResponseValue().data.Message): 'Ошибка на стороне сервера!',
        });
        this.loadPull(this.state.pagingConfig.filter["refundPack.id"])
      })

  }
  loadPull=(id)=>{
    this.setState({
      pagingConfig: {
        ...this.state.pagingConfig,
        "filter":{
          "refundPack.id": id
        }
      }
    }, () => {
      const { dispatch } = this.props;
      dispatch({
        type: "universal2/getList",
        payload: {
          ...this.state.pagingConfig,
        }
      });
    })
  }

  render() {
    const universal = {
      table: this.props.universal2.references[this.state.pagingConfig.entity] ? this.props.universal2.references[this.state.pagingConfig.entity] : {}
    };

    const dateFormat = "DD.MM.YYYY";

    return (
      <div>
        <Card bodyStyle={{ padding: 5 }}>
          <Row>
            <Card bodyStyle={{ padding: 5 }} style={{ marginTop: "5px" }}>
              <Button
                onClick={() => {
                  this.togglePulls();
                }}
                disabled={false}
                key={"pulls"}
              >
                {formatMessage({ id: "menu.mainview.pulls" })}
              </Button>
              <ExecuteModal disabled={this.state.selectedRowKeys.length === 0} count={this.state.selectedRowKeys.length}
                            onChecked={(id)=>this.onSetUser(id)}
                            selectedRows={this.state.selectedRowKeys}/>
              <Button onClick={() => {
                this.confirming();
              }}
                      disabled={this.state.selectedRowKeys.length === 0}
                      style={{ marginLeft: "5px" }}
                      key={"confirm"}
              >
                Подтвердить ( {this.state.selectedRowKeys.length} )
              </Button>
              <Button
                disabled={this.state.selectedRowKeys.length === 0}
                onClick={() => {
                  this.rejecting();
                }}
                style={{ marginLeft: "5px" }}
                key={"reject"}
              >
                Отклонить ( {this.state.selectedRowKeys.length} )
              </Button>
              <ApproveModal disabled={true}/>
              <SignModal disabled={true}/>
            </Card>
          </Row>
          <Row>
            <Col sm={24} md={this.state.searchercont}>
              <div>
                {this.state.showpull &&
                <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
                  <Card
                    style={{ margin: "10px 5px 10px 0px", borderRadius: "5px" }}
                    bodyStyle={{ padding: 0 }}
                    type="inner"
                    title={formatMessage({ id: "menu.mainview.pullLocale" })}
                    extra={<Icon style={{ "cursor": "pointer" }} onClick={event => this.hideleft()}><FontAwesomeIcon
                      icon={faTimes}/></Icon>}
                  >
                    <PullFilter loadPull={(id)=>this.loadPull(id)} clearPull={()=>{
                    }}/>
                  </Card>
                </Animated>
                }
              </div>
            </Col>
            <Col sm={24} md={this.state.tablecont}>
              <SmartGridView
                name={"PullPage"}
                scroll={{ x: this.state.xsize }}
                selectedRowCheckBox={true}
                searchButton={this.state.searchButton}
                selectedRowKeys={this.state.selectedRowKeys}
                rowKey={"id"}
                loading={this.props.loadingData}
                rowSelection={true}
                actionColumns={this.state.fcolumn}
                columns={this.state.columns}
                hideFilterBtn
                hideRefreshBtn
                sorted={true}
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
                onSort={(column) => {
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
                onSearch={() => {
                }}
                onSelectCheckboxChange={(selectedRowKeys) => {
                  this.checkStatus(selectedRowKeys);
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
}))(Pulls);

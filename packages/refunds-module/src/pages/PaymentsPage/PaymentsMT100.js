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
  Divider, Modal
} from "antd";

import formatMessage from "../../utils/formatMessage";
import GridFilter from "../../components/GridFilter";
import { faTimes } from "@fortawesome/free-solid-svg-icons/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SmartGridView from "../../components/SmartGridView";
import connect from "../../Redux";
import { Animated } from "react-animated-css";
import moment from "moment/moment";
import "./Payments.css";
import request from "../../utils/request";
import Guid from "../../utils/Guid";
import saveAs from "file-saver";
import numberWithSpaces from "../../utils/numberFormat";

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const TabPane = Tabs.TabPane;
const dateFormat = "YYYY/MM/DD";
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 }
};

class PaymentsMT100 extends Component {

  state = {
    selectedRecord: null,
    parameters: {
      start: 0,
      length: 15,
      entity: "mt100",
      filter: {},
      sort: []
    },
    actionColumns: [{
      "title": "Сумма",
      "dataIndex": "totalAmount",
      "isVisible": "true",
      render: (value) => {
        if (value) {
          return numberWithSpaces(value);
        }

        return "";
      }
    }],
    filterForm: [
      {
        name: "reference",
        label: formatMessage({ id: "menu.mainview.reference" }),
        type: "text"
      },
      {
        name: "paymentDate",
        label: formatMessage({ id: "menu.filter.payment.create_date" }),
        type: "betweenDate"
      },
      /*{
        name: 'totalAmount',
        label: formatMessage({ id: 'menu.mainview.paymentsum' }),
        type: 'text',
      },*/
      {
        name: "knp",
        label: formatMessage({ id: "menu.filter.knp" }),
        type: "multibox"
      },
      // {
      //   name: 'senderCompanyName',
      //   label: 'Отправитель (Наименование)',
      //   type: 'text',
      // },
      // {
      //   name: 'senderBin',
      //   label: 'Отправитель (БИН)',
      //   type: 'text',
      //   withMax: 12,
      // },
      // {
      //   name: 'senderBankBik',
      //   label: 'Отправитель (БИК)',
      //   type: 'text',
      //   withMax: 8,
      // },
      // {
      //   name: 'recipientName',
      //   label: 'Получатель (Наименование)',
      //   type: 'text',
      // },
      // {
      //   name: 'recipientBin',
      //   label: 'Получатель (БИН)',
      //   type: 'text',
      //   withMax: 12,
      // },
      // {
      //   name: 'recipientBankBik',
      //   label: 'Получатель (БИК)',
      //   type: 'text',
      //   withMax: 8,
      // },
      // {
      //   name: 'recipientAccount',
      //   label: 'Получатель (Счет)',
      //   type: 'text',
      // },
      {
        label: "Дата поступления информации",
        name: "_createdOn",
        type: "listbetweenDate"
      },
      {
        label: "Плательщики ЕСП ",
        name: "esp",
        type: "checkbox"
      }
      /*{
        label: "БИН отправителя",
        name: "getPaymentMT102ByBin",
        type: "text"
      }*/
      /* {
         label: "ID",
         name: "id",
         type: "text"
       }*/
    ],
    sortedInfo: {},
    selectedRowKeys: [],
    filterContainer: 0,
    columns: [
      /*{
        "title": "ID",
        "dataIndex": "id"
      },*/
      {
        "title": "Референс",
        "dataIndex": "reference",
        "isVisible": "true"
      }, {
        "title": "Дата платежа",
        "dataIndex": "paymentDate",
        "isVisible": "true"
      }, {
        "title": "КНП",
        "dataIndex": "knp",
        "isVisible": "true"
      }, {
        "title": "Отправитель (Наименование)",
        "dataIndex": "senderCompanyName",
        "isVisible": "true"
      }, {
        "title": "Отправитель (БИН)",
        "dataIndex": "senderBin"
      }, {
        "title": "Отправитель (БИК)",
        "dataIndex": "senderBankBik"
      }
      , {
        "title": "Получатель (Наименование)",
        "dataIndex": "recipientName"
      }
      , {
        "title": "Получатель (БИН)",
        "dataIndex": "recipientBin"
      }, {
        "title": "Получатель (БИК)",
        "dataIndex": "recipientBankBik"
      }, {
        "title": "Получатель (Счет)",
        "dataIndex": "recipientAccount"
      }, {
        "title": "Дата поступления информации",
        "dataIndex": "createdOn"

      },
      {
        "title": "Статус загрузки",
        "dataIndex": "mt102LoadStatus.nameRu"
      }, {
        "title": "Количество МТ102",
        "dataIndex": "mt102Count"
      }
    ]
  };

  clearFilter = (pageNumber) => {
    this.setState({
      sortedInfo: {},
      parameters: {
        start: 0,
        length: 15,
        entity: this.state.parameters.entity,
        filter: {},
        sort: []
      }
    }, () => {
      this.loadGridData();
    });
  };
//test
  applyFilter = (filter) => {
    if (filter.knpList != null && filter.knpList.length === 0) {
      delete filter["knpList"];
    }
    this.setState({
      sortedInfo: {},
      parameters: {
        ...this.state.parameters,
        start: 0,
        length: 15,
        filter: { ...filter },
        sort: []
      }
    }, () => {

      const { dispatch } = this.props;
      dispatch({
        type: "universal/paymentsData",
        payload: {
          ...this.state.parameters,
          start: 0,
          length: 15
        }
      });


    });
  };

  onShowSizeChange = (current, pageSize) => {
    const { dispatch } = this.props;
    this.setState(prevState => ({
      parameters: {
        ...prevState.parameters,
        start: current,
        length: pageSize
      }
    }), () => dispatch({
      type: "universal/paymentsData",
      payload: {
        ...this.state.parameters,
        start: current,
        length: pageSize
      }
    }));
  };

  filterPanelState = () => {
    this.setState(({ filterContainer }) => ({
      filterContainer: filterContainer === 6 ? 0 : 6
    }));
  };

  loadGridData = () => {
    const { dispatch } = this.props;
    let sortField = this.state.sortedInfo;
    dispatch({
      type: "universal/paymentsData",
      payload: this.state.parameters
    });
  };

  componentDidMount() {
    this.loadGridData();
  }

  exportToExcel = () => {
    request("/api/refund/exportToExcel", {
      responseType: "blob",
      method: "post",
      body: {
        "entityClass": this.state.parameters.entity,
        "fileName": this.state.parameters.entity === "mt100" ? formatMessage({ id: "menu.payments.payment100" }) : formatMessage({ id: "menu.payments.payment102" }),
        "src": {
          "searched": true,
          "data": this.state.parameters.filter
        },
        "columns": this.state.parameters.entity == "mt100" ? JSON.parse(localStorage.getItem("paymentspagemt100columns")).filter(item => item.isVisible === "true" || item.isVisible === true) : JSON.parse(localStorage.getItem("paymentspagemt102columns")).filter(item => item.isVisible === "true" || item.isVisible === true)
      },
      getResponse: (response) => {
        if (response.status === 200) {
          if (response.data && response.data.type)
            saveAs(new Blob([response.data], { type: response.data.type }), Guid.newGuid());
        }
      }
    });
  };

  getFileNameByContentDisposition = (contentDisposition) => {
    let regex = /filename[^;=\n]*=(UTF-8(['"]*))?(.*)/;
    let matches = regex.exec(contentDisposition);
    let filename;
    let filenames;
    if (matches != null && matches[3]) {
      filename = matches[3].replace(/['"]/g, "");
      let match = regex.exec(filename);
      if (match != null && match[3]) {
        filenames = match[3].replace(/['"]/g, "").replace("utf-8", "");
      }
    }
    return decodeURI(filenames);
  };

  reloadMt100Packet = () => {
    Modal.confirm({
      title: "Вы действительно хотите запросить файлы МТ102?",
      okText: "Да",
      cancelText: "Нет",
      onOk: () => {
        const { dispatch } = this.props;
        dispatch({
          type: "universal/reloadMt100Packet",
          payload: {
            id: this.state.selectedRecord.id
          }
        })
          .then(() => {
            this.setState({
              selectedRecord: null
            }, () => {
              this.loadGridData();
            });
          });
      },
      onCancel: () => {
        Modal.error({
          title: "Ошибка при запросе файла MT102"
        });
      }
    });

  };

  render = () => {

    const paymentsData = this.props.universal.paymentsData[this.state.parameters.entity];

    let addonButtons = [
      <Button
        disabled={this.state.selectedRecord === null}
        key={"mt100paymentBtn"}
        onClick={() => {
          if (this.state.selectedRecord !== null) {
            this.props.onSelect(this.state.selectedRecord);
          }
        }}>
        Платежи МТ102</Button>,
      <Button
        disabled={(this.state.selectedRecord ? ((this.state.selectedRecord.mt102LoadStatus ? this.state.selectedRecord.mt102LoadStatus : {}).code === "3") : true)}
        key={"mt100reloadBtn"}
        onClick={() => {
          if (this.state.selectedRecord !== null) {
            this.reloadMt100Packet();
          }
          // console.log(this.state.selectedRecord)
          //this.props.onSelect(this.state.selectedRecord);
        }}>
        Запросить МТ102</Button>

    ];
    let extraButtons = [<span key={"total-count"} style={{
      color: "#002140",
      fontSize: "12px",
      paddingLeft: "10px"
    }}>{formatMessage({ id: "system.totalAmount" })}: {numberWithSpaces(paymentsData.totalSum ? paymentsData.totalSum.totalAmount ? paymentsData.totalSum.totalAmount : paymentsData.totalSum.paymentsum : 0)} /</span>];

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
              // clearFilter={this.clearFilter(pageNumber)}
              clearFilter={(pageNumber) => this.clearFilter(pageNumber)}
              applyFilter={(filter) => this.applyFilter(filter)} key={"1"}
              filterForm={this.state.filterForm}
              dateFormat={dateFormat}/>
          </Card>
        </Animated>

      </Col>
      <Col sm={24} md={this.state.filterContainer !== 6 ? 24 : 18}>

        <SmartGridView
          name={"paymentspagemt100columns"}
          scroll={{ x: "auto" }}
          fixedBody={true}
          actionColumns={this.state.actionColumns}
          showTotal={true}
          // selectedRowCheckBox={true}
          searchButton={false}
          selectedRowKeys={this.state.selectedRowKeys}
          rowKey={"id"}
          loading={this.props.loadingData}
          fixedHeader={true}
          // rowSelection={true}
          columns={this.state.columns}
          // onColumnsChange={(isChanged, dataIndex) => {
          //   if (isChanged === true && dataIndex === 'createdOn') {
          //     this.setState(prevState => ({
          //       parameters: {
          //         ...prevState.parameters,
          //         sort: [{field: "createdOn", 'desc': true}],
          //       },
          //     }), () => {
          //       this.loadGridData();
          //     });
          //   }
          // }}
          sorted={true}
          sortedInfo={this.state.sortedInfo}
          showExportBtn={true}
          dataSource={{
            total: paymentsData.totalElements,
            pageSize: this.state.parameters.length,
            page: this.state.parameters.start + 1,
            data: paymentsData.content
          }}
          onSort={(column) => {

            if (Object.keys(column).length === 0) {
              this.setState(prevState => ({
                parameters: {
                  ...prevState.parameters,
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
              parameters: {
                ...prevState.parameters,
                sort: [{
                  field: column.field === "mt102LoadStatus.text" ? "mt102LoadStatus" : column.field,
                  "desc": column.order === "descend"
                }]
              }
            }), () => {
              this.loadGridData();
            });
          }}
          actionExport={() => this.exportToExcel()}
          extraButtons={extraButtons}
          addonButtons={addonButtons}
          onSelectRow={(record, index) => {
            this.setState({
              selectedRecord: record
            });
            //this.selectedRecord = record;
          }}
          onShowSizeChange={(pageNumber, pageSize) => this.onShowSizeChange(pageNumber, pageSize)}
          onRefresh={() => {
            this.loadGridData();
          }}
          onSearch={() => {
            this.filterPanelState();
          }}
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

export default connect(({ universal, loading }) => ({
  universal,
  loadingData: loading.effects["universal/paymentsData"]
}))(PaymentsMT100);
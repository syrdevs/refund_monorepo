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
  Divider
} from "antd";

import formatMessage from "../../utils/formatMessage";
import GridFilter from "../../components/GridFilter";
import { faTimes } from "@fortawesome/free-solid-svg-icons/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SmartGridView from "../../components/SmartGridView";
import connect from "../../Redux";
import { Animated } from "react-animated-css";
import moment from 'moment/moment';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const TabPane = Tabs.TabPane;
const dateFormat = "YYYY/MM/DD";
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 }
};

class PaymentsMT102 extends Component {
  state = {
    selectedRowKeys: [],
    sortedInfo: {},
    parameters: {
      start: 0,
      length: 15,
      entity: "mt102",
      filter: {},
      sort: []
    },
    filterForm: [
      {
        label: "Референс",
        name: "reference",
        type: "text"
      }, {
        label: "Дата платежа",
        name: "paymentdate",
        type: "betweenDate"
      }, {
        label: "КНП",
        name: "knp",
        type: "multibox"
      },
      /*{
        label: 'Сумма',
        name: 'paymentsum',
        type: 'text',
      },*/
      {
        label: "Фамилия",
        name: "lastname",
        type: "text"
      }, {
        label: "Имя",
        name: "firstname",
        type: "text"
      }, {
        label: "Отчество",
        name: "secondname",
        type: "text"
      },
      {
        label: "Район",
        name: "raion",
        type: "text"
      },
      {
        label: "Регион",
        name: "region",
        type: "text"
      },
      {
        label: "Дата рождения",
        name: "birthdate",
        type: "betweenDate"
      },
      {
        label: "Отправитель (БИН)",
        name: "senderBin",
        type: "text",
        withMax: 12
      },
      {
        label: "Отправитель (Наименование)",
        name: "senderName",
        type: "text"
      },
      {
        label: "ИИН",
        name: "iin",
        type: "text",
        withMax: 12
      }, {
        label: "Период",
        name: "paymentperiod",
        type: "monthPicker"
      }
      /*{
        label: 'Дата платежа',
        name: 'createdon',
        type: 'betweenDate',
      },*/
    ],
    filterContainer: 0,
    columns: [
      {
        "title": "Референс",
        "dataIndex": "reference",
        "isVisible": "true"
      }, {
        "title": "Дата платежа",
        "dataIndex": "paymentdate",
        "isVisible": "true"
      }, {
        "title": "КНП",
        "dataIndex": "knp",
        "isVisible": "true"
      }, {
        "title": "Сумма",
        "dataIndex": "paymentsum",
        "isVisible": "true"
      }, {
        "title": "Фамилия",
        "dataIndex": "lastname",
        "isVisible": "true"
      }, {
        "title": "Имя",
        "dataIndex": "firstname",
        "isVisible": "true"
      }, {
        "title": "Отчество",
        "dataIndex": "secondname",
        "isVisible": "true"
      }, {
        "title": "Район",
        "dataIndex": "raion",
        "isVisible": "true"
      }, {
        "title": "Регион",
        "dataIndex": "region",
        "isVisible": "true"
      }, {
        "title": "Дата рождения",
        "dataIndex": "birthdate",
        "isVisible": "true"
      }, {
        "title": "ИИН",
        "dataIndex": "iin",
        "isVisible": "true"
      }, {
        "title": "Отправитель (БИН)",
        "dataIndex": "senderBin",
        "isVisible": "true"
      }, {
        "title": "Отправитель (Наименование)",
        "dataIndex": "senderName",
        "isVisible": "true"
      }, {
        "title": "Период",
        "dataIndex": "paymentperiod",
        "isVisible": "true"
      }, {
        "title": "Сумма возвратов",
        "dataIndex": "refundTotalAmount",
        "isVisible": "true"
      }, {
        "title": "Дата поступления информации",
        "dataIndex": "createdon"
      }

    ]
  };

  clearFilter = () => {
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

  applyFilter = (filter) => {
    this.setState({
      sortedInfo: {},
      parameters: {
        ...this.state.parameters,
        filter: { ...filter },
        sort: []
      }
    }, () => {
      this.loadGridData();
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

    console.log(this.props);

    dispatch({
      type: "universal/paymentsData",
      payload: this.state.parameters
    });
  };


  exportToExcel = () => {

    let authToken = localStorage.getItem('AUTH_TOKEN');

    fetch('/api/refund/exportToExcel',
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: 'Bearer ' + authToken,
        },
        method: 'post',
        body: JSON.stringify({
          'entityClass': this.state.parameters.entity,
          'fileName': this.state.parameters.entity === 'mt100' ? formatMessage({ id: 'menu.payments.payment100' }) : formatMessage({ id: 'menu.payments.payment102' }),
          'src': {
            'searched': true,
            'data': this.state.parameters.filter,
          },
          'columns': this.state.parameters.entity == 'mt100' ? JSON.parse(localStorage.getItem('paymentspagemt100columns')).filter(item => item.isVisible === 'true') : JSON.parse(localStorage.getItem('paymentspagemt102columns')).filter(item => item.isVisible === 'true'),
        }),
      })
    // .then(response => response.blob())
    // .then(responseBlob => {
    //
    //   var reader = new FileReader();
    //   reader.addEventListener('loadend', function() {
    //     var blob = new Blob([reader.result], { type: 'application/vnd.ms-excel' }); // pass a useful mime type here
    //     var url = URL.createObjectURL(blob);
    //     window.open(url, '_self');
    //   });
    //   reader.readAsArrayBuffer(responseBlob);
    //
    //   /* let blob = new Blob([responseBlob], { type: responseBlob.type }),
    //      url = window.URL.createObjectURL(blob);
    //    window.open(url, '_self');*/
    // });
      .then(response => {
        if (response.ok) {
          return response.blob().then(blob => {
            let disposition = response.headers.get('content-disposition');
            return {
              fileName: this.getFileNameByContentDisposition(disposition),
              raw: blob,
            };
          });
        }
      })
      .then(data => {
        if (data) {
          saveAs(data.raw, moment().format('DDMMYYYY') + data.fileName);
        }
      });

  };
  getFileNameByContentDisposition = (contentDisposition) => {
    let regex = /filename[^;=\n]*=(UTF-8(['"]*))?(.*)/;
    let matches = regex.exec(contentDisposition);
    let filename;
    let filenames;
    if (matches != null && matches[3]) {
      filename = matches[3].replace(/['"]/g, '');
      let match = regex.exec(filename);
      if (match != null && match[3]) {
        filenames = match[3].replace(/['"]/g, '').replace('utf-8', '');
      }
    }
    return decodeURI(filenames);
  };

  componentDidMount() {
    this.loadGridData();
  }

  render = () => {

    const paymentsData = this.props.universal.paymentsData[this.state.parameters.entity];

    let addonButtons = [];
    let extraButtons = [<span key={"total-count"} style={{
      color: "#002140",
      fontSize: "12px",
      paddingLeft: "10px"
    }}>{formatMessage({ id: "system.totalAmount" })}: {paymentsData.totalSum ? paymentsData.totalSum.totalAmount ? paymentsData.totalSum.totalAmount : paymentsData.totalSum.paymentsum : 0} /</span>];

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
              clearFilter={this.clearFilter}
              applyFilter={(filter) => this.applyFilter(filter)} key={"1"}
              filterForm={this.state.filterForm}
              dateFormat={dateFormat}/>
          </Card>
        </Animated>

      </Col>
      <Col sm={24} md={this.state.filterContainer !== 6 ? 24 : 18}>
          <SmartGridView
            name={"paymentspagemt102columns"}
            scroll={{ x: "auto" }}
            fixedBody={true}
            actionColumns={[]}
            showTotal={true}
            // selectedRowCheckBox={true}
            searchButton={false}
            selectedRowKeys={this.state.selectedRowKeys}
            rowKey={"id"}
            loading={this.props.loadingData}
            fixedHeader={true}
            rowSelection={true}
            // rowClassName={(record) => {
            //   if (record.isRefunded) {
            //     return 'redRow';
            //   }
            // }
            // }
            columns={this.state.columns}
            onColumnsChange={(isChanged, dataIndex) => {
              console.log(dataIndex);
            }}
            sorted={true}
            sortedInfo={this.state.sortedInfo}
            showExportBtn={true}
            dataSource={{
              total: paymentsData.totalElements,
              pageSize: paymentsData.size,
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
                  sort: [{ field: column.field, "desc": column.order === "descend" }]
                }
              }), () => {
                this.loadGridData();
              });
            }}
            actionExport={() => this.exportToExcel()}
            extraButtons={extraButtons}
            addonButtons={addonButtons}
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

export default connect(({ universal, loading }) => {
  return {
    universal,
    loadingData: loading.effects["universal/paymentsData"]
  };
})(PaymentsMT102);
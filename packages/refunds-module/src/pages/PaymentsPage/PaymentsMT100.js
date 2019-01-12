import React, { Component } from 'react';
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
  Divider,
} from 'antd';

import formatMessage from '../../utils/formatMessage';
import GridFilter from '../../components/GridFilter';
import { faTimes } from '@fortawesome/free-solid-svg-icons/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SmartGridView from '../../components/SmartGridView';
import connect from '../../Redux';
import { Animated } from 'react-animated-css';
import moment from 'moment/moment';
import  './Payments.css';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const TabPane = Tabs.TabPane;
const dateFormat = 'YYYY/MM/DD';
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

class PaymentsMT100 extends Component {

  state = {
    selectedRecord: null,
    parameters: {
      start: 0,
      length: 10,
      entity: 'mt100',
      filter: {},
      sort: [],
    },
    filterForm: [
      {
        name: 'reference',
        label: formatMessage({ id: 'menu.mainview.reference' }),
        type: 'text',
      },
      {
        name: 'paymentDate',
        label: formatMessage({ id: 'menu.filter.payment.create_date' }),
        type: 'betweenDate',
      },
      /*{
        name: 'totalAmount',
        label: formatMessage({ id: 'menu.mainview.paymentsum' }),
        type: 'text',
      },*/
      {
        name: 'knp',
        label: formatMessage({ id: 'menu.filter.knp' }),
        type: 'multibox',
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
        label: 'Дата поступления информации',
        name: 'createdOn',
        type: 'betweenDate',
      },
      {
      label: 'БИН',
        name: 'bin',
        type: 'text',
      },
    ],
    sortedInfo: {},
    selectedRowKeys: [],
    filterContainer: 0,
    columns: [
      {
        'title': 'Референс',
        'dataIndex': 'reference',
        'isVisible': 'true',
      }, {
        'title': 'Дата платежа',
        'dataIndex': 'paymentDate',
        'isVisible': 'true',
      }, {
        'title': 'Сумма',
        'dataIndex': 'totalAmount',
        'isVisible': 'true',
      }, {
        'title': 'КНП',
        'dataIndex': 'knp',
        'isVisible': 'true',
      }, {
        'title': 'Отправитель (Наименование)',
        'dataIndex': 'senderCompanyName',
        'isVisible': 'true',
      }, {
        'title': 'Отправитель (БИН)',
        'dataIndex': 'senderBin',
      }, {
        'title': 'Отправитель (БИК)',
        'dataIndex': 'senderBankBik',
      }
      , {
        'title': 'Получатель (Наименование)',
        'dataIndex': 'recipientName',
      }
      , {
        'title': 'Получатель (БИН)',
        'dataIndex': 'recipientBin',
      }, {
        'title': 'Получатель (БИК)',
        'dataIndex': 'recipientBankBik',
      }, {
        'title': 'Получатель (Счет)',
        'dataIndex': 'recipientAccount',
      }, {
        'title': 'Дата поступления информации',
        'dataIndex': 'createdOn',
      },
      {
        'title': 'Статус загрузки',
        'dataIndex': 'mt102LoadStatus.text',
      },
      {
        'title': 'Статус загрузки (сообщение)',
        'dataIndex': 'mt102LoadDescription',
      }, {
        'title': 'Количество МТ102',
        'dataIndex': 'mt102Count',
      },
    ],
  };

  clearFilter = (pageNumber) => {
    console.log(this.state.parameters);
    this.setState({
      sortedInfo: {},
      parameters: {
        start: this.state.parameters.start,
        length: this.state.parameters.length,
        entity: this.state.parameters.entity,
        filter: {},
        sort: [],
      },
    }, () => {
      this.loadGridData();
    });
  };
//test
  applyFilter = (filter) => {
    if(filter.knpList!=null && filter.knpList.length===0){
      delete filter['knpList'];
    }
    this.setState({
      sortedInfo: {},
      parameters: {
        ...this.state.parameters,
        filter: { ...filter },
        sort: [],
      },
    }, () => {

      const { dispatch } = this.props;
      dispatch({
        type: 'universal/paymentsData',
        payload: {
          ...this.state.parameters,
          start:0
        },
      });



    });
  };

  onShowSizeChange = (current, pageSize) => {
    const { dispatch } = this.props;
    this.setState(prevState => ({
      parameters: {
        ...prevState.parameters,
        start: current,
        length: pageSize,
      },
    }), () => dispatch({
      type: 'universal/paymentsData',
      payload: {
        ...this.state.parameters,
        start: current,
        length: pageSize,
      },
    }));
  };

  filterPanelState = () => {
    this.setState(({ filterContainer }) => ({
      filterContainer: filterContainer === 6 ? 0 : 6,
    }));
  };

  loadGridData = () => {
    const { dispatch } = this.props;
    let sortField = this.state.sortedInfo;
    dispatch({
      type: 'universal/paymentsData',
      payload: this.state.parameters,
    });
  };

  componentDidMount() {
    this.loadGridData();
  }

  exportToExcel = () => {

    let authToken = localStorage.getItem("AUTH_TOKEN");

    fetch('/api/refund/exportToExcel',
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: 'Bearer ' + authToken,
        },
        method: 'post',
        body: JSON.stringify({
          "entityClass": this.state.parameters.entity,
          "fileName": this.state.parameters.entity === 'mt100' ? formatMessage({ id: 'menu.payments.payment100' }) : formatMessage({ id: 'menu.payments.payment102' }),
          "src": {
            "searched": true,
            "data": this.state.parameters.filter,
          },
          "columns": this.state.parameters.entity == 'mt100' ? JSON.parse(localStorage.getItem('paymentspagemt100columns')).filter(item => item.isVisible === 'true') : JSON.parse(localStorage.getItem('paymentspagemt102columns')).filter(item => item.isVisible === 'true'),
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

  render = () => {

    const paymentsData = this.props.universal.paymentsData[this.state.parameters.entity];

    let addonButtons = [<Button
      disabled={this.state.selectedRecord === null}
      key={'mt100paymentBtn'}
      onClick={() => {
        if (this.state.selectedRecord !== null) {
          this.props.onSelect(this.state.selectedRecord);
        }
      }}>
      Платежи МТ102</Button>];
    let extraButtons = [<span key={'total-count'} style={{
      color: '#002140',
      fontSize: '12px',
      paddingLeft: '10px',
    }}>{formatMessage({ id: 'system.totalAmount' })}: {paymentsData.totalSum ? paymentsData.totalSum.totalAmount ? paymentsData.totalSum.totalAmount : paymentsData.totalSum.paymentsum : 0} /</span>];

    return (<Row>
      <Col sm={24} md={this.state.filterContainer}>
        <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
          <Card
            headStyle={{
              padding: '0 14px',
            }}
            style={{ margin: '0px 5px 10px 0px', borderRadius: '5px' }}
            type="inner"
            title={formatMessage({ id: 'system.filter' })}
            extra={<Icon style={{ 'cursor': 'pointer' }} onClick={this.filterPanelState}><FontAwesomeIcon
              icon={faTimes}/></Icon>}>
            <GridFilter
              // clearFilter={this.clearFilter(pageNumber)}
              clearFilter={(pageNumber) => this.clearFilter(pageNumber)}
              applyFilter={(filter) => this.applyFilter(filter)} key={'1'}
              filterForm={this.state.filterForm}
              dateFormat={dateFormat}/>
          </Card>
        </Animated>

      </Col>
      <Col sm={24} md={this.state.filterContainer !== 6 ? 24 : 18}>

          <SmartGridView
            name={'paymentspagemt100columns'}
            scroll={{ x: 'auto' }}
            fixedBody={true}
            actionColumns={[]}
            showTotal={true}
            selectedRowCheckBox={true}
            searchButton={false}
            selectedRowKeys={this.state.selectedRowKeys}
            rowKey={'id'}
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
              pageSize: paymentsData.size,
              page: this.state.parameters.start + 1,
              data: paymentsData.content,
            }}
            onSort={(column) => {

              if (Object.keys(column).length === 0) {
                this.setState(prevState => ({
                  parameters: {
                    ...prevState.parameters,
                    sort: [],
                  },
                  sortedInfo: {},
                }), () => {
                  this.loadGridData();
                });
                return;
              }

              this.setState(prevState => ({
                sortedInfo: column,
                parameters: {
                  ...prevState.parameters,
                  sort: [{ field: column.field==='mt102LoadStatus.text'?'mt102LoadStatus': column.field, 'desc': column.order === 'descend' }],
                },
              }), () => {
                this.loadGridData();
              });
            }}
            actionExport={() => this.exportToExcel()}
            extraButtons={extraButtons}
            addonButtons={addonButtons}
            onSelectRow={(record, index) => {
              console.log(record);
              this.setState({
                selectedRecord: record,
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
                selectedRowKeys: selectedRowKeys,
              });
            }}
          />

      </Col>
    </Row>);
  };
}
export default connect(({ universal, loading }) => ({
  universal,
  loadingData: loading.effects['universal/paymentsData']
}))(PaymentsMT100)
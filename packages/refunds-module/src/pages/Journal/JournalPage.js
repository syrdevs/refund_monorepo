import React, { Component } from 'react';
import {
  Card,
  Tabs,
  Icon,
  Label,
  Row,
  Col,
  Spin,
} from 'antd';

import saveAs from 'file-saver';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import moment from "moment";
import SmartGridView from "../../components/SmartGridView";
import connect from "../../Redux";
import formatMessage from "../../utils/formatMessage";
import GridFilter from "../../components/GridFilter";
import { Animated } from "react-animated-css";

const TabPane = Tabs.TabPane;
const dateFormat = 'YYYY/MM/DD';



 class JournalPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortedInfo: {},
      fcolumn: [
        {
          title: 'Потребитель',
          order: 8,
          key: 'fio',
          isVisible: true,
          width: 200,
          render: (item) => {
            //console.log(i);
            return item.refundId.personSurname + ' ' + item.refundId.personFirstname + ' ' + item.refundId.personPatronname;
          },
        },
      ],
      columns: [{
        'title': 'Дата и время',
        'dataIndex': 'entryDate',
        'width': 200,
        'isVisible': true,
      }, {
        'title': 'Номер заявки',
        'dataIndex': 'refundId.applicationId.appNumber',
        'width': 200,
        'isVisible': true,
      }, {
        'title': 'Референс ГК',
        'dataIndex': 'refundId.gcvpReference',
        'width': 200,
        'isVisible': true,
      }, {
        'title': 'Номер ПП ГК',
        'dataIndex': 'refundId.gcvpOrderNum',
        'width': 200,
        'isVisible': true,
      }, {
        'title': 'Дата ПП ГК',
        'width': 200,
        'dataIndex': 'refundId.gcvpOrderDate',
        'isVisible': true,
      },
        /*{
        'title': 'Потребитель',
        'width': 120,
        'dataIndex': 'refundId.personSurname',
        'isVisible': true,

      },*/
        /*, {
          'title': 'Логин',
          'width': 130,
          'dataIndex': 'userId.username',
        },  {
          'title': 'Получатель (БИК)',
          'width': 120,
          'dataIndex': 'receiver_bik',
        },*/ {
          'title': 'Действие',
          'width': 200,
          'dataIndex': 'dactionId.nameRu',
        },
        {
          'title': 'Действие(до)',
          'width': 200,
          'dataIndex': 'prev_dactionId.nameRu',
        },
        {
          'title': 'Пользователь',
          'width': 200,
          'dataIndex': 'userId.userName',
        },
      ],
      filterContainer: 0,
      searchButton: false,
      filterForm: [
        {
          name: 'entryDate',
          label: 'Дата и время',
          type: 'listbetweenDate',
        }, {
          name: 'appNumber',
          label: 'Номер заявки',
          type: 'text',
        }, {
          name: 'gcvpReference',
          label: 'Референс ГК',
          type: 'text',
        }, {
          name: 'gcvpOrderNum',
          label: 'Номер ПП ГК',
          type: 'text',
        }, {
          name: 'refundId.gcvpOrderDate',
          label: 'Дата ПП ГК',
          type: 'listbetweenDate',
        }, {
          name: 'dappRefundStatus',
          label: 'Действие',
          type: 'multibox',
        },
      ],
      pagingConfig: {
        'start': 0,
        'length': 15,
        'entity': "refund_history",
        'filter': {},
        'sort': [],
      },
    };
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'universal2/clear',
      payload: {},
    });
  }

  clearFilter = () => {
    this.setState({
      pagingConfig: {
        'start': 0,
        'length': 15,
        'entity': "refund_history",
        'filter': {},
        'sort': [],
      },
    }, () => {
      this.loadMainGridData();
    });
  };

  setFilter = (filters) => {

    this.setState({
      pagingConfig: {
        'start': 0,
        'length': this.state.pagingConfig.length,
        'entity': "refund_history",
        'filter': filters,
        'sort': [],
      },
    }, () => {
      this.loadMainGridData();
    });


  };

  loadMainGridData = () => {

    const { dispatch } = this.props;

    dispatch({
      type: 'universal2/getList',
      payload: this.state.pagingConfig,
    });


  };

  exportToExcel = () => {

    let authToken = localStorage.getItem("AUTH_TOKEN");
    let columns = JSON.parse(localStorage.getItem('journalPageColumns'));

    fetch("/api/refund/exportToExcel",
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer " + authToken
        },
        method: "post",
        body: JSON.stringify({
          "entityClass": 'refund_history',
          'fileName':'Журнал действий',
          "filter": this.state.pagingConfig.filter,
          'columns': [].concat(columns.filter(column => column.isVisible)),
        })
      })
      .then(response => {
        if (response.ok) {
          return response.blob().then(blob => {
            let disposition = response.headers.get("content-disposition");
            return {
              fileName: this.getFileNameByContentDisposition(disposition),
              raw: blob
            };
          });
        }
      })
      .then(data => {
        if (data) {
          saveAs(data.raw, moment().format("DDMMYYYY") + data.fileName);
        }
      });
  };
  getFileNameByContentDisposition(contentDisposition){
    var regex = /filename[^;=\n]*=(UTF-8(['"]*))?(.*)/;
    var matches = regex.exec(contentDisposition);
    var filename;
    var filenames;
    if (matches != null && matches[3]) {
      filename = matches[3].replace(/['"]/g, '');
      var match = regex.exec(filename);
      if (match != null && match[3]) {
        filenames = match[3].replace(/['"]/g, '').replace('utf-8','');
      }
    }
    return decodeURI(filenames);
  }

  componentDidMount() {
    this.loadMainGridData();
  }

  onShowSizeChange = (current, pageSize) => {

    const max = current * pageSize;
    const min = max - pageSize;
    const { dispatch } = this.props;

    this.setState(prevState => ({
      pagingConfig: {
        ...prevState.pagingConfig,
        start: current,
        length: pageSize,
      },
    }), () => {
      dispatch({
        type: 'universal2/getList',
        payload: {
          ...this.state.pagingConfig,
          start: current,
          length: pageSize,
        },
      });
    });


  };

  refreshTable = () => {
    this.loadMainGridData();
  };

  filterPanelState = () => {
    this.setState(({ filterContainer }) => ({
      searchButton: filterContainer == 6 ? 0 : 6,
      filterContainer: filterContainer == 6 ? 0 : 6,
    }));
  };

  render() {
    const { universal2 } = this.props;
    const refundHistory = universal2.references[this.state.pagingConfig.entity];

    const { dataStore, columns } = this.props.universal2;

    const DataDiv = () => (
        <SmartGridView
          name={'journalPageColumns'}
          searchButton={this.state.searchButton}
          fixedBody={true}
          rowKey={'id'}
          loading={this.props.loadingData}
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
            total: refundHistory ? refundHistory.totalElements : 0,
            pageSize: this.state.pagingConfig.length,
            page: this.state.pagingConfig.start + 1,
            data: refundHistory ? refundHistory.content : [],
          }}
          onShowSizeChange={(pageNumber, pageSize) => this.onShowSizeChange(pageNumber, pageSize)}
          onRefresh={() => {
            this.refreshTable();
          }}
          onSort={(column) => {

            if (Object.keys(column).length === 0) {
              this.setState(prevState => ({
                pagingConfig: {
                  ...prevState.pagingConfig,
                  sort: [],
                },
                sortedInfo: {},
              }), () => {
                this.loadMainGridData();
              });
              return;
            }

            this.setState(prevState => ({
              sortedInfo: column,
              pagingConfig: {
                ...prevState.pagingConfig,
                sort: [{ field: column.field==='mt102LoadStatus.text'?'mt102LoadStatus': column.field, 'desc': column.order === 'descend' }],
              },
            }), () => {
              this.loadMainGridData();
            });
          }}
          onSearch={() => {
            this.filterPanelState();
          }}
        />
    );

    return (
      <div>
        <Card bodyStyle={{ padding: 5 }}>
          <Tabs defaultActiveKey="1">
            <TabPane tab={formatMessage({ id: 'menu.journal.refunds' })} key="1">
              <Row>
                <Col xs={this.state.filterContainer !== 6 ? 0 : 24} sm={this.state.filterContainer !== 6 ? 0 : 24}
                     md={this.state.filterContainer}>
                  <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
                    <Card
                      headStyle={{
                        padding: '0 14px',
                      }}
                      style={{ margin: '0px 5px 10px 0px', borderRadius: '5px' }}
                      type="inner"
                      title={formatMessage({ id: 'system.filter' })}
                      extra={<Icon style={{ 'cursor': 'pointer' }} onClick={this.filterPanelState}><FontAwesomeIcon
                        icon={faTimes}/></Icon>}
                    >
                      <GridFilter clearFilter={this.clearFilter} applyFilter={this.setFilter} key={'1'}
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
            </TabPane>
            {/*<TabPane tab={formatMessage({ id: 'menu.journal.requests' })} key="2">*/}
            {/*Заявки*/}
            {/*</TabPane>*/}
          </Tabs>
        </Card>
        <br/>
      </div>);
  }

}

export default connect(({ universal2, loading }) => ({
  universal2,
  loadingData: loading.effects['universal2/getList'],
}))(JournalPage)

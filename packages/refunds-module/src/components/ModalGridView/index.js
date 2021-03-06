import React, { Component } from "react";
import { Modal, Tabs, Table, Button, Spin } from "antd";
import formatMessage from "../../utils/formatMessage";
import SmartGridView from "../../components/SmartGridView";
import saveAs from "file-saver";
import connect from "../../Redux";
import request from "../../utils/request";
import Guid from "../../utils/Guid";
import numberWithSpaces from "../../utils/numberFormat";
// import moment from "../../pages/Home/Home";
import moment from "moment/moment";


const TabPane = Tabs.TabPane;


class ModalGridView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      downloadBtn102Loading: false,
      dataSource: [],
      dataColumn: [],
      isVisible: false,
      filter: {},
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
        },
        {
          "title": "Сумма возврата",
          "isVisible": true,
          order: 6,
          width: 150,
          "dataIndex": "refundPayAmount",
          render: (value) => {
            if (value) {
              return numberWithSpaces(value);
            }else{
              return "";
            }
          }
        },
      ],
      columns: [{
        "title": "Номер заявки",
        width: 120,
        "isVisible": true,
        "dataIndex": "applicationId.appNumber"
      },
        {
        "title": "Сумма возврата",
        width: 150,
        "isVisible": true,
        "dataIndex": "refundPayAmount"
      },
        {
        "title": "ИИН Потребителя",
        "isVisible": true,
        width: 120,
        "dataIndex": "personIin"
      }, {
        "title": "КНП",
        "isVisible": true,
        width: 120,
        "dataIndex": "applicationId.dknpId.code"
      }, {
        "title": "Период",
        "isVisible": true,
        width: 120,
        "dataIndex": "payPeriod"
      }
      ]
    };
  }

  componentWillReceiveProps(props, prevProps) {
    if (props != null) {
      this.setState({
        isVisible: props.visible
      });
    }
  }

  componentWillUnmount() {
  }

  componentDidMount() {

    /*{
      "entity": "Refund",
        "start": 0,
        "length": 15,
        "sort": [],
        "filter": payload.payload
    }*/
    /*{
      "searched": true,
        "data": {
      "dappRefundStatusId.code": [
        "00007"
      ]
    }
    }*/

   /* console.log(this.props.filter);
    console.log("this.props.filter");*/
    const data = this.props.filter;
    this.setState({
      filter: {
        "entity": "Refund",
        "start": 0,
        "length": 15,
        "sort": [],
        filter: {
          ...this.props.filter,
          "dappRefundStatusId.code": ["00007"]
        }
      }
    }, () => {
      this.firstLoad();
    });

  }

  firstLoad = () => {
    const { dispatch } = this.props;
    const { filter } = this.state;
    dispatch({
      type: "universal/mt102preview",
      payload: {
        "searched": true,
        "data": {
          ...this.state.filter.filter
        }
      }
    }).then((e) => {

      if (this.props.universal.refundKnpList.length > 0) {
        this.setState({
          filter: {
            ...this.state.filter,
            filter: {
              ...this.state.filter.filter,
              knpList: [{ id: this.props.universal.refundKnpList[0].id }]
            }
          },
          dataColumn: this.props.universal.refundKnpList
        });
        console.log(this.props.universal.modalgridviewdata);
        dispatch({
          type: "universal/mt102view",
          payload: this.state.filter
        }).then(() => {
          this.setState({
            dataSource: this.props.universal.modalgridviewdata
          });
        });
      } else {
        this.props.resetshow();
        Modal.info({
          title: "Сообщение",
          content: (
            <div>
              <p>Информация для формирования МТ102 отсутствует</p>
            </div>
          ),
          onOk() {
          }
        });
      }
    });
  };

  handleCancel = (e) => {
    this.props.resetshow();
  };
  onChangetab = (e, a, b) => {
    const { dispatch } = this.props;

    this.setState({
      filter: {
        ...this.state.filter,
        filter: {
          ...this.state.filter.filter,
          knpList: [{ id: e }]
        }
      }
    }, () => {
      dispatch({
        type: "universal/mt102view",
        payload: {
          ...this.state.filter
        }
      }).then(() => {
        this.setState({
          dataSource: this.props.universal.modalgridviewdata,
          dataColumn: this.props.universal.refundKnpList
        });
      });
    });

  };

  downloadFile() {
    console.log(this.state.filter);
  let dt=moment(new Date()).format('DDMMYYYY');
    request("/api/refund/mt102GroupByKnp", {
      method: "POST",
      responseType: "blob",
      body: {
        "searched": true,
        "data": {
          ...this.state.filter.filter,
          knpList: undefined,
        }
      },
      getResponse: (response) => {
        if (response.data && response.data.type)
          saveAs(new Blob([response.data], { type: response.data.type }), "MT102_"+dt+"_"+Guid.newGuid());
      }
    });
    // let authToken = localStorage.getItem('AUTH_TOKEN');
    //
    // this.setState({
    //   downloadBtn102Loading: true,
    // });
    //
    //
    //
    // fetch('/api/refund/mt102GroupByKnp',
    //   {
    //     headers: {
    //       'Content-Type': 'application/json; charset=utf-8',
    //       Authorization: 'Bearer ' + authToken,
    //     },
    //     method: 'post',
    //     body: JSON.stringify({
    //       "searched": true,
    //       "data": {
    //       ...this.state.filter.filter
    //       }
    //     }),
    //   })
    //   .then(response => {
    //     if (response.ok) {
    //       return response.blob().then(blob => {
    //         let disposition = response.headers.get('content-disposition');
    //         return {
    //           fileName: this.getFileNameByContentDisposition(disposition),
    //           raw: blob,
    //         };
    //       });
    //     }
    //   })
    //   .then(data => {
    //     this.setState({
    //       downloadBtn102Loading: false,
    //     });
    //     if (data) {
    //       saveAs(data.raw, data.fileName);
    //     }
    //   });

  };

  getFileNameByContentDisposition = (contentDisposition) => {
    var filename = "";
    if (contentDisposition && contentDisposition.indexOf("attachment") !== -1) {
      var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      var matches = filenameRegex.exec(contentDisposition);
      if (matches != null && matches[1]) {
        filename = matches[1].replace(/['"]/g, "");
      }
    }

    return filename;
  };
  handleSave = () => {
    this.downloadFile();
  };
  onShowSizeChange = (current, pageSize) => {
    const max = current * pageSize;
    const min = max - pageSize;
    const { dispatch } = this.props;
    dispatch({
      type: "universal/mt102view",
      payload: {
        ...this.state.filter,
        start: current,
        length: pageSize
      }
    }).then(() => {
      this.setState({
        dataSource: this.props.universal.modalgridviewdata,
        dataColumn: this.props.universal.refundKnpList
      });
    });
  };

//<Button key={'exportExcel'}>{formatMessage({ id: 'system.excelExport' })}</Button>,
  render() {
    const { visible, universal } = this.props;
    return (<Modal
      width={1300}
      centered
      onCancel={this.handleCancel}
      footer={[<Button loading={this.state.downloadBtn102Loading} key={"savemt"} onClick={this.handleSave}>Скачать
        МТ102</Button>,
        <Button key={"closeExcel"} onClick={this.handleCancel}>{formatMessage({ id: "system.close" })}</Button>]}
      visible={visible}>
      {/*<Spin tip={formatMessage({ id: 'system.loading' })} spinning={this.props.loadingFirst}>*/}
      <Tabs onChange={this.onChangetab}>
        {this.state.dataColumn.map((tabItem) => {
          return (<TabPane tab={tabItem.knpId} key={tabItem.id}>
            <SmartGridView
              name={"mt102ModalPageColumns"}
              scroll={{ x: "auto", y: 300 }}
              actionColumns={this.state.fcolumn}
              columns={this.state.columns}
              hideFilterBtn={true}
              showTotal={true}
              rowKey={"id"}
              hideRefreshBtn={true}
              dataSource={{
                total: this.state.dataSource.totalElements,
                pageSize: this.state.filter.length,
                page: this.state.filter.start + 1,
                data: this.state.dataSource.content
              }}
              addonButtons={[
                <div key={"total_amount"} style={{
                  paddingTop: 15,
                  display: "inline-block"
                }}>{formatMessage({ id: "system.totalAmount" })}: {numberWithSpaces(tabItem.totalAmount)}</div>]}
              onShowSizeChange={(pageNumber, pageSize) => {
                this.onShowSizeChange(pageNumber, pageSize);
              }}
              onSelectCell={(cellIndex, cell) => {

              }}
              onSelectRow={() => {

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
          </TabPane>);
        })}
      </Tabs>
      {/*</Spin>*/}
    </Modal>);
  }
}

export default connect(({ universal, loading }) => ({
  universal,
  loadingFirst: loading.effects["universal/mt102preview"],
  loadingData: loading.effects["universal/mt102view"]
}))(ModalGridView);


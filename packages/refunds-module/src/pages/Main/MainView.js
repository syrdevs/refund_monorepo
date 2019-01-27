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
  Radio,
  Input,
  DatePicker,
  LocaleProvider,
  Select,
  Checkbox,
  Divider,
  Spin,
  Badge,
  message
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload, faTimes } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import SmartGridView from "../../components/SmartGridView";
import connect from "../../Redux";
import formatMessage from "../../utils/formatMessage";
import ImportXMLModal from "./ImportXMLModal";
import ImportModalGrid from "./ImportModalGrid";
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
import Guid from "../../utils/Guid";

const FormItem = Form.Item;
const confirm = Modal.confirm;
const { RangePicker } = DatePicker;


class MainView extends Component {
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
          title: formatMessage({ id: "menu.mainview.paylists" }),
          order: 0,
          key: "operation",
          className: "action_column",
          isVisible: true,
          onCell: record => {
            return {
              onClick: () => {
                this.loadRpmuData(record);
              }
            };
          },
          render: () => (
            <Button size={"small"}>
              <Icon type="database" theme="outlined"/>
            </Button>
          )
        },
        /*{
          title: formatMessage({ id: 'menu.mainview.mt102' }),
          order: 1,
          key: 'mt102',
          className: 'action_column',
          // to do hide for don't admin
          isVisible: !hasRole(['ADMIN']),
          onCell: record => {
            return {
              onClick: () => {
                /!*const { dispatch } = this.props;
                dispatch({
                  type: 'universal2/getmt102',
                  payload: {},
                });*!/
                //this.toggleItems(record);
              },
            };
          },
          render: () => (
            <Button size={'small'}>
              <a href="/api/refund/getfile" download>
                <Icon><FontAwesomeIcon icon={faFileAlt}/></Icon>
              </a>
            </Button>
          ),
        },*/
        {
          title: formatMessage({ id: "menu.mainview.fio" }),
          order: 3,
          key: "fio",
          isVisible: true,
          width: 150,
          render: (item) => {
            return (item.personSurname ? item.personSurname : '') + " " + (item.personFirstname ? item.personFirstname : '') + " " + (item.personPatronname ? item.personPatronname : ' ' );
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
        },
       /* {
          title: "Загрузить",
          order: 50,
          key: "upload",
          className: "action_column",
          isVisible: true,
          onCell: record => {
            return {
              onClick: () => {

              }
            };
          },
          render: (record) => (
            <Upload
              showUploadList={false}
              openFileDialogOnClick={true}
              onRemove={() => {
              }}
              onPreview={() => {
              }}
              beforeUpload={(file) => {
                return false;
              }}
              onChange={(file) => {
                if (file.status !== "removing") {
                  this.uploadFile(record.id, file);
                }
              }}>
              <Icon><FontAwesomeIcon icon={faFileUpload}/></Icon>
            </Upload>
          )
        },
        {
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
                {record.refundFiles && record.refundFiles.map((item) => {
                  return <p>{item.filename} <a onClick={() => {
                    this.downloadFile(record, item);
                  }}>cкачать</a> / <a onClick={() => {
                    this.deleteFile(record, item);
                  }}>удалить</a></p>;
                })}
              </div>
          )
        }*/
      ],
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
          "title": "Дата поступления заявки на возврат",
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
        },
        { "title": "Сумма отчислений/взносов", "dataIndex": "payAmount" },
        /*{
          "title": "Дата последнего взноса",
          "dataIndex": "lastPayDate"
        },*/
        {
          "title": "Дата осуществления возврата",
          "dataIndex": "refundDate"
        }, {
          "title": "Кол-во отчислений и (или) взносов за последние 12 календарных месяцев",
          "dataIndex": "lastMedcarePayCount"
        },
        // { "title": "Статус страхования", "dataIndex": "medinsStatus" },
        {
          "title": "Референс",
          "dataIndex": "applicationId.reference"
        }, { "title": "Причина отказа", "dataIndex": "ddenyReasonId.nameRu" },
        // {
        //   "title": "Отчет об отказе",
        //   "dataIndex": "refundStatus"
        // },
        { "title": "Осталось дней", "dataIndex": "daysLeft" }, {
          "title": "Дата изменения статуса заявки",
          "dataIndex": "changeDate"
        }, { "title": "Период", "dataIndex": "payPeriod" },
        {
          "title": "ID платежа",
          "dataIndex": "mt102Id",
          "isVisible": true
        },
        {
          "title": "Результат сверки с ГБДФЛ",
          "dataIndex": "checkGBFLResult",
          "isVisible": true
        },
        {
          "title": "Номер пула",
          "dataIndex": "PackNumber",
          "isVisible": true
        }
        //
        // {
        //   "title": "Веб-сервис (сообщение) ",
        //   "dataIndex": "wsStatusMessage"
        // }
      ],
      isHidden: true,
      searchercont: 0,
      selectedRowKeys: [],
      tablecont: 24,
      xsize: "auto",
      rpmu: {
        sortedInfo: {},
        pagingConfig: {
          "start": 0,
          "length": 15,
          "sort": [],
          "src": {
            "searched": false,
            "data": {}
          }
        }
      },
      pagingConfig: {
        "entity": "Refund",
        "start": 0,
        "length": 15,
        "sort": [],
        "filter": {}
      }
    };
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: "universal2/clear",
      payload: {
        table: "requests"
      }
    });
  }

  loadMainGridData = () => {

    const { dispatch } = this.props;
    //type: 'universal/mainviewtable',
    dispatch({
      type: "universal2/getList",
      payload: this.state.pagingConfig
    });
    /*.then(() => {
    if (this.props.universal.table.totalElements===undefined)
    {
      this.setState({
        pagingConfig: {
          'start': 0,
          'length': 15,
          'src': {
            'searched': false,
            'data': {},
          },
        },
      }, () => {
        this.loadMainGridData();
      });
    }
  });*/
  };

  componentDidMount() {
    this.loadMainGridData();

    const { dispatch } = this.props;

    /*dispatch({
      type: 'universal/mainviewtable',
      payload: this.state.pagingConfig,
    });*/
    /*dispatch({
      type: 'universal/mainviewcolumn',
      payload: {},
    });*/
    /*.then(()=> {
    console.log(this.props);
    this.props.universal.columns.concat(this.state.columns);
  });*/
    /*  dispatch({
        type: 'universal/rpmuTable',
        payload: {},
      });*/
  }

  downloadFile = async (record, item) => {
    request("/api/uicommand/downloadFile", {
      method: "POST",
      responseType: "blob",
      body: {
        "entity":"refundFile",
        "id":item.id
      },
      getResponse: (response) => {
        if (response.data && response.data.type)
          saveAs(new Blob([response.data], { type: response.data.type }), Guid.newGuid());
      }
    });
  };
  deleteFile = (record, item) => {
    Modal.confirm({
      title: "Вы действительно хотите удалить этот файл?",
      okText: "Подтвердить",
      onOk: () => {
        const { dispatch } = this.props;
        dispatch({
          type: "universal/deleteObject",
          payload: {
            "entity": "refundFile",
            "alias": null,
            "id": item.id
          }
        }).then(() => {
          //this.loadPull(this.state.pagingConfig.filter["refundPack.id"]);
          this.loadMainGridData();
        });
      },
      onCancel() {

      }
    });
  };

  uploadFile = (id, file) => {
    let formData = new FormData();
    formData.append("content", file.file);
    formData.append("entity", "Refund");
    formData.append("path", "refundFiles");
    formData.append("id", id);
    request("/api/uicommand/uploadFile", {
      method: "POST",
      body: formData
    }).then(() => {
      this.loadMainGridData();
    });
  };

  onShowSizeChange = (current, pageSize) => {
    const max = current * pageSize;
    const min = max - pageSize;
    const { dispatch } = this.props;


    this.setState(prevState => ({
        pagingConfig: {
          ...prevState.pagingConfig,
          start: current,
          length: pageSize
        }
      }), () => {
        dispatch({
          type: "universal2/getList",
          payload: {
            ...this.state.pagingConfig,
            start: current,
            length: pageSize
          }
        });
      }
    );


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

  showGraphic = () => {
    this.setState({
      ShowGraph: true
    });
  };


  toggleSearcher() {
    this.setState({
      searchButton: true,
      isHidden: false,
      searchercont: 7,
      tablecont: 17,
      showpull: false
    });
  }

  toggleItems() {
    this.setState({
      searchButton: false,
      isHidden: false,
      searchercont: this.state.searchercont === 0 || this.state.searchercont === 7 ? 8 : this.state.searchercont,
      tablecont: this.state.searchercont === 0 || this.state.searchercont === 7 ? 16 : this.state.tablecont,
      showpull: false
    });
  }

  createPull = () => {
    const { dispatch } = this.props;
    dispatch({
      type: "universal/createPack",
      payload: {
        "entity": "Refund",
        "filter": {
          ...this.state.pagingConfig.filter
        }
      }
    }).then(() => {
      Modal.success({
        title: formatMessage({ id: "menu.mainview.pullbtn" }),
        content: "Успешно создан!"
      });
    })
      .catch((e) => {
        Modal.error({
          title: formatMessage({ id: "system.error" }),
          content: e.getResponseValue().data.Message
        });
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
  }

  selectTable = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  clearFilter = () => {

    this.setState({
      sortedInfo: {},
      pagingConfig: {
        "start": 0,
        "entity": "Refund",
        "length": 15,
        "sort": [],
        "filter": {}
      }
    }, () => {
      this.loadMainGridData();
    });
  };

  setFilter = (filters) => {

    this.setState({
      sortedInfo: {},
      pagingConfig: {
        "start": 0,
        "entity": "Refund",
        "length": 15,
        "sort": [],
        "filter": {
          ...filters
        }
      }
    }, () => {
      this.loadMainGridData();
    });


  };

  stateFilter = () => {

    /*   {
         name: 'test',
         label: 'selectlist',
         type: 'selectlist',
       },*/
    return [
      {
        name: "applicationId.appNumber",
        label: formatMessage({ id: "menu.filter.numberrequest" }),
        type: "text"
      },
      {
        name: "personIin",
        label: formatMessage({ id: "menu.filter.iin" }),
        type: "text",
        withMax: 12
      },
      {
        name: "dappRefundStatus",
        label: formatMessage({ id: "menu.filter.refundstatus" }),
        type: "multibox"
      },
      {
        name: "appEndDate",
        label: formatMessage({ id: "menu.filter.lastdate" }),
        type: "listbetweenDate"
      },
      {
        name: "appPayerDate",
        label: formatMessage({ id: "menu.filter.payerdate" }),
        type: "listbetweenDate"
      },
      {
        name: "_entryDate",
        label: formatMessage({ id: "menu.filter.RefundComeDate" }),
        type: "listbetweenDate"
      },
      {
        name: "_refundEntryDate",
        label: formatMessage({ id: "menu.filter.RefundFundDate" }),
        type: "listbetweenDate",
        nullBtn: true
      },
      {
        name: "refundDate",
        label: formatMessage({ id: "menu.filter.RefusalDate" }),
        type: "listbetweenDate",
        nullBtn: true
      },
      {
        name: "knp",
        label: formatMessage({ id: "menu.filter.knp" }),
        type: "multibox",
        hint: true
      },
      {
        name: "drefundReason",
        label: formatMessage({ id: "menu.filter.RefundReason" }),
        type: "combobox"
      },
      {
        name: "ddenyReason",
        label: formatMessage({ id: "menu.filter.RefusalReason" }),
        type: "combobox"
      },
      {
        name: "mt102Id",
        label: "ID платежа",
        type: "text"
      },
      {
        name: "includedInPack",
        label: "Пул",
        type: "ButtonGroup",
        buttons: [{
          label: "Все",
          value: null
        }, {
          label: "Не включен",
          value: false
        }, {
          label: "Включен",
          value: true
        }]
      }
    ];
  };

  rpmuColumn = () => {
    return [
      {
        title: formatMessage({ id: "menu.mainview.paymentsum" }),
        dataIndex: "paymentsum",
        key: "paymentsum",
        isVisible: true,
        width: 80
      },
      {
        title: formatMessage({ id: "menu.mainview.paymentperiod" }),
        dataIndex: "paymentperiod",
        isVisible: true,
        key: "paymentperiod",
        width: 70
      },
      {
        title: formatMessage({ id: "menu.mainview.knp" }),
        dataIndex: "knp",
        key: "knp",
        isVisible: true,
        width: 50
      },
      {
        title: formatMessage({ id: "menu.mainview.reference" }),
        dataIndex: "reference",
        key: "reference",
        isVisible: true,
        width: 70
      }
    ];
  };
  setStatusRecord = (statusCode, statusText) => {
    const { selectedRowKeys } = this.state;
    const { dispatch } = this.props;

    let content;
    let statusId = false;

    if (selectedRowKeys.length === 0) return false;

    if (statusCode === 2) {

      // to do status component

      dispatch({
        type: "references/load",
        code: "ddenyReason"
      }).then(() => {
        content = (<div style={{ marginTop: 10 }}><span>{formatMessage({ id: "menu.filter.RefusalReason" })}:</span>
          <Select
            style={{ width: "100%" }}
            placeholder=""
            onChange={(value) => {
              statusId = value;
            }}
          >
            <Select.Option key={null}>{<div style={{ height: 20 }}></div>}</Select.Option>
            {this.props.references["ddenyReason"] && this.props.references["ddenyReason"].map((item) => {
              return <Select.Option key={item.id}>{item.nameRu}</Select.Option>;
            })}
          </Select></div>);

        confirm({
          title: "Подтверждение",
          content: content,
          okText: "Да",
          cancelText: "Нет",
          onOk: () => {
            dispatch({
              type: "universal/changeRefundStatus",
              payload: {
                "status": statusCode,
                "denyReasonId": statusId ? { id: statusId } : null,
                "refundList": selectedRowKeys.map((valueId) => ({ id: valueId }))
              }
            }).then(() => {
              this.setState({
                selectedRowKeys: []
              }, () => {
                this.loadMainGridData();
              });
            });
          },
          onCancel: () => {
            this.setState({
              selectedRowKeys: []
            });
          }
        });

      });

    } else {
      content = "Вы действительно хотите " + statusText.toLowerCase() + " возврат? ";
      confirm({
        title: "Подтверждение",
        content: content,
        okText: "Да",
        cancelText: "Нет",
        onOk: () => {
          dispatch({
            type: "universal/changeRefundStatus",
            payload: {
              "status": statusCode,
              "denyReasonId": null,
              "refundList": selectedRowKeys.map((valueId) => ({ id: valueId }))
            }
          }).then(() => {
            this.setState({
              selectedRowKeys: []
            }, () => {
              this.loadMainGridData();
            });
          });
        },
        onCancel: () => {
          this.setState({
            selectedRowKeys: []
          });
        }
      });
    }
  };
  AppRefundStatusAuto = () => {
    const { dispatch } = this.props;
    if (this.state.selectedRowKeys.length > 0) {

      dispatch({
        type: "universal/AppRefundStatusAuto",
        payload: {
          "refundList": this.state.selectedRowKeys.map((valueId) => ({ id: valueId }))
        }
      }).then(() => {
        this.loadMainGridData();
      });
    }
  };
  disableBtnIsReceiptDateNull = () => {

    const universal = {
      table: this.props.universal2.references[this.state.pagingConfig.entity] ? this.props.universal2.references[this.state.pagingConfig.entity] : {}
    };
    if (this.state.selectedRowKeys.length > 0) {
      let nullableDateRecords = this.state.selectedRowKeys
        .map((selectKey) => universal.table.content.find(item => item.id === selectKey))
        .filter((itemRecord) => itemRecord.applicationId.receiptAppdateToFsms === null);

      return nullableDateRecords.length > 0;
    }
    return false;
  };

  checkStatus = (selectedRowKeys) => {
    this.setState({
      btnhide: false
    });
    if (selectedRowKeys.length > 0) {

      const universal = {
        table: this.props.universal2.references[this.state.pagingConfig.entity] ? this.props.universal2.references[this.state.pagingConfig.entity] : {}
      };

      selectedRowKeys.map(select => {

        if ([universal.table.content.find(item => item.id === select)].map(item => item.dappRefundStatusId.code === "00007" || item.dappRefundStatusId.code === "00008")[0]) {
          this.setState({
            btnhide: true
          });
        }
      });
    }
    this.setState({
      selectedRowKeys: selectedRowKeys
    });
  };

  refundsReceiver = () => {
    confirm({
      title: "Подтверждение",
      content: "Вы действительно хотите получить заявки на возврат?",
      okText: "Да",
      cancelText: "Нет",
      onOk: () => {
        const { dispatch } = this.props;
        dispatch({
          type: "universal/receiversRefund",
          payload: {
            "id": "e6c16d0c-72cb-450d-a813-af5bbd399d91",
            "parameters": [
              {
                "name": "Код статуса",
                "value": "00010"
              },
              {
                "name": "Количество",
                "value": 5
              }
            ]
          }
        }).then(() => this.loadMainGridData());
      },
      onCancel: () => {

      }
    });
  };

  btnIsDisabled = (isRole, args) => {
    return !isRole ? args.filter((eq) => (eq)).length > 0 : true;
  };

  loadRpmuData = (recordId) => {

    const { dispatch } = this.props;

    dispatch({
      type: "universal/rpmuTable",
      payload: {
        "start": 0,
        "length": 30,
        "refundId": {
          "id": recordId.id
        }
      }
    }).then(() => {
      this.toggleItems(recordId);
    });
  };

  exportToExcel = () => {

    let authToken = localStorage.getItem("AUTH_TOKEN");
    let columns = JSON.parse(localStorage.getItem("RefundsPageColumns"));

    request("/api/refund/exportToExcel", {
      method: "POST",
      responseType: "blob",
      body: {
        "entityClass": "Refund",
        "fileName": formatMessage({ id: "menu.refunds" }),
        "filter": this.state.pagingConfig.filter,
        "columns": [{
          "title": "Статус заявки на возврат",
          "dataIndex": "dappRefundStatusId.nameRu"
        }, {
          "dataIndex": "personSurname",
          "title": "Фамилия"
        }, {
          "dataIndex": "personFirstname",
          "title": "Имя"
        }, {
          "dataIndex": "personPatronname",
          "title": "Отчество"
        }].concat(columns.filter(column => column.isVisible))
      },
      getResponse: (response) => {
        if (response.status === 200) {
          if (response.data && response.data.type)
            saveAs(new Blob([response.data], { type: response.data.type }), Guid.newGuid());
        }
      }
    });


    // fetch("/api/refund/exportToExcel",
    //   {
    //     headers: {
    //       "Content-Type": "application/json; charset=utf-8",
    //       Authorization: "Bearer " + authToken
    //     },
    //     method: "post",
    //     body: JSON.stringify({
    //       "entityClass": "Refund",
    //       "fileName": formatMessage({ id: "menu.refunds" }),
    //       "filter": this.state.pagingConfig.filter,
    //       "columns": [{
    //         "title": "Статус заявки на возврат",
    //         "dataIndex": "dappRefundStatusId.nameRu"
    //       }, {
    //         "dataIndex": "personSurname",
    //         "title": "Фамилия"
    //       }, {
    //         "dataIndex": "personFirstname",
    //         "title": "Имя"
    //       }, {
    //         "dataIndex": "personPatronname",
    //         "title": "Отчество"
    //       }].concat(columns.filter(column => column.isVisible))
    //     })
    //   })
    //   .then(response => {
    //     if (response.ok) {
    //       return response.blob().then(blob => {
    //         let disposition = response.headers.get("content-disposition");
    //         return {
    //           fileName: this.getFileNameByContentDisposition(disposition),
    //           raw: blob
    //         };
    //       });
    //     }
    //   })
    //   .then(data => {
    //     if (data) {
    //       saveAs(data.raw, moment().format("DDMMYYYY") + data.fileName);
    //     }
    //   });

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


  importXmlAction = (file) => {

    let formData = new FormData();
    formData.append("content", file.file);
    request("/api/refund/importPaymentStatment", {
      method: "POST",
      body: formData
    }).then((response) => {
      this.setState({
        ImportXMLModal: {
          visible: true,
          data: response
        }
      });
    });

  };

  render() {
    const universal = {
      table: this.props.universal2.references[this.state.pagingConfig.entity] ? this.props.universal2.references[this.state.pagingConfig.entity] : {}
    };
    const dateFormat = "DD.MM.YYYY";
    /*const { universal } = this.props;
    console.log(universal);*/

    const rpmuColumns = this.rpmuColumn();
    const GridFilterData = this.stateFilter();


    return (
      <div>
        {this.state.ImportXMLModal.visible &&
        <ImportXMLModal
          closeAction={() => this.setState(prevState => ({ ImportXMLModal: { visible: false } }))}
          columns={this.state.columns}
          fcolumn={this.state.fcolumn}
          loadingData={this.props.loadingData}
          xmldata={this.state.ImportXMLModal.data}
          onSelectedRows={(selectedRecords) => {}}
        />}

        {this.state.ModalChangeDateRefund && <ModalChangeDateRefund
          selectedRowKeys={this.state.selectedRowKeys}
          dateFormat={dateFormat}
          hideModal={(loadData) => {
            if (loadData)
              this.setState({
                ModalChangeDateRefund: false,
                selectedRowKeys: [],
                btnhide: false
              }, () => this.loadMainGridData());
            else this.setState({ ModalChangeDateRefund: false });
          }}/>}

        <ModalGraphView visible={this.state.ShowGraph}
                        resetshow={(e) => {
                          this.setState({ ShowGraph: false });
                        }}
                        dataSource={universal.mainmodal}/>

        {this.state.ShowModal && <ModalGridView visible={this.state.ShowModal}
                                                resetshow={(e) => {
                                                  this.setState({ ShowModal: false });
                                                }}
                                                filter={this.state.pagingConfig}/>}

        <Card bodyStyle={{ padding: 5 }}>
          <Row>
            <Card bodyStyle={{ padding: 5 }} style={{ margin: "5px 0 10px 0" }}>
              <Button onClick={() => this.setStatusRecord(1, formatMessage({ id: "menu.mainview.approveBtn" }))}
                      disabled={this.btnIsDisabled(hasRole(["FSMS1", "FSMS2", "ADMIN"]), [this.state.btnhide, this.state.selectedRowKeys.length === 0])}
                      style={{ marginLeft: "5px" }}
                      key={"odobrit"} className={"btn-success"}
              >
                {formatMessage({ id: "menu.mainview.approveBtn" })} {this.state.selectedRowKeys.length > 0 && `(${this.state.selectedRowKeys.length})`}
              </Button>
              <Button onClick={() => this.setStatusRecord(2, formatMessage({ id: "menu.mainview.cancelBtn" }))}
                      disabled={this.btnIsDisabled(hasRole(["FSMS1", "FSMS2", "ADMIN"]), [this.state.btnhide, this.state.selectedRowKeys.length === 0])}
                      key={"cancel"}
                      style={{ marginLeft: "5px" }}
                      className={"btn-danger"}>
                {formatMessage({ id: "menu.mainview.cancelBtn" })} {this.state.selectedRowKeys.length > 0 && `(${this.state.selectedRowKeys.length})`}
              </Button>
              <Button onClick={() => this.setStatusRecord(3, formatMessage({ id: "menu.mainview.saveBtn" }))}
                      disabled={this.btnIsDisabled(hasRole(["FSMS1", "FSMS2", "ADMIN"]), [this.disableBtnIsReceiptDateNull(), this.state.btnhide, this.state.selectedRowKeys.length === 0])}
                      style={{ marginLeft: "5px" }}
                      key={"save"}>{formatMessage({ id: "menu.mainview.saveBtn" })} {this.state.selectedRowKeys.length > 0 && `(${this.state.selectedRowKeys.length})`}</Button>
              <Button onClick={() => this.setStatusRecord(4, formatMessage({ id: "menu.mainview.performBtn" }))}
                      disabled={this.btnIsDisabled(hasRole(["FSMS2", "ADMIN"]), [this.disableBtnIsReceiptDateNull(), this.state.btnhide, this.state.selectedRowKeys.length === 0])}
                      style={{ marginLeft: "5px", marginRight: "5px" }}
                      key={"run"}>{formatMessage({ id: "menu.mainview.performBtn" })} {this.state.selectedRowKeys.length > 0 && `(${this.state.selectedRowKeys.length})`}</Button>

              <Button onClick={() => {
                this.createPull();
              }}
                /* disabled={this.state.selectedRowKeys.length === 0}*/
                      style={{ marginLeft: "5px", marginRight: "5px" }}
                      key={"pull"}>
                {formatMessage({ id: "menu.mainview.pullbtn" })} {/* {this.state.selectedRowKeys.length > 0 && `(${this.state.selectedRowKeys.length})`}*/}
              </Button>
              <Dropdown key={"dropdown"} trigger={["click"]} overlay={<Menu>
                <Menu.Item
                  disabled={this.btnIsDisabled(hasRole(["FSMS2", "ADMIN"]), [this.state.btnhide, this.state.selectedRowKeys.length === 0])}
                  key="1"
                  onClick={this.AppRefundStatusAuto}>
                  {formatMessage({ id: "menu.mainview.verifyRPMUBtn" })} {this.state.selectedRowKeys.length > 0 && `(${this.state.selectedRowKeys.length})`}
                </Menu.Item>
                <Menu.Item
                  key="2" onClick={this.exportToExcel}>
                  {formatMessage({ id: "menu.mainview.excelBtn" })}
                </Menu.Item>
                <Menu.Item
                  disabled={this.btnIsDisabled(hasRole(["FSMS2", "ADMIN"]), [this.state.selectedRowKeys.length === 0])}
                  key="3"
                  onClick={() => {
                    this.setState({ ModalChangeDateRefund: true });
                  }}>
                  {formatMessage({ id: "menu.mainview.setDateBtn" })}
                </Menu.Item>
                <Menu.Item disabled={hasRole(["ADMIN", "FSMS2"])} key="4" onClick={() => {
                  this.showModal();
                }}>
                  {formatMessage({ id: "menu.mainview.mt102Btn" })}
                </Menu.Item>
                <Menu.Item disabled={hasRole(["ADMIN", "FSMS1", "FSMS2"])} key="5" onClick={() => {}}>
                  <Upload
                    showUploadList={false}
                    openFileDialogOnClick={true}
                    onRemove={() => {

                    }}
                    onPreview={() => {

                    }}
                    beforeUpload={(file) => {
                      /*this.setState(state => ({
                        fileList: [...state.fileList, file],
                      }));
                      return false;*/
                      //console.log("test");
                      //this.importXmlAction(file);
                      return false;
                    }}
                    onChange={(file) => {
                      if (file.status !== "removing") {
                        this.importXmlAction(file);
                      }
                    }}>
                    {formatMessage({ id: "menu.mainview.xmlBtn" })}
                  </Upload>
                </Menu.Item>
                <Menu.Item disabled={hasRole(["ADMIN"])} key="6" onClick={() => {
                  this.showGraphic();
                }}>
                  {formatMessage({ id: "menu.mainview.infographBtn" })}
                </Menu.Item>
                <Menu.Item disabled={hasRole(["FSMS1", "FSMS2", "ADMIN"])} key="7" onClick={() => {
                  this.refundsReceiver();
                }}>
                  {formatMessage({ id: "menu.mainview.refundreceiver" })}
                </Menu.Item>
              </Menu>
              }>
                <Button disabled={hasRole(["FSMS2", "ADMIN"])}
                        key={"action"}>{formatMessage({ id: "menu.mainview.actionBtn" })} <Icon
                  type="down"/></Button>
              </Dropdown>
            </Card>
          </Row>
          <Row>
            <Col sm={24} md={this.state.searchercont}>
              <div>
                <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
                  <Card
                    style={{
                      margin: "0px 5px 10px 0px",
                      borderRadius: "5px",
                      display: [8, 12, 16].indexOf(this.state.searchercont) === -1 && !this.state.showpull ? "block" : "none"
                    }}
                    type="inner"
                    title={formatMessage({ id: "system.filter" })}
                    headStyle={{
                      padding: "0 14px"
                    }}
                    extra={<Icon style={{ "cursor": "pointer" }} onClick={event => this.hideleft()}><FontAwesomeIcon
                      icon={faTimes}/></Icon>}>
                    <GridFilter
                      clearFilter={() => {
                        this.clearFilter();
                      }}
                      applyFilter={(filters) => {
                        this.setFilter(filters);
                      }}
                      filterForm={GridFilterData}
                      dateFormat={dateFormat}/>
                  </Card>
                </Animated>

                {([8, 12, 16].indexOf(this.state.searchercont) !== -1 && !this.state.showpull) &&
                <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
                  <Card
                    style={{ margin: "0px 5px 10px 0px", borderRadius: "5px" }}
                    bodyStyle={{ padding: 5 }}
                    type="inner"
                    title={formatMessage({ id: "menu.mainview.rpmuLocale" })}
                    extra={[<Icon style={{ "cursor": "pointer" }} onClick={event => this.hideleft()}><FontAwesomeIcon
                      icon={faTimes}/></Icon>]}
                  >
                    <LocaleProvider locale={componentLocal}>
                      <SmartGridView
                        name={"RefundsRPMUColumns"}
                        rowKey={"id"}
                        showTotal
                        addonButtons={[<Radio.Group
                          size={"default"}
                          style={{
                            display: "block",
                            float: "left",
                            margin: "5px 2px 8px"
                          }}
                          value={this.state.searchercont}
                          onChange={(e) => {
                            this.setState({
                              searchercont: parseInt(e.target.value),
                              tablecont: 24 - parseInt(e.target.value)
                            });
                          }}>
                          <Radio.Button value={8}>30%</Radio.Button>
                          <Radio.Button value={12}>50%</Radio.Button>
                          <Radio.Button value={16}>70%</Radio.Button>
                        </Radio.Group>]}
                        scroll={{ x: this.state.xsize }}
                        actionColumns={[
                          {
                            title: formatMessage({ id: "menu.mainview.rpmuName" }),
                            key: "lastname",
                            order: 0,
                            isVisible: true,
                            width: 200,
                            render: (text, record) => (<div>
                                {text.lastname + " " + text.firstname + " " + text.secondname}
                                <br/>
                                {"(ИИН: " + text.iin + ", ДР: " + text.birthdate + ")"}
                              </div>
                            )
                          }]}
                        columns={rpmuColumns}
                        sorted={true}
                        sortedInfo={this.state.sortedInfo}
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
                        rowSelection={false}
                        rowClassName={(record) => {
                          if (record.refundExist) {
                            return "greenRow";
                          }
                        }
                        }
                        hideFilterBtn={true}
                        hideRefreshBtn={true}
                        dataSource={{
                          total: this.props.universal.rpmu.totalElements,
                          pageSize: this.state.rpmu.pagingConfig.length,
                          page: this.state.rpmu.pagingConfig.start + 1,
                          data: this.props.universal.rpmu.content
                        }}
                      />
                    </LocaleProvider>
                  </Card>
                </Animated>
                }
              </div>
            </Col>
            <Col sm={24} md={this.state.tablecont}>
              {/*<Card style={{ borderRadius: '5px', marginBottom: '10px' }} bodyStyle={{ padding: 0 }} bordered={true}>*/}

              <SmartGridView
                name={"RefundsPageColumns"}
                scroll={{ x: this.state.xsize }}
                selectedRowCheckBox={true}
                searchButton={this.state.searchButton}
                selectedRowKeys={this.state.selectedRowKeys}
                rowKey={"id"}
                loading={this.props.loadingData}
                rowSelection={true}
                actionColumns={this.state.fcolumn}
                columns={this.state.columns}
                sorted={true}
                sortedInfo={this.state.sortedInfo}
                showTotal={true}
                showExportBtn={true}
                dataSource={{
                  total: universal.table.totalElements,
                  pageSize: this.state.pagingConfig.length,
                  page: this.state.pagingConfig.start + 1,
                  data: universal.table.content
                }}
                addonButtons={[]}
                actionExport={() => this.exportToExcel()}
                onShowSizeChange={(pageNumber, pageSize) => {
                  this.onShowSizeChange(pageNumber, pageSize);
                }}
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
                  //console.log(record);
                }}
                onFilter={(filters) => {

                }}
                onRefresh={() => {
                  this.loadMainGridData();
                }}
                onSearch={() => {
                  this.toggleSearcher();
                }}
                onSelectCheckboxChange={(selectedRowKeys) => {
                  this.checkStatus(selectedRowKeys);
                }}
              />
              <br/>
              {/*</Card>*/}
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
}))(MainView);

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
import { faFileUpload, faTimes } from "@fortawesome/free-solid-svg-icons";
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
import SignModal from "../../components/SignModal";
import saveAs from "file-saver";
import request from "../../utils/request";
import { setAcceptToRefund } from "../../services/api";
import { faUpload } from "@fortawesome/free-solid-svg-icons/index";
import Guid from "../../utils/Guid";
import EmployeesModal from "../Options/EmployeesModal";


const { TextArea } = Input;
const FormItem = Form.Item;
const confirm = Modal.confirm;
const { RangePicker } = DatePicker;

const RejectModalContent = (prop) => {
  return (<div>
    Причина отклонения:
    <TextArea
      onChange={(e) => {
        prop.setReject(e.target.value);
      }}
      style={{ marginTop: "5px" }}
      rows={2}/>
  </div>);
};


class Pulls extends Component {
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
          title: "Статус рассмотрения",
          order: 1,
          key: "viewstatus",
          isVisible: true,
          sorted: false,
          width: 150,
          render: (item) => {
            /*if (item.isAccepted === true) {
              return "Подтвержден";
            }
            else if (item.isAccepted === false) {
              return "Отклонен";
            }
            else {
              return " ";
            }*/
            return item.acceptedStatusText;
          }
        },
        {
          title: formatMessage({ id: "menu.mainview.fio" }),
          order: 3,
          key: "fio",
          sorted: false,
          isVisible: true,
          width: 150,
          render: (item) => {
            //return item.refund.personSurname + " " + item.refund.personFirstname + " " + item.refund.personPatronname;
            return (item.refund.personSurname ? item.refund.personSurname : "") + " "
              + (item.refund.personFirstname ? item.refund.personFirstname : "") + " "
              + (item.refund.personPatronname ? item.refund.personPatronname : " ");
          }
        }, {
          "title": "Статус заявки на возврат",
          isVisible: true,
          sorted: false,
          "dataIndex": "dappRefundStatusId.nameRu ",
          order: 7,
          render: (record, value) => <a
            style={{ color: this.setColor(value.refund.isRefundConfirm) }}//value.isRefundConfirm ? 'green' : 'red' }}
            href="#"> <span><Badge
            status={this.setBadgeStatus(value.refund.isRefundConfirm)}/></span> {value.refund.dappRefundStatusId ? value.refund.dappRefundStatusId.nameRu : null}
          </a>
        },
        {
          title: "Загрузить",
          sorted: false,
          order: 50,
          key: "upload",
          className: "action_column",
          isVisible: true,
          onCell: record => {
            return {
              onClick: () => {
                // this.uploadFile(record.refund.id);
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
                  this.uploadFile(record.refund.id, file);
                }
              }}>
              {/*<Icon type="database" theme="outlined"/>*/}
              <Icon><FontAwesomeIcon icon={faFileUpload}/></Icon>
            </Upload>
          )
        },
        {
          title: "Файлы",
          sorted: false,
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
                return <p>{item.filename} <a onClick={() => {
                  this.downloadFile(record, item);
                }}>cкачать</a> / <a onClick={() => {
                  this.deleteFile(record, item);
                }}>удалить</a></p>;
              })}
            </div>
          )
        }
      ],
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
      ispublish: true,
      ShowSign: false,
      buttonShow: false,
      employvisible: false,
      disBtn: false
    };
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: "universal2/clear",
      payload: {
        table: "refundPack"
      }
    });
  }

  downloadFile = async (record, item) => {
    request("/api/uicommand/downloadFile", {
      method: "POST",
      responseType: "blob",
      body: {
        "entity": "refundFile",
        "id": item.id
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
          this.loadPull(this.state.pagingConfig.filter["refundPack.id"]);
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
      this.loadPull(this.state.pagingConfig.filter["refundPack.id"]);
    });
  };

  loadMainGridData = () => {
    const { dispatch } = this.props;
    dispatch({
      type: "universal2/getList",
      payload: this.state.pagingConfig
    }).then(() => {
      this.loadfromfilter(this.props.universal2.references["refundPack"].content[0]);
    });
  };

  componentDidMount() {
    if (!hasRole(["ADMIN", "DK1", "DK2"])) {
      this.state.fcolumn.push({
        title: "Исполнитель",
        order: 0,
        sorted: false,
        key: "accept",
        isVisible: true,
        width: 250,
        render: (item) => {
          return item.needAcceptedUser ? (item.needAcceptedUser.userName ? item.needAcceptedUser.userName : "") : "";
        }
      });
    }

    const { dispatch } = this.props;
    dispatch({
      type: "universal2/getList",
      payload: {
        "start": 0,
        "length": 15,
        "entity": "refundPack",
        "alias": null,
        sort: [{ field: "number", desc: true }]
      }
    })
      .then((response) => {
        if (this.props.universal2.references["refundPack"].content) {
          if (this.props.universal2.references["refundPack"].content.length > 0) {
            this.setState({
              ispublish: this.props.universal2.references["refundPack"].content[0].documentStatuss
            }, () => {
              this.loadfromfilter(this.props.universal2.references["refundPack"].content[0]);
              this.togglePulls();
            });
          }
        }
      });
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

  setAcceptToRefund = (accept, rejectText) => {
    const { dispatch } = this.props;
    dispatch({
      type: "universal/setAcceptToRefunds",
      payload: {
        "entity": "refundItem",
        "id": this.state.selectedRowKeys,
        "isAccept": accept,
        "rejectText": rejectText
      }
    }).then((e) => {
      this.loadPull(this.state.pagingConfig.filter["refundPack.id"]);
    })
      .catch((e) => {
        Modal.error({
          content: e.getResponseValue().data.Message ? (e.getResponseValue().data.Message) : "Ошибка на стороне сервера!"
        });
        this.loadPull(this.state.pagingConfig.filter["refundPack.id"]);
      });

  };

  confirming = () => {
    Modal.confirm({
      title: "Подтвердить",
      okText: "Подтвердить",
      cancelText: "Отмена",
      onOk: () => {
        this.setAcceptToRefund(true);
      },
      onCancel: () => {
      }
    });
  };

  publish = () => {
    if (this.state.pagingConfig.filter["refundPack.id"] != null) {
      const { dispatch } = this.props;
      dispatch({
        type: "universal/publishing",
        payload: {
          "entity": "refundPack",
          "id": (this.state.pagingConfig.filter["refundPack.id"])
        }
      }).then((response) => {
        Modal.success({
          content: "Документ успешно опубликован"
        });
        this.loadPull(this.state.pagingConfig.filter["refundPack.id"]);
      })
        .catch((res) => {
          Modal.error({
            title: "Ошибка",
            content: res.getResponseValue().data.Message
          });
          this.loadPull(this.state.pagingConfig.filter["refundPack.id"]);
        });
    }
  };

  cancelpull = () => {
    Modal.confirm({
      title: "Исключить из пула?",
      okText: "Подтвердить",
      cancelText: "Отмена",
      onOk: () => {
        const { dispatch } = this.props;
        dispatch({
          type: "universal/deleteObject",
          payload: {
            "entity": "refundItem",
            "alias": null,
            "id": this.state.selectedRowKeys
          }
        }).catch((e) => {
          Modal.error({
            title: formatMessage({ id: "system.error" }),
            content: e.getResponseValue().data.Message
          });
        }).then(() => {
          this.loadPull(this.state.pagingConfig.filter["refundPack.id"]);
        });
      },
      onCancel: () => {

      }
    });
  };

  rejecting = () => {

    let rejectText = "";
    let modal = null;
    modal = Modal.confirm({
      title: "Отклонить",
      okText: "Подтвердить",
      cancelText: "Отмена",
      okButtonProps: {
        disabled: true
      },
      content: <RejectModalContent setReject={(text) => {
        rejectText = text;

        if (rejectText.length > 0) {
          modal.update({
            okButtonProps: {
              disabled: false
            }
          });
        }
        if (rejectText.length === 0) {
          modal.update({
            okButtonProps: {
              disabled: true
            }
          });
        }
      }}/>,
      onOk: () => {
        this.setAcceptToRefund(false, rejectText);
      },
      onCancel: () => {
        modal.update({
          okButtonProps: {
            disabled: true
          }
        });
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

  checkStatuss = () => {
    return false;
  };

  onSetUser = (id) => {
    const { dispatch } = this.props;
    dispatch({
      type: "universal/setRefundNeedAcceptUser",
      payload: {
        "entity": "refundItem",
        "id": this.state.selectedRowKeys,
        "userID": id
      }
    }).then((e) => {
      this.loadPull(this.state.pagingConfig.filter["refundPack.id"]);
    })
      .catch((e) => {
        Modal.error({
          content: e.getResponseValue().data.Message ? (e.getResponseValue().data.Message) : "Ошибка на стороне сервера!"
        });
        this.loadPull(this.state.pagingConfig.filter["refundPack.id"]);
      });

  };

  loadPull = (id, item) => {
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
      }).catch((e) => {
        Modal.error({
          title: formatMessage({ id: "system.error" }),
          content: e.getResponseValue().data.Message
        });
      }).then((response) => {
        this.setState({
          selectedRowKeys: []
        });
      });
    });
  };

  loadfromfilter = (item) => {
    this.setState({
      disBtn: item,
      pagingConfig: {
        ...this.state.pagingConfig,
        "filter": {
          "refundPack.id": item.id
        }
      }
    }, () => {
      const { dispatch } = this.props;
      dispatch({
        type: "universal2/getList",
        payload: {
          ...this.state.pagingConfig
        }
      }).then((response) => {
        this.setState({
          selectedRowKeys: []
        });
      });
    });

  };

  exportToExcel = () => {

    const PullPageColumns = localStorage.getItem("PullPage") ? JSON.parse(localStorage.getItem("PullPage")) : [];
    const columns = PullPageColumns.map((column) => {
      if (column.isVisible && column.isVisible !== "false") {
        return column;
      }
      if (column.isVisible === true) {
        return column;
      }
      if (column.isVisible === "true") {
        return column;
      }
    }).filter(c => c);

    request("/api/refund/exportToExcel", {
      responseType: "blob",
      method: "post",
      body: {
        "entityClass": this.state.pagingConfig.entity,
        "fileName": "Пулы",
        "src": {
          "searched": true,
          "data": this.state.pagingConfig.filter
        },
        "columns": columns
      },
      getResponse: (response) => {
        if (response.status === 200) {
          if (response.data && response.data.type)
            saveAs(new Blob([response.data], { type: response.data.type }), Guid.newGuid());
        }
      }
    });
  };
  hideemployes = () => {
    this.setState({
      employvisible: false
    });
  };

  btnIsDisabled = (args) => {
    return args.filter((eq) => (eq)).length > 0;
  };

  render() {
    const universal = {
      table: this.props.universal2.references[this.state.pagingConfig.entity] ? this.props.universal2.references[this.state.pagingConfig.entity] : {}
    };

    const dateFormat = "DD.MM.YYYY";

    let SignBtnGroupsIsDisabled = this.btnIsDisabled([this.state.selectedRowKeys.length === 0, (this.state.disBtn.rawRecordsCount === 0 && this.state.disBtn.unconfirmedRecordsCount === 0), (this.state.disBtn.rawRecordsCount !== 0 && this.state.disBtn.unconfirmedRecordsCount > 0), (this.state.disBtn.currentStatus ? this.state.disBtn.currentStatus.result : 1) === 0]);

    return (
      <div>
        {this.state.employvisible && <EmployeesModal
          onChecked={(id) => this.onSetUser(id)}
          onCancel={this.hideemployes} keys={this.state.selectedRowKeys}/>}

        {this.state.ShowSign &&
        <SignModal
          onCancel={() => {
            this.setState({
              ShowSign: false
            });
          }}
          type={"refundPack"}
          id={this.state.pagingConfig.filter["refundPack.id"]}
          visible={this.state.ShowSign}
          getKey={(e) => {
            request("/api/contract/uploadSignedDocument", {
              method: "POST",
              body: {
                "entity": "refundPack",
                "alias": null,
                "id": this.state.pagingConfig.filter["refundPack.id"],
                "xml": e[0].xml
              },
              getResponse: (response) => {
                if (response.status >= 400) {
                  Modal.error({
                    content: "Ошибка подписи документа"
                  });
                } else if (response.status === 200) {
                  this.setState({
                    ShowSign: false
                  }, () => {
                    // router.push('/documents');
                    Modal.info({
                      content: "Документ подписан"
                    });
                  });
                }
              }
            })
              .then(data => {

              })
              .catch(function(e) {
                // Modal.error({
                //   content: "Ошибка подписи документа"
                // });
              });
          }}
        />}
        <Card bodyStyle={{ padding: 5 }}>
          <Row>
            <Card bodyStyle={{ padding: 5 }} style={{ marginTop: "5px" }}>
              <Button
                disabled={hasRole(["ADMIN", "DPN1"]) || (this.state.ispublish || ((this.state.disBtn.currentStatus ? this.state.disBtn.currentStatus.result : 1) === 0))}
                onClick={() => {
                  this.publish();
                }}
                style={{ marginLeft: "5px" }}
                key={"publish"}
              >
                Опубликовать
              </Button>
              {/*<Button*/}
              {/*disabled={(this.state.pagingConfig.filter["refundPack.id"] === null || ((this.state.disBtn.currentStatus ? this.state.disBtn.currentStatus.result : 1) === 0))}*/}
              {/*onClick={() => {*/}
              {/*this.setState({*/}
              {/*ShowSign: true*/}
              {/*});*/}
              {/*}}*/}
              {/*style={{ marginLeft: "5px" }}*/}
              {/*key={"sign"}*/}
              {/*>*/}
              {/*Подписать и отправить*/}
              {/*</Button>*/}
              {/*<ApproveModal disabled={true}/>
              <SignModal disabled={true}/>*/}
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
                    <PullFilter loadPull={(id) => this.loadfromfilter(id)}
                                statuss={(bol) => {
                                  this.setState({
                                    ispublish: !bol
                                  });
                                }}
                                clearPull={() => {
                                }}
                    />
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
                sortedInfo={this.state.sortedInfo}
                sorted={true}
                showTotal={true}
                showExportBtn={true}
                actionExport={this.exportToExcel}
                dataSource={{
                  total: universal.table.totalElements,
                  pageSize: this.state.pagingConfig.length,
                  page: this.state.pagingConfig.start + 1,
                  data: universal.table.content
                }}
                addonButtons={[
                  <Button
                    onClick={() => {
                      this.togglePulls();
                    }}

                    key={"pulls"}
                  >
                    {formatMessage({ id: "menu.mainview.pulls" })}
                  </Button>,
                  <Button onClick={() => {
                    this.confirming();
                  }}
                    //disabled={(this.state.selectedRowKeys.length === 0 || ((this.state.disBtn.currentStatus ? this.state.disBtn.currentStatus.result : 1) === 0)}
                          disabled={hasRole(["ADMIN", "DK1", "DK2"]) || SignBtnGroupsIsDisabled}
                          style={{ marginLeft: "5px" }}
                          key={"confirm"}>
                    Подтвердить ( {this.state.selectedRowKeys.length} )
                  </Button>,
                  <Button
                    //disabled={(this.state.selectedRowKeys.length === 0 || ((this.state.disBtn.currentStatus ? this.state.disBtn.currentStatus.result : 1) === 0))}
                    disabled={hasRole(["ADMIN", "DK1", "DK2"]) || SignBtnGroupsIsDisabled}
                    onClick={() => {
                      this.rejecting();
                    }}
                    style={{ marginLeft: "5px" }}
                    key={"reject"}
                  >
                    Отклонить ( {this.state.selectedRowKeys.length} )
                  </Button>,
                  <Dropdown
                    key={"dropdown"}
                    trigger={["click"]}
                    overlay={
                      <Menu>
                        <Menu.Item
                          //disabled={(this.state.selectedRowKeys.length === 0 || ((this.state.disBtn.currentStatus ? this.state.disBtn.currentStatus.result : 1) === 0))}
                          disabled={hasRole(["ADMIN", "DK2"]) || SignBtnGroupsIsDisabled}
                          count={this.state.selectedRowKeys.length}
                          onClick={() => {
                            this.setState({
                              employvisible: true
                            });
                          }}
                          key="1"
                        > Назначить исполнителя ( {this.state.selectedRowKeys.length} )
                        </Menu.Item>
                        <Menu.Item
                          disabled={SignBtnGroupsIsDisabled}
                          //disabled={(this.state.selectedRowKeys.length === 0 || ((this.state.disBtn.currentStatus ? this.state.disBtn.currentStatus.result : 1) === 0))}
                          key="2"
                          onClick={() => {
                            this.cancelpull();
                          }}
                        > Исключить из пула ( {this.state.selectedRowKeys.length} )
                        </Menu.Item>
                      </Menu>
                    }>
                    <Button
                      //disabled={((this.state.disBtn.currentStatus ? this.state.disBtn.currentStatus.result : 1) === 0)}
                      key={"action"}>{formatMessage({ id: "menu.mainview.actionBtn" })} <Icon
                      type="down"/></Button>
                  </Dropdown>
                ]}
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

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _moment = _interopRequireDefault(require("moment"));

var _SmartGridView = _interopRequireDefault(require("../../components/SmartGridView"));

var _Redux = _interopRequireDefault(require("../../Redux"));

var _jsxFileName = "C:\\refund_tatar\\packages\\refunds-module\\src\\pages\\Main\\MainView.js";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function formatMessage(value) {
  return value.id;
}

var FormItem = _antd.Form.Item;
var confirm = _antd.Modal.confirm;
var RangePicker = _antd.DatePicker.RangePicker;

function hasRole(roles) {
  var userRoles = ["ADMIN"];
  return !userRoles.some(function (r) {
    return roles.indexOf(r) >= 0;
  });
}

var MainView =
/*#__PURE__*/
function (_Component) {
  _inherits(MainView, _Component);

  function MainView(props) {
    var _this;

    _classCallCheck(this, MainView);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MainView).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "loadMainGridData", function () {
      var dispatch = _this.props.dispatch; //type: 'universal/mainviewtable',

      dispatch({
        type: "universal2/getList",
        payload: _this.state.pagingConfig
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
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onShowSizeChange", function (current, pageSize) {
      var max = current * pageSize;
      var min = max - pageSize;
      var dispatch = _this.props.dispatch;
      dispatch({
        type: "universal2/getList",
        payload: _objectSpread({}, _this.state.pagingConfig, {
          start: current,
          length: pageSize
        })
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "showModal", function () {
      _this.setState({
        ShowModal: true
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setColor", function (value) {
      return "#000000a6";
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setBadgeStatus", function (value) {
      if (value) {
        return "success";
      } else if (value === undefined) {
        return "default";
      } else {
        return "error";
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "showGraphic", function () {
      _this.setState({
        ShowGraph: true
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "selectTable", function (selectedRowKeys) {
      console.log("test");

      _this.setState({
        selectedRowKeys: selectedRowKeys
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "clearFilter", function () {
      _this.setState({
        sortedInfo: {},
        pagingConfig: {
          "start": 0,
          "entity": "Refund",
          "length": 15,
          "sort": [],
          "filter": {}
        }
      }, function () {
        _this.loadMainGridData();
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setFilter", function (filters) {
      _this.setState({
        sortedInfo: {},
        pagingConfig: {
          "start": 0,
          "entity": "Refund",
          "length": 15,
          "sort": [],
          "filter": _objectSpread({}, filters)
        }
      }, function () {
        _this.loadMainGridData();
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "stateFilter", function () {
      /*   {
           name: 'test',
           label: 'selectlist',
           type: 'selectlist',
         },*/
      return [{
        name: "applicationId.appNumber",
        label: formatMessage({
          id: "menu.filter.numberrequest"
        }),
        type: "text"
      }, {
        name: "personIin",
        label: formatMessage({
          id: "menu.filter.iin"
        }),
        type: "text",
        withMax: 12
      }, {
        name: "dappRefundStatus",
        label: formatMessage({
          id: "menu.filter.refundstatus"
        }),
        type: "multibox"
      }, {
        name: "appEndDate",
        label: formatMessage({
          id: "menu.filter.lastdate"
        }),
        type: "listbetweenDate"
      }, {
        name: "appPayerDate",
        label: formatMessage({
          id: "menu.filter.payerdate"
        }),
        type: "listbetweenDate"
      }, {
        name: "refundEntryDate",
        label: formatMessage({
          id: "menu.filter.RefundComeDate"
        }),
        type: "listbetweenDate"
      }, {
        name: "refundEntryDate",
        label: formatMessage({
          id: "menu.filter.RefundFundDate"
        }),
        type: "listbetweenDate"
      }, {
        name: "refundDate",
        label: formatMessage({
          id: "menu.filter.RefusalDate"
        }),
        type: "listbetweenDate"
      }, {
        name: "knp",
        label: formatMessage({
          id: "menu.filter.knp"
        }),
        type: "multibox",
        hint: true
      }, {
        name: "drefundReason",
        label: formatMessage({
          id: "menu.filter.RefundReason"
        }),
        type: "combobox"
      }, {
        name: "ddenyReason",
        label: formatMessage({
          id: "menu.filter.RefusalReason"
        }),
        type: "combobox"
      }];
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "rpmuColumn", function () {
      return [{
        title: formatMessage({
          id: "menu.mainview.paymentsum"
        }),
        dataIndex: "paymentsum",
        key: "paymentsum",
        isVisible: true,
        width: 80
      }, {
        title: formatMessage({
          id: "menu.mainview.paymentperiod"
        }),
        dataIndex: "paymentperiod",
        isVisible: true,
        key: "paymentperiod",
        width: 70
      }, {
        title: formatMessage({
          id: "menu.mainview.knp"
        }),
        dataIndex: "knp",
        key: "knp",
        isVisible: true,
        width: 50
      }, {
        title: formatMessage({
          id: "menu.mainview.reference"
        }),
        dataIndex: "reference",
        key: "reference",
        isVisible: true,
        width: 70
      }];
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setStatusRecord", function (statusCode, statusText) {
      var selectedRowKeys = _this.state.selectedRowKeys;
      var dispatch = _this.props.dispatch;
      var content;
      var statusId = false;
      if (selectedRowKeys.length === 0) return false;

      if (statusCode === 2) {
        // to do status component
        dispatch({
          type: "references/load",
          code: "ddenyReason"
        }).then(function () {
          content = _react.default.createElement("div", {
            style: {
              marginTop: 10
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 524
            },
            __self: this
          }, _react.default.createElement("span", {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 524
            },
            __self: this
          }, formatMessage({
            id: "menu.filter.RefusalReason"
          }), ":"), _react.default.createElement(_antd.Select, {
            style: {
              width: "100%"
            },
            placeholder: "",
            onChange: function onChange(value) {
              statusId = value;
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 525
            },
            __self: this
          }, _react.default.createElement(_antd.Select.Option, {
            key: null,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 532
            },
            __self: this
          }, _react.default.createElement("div", {
            style: {
              height: 20
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 532
            },
            __self: this
          })), _this.props.references["ddenyReason"] && _this.props.references["ddenyReason"].map(function (item) {
            return _react.default.createElement(_antd.Select.Option, {
              key: item.id,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 534
              },
              __self: this
            }, item.nameRu);
          })));
          confirm({
            title: "Подтверждение",
            content: content,
            okText: "Да",
            cancelText: "Нет",
            onOk: function onOk() {
              dispatch({
                type: "universal/changeRefundStatus",
                payload: {
                  "status": statusCode,
                  "denyReasonId": statusId ? {
                    id: statusId
                  } : null,
                  "refundList": selectedRowKeys.map(function (valueId) {
                    return {
                      id: valueId
                    };
                  })
                }
              }).then(function () {
                _this.setState({
                  selectedRowKeys: []
                }, function () {
                  _this.loadMainGridData();
                });
              });
            },
            onCancel: function onCancel() {
              _this.setState({
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
          onOk: function onOk() {
            dispatch({
              type: "universal/changeRefundStatus",
              payload: {
                "status": statusCode,
                "denyReasonId": null,
                "refundList": selectedRowKeys.map(function (valueId) {
                  return {
                    id: valueId
                  };
                })
              }
            }).then(function () {
              _this.setState({
                selectedRowKeys: []
              }, function () {
                _this.loadMainGridData();
              });
            });
          },
          onCancel: function onCancel() {
            _this.setState({
              selectedRowKeys: []
            });
          }
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "AppRefundStatusAuto", function () {
      var dispatch = _this.props.dispatch;

      if (_this.state.selectedRowKeys.length > 0) {
        dispatch({
          type: "universal/AppRefundStatusAuto",
          payload: {
            "refundList": _this.state.selectedRowKeys.map(function (valueId) {
              return {
                id: valueId
              };
            })
          }
        }).then(function () {
          _this.loadMainGridData();
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "disableBtnIsReceiptDateNull", function () {
      if (_this.state.selectedRowKeys.length > 0) {
        var nullableDateRecords = _this.state.selectedRowKeys.map(function (selectKey) {
          return _this.props.universal.table.content.find(function (item) {
            return item.id === selectKey;
          });
        }).filter(function (itemRecord) {
          return itemRecord.applicationId.receiptAppdateToFsms === null;
        });

        return nullableDateRecords.length > 0;
      }

      return false;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "checkStatus", function (selectedRowKeys) {
      _this.setState({
        btnhide: false
      });

      if (selectedRowKeys.length > 0) {
        selectedRowKeys.map(function (select) {
          if ([_this.props.universal.table.content.find(function (item) {
            return item.id === select;
          })].map(function (item) {
            return item.dappRefundStatusId.code === "00007" || item.dappRefundStatusId.code === "00008";
          })[0]) {
            _this.setState({
              btnhide: true
            });
          }
        });
      }

      _this.setState({
        selectedRowKeys: selectedRowKeys
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "refundsReceiver", function () {
      confirm({
        title: "Подтверждение",
        content: "Вы действительно хотите получить заявки на возврат?",
        okText: "Да",
        cancelText: "Нет",
        onOk: function onOk() {
          var dispatch = _this.props.dispatch;
          dispatch({
            type: "universal/receiversRefund",
            payload: {
              "id": "e6c16d0c-72cb-450d-a813-af5bbd399d91",
              "parameters": [{
                "name": "Код статуса",
                "value": "00010"
              }, {
                "name": "Количество",
                "value": 5
              }]
            }
          }).then(function () {
            return _this.loadMainGridData();
          });
        },
        onCancel: function onCancel() {}
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "btnIsDisabled", function (isRole, args) {
      return !isRole ? args.filter(function (eq) {
        return eq;
      }).length > 0 : true;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "loadRpmuData", function (recordId) {
      var dispatch = _this.props.dispatch;
      dispatch({
        type: "universal/rpmuTable",
        payload: {
          "start": 0,
          "length": 30,
          "refundId": {
            "id": recordId
          }
        }
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "exportToExcel", function () {
      var authToken = localStorage.getItem("token");
      var columns = JSON.parse(localStorage.getItem("RefundsPageColumns"));
      fetch("/api/refund/exportToExcel", {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer " + authToken
        },
        method: "post",
        body: JSON.stringify({
          "entityClass": "Refund",
          "fileName": formatMessage({
            id: "menu.refunds"
          }),
          "src": {
            "searched": true,
            "data": _this.state.pagingConfig.src.data
          },
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
          }].concat(columns.filter(function (column) {
            return column.isVisible;
          }))
        })
      }).then(function (response) {
        if (response.ok) {
          return response.blob().then(function (blob) {
            var disposition = response.headers.get("content-disposition");
            return {
              fileName: _this.getFileNameByContentDisposition(disposition),
              raw: blob
            };
          });
        }
      }).then(function (data) {
        if (data) {
          saveAs(data.raw, (0, _moment.default)().format("DDMMYYYY") + data.fileName);
        }
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getFileNameByContentDisposition", function (contentDisposition) {
      var regex = /filename[^;=\n]*=(UTF-8(['"]*))?(.*)/;
      var matches = regex.exec(contentDisposition);
      var filename;
      var filenames;

      if (matches != null && matches[3]) {
        filename = matches[3].replace(/['"]/g, "");
        var match = regex.exec(filename);

        if (match != null && match[3]) {
          filenames = match[3].replace(/['"]/g, "").replace("utf-8", "");
        }
      }

      return decodeURI(filenames);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "importXmlAction", function () {
      _this.setState(function (prevState) {
        return {
          ImportXMLModal: {
            visible: true
          }
        };
      });
    });

    _this.state = {
      ImportXMLModal: {
        visible: false
      },
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
      fcolumn: [{
        title: formatMessage({
          id: "menu.mainview.paylists"
        }),
        order: 0,
        key: "operation",
        className: "action_column",
        isVisible: true,
        onCell: function onCell(record) {
          return {
            onClick: function onClick() {
              _this.toggleItems(record);

              _this.loadRpmuData(record.id);
            }
          };
        },
        render: function render() {
          return _react.default.createElement(_antd.Button, {
            size: "small",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 82
            },
            __self: this
          }, _react.default.createElement(_antd.Icon, {
            type: "database",
            theme: "outlined",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 83
            },
            __self: this
          }));
        }
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
        title: formatMessage({
          id: "menu.mainview.fio"
        }),
        order: 3,
        key: "fio",
        isVisible: true,
        width: 150,
        render: function render(item) {
          return item.personSurname + " " + item.personFirstname + " " + item.personPatronname;
        }
      }, {
        "title": "Статус заявки на возврат",
        isVisible: true,
        "dataIndex": "dappRefundStatusId.nameRu ",
        order: 7,
        render: function render(record, value) {
          return _react.default.createElement("a", {
            style: {
              color: _this.setColor(value.isRefundConfirm)
            } //value.isRefundConfirm ? 'green' : 'red' }}
            ,
            href: "#",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 128
            },
            __self: this
          }, " ", _react.default.createElement("span", {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 130
            },
            __self: this
          }, _react.default.createElement(_antd.Badge, {
            status: _this.setBadgeStatus(value.isRefundConfirm),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 130
            },
            __self: this
          })), " ", value.dappRefundStatusId ? value.dappRefundStatusId.nameRu : null);
        }
      }],
      columns: [{
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
        "title": "Дата поступление заявки на возврат",
        "isVisible": true,
        "dataIndex": "entryDate"
      }, {
        "title": "Дата исполнения заявки",
        "isVisible": true,
        "dataIndex": "appEndDate"
      }, {
        "title": "Сумма возврата",
        "isVisible": true,
        "dataIndex": "refundPayAmount"
      }, {
        "title": "Референс ГК",
        "isVisible": true,
        "dataIndex": "gcvpReference"
      }, {
        "title": "Номер плат-го поручения ГК",
        "isVisible": true,
        "dataIndex": "gcvpOrderNum"
      }, {
        "title": "Дата плат-го поручения ГК",
        "dataIndex": "gcvpOrderDate"
      }, {
        "title": "Причина возврата",
        "dataIndex": "drefundReasonId.nameRu"
      }, {
        "title": "ИИН Потребителя",
        "dataIndex": "personIin"
      }, {
        "title": "КНП",
        "dataIndex": "applicationId.dknpId.code"
      }, {
        "title": "Номер платежного поручения",
        "dataIndex": "applicationId.payOrderNum"
      }, {
        "title": "Дата платежного поручения",
        "dataIndex": "applicationId.payOrderDate"
      }, {
        "title": "Сумма отчислений",
        "dataIndex": "payAmount"
      }, {
        "title": "Дата последнего взноса",
        "dataIndex": "lastPayDate"
      }, {
        "title": "Дата осуществления возврата",
        "dataIndex": "refundDate"
      }, {
        "title": "Кол-во отчислений и (или) взносов за последние 12 календарных месяцев",
        "dataIndex": "lastMedcarePayCount"
      }, {
        "title": "Статус страхования",
        "dataIndex": "medinsStatus"
      }, {
        "title": "Референс",
        "dataIndex": "applicationId.reference"
      }, {
        "title": "Причина отказа",
        "dataIndex": "ddenyReasonId.nameRu"
      }, {
        "title": "Отчет об отказе",
        "dataIndex": "refundStatus"
      }, {
        "title": "Осталось дней",
        "dataIndex": "daysLeft"
      }, {
        "title": "Дата изменения статуса заявки",
        "dataIndex": "changeDate"
      }, {
        "title": "Период",
        "dataIndex": "payPeriod"
      }, {
        "title": "Веб-сервис (сообщение) ",
        "dataIndex": "wsStatusMessage"
      }],
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
    return _this;
  }

  _createClass(MainView, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var dispatch = this.props.dispatch;
      dispatch({
        type: "universal2/clear",
        payload: {
          table: "requests"
        }
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadMainGridData();
      var dispatch = this.props.dispatch;
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
  }, {
    key: "toggleSearcher",
    value: function toggleSearcher() {
      this.setState({
        searchButton: true,
        isHidden: false,
        searchercont: 7,
        tablecont: 17
      });
    }
  }, {
    key: "toggleItems",
    value: function toggleItems() {
      this.setState({
        searchButton: false,
        isHidden: false,
        searchercont: 8,
        tablecont: 16
      });
    }
  }, {
    key: "hideleft",
    value: function hideleft() {
      if (!this.state.isHidden) {
        this.setState({
          isHidden: true,
          searchButton: false,
          searchercont: 0,
          tablecont: 24
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var universal = {
        table: this.props.universal2.references[this.state.pagingConfig.entity] ? this.props.universal2.references[this.state.pagingConfig.entity] : {}
      };
      var dateFormat = "DD.MM.YYYY";
      console.log(universal);
      /*const { universal } = this.props;
      console.log(universal);*/

      var rpmuColumns = this.rpmuColumn();
      var GridFilterData = this.stateFilter();
      return _react.default.createElement(_antd.Card, {
        bodyStyle: {
          padding: 5
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 775
        },
        __self: this
      }, _react.default.createElement(_antd.Row, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 776
        },
        __self: this
      }, _react.default.createElement(_antd.Col, {
        sm: 24,
        md: this.state.searchercont,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 777
        },
        __self: this
      }, _react.default.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 778
        },
        __self: this
      }, this.state.searchercont === 8 && _react.default.createElement(_antd.Card, {
        style: {
          margin: "0px 5px 10px 0px",
          borderRadius: "5px"
        },
        bodyStyle: {
          padding: 0
        },
        type: "inner",
        title: formatMessage({
          id: "menu.mainview.rpmuLocale"
        }),
        extra: _react.default.createElement(_antd.Icon, {
          style: {
            "cursor": "pointer"
          },
          onClick: function onClick(event) {
            return _this2.hideleft();
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 785
          },
          __self: this
        }, "s"),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 780
        },
        __self: this
      }, _react.default.createElement(_antd.Spin, {
        spinning: this.props.rpmuLoading,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 787
        },
        __self: this
      }, _react.default.createElement(_SmartGridView.default, {
        name: "RefundsRPMUColumns",
        rowKey: "id",
        scroll: {
          x: this.state.xsize
        },
        actionColumns: [{
          title: formatMessage({
            id: "menu.mainview.rpmuName"
          }),
          key: "lastname",
          order: 0,
          isVisible: true,
          width: 100,
          render: function render(text, record) {
            return _react.default.createElement("div", {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 799
              },
              __self: this
            }, text.lastname + " " + text.firstname + " " + text.secondname, _react.default.createElement("br", {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 801
              },
              __self: this
            }), "(ИИН: " + text.iin + ", ДР: " + text.birthdate + ")");
          }
        }],
        columns: rpmuColumns,
        sorted: true,
        sortedInfo: this.state.sortedInfo,
        onSort: function onSort(column) {
          if (Object.keys(column).length === 0) {
            _this2.setState(function (prevState) {
              return {
                sortedInfo: {},
                pagingConfig: _objectSpread({}, prevState.pagingConfig, {
                  sort: []
                })
              };
            }, function () {
              _this2.loadMainGridData();
            });

            return;
          }

          _this2.setState(function (prevState) {
            return {
              sortedInfo: column,
              pagingConfig: _objectSpread({}, prevState.pagingConfig, {
                sort: [{
                  field: column.field,
                  "desc": column.order === "descend"
                }]
              })
            };
          }, function () {
            _this2.loadMainGridData();
          });
        },
        rowSelection: false,
        rowClassName: function rowClassName(record) {
          if (record.refundExist) {
            return "greenRow";
          }
        },
        hideFilterBtn: true,
        hideRefreshBtn: true,
        dataSource: {
          total: universal.rpmu.totalElements,
          pageSize: this.state.rpmu.pagingConfig.length,
          page: this.state.rpmu.pagingConfig.start + 1,
          data: universal.rpmu.content
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 788
        },
        __self: this
      }))))), _react.default.createElement(_antd.Col, {
        sm: 24,
        md: this.state.tablecont,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 871
        },
        __self: this
      }, _react.default.createElement(_antd.Spin, {
        tip: formatMessage({
          id: "system.loading"
        }),
        spinning: this.props.loadingData,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 873
        },
        __self: this
      }, _react.default.createElement(_SmartGridView.default, {
        name: "RefundsPageColumns",
        scroll: {
          x: this.state.xsize
        },
        selectedRowCheckBox: true,
        searchButton: this.state.searchButton,
        selectedRowKeys: this.state.selectedRowKeys,
        rowKey: "id",
        loading: this.props.loadingData,
        rowSelection: true,
        actionColumns: this.state.fcolumn,
        columns: this.state.columns,
        sorted: true,
        sortedInfo: this.state.sortedInfo,
        showTotal: true,
        showExportBtn: true,
        dataSource: {
          total: universal.table.totalElements,
          pageSize: this.state.pagingConfig.length,
          page: this.state.pagingConfig.start + 1,
          data: universal.table.content
        },
        addonButtons: [_react.default.createElement(_antd.Button, {
          onClick: function onClick() {
            return _this2.setStatusRecord(1, formatMessage({
              id: "menu.mainview.approveBtn"
            }));
          },
          disabled: this.btnIsDisabled(hasRole(["FSMS1", "FSMS2", "ADMIN"]), [this.state.btnhide, this.state.selectedRowKeys.length === 0]),
          key: "odobrit",
          className: "btn-success",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 896
          },
          __self: this
        }, formatMessage({
          id: "menu.mainview.approveBtn"
        }), " ", this.state.selectedRowKeys.length > 0 && "(".concat(this.state.selectedRowKeys.length, ")")), _react.default.createElement(_antd.Button, {
          onClick: function onClick() {
            return _this2.setStatusRecord(2, formatMessage({
              id: "menu.mainview.cancelBtn"
            }));
          },
          disabled: this.btnIsDisabled(hasRole(["FSMS1", "FSMS2", "ADMIN"]), [this.state.btnhide, this.state.selectedRowKeys.length === 0]),
          key: "cancel",
          className: "btn-danger",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 903
          },
          __self: this
        }, formatMessage({
          id: "menu.mainview.cancelBtn"
        }), " ", this.state.selectedRowKeys.length > 0 && "(".concat(this.state.selectedRowKeys.length, ")")), _react.default.createElement(_antd.Button, {
          onClick: function onClick() {
            return _this2.setStatusRecord(3, formatMessage({
              id: "menu.mainview.saveBtn"
            }));
          },
          disabled: this.btnIsDisabled(hasRole(["FSMS1", "FSMS2", "ADMIN"]), [this.disableBtnIsReceiptDateNull(), this.state.btnhide, this.state.selectedRowKeys.length === 0]),
          key: "save",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 910
          },
          __self: this
        }, formatMessage({
          id: "menu.mainview.saveBtn"
        }), " ", this.state.selectedRowKeys.length > 0 && "(".concat(this.state.selectedRowKeys.length, ")")), _react.default.createElement(_antd.Button, {
          onClick: function onClick() {
            return _this2.setStatusRecord(4, formatMessage({
              id: "menu.mainview.performBtn"
            }));
          },
          disabled: this.btnIsDisabled(hasRole(["FSMS2", "ADMIN"]), [this.disableBtnIsReceiptDateNull(), this.state.btnhide, this.state.selectedRowKeys.length === 0]),
          key: "run",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 913
          },
          __self: this
        }, formatMessage({
          id: "menu.mainview.performBtn"
        }), " ", this.state.selectedRowKeys.length > 0 && "(".concat(this.state.selectedRowKeys.length, ")")), _react.default.createElement(_antd.Dropdown, {
          key: "dropdown",
          trigger: ["click"],
          overlay: _react.default.createElement(_antd.Menu, {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 917
            },
            __self: this
          }, _react.default.createElement(_antd.Menu.Item, {
            disabled: this.btnIsDisabled(hasRole(["FSMS2", "ADMIN"]), [this.state.btnhide, this.state.selectedRowKeys.length === 0]),
            key: "1",
            onClick: this.AppRefundStatusAuto,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 918
            },
            __self: this
          }, formatMessage({
            id: "menu.mainview.verifyRPMUBtn"
          }), " ", this.state.selectedRowKeys.length > 0 && "(".concat(this.state.selectedRowKeys.length, ")")), _react.default.createElement(_antd.Menu.Item, {
            disabled: this.btnIsDisabled(hasRole(["FSMS2", "ADMIN"]), [this.state.selectedRowKeys.length === 0]),
            key: "3",
            onClick: function onClick() {
              _this2.setState({
                ModalChangeDateRefund: true
              });
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 928
            },
            __self: this
          }, formatMessage({
            id: "menu.mainview.setDateBtn"
          })), _react.default.createElement(_antd.Menu.Item, {
            disabled: hasRole(["ADMIN", "FSMS2"]),
            key: "4",
            onClick: function onClick() {
              _this2.showModal();
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 936
            },
            __self: this
          }, formatMessage({
            id: "menu.mainview.mt102Btn"
          })), _react.default.createElement(_antd.Menu.Item, {
            disabled: hasRole(["ADMIN"]),
            key: "6",
            onClick: function onClick() {
              _this2.showGraphic();
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 963
            },
            __self: this
          }, formatMessage({
            id: "menu.mainview.infographBtn"
          })), _react.default.createElement(_antd.Menu.Item, {
            disabled: hasRole(["FSMS1", "FSMS2", "ADMIN"]),
            key: "7",
            onClick: function onClick() {
              _this2.refundsReceiver();
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 968
            },
            __self: this
          }, formatMessage({
            id: "menu.mainview.refundreceiver"
          }))),
          __source: {
            fileName: _jsxFileName,
            lineNumber: 917
          },
          __self: this
        }, _react.default.createElement(_antd.Button, {
          disabled: hasRole(["FSMS2", "ADMIN"]),
          key: "action",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 974
          },
          __self: this
        }, formatMessage({
          id: "menu.mainview.actionBtn"
        }), " ", _react.default.createElement(_antd.Icon, {
          type: "down",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 975
          },
          __self: this
        })))],
        actionExport: function actionExport() {
          return _this2.exportToExcel();
        },
        onShowSizeChange: function onShowSizeChange(pageNumber, pageSize) {
          _this2.onShowSizeChange(pageNumber, pageSize);
        },
        onSort: function onSort(column) {
          if (Object.keys(column).length === 0) {
            _this2.setState(function (prevState) {
              return {
                sortedInfo: {},
                pagingConfig: _objectSpread({}, prevState.pagingConfig, {
                  sort: []
                })
              };
            }, function () {
              _this2.loadMainGridData();
            });

            return;
          }

          _this2.setState(function (prevState) {
            return {
              sortedInfo: column,
              pagingConfig: _objectSpread({}, prevState.pagingConfig, {
                sort: [{
                  field: column.field,
                  "desc": column.order === "descend"
                }]
              })
            };
          }, function () {
            _this2.loadMainGridData();
          });
        },
        onSelectCell: function onSelectCell(cellIndex, cell) {},
        onSelectRow: function onSelectRow(record) {//console.log(record);
        },
        onFilter: function onFilter(filters) {},
        onRefresh: function onRefresh() {
          _this2.loadMainGridData();
        },
        onSearch: function onSearch() {
          _this2.toggleSearcher();
        },
        onSelectCheckboxChange: function onSelectCheckboxChange(selectedRowKeys) {
          _this2.checkStatus(selectedRowKeys);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 874
        },
        __self: this
      }), _react.default.createElement("br", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1028
        },
        __self: this
      })))));
    }
  }]);

  return MainView;
}(_react.Component);

var _default = (0, _Redux.default)(function (_ref) {
  var universal = _ref.universal,
      universal2 = _ref.universal2,
      references = _ref.references,
      loading = _ref.loading;
  return {
    universal: universal,
    universal2: universal2,
    references: references,
    loadingData: loading.effects["universal2/getList"],
    rpmuLoading: loading.effects["universal/rpmuTable"]
  };
})(MainView);

exports.default = _default;
//# sourceMappingURL=MainView.js.map
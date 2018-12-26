var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { Component } from "react";
import { Card, Icon, Menu, Dropdown, Button, Row, Col, Form, Modal, DatePicker, LocaleProvider, Select, Spin, Badge } from "antd";
//import PageHeaderWrapper from "../../components/PageHeaderWrapper";
import moment from "moment";
//import ModalGridView from "../../components/ModalGridView";
// import GridFilter from "../../components/GridFilter";
import SmartGridView from "../../components/SmartGridView";
//import ModalChangeDateRefund from "../../components/ModalChangeDateRefund";
import connect from "../../Redux";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTimes, faFileAlt } from "@fortawesome/free-solid-svg-icons";
// import { faChartBar } from "@fortawesome/free-solid-svg-icons/index";
// import { getAuthority } from '../../utils/authority';
//import ModalGraphView from "../../components/ModalGraphView";
// import { Animated } from "react-animated-css";
// import componentLocal from '../../locales/components/componentLocal';
// import ImportXMLModal from './ImportXMLModal';
// import saveAs from "file-saver";
function formatMessage(langItem) {
    return langItem.id;
}
var FormItem = Form.Item;
var confirm = Modal.confirm;
var RangePicker = DatePicker.RangePicker;
function hasRole(roles) {
    var userRoles = ["ADMIN"];
    return !userRoles.some(function (r) { return roles.indexOf(r) >= 0; });
}
connect(function (_a) {
    var universal = _a.universal, universal2 = _a.universal2, references = _a.references, loading = _a.loading;
    return ({
        universal: universal,
        universal2: universal2,
        references: references,
        loadingData: loading.effects["universal2/getList"],
        rpmuLoading: loading.effects["universal/rpmuTable"]
    });
});
var MainView = /** @class */ (function (_super) {
    __extends(MainView, _super);
    function MainView(props) {
        var _this = _super.call(this, props) || this;
        _this.loadMainGridData = function () {
            var dispatch = _this.props.dispatch;
            //type: 'universal/mainviewtable',
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
        };
        _this.onShowSizeChange = function (current, pageSize) {
            var max = current * pageSize;
            var min = max - pageSize;
            var dispatch = _this.props.dispatch;
            dispatch({
                type: "universal2/getList",
                payload: __assign({}, _this.state.pagingConfig, { start: current, length: pageSize })
            });
        };
        _this.showModal = function () {
            _this.setState({
                ShowModal: true
            });
        };
        _this.setColor = function (value) {
            return "#000000a6";
        };
        _this.setBadgeStatus = function (value) {
            if (value) {
                return "success";
            }
            else if (value === undefined) {
                return "default";
            }
            else {
                return "error";
            }
        };
        _this.showGraphic = function () {
            _this.setState({
                ShowGraph: true
            });
        };
        _this.selectTable = function (selectedRowKeys) {
            console.log("test");
            _this.setState({ selectedRowKeys: selectedRowKeys });
        };
        _this.clearFilter = function () {
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
        };
        _this.setFilter = function (filters) {
            _this.setState({
                sortedInfo: {},
                pagingConfig: {
                    "start": 0,
                    "entity": "Refund",
                    "length": 15,
                    "sort": [],
                    "filter": __assign({}, filters)
                }
            }, function () {
                _this.loadMainGridData();
            });
        };
        _this.stateFilter = function () {
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
                    name: "refundEntryDate",
                    label: formatMessage({ id: "menu.filter.RefundComeDate" }),
                    type: "listbetweenDate"
                },
                {
                    name: "refundEntryDate",
                    label: formatMessage({ id: "menu.filter.RefundFundDate" }),
                    type: "listbetweenDate"
                },
                {
                    name: "refundDate",
                    label: formatMessage({ id: "menu.filter.RefusalDate" }),
                    type: "listbetweenDate"
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
                }
            ];
        };
        _this.rpmuColumn = function () {
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
        _this.setStatusRecord = function (statusCode, statusText) {
            var selectedRowKeys = _this.state.selectedRowKeys;
            var dispatch = _this.props.dispatch;
            var content;
            var statusId = false;
            if (selectedRowKeys.length === 0)
                return false;
            if (statusCode === 2) {
                // to do status component
                dispatch({
                    type: "references/load",
                    code: "ddenyReason"
                }).then(function () {
                    content = (React.createElement("div", { style: { marginTop: 10 } },
                        React.createElement("span", null,
                            formatMessage({ id: "menu.filter.RefusalReason" }),
                            ":"),
                        React.createElement(Select, { style: { width: "100%" }, placeholder: "", onChange: function (value) {
                                statusId = value;
                            } },
                            React.createElement(Select.Option, { key: null }, React.createElement("div", { style: { height: 20 } })),
                            _this.props.references["ddenyReason"] && _this.props.references["ddenyReason"].map(function (item) {
                                return React.createElement(Select.Option, { key: item.id }, item.nameRu);
                            }))));
                    confirm({
                        title: "Подтверждение",
                        content: content,
                        okText: "Да",
                        cancelText: "Нет",
                        onOk: function () {
                            dispatch({
                                type: "universal/changeRefundStatus",
                                payload: {
                                    "status": statusCode,
                                    "denyReasonId": statusId ? { id: statusId } : null,
                                    "refundList": selectedRowKeys.map(function (valueId) { return ({ id: valueId }); })
                                }
                            }).then(function () {
                                _this.setState({
                                    selectedRowKeys: []
                                }, function () {
                                    _this.loadMainGridData();
                                });
                            });
                        },
                        onCancel: function () {
                            _this.setState({
                                selectedRowKeys: []
                            });
                        }
                    });
                });
            }
            else {
                content = "Вы действительно хотите " + statusText.toLowerCase() + " возврат? ";
                confirm({
                    title: "Подтверждение",
                    content: content,
                    okText: "Да",
                    cancelText: "Нет",
                    onOk: function () {
                        dispatch({
                            type: "universal/changeRefundStatus",
                            payload: {
                                "status": statusCode,
                                "denyReasonId": null,
                                "refundList": selectedRowKeys.map(function (valueId) { return ({ id: valueId }); })
                            }
                        }).then(function () {
                            _this.setState({
                                selectedRowKeys: []
                            }, function () {
                                _this.loadMainGridData();
                            });
                        });
                    },
                    onCancel: function () {
                        _this.setState({
                            selectedRowKeys: []
                        });
                    }
                });
            }
        };
        _this.AppRefundStatusAuto = function () {
            var dispatch = _this.props.dispatch;
            if (_this.state.selectedRowKeys.length > 0) {
                dispatch({
                    type: "universal/AppRefundStatusAuto",
                    payload: {
                        "refundList": _this.state.selectedRowKeys.map(function (valueId) { return ({ id: valueId }); })
                    }
                }).then(function () {
                    _this.loadMainGridData();
                });
            }
        };
        _this.disableBtnIsReceiptDateNull = function () {
            if (_this.state.selectedRowKeys.length > 0) {
                var nullableDateRecords = _this.state.selectedRowKeys
                    .map(function (selectKey) { return _this.props.universal.table.content.find(function (item) { return item.id === selectKey; }); })
                    .filter(function (itemRecord) { return itemRecord.applicationId.receiptAppdateToFsms === null; });
                return nullableDateRecords.length > 0;
            }
            return false;
        };
        _this.checkStatus = function (selectedRowKeys) {
            _this.setState({
                btnhide: false
            });
            if (selectedRowKeys.length > 0) {
                selectedRowKeys.map(function (select) {
                    if ([_this.props.universal.table.content.find(function (item) { return item.id === select; })].map(function (item) { return item.dappRefundStatusId.code === "00007" || item.dappRefundStatusId.code === "00008"; })[0]) {
                        _this.setState({
                            btnhide: true
                        });
                    }
                });
            }
            _this.setState({
                selectedRowKeys: selectedRowKeys
            });
        };
        _this.refundsReceiver = function () {
            confirm({
                title: "Подтверждение",
                content: "Вы действительно хотите получить заявки на возврат?",
                okText: "Да",
                cancelText: "Нет",
                onOk: function () {
                    var dispatch = _this.props.dispatch;
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
                    }).then(function () { return _this.loadMainGridData(); });
                },
                onCancel: function () {
                }
            });
        };
        _this.btnIsDisabled = function (isRole, args) {
            return !isRole ? args.filter(function (eq) { return (eq); }).length > 0 : true;
        };
        _this.loadRpmuData = function (recordId) {
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
        };
        _this.exportToExcel = function () {
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
                    "fileName": formatMessage({ id: "menu.refunds" }),
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
                        }].concat(columns.filter(function (column) { return column.isVisible; }))
                })
            })
                .then(function (response) {
                if (response.ok) {
                    return response.blob().then(function (blob) {
                        var disposition = response.headers.get("content-disposition");
                        return {
                            fileName: _this.getFileNameByContentDisposition(disposition),
                            raw: blob
                        };
                    });
                }
            })
                .then(function (data) {
                if (data) {
                    saveAs(data.raw, moment().format("DDMMYYYY") + data.fileName);
                }
            });
        };
        _this.getFileNameByContentDisposition = function (contentDisposition) {
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
        };
        _this.importXmlAction = function () {
            _this.setState(function (prevState) { return ({ ImportXMLModal: { visible: true } }); });
        };
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
            fcolumn: [
                {
                    title: formatMessage({ id: "menu.mainview.paylists" }),
                    order: 0,
                    key: "operation",
                    className: "action_column",
                    isVisible: true,
                    onCell: function (record) {
                        return {
                            onClick: function () {
                                _this.toggleItems(record);
                                _this.loadRpmuData(record.id);
                            }
                        };
                    },
                    render: function () { return (React.createElement(Button, { size: "small" },
                        React.createElement(Icon, { type: "database", theme: "outlined" }))); }
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
                    render: function (item) {
                        return item.personSurname + " " + item.personFirstname + " " + item.personPatronname;
                    }
                }, {
                    "title": "Статус заявки на возврат",
                    isVisible: true,
                    "dataIndex": "dappRefundStatusId.nameRu ",
                    order: 7,
                    render: function (record, value) { return React.createElement("a", { style: { color: _this.setColor(value.isRefundConfirm) }, href: "#" },
                        " ",
                        React.createElement("span", null,
                            React.createElement(Badge, { status: _this.setBadgeStatus(value.isRefundConfirm) })),
                        " ",
                        value.dappRefundStatusId ? value.dappRefundStatusId.nameRu : null); }
                }
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
                    "title": "Дата поступление заявки на возврат",
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
                }, { "title": "Сумма отчислений", "dataIndex": "payAmount" }, {
                    "title": "Дата последнего взноса",
                    "dataIndex": "lastPayDate"
                }, {
                    "title": "Дата осуществления возврата",
                    "dataIndex": "refundDate"
                }, {
                    "title": "Кол-во отчислений и (или) взносов за последние 12 календарных месяцев",
                    "dataIndex": "lastMedcarePayCount"
                }, { "title": "Статус страхования", "dataIndex": "medinsStatus" }, {
                    "title": "Референс",
                    "dataIndex": "applicationId.reference"
                }, { "title": "Причина отказа", "dataIndex": "ddenyReasonId.nameRu" }, {
                    "title": "Отчет об отказе",
                    "dataIndex": "refundStatus"
                }, { "title": "Осталось дней", "dataIndex": "daysLeft" }, {
                    "title": "Дата изменения статуса заявки",
                    "dataIndex": "changeDate"
                }, { "title": "Период", "dataIndex": "payPeriod" }, {
                    "title": "Веб-сервис (сообщение) ",
                    "dataIndex": "wsStatusMessage"
                }
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
        return _this;
    }
    MainView.prototype.componentWillUnmount = function () {
        var dispatch = this.props.dispatch;
        dispatch({
            type: "universal2/clear",
            payload: {
                table: "requests"
            }
        });
    };
    MainView.prototype.componentDidMount = function () {
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
    };
    MainView.prototype.toggleSearcher = function () {
        this.setState({
            searchButton: true,
            isHidden: false,
            searchercont: 7,
            tablecont: 17
        });
    };
    MainView.prototype.toggleItems = function () {
        this.setState({
            searchButton: false,
            isHidden: false,
            searchercont: 8,
            tablecont: 16
        });
    };
    MainView.prototype.hideleft = function () {
        if (!this.state.isHidden) {
            this.setState({
                isHidden: true,
                searchButton: false,
                searchercont: 0,
                tablecont: 24
            });
        }
    };
    MainView.prototype.render = function () {
        var _this = this;
        var universal = {
            table: this.props.universal2.references[this.state.pagingConfig.entity] ? this.props.universal2.references[this.state.pagingConfig.entity] : {}
        };
        var dateFormat = "DD.MM.YYYY";
        console.log(universal);
        /*const { universal } = this.props;
        console.log(universal);*/
        var rpmuColumns = this.rpmuColumn();
        var GridFilterData = this.stateFilter();
        return (React.createElement("div", null,
            React.createElement(Card, { bodyStyle: { padding: 5 } },
                React.createElement(Row, null,
                    React.createElement(Col, { sm: 24, md: this.state.searchercont },
                        React.createElement("div", null,
                            this.state.searchercont === 7 &&
                                React.createElement(Animated, { animationIn: "bounceInLeft", animationOut: "fadeOut", isVisible: true },
                                    React.createElement(Card, { style: { margin: "0px 5px 10px 0px", borderRadius: "5px" }, type: "inner", title: formatMessage({ id: "system.filter" }), headStyle: {
                                            padding: "0 14px"
                                        } })),
                            this.state.searchercont === 8 &&
                                React.createElement(Animated, { animationIn: "bounceInLeft", animationOut: "fadeOut", isVisible: true },
                                    React.createElement(Card, { style: { margin: "0px 5px 10px 0px", borderRadius: "5px" }, bodyStyle: { padding: 0 }, type: "inner", title: formatMessage({ id: "menu.mainview.rpmuLocale" }) },
                                        React.createElement(LocaleProvider, { locale: componentLocal },
                                            React.createElement(Spin, { spinning: this.props.rpmuLoading },
                                                React.createElement(SmartGridView, { name: "RefundsRPMUColumns", rowKey: "id", scroll: { x: this.state.xsize }, actionColumns: [
                                                        {
                                                            title: formatMessage({ id: "menu.mainview.rpmuName" }),
                                                            key: "lastname",
                                                            order: 0,
                                                            isVisible: true,
                                                            width: 100,
                                                            render: function (text, record) { return (React.createElement("div", null,
                                                                text.lastname + " " + text.firstname + " " + text.secondname,
                                                                React.createElement("br", null),
                                                                "(ИИН: " + text.iin + ", ДР: " + text.birthdate + ")")); }
                                                        }
                                                    ], columns: rpmuColumns, sorted: true, sortedInfo: this.state.sortedInfo, onSort: function (column) {
                                                        if (Object.keys(column).length === 0) {
                                                            _this.setState(function (prevState) { return ({
                                                                sortedInfo: {},
                                                                pagingConfig: __assign({}, prevState.pagingConfig, { sort: [] })
                                                            }); }, function () {
                                                                _this.loadMainGridData();
                                                            });
                                                            return;
                                                        }
                                                        _this.setState(function (prevState) { return ({
                                                            sortedInfo: column,
                                                            pagingConfig: __assign({}, prevState.pagingConfig, { sort: [{ field: column.field, "desc": column.order === "descend" }] })
                                                        }); }, function () {
                                                            _this.loadMainGridData();
                                                        });
                                                    }, rowSelection: false, rowClassName: function (record) {
                                                        if (record.refundExist) {
                                                            return "greenRow";
                                                        }
                                                    }, hideFilterBtn: true, hideRefreshBtn: true, dataSource: {
                                                        total: universal.rpmu.totalElements,
                                                        pageSize: this.state.rpmu.pagingConfig.length,
                                                        page: this.state.rpmu.pagingConfig.start + 1,
                                                        data: universal.rpmu.content
                                                    } }))))))),
                    React.createElement(Col, { sm: 24, md: this.state.tablecont },
                        React.createElement(Spin, { tip: formatMessage({ id: "system.loading" }), spinning: this.props.loadingData },
                            React.createElement(SmartGridView, { name: "RefundsPageColumns", scroll: { x: this.state.xsize }, selectedRowCheckBox: true, searchButton: this.state.searchButton, selectedRowKeys: this.state.selectedRowKeys, rowKey: "id", loading: this.props.loadingData, rowSelection: true, actionColumns: this.state.fcolumn, columns: this.state.columns, sorted: true, sortedInfo: this.state.sortedInfo, showTotal: true, showExportBtn: true, dataSource: {
                                    total: universal.table.totalElements,
                                    pageSize: this.state.pagingConfig.length,
                                    page: this.state.pagingConfig.start + 1,
                                    data: universal.table.content
                                }, addonButtons: [
                                    React.createElement(Button, { onClick: function () { return _this.setStatusRecord(1, formatMessage({ id: "menu.mainview.approveBtn" })); }, disabled: this.btnIsDisabled(hasRole(["FSMS1", "FSMS2", "ADMIN"]), [this.state.btnhide, this.state.selectedRowKeys.length === 0]), key: "odobrit", className: "btn-success" },
                                        formatMessage({ id: "menu.mainview.approveBtn" }),
                                        " ",
                                        this.state.selectedRowKeys.length > 0 && "(" + this.state.selectedRowKeys.length + ")"),
                                    React.createElement(Button, { onClick: function () { return _this.setStatusRecord(2, formatMessage({ id: "menu.mainview.cancelBtn" })); }, disabled: this.btnIsDisabled(hasRole(["FSMS1", "FSMS2", "ADMIN"]), [this.state.btnhide, this.state.selectedRowKeys.length === 0]), key: "cancel", className: "btn-danger" },
                                        formatMessage({ id: "menu.mainview.cancelBtn" }),
                                        " ",
                                        this.state.selectedRowKeys.length > 0 && "(" + this.state.selectedRowKeys.length + ")"),
                                    React.createElement(Button, { onClick: function () { return _this.setStatusRecord(3, formatMessage({ id: "menu.mainview.saveBtn" })); }, disabled: this.btnIsDisabled(hasRole(["FSMS1", "FSMS2", "ADMIN"]), [this.disableBtnIsReceiptDateNull(), this.state.btnhide, this.state.selectedRowKeys.length === 0]), key: "save" },
                                        formatMessage({ id: "menu.mainview.saveBtn" }),
                                        " ",
                                        this.state.selectedRowKeys.length > 0 && "(" + this.state.selectedRowKeys.length + ")"),
                                    React.createElement(Button, { onClick: function () { return _this.setStatusRecord(4, formatMessage({ id: "menu.mainview.performBtn" })); }, disabled: this.btnIsDisabled(hasRole(["FSMS2", "ADMIN"]), [this.disableBtnIsReceiptDateNull(), this.state.btnhide, this.state.selectedRowKeys.length === 0]), key: "run" },
                                        formatMessage({ id: "menu.mainview.performBtn" }),
                                        " ",
                                        this.state.selectedRowKeys.length > 0 && "(" + this.state.selectedRowKeys.length + ")"),
                                    React.createElement(Dropdown, { key: "dropdown", trigger: ["click"], overlay: React.createElement(Menu, null,
                                            React.createElement(Menu.Item, { disabled: this.btnIsDisabled(hasRole(["FSMS2", "ADMIN"]), [this.state.btnhide, this.state.selectedRowKeys.length === 0]), key: "1", onClick: this.AppRefundStatusAuto },
                                                formatMessage({ id: "menu.mainview.verifyRPMUBtn" }),
                                                " ",
                                                this.state.selectedRowKeys.length > 0 && "(" + this.state.selectedRowKeys.length + ")"),
                                            React.createElement(Menu.Item, { disabled: this.btnIsDisabled(hasRole(["FSMS2", "ADMIN"]), [this.state.selectedRowKeys.length === 0]), key: "3", onClick: function () {
                                                    _this.setState({ ModalChangeDateRefund: true });
                                                } }, formatMessage({ id: "menu.mainview.setDateBtn" })),
                                            React.createElement(Menu.Item, { disabled: hasRole(["ADMIN", "FSMS2"]), key: "4", onClick: function () {
                                                    _this.showModal();
                                                } }, formatMessage({ id: "menu.mainview.mt102Btn" })),
                                            React.createElement(Menu.Item, { disabled: hasRole(["ADMIN"]), key: "6", onClick: function () {
                                                    _this.showGraphic();
                                                } }, formatMessage({ id: "menu.mainview.infographBtn" })),
                                            React.createElement(Menu.Item, { disabled: hasRole(["FSMS1", "FSMS2", "ADMIN"]), key: "7", onClick: function () {
                                                    _this.refundsReceiver();
                                                } }, formatMessage({ id: "menu.mainview.refundreceiver" }))) },
                                        React.createElement(Button, { disabled: hasRole(["FSMS2", "ADMIN"]), key: "action" },
                                            formatMessage({ id: "menu.mainview.actionBtn" }),
                                            " ",
                                            React.createElement(Icon, { type: "down" })))
                                ], actionExport: function () { return _this.exportToExcel(); }, onShowSizeChange: function (pageNumber, pageSize) {
                                    _this.onShowSizeChange(pageNumber, pageSize);
                                }, onSort: function (column) {
                                    if (Object.keys(column).length === 0) {
                                        _this.setState(function (prevState) { return ({
                                            sortedInfo: {},
                                            pagingConfig: __assign({}, prevState.pagingConfig, { sort: [] })
                                        }); }, function () {
                                            _this.loadMainGridData();
                                        });
                                        return;
                                    }
                                    _this.setState(function (prevState) { return ({
                                        sortedInfo: column,
                                        pagingConfig: __assign({}, prevState.pagingConfig, { sort: [{ field: column.field, "desc": column.order === "descend" }] })
                                    }); }, function () {
                                        _this.loadMainGridData();
                                    });
                                }, onSelectCell: function (cellIndex, cell) {
                                }, onSelectRow: function (record) {
                                    //console.log(record);
                                }, onFilter: function (filters) {
                                }, onRefresh: function () {
                                    _this.loadMainGridData();
                                }, onSearch: function () {
                                    _this.toggleSearcher();
                                }, onSelectCheckboxChange: function (selectedRowKeys) {
                                    _this.checkStatus(selectedRowKeys);
                                } }),
                            React.createElement("br", null)))))));
    };
    return MainView;
}(Component));
export default MainView;
//# sourceMappingURL=Page.js.map
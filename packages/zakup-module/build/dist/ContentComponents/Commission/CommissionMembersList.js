"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var shared_ui_1 = require("@vitacore/shared-ui");
var antd_1 = require("antd");
var moment_1 = __importDefault(require("moment"));
var React = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var OkModalInfo_1 = __importDefault(require("../../Components/Modals/OkModalInfo"));
var YesNoModalInfo_1 = __importDefault(require("../../Components/Modals/YesNoModalInfo"));
var businessDataStateActions_1 = require("../../Redux/Actions/businessDataStateActions");
var infrastructureStateActions_1 = require("../../Redux/Actions/infrastructureStateActions");
var businessDataStateConstants_1 = require("../../Redux/Constants/businessDataStateConstants");
var history_1 = require("../../Redux/history");
var utils_1 = require("../../utils");
var shared_1 = require("../shared");
var getColumns = function (commissionId, onDelete) {
    return [
        {
            title: '№ п/п',
            width: '60px',
            dataIndex: 'id',
            key: '#',
            align: 'center',
            render: function (data, originalRow, index) {
                return index + 1;
            },
        },
        {
            title: 'ФИО',
            dataIndex: 'id',
            sorter: function (a, b) {
                var aFio = a.person.lastName + " " + a.person.firstName + (a.person.patronymic ? " " + a.person.patronymic : '');
                var bFio = b.person.lastName + " " + b.person.firstName + (a.person.patronymic ? " " + a.person.patronymic : '');
                return aFio.localeCompare(bFio);
            },
            render: function (data, originalRow) {
                var fio = originalRow.person.lastName + " " + originalRow.person.firstName + (originalRow.person.patronymic ? " " + originalRow.person.patronymic : '');
                return (React.createElement(react_router_dom_1.Link, { to: { pathname: shared_ui_1.buildAppRoute(utils_1.getAppRoute(), "/commissions/" + commissionId + "/members/" + data) } }, fio));
            },
            defaultSortOrder: 'ascend',
        },
        {
            title: 'Роль',
            dataIndex: 'meetingMemberRole.nameRu',
            sorter: function (a, b) {
                return a.meetingMemberRole.nameRu.localeCompare(b.meetingMemberRole.nameRu);
            },
        },
        {
            title: 'Дата начала работы в составе комиссии',
            sorter: function (a, b) {
                return moment_1.default(a.dateBegin, 'DD.MM.YYYY').diff(moment_1.default(b.dateBegin, 'DD.MM.YYYY'));
            },
            width: '200px',
            dataIndex: 'dateBegin',
        },
        {
            title: 'Дата окончания работы в составе комиссии',
            sorter: function (a, b) {
                if (a.dateEnd && !b.dateEnd) {
                    return 1;
                }
                if (!a.dateEnd && b.dateEnd) {
                    return -1;
                }
                if (!a.dateEnd && !b.dateEnd) {
                    return 0;
                }
                return moment_1.default(a.dateEnd, 'DD.MM.YYYY').diff(moment_1.default(b.dateEnd, 'DD.MM.YYYY'));
            },
            width: '200px',
            dataIndex: 'dateEnd',
        },
        {
            title: '',
            width: '60px',
            dataIndex: 'id',
            key: 'actions',
            align: 'center',
            render: function (id, originalRow) {
                return (React.createElement("div", { style: { display: 'flex', alignItems: 'center' } },
                    React.createElement(react_router_dom_1.Link, { to: shared_ui_1.buildAppRoute(utils_1.getAppRoute(), "/commissions/" + commissionId + "/members/" + id) },
                        React.createElement(antd_1.Icon, { type: "edit" })),
                    React.createElement(antd_1.Icon, { style: { color: '#1890ff', marginLeft: '5px', cursor: 'pointer' }, type: "delete", onClick: function () { return onDelete(commissionId, id); } })));
            },
        },
    ];
};
var CommissionMembersList = /** @class */ (function (_super) {
    __extends(CommissionMembersList, _super);
    function CommissionMembersList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fetchCommission = function (id) {
            _this.props.fetchCommissionById(id);
        };
        _this.onDeleteCommissionMember = function (commissionId, id) {
            var modalInfo = YesNoModalInfo_1.default('Вы действительно хотите удалить члена комиссии?', null, function () {
                utils_1.createApiClient()
                    .deleteCommissionMember(id)
                    .then(function () {
                    antd_1.message.success('Член комиссии успешно удален');
                    _this.props.closeRecentModal();
                    _this.fetchCommission(_this.props.match.params.id);
                })
                    .catch(function (error) {
                    antd_1.message.error(error.message);
                    _this.props.closeRecentModal();
                });
            }, undefined, function () {
                _this.props.closeRecentModal();
            }, undefined, undefined);
            _this.props.addNewModal(modalInfo);
        };
        return _this;
    }
    CommissionMembersList.prototype.componentDidMount = function () {
        var id = this.props.match.params.id;
        this.fetchCommission(id);
    };
    CommissionMembersList.prototype.render = function () {
        var _a = this.props, commission = _a.commission, fetchSingleCommissionStatus = _a.fetchSingleCommissionStatus, header = _a.header, match = _a.match;
        var id = match.params.id;
        if (fetchSingleCommissionStatus === businessDataStateConstants_1.FETCH_ENTITY_STATUS.FETCHING) {
            return React.createElement(shared_1.ContentLayout, { contentName: "\u0427\u043B\u0435\u043D\u044B \u043A\u043E\u043C\u0438\u0441\u0441\u0438\u0438" });
        }
        if (fetchSingleCommissionStatus === businessDataStateConstants_1.FETCH_ENTITY_STATUS.IDLE) {
            return null;
        }
        if (fetchSingleCommissionStatus === businessDataStateConstants_1.FETCH_ENTITY_STATUS.FAILED) {
            var modalInfo_1 = OkModalInfo_1.default('Ошибка при загрузке комиссии', 'Комиссия не найдена', function () {
                infrastructureStateActions_1.dispatchCloseRecentModal();
                history_1.getHistory().push(shared_ui_1.buildAppRoute(utils_1.getAppRoute(), '/commissions/all'));
            }, undefined, false);
            setTimeout(function () {
                businessDataStateActions_1.dispatchClearFetchEntityStatus();
                infrastructureStateActions_1.dispatchAddNewModal(modalInfo_1);
            }, 0);
            return null;
        }
        var contentNode = commission && (React.createElement(antd_1.Table, { columns: getColumns(id, this.onDeleteCommissionMember), dataSource: commission.meetingMembers, rowKey: function (r) { return r.id.toString(); }, size: "middle", pagination: false }));
        var bcRoutes = [
            {
                path: '/',
                breadcrumbName: 'Главная',
            },
            {
                path: 'commissions',
                breadcrumbName: 'Комиссии',
            },
            {
                path: id + "/members",
                breadcrumbName: 'Члены комиссии',
            },
        ];
        var buttons = [
            {
                text: 'Добавить члена комиссии',
                onClick: function () { return history_1.getHistory().push(shared_ui_1.buildAppRoute(utils_1.getAppRoute(), "/commissions/" + id + "/members/new")); },
            },
        ];
        return (React.createElement(shared_1.ContentLayout, { contentName: header, breadcrumbRoutes: bcRoutes, buttons: buttons }, contentNode));
    };
    return CommissionMembersList;
}(React.Component));
var mapStateToProps = function (state) {
    return {
        commission: state.businessDataState.commissionsData.currentCommission,
        fetchSingleCommissionStatus: state.businessDataState.commissionsData.fetchSingleCommissionStatus,
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        fetchCommissionById: function (id) { return dispatch(businessDataStateActions_1.fetchSingleCommission(id)); },
        addNewModal: function (modalInfo) { return dispatch(infrastructureStateActions_1.addNewModal(modalInfo)); },
        closeRecentModal: function (numberToClose) { return dispatch(infrastructureStateActions_1.closeRecentModal(numberToClose)); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(CommissionMembersList);
//# sourceMappingURL=CommissionMembersList.js.map
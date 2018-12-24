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
var businessDataStateActions_1 = require("../../Redux/Actions/businessDataStateActions");
var history_1 = require("../../Redux/history");
var utils_1 = require("../../utils");
var shared_1 = require("../shared");
var columns = [
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
        title: 'Регион',
        dataIndex: 'region.nameRu',
        sorter: function (a, b) { return a.region.nameRu.localeCompare(b.region.nameRu); },
        render: function (data, originalRow) {
            return (React.createElement(react_router_dom_1.Link, { to: { pathname: shared_ui_1.buildAppRoute(utils_1.getAppRoute(), "/commissions/" + originalRow.id + "/members") } }, data));
        },
    },
    {
        title: 'Дата начала действия комиссии',
        width: '270px',
        dataIndex: 'dateBegin',
        sorter: function (a, b) { return moment_1.default(a.dateBegin, 'DD.MM.YYYY').diff(moment_1.default(b.dateBegin, 'DD.MM.YYYY')); },
        defaultSortOrder: 'descend',
    },
    {
        title: '',
        width: '30px',
        dataIndex: 'id',
        align: 'center',
        render: function (id, originalRow) {
            return (React.createElement(react_router_dom_1.Link, { to: shared_ui_1.buildAppRoute(utils_1.getAppRoute(), "/commissions/" + id) },
                React.createElement(antd_1.Icon, { type: "edit" })));
        },
    },
];
var CommissionsList = /** @class */ (function (_super) {
    __extends(CommissionsList, _super);
    function CommissionsList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommissionsList.prototype.componentDidMount = function () {
        this.props.fetchCommissions();
    };
    CommissionsList.prototype.render = function () {
        var _a = this.props, commissions = _a.commissions, header = _a.header;
        var contentNode = commissions && (React.createElement(antd_1.Table, { columns: columns, dataSource: commissions, rowKey: function (r) { return r.id.toString(); }, size: "middle", pagination: false }));
        var bcRoutes = [
            {
                path: '/',
                breadcrumbName: 'Главная',
            },
            {
                path: 'commissions',
                breadcrumbName: 'Комиссии',
            },
        ];
        var buttons = [
            {
                text: 'Создать комиссию',
                onClick: function () { return history_1.getHistory().push(shared_ui_1.buildAppRoute(utils_1.getAppRoute(), '/commissions/new')); },
            },
        ];
        return (React.createElement(shared_1.ContentLayout, { contentName: header, breadcrumbRoutes: bcRoutes, buttons: buttons }, contentNode));
    };
    return CommissionsList;
}(React.Component));
var mapStateToProps = function (state) {
    return {
        commissions: state.businessDataState.commissionsData.commissions,
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        fetchCommissions: function () { return dispatch(businessDataStateActions_1.fetchCommissions()); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(CommissionsList);
//# sourceMappingURL=CommissionsList.js.map
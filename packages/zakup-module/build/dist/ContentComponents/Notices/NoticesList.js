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
var localStorageConstants_1 = require("../../Infrastructure/localStorageConstants");
var businessDataStateActions_1 = require("../../Redux/Actions/businessDataStateActions");
var history_1 = require("../../Redux/history");
var utils_1 = require("../../utils");
var shared_1 = require("../shared");
var NoticesList = /** @class */ (function (_super) {
    __extends(NoticesList, _super);
    function NoticesList(props) {
        var _this = _super.call(this, props) || this;
        _this.onRowSelectionChange = function (selectedRowKeys) {
            _this.setState({
                selectedRowKeys: selectedRowKeys,
            });
        };
        _this.onCommandClick = function (commandId, isReport) {
            utils_1.createApiClient().runCommand(commandId, _this.state.selectedRowKeys, isReport);
        };
        _this.getColumns = function () {
            return [
                {
                    title: 'Наименование объявления',
                    dataIndex: 'noticeType.nameRu',
                    sorter: function (a, b) { return a.noticeType.code.localeCompare(b.noticeType.code); },
                    render: function (data, originalRow) {
                        return (React.createElement(react_router_dom_1.Link, { to: { pathname: shared_ui_1.buildAppRoute(utils_1.getAppRoute(), "/notices/" + originalRow.id.toString()) } }, data));
                    },
                },
                {
                    title: 'Регион осущ. деятельности',
                    sorter: function (a, b) { return a.region.nameRu.localeCompare(b.region.nameRu); },
                    width: '175px',
                    dataIndex: 'region.nameRu',
                },
                {
                    title: 'Плановый период',
                    sorter: function (a, b) { return a.periodYear.year.localeCompare(b.periodYear.year); },
                    width: '120px',
                    dataIndex: 'periodYear.year',
                },
                {
                    title: 'Поданные заявки',
                    dataIndex: 'numberOfApplications',
                    width: '110px',
                    sorter: function (a, b) { return a.numberOfApplications - b.numberOfApplications; },
                    render: function (data, originalRow) {
                        return (React.createElement(react_router_dom_1.Link, { to: { pathname: shared_ui_1.buildAppRoute(utils_1.getAppRoute(), "/notices/" + originalRow.id.toString() + "/applicants") } }, data));
                    },
                },
                {
                    title: 'Дата начала приема заявок',
                    dataIndex: 'dateBegin',
                    width: '150px',
                    sorter: function (a, b) { return moment_1.default(a.dateBegin, 'DD.MM.YYYY').diff(moment_1.default(b.dateBegin, 'DD.MM.YYYY')); },
                    defaultSortOrder: 'ascend',
                },
                {
                    title: 'Дата окончания приема заявок',
                    dataIndex: 'dateEnd',
                    width: '150px',
                    sorter: function (a, b) { return moment_1.default(a.dateEnd, 'DD.MM.YYYY').diff(moment_1.default(b.dateEnd, 'DD.MM.YYYY')); },
                },
                {
                    title: 'Статус',
                    sorter: function (a, b) { return a.status.localeCompare(b.status); },
                    width: '100px',
                    dataIndex: 'status',
                },
            ];
        };
        _this.onNewNoticeClick = function () {
            _this.props.history.push(shared_ui_1.buildAppRoute(utils_1.getAppRoute(), '/notices/new'));
        };
        var page = +props.match.params.page;
        if (!page) {
            page = 1;
        }
        var itemsPerPage = localStorage.getItem(localStorageConstants_1.ZAKUP_ADS_TABLE_ITEMS_PER_PAGE);
        _this.state = {
            currentPage: page,
            itemsPerPage: (itemsPerPage && +itemsPerPage) || 10,
            selectedRowKeys: [],
        };
        return _this;
    }
    NoticesList.prototype.componentDidMount = function () {
        var _a = this.state, currentPage = _a.currentPage, itemsPerPage = _a.itemsPerPage;
        this.props.fetchNotices(currentPage, itemsPerPage);
    };
    NoticesList.prototype.render = function () {
        var _this = this;
        var _a = this.props, totalElements = _a.totalElements, notices = _a.notices, header = _a.header;
        var contentNode = notices && (React.createElement(antd_1.Table, { rowSelection: { onChange: this.onRowSelectionChange, selectedRowKeys: this.state.selectedRowKeys }, columns: this.getColumns(), dataSource: notices, rowKey: function (r) { return r.id.toString(); }, size: "middle", pagination: {
                position: 'both',
                pageSize: this.state.itemsPerPage,
                current: this.state.currentPage,
                showSizeChanger: true,
                showTotal: function (total, range) { return range[0] + "-" + range[1] + " \u0438\u0437 " + total + " \u0437\u0430\u043F\u0438\u0441\u0435\u0439"; },
                pageSizeOptions: ['10', '25', '50', '100'],
                total: totalElements,
                onChange: function (page, pageSize) {
                    history_1.NativeHistory.pushState(null, document.title, shared_ui_1.buildAppRoute(utils_1.getAppRoute(), "/notices/all/" + page));
                    _this.setState({
                        currentPage: page,
                    });
                    _this.props.fetchNotices(page, pageSize);
                },
                onShowSizeChange: function (current, size) {
                    localStorage.setItem(localStorageConstants_1.ZAKUP_ADS_TABLE_ITEMS_PER_PAGE, size.toString());
                    if (_this.state.currentPage !== current) {
                        history_1.NativeHistory.pushState(null, document.title, shared_ui_1.buildAppRoute(utils_1.getAppRoute(), "/notices/all/" + current));
                    }
                    _this.setState({
                        currentPage: current,
                        itemsPerPage: size,
                    });
                    _this.props.fetchNotices(current, size);
                },
            } }));
        var buttons = [
            {
                text: 'Создать объявление',
                onClick: this.onNewNoticeClick,
            },
        ];
        var bcRoutes = [
            {
                path: '/',
                breadcrumbName: 'Главная',
            },
            {
                path: 'notices/all/1',
                breadcrumbName: 'Все объявления',
            },
        ];
        return (React.createElement(shared_1.ContentLayout, { entity: "notice", disableCommands: this.state.selectedRowKeys.length === 0, showCommands: true, onCommandClick: this.onCommandClick, contentName: header, buttons: buttons, breadcrumbRoutes: bcRoutes }, contentNode));
    };
    return NoticesList;
}(React.Component));
var mapStateToProps = function (state) {
    return {
        notices: state.businessDataState.noticeData.notices,
        totalElements: state.businessDataState.noticeData.total,
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        fetchNotices: function (page, pageSize, onlyMy) {
            return dispatch(businessDataStateActions_1.fetchNotices(page - 1, pageSize, onlyMy));
        },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(react_router_dom_1.withRouter(NoticesList));
//# sourceMappingURL=NoticesList.js.map
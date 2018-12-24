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
Object.defineProperty(exports, "__esModule", { value: true });
var shared_ui_1 = require("@vitacore/shared-ui");
var antd_1 = require("antd");
var moment_1 = __importDefault(require("moment"));
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
var localStorageConstants_1 = require("../../Infrastructure/localStorageConstants");
var history_1 = require("../../Redux/history");
var utils_1 = require("../../utils");
var shared_1 = require("../shared");
var columns = [
    {
        title: 'Плановый период',
        dataIndex: 'periodYear.year',
        width: '200px',
        sorter: function (a, b) { return a.periodYear.year - b.periodYear.year; },
    },
    {
        title: 'Регион',
        dataIndex: 'region.nameRu',
        sorter: function (a, b) { return a.region.nameRu.localeCompare(b.region.nameRu); },
    },
    {
        title: 'Регистрационный номер',
        dataIndex: 'number',
        width: '220px',
        sorter: function (a, b) { return a.number.localeCompare(b.number); },
        render: function (data, originalRow) {
            return (react_1.default.createElement(react_router_dom_1.Link, { to: { pathname: shared_ui_1.buildAppRoute(utils_1.getAppRoute(), "/protocols/" + originalRow.id.toString()) } }, data));
        },
    },
    {
        title: 'Тип',
        width: '150px',
        dataIndex: 'planProtocolType.nameRu',
        sorter: function (a, b) {
            return a.planProtocolType.nameRu.localeCompare(b.planProtocolType.nameRu);
        },
    },
    {
        title: 'Дата',
        width: '120px',
        dataIndex: 'documentDate',
        sorter: function (a, b) {
            return +moment_1.default(a.documentDate, 'DD.MM.YYYY') - +moment_1.default(b.documentDate, 'DD.MM.YYYY');
        },
    },
];
var ProtocolsList = /** @class */ (function (_super) {
    __extends(ProtocolsList, _super);
    function ProtocolsList(props) {
        var _this = _super.call(this, props) || this;
        _this.fetchProtocols = function (page, pageSize) {
            utils_1.createApiClient()
                .fetchProtocols(page - 1, pageSize)
                .then(function (resp) {
                var data = resp.data;
                _this.setState({
                    totalElements: data.totalElements,
                    protocols: data.content,
                });
            })
                .catch(function (error) { return antd_1.message.error(error.message); });
        };
        var page = +props.match.params.page;
        if (!page) {
            page = 1;
        }
        var itemsPerPage = localStorage.getItem(localStorageConstants_1.PROTOCOLS_TABLE_ITEMS_PER_PAGE);
        _this.state = {
            protocols: [],
            currentPage: page,
            itemsPerPage: (itemsPerPage && +itemsPerPage) || 10,
            totalElements: 0,
        };
        return _this;
    }
    ProtocolsList.prototype.componentDidMount = function () {
        var _a = this.state, currentPage = _a.currentPage, itemsPerPage = _a.itemsPerPage;
        this.fetchProtocols(currentPage, itemsPerPage);
    };
    ProtocolsList.prototype.render = function () {
        var _this = this;
        var header = this.props.header;
        var _a = this.state, protocols = _a.protocols, totalElements = _a.totalElements;
        var contentNode = protocols && (react_1.default.createElement(antd_1.Table, { columns: columns, dataSource: protocols, rowKey: function (r) { return r.id.toString(); }, size: "middle", pagination: {
                position: 'both',
                pageSize: this.state.itemsPerPage,
                current: this.state.currentPage,
                showSizeChanger: true,
                showTotal: function (total, range) { return range[0] + "-" + range[1] + " \u0438\u0437 " + total + " \u0437\u0430\u043F\u0438\u0441\u0435\u0439"; },
                pageSizeOptions: ['10', '25', '50', '100'],
                total: totalElements,
                onChange: function (page, pageSize) {
                    history_1.NativeHistory.pushState(null, document.title, shared_ui_1.buildAppRoute(utils_1.getAppRoute(), "/protocols/all/" + page));
                    _this.setState({
                        currentPage: page,
                    });
                    _this.fetchProtocols(page, pageSize);
                },
                onShowSizeChange: function (current, size) {
                    localStorage.setItem(localStorageConstants_1.PROTOCOLS_TABLE_ITEMS_PER_PAGE, size.toString());
                    if (_this.state.currentPage !== current) {
                        history_1.NativeHistory.pushState(null, document.title, shared_ui_1.buildAppRoute(utils_1.getAppRoute(), "/protocols/all/" + current));
                    }
                    _this.setState({
                        currentPage: current,
                        itemsPerPage: size,
                    });
                    _this.fetchProtocols(current, size);
                },
            } }));
        var bcRoutes = [
            {
                path: '/',
                breadcrumbName: 'Главная',
            },
            {
                path: 'procotols/all/1',
                breadcrumbName: 'Все протоколы',
            },
        ];
        return (react_1.default.createElement(shared_1.ContentLayout, { contentName: header, breadcrumbRoutes: bcRoutes }, contentNode));
    };
    return ProtocolsList;
}(react_1.default.Component));
exports.default = ProtocolsList;
//# sourceMappingURL=ProtocolsList.js.map
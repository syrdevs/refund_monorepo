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
var React = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var businessDataStateActions_1 = require("../../Redux/Actions/businessDataStateActions");
var utils_1 = require("../../utils");
var shared_1 = require("../shared");
var columns = [
    {
        title: '№ п/п',
        width: '60px',
        dataIndex: 'name',
        key: '#',
        align: 'center',
        render: function (data, originalRow, index) {
            return index + 1;
        },
    },
    {
        title: '№ региона',
        dataIndex: 'regionNum',
        sorter: function (a, b) { return a.regionNum.localeCompare(b.regionNum); },
    },
    {
        title: 'Наименование субъекта здравоохранения',
        dataIndex: 'name',
        sorter: function (a, b) { return a.name.localeCompare(b.name); },
        width: '55%',
        render: function (data, originalRow) {
            var isBad = originalRow.isBadSupplier;
            var styleObj = isBad ? { color: 'red' } : undefined;
            return (React.createElement(react_router_dom_1.Link, { to: { pathname: shared_ui_1.buildAppRoute(utils_1.getAppRoute(), isBad ? '/reestr/bad' : '/reestr/all') }, style: styleObj }, data));
        },
    },
    {
        title: 'БИК/ИНН',
        dataIndex: 'BIN_INN',
    },
    {
        title: 'Территориальная принадлежность',
        sorter: function (a, b) { return a.territory.localeCompare(b.territory); },
        width: '170px',
        dataIndex: 'territory',
    },
];
var SuppliersReestrAll = /** @class */ (function (_super) {
    __extends(SuppliersReestrAll, _super);
    function SuppliersReestrAll() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SuppliersReestrAll.prototype.componentDidMount = function () {
        this.props.fetchAllSuppliers();
    };
    SuppliersReestrAll.prototype.render = function () {
        var _a = this.props, suppliers = _a.suppliers, header = _a.header;
        var contentNode = suppliers && (React.createElement(antd_1.Table, { columns: columns, dataSource: suppliers, rowKey: function (r) { return r.name; }, size: "middle", pagination: false }));
        var bcRoutes = [
            {
                path: '/',
                breadcrumbName: 'Главная',
            },
            {
                path: 'reestr/all',
                breadcrumbName: 'Регистр поставщиков',
            },
        ];
        return (React.createElement(shared_1.ContentLayout, { contentName: header, breadcrumbRoutes: bcRoutes }, contentNode));
    };
    return SuppliersReestrAll;
}(React.Component));
var mapStateToProps = function (state) {
    return {
        suppliers: state.businessDataState.suppliers,
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        fetchAllSuppliers: function () { return dispatch(businessDataStateActions_1.fetchAllSuppliers()); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(SuppliersReestrAll);
//# sourceMappingURL=SuppliersReestrAll.js.map
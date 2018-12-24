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
var react_router_1 = require("react-router");
var react_router_dom_1 = require("react-router-dom");
var businessDataStateActions_1 = require("../../../Redux/Actions/businessDataStateActions");
var history_1 = require("../../../Redux/history");
var utils_1 = require("../../../utils");
var shared_1 = require("../../shared");
var getColumns = function (adId) {
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
            title: 'Наименование субъекта здравоохранения',
            dataIndex: 'name',
            sorter: function (a, b) { return a.name.localeCompare(b.name); },
            width: '70%',
        },
        {
            title: 'Представленные документы',
            dataIndex: 'id',
            render: function (data, originalRow) {
                return (React.createElement(react_router_dom_1.Link, { to: {
                        pathname: shared_ui_1.buildAppRoute(utils_1.getAppRoute(), "/notices/" + adId + "/applicants/" + originalRow.id.toString()),
                    } }, "\u041F\u0435\u0440\u0435\u0447\u0435\u043D\u044C \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432"));
            },
        },
    ];
    return columns;
};
var AdApplicantsList = /** @class */ (function (_super) {
    __extends(AdApplicantsList, _super);
    function AdApplicantsList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AdApplicantsList.prototype.componentDidMount = function () {
        var id = this.props.match.params.id;
        if (!id) {
            history_1.getHistory().push(shared_ui_1.buildAppRoute(utils_1.getAppRoute(), '/notices/all/1'));
        }
        else {
            this.props.fetchAdApplicants(id);
        }
    };
    AdApplicantsList.prototype.render = function () {
        var _a = this.props, adApplicants = _a.adApplicants, header = _a.header;
        var adId = this.props.match.params.id;
        var contentNode = adApplicants && (React.createElement(antd_1.Table, { columns: getColumns(adId), dataSource: adApplicants, rowKey: function (r) { return r.id.toString(); }, size: "middle", pagination: false }));
        var bcRoutes = [
            {
                path: '/',
                breadcrumbName: 'Главная',
            },
            {
                path: 'notices',
                breadcrumbName: 'Все объявления',
            },
            {
                path: adId,
                breadcrumbName: 'Объявление',
            },
            {
                path: 'applicants',
                breadcrumbName: 'Подавшие заявки',
            },
        ];
        return (React.createElement(shared_1.ContentLayout, { contentName: header, breadcrumbRoutes: bcRoutes }, contentNode));
    };
    return AdApplicantsList;
}(React.Component));
var mapStateToProps = function (state) {
    return {
        adApplicants: state.businessDataState.adApplicants,
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        fetchAdApplicants: function (id) { return dispatch(businessDataStateActions_1.fetchAdApplicants(id)); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(react_router_1.withRouter(AdApplicantsList));
//# sourceMappingURL=AdApplicantsList.js.map
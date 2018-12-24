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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var shared_ui_1 = require("@vitacore/shared-ui");
var antd_1 = require("antd");
var React = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var react_router_1 = require("react-router");
var ApplicantDocRejectReason_1 = __importDefault(require("../../../Components/Modals/ApplicantDocRejectReason"));
var YesNoModalInfo_1 = __importDefault(require("../../../Components/Modals/YesNoModalInfo"));
var adApplicantDecisions_1 = __importDefault(require("../../../Data/adApplicantDecisions"));
var businessDataStateActions_1 = require("../../../Redux/Actions/businessDataStateActions");
var infrastructureStateActions_1 = require("../../../Redux/Actions/infrastructureStateActions");
var store_1 = require("../../../Redux/store");
var utils_1 = require("../../../utils");
var shared_1 = require("../../shared");
var Option = antd_1.Select.Option;
var AdApplicantDocs = /** @class */ (function (_super) {
    __extends(AdApplicantDocs, _super);
    function AdApplicantDocs(props) {
        var _this = _super.call(this, props) || this;
        _this.getColumns = function () {
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
                    title: 'Наименование документа',
                    dataIndex: 'docName',
                    sorter: function (a, b) { return a.docName.localeCompare(b.docName); },
                },
                {
                    title: 'Решение',
                    dataIndex: 'decision',
                    width: '170px',
                    render: function (data, originalRow) {
                        var currentStatus = _this.state.docsRejectionStatuses.find(function (i) { return i.docName === originalRow.docName; });
                        var idx = _this.state.docsRejectionStatuses.indexOf(currentStatus);
                        return (React.createElement(antd_1.Select, { labelInValue: true, value: { key: currentStatus.decision.toString(), label: null }, onChange: function (value) {
                                if (value.key === '2') {
                                    var modalInfo = ApplicantDocRejectReason_1.default('Укажите причину отказа', function (rejectText) { return function () {
                                        var yesNoModalInfo = YesNoModalInfo_1.default('Отказ', 'Вы действительно хотите отказать?', function () {
                                            console.log(rejectText);
                                            // CALL SAVE
                                            var adId = +_this.props.match.params.adId;
                                            _this.props.fetchAdApplicants(adId);
                                            _this.props.closeRecentModal(2);
                                        }, undefined, function () { return _this.props.closeRecentModal(); }, undefined, false);
                                        _this.props.addNewModal(yesNoModalInfo);
                                    }; }, function () {
                                        var docsRejectionStatuses = __spread(_this.state.docsRejectionStatuses);
                                        docsRejectionStatuses[idx] = __assign({}, docsRejectionStatuses[idx], { decision: 1 });
                                        _this.setState({
                                            docsRejectionStatuses: docsRejectionStatuses,
                                        });
                                        _this.props.closeRecentModal();
                                    }, undefined, undefined, false);
                                    _this.props.addNewModal(modalInfo);
                                }
                                else {
                                    var docsRejectionStatuses = __spread(_this.state.docsRejectionStatuses);
                                    docsRejectionStatuses[idx] = __assign({}, docsRejectionStatuses[idx], { decision: +value.key });
                                    _this.setState({
                                        docsRejectionStatuses: docsRejectionStatuses,
                                    });
                                }
                            } }, adApplicantDecisions_1.default.map(function (i) { return (React.createElement(Option, { key: i.id.toString(), value: i.id.toString() }, i.name)); })));
                    },
                },
                {
                    title: 'Причина отказа',
                    dataIndex: 'rejectReason',
                },
            ];
            return columns;
        };
        _this.state = {
            docsRejectionStatuses: AdApplicantDocs.extractDocsRejectionStatuses(props.adApplicantDocs),
        };
        return _this;
    }
    AdApplicantDocs.getDerivedStateFromProps = function (nextProps, prevState) {
        if (nextProps.adApplicantDocs.length !== prevState.docsRejectionStatuses.length) {
            return {
                docsRejectionStatuses: AdApplicantDocs.extractDocsRejectionStatuses(nextProps.adApplicantDocs),
            };
        }
        return null;
    };
    AdApplicantDocs.prototype.componentDidMount = function () {
        if (!store_1.getStore().getState().businessDataState.adApplicants ||
            store_1.getStore().getState().businessDataState.adApplicants.length === 0) {
            var adId = this.props.match.params.adId;
            this.props.fetchAdApplicants(adId);
        }
    };
    AdApplicantDocs.prototype.render = function () {
        var _a = this.props, adApplicantDocs = _a.adApplicantDocs, header = _a.header;
        var adId = +this.props.match.params.adId;
        var contentNode = adApplicantDocs && (React.createElement(antd_1.Table, { columns: this.getColumns(), dataSource: adApplicantDocs, rowKey: function (r) { return r.docName; }, size: "middle", pagination: false }));
        var bcRoutes = [
            {
                path: '/',
                breadcrumbName: 'Главная',
            },
            {
                path: shared_ui_1.buildAppRoute(utils_1.getAppRoute(), 'notices'),
                breadcrumbName: 'Объявления',
            },
            {
                path: adId + "/applicants",
                breadcrumbName: 'Подавшие заявки субъекты здравоохранения',
            },
            {
                path: '#',
                breadcrumbName: 'Документы по заявке',
            },
        ];
        return (React.createElement(shared_1.ContentLayout, { contentName: header, breadcrumbRoutes: bcRoutes }, contentNode));
    };
    AdApplicantDocs.extractDocsRejectionStatuses = function (applicantDocs) {
        return applicantDocs.map(function (i) { return ({ docName: i.docName, decision: i.decision }); });
    };
    return AdApplicantDocs;
}(React.Component));
var mapStateToProps = function (state, ownProps) {
    var id = +ownProps.match.params.id;
    var applicant = state.businessDataState.adApplicants
        ? __assign({}, state.businessDataState.adApplicants.find(function (i) { return i.id === id; }))
        : null;
    var docs = applicant ? applicant.docs : [];
    return {
        adApplicantDocs: docs,
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        fetchAdApplicants: function (id) { return dispatch(businessDataStateActions_1.fetchAdApplicants(id)); },
        addNewModal: function (modalInfo) { return dispatch(infrastructureStateActions_1.addNewModal(modalInfo)); },
        closeRecentModal: function (numberToClose) { return dispatch(infrastructureStateActions_1.closeRecentModal(numberToClose)); },
    };
};
exports.default = react_router_1.withRouter(react_redux_1.connect(mapStateToProps, mapDispatchToProps)(AdApplicantDocs));
//# sourceMappingURL=AdApplicantDocs.js.map
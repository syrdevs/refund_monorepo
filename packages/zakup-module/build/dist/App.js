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
var react_1 = __importDefault(require("react"));
var react_redux_1 = require("react-redux");
var react_router_1 = require("react-router");
require("./assets/ant-table.css");
var ModalsContainer_1 = __importDefault(require("./Components/Modals/ModalsContainer"));
var Components = __importStar(require("./ContentComponents"));
var store_1 = require("./Redux/store");
var utils_1 = require("./utils");
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        utils_1.addToAppFunctions('simpleAuthCheck', props.simpleAuthCheck);
        utils_1.addToAppFunctions('promiseAuthCheck', props.promiseAuthCheck);
        utils_1.addToAppFunctions('getAuthToken', props.getAuthToken);
        utils_1.addToAppFunctions('requestStarted', props.requestStarted);
        utils_1.addToAppFunctions('requestFinished', props.requestFinished);
        utils_1.addToAppFunctions('getUserLanguage', props.getUserLanguage);
        if (props.subscribeToUserLanguageChange) {
            props.subscribeToUserLanguageChange(utils_1.setUserLanguage);
        }
        utils_1.addToAppData(shared_ui_1.APP_ROUTE_KEY, props.appRoute);
        utils_1.addToAppData('history', props.history);
        store_1.initStore(props.history);
        return _this;
    }
    App.prototype.render = function () {
        return (react_1.default.createElement(react_redux_1.Provider, { store: store_1.getStore() },
            react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("div", { style: { display: 'flex', flexDirection: 'column', flexGrow: utils_1.isTrue(this.props.handleNoMatch) ? 1 : 0 } },
                    react_1.default.createElement(react_router_1.Switch, null,
                        react_1.default.createElement(shared_ui_1.PrivateRoute, { exact: true, path: shared_ui_1.buildAppRoute(utils_1.getAppRoute(), '/'), simpleAuthCheck: utils_1.getAppFunction('simpleAuthCheck'), promiseAuthCheck: utils_1.getAppFunction('promiseAuthCheck'), render: function () { return react_1.default.createElement(react_router_1.Redirect, { to: shared_ui_1.buildAppRoute(utils_1.getAppRoute(), '/notices/all/1') }); } }),
                        react_1.default.createElement(shared_ui_1.PrivateRoute, { exact: true, path: shared_ui_1.buildAppRoute(utils_1.getAppRoute(), '/notices'), simpleAuthCheck: utils_1.getAppFunction('simpleAuthCheck'), promiseAuthCheck: utils_1.getAppFunction('promiseAuthCheck'), render: function () { return react_1.default.createElement(react_router_1.Redirect, { to: shared_ui_1.buildAppRoute(utils_1.getAppRoute(), '/notices/all/1') }); } }),
                        react_1.default.createElement(shared_ui_1.PrivateRoute, { exact: true, path: shared_ui_1.buildAppRoute(utils_1.getAppRoute(), '/notices/all'), simpleAuthCheck: utils_1.getAppFunction('simpleAuthCheck'), promiseAuthCheck: utils_1.getAppFunction('promiseAuthCheck'), render: function () { return react_1.default.createElement(react_router_1.Redirect, { to: shared_ui_1.buildAppRoute(utils_1.getAppRoute(), '/notices/all/1') }); } }),
                        react_1.default.createElement(shared_ui_1.PrivateRoute, { exact: true, path: shared_ui_1.buildAppRoute(utils_1.getAppRoute(), '/notices/all/:page'), simpleAuthCheck: utils_1.getAppFunction('simpleAuthCheck'), promiseAuthCheck: utils_1.getAppFunction('promiseAuthCheck'), render: function () { return react_1.default.createElement(Components.NoticesList, { header: 'Объявления' }); } }),
                        react_1.default.createElement(shared_ui_1.PrivateRoute, { exact: true, path: shared_ui_1.buildAppRoute(utils_1.getAppRoute(), '/notices/:id'), simpleAuthCheck: utils_1.getAppFunction('simpleAuthCheck'), promiseAuthCheck: utils_1.getAppFunction('promiseAuthCheck'), render: function (routeProps) { return react_1.default.createElement(Components.NoticeForm, { match: routeProps.match }); } }),
                        react_1.default.createElement(shared_ui_1.PrivateRoute, { exact: true, path: shared_ui_1.buildAppRoute(utils_1.getAppRoute(), '/notices/:id([0-9a-zA-Z-]+)/applicants'), simpleAuthCheck: utils_1.getAppFunction('simpleAuthCheck'), promiseAuthCheck: utils_1.getAppFunction('promiseAuthCheck'), render: function (routeParams) { return (react_1.default.createElement(react_router_1.Redirect, { to: shared_ui_1.buildAppRoute(utils_1.getAppRoute(), "/notices/" + routeParams.match.params.id + "/applicants/1") })); } }),
                        react_1.default.createElement(shared_ui_1.PrivateRoute, { exact: true, path: shared_ui_1.buildAppRoute(utils_1.getAppRoute(), '/notices/:id([0-9a-zA-Z-]+)/applicants/:page'), simpleAuthCheck: utils_1.getAppFunction('simpleAuthCheck'), promiseAuthCheck: utils_1.getAppFunction('promiseAuthCheck'), render: function (routeProps) { return (react_1.default.createElement(Components.ProposalsList, { header: 'Заявки на объемы', noticeId: routeProps.match.params.id, page: routeProps.match.params.page })); } }),
                        react_1.default.createElement(shared_ui_1.PrivateRoute, { exact: true, path: shared_ui_1.buildAppRoute(utils_1.getAppRoute(), '/commissions'), simpleAuthCheck: utils_1.getAppFunction('simpleAuthCheck'), promiseAuthCheck: utils_1.getAppFunction('promiseAuthCheck'), render: function () { return react_1.default.createElement(react_router_1.Redirect, { to: shared_ui_1.buildAppRoute(utils_1.getAppRoute(), '/commissions/all') }); } }),
                        react_1.default.createElement(shared_ui_1.PrivateRoute, { exact: true, path: shared_ui_1.buildAppRoute(utils_1.getAppRoute(), '/commissions/all'), simpleAuthCheck: utils_1.getAppFunction('simpleAuthCheck'), promiseAuthCheck: utils_1.getAppFunction('promiseAuthCheck'), render: function () { return react_1.default.createElement(Components.CommissionsList, { header: 'Список комиссий' }); } }),
                        react_1.default.createElement(shared_ui_1.PrivateRoute, { exact: true, path: shared_ui_1.buildAppRoute(utils_1.getAppRoute(), '/commissions/:id'), simpleAuthCheck: utils_1.getAppFunction('simpleAuthCheck'), promiseAuthCheck: utils_1.getAppFunction('promiseAuthCheck'), render: function (routeProps) { return react_1.default.createElement(Components.CommissionForm, { match: routeProps.match }); } }),
                        react_1.default.createElement(shared_ui_1.PrivateRoute, { exact: true, path: shared_ui_1.buildAppRoute(utils_1.getAppRoute(), '/commissions/:id/members'), simpleAuthCheck: utils_1.getAppFunction('simpleAuthCheck'), promiseAuthCheck: utils_1.getAppFunction('promiseAuthCheck'), render: function (routeProps) { return (react_1.default.createElement(Components.CommissionMembersList, { match: routeProps.match, header: 'Список членов комиссии' })); } }),
                        react_1.default.createElement(shared_ui_1.PrivateRoute, { exact: true, path: shared_ui_1.buildAppRoute(utils_1.getAppRoute(), '/commissions/:commissionId/members/:id'), simpleAuthCheck: utils_1.getAppFunction('simpleAuthCheck'), promiseAuthCheck: utils_1.getAppFunction('promiseAuthCheck'), render: function (routeProps) { return react_1.default.createElement(Components.CommissionMemberForm, { match: routeProps.match }); } }),
                        react_1.default.createElement(shared_ui_1.PrivateRoute, { exact: true, path: shared_ui_1.buildAppRoute(utils_1.getAppRoute(), '/reestr'), simpleAuthCheck: utils_1.getAppFunction('simpleAuthCheck'), promiseAuthCheck: utils_1.getAppFunction('promiseAuthCheck'), render: function () { return react_1.default.createElement(react_router_1.Redirect, { to: shared_ui_1.buildAppRoute(utils_1.getAppRoute(), '/reestr/all') }); } }),
                        react_1.default.createElement(shared_ui_1.PrivateRoute, { exact: true, path: shared_ui_1.buildAppRoute(utils_1.getAppRoute(), '/reestr/all'), simpleAuthCheck: utils_1.getAppFunction('simpleAuthCheck'), promiseAuthCheck: utils_1.getAppFunction('promiseAuthCheck'), render: function () { return react_1.default.createElement(Components.SuppliersReestrAll, { header: 'Регистр участников' }); } }),
                        react_1.default.createElement(shared_ui_1.PrivateRoute, { exact: true, path: shared_ui_1.buildAppRoute(utils_1.getAppRoute(), '/reestr/bad'), simpleAuthCheck: utils_1.getAppFunction('simpleAuthCheck'), promiseAuthCheck: utils_1.getAppFunction('promiseAuthCheck'), render: function () { return react_1.default.createElement(Components.SuppliersReestrBad, { header: 'Регистр недобросовестных участников' }); } }),
                        react_1.default.createElement(shared_ui_1.PrivateRoute, { exact: true, path: shared_ui_1.buildAppRoute(utils_1.getAppRoute(), '/requests/applications'), simpleAuthCheck: utils_1.getAppFunction('simpleAuthCheck'), promiseAuthCheck: utils_1.getAppFunction('promiseAuthCheck'), render: function () { return react_1.default.createElement(react_router_1.Redirect, { to: shared_ui_1.buildAppRoute(utils_1.getAppRoute(), '/requests/applications/all/1') }); } }),
                        react_1.default.createElement(shared_ui_1.PrivateRoute, { exact: true, path: shared_ui_1.buildAppRoute(utils_1.getAppRoute(), '/requests/applications/all'), simpleAuthCheck: utils_1.getAppFunction('simpleAuthCheck'), promiseAuthCheck: utils_1.getAppFunction('promiseAuthCheck'), render: function () { return react_1.default.createElement(react_router_1.Redirect, { to: shared_ui_1.buildAppRoute(utils_1.getAppRoute(), '/requests/applications/all/1') }); } }),
                        react_1.default.createElement(shared_ui_1.PrivateRoute, { exact: true, path: shared_ui_1.buildAppRoute(utils_1.getAppRoute(), '/requests/applications/all/:page'), simpleAuthCheck: utils_1.getAppFunction('simpleAuthCheck'), promiseAuthCheck: utils_1.getAppFunction('promiseAuthCheck'), render: function (routeProps) { return (react_1.default.createElement(Components.ApplicationsList, { header: 'Заявки на включение в базу данных субъектов здравоохранения', match: routeProps.match })); } }),
                        react_1.default.createElement(shared_ui_1.PrivateRoute, { exact: true, path: shared_ui_1.buildAppRoute(utils_1.getAppRoute(), '/requests/applications/:id'), simpleAuthCheck: utils_1.getAppFunction('simpleAuthCheck'), promiseAuthCheck: utils_1.getAppFunction('promiseAuthCheck'), render: function (routeProps) { return react_1.default.createElement(Components.ApplicationRequest, { match: routeProps.match }); } }),
                        react_1.default.createElement(shared_ui_1.PrivateRoute, { exact: true, path: shared_ui_1.buildAppRoute(utils_1.getAppRoute(), '/requests/proposals'), simpleAuthCheck: utils_1.getAppFunction('simpleAuthCheck'), promiseAuthCheck: utils_1.getAppFunction('promiseAuthCheck'), render: function () { return react_1.default.createElement(react_router_1.Redirect, { to: shared_ui_1.buildAppRoute(utils_1.getAppRoute(), '/requests/proposals/all/1') }); } }),
                        react_1.default.createElement(shared_ui_1.PrivateRoute, { exact: true, path: shared_ui_1.buildAppRoute(utils_1.getAppRoute(), '/requests/proposals/all'), simpleAuthCheck: utils_1.getAppFunction('simpleAuthCheck'), promiseAuthCheck: utils_1.getAppFunction('promiseAuthCheck'), render: function () { return react_1.default.createElement(react_router_1.Redirect, { to: shared_ui_1.buildAppRoute(utils_1.getAppRoute(), '/requests/proposals/all/1') }); } }),
                        react_1.default.createElement(shared_ui_1.PrivateRoute, { exact: true, path: shared_ui_1.buildAppRoute(utils_1.getAppRoute(), '/requests/proposals/all/:page'), simpleAuthCheck: utils_1.getAppFunction('simpleAuthCheck'), promiseAuthCheck: utils_1.getAppFunction('promiseAuthCheck'), render: function (routeProps) { return (react_1.default.createElement(Components.ProposalsList, { header: 'Заявки на объемы', page: routeProps.match.params.page })); } }),
                        react_1.default.createElement(shared_ui_1.PrivateRoute, { exact: true, path: shared_ui_1.buildAppRoute(utils_1.getAppRoute(), '/requests/proposals/:id'), simpleAuthCheck: utils_1.getAppFunction('simpleAuthCheck'), promiseAuthCheck: utils_1.getAppFunction('promiseAuthCheck'), render: function (routeProps) { return react_1.default.createElement(Components.ProposalRequest, { id: routeProps.match.params.id }); } }),
                        react_1.default.createElement(shared_ui_1.PrivateRoute, { exact: true, path: shared_ui_1.buildAppRoute(utils_1.getAppRoute(), '/protocols'), simpleAuthCheck: utils_1.getAppFunction('simpleAuthCheck'), promiseAuthCheck: utils_1.getAppFunction('promiseAuthCheck'), render: function () { return react_1.default.createElement(react_router_1.Redirect, { to: shared_ui_1.buildAppRoute(utils_1.getAppRoute(), '/protocols/all/1') }); } }),
                        react_1.default.createElement(shared_ui_1.PrivateRoute, { exact: true, path: shared_ui_1.buildAppRoute(utils_1.getAppRoute(), '/protocols/all'), simpleAuthCheck: utils_1.getAppFunction('simpleAuthCheck'), promiseAuthCheck: utils_1.getAppFunction('promiseAuthCheck'), render: function () { return react_1.default.createElement(react_router_1.Redirect, { to: shared_ui_1.buildAppRoute(utils_1.getAppRoute(), '/protocols/all/1') }); } }),
                        react_1.default.createElement(shared_ui_1.PrivateRoute, { exact: true, path: shared_ui_1.buildAppRoute(utils_1.getAppRoute(), '/protocols/all/:page'), simpleAuthCheck: utils_1.getAppFunction('simpleAuthCheck'), promiseAuthCheck: utils_1.getAppFunction('promiseAuthCheck'), render: function (routeProps) { return react_1.default.createElement(Components.ProtocolsList, { header: 'Протоколы', match: routeProps.match }); } }),
                        react_1.default.createElement(shared_ui_1.PrivateRoute, { exact: true, path: shared_ui_1.buildAppRoute(utils_1.getAppRoute(), '/protocols/:id'), simpleAuthCheck: utils_1.getAppFunction('simpleAuthCheck'), promiseAuthCheck: utils_1.getAppFunction('promiseAuthCheck'), render: function (routeProps) { return react_1.default.createElement(Components.Protocol, { match: routeProps.match }); } }),
                        react_1.default.createElement(shared_ui_1.NoMatchRoute, { handle: utils_1.isTrue(this.props.handleNoMatch) }))),
                react_1.default.createElement(ModalsContainer_1.default, null))));
    };
    return App;
}(react_1.default.Component));
exports.default = App;
//# sourceMappingURL=App.js.map
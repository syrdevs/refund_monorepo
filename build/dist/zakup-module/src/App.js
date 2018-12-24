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
import { APP_ROUTE_KEY, buildAppRoute, NoMatchRoute, PrivateRoute } from '@vitacore/shared-ui';
import React from 'react';
import { Provider } from 'react-redux';
import { Redirect, Switch } from 'react-router';
import './assets/ant-table.css';
import ModalsContainer from './Components/Modals/ModalsContainer';
import * as Components from './ContentComponents';
import { getStore, initStore } from './Redux/store';
import { addToAppData, addToAppFunctions, getAppFunction, getAppRoute, isTrue, setUserLanguage } from './utils';
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        addToAppFunctions('simpleAuthCheck', props.simpleAuthCheck);
        addToAppFunctions('promiseAuthCheck', props.promiseAuthCheck);
        addToAppFunctions('getAuthToken', props.getAuthToken);
        addToAppFunctions('requestStarted', props.requestStarted);
        addToAppFunctions('requestFinished', props.requestFinished);
        addToAppFunctions('getUserLanguage', props.getUserLanguage);
        if (props.subscribeToUserLanguageChange) {
            props.subscribeToUserLanguageChange(setUserLanguage);
        }
        addToAppData(APP_ROUTE_KEY, props.appRoute);
        addToAppData('history', props.history);
        initStore(props.history);
        return _this;
    }
    App.prototype.render = function () {
        return (React.createElement(Provider, { store: getStore() },
            React.createElement(React.Fragment, null,
                React.createElement("div", { style: { display: 'flex', flexDirection: 'column', flexGrow: isTrue(this.props.handleNoMatch) ? 1 : 0 } },
                    React.createElement(Switch, null,
                        React.createElement(PrivateRoute, { exact: true, path: buildAppRoute(getAppRoute(), '/'), simpleAuthCheck: getAppFunction('simpleAuthCheck'), promiseAuthCheck: getAppFunction('promiseAuthCheck'), render: function () { return React.createElement(Redirect, { to: buildAppRoute(getAppRoute(), '/notices/all/1') }); } }),
                        React.createElement(PrivateRoute, { exact: true, path: buildAppRoute(getAppRoute(), '/notices'), simpleAuthCheck: getAppFunction('simpleAuthCheck'), promiseAuthCheck: getAppFunction('promiseAuthCheck'), render: function () { return React.createElement(Redirect, { to: buildAppRoute(getAppRoute(), '/notices/all/1') }); } }),
                        React.createElement(PrivateRoute, { exact: true, path: buildAppRoute(getAppRoute(), '/notices/all'), simpleAuthCheck: getAppFunction('simpleAuthCheck'), promiseAuthCheck: getAppFunction('promiseAuthCheck'), render: function () { return React.createElement(Redirect, { to: buildAppRoute(getAppRoute(), '/notices/all/1') }); } }),
                        React.createElement(PrivateRoute, { exact: true, path: buildAppRoute(getAppRoute(), '/notices/all/:page'), simpleAuthCheck: getAppFunction('simpleAuthCheck'), promiseAuthCheck: getAppFunction('promiseAuthCheck'), render: function () { return React.createElement(Components.NoticesList, { header: 'Объявления' }); } }),
                        React.createElement(PrivateRoute, { exact: true, path: buildAppRoute(getAppRoute(), '/notices/:id'), simpleAuthCheck: getAppFunction('simpleAuthCheck'), promiseAuthCheck: getAppFunction('promiseAuthCheck'), render: function (routeProps) { return React.createElement(Components.NoticeForm, { match: routeProps.match }); } }),
                        React.createElement(PrivateRoute, { exact: true, path: buildAppRoute(getAppRoute(), '/notices/:id([0-9a-zA-Z-]+)/applicants'), simpleAuthCheck: getAppFunction('simpleAuthCheck'), promiseAuthCheck: getAppFunction('promiseAuthCheck'), render: function (routeParams) { return (React.createElement(Redirect, { to: buildAppRoute(getAppRoute(), "/notices/" + routeParams.match.params.id + "/applicants/1") })); } }),
                        React.createElement(PrivateRoute, { exact: true, path: buildAppRoute(getAppRoute(), '/notices/:id([0-9a-zA-Z-]+)/applicants/:page'), simpleAuthCheck: getAppFunction('simpleAuthCheck'), promiseAuthCheck: getAppFunction('promiseAuthCheck'), render: function (routeProps) { return (React.createElement(Components.ProposalsList, { header: 'Заявки на объемы', noticeId: routeProps.match.params.id, page: routeProps.match.params.page })); } }),
                        React.createElement(PrivateRoute, { exact: true, path: buildAppRoute(getAppRoute(), '/commissions'), simpleAuthCheck: getAppFunction('simpleAuthCheck'), promiseAuthCheck: getAppFunction('promiseAuthCheck'), render: function () { return React.createElement(Redirect, { to: buildAppRoute(getAppRoute(), '/commissions/all') }); } }),
                        React.createElement(PrivateRoute, { exact: true, path: buildAppRoute(getAppRoute(), '/commissions/all'), simpleAuthCheck: getAppFunction('simpleAuthCheck'), promiseAuthCheck: getAppFunction('promiseAuthCheck'), render: function () { return React.createElement(Components.CommissionsList, { header: 'Список комиссий' }); } }),
                        React.createElement(PrivateRoute, { exact: true, path: buildAppRoute(getAppRoute(), '/commissions/:id'), simpleAuthCheck: getAppFunction('simpleAuthCheck'), promiseAuthCheck: getAppFunction('promiseAuthCheck'), render: function (routeProps) { return React.createElement(Components.CommissionForm, { match: routeProps.match }); } }),
                        React.createElement(PrivateRoute, { exact: true, path: buildAppRoute(getAppRoute(), '/commissions/:id/members'), simpleAuthCheck: getAppFunction('simpleAuthCheck'), promiseAuthCheck: getAppFunction('promiseAuthCheck'), render: function (routeProps) { return (React.createElement(Components.CommissionMembersList, { match: routeProps.match, header: 'Список членов комиссии' })); } }),
                        React.createElement(PrivateRoute, { exact: true, path: buildAppRoute(getAppRoute(), '/commissions/:commissionId/members/:id'), simpleAuthCheck: getAppFunction('simpleAuthCheck'), promiseAuthCheck: getAppFunction('promiseAuthCheck'), render: function (routeProps) { return React.createElement(Components.CommissionMemberForm, { match: routeProps.match }); } }),
                        React.createElement(PrivateRoute, { exact: true, path: buildAppRoute(getAppRoute(), '/reestr'), simpleAuthCheck: getAppFunction('simpleAuthCheck'), promiseAuthCheck: getAppFunction('promiseAuthCheck'), render: function () { return React.createElement(Redirect, { to: buildAppRoute(getAppRoute(), '/reestr/all') }); } }),
                        React.createElement(PrivateRoute, { exact: true, path: buildAppRoute(getAppRoute(), '/reestr/all'), simpleAuthCheck: getAppFunction('simpleAuthCheck'), promiseAuthCheck: getAppFunction('promiseAuthCheck'), render: function () { return React.createElement(Components.SuppliersReestrAll, { header: 'Регистр участников' }); } }),
                        React.createElement(PrivateRoute, { exact: true, path: buildAppRoute(getAppRoute(), '/reestr/bad'), simpleAuthCheck: getAppFunction('simpleAuthCheck'), promiseAuthCheck: getAppFunction('promiseAuthCheck'), render: function () { return React.createElement(Components.SuppliersReestrBad, { header: 'Регистр недобросовестных участников' }); } }),
                        React.createElement(PrivateRoute, { exact: true, path: buildAppRoute(getAppRoute(), '/requests/applications'), simpleAuthCheck: getAppFunction('simpleAuthCheck'), promiseAuthCheck: getAppFunction('promiseAuthCheck'), render: function () { return React.createElement(Redirect, { to: buildAppRoute(getAppRoute(), '/requests/applications/all/1') }); } }),
                        React.createElement(PrivateRoute, { exact: true, path: buildAppRoute(getAppRoute(), '/requests/applications/all'), simpleAuthCheck: getAppFunction('simpleAuthCheck'), promiseAuthCheck: getAppFunction('promiseAuthCheck'), render: function () { return React.createElement(Redirect, { to: buildAppRoute(getAppRoute(), '/requests/applications/all/1') }); } }),
                        React.createElement(PrivateRoute, { exact: true, path: buildAppRoute(getAppRoute(), '/requests/applications/all/:page'), simpleAuthCheck: getAppFunction('simpleAuthCheck'), promiseAuthCheck: getAppFunction('promiseAuthCheck'), render: function (routeProps) { return (React.createElement(Components.ApplicationsList, { header: 'Заявки на включение в базу данных субъектов здравоохранения', match: routeProps.match })); } }),
                        React.createElement(PrivateRoute, { exact: true, path: buildAppRoute(getAppRoute(), '/requests/applications/:id'), simpleAuthCheck: getAppFunction('simpleAuthCheck'), promiseAuthCheck: getAppFunction('promiseAuthCheck'), render: function (routeProps) { return React.createElement(Components.ApplicationRequest, { match: routeProps.match }); } }),
                        React.createElement(PrivateRoute, { exact: true, path: buildAppRoute(getAppRoute(), '/requests/proposals'), simpleAuthCheck: getAppFunction('simpleAuthCheck'), promiseAuthCheck: getAppFunction('promiseAuthCheck'), render: function () { return React.createElement(Redirect, { to: buildAppRoute(getAppRoute(), '/requests/proposals/all/1') }); } }),
                        React.createElement(PrivateRoute, { exact: true, path: buildAppRoute(getAppRoute(), '/requests/proposals/all'), simpleAuthCheck: getAppFunction('simpleAuthCheck'), promiseAuthCheck: getAppFunction('promiseAuthCheck'), render: function () { return React.createElement(Redirect, { to: buildAppRoute(getAppRoute(), '/requests/proposals/all/1') }); } }),
                        React.createElement(PrivateRoute, { exact: true, path: buildAppRoute(getAppRoute(), '/requests/proposals/all/:page'), simpleAuthCheck: getAppFunction('simpleAuthCheck'), promiseAuthCheck: getAppFunction('promiseAuthCheck'), render: function (routeProps) { return (React.createElement(Components.ProposalsList, { header: 'Заявки на объемы', page: routeProps.match.params.page })); } }),
                        React.createElement(PrivateRoute, { exact: true, path: buildAppRoute(getAppRoute(), '/requests/proposals/:id'), simpleAuthCheck: getAppFunction('simpleAuthCheck'), promiseAuthCheck: getAppFunction('promiseAuthCheck'), render: function (routeProps) { return React.createElement(Components.ProposalRequest, { id: routeProps.match.params.id }); } }),
                        React.createElement(PrivateRoute, { exact: true, path: buildAppRoute(getAppRoute(), '/protocols'), simpleAuthCheck: getAppFunction('simpleAuthCheck'), promiseAuthCheck: getAppFunction('promiseAuthCheck'), render: function () { return React.createElement(Redirect, { to: buildAppRoute(getAppRoute(), '/protocols/all/1') }); } }),
                        React.createElement(PrivateRoute, { exact: true, path: buildAppRoute(getAppRoute(), '/protocols/all'), simpleAuthCheck: getAppFunction('simpleAuthCheck'), promiseAuthCheck: getAppFunction('promiseAuthCheck'), render: function () { return React.createElement(Redirect, { to: buildAppRoute(getAppRoute(), '/protocols/all/1') }); } }),
                        React.createElement(PrivateRoute, { exact: true, path: buildAppRoute(getAppRoute(), '/protocols/all/:page'), simpleAuthCheck: getAppFunction('simpleAuthCheck'), promiseAuthCheck: getAppFunction('promiseAuthCheck'), render: function (routeProps) { return React.createElement(Components.ProtocolsList, { header: 'Протоколы', match: routeProps.match }); } }),
                        React.createElement(PrivateRoute, { exact: true, path: buildAppRoute(getAppRoute(), '/protocols/:id'), simpleAuthCheck: getAppFunction('simpleAuthCheck'), promiseAuthCheck: getAppFunction('promiseAuthCheck'), render: function (routeProps) { return React.createElement(Components.Protocol, { match: routeProps.match }); } }),
                        React.createElement(NoMatchRoute, { handle: isTrue(this.props.handleNoMatch) }))),
                React.createElement(ModalsContainer, null))));
    };
    return App;
}(React.Component));
export default App;
//# sourceMappingURL=App.js.map
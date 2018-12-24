var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
import { NoMatchRoute, PrivateRoute } from '@vitacore/shared-ui';
import React, { lazy, Suspense } from 'react';
import { Switch, withRouter } from 'react-router';
import styled from 'styled-components';
import MainContainer from './Containers/MainContainer/MainContainer';
import { Header } from './Layout';
import { Loader } from './Layout/Loader';
import LoginRoute from './Routing/LoginRoute';
import LogoutRoute from './Routing/LogoutRoute';
import { getAuthToken, isUserAuthenticated, isUserAuthenticatedSimple } from './Services/AuthenticationService';
import { addUserLanguageChangeCb, getUserLanguage, requestFinished, requestStarted } from './utils';
var ContractsModule = lazy(function () { return import('@vitacore/contracts-module'); });
var RefundsModule = lazy(function () { return import('@vitacore/refunds-module'); });
var RouteContentContainer = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-grow: 1;\n  flex-direction: column;\n  min-width: 0;\n"], ["\n  display: flex;\n  flex-grow: 1;\n  flex-direction: column;\n  min-width: 0;\n"])));
var MainContentContainer = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  flex-grow: 1;\n  min-height: 0;\n  min-width: 0;\n"], ["\n  display: flex;\n  flex-grow: 1;\n  min-height: 0;\n  min-width: 0;\n"])));
var Content = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: flex;\n  flex-grow: 1;\n  background-color: white;\n  min-height: 0;\n"], ["\n  display: flex;\n  flex-grow: 1;\n  background-color: white;\n  min-height: 0;\n"])));
var MainApp = /** @class */ (function (_super) {
    __extends(MainApp, _super);
    function MainApp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MainApp.prototype.render = function () {
        return (React.createElement(RouteContentContainer, null,
            React.createElement(Header, null),
            React.createElement(MainContentContainer, null,
                React.createElement("div", { style: { display: 'flex', flexDirection: 'column', flexGrow: 1, minWidth: 0 } },
                    React.createElement(Content, null,
                        React.createElement(Suspense, { fallback: React.createElement(Loader, { forceDisplaying: true }) },
                            React.createElement(Switch, null,
                                React.createElement(LoginRoute, { path: "/login" }),
                                React.createElement(LogoutRoute, { path: "/logout" }),
                                React.createElement(PrivateRoute, { exact: true, path: "/", simpleAuthCheck: isUserAuthenticatedSimple, promiseAuthCheck: isUserAuthenticated, component: MainContainer }),
                                React.createElement(PrivateRoute, { simpleAuthCheck: isUserAuthenticatedSimple, promiseAuthCheck: isUserAuthenticated, path: "/refunds", render: function (props) { return (React.createElement(RefundsModule, __assign({ moduleName: "/refunds", defaultRoute: "/refunds/main", simpleAuthCheck: isUserAuthenticatedSimple, promiseAuthCheck: isUserAuthenticated, getAuthToken: getAuthToken, requestStarted: requestStarted, requestFinished: requestFinished, getUserLanguage: getUserLanguage, subscribeToUserLanguageChange: addUserLanguageChangeCb }, props))); } }),
                                React.createElement(PrivateRoute, { simpleAuthCheck: isUserAuthenticatedSimple, promiseAuthCheck: isUserAuthenticated, path: "/contracts", render: function (props) { return (React.createElement(ContractsModule, __assign({ moduleName: "/contracts", defaultRoute: "/contracts/zakup/notices/all/1", simpleAuthCheck: isUserAuthenticatedSimple, promiseAuthCheck: isUserAuthenticated, getAuthToken: getAuthToken, requestStarted: requestStarted, requestFinished: requestFinished, getUserLanguage: getUserLanguage, subscribeToUserLanguageChange: addUserLanguageChangeCb }, props))); } }),
                                React.createElement(NoMatchRoute, { handle: true }))))),
                React.createElement(Loader, null))));
    };
    return MainApp;
}(React.Component));
export default withRouter(MainApp);
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=App.js.map
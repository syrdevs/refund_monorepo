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
import * as React from 'react';
import Async from 'react-promise';
import { Redirect, Route } from 'react-router-dom';
import Login from '../Containers/Login/Login';
import store from '../Redux/store';
import { isUserAuthenticated } from '../Services/AuthenticationService';
var LoginRoute = function (routeProps) {
    return (React.createElement(Route, __assign({}, routeProps, { render: function (props) {
            var redirectToPathname = routeProps &&
                routeProps.location &&
                routeProps.location.state &&
                routeProps.location.state.from &&
                routeProps.location.state.from.pathname;
            return (React.createElement(Async, { promise: isUserAuthenticated(!store.getState().userState.tokenCheckFailed), then: function (isAuthenticated) {
                    return true || !isAuthenticated ? (React.createElement(Login, __assign({}, props, { redirectTo: redirectToPathname }))) : (React.createElement(Redirect, { to: {
                            pathname: '/',
                        } }));
                } }));
        } })));
};
export default LoginRoute;
//# sourceMappingURL=LoginRoute.js.map
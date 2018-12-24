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
import { Redirect, Route } from 'react-router-dom';
import { isUserAuthenticatedSimple, logout } from '../Services/AuthenticationService';
var LogoutRoute = function (routeProps) { return (React.createElement(Route, __assign({}, routeProps, { render: function (props) {
        if (isUserAuthenticatedSimple()) {
            logout();
            return null;
        }
        return (React.createElement(Redirect, { to: {
                pathname: '/login',
            } }));
    } }))); };
export default LogoutRoute;
//# sourceMappingURL=LogoutRoute.js.map
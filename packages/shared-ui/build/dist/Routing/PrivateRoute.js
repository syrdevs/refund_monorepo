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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import * as React from 'react';
import Async from 'react-promise';
import { Redirect, Route } from 'react-router-dom';
export var PrivateRoute = function (_a) {
    var Component = _a.component, render = _a.render, simpleAuthCheck = _a.simpleAuthCheck, promiseAuthCheck = _a.promiseAuthCheck, getAuthToken = _a.getAuthToken, loginPath = _a.loginPath, rest = __rest(_a, ["component", "render", "simpleAuthCheck", "promiseAuthCheck", "getAuthToken", "loginPath"]);
    var getRenderer = function (isAuthenticated, props) {
        if (!isAuthenticated) {
            return (React.createElement(Redirect, { to: {
                    pathname: loginPath || '/login',
                    state: { from: props.location },
                } }));
        }
        if (Component) {
            return React.createElement(Component, __assign({}, props));
        }
        return render(props);
    };
    return (React.createElement(Route, __assign({}, rest, { render: function (props) {
            var isAuthed = simpleAuthCheck && simpleAuthCheck();
            if (isAuthed) {
                return getRenderer(true, props);
            }
            if (!promiseAuthCheck) {
                getRenderer(false, props);
            }
            return React.createElement(Async, { promise: promiseAuthCheck(), then: function (isAuthenticated) { return getRenderer(isAuthenticated, props); } });
        } })));
};
//# sourceMappingURL=PrivateRoute.js.map
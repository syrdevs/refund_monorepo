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
import { Switch } from 'react-router';
import { addToAppData, addToAppFunctions, getAppFunction, getAppRoute, setUserLanguage } from './utils';
import { isTrue } from './utils';
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
        return _this;
    }
    App.prototype.render = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { style: { display: 'flex', flexDirection: 'column', flexGrow: isTrue(this.props.handleNoMatch) ? 1 : 0 } },
                React.createElement(Switch, null,
                    React.createElement(PrivateRoute, { exact: true, path: buildAppRoute(getAppRoute(), '/cabinet/profile'), simpleAuthCheck: getAppFunction('simpleAuthCheck'), promiseAuthCheck: getAppFunction('promiseAuthCheck'), render: function () { return React.createElement("div", null, "WELL DONE!!!"); } }),
                    React.createElement(NoMatchRoute, { handle: isTrue(this.props.handleNoMatch) })))));
    };
    return App;
}(React.Component));
export default App;
//# sourceMappingURL=App.js.map
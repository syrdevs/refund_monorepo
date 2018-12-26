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
import React from "react";
import styled from "styled-components";
import { COLORS, LeftMenu } from "@vitacore/shared-ui";
import ContentLayout from "./layouts/ContentLayout";
import { Provider } from "react-redux";
import store from "./Redux/store";
import Page from "./pages/OptionPage/Page";
var RootContainer = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-grow: 1;\n  background-color: #edf1f5;\n  min-width: 0;\n"], ["\n  display: flex;\n  flex-grow: 1;\n  background-color: #edf1f5;\n  min-width: 0;\n"])));
var Content = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  flex-grow: 1;\n  border-left: 1px solid #d6d6d6;\n  padding: 0 15px;\n  background-color: white;\n  border-top: 4px solid ", ";\n  min-width: 0;\n  overflow: auto;\n"], ["\n  display: flex;\n  flex-grow: 1;\n  border-left: 1px solid #d6d6d6;\n  padding: 0 15px;\n  background-color: white;\n  border-top: 4px solid ", ";\n  min-width: 0;\n  overflow: auto;\n"])), COLORS.MAIN_GREEN);
var refundMenuItems = [{
        name: "Возвраты",
        hrefPrefix: "/refunds",
        iconName: "database",
        translationKey: "leftMenu.refunds._",
        subItems: []
    }, {
        name: "Платежи",
        hrefPrefix: "/payments",
        iconName: "database",
        translationKey: "leftMenu.refunds.payments",
        subItems: []
    }];
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        return _super.call(this, props) || this;
    }
    App.prototype.render = function () {
        var location = this.props.location.pathname;
        var bcRoutes = [
            {
                path: "/",
                breadcrumbName: "Главная"
            },
            {
                path: "/refunds",
                breadcrumbName: "Возвраты"
            }
        ];
        return (React.createElement(Provider, { store: store },
            React.createElement(RootContainer, null,
                React.createElement(LeftMenu, { leftMenuItems: __spread(refundMenuItems), location: location, goToLink: this.props.history.push }),
                React.createElement(Content, null,
                    React.createElement(ContentLayout, { contentName: "Возвраты", breadcrumbRoutes: bcRoutes },
                        React.createElement(Page, null))))));
    };
    return App;
}(React.Component));
export default App;
var templateObject_1, templateObject_2;
//# sourceMappingURL=App.js.map
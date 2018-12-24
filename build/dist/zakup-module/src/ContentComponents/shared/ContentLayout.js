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
import { COLORS, SIZES, WEIGHTS } from '@vitacore/shared-ui';
import { Button } from 'antd';
import * as React from 'react';
import styled from 'styled-components';
import { isTrue } from '../../utils';
import Breadcrumbs from './Breadcrumbs';
import ButtonsContainer from './ButtonsContainer';
import CommandsBar from './Commands/CommandsBar';
var Container = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n  background-color: white;\n"], ["\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n  background-color: white;\n"])));
var ContentHeader = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  flex-shrink: 0;\n  padding: 12px 15px;\n  border-bottom: 1px solid #ddd;\n  font-size: ", "px;\n  color: ", ";\n  font-weight: ", ";\n  text-transform: uppercase;\n"], ["\n  display: flex;\n  align-items: center;\n  flex-shrink: 0;\n  padding: 12px 15px;\n  border-bottom: 1px solid #ddd;\n  font-size: ", "px;\n  color: ", ";\n  font-weight: ", ";\n  text-transform: uppercase;\n"])), SIZES.s18, COLORS.MAIN_BLUE, WEIGHTS.MEDIUM);
var BreadcrumbsContainer = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  padding: 4px 15px;\n  border-bottom: 1px solid #ddd;\n  flex-shrink: 0;\n"], ["\n  padding: 4px 15px;\n  border-bottom: 1px solid #ddd;\n  flex-shrink: 0;\n"])));
var MainContent = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  display: flex;\n  flex-grow: 1;\n  min-height: 0;\n  padding: 10px;\n\n  & > * {\n    flex-grow: 1;\n  }\n"], ["\n  display: flex;\n  flex-grow: 1;\n  min-height: 0;\n  padding: 10px;\n\n  & > * {\n    flex-grow: 1;\n  }\n"])));
var ContentLayout = /** @class */ (function (_super) {
    __extends(ContentLayout, _super);
    function ContentLayout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContentLayout.prototype.render = function () {
        var _a = this.props, contentName = _a.contentName, buttons = _a.buttons, breadcrumbRoutes = _a.breadcrumbRoutes, showCommands = _a.showCommands, disableCommands = _a.disableCommands;
        return (React.createElement(Container, null,
            React.createElement(ContentHeader, null, contentName),
            breadcrumbRoutes && (React.createElement(BreadcrumbsContainer, null,
                React.createElement(Breadcrumbs, { routes: breadcrumbRoutes }))),
            React.createElement(ButtonsContainer, null,
                buttons &&
                    buttons.map(function (btn) {
                        var props = { onClick: btn.onClick };
                        return (React.createElement(Button, __assign({ key: btn.text, type: "primary" }, props), btn.text));
                    }),
                showCommands && this.props.entity && this.props.onCommandClick && (React.createElement(CommandsBar, { disabledActions: isTrue(disableCommands), disabledReports: isTrue(disableCommands), onCommandClick: this.props.onCommandClick, entity: this.props.entity }))),
            React.createElement(MainContent, null, this.props.children)));
    };
    return ContentLayout;
}(React.Component));
export default ContentLayout;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=ContentLayout.js.map
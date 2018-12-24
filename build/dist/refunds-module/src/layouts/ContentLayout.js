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
import * as React from "react";
import styled from "styled-components";
import { COLORS, SIZES, WEIGHTS } from "@vitacore/shared-ui";
import Breadcrumbs from '../components/BreadCumber';
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
        var _a = this.props, breadcrumbRoutes = _a.breadcrumbRoutes, contentName = _a.contentName;
        return (React.createElement(Container, null,
            React.createElement(ContentHeader, null, contentName),
            breadcrumbRoutes && (React.createElement(BreadcrumbsContainer, null,
                React.createElement(Breadcrumbs, { routes: breadcrumbRoutes }))),
            React.createElement(MainContent, null, this.props.children)));
    };
    return ContentLayout;
}(React.Component));
export default ContentLayout;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=ContentLayout.js.map
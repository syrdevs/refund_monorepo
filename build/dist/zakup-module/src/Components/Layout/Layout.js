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
import * as React from 'react';
import styled from 'styled-components';
var RootContainer = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-grow: 1;\n  background-color: #edf1f5;\n"], ["\n  display: flex;\n  flex-grow: 1;\n  background-color: #edf1f5;\n"])));
var Layout = /** @class */ (function (_super) {
    __extends(Layout, _super);
    function Layout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Layout.prototype.render = function () {
        return React.createElement(RootContainer, null, this.props.children);
    };
    return Layout;
}(React.Component));
export default Layout;
var templateObject_1;
//# sourceMappingURL=Layout.js.map
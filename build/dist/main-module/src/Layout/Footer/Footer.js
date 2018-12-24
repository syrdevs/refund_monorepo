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
import { SIZES, WEIGHTS } from '@vitacore/shared-ui';
import * as React from 'react';
import styled from 'styled-components';
var FooterContainer = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-shrink: 0;\n  background-color: #1aa4da;\n  justify-content: space-between;\n  padding: 5px 20px;\n"], ["\n  display: flex;\n  flex-shrink: 0;\n  background-color: #1aa4da;\n  justify-content: space-between;\n  padding: 5px 20px;\n"])));
var FooterInnerPart = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n\n  p > a,\n  p {\n    font-size: ", "px;\n    font-weight: ", ";\n    color: white;\n    margin: 0;\n  }\n"], ["\n  display: flex;\n  flex-direction: column;\n\n  p > a,\n  p {\n    font-size: ", "px;\n    font-weight: ", ";\n    color: white;\n    margin: 0;\n  }\n"])), SIZES.s12, WEIGHTS.LIGHT);
var Footer = /** @class */ (function (_super) {
    __extends(Footer, _super);
    function Footer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Footer.prototype.render = function () {
        return (React.createElement(FooterContainer, null,
            React.createElement(FooterInnerPart, null,
                React.createElement("p", null,
                    "2017 - ",
                    new Date().getFullYear(),
                    " \u00A9 \u041D\u0435\u043A\u043E\u043C\u043C\u0435\u0440\u0447\u0435\u0441\u043A\u043E\u0435 \u0430\u043A\u0446\u0438\u043E\u043D\u0435\u0440\u043D\u043E\u0435 \u043E\u0431\u0449\u0435\u0441\u0442\u0432\u043E"),
                React.createElement("p", null, "\u00AB\u0424\u043E\u043D\u0434 \u0441\u043E\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u043C\u0435\u0434\u0438\u0446\u0438\u043D\u0441\u043A\u043E\u0433\u043E \u0441\u0442\u0440\u0430\u0445\u043E\u0432\u0430\u043D\u0438\u044F\u00BB")),
            React.createElement(FooterInnerPart, null,
                React.createElement("p", null, "\u0421\u043B\u0443\u0436\u0431\u0430 \u0442\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u043E\u0439 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0438"),
                React.createElement("p", null, "8 (7172) 123-456"),
                React.createElement("p", null,
                    React.createElement("a", { href: "mailto:support@med.kz" }, "support@med.kz")))));
    };
    return Footer;
}(React.Component));
export default Footer;
var templateObject_1, templateObject_2;
//# sourceMappingURL=Footer.js.map
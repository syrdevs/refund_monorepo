"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var styled_components_1 = __importDefault(require("styled-components"));
var utils_1 = require("../../utils");
var FormFooterButtons = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  padding: ", ";\n  justify-content: ", ";\n  flex-shrink: 0;\n"], ["\n  display: flex;\n  padding: ", ";\n  justify-content: ", ";\n  flex-shrink: 0;\n"])), function (props) { return (utils_1.isTrue(props.inner) ? '0' : '15px 25px'); }, function (props) { return props.position || 'flex-end'; });
exports.default = FormFooterButtons;
var templateObject_1;
//# sourceMappingURL=FormFooterButtons.js.map
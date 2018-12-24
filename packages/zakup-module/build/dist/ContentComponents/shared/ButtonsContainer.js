"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
var utils_1 = require("../../utils");
var Container = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  padding: 10px;\n  border-bottom: 1px solid #ddd;\n  flex-shrink: 0;\n"], ["\n  display: flex;\n  padding: 10px;\n  border-bottom: 1px solid #ddd;\n  flex-shrink: 0;\n"])));
var ButtonsContainer = function (props) { return (react_1.default.createElement(Container, { style: utils_1.isTrue(props.toRight) ? { justifyContent: 'flex-end' } : undefined }, props.children)); };
exports.default = ButtonsContainer;
var templateObject_1;
//# sourceMappingURL=ButtonsContainer.js.map
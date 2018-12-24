"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var shared_ui_1 = require("@vitacore/shared-ui");
var styled_components_1 = __importDefault(require("styled-components"));
var FormActionButton = styled_components_1.default.button(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding: 4px 10px;\n  background-color: ", ";\n  color: white;\n  cursor: pointer;\n  margin: ", ";\n\n  &:not(:disabled) {\n    cursor: pointer;\n  }\n\n  &:active,\n  &:focus {\n    outline: none;\n  }\n\n  &:disabled {\n    background-color: ", ";\n  }\n"], ["\n  padding: 4px 10px;\n  background-color: ", ";\n  color: white;\n  cursor: pointer;\n  margin: ", ";\n\n  &:not(:disabled) {\n    cursor: pointer;\n  }\n\n  &:active,\n  &:focus {\n    outline: none;\n  }\n\n  &:disabled {\n    background-color: ", ";\n  }\n"])), shared_ui_1.COLORS.MAIN_GREEN, function (props) { return props.margin || '0'; }, shared_ui_1.COLORS.LIGHT_GRAY);
exports.default = FormActionButton;
var templateObject_1;
//# sourceMappingURL=FormActionButton.js.map
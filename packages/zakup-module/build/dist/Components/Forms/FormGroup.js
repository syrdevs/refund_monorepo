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
var FormGroup = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  width: 100%;\n  align-items: center;\n  margin: 2px 0;\n\n  & > label {\n    display: block;\n    width: 25%;\n    min-width: 100px;\n    flex-shrink: 0;\n    text-align: right;\n    margin-right: 10px;\n    color: ", ";\n    font-weight: ", ";\n  }\n"], ["\n  display: flex;\n  width: 100%;\n  align-items: center;\n  margin: 2px 0;\n\n  & > label {\n    display: block;\n    width: 25%;\n    min-width: 100px;\n    flex-shrink: 0;\n    text-align: right;\n    margin-right: 10px;\n    color: ", ";\n    font-weight: ", ";\n  }\n"])), shared_ui_1.COLORS.GRAY, shared_ui_1.WEIGHTS.LIGHT);
exports.default = FormGroup;
var templateObject_1;
//# sourceMappingURL=FormGroup.js.map
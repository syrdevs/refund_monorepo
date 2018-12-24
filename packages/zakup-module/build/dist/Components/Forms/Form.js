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
var Form = styled_components_1.default.form(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  font-size: ", "px;\n  flex-grow: 1;\n"], ["\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  font-size: ", "px;\n  flex-grow: 1;\n"])), shared_ui_1.SIZES.s14);
exports.default = Form;
var templateObject_1;
//# sourceMappingURL=Form.js.map
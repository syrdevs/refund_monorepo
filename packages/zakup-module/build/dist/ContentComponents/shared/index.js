"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var antd_1 = require("antd");
var styled_components_1 = __importDefault(require("styled-components"));
var ContentLayout_1 = require("./ContentLayout");
exports.ContentLayout = ContentLayout_1.default;
var CommonFormItemLayout_1 = require("./CommonFormItemLayout");
exports.CommonFormItemLayout = CommonFormItemLayout_1.CommonFormItemLayout;
exports.RowStyled = styled_components_1.default(antd_1.Row)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding: 4px 0;\n"], ["\n  padding: 4px 0;\n"])));
exports.LabelColStyled = styled_components_1.default(antd_1.Col)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  text-align: right;\n  line-height: 32px;\n  color: #000000d9;\n\n  &::after {\n    content: ':';\n    margin: 0 8px 0 2px;\n    position: relative;\n    top: -0.5px;\n  }\n"], ["\n  text-align: right;\n  line-height: 32px;\n  color: #000000d9;\n\n  &::after {\n    content: ':';\n    margin: 0 8px 0 2px;\n    position: relative;\n    top: -0.5px;\n  }\n"])));
var templateObject_1, templateObject_2;
//# sourceMappingURL=index.js.map
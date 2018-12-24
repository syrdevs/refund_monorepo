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
var FormControlsContainer = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n  overflow-y: auto;\n  padding: 25px;\n\n  & > * {\n    flex-shrink: 0;\n  }\n"], ["\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n  overflow-y: auto;\n  padding: 25px;\n\n  & > * {\n    flex-shrink: 0;\n  }\n"])));
exports.default = FormControlsContainer;
var templateObject_1;
//# sourceMappingURL=FormControlsContainer.js.map
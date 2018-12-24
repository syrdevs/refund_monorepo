"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var shared_ui_1 = require("@vitacore/shared-ui");
var React = __importStar(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
require("../../assets/simple-spinner-keyframes.css");
var Spinner = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  border-radius: 50%;\n  width: ", ";\n  height: ", ";\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate3d(-50%, -50%, 0);\n  text-indent: -9999em;\n  border: 2px solid white;\n  border-left-color: ", ";\n  animation: load 1s infinite linear;\n  z-index: 1001;\n"], ["\n  border-radius: 50%;\n  width: ", ";\n  height: ", ";\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate3d(-50%, -50%, 0);\n  text-indent: -9999em;\n  border: 2px solid white;\n  border-left-color: ", ";\n  animation: load 1s infinite linear;\n  z-index: 1001;\n"])), function (props) { return (props.width ? props.width + "px" : 'auto'); }, function (props) { return (props.height ? props.height + "px" : 'auto'); }, shared_ui_1.COLORS.MAIN_BLUE);
var SimpleSpinner = function (props) { return React.createElement(Spinner, { width: props.width, height: props.height }); };
exports.default = SimpleSpinner;
var templateObject_1;
//# sourceMappingURL=SimpleSpinner.js.map
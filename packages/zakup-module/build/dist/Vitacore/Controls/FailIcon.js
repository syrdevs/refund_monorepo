"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var React = __importStar(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
var fail_icon_svg_1 = __importDefault(require("../../assets/fail-icon.svg"));
var ButtonFailStyled = styled_components_1.default.img(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 14px;\n  height: 14px;\n  ", ";\n"], ["\n  width: 14px;\n  height: 14px;\n  ",
    ";\n"])), function (props) { return (props.alongWithText
    ? 'margin-right: 5px;'
    : "position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate3d(-50%, -50%, 0);") + "\n  "; });
var FailIconComp = function (props) {
    return React.createElement(ButtonFailStyled, __assign({ src: fail_icon_svg_1.default }, props));
};
exports.default = FailIconComp;
var templateObject_1;
//# sourceMappingURL=FailIcon.js.map
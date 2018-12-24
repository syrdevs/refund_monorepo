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
import * as React from 'react';
import styled from 'styled-components';
import FailIcon from '../../assets/fail-icon.svg';
var ButtonFailStyled = styled.img(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 14px;\n  height: 14px;\n  ", ";\n"], ["\n  width: 14px;\n  height: 14px;\n  ",
    ";\n"])), function (props) { return (props.alongWithText
    ? 'margin-right: 5px;'
    : "position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate3d(-50%, -50%, 0);") + "\n  "; });
var FailIconComp = function (props) {
    return React.createElement(ButtonFailStyled, __assign({ src: FailIcon }, props));
};
export default FailIconComp;
var templateObject_1;
//# sourceMappingURL=FailIcon.js.map
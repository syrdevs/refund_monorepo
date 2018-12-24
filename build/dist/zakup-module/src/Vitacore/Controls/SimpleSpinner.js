var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { COLORS } from '@vitacore/shared-ui';
import * as React from 'react';
import styled from 'styled-components';
import '../../assets/simple-spinner-keyframes.css';
var Spinner = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  border-radius: 50%;\n  width: ", ";\n  height: ", ";\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate3d(-50%, -50%, 0);\n  text-indent: -9999em;\n  border: 2px solid white;\n  border-left-color: ", ";\n  animation: load 1s infinite linear;\n  z-index: 1001;\n"], ["\n  border-radius: 50%;\n  width: ", ";\n  height: ", ";\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate3d(-50%, -50%, 0);\n  text-indent: -9999em;\n  border: 2px solid white;\n  border-left-color: ", ";\n  animation: load 1s infinite linear;\n  z-index: 1001;\n"])), function (props) { return (props.width ? props.width + "px" : 'auto'); }, function (props) { return (props.height ? props.height + "px" : 'auto'); }, COLORS.MAIN_BLUE);
var SimpleSpinner = function (props) { return React.createElement(Spinner, { width: props.width, height: props.height }); };
export default SimpleSpinner;
var templateObject_1;
//# sourceMappingURL=SimpleSpinner.js.map
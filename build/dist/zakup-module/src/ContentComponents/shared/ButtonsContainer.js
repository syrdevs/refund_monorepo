var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React from 'react';
import styled from 'styled-components';
import { isTrue } from '../../utils';
var Container = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  padding: 10px;\n  border-bottom: 1px solid #ddd;\n  flex-shrink: 0;\n"], ["\n  display: flex;\n  padding: 10px;\n  border-bottom: 1px solid #ddd;\n  flex-shrink: 0;\n"])));
var ButtonsContainer = function (props) { return (React.createElement(Container, { style: isTrue(props.toRight) ? { justifyContent: 'flex-end' } : undefined }, props.children)); };
export default ButtonsContainer;
var templateObject_1;
//# sourceMappingURL=ButtonsContainer.js.map
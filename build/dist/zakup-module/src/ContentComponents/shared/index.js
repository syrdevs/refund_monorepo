var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { Col, Row } from 'antd';
import styled from 'styled-components';
export { default as ContentLayout } from './ContentLayout';
export { CommonFormItemLayout } from './CommonFormItemLayout';
export var RowStyled = styled(Row)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding: 4px 0;\n"], ["\n  padding: 4px 0;\n"])));
export var LabelColStyled = styled(Col)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  text-align: right;\n  line-height: 32px;\n  color: #000000d9;\n\n  &::after {\n    content: ':';\n    margin: 0 8px 0 2px;\n    position: relative;\n    top: -0.5px;\n  }\n"], ["\n  text-align: right;\n  line-height: 32px;\n  color: #000000d9;\n\n  &::after {\n    content: ':';\n    margin: 0 8px 0 2px;\n    position: relative;\n    top: -0.5px;\n  }\n"])));
var templateObject_1, templateObject_2;
//# sourceMappingURL=index.js.map
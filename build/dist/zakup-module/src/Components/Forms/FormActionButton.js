var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { COLORS } from '@vitacore/shared-ui';
import styled from 'styled-components';
var FormActionButton = styled.button(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding: 4px 10px;\n  background-color: ", ";\n  color: white;\n  cursor: pointer;\n  margin: ", ";\n\n  &:not(:disabled) {\n    cursor: pointer;\n  }\n\n  &:active,\n  &:focus {\n    outline: none;\n  }\n\n  &:disabled {\n    background-color: ", ";\n  }\n"], ["\n  padding: 4px 10px;\n  background-color: ", ";\n  color: white;\n  cursor: pointer;\n  margin: ", ";\n\n  &:not(:disabled) {\n    cursor: pointer;\n  }\n\n  &:active,\n  &:focus {\n    outline: none;\n  }\n\n  &:disabled {\n    background-color: ", ";\n  }\n"])), COLORS.MAIN_GREEN, function (props) { return props.margin || '0'; }, COLORS.LIGHT_GRAY);
export default FormActionButton;
var templateObject_1;
//# sourceMappingURL=FormActionButton.js.map
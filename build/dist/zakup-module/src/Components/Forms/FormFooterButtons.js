var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import styled from 'styled-components';
import { isTrue } from '../../utils';
var FormFooterButtons = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  padding: ", ";\n  justify-content: ", ";\n  flex-shrink: 0;\n"], ["\n  display: flex;\n  padding: ", ";\n  justify-content: ", ";\n  flex-shrink: 0;\n"])), function (props) { return (isTrue(props.inner) ? '0' : '15px 25px'); }, function (props) { return props.position || 'flex-end'; });
export default FormFooterButtons;
var templateObject_1;
//# sourceMappingURL=FormFooterButtons.js.map
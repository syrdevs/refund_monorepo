var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { WEIGHTS } from '@vitacore/shared-ui';
import styled from 'styled-components';
var Container = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n  font-weight: ", ";\n"], ["\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n  font-weight: ", ";\n"])), WEIGHTS.LIGHT);
var ErrorLine = styled.p(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  color: #721c24;\n  background-color: #f8d7da;\n  border: 1px solid #f5c6cb;\n  border-radius: 2px;\n  padding: 2px 5px;\n  margin: 3px 0;\n"], ["\n  color: #721c24;\n  background-color: #f8d7da;\n  border: 1px solid #f5c6cb;\n  border-radius: 2px;\n  padding: 2px 5px;\n  margin: 3px 0;\n"])));
var WarningLine = styled.p(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  color: #856404;\n  background-color: #fff3cd;\n  border: 1px solid #ffeeba;\n  border-radius: 2px;\n  padding: 2px 5px;\n  margin: 3px 0;\n"], ["\n  color: #856404;\n  background-color: #fff3cd;\n  border: 1px solid #ffeeba;\n  border-radius: 2px;\n  padding: 2px 5px;\n  margin: 3px 0;\n"])));
export default { Container: Container, ErrorLine: ErrorLine, WarningLine: WarningLine };
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=Shared.js.map
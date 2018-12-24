var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import * as React from 'react';
import styled from 'styled-components';
import Button from '../../Vitacore/Controls/Button';
var ButtonsContainer = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  padding-top: 12px;\n\n  & > button:not(:last-child) {\n    margin-right: 4px;\n  }\n"], ["\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  padding-top: 12px;\n\n  & > button:not(:last-child) {\n    margin-right: 4px;\n  }\n"])));
var CreateYesNoModalInfo = function (header, body, yesOnClick, yesBtnText, noOnClick, noBtnText, closable, onClose) {
    return ({
        header: header,
        content: (React.createElement(React.Fragment, null,
            React.createElement("div", null, body),
            React.createElement(ButtonsContainer, null,
                React.createElement(Button, { text: yesBtnText || 'Да', onClick: yesOnClick, colorSchema: "blue" }),
                noOnClick && React.createElement(Button, { onClick: noOnClick, text: noBtnText || 'Нет', colorSchema: "blue" })))),
        onClose: onClose,
        closable: closable,
    });
};
export default CreateYesNoModalInfo;
var templateObject_1;
//# sourceMappingURL=YesNoModalInfo.js.map
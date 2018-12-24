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
var React = __importStar(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
var Button_1 = __importDefault(require("../../Vitacore/Controls/Button"));
var ButtonsContainer = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  padding-top: 12px;\n\n  & > button:not(:last-child) {\n    margin-right: 4px;\n  }\n"], ["\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  padding-top: 12px;\n\n  & > button:not(:last-child) {\n    margin-right: 4px;\n  }\n"])));
var CreateYesNoModalInfo = function (header, body, yesOnClick, yesBtnText, noOnClick, noBtnText, closable, onClose) {
    return ({
        header: header,
        content: (React.createElement(React.Fragment, null,
            React.createElement("div", null, body),
            React.createElement(ButtonsContainer, null,
                React.createElement(Button_1.default, { text: yesBtnText || 'Да', onClick: yesOnClick, colorSchema: "blue" }),
                noOnClick && React.createElement(Button_1.default, { onClick: noOnClick, text: noBtnText || 'Нет', colorSchema: "blue" })))),
        onClose: onClose,
        closable: closable,
    });
};
exports.default = CreateYesNoModalInfo;
var templateObject_1;
//# sourceMappingURL=YesNoModalInfo.js.map
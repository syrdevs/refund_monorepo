"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var antd_1 = require("antd");
var react_1 = __importDefault(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
var infrastructureStateActions_1 = require("../../Redux/Actions/infrastructureStateActions");
var store_1 = require("../../Redux/store");
var Button_1 = __importDefault(require("../../Vitacore/Controls/Button"));
var TextArea = antd_1.Input.TextArea;
var ButtonsContainer = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  padding-top: 12px;\n\n  & > button:not(:last-child) {\n    margin-right: 4px;\n  }\n"], ["\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  padding-top: 12px;\n\n  & > button:not(:last-child) {\n    margin-right: 4px;\n  }\n"])));
var ApplicantDocRejectReason = /** @class */ (function (_super) {
    __extends(ApplicantDocRejectReason, _super);
    function ApplicantDocRejectReason(props) {
        var _this = _super.call(this, props) || this;
        _this.onRejectTextChange = function (evt) {
            _this.setState({
                reasonText: evt.target.value,
            });
        };
        _this.state = {
            reasonText: '',
        };
        return _this;
    }
    ApplicantDocRejectReason.prototype.render = function () {
        var _a = this.props, onRejectClick = _a.onRejectClick, rejectBtnText = _a.rejectBtnText, onCancelClick = _a.onCancelClick, cancelBtnText = _a.cancelBtnText;
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(TextArea, { value: this.state.reasonText, onChange: this.onRejectTextChange }),
            react_1.default.createElement(ButtonsContainer, null,
                react_1.default.createElement(Button_1.default, { text: rejectBtnText || 'Отказать', onClick: onRejectClick(this.state.reasonText), colorSchema: "blue" }),
                react_1.default.createElement(Button_1.default, { text: cancelBtnText || 'Отмена', onClick: onCancelClick || (function () { return store_1.getStore().dispatch(infrastructureStateActions_1.closeRecentModal()); }), colorSchema: "blue" }))));
    };
    return ApplicantDocRejectReason;
}(react_1.default.Component));
var createRejectReasonModalInfo = function (header, okRejectClick, okCancelClick, okBtnText, cancelBtnText, closable, onClose) {
    return ({
        header: header,
        content: (react_1.default.createElement(ApplicantDocRejectReason, { onRejectClick: okRejectClick, rejectBtnText: okBtnText, onCancelClick: okCancelClick, cancelBtnText: cancelBtnText })),
        onClose: onClose,
        closable: closable,
    });
};
exports.default = createRejectReasonModalInfo;
var templateObject_1;
//# sourceMappingURL=ApplicantDocRejectReason.js.map
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
import { Input } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { closeRecentModal } from '../../Redux/Actions/infrastructureStateActions';
import { getStore } from '../../Redux/store';
import Button from '../../Vitacore/Controls/Button';
var TextArea = Input.TextArea;
var ButtonsContainer = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  padding-top: 12px;\n\n  & > button:not(:last-child) {\n    margin-right: 4px;\n  }\n"], ["\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  padding-top: 12px;\n\n  & > button:not(:last-child) {\n    margin-right: 4px;\n  }\n"])));
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
        return (React.createElement(React.Fragment, null,
            React.createElement(TextArea, { value: this.state.reasonText, onChange: this.onRejectTextChange }),
            React.createElement(ButtonsContainer, null,
                React.createElement(Button, { text: rejectBtnText || 'Отказать', onClick: onRejectClick(this.state.reasonText), colorSchema: "blue" }),
                React.createElement(Button, { text: cancelBtnText || 'Отмена', onClick: onCancelClick || (function () { return getStore().dispatch(closeRecentModal()); }), colorSchema: "blue" }))));
    };
    return ApplicantDocRejectReason;
}(React.Component));
var createRejectReasonModalInfo = function (header, okRejectClick, okCancelClick, okBtnText, cancelBtnText, closable, onClose) {
    return ({
        header: header,
        content: (React.createElement(ApplicantDocRejectReason, { onRejectClick: okRejectClick, rejectBtnText: okBtnText, onCancelClick: okCancelClick, cancelBtnText: cancelBtnText })),
        onClose: onClose,
        closable: closable,
    });
};
export default createRejectReasonModalInfo;
var templateObject_1;
//# sourceMappingURL=ApplicantDocRejectReason.js.map
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
import { COLORS, SIZES } from '@vitacore/shared-ui';
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { closeRecentModal } from '../../Redux/Actions/infrastructureStateActions';
import { isFalse } from '../../utils';
var BASE_Z_INDEX = 5000;
var ModalsContainerStyled = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background-color: #0000007a;\n  z-index: ", ";\n"], ["\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background-color: #0000007a;\n  z-index: ", ";\n"])), BASE_Z_INDEX);
var ModalRootContainer = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: fixed;\n  width: 100%;\n  left: 0;\n  top: 50%;\n  transform: translateY(-50%);\n  text-align: center;\n"], ["\n  position: fixed;\n  width: 100%;\n  left: 0;\n  top: 50%;\n  transform: translateY(-50%);\n  text-align: center;\n"])));
var ModalOuterContainer = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: inline-block;\n"], ["\n  display: inline-block;\n"])));
var ModalContainer = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  min-width: 320px;\n  max-width: 60em;\n  left: 0;\n  font-size: ", "px;\n"], ["\n  display: flex;\n  flex-direction: column;\n  min-width: 320px;\n  max-width: 60em;\n  left: 0;\n  font-size: ", "px;\n"])), SIZES.s14);
var ModalHeader = styled.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  display: flex;\n  flex-shrink: 0;\n  padding: 6px 30px 6px 10px;\n  position: relative;\n  background-color: ", ";\n  color: white;\n  font-size: ", "px;\n"], ["\n  display: flex;\n  flex-shrink: 0;\n  padding: 6px 30px 6px 10px;\n  position: relative;\n  background-color: ", ";\n  color: white;\n  font-size: ", "px;\n"])), COLORS.MAIN_BLUE, SIZES.s16);
var ModalCloseIcon = styled.p(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  margin: 0;\n  padding: 0;\n  position: absolute;\n  top: 50%;\n  right: 10px;\n  transform: translateY(-50%);\n  font-size: 16px;\n  color: white;\n  cursor: pointer;\n"], ["\n  margin: 0;\n  padding: 0;\n  position: absolute;\n  top: 50%;\n  right: 10px;\n  transform: translateY(-50%);\n  font-size: 16px;\n  color: white;\n  cursor: pointer;\n"])));
var ModalContentStyled = styled.div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  flex-grow: 1;\n  padding: 10px;\n  background-color: white;\n  text-align: left;\n"], ["\n  flex-grow: 1;\n  padding: 10px;\n  background-color: white;\n  text-align: left;\n"])));
var ModalsContainer = /** @class */ (function (_super) {
    __extends(ModalsContainer, _super);
    function ModalsContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ModalsContainer.prototype.render = function () {
        var _this = this;
        var modals = this.props.modals;
        if (modals.length === 0) {
            return null;
        }
        return (React.createElement(React.Fragment, null,
            React.createElement(ModalsContainerStyled, null),
            modals.map(function (modalInfo, idx) {
                var isCurrentModal = idx === modals.length - 1;
                return (React.createElement(ModalRootContainer, { key: modalInfo.header, style: { zIndex: isCurrentModal ? BASE_Z_INDEX + 1 : BASE_Z_INDEX - modals.length + idx + 1 } },
                    React.createElement(ModalOuterContainer, null,
                        React.createElement(ModalContainer, null,
                            React.createElement(ModalHeader, null,
                                modalInfo.header,
                                !isFalse(modalInfo.closable) && (React.createElement(ModalCloseIcon, { onClick: modalInfo.onClose || _this.props.closeRecentModal }, "X"))),
                            React.createElement(ModalContentStyled, null, modalInfo.content)))));
            })));
    };
    return ModalsContainer;
}(React.Component));
var mapStateToProps = function (state) {
    return {
        modals: state.infrastructureState.modals,
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        closeRecentModal: function () { return dispatch(closeRecentModal()); },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalsContainer);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
//# sourceMappingURL=ModalsContainer.js.map
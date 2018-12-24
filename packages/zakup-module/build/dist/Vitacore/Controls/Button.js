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
var shared_ui_1 = require("@vitacore/shared-ui");
var React = __importStar(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
var utils_1 = require("../../utils");
var FailIcon_1 = __importDefault(require("./FailIcon"));
var SimpleSpinner_1 = __importDefault(require("./SimpleSpinner"));
var SuccessIcon_1 = __importDefault(require("./SuccessIcon"));
var ButtonStyled = styled_components_1.default.button(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  font-size: 1rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 3px 10px;\n  background-color: ", ";\n  margin: 0;\n  border: none;\n  border-radius: 0;\n  color: white;\n  position: relative;\n  outline: none;\n\n  &:not(:disabled) {\n    cursor: pointer;\n  }\n\n  &:hover {\n    background-color: ", ";\n  }\n\n  &:disabled {\n    background-color: ", ";\n  }\n"], ["\n  font-size: 1rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 3px 10px;\n  background-color: ",
    ";\n  margin: 0;\n  border: none;\n  border-radius: 0;\n  color: white;\n  position: relative;\n  outline: none;\n\n  &:not(:disabled) {\n    cursor: pointer;\n  }\n\n  &:hover {\n    background-color: ",
    ";\n  }\n\n  &:disabled {\n    background-color: ", ";\n  }\n"])), function (props) {
    return utils_1.isTrue(props.colorSchema)
        ? props.colorSchema === 'green'
            ? shared_ui_1.COLORS.MAIN_GREEN
            : shared_ui_1.COLORS.MAIN_BLUE
        : shared_ui_1.COLORS.MAIN_GREEN;
}, function (props) {
    return utils_1.isTrue(props.colorSchema)
        ? props.colorSchema === 'green'
            ? shared_ui_1.COLORS.MAIN_GREEN_HOVER
            : shared_ui_1.COLORS.MAIN_BLUE_HOVER
        : shared_ui_1.COLORS.MAIN_GREEN_HOVER;
}, shared_ui_1.COLORS.LIGHT_GRAY);
var ButtonText = styled_components_1.default.p(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  margin: 0;\n  padding: 0;\n  visibility: ", ";\n"], ["\n  margin: 0;\n  padding: 0;\n  visibility: ", ";\n"])), function (props) { return (props.isHidden ? 'hidden' : 'auto'); });
var ButtonState;
(function (ButtonState) {
    ButtonState[ButtonState["NORMAL"] = 0] = "NORMAL";
    ButtonState[ButtonState["LOADING"] = 1] = "LOADING";
    ButtonState[ButtonState["FAILED"] = 2] = "FAILED";
    ButtonState[ButtonState["SUCCESS"] = 3] = "SUCCESS";
})(ButtonState || (ButtonState = {}));
var CHANGE_STATE_DELAY_MS = 3500;
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button(props) {
        var _this = _super.call(this, props) || this;
        _this.setLoading = function (value) {
            _this.setState({
                btnState: ButtonState.LOADING,
            });
        };
        _this.showFailed = function (errorMessage) {
            _this.changeStateWithDelayToNormal(ButtonState.FAILED, errorMessage);
        };
        _this.showSuccessed = function (successMessage) {
            _this.changeStateWithDelayToNormal(ButtonState.SUCCESS, successMessage);
        };
        _this.changeStateWithDelayToNormal = function (state, resultMessage) {
            _this.setState({
                btnState: state,
                resultMessage: resultMessage,
            }, function () {
                setTimeout(function () {
                    _this.setState({
                        btnState: ButtonState.NORMAL,
                    });
                }, CHANGE_STATE_DELAY_MS);
            });
        };
        _this.state = {
            btnState: ButtonState.NORMAL,
        };
        return _this;
    }
    Button.prototype.render = function () {
        var _a = this.props, interactive = _a.interactive, disableClicksDuringLoading = _a.disableClicksDuringLoading;
        var isDuringInteraction = utils_1.isTrue(interactive && this.state.btnState !== ButtonState.NORMAL);
        var hasSpinner = utils_1.isTrue(interactive && this.state.btnState === ButtonState.LOADING);
        var isSuccess = utils_1.isTrue(interactive && this.state.btnState === ButtonState.SUCCESS);
        var isFail = utils_1.isTrue(interactive && this.state.btnState === ButtonState.FAILED);
        var hasResultMessage = (isFail || isSuccess) && utils_1.isTrue(this.state.resultMessage);
        var clickHandlerNeeded = !isDuringInteraction || !utils_1.isTrue(disableClicksDuringLoading);
        return (React.createElement(ButtonStyled, { onClick: clickHandlerNeeded ? this.props.onClick : undefined, disabled: this.props.disabled, type: this.props.type, colorSchema: this.props.colorSchema },
            isSuccess && React.createElement(SuccessIcon_1.default, { alongWithText: hasResultMessage }),
            isFail && React.createElement(FailIcon_1.default, { alongWithText: hasResultMessage }),
            React.createElement(ButtonText, { isHidden: isDuringInteraction && !hasResultMessage }, hasResultMessage ? this.state.resultMessage : this.props.text),
            hasSpinner && React.createElement(SimpleSpinner_1.default, { width: 14, height: 14 })));
    };
    return Button;
}(React.Component));
exports.default = Button;
var templateObject_1, templateObject_2;
//# sourceMappingURL=Button.js.map
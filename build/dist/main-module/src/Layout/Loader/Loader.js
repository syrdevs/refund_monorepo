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
import { clearLoaderMessage } from '../../Redux/Actions/infrastructureStateActions';
import { isFalse, isTrue } from '../../utils';
import './LoaderKeyframes.css';
var LoaderModalWrapper = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background-color: #0000007a;\n  z-index: 10000;\n  visibility: ", ";\n"], ["\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background-color: #0000007a;\n  z-index: 10000;\n  visibility: ", ";\n"])), function (props) { return (props.isHidden ? 'hidden' : 'auto'); });
var LoaderSpinner = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  border-radius: 50%;\n  width: 140px;\n  height: 140px;\n  position: relative;\n  top: 50%;\n  left: 50%;\n  transform: translate3d(-50%, -50%, 0);\n  text-indent: -9999em;\n  border: 10px solid #ffffff8c;\n  border-left-color: ", ";\n  animation: load 1.2s infinite linear;\n  will-change: transform;\n  z-index: 10001;\n  opacity: ", ";\n"], ["\n  border-radius: 50%;\n  width: 140px;\n  height: 140px;\n  position: relative;\n  top: 50%;\n  left: 50%;\n  transform: translate3d(-50%, -50%, 0);\n  text-indent: -9999em;\n  border: 10px solid #ffffff8c;\n  border-left-color: ", ";\n  animation: load 1.2s infinite linear;\n  will-change: transform;\n  z-index: 10001;\n  opacity: ", ";\n"])), COLORS.MAIN_BLUE, function (props) { return (props.isHidden ? '0' : '1'); });
var LoaderMessage = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: flex;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate3d(-50%, -50%, 0);\n  z-index: 10001;\n  font-size: ", "px;\n  color: ", ";\n  opacity: 1;\n  transition: opacity 1.4s ease-in-out;\n\n  &.message-shown {\n    opacity: 0;\n  }\n"], ["\n  display: flex;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate3d(-50%, -50%, 0);\n  z-index: 10001;\n  font-size: ", "px;\n  color: ", ";\n  opacity: 1;\n  transition: opacity 1.4s ease-in-out;\n\n  &.message-shown {\n    opacity: 0;\n  }\n"])), SIZES.s50, COLORS.LOADER_MESSAGE);
var DELAY_BEFORE_HIDING_LOADER_MESSAGE_MS = 1400;
var Loader = /** @class */ (function (_super) {
    __extends(Loader, _super);
    function Loader(props) {
        var _this = _super.call(this, props) || this;
        _this.refreshHidingSpinnerTimer = function (shouldUpdateState) {
            if (_this.hidingSpinnerTimer) {
                clearTimeout(_this.hidingSpinnerTimer);
            }
            if (shouldUpdateState) {
                _this.setState({
                    shouldDisplay: true,
                });
            }
            _this.hidingSpinnerTimer = setTimeout(function () {
                if (_this.props.shouldDisplay) {
                    _this.refreshHidingSpinnerTimer(true);
                }
                else {
                    _this.setState({
                        shouldDisplay: false,
                    });
                }
            }, 10000);
        };
        _this.state = {
            messageShown: false,
            messageShownClassApplied: false,
            shouldDisplay: props.shouldDisplay,
        };
        if (props.shouldDisplay) {
            _this.refreshHidingSpinnerTimer(false);
        }
        return _this;
    }
    Loader.prototype.render = function () {
        var _a = this.props, forceDisplaying = _a.forceDisplaying, loaderResponseMessage = _a.loaderResponseMessage;
        var shouldDisplay = this.state.shouldDisplay;
        if (isFalse(forceDisplaying) && !shouldDisplay && !this.state.messageShown) {
            return null;
        }
        return (React.createElement(LoaderModalWrapper, { isHidden: !this.props.shouldDisplay && !this.state.messageShown },
            this.state.messageShown && (React.createElement(LoaderMessage, { className: this.state.messageShownClassApplied ? 'message-shown' : '' }, loaderResponseMessage)),
            (isTrue(forceDisplaying) || shouldDisplay) && (React.createElement(LoaderSpinner, { isHidden: this.state.messageShown || !this.props.shouldDisplay }))));
    };
    Loader.prototype.componentWillReceiveProps = function (newProps) {
        var _this = this;
        if (newProps.loaderResponseMessage && this.props.loaderResponseMessage !== newProps.loaderResponseMessage) {
            this.setState({
                messageShown: true,
            });
            setTimeout(function () {
                return _this.setState({
                    messageShownClassApplied: true,
                });
            }, 0);
            if (this.hidingLoaderMessageTimer) {
                clearTimeout(this.hidingLoaderMessageTimer);
            }
            this.hidingLoaderMessageTimer = setTimeout(function () {
                _this.setState({
                    messageShown: false,
                    messageShownClassApplied: false,
                }, function () { return _this.props.clearLoaderMessage(); });
            }, DELAY_BEFORE_HIDING_LOADER_MESSAGE_MS);
        }
        if (newProps.shouldDisplay) {
            this.refreshHidingSpinnerTimer(true);
        }
    };
    Loader.prototype.componentWillUnmount = function () {
        if (this.hidingSpinnerTimer) {
            clearTimeout(this.hidingSpinnerTimer);
        }
        if (this.hidingLoaderMessageTimer) {
            clearTimeout(this.hidingLoaderMessageTimer);
        }
        this.props.clearLoaderMessage();
    };
    return Loader;
}(React.PureComponent));
var mapStateToProps = function (state) {
    return {
        shouldDisplay: state.infrastructureState.numberOfRequestsInProgress > 0,
        loaderResponseMessage: state.infrastructureState.loaderResponseMessage,
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        clearLoaderMessage: function () { return dispatch(clearLoaderMessage()); },
    };
};
var ConnectedLoader = connect(mapStateToProps, mapDispatchToProps)(Loader);
export default ConnectedLoader;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=Loader.js.map
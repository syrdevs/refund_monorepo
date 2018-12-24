"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sharedUi = require("@vitacore/shared-ui");

var _react = _interopRequireDefault(require("react"));

var _reactRouter = require("react-router");

var _utils = require("./utils");

var _jsxFileName = "C:\\refund_tatar\\packages\\test-module\\src\\App.js";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var App =
/*#__PURE__*/
function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    var _this;

    _classCallCheck(this, App);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(App).call(this, props));
    (0, _utils.addToAppFunctions)('simpleAuthCheck', props.simpleAuthCheck);
    (0, _utils.addToAppFunctions)('promiseAuthCheck', props.promiseAuthCheck);
    (0, _utils.addToAppFunctions)('getAuthToken', props.getAuthToken);
    (0, _utils.addToAppFunctions)('requestStarted', props.requestStarted);
    (0, _utils.addToAppFunctions)('requestFinished', props.requestFinished);
    (0, _utils.addToAppFunctions)('getUserLanguage', props.getUserLanguage);

    if (props.subscribeToUserLanguageChange) {
      props.subscribeToUserLanguageChange(_utils.setUserLanguage);
    }

    (0, _utils.addToAppData)(_sharedUi.APP_ROUTE_KEY, props.appRoute);
    (0, _utils.addToAppData)('history', props.history);
    return _this;
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(_react.default.Fragment, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 26
        },
        __self: this
      }, _react.default.createElement("div", {
        style: {
          display: 'flex',
          flexDirection: 'column',
          flexGrow: (0, _utils.isTrue)(this.props.handleNoMatch) ? 1 : 0
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 27
        },
        __self: this
      }, _react.default.createElement(_reactRouter.Switch, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 28
        },
        __self: this
      }, _react.default.createElement(_sharedUi.PrivateRoute, {
        exact: true,
        path: (0, _sharedUi.buildAppRoute)((0, _utils.getAppRoute)(), '/cabinet/profile'),
        simpleAuthCheck: (0, _utils.getAppFunction)('simpleAuthCheck'),
        promiseAuthCheck: (0, _utils.getAppFunction)('promiseAuthCheck'),
        render: function render() {
          return _react.default.createElement("div", {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 34
            },
            __self: this
          }, "WELL DONE!!!");
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 29
        },
        __self: this
      }), _react.default.createElement(_sharedUi.NoMatchRoute, {
        handle: (0, _utils.isTrue)(this.props.handleNoMatch),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 36
        },
        __self: this
      }))));
    }
  }]);

  return App;
}(_react.default.Component);

var _default = App;
exports.default = _default;
//# sourceMappingURL=App.js.map
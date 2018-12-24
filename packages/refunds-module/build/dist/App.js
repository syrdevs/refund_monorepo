"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouter = require("react-router");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _sharedUi = require("@vitacore/shared-ui");

var _ContentLayout = _interopRequireDefault(require("./layouts/ContentLayout"));

var _jsxFileName = "C:\\refund_tatar\\packages\\refunds-module\\src\\App.js";

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

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-grow: 1;\n  border-left: 1px solid #d6d6d6;\n  padding: 0 15px;\n  background-color: white;\n  border-top: 4px solid ", ";\n  min-width: 0;\n  overflow: auto;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-grow: 1;\n  background-color: #edf1f5;\n  min-width: 0;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var RootContainer = _styledComponents.default.div(_templateObject());

var Content = _styledComponents.default.div(_templateObject2(), _sharedUi.COLORS.MAIN_GREEN);

var refundMenuItems = [{
  name: "Возвраты",
  hrefPrefix: "/refunds",
  iconName: "database",
  translationKey: "leftMenu.refunds._",
  subItems: []
}, {
  name: "Платежи",
  hrefPrefix: "/payments",
  iconName: "database",
  translationKey: "leftMenu.refunds.payments",
  subItems: []
}];

var App =
/*#__PURE__*/
function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, _getPrototypeOf(App).call(this, props));
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      var location = this.props.location.pathname;
      var bcRoutes = [{
        path: "/",
        breadcrumbName: "Главная"
      }, {
        path: "/refunds",
        breadcrumbName: "Возвраты"
      }];
      console.log(location);
      return _react.default.createElement(RootContainer, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 62
        },
        __self: this
      }, _react.default.createElement(_sharedUi.LeftMenu, {
        leftMenuItems: refundMenuItems.concat(),
        location: location,
        goToLink: this.props.history.push,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 63
        },
        __self: this
      }), _react.default.createElement(Content, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 65
        },
        __self: this
      }, _react.default.createElement(_ContentLayout.default, {
        contentName: "Возвраты",
        breadcrumbRoutes: bcRoutes,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 66
        },
        __self: this
      }, "Main Layout")));
    }
  }]);

  return App;
}(_react.default.Component);

var _default = App;
exports.default = _default;
//# sourceMappingURL=App.js.map
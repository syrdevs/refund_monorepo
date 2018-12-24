"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _sharedUi = require("@vitacore/shared-ui");

var _BreadCumber = _interopRequireDefault(require("../components/BreadCumber"));

var _jsxFileName = "C:\\refund_tatar\\packages\\refunds-module\\src\\layouts\\ContentLayout.js";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-grow: 1;\n  min-height: 0;\n  padding: 10px;\n\n  & > * {\n    flex-grow: 1;\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  padding: 4px 15px;\n  border-bottom: 1px solid #ddd;\n  flex-shrink: 0;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  flex-shrink: 0;\n  padding: 12px 15px;\n  border-bottom: 1px solid #ddd;\n  font-size: ", "px;\n  color: ", ";\n  font-weight: ", ";\n  text-transform: uppercase;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n  background-color: white;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Container = _styledComponents.default.div(_templateObject());

var ContentHeader = _styledComponents.default.div(_templateObject2(), _sharedUi.SIZES.s18, _sharedUi.COLORS.MAIN_BLUE, _sharedUi.WEIGHTS.MEDIUM);

var BreadcrumbsContainer = _styledComponents.default.div(_templateObject3());

var MainContent = _styledComponents.default.div(_templateObject4());

var ContentLayout =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ContentLayout, _React$Component);

  function ContentLayout() {
    _classCallCheck(this, ContentLayout);

    return _possibleConstructorReturn(this, _getPrototypeOf(ContentLayout).apply(this, arguments));
  }

  _createClass(ContentLayout, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          breadcrumbRoutes = _this$props.breadcrumbRoutes,
          contentName = _this$props.contentName;
      return React.createElement(Container, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 47
        },
        __self: this
      }, React.createElement(ContentHeader, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 48
        },
        __self: this
      }, contentName), breadcrumbRoutes && React.createElement(BreadcrumbsContainer, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 50
        },
        __self: this
      }, React.createElement(_BreadCumber.default, {
        routes: breadcrumbRoutes,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 51
        },
        __self: this
      })), React.createElement(MainContent, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 54
        },
        __self: this
      }, this.props.children));
    }
  }]);

  return ContentLayout;
}(React.Component);

var _default = ContentLayout;
exports.default = _default;
//# sourceMappingURL=ContentLayout.js.map
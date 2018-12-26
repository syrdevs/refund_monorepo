"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactRedux = require("react-redux");

var _model = _interopRequireDefault(require("./model.config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = function _default(args) {
  var modelsData = {};
  var effects = {};

  _model.default.forEach(function (model) {
    modelsData[model.namespace] = model.state;
    Object.keys(model.effects).forEach(function (effectItemKey) {
      effects[model.namespace + "/" + model.effects[effectItemKey].name] = false;
    });
  });

  return function (Component) {
    function mapDispatchToProps(_dispatch) {
      return {
        dispatch: function dispatch(action) {
          return _dispatch(action);
        }
      };
    }

    function mapStateToProps(state) {
      var params = _objectSpread({
        loading: {
          effects: effects
        }
      }, modelsData);

      return _objectSpread({}, args(params), state);
    }

    return (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Component);
  };
};

exports.default = _default;
//# sourceMappingURL=index.js.map
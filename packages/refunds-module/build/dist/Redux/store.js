"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("babel-polyfill");

var _redux = require("redux");

var _reduxSaga = _interopRequireDefault(require("redux-saga"));

var _effects = require("redux-saga/effects");

var _react = _interopRequireWildcard(require("react"));

var _model = _interopRequireDefault(require("./model.config"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var sagaMiddlewareWatcher = [];
var combineReducersData = {};

_model.default.forEach(function (model) {
  Object.keys(model.effects).forEach(function (effectItemKey) {
    sagaMiddlewareWatcher.push(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return (0, _effects.takeEvery)(model.namespace + "/" + effectItemKey,
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee(payload) {
                return regeneratorRuntime.wrap(function _callee$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return model.effects[effectItemKey](payload, {
                          call: _effects.call,
                          put:
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function put(action) {
                            return regeneratorRuntime.wrap(function put$(_context) {
                              while (1) {
                                switch (_context.prev = _context.next) {
                                  case 0:
                                    _context.next = 2;
                                    return (0, _effects.put)(_objectSpread({}, action, {
                                      type: model.namespace + "/" + action.type
                                    }));

                                  case 2:
                                  case "end":
                                    return _context.stop();
                                }
                              }
                            }, put, this);
                          })
                        });

                      case 2:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee, this);
              }));

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee2, this);
    }));
  });

  combineReducersData[model.namespace] = function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : model.state;
    var action = arguments.length > 1 ? arguments[1] : undefined;
    var actionType = action.type.replace(model.namespace + "/", "");

    if (model.reducers[actionType]) {
      model.state = model.reducers[actionType](state, action);
    }

    return model.state;
  };
});

var sagaMiddleware = (0, _reduxSaga.default)();
var store = (0, _redux.createStore)((0, _redux.combineReducers)(combineReducersData), (0, _redux.applyMiddleware)(sagaMiddleware));
sagaMiddleware.run(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee3() {
  return regeneratorRuntime.wrap(function _callee3$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _effects.all)(sagaMiddlewareWatcher.map(_effects.fork));

        case 2:
        case "end":
          return _context4.stop();
      }
    }
  }, _callee3, this);
}));
var _default = store;
exports.default = _default;
//# sourceMappingURL=store.js.map
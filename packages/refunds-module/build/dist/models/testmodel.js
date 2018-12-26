"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  namespace: "testmodel",
  state: {
    testModelData: {}
  },
  effects: {
    testMethod:
    /*#__PURE__*/
    regeneratorRuntime.mark(function testMethod(payload, _ref) {
      var call, put, data;
      return regeneratorRuntime.wrap(function testMethod$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              call = _ref.call, put = _ref.put;
              _context.next = 3;
              return call(function () {
                return fetch("https://dog.ceo/api/breeds/image/random").then(function (res) {
                  return res.json();
                });
              });

            case 3:
              data = _context.sent;
              _context.next = 6;
              return put({
                type: "testMethodReducer",
                payload: data
              });

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, testMethod, this);
    })
  },
  reducers: {
    testMethodReducer: function testMethodReducer(state, _ref2) {
      var payload = _ref2.payload;
      return _objectSpread({}, state, {
        testModelData: payload
      });
    }
  }
};
exports.default = _default;
//# sourceMappingURL=testmodel.js.map
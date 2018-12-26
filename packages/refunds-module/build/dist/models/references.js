"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _api = require("../services/api");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  namespace: 'references',
  state: {},
  effects: {
    load:
    /*#__PURE__*/
    regeneratorRuntime.mark(function load(payload, _ref) {
      var call, put, response;
      return regeneratorRuntime.wrap(function load$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              call = _ref.call, put = _ref.put;
              _context.next = 3;
              return call(_api.getReference, payload);

            case 3:
              response = _context.sent;
              _context.next = 6;
              return put({
                type: 'getLoading',
                payload: {
                  data: response,
                  code: payload.code
                }
              });

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, load, this);
    })
  },
  reducers: {
    getLoading: function getLoading(state, _ref2) {
      var payload = _ref2.payload;
      return _objectSpread({}, state, _defineProperty({}, payload.code, payload.data));
    }
  }
};
exports.default = _default;
//# sourceMappingURL=references.js.map
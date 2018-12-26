"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var initialState = {
  loading: true
};

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case "REQUESTED":
      return {
        data: {},
        loading: true,
        error: false
      };

    case "REQUESTED_SUCCEEDED":
      return {
        data: action.data,
        loading: false,
        error: false
      };

    case "REQUESTED_FAILED":
      return {
        data: "",
        loading: false,
        error: true
      };

    default:
      return state;
  }
};

var _default = reducer;
exports.default = _default;
//# sourceMappingURL=reducer.js.map
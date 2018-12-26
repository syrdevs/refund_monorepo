"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _qs = require("qs");

function _default() {
  var isToken = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var token = localStorage.getItem('AUTH_TOKEN');

  var destroySession = function destroySession() {
    localStorage.removeItem('token');
    localStorage.removeItem('antd-pro-authority');
    location.replace('/user/login');
  }; // if token and isToken


  if (token && isToken) {
    //return decoded.exp > Date.now() / 1000 ? token : false;
    return token;
  } // if token expired


  if (token) {}
  /*if (!(decoded.exp > Date.now() / 1000)) {
   destroySession();
  }*/
  // if auth antd-pro-authority


  if (!localStorage.getItem('antd-pro-authority')) {//destroySession();
  }
}
//# sourceMappingURL=setAuth.js.map
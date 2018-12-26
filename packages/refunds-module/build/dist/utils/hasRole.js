"use strict";

module.exports = function (roles) {
  //todo authority
  var userRoles = ["ADMIN"];
  return !userRoles.some(function (r) {
    return roles.indexOf(r) >= 0;
  });
};
//# sourceMappingURL=hasRole.js.map
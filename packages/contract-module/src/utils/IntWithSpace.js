"use strict";

module.exports = function intWithSpace(x) {
  if (x || x === 0) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    var spaceNumber = parts.join(".");
    var index = spaceNumber.indexOf(".");
    return spaceNumber;
  }
};
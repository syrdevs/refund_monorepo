module.exports = function numberWithSpaces(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  var spaceNumber = parts.join(".");
  var index = spaceNumber.indexOf(".");
  if (index >= 0) {
    return spaceNumber;
  } else {
    return spaceNumber + ".00";
  }
};
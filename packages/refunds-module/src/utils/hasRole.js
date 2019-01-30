let userState = {};

module.exports = (roles, _userState) => {

  if (roles === null && _userState && _userState.roles) {
    // userState = _userState;
    localStorage.setItem("roles", JSON.stringify(_userState.roles));
    return;
  }

  if (localStorage.getItem("roles")) {
    userState.roles = JSON.parse(localStorage.getItem("roles"));
  }

  let userRoles = userState.roles ? userState.roles : [];
  return !userRoles.some(r => roles.indexOf(r) >= 0);
};
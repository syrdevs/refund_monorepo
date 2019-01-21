let userState = {};

module.exports = (roles, _userState) => {

  if (roles === null && _userState) {
    userState = _userState;
    return;
  }

  let userRoles = userState.roles ? userState.roles : [];
  return !userRoles.some(r => roles.indexOf(r) >= 0);
};
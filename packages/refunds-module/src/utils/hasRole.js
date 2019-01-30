let userState = {};

module.exports = (roles, _userState) => {

  if (roles === null && _userState && _userState.roles) {
    userState = _userState;
    return;
  }

  let userRoles = userState.roles ? userState.roles : [];
  return Object.keys(userState).length === 0 ? null : userRoles.some(r => roles.indexOf(r) >= 0);
};
function hasRole(roles) {

  //todo authority

  let userRoles = ["ADMIN"];
  return !userRoles.some(r => roles.indexOf(r) >= 0);
};

export default hasRole;
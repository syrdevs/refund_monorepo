export var buildAppRoute = function (appRoute, path) {
    var needSlash = !appRoute.endsWith('/') && !path.startsWith('/');
    return "" + appRoute + (needSlash ? '/' : '') + path;
};
//# sourceMappingURL=utils.js.map
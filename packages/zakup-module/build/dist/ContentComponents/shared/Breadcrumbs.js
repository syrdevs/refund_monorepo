"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var shared_ui_1 = require("@vitacore/shared-ui");
var antd_1 = require("antd");
var React = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
var utils_1 = require("../../utils");
function itemRender(route, params, routes, paths) {
    var last = routes.indexOf(route) === routes.length - 1;
    var location = paths.join('/');
    if (paths.length > 0) {
        location = "/" + location;
    }
    return last ? (React.createElement("span", null, route.breadcrumbName)) : (React.createElement(react_router_dom_1.Link, { to: shared_ui_1.buildAppRoute(utils_1.getAppRoute(), location) }, route.breadcrumbName));
}
var Breadcrumbs = function (props) { return (React.createElement(antd_1.Breadcrumb, { itemRender: itemRender, routes: props.routes })); };
exports.default = Breadcrumbs;
//# sourceMappingURL=Breadcrumbs.js.map
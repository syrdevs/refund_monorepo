var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { buildAppRoute } from "@vitacore/shared-ui";
import { Breadcrumb } from "antd";
import * as React from "react";
import { getAppRoute } from "../../../../zakup-module/src/utils";
var BreadCumber = /** @class */ (function (_super) {
    __extends(BreadCumber, _super);
    function BreadCumber(props) {
        var _this = _super.call(this, props) || this;
        _this.itemRender = function (route, params, routes, paths) {
            var last = routes.indexOf(route) === routes.length - 1;
            var location = paths.join("/");
            if (paths.length > 0) {
                location = "/" + location;
            }
            return last ? (React.createElement("span", null, route.breadcrumbName)) : (React.createElement(Link, { to: buildAppRoute(getAppRoute(), location) }, route.breadcrumbName));
        };
        return _this;
    }
    BreadCumber.prototype.render = function () {
        return React.createElement(Breadcrumb, { itemRender: this.itemRender, routes: this.props.routes });
    };
    return BreadCumber;
}(React.Component));
export default BreadCumber;
//# sourceMappingURL=index.js.map
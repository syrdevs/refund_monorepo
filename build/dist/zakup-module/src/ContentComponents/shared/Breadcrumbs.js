import { buildAppRoute } from '@vitacore/shared-ui';
import { Breadcrumb } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { getAppRoute } from '../../utils';
function itemRender(route, params, routes, paths) {
    var last = routes.indexOf(route) === routes.length - 1;
    var location = paths.join('/');
    if (paths.length > 0) {
        location = "/" + location;
    }
    return last ? (React.createElement("span", null, route.breadcrumbName)) : (React.createElement(Link, { to: buildAppRoute(getAppRoute(), location) }, route.breadcrumbName));
}
var Breadcrumbs = function (props) { return (React.createElement(Breadcrumb, { itemRender: itemRender, routes: props.routes })); };
export default Breadcrumbs;
//# sourceMappingURL=Breadcrumbs.js.map
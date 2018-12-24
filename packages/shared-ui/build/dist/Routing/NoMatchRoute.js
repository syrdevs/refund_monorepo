import * as React from 'react';
import { Link } from 'react-router-dom';
var NoMatchRoute = function (routeProps) {
    if (!routeProps.handle) {
        return null;
    }
    return (React.createElement("div", { style: { display: 'flex', flexGrow: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' } },
        React.createElement("div", null, "\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u044B \u043D\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442 :("),
        React.createElement("div", null,
            React.createElement(Link, { to: { pathname: '/' } }, "\u041D\u0430 \u0433\u043B\u0430\u0432\u043D\u0443\u044E"))));
};
export default NoMatchRoute;
//# sourceMappingURL=NoMatchRoute.js.map
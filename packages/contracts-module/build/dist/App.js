"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var shared_ui_1 = require("@vitacore/shared-ui");
var react_1 = __importDefault(require("react"));
var TestModule = Promise.resolve().then(function () { return require('@vitacore/test-module'); });
var ZakupModule = __importStar(require("@vitacore/zakup-module"));
var styled_components_1 = __importDefault(require("styled-components"));
var RootContainer = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-grow: 1;\n  background-color: #edf1f5;\n  min-width: 0;\n"], ["\n  display: flex;\n  flex-grow: 1;\n  background-color: #edf1f5;\n  min-width: 0;\n"])));
var Content = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  flex-grow: 1;\n  border-left: 1px solid #d6d6d6;\n  padding: 0 15px;\n  background-color: white;\n  border-top: 4px solid ", ";\n  min-width: 0;\n  overflow: auto;\n"], ["\n  display: flex;\n  flex-grow: 1;\n  border-left: 1px solid #d6d6d6;\n  padding: 0 15px;\n  background-color: white;\n  border-top: 4px solid ", ";\n  min-width: 0;\n  overflow: auto;\n"])), shared_ui_1.COLORS.MAIN_GREEN);
var updateLeftMenuHrefs = function (leftMenuItems, prefix) {
    var e_1, _a;
    if (prefix) {
        try {
            for (var leftMenuItems_1 = __values(leftMenuItems), leftMenuItems_1_1 = leftMenuItems_1.next(); !leftMenuItems_1_1.done; leftMenuItems_1_1 = leftMenuItems_1.next()) {
                var item = leftMenuItems_1_1.value;
                if (item.hrefPrefix && !item.hrefPrefix.startsWith(prefix)) {
                    item.hrefPrefix = "" + prefix + item.hrefPrefix;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (leftMenuItems_1_1 && !leftMenuItems_1_1.done && (_a = leftMenuItems_1.return)) _a.call(leftMenuItems_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    return leftMenuItems;
};
var modules = [
    { module: ZakupModule, route: '/zakup', dynamic: false, resolved: true },
    { module: TestModule, route: '/two', dynamic: true, resolved: false },
];
var ContractsModule = /** @class */ (function (_super) {
    __extends(ContractsModule, _super);
    function ContractsModule(props) {
        var _this = _super.call(this, props) || this;
        _this.initialize = function () {
            modules
                .filter(function (M) { return M.dynamic; })
                .forEach(function (M) {
                return M.module.then(function (MM) {
                    M.module = MM;
                    M.resolved = true;
                });
            });
            setTimeout(function () {
                _this.setState({
                    initDone: true,
                });
            }, 0);
        };
        _this.state = {
            initDone: false,
        };
        return _this;
    }
    ContractsModule.prototype.render = function () {
        var _this = this;
        var allResolved = modules.every(function (M) { return M.resolved; });
        if (!allResolved) {
            if (!this.state.initDone) {
                this.initialize();
            }
            else {
                setTimeout(function () { return _this.forceUpdate(); }, 100);
            }
            return null;
        }
        var location = this.props.location.pathname;
        if (location === this.props.moduleName) {
            setTimeout(function () { return _this.props.history.push(_this.props.defaultRoute); }, 0);
        }
        var menuItems = [].concat.apply([], modules.map(function (M) {
            var mRoute = "" + _this.props.moduleName + M.route;
            return __spread(updateLeftMenuHrefs(M.module.LeftMenuItems, mRoute));
        }));
        return (react_1.default.createElement(RootContainer, null,
            react_1.default.createElement(shared_ui_1.LeftMenu, { leftMenuItems: menuItems, location: location, goToLink: this.props.history.push }),
            react_1.default.createElement(Content, null, modules.map(function (M) {
                var mRoute = "" + _this.props.moduleName + M.route;
                var routeGoesInside = location.startsWith(mRoute);
                var RComponent = M.module.default;
                return (react_1.default.createElement(RComponent, { key: mRoute, moduleRoute: _this.props.moduleName, appRoute: mRoute, handleNoMatch: routeGoesInside, history: _this.props.history, simpleAuthCheck: _this.props.simpleAuthCheck, promiseAuthCheck: _this.props.promiseAuthCheck, getAuthToken: _this.props.getAuthToken, requestStarted: _this.props.requestStarted, requestFinished: _this.props.requestFinished, getUserLanguage: _this.props.getUserLanguage, subscribeToUserLanguageChange: _this.props.subscribeToUserLanguageChange }));
            }))));
    };
    return ContractsModule;
}(react_1.default.Component));
exports.default = ContractsModule;
var templateObject_1, templateObject_2;
//# sourceMappingURL=App.js.map
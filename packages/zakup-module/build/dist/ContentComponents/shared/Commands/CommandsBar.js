"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var utils_1 = require("../../../utils");
var CommandsList_1 = __importDefault(require("./CommandsList"));
var CommandsBar = /** @class */ (function (_super) {
    __extends(CommandsBar, _super);
    function CommandsBar(props) {
        var _this = _super.call(this, props) || this;
        _this.handleMenuClick = function (isReport) { return function (param) {
            _this.props.onCommandClick(param.key, isReport);
        }; };
        _this.state = {
            items: [],
            fetched: false,
        };
        return _this;
    }
    CommandsBar.prototype.componentDidMount = function () {
        var _this = this;
        utils_1.createApiClient()
            .getCommands(this.props.entity)
            .then(function (resp) {
            _this.setState({
                items: resp.data,
                fetched: true,
            });
        });
    };
    CommandsBar.prototype.render = function () {
        var _a = this.props, disabledActions = _a.disabledActions, disabledReports = _a.disabledReports;
        if (!this.state.fetched) {
            return null;
        }
        var actionItems = this.state.items.filter(function (i) { return i.commandType.typeDesc === 'Действие'; });
        var reportItems = this.state.items.filter(function (i) { return i.commandType.typeDesc === 'Отчет'; });
        return (react_1.default.createElement(react_1.default.Fragment, null,
            actionItems.length ? (react_1.default.createElement(CommandsList_1.default, { name: "\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F", disabled: disabledActions, handleMenuClick: this.handleMenuClick(false), items: actionItems })) : null,
            reportItems.length ? (react_1.default.createElement(CommandsList_1.default, { name: "\u041E\u0442\u0447\u0435\u0442\u044B", disabled: disabledReports, handleMenuClick: this.handleMenuClick(true), items: reportItems })) : null));
    };
    return CommandsBar;
}(react_1.default.Component));
exports.default = CommandsBar;
//# sourceMappingURL=CommandsBar.js.map
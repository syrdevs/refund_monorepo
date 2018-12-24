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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var antd_1 = require("antd");
var React = __importStar(require("react"));
var utils_1 = require("../../utils");
var shared_1 = require("../shared");
var ButtonsContainer_1 = __importDefault(require("../shared/ButtonsContainer"));
var ProtocolActivitiesTable_1 = __importDefault(require("./ProtocolActivitiesTable"));
var ProtocolInfo_1 = __importDefault(require("./ProtocolInfo"));
var TabPane = antd_1.Tabs.TabPane;
var Protocol = /** @class */ (function (_super) {
    __extends(Protocol, _super);
    function Protocol(props) {
        var _this = _super.call(this, props) || this;
        _this.onCommandClick = function (commandId, isReport) {
            utils_1.createApiClient().runCommand(commandId, [_this.props.match.params.id], isReport);
        };
        _this.onPublish = function (id) {
            utils_1.createApiClient()
                .publishProtocol(id)
                .then(function () {
                antd_1.message.success('Протокол опубликован!');
            })
                .catch(function (error) { return antd_1.message.error(error.response && error.response.data && error.response.data.Message); });
        };
        _this.fetchProtocol = function (id) {
            utils_1.createApiClient()
                .fetchProtocolById(id)
                .then(function (resp) {
                _this.setState({
                    protocolInfo: resp.data,
                    fetched: true,
                });
            })
                .catch(function (error) { return antd_1.message.error(error.message); });
        };
        _this.state = {
            protocolInfo: undefined,
            fetched: false,
        };
        return _this;
    }
    Protocol.prototype.componentDidMount = function () {
        var id = this.props.match.params.id;
        this.fetchProtocol(id);
    };
    Protocol.prototype.render = function () {
        var _this = this;
        var _a = this.state, fetched = _a.fetched, protocolInfo = _a.protocolInfo;
        var match = this.props.match;
        if (!fetched) {
            return React.createElement(shared_1.ContentLayout, { contentName: "\u041F\u0440\u043E\u0442\u043E\u043A\u043E\u043B" });
        }
        var id = match.params.id;
        var bcRoutes = [
            {
                path: '/',
                breadcrumbName: 'Главная',
            },
            {
                path: 'protocols',
                breadcrumbName: 'Все протоколы',
            },
            {
                path: id,
                breadcrumbName: 'Протокол',
            },
        ];
        var header = "\u041F\u0440\u043E\u0442\u043E\u043A\u043E\u043B \u2116" + protocolInfo.number + " \u043E\u0442 " + protocolInfo.documentDate + ". \u0420\u0435\u0433\u0438\u043E\u043D: " + protocolInfo.region.nameRu;
        return (React.createElement(shared_1.ContentLayout, { contentName: header, breadcrumbRoutes: bcRoutes, entity: "planProtocol", disableCommands: false, showCommands: true, onCommandClick: this.onCommandClick },
            React.createElement(antd_1.Tabs, { tabPosition: "left", size: "small" },
                React.createElement(TabPane, { tab: "\u0422\u0438\u0442\u0443\u043B\u044C\u043D\u0430\u044F \u0447\u0430\u0441\u0442\u044C", key: "1" },
                    React.createElement(ProtocolInfo_1.default, __assign({}, this.state.protocolInfo)),
                    React.createElement(ButtonsContainer_1.default, { toRight: true },
                        React.createElement(antd_1.Button, { type: "primary", htmlType: "button", disabled: !!this.state.protocolInfo.documentStatus, onClick: function () { return _this.onPublish(id); } }, "\u041E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u0442\u044C"))),
                React.createElement(TabPane, { tab: "\u0421\u043F\u0435\u0446\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044F", key: "2" },
                    React.createElement(ProtocolActivitiesTable_1.default, { planProtocolId: id })))));
    };
    return Protocol;
}(React.Component));
exports.default = Protocol;
//# sourceMappingURL=Protocol.js.map
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
import { Button, message, Tabs } from 'antd';
import * as React from 'react';
import { createApiClient } from '../../utils';
import { ContentLayout } from '../shared';
import ButtonsContainer from '../shared/ButtonsContainer';
import ProtocolActivitiesTable from './ProtocolActivitiesTable';
import ProtocolInfo from './ProtocolInfo';
var TabPane = Tabs.TabPane;
var Protocol = /** @class */ (function (_super) {
    __extends(Protocol, _super);
    function Protocol(props) {
        var _this = _super.call(this, props) || this;
        _this.onCommandClick = function (commandId, isReport) {
            createApiClient().runCommand(commandId, [_this.props.match.params.id], isReport);
        };
        _this.onPublish = function (id) {
            createApiClient()
                .publishProtocol(id)
                .then(function () {
                message.success('Протокол опубликован!');
            })
                .catch(function (error) { return message.error(error.response && error.response.data && error.response.data.Message); });
        };
        _this.fetchProtocol = function (id) {
            createApiClient()
                .fetchProtocolById(id)
                .then(function (resp) {
                _this.setState({
                    protocolInfo: resp.data,
                    fetched: true,
                });
            })
                .catch(function (error) { return message.error(error.message); });
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
            return React.createElement(ContentLayout, { contentName: "\u041F\u0440\u043E\u0442\u043E\u043A\u043E\u043B" });
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
        return (React.createElement(ContentLayout, { contentName: header, breadcrumbRoutes: bcRoutes, entity: "planProtocol", disableCommands: false, showCommands: true, onCommandClick: this.onCommandClick },
            React.createElement(Tabs, { tabPosition: "left", size: "small" },
                React.createElement(TabPane, { tab: "\u0422\u0438\u0442\u0443\u043B\u044C\u043D\u0430\u044F \u0447\u0430\u0441\u0442\u044C", key: "1" },
                    React.createElement(ProtocolInfo, __assign({}, this.state.protocolInfo)),
                    React.createElement(ButtonsContainer, { toRight: true },
                        React.createElement(Button, { type: "primary", htmlType: "button", disabled: !!this.state.protocolInfo.documentStatus, onClick: function () { return _this.onPublish(id); } }, "\u041E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u0442\u044C"))),
                React.createElement(TabPane, { tab: "\u0421\u043F\u0435\u0446\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044F", key: "2" },
                    React.createElement(ProtocolActivitiesTable, { planProtocolId: id })))));
    };
    return Protocol;
}(React.Component));
export default Protocol;
//# sourceMappingURL=Protocol.js.map
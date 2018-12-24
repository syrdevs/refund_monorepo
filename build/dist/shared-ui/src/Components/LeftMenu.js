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
import { Icon, Layout, Menu } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import * as i18n from 'i18next';
import React from 'react';
import { COLORS } from '../Styling/Typography';
import MultilanguageComponent from './MultilanguageComponent';
var SubMenu = Menu.SubMenu;
var LeftMenu = /** @class */ (function (_super) {
    __extends(LeftMenu, _super);
    function LeftMenu(props) {
        var _this = _super.call(this, props) || this;
        _this.onCollapse = function () {
            var newState = {
                collapsed: !_this.state.collapsed,
            };
            if (!_this.state.collapsed) {
                newState.currentlyExpandedRootNodes = [];
            }
            else {
                newState.currentlyExpandedRootNodes = _this.state.expandedRootNodes;
            }
            _this.setState(newState);
        };
        _this.handleMenuOnClick = function (param) {
            _this.goToLink(param.key);
        };
        _this.goToLink = function (href) {
            _this.props.goToLink(href);
        };
        _this.renderRootNode = function (rootNode) {
            var hasItems = rootNode.subItems.length > 0;
            if (!hasItems) {
                return (React.createElement(Menu.Item, { key: rootNode.hrefPrefix },
                    React.createElement(Icon, { type: rootNode.iconName }),
                    React.createElement("span", null, i18n.t(rootNode.translationKey))));
            }
            return (React.createElement(SubMenu, { key: rootNode.hrefPrefix, title: React.createElement("span", null,
                    React.createElement(Icon, { type: rootNode.iconName }),
                    React.createElement("span", null, i18n.t(rootNode.translationKey))) }, rootNode.subItems.map(function (subItem) {
                var href = LeftMenu.getHrefForSubItemNode(rootNode, subItem);
                return (React.createElement(Menu.Item, { key: href },
                    React.createElement("span", null, i18n.t(subItem.translationKey))));
            })));
        };
        _this.toggleNode = function (openKeys) {
            var newState = {
                currentlyExpandedRootNodes: __spread(openKeys),
            };
            if (!_this.state.collapsed) {
                newState.expandedRootNodes = __spread(openKeys);
            }
            _this.setState(newState);
        };
        _this.onSelect = function (param) {
            var newState = {
                selectedKeys: __spread(param.selectedKeys),
            };
            if (_this.state.collapsed) {
                newState.expandedRootNodes = _this.state.currentlyExpandedRootNodes;
            }
            _this.setState(newState);
        };
        _this.renderLeftMenuItems = function () {
            var itemsArr = [];
            var leftMenuItems = _this.props.leftMenuItems;
            leftMenuItems.forEach(function (rootNode) {
                itemsArr.push(_this.renderRootNode(rootNode));
            });
            return itemsArr;
        };
        LeftMenu.hrefItems = LeftMenu.getHrefsOfItems(props.leftMenuItems);
        var expandedRootNode = LeftMenu.extractExpandedRootNode(props.location);
        var selectedNode = LeftMenu.extractSelectedNode(props.location);
        _this.state = {
            expandedRootNodes: expandedRootNode ? [expandedRootNode] : [],
            currentlyExpandedRootNodes: expandedRootNode ? [expandedRootNode] : [],
            selectedKeys: selectedNode ? [selectedNode] : [],
            collapsed: false,
            location: props.location,
        };
        return _this;
    }
    LeftMenu.getDerivedStateFromProps = function (nextProps, prevState) {
        if (prevState.location === nextProps.location) {
            return null;
        }
        var expandedRootNode = LeftMenu.extractExpandedRootNode(nextProps.location);
        var selectedNode = LeftMenu.extractSelectedNode(nextProps.location);
        return {
            expandedRootNodes: expandedRootNode ? [expandedRootNode] : [],
            currentlyExpandedRootNodes: expandedRootNode ? [expandedRootNode] : [],
            selectedKeys: selectedNode ? [selectedNode] : [],
            location: nextProps.location,
        };
    };
    LeftMenu.prototype.render = function () {
        var menuElement = (React.createElement(Layout, { style: {
                minHeight: 'calc(100vh-70px)',
                borderTop: "4px solid " + COLORS.MAIN_BLUE,
                flexGrow: 0,
                flexShrink: 0,
            } },
            React.createElement(Sider, { collapsible: true, collapsed: this.state.collapsed, onCollapse: this.onCollapse, theme: "light", width: 300 },
                React.createElement(Menu, { mode: "inline", theme: "light", onOpenChange: this.toggleNode, onSelect: this.onSelect, onClick: this.handleMenuOnClick, openKeys: this.state.currentlyExpandedRootNodes, selectedKeys: this.state.selectedKeys }, this.renderLeftMenuItems()))));
        return menuElement;
    };
    LeftMenu.hrefItems = [];
    LeftMenu.getHrefForSubItemNode = function (rootNode, subItem) {
        return "" + rootNode.hrefPrefix + subItem.href;
    };
    LeftMenu.getHrefsOfItems = function (leftMenuItems) {
        var e_1, _a, e_2, _b;
        var hrefs = [];
        try {
            for (var leftMenuItems_1 = __values(leftMenuItems), leftMenuItems_1_1 = leftMenuItems_1.next(); !leftMenuItems_1_1.done; leftMenuItems_1_1 = leftMenuItems_1.next()) {
                var rootNode = leftMenuItems_1_1.value;
                if (rootNode.subItems.length > 0) {
                    try {
                        for (var _c = __values(rootNode.subItems), _d = _c.next(); !_d.done; _d = _c.next()) {
                            var subItem = _d.value;
                            var href = LeftMenu.getHrefForSubItemNode(rootNode, subItem);
                            hrefs.push({ rootNodeHref: rootNode.hrefPrefix, href: href });
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
                hrefs.push({
                    rootNodeHref: rootNode.hrefPrefix,
                    href: rootNode.hrefPrefix,
                });
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (leftMenuItems_1_1 && !leftMenuItems_1_1.done && (_a = leftMenuItems_1.return)) _a.call(leftMenuItems_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        hrefs.sort(function (a, b) {
            var aParts = a.href.split('/');
            var bParts = b.href.split('/');
            return bParts.length - aParts.length;
        });
        return hrefs;
    };
    LeftMenu.extractExpandedRootNode = function (location) {
        var e_3, _a;
        try {
            for (var _b = __values(LeftMenu.hrefItems), _c = _b.next(); !_c.done; _c = _b.next()) {
                var hrefsObj = _c.value;
                if (location.startsWith(hrefsObj.href)) {
                    return hrefsObj.rootNodeHref;
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return null;
    };
    LeftMenu.extractSelectedNode = function (location) {
        var e_4, _a;
        try {
            for (var _b = __values(LeftMenu.hrefItems), _c = _b.next(); !_c.done; _c = _b.next()) {
                var hrefsObj = _c.value;
                if (location.startsWith(hrefsObj.href)) {
                    return hrefsObj.href;
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return null;
    };
    return LeftMenu;
}(MultilanguageComponent));
export { LeftMenu };
//# sourceMappingURL=LeftMenu.js.map
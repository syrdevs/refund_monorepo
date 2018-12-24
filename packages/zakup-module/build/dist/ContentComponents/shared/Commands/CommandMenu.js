"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var antd_1 = require("antd");
var react_1 = __importDefault(require("react"));
exports.CommandMenu = function (props) { return (react_1.default.createElement(antd_1.Menu, { style: { boxShadow: '0 0 4px 0 #cecece' }, onClick: props.handleMenuClick }, props.items.map(function (i) { return (react_1.default.createElement(antd_1.Menu.Item, { disabled: props.disabled, key: i.id }, i.name)); }))); };
//# sourceMappingURL=CommandMenu.js.map
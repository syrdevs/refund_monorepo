"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var antd_1 = require("antd");
var react_1 = __importDefault(require("react"));
var CommandMenu_1 = require("./CommandMenu");
var CommandsList = function (props) { return (react_1.default.createElement(antd_1.Dropdown, { overlay: react_1.default.createElement(CommandMenu_1.CommandMenu, { disabled: props.disabled, handleMenuClick: props.handleMenuClick, items: props.items }) },
    react_1.default.createElement(antd_1.Button, { htmlType: "button", style: { marginLeft: 8 } },
        props.name,
        react_1.default.createElement(antd_1.Icon, { type: "down" })))); };
exports.default = CommandsList;
//# sourceMappingURL=CommandsList.js.map
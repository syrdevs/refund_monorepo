"use strict";
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
var react_1 = __importDefault(require("react"));
var ReactDOM = __importStar(require("react-dom"));
var App_1 = __importDefault(require("./App"));
var writeInDOM = process.env.REACT_APP_ENV === 'development';
if (writeInDOM) {
    ReactDOM.render(react_1.default.createElement(App_1.default, { appRoute: "" }), document.getElementById('root'));
}
exports.default = App_1.default;
var leftMenuItems_1 = require("./Data/leftMenuItems");
exports.LeftMenuItems = leftMenuItems_1.default;
//# sourceMappingURL=index.js.map
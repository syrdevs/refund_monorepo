"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
exports.NativeHistory = window.history;
exports.getHistory = function () {
    return utils_1.getAppData('history');
};
//# sourceMappingURL=history.js.map
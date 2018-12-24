"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var shared_ui_1 = require("@vitacore/shared-ui");
var moment_1 = __importDefault(require("moment"));
var APIClient_1 = __importDefault(require("./API/APIClient"));
exports.createApiClient = function () {
    // const useProd = process.env.NODE_ENV === 'production' || process.env.REACT_APP_ENV === 'production'
    // if (useProd) {
    // console.warn('Using production mode')
    //   return new APIClient()
    // }
    return new APIClient_1.default();
    // return new FakeAPIClient()
};
exports.emulateRequest = function (fn, timeout, message) {
    var delay = timeout;
    if (timeout < 0) {
        delay = Math.abs(timeout);
    }
    exports.requestStarted();
    setTimeout(function () {
        fn();
        exports.requestFinished(message);
    }, delay);
};
exports.requestStarted = function () {
    exports.callAppFunction('requestStarted');
};
exports.requestFinished = function (message) {
    exports.callAppFunction('requestFinished', message);
};
exports.getDateWithAppliedTimezone = function (date) {
    if (!date) {
        return date;
    }
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
};
exports.formatDate = function (date) {
    if (!date) {
        return '';
    }
    return date.toISOString().split('T')[0];
};
exports.convertStringIntoDate = function (dateStr) {
    return new Date(dateStr);
};
exports.selectInputParseAndFormat = function (data, valueGetterFn) {
    return {
        parse: function (value) {
            if (!Array.isArray(value)) {
                return value.value;
            }
            return value.map(valueGetterFn);
        },
        format: function (value) {
            if (!value) {
                return [];
            }
            return value.map(function (item) { return data.find(function (i) { return valueGetterFn(i) === item; }); }).filter(function (item) { return item; });
        },
    };
};
exports.transformDictionaryItemsToSelectInputOptions = function (dictItems) {
    return dictItems.map(function (item) { return ({
        value: item.id,
        label: item.name,
    }); });
};
exports.getUserLanguage = function () { return exports.callAppFunction('getUserLanguage'); };
exports.setUserLanguage = function (lng) {
    // i18next.changeLanguage(lng)
};
exports.isFalse = function (value) {
    if (typeof value === 'undefined') {
        return false;
    }
    return !value;
};
exports.isTrue = function (value) {
    if (typeof value === 'undefined') {
        return false;
    }
    return !!value;
};
var appFunctions = {};
exports.addToAppFunctions = function (name, cb) {
    appFunctions[name] = cb;
};
exports.getAppFunction = function (name) {
    return appFunctions[name];
};
exports.callAppFunction = function (name) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var fn = appFunctions[name];
    if (fn) {
        return fn.apply(void 0, __spread(args));
    }
    return null;
};
var appData = {};
exports.addToAppData = function (name, value) {
    appData[name] = value;
};
exports.getAppData = function (name) {
    return appData[name];
};
exports.getAppRoute = function () {
    var value = appData[shared_ui_1.APP_ROUTE_KEY];
    if (!value) {
        throw new Error('You must set APP_ROUTE first');
    }
    return value;
};
exports.isModuleDev = function () {
    return process.env.REACT_APP_ENV === 'development';
};
exports.isDisabledPreviousDate = function (current) { return moment_1.default().diff(current, 'days') >= 1; };
exports.isDisabledNextDate = function (current) { return moment_1.default().diff(current, 'days') < 1; };
exports.isDisabledPreviousTime = function (current) {
    var now = moment_1.default();
    return {
        disabledHours: function () {
            var hoursDiff = now.diff(current, 'hours') % 24;
            return Array.apply(null, { length: hoursDiff }).map(Number.call, Number);
        },
        disabledMinutes: function () {
            var minutesDiff = now.diff(current, 'minutes') % 60;
            return Array.apply(null, { length: minutesDiff }).map(Number.call, Number);
        },
        disabledSeconds: function () { return []; },
    };
};
exports.isDisabledNextTime = function (current) { return moment_1.default().diff(current, 'minutes') < 1; };
//# sourceMappingURL=utils.js.map
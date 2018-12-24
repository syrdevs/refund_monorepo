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
import { APP_ROUTE_KEY } from '@vitacore/shared-ui';
export var emulateRequest = function (fn, timeout, message) {
    var delay = timeout;
    if (timeout < 0) {
        delay = Math.abs(timeout);
    }
    requestStarted();
    setTimeout(function () {
        fn();
        requestFinished(message);
    }, delay);
};
export var requestStarted = function () {
    callAppFunction('requestStarted');
};
export var requestFinished = function (message) {
    callAppFunction('requestFinished', message);
};
export var getUserLanguage = function () { return callAppFunction('getUserLanguage'); };
export var setUserLanguage = function (lng) {
    // i18next.changeLanguage(lng)
};
var appFunctions = {};
export var addToAppFunctions = function (name, cb) {
    appFunctions[name] = cb;
};
export var getAppFunction = function (name) {
    return appFunctions[name];
};
export var callAppFunction = function (name) {
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
export var addToAppData = function (name, value) {
    appData[name] = value;
};
export var getAppData = function (name) {
    return appData[name];
};
export var getAppRoute = function () {
    var value = appData[APP_ROUTE_KEY];
    if (!value) {
        throw new Error('You must set APP_ROUTE first');
    }
    return value;
};
export var isFalse = function (value) {
    if (typeof value === 'undefined') {
        return false;
    }
    return !value;
};
export var isTrue = function (value) {
    if (typeof value === 'undefined') {
        return false;
    }
    return !!value;
};
export var isModuleDev = function () {
    return process.env.REACT_APP_ENV === 'development';
};
//# sourceMappingURL=utils.js.map
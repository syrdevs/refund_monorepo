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
import moment from 'moment';
import APIClient from './API/APIClient';
export var createApiClient = function () {
    // const useProd = process.env.NODE_ENV === 'production' || process.env.REACT_APP_ENV === 'production'
    // if (useProd) {
    // console.warn('Using production mode')
    //   return new APIClient()
    // }
    return new APIClient();
    // return new FakeAPIClient()
};
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
export var getDateWithAppliedTimezone = function (date) {
    if (!date) {
        return date;
    }
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
};
export var formatDate = function (date) {
    if (!date) {
        return '';
    }
    return date.toISOString().split('T')[0];
};
export var convertStringIntoDate = function (dateStr) {
    return new Date(dateStr);
};
export var selectInputParseAndFormat = function (data, valueGetterFn) {
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
export var transformDictionaryItemsToSelectInputOptions = function (dictItems) {
    return dictItems.map(function (item) { return ({
        value: item.id,
        label: item.name,
    }); });
};
export var getUserLanguage = function () { return callAppFunction('getUserLanguage'); };
export var setUserLanguage = function (lng) {
    // i18next.changeLanguage(lng)
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
export var isModuleDev = function () {
    return process.env.REACT_APP_ENV === 'development';
};
export var isDisabledPreviousDate = function (current) { return moment().diff(current, 'days') >= 1; };
export var isDisabledNextDate = function (current) { return moment().diff(current, 'days') < 1; };
export var isDisabledPreviousTime = function (current) {
    var now = moment();
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
export var isDisabledNextTime = function (current) { return moment().diff(current, 'minutes') < 1; };
//# sourceMappingURL=utils.js.map
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
import { LANGUAGE, REQUEST_FINISHED, REQUEST_STARTED } from '@vitacore/shared-ui';
import * as i18next from 'i18next';
import APIClient from './API/APIClient';
import store from './Redux/store';
export var createApiClient = function () {
    // const useProd = process.env.NODE_ENV === 'production' || process.env.REACT_APP_ENV === 'production'
    // if (useProd) {
    //   console.warn('Using production mode')
    return new APIClient();
    // }
    //
    // return new FakeAPIClient()
};
export var requestStarted = function () {
    store.dispatch({ type: REQUEST_STARTED });
};
export var requestFinished = function (message) {
    store.dispatch({ type: REQUEST_FINISHED, payload: message });
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
export var getUserLanguage = function () {
    var currentLng = localStorage.getItem(LANGUAGE);
    if (!currentLng) {
        currentLng = 'ru';
        localStorage.setItem(LANGUAGE, currentLng);
    }
    return currentLng;
};
var userLanguageChangeCBs = [];
export var addUserLanguageChangeCb = function (cb) {
    userLanguageChangeCBs.push(cb);
};
export var setUserLanguage = function (lng) {
    var e_1, _a;
    i18next.changeLanguage(lng);
    localStorage.setItem(LANGUAGE, lng);
    try {
        for (var userLanguageChangeCBs_1 = __values(userLanguageChangeCBs), userLanguageChangeCBs_1_1 = userLanguageChangeCBs_1.next(); !userLanguageChangeCBs_1_1.done; userLanguageChangeCBs_1_1 = userLanguageChangeCBs_1.next()) {
            var cb = userLanguageChangeCBs_1_1.value;
            cb(lng);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (userLanguageChangeCBs_1_1 && !userLanguageChangeCBs_1_1.done && (_a = userLanguageChangeCBs_1.return)) _a.call(userLanguageChangeCBs_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
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
//# sourceMappingURL=utils.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isModuleDev = exports.isTrue = exports.isFalse = exports.getAppRoute = exports.getAppData = exports.addToAppData = exports.callAppFunction = exports.getAppFunction = exports.addToAppFunctions = exports.setUserLanguage = exports.getUserLanguage = exports.requestFinished = exports.requestStarted = exports.emulateRequest = void 0;

var _sharedUi = require("@vitacore/shared-ui");

var emulateRequest = function emulateRequest(fn, timeout, message) {
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

exports.emulateRequest = emulateRequest;

var requestStarted = function requestStarted() {
  callAppFunction('requestStarted');
};

exports.requestStarted = requestStarted;

var requestFinished = function requestFinished(message) {
  callAppFunction('requestFinished', message);
};

exports.requestFinished = requestFinished;

var getUserLanguage = function getUserLanguage() {
  return callAppFunction('getUserLanguage');
};

exports.getUserLanguage = getUserLanguage;

var setUserLanguage = function setUserLanguage(lng) {// i18next.changeLanguage(lng)
};

exports.setUserLanguage = setUserLanguage;
var appFunctions = {};

var addToAppFunctions = function addToAppFunctions(name, cb) {
  appFunctions[name] = cb;
};

exports.addToAppFunctions = addToAppFunctions;

var getAppFunction = function getAppFunction(name) {
  return appFunctions[name];
};

exports.getAppFunction = getAppFunction;

var callAppFunction = function callAppFunction(name) {
  var fn = appFunctions[name];

  if (fn) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return fn.apply(void 0, args);
  }

  return null;
};

exports.callAppFunction = callAppFunction;
var appData = {};

var addToAppData = function addToAppData(name, value) {
  appData[name] = value;
};

exports.addToAppData = addToAppData;

var getAppData = function getAppData(name) {
  return appData[name];
};

exports.getAppData = getAppData;

var getAppRoute = function getAppRoute() {
  var value = appData[_sharedUi.APP_ROUTE_KEY];

  if (!value) {
    throw new Error('You must set APP_ROUTE first');
  }

  return value;
};

exports.getAppRoute = getAppRoute;

var isFalse = function isFalse(value) {
  if (typeof value === 'undefined') {
    return false;
  }

  return !value;
};

exports.isFalse = isFalse;

var isTrue = function isTrue(value) {
  if (typeof value === 'undefined') {
    return false;
  }

  return !!value;
};

exports.isTrue = isTrue;

var isModuleDev = function isModuleDev() {
  return process.env.REACT_APP_ENV === 'development';
};

exports.isModuleDev = isModuleDev;
//# sourceMappingURL=utils.js.map
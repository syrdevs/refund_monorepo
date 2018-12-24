"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dictionariesDataStateConstants_1 = require("../Constants/dictionariesDataStateConstants");
function dictFetching(dictNames) {
    return {
        type: dictionariesDataStateConstants_1.DICTIONARIES_FETCH_REQUESTED,
        payload: dictNames,
    };
}
exports.dictFetching = dictFetching;
function dictFetchingFinished() {
    return {
        type: dictionariesDataStateConstants_1.DICTIONARIES_FETCH_FINISHED,
        payload: undefined,
    };
}
exports.dictFetchingFinished = dictFetchingFinished;
function dictFetchSuccess(dictName, dictItems) {
    return {
        type: dictionariesDataStateConstants_1.DICTIONARIES_FETCH_SUCCESS_BASE + "." + dictName,
        payload: dictItems,
    };
}
exports.dictFetchSuccess = dictFetchSuccess;
//# sourceMappingURL=dictionariesDataStateActions.js.map
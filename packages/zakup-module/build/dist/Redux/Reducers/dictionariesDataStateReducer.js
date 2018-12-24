"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var dictionariesList_1 = require("../../Infrastructure/dictionariesList");
var dictionariesDataStateConstants_1 = require("../Constants/dictionariesDataStateConstants");
var defaultState = dictionariesList_1.dictionariesList.reduce(function (prevValue, currentValue) {
    prevValue[currentValue.name] = [];
    return prevValue;
}, { dictNamesFetching: [] });
var setOfReducers = dictionariesList_1.dictionariesList.reduce(function (prevValue, currentValue) {
    prevValue[currentValue.name] = function (state, action) {
        if (state === void 0) { state = defaultState[currentValue.name]; }
        var successCaseName = dictionariesDataStateConstants_1.DICTIONARIES_FETCH_SUCCESS_BASE + "." + currentValue.name;
        switch (action.type) {
            case successCaseName: {
                return action.payload;
            }
        }
        return state;
    };
    return prevValue;
}, {});
setOfReducers['dictNamesFetching'] = function (state, action) {
    if (state === void 0) { state = defaultState.dictNamesFetching; }
    switch (action.type) {
        case dictionariesDataStateConstants_1.DICTIONARIES_FETCH_REQUESTED: {
            return action.payload;
        }
        case dictionariesDataStateConstants_1.DICTIONARIES_FETCH_FINISHED: {
            return [];
        }
    }
    return state;
};
var dictionariesDataStateReducer = redux_1.combineReducers(setOfReducers);
exports.default = dictionariesDataStateReducer;
//# sourceMappingURL=dictionariesDataStateReducer.js.map
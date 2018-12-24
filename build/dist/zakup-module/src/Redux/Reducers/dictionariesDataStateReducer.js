import { combineReducers } from 'redux';
import { dictionariesList } from '../../Infrastructure/dictionariesList';
import { DICTIONARIES_FETCH_FINISHED, DICTIONARIES_FETCH_REQUESTED, DICTIONARIES_FETCH_SUCCESS_BASE, } from '../Constants/dictionariesDataStateConstants';
var defaultState = dictionariesList.reduce(function (prevValue, currentValue) {
    prevValue[currentValue.name] = [];
    return prevValue;
}, { dictNamesFetching: [] });
var setOfReducers = dictionariesList.reduce(function (prevValue, currentValue) {
    prevValue[currentValue.name] = function (state, action) {
        if (state === void 0) { state = defaultState[currentValue.name]; }
        var successCaseName = DICTIONARIES_FETCH_SUCCESS_BASE + "." + currentValue.name;
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
        case DICTIONARIES_FETCH_REQUESTED: {
            return action.payload;
        }
        case DICTIONARIES_FETCH_FINISHED: {
            return [];
        }
    }
    return state;
};
var dictionariesDataStateReducer = combineReducers(setOfReducers);
export default dictionariesDataStateReducer;
//# sourceMappingURL=dictionariesDataStateReducer.js.map
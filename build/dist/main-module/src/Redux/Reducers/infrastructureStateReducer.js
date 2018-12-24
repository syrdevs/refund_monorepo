import { REQUEST_FINISHED, REQUEST_STARTED } from '@vitacore/shared-ui';
import { combineReducers } from 'redux';
import { CLEAR_LOADER_MESSAGE } from '../Constants/infrastructureStateConstants';
var defaultState = {
    numberOfRequestsInProgress: 0,
    loaderResponseMessage: null,
};
var infrastructureStateReducer = combineReducers({
    numberOfRequestsInProgress: function (state, action) {
        if (state === void 0) { state = defaultState.numberOfRequestsInProgress; }
        switch (action.type) {
            case REQUEST_STARTED: {
                return state + 1;
            }
            case REQUEST_FINISHED: {
                return Math.max(state - 1, 0);
            }
        }
        return state;
    },
    loaderResponseMessage: function (state, action) {
        if (state === void 0) { state = defaultState.loaderResponseMessage; }
        switch (action.type) {
            case REQUEST_FINISHED: {
                return action.payload || state;
            }
            case CLEAR_LOADER_MESSAGE: {
                return null;
            }
        }
        return state;
    },
});
export default infrastructureStateReducer;
//# sourceMappingURL=infrastructureStateReducer.js.map
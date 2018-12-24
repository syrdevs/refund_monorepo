import { combineReducers } from 'redux';
import { CHECK_AUTH_TOKEN_FAILED, CHECK_AUTH_TOKEN_IN_PROGRESS, CHECK_AUTH_TOKEN_SUCCESS, LOGIN_FAILED, LOGIN_REQUESTED, LOGIN_SUCCESS, LOGOUT_SUCCESS, } from '../Constants/userStateConstants';
var defaultState = {
    isAuthenticated: false,
    loginInProgress: false,
    user: {
        userName: '',
        token: '',
    },
    loginErrorMessage: '',
    tokenCheckFailed: false,
};
var userStateReducer = combineReducers({
    isAuthenticated: function (state, action) {
        if (state === void 0) { state = defaultState.isAuthenticated; }
        switch (action.type) {
            case CHECK_AUTH_TOKEN_IN_PROGRESS:
            case LOGIN_REQUESTED:
            case LOGOUT_SUCCESS:
            case LOGIN_FAILED:
            case CHECK_AUTH_TOKEN_FAILED: {
                return false;
            }
            case LOGIN_SUCCESS:
            case CHECK_AUTH_TOKEN_SUCCESS: {
                return true;
            }
            default: {
                return state;
            }
        }
    },
    loginInProgress: function (state, action) {
        if (state === void 0) { state = defaultState.loginInProgress; }
        switch (action.type) {
            case CHECK_AUTH_TOKEN_IN_PROGRESS:
            case LOGIN_REQUESTED: {
                return true;
            }
            case LOGIN_SUCCESS:
            case LOGOUT_SUCCESS:
            case LOGIN_FAILED:
            case CHECK_AUTH_TOKEN_FAILED:
            case CHECK_AUTH_TOKEN_SUCCESS: {
                return false;
            }
            default: {
                return state;
            }
        }
    },
    loginErrorMessage: function (state, action) {
        if (state === void 0) { state = defaultState.loginErrorMessage; }
        switch (action.type) {
            case CHECK_AUTH_TOKEN_IN_PROGRESS:
            case LOGIN_REQUESTED:
            case LOGOUT_SUCCESS:
            case LOGIN_SUCCESS:
            case CHECK_AUTH_TOKEN_SUCCESS: {
                return '';
            }
            case LOGIN_FAILED:
            case CHECK_AUTH_TOKEN_FAILED: {
                return action.payload;
            }
            default: {
                return state;
            }
        }
    },
    user: function (state, action) {
        if (state === void 0) { state = defaultState.user; }
        switch (action.type) {
            case CHECK_AUTH_TOKEN_IN_PROGRESS:
            case LOGIN_REQUESTED:
            case LOGOUT_SUCCESS:
            case LOGIN_FAILED:
            case CHECK_AUTH_TOKEN_FAILED: {
                return defaultState.user;
            }
            case LOGIN_SUCCESS:
            case CHECK_AUTH_TOKEN_SUCCESS: {
                return action.payload;
            }
            default: {
                return state;
            }
        }
    },
    tokenCheckFailed: function (state, action) {
        if (state === void 0) { state = defaultState.tokenCheckFailed; }
        switch (action.type) {
            case CHECK_AUTH_TOKEN_FAILED: {
                return true;
            }
            case LOGIN_SUCCESS:
            case CHECK_AUTH_TOKEN_IN_PROGRESS:
            case LOGIN_REQUESTED:
            case LOGOUT_SUCCESS:
            case LOGIN_FAILED:
            case CHECK_AUTH_TOKEN_SUCCESS: {
                return false;
            }
            default: {
                return state;
            }
        }
    },
});
export default userStateReducer;
//# sourceMappingURL=userStateReducer.js.map
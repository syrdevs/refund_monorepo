import { CHECK_AUTH_TOKEN_IN_PROGRESS, CHECK_AUTH_TOKEN_SUCCESS, LOGIN_REQUESTED, LOGIN_SUCCESS, } from '../Constants/userStateConstants';
export function login(userName, password, redirectTo) {
    return {
        type: LOGIN_REQUESTED,
        payload: {
            userName: userName,
            password: password,
            redirectTo: redirectTo,
        },
    };
}
export function loginSuccess(user) {
    return {
        type: LOGIN_SUCCESS,
        payload: user,
    };
}
export function checkAuthTokenSuccess(user) {
    return {
        type: CHECK_AUTH_TOKEN_SUCCESS,
        payload: user,
    };
}
export function checkAuthInProgress() {
    return {
        type: CHECK_AUTH_TOKEN_IN_PROGRESS,
        payload: {},
    };
}
//# sourceMappingURL=userStateActions.js.map
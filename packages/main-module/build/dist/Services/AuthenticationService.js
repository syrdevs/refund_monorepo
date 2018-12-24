import { AUTH_TOKEN } from '@vitacore/shared-ui';
import { CHECK_AUTH_TOKEN, LOGOUT } from '../Redux/Constants/userStateConstants';
import store from '../Redux/store';
export function isUserAuthenticated(checkTokenOnServer) {
    if (checkTokenOnServer === void 0) { checkTokenOnServer = true; }
    var isAuthenticated = store.getState().userState.isAuthenticated;
    if (isAuthenticated) {
        return Promise.resolve(true);
    }
    var authToken = getAuthToken();
    if (!authToken) {
        return Promise.resolve(false);
    }
    if (!checkTokenOnServer) {
        return Promise.resolve(false);
    }
    return new Promise(function (resolve) {
        store.dispatch({ type: CHECK_AUTH_TOKEN, payload: { authToken: authToken, promiseResolve: resolve } });
    });
}
export function isUserAuthenticatedSimple() {
    return store.getState().userState.isAuthenticated;
}
export function getAuthToken() {
    return localStorage.getItem(AUTH_TOKEN);
}
export function logout() {
    store.dispatch({ type: LOGOUT });
}
//# sourceMappingURL=AuthenticationService.js.map
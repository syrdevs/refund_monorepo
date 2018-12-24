var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { AUTH_TOKEN } from '@vitacore/shared-ui';
import { message } from 'antd';
import { call, put } from 'redux-saga/effects';
import { getAuthToken } from '../../../Services/AuthenticationService';
import { createApiClient } from '../../../utils';
import { checkAuthInProgress, checkAuthTokenSuccess, loginSuccess } from '../../Actions/userStateActions';
import { CHECK_AUTH_TOKEN_FAILED, LOGIN_FAILED, LOGOUT_SUCCESS } from '../../Constants/userStateConstants';
import history from '../../history';
export function tryLogin(action) {
    var user, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 8]);
                return [4 /*yield*/, call(createApiClient().requestLogin, action.payload.userName, action.payload.password)];
            case 1:
                user = _a.sent();
                if (!user.data) return [3 /*break*/, 3];
                return [4 /*yield*/, put(loginSuccess(user.data))];
            case 2:
                _a.sent();
                localStorage.setItem(AUTH_TOKEN, user.data.token);
                history.push(action.payload.redirectTo || '/');
                return [3 /*break*/, 5];
            case 3:
                localStorage.removeItem(AUTH_TOKEN);
                return [4 /*yield*/, put({ type: LOGIN_FAILED, payload: 'Не удалось авторизоваться на сайте' })];
            case 4:
                _a.sent();
                message.error('Не удалось авторизоваться на сайте');
                _a.label = 5;
            case 5: return [3 /*break*/, 8];
            case 6:
                e_1 = _a.sent();
                console.log(e_1);
                return [4 /*yield*/, put({ type: LOGIN_FAILED, payload: 'Не удалось авторизоваться на сайте' })];
            case 7:
                _a.sent();
                message.error('Не удалось авторизоваться на сайте');
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}
export function checkAuthToken(action) {
    var user, userData, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 9]);
                return [4 /*yield*/, put(checkAuthInProgress())];
            case 1:
                _a.sent();
                return [4 /*yield*/, call(createApiClient().checkAuthToken)];
            case 2:
                user = _a.sent();
                if (!user.data) return [3 /*break*/, 4];
                userData = {
                    userName: user.data.userName,
                    token: getAuthToken(),
                };
                return [4 /*yield*/, put(checkAuthTokenSuccess(userData))];
            case 3:
                _a.sent();
                action.payload.promiseResolve(true);
                return [3 /*break*/, 6];
            case 4:
                localStorage.removeItem(AUTH_TOKEN);
                return [4 /*yield*/, put({ type: CHECK_AUTH_TOKEN_FAILED, payload: 'Не удалось авторизоваться на сайте' })];
            case 5:
                _a.sent();
                action.payload.promiseResolve(false);
                _a.label = 6;
            case 6: return [3 /*break*/, 9];
            case 7:
                e_2 = _a.sent();
                localStorage.removeItem(AUTH_TOKEN);
                return [4 /*yield*/, put({ type: CHECK_AUTH_TOKEN_FAILED, payload: 'Не удалось авторизоваться на сайте' })];
            case 8:
                _a.sent();
                action.payload.promiseResolve(false);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}
export function logout() {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, , 2, 4]);
                return [4 /*yield*/, call(createApiClient().logout)];
            case 1:
                _a.sent();
                return [3 /*break*/, 4];
            case 2:
                localStorage.removeItem(AUTH_TOKEN);
                return [4 /*yield*/, put({ type: LOGOUT_SUCCESS })];
            case 3:
                _a.sent();
                history.push('/login');
                return [7 /*endfinally*/];
            case 4: return [2 /*return*/];
        }
    });
}
//# sourceMappingURL=workerSagas.js.map
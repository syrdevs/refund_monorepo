import { getAuthToken } from '../Services/AuthenticationService';
import { emulateRequest } from '../utils';
var FakeAPIClient = /** @class */ (function () {
    function FakeAPIClient() {
    }
    FakeAPIClient.prototype.requestLogin = function (userName, password) {
        return new Promise(function (resolve) {
            emulateRequest(function () {
                if (userName === 'admin' && password === '123456') {
                    resolve({ data: { userName: 'TEST', token: 'my-token' } });
                }
                else {
                    resolve({ data: null });
                }
            }, 400);
        });
    };
    FakeAPIClient.prototype.checkAuthToken = function () {
        return new Promise(function (resolve, reject) {
            emulateRequest(function () {
                if (getAuthToken() === 'my-token') {
                    resolve({ data: { userName: 'TEST' } });
                }
                else {
                    reject(new Error('Authentication exception'));
                }
            }, 400);
        });
    };
    FakeAPIClient.prototype.logout = function () {
        return new Promise(function (resolve, reject) {
            emulateRequest(function () {
                if (Math.random() > 0.5) {
                    resolve();
                }
                else {
                    reject(new Error('Logout exception'));
                }
            }, 1200);
        });
    };
    return FakeAPIClient;
}());
export default FakeAPIClient;
//# sourceMappingURL=FakeAPIClient.js.map
import { getAppData } from '../utils';
export var NativeHistory = window.history;
export var getHistory = function () {
    return getAppData('history');
};
//# sourceMappingURL=history.js.map
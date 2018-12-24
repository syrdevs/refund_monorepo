var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
import { combineReducers } from 'redux';
import { ADD_NEW_MODAL, CLOSE_RECENT_MODAL } from '../Constants/infrastructureStateConstants';
var defaultState = {
    modals: [],
};
var infrastructureStateReducer = combineReducers({
    modals: function (state, action) {
        if (state === void 0) { state = defaultState.modals; }
        switch (action.type) {
            case ADD_NEW_MODAL: {
                return __spread(state, [action.payload]);
            }
            case CLOSE_RECENT_MODAL: {
                return state.length > 0 ? state.slice(0, Math.max(state.length - action.payload, 0)) : state;
            }
        }
        return state;
    },
});
export default infrastructureStateReducer;
//# sourceMappingURL=infrastructureStateReducer.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var connected_react_router_1 = require("connected-react-router");
var redux_1 = require("redux");
// import logger from 'redux-logger'
var redux_saga_1 = __importDefault(require("redux-saga"));
var businessDataStateReducer_1 = __importDefault(require("./Reducers/businessDataStateReducer"));
var dictionariesDataStateReducer_1 = __importDefault(require("./Reducers/dictionariesDataStateReducer"));
var infrastructureStateReducer_1 = __importDefault(require("./Reducers/infrastructureStateReducer"));
var rootSaga_1 = __importDefault(require("./Saga/rootSaga"));
var store = null;
exports.initStore = function (history) {
    var sagaMiddleware = redux_saga_1.default();
    store = redux_1.createStore(redux_1.combineReducers({
        router: connected_react_router_1.connectRouter(history),
        infrastructureState: infrastructureStateReducer_1.default,
        businessDataState: businessDataStateReducer_1.default,
        dictionariesDataState: dictionariesDataStateReducer_1.default,
    }), redux_1.applyMiddleware(connected_react_router_1.routerMiddleware(history), sagaMiddleware));
    sagaMiddleware.run(rootSaga_1.default);
};
exports.getStore = function () {
    return store;
};
//# sourceMappingURL=store.js.map
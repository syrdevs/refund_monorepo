import { connectRouter, routerMiddleware } from 'connected-react-router';
import { applyMiddleware, combineReducers, createStore } from 'redux';
// import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga';
import businessDataStateReducer from './Reducers/businessDataStateReducer';
import dictionariesDataStateReducer from './Reducers/dictionariesDataStateReducer';
import infrastructureStateReducer from './Reducers/infrastructureStateReducer';
import rootSaga from './Saga/rootSaga';
var store = null;
export var initStore = function (history) {
    var sagaMiddleware = createSagaMiddleware();
    store = createStore(combineReducers({
        router: connectRouter(history),
        infrastructureState: infrastructureStateReducer,
        businessDataState: businessDataStateReducer,
        dictionariesDataState: dictionariesDataStateReducer,
    }), applyMiddleware(routerMiddleware(history), sagaMiddleware));
    sagaMiddleware.run(rootSaga);
};
export var getStore = function () {
    return store;
};
//# sourceMappingURL=store.js.map
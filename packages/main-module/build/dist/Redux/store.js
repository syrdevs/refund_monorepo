import { connectRouter, routerMiddleware } from 'connected-react-router';
import { applyMiddleware, combineReducers, createStore } from 'redux';
// import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga';
import history from './history';
import infrastructureStateReducer from './Reducers/infrastructureStateReducer';
import userStateReducer from './Reducers/userStateReducer';
import rootSaga from './Saga/rootSaga';
var sagaMiddleware = createSagaMiddleware();
export var store = createStore(combineReducers({
    router: connectRouter(history),
    userState: userStateReducer,
    infrastructureState: infrastructureStateReducer,
}), applyMiddleware(routerMiddleware(history), sagaMiddleware));
sagaMiddleware.run(rootSaga);
export default store;
//# sourceMappingURL=store.js.map
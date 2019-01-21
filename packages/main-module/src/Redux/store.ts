import { connectRouter, routerMiddleware } from 'connected-react-router'
import { applyMiddleware, combineReducers, createStore, Store } from 'redux'
// import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import history from './history'
import infrastructureStateReducer from './Reducers/infrastructureStateReducer'
import userStateReducer from './Reducers/userStateReducer'
import rootSaga from './Saga/rootSaga'
import { default as State } from './StateModels/State'

const sagaMiddleware = createSagaMiddleware()

export const store: Store<State> = createStore(
  combineReducers({
    router: connectRouter(history),
    userState: userStateReducer,
    infrastructureState: infrastructureStateReducer,
  }),
  applyMiddleware(routerMiddleware(history), sagaMiddleware)
) as Store<State>

sagaMiddleware.run(rootSaga)

export default store

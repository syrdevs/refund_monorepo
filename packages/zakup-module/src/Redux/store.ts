import { connectRouter, routerMiddleware } from 'connected-react-router'
import { History } from 'history'
import { applyMiddleware, combineReducers, createStore, Store } from 'redux'
// import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import businessDataStateReducer from './Reducers/businessDataStateReducer'
import dictionariesDataStateReducer from './Reducers/dictionariesDataStateReducer'
import infrastructureStateReducer from './Reducers/infrastructureStateReducer'
import rootSaga from './Saga/rootSaga'
import { State } from './StateModels'

let store: Store<State> | null = null
export const initStore = (history: History) => {
  const sagaMiddleware = createSagaMiddleware()

  store = createStore(
    combineReducers({
      router: connectRouter(history),
      infrastructureState: infrastructureStateReducer,
      businessDataState: businessDataStateReducer,
      dictionariesDataState: dictionariesDataStateReducer,
    }),
    applyMiddleware(routerMiddleware(history), sagaMiddleware)
  ) as Store<State>

  sagaMiddleware.run(rootSaga)
}

export const getStore = () => {
  return store as Store<State>
}

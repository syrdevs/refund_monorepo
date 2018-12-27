import "babel-polyfill";
import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { put, call, takeEvery, fork, all } from "redux-saga/effects";
import React, { Suspense, lazy } from "react";
import models from "./model.config";
import reducer from "./reducer";

let sagaMiddlewareWatcher = [];
let combineReducersData = {};
models.forEach((model) => {

  Object.keys(model.effects).forEach((effectItemKey) => {
    sagaMiddlewareWatcher.push(function* () {

      yield takeEvery(model.namespace + "/" + effectItemKey, function* (payload) {

        yield model.effects[effectItemKey](payload, {
          call: function* (fn, payload) {
            const result = yield call(fn, payload);
            payload.callback(result);
            return result;
          },
          put: function* (action) {
            yield put({
              ...action,
              type: model.namespace + "/" + action.type
            });
          }
        });

      });
    });
  });

  combineReducersData[model.namespace] = (state = model.state, action) => {
    let actionType = action.type.replace(model.namespace + "/", "");
    if (model.reducers[actionType]) {
      model.state = model.reducers[actionType](state, action);
    }
    return model.state;
  };
});


const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  combineReducers({ ...combineReducersData, reducer }),
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(function* () {
  yield all(sagaMiddlewareWatcher.map(fork));
});


export default {
  ...store,
  _dispatch: (fn) => {
    return new Promise((resolve, reject) => {
      store.dispatch({
        ...fn,
        callback: (result) => {
          if (result.error) {
            reject(result);
          } else {
            resolve(result);
          }
        }
      });
    });
  }
};
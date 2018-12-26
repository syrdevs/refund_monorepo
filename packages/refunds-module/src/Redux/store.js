import "babel-polyfill";
import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { put, call, takeEvery, fork, all } from "redux-saga/effects";
import React, { Suspense, lazy } from "react";
import models from "./model.config";

let sagaMiddlewareWatcher = [];
let combineReducersData = {};
models.forEach((model) => {

  Object.keys(model.effects).forEach((effectItemKey) => {
    sagaMiddlewareWatcher.push(function* () {
      yield takeEvery(model.namespace + "/" + effectItemKey, function* (payload) {

        yield model.effects[effectItemKey](payload, {
          call,
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
  combineReducers(combineReducersData),
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(function* () {
  yield all(sagaMiddlewareWatcher.map(fork));
});


export default store;
import "babel-polyfill";
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
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

      yield takeEvery(model.namespace + "/" + effectItemKey, function* (payloadCb) {

        yield model.effects[effectItemKey](payloadCb, {
          call: function* (fn, payload) {

            // if (payloadCb.isEffect) {
            //   yield put({
            //     type: effectItemKey + "/REQUESTED"
            //   });
            // }

            const result = yield call(fn, payload);

            payloadCb.callback(result);

            return result;
          },
          put: function* (action) {
            yield put({
              ...action,
              type: model.namespace + "/" + action.type
            });
            payloadCb.callback({});
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


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  combineReducers({ ...combineReducersData }),
  composeEnhancers(applyMiddleware(sagaMiddleware))
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

      //store.dispatch();
    });
  }
};
import { all, call, fork, takeEvery } from "redux-saga/effects";

function* watchSearchForCash() {
  yield takeEvery("watchSearchForCash", () => {
    console.log("watchSearchForCash");
  });
}

function* watchBootlegging() {
  yield takeEvery("watchBootlegging", () => {
    console.log("watchBootlegging");
  });
}

function* watchGraffiti() {
  yield takeEvery("watchGraffiti", () => {
    console.log("watchGraffiti");
  });
}


export default function* rootSaga() {
  yield all([
    fork(watchSearchForCash),
    fork(watchBootlegging),
    fork(watchGraffiti)
  ]);
}
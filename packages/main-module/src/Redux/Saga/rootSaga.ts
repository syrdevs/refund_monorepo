import userStateSagas from './userState'

export default function* rootSaga() {
  yield userStateSagas()
}

import businessDataStateSagas from './businessDataState'

export default function* rootSaga() {
  yield businessDataStateSagas()
}

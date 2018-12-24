import { all } from 'redux-saga/effects'
import { checkAuthTokenSaga, loginSaga, logoutSaga } from './initializationSagas'

export default function* userStateSagas() {
  yield all([loginSaga(), checkAuthTokenSaga(), logoutSaga()])
}

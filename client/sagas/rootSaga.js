import { all } from 'redux-saga/effects'

import authSagas from './authSagas'
import authenticatedResourceSagas from './authenticatedResourceSagas'


export default function* rootSaga() {
  yield all([
    authSagas(),
    authenticatedResourceSagas()
  ])
}


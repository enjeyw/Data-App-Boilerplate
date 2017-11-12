import { take, fork, put, takeEvery, call, all, cancelled, cancel, race} from 'redux-saga/effects'

import {
  RESOURCE_REQUEST,
  RESOURCE_SUCCESS,
  RESOURCE_FAILURE
} from '../reducers/authenticedResourceReducer';

import { requestAuthenticatedResourceAPI } from '../api/authenticatedResourceApi'

// Load Authenticated Resource Saga
function* loadResource() {
  try {
    const resourceRequestResult = yield call(requestAuthenticatedResourceAPI);
    yield put({type: RESOURCE_SUCCESS, resourceRequestResult});
  } catch (error) {
    yield put({type: RESOURCE_FAILURE, error: error.statusText})
  }
}

function* watchLoadResourceRequest() {
  yield takeEvery(RESOURCE_REQUEST, loadResource);
}



export default function* authenticatedResourceSagas() {
  yield all([
    watchLoadResourceRequest()
  ])
}
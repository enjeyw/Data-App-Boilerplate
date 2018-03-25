import { call, fork, put, take, all, cancelled, cancel, takeEvery } from 'redux-saga/effects';

import { lock, requestApiToken, refreshApiToken, registerAPI, storeToken, getToken, removeToken } from '../api/authApi'

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  loginFailure,
  loginSuccess,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  registerSuccess,
  registerFailure
} from '../reducers/authReducer';

export function* loginFlow() {
  var reauth = yield call(refreshToken);
  while (true) {
    if (!(reauth.auth_token)) {
      const payload = yield take(LOGIN_REQUEST);
      var task = yield fork(authorise, payload);
    }
    const action = yield take([LOGOUT, LOGIN_FAILURE]);
    if (action.type === LOGOUT && !(typeof task === 'undefined')) {
      yield cancel(task);
    }
    yield call(removeToken)
  }
}

function* authorise( {username, password} ) {
  try {
    yield call(requestToken, username, password);
  } catch (error) {
    yield put(loginFailure(error));
  }
}

function* requestToken(username, password) {
  try {
    const token_request = yield call(requestApiToken, username, password);
    yield put(
      {type: LOGIN_SUCCESS,
        token: token_request.auth_token
      });
    yield call(storeToken, token_request.auth_token );
    return token_request
  } catch(error) {
    yield put({type: LOGIN_FAILURE, error: error.statusText})
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}

function* refreshToken() {
  try {
    const token_request = yield call(refreshApiToken);
    if (token_request.auth_token) {
      yield put({type: LOGIN_SUCCESS,token: token_request.auth_token});
      yield call(storeToken, token_request.auth_token );
    }
    return token_request
  } catch(error) {
    yield put({type: LOGOUT});
    yield call(removeToken);
    return error
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}



// Create Account Saga
function* register({ username, password }) {
  try {
    const registered_account = yield call(registerAPI, username, password);
    yield put({type: REGISTER_SUCCESS, registered_account});
    yield put({type: LOGIN_REQUEST, username: username, password: password});
  } catch (error) {
    yield put({type: REGISTER_FAILURE, error: error.statusText})
  }
}

function* watchRegisteRequest() {
  yield takeEvery(REGISTER_REQUEST, register);
}


export default function* authSagas() {
  yield all([
    loginFlow(),
    watchRegisteRequest()
  ])
}
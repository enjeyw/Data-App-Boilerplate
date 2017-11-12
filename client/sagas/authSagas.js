import { call, fork, put, take, all, cancelled, cancel } from 'redux-saga/effects';

import { lock, requestApiToken, refreshApiToken, storeToken, getToken, removeToken } from '../api/authApi'

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  loginFailure,
  loginSuccess,
} from '../reducers/authReducer';

export function* loginFlow() {
  var reauth = yield call(refreshToken);
  while (true) {
    if (!(reauth.token)) {
      yield take(LOGIN_REQUEST);
      var task = yield fork(authorise);
    }
    const action = yield take([LOGOUT, LOGIN_FAILURE]);
    if (action.type === LOGOUT && !(typeof task === 'undefined')) {
      yield cancel(task);
    }
    yield call(removeToken)
  }
}

function* refreshToken() {
  try {
    const token_request = yield call(refreshApiToken);
    if (token_request.token) {
      yield put({type: LOGIN_SUCCESS, token: token_request.token});
      yield call(storeToken, token_request.token );
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

function* requestToken(auth0_accessToken) {
  try {
    const token_request = yield call(requestApiToken, auth0_accessToken);
    yield put({type: LOGIN_SUCCESS, token: token_request.token});
    yield call(storeToken, token_request.token );
    return token_request
  } catch(error) {
    yield put({type: LOGIN_FAILURE, error: error.statusText})
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}


export function* authorise() {

  const showLock = () =>
    new Promise((resolve, reject) => {
      lock.on('hide', () => reject('Lock closed'));

      lock.on('authenticated', (authResult) => {
        lock.hide();
        resolve({idToken: authResult.accessToken });
      });

      lock.on('unrecoverable_error', (error) => {
        lock.hide();
        reject(error);
      });

      lock.show();
    });

  try {
    const { idToken } = yield call(showLock);
    yield call(requestToken, idToken);
  } catch (error) {
    yield put(loginFailure(error));
  }
}

export default function* authSagas() {
  yield all([
    loginFlow()
  ])
}
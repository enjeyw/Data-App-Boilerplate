
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export const initialState = {
  isLoggingIn: false,
  token: null,
  error: null
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {...state, isLoggingIn: true};
    case LOGIN_SUCCESS:
      return {...state, isLoggingIn: false, token: action.token};
    case LOGIN_FAILURE:
      return {...state, isLoggingIn: false, token: null, error: action.error || 'unknown error'};
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export const loginRequest = () => (
  {
    type: LOGIN_REQUEST
  }
);

export const loginSuccess = (idToken) => (
  {
    type: LOGIN_SUCCESS,
    idToken
  }
);

export const loginFailure = error => (
  {
    type: LOGIN_FAILURE,
    error
  }
);

export const logout = () => (
  {
    type: LOGOUT
  }
);

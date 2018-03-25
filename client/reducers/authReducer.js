
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const REGISTER_INACTIVE = 'REGISTER_INACTIVE';

const initialLoginState = {
  isLoggingIn: false,
  token: null,
  error: null
};

export const login = (state = initialLoginState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {...state, isLoggingIn: true};
    case LOGIN_SUCCESS:
      return {...state, isLoggingIn: false, token: action.token};
    case LOGIN_FAILURE:
      return {...state, isLoggingIn: false, token: null, error: action.error || 'unknown error'};
    case LOGOUT:
      return initialLoginState;
    default:
      return state;
  }
};

const initialRegisterState = {
  isRegistering: false,
  registerSuccess: false,
  error: null
};

export const register = (state = initialRegisterState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {...state, isRegistering: true};
    case REGISTER_SUCCESS:
      return {...state, isRegistering: false, registerSuccess: true};
    case REGISTER_FAILURE:
      return {...state, isLoggingIn: false, registerSuccess: false, error: action.error || 'unknown error'};
    case REGISTER_INACTIVE:
      return initialRegisterState;
    default:
      return state;
  }
};


// ACTIONS

export const loginRequest = ( {username, password}) => (
  {
    type: LOGIN_REQUEST,
    username,
    password
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


export const registerRequest = ( {username, password}) => (
  {
    type: REGISTER_REQUEST,
    username,
    password
  }
);

export const registerSuccess = () => (
  {
    type: LOGIN_SUCCESS
  }
);

export const registerFailure = error => (
  {
    type: REGISTER_FAILURE,
    error
  }
);

export const deactivateRegister = () => (
  {
    type: REGISTER_INACTIVE
  }
);

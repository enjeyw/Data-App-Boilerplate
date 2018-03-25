import { combineReducers } from 'redux';

import { login, register } from './authReducer'
import { authenticatedResourceData } from './authenticedResourceReducer'

const rootReducer = combineReducers({
  login,
  register,
  authenticatedResourceData
});

export default rootReducer;
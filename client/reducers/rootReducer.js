import { combineReducers } from 'redux';

import { auth } from './authReducer'
import { authenticatedResourceData } from './authenticedResourceReducer'

const rootReducer = combineReducers({
  auth,
  authenticatedResourceData
});

export default rootReducer;
export const RESOURCE_REQUEST = 'RESOURCE_REQUEST';
export const RESOURCE_SUCCESS = 'RESOURCE_SUCCESS';
export const RESOURCE_FAILURE = 'RESOURCE_FAILURE';

export const initialState = {
  isRequesting: false,
  data: null,
  error: null
};

export const authenticatedResourceData = (state = initialState, action) => {
  switch (action.type) {
    case RESOURCE_REQUEST:
      return {...state, isRequesting: true, error: null};
    case RESOURCE_SUCCESS:
      return {...state, isRequesting: false, data: action.resourceRequestResult};
    case RESOURCE_FAILURE:
      return {...state, isRequesting: false, error: action.error || 'unknown error'};
    default:
      return state;
  }
};

export const requestResource = () => (
  {
    type: RESOURCE_REQUEST
  }
);
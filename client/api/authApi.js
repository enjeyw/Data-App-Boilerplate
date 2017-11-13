import Auth0Lock from 'auth0-lock';

// Auth0 Lock
export const lock = new Auth0Lock(
    window.AUTH0_CLIENT_ID,
    window.AUTH0_DOMAIN,
    {
      auth: {
        redirect: false,
        params: {scope: 'openid email user_metadata app_metadata picture'}
      },
      allowedConnections: ["facebook", 'google-oauth2'],
      languageDictionary: { title: 'React Python Boilerplate' }
    }
  );


export const storeToken = (token) => {
  localStorage.setItem('sessionToken', token);
};

export const  removeToken = () => {
  localStorage.removeItem('sessionToken');
};

export const getToken = () => {
  try {
    return localStorage.getItem('sessionToken');
  } catch (err) {
    removeToken();
    return null
  }
};


const handle_response = (response) => {
  if (response.ok) {
    return response.json();
  }
  throw response
};

//Auth API Call
export const requestApiToken = (auth0AccessToken) => {
  return fetch('/api/auth/request_api_token/' , {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify({
      'auth0AccessToken': auth0AccessToken
      })
    })
    .then(response => {
      return handle_response(response)
    })
    .catch(error => {
      throw error;
    })
};

export const refreshApiToken = () => {
  return fetch('/api/auth/refresh_api_token/' ,{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'pragma': 'no-cache',
      'cache-control': 'no-cache'
    },
    method: 'post',
    body: JSON.stringify({
      'ApiToken': getToken()
    })
  })
  .then(response => {

      return handle_response(response)
    })
    .catch(error => {
      throw error;
    })
};
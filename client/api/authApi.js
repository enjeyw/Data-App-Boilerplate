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
    return ''
  }
};

const handleResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  throw response
};

//Auth API Call
export const requestApiToken = (email, password) => {
  return fetch('/api/auth/request_api_token/' , {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify({
      'email': email,
      'password': password
      })
    })
    .then(response => {
      return handleResponse(response)
    })
    .catch(error => {
      throw error;
    })
};

export const refreshApiToken = () => {
  return fetch('/api/auth/refresh_api_token/' ,{
    headers: {
      'Authorization': getToken(),
      'Accept': 'application/json'
    },
    method: 'get'
  })
  .then(response => {

      return handleResponse(response)
    })
    .catch(error => {
      throw error;
    })
};

export const registerAPI = (email, password) => {
  return fetch('/api/auth/register/' , {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify({
      'email': email,
      'password': password
      })
    })
    .then(response => {
      return handleResponse(response)
    })
    .catch(error => {
      throw error;
    })
};

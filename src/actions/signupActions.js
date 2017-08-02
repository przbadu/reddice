import axios from 'axios';

// axios.default.baseURL = "http://localhost:8080"
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

export function userSignupRequest(userData) {
  return dispatch => {
    return axios.post('/api/users', userData);
  }
}

export function isUserExists(id) {
  return dispatch => {
    return axios.get(`/api/users/${id}`);
  }
}

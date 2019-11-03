import { API } from '../config';

export const readProfile = (userId, userToken) => {
  return fetch(`${API}/user/${userId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        "Content-Type": 'application/json',
        Authorization: `Bearer ${userToken}`
      }
    })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    })
};

export const updateProfile = (userId, userToken, userData) => {
  return fetch(`${API}/user/${userId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        "Content-Type": 'application/json',
        Authorization: `Bearer ${userToken}`
      },
      body: JSON.stringify(userData)
    })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    })
};


// Create method so user will see updated Profile info right away
// (i.e update local storage so user doesn't need to signout/signin)

export const updateUserLocalStorage = (user, next) => {
  if(typeof window !== 'undefined') {
    if(localStorage.getItem('jwt')) {
      let auth = JSON.parse(localStorage.getItem('jwt')) // jwt has token and user properties
      auth.user = user; // user prop in jwt now has updated user info
      localStorage.setItem('jwt', JSON.stringify(auth));
      next(); // exec callback to redirect user
    }
  }
}
  import { API } from '../config';

  export const signup = user => {
    // console.log({ name, email, password });
    return fetch(`${API}/signup`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(user) // convert JS object passed to JSON
      })
      .then(response => {
        return response.json();
      })
      .catch(error => {
        console.log(error);
      })

  };


  export const signin = user => {
    // console.log({ email, password });
    return fetch(`${API}/signin`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(user) // convert JS object passed to JSON
      })
      .then(response => {
        return response.json();
      })
      .catch(error => {
        console.log(error);
      })

  };

  export const authenticate = (data, next) => {
    // Local storage = part of browser's window object
    if(typeof window !== 'undefined') {
                            // key name and what to save in key
      localStorage.setItem('jwt', JSON.stringify(data))
    }

    next(); // callback used in Signin
  }

  export const signout = (next) => {
     if (typeof window !== 'undefined') {
       // clear local storage
       localStorage.removeItem('jwt');

       next();

       return fetch(`${API}/signout`, {
         method: 'GET'
       })
       .then(response => console.log('Signout', response))
       .catch(error => console.log(error))
     }
  }

  export const isAuthenticated = () => {
      if (typeof window == 'undefined') {
        return false
      }

      if (localStorage.getItem('jwt')) {

        return JSON.parse(localStorage.getItem('jwt'));
      } else {
        return false
      }
  }
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
import { API } from '../config';

export const createCategory = (userId, token, category) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      "Content-Type": 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(category) // convert JS object passed to JSON
  })
  .then(response => {
    return response.json();
  })
  .catch(error => {
    console.log(error);
  })
};
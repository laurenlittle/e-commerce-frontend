import { API } from '../config';

export const createOrder = (userId, userToken, orderData) => {
  return fetch(`${API}/order/create/${userId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        "Content-Type": 'application/json',
        Authorization: `Bearer ${userToken}`
      },
      body: JSON.stringify({ order: orderData })
    })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log('processPaymentError', error);
    })
};
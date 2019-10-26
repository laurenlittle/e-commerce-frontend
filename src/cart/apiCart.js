import { API } from '../config';

export const getBraintreeClientToken = (userId, userToken) => {
  return fetch(`${API}/braintree/getToken/${userId}`, {
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
                                                      // Payment Method and Total
export const processPayment = (userId, userToken, paymentData) => {
  return fetch(`${API}/braintree/payment/${userId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        "Content-Type": 'application/json',
        Authorization: `Bearer ${userToken}`
      },
      body: JSON.stringify(paymentData)
    })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log('processPaymentError', error);
    })
};
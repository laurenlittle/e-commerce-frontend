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

export const createProduct = (userId, token, product) => {
  return fetch(`${API}/product/create/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: product
  })
  .then(response => {
    return response.json();
  })
  .catch(error => {
    console.log(error);
  });
};

export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: 'GET',
  })
  .then(response => {
    return response.json();
  })
  .catch(error => {
    console.log(error);
  })
};

export const listOrders = (userId, userToken) => {
  return fetch(`${API}/order/list/${userId}`, {
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

export const getStatusValues = (userId, userToken) => {
  return fetch(`${API}/order/status-values/${userId}`, {
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

export const updateOrderStatus = (userId, userToken, orderId, status) => {
  return fetch(`${API}/order/${orderId}/status/${userId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        "Content-Type": 'application/json',
        Authorization: `Bearer ${userToken}`
      },
      body: JSON.stringify({status, orderId}) // sent as JSON
    })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    })
};

// Product CRUD

export const getAllProducts = () => {
  return fetch(`${API}/products?limit=100`, {
      method: 'GET',
    })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    })
};

export const getSingleProduct = productId => {
  return fetch(`${API}/product/${productId}`, {
      method: 'GET',
    })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    })
};

export const updateProduct = (productId, userId, userToken, productData) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${userToken}`
      },
      body: productData // sent as form data (not JSON)
    })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    })
};

export const deleteProduct = (productId, userId, userToken) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
      method: 'DELETE',
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


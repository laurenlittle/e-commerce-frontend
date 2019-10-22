import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { Link } from 'react-router-dom';
import Card from '../core/Card';
import { getCart } from './helpers/cartHelpers';
import { isAuthenticated } from '../auth';
import { getBraintreeClientToken } from './apiCart';
import DropIn from "braintree-web-drop-in-react";

const Checkout = ({products}) => {

  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: '',
    instance: {}, // for drop-in UI
    address: ''
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  useEffect(() => {
    setClientToken(userId, token);
  }, []);

  const setClientToken = (userId, token) => {
    // make API request
    getBraintreeClientToken(userId, token)
    .then(data => {
      if(data.error) {
        setData({...data, error: data.error, });
      } else {
        setData({
          ...data,
          success: true,
          clientToken: data.clientToken
        })
      }
    })
  };

  const getTotal = () => {
    return products.reduce((acc, curr) => {
      return acc + curr.count * curr.price
    }, 0);
  };

  const showCheckout = () => {
    return isAuthenticated() ? (
      <>
        {showDropIn()}
      </>
    ) : (
      <Link to='/signin'>
        <button className='btn btn-primary'>
          Sign in now to continue
        </button>
      </Link>
      )
  };

  const showDropIn = () => (

    <div>
      {data.clientToken !== null && products.length > 0 ? (
        <div>
          <DropIn
            options={{ authorization: data.clientToken }}
            onInstance={instance => (data.instance = instance)}
          />
          <button className='btn btn-success'>
            Checkout
          </button>
        </div>
      ) : null}
    </div>
  );

  return(
    <div>
      <h3>Total: ${getTotal()}</h3>

      {showCheckout()}
    </div>
  );
};

export default Checkout;
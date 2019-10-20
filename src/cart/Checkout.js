import React, {useState, useEffect, useCallback} from 'react';
import Layout from '../core/Layout';
import { Link } from 'react-router-dom';
import Card from '../core/Card';
import { getCart } from './helpers/cartHelpers';
import { isAuthenticated } from '../auth';

const Checkout = ({products}) => {

  const getTotal = () => {
    return products.reduce((acc, curr) => {
      return acc + curr.count * curr.price
    }, 0);
  };

  const showCheckout = () => {
    return isAuthenticated() ? (
      <button className='btn btn-success'>
        Checkout
      </button>
    ) : (
      <Link to='/signin'>
        <button className='btn btn-primary'>
          Sign in now to continue
        </button>
      </Link>
      )
  };

  return(
    <div>
      <h3>Total: ${getTotal()}</h3>

      {showCheckout()}
    </div>
  );
};

export default Checkout;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import { listOrders } from './apiAdmin';


const Orders = () => {

  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const loadOrders = (userId, token) => {
    // make API request
    listOrders(userId, token)
    .then(data => {
      if(data.error) {
        setError({error: data.error})
      } else {
        setOrders(data);
      }
    });
  };


  useEffect(() => {
    loadOrders(userId, token);
  }, []);

  const noOrders = orders => {
    return orders.length < 1 ? <h4>No orders at this time.</h4> : null;
  }

    return (
    <Layout title='Orders' description='Manage Orders here quickly and easily'>

      <div className='row'>
        <div className='col-md-8 offset-2'>
          {noOrders(orders)}
          {JSON.stringify(orders)}
          {/* {loadOrders()} */}
        </div>
      </div>
    </Layout>
  )

};

export default Orders;
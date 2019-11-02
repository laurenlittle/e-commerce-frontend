import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import { listOrders } from './apiAdmin';
import moment from 'moment';


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

  const showOrdersLength = () => {
    if (orders.length > 0) {
      return (
        <h2 className='text-danger'> Total Orders: {orders.length}</h2>
      );
    } else {
      return <h2 className='text-danger'> No orders at this time.</h2>
    }
  }

    return (
    <Layout title='Orders' description='Manage Orders here quickly and easily'>

      <div className='row'>
        <div className='col-md-8 offset-2'>
          {showOrdersLength()}
          {orders.map((order) => {
              return (
                <div className='mt-5' key={order._id} style={{borderBottom: '5px solid indigo'}}>
                  <h3 className='mb-5'>
                    <span> Order ID: {order._id}</span>
                  </h3>
                  <ul className='list-group mb-2'>
                    <li className='list-group-item'>{order.status}</li>
                    <li className='list-group-item'>Transaction ID: {order.transaction_id}</li>
                    <li className='list-group-item'> Amount: {order.amount}</li>
                    <li className='list-group-item'> Ordered by: {order.user.name}</li>
                    <li className='list-group-item'> Ordered on: {moment(order.createdAt).fromNow()}</li>
                    <li className='list-group-item'> Delivery Address: {order.address}</li>
                  </ul>

                  <h4 className='mt-4 mb-4 font-italic'>
                    Total products in order: {order.products.length}
                  </h4>
                </div>
              )
            }
          )}
        </div>
      </div>
    </Layout>
  )

};

export default Orders;
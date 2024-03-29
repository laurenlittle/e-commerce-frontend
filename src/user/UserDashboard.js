import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import { getPurchaseHistory } from './apiUser';
import moment from 'moment';

const UserDashboard = () => {

  // const {user} = isAuthenticated(); user._id, user.name, user.email, user.role
  const { user: { _id, name, email, role } } = isAuthenticated();
  const { token } = isAuthenticated();

  const [purchaseHistory, setHistory] = useState([]);

  const init = (userId, token) => {
    // make API
    getPurchaseHistory(userId, token)
    .then(data => {
      if(data.error) {
        console.log(data.error);
      } else {
        setHistory(data);
      }
    })
  };

  useEffect(() => {
    init(_id, token);
  }, []);

  const userLinks = () => {
    return(
      <div className='card'>
        <h4 className='card-header'>User Links</h4>

        <ul className='list-group'>
          <li className='list-group-item'>
            <Link className='nav-link' to='/cart'> My Cart</Link>
          </li>
          <li className='list-group-item'>
            <Link className='nav-link' to={`/profile/${_id}`}> Edit Profile</Link>
          </li>
        </ul>
      </div>
    )
  };

  const userInfo = () => {
    return (
      <div className='card mb-5'>
        <h3 className='card-header'>User Information</h3>

        <ul className='list-group'>
          <li className='list-group-item'>{name}</li>
          <li className='list-group-item'>{email}</li>
          <li className='list-group-item'>{role === 1 ? 'Admin' : 'Registered User'}</li>
        </ul>
      </div>
    )
  };

  const userPurchaseHistory = () => {
    return (
      <div className='card mb-5'>
        <h3 className='card-header'>Purchase History</h3>

         <ul className='list-group'>
          <li className='list-group-item'>
            {
              purchaseHistory.map((history) => {
                return (
                  <>
                    <hr/>
                    <h6>Date Purchased: {moment(history.createdAt).fromNow()} </h6>
                    {history.products.map(product => {
                      return (
                          <div key={product._id}>
                            <h6>Product Name: {product.name} </h6>
                            <h6>Price: ${product.price} </h6>
                          </div>
                      )
                    })}
                  </>
                )
              })
            }
          </li>
        </ul>

      </div>
    )
  };

  return(
    <Layout title='User Dashboard' description={`Welcome Back, ${name}`} className='container'>

      <div className='row'>
        <div className='col-3'>
          {userLinks()}
        </div>
        <div className='col-9'>
          {userInfo()}
          {userPurchaseHistory()}
        </div>
      </div>
    </Layout>
  )
};

export default UserDashboard;
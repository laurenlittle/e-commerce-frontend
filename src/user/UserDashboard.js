import React from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';

const UserDashboard = () => {

  // const {user} = isAuthenticated(); user._id, user.name, user.email, user.role
  const { user: { _id, name, email, role } } = isAuthenticated();

  return(
    <Layout title='User Dashboard' description='Welcome Back, Admin' className='container'>
      <div className='card mb-5'>
        <h3 className='card-header'>User Information</h3>
        <ul className='list-group'>
          <li className='list-group-item'>{name}</li>
          <li className='list-group-item'>{email}</li>
          <li className='list-group-item'>{role === 1 ? 'Admin' : 'Registered User'}</li>
        </ul>
      </div>

      <div className='card mb-5'>
        <h3 className='card-header'>Purchase History</h3>
         <ul className='list-group'>
          <li className='list-group-item'>History</li>
        </ul>

      </div>
    </Layout>
  )
};

export default UserDashboard;
import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { Redirect } from 'react-router-dom';
import { isAuthenticated } from '../auth/index';
import { readProfile, updateProfile, updateUserLocalStorage } from './apiUser';

const Profile = (props) => {

  // const {user} = isAuthenticated(); user._id, user.name, user.email, user.role
  // const { user: { _id, name, email, role } } = isAuthenticated();

  const [values, setValues] = useState({
    name: '',
    email: '', // TODO remove
    password: '',
    error: false,
    success: false
    // TODO - add photo
  })

  const { name, email, password, error, success } = values;
  const { token } = isAuthenticated();

                  // need userId to know which user's info to fetch
  const init = (userId) => {
    // make API request
    readProfile(userId, token)
    .then(data => {
      if (data.error) {
        setValues({...values, error: true})
      } else {
        setValues({
          ...values,
          name: data.name,
          email: data.email
        })
      }
    })
  };

  useEffect(() => {
    init(props.match.params.userId); // see Routes
  }, []);

  const handleChange = val => e => {
    setValues({...values, error: false, [val]: e.target.value})
  };

  const clickSubmit = e => {
    e.preventDefault();

    // make API request
    updateProfile(props.match.params.userId, token, {name, email, password})
    .then(data => {
      if (data.error) {
        console.log(data.error);
        setValues({
          ...values,
          error: true
        })
      } else {
        updateUserLocalStorage(data, () => {
          setValues({
            ...values,
            name: data.name,
            email: data.email,
            success: true // redirect User
          })
        })
      }
    })
  };

  const redirectUser = success => {
    if (success) {
      return <Redirect to='/user/dashboard' />
    }
  };

  const profileUpdateForm = (name, email, password) => (
    <form>
      <div className='form-group'>
        <label htmlFor='name' className='text-muted'>Name</label>
        <input type='text' onChange={handleChange('name')} id='name' className='form-control' value={name} />
      </div>
      <div className='form-group'>
        <label htmlFor='email' className='text-muted'>Email</label>
        <input type='email' onChange={handleChange('email')} id='email' className='form-control' value={email} />
      </div>
      <div className='form-group'>
        <label htmlFor='password' className='text-muted'>Password</label>
        <input type='password' onChange={handleChange('password')} id='password' className='form-control' value={password} />
      </div>

      <button className='btn btn-primary' onClick={clickSubmit}>Submit</button>
    </form>
  );

  return(
    <Layout title='Profile' description='View and Update Profile information' className='container-fluid'>
      <div className='row'>
        <div className='col-xs-12 col-sm-8'>
          <h2 className='mb-4'>My Profile</h2>
          {profileUpdateForm(name, email, password)}
          {redirectUser(success)}
        </div>
      </div>
  </Layout>
  );

};

export default Profile;
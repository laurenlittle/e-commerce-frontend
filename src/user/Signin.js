import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import { signin } from '../auth/index';


const Signin = () => {

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    error: '',
    isLoading: false,
    redirectToReferrer: false
  })

  const { email, password, error, isLoading, redirectToReferrer } = formValues;

  const handleChange = fieldName => event => {
    setFormValues({...formValues, error: false, [fieldName]: event.target.value})
  }

  const handleClickSubmit = e => {
    e.preventDefault();
    setFormValues({...formValues, error: false, isLoading: true});

    signin({ email, password }) // user object in method as JS object
    .then(data => {
      if(data.error) {
        setFormValues({...formValues, error: data.error, isLoading: false})
      } else {
        setFormValues({
          ...formValues,
          redirectToReferrer: true
        });
      }
    })
  }

  const signInForm = () => (
    <form>
      <div className='form-group'>
        <label className='text-muted'>Email</label>
        <input
          className='form-control'
          type='email'
          value={email}
          onChange={handleChange('email')}
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Password</label>
        <input
          className='form-control'
          type='password'
          value={password}
          onChange={handleChange('password')}
        />
      </div>

      <button onClick={handleClickSubmit} className='btn btn-primary'> Sign In</button>
    </form>
  );

  const showError = () => (
    <div className='alert alert-danger' style={{display: error ? '': 'none'}}>
      {error}
    </div>
  );

  const showIsLoading = () => (
    isLoading && (
      <div className='alert alert-info'>
        <h2>Loading...</h2>
      </div>
    )
  );

  const redirectUser = () => {
    if(redirectToReferrer) {
      return <Redirect to='/' />
    }
  }

  return (
  <Layout title='Sign In' description='Welcome Back, Please Sign In' className='container col-md-8 offset-md-2'>
    {showError()}
    {showIsLoading()}
    {signInForm()}
    {redirectUser()}
  </Layout>
  )
};

export default Signin;
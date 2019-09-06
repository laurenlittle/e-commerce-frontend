import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { signup } from '../auth/index';

const Signup = () => {

  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false
  })

  const { name, email, password, error, success } = formValues;

  const handleChange = fieldName => event => {
    setFormValues({ ...formValues, error: false, [fieldName]: event.target.value })
  }

  const handleClickSubmit = e => {
    e.preventDefault();
    setFormValues({...formValues, error: false});
    signup({ name, email, password }) // user object in method as JS object
    .then(data => {
      if(data.error) {
        setFormValues({...formValues, error: data.error, success: false})
      } else {
        setFormValues({
          ...formValues,
          name: '',
          email: '',
          password: '',
          error: '',
          success: true
        })
      }
    })
  }

  const signUpForm = () => (
    <form>
      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          className='form-control'
          type='text'
          value={name}
          onChange={handleChange('name')}
        />
      </div>

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

      <button onClick={handleClickSubmit} className='btn btn-primary'>Submit</button>
    </form>
  );

  const showError = () => (
    <div className='alert alert-danger' style={{display: error ? '' : 'none'}}>
      {error}
    </div>
  )

  const showSuccess = () => (
    <div className='alert alert-info' style={{display: success ? '' : 'none'}}>
      New account has been created. Please <Link to = '/signin'>sign in.</Link>
    </div>
  )

 return (
  <Layout title='Sign Up' description='Get started Today' className='container col-md-8 offset-md-2'>
    {showSuccess()}
    {showError()}
    {signUpForm()}
  </Layout>
 )
};

export default Signup;
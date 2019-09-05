import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { API } from '../config';


const Signup = () => {

  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false
  })

  const { name, email, password } = formValues;

  const handleChange = fieldName => event => {
    setFormValues({ ...formValues, error: false, [fieldName]: event.target.value })
  }

  const signup = (user) => {
    // console.log({ name, email, password });
    return fetch(`${API}/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(user) // convert JS object passed to JSON
    })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    })

  };

  const handleClickSubmit = e => {
    e.preventDefault();
    signup({ name, email, password }); // user object in method as JS object
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
          type='text'
          value={email}
          onChange={handleChange('email')}
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Password</label>
        <input
          className='form-control'
          type='text'
          value={password}
          onChange={handleChange('password')}
        />
      </div>

      <button onClick={handleClickSubmit} className='btn btn-primary'>Submit</button>
    </form>
  );

 return (
  <Layout title='Sign Up' description='Get started Today' className='container col-md-8 offset-md-2'>
    {signUpForm()}
    {/* {JSON.stringify(formValues)} */}
  </Layout>
 )
};

export default Signup;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import { createCategory } from './apiAdmin';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // destructure user and info from local storage
  const { user, token } = isAuthenticated();

  const handleChange = e => {
    setError('');
    setName(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    setError('');
    setSuccess(false);

    // make API request
    createCategory(user._id, token, { name })
    .then(data => {
      if(data.error) {
        setError(true);
      } else {
        setError('');
        setSuccess(true);
      }
    })
  };

  const showSuccess = () => {
    if(success) {
      return <h3 className='text-success'>{name} category has been created successfully.</h3>
    }
  };

  // TODO - fix display on Front End
  const showError = () => {
    if(error) {
      return <h3 className='text-danger'>Category is not unique.</h3>
    }
  };

  const goBack = () => (
    <div className='mt-5'>
      <Link to='/admin/dashboard' className='text-warning'> Back to Dashboard</Link>
    </div>
  );

  const addCategoryForm = () => (
    <form onSubmit={handleSubmit}>

      <div className='form-group'>
        <label className='text-muted'>Category Name</label>
        <input
          className='form-control'
          type='text'
          value={name}
          onChange={handleChange}
          autoFocus
          required
          />
      </div>

      <button className='btn btn-outline-primary'> Add Category</button>
    </form>
  );


  return (
    <Layout title='Add Category' description='Label the category of this product'>

      <div className='row'>
        <div className='col-md-8 offset-2'>
          {showSuccess()}
          {showError()}
          {addCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Layout>
  )
};

export default AddCategory
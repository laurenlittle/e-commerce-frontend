import React, {useState} from 'react';
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

  const handleChange = event => {
    setError('');
    setName(event.target.value);
  };

  const handleSubmit = event => {
    setError('');
    setSuccess(false);

    createCategory(user._id, token, {name})
    .then(data => {
      if(data.error) {
        setError(data.error);
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

  const showError = () => {
    if(error) {
      return <h3 className='text-danger'>{name} is not unique.</h3>
    }
  };

  const addCategoryForm = () => (
    <form onSubmit={handleSubmit}>

      <div className='form-group'>
        <label className='text-muted'>Category Name</label>
        <input
          className='form-control'
          type='text'
          value={name}
          onChange={handleChange}
          autofocus
          />
      </div>

      <button className='btn btn-outline-primary'> Add Category</button>
    </form>
  );


  return (
    <Layout title='Add Category' description='Describe the category of this product'>

      {/* {showError()}
      {showSucces()} */}
      <div className='row'>
        <div className='col-md-8 offset-2'>
          {addCategoryForm()}
        </div>
      </div>
    </Layout>
  )
};

export default AddCategory
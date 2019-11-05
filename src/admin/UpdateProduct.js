import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import { getSingleProduct, getCategories, updateProduct } from './apiAdmin';


const UpdateProduct = (props) => {

  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    quantity: '',
    sold: '',
    photo: '',
    shipping: '',
    loading: false,
    error: '',
    createdProduct: '',
    redirectToProfile: false,
    formData: ''
  });

  const {user, token } = isAuthenticated();

  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData
  } = values;

  const init = productId => {
    getSingleProduct(productId)
    .then(data => {
      if(data.error) {
        setValues({...values, error: data.error})
      } else {
        // Populate State and Load Categories
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category._id,
          shipping: data.shipping,
          shipping: data.shipping,
          quantity: data.quantity,
          formData: new FormData()
        });

        initCategories();
      }
    });
  };

  // Load Categories and have FormData API (from browser) available as soon as component mounts
  const initCategories = () => {
    // make API request
    getCategories()
    .then(data => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error
        })
      } else {
        setValues({
          categories: data.categories,
          formData: new FormData()
        })
      }
    })
  };

  useEffect(() => {
    init(props.match.params.productId);
  }, []);

  const handleChange = name => e => {
    // determine the value                     // only get the first photo - only single uploads
    const value = name === 'photo' ? e.target.files[0] : e.target.value
    formData.set(name, value);

                  // get the values from state
    setValues({...values, [name]: value});
  };

  const handleSubmit = e => {
    e.preventDefault();

    setValues({
      ...values,
      error: '',
      loading: true
    })

    // make API request
    updateProduct(props.match.params.productId, user._id, token, formData)
    .then(data => {
      if(data.error) {
        setValues({...values, error: data.error})
        console.log(data.error)
      } else {
        setValues({
          ...values,
          // clear form values
          name: '',
          description: '',
          price: '',
          photo: '',
          category: '',
          quantity: '',
          loading: false,
          error: false,
          createdProduct: data.name,
          redirectToProfile: true
        })
      }
    })
  }

  const redirectUser = () => {
    if (redirectToProfile) {
      if(!error) {
        return <Redirect to='/admin/dashboard' />
      }
    } 
  }

  // TODO - only name, photo, description, quantity, and price sent in headers
  const newPostForm = () => (

    <form
      className='mb-3'
      onSubmit={handleSubmit}
    >
      <h4>Post Photo</h4>

      <div className='form-group'>
        <label htmlFor='photo-input'>
          <input
            id='photo-input'
            className='form-control'
            type='file'
            name='photo'
            accept='image/*'
            onChange={handleChange('photo')}
          />
        </label>
      </div>

      <div className='form-group'>
        <label className='text-muted' htmlFor='name-input'> Product Name</label>
         <input
          id='name-input'
          className='form-control'
          type='text'
          value={name}
          onChange={handleChange('name')}
          />
      </div>

      <div className='form-group'>
        <label className='text-muted' htmlFor='description'>Description</label>
         <textarea
          id='description'
          className='form-control'
          value={description}
          onChange={handleChange('description')}
          />
      </div>

      <div className='form-group'>
        <label className='text-muted' htmlFor='price-input'>Price</label>
         <input
          id='price-input'
          className='form-control'
          type='number'
          value={price}
          onChange={handleChange('price')}
          />
      </div>

      <div className='form-group'>
        <label className='text-muted' htmlFor='category'>Category</label>
          <select
            id='category'
            className='form-control'
            onChange={handleChange('category')}
          >
            <option>Please Select</option>
            {
              categories &&
                categories.map((category, index) => {
                  return (<option key={index} value={category._id}>{category.name}</option>)
              })
            }
          </select>
      </div>

       <div className='form-group'>
        <label className='text-muted' htmlFor='quantity-input'>Quantity</label>
         <input
          id='quantity-input'
          className='form-control'
          type='number'
          value={quantity}
          onChange={handleChange('quantity')}
          />
      </div>

      <div className='form-group'>
        <label className='text-muted' htmlFor='shipping'>Shipping</label>
          <select
            id='shipping'
            className='form-control'
            onChange={handleChange('shipping')}
          >
            <option>Please Select</option>
            <option value='0'>No</option>
            <option value='1'>Yes</option>
          </select>
      </div>

      <button className='btn btn-primary'>Update Product</button>

    </form>
  );

  const showError = () => (
    <div className='alert alert-danger' style={{display: error ? '' : 'none'}}>
      {error}
    </div>
  );

  // TODO - fix display on Front End
  const showSuccess = () => (
    <div className='alert alert-success' style={{display: createdProduct ? '' : 'none'}}>
      <h2>`${createdProduct} has been updated successfully!`</h2>
    </div>
  );

  const showLoading = () => (
    loading && (<div className='alert alert-info'>
      <h2>Loading...</h2>
    </div>)
  );

  return (
      <Layout title='Update Product' description='Update a product'>

      <div className='row'>
        <div className='col-md-8 offset-2'>
          {showError()}
          {showSuccess()}
          {showLoading()}
          {newPostForm()}
          {redirectUser()}
        </div>
      </div>
    </Layout>
  )
}

export default UpdateProduct;
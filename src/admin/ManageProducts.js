import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import { getAllProducts, deleteProduct } from './apiAdmin';

const ManageProducts = () => {

  const [productsList, setProducts] = useState([]);
  const { user, token } = isAuthenticated();

  const loadProducts = () => {
    // make API request
    getAllProducts()
    .then(data => {
      if(data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    })
  };

  const destroyProduct = productId => {
    // make API request
    deleteProduct(productId, user._id, token)
    .then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProducts(); // reload Products so deleted product is no longer in state
      }
    })
  }

  useEffect(() => {
    loadProducts();
  }, []);

   return (
    <Layout title='Manage Products' description='Update your product inventory' className='container-fluid'>
      <div className='row'>
        <div className='col-sm-12'>
          <h3>Total {productsList.length} products in inventory</h3>
          <hr />
          <ul className='list-group'>
            {
              productsList.map(product => (
                <li key={product._id} className='list-group-item d-flex justify-content-between align-items-center'>
                  <strong>{product.name}</strong>
                  <Link to={`/admin/product/update/${product._id}`}>
                    <span className='badge badge-info'> Update Product</span>
                  </Link>
                  <span onClick={() => destroyProduct(product._id)} className='badge badge-danger'> Delete Product</span>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </Layout>
  );

};


export default ManageProducts;
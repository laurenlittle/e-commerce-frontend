import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';

const Product = () => {

   return (
  <Layout title='Product' description='Product Details' className='container-fluid'>
    <p>product details page</p>
  </Layout>
  );

};

export default Product;
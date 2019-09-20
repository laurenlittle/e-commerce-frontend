import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import Card from './Card';
import { getProducts } from './apiCore';

const Home = () => {

  const [productsSold, setProductsBySold] = useState([]);
  const [productsbyArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsSold = () => {

    // make API request
    getProducts('sold')
    .then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySold(data);
      }
    })
  };

  const loadProductsByArrival = () => {

    // make API request
    getProducts('createdAt')
    .then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    })
  };

  // executed when component mounts and state changes.
  useEffect(() => {
    loadProductsSold();
    loadProductsByArrival();
  }, []);

 return (
  <Layout title='Home' description='Node React E-Commerce App' className='container-fluid'>
    <h2 className='mb-4'>New Arrivals</h2>
    <div className='row'>
      {
        productsbyArrival.map(product => {
          return <Card key={product._id} product={product} />
        })
      }
    </div>

    <h2 className='mb-4'>Best Sellers</h2>
    <div className='row'>
      {
        productsSold.map(product => {
          return <Card key={product._id} product={product} />
        })
      }
    </div>

  </Layout>
  );
};

export default Home;
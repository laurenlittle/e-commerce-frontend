import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import Card from './Card';
import Search from './Search';
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
  <Layout title='Tis the Season for giving' description='Shop todays deals! New items added every day.' className='container-fluid'>
    <Search />
    <h2 className='mb-4'>New Arrivals</h2>
    <div className='row'>
      {
        productsbyArrival.map(product => (
          <div className='col-sm-4 mb-3' key={product._id}>
             <Card product={product} />
          </div>
          )
        )
      }
    </div>

    <h2 className='mb-4'>Best Sellers</h2>
    <div className='row'>
      {
        productsSold.map(product => (
          <div className='col-sm-4 mb-3' key={product._id}>
            <Card product={product} />
          </div>
        ))
      }
    </div>

  </Layout>
  );
};

export default Home;
import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import { read } from './apiCore';
import Card from './Card';

const Product = props => {

  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, []);

  // get product Id from route params when component mounts
  const loadSingleProduct = productId => {
    // make API request
    read(productId)
    .then(data => {
      if(data.error) {
        setError(data.error);
      } else {
        setProduct(data)
      }
    })
  };

   return (
  <Layout
    title={product && product.name}
    description = {
      product &&
      product.description &&
      product.description.substring(0, 100)
    }
    className='container-fluid'>
    <div className='row'>
      {
        product &&
        product.description &&
      <Card product={product} />
      }
    </div>
  </Layout>
  );

};

export default Product;
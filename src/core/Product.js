import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import { read, listRelated } from './apiCore';
import Card from './Card';

const Product = props => {

  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  // get product Id from route params when component mounts
  const loadSingleProduct = productId => {
    // make API request
    read(productId)
    .then(data => {
      if(data.error) {
        setError(data.error);
      } else {
        setProduct(data);

        // fetch related products
        listRelated(data._id)
        .then(data => {
          if(data.error) {
            setError(data.error);
          } else {
            setRelatedProducts(data);
          }
        })
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
      <div className='col-xs-12 col-sm-8'>
        {
          product &&
          product.description &&
          <Card product={product} showViewProductButton={false} />
        }
      </div>
      <div className='col-xs-12 col-sm-4'>
        <h4>Related Products</h4>
        {
          relatedProducts.map(product => (
            <div className='mb-3'>
              <Card
                key={product._id}
                product={product}
                showViewProductButton={true}  />
            </div>
          ))
        }


      </div>
    </div>
  </Layout>
  );

};

export default Product;
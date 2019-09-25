import React from 'react';
import { Link } from 'react-router-dom';
import ShowImage from './ShowImage';


const Card = ({product}) => {
  return (

    <div className='col-4 mb-3'>
      <div className='card'>
        <div className='card-header'>
          {product.name}
        </div>
        <div className='card-body'>
          <ShowImage item={product} url='product' />
          <p> {product.description.substring(0,50)} </p>
          <p> {product.price} </p>
          <Link to='/'>
            <button className='btn btn-outline-primary mb-2 mt-2 mr-4'>
              View Product
            </button>
          </Link>
          <Link to='/'>
            <button className='btn btn-outline-warning mb-2 mt-2'>
              Add to Cart
            </button>
          </Link>
        </div>

      </div>

    </div>
  )
};

export default Card;
import React from 'react';
import { Link } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';


const Card = ({product, showViewProductButton = true}) => {

  const showStock = quantity => {
    return quantity > 0 ? (
        <span className='badge badge-primary badge-pill'>In Stock</span>
      ) : (
            <span className='badge badge-primary badge-pill'>OUT OF STOCK</span>
          )
  }

  const showViewButton = showViewProductButton => {

    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`}>
          <button className='btn btn-outline-primary mb-2 mt-2 mr-4'>
              View Product
          </button>
        </Link>
      )
    )
  };

  const showAddToCartButton = () => {
    return (
       <Link to='/'>
          <button className='btn btn-outline-warning mb-2 mt-2'>
            Add to Cart
          </button>
        </Link>
    );
  };

  return (

      <div className='card'>
        <div className='card-header name'>
          {product.name}
        </div>
        <div className='card-body'>
          <ShowImage item={product} url='product' />
          <p className='lead mt-2'> {product.description.substring(0,50)} </p>
          <p className='black-10'>${product.price} </p>
          <p className='black-9'>Category: {product.category && product.category.name}</p>
          <p className='black-8'>Added: {moment(product.createdAt).fromNow()}</p>

          {showStock(product.quantity)}
          <br/>

          {showViewButton(showViewProductButton)}
          {showAddToCartButton()}

        </div>

      </div>
  )
};

export default Card;